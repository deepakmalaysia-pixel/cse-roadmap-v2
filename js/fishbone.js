function renderFishbone(){
  const container=document.getElementById('fishboneContainer');
  const svgNS='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(svgNS,'svg'); svg.id='fishboneSvg'; svg.setAttribute('viewBox','0 0 1000 380');
  const spine=document.createElementNS(svgNS,'line'); spine.setAttribute('x1','50');spine.setAttribute('y1','190');spine.setAttribute('x2','880');spine.setAttribute('y2','190');spine.setAttribute('stroke','rgba(255,255,255,0.2)');spine.setAttribute('stroke-width','3');svg.appendChild(spine);
  const head=document.createElementNS(svgNS,'polygon');head.setAttribute('points','880,190 845,172 845,208');head.setAttribute('fill','#22D3EE');svg.appendChild(head);
  const label=document.createElementNS(svgNS,'text');label.setAttribute('x','840');label.setAttribute('y','230');label.setAttribute('fill','#22D3EE');label.setAttribute('font-size','11');label.setAttribute('font-family','JetBrains Mono');label.textContent='EMPLOYABLE ENGINEER';svg.appendChild(label);
  const bones=[{x1:140,x2:230,y:-1,color:'#22D3EE',idx:0},{x1:340,x2:430,y:1,color:'#A78BFA',idx:1},{x1:540,x2:630,y:-1,color:'#34D399',idx:2},{x1:740,x2:830,y:1,color:'#FBBF24',idx:3}];
  bones.forEach(b=>{
    const line=document.createElementNS(svgNS,'line');line.setAttribute('x1',b.x1);line.setAttribute('y1','190');line.setAttribute('x2',b.x2);line.setAttribute('y2',b.y===-1?'50':'330');line.setAttribute('stroke',b.color);line.setAttribute('stroke-width','2');svg.appendChild(line);
    const dot=document.createElementNS(svgNS,'circle');dot.setAttribute('cx',b.x1);dot.setAttribute('cy','190');dot.setAttribute('r','5');dot.setAttribute('fill',b.color);svg.appendChild(dot);
    const t=document.createElementNS(svgNS,'text');t.setAttribute('x',b.x2);t.setAttribute('y',b.y===-1?'30':'350');t.setAttribute('fill',b.color);t.setAttribute('font-size','12');t.setAttribute('font-weight','700');t.setAttribute('text-anchor','middle');t.textContent=FOUNDATION[b.idx].title;svg.appendChild(t);
  });
  container.innerHTML='';container.appendChild(svg);
  const grid=document.getElementById('boneDetails');
  grid.innerHTML=FOUNDATION.map(f=>`<div class="bone" style="border-left:3px solid ${f.color}"><h4><span style="width:8px;height:8px;background:${f.color};border-radius:50%;display:inline-block"></span> ${f.title}</h4><ul>${f.points.map(p=>`<li><b>${p.label}</b> - ${p.desc}</li>`).join('')}</ul></div>`).join('');
}
