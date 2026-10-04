import * as THREE from 'three';

export function setupScene(host) {
  let renderer;
  try { renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); }
  catch {host.dataset.state='fallback';return;}
  const mobile=matchMedia('(max-width:700px)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.75));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.setClearColor(0x070911,0);
  const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(35,1,.1,100);
  camera.position.set(0,.25,8.4);
  const universe=new THREE.Group();scene.add(universe);
  const ivory=new THREE.MeshStandardMaterial({color:0xc9c9e2,roughness:.35,metalness:.25});
  const dark=new THREE.MeshStandardMaterial({color:0x141725,roughness:.45,metalness:.35});
  const purple=new THREE.MeshStandardMaterial({color:0x8b5cf6,emissive:0x4a207f,emissiveIntensity:.35,roughness:.3,metalness:.3});
  const cyan=new THREE.MeshStandardMaterial({color:0x22d3ee,emissive:0x22d3ee,emissiveIntensity:.5,roughness:.25});
  function mesh(geometry,material,parent,position=[0,0,0],rotation=[0,0,0]){const m=new THREE.Mesh(geometry,material);m.position.set(...position);m.rotation.set(...rotation);parent.add(m);return m;}
  function rounded(w,h,d,r){const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:12});}
  const controller=new THREE.Group();universe.add(controller);
  const body=new THREE.Shape();body.moveTo(-1.05,.52);body.bezierCurveTo(-1.38,.5,-1.45,-.1,-1.6,-.85);body.bezierCurveTo(-1.7,-1.2,-1.37,-1.34,-1.12,-1.02);body.lineTo(-.64,-.52);body.quadraticCurveTo(0,-.45,.64,-.52);body.lineTo(1.12,-1.02);body.bezierCurveTo(1.37,-1.34,1.7,-1.2,1.6,-.85);body.bezierCurveTo(1.45,-.1,1.38,.5,1.05,.52);body.closePath();
  mesh(new THREE.ExtrudeGeometry(body,{depth:.36,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.12,bevelThickness:.12,curveSegments:24}),ivory,controller,[0,.2,-.2]);
  mesh(rounded(.95,.5,.035,.1),dark,controller,[0,.46,.3]);
  mesh(new THREE.BoxGeometry(.9,.022,.03),cyan,controller,[0,.16,.39]);
  mesh(rounded(.45,.12,.08,.04),dark,controller,[-.95,.78,-.1]);
  mesh(rounded(.45,.12,.08,.04),dark,controller,[.95,.78,-.1]);
  for(const x of [-.43,.43]){
    mesh(new THREE.CylinderGeometry(.23,.26,.10,32),dark,controller,[x,-.24,.37],[Math.PI/2,0,0]);
    mesh(new THREE.CylinderGeometry(.17,.19,.12,32),dark,controller,[x,-.24,.47],[Math.PI/2,0,0]);
    mesh(new THREE.TorusGeometry(.17,.014,8,32),purple,controller,[x,-.24,.54]);
  }
  mesh(rounded(.43,.13,.08,.025),dark,controller,[-.99,.24,.35]);
  mesh(rounded(.13,.43,.08,.025),dark,controller,[-.99,.24,.35]);
  [[.99,.43],[1.17,.25],[.81,.25],[.99,.07]].forEach(([x,y],i)=>{
    mesh(new THREE.CylinderGeometry(.073,.073,.07,24),dark,controller,[x,y,.38],[Math.PI/2,0,0]);
    mesh(new THREE.TorusGeometry(.046,.008,6,i===0?3:20),i%2?cyan:purple,controller,[x,y,.43]);
  });
  controller.rotation.set(-.22,-.28,-.18);controller.position.set(-.15,-.1,.5);
  const cam=new THREE.Group();universe.add(cam);
  mesh(rounded(1.5,.9,.5,.12),dark,cam,[0,0,-.25]);
  mesh(rounded(.45,.19,.3,.04),ivory,cam,[-.28,.54,-.17]);
  mesh(rounded(.25,.08,.3,.025),purple,cam,[.52,.5,-.1]);
  mesh(new THREE.CylinderGeometry(.39,.43,.38,48),dark,cam,[.1,0,.35],[Math.PI/2,0,0]);
  mesh(new THREE.TorusGeometry(.35,.035,12,48),purple,cam,[.1,0,.55]);
  const glass=new THREE.MeshStandardMaterial({color:0x173e5b,metalness:.85,roughness:.15});
  mesh(new THREE.CylinderGeometry(.30,.30,.03,48),glass,cam,[.1,0,.57],[Math.PI/2,0,0]);
  mesh(new THREE.TorusGeometry(.19,.012,8,40),cyan,cam,[.1,0,.59]);
  mesh(rounded(.17,.12,.015,.025),ivory,cam,[-.5,.24,.28]);
  cam.position.set(1.15,1.35,-.4);cam.scale.setScalar(.7);cam.rotation.set(-.14,-.35,.12);
  const play=new THREE.Group();universe.add(play);
  const triangle=new THREE.Shape();triangle.moveTo(-.23,-.26);triangle.lineTo(.3,0);triangle.lineTo(-.23,.26);triangle.closePath();
  mesh(new THREE.ExtrudeGeometry(triangle,{depth:.12,bevelEnabled:true,bevelSize:.03,bevelThickness:.03,bevelSegments:3}),new THREE.MeshStandardMaterial({color:0xff0033,emissive:0xa00020,emissiveIntensity:.25,metalness:.2,roughness:.3}),play);
  play.position.set(-1.65,1.25,.2);play.rotation.set(-.1,.2,-.12);
  const orbitMaterial=new THREE.MeshBasicMaterial({color:0x8b5cf6,transparent:true,opacity:.28});
  mesh(new THREE.TorusGeometry(2.25,.009,6,128),orbitMaterial,universe,[0,0,-.65],[1.05,.2,-.4]);
  mesh(new THREE.TorusGeometry(2.6,.006,6,128),new THREE.MeshBasicMaterial({color:0x22d3ee,transparent:true,opacity:.2}),universe,[0,.15,-.75],[.75,-.4,.45]);
  const points=new Float32Array((mobile?24:55)*3);
  for(let i=0;i<points.length;i+=3){points[i]=(Math.random()-.5)*5.4;points[i+1]=(Math.random()-.5)*4.5;points[i+2]=-1-Math.random()*2;}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(points,3));
  const particles=new THREE.Points(geometry,new THREE.PointsMaterial({color:0xb3a5df,size:.022,transparent:true,opacity:.6}));universe.add(particles);
  scene.add(new THREE.AmbientLight(0x9aa4d5,2));
  const key=new THREE.DirectionalLight(0xe6e8ff,4);key.position.set(-3,4,5);scene.add(key);
  const violet=new THREE.PointLight(0x8b5cf6,35,20);violet.position.set(-3,1,2);scene.add(violet);
  const blue=new THREE.PointLight(0x22d3ee,28,20);blue.position.set(3,-1,2);scene.add(blue);
  let mode='gaming', paused=false, visible=true, raf=0, elapsed=0, last=0, drag=0, pointerX=0,pointerY=0,down=null;
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const motion=document.querySelector('#motion');
  function isMoving(){return !paused&&!reduced.matches&&visible&&!document.hidden;}
  function render(){renderer.render(scene,camera);}
  function arrange(){const vlog=mode==='vlogs';controller.position.set(vlog?-1.35:-.15,vlog?-1.25:-.1,vlog?-.4:.5);controller.scale.setScalar(vlog?.55:1);cam.position.set(vlog?.15:1.15,vlog?.15:1.35,vlog?.7:-.4);cam.scale.setScalar(vlog?1.45:.7);violet.color.set(vlog?0x22d3ee:0x8b5cf6);blue.color.set(vlog?0x8b5cf6:0x22d3ee);render();}
  function tick(now){raf=0;if(!isMoving()){last=0;return;}const delta=last?Math.min((now-last)/1000,.05):0;last=now;elapsed+=delta;universe.position.y=Math.sin(elapsed*.7)*.10;universe.rotation.y=drag+pointerX*.10+Math.sin(elapsed*.3)*.045;universe.rotation.x=pointerY*.06;play.rotation.y=Math.sin(elapsed*.6)*.25;particles.rotation.y=elapsed*.015;render();raf=requestAnimationFrame(tick);}
  function sync(){cancelAnimationFrame(raf);raf=0;last=0;motion.disabled=reduced.matches;motion.textContent=reduced.matches?'Reduced motion':paused?'Resume motion':'Pause motion';motion.setAttribute('aria-pressed',String(paused||reduced.matches));host.dataset.motion=isMoving()?'running':'paused';render();if(isMoving())raf=requestAnimationFrame(tick);}
  function resize(){const {width,height}=host.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();render();}
  host.append(renderer.domElement);resize();arrange();host.classList.add('is-ready');host.dataset.state='ready';host.dataset.mode=mode;
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(host);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',()=>{if(reduced.matches){universe.position.y=0;universe.rotation.set(0,drag,0);}sync();});
  document.querySelector('.scene-controls').hidden=false;document.querySelector('.scene-hint').hidden=false;
  motion.addEventListener('click',()=>{paused=!paused;sync();});
  document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.mode;host.dataset.mode=mode;document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));arrange();}));
  host.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,rotation:drag,id:e.pointerId};});
  host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();if(down){const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>8){if(!host.hasPointerCapture(e.pointerId))host.setPointerCapture(e.pointerId);drag=down.rotation+dx*.008;universe.rotation.y=drag;render();}}else if(e.pointerType==='mouse'&&!paused&&!reduced.matches){pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5;}});
  const end=()=>{down=null;};host.addEventListener('pointerup',end);host.addEventListener('pointercancel',end);host.addEventListener('lostpointercapture',end);host.addEventListener('pointerleave',()=>{pointerX=0;pointerY=0;if(!host.hasPointerCapture(down?.id??-1))down=null;});
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);host.classList.remove('is-ready');renderer.domElement.hidden=true;host.dataset.state='fallback';document.querySelector('.scene-controls').hidden=true;document.querySelector('.scene-hint').hidden=true;});
  sync();
}
