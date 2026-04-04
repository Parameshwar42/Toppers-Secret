import re

ap_file = r"ap_eamcet_papers\code.html"
ts_file = r"ts_eamcet_papers\code.html"

dynamic_html = """  <div id="papers-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    <div class="col-span-full text-center py-10 text-on-surface-variant font-medium">Loading papers database...</div>
  </div>
</main>

<script>
    document.addEventListener('DOMContentLoaded', async () => {
        const grid = document.getElementById('papers-grid');
        const category = '__CATEGORY__'; 
        
        try {
            const res = await fetch('/api/papers');
            const db = await res.json();
            const uploadedPapers = db[category] || {};
            
            let html = '';
            for (let year = 2024; year >= 2015; year--) {
                const shiftsArray = uploadedPapers[year];
                const hasShifts = Array.isArray(shiftsArray) && shiftsArray.length > 0;
                
                if (hasShifts) {
                    html += `
                        <a href="../shift_details/code.html?category=${category}&year=${year}" target="_blank" class="group flex flex-col items-center justify-center aspect-square bg-surface-container-lowest rounded-3xl shadow-[0_4px_20px_rgba(25,28,30,0.03)] hover:shadow-[0_8px_32px_rgba(25,28,30,0.08)] transition-all border border-transparent hover:border-primary/20 hover:-translate-y-1 active:scale-95">
                            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                                <span class="material-symbols-outlined group-hover:text-on-primary" style="font-variation-settings: 'FILL' 1;">description</span>
                            </div>
                            <h3 class="font-headline text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">${year}</h3>
                            <p class="text-[10px] uppercase tracking-widest text-green-600 font-bold mt-1">${shiftsArray.length} Shift${shiftsArray.length > 1 ? 's' : ''}</p>
                        </a>
                    `;
                } else {
                    html += `
                        <div class="flex flex-col items-center justify-center aspect-square bg-surface-container/30 rounded-3xl border border-transparent opacity-60">
                            <div class="w-14 h-14 bg-surface-variant/50 rounded-2xl flex items-center justify-center mb-4 text-on-surface-variant">
                                <span class="material-symbols-outlined">lock</span>
                            </div>
                            <h3 class="font-headline text-2xl font-bold text-on-surface-variant">${year}</h3>
                            <p class="text-[10px] uppercase tracking-widest text-on-surface-variant/70 font-semibold mt-1">Coming Soon</p>
                        </div>
                    `;
                }
            }
            grid.innerHTML = html;
        } catch (e) {
            console.error(e);
            grid.innerHTML = '<div class="col-span-full text-center py-10 text-red-500 font-bold">Failed to load from server. Ensure Node.js backend is running.</div>';
        }
    });
</script>"""

def update_file(filepath, cat_name):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'<div id="papers-grid".*?</script>', dynamic_html.replace('__CATEGORY__', cat_name), content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_file(ap_file, 'ap_eamcet')
update_file(ts_file, 'ts_eamcet')
print("Successfully made pages check shift arrays!")
