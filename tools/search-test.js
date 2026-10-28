// Run from the repo root: node tools/search-test.js to print which answer each test question gets
let src=require('fs').readFileSync('search-modal.js','utf8');
src=src.replace("if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();","globalThis.__fb=fallback;");
eval(src);
const qs=["how do you cater for people with neurodivergence","are you neurodiverse friendly","can you accommodate my dyslexia","I'm autistic, what help is there","do you have catered halls","is there self catered accommodation","what support is there for disabled students","reasonable adjustments for exams",
"do you have work placements","how much is it","where will I live","is there student housing","acommodation","what grades do I need","can I study nursing","can i get a job while studying","im 35 can i still go to uni","when can I visit","is winchester safe","what clubs are there","I missed my grades","how do I apply","I'm from abroad","I have ADHD what support is there","how are exams","how big are the classes","How does Clearing work here?"];
for (const q of qs){ const r=__fb(q); console.log((q+' ').padEnd(52,'.')+' '+(r.kind==='clarify'?'[clarify]':r.lead.slice(0,60))); }
