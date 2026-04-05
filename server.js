const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Root API check
app.get('/api', (req, res) => {
    res.json({ message: 'Topper Secret API is online!', access: 'restricted' });
});

// Health check for Vercel troubleshooting
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is active', time: new Date() });
});

const supabaseUrl = process.env.SUPABASE_URL || 'https://vbwncitkapkhkxodmysy.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_oGP2RFiHbK78IU_9B9IzFQ_EWjLpBDX';
const supabase = createClient(supabaseUrl, supabaseKey);

// Store files in memory so we can upload them directly to Supabase cloud
const upload = multer({ storage: multer.memoryStorage() });

app.get('/api/papers', async (req, res) => {
    try {
        const { data, error } = await supabase.from('papers').select('*');
        if (error) {
            console.error("Supabase request failed (maybe table doesn't exist yet):", error);
            // fallback structure to not break frontend
            return res.json({ ap_eamcet: {}, ts_eamcet: {} }); 
        }
        
        const db = { ap_eamcet: {}, ts_eamcet: {} };
        data.forEach(row => {
            const cat = row.category;
            const yr = row.year;
            if (!db[cat]) db[cat] = {};
            if (!db[cat][yr]) db[cat][yr] = [];
            db[cat][yr].push({
                shiftTitle: row.shiftTitle,
                fileUrl: row.fileUrl
            });
        });
        
        res.json(db);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to read database" });
    }
});

app.post('/api/upload', upload.single('pdf'), async (req, res) => {
    const { category, year, password, shiftTitle } = req.body;

    if (password !== 'admin123') {
        return res.status(401).json({ error: "Unauthorized. Incorrect password." });
    }

    if (!req.file || !category || !year || !shiftTitle) {
        return res.status(400).json({ error: "Missing required fields (PDF, category, year, or shift title)." });
    }

    try {
        const ext = path.extname(req.file.originalname) || '.pdf';
        const timestamp = Date.now();
        const filename = `${category}_${year}_${timestamp}${ext}`;

        console.log("Uploading file to 'exam_papers' bucket...");
        // 1. Upload exactly to 'exam_papers' bucket
        const { error: uploadError } = await supabase.storage
            .from('exam_papers')
            .upload(filename, req.file.buffer, {
                contentType: 'application/pdf',
                upsert: false
            });

        if (uploadError) throw uploadError;

        // 2. Retreive the Cloud URL
        const { data: { publicUrl } } = supabase.storage
            .from('exam_papers')
            .getPublicUrl(filename);

        console.log("Inserting record into 'papers' table...", publicUrl);
        // 3. Insert record into database
        const { error: dbError } = await supabase.from('papers').insert([{
            category: category,
            year: parseInt(year),
            shiftTitle: shiftTitle,
            fileUrl: publicUrl
        }]);

        if (dbError) throw dbError;
        
        res.json({ success: true, message: "PDF shift uploaded straight to Supabase cloud!" });
    } catch (err) {
        console.error("Upload error details:", err);
        res.status(500).json({ error: err.message || "Cloud Database error." });
    }
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
module.exports = app;
