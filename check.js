const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://vbwncitkapkhkxodmysy.supabase.co';
const supabaseKey = 'sb_publishable_oGP2RFiHbK78IU_9B9IzFQ_EWjLpBDX';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('papers').select('*');
  console.log("Error:", error);
  console.log("Data:", data);
}
check();
