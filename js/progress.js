var SUPABASE=null; window.SUPABASE = null; let USER=null;
const LS_KEY='cse_progress_v2';
function loadProgress(){ try{return JSON.parse(localStorage.getItem(LS_KEY)||'{}')}catch{return{}} }
function saveProgress(d){ localStorage.setItem(LS_KEY, JSON.stringify(d)); updatePct(); }
function updatePct(){
  const d=loadProgress(); const allIds=[...FOUNDATION.flatMap(f=>f.points.map(p=>p.id)), ...CAREERS.flatMap(c=>c.tasks)];
  const done=allIds.filter(id=>d[id]).length; const pct=allIds.length?Math.round(done/allIds.length*100):0;
  document.getElementById('progressPct').textContent=pct+'% Complete';
}

function renderProgress(){
  const d=loadProgress();
  const container=document.getElementById('progressContainer');
  let html='';
  FOUNDATION.forEach(f=>{
    html+=`<div class="p-group"><h4 style="border-left:3px solid ${f.color};padding-left:8px">${f.title}</h4>`;
    f.points.forEach(p=>{
      const checked=d[p.id]?'checked':''; const cls=d[p.id]?'p-item done':'p-item';
      html+=`<label class="${cls}"><input type="checkbox" data-id="${p.id}" ${checked}/> <b>${p.label}</b> - ${p.desc}</label>`;
    });
    html+='</div>';
  });
  CAREERS.forEach(c=>{
    html+=`<div class="p-group"><h4>${c.title} - ${c.fresher}</h4>`;
    c.tasks.forEach(t=>{
      const checked=d[t]?'checked':''; const cls=d[t]?'p-item done':'p-item';
      html+=`<label class="${cls}"><input type="checkbox" data-id="${t}" ${checked}/> ${t.replace(/_/g,' ')}</label>`;
    });
    html+='</div>';
  });
  container.innerHTML=html;
  container.querySelectorAll('input[type=checkbox]').forEach(cb=>{
    cb.onchange=(e)=>{
      const dd=loadProgress(); dd[e.target.dataset.id]=e.target.checked; saveProgress(dd); e.target.closest('.p-item').classList.toggle('done', e.target.checked);
    }
  });
  updatePct();
}

function initSupabase(){
  // Replace with your keys from .env.example or set in localStorage for demo
  const url = localStorage.getItem('SUPABASE_URL') || '';
  const key = localStorage.getItem('SUPABASE_ANON_KEY') || '';
  if(url && key && window.supabase){
    SUPABASE = window.supabase.createClient(url, key); window.SUPABASE = SUPABASE(url, key);
  }
}

async function syncToCloud(){
  if(!SUPABASE){ alert('Supabase not configured. Add keys in My Progress → Login box or set SUPABASE_URL and SUPABASE_ANON_KEY in localStorage. For now progress is saved locally.'); return; }
  if(!USER){ alert('Login first'); return; }
  const data=loadProgress();
  const {error} = await SUPABASE.from('student_progress').upsert({user_id: USER.id, email: USER.email, progress: data, updated_at: new Date().toISOString()}, {onConflict:'user_id'});
  if(error) alert('Sync error: '+error.message); else alert('Synced to Supabase!');
}

async function loadFromCloud(){
  if(!SUPABASE || !USER) return;
  const {data, error} = await SUPABASE.from('student_progress').select('progress').eq('user_id', USER.id).single();
  if(data && data.progress){ localStorage.setItem(LS_KEY, JSON.stringify(data.progress)); renderProgress(); }
}

document.addEventListener('DOMContentLoaded',()=>{
  initSupabase();
  renderProgress();
  const authBox=document.getElementById('authBox');
  document.getElementById('btnLogin').onclick=()=>authBox.classList.toggle('hidden');
  document.getElementById('btnSync').onclick=syncToCloud;
  document.getElementById('doSignup').onclick=async()=>{
    if(!SUPABASE){ document.getElementById('authMsg').textContent='Set Supabase keys first in localStorage: SUPABASE_URL and SUPABASE_ANON_KEY'; return; }
    const email=document.getElementById('email').value; const pass=document.getElementById('password').value;
    const {data, error}=await SUPABASE.auth.signUp({email, password: pass});
    document.getElementById('authMsg').textContent=error?error.message:'Signup done, check email, then login';
  };
  document.getElementById('doLogin').onclick=async()=>{
    if(!SUPABASE){ document.getElementById('authMsg').textContent='Set Supabase keys first'; return; }
    const email=document.getElementById('email').value; const pass=document.getElementById('password').value;
    const {data, error}=await SUPABASE.auth.signInWithPassword({email, password: pass});
    if(error){ document.getElementById('authMsg').textContent=error.message; return; }
    USER=data.user; document.getElementById('authMsg').textContent='Logged in as '+USER.email; document.getElementById('btnLogin').textContent=USER.email; loadFromCloud();
  };
});
