document.addEventListener('DOMContentLoaded',()=>{
  renderFishbone(); renderCareers();
  const sections=['intro','howto','roadmap','resources','progress'];
  document.querySelectorAll('.topnav button').forEach(btn=>{
    btn.onclick=()=>{
      const sec=btn.dataset.section;
      document.querySelectorAll('.topnav button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      sections.forEach(s=>document.getElementById(s).classList.toggle('hidden', s!==sec));
      if(sec==='roadmap'){ renderFishbone(); renderCareers(); }
      if(sec==='progress'){ renderProgress(); }
    };
  });
  const fishBtn=document.getElementById('btnFishbone'); const flowBtn=document.getElementById('btnFlow');
  if(fishBtn){
    fishBtn.onclick=()=>{ fishBtn.classList.add('active'); flowBtn.classList.remove('active'); document.getElementById('fishboneContainer').parentElement.classList.remove('hidden'); document.getElementById('flowSection').classList.add('hidden'); renderFishbone(); };
    flowBtn.onclick=()=>{ flowBtn.classList.add('active'); fishBtn.classList.remove('active'); document.getElementById('flowSection').classList.remove('hidden'); renderFishbone(); renderCareers(); };
  }
  document.querySelectorAll('.filter button').forEach(b=>{
    b.onclick=()=>{ document.querySelectorAll('.filter button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); renderCareers(b.dataset.filter); };
  });
});
