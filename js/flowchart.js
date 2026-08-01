function renderCareers(filter='all'){
  const grid=document.getElementById('careerGrid');
  let list=CAREERS; if(filter!=='all') list=CAREERS.filter(c=>c.cat===filter);
  grid.innerHTML=list.map(c=>`<div class="career"><h3>${c.title}</h3><div class="meta"><span>Demand: ${c.demand}</span><span>${c.note}</span></div><div class="salary"><b>Fresher ${c.fresher}</b> | Mid ${c.mid}</div><ul>${c.skills.map(s=>`<li>• ${s}</li>`).join('')}</ul><div style="margin-top:6px;font-size:10px;color:rgba(255,255,255,0.45)"><b>Projects:</b> ${c.projects.join(' | ')}<br/><span style="font-family:JetBrains Mono">Cert: ${c.certs}<br/>Target: ${c.targets}</span></div></div>`).join('');
}
