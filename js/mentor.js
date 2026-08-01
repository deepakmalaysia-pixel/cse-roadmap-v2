
let MENTOR_DATA = [];

function calcProgressBreakdown(progress){
  const foundationIds = FOUNDATION.flatMap(f=>f.points.map(p=>p.id));
  const trackIds = CAREERS.flatMap(c=>c.tasks);
  const fDone = foundationIds.filter(id=>progress[id]).length;
  const tDone = trackIds.filter(id=>progress[id]).length;
  const total = foundationIds.length + trackIds.length;
  const done = fDone + tDone;
  const pct = total ? Math.round(done/total*100) : 0;
  const fPct = foundationIds.length ? Math.round(fDone/foundationIds.length*100) : 0;
  const tPct = trackIds.length ? Math.round(tDone/trackIds.length*100) : 0;
  return {pct, fPct, tPct, fDone, tDone, foundationIds, trackIds};
}

function getTopTrack(progress){
  let best = null, max= -1;
  CAREERS.forEach(c=>{
    const done = c.tasks.filter(t=>progress[t]).length;
    if(done>max){ max=done; best=c.title; }
  });
  return max>0?best:'-';
}

async function fetchMentorData(){
  if(!window.SUPABASE && typeof initSupabase==='function') initSupabase();
  // Try Supabase
  let rows = [];
  if(window.SUPABASE || (typeof SUPABASE !== 'undefined' && SUPABASE)){
    const sb = (typeof SUPABASE!=='undefined' && SUPABASE) ? SUPABASE : window.SUPABASE;
    try{
      const {data, error} = await sb.from('student_progress').select('user_id,email,progress,updated_at').order('updated_at',{ascending:false}).limit(100);
      if(error) throw error;
      rows = data || [];
    }catch(e){
      console.warn('Supabase fetch failed, using demo', e);
    }
  }
  // Demo fallback
  if(rows.length===0){
    rows = [
      {email:'demo.1yr@college.edu', progress:{c_lang:true, git:true, sql:true, aptitude:true}, updated_at: new Date().toISOString()},
      {email:'demo.4yr@college.edu', progress:{c_lang:true, python_basic:true, git:true, dsa:true, sql:true, os:true, cn:true, react_basics:true, node_api:true, docker:true, aws_ec2_s3:true}, updated_at: new Date(Date.now()-86400000).toISOString()},
      {email:'demo.passedout@college.edu', progress:{sql:true, adv_sql:true, powerbi:true, docker:true, aws_ec2_s3:true, manual_test:true}, updated_at: new Date(Date.now()-2*86400000).toISOString()},
    ];
  }
  return rows;
}

function renderMentorTable(rows, filterText=''){
  const tbody = document.getElementById('mentorTableBody');
  const stats = {total: rows.length, avg:0, active:0};
  let sum=0; let trackCount={};
  const now = Date.now();
  const filtered = rows.filter(r=> !filterText || r.email.toLowerCase().includes(filterText.toLowerCase()));

  filtered.forEach(r=>{
    const bd = calcProgressBreakdown(r.progress||{});
    sum+=bd.pct;
    if(now - new Date(r.updated_at).getTime() < 7*86400000) stats.active++;
    const top = getTopTrack(r.progress||{});
    trackCount[top] = (trackCount[top]||0)+1;
  });
  stats.avg = filtered.length ? Math.round(sum/filtered.length) : 0;
  document.getElementById('mTotal').textContent = filtered.length;
  document.getElementById('mAvg').textContent = stats.avg+'%';
  document.getElementById('mActive').textContent = stats.active;
  const topTrack = Object.entries(trackCount).sort((a,b)=>b[1]-a[1])[0];
  document.getElementById('mTopTrack').textContent = topTrack? topTrack[0] : '-';

  tbody.innerHTML = filtered.map(r=>{
    const bd = calcProgressBreakdown(r.progress||{});
    const date = new Date(r.updated_at).toLocaleDateString();
    return `<tr>
      <td><b>${r.email}</b><div class="mono" style="font-size:9px;color:rgba(255,255,255,0.4)">${r.user_id?r.user_id.slice(0,8):'demo'}</div></td>
      <td><div class="pbar"><div class="pbar-fill" style="width:${bd.pct}%"></div></div><span style="font-size:11px">${bd.pct}%</span></td>
      <td>${bd.fPct}% (${bd.fDone}/${bd.foundationIds.length})</td>
      <td>${bd.tPct}% • ${getTopTrack(r.progress||{})}</td>
      <td>${date}</td>
      <td><button class="btn small" onclick="openDetail('${r.email}')">View</button></td>
    </tr>`;
  }).join('') || '<tr><td colspan="6" style="text-align:center;padding:20px">No students match</td></tr>';

  // at-risk
  const atRisk = filtered.filter(r=>calcProgressBreakdown(r.progress||{}).pct < 20);
  document.getElementById('atRiskList').innerHTML = atRisk.length ? atRisk.map(r=>`<div class="side-item"><b>${r.email}</b><span>${calcProgressBreakdown(r.progress||{}).pct}%</span></div>`).join('') : '<div style="font-size:11px;color:rgba(255,255,255,0.4)">No at-risk 🎉</div>';
  document.getElementById('trackDist').innerHTML = Object.entries(trackCount).map(([k,v])=>`<div class="side-item"><span>${k}</span><b>${v}</b></div>`).join('') || 'No data';
  MENTOR_DATA = filtered;
}

function openDetail(email){
  const row = MENTOR_DATA.find(r=>r.email===email);
  if(!row) return;
  document.getElementById('detailEmail').textContent = email;
  const bd = calcProgressBreakdown(row.progress||{});
  let html = `<div class="mono" style="font-size:11px">Total: ${bd.pct}% | Foundation: ${bd.fPct}% | Tracks: ${bd.tPct}%</div><div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:10px">`;
  html += '<div><b>Foundation</b><br/>' + FOUNDATION.flatMap(f=>f.points).map(p=>`<div style="font-size:11px;padding:2px 0">${row.progress && row.progress[p.id] ? '✅' : '⬜'} ${p.label}</div>`).join('') + '</div>';
  html += '<div><b>Tracks</b><br/>' + CAREERS.map(c=>`<div style="margin-top:6px"><b style="font-size:11px">${c.title}</b>` + c.tasks.map(t=>`<div style="font-size:10px;padding:1px 0">${row.progress && row.progress[t] ? '✅' : '⬜'} ${t}</div>`).join('') + '</div>').join('') + '</div>';
  html += '</div>';
  document.getElementById('detailBody').innerHTML = html;
  document.getElementById('detailModal').classList.remove('hidden');
}

async function refreshMentor(){
  const rows = await fetchMentorData();
  const filter = document.getElementById('mentorSearch').value || '';
  renderMentorTable(rows, filter);
}

document.addEventListener('DOMContentLoaded',()=>{
  const btnR = document.getElementById('btnRefresh');
  if(btnR) btnR.onclick = refreshMentor;
  const search = document.getElementById('mentorSearch');
  if(search) search.oninput = refreshMentor;
  const btnExport = document.getElementById('btnExport');
  if(btnExport) btnExport.onclick = ()=>{
    const csv = ['email,total_pct,foundation_pct,track_pct,last_active,top_track'].concat(MENTOR_DATA.map(r=>{
      const bd = calcProgressBreakdown(r.progress||{});
      return `${r.email},${bd.pct},${bd.fPct},${bd.tPct},${r.updated_at},${getTopTrack(r.progress||{})}`;
    })).join('\n');
    const blob = new Blob([csv], {type:'text/csv'}); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='cohort_progress.csv'; a.click();
  };
  const close = document.getElementById('closeModal');
  if(close) close.onclick = ()=>document.getElementById('detailModal').classList.add('hidden');
  // auto refresh when entering mentor view
  const mentorBtn = document.querySelector('[data-section="mentor"]');
  if(mentorBtn) mentorBtn.addEventListener('click', ()=> setTimeout(refreshMentor, 200));
});
