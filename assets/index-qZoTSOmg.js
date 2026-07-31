(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const ef=60,Fi=1/ef,wc=5,lt={radius:.4,height:1.8,eyeHeight:1.7,walkSpeed:5,sprintSpeed:7.6,accel:62,friction:13,maxHp:100,roomClearHeal:25,hurtCooldown:.6,pitchLimit:Math.PI/2-.02},Ss={cooldown:.42,inputBuffer:.16,spawnForward:.6},ln={speed:46,radius:.3,damage:100,lifetime:3,maxStepDistance:.5},zn={walker:{name:"walker",scale:1,hp:100,radius:.55,height:1.45,speed:2.7,turnRate:6,damage:12,threatCost:1},runner:{name:"runner",scale:.75,hp:60,radius:.42,height:1.09,speed:4.3,turnRate:9,damage:8,threatCost:1},heavy:{name:"heavy",scale:1.4,hp:250,radius:.72,height:2.03,speed:1.85,turnRate:3.4,damage:22,threatCost:3},mini:{name:"mini",scale:.55,hp:40,radius:.34,height:.8,speed:4.6,turnRate:10,damage:6,threatCost:1},containmentMachine:{name:"containmentMachine",scale:1.55,hp:500,radius:.85,height:2.25,speed:0,turnRate:2.2,damage:0,threatCost:2,stationary:!0,brood:{variant:"mini",total:4,perRelease:2,firstDelay:1,interval:3.6,enrageBelow:.4,enragedInterval:2.6,radius:1.45,entryRadius:2.35,collapseOnDeath:!0,collapseStagger:0}},orchestrator:{name:"orchestrator",scale:2.2,hp:1200,radius:1.15,height:3.19,speed:0,turnRate:1.8,damage:0,threatCost:4,stationary:!0,brood:{variant:"mini",total:10,perRelease:2,firstDelay:1.2,interval:3,enrageBelow:.45,enragedInterval:1.7,radius:1.9,entryRadius:3.2,collapseOnDeath:!0,collapseStagger:.09}}},tf={containmentMachine:"containmentMachine",orchestrator:"orchestrator"};function nf(i){return tf[i]}const Au=Object.values(zn).filter(i=>!i.stationary),sf=Math.max(...Au.map(i=>i.radius)),rf=Math.max(...Au.map(i=>i.height));Math.max(...Object.values(zn).filter(i=>i.stationary).map(i=>Math.max(i.radius,(i.brood?.entryRadius??0)+zn[i.brood?.variant??"walker"].radius)));Math.max(...Object.values(zn).filter(i=>i.stationary).map(i=>i.height));const fn={range:2,windUpTime:.45,lungeTime:.22,lungeSpeed:9.5,recoverTime:.65,contactPad:.12},kl={implodeTime:.15},ko={separationRadius:1.35,separationStrength:9,speedJitter:.16},Jn={progressThreshold:.35,trigger:.35,duration:1.1,directBlend:.3,detoursBeforeEscape:2,escapeProbeDistance:7,escapeDuration:2.6,progressResetDistance:.7},Yt={maxAlive:16,engageDelay:1.4,waveDelay:1.6,clearDelay:1.6,minSpawnDistance:6,spawnStagger:.35,staggerDepthScale:.045,staggerFloor:.18,firstWaveArc:140*Math.PI/180,entrySpeed:3.8,anchorRiseTime:1.8},zo={hz:8,losInterval:.2,directRange:16},xi={killBase:{walker:100,runner:150,heavy:260,mini:60,containmentMachine:700,orchestrator:1500},chainWindow:2,chainStep:.35,chainMax:8,wavePerWave:250,roomClear:400,runComplete:2500},za=Math.PI*2;function Vn(i,e,t){return i<e?e:i>t?t:i}function af(i,e,t){return i+(e-i)*t}function Ru(i,e){let t=(e-i)%za;return t>Math.PI&&(t-=za),t<-Math.PI&&(t+=za),t}function bs(i,e,t,n){return af(i,e,1-Math.exp(-t*n))}function zl(i){return-Math.sin(i)}function Vl(i){return-Math.cos(i)}function of(i){return Math.cos(i)}function lf(i){return-Math.sin(i)}function Cu(i,e,t,n){const s=t-i,r=n-e;return Math.sqrt(s*s+r*r)}const la=1e-9,jt={t:1,nx:0,ny:0,nz:0};function lr(i,e,t,n,s,r,a,o,l){const c=a.minX-o,h=a.maxX+o,d=a.minY-o,u=a.maxY+o,f=a.minZ-o,g=a.maxZ+o;let v=0,m=1,p=-1,y=0;if(Math.abs(n)<la){if(i<c||i>h)return-1}else{const w=1/n;let M=(c-i)*w,T=(h-i)*w,b=-1;if(M>T){const A=M;M=T,T=A,b=1}if(M>v&&(v=M,p=0,y=b),T<m&&(m=T),v>m)return-1}if(Math.abs(s)<la){if(e<d||e>u)return-1}else{const w=1/s;let M=(d-e)*w,T=(u-e)*w,b=-1;if(M>T){const A=M;M=T,T=A,b=1}if(M>v&&(v=M,p=1,y=b),T<m&&(m=T),v>m)return-1}if(Math.abs(r)<la){if(t<f||t>g)return-1}else{const w=1/r;let M=(f-t)*w,T=(g-t)*w,b=-1;if(M>T){const A=M;M=T,T=A,b=1}if(M>v&&(v=M,p=2,y=b),T<m&&(m=T),v>m)return-1}if(v>1||m<0)return-1;if(l.t=v,l.nx=p===0?y:0,l.ny=p===1?y:0,l.nz=p===2?y:0,p===-1){const w=Math.hypot(n,s,r)||1;l.nx=-n/w,l.ny=-s/w,l.nz=-r/w}return v}function cf(i,e,t){return i<t.maxY&&i+e>t.minY}function Pu(i,e,t,n,s=3){let r=!1;for(let a=0;a<s;a++){let o=!1;for(let l=0;l<n.length;l++){const c=n[l];if(!cf(i.y,t,c))continue;const h=Vn(i.x,c.minX,c.maxX),d=Vn(i.z,c.minZ,c.maxZ),u=i.x-h,f=i.z-d,g=u*u+f*f;if(!(g>=e*e)){if(g>la){const v=Math.sqrt(g),m=e-v;i.x+=u/v*m,i.z+=f/v*m}else{const v=i.x-c.minX,m=c.maxX-i.x,p=i.z-c.minZ,y=c.maxZ-i.z,w=Math.min(v,m,p,y);w===v?i.x=c.minX-e:w===m?i.x=c.maxX+e:w===p?i.z=c.minZ-e:i.z=c.maxZ+e}o=!0,r=!0}}if(!o)break}return r}function hf(i,e,t,n,s,r,a){const o=n-i,l=s-e,c=r-t;for(let h=0;h<a.length;h++){const d=a[h];if(!(d.kind==="floor"||d.kind==="ceiling")&&lr(i,e,t,o,l,c,d,0,jt)>=0)return!1}return!0}const uf=256;function Dt(i,e){i.length>=uf||i.push(e)}const Tc=[];function df(i,e,t){const n=i.player;n.prevX=n.x,n.prevZ=n.z,n.hurtCooldown>0&&(n.hurtCooldown=Math.max(0,n.hurtCooldown-t));let s=Vn(e.moveX,-1,1),r=Vn(e.moveZ,-1,1);const a=Math.hypot(s,r);a>1&&(s/=a,r/=a);const o=e.sprint?lt.sprintSpeed:lt.walkSpeed,l=zl(n.yaw),c=Vl(n.yaw),h=of(n.yaw),d=lf(n.yaw),u=(l*r+h*s)*o,f=(c*r+d*s)*o;if(a>.001)n.vx+=(u-n.vx)*Math.min(1,lt.accel*t),n.vz+=(f-n.vz)*Math.min(1,lt.accel*t);else{const v=Math.max(0,1-lt.friction*t);n.vx*=v,n.vz*=v}n.x+=n.vx*t,n.z+=n.vz*t,n.y=i.floorY;const g=lt.radius;i.index.query(Math.min(n.prevX,n.x)-g,Math.min(n.prevZ,n.z)-g,Math.max(n.prevX,n.x)+g,Math.max(n.prevZ,n.z)+g,Tc),Pu(n,lt.radius,lt.height,Tc)}function ff(i,e,t){const n=i.player;if(n.fireCooldown>0&&(n.fireCooldown=Math.max(0,n.fireCooldown-t)),e.firePressed&&(e.firePressed=!1,n.fireBuffer=Ss.inputBuffer),n.fireBuffer>0&&(n.fireBuffer=Math.max(0,n.fireBuffer-t)),!(e.firePrimary||n.fireBuffer>0)||n.fireCooldown>0||!n.alive)return;n.fireBuffer=0,n.fireCooldown=Ss.cooldown,i.stats.shots+=1;const r=Math.cos(n.pitch),a=zl(n.yaw)*r,o=Math.sin(n.pitch),l=Vl(n.yaw)*r,c=n.y+lt.eyeHeight,h=n.x+a*Ss.spawnForward,d=c+o*Ss.spawnForward,u=n.z+l*Ss.spawnForward,f=i.nextId++;i.projectiles.push({id:f,x:h,y:d,z:u,prevX:h,prevY:d,prevZ:u,vx:a*ln.speed,vy:o*ln.speed,vz:l*ln.speed,life:ln.lifetime,alive:!0}),Dt(i.events,{type:"shot",id:f,x:h,y:d,z:u,dx:a,dy:o,dz:l})}const pf=.5,mf=.5;function Iu(i,e){let t=Number.POSITIVE_INFINITY,n=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY;for(const f of i)for(const g of f.brushes)g.minX<t&&(t=g.minX),g.minZ<n&&(n=g.minZ),g.maxX>s&&(s=g.maxX),g.maxZ>r&&(r=g.maxZ);const a=pf,o=Math.floor(t/a)*a,l=Math.floor(n/a)*a,c=Math.max(1,Math.ceil((s-o)/a)),h=Math.max(1,Math.ceil((r-l)/a)),d=new Uint8Array(c*h),u={cell:a,minX:o,minZ:l,cols:c,rows:h,walkable:d};for(const f of i)for(const g of f.brushes)g.kind==="floor"&&Ac(u,g.minX,g.minZ,g.maxX,g.maxZ,0,v=>{d[v]=1});for(const f of i)for(const g of f.brushes)g.kind==="floor"||g.kind==="ceiling"||g.maxY<=.05||g.minY>=e.height||Ac(u,g.minX,g.minZ,g.maxX,g.maxZ,e.radius,v=>{d[v]=0});return u}function Ac(i,e,t,n,s,r,a){const o=Rc(i.minX,i.cell,i.cols,e-r,n+r),l=Rc(i.minZ,i.cell,i.rows,t-r,s+r);for(let c=l.lo;c<=l.hi;c++){const h=c*i.cols;for(let d=o.lo;d<=o.hi;d++)a(h+d)}}function Rc(i,e,t,n,s){const r=Math.max(0,Math.ceil((n-i)/e-.5)),a=Math.min(t-1,Math.floor((s-i)/e-.5));return{lo:r,hi:a}}function Cc(i,e,t){const n=Math.floor((e-i.minX)/i.cell),s=Math.floor((t-i.minZ)/i.cell);return n<0||s<0||n>=i.cols||s>=i.rows?-1:s*i.cols+n}function ws(i,e,t,n=6){const s=Math.floor((e-i.minX)/i.cell),r=Math.floor((t-i.minZ)/i.cell);for(let a=0;a<=n;a++)for(let o=-a;o<=a;o++)for(let l=-a;l<=a;l++){if(a>0&&Math.abs(l)!==a&&Math.abs(o)!==a)continue;const c=s+l,h=r+o;if(c<0||h<0||c>=i.cols||h>=i.rows)continue;const d=h*i.cols+c;if(i.walkable[d])return d}return-1}function Pc(i,e,t){if(t.fill(0),e<0||!i.walkable[e])return 0;const n=[e];t[e]=1;let s=1;for(;n.length>0;){const r=n.pop(),a=r%i.cols,o=(r-a)/i.cols;for(let l=-1;l<=1;l++){const c=o+l;if(!(c<0||c>=i.rows))for(let h=-1;h<=1;h++){if(h===0&&l===0)continue;const d=a+h;if(d<0||d>=i.cols)continue;const u=c*i.cols+d;t[u]||!Gl(i,a,o,d,c)||(t[u]=1,s++,n.push(u))}}}return s}function Gl(i,e,t,n,s){if(e<0||t<0||e>=i.cols||t>=i.rows||n<0||s<0||n>=i.cols||s>=i.rows||!i.walkable[t*i.cols+e]||!i.walkable[s*i.cols+n])return!1;const r=n-e,a=s-t;return Math.abs(r)>1||Math.abs(a)>1||r===0&&a===0?!1:r===0||a===0?!0:!!(i.walkable[t*i.cols+n]&&i.walkable[s*i.cols+e])}function gf(i){let e=0;for(let t=0;t<i.walkable.length;t++)e+=i.walkable[t];return e}const ga=-1;function vf(i){const e=i.cols*i.rows;return{grid:i,dist:new Int32Array(e).fill(ga),queue:new Int32Array(e),goalCell:-1,timer:0}}function Lu(i,e,t,n){i.timer-=n;const s=ws(i.grid,e,t);return s<0||s===i.goalCell&&i.timer>0?!1:(i.timer=1/zo.hz,xf(i,s),!0)}function xf(i,e){const{grid:t,dist:n,queue:s}=i,{cols:r,rows:a}=t;n.fill(ga),i.goalCell=e,n[e]=0,s[0]=e;let o=0,l=1;for(;o<l;){const c=s[o++],h=n[c]+1,d=c%r,u=(c-d)/r;for(let f=-1;f<=1;f++){const g=u+f;if(!(g<0||g>=a))for(let v=-1;v<=1;v++){if(v===0&&f===0)continue;const m=d+v;if(m<0||m>=r)continue;const p=g*r+m;n[p]!==ga||!Gl(t,d,u,m,g)||(n[p]=h,s[l++]=p)}}}}function _f(i,e,t,n){const{grid:s,dist:r}=i,{cols:a,rows:o,cell:l}=s,c=ws(s,e,t,3);if(c<0)return!1;const h=r[c];if(h<=0)return!1;const d=c%a,u=(c-d)/a;let f=h,g=0,v=0,m=!1;for(let b=-1;b<=1;b++){const A=u+b;if(!(A<0||A>=o))for(let _=-1;_<=1;_++){if(_===0&&b===0)continue;const E=d+_;if(E<0||E>=a||!Gl(s,d,u,E,A))continue;const C=r[A*a+E];C===ga||C>=f||(f=C,g=E,v=A,m=!0)}}if(!m)return!1;const p=s.minX+(g+.5)*l,y=s.minZ+(v+.5)*l,w=p-e,M=y-t,T=Math.hypot(w,M);return T<1e-5?!1:(n.x=w/T,n.z=M/T,!0)}function Du(i,e,t,n=0,s=0,r=!0){return!e.alive||e.hp<=0?!1:(e.hp-=t,e.hurtTime=.18,i.stats.hits+=1,e.hp<=0?(e.hp=0,e.state="dying",e.stateTime=0,e.vx=0,e.vz=0,e.deathDirX=n,e.deathDirZ=s,i.stats.kills+=1,Mf(i,e),Dt(i.events,{type:"enemyKilled",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale,dirX:n,dirZ:s}),Wf(i,e.variant,r)):Dt(i.events,{type:"enemyHurt",id:e.id,x:e.x,y:e.y,z:e.z}),!0)}function Mf(i,e){const t=e.def.brood;if(!t||!t.collapseOnDeath)return;let n=0;for(const s of i.enemies)!s.alive||s.parentId!==e.id||s.state==="dying"||s.collapseTimer>=0||(s.collapseTimer=n*t.collapseStagger,s.collapseExtendsChain=t.collapseStagger>0,s.deathDirX=e.deathDirX,s.deathDirZ=e.deathDirZ,n+=1)}function yf(i,e){const t=i.player;return!t.alive||t.hurtCooldown>0?!1:(t.hp=Math.max(0,t.hp-e),t.hurtCooldown=lt.hurtCooldown,i.stats.damageTaken+=e,Dt(i.events,{type:"playerHurt",amount:e,hp:t.hp}),!0)}function Vo(i,e){if(i.enemies.length>=Yt.maxAlive)return null;const t=e.def,n=e.sink??0,s={id:i.nextId++,variant:t.name,def:t,x:e.x,y:i.floorY-n,z:e.z,prevX:e.x,prevZ:e.z,vx:0,vz:0,yaw:e.yaw,prevYaw:e.yaw,hp:t.hp,state:"entering",stateTime:0,gaitPhase:i.rng()*Math.PI*2,movedLast:0,stuckTime:0,detourTime:0,detourSide:(i.nextId&1)===0?1:-1,detourAttempts:0,unstickBestDistance:Number.POSITIVE_INFINITY,escapeTime:0,escapeDirX:0,escapeDirZ:0,entryX:e.entryX,entryZ:e.entryZ,hasSight:!1,losTimer:i.nextId%12/60,speedScale:1+(i.rng()-.5)*2*ko.speedJitter,hurtTime:0,lungeDirX:0,lungeDirZ:0,lungeConnected:!1,deathDirX:0,deathDirZ:0,yOffset:-n,broodTimer:t.brood?t.brood.firstDelay:0,broodRemaining:t.brood?t.brood.total:0,parentId:e.parentId??-1,collapseTimer:-1,collapseExtendsChain:!1,alive:!0};return i.enemies.push(s),s}const Ic=[],Lc=[],Dc=[],Va={x:0,z:0},Sf=2.6;function Ef(i,e){const t=i.enemies,n=t.length;for(let s=0;s<n;s++){const r=t[s];if(r.alive){if(r.prevX=r.x,r.prevZ=r.z,r.prevYaw=r.yaw,r.stateTime+=e,r.hurtTime>0&&(r.hurtTime=Math.max(0,r.hurtTime-e)),r.collapseTimer>=0&&r.state!=="dying"&&(r.collapseTimer-=e,r.collapseTimer<=0)){Du(i,r,r.hp,r.deathDirX,r.deathDirZ,r.collapseExtendsChain);continue}r.def.brood&&r.state!=="dying"&&r.state!=="entering"&&wf(i,r,e),bf(i,r,e)}}Rf(t,e);for(let s=0;s<t.length;s++){const r=t[s];if(!r.alive)continue;if(r.y=i.floorY+r.yOffset,r.def.stationary){r.movedLast=0;continue}r.x+=r.vx*e,r.z+=r.vz*e;const a=r.def.radius;i.index.query(Math.min(r.prevX,r.x)-a,Math.min(r.prevZ,r.z)-a,Math.max(r.prevX,r.x)+a,Math.max(r.prevZ,r.z)+a,Ic),Pu(r,a,r.def.height,Ic),r.movedLast=Cu(r.prevX,r.prevZ,r.x,r.z);const o=r.gaitPhase;r.gaitPhase+=r.movedLast*Sf,(r.state==="approach"||r.state==="entering")&&Math.floor(o/Math.PI)!==Math.floor(r.gaitPhase/Math.PI)&&Dt(i.events,{type:"enemyStep",id:r.id,x:r.x,y:r.y,z:r.z,scale:r.def.scale})}}function bf(i,e,t){const n=i.player,s=n.x-e.x,r=n.z-e.z,a=Math.hypot(s,r),o=e.def.radius+lt.radius+fn.contactPad;switch(e.state){case"dying":{e.vx=0,e.vz=0,e.stateTime>=kl.implodeTime&&(e.alive=!1,Dt(i.events,{type:"enemyBurst",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale,dirX:e.deathDirX,dirZ:e.deathDirZ}));break}case"entering":{if(e.def.stationary){e.vx=0,e.vz=0,Ei(e,s,r,t);const u=Math.min(1,e.stateTime/Yt.anchorRiseTime);e.yOffset=-e.def.height*(1-u),u>=1&&(e.yOffset=0,$i(e,"approach"));break}const l=e.entryX-e.x,c=e.entryZ-e.z,h=Math.hypot(l,c);if(h<=.12){e.x=e.entryX,e.z=e.entryZ,e.vx=0,e.vz=0,$i(e,"approach");break}const d=1/h;Ei(e,l,c,t),e.vx=l*d*Yt.entrySpeed,e.vz=c*d*Yt.entrySpeed;break}case"approach":{if(e.def.stationary){e.vx=0,e.vz=0,Ei(e,s,r,t);break}if(a<=fn.range+e.def.radius&&n.alive){$i(e,"windUp"),e.vx=0,e.vz=0,Ei(e,s,r,t),Dt(i.events,{type:"enemyWindUp",id:e.id,x:e.x,y:e.y,z:e.z});break}const l=e.def.speed*e.speedScale,c=a>1e-4?1/a:0;let h=s*c,d=r*c;e.losTimer-=t,e.losTimer<=0&&(e.losTimer=zo.losInterval,e.hasSight=a<=zo.directRange&&Tf(i,e)),!e.hasSight&&_f(i.nav,e.x,e.z,Va)&&(h=Va.x,d=Va.z),Ei(e,h,d,t),a<e.unstickBestDistance-Jn.progressResetDistance&&(e.unstickBestDistance=a,e.detourAttempts=0);const f=e.movedLast/Math.max(1e-4,l*t)<Jn.progressThreshold;if(e.escapeTime>0)e.escapeTime=Math.max(0,e.escapeTime-t),Ei(e,e.escapeDirX,e.escapeDirZ,t),e.vx=e.escapeDirX*l,e.vz=e.escapeDirZ*l;else if(e.detourTime>0)e.detourTime=Math.max(0,e.detourTime-t),e.stuckTime=f?e.stuckTime+t:0,e.vx=(h*Jn.directBlend-d*e.detourSide)*l,e.vz=(d*Jn.directBlend+h*e.detourSide)*l;else if(f){if(e.stuckTime+=t,e.stuckTime>=Jn.trigger)if(e.stuckTime=0,e.detourAttempts+=1,e.detourAttempts>=Jn.detoursBeforeEscape){const g=Af(i,e,h,d);e.escapeDirX=g.x,e.escapeDirZ=g.z,e.escapeTime=Jn.escapeDuration,e.detourTime=0}else e.detourSide=-e.detourSide,e.detourTime=Jn.duration;e.vx=h*l,e.vz=d*l}else e.stuckTime=0,e.vx=h*l,e.vz=d*l;break}case"windUp":{if(e.vx=0,e.vz=0,Ei(e,s,r,t),e.stateTime>=fn.windUpTime){const l=a>1e-4?1/a:0;e.lungeDirX=s*l,e.lungeDirZ=r*l,e.lungeConnected=!1,$i(e,"lunge"),Dt(i.events,{type:"enemyLunge",id:e.id,x:e.x,y:e.y,z:e.z})}break}case"lunge":{e.vx=e.lungeDirX*fn.lungeSpeed,e.vz=e.lungeDirZ*fn.lungeSpeed,!e.lungeConnected&&a<=o&&n.alive&&yf(i,e.def.damage)&&(e.lungeConnected=!0),e.stateTime>=fn.lungeTime&&$i(e,"recover");break}case"recover":{const l=Math.max(0,1-9*t);e.vx*=l,e.vz*=l,e.stateTime>=fn.recoverTime&&$i(e,"approach");break}}}function wf(i,e,t){const n=e.def.brood;if(e.broodRemaining<=0||!i.player.alive||(e.broodTimer-=t,e.broodTimer>0))return;const s=e.hp<=e.def.hp*n.enrageBelow;e.broodTimer=s?n.enragedInterval:n.interval;const r=zn[n.variant],a=Math.min(n.perRelease,e.broodRemaining);let o=0;for(let l=0;l<a;l++){const c=i.rng()*Math.PI*2,h=Math.sin(c),d=Math.cos(c);if(!Vo(i,{def:r,x:e.x+h*n.radius,z:e.z+d*n.radius,yaw:Math.atan2(-h,-d),entryX:e.x+h*n.entryRadius,entryZ:e.z+d*n.entryRadius,parentId:e.id}))break;e.broodRemaining-=1,o+=1}o>0&&Dt(i.events,{type:"broodReleased",id:e.id,x:e.x,y:e.y,z:e.z,count:o,remaining:e.broodRemaining})}function Tf(i,e){const t=i.player,n=e.y+e.def.height*.6,s=t.y+lt.eyeHeight*.6;return i.index.query(Math.min(e.x,t.x)-.1,Math.min(e.z,t.z)-.1,Math.max(e.x,t.x)+.1,Math.max(e.z,t.z)+.1,Lc),hf(e.x,n,e.z,t.x,s,t.z,Lc)}function Af(i,e,t,n){const s=Math.atan2(-n,-t),r=[0,Math.PI/4,-Math.PI/4,Math.PI/2,-Math.PI/2,Math.PI],a=Jn.escapeProbeDistance;let o=-t,l=-n,c=-1;i.index.query(e.x-a,e.z-a,e.x+a,e.z+a,Dc);for(const h of r){const d=s+h,u=Math.cos(d),f=Math.sin(d);let g=a;for(const v of Dc){if(v.kind==="floor"||v.kind==="ceiling")continue;const m=lr(e.x,e.y+e.def.height*.5,e.z,u*a,0,f*a,v,e.def.radius,jt);m>=0&&(g=Math.min(g,m*a))}g>c&&(c=g,o=u,l=f)}return{x:o,z:l}}function $i(i,e){i.state=e,i.stateTime=0}function Ei(i,e,t,n){if(Math.abs(e)<1e-5&&Math.abs(t)<1e-5)return;const s=Math.atan2(-e,-t);i.yaw+=Ru(i.yaw,s)*Math.min(1,i.def.turnRate*n)}function Rf(i,e){for(let t=0;t<i.length;t++){const n=i[t];if(!(!n.alive||n.state==="lunge"||n.state==="dying"))for(let s=t+1;s<i.length;s++){const r=i[s];if(!r.alive||r.state==="lunge"||r.state==="dying")continue;const a=r.x-n.x,o=r.z-n.z,l=a*a+o*o,c=ko.separationRadius*(n.def.scale+r.def.scale)*.5;if(l>=c*c||l<1e-8)continue;const h=Math.sqrt(l),d=(1-h/c)*ko.separationStrength*e,u=a/h,f=o/h;n.def.stationary||(n.vx-=u*d,n.vz-=f*d),r.def.stationary||(r.vx+=u*d,r.vz+=f*d)}}}const bi={minX:0,minY:0,minZ:0,maxX:0,maxY:0,maxZ:0},Ot={t:1,nx:0,ny:0,nz:0},Ga=[];function Cf(i,e){for(let t=0;t<i.projectiles.length;t++){const n=i.projectiles[t];if(n.alive){if(n.life-=e,n.life<=0){n.alive=!1;continue}Pf(i,n,e)}}}function Pf(i,e,t){e.prevX=e.x,e.prevY=e.y,e.prevZ=e.z;const n=e.vx*t,s=e.vy*t,r=e.vz*t,a=Math.hypot(n,s,r),o=Math.max(1,Math.ceil(a/ln.maxStepDistance)),l=n/o,c=s/o,h=r/o;for(let d=0;d<o;d++){const u=e.x,f=e.y,g=e.z;Ot.t=Number.POSITIVE_INFINITY;let v=null;for(let p=0;p<i.enemies.length;p++){const y=i.enemies[p];if(!y.alive||y.state==="dying")continue;const w=y.def.radius;bi.minX=y.x-w,bi.maxX=y.x+w,bi.minY=y.y,bi.maxY=y.y+y.def.height,bi.minZ=y.z-w,bi.maxZ=y.z+w;const M=lr(u,f,g,l,c,h,bi,ln.radius,jt);M>=0&&M<Ot.t&&(Ot.t=M,Ot.nx=jt.nx,Ot.ny=jt.ny,Ot.nz=jt.nz,v=y)}const m=ln.radius;i.index.query(Math.min(u,u+l)-m,Math.min(g,g+h)-m,Math.max(u,u+l)+m,Math.max(g,g+h)+m,Ga);for(let p=0;p<Ga.length;p++){const y=Ga[p],w=lr(u,f,g,l,c,h,y,ln.radius,jt);w>=0&&w<Ot.t&&(Ot.t=w,Ot.nx=jt.nx,Ot.ny=jt.ny,Ot.nz=jt.nz,v=null)}if(Number.isFinite(Ot.t)){const p=Ot.t;if(e.x=u+l*p,e.y=f+c*p,e.z=g+h*p,e.alive=!1,v){const y=Math.hypot(e.vx,e.vz);Du(i,v,ln.damage,y>1e-4?e.vx/y:0,y>1e-4?e.vz/y:0)}else Dt(i.events,{type:"impactWorld",x:e.x,y:e.y,z:e.z,nx:Ot.nx,ny:Ot.ny,nz:Ot.nz});return}e.x=u+l,e.y=f+c,e.z=g+h}}const If=4;class Lf{all;cell;minX;minZ;cols;rows;starts;items;mark;stamp;constructor(e,t=If){this.all=e,this.cell=t,this.stamp=0;let n=Number.POSITIVE_INFINITY,s=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,a=Number.NEGATIVE_INFINITY;for(const h of e)h.minX<n&&(n=h.minX),h.minZ<s&&(s=h.minZ),h.maxX>r&&(r=h.maxX),h.maxZ>a&&(a=h.maxZ);Number.isFinite(n)||(n=0,s=0,r=t,a=t),this.minX=n,this.minZ=s,this.cols=Math.max(1,Math.ceil((r-n)/t)+1),this.rows=Math.max(1,Math.ceil((a-s)/t)+1);const o=this.cols*this.rows,l=new Int32Array(o+1);for(const h of e)this.forEachBucket(h.minX,h.minZ,h.maxX,h.maxZ,d=>{l[d+1]+=1});for(let h=0;h<o;h++)l[h+1]+=l[h];this.starts=l,this.items=new Int32Array(l[o]);const c=new Int32Array(o);for(let h=0;h<e.length;h++){const d=e[h];this.forEachBucket(d.minX,d.minZ,d.maxX,d.maxZ,u=>{this.items[this.starts[u]+c[u]]=h,c[u]+=1})}this.mark=new Int32Array(e.length)}query(e,t,n,s,r){this.stamp+=1;const a=this.stamp;let o=0;return this.forEachBucket(e,t,n,s,l=>{const c=this.starts[l+1];for(let h=this.starts[l];h<c;h++){const d=this.items[h];this.mark[d]!==a&&(this.mark[d]=a,r[o++]=this.all[d])}}),r.length=o,r}get bucketCount(){return this.cols*this.rows}forEachBucket(e,t,n,s,r){const a=Math.max(0,Math.min(this.cols-1,Math.floor((e-this.minX)/this.cell))),o=Math.max(0,Math.min(this.cols-1,Math.floor((n-this.minX)/this.cell))),l=Math.max(0,Math.min(this.rows-1,Math.floor((t-this.minZ)/this.cell))),c=Math.max(0,Math.min(this.rows-1,Math.floor((s-this.minZ)/this.cell)));for(let h=l;h<=c;h++){const d=h*this.cols;for(let u=a;u<=o;u++)r(d+u)}}}const Nc=Math.min(...Object.values(zn).map(i=>i.threatCost));function Df(i,e,t){const n=[];let s=Math.max(Nc,Math.round(i));const r=zn.heavy,a=zn.runner;for(;s>=Nc;){const o=t();let l=zn.walker;o<e.heavyChance?r.threatCost<=s&&(l=r):o<e.heavyChance+e.runnerChance&&a.threatCost<=s&&(l=a),n.push(l.name),s-=l.threatCost}return n}function Nf(i,e){return e.z<i.minZ?0:e.x>i.maxX?1:e.z>i.maxZ?2:3}const Ki={distance:1e3,variety:200,visible:120,laneChange:40,farthest:1,farthestClamp:30};function Ff(i,e,t,n,s,r,a,o,l){if(e.length===0)return null;const c=(r%e.length+e.length)%e.length,h=Yt.firstWaveArc/2;let d=null,u=Number.NEGATIVE_INFINITY;for(let f=0;f<e.length;f++){const g=(c+f)%e.length,v=e[g],m=Nf(i,v),p=Cu(v.entryX,v.entryZ,t,n),y=p>=Yt.minSpawnDistance;let w=y?Ki.distance:0;m!==a&&(w+=Ki.variety),g!==o&&(w+=Ki.laneChange),l&&Uf(t,n,s,v,h)&&(w+=Ki.visible),w+=Math.min(p,Ki.farthestClamp)*Ki.farthest,w>u&&(u=w,d={spawn:v,index:g,source:m,fair:y})}return d}function Uf(i,e,t,n,s){const r=n.entryX-i,a=n.entryZ-e;if(r===0&&a===0)return!0;const o=Math.atan2(zl(t),Vl(t)),l=Math.atan2(r,a);return Math.abs(Ru(o,l))<=s}function Of(i){const e=Yt.spawnStagger/(1+Math.max(0,i)*Yt.staggerDepthScale);return Math.max(Yt.staggerFloor,e)}function Bf(i,e,t,n){if(e.roster.length>0){e.spawnTimer-=n,e.spawnTimer<=0&&i.enemies.length<Yt.maxAlive&&(Vf(i,e,t),e.spawnTimer=Of(t.depth));return}if(i.enemies.length>0)return;if(e.wave>=e.waveCount){if(e.waveTimer-=n,e.waveTimer>0)return;kf(i,e,t);return}if(e.waveTimer-=n,e.waveTimer>0)return;e.wave>0&&(i.stats.score+=xi.wavePerWave*e.wave,Dt(i.events,{type:"waveCleared",wave:e.wave,waveCount:e.waveCount})),e.wave+=1;const s=Math.max(1,t.encounter.waveBudget[e.wave-1]??1),r=Df(s,t.encounter,i.rng),a=t.encounter.anchored&&e.wave>=e.waveCount?t.anchor:null,o=a!==null;a&&r.unshift(nf(a.kind)),e.roster=r,e.threatSpent+=s+(o?t.encounter.anchorThreat:0),e.spawnTimer=0,e.spawnCursor=Math.floor(i.rng()*Math.max(1,t.enemySpawns.length)),e.lastSource=-1,e.lastLane=-1,e.waveTimer=e.wave>=e.waveCount?Yt.clearDelay:Yt.waveDelay,Dt(i.events,{type:"waveStarted",wave:e.wave,waveCount:e.waveCount,count:r.length,threat:s})}function kf(i,e,t){e.state="cleared",i.engagedRoomId=-1,i.stats.roomsCleared+=1,i.stats.score+=xi.wavePerWave*e.wave,i.stats.score+=xi.roomClear*(1+t.depth);const n=Math.min(lt.roomClearHeal,lt.maxHp-i.player.hp);n>0&&(i.player.hp+=n,i.stats.integrityRestored+=n),Dt(i.events,{type:"roomCleared",room:t.id,name:t.name,required:Hl(t),cleared:xa(i),total:va(i),heal:n,hp:i.player.hp}),zf(i)&&i.runtime[i.plan.finalRoomId].state==="cleared"&&(i.stats.score+=xi.runComplete,i.status="cleared",Dt(i.events,{type:"runCleared",score:i.stats.score}))}function Hl(i){return i.critical&&i.encounter.budget>0}function va(i){let e=0;for(const t of i.rooms)Hl(t)&&(e+=1);return e}function xa(i){let e=0;for(const t of i.rooms)Hl(t)&&i.runtime[t.id].state==="cleared"&&(e+=1);return e}function zf(i){return xa(i)===va(i)}function Vf(i,e,t){const n=e.roster[0];if(!n)return;const s=zn[n];if(s.stationary){const l=t.anchor;if(!l){e.roster.shift();return}const c=Vo(i,{def:s,x:l.x,z:l.z,yaw:l.yaw,entryX:l.x,entryZ:l.z,sink:s.height});if(!c)return;e.roster.shift(),Dt(i.events,{type:"anchorRising",kind:l.kind,id:c.id,x:l.x,y:i.floorY,z:l.z});return}const r=Ff(t,t.enemySpawns,i.player.x,i.player.z,i.player.yaw,e.spawnCursor,e.lastSource,e.lastLane,e.wave===1);if(!r){e.roster.length=0;return}const a=r.spawn;Vo(i,{def:s,x:a.x,z:a.z,yaw:a.yaw,entryX:a.entryX,entryZ:a.entryZ})&&(e.roster.shift(),e.spawnCursor=(r.index+1)%t.enemySpawns.length,e.lastSource=r.source,e.lastLane=r.index)}function Gf(i,e){const t=i.playerSpawn,n=[];for(const a of i.rooms)for(const o of a.brushes)n.push(o);const s=i.rooms.map(a=>({id:a.id,state:a.encounter.budget>0?"idle":"cleared",wave:0,waveCount:a.encounter.waveBudget.length,waveTimer:Yt.engageDelay,roster:[],spawnTimer:0,spawnCursor:0,lastSource:-1,lastLane:-1,threatSpent:0})),r={seed:i.seed,tick:0,time:0,status:"playing",plan:i,rooms:i.rooms,runtime:s,brushes:n,index:new Lf(n),nav:vf(i.nav),floorY:0,activeRoomId:i.startRoomId,engagedRoomId:-1,player:{x:t.x,y:0,z:t.z,prevX:t.x,prevZ:t.z,vx:0,vz:0,yaw:t.yaw,pitch:0,hp:lt.maxHp,fireCooldown:0,fireBuffer:0,hurtCooldown:0,alive:!0},enemies:[],projectiles:[],events:[],stats:{shots:0,hits:0,kills:0,damageTaken:0,timeAlive:0,score:0,bestChain:0,roomsCleared:0,integrityRestored:0},nextId:1,lastKillTime:Number.NEGATIVE_INFINITY,chain:0,rng:e};return Lu(r.nav,t.x,t.z,1),r}function Hf(i,e,t){for(const n of i.rooms)if(e>=n.minX&&e<=n.maxX&&t>=n.minZ&&t<=n.maxZ)return n.id;return-1}function Wf(i,e,t=!0){t&&(i.chain=i.time-i.lastKillTime<=xi.chainWindow?i.chain+1:1,i.lastKillTime=i.time,i.chain>i.stats.bestChain&&(i.stats.bestChain=i.chain));const n=t?i.chain:1,s=Math.min(xi.chainMax,n)-1,r=Math.round(xi.killBase[e]*(1+s*xi.chainStep));i.stats.score+=r,Dt(i.events,{type:"scored",amount:r,chain:n,total:i.stats.score})}function Xf(i,e,t){i.status==="playing"&&(i.player.yaw=e.yaw,i.player.pitch=e.pitch,df(i,e,t),ff(i,e,t),Lu(i.nav,i.player.x,i.player.z,t),Ef(i,t),Cf(i,t),qf(i),i.stats.timeAlive+=t,i.player.hp<=0&&i.player.alive&&(i.player.alive=!1,i.status="dead",Dt(i.events,{type:"playerDied"})),i.status==="playing"&&Zf(i,t)),i.tick+=1,i.time+=t}function qf(i){let e=0;for(let t=0;t<i.enemies.length;t++){const n=i.enemies[t];n.alive&&(i.enemies[e++]=n)}i.enemies.length=e,e=0;for(let t=0;t<i.projectiles.length;t++){const n=i.projectiles[t];n.alive&&(i.projectiles[e++]=n)}i.projectiles.length=e}function Zf(i,e){const t=Hf(i,i.player.x,i.player.z);if(t>=0&&t!==i.activeRoomId){i.activeRoomId=t;const n=i.rooms[t];Dt(i.events,{type:"roomEntered",room:t,name:n.name,depth:n.depth,escalation:n.escalation,hostile:i.runtime[t].state==="idle",final:t===i.plan.finalRoomId})}if(i.engagedRoomId<0){const n=i.runtime[i.activeRoomId];n&&n.state==="idle"&&(n.state="engaged",n.waveTimer=Yt.engageDelay,i.engagedRoomId=n.id);return}Bf(i,i.runtime[i.engagedRoomId],i.rooms[i.engagedRoomId],e)}function Yf(){return{moveX:0,moveZ:0,yaw:0,pitch:0,sprint:!1,firePrimary:!1,firePressed:!1,interact:!1}}function $f(i){i.moveX=0,i.moveZ=0,i.sprint=!1,i.firePrimary=!1,i.firePressed=!1,i.interact=!1}const Nu=.0022,Kf=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];class Jf{actions;held=new Set;canvas;sensitivity;invertY;disposed=!1;captureEnabled=!1;hadLock=!1;dragging=!1;dragX=0;dragY=0;lockFailed=!1;fireHeld=!1;pausePressed=!1;restartPressed=!1;debugPressed=!1;mutePressed=!1;peer=null;onLockStateChange=null;onSuspend=null;constructor(e,t,n={}){this.canvas=e,this.actions=t,this.sensitivity=n.sensitivity??Nu,this.invertY=n.invertY??!1,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVisibility),document.addEventListener("pointerlockchange",this.onPointerLock),document.addEventListener("pointerlockerror",this.onPointerLockError),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mouseup",this.onMouseUp)}setCaptureEnabled(e){this.captureEnabled=e,e||(this.dragging=!1,this.hadLock=!1)}get needsCaptureHint(){return this.captureEnabled&&!this.isLocked}get isLocked(){return document.pointerLockElement===this.canvas}requestLock(){if(this.isLocked)return;let e;try{e=this.canvas.requestPointerLock()}catch{this.markLockFailed();return}e&&typeof e.catch=="function"&&e.catch(()=>this.markLockFailed())}markLockFailed(){this.lockFailed=!0,this.onLockStateChange?.(!1,!0)}releaseLock(){this.isLocked&&document.exitPointerLock()}setSensitivity(e){this.sensitivity=e}setInvertY(e){this.invertY=e}consumePause(){const e=this.pausePressed;return this.pausePressed=!1,e}consumeRestart(){const e=this.restartPressed;return this.restartPressed=!1,e}consumeDebugToggle(){const e=this.debugPressed;return this.debugPressed=!1,e}consumeMuteToggle(){const e=this.mutePressed;return this.mutePressed=!1,e}release(){this.held.clear(),this.fireHeld=!1,$f(this.actions),this.peer&&this.peer.movementActive&&this.peer.writeMovement(),this.syncFire(),this.dragging=!1,this.dragX=0,this.dragY=0,this.pausePressed=!1,this.restartPressed=!1,this.debugPressed=!1,this.mutePressed=!1}dispose(){this.disposed||(this.disposed=!0,this.release(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVisibility),document.removeEventListener("pointerlockchange",this.onPointerLock),document.removeEventListener("pointerlockerror",this.onPointerLockError),document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mouseup",this.onMouseUp))}get movementActive(){for(const e of Kf)if(this.held.has(e))return!0;return!1}get fireActive(){return this.fireHeld}writeMovement(){const e=this.actions,t=(this.held.has("KeyW")?1:0)+(this.held.has("ArrowUp")?1:0),n=(this.held.has("KeyS")?1:0)+(this.held.has("ArrowDown")?1:0),s=(this.held.has("KeyA")?1:0)+(this.held.has("ArrowLeft")?1:0),r=(this.held.has("KeyD")?1:0)+(this.held.has("ArrowRight")?1:0);e.moveZ=Vn(t-n,-1,1),e.moveX=Vn(r-s,-1,1),e.sprint=this.held.has("ShiftLeft")||this.held.has("ShiftRight")}syncMovement(){if(this.actions.interact=this.held.has("KeyE"),this.movementActive){this.writeMovement();return}const e=this.peer;if(e&&e.movementActive){e.writeMovement();return}this.writeMovement()}syncFire(){this.actions.firePrimary=this.fireHeld||!!this.peer?.fireActive}onKeyDown=e=>{if(!(e.repeat&&(e.code==="Escape"||e.code==="KeyR"||e.code==="F3"||e.code==="KeyM"))){switch(e.code){case"Escape":if(this.isLocked)return;this.pausePressed=!0;break;case"KeyR":this.restartPressed=!0;break;case"F3":this.debugPressed=!0,e.preventDefault();break;case"KeyM":this.mutePressed=!0;break}this.held.add(e.code),e.code==="Space"&&e.preventDefault(),this.syncMovement()}};onKeyUp=e=>{this.held.delete(e.code),this.syncMovement()};onBlur=()=>{this.release(),this.onSuspend?.()};onVisibility=()=>{document.hidden&&(this.release(),this.onSuspend?.())};onPointerLock=()=>{const e=this.isLocked;e?(this.hadLock=!0,this.lockFailed=!1):(this.hadLock&&this.release(),this.dragging=!1),this.onLockStateChange?.(e,this.lockFailed)};onPointerLockError=()=>{this.markLockFailed()};onMouseMove=e=>{if(!this.captureEnabled||!this.isLocked&&!this.dragging)return;const t=this.isLocked?e.movementX:e.clientX-this.dragX,n=this.isLocked?e.movementY:e.clientY-this.dragY;this.isLocked||(this.dragX=e.clientX,this.dragY=e.clientY);const s=this.actions;s.yaw-=t*this.sensitivity,s.pitch+=(this.invertY?n:-n)*this.sensitivity,s.pitch=Vn(s.pitch,-lt.pitchLimit,lt.pitchLimit)};onMouseDown=e=>{!this.captureEnabled||e.button!==0||(this.fireHeld=!0,this.syncFire(),this.actions.firePressed=!0,this.isLocked||(this.dragging=!0,this.dragX=e.clientX,this.dragY=e.clientY,this.requestLock()))};onMouseUp=e=>{e.button===0&&(this.fireHeld=!1,this.syncFire(),this.dragging=!1,this.dragX=0,this.dragY=0)}}const zt={stickTravel:54,stickDeadzone:.16,lookSensitivity:.0042,portraitLookSensitivity:.0084,tapSlop:14,tapMaxSeconds:.3};class Qf{actions;zones;now;isPortrait;sensitivity;portraitSensitivity;aimSensitivity;invertY;autoFire;disposed=!1;enabled=!1;movePointer=null;stickCx=0;stickCy=0;stickTravel=zt.stickTravel;rawX=0;rawY=0;outX=0;outZ=0;aimPointer=null;aimX=0;aimY=0;aimDownAt=0;aimTravel=0;aimDragging=!1;pausePressed=!1;pauseClickPending=!1;sprintOn=!1;latchedFire=!1;autoFireHeld=!1;peer=null;onStickChange=null;onSprintChange=null;constructor(e,t,n={}){this.zones=e,this.actions=t,this.sensitivity=n.sensitivity??zt.lookSensitivity,this.portraitSensitivity=n.portraitSensitivity??this.sensitivity*(zt.portraitLookSensitivity/zt.lookSensitivity),this.aimSensitivity=this.sensitivity,this.invertY=n.invertY??!1,this.autoFire=n.autoFire??!1,this.now=n.now??(()=>performance.now()),this.isPortrait=n.isPortrait??(()=>window.innerHeight>window.innerWidth),e.stick.addEventListener("pointerdown",this.onStickDown),e.aim.addEventListener("pointerdown",this.onAimDown),e.pause.addEventListener("pointerdown",this.onPauseDown),e.sprint.addEventListener("pointerdown",this.onSprintDown),window.addEventListener("pointerdown",this.onAnyPointerDown,!0),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerCancel),window.addEventListener("lostpointercapture",this.onPointerCancel),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVisibility)}setEnabled(e){this.enabled!==e&&(this.enabled=e,e||this.release())}get isEnabled(){return this.enabled}setSensitivity(e){this.sensitivity=e,this.portraitSensitivity=e*(zt.portraitLookSensitivity/zt.lookSensitivity)}setInvertY(e){this.invertY=e}setAutoFire(e){this.autoFire!==e&&(this.autoFire=e,e?this.aimPointer!==null&&this.holdAutoFire():this.releaseAutoFire())}holdAutoFire(){this.autoFireHeld||(this.autoFireHeld=!0,this.syncFire())}releaseAutoFire(){this.autoFireHeld&&(this.autoFireHeld=!1,this.syncFire())}syncFire(){this.actions.firePrimary=this.autoFireHeld||!!this.peer?.fireActive}consumePause(){const e=this.pausePressed;return this.pausePressed=!1,e}consumePauseClickSuppression(){const e=this.pauseClickPending;return this.pauseClickPending=!1,e}acknowledgeFireLatch(){this.actions.firePressed||(this.latchedFire=!1)}get movementActive(){return this.movePointer!==null}get fireActive(){return this.autoFireHeld}writeMovement(){this.actions.moveX=this.outX,this.actions.moveZ=this.outZ,this.actions.sprint=this.sprintOn}applyMovement(){if(this.movementActive){this.writeMovement();return}const e=this.peer;if(e&&e.movementActive){e.writeMovement();return}this.actions.moveX=0,this.actions.moveZ=0,this.actions.sprint=this.sprintOn}release(){this.movePointer=null,this.aimPointer=null,this.rawX=0,this.rawY=0,this.outX=0,this.outZ=0,this.aimTravel=0,this.aimDragging=!1,this.pausePressed=!1,this.sprintOn&&(this.sprintOn=!1,this.onSprintChange?.(!1)),this.latchedFire&&(this.actions.firePressed=!1,this.latchedFire=!1),this.releaseAutoFire(),this.applyMovement(),this.onStickChange?.(0,0,!1)}handleViewportChange(){this.stickCx=0,this.stickCy=0,this.stickTravel=zt.stickTravel,this.release()}dispose(){this.disposed||(this.disposed=!0,this.release(),this.zones.stick.removeEventListener("pointerdown",this.onStickDown),this.zones.aim.removeEventListener("pointerdown",this.onAimDown),this.zones.pause.removeEventListener("pointerdown",this.onPauseDown),this.zones.sprint.removeEventListener("pointerdown",this.onSprintDown),window.removeEventListener("pointerdown",this.onAnyPointerDown,!0),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),window.removeEventListener("lostpointercapture",this.onPointerCancel),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVisibility))}state(){return{movePointer:this.movePointer,aimPointer:this.aimPointer,stickX:+this.rawX.toFixed(4),stickY:+this.rawY.toFixed(4),moveX:+this.outX.toFixed(4),moveZ:+this.outZ.toFixed(4),aiming:this.aimDragging,sprint:this.sprintOn,autoFire:this.autoFire,autoFiring:this.autoFireHeld}}stamp(e){return e.timeStamp>0?e.timeStamp:this.now()}owns(e){return this.enabled&&e.pointerType!=="mouse"}claim(e){e.cancelable&&e.preventDefault();const t=e.currentTarget;try{t?.setPointerCapture?.(e.pointerId)}catch{}}onStickDown=e=>{if(!this.owns(e)||this.movePointer!==null)return;this.claim(e),this.movePointer=e.pointerId;const t=this.zones.stick.getBoundingClientRect();this.stickCx=t.left+t.width/2,this.stickCy=t.top+t.height/2,this.stickTravel=t.width>0?t.width/2:zt.stickTravel,this.updateStick(e.clientX,e.clientY)};onAimDown=e=>{!this.owns(e)||this.aimPointer!==null||(this.claim(e),this.aimPointer=e.pointerId,this.aimX=e.clientX,this.aimY=e.clientY,this.aimDownAt=this.stamp(e),this.aimTravel=0,this.aimDragging=!1,this.aimSensitivity=this.isPortrait()?this.portraitSensitivity:this.sensitivity,this.autoFire&&this.holdAutoFire())};onPauseDown=e=>{e.cancelable&&e.preventDefault(),this.pausePressed=!0,this.pauseClickPending=!0};onAnyPointerDown=()=>{this.pauseClickPending=!1};onSprintDown=e=>{this.enabled&&(e.cancelable&&e.preventDefault(),this.sprintOn=!this.sprintOn,this.onSprintChange?.(this.sprintOn),this.applyMovement())};onPointerMove=e=>{if(!this.enabled)return;if(e.pointerId===this.movePointer){this.updateStick(e.clientX,e.clientY);return}if(e.pointerId!==this.aimPointer)return;const t=e.clientX-this.aimX,n=e.clientY-this.aimY;this.aimX=e.clientX,this.aimY=e.clientY;const s=Math.hypot(t,n);this.aimTravel+=s;let r=1;if(!this.aimDragging){if(this.aimTravel<=zt.tapSlop)return;this.aimDragging=!0,r=s>0?(this.aimTravel-zt.tapSlop)/s:0}const a=this.actions;a.yaw-=t*r*this.aimSensitivity,a.pitch+=(this.invertY?n:-n)*r*this.aimSensitivity,a.pitch=Vn(a.pitch,-lt.pitchLimit,lt.pitchLimit)};onPointerUp=e=>{if(e.pointerId===this.movePointer){this.endStick();return}if(e.pointerId!==this.aimPointer)return;this.aimPointer=null,this.releaseAutoFire();const t=(this.stamp(e)-this.aimDownAt)/1e3,n=this.enabled&&!this.aimDragging&&this.aimTravel<=zt.tapSlop&&t<=zt.tapMaxSeconds;this.aimTravel=0,this.aimDragging=!1,n&&(this.autoFire||this.actions.firePressed||(this.actions.firePressed=!0,this.latchedFire=!0))};onPointerCancel=e=>{if(e.pointerId===this.movePointer){this.endStick();return}e.pointerId===this.aimPointer&&(this.aimPointer=null,this.releaseAutoFire(),this.aimTravel=0,this.aimDragging=!1)};onBlur=()=>{this.release()};onVisibility=()=>{document.hidden&&this.release()};updateStick(e,t){const n=Math.max(1,this.stickTravel);let s=(e-this.stickCx)/n,r=(t-this.stickCy)/n;const a=Math.hypot(s,r);a>1&&(s/=a,r/=a),this.rawX=s,this.rawY=r;const o=Math.min(1,a);if(o<=zt.stickDeadzone)this.outX=0,this.outZ=0;else{const l=(o-zt.stickDeadzone)/(1-zt.stickDeadzone)/o;this.outX=s*l||0,this.outZ=-r*l||0}this.applyMovement(),this.onStickChange?.(this.rawX,this.rawY,!0)}endStick(){this.movePointer=null,this.rawX=0,this.rawY=0,this.outX=0,this.outZ=0,this.applyMovement(),this.onStickChange?.(0,0,!1)}}function jf(i){let e=1779033703^i.length;for(let t=0;t<i.length;t++)e=Math.imul(e^i.charCodeAt(t),3432918353),e=e<<13|e>>>19;return function(){return e=Math.imul(e^e>>>16,2246822507),e=Math.imul(e^e>>>13,3266489909),e^=e>>>16,e>>>0}}function ep(i,e,t,n){return function(){i>>>=0,e>>>=0,t>>>=0,n>>>=0;let r=i+e|0;return i=e^e>>>9,e=t+(t<<3)|0,t=t<<21|t>>>11,n=n+1|0,r=r+n|0,t=t+r|0,(r>>>0)/4294967296}}function Vt(i,e){const t=jf(`${i}:${e}`),n=ep(t(),t(),t(),t());for(let s=0;s<12;s++)n();return n}function we(i,e,t){return e+(t-e)*i()}function Go(i,e,t){return e+Math.floor(i()*(t-e))}function br(i,e){if(e.length===0)throw new Error("pick() called with an empty array");return e[Math.min(e.length-1,Math.floor(i()*e.length))]}const Fc="abcdefghijklmnopqrstuvwxyz0123456789";function tp(){let i="";for(let e=0;e<8;e++)i+=Fc[Math.floor(Math.random()*Fc.length)];return i}function Uc(i){const e=(i??"").trim().toLowerCase();return e.length>0?e.slice(0,32):tp()}const vr={entry:{key:"entry",width:[13,17],depth:[12,16],ceiling:[4.2,4.6],columns:[0,0],tanks:[1,2],crates:[2,4],consoles:[1,2],threatDensity:0,waves:[0,0],labels:["DECONTAMINATION","AIRLOCK","QUARANTINE ENTRY"],deepLabels:["DECONTAMINATION","AIRLOCK","QUARANTINE ENTRY"]},corridor:{key:"corridor",width:[6,8],depth:[16,26],long:[16,26],narrow:[6,8],ceiling:[3.8,4.2],columns:[0,0],tanks:[0,0],crates:[0,2],consoles:[0,2],threatDensity:0,waves:[0,0],labels:["SERVICE RUN","TRANSIT CORRIDOR","ACCESS SPUR"],deepLabels:["SEALED SPUR","FLOODED RUN","UNLOGGED ACCESS"]},junction:{key:"junction",width:[11,14],depth:[11,14],ceiling:[4.4,5],columns:[1,1],tanks:[0,1],crates:[1,3],consoles:[1,2],threatDensity:0,waves:[0,0],labels:["SECTOR JUNCTION","CONTROL NODE","DISTRIBUTION HUB"],deepLabels:["DARK NODE","ABANDONED CONTROL","SILENT HUB"]},gallery:{key:"gallery",width:[9,12],depth:[17,23],long:[17,23],narrow:[9,12],ceiling:[4.2,4.8],columns:[0,0],tanks:[1,2],crates:[0,2],consoles:[2,4],threatDensity:0,waves:[0,0],labels:["OBSERVATION RUN","VIEWING GALLERY","SPECIMEN WALK"],deepLabels:["EMPTY GALLERY","BLIND OBSERVATION","WATCH ROOM"]},lab:{key:"lab",width:[15,19],depth:[15,18],ceiling:[4,4.6],columns:[0,1],tanks:[2,3],crates:[3,6],consoles:[2,4],threatDensity:2.6,waves:[1,2],labels:["CULTURE VAULT","ASSAY LAB","SEQUENCING SUITE","INCUBATION BAY"],deepLabels:["SUBJECT ANNEX","CULTURE OVERFLOW","UNLOGGED ASSAY"]},storage:{key:"storage",width:[17,22],depth:[15,18],ceiling:[3.6,4],columns:[0,1],tanks:[0,1],crates:[6,10],consoles:[0,1],threatDensity:2.4,waves:[1,2],labels:["SUPPLY HOLD","CRATE STORE","MATERIEL BAY","COLD STORE"],deepLabels:["SPOILED STORE","CONDEMNED HOLD","OVERFLOW STACK"]},containment:{key:"containment",width:[20,26],depth:[20,28],ceiling:[4.6,5.4],columns:[2,3],tanks:[3,5],crates:[3,6],consoles:[2,4],threatDensity:2.2,waves:[2,3],labels:["CONTAINMENT BAY","SPECIMEN HOLD","ISOLATION WARD","HOLDING PEN"],deepLabels:["BREACHED HOLD","EMPTY PENS","RELEASE WARD"]},reactor:{key:"reactor",width:[22,28],depth:[18,24],ceiling:[5.2,6],columns:[3,4],tanks:[1,2],crates:[1,3],consoles:[3,5],threatDensity:3,waves:[2,3],labels:["COOLANT PLANT","POWER SPINE","THERMAL VAULT"],deepLabels:["RUNAWAY PLANT","THERMAL BREACH","DEAD SPINE"]},chamber:{key:"chamber",width:[24,30],depth:[24,30],ceiling:[5.2,6],columns:[3,4],tanks:[4,6],crates:[2,5],consoles:[2,3],threatDensity:2.8,waves:[3,3],labels:["PRIMARY CONTAINMENT","REACTOR VAULT","CORE CHAMBER"],deepLabels:["PRIMARY BREACH","ORIGIN CHAMBER","CORE — OPEN"]}},Fu=["lab","storage"],Uu=["containment","reactor"],np=["corridor","junction"],ip=["corridor","junction","gallery"];[...Fu,...Uu];function Oc(i){return i?Uu:Fu}function sp(i){return i?ip:np}function rp(i){return vr[i].threatDensity>0}function Ho(i,e,t){let n,s;if(i.long&&i.narrow){const a=Math.round(we(e,i.long[0],i.long[1])),o=Math.round(we(e,i.narrow[0],i.narrow[1]));n=t===0?a:o,s=t===0?o:a}else n=Math.round(we(e,i.width[0],i.width[1])),s=Math.round(we(e,i.depth[0],i.depth[1]));const r=Math.round(we(e,i.ceiling[0],i.ceiling[1])*4)/4;return{width:n,depth:s,ceiling:r}}function tr(i,e){return i[1]<=i[0]?i[0]:Go(e,i[0],i[1]+1)}const ap=8,op=10,lp=1,cp=3,hp=12,up=.5;function dp(i){const e=[],t=[],n=(g,v,m)=>{const p={id:e.length,archetype:g,depth:v<0?0:e[v].depth+1,critical:m,parent:v,children:[]};return e.push(p),v>=0&&(e[v].children.push(p.id),t.push({a:v,b:p.id,critical:m})),p},s=n("entry",-1,!0),r=[s.id],a=Go(i,ap-2,op-1);let o=s.id,l=!0;const c=Math.ceil(a*up);for(let g=0;g<a;g++){const v=g>=c,m=l?br(i,sp(v)):br(i,Oc(v)),p=n(m,o,!0);r.push(p.id),o=p.id,l=!l}const h=n("chamber",o,!0);r.push(h.id);const d=r.filter(g=>{const v=e[g];return!rp(v.archetype)&&v.archetype!=="entry"}),u=Go(i,lp,cp+1),f=new Set;for(let g=0;g<u&&e.length<hp&&d.length!==0;g++){let v=-1;for(let m=0;m<6;m++){const p=br(i,d);if(!f.has(p)){v=p;break}}v<0||(f.add(v),n(br(i,Oc(e[v].depth>c)),v,!1))}return{nodes:e,edges:t,startId:s.id,finalId:h.id,criticalPath:r}}const On=.5,on=On*3,fp=3,Pa=1.6,Wl=3.2,pp=1.2,Fn=.5,wr=4,Ji=.55,ci=.3,Bc=.34,mp=.13,kc=.07,gp=5,zc=9,Ln=1.3,Ou=2.4,Bu=3,vp=1.7,Vc=1.2,ku=.72,xp=2.05,_p=.35,rt=ku*2+_p,Ii=3.54,zu=3.19,Wn=[0,1,0,1],Us=[-1,1,1,-1];function Vu(i){return(i+2)%4}const Mp=[0,2,-2,4,-4,7,-7,11,-11],Gc=2,Gu=.01;function yp(i,e,t){return i.minX<e.maxX+t&&e.minX<i.maxX+t&&i.minZ<e.maxZ+t&&e.minZ<i.maxZ+t}function Hc(i,e){const t=e.slice();for(let n=t.length-1;n>0;n--){const s=Math.floor(i()*(n+1)),r=t[n];t[n]=t[s],t[s]=r}return t}function Sp(i,e){const t=[0,1,2,3];if(e===-1)return Hc(i,t);const n=e,s=Vu(e),r=Hc(i,t.filter(a=>a!==n&&a!==s));return i()<.45?[n,r[0],r[1],s]:[r[0],n,r[1],s]}function Hu(i,e,t){const n=t===0?i.minX:i.minZ,s=t===0?i.maxX:i.maxZ,r=t===0?e.minX:e.minZ,a=t===0?e.maxX:e.maxZ;return{lo:Math.max(n,r),hi:Math.min(s,a)}}const _a=(Pa+pp)*2;function Wu(i,e,t,n,s){for(const r of i)if(!(r.a!==e&&r.b!==e&&r.a!==t&&r.b!==t)&&Math.abs(r.x-n)<_a&&Math.abs(r.z-s)<_a)return!0;return!1}function Ep(i,e){const t=[],n=[],s=new Map,a={rooms:t,doors:n,byId:s,incoming:new Map,nextConnectionId:0},o=i.nodes[i.startId],l=Ho(vr[o.archetype],e,1),c={id:o.id,archetype:o.archetype,depth:o.depth,critical:o.critical,minX:-Math.floor(l.width/2),maxX:-Math.floor(l.width/2)+l.width,minZ:-Math.floor(l.depth/2),maxZ:-Math.floor(l.depth/2)+l.depth,ceiling:l.ceiling};t.push(c),s.set(c.id,c);for(let h=1;h<i.criticalPath.length;h++){const d=i.criticalPath[h],u=i.nodes[d];if(!Wc(a,u,u.parent,e))return null}for(const h of i.nodes)h.critical||s.has(h.id)||h.parent<0||!s.has(h.parent)||Wc(a,h,h.parent,e);return bp(t,n,e),{rooms:t,doors:n}}function Wc(i,e,t,n){const s=i.byId.get(t);if(!s)return!1;const r=vr[e.archetype],a=Ho(r,n,0),o=Ho(r,n,1),l=Sp(n,i.incoming.get(t)??-1);for(const c of l){const h=c===0||c===2?o:a,d=c===0||c===2?0:1,u=d===0?(s.minX+s.maxX)/2:(s.minZ+s.maxZ)/2;for(const f of Mp){const g=Math.round(u+f),v=h.width/2,m=h.depth/2;let p,y;c===0?(y=s.minZ-on-h.depth,p=g-v):c===2?(y=s.maxZ+on,p=g-v):c===1?(p=s.maxX+on,y=g-m):(p=s.minX-on-h.width,y=g-m);const w={id:e.id,archetype:e.archetype,depth:e.depth,critical:e.critical,minX:p,maxX:p+h.width,minZ:y,maxZ:y+h.depth,ceiling:h.ceiling};let M=!0;for(const E of i.rooms)if(E.id!==t&&yp(w,E,on-Gu)){M=!1;break}if(!M)continue;const T=Hu(s,w,d);if(T.hi-T.lo<_a)continue;const b=Math.round((T.lo+T.hi)/2*2)/2,A=d===0?b:c===1?s.maxX+on/2:s.minX-on/2,_=d===0?c===0?s.minZ-on/2:s.maxZ+on/2:b;if(!Wu(i.doors,t,e.id,A,_))return i.rooms.push(w),i.byId.set(w.id,w),i.doors.push({connectionId:i.nextConnectionId++,a:t,b:e.id,sideA:c,x:A,z:_,halfWidth:Pa,height:Math.min(Wl,Math.min(s.ceiling,w.ceiling)-.8),critical:e.critical,loop:!1}),i.incoming.set(e.id,c),!0}}return!1}function bp(i,e,t){const n=new Set;for(const a of e)n.add(a.a<a.b?`${a.a}:${a.b}`:`${a.b}:${a.a}`);let s=e.length,r=0;for(let a=0;a<i.length&&r<Gc;a++)for(let o=a+1;o<i.length&&r<Gc;o++){const l=i[a],c=i[o];if(!n.has(`${l.id}:${c.id}`)&&!(we(t,0,1)>.55))for(const h of[0,1,2,3]){const d=h===0||h===2?0:1;let u;if(h===0?u=l.minZ-c.maxZ:h===2?u=c.minZ-l.maxZ:h===1?u=c.minX-l.maxX:u=l.minX-c.maxX,u<on-Gu||u>fp)continue;const f=Hu(l,c,d);if(f.hi-f.lo<_a)continue;const g=Math.round((f.lo+f.hi)/2*2)/2,v=d===0?g:h===1?l.maxX+u/2:l.minX-u/2,m=d===0?h===0?l.minZ-u/2:l.maxZ+u/2:g;if(!Wu(e,l.id,c.id,v,m)){e.push({connectionId:s++,a:l.id,b:c.id,sideA:h,x:v,z:m,halfWidth:Pa,height:Math.min(Wl,Math.min(l.ceiling,c.ceiling)-.8),critical:!1,loop:!0}),n.add(`${l.id}:${c.id}`),r++;break}}}}const wp=ku,Tp=xp,Ap=2,Rp=3,gi={strangeLabels:.45,breachedTankChance:.72,beaconsMin:0,beaconsMax:2,emergencyFixture:.55,emergencyIntensity:13,spotsPerIntake:3};function cr(i,e,t,n,s,r,a,o){return{minX:i,minY:e,minZ:t,maxX:n,maxY:s,maxZ:r,kind:a,surface:o}}function dt(i,e,t,n,s,r,a,o){return cr(i-n/2,e-s/2,t-r/2,i+n/2,e+s/2,t+r/2,a,o)}function ut(i,e,t,n,s,r,a,o,l,c){n-t<1e-4||r-s<1e-4||o-a<1e-4||(e===0?i.push(cr(t,s,a,n,r,o,l,c)):i.push(cr(a,s,t,o,r,n,l,c)))}function Os(i,e){switch(e){case 0:return i.minZ;case 1:return i.maxX;case 2:return i.maxZ;default:return i.minX}}function Xl(i,e){return Wn[e]===0?{lo:i.minX,hi:i.maxX}:{lo:i.minZ,hi:i.maxZ}}function Ia(i,e,t,n,s){for(const r of i)if(!(n<=r.minX||e>=r.maxX)&&!(s<=r.minZ||t>=r.maxZ))return!0;return!1}function hr(i,e,t,n){const s=i-e-t,r=n-(i+e);return s>0&&s<rt?t+e:r>0&&r<rt?n-e:i}function La(i,e,t,n,s,r){for(const a of i)if(!(a.kind!=="prop"||a.minY>.35||a.maxY<=.05)&&!(n+r<=a.minX||e-r>=a.maxX)&&!(s+r<=a.minZ||t-r>=a.maxZ))return!0;return!1}function Ha(i,e,t,n=wp,s=Tp){for(let r=0;r<i.length;r++){const a=i[r];if(a.kind==="floor"||a.kind==="ceiling"||a.minY>=s||a.maxY<=.05)continue;const o=Math.max(a.minX,Math.min(e,a.maxX)),l=Math.max(a.minZ,Math.min(t,a.maxZ)),c=o-e,h=l-t;if(c*c+h*h<n*n)return a}}function Cp(i,e,t,n){const s=On,r=Wn[t],a=Us[t],o=Os(e,t),l=a<0?o-s:o,c=a<0?o:o+s,h=Xl(e,t),d=h.lo-s,u=h.hi+s,f=n.slice().sort((v,m)=>v.lo-m.lo);let g=d;for(const v of f)ut(i,r,g,v.lo,0,e.ceiling,l,c,"wall","wallPanel"),ut(i,r,v.lo,v.hi,v.height,e.ceiling,l,c,"wall","wallPanel"),g=Math.max(g,v.hi);ut(i,r,g,u,0,e.ceiling,l,c,"wall","wallPanel")}function Pp(i,e,t){const n=On,s=Wn[t.sideA],r=[];let a,o;if(s===0?(a=Math.min(i.maxZ,e.maxZ),o=Math.max(i.minZ,e.minZ)):(a=Math.min(i.maxX,e.maxX),o=Math.max(i.minX,e.minX)),o<a){const g=a;a=o,o=g}const l=a+n,c=o-n,h=s===0?t.x:t.z,d=t.halfWidth,u=d+Fn,f=Math.max(i.ceiling,e.ceiling);return ut(r,s,h-u,h+u,-n,0,l,c,"floor","floorPlate"),ut(r,s,h-u,h-d,0,f,l,c,"wall","structure"),ut(r,s,h+d,h+u,0,f,l,c,"wall","structure"),ut(r,s,h-d,h+d,t.height,f,l,c,"wall","structure"),r}function Ip(i,e,t,n){const{layout:s,dressing:r}=n,a=vr[i.archetype],o=On,l=i.ceiling,{minX:c,maxX:h,minZ:d,maxZ:u}=i,f=h-c,g=u-d,v=(c+h)/2,m=(d+u)/2,p=[],y=[],w=[],M=[],T=[],b=[],A=Math.min(1,Math.max(0,n.escalation));p.push(cr(c-o,-o,d-o,h+o,0,u+o,"floor","floorPlate"),cr(c-o,l,d-o,h+o,l+o,u+o,"ceiling","ceilingPanel"));const _=[[],[],[],[]];for(const Q of e){const oe=Wn[Q.side]===0?Q.x:Q.z;_[Q.side].push({lo:oe-Q.halfWidth,hi:oe+Q.halfWidth,height:Q.height}),Xu(M,i,Q.side,oe,Q.halfWidth+.7,2.6),Np(p,i,Q.side,oe,Q.halfWidth,Q.height)}t.budget>0&&Op(i,e,_,M,p,T,n);for(const Q of[0,1,2,3])Cp(p,i,Q,_[Q]);Fp(p,i,_),Up(p,i,_);const E=Math.max(0,Math.round(g/gp)-1);for(let Q=0;Q<E;Q++){const oe=d+g/(E+1)*(Q+1);p.push(dt(v,l-.18,oe,f,.36,.55,"ceiling","structure"))}const C=Math.max(1,Math.min(3,Math.round(f/zc))),P=Math.max(1,Math.min(4,Math.round(g/zc))),L=Math.max(1.4,Math.min(2.9,f/C-1.4)),W=C*P,X=t.budget<=0&&W>=2&&A>=gi.emergencyFixture?Math.floor(r()*W):-1;for(let Q=0;Q<C;Q++)for(let oe=0;oe<P;oe++){const ke=c+f/(C+1)*(Q+1),$e=d+g/(P+1)*(oe+1),Ve=Q*P+oe===X;p.push(dt(ke,l-.13,$e,L,.26,1.05,"ceiling","machineDark"),dt(ke,l-.28,$e,L-.3,.08,.78,"ceiling",Ve?"emergency":"lamp")),w.push({x:ke,y:l-.5,z:$e,color:Ve?14173484:12572904,intensity:Ve?gi.emergencyIntensity:34,distance:Math.max(16,Math.min(28,Math.max(f,g)*1.1))})}f>9&&y.push({kind:"pipeRun",x:c+1.15,y:l-.62,z:m,yaw:0,scale:1,variant:.3,length:g-1},{kind:"pipeRun",x:h-1.15,y:l-.62,z:m,yaw:0,scale:1,variant:.7,length:g-1});const O=Math.round(gi.beaconsMin+(gi.beaconsMax-gi.beaconsMin)*A);for(let Q=0;Q<O;Q++){const oe=Q%2===0?-1:1,ke=v+oe*(f/2-.6),$e=m+(Q<2?0:(r()-.5)*g*.5);y.push({kind:"beacon",x:ke,y:l-1,z:$e,yaw:0,scale:1.2,variant:r()}),w.push({x:ke,y:l-1.2,z:$e,color:14173484,intensity:6,distance:9})}const H=M.slice();i.archetype==="entry"&&H.push({minX:v-3,minZ:m-3,maxX:v+3,maxZ:m+3});const F=t.anchored&&n.anchorKind?Lp(i,e,n.anchorKind):null;F&&(H.push({minX:F.x-Ii,minZ:F.z-Ii,maxX:F.x+Ii,maxZ:F.z+Ii}),F.kind==="containmentMachine"&&kp(p,y,i,F)),zp(p,i,H,tr(a.columns,s),s),Vp(p,y,b,i,H,tr(a.tanks,r),A,r),Hp(p,y,i,H,tr(a.consoles,r),r),Wp(p,i,H,tr(a.crates,r),r),Gp(b,i,T,A,r),F&&b.push({x:F.x,z:F.z,radius:Ii*.62,coverage:we(r,.4,.55),brightness:we(r,.3,.44),variant:r()});for(const Q of T){if(Ha(p,Q.x,Q.z))throw new Error(`Enemy entrance origin blocked at (${Q.x}, ${Q.z}) in room ${i.id}`);if(Ha(p,Q.entryX,Q.entryZ))throw new Error(`Enemy entrance handoff blocked at (${Q.entryX}, ${Q.entryZ}) in room ${i.id}`)}if(F&&Ha(p,F.x,F.z,Ii,zu))throw new Error(`Anchor blocked at (${F.x}, ${F.z}) in room ${i.id}`);const q=A>=gi.strangeLabels?a.deepLabels:a.labels,ee=q[Math.floor(s()*q.length)%q.length],ie=1+Math.floor(s()*89);return{id:i.id,name:`${ee} ${String(ie).padStart(2,"0")}`,archetype:i.archetype,depth:i.depth,escalation:A,critical:i.critical,minX:c,maxX:h,minZ:d,maxZ:u,floorY:0,ceilY:l,brushes:p,props:y,lights:w,contamination:b,doorways:e.slice(),enemySpawns:T,anchor:F,encounter:t}}function Lp(i,e,t){const n=(i.minX+i.maxX)/2,s=(i.minZ+i.maxZ)/2,r=e[0];if(!r)return{kind:t,x:n,z:s,yaw:0};const a=Dp(i,r);return{kind:t,x:n,z:s,yaw:Math.atan2(-(a.x-n),-(a.z-s))}}function Dp(i,e){switch(e.side){case 0:return{x:e.x,z:i.minZ};case 1:return{x:i.maxX,z:e.z};case 2:return{x:e.x,z:i.maxZ};default:return{x:i.minX,z:e.z}}}function Xu(i,e,t,n,s,r){const a=Us[t],o=Os(e,t),l=a<0?o:o-r;Wn[t]===0?i.push({minX:n-s,maxX:n+s,minZ:l,maxZ:l+r}):i.push({minX:l,maxX:l+r,minZ:n-s,maxZ:n+s})}function Np(i,e,t,n,s,r){const a=Wn[t],o=Us[t],l=Os(e,t),c=.35,h=o<0?l:l-c,d=o<0?l+c:l,u=s+Fn;ut(i,a,n-u,n-s,0,r+Fn,h,d,"wall","structure"),ut(i,a,n+s,n+u,0,r+Fn,h,d,"wall","structure"),ut(i,a,n-u,n+u,r,r+Fn,h,d,"wall","structure");const f=o<0?d:h-.06;ut(i,a,n-u,n+u,r+.12,r+Fn-.12,f,f+.06,"wall","hazard")}function Fp(i,e,t){const n=e.ceiling,s=(a,o)=>{for(const l of t[a])if(o>l.lo-Ji-Fn&&o<l.hi+Ji+Fn)return!1;return!0},r=(a,o)=>{const l=o-a,c=Math.floor((l-wr)/wr);if(c<0)return[];const h=[],d=(l-wr)/Math.max(1,c);for(let u=0;u<=c;u++)h.push(a+wr*.5+u*d);return h};for(const a of r(e.minZ,e.maxZ))s(3,a)&&i.push(dt(e.minX+ci/2,n/2,a,ci,n,Ji,"wall","structure")),s(1,a)&&i.push(dt(e.maxX-ci/2,n/2,a,ci,n,Ji,"wall","structure"));for(const a of r(e.minX,e.maxX))s(0,a)&&i.push(dt(a,n/2,e.minZ+ci/2,Ji,n,ci,"wall","structure")),s(2,a)&&i.push(dt(a,n/2,e.maxZ-ci/2,Ji,n,ci,"wall","structure"))}function Up(i,e,t){const n=Bc,s=Bc+mp;for(const r of[0,1,2,3]){const a=Wn[r],o=Us[r],l=Os(e,r),c=o<0?l:l-kc,h=o<0?l+kc:l,d=Xl(e,r),u=t[r].slice().sort((g,v)=>g.lo-v.lo);let f=d.lo;for(const g of u){const v=Math.min(g.lo-Fn,d.hi);v-f>=.2&&ut(i,a,f,v,n,s,c,h,"wall","emissive"),f=Math.max(f,g.hi+Fn)}d.hi-f>=.2&&ut(i,a,f,d.hi,n,s,c,h,"wall","emissive")}}function Op(i,e,t,n,s,r,a){const o=On,l=Math.floor(a.layout()*4);for(let c=0;c<4&&r.length<Rp;c++){const h=(l+c)%4,d=Wn[h],u=Us[h],f=Os(i,h),g=Xl(i,h),v=(g.lo+g.hi)/2,m=(g.hi-g.lo)/4,p=[v,v-m,v+m];let y=Number.NaN;for(const b of p){const A=Math.round(b*2)/2;if(A-Ln<g.lo+1||A+Ln>g.hi-1)continue;let _=!1;for(const q of t[h])if(A+Ln+1.2>q.lo&&A-Ln-1.2<q.hi){_=!0;break}for(const q of e){if(_)break;if(Wn[q.side]===d)continue;const ee=d===0?q.z:q.x,ie=d===0?q.x:q.z;Math.abs(ee-f)<4&&Math.abs(ie-A)<4&&(_=!0)}if(_)continue;const E=f+u*(o+Bu),C=Math.min(f,E),P=Math.max(f,E),L=A-Ln-o,W=A+Ln+o,X=d===0?L:C,O=d===0?W:P,H=d===0?C:L,F=d===0?P:W;if(a.isFree(X,H,O,F)){a.reserve(X,H,O,F),y=A;break}}if(Number.isNaN(y))continue;t[h].push({lo:y-Ln,hi:y+Ln,height:Ou}),Xu(n,i,h,y,Ln+.7,Vc+1.4),Bp(s,i,h,y);const w=f+u*(o+vp),M=f-u*Vc,T=h===0?Math.PI:h===2?0:h===1?Math.PI/2:-Math.PI/2;r.push(d===0?{x:y,z:w,yaw:T,entryX:y,entryZ:M}:{x:w,z:y,yaw:T,entryX:M,entryZ:y})}}function Bp(i,e,t,n){const s=On,r=Wn[t],a=Us[t],o=Os(e,t),l=o+a*s,c=o+a*(s+Bu),h=Math.min(l,c),d=Math.max(l,c),u=Ln,f=Ou;ut(i,r,n-u,n+u,-s,0,h,d,"floor","floorPlate"),ut(i,r,n-u,n+u,f,f+s,h,d,"ceiling","structure"),ut(i,r,n-u-s,n-u,0,f,h,d,"wall","machineDark"),ut(i,r,n+u,n+u+s,0,f,h,d,"wall","machineDark");const g=a<0?h:d-s;ut(i,r,n-u,n+u,0,f,g,g+s,"wall","machineDark");const v=a<0?h+s:d-s-.05;ut(i,r,n-u+.3,n+u-.3,.5,f-.5,v,v+.05,"wall","emissive");const m=a<0?o:o-.3,p=a<0?o+.3:o;ut(i,r,n-u-.35,n-u,0,f+.35,m,p,"wall","structure"),ut(i,r,n+u,n+u+.35,0,f+.35,m,p,"wall","structure"),ut(i,r,n-u-.35,n+u+.35,f,f+.35,m,p,"wall","structure"),ut(i,r,n-u,n+u,f+.08,f+.27,m,p,"wall","hazard")}function kp(i,e,t,n){e.push({kind:"containmentMachine",x:n.x,y:0,z:n.z,yaw:n.yaw,scale:1,variant:t.depth/10});const s=3.15,r=.42,a=Math.max(3.5,t.ceiling-.65);for(const l of[-1,1])for(const c of[-1,1]){const h=n.x+l*s,d=n.z+c*s;i.push(dt(h,a/2,d,r,a,r,"prop","structure"),dt(h,.42,d,.62,.72,.62,"prop","hazard"))}const o=Math.max(3.35,a-.18);i.push(dt(n.x,o,n.z-s,s*2+r,.3,r,"prop","machineDark"),dt(n.x,o,n.z+s,s*2+r,.3,r,"prop","machineDark"),dt(n.x-s,o,n.z,r,.3,s*2+r,"prop","machineDark"),dt(n.x+s,o,n.z,r,.3,s*2+r,"prop","machineDark"))}function zp(i,e,t,n,s){const r=e.ceiling,a=(e.maxX-e.minX)/2,o=(e.maxZ-e.minZ)/2,l=(e.minX+e.maxX)/2,c=(e.minZ+e.maxZ)/2,h=.75;for(let d=0;d<n;d++){const u=l+(d%2===0?-1:1)*we(s,a*.3,a*.56),f=c+(d<2?-1:1)*we(s,o*.15,o*.55);u-h-e.minX<rt||e.maxX-u-h<rt||f-h-e.minZ<rt||e.maxZ-f-h<rt||Ia(t,u-h-rt,f-h-rt,u+h+rt,f+h+rt)||La(i,u-h,f-h,u+h,f+h,rt)||i.push(dt(u,r/2,f,1.25,r,1.25,"prop","structure"),dt(u,.55,f,1.42,.9,1.42,"prop","hazard"),dt(u,1.06,f,1.5,.12,1.5,"prop","machineDark"))}}function Vp(i,e,t,n,s,r,a,o){const u=n.maxZ-n.minZ,f=a*gi.breachedTankChance;let g=0;for(let v=0;v<r*5&&g<r;v++){const m=v%2===0?-1:1,p=hr(m<0?n.minX+1.9:n.maxX-1.9,1.15,n.minX,n.maxX),y=hr(n.minZ+u*(.14+.72*o()),1.15,n.minZ,n.maxZ);if(p-1.15<n.minX-1e-6||p+1.15>n.maxX+1e-6||y-1.15<n.minZ-1e-6||y+1.15>n.maxZ+1e-6||!ql(n,p,y,1.15)||Ia(s,p-1.15-rt,y-1.15-rt,p+1.15+rt,y+1.15+rt)||La(i,p-1.15,y-1.15,p+1.15,y+1.15,rt))continue;const w=we(o,0,Math.PI),M=o(),T=o()<f;i.push(dt(p,.24,y,1.15*2,.48,1.15*2,"prop","machineDark"),dt(p,.55,y,1.15*2-.25,.1,1.15*2-.25,"prop",T?"machineDark":"emissive"));const b=dt(p,.66+3.05/2,y,.731*2,3.05,.731*2,"prop","glass");b.collisionOnly=!0,i.push(b),e.push({kind:T?"breachedTank":"containmentTank",x:p,y:0,z:y,yaw:w,scale:1,variant:M}),T&&t.push({x:p,z:y,radius:we(o,1.5,2.3),coverage:we(o,.3,.5),brightness:we(o,.3,.46),variant:M}),g++}}function Gp(i,e,t,n,s){const r=Math.round(n*gi.spotsPerIntake);if(!(r<=0))for(const a of t)for(let o=0;o<r;o++){const l=(o+.5)/r,c=a.x+(a.entryX-a.x)*(.55+l*1.1)+we(s,-.7,.7),h=a.z+(a.entryZ-a.z)*(.55+l*1.1)+we(s,-.7,.7);c<e.minX||c>e.maxX||h<e.minZ||h>e.maxZ||i.push({x:c,z:h,radius:we(s,.9,1.9)*(1-l*.4),coverage:we(s,.22,.42)*(1-l*.35),brightness:we(s,.28,.44),variant:s()})}}function Hp(i,e,t,n,s,r){const a=t.maxZ-t.minZ,o=1;let l=0;for(let c=0;c<s*5&&l<s;c++){const h=c%2===0?-1:1,d=h<0?t.minX+.36:t.maxX-.36,u=hr(t.minZ+a*(.12+.76*r()),o,t.minZ,t.maxZ);u-o<t.minZ-1e-6||u+o>t.maxZ+1e-6||ql(t,d,u,o)&&(Ia(n,d-.4-rt,u-o-rt,d+.4+rt,u+o+rt)||La(i,d-.4,u-o,d+.4,u+o,rt)||(i.push(dt(d,.5,u,.72,1,1.9,"prop","machine"),dt(d,1.02,u,.8,.1,2,"prop","machineDark")),e.push({kind:"wallConsole",x:d,y:1.07,z:u,yaw:h<0?Math.PI/2:-Math.PI/2,scale:1,variant:r()}),l++))}}function Wp(i,e,t,n,s){let r=0;for(let a=0;a<n*6&&r<n;a++){const o=we(s,.85,1.25),l=o/2,c=hr(e.minX+l+(e.maxX-e.minX-o)*s(),l,e.minX,e.maxX),h=hr(e.minZ+l+(e.maxZ-e.minZ-o)*s(),l,e.minZ,e.maxZ);c-l<e.minX-1e-6||c+l>e.maxX+1e-6||h-l<e.minZ-1e-6||h+l>e.maxZ+1e-6||ql(e,c,h,l)&&(Ia(t,c-l-rt,h-l-rt,c+l+rt,h+l+rt)||La(i,c-l,h-l,c+l,h+l,rt)||(i.push(dt(c,o/2,h,o,o,o,"prop","machine"),dt(c,o-.06,h,o*1.04,.12,o*1.04,"prop","hazard")),r++))}}function ql(i,e,t,n){const s=[e-n-i.minX,i.maxX-(e+n),t-n-i.minZ,i.maxZ-(t+n)];for(const r of s)if(r>.001&&r<rt)return!1;return!0}const Xp=100,qu=3,qp=.1,Zp=.06,Yp=.45,$p=3,Kp=.055,Jp=.3,Qp={containmentMachine:6,orchestrator:14},jp=6;function em(i,e,t,n=null){if(e.threatDensity<=0)return{budget:0,waveBudget:[],runnerChance:0,heavyChance:0,anchored:!1,anchorThreat:0};const s=n!==null,r=n?Qp[n]:0,a=(i.maxX-i.minX)*(i.maxZ-i.minZ),o=1+i.depth*.11,l=i.critical?1:.85,c=Math.max(qu+r,Math.round(a/Xp*e.threatDensity*o*l*we(t,.92,1.12))),h=Math.max(1,tr(e.waves,t)),d={budget:c,waveBudget:[],runnerChance:Math.min(Yp,qp+i.depth*Zp),heavyChance:Math.min(Jp,Math.max(0,i.depth-$p)*Kp),anchored:s,anchorThreat:r};return Zu(d,h),d}function Zu(i,e){const t=Math.max(Yu(i),i.budget-i.anchorThreat);i.waveBudget=nm(t,e),i.budget=i.anchorThreat+i.waveBudget.reduce((n,s)=>n+s,0)}function Yu(i){return Math.max(i.waveBudget.length,i.anchorThreat>0?jp:qu)}function Xc(i){return i.anchorThreat+Yu(i)}const Qi={min:72,max:88};function tm(i){const e=i.filter(a=>a.budget>0);if(e.length===0)return 0;const t=()=>e.reduce((a,o)=>a+o.budget,0),n=t(),s=n<Qi.min?Qi.min/n:n>Qi.max?Qi.max/n:1;if(s!==1)for(const a of e)a.budget=Math.max(Xc(a),Math.round(a.budget*s));const r=e.length*64;for(let a=0;a<r&&t()>Qi.max;a++){const o=qc(e,l=>l.budget>Xc(l),(l,c)=>c.budget-l.budget);if(!o)break;o.budget-=1}for(let a=0;a<r&&t()<Qi.min;a++){const o=qc(e,()=>!0,(l,c)=>l.budget-c.budget);if(!o)break;o.budget+=1}for(const a of e)Zu(a,a.waveBudget.length);return t()}function qc(i,e,t){let n;for(const s of i)e(s)&&(!n||t(s,n)<0)&&(n=s);return n}function nm(i,e){const t=e*(e+1)/2,n=[];let s=0;for(let r=0;r<e-1;r++){const a=Math.max(1,Math.round(i*(r+1)/t));n.push(a),s+=a}return n.push(Math.max(1,i-s)),n}const im=.05;function Tr(i,e,t,n,s,r){for(const a of i.brushes){if(a.kind==="floor"||a.kind==="ceiling"||r<=a.minY||s>=a.maxY)continue;const o=Math.max(a.minX,Math.min(e,a.maxX)),l=Math.max(a.minZ,Math.min(t,a.maxZ));if((o-e)**2+(l-t)**2<n*n)return!0}return!1}function $u(i,e){const t=[],n=[],s=new Map;for(const f of i.rooms)s.set(f.id,f);const r=new Map;for(const f of i.connections){if(!s.has(f.a)||!s.has(f.b)){t.push(`connection ${f.id} references a missing room`);continue}r.has(f.a)||r.set(f.a,[]),r.has(f.b)||r.set(f.b,[]),r.get(f.a).push(f.b),r.get(f.b).push(f.a)}const a=new Set([i.startRoomId]),o=[i.startRoomId];for(;o.length>0;){const f=o.pop();for(const g of r.get(f)??[])a.has(g)||(a.add(g),o.push(g))}a.has(i.finalRoomId)||t.push("the final chamber is unreachable in the room graph");for(const f of i.rooms)a.has(f.id)||t.push(`room ${f.id} is not connected to the entry`),f.doorways.length===0&&t.push(`room ${f.id} has no doorway`);for(let f=0;f<i.rooms.length;f++)for(let g=f+1;g<i.rooms.length;g++){const v=i.rooms[f],m=i.rooms[g],p=on-.01;v.minX<m.maxX+p&&m.minX<v.maxX+p&&v.minZ<m.maxZ+p&&m.minZ<v.maxZ+p&&t.push(`rooms ${v.id} and ${m.id} overlap`)}const l=s.get(i.startRoomId);l?Tr(l,i.playerSpawn.x,i.playerSpawn.z,e.playerRadius,.05,e.playerHeight)&&t.push("the player spawn is inside collision"):t.push("the entry room is missing");for(const f of i.rooms)if(!(f.encounter.budget<=0)){f.enemySpawns.length<Ap&&t.push(`room ${f.id} fights with only ${f.enemySpawns.length} arrival lane(s)`);for(const g of f.enemySpawns)Tr(f,g.x,g.z,e.enemyRadius,.05,e.enemyHeight)&&t.push(`room ${f.id} has a blocked entrance origin`),Tr(f,g.entryX,g.entryZ,e.enemyRadius,.05,e.enemyHeight)&&t.push(`room ${f.id} has a blocked entrance handoff`);f.encounter.anchored?f.anchor?Tr(f,f.anchor.x,f.anchor.z,Ii,.05,zu)&&t.push(`room ${f.id} has a blocked anchor`):t.push(`room ${f.id} declares an anchored specimen with no anchor`):f.anchor&&t.push(`room ${f.id} has an anchor but no anchored specimen`)}const c=i.nav,h=ws(c,i.playerSpawn.x,i.playerSpawn.z);if(h<0)t.push("the player spawn has no walkable navigation cell");else{const f=new Uint8Array(c.walkable.length),g=Pc(c,h,f),v=gf(c);g<v&&n.push(`${v-g} walkable cells are isolated from the spawn`);for(const m of i.rooms){const p=(m.minX+m.maxX)/2,y=(m.minZ+m.maxZ)/2,w=ws(c,p,y);(w<0||!f[w])&&t.push(`room ${m.id} cannot be walked to from the entry`);for(const M of m.enemySpawns){const T=Cc(c,M.entryX,M.entryZ);(T<0||!f[T])&&t.push(`room ${m.id} has an entrance that cannot reach the player`)}}}const d=Iu(i.rooms,{radius:Math.max(0,e.enemyRadius-im),height:e.enemyHeight}),u=ws(d,i.playerSpawn.x,i.playerSpawn.z);if(u<0)t.push("the largest specimen has no walkable cell at the player spawn");else{const f=new Uint8Array(d.walkable.length);Pc(d,u,f);for(const g of i.rooms){const v=(g.minX+g.maxX)/2,m=(g.minZ+g.maxZ)/2,p=ws(d,v,m);if(p<0||!f[p]){t.push(`room ${g.id} is unreachable by the largest specimen`);continue}for(const y of g.enemySpawns){const w=Cc(d,y.entryX,y.entryZ);(w<0||!f[w])&&t.push(`room ${g.id} has an entrance the largest specimen cannot leave`)}}}return{problems:t,warnings:n}}const sm=12,Zc=[4,6,8];function rm(i){const e=Number.isFinite(i)?Math.max(0,i):0;let t=0;for(const n of Zc){if(e<n)break;t+=1}return t/Zc.length}function am(i,e){const t=e.now??(()=>0),n=e.maxAttempts??sm,s=t();for(let a=0;a<n;a++){const o=om(i,a,e.validation);if(o)return o.report.attempts=a+1,o.report.ms=t()-s,o}const r=dm(i,e.validation);return r.report.attempts=n,r.report.fallback=!0,r.report.ms=t()-s,r}function om(i,e,t){const n=e===0?"":`:${e}`,s=Vt(i,`layout${n}`),r=Vt(i,`dressing${n}`),a=Vt(i,`enemies${n}`),o=dp(s),l=Ep(o,s);if(!l)return null;const c=lm(l,o.startId,o.finalId,o.criticalPath);let h;try{h=Ku(i,c.layout,c.startId,c.finalId,c.criticalPath,{layout:s,dressing:r,enemies:a})}catch{return null}const d=$u(h,t);return d.problems.length>0?null:(h.report.warnings=d.warnings,h)}function lm(i,e,t,n){const s=new Map;i.rooms.forEach((o,l)=>s.set(o.id,l));const r=i.rooms.map((o,l)=>({...o,id:l})),a=i.doors.map((o,l)=>({...o,connectionId:l,a:s.get(o.a),b:s.get(o.b)}));return{layout:{rooms:r,doors:a},startId:s.get(e)??0,finalId:s.get(t)??r.length-1,criticalPath:n.filter(o=>s.has(o)).map(o=>s.get(o))}}function Ku(i,e,t,n,s,r){const a=new Map;for(const E of e.rooms)a.set(E.id,E);const o=e.rooms.map(E=>({minX:E.minX-On,minZ:E.minZ-On,maxX:E.maxX+On,maxZ:E.maxZ+On,owner:E.id})),l=cm(e.rooms,n),c=new Map;for(const E of e.rooms){const C=E.id===n?"orchestrator":E.id===l?"containmentMachine":null;c.set(E.id,em(E,vr[E.archetype],r.enemies,C))}const h=[];for(const E of e.rooms)E.critical&&h.push(c.get(E.id));const d=tm(h),u=[...c.values()].reduce((E,C)=>E+C.budget,0),f=[];for(const E of e.rooms){const C=[];for(const X of e.doors)X.a===E.id?C.push(Yc(X,X.sideA)):X.b===E.id&&C.push(Yc(X,Vu(X.sideA)));const P=c.get(E.id),L=E.id,W={layout:r.layout,dressing:r.dressing,escalation:rm(E.depth),anchorKind:E.id===n?"orchestrator":E.id===l?"containmentMachine":null,isFree(X,O,H,F){for(const q of o)if(q.owner!==L&&!(H<=q.minX||X>=q.maxX)&&!(F<=q.minZ||O>=q.maxZ))return!1;return!0},reserve(X,O,H,F){o.push({minX:X,minZ:O,maxX:H,maxZ:F,owner:-1})}};f.push(Ip(E,C,P,W))}const g=new Map;for(const E of f)g.set(E.id,E);for(const E of e.doors){const C=a.get(E.a),P=a.get(E.b),L=g.get(Math.min(E.a,E.b));for(const W of Pp(C,P,E))L.brushes.push(W)}const v=Iu(f,{radius:mf,height:1.4});let m=Number.POSITIVE_INFINITY,p=Number.POSITIVE_INFINITY,y=Number.NEGATIVE_INFINITY,w=Number.NEGATIVE_INFINITY,M=0,T=0,b=0;const A={};for(const E of f){M+=E.brushes.length,T+=E.contamination.length,E.escalation>b&&(b=E.escalation),A[E.archetype]=(A[E.archetype]??0)+1;for(const C of E.brushes)C.minX<m&&(m=C.minX),C.minZ<p&&(p=C.minZ),C.maxX>y&&(y=C.maxX),C.maxZ>w&&(w=C.maxZ)}const _={seed:i,attempts:1,fallback:!1,rooms:f.length,connections:e.doors.length,loops:e.doors.filter(E=>E.loop).length,brushes:M,threatTotal:u,requiredThreat:d,archetypes:A,escalationPeak:+b.toFixed(3),contamination:T,criticalPath:s.slice(),warnings:[],ms:0};return{seed:i,rooms:f,connections:e.doors.map(E=>({id:E.connectionId,a:E.a,b:E.b,x:E.x,z:E.z,critical:E.critical,loop:E.loop})),startRoomId:t,finalRoomId:n,playerSpawn:hm(g.get(t)),nav:v,report:_,minX:m,maxX:y,minZ:p,maxZ:w}}function cm(i,e){const t=i.find(n=>n.id!==e&&n.critical&&(n.archetype==="containment"||n.archetype==="reactor"));if(!t)throw new Error("Facility has no deep non-final combat room for its machine");return t.id}function Yc(i,e){return{connectionId:i.connectionId,side:e,x:i.x,z:i.z,halfWidth:i.halfWidth,height:i.height}}function hm(i){const e=(i.minX+i.maxX)/2,t=(i.minZ+i.maxZ)/2,n=i.doorways[0];if(!n)return{x:e,z:t,yaw:0};const s=um(i,n);return{x:e,z:t,yaw:Math.atan2(-(s.x-e),-(s.z-t))}}function um(i,e){switch(e.side){case 0:return{x:e.x,z:i.minZ};case 1:return{x:i.maxX,z:e.z};case 2:return{x:e.x,z:i.maxZ};default:return{x:i.minX,z:e.z}}}function dm(i,e){const t=Vt(i,"layout:fallback"),n=Vt(i,"dressing:fallback"),s=Vt(i,"enemies:fallback"),r=[{archetype:"entry",width:14,depth:12,ceiling:4.5},{archetype:"corridor",width:8,depth:18,ceiling:4},{archetype:"lab",width:18,depth:16,ceiling:4.5},{archetype:"junction",width:13,depth:13,ceiling:4.75},{archetype:"storage",width:20,depth:16,ceiling:3.75},{archetype:"gallery",width:10,depth:20,ceiling:4.5},{archetype:"containment",width:22,depth:24,ceiling:5},{archetype:"reactor",width:24,depth:20,ceiling:5.5},{archetype:"chamber",width:26,depth:26,ceiling:5.5}],a=[];let o=r[0].depth/2;for(let u=0;u<r.length;u++){const f=r[u];u>0&&(o=a[u-1].minZ-on),a.push({id:u,archetype:f.archetype,depth:u,critical:!0,minX:-f.width/2,maxX:f.width/2,minZ:o-f.depth,maxZ:o,ceiling:f.ceiling})}const l=[];for(let u=0;u<a.length-1;u++)l.push({connectionId:u,a:u,b:u+1,sideA:0,x:0,z:a[u].minZ-on/2,halfWidth:Pa,height:Wl,critical:!0,loop:!1});const c=a.map(u=>u.id),h=Ku(i,{rooms:a,doors:l},0,a.length-1,c,{layout:t,dressing:n,enemies:s}),d=$u(h,e);if(d.problems.length>0)throw new Error(`the deterministic fallback facility is invalid: ${d.problems.join("; ")}`);return h.report.warnings=d.warnings,h}const Zl="185",fm=0,$c=1,pm=2,or=1,mm=2,nr=3,ti=0,$t=1,Un=2,jn=0,Rs=1,Bi=2,Kc=3,Jc=4,Ju=5,Qn=100,gm=101,vm=102,xm=103,_m=104,Mm=200,Wo=201,ym=202,Sm=203,Xo=204,ur=205,Em=206,bm=207,wm=208,Tm=209,Am=210,Rm=211,Cm=212,Pm=213,Im=214,qo=0,Zo=1,Yo=2,Is=3,$o=4,Ko=5,Jo=6,Qo=7,Yl=0,Lm=1,Dm=2,Gn=0,Qu=1,ju=2,ed=3,$l=4,td=5,nd=6,id=7,sd=300,ki=301,Ls=302,Wa=303,Xa=304,Da=306,zi=1e3,cn=1001,jo=1002,Ft=1003,Nm=1004,Ar=1005,bt=1006,qa=1007,Bn=1008,tn=1009,rd=1010,ad=1011,dr=1012,Kl=1013,Xn=1014,En=1015,ni=1016,Jl=1017,Ql=1018,fr=1020,od=35902,ld=35899,cd=1021,hd=1022,pn=1023,ii=1026,Ui=1027,jl=1028,ec=1029,Vi=1030,tc=1031,nc=1033,ca=33776,ha=33777,ua=33778,da=33779,el=35840,tl=35841,nl=35842,il=35843,sl=36196,rl=37492,al=37496,ol=37488,ll=37489,Ma=37490,cl=37491,hl=37808,ul=37809,dl=37810,fl=37811,pl=37812,ml=37813,gl=37814,vl=37815,xl=37816,_l=37817,Ml=37818,yl=37819,Sl=37820,El=37821,bl=36492,wl=36494,Tl=36495,Al=36283,Rl=36284,ya=36285,Cl=36286,Fm=3200,Sa=0,Um=1,Mn="",Zt="srgb",Ea="srgb-linear",ba="linear",Je="srgb",ji=7680,Qc=519,Om=512,Bm=513,km=514,ic=515,zm=516,Vm=517,sc=518,Gm=519,jc=35044,eh="300 es",kn=2e3,pr=2001;function Hm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function wa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wm(){const i=wa("canvas");return i.style.display="block",i}const th={};function nh(...i){const e="THREE."+i.shift();console.log(e,...i)}function ud(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Re(...i){i=ud(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function qe(...i){i=ud(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Cs(...i){const e=i.join(" ");e in th||(th[e]=!0,Re(...i))}function Xm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const qm={[qo]:Zo,[Yo]:Jo,[$o]:Qo,[Is]:Ko,[Zo]:qo,[Jo]:Yo,[Qo]:$o,[Ko]:Is};class Hi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Za=Math.PI/180,Pl=180/Math.PI;function xr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function He(i,e,t){return Math.max(e,Math.min(t,i))}function Zm(i,e){return(i%e+e)%e}function Ya(i,e,t){return(1-t)*i+t*e}function zs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Jt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Le{static{Le.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class si{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(d!==v||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*v;m<0&&(u=-u,f=-f,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){const y=Math.acos(m),w=Math.sin(y);p=Math.sin(p*y)/w,o=Math.sin(o*y)/w,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+v*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+v*o;const y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{static{U.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ih.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ih.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return $a.copy(this).projectOnVector(e),this.sub($a)}reflect(e){return this.sub($a.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $a=new U,ih=new si;class Ie{static{Ie.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],y=s[1],w=s[4],M=s[7],T=s[2],b=s[5],A=s[8];return r[0]=a*v+o*y+l*T,r[3]=a*m+o*w+l*b,r[6]=a*p+o*M+l*A,r[1]=c*v+h*y+d*T,r[4]=c*m+h*w+d*b,r[7]=c*p+h*M+d*A,r[2]=u*v+f*y+g*T,r[5]=u*m+f*w+g*b,r[8]=u*p+f*M+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=t*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*c-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=u*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Cs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ka.makeScale(e,t)),this}rotate(e){return Cs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ka.makeRotation(-e)),this}translate(e,t){return Cs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ka.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ka=new Ie,sh=new Ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rh=new Ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ym(){const i={enabled:!0,workingColorSpace:Ea,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Je&&(s.r=ei(s.r),s.g=ei(s.g),s.b=ei(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Je&&(s.r=Ps(s.r),s.g=Ps(s.g),s.b=Ps(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Mn?ba:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Cs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Cs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ea]:{primaries:e,whitePoint:n,transfer:ba,toXYZ:sh,fromXYZ:rh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Zt},outputColorSpaceConfig:{drawingBufferColorSpace:Zt}},[Zt]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:sh,fromXYZ:rh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Zt}}}),i}const Ge=Ym();function ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ps(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let es;class $m{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{es===void 0&&(es=wa("canvas")),es.width=e.width,es.height=e.height;const s=es.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=es}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=wa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ei(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Km=0;class rc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=xr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ja(s[a].image)):r.push(Ja(s[a]))}else r=Ja(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ja(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$m.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}let Jm=0;const Qa=new U;class Gt extends Hi{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=cn,s=cn,r=bt,a=Bn,o=pn,l=tn,c=Gt.DEFAULT_ANISOTROPY,h=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=xr(),this.name="",this.source=new rc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Qa).x}get height(){return this.source.getSize(Qa).y}get depth(){return this.source.getSize(Qa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zi:e.x=e.x-Math.floor(e.x);break;case cn:e.x=e.x<0?0:1;break;case jo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zi:e.y=e.y-Math.floor(e.y);break;case cn:e.y=e.y<0?0:1;break;case jo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=sd;Gt.DEFAULT_ANISOTROPY=1;class ft{static{ft.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,M=(f+1)/2,T=(p+1)/2,b=(h+u)/4,A=(d+v)/4,_=(g+m)/4;return w>M&&w>T?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=b/n,r=A/n):M>T?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=b/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=A/r,s=_/r),this.set(n,s,r,t),this}let y=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-v)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qm extends Hi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Gt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new rc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bn extends Qm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class dd extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jm extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ze{static{Ze.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/ts.setFromMatrixColumn(e,0).length(),r=1/ts.setFromMatrixColumn(e,1).length(),a=1/ts.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(e0,e,t0)}lookAt(e,t,n){const s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),hi.crossVectors(n,rn),hi.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),hi.crossVectors(n,rn)),hi.normalize(),Rr.crossVectors(rn,hi),s[0]=hi.x,s[4]=Rr.x,s[8]=rn.x,s[1]=hi.y,s[5]=Rr.y,s[9]=rn.y,s[2]=hi.z,s[6]=Rr.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],w=n[7],M=n[11],T=n[15],b=s[0],A=s[4],_=s[8],E=s[12],C=s[1],P=s[5],L=s[9],W=s[13],X=s[2],O=s[6],H=s[10],F=s[14],q=s[3],ee=s[7],ie=s[11],Q=s[15];return r[0]=a*b+o*C+l*X+c*q,r[4]=a*A+o*P+l*O+c*ee,r[8]=a*_+o*L+l*H+c*ie,r[12]=a*E+o*W+l*F+c*Q,r[1]=h*b+d*C+u*X+f*q,r[5]=h*A+d*P+u*O+f*ee,r[9]=h*_+d*L+u*H+f*ie,r[13]=h*E+d*W+u*F+f*Q,r[2]=g*b+v*C+m*X+p*q,r[6]=g*A+v*P+m*O+p*ee,r[10]=g*_+v*L+m*H+p*ie,r[14]=g*E+v*W+m*F+p*Q,r[3]=y*b+w*C+M*X+T*q,r[7]=y*A+w*P+M*O+T*ee,r[11]=y*_+w*L+M*H+T*ie,r[15]=y*E+w*W+M*F+T*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15],y=l*f-c*u,w=o*f-c*d,M=o*u-l*d,T=a*f-c*h,b=a*u-l*h,A=a*d-o*h;return t*(v*y-m*w+p*M)-n*(g*y-m*T+p*b)+s*(g*w-v*T+p*A)-r*(g*M-v*b+m*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],y=t*o-n*a,w=t*l-s*a,M=t*c-r*a,T=n*l-s*o,b=n*c-r*o,A=s*c-r*l,_=h*v-d*g,E=h*m-u*g,C=h*p-f*g,P=d*m-u*v,L=d*p-f*v,W=u*p-f*m,X=y*W-w*L+M*P+T*C-b*E+A*_;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/X;return e[0]=(o*W-l*L+c*P)*O,e[1]=(s*L-n*W-r*P)*O,e[2]=(v*A-m*b+p*T)*O,e[3]=(u*b-d*A-f*T)*O,e[4]=(l*C-a*W-c*E)*O,e[5]=(t*W-s*C+r*E)*O,e[6]=(m*M-g*A-p*w)*O,e[7]=(h*A-u*M+f*w)*O,e[8]=(a*L-o*C+c*_)*O,e[9]=(n*C-t*L-r*_)*O,e[10]=(g*b-v*M+p*y)*O,e[11]=(d*M-h*b-f*y)*O,e[12]=(o*E-a*P-l*_)*O,e[13]=(t*P-n*E+s*_)*O,e[14]=(v*w-g*T-m*y)*O,e[15]=(h*T-d*w+u*y)*O,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,v=a*h,m=a*d,p=o*d,y=l*c,w=l*h,M=l*d,T=n.x,b=n.y,A=n.z;return s[0]=(1-(v+p))*T,s[1]=(f+M)*T,s[2]=(g-w)*T,s[3]=0,s[4]=(f-M)*b,s[5]=(1-(u+p))*b,s[6]=(m+y)*b,s[7]=0,s[8]=(g+w)*A,s[9]=(m-y)*A,s[10]=(1-(u+v))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ts.set(s[0],s[1],s[2]).length();const o=ts.set(s[4],s[5],s[6]).length(),l=ts.set(s[8],s[9],s[10]).length();r<0&&(a=-a),gn.copy(this);const c=1/a,h=1/o,d=1/l;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=d,gn.elements[9]*=d,gn.elements[10]*=d,t.setFromRotationMatrix(gn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=kn,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===kn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===pr)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=kn,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===kn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===pr)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ts=new U,gn=new Ze,e0=new U(0,0,0),t0=new U(1,1,1),hi=new U,Rr=new U,rn=new U,ah=new Ze,oh=new si;class Tn{constructor(e=0,t=0,n=0,s=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ah.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ah,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return oh.setFromEuler(this),this.setFromQuaternion(oh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class fd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let n0=0;const lh=new U,ns=new si,qn=new Ze,Cr=new U,Vs=new U,i0=new U,s0=new si,ch=new U(1,0,0),hh=new U(0,1,0),uh=new U(0,0,1),dh={type:"added"},r0={type:"removed"},is={type:"childadded",child:null},ja={type:"childremoved",child:null};class wt extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new U,t=new Tn,n=new si,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ze},normalMatrix:{value:new Ie}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.multiply(ns),this}rotateOnWorldAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.premultiply(ns),this}rotateX(e){return this.rotateOnAxis(ch,e)}rotateY(e){return this.rotateOnAxis(hh,e)}rotateZ(e){return this.rotateOnAxis(uh,e)}translateOnAxis(e,t){return lh.copy(e).applyQuaternion(this.quaternion),this.position.add(lh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ch,e)}translateY(e){return this.translateOnAxis(hh,e)}translateZ(e){return this.translateOnAxis(uh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cr.copy(e):Cr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Vs,Cr,this.up):qn.lookAt(Cr,Vs,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),ns.setFromRotationMatrix(qn),this.quaternion.premultiply(ns.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dh),is.child=e,this.dispatchEvent(is),is.child=null):qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(r0),ja.child=e,this.dispatchEvent(ja),ja.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dh),is.child=e,this.dispatchEvent(is),is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,e,i0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,s0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}wt.DEFAULT_UP=new U(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Oi extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const a0={type:"move"};class eo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(a0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Oi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const pd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function to(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Pe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ge.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ge.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ge.workingColorSpace){if(e=Zm(e,1),t=He(t,0,1),n=He(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=to(a,r,e+1/3),this.g=to(a,r,e),this.b=to(a,r,e-1/3)}return Ge.colorSpaceToWorking(this,s),this}setStyle(e,t=Zt){function n(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zt){const n=pd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zt){return Ge.workingToColorSpace(kt.copy(this),e),Math.round(He(kt.r*255,0,255))*65536+Math.round(He(kt.g*255,0,255))*256+Math.round(He(kt.b*255,0,255))}getHexString(e=Zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ge.workingColorSpace){Ge.workingToColorSpace(kt.copy(this),t);const n=kt.r,s=kt.g,r=kt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ge.workingColorSpace){return Ge.workingToColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=Zt){Ge.workingToColorSpace(kt.copy(this),e);const t=kt.r,n=kt.g,s=kt.b;return e!==Zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(Pr);const n=Ya(ui.h,Pr.h,t),s=Ya(ui.s,Pr.s,t),r=Ya(ui.l,Pr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new Pe;Pe.NAMES=pd;class ac{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Pe(e),this.near=t,this.far=n}clone(){return new ac(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ta extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const vn=new U,Zn=new U,no=new U,Yn=new U,ss=new U,rs=new U,fh=new U,io=new U,so=new U,ro=new U,ao=new ft,oo=new ft,lo=new ft;class yn{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),vn.subVectors(e,t),s.cross(vn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){vn.subVectors(s,t),Zn.subVectors(n,t),no.subVectors(e,t);const a=vn.dot(vn),o=vn.dot(Zn),l=vn.dot(no),c=Zn.dot(Zn),h=Zn.dot(no),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Yn.x),l.addScaledVector(a,Yn.y),l.addScaledVector(o,Yn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return ao.setScalar(0),oo.setScalar(0),lo.setScalar(0),ao.fromBufferAttribute(e,t),oo.fromBufferAttribute(e,n),lo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ao,r.x),a.addScaledVector(oo,r.y),a.addScaledVector(lo,r.z),a}static isFrontFacing(e,t,n,s){return vn.subVectors(n,t),Zn.subVectors(e,t),vn.cross(Zn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),vn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return yn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ss.subVectors(s,n),rs.subVectors(r,n),io.subVectors(e,n);const l=ss.dot(io),c=rs.dot(io);if(l<=0&&c<=0)return t.copy(n);so.subVectors(e,s);const h=ss.dot(so),d=rs.dot(so);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ss,a);ro.subVectors(e,r);const f=ss.dot(ro),g=rs.dot(ro);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(rs,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return fh.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(fh,o);const p=1/(m+v+u);return a=v*p,o=u*p,t.copy(n).addScaledVector(ss,a).addScaledVector(rs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Wi{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ir.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ir.copy(n.boundingBox)),Ir.applyMatrix4(e.matrixWorld),this.union(Ir)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gs),Lr.subVectors(this.max,Gs),as.subVectors(e.a,Gs),os.subVectors(e.b,Gs),ls.subVectors(e.c,Gs),di.subVectors(os,as),fi.subVectors(ls,os),wi.subVectors(as,ls);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-wi.z,wi.y,di.z,0,-di.x,fi.z,0,-fi.x,wi.z,0,-wi.x,-di.y,di.x,0,-fi.y,fi.x,0,-wi.y,wi.x,0];return!co(t,as,os,ls,Lr)||(t=[1,0,0,0,1,0,0,0,1],!co(t,as,os,ls,Lr))?!1:(Dr.crossVectors(di,fi),t=[Dr.x,Dr.y,Dr.z],co(t,as,os,ls,Lr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const $n=[new U,new U,new U,new U,new U,new U,new U,new U],xn=new U,Ir=new Wi,as=new U,os=new U,ls=new U,di=new U,fi=new U,wi=new U,Gs=new U,Lr=new U,Dr=new U,Ti=new U;function co(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ti.fromArray(i,r);const o=s.x*Math.abs(Ti.x)+s.y*Math.abs(Ti.y)+s.z*Math.abs(Ti.z),l=e.dot(Ti),c=t.dot(Ti),h=n.dot(Ti);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Et=new U,Nr=new Le;let o0=0;class nn extends Hi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:o0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=jc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Nr.fromBufferAttribute(this,t),Nr.applyMatrix3(e),this.setXY(t,Nr.x,Nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=zs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),s=Jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Jt(t,this.array),n=Jt(n,this.array),s=Jt(s,this.array),r=Jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class md extends nn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class gd extends nn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ht extends nn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const l0=new Wi,Hs=new U,ho=new U;class _r{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):l0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hs.subVectors(e,this.center);const t=Hs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Hs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ho.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hs.copy(e.center).add(ho)),this.expandByPoint(Hs.copy(e.center).sub(ho))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let c0=0;const un=new Ze,uo=new wt,cs=new U,an=new Wi,Ws=new Wi,Lt=new U;class Wt extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c0++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hm(e)?gd:md)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ie().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,n){return un.makeTranslation(e,t,n),this.applyMatrix4(un),this}scale(e,t,n){return un.makeScale(e,t,n),this.applyMatrix4(un),this}lookAt(e){return uo.lookAt(e),uo.updateMatrix(),this.applyMatrix4(uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ht(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ws.setFromBufferAttribute(o),this.morphTargetsRelative?(Lt.addVectors(an.min,Ws.min),an.expandByPoint(Lt),Lt.addVectors(an.max,Ws.max),an.expandByPoint(Lt)):(an.expandByPoint(Ws.min),an.expandByPoint(Ws.max))}an.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Lt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Lt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Lt.fromBufferAttribute(o,c),l&&(cs.fromBufferAttribute(e,c),Lt.add(cs)),s=Math.max(s,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new nn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new U,l[_]=new U;const c=new U,h=new U,d=new U,u=new Le,f=new Le,g=new Le,v=new U,m=new U;function p(_,E,C){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,E),d.fromBufferAttribute(n,C),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,C),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[_].add(v),o[E].add(v),o[C].add(v),l[_].add(m),l[E].add(m),l[C].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let _=0,E=y.length;_<E;++_){const C=y[_],P=C.start,L=C.count;for(let W=P,X=P+L;W<X;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const w=new U,M=new U,T=new U,b=new U;function A(_){T.fromBufferAttribute(s,_),b.copy(T);const E=o[_];w.copy(E),w.sub(T.multiplyScalar(T.dot(E))).normalize(),M.crossVectors(b,E);const P=M.dot(l[_])<0?-1:1;a.setXYZW(_,w.x,w.y,w.z,P)}for(let _=0,E=y.length;_<E;++_){const C=y[_],P=C.start,L=C.count;for(let W=P,X=P+L;W<X;W+=3)A(e.getX(W+0)),A(e.getX(W+1)),A(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new nn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,h=new U,d=new U;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new nn(u,h,d)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Wt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let h0=0;class Bs extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:h0++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=Rs,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xo,this.blendDst=ur,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Rs&&(n.blending=this.blending),this.side!==ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xo&&(n.blendSrc=this.blendSrc),this.blendDst!==ur&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Is&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Pe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Le().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Le().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Kn=new U,fo=new U,Fr=new U,pi=new U,po=new U,Ur=new U,mo=new U;class u0{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){fo.copy(e).add(t).multiplyScalar(.5),Fr.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(fo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Fr),o=pi.dot(this.direction),l=-pi.dot(Fr),c=pi.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(fo).addScaledVector(Fr,u),f}intersectSphere(e,t){Kn.subVectors(e.center,this.origin);const n=Kn.dot(this.direction),s=Kn.dot(Kn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,n,s,r){po.subVectors(t,e),Ur.subVectors(n,e),mo.crossVectors(po,Ur);let a=this.direction.dot(mo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;pi.subVectors(this.origin,e);const l=o*this.direction.dot(Ur.crossVectors(pi,Ur));if(l<0)return null;const c=o*this.direction.dot(po.cross(pi));if(c<0||l+c>a)return null;const h=-o*pi.dot(mo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class wn extends Bs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ph=new Ze,Ai=new u0,Or=new _r,mh=new U,Br=new U,kr=new U,zr=new U,go=new U,Vr=new U,gh=new U,Gr=new U;class tt extends wt{constructor(e=new Wt,t=new wn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Vr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(go.fromBufferAttribute(d,e),a?Vr.addScaledVector(go,h):Vr.addScaledVector(go.sub(t),h))}t.add(Vr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(r),Ai.copy(e.ray).recast(e.near),!(Or.containsPoint(Ai.origin)===!1&&(Ai.intersectSphere(Or,mh)===null||Ai.origin.distanceToSquared(mh)>(e.far-e.near)**2))&&(ph.copy(r).invert(),Ai.copy(e.ray).applyMatrix4(ph),!(n.boundingBox!==null&&Ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ai)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=y,T=w;M<T;M+=3){const b=o.getX(M),A=o.getX(M+1),_=o.getX(M+2);s=Hr(this,p,e,n,c,h,d,b,A,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=o.getX(m),w=o.getX(m+1),M=o.getX(m+2);s=Hr(this,a,e,n,c,h,d,y,w,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=y,T=w;M<T;M+=3){const b=M,A=M+1,_=M+2;s=Hr(this,p,e,n,c,h,d,b,A,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const y=m,w=m+1,M=m+2;s=Hr(this,a,e,n,c,h,d,y,w,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function d0(i,e,t,n,s,r,a,o){let l;if(e.side===$t?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===ti,o),l===null)return null;Gr.copy(o),Gr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Gr);return c<t.near||c>t.far?null:{distance:c,point:Gr.clone(),object:i}}function Hr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Br),i.getVertexPosition(l,kr),i.getVertexPosition(c,zr);const h=d0(i,e,t,n,Br,kr,zr,gh);if(h){const d=new U;yn.getBarycoord(gh,Br,kr,zr,d),s&&(h.uv=yn.getInterpolatedAttribute(s,o,l,c,d,new Le)),r&&(h.uv1=yn.getInterpolatedAttribute(r,o,l,c,d,new Le)),a&&(h.normal=yn.getInterpolatedAttribute(a,o,l,c,d,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new U,materialIndex:0};yn.getNormal(Br,kr,zr,u.normal),h.face=u,h.barycoord=d}return h}class vd extends Gt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Ft,h=Ft,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ds extends nn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const hs=new Ze,vh=new Ze,Wr=[],xh=new Wi,f0=new Ze,Xs=new tt,qs=new _r;class mr extends tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ds(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,f0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hs),xh.copy(e.boundingBox).applyMatrix4(hs),this.boundingBox.union(xh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _r),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hs),qs.copy(e.boundingSphere).applyMatrix4(hs),this.boundingSphere.union(qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Xs.geometry=this.geometry,Xs.material=this.material,Xs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qs.copy(this.boundingSphere),qs.applyMatrix4(n),e.ray.intersectsSphere(qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,hs),vh.multiplyMatrices(n,hs),Xs.matrixWorld=vh,Xs.raycast(e,Wr);for(let a=0,o=Wr.length;a<o;a++){const l=Wr[a];l.instanceId=r,l.object=this,t.push(l)}Wr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ds(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new vd(new Float32Array(s*this.count),s,this.count,jl,En));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const vo=new U,p0=new U,m0=new Ie;class Li{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=vo.subVectors(n,t).cross(p0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(vo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||m0.getNormalMatrix(e),s=this.coplanarPoint(vo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ri=new _r,g0=new Le(.5,.5),Xr=new U;class oc{constructor(e=new Li,t=new Li,n=new Li,s=new Li,r=new Li,a=new Li){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=kn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],y=r[12],w=r[13],M=r[14],T=r[15];if(s[0].setComponents(c-a,f-h,p-g,T-y).normalize(),s[1].setComponents(c+a,f+h,p+g,T+y).normalize(),s[2].setComponents(c+o,f+d,p+v,T+w).normalize(),s[3].setComponents(c-o,f-d,p-v,T-w).normalize(),n)s[4].setComponents(l,u,m,M).normalize(),s[5].setComponents(c-l,f-u,p-m,T-M).normalize();else if(s[4].setComponents(c-l,f-u,p-m,T-M).normalize(),t===kn)s[5].setComponents(c+l,f+u,p+m,T+M).normalize();else if(t===pr)s[5].setComponents(l,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(e){Ri.center.set(0,0,0);const t=g0.distanceTo(e.center);return Ri.radius=.7071067811865476+t,Ri.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Xr.x=s.normal.x>0?e.max.x:e.min.x,Xr.y=s.normal.y>0?e.max.y:e.min.y,Xr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xd extends Gt{constructor(e=[],t=ki,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lc extends Gt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ns extends Gt{constructor(e,t,n=Xn,s,r,a,o=Ft,l=Ft,c,h=ii,d=1){if(h!==ii&&h!==Ui)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class v0 extends Ns{constructor(e,t=Xn,n=ki,s,r,a=Ft,o=Ft,l,c=ii){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class _d extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class vt extends Wt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(d,2));function g(v,m,p,y,w,M,T,b,A,_,E){const C=M/A,P=T/_,L=M/2,W=T/2,X=b/2,O=A+1,H=_+1;let F=0,q=0;const ee=new U;for(let ie=0;ie<H;ie++){const Q=ie*P-W;for(let oe=0;oe<O;oe++){const ke=oe*C-L;ee[v]=ke*y,ee[m]=Q*w,ee[p]=X,c.push(ee.x,ee.y,ee.z),ee[v]=0,ee[m]=0,ee[p]=b>0?1:-1,h.push(ee.x,ee.y,ee.z),d.push(oe/A),d.push(1-ie/_),F+=1}}for(let ie=0;ie<_;ie++)for(let Q=0;Q<A;Q++){const oe=u+Q+O*ie,ke=u+Q+O*(ie+1),$e=u+(Q+1)+O*(ie+1),Ve=u+(Q+1)+O*ie;l.push(oe,ke,Ve),l.push(ke,$e,Ve),q+=6}o.addGroup(f,q,E),f+=q,u+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ct extends Wt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const v=[],m=n/2;let p=0;y(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(f,2));function y(){const M=new U,T=new U;let b=0;const A=(t-e)/n;for(let _=0;_<=r;_++){const E=[],C=_/r,P=C*(t-e)+e;for(let L=0;L<=s;L++){const W=L/s,X=W*l+o,O=Math.sin(X),H=Math.cos(X);T.x=P*O,T.y=-C*n+m,T.z=P*H,d.push(T.x,T.y,T.z),M.set(O,A,H).normalize(),u.push(M.x,M.y,M.z),f.push(W,1-C),E.push(g++)}v.push(E)}for(let _=0;_<s;_++)for(let E=0;E<r;E++){const C=v[E][_],P=v[E+1][_],L=v[E+1][_+1],W=v[E][_+1];(e>0||E!==0)&&(h.push(C,P,W),b+=3),(t>0||E!==r-1)&&(h.push(P,L,W),b+=3)}c.addGroup(p,b,0),p+=b}function w(M){const T=g,b=new Le,A=new U;let _=0;const E=M===!0?e:t,C=M===!0?1:-1;for(let L=1;L<=s;L++)d.push(0,m*C,0),u.push(0,C,0),f.push(.5,.5),g++;const P=g;for(let L=0;L<=s;L++){const X=L/s*l+o,O=Math.cos(X),H=Math.sin(X);A.x=E*H,A.y=m*C,A.z=E*O,d.push(A.x,A.y,A.z),u.push(0,C,0),b.x=O*.5+.5,b.y=H*.5*C+.5,f.push(b.x,b.y),g++}for(let L=0;L<s;L++){const W=T+L,X=P+L;M===!0?h.push(X,X+1,W):h.push(X+1,X,W),_+=3}c.addGroup(p,_,M===!0?1:2),p+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ct(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Mr extends Wt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const y=p*u-a;for(let w=0;w<c;w++){const M=w*d-r;g.push(M,-y,0),v.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const w=y+c*p,M=y+c*(p+1),T=y+1+c*(p+1),b=y+1+c*p;f.push(w,M,b),f.push(M,T,b)}this.setIndex(f),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mr(e.width,e.height,e.widthSegments,e.heightSegments)}}class yi extends Wt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new U,u=new U,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const y=[],w=p/n,M=a+w*o,T=e*Math.cos(M),b=Math.sqrt(e*e-T*T);let A=0;p===0&&a===0?A=.5/t:p===n&&l===Math.PI&&(A=-.5/t);for(let _=0;_<=t;_++){const E=_/t,C=s+E*r;d.x=-b*Math.cos(C),d.y=T,d.z=b*Math.sin(C),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(E+A,1-w),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const w=h[p][y+1],M=h[p][y],T=h[p+1][y],b=h[p+1][y+1];(p!==0||a>0)&&f.push(w,M,b),(p!==n-1||l<Math.PI)&&f.push(M,T,b)}this.setIndex(f),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class _i extends Wt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],d=[],u=new U,f=new U,g=new U;for(let v=0;v<=n;v++){const m=a+v/n*o;for(let p=0;p<=s;p++){const y=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(y),f.y=(e+t*Math.cos(m))*Math.sin(y),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/s),d.push(v/n)}}for(let v=1;v<=n;v++)for(let m=1;m<=s;m++){const p=(s+1)*v+m-1,y=(s+1)*(v-1)+m-1,w=(s+1)*(v-1)+m,M=(s+1)*v+m;l.push(p,y,M),l.push(y,w,M)}this.setIndex(l),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Fs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(_h(s))s.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(_h(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function qt(i){const e={};for(let t=0;t<i.length;t++){const n=Fs(i[t]);for(const s in n)e[s]=n[s]}return e}function _h(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function x0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Md(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}const _0={clone:Fs,merge:qt};var M0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,y0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mn extends Bs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=M0,this.fragmentShader=y0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=x0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Pe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Le().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ft().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ie().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ze().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class S0 extends mn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Rt extends Bs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sa,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class E0 extends Bs{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sa,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Yl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class b0 extends Bs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class w0 extends Bs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class cc extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Mh extends cc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const xo=new Ze,yh=new U,Sh=new U;class yd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oc,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;yh.setFromMatrixPosition(e.matrixWorld),t.position.copy(yh),Sh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sh),t.updateMatrixWorld(),xo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===pr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const qr=new U,Zr=new si,Pn=new U;class Sd extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qr,Zr,Pn),Pn.x===1&&Pn.y===1&&Pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Zr,Pn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(qr,Zr,Pn),Pn.x===1&&Pn.y===1&&Pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qr,Zr,Pn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const mi=new U,Eh=new Le,bh=new Le;class en extends Sd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Pl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Za*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pl*2*Math.atan(Math.tan(Za*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(mi.x,mi.y).multiplyScalar(-e/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-e/mi.z)}getViewSize(e,t){return this.getViewBounds(e,Eh,bh),t.subVectors(bh,Eh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Za*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class T0 extends yd{constructor(){super(new en(90,1,.5,500)),this.isPointLightShadow=!0}}class hc extends cc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new T0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Na extends Sd{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class A0 extends yd{constructor(){super(new Na(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wh extends cc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new A0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class R0 extends Wt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const us=-90,ds=1;class C0 extends wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new en(us,ds,e,t);s.layers=this.layers,this.add(s);const r=new en(us,ds,e,t);r.layers=this.layers,this.add(r);const a=new en(us,ds,e,t);a.layers=this.layers,this.add(a);const o=new en(us,ds,e,t);o.layers=this.layers,this.add(o);const l=new en(us,ds,e,t);l.layers=this.layers,this.add(l);const c=new en(us,ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===kn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class P0 extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ed{static{Ed.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}}function Th(i,e,t,n){const s=I0(n);switch(t){case cd:return i*e;case jl:return i*e/s.components*s.byteLength;case ec:return i*e/s.components*s.byteLength;case Vi:return i*e*2/s.components*s.byteLength;case tc:return i*e*2/s.components*s.byteLength;case hd:return i*e*3/s.components*s.byteLength;case pn:return i*e*4/s.components*s.byteLength;case nc:return i*e*4/s.components*s.byteLength;case ca:case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ua:case da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case tl:case il:return Math.max(i,16)*Math.max(e,8)/4;case el:case nl:return Math.max(i,8)*Math.max(e,8)/2;case sl:case rl:case ol:case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case al:case Ma:case cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ul:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case dl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case gl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case vl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case yl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case El:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case bl:case wl:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Al:case Rl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ya:case Cl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function I0(i){switch(i){case tn:case rd:return{byteLength:1,components:1};case dr:case ad:case ni:return{byteLength:2,components:1};case Jl:case Ql:return{byteLength:2,components:4};case Xn:case Kl:case En:return{byteLength:4,components:1};case od:case ld:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zl}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zl);function bd(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function L0(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var D0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,N0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,F0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,U0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,O0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,B0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,k0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,z0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,V0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,G0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,H0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,W0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,X0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,q0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Z0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,j0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ng=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ig=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,rg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ag=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,og=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cg="gl_FragColor = linearToOutputTexel( gl_FragColor );",hg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ug=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,dg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,fg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_g=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Eg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,wg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Tg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ag=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ig=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Lg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ng=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ug=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Og=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Hg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$g=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Kg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ev=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,nv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,iv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,av=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ov=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,cv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,uv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,gv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_v=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ev=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Av=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Iv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Lv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ov=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Vv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Yv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$v=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ex=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ax=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ox=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ux=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ue={alphahash_fragment:D0,alphahash_pars_fragment:N0,alphamap_fragment:F0,alphamap_pars_fragment:U0,alphatest_fragment:O0,alphatest_pars_fragment:B0,aomap_fragment:k0,aomap_pars_fragment:z0,batching_pars_vertex:V0,batching_vertex:G0,begin_vertex:H0,beginnormal_vertex:W0,bsdfs:X0,iridescence_fragment:q0,bumpmap_pars_fragment:Z0,clipping_planes_fragment:Y0,clipping_planes_pars_fragment:$0,clipping_planes_pars_vertex:K0,clipping_planes_vertex:J0,color_fragment:Q0,color_pars_fragment:j0,color_pars_vertex:eg,color_vertex:tg,common:ng,cube_uv_reflection_fragment:ig,defaultnormal_vertex:sg,displacementmap_pars_vertex:rg,displacementmap_vertex:ag,emissivemap_fragment:og,emissivemap_pars_fragment:lg,colorspace_fragment:cg,colorspace_pars_fragment:hg,envmap_fragment:ug,envmap_common_pars_fragment:dg,envmap_pars_fragment:fg,envmap_pars_vertex:pg,envmap_physical_pars_fragment:wg,envmap_vertex:mg,fog_vertex:gg,fog_pars_vertex:vg,fog_fragment:xg,fog_pars_fragment:_g,gradientmap_pars_fragment:Mg,lightmap_pars_fragment:yg,lights_lambert_fragment:Sg,lights_lambert_pars_fragment:Eg,lights_pars_begin:bg,lights_toon_fragment:Tg,lights_toon_pars_fragment:Ag,lights_phong_fragment:Rg,lights_phong_pars_fragment:Cg,lights_physical_fragment:Pg,lights_physical_pars_fragment:Ig,lights_fragment_begin:Lg,lights_fragment_maps:Dg,lights_fragment_end:Ng,lightprobes_pars_fragment:Fg,logdepthbuf_fragment:Ug,logdepthbuf_pars_fragment:Og,logdepthbuf_pars_vertex:Bg,logdepthbuf_vertex:kg,map_fragment:zg,map_pars_fragment:Vg,map_particle_fragment:Gg,map_particle_pars_fragment:Hg,metalnessmap_fragment:Wg,metalnessmap_pars_fragment:Xg,morphinstance_vertex:qg,morphcolor_vertex:Zg,morphnormal_vertex:Yg,morphtarget_pars_vertex:$g,morphtarget_vertex:Kg,normal_fragment_begin:Jg,normal_fragment_maps:Qg,normal_pars_fragment:jg,normal_pars_vertex:ev,normal_vertex:tv,normalmap_pars_fragment:nv,clearcoat_normal_fragment_begin:iv,clearcoat_normal_fragment_maps:sv,clearcoat_pars_fragment:rv,iridescence_pars_fragment:av,opaque_fragment:ov,packing:lv,premultiplied_alpha_fragment:cv,project_vertex:hv,dithering_fragment:uv,dithering_pars_fragment:dv,roughnessmap_fragment:fv,roughnessmap_pars_fragment:pv,shadowmap_pars_fragment:mv,shadowmap_pars_vertex:gv,shadowmap_vertex:vv,shadowmask_pars_fragment:xv,skinbase_vertex:_v,skinning_pars_vertex:Mv,skinning_vertex:yv,skinnormal_vertex:Sv,specularmap_fragment:Ev,specularmap_pars_fragment:bv,tonemapping_fragment:wv,tonemapping_pars_fragment:Tv,transmission_fragment:Av,transmission_pars_fragment:Rv,uv_pars_fragment:Cv,uv_pars_vertex:Pv,uv_vertex:Iv,worldpos_vertex:Lv,background_vert:Dv,background_frag:Nv,backgroundCube_vert:Fv,backgroundCube_frag:Uv,cube_vert:Ov,cube_frag:Bv,depth_vert:kv,depth_frag:zv,distance_vert:Vv,distance_frag:Gv,equirect_vert:Hv,equirect_frag:Wv,linedashed_vert:Xv,linedashed_frag:qv,meshbasic_vert:Zv,meshbasic_frag:Yv,meshlambert_vert:$v,meshlambert_frag:Kv,meshmatcap_vert:Jv,meshmatcap_frag:Qv,meshnormal_vert:jv,meshnormal_frag:ex,meshphong_vert:tx,meshphong_frag:nx,meshphysical_vert:ix,meshphysical_frag:sx,meshtoon_vert:rx,meshtoon_frag:ax,points_vert:ox,points_frag:lx,shadow_vert:cx,shadow_frag:hx,sprite_vert:ux,sprite_frag:dx},de={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ie}},envmap:{envMap:{value:null},envMapRotation:{value:new Ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ie},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0},uvTransform:{value:new Ie}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}}},Dn={basic:{uniforms:qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Pe(0)},envMapIntensity:{value:1}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:qt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:qt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:qt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:qt([de.points,de.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:qt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:qt([de.common,de.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:qt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:qt([de.sprite,de.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ie}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distance:{uniforms:qt([de.common,de.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distance_vert,fragmentShader:Ue.distance_frag},shadow:{uniforms:qt([de.lights,de.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Dn.physical={uniforms:qt([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ie},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ie},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ie},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ie},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ie},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ie}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const Yr={r:0,b:0,g:0},fx=new Ze,wd=new Ie;wd.set(-1,0,0,0,1,0,0,0,1);function px(i,e,t,n,s,r){const a=new Pe(0);let o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){const M=y.backgroundBlurriness>0;w=e.get(w,M)}return w}function g(y){let w=!1;const M=f(y);M===null?m(a,o):M&&M.isColor&&(m(M,1),w=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(y,w){const M=f(w);M&&(M.isCubeTexture||M.mapping===Da)?(c===void 0&&(c=new tt(new vt(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:Fs(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fx.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(wd),c.material.toneMapped=Ge.getTransfer(M.colorSpace)!==Je,(h!==M||d!==M.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new tt(new Mr(2,2),new mn({name:"BackgroundMaterial",uniforms:Fs(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Ge.getTransfer(M.colorSpace)!==Je,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,w){y.getRGB(Yr,Md(i)),t.buffers.color.setClear(Yr.r,Yr.g,Yr.b,w,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:g,addToRenderList:v,dispose:p}}function mx(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(P,L,W,X,O){let H=!1;const F=d(P,X,W,L);r!==F&&(r=F,c(r.object)),H=f(P,X,W,O),H&&g(P,X,W,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,M(P,L,W,X),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function d(P,L,W,X){const O=X.wireframe===!0;let H=n[L.id];H===void 0&&(H={},n[L.id]=H);const F=P.isInstancedMesh===!0?P.id:0;let q=H[F];q===void 0&&(q={},H[F]=q);let ee=q[W.id];ee===void 0&&(ee={},q[W.id]=ee);let ie=ee[O];return ie===void 0&&(ie=u(l()),ee[O]=ie),ie}function u(P){const L=[],W=[],X=[];for(let O=0;O<t;O++)L[O]=0,W[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:W,attributeDivisors:X,object:P,attributes:{},index:null}}function f(P,L,W,X){const O=r.attributes,H=L.attributes;let F=0;const q=W.getAttributes();for(const ee in q)if(q[ee].location>=0){const Q=O[ee];let oe=H[ee];if(oe===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(oe=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(oe=P.instanceColor)),Q===void 0||Q.attribute!==oe||oe&&Q.data!==oe.data)return!0;F++}return r.attributesNum!==F||r.index!==X}function g(P,L,W,X){const O={},H=L.attributes;let F=0;const q=W.getAttributes();for(const ee in q)if(q[ee].location>=0){let Q=H[ee];Q===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(Q=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(Q=P.instanceColor));const oe={};oe.attribute=Q,Q&&Q.data&&(oe.data=Q.data),O[ee]=oe,F++}r.attributes=O,r.attributesNum=F,r.index=X}function v(){const P=r.newAttributes;for(let L=0,W=P.length;L<W;L++)P[L]=0}function m(P){p(P,0)}function p(P,L){const W=r.newAttributes,X=r.enabledAttributes,O=r.attributeDivisors;W[P]=1,X[P]===0&&(i.enableVertexAttribArray(P),X[P]=1),O[P]!==L&&(i.vertexAttribDivisor(P,L),O[P]=L)}function y(){const P=r.newAttributes,L=r.enabledAttributes;for(let W=0,X=L.length;W<X;W++)L[W]!==P[W]&&(i.disableVertexAttribArray(W),L[W]=0)}function w(P,L,W,X,O,H,F){F===!0?i.vertexAttribIPointer(P,L,W,O,H):i.vertexAttribPointer(P,L,W,X,O,H)}function M(P,L,W,X){v();const O=X.attributes,H=W.getAttributes(),F=L.defaultAttributeValues;for(const q in H){const ee=H[q];if(ee.location>=0){let ie=O[q];if(ie===void 0&&(q==="instanceMatrix"&&P.instanceMatrix&&(ie=P.instanceMatrix),q==="instanceColor"&&P.instanceColor&&(ie=P.instanceColor)),ie!==void 0){const Q=ie.normalized,oe=ie.itemSize,ke=e.get(ie);if(ke===void 0)continue;const $e=ke.buffer,Ve=ke.type,J=ke.bytesPerElement,re=Ve===i.INT||Ve===i.UNSIGNED_INT||ie.gpuType===Kl;if(ie.isInterleavedBufferAttribute){const te=ie.data,Ce=te.stride,De=ie.offset;if(te.isInstancedInterleavedBuffer){for(let Te=0;Te<ee.locationSize;Te++)p(ee.location+Te,te.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Te=0;Te<ee.locationSize;Te++)m(ee.location+Te);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let Te=0;Te<ee.locationSize;Te++)w(ee.location+Te,oe/ee.locationSize,Ve,Q,Ce*J,(De+oe/ee.locationSize*Te)*J,re)}else{if(ie.isInstancedBufferAttribute){for(let te=0;te<ee.locationSize;te++)p(ee.location+te,ie.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let te=0;te<ee.locationSize;te++)m(ee.location+te);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let te=0;te<ee.locationSize;te++)w(ee.location+te,oe/ee.locationSize,Ve,Q,oe*J,oe/ee.locationSize*te*J,re)}}else if(F!==void 0){const Q=F[q];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(ee.location,Q);break;case 3:i.vertexAttrib3fv(ee.location,Q);break;case 4:i.vertexAttrib4fv(ee.location,Q);break;default:i.vertexAttrib1fv(ee.location,Q)}}}}y()}function T(){E();for(const P in n){const L=n[P];for(const W in L){const X=L[W];for(const O in X){const H=X[O];for(const F in H)h(H[F].object),delete H[F];delete X[O]}}delete n[P]}}function b(P){if(n[P.id]===void 0)return;const L=n[P.id];for(const W in L){const X=L[W];for(const O in X){const H=X[O];for(const F in H)h(H[F].object),delete H[F];delete X[O]}}delete n[P.id]}function A(P){for(const L in n){const W=n[L];for(const X in W){const O=W[X];if(O[P.id]===void 0)continue;const H=O[P.id];for(const F in H)h(H[F].object),delete H[F];delete O[P.id]}}}function _(P){for(const L in n){const W=n[L],X=P.isInstancedMesh===!0?P.id:0,O=W[X];if(O!==void 0){for(const H in O){const F=O[H];for(const q in F)h(F[q].object),delete F[q];delete O[H]}delete W[X],Object.keys(W).length===0&&delete n[L]}}}function E(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:C,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function gx(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function vx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==pn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==tn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==En&&!_)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Re("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:M,maxSamples:T,samples:b}}function xx(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Li,o=new Ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,w=y*4;let M=p.clippingState||null;l.value=M,M=h(g,u,w,f);for(let T=0;T!==w;++T)M[T]=t[T];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,M=f;w!==v;++w,M+=4)a.copy(d[w]).applyMatrix4(y,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const Mi=4,Ah=[.125,.215,.35,.446,.526,.582],Di=20,_x=256,Zs=new Na,Rh=new Pe;let _o=null,Mo=0,yo=0,So=!1;const Mx=new U;class Il{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Mx}=r;_o=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_o,Mo,yo),this._renderer.xr.enabled=So,e.scissorTest=!1,fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ki||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_o=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:ni,format:pn,colorSpace:Ea,depthBuffer:!1},s=Ch(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ch(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=yx(r)),this._blurMaterial=Ex(r,e,t),this._ggxMaterial=Sx(r,e,t)}return s}_compileMaterial(e){const t=new tt(new Wt,e);this._renderer.compile(t,Zs)}_sceneToCubeUV(e,t,n,s,r){const l=new en(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Rh),d.toneMapping=Gn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new tt(new vt,new wn({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(Rh),p=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const T=this._cubeSize;fs(s,M*T,w>2?T:0,T,T),d.setRenderTarget(s),p&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ki||e.mapping===Ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ph());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;fs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Zs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Mi?n-g+Mi:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,fs(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(o,Zs),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,fs(e,m,p,3*v,2*v),s.setRenderTarget(e),s.render(o,Zs)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&qe("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=c;const u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Di-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Di;m>Di&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);const p=[];let y=0;for(let A=0;A<Di;++A){const _=A/v,E=Math.exp(-_*_/2);p.push(E),A===0?y+=E:A<m&&(y+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:w}=this;u.dTheta.value=g,u.mipInt.value=w-n;const M=this._sizeLods[s],T=3*M*(s>w-Mi?s-w+Mi:0),b=4*(this._cubeSize-M);fs(t,T,b,3*M,2*M),l.setRenderTarget(t),l.render(d,Zs)}}function yx(i){const e=[],t=[],n=[];let s=i;const r=i-Mi+1+Ah.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Mi?l=Ah[a-i+Mi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*f),w=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let b=0;b<f;b++){const A=b%3*2/3-1,_=b>2?0:-1,E=[A,_,0,A+2/3,_,0,A+2/3,_+1,0,A,_,0,A+2/3,_+1,0,A,_+1,0];y.set(E,v*g*b),w.set(u,m*g*b);const C=[b,b,b,b,b,b];M.set(C,p*g*b)}const T=new Wt;T.setAttribute("position",new nn(y,v)),T.setAttribute("uv",new nn(w,m)),T.setAttribute("faceIndex",new nn(M,p)),n.push(new tt(T,null)),s>Mi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ch(i,e,t){const n=new bn(i,e,t);return n.texture.mapping=Da,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Sx(i,e,t){return new mn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:_x,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Ex(i,e,t){const n=new Float32Array(Di),s=new U(0,1,0);return new mn({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Ph(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Ih(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Fa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Td extends bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new xd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new vt(5,5,5),r=new mn({name:"CubemapFromEquirect",uniforms:Fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:jn});r.uniforms.tEquirect.value=t;const a=new tt(s,r),o=t.minFilter;return t.minFilter===Bn&&(t.minFilter=bt),new C0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function bx(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===Wa||f===Xa)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const v=new Td(g.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===Wa||f===Xa,v=f===ki||f===Ls;if(g||v){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Il(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const y=u.image;return g&&y&&y.height>0||v&&y&&l(y)?(n===null&&(n=new Il(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Wa?u.mapping=ki:f===Xa&&(u.mapping=Ls),u}function l(u){let f=0;const g=6;for(let v=0;v<g;v++)u[v]!==void 0&&f++;return f===g}function c(u){const f=u.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function wx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Cs("WebGLRenderer: "+n+" extension not supported."),s}}}function Tx(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(g===void 0)return;if(f!==null){const y=f.array;v=f.version;for(let w=0,M=y.length;w<M;w+=3){const T=y[w+0],b=y[w+1],A=y[w+2];u.push(T,b,b,A,A,T)}}else{const y=g.array;v=g.version;for(let w=0,M=y.length/3-1;w<M;w+=3){const T=w+0,b=w+1,A=w+2;u.push(T,b,b,A,A,T)}}const m=new(g.count>=65535?gd:md)(u,1);m.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Ax(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let v=0;for(let m=0;m<f;m++)v+=u[m];t.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Rx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:qe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Cx(i,e,t){const n=new WeakMap,s=new ft;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let C=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",C)};var f=C;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let T=o.attributes.position.count*M,b=1;T>e.maxTextureSize&&(b=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const A=new Float32Array(T*b*4*d),_=new dd(A,T,b,d);_.type=En,_.needsUpdate=!0;const E=M*4;for(let P=0;P<d;P++){const L=p[P],W=y[P],X=w[P],O=T*b*4*P;for(let H=0;H<L.count;H++){const F=H*E;g===!0&&(s.fromBufferAttribute(L,H),A[O+F+0]=s.x,A[O+F+1]=s.y,A[O+F+2]=s.z,A[O+F+3]=0),v===!0&&(s.fromBufferAttribute(W,H),A[O+F+4]=s.x,A[O+F+5]=s.y,A[O+F+6]=s.z,A[O+F+7]=0),m===!0&&(s.fromBufferAttribute(X,H),A[O+F+8]=s.x,A[O+F+9]=s.y,A[O+F+10]=s.z,A[O+F+11]=X.itemSize===4?s.w:1)}}u={count:d,texture:_,size:new Le(T,b)},n.set(o,u),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Px(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const Ix={[Qu]:"LINEAR_TONE_MAPPING",[ju]:"REINHARD_TONE_MAPPING",[ed]:"CINEON_TONE_MAPPING",[$l]:"ACES_FILMIC_TONE_MAPPING",[nd]:"AGX_TONE_MAPPING",[id]:"NEUTRAL_TONE_MAPPING",[td]:"CUSTOM_TONE_MAPPING"};function Lx(i,e,t,n,s,r){const a=new bn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Ns(e,t):void 0}),o=new bn(e,t,{type:ni,depthBuffer:!1,stencilBuffer:!1}),l=new Wt;l.setAttribute("position",new ht([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ht([0,2,0,0,2,0],2));const c=new S0({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new tt(l,c),d=new Na(-1,1,1,-1,0,1);let u=null,f=null,g=!1,v,m=null,p=[],y=!1;this.setSize=function(w,M){a.setSize(w,M),o.setSize(w,M);for(let T=0;T<p.length;T++){const b=p[T];b.setSize&&b.setSize(w,M)}},this.setEffects=function(w){p=w,y=p.length>0&&p[0].isRenderPass===!0;const M=a.width,T=a.height;for(let b=0;b<p.length;b++){const A=p[b];A.setSize&&A.setSize(M,T)}},this.begin=function(w,M){if(g||w.toneMapping===Gn&&p.length===0)return!1;if(m=M,M!==null){const T=M.width,b=M.height;(a.width!==T||a.height!==b)&&this.setSize(T,b)}return y===!1&&w.setRenderTarget(a),v=w.toneMapping,w.toneMapping=Gn,!0},this.hasRenderPass=function(){return y},this.end=function(w,M){w.toneMapping=v,g=!0;let T=a,b=o;for(let A=0;A<p.length;A++){const _=p[A];if(_.enabled!==!1&&(_.render(w,b,T,M),_.needsSwap!==!1)){const E=T;T=b,b=E}}if(u!==w.outputColorSpace||f!==w.toneMapping){u=w.outputColorSpace,f=w.toneMapping,c.defines={},Ge.getTransfer(u)===Je&&(c.defines.SRGB_TRANSFER="");const A=Ix[f];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,w.setRenderTarget(m),w.render(h,d),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Ad=new Gt,Ll=new Ns(1,1),Rd=new dd,Cd=new jm,Pd=new xd,Lh=[],Dh=[],Nh=new Float32Array(16),Fh=new Float32Array(9),Uh=new Float32Array(4);function ks(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Lh[s];if(r===void 0&&(r=new Float32Array(s),Lh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ct(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ua(i,e){let t=Dh[e];t===void 0&&(t=new Int32Array(e),Dh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Dx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Nx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2fv(this.addr,e),Pt(t,e)}}function Fx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;i.uniform3fv(this.addr,e),Pt(t,e)}}function Ux(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4fv(this.addr,e),Pt(t,e)}}function Ox(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Uh.set(n),i.uniformMatrix2fv(this.addr,!1,Uh),Pt(t,n)}}function Bx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Fh.set(n),i.uniformMatrix3fv(this.addr,!1,Fh),Pt(t,n)}}function kx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Nh.set(n),i.uniformMatrix4fv(this.addr,!1,Nh),Pt(t,n)}}function zx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Vx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2iv(this.addr,e),Pt(t,e)}}function Gx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3iv(this.addr,e),Pt(t,e)}}function Hx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4iv(this.addr,e),Pt(t,e)}}function Wx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Xx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2uiv(this.addr,e),Pt(t,e)}}function qx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3uiv(this.addr,e),Pt(t,e)}}function Zx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4uiv(this.addr,e),Pt(t,e)}}function Yx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ll.compareFunction=t.isReversedDepthBuffer()?sc:ic,r=Ll):r=Ad,t.setTexture2D(e||r,s)}function $x(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Cd,s)}function Kx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Pd,s)}function Jx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Rd,s)}function Qx(i){switch(i){case 5126:return Dx;case 35664:return Nx;case 35665:return Fx;case 35666:return Ux;case 35674:return Ox;case 35675:return Bx;case 35676:return kx;case 5124:case 35670:return zx;case 35667:case 35671:return Vx;case 35668:case 35672:return Gx;case 35669:case 35673:return Hx;case 5125:return Wx;case 36294:return Xx;case 36295:return qx;case 36296:return Zx;case 35678:case 36198:case 36298:case 36306:case 35682:return Yx;case 35679:case 36299:case 36307:return $x;case 35680:case 36300:case 36308:case 36293:return Kx;case 36289:case 36303:case 36311:case 36292:return Jx}}function jx(i,e){i.uniform1fv(this.addr,e)}function e_(i,e){const t=ks(e,this.size,2);i.uniform2fv(this.addr,t)}function t_(i,e){const t=ks(e,this.size,3);i.uniform3fv(this.addr,t)}function n_(i,e){const t=ks(e,this.size,4);i.uniform4fv(this.addr,t)}function i_(i,e){const t=ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function s_(i,e){const t=ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function r_(i,e){const t=ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function a_(i,e){i.uniform1iv(this.addr,e)}function o_(i,e){i.uniform2iv(this.addr,e)}function l_(i,e){i.uniform3iv(this.addr,e)}function c_(i,e){i.uniform4iv(this.addr,e)}function h_(i,e){i.uniform1uiv(this.addr,e)}function u_(i,e){i.uniform2uiv(this.addr,e)}function d_(i,e){i.uniform3uiv(this.addr,e)}function f_(i,e){i.uniform4uiv(this.addr,e)}function p_(i,e,t){const n=this.cache,s=e.length,r=Ua(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ll:a=Ad;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function m_(i,e,t){const n=this.cache,s=e.length,r=Ua(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Cd,r[a])}function g_(i,e,t){const n=this.cache,s=e.length,r=Ua(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Pd,r[a])}function v_(i,e,t){const n=this.cache,s=e.length,r=Ua(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Rd,r[a])}function x_(i){switch(i){case 5126:return jx;case 35664:return e_;case 35665:return t_;case 35666:return n_;case 35674:return i_;case 35675:return s_;case 35676:return r_;case 5124:case 35670:return a_;case 35667:case 35671:return o_;case 35668:case 35672:return l_;case 35669:case 35673:return c_;case 5125:return h_;case 36294:return u_;case 36295:return d_;case 36296:return f_;case 35678:case 36198:case 36298:case 36306:case 35682:return p_;case 35679:case 36299:case 36307:return m_;case 35680:case 36300:case 36308:case 36293:return g_;case 36289:case 36303:case 36311:case 36292:return v_}}class __{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Qx(t.type)}}class M_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=x_(t.type)}}class y_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Eo=/(\w+)(\])?(\[|\.)?/g;function Oh(i,e){i.seq.push(e),i.map[e.id]=e}function S_(i,e,t){const n=i.name,s=n.length;for(Eo.lastIndex=0;;){const r=Eo.exec(n),a=Eo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Oh(t,c===void 0?new __(o,i,e):new M_(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new y_(o),Oh(t,d)),t=d}}}class fa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);S_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Bh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const E_=37297;let b_=0;function w_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const kh=new Ie;function T_(i){Ge._getMatrix(kh,Ge.workingColorSpace,i);const e=`mat3( ${kh.elements.map(t=>t.toFixed(4))} )`;switch(Ge.getTransfer(i)){case ba:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function zh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+w_(i.getShaderSource(e),o)}else return r}function A_(i,e){const t=T_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const R_={[Qu]:"Linear",[ju]:"Reinhard",[ed]:"Cineon",[$l]:"ACESFilmic",[nd]:"AgX",[id]:"Neutral",[td]:"Custom"};function C_(i,e){const t=R_[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const $r=new U;function P_(){Ge.getLuminanceCoefficients($r);const i=$r.x.toFixed(4),e=$r.y.toFixed(4),t=$r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function I_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ir).join(`
`)}function L_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function D_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ir(i){return i!==""}function Vh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const N_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dl(i){return i.replace(N_,U_)}const F_=new Map;function U_(i,e){let t=Ue[e];if(t===void 0){const n=F_.get(e);if(n!==void 0)t=Ue[n],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Dl(t)}const O_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hh(i){return i.replace(O_,B_)}function B_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const k_={[or]:"SHADOWMAP_TYPE_PCF",[nr]:"SHADOWMAP_TYPE_VSM"};function z_(i){return k_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const V_={[ki]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE",[Da]:"ENVMAP_TYPE_CUBE_UV"};function G_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":V_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const H_={[Ls]:"ENVMAP_MODE_REFRACTION"};function W_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":H_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const X_={[Yl]:"ENVMAP_BLENDING_MULTIPLY",[Lm]:"ENVMAP_BLENDING_MIX",[Dm]:"ENVMAP_BLENDING_ADD"};function q_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":X_[i.combine]||"ENVMAP_BLENDING_NONE"}function Z_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Y_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=z_(t),c=G_(t),h=W_(t),d=q_(t),u=Z_(t),f=I_(t),g=L_(r),v=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ir).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ir).join(`
`),p.length>0&&(p+=`
`)):(m=[Wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ir).join(`
`),p=[Wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Gn?C_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,A_("linearToOutputTexel",t.outputColorSpace),P_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ir).join(`
`)),a=Dl(a),a=Vh(a,t),a=Gh(a,t),o=Dl(o),o=Vh(o,t),o=Gh(o,t),a=Hh(a),o=Hh(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===eh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===eh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=y+m+a,M=y+p+o,T=Bh(s,s.VERTEX_SHADER,w),b=Bh(s,s.FRAGMENT_SHADER,M);s.attachShader(v,T),s.attachShader(v,b),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(P){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(v)||"",W=s.getShaderInfoLog(T)||"",X=s.getShaderInfoLog(b)||"",O=L.trim(),H=W.trim(),F=X.trim();let q=!0,ee=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,b);else{const ie=zh(s,T,"vertex"),Q=zh(s,b,"fragment");qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+ie+`
`+Q)}else O!==""?Re("WebGLProgram: Program Info Log:",O):(H===""||F==="")&&(ee=!1);ee&&(P.diagnostics={runnable:q,programLog:O,vertexShader:{log:H,prefix:m},fragmentShader:{log:F,prefix:p}})}s.deleteShader(T),s.deleteShader(b),_=new fa(s,v),E=D_(s,v)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(v,E_)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=b_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=b,this}let $_=0;class K_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new J_(e),t.set(e,n)),n}}class J_{constructor(e){this.id=$_++,this.code=e,this.usedTimes=0}}function Q_(i){return i===Vi||i===Ma||i===ya}function j_(i,e,t,n,s,r){const a=new fd,o=new K_,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,E,C,P,L,W){const X=P.fog,O=L.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,F=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,q=e.get(_.envMap||H,F),ee=q&&q.mapping===Da?q.image.height:null,ie=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Re("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const Q=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,oe=Q!==void 0?Q.length:0;let ke=0;O.morphAttributes.position!==void 0&&(ke=1),O.morphAttributes.normal!==void 0&&(ke=2),O.morphAttributes.color!==void 0&&(ke=3);let $e,Ve,J,re;if(ie){const xe=Dn[ie];$e=xe.vertexShader,Ve=xe.fragmentShader}else{$e=_.vertexShader,Ve=_.fragmentShader;const xe=o.getVertexShaderStage(_),mt=o.getFragmentShaderStage(_);o.update(_,xe,mt),J=xe.id,re=mt.id}const te=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),De=L.isInstancedMesh===!0,Te=L.isBatchedMesh===!0,xt=!!_.map,ze=!!_.matcap,nt=!!q,Ye=!!_.aoMap,We=!!_.lightMap,yt=!!_.bumpMap&&_.wireframe===!1,Tt=!!_.normalMap,It=!!_.displacementMap,Nt=!!_.emissiveMap,pt=!!_.metalnessMap,St=!!_.roughnessMap,D=_.anisotropy>0,Kt=_.clearcoat>0,Ke=_.dispersion>0,R=_.iridescence>0,x=_.sheen>0,B=_.transmission>0,V=D&&!!_.anisotropyMap,Z=Kt&&!!_.clearcoatMap,ne=Kt&&!!_.clearcoatNormalMap,ae=Kt&&!!_.clearcoatRoughnessMap,Y=R&&!!_.iridescenceMap,K=R&&!!_.iridescenceThicknessMap,le=x&&!!_.sheenColorMap,ye=x&&!!_.sheenRoughnessMap,ue=!!_.specularMap,ce=!!_.specularColorMap,be=!!_.specularIntensityMap,Ae=B&&!!_.transmissionMap,Ne=B&&!!_.thicknessMap,I=!!_.gradientMap,se=!!_.alphaMap,$=_.alphaTest>0,he=!!_.alphaHash,me=!!_.extensions;let j=Gn;_.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(j=i.toneMapping);const Me={shaderID:ie,shaderType:_.type,shaderName:_.name,vertexShader:$e,fragmentShader:Ve,defines:_.defines,customVertexShaderID:J,customFragmentShaderID:re,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:Te,batchingColor:Te&&L._colorsTexture!==null,instancing:De,instancingColor:De&&L.instanceColor!==null,instancingMorph:De&&L.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Ge.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:xt,matcap:ze,envMap:nt,envMapMode:nt&&q.mapping,envMapCubeUVHeight:ee,aoMap:Ye,lightMap:We,bumpMap:yt,normalMap:Tt,displacementMap:It,emissiveMap:Nt,normalMapObjectSpace:Tt&&_.normalMapType===Um,normalMapTangentSpace:Tt&&_.normalMapType===Sa,packedNormalMap:Tt&&_.normalMapType===Sa&&Q_(_.normalMap.format),metalnessMap:pt,roughnessMap:St,anisotropy:D,anisotropyMap:V,clearcoat:Kt,clearcoatMap:Z,clearcoatNormalMap:ne,clearcoatRoughnessMap:ae,dispersion:Ke,iridescence:R,iridescenceMap:Y,iridescenceThicknessMap:K,sheen:x,sheenColorMap:le,sheenRoughnessMap:ye,specularMap:ue,specularColorMap:ce,specularIntensityMap:be,transmission:B,transmissionMap:Ae,thicknessMap:Ne,gradientMap:I,opaque:_.transparent===!1&&_.blending===Rs&&_.alphaToCoverage===!1,alphaMap:se,alphaTest:$,alphaHash:he,combine:_.combine,mapUv:xt&&g(_.map.channel),aoMapUv:Ye&&g(_.aoMap.channel),lightMapUv:We&&g(_.lightMap.channel),bumpMapUv:yt&&g(_.bumpMap.channel),normalMapUv:Tt&&g(_.normalMap.channel),displacementMapUv:It&&g(_.displacementMap.channel),emissiveMapUv:Nt&&g(_.emissiveMap.channel),metalnessMapUv:pt&&g(_.metalnessMap.channel),roughnessMapUv:St&&g(_.roughnessMap.channel),anisotropyMapUv:V&&g(_.anisotropyMap.channel),clearcoatMapUv:Z&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ne&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:le&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(_.sheenRoughnessMap.channel),specularMapUv:ue&&g(_.specularMap.channel),specularColorMapUv:ce&&g(_.specularColorMap.channel),specularIntensityMapUv:be&&g(_.specularIntensityMap.channel),transmissionMapUv:Ae&&g(_.transmissionMap.channel),thicknessMapUv:Ne&&g(_.thicknessMap.channel),alphaMapUv:se&&g(_.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Tt||D),vertexNormals:!!O.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!O.attributes.uv&&(xt||se),fog:!!X,useFog:_.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||O.attributes.normal===void 0&&Tt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ce,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:ke,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:j,decodeVideoTexture:xt&&_.map.isVideoTexture===!0&&Ge.getTransfer(_.map.colorSpace)===Je,decodeVideoTextureEmissive:Nt&&_.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(_.emissiveMap.colorSpace)===Je,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Un,flipSided:_.side===$t,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:me&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&_.extensions.multiDraw===!0||Te)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function m(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const C in _.defines)E.push(C),E.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(p(E,_),y(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function p(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function y(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function w(_){const E=f[_.type];let C;if(E){const P=Dn[E];C=_0.clone(P.uniforms)}else C=_.uniforms;return C}function M(_,E){let C=h.get(E);return C!==void 0?++C.usedTimes:(C=new Y_(i,E,_,s),c.push(C),h.set(E,C)),C}function T(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function A(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:w,acquireProgram:M,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:A}}function eM(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function tM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Xh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function qh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,v,m,p){let y=i[e];return y===void 0?(y={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:p},i[e]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=g,y.materialVariant=a(u),y.groupOrder=v,y.renderOrder=u.renderOrder,y.z=m,y.group=p),e++,y}function l(u,f,g,v,m,p){const y=o(u,f,g,v,m,p);g.transmission>0?n.push(y):g.transparent===!0?s.push(y):t.push(y)}function c(u,f,g,v,m,p){const y=o(u,f,g,v,m,p);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):t.unshift(y)}function h(u,f,g){t.length>1&&t.sort(u||tM),n.length>1&&n.sort(f||Xh),s.length>1&&s.sort(f||Xh),g&&(t.reverse(),n.reverse(),s.reverse())}function d(){for(let u=e,f=i.length;u<f;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function nM(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new qh,i.set(n,[a])):s>=r.length?(a=new qh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function iM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Pe};break;case"SpotLight":t={position:new U,direction:new U,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function sM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let rM=0;function aM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function oM(i){const e=new iM,t=sM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const s=new U,r=new Ze,a=new Ze;function o(c){let h=0,d=0,u=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,y=0,w=0,M=0,T=0,b=0,A=0;c.sort(aM);for(let E=0,C=c.length;E<C;E++){const P=c[E],L=P.color,W=P.intensity,X=P.distance;let O=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Vi?O=P.shadow.map.texture:O=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=L.r*W,d+=L.g*W,u+=L.b*W;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],W);A++}else if(P.isDirectionalLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const F=P.shadow,q=t.get(P);q.shadowIntensity=F.intensity,q.shadowBias=F.bias,q.shadowNormalBias=F.normalBias,q.shadowRadius=F.radius,q.shadowMapSize=F.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=P.shadow.matrix,y++}n.directional[f]=H,f++}else if(P.isSpotLight){const H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(L).multiplyScalar(W),H.distance=X,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[v]=H;const F=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,F.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[v]=F.matrix,P.castShadow){const q=t.get(P);q.shadowIntensity=F.intensity,q.shadowBias=F.bias,q.shadowNormalBias=F.normalBias,q.shadowRadius=F.radius,q.shadowMapSize=F.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=O,M++}v++}else if(P.isRectAreaLight){const H=e.get(P);H.color.copy(L).multiplyScalar(W),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=H,m++}else if(P.isPointLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const F=P.shadow,q=t.get(P);q.shadowIntensity=F.intensity,q.shadowBias=F.bias,q.shadowNormalBias=F.normalBias,q.shadowRadius=F.radius,q.shadowMapSize=F.mapSize,q.shadowCameraNear=F.camera.near,q.shadowCameraFar=F.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=O,n.pointShadowMatrix[g]=P.shadow.matrix,w++}n.point[g]=H,g++}else if(P.isHemisphereLight){const H=e.get(P);H.skyColor.copy(P.color).multiplyScalar(W),H.groundColor.copy(P.groundColor).multiplyScalar(W),n.hemi[p]=H,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const _=n.hash;(_.directionalLength!==f||_.pointLength!==g||_.spotLength!==v||_.rectAreaLength!==m||_.hemiLength!==p||_.numDirectionalShadows!==y||_.numPointShadows!==w||_.numSpotShadows!==M||_.numSpotMaps!==T||_.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=M+T-b,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,_.directionalLength=f,_.pointLength=g,_.spotLength=v,_.rectAreaLength=m,_.hemiLength=p,_.numDirectionalShadows=y,_.numPointShadows=w,_.numSpotShadows=M,_.numSpotMaps=T,_.numLightProbes=A,n.version=rM++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const w=c[p];if(w.isDirectionalLight){const M=n.directional[d];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(w.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(w.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),u++}else if(w.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Zh(i){const e=new oM(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function lM(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Zh(i),e.set(s,[o])):r>=a.length?(o=new Zh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const cM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,uM=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],dM=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Yh=new Ze,Ys=new U,bo=new U;function fM(i,e,t){let n=new oc;const s=new Le,r=new Le,a=new ft,o=new b0,l=new w0,c={},h=t.maxTextureSize,d={[ti]:$t,[$t]:ti,[Un]:Un},u=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:cM,fragmentShader:hM}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Wt;g.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new tt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=or;let p=this.type;this.render=function(b,A,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===mm&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=or);const E=i.getRenderTarget(),C=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),L=i.state;L.setBlending(jn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const W=p!==this.type;W&&A.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=b.length;X<O;X++){const H=b[X],F=H.shadow;if(F===void 0){Re("WebGLShadowMap:",H,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const q=F.getFrameExtents();s.multiply(q),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,F.mapSize.y=r.y));const ee=i.state.buffers.depth.getReversed();if(F.camera._reversedDepth=ee,F.map===null||W===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===nr){if(H.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new bn(s.x,s.y,{format:Vi,type:ni,minFilter:bt,magFilter:bt,generateMipmaps:!1}),F.map.texture.name=H.name+".shadowMap",F.map.depthTexture=new Ns(s.x,s.y,En),F.map.depthTexture.name=H.name+".shadowMapDepth",F.map.depthTexture.format=ii,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ft,F.map.depthTexture.magFilter=Ft}else H.isPointLight?(F.map=new Td(s.x),F.map.depthTexture=new v0(s.x,Xn)):(F.map=new bn(s.x,s.y),F.map.depthTexture=new Ns(s.x,s.y,Xn)),F.map.depthTexture.name=H.name+".shadowMap",F.map.depthTexture.format=ii,this.type===or?(F.map.depthTexture.compareFunction=ee?sc:ic,F.map.depthTexture.minFilter=bt,F.map.depthTexture.magFilter=bt):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ft,F.map.depthTexture.magFilter=Ft);F.camera.updateProjectionMatrix()}const ie=F.map.isWebGLCubeRenderTarget?6:1;for(let Q=0;Q<ie;Q++){if(F.map.isWebGLCubeRenderTarget)i.setRenderTarget(F.map,Q),i.clear();else{Q===0&&(i.setRenderTarget(F.map),i.clear());const oe=F.getViewport(Q);a.set(r.x*oe.x,r.y*oe.y,r.x*oe.z,r.y*oe.w),L.viewport(a)}if(H.isPointLight){const oe=F.camera,ke=F.matrix,$e=H.distance||oe.far;$e!==oe.far&&(oe.far=$e,oe.updateProjectionMatrix()),Ys.setFromMatrixPosition(H.matrixWorld),oe.position.copy(Ys),bo.copy(oe.position),bo.add(uM[Q]),oe.up.copy(dM[Q]),oe.lookAt(bo),oe.updateMatrixWorld(),ke.makeTranslation(-Ys.x,-Ys.y,-Ys.z),Yh.multiplyMatrices(oe.projectionMatrix,oe.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Yh,oe.coordinateSystem,oe.reversedDepth)}else F.updateMatrices(H);n=F.getFrustum(),M(A,_,F.camera,H,this.type)}F.isPointLightShadow!==!0&&this.type===nr&&y(F,_),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,C,P)};function y(b,A){const _=e.update(v);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new bn(s.x,s.y,{format:Vi,type:ni})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(A,null,_,u,v,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(A,null,_,f,v,null)}function w(b,A,_,E){let C=null;const P=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)C=P;else if(C=_.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const L=C.uuid,W=A.uuid;let X=c[L];X===void 0&&(X={},c[L]=X);let O=X[W];O===void 0&&(O=C.clone(),X[W]=O,A.addEventListener("dispose",T)),C=O}if(C.visible=A.visible,C.wireframe=A.wireframe,E===nr?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:d[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const L=i.properties.get(C);L.light=_}return C}function M(b,A,_,E,C){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===nr)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const W=e.update(b),X=b.material;if(Array.isArray(X)){const O=W.groups;for(let H=0,F=O.length;H<F;H++){const q=O[H],ee=X[q.materialIndex];if(ee&&ee.visible){const ie=w(b,ee,E,C);b.onBeforeShadow(i,b,A,_,W,ie,q),i.renderBufferDirect(_,null,W,ie,b,q),b.onAfterShadow(i,b,A,_,W,ie,q)}}}else if(X.visible){const O=w(b,X,E,C);b.onBeforeShadow(i,b,A,_,W,O,null),i.renderBufferDirect(_,null,W,O,b,null),b.onAfterShadow(i,b,A,_,W,O,null)}}const L=b.children;for(let W=0,X=L.length;W<X;W++)M(L[W],A,_,E,C)}function T(b){b.target.removeEventListener("dispose",T);for(const _ in c){const E=c[_],C=b.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function pM(i,e){function t(){let I=!1;const se=new ft;let $=null;const he=new ft(0,0,0,0);return{setMask:function(me){$!==me&&!I&&(i.colorMask(me,me,me,me),$=me)},setLocked:function(me){I=me},setClear:function(me,j,Me,xe,mt){mt===!0&&(me*=xe,j*=xe,Me*=xe),se.set(me,j,Me,xe),he.equals(se)===!1&&(i.clearColor(me,j,Me,xe),he.copy(se))},reset:function(){I=!1,$=null,he.set(-1,0,0,0)}}}function n(){let I=!1,se=!1,$=null,he=null,me=null;return{setReversed:function(j){if(se!==j){const Me=e.get("EXT_clip_control");j?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),se=j;const xe=me;me=null,this.setClear(xe)}},getReversed:function(){return se},setTest:function(j){j?te(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(j){$!==j&&!I&&(i.depthMask(j),$=j)},setFunc:function(j){if(se&&(j=qm[j]),he!==j){switch(j){case qo:i.depthFunc(i.NEVER);break;case Zo:i.depthFunc(i.ALWAYS);break;case Yo:i.depthFunc(i.LESS);break;case Is:i.depthFunc(i.LEQUAL);break;case $o:i.depthFunc(i.EQUAL);break;case Ko:i.depthFunc(i.GEQUAL);break;case Jo:i.depthFunc(i.GREATER);break;case Qo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}he=j}},setLocked:function(j){I=j},setClear:function(j){me!==j&&(me=j,se&&(j=1-j),i.clearDepth(j))},reset:function(){I=!1,$=null,he=null,me=null,se=!1}}}function s(){let I=!1,se=null,$=null,he=null,me=null,j=null,Me=null,xe=null,mt=null;return{setTest:function(at){I||(at?te(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(at){se!==at&&!I&&(i.stencilMask(at),se=at)},setFunc:function(at,An,Rn){($!==at||he!==An||me!==Rn)&&(i.stencilFunc(at,An,Rn),$=at,he=An,me=Rn)},setOp:function(at,An,Rn){(j!==at||Me!==An||xe!==Rn)&&(i.stencilOp(at,An,Rn),j=at,Me=An,xe=Rn)},setLocked:function(at){I=at},setClear:function(at){mt!==at&&(i.clearStencil(at),mt=at)},reset:function(){I=!1,se=null,$=null,he=null,me=null,j=null,Me=null,xe=null,mt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,y=null,w=null,M=null,T=null,b=null,A=null,_=new Pe(0,0,0),E=0,C=!1,P=null,L=null,W=null,X=null,O=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,q=0;const ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(ee)[1]),F=q>=1):ee.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),F=q>=2);let ie=null,Q={};const oe=i.getParameter(i.SCISSOR_BOX),ke=i.getParameter(i.VIEWPORT),$e=new ft().fromArray(oe),Ve=new ft().fromArray(ke);function J(I,se,$,he){const me=new Uint8Array(4),j=i.createTexture();i.bindTexture(I,j),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Me=0;Me<$;Me++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,he,0,i.RGBA,i.UNSIGNED_BYTE,me):i.texImage2D(se+Me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,me);return j}const re={};re[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),re[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),re[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(Is),yt(!1),Tt($c),te(i.CULL_FACE),Ye(jn);function te(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Ce(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function De(I,se){return u[I]!==se?(i.bindFramebuffer(I,se),u[I]=se,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Te(I,se){let $=g,he=!1;if(I){$=f.get(se),$===void 0&&($=[],f.set(se,$));const me=I.textures;if($.length!==me.length||$[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Me=me.length;j<Me;j++)$[j]=i.COLOR_ATTACHMENT0+j;$.length=me.length,he=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,he=!0);he&&i.drawBuffers($)}function xt(I){return v!==I?(i.useProgram(I),v=I,!0):!1}const ze={[Qn]:i.FUNC_ADD,[gm]:i.FUNC_SUBTRACT,[vm]:i.FUNC_REVERSE_SUBTRACT};ze[xm]=i.MIN,ze[_m]=i.MAX;const nt={[Mm]:i.ZERO,[Wo]:i.ONE,[ym]:i.SRC_COLOR,[Xo]:i.SRC_ALPHA,[Am]:i.SRC_ALPHA_SATURATE,[wm]:i.DST_COLOR,[Em]:i.DST_ALPHA,[Sm]:i.ONE_MINUS_SRC_COLOR,[ur]:i.ONE_MINUS_SRC_ALPHA,[Tm]:i.ONE_MINUS_DST_COLOR,[bm]:i.ONE_MINUS_DST_ALPHA,[Rm]:i.CONSTANT_COLOR,[Cm]:i.ONE_MINUS_CONSTANT_COLOR,[Pm]:i.CONSTANT_ALPHA,[Im]:i.ONE_MINUS_CONSTANT_ALPHA};function Ye(I,se,$,he,me,j,Me,xe,mt,at){if(I===jn){m===!0&&(Ce(i.BLEND),m=!1);return}if(m===!1&&(te(i.BLEND),m=!0),I!==Ju){if(I!==p||at!==C){if((y!==Qn||T!==Qn)&&(i.blendEquation(i.FUNC_ADD),y=Qn,T=Qn),at)switch(I){case Rs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bi:i.blendFunc(i.ONE,i.ONE);break;case Kc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qe("WebGLState: Invalid blending: ",I);break}else switch(I){case Rs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Kc:qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jc:qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qe("WebGLState: Invalid blending: ",I);break}w=null,M=null,b=null,A=null,_.set(0,0,0),E=0,p=I,C=at}return}me=me||se,j=j||$,Me=Me||he,(se!==y||me!==T)&&(i.blendEquationSeparate(ze[se],ze[me]),y=se,T=me),($!==w||he!==M||j!==b||Me!==A)&&(i.blendFuncSeparate(nt[$],nt[he],nt[j],nt[Me]),w=$,M=he,b=j,A=Me),(xe.equals(_)===!1||mt!==E)&&(i.blendColor(xe.r,xe.g,xe.b,mt),_.copy(xe),E=mt),p=I,C=!1}function We(I,se){I.side===Un?Ce(i.CULL_FACE):te(i.CULL_FACE);let $=I.side===$t;se&&($=!$),yt($),I.blending===Rs&&I.transparent===!1?Ye(jn):Ye(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const he=I.stencilWrite;o.setTest(he),he&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Nt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function yt(I){P!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),P=I)}function Tt(I){I!==fm?(te(i.CULL_FACE),I!==L&&(I===$c?i.cullFace(i.BACK):I===pm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),L=I}function It(I){I!==W&&(F&&i.lineWidth(I),W=I)}function Nt(I,se,$){I?(te(i.POLYGON_OFFSET_FILL),(X!==se||O!==$)&&(X=se,O=$,a.getReversed()&&(se=-se),i.polygonOffset(se,$))):Ce(i.POLYGON_OFFSET_FILL)}function pt(I){I?te(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function St(I){I===void 0&&(I=i.TEXTURE0+H-1),ie!==I&&(i.activeTexture(I),ie=I)}function D(I,se,$){$===void 0&&(ie===null?$=i.TEXTURE0+H-1:$=ie);let he=Q[$];he===void 0&&(he={type:void 0,texture:void 0},Q[$]=he),(he.type!==I||he.texture!==se)&&(ie!==$&&(i.activeTexture($),ie=$),i.bindTexture(I,se||re[I]),he.type=I,he.texture=se)}function Kt(){const I=Q[ie];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Ke(){try{i.compressedTexImage2D(...arguments)}catch(I){qe("WebGLState:",I)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(I){qe("WebGLState:",I)}}function x(){try{i.texSubImage2D(...arguments)}catch(I){qe("WebGLState:",I)}}function B(){try{i.texSubImage3D(...arguments)}catch(I){qe("WebGLState:",I)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(I){qe("WebGLState:",I)}}function Z(){try{i.compressedTexSubImage3D(...arguments)}catch(I){qe("WebGLState:",I)}}function ne(){try{i.texStorage2D(...arguments)}catch(I){qe("WebGLState:",I)}}function ae(){try{i.texStorage3D(...arguments)}catch(I){qe("WebGLState:",I)}}function Y(){try{i.texImage2D(...arguments)}catch(I){qe("WebGLState:",I)}}function K(){try{i.texImage3D(...arguments)}catch(I){qe("WebGLState:",I)}}function le(I){return d[I]!==void 0?d[I]:i.getParameter(I)}function ye(I,se){d[I]!==se&&(i.pixelStorei(I,se),d[I]=se)}function ue(I){$e.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),$e.copy(I))}function ce(I){Ve.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Ve.copy(I))}function be(I,se){let $=c.get(se);$===void 0&&($=new WeakMap,c.set(se,$));let he=$.get(I);he===void 0&&(he=i.getUniformBlockIndex(se,I.name),$.set(I,he))}function Ae(I,se){const he=c.get(se).get(I);l.get(se)!==he&&(i.uniformBlockBinding(se,he,I.__bindingPointIndex),l.set(se,he))}function Ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ie=null,Q={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,y=null,w=null,M=null,T=null,b=null,A=null,_=new Pe(0,0,0),E=0,C=!1,P=null,L=null,W=null,X=null,O=null,$e.set(0,0,i.canvas.width,i.canvas.height),Ve.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:te,disable:Ce,bindFramebuffer:De,drawBuffers:Te,useProgram:xt,setBlending:Ye,setMaterial:We,setFlipSided:yt,setCullFace:Tt,setLineWidth:It,setPolygonOffset:Nt,setScissorTest:pt,activeTexture:St,bindTexture:D,unbindTexture:Kt,compressedTexImage2D:Ke,compressedTexImage3D:R,texImage2D:Y,texImage3D:K,pixelStorei:ye,getParameter:le,updateUBOMapping:be,uniformBlockBinding:Ae,texStorage2D:ne,texStorage3D:ae,texSubImage2D:x,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:ue,viewport:ce,reset:Ne}}function mM(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Le,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,x){return g?new OffscreenCanvas(R,x):wa("canvas")}function m(R,x,B){let V=1;const Z=Ke(R);if((Z.width>B||Z.height>B)&&(V=B/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ne=Math.floor(V*Z.width),ae=Math.floor(V*Z.height);u===void 0&&(u=v(ne,ae));const Y=x?v(ne,ae):u;return Y.width=ne,Y.height=ae,Y.getContext("2d").drawImage(R,0,0,ne,ae),Re("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ne+"x"+ae+")."),Y}else return"data"in R&&Re("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),R;return R}function p(R){return R.generateMipmaps}function y(R){i.generateMipmap(R)}function w(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,x,B,V,Z,ne=!1){if(R!==null){if(i[R]!==void 0)return i[R];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ae;V&&(ae=e.get("EXT_texture_norm16"),ae||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=x;if(x===i.RED&&(B===i.FLOAT&&(Y=i.R32F),B===i.HALF_FLOAT&&(Y=i.R16F),B===i.UNSIGNED_BYTE&&(Y=i.R8),B===i.UNSIGNED_SHORT&&ae&&(Y=ae.R16_EXT),B===i.SHORT&&ae&&(Y=ae.R16_SNORM_EXT)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.R8UI),B===i.UNSIGNED_SHORT&&(Y=i.R16UI),B===i.UNSIGNED_INT&&(Y=i.R32UI),B===i.BYTE&&(Y=i.R8I),B===i.SHORT&&(Y=i.R16I),B===i.INT&&(Y=i.R32I)),x===i.RG&&(B===i.FLOAT&&(Y=i.RG32F),B===i.HALF_FLOAT&&(Y=i.RG16F),B===i.UNSIGNED_BYTE&&(Y=i.RG8),B===i.UNSIGNED_SHORT&&ae&&(Y=ae.RG16_EXT),B===i.SHORT&&ae&&(Y=ae.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RG8UI),B===i.UNSIGNED_SHORT&&(Y=i.RG16UI),B===i.UNSIGNED_INT&&(Y=i.RG32UI),B===i.BYTE&&(Y=i.RG8I),B===i.SHORT&&(Y=i.RG16I),B===i.INT&&(Y=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),B===i.UNSIGNED_INT&&(Y=i.RGB32UI),B===i.BYTE&&(Y=i.RGB8I),B===i.SHORT&&(Y=i.RGB16I),B===i.INT&&(Y=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),B===i.UNSIGNED_INT&&(Y=i.RGBA32UI),B===i.BYTE&&(Y=i.RGBA8I),B===i.SHORT&&(Y=i.RGBA16I),B===i.INT&&(Y=i.RGBA32I)),x===i.RGB&&(B===i.UNSIGNED_SHORT&&ae&&(Y=ae.RGB16_EXT),B===i.SHORT&&ae&&(Y=ae.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),x===i.RGBA){const K=ne?ba:Ge.getTransfer(Z);B===i.FLOAT&&(Y=i.RGBA32F),B===i.HALF_FLOAT&&(Y=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Y=K===Je?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ae&&(Y=ae.RGBA16_EXT),B===i.SHORT&&ae&&(Y=ae.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function T(R,x){let B;return R?x===null||x===Xn||x===fr?B=i.DEPTH24_STENCIL8:x===En?B=i.DEPTH32F_STENCIL8:x===dr&&(B=i.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Xn||x===fr?B=i.DEPTH_COMPONENT24:x===En?B=i.DEPTH_COMPONENT32F:x===dr&&(B=i.DEPTH_COMPONENT16),B}function b(R,x){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ft&&R.minFilter!==bt?Math.log2(Math.max(x.width,x.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?x.mipmaps.length:1}function A(R){const x=R.target;x.removeEventListener("dispose",A),E(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function _(R){const x=R.target;x.removeEventListener("dispose",_),P(x)}function E(R){const x=n.get(R);if(x.__webglInit===void 0)return;const B=R.source,V=f.get(B);if(V){const Z=V[x.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&C(R),Object.keys(V).length===0&&f.delete(B)}n.remove(R)}function C(R){const x=n.get(R);i.deleteTexture(x.__webglTexture);const B=R.source,V=f.get(B);delete V[x.__cacheKey],a.memory.textures--}function P(R){const x=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(x.__webglFramebuffer[V]))for(let Z=0;Z<x.__webglFramebuffer[V].length;Z++)i.deleteFramebuffer(x.__webglFramebuffer[V][Z]);else i.deleteFramebuffer(x.__webglFramebuffer[V]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[V])}else{if(Array.isArray(x.__webglFramebuffer))for(let V=0;V<x.__webglFramebuffer.length;V++)i.deleteFramebuffer(x.__webglFramebuffer[V]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let V=0;V<x.__webglColorRenderbuffer.length;V++)x.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[V]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=R.textures;for(let V=0,Z=B.length;V<Z;V++){const ne=n.get(B[V]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(B[V])}n.remove(R)}let L=0;function W(){L=0}function X(){return L}function O(R){L=R}function H(){const R=L;return R>=s.maxTextures&&Re("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),L+=1,R}function F(R){const x=[];return x.push(R.wrapS),x.push(R.wrapT),x.push(R.wrapR||0),x.push(R.magFilter),x.push(R.minFilter),x.push(R.anisotropy),x.push(R.internalFormat),x.push(R.format),x.push(R.type),x.push(R.generateMipmaps),x.push(R.premultiplyAlpha),x.push(R.flipY),x.push(R.unpackAlignment),x.push(R.colorSpace),x.join()}function q(R,x){const B=n.get(R);if(R.isVideoTexture&&D(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&B.__version!==R.version){const V=R.image;if(V===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(B,R,x);return}}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function ee(R,x){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){Ce(B,R,x);return}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function ie(R,x){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){Ce(B,R,x);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function Q(R,x){const B=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&B.__version!==R.version){De(B,R,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}const oe={[zi]:i.REPEAT,[cn]:i.CLAMP_TO_EDGE,[jo]:i.MIRRORED_REPEAT},ke={[Ft]:i.NEAREST,[Nm]:i.NEAREST_MIPMAP_NEAREST,[Ar]:i.NEAREST_MIPMAP_LINEAR,[bt]:i.LINEAR,[qa]:i.LINEAR_MIPMAP_NEAREST,[Bn]:i.LINEAR_MIPMAP_LINEAR},$e={[Om]:i.NEVER,[Gm]:i.ALWAYS,[Bm]:i.LESS,[ic]:i.LEQUAL,[km]:i.EQUAL,[sc]:i.GEQUAL,[zm]:i.GREATER,[Vm]:i.NOTEQUAL};function Ve(R,x){if(x.type===En&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===bt||x.magFilter===qa||x.magFilter===Ar||x.magFilter===Bn||x.minFilter===bt||x.minFilter===qa||x.minFilter===Ar||x.minFilter===Bn)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,oe[x.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,oe[x.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,oe[x.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,ke[x.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,ke[x.minFilter]),x.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,$e[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ft||x.minFilter!==Ar&&x.minFilter!==Bn||x.type===En&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function J(R,x){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,x.addEventListener("dispose",A));const V=x.source;let Z=f.get(V);Z===void 0&&(Z={},f.set(V,Z));const ne=F(x);if(ne!==R.__cacheKey){Z[ne]===void 0&&(Z[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[ne].usedTimes++;const ae=Z[R.__cacheKey];ae!==void 0&&(Z[R.__cacheKey].usedTimes--,ae.usedTimes===0&&C(x)),R.__cacheKey=ne,R.__webglTexture=Z[ne].texture}return B}function re(R,x,B){return Math.floor(Math.floor(R/B)/x)}function te(R,x,B,V){const ne=R.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,B,V,x.data);else{ne.sort((ye,ue)=>ye.start-ue.start);let ae=0;for(let ye=1;ye<ne.length;ye++){const ue=ne[ae],ce=ne[ye],be=ue.start+ue.count,Ae=re(ce.start,x.width,4),Ne=re(ue.start,x.width,4);ce.start<=be+1&&Ae===Ne&&re(ce.start+ce.count-1,x.width,4)===Ae?ue.count=Math.max(ue.count,ce.start+ce.count-ue.start):(++ae,ne[ae]=ce)}ne.length=ae+1;const Y=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),le=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let ye=0,ue=ne.length;ye<ue;ye++){const ce=ne[ye],be=Math.floor(ce.start/4),Ae=Math.ceil(ce.count/4),Ne=be%x.width,I=Math.floor(be/x.width),se=Ae,$=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,Ne,I,se,$,B,V,x.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Y),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,le)}}function Ce(R,x,B){let V=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=i.TEXTURE_3D);const Z=J(R,x),ne=x.source;t.bindTexture(V,R.__webglTexture,i.TEXTURE0+B);const ae=n.get(ne);if(ne.version!==ae.__version||Z===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const $=Ge.getPrimaries(Ge.workingColorSpace),he=x.colorSpace===Mn?null:Ge.getPrimaries(x.colorSpace),me=x.colorSpace===Mn||$===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let K=m(x.image,!1,s.maxTextureSize);K=Kt(x,K);const le=r.convert(x.format,x.colorSpace),ye=r.convert(x.type);let ue=M(x.internalFormat,le,ye,x.normalized,x.colorSpace,x.isVideoTexture);Ve(V,x);let ce;const be=x.mipmaps,Ae=x.isVideoTexture!==!0,Ne=ae.__version===void 0||Z===!0,I=ne.dataReady,se=b(x,K);if(x.isDepthTexture)ue=T(x.format===Ui,x.type),Ne&&(Ae?t.texStorage2D(i.TEXTURE_2D,1,ue,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,ue,K.width,K.height,0,le,ye,null));else if(x.isDataTexture)if(be.length>0){Ae&&Ne&&t.texStorage2D(i.TEXTURE_2D,se,ue,be[0].width,be[0].height);for(let $=0,he=be.length;$<he;$++)ce=be[$],Ae?I&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ce.width,ce.height,le,ye,ce.data):t.texImage2D(i.TEXTURE_2D,$,ue,ce.width,ce.height,0,le,ye,ce.data);x.generateMipmaps=!1}else Ae?(Ne&&t.texStorage2D(i.TEXTURE_2D,se,ue,K.width,K.height),I&&te(x,K,le,ye)):t.texImage2D(i.TEXTURE_2D,0,ue,K.width,K.height,0,le,ye,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ae&&Ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,ue,be[0].width,be[0].height,K.depth);for(let $=0,he=be.length;$<he;$++)if(ce=be[$],x.format!==pn)if(le!==null)if(Ae){if(I)if(x.layerUpdates.size>0){const me=Th(ce.width,ce.height,x.format,x.type);for(const j of x.layerUpdates){const Me=ce.data.subarray(j*me/ce.data.BYTES_PER_ELEMENT,(j+1)*me/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,j,ce.width,ce.height,1,le,Me)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ce.width,ce.height,K.depth,le,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,ue,ce.width,ce.height,K.depth,0,ce.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ae?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ce.width,ce.height,K.depth,le,ye,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,ue,ce.width,ce.height,K.depth,0,le,ye,ce.data)}else{Ae&&Ne&&t.texStorage2D(i.TEXTURE_2D,se,ue,be[0].width,be[0].height);for(let $=0,he=be.length;$<he;$++)ce=be[$],x.format!==pn?le!==null?Ae?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ce.width,ce.height,le,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,$,ue,ce.width,ce.height,0,ce.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ae?I&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ce.width,ce.height,le,ye,ce.data):t.texImage2D(i.TEXTURE_2D,$,ue,ce.width,ce.height,0,le,ye,ce.data)}else if(x.isDataArrayTexture)if(Ae){if(Ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,ue,K.width,K.height,K.depth),I)if(x.layerUpdates.size>0){const $=Th(K.width,K.height,x.format,x.type);for(const he of x.layerUpdates){const me=K.data.subarray(he*$/K.data.BYTES_PER_ELEMENT,(he+1)*$/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,he,K.width,K.height,1,le,ye,me)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,le,ye,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ue,K.width,K.height,K.depth,0,le,ye,K.data);else if(x.isData3DTexture)Ae?(Ne&&t.texStorage3D(i.TEXTURE_3D,se,ue,K.width,K.height,K.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,le,ye,K.data)):t.texImage3D(i.TEXTURE_3D,0,ue,K.width,K.height,K.depth,0,le,ye,K.data);else if(x.isFramebufferTexture){if(Ne)if(Ae)t.texStorage2D(i.TEXTURE_2D,se,ue,K.width,K.height);else{let $=K.width,he=K.height;for(let me=0;me<se;me++)t.texImage2D(i.TEXTURE_2D,me,ue,$,he,0,le,ye,null),$>>=1,he>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),d.add(x),$.onpaint=he=>{const me=he.changedElements;for(const j of d)me.includes(j.image)&&(j.needsUpdate=!0)},$.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{const me=i.RGBA,j=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,me,j,Me,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(be.length>0){if(Ae&&Ne){const $=Ke(be[0]);t.texStorage2D(i.TEXTURE_2D,se,ue,$.width,$.height)}for(let $=0,he=be.length;$<he;$++)ce=be[$],Ae?I&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,le,ye,ce):t.texImage2D(i.TEXTURE_2D,$,ue,le,ye,ce);x.generateMipmaps=!1}else if(Ae){if(Ne){const $=Ke(K);t.texStorage2D(i.TEXTURE_2D,se,ue,$.width,$.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,ye,K)}else t.texImage2D(i.TEXTURE_2D,0,ue,le,ye,K);p(x)&&y(V),ae.__version=ne.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function De(R,x,B){if(x.image.length!==6)return;const V=J(R,x),Z=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+B);const ne=n.get(Z);if(Z.version!==ne.__version||V===!0){t.activeTexture(i.TEXTURE0+B);const ae=Ge.getPrimaries(Ge.workingColorSpace),Y=x.colorSpace===Mn?null:Ge.getPrimaries(x.colorSpace),K=x.colorSpace===Mn||ae===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const le=x.isCompressedTexture||x.image[0].isCompressedTexture,ye=x.image[0]&&x.image[0].isDataTexture,ue=[];for(let j=0;j<6;j++)!le&&!ye?ue[j]=m(x.image[j],!0,s.maxCubemapSize):ue[j]=ye?x.image[j].image:x.image[j],ue[j]=Kt(x,ue[j]);const ce=ue[0],be=r.convert(x.format,x.colorSpace),Ae=r.convert(x.type),Ne=M(x.internalFormat,be,Ae,x.normalized,x.colorSpace),I=x.isVideoTexture!==!0,se=ne.__version===void 0||V===!0,$=Z.dataReady;let he=b(x,ce);Ve(i.TEXTURE_CUBE_MAP,x);let me;if(le){I&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Ne,ce.width,ce.height);for(let j=0;j<6;j++){me=ue[j].mipmaps;for(let Me=0;Me<me.length;Me++){const xe=me[Me];x.format!==pn?be!==null?I?$&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,xe.width,xe.height,be,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Ne,xe.width,xe.height,0,xe.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,xe.width,xe.height,be,Ae,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Ne,xe.width,xe.height,0,be,Ae,xe.data)}}}else{if(me=x.mipmaps,I&&se){me.length>0&&he++;const j=Ke(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Ne,j.width,j.height)}for(let j=0;j<6;j++)if(ye){I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ue[j].width,ue[j].height,be,Ae,ue[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ne,ue[j].width,ue[j].height,0,be,Ae,ue[j].data);for(let Me=0;Me<me.length;Me++){const mt=me[Me].image[j].image;I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,mt.width,mt.height,be,Ae,mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Ne,mt.width,mt.height,0,be,Ae,mt.data)}}else{I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,be,Ae,ue[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ne,be,Ae,ue[j]);for(let Me=0;Me<me.length;Me++){const xe=me[Me];I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,be,Ae,xe.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Ne,be,Ae,xe.image[j])}}}p(x)&&y(i.TEXTURE_CUBE_MAP),ne.__version=Z.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function Te(R,x,B,V,Z,ne){const ae=r.convert(B.format,B.colorSpace),Y=r.convert(B.type),K=M(B.internalFormat,ae,Y,B.normalized,B.colorSpace),le=n.get(x),ye=n.get(B);if(ye.__renderTarget=x,!le.__hasExternalTextures){const ue=Math.max(1,x.width>>ne),ce=Math.max(1,x.height>>ne);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,ne,K,ue,ce,x.depth,0,ae,Y,null):t.texImage2D(Z,ne,K,ue,ce,0,ae,Y,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),St(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Z,ye.__webglTexture,0,pt(x)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Z,ye.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(R,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,R),x.depthBuffer){const V=x.depthTexture,Z=V&&V.isDepthTexture?V.type:null,ne=T(x.stencilBuffer,Z),ae=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;St(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(x),ne,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(x),ne,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ne,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,R)}else{const V=x.textures;for(let Z=0;Z<V.length;Z++){const ne=V[Z],ae=r.convert(ne.format,ne.colorSpace),Y=r.convert(ne.type),K=M(ne.internalFormat,ae,Y,ne.normalized,ne.colorSpace);St(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(x),K,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(x),K,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,K,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(R,x,B){const V=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(x.depthTexture);if(Z.__renderTarget=x,(!Z.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),Z.__webglTexture===void 0){Z.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,x.depthTexture);const le=r.convert(x.depthTexture.format),ye=r.convert(x.depthTexture.type);let ue;x.depthTexture.format===ii?ue=i.DEPTH_COMPONENT24:x.depthTexture.format===Ui&&(ue=i.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,ue,x.width,x.height,0,le,ye,null)}}else q(x.depthTexture,0);const ne=Z.__webglTexture,ae=pt(x),Y=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,K=x.depthTexture.format===Ui?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===ii)St(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Y,ne,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,K,Y,ne,0);else if(x.depthTexture.format===Ui)St(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Y,ne,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,K,Y,ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(R){const x=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==R.depthTexture){const V=R.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){const Z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),x.__depthDisposeCallback=Z}x.__boundDepthTexture=V}if(R.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let V=0;V<6;V++)ze(x.__webglFramebuffer[V],R,V);else{const V=R.texture.mipmaps;V&&V.length>0?ze(x.__webglFramebuffer[0],R,0):ze(x.__webglFramebuffer,R,0)}else if(B){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=i.createRenderbuffer(),xt(x.__webglDepthbuffer[V],R,!1);else{const Z=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=x.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ne)}}else{const V=R.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),xt(x.__webglDepthbuffer,R,!1);else{const Z=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(R,x,B){const V=n.get(R);x!==void 0&&Te(V.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&nt(R)}function We(R){const x=R.texture,B=n.get(R),V=n.get(x);R.addEventListener("dispose",_);const Z=R.textures,ne=R.isWebGLCubeRenderTarget===!0,ae=Z.length>1;if(ae||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=x.version,a.memory.textures++),ne){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let K=0;K<x.mipmaps.length;K++)B.__webglFramebuffer[Y][K]=i.createFramebuffer()}else B.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<x.mipmaps.length;Y++)B.__webglFramebuffer[Y]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ae)for(let Y=0,K=Z.length;Y<K;Y++){const le=n.get(Z[Y]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&St(R)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<Z.length;Y++){const K=Z[Y];B.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);const le=r.convert(K.format,K.colorSpace),ye=r.convert(K.type),ue=M(K.internalFormat,le,ye,K.normalized,K.colorSpace,R.isXRRenderTarget===!0),ce=pt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,ue,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),xt(B.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,x);for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Te(B.__webglFramebuffer[Y][K],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,K);else Te(B.__webglFramebuffer[Y],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(x)&&y(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let Y=0,K=Z.length;Y<K;Y++){const le=Z[Y],ye=n.get(le);let ue=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ue=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,ye.__webglTexture),Ve(ue,le),Te(B.__webglFramebuffer,R,le,i.COLOR_ATTACHMENT0+Y,ue,0),p(le)&&y(ue)}t.unbindTexture()}else{let Y=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Y=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Y,V.__webglTexture),Ve(Y,x),x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Te(B.__webglFramebuffer[K],R,x,i.COLOR_ATTACHMENT0,Y,K);else Te(B.__webglFramebuffer,R,x,i.COLOR_ATTACHMENT0,Y,0);p(x)&&y(Y),t.unbindTexture()}R.depthBuffer&&nt(R)}function yt(R){const x=R.textures;for(let B=0,V=x.length;B<V;B++){const Z=x[B];if(p(Z)){const ne=w(R),ae=n.get(Z).__webglTexture;t.bindTexture(ne,ae),y(ne),t.unbindTexture()}}}const Tt=[],It=[];function Nt(R){if(R.samples>0){if(St(R)===!1){const x=R.textures,B=R.width,V=R.height;let Z=i.COLOR_BUFFER_BIT;const ne=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=n.get(R),Y=x.length>1;if(Y)for(let le=0;le<x.length;le++)t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);const K=R.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let le=0;le<x.length;le++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);const ye=n.get(x[le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ye,0)}i.blitFramebuffer(0,0,B,V,0,0,B,V,Z,i.NEAREST),l===!0&&(Tt.length=0,It.length=0,Tt.push(i.COLOR_ATTACHMENT0+le),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Tt.push(ne),It.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,It)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Tt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let le=0;le<x.length;le++){t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);const ye=n.get(x[le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,ye,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const x=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function pt(R){return Math.min(s.maxSamples,R.samples)}function St(R){const x=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function D(R){const x=a.render.frame;h.get(R)!==x&&(h.set(R,x),R.update())}function Kt(R,x){const B=R.colorSpace,V=R.format,Z=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==Ea&&B!==Mn&&(Ge.getTransfer(B)===Je?(V!==pn||Z!==tn)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qe("WebGLTextures: Unsupported texture color space:",B)),x}function Ke(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=q,this.setTexture2DArray=ee,this.setTexture3D=ie,this.setTextureCube=Q,this.rebindTextures=Ye,this.setupRenderTarget=We,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function gM(i,e){function t(n,s=Mn){let r;const a=Ge.getTransfer(s);if(n===tn)return i.UNSIGNED_BYTE;if(n===Jl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ql)return i.UNSIGNED_SHORT_5_5_5_1;if(n===od)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ld)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rd)return i.BYTE;if(n===ad)return i.SHORT;if(n===dr)return i.UNSIGNED_SHORT;if(n===Kl)return i.INT;if(n===Xn)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===ni)return i.HALF_FLOAT;if(n===cd)return i.ALPHA;if(n===hd)return i.RGB;if(n===pn)return i.RGBA;if(n===ii)return i.DEPTH_COMPONENT;if(n===Ui)return i.DEPTH_STENCIL;if(n===jl)return i.RED;if(n===ec)return i.RED_INTEGER;if(n===Vi)return i.RG;if(n===tc)return i.RG_INTEGER;if(n===nc)return i.RGBA_INTEGER;if(n===ca||n===ha||n===ua||n===da)if(a===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ca)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ca)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===el||n===tl||n===nl||n===il)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===el)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===nl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===il)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===sl||n===rl||n===al||n===ol||n===ll||n===Ma||n===cl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===sl||n===rl)return a===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===al)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ol)return r.COMPRESSED_R11_EAC;if(n===ll)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ma)return r.COMPRESSED_RG11_EAC;if(n===cl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===vl||n===xl||n===_l||n===Ml||n===yl||n===Sl||n===El)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===hl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ul)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ml)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===gl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_l)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ml)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===El)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===bl||n===wl||n===Tl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===bl)return a===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Al||n===Rl||n===ya||n===Cl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Al)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Rl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Cl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const vM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class _M{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new _d(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new mn({vertexShader:vM,fragmentShader:xM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tt(new Mr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class MM extends Hi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new _M,p={},y=t.getContextAttributes();let w=null,M=null;const T=[],b=[],A=new Le;let _=null;const E=new en;E.viewport=new ft;const C=new en;C.viewport=new ft;const P=[E,C],L=new P0;let W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let re=T[J];return re===void 0&&(re=new eo,T[J]=re),re.getTargetRaySpace()},this.getControllerGrip=function(J){let re=T[J];return re===void 0&&(re=new eo,T[J]=re),re.getGripSpace()},this.getHand=function(J){let re=T[J];return re===void 0&&(re=new eo,T[J]=re),re.getHandSpace()};function O(J){const re=b.indexOf(J.inputSource);if(re===-1)return;const te=T[re];te!==void 0&&(te.update(J.inputSource,J.frame,c||a),te.dispatchEvent({type:J.type,data:J.inputSource}))}function H(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",F);for(let J=0;J<T.length;J++){const re=b[J];re!==null&&(b[J]=null,T[J].disconnect(re))}W=null,X=null,m.reset();for(const J in p)delete p[J];e.setRenderTarget(w),f=null,u=null,d=null,s=null,M=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",H),s.addEventListener("inputsourceschange",F),y.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,Ce=null,De=null;y.depth&&(De=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=y.stencil?Ui:ii,Ce=y.stencil?fr:Xn);const Te={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Te),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new bn(u.textureWidth,u.textureHeight,{format:pn,type:tn,depthTexture:new Ns(u.textureWidth,u.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const te={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new bn(f.framebufferWidth,f.framebufferHeight,{format:pn,type:tn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ve.setContext(s),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(J){for(let re=0;re<J.removed.length;re++){const te=J.removed[re],Ce=b.indexOf(te);Ce>=0&&(b[Ce]=null,T[Ce].disconnect(te))}for(let re=0;re<J.added.length;re++){const te=J.added[re];let Ce=b.indexOf(te);if(Ce===-1){for(let Te=0;Te<T.length;Te++)if(Te>=b.length){b.push(te),Ce=Te;break}else if(b[Te]===null){b[Te]=te,Ce=Te;break}if(Ce===-1)break}const De=T[Ce];De&&De.connect(te)}}const q=new U,ee=new U;function ie(J,re,te){q.setFromMatrixPosition(re.matrixWorld),ee.setFromMatrixPosition(te.matrixWorld);const Ce=q.distanceTo(ee),De=re.projectionMatrix.elements,Te=te.projectionMatrix.elements,xt=De[14]/(De[10]-1),ze=De[14]/(De[10]+1),nt=(De[9]+1)/De[5],Ye=(De[9]-1)/De[5],We=(De[8]-1)/De[0],yt=(Te[8]+1)/Te[0],Tt=xt*We,It=xt*yt,Nt=Ce/(-We+yt),pt=Nt*-We;if(re.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(pt),J.translateZ(Nt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),De[10]===-1)J.projectionMatrix.copy(re.projectionMatrix),J.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const St=xt+Nt,D=ze+Nt,Kt=Tt-pt,Ke=It+(Ce-pt),R=nt*ze/D*St,x=Ye*ze/D*St;J.projectionMatrix.makePerspective(Kt,Ke,R,x,St,D),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Q(J,re){re===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(re.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let re=J.near,te=J.far;m.texture!==null&&(m.depthNear>0&&(re=m.depthNear),m.depthFar>0&&(te=m.depthFar)),L.near=C.near=E.near=re,L.far=C.far=E.far=te,(W!==L.near||X!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),W=L.near,X=L.far),L.layers.mask=J.layers.mask|6,E.layers.mask=L.layers.mask&-5,C.layers.mask=L.layers.mask&-3;const Ce=J.parent,De=L.cameras;Q(L,Ce);for(let Te=0;Te<De.length;Te++)Q(De[Te],Ce);De.length===2?ie(L,E,C):L.projectionMatrix.copy(E.projectionMatrix),oe(J,L,Ce)};function oe(J,re,te){te===null?J.matrix.copy(re.matrixWorld):(J.matrix.copy(te.matrixWorld),J.matrix.invert(),J.matrix.multiply(re.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(re.projectionMatrix),J.projectionMatrixInverse.copy(re.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Pl*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(J){return p[J]};let ke=null;function $e(J,re){if(h=re.getViewerPose(c||a),g=re,h!==null){const te=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ce=!1;te.length!==L.cameras.length&&(L.cameras.length=0,Ce=!0);for(let ze=0;ze<te.length;ze++){const nt=te[ze];let Ye=null;if(f!==null)Ye=f.getViewport(nt);else{const yt=d.getViewSubImage(u,nt);Ye=yt.viewport,ze===0&&(e.setRenderTargetTextures(M,yt.colorTexture,yt.depthStencilTexture),e.setRenderTarget(M))}let We=P[ze];We===void 0&&(We=new en,We.layers.enable(ze),We.viewport=new ft,P[ze]=We),We.matrix.fromArray(nt.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(nt.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),ze===0&&(L.matrix.copy(We.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ce===!0&&L.cameras.push(We)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const ze=d.getDepthInformation(te[0]);ze&&ze.isValid&&ze.texture&&m.init(ze,s.renderState)}if(De&&De.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let ze=0;ze<te.length;ze++){const nt=te[ze].camera;if(nt){let Ye=p[nt];Ye||(Ye=new _d,p[nt]=Ye);const We=d.getCameraImage(nt);Ye.sourceTexture=We}}}}for(let te=0;te<T.length;te++){const Ce=b[te],De=T[te];Ce!==null&&De!==void 0&&De.update(Ce,re,c||a)}ke&&ke(J,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}const Ve=new bd;Ve.setAnimationLoop($e),this.setAnimationLoop=function(J){ke=J},this.dispose=function(){}}}const yM=new Ze,Id=new Ie;Id.set(-1,0,0,0,1,0,0,0,1);function SM(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Md(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,w,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$t&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$t&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),w=y.envMap,M=y.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(yM.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Id),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$t&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function EM(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,T){const b=T.program;n.uniformBlockBinding(M,b)}function c(M,T){let b=s[M.id];b===void 0&&(m(M),b=h(M),s[M.id]=b,M.addEventListener("dispose",y));const A=T.program;n.updateUBOMapping(M,A);const _=e.render.frame;r[M.id]!==_&&(u(M),r[M.id]=_)}function h(M){const T=d();M.__bindingPointIndex=T;const b=i.createBuffer(),A=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,A,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,b),b}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const T=s[M.id],b=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,E=b.length;_<E;_++){const C=b[_];if(Array.isArray(C))for(let P=0,L=C.length;P<L;P++)f(C[P],_,P,A);else f(C,_,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,T,b,A){if(v(M,T,b,A)===!0){const _=M.__offset,E=M.value;if(Array.isArray(E)){let C=0;for(let P=0;P<E.length;P++){const L=E[P],W=p(L);g(L,M.__data,C),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(C+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function g(M,T,b){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,b)}function v(M,T,b,A){const _=M.value,E=T+"_"+b;if(A[E]===void 0)return typeof _=="number"||typeof _=="boolean"?A[E]=_:ArrayBuffer.isView(_)?A[E]=_.slice():A[E]=_.clone(),!0;{const C=A[E];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return A[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function m(M){const T=M.uniforms;let b=0;const A=16;for(let E=0,C=T.length;E<C;E++){const P=Array.isArray(T[E])?T[E]:[T[E]];for(let L=0,W=P.length;L<W;L++){const X=P[L],O=Array.isArray(X.value)?X.value:[X.value];for(let H=0,F=O.length;H<F;H++){const q=O[H],ee=p(q),ie=b%A,Q=ie%ee.boundary,oe=ie+Q;b+=Q,oe!==0&&A-oe<ee.storage&&(b+=A-oe),X.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=b,b+=ee.storage}}}const _=b%A;return _>0&&(b+=A-_),M.__size=b,M.__cache={},this}function p(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",M),T}function y(M){const T=M.target;T.removeEventListener("dispose",y);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function w(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}const bM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let In=null;function wM(){return In===null&&(In=new vd(bM,16,16,Vi,ni),In.name="DFG_LUT",In.minFilter=bt,In.magFilter=bt,In.wrapS=cn,In.wrapT=cn,In.generateMipmaps=!1,In.needsUpdate=!0),In}class TM{constructor(e={}){const{canvas:t=Wm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=tn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=f,m=new Set([nc,tc,ec]),p=new Set([tn,Xn,dr,fr,Jl,Ql]),y=new Uint32Array(4),w=new Int32Array(4),M=new U;let T=null,b=null;const A=[],_=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let P=!1,L=null,W=null,X=null,O=null;this._outputColorSpace=Zt;let H=0,F=0,q=null,ee=-1,ie=null;const Q=new ft,oe=new ft;let ke=null;const $e=new Pe(0);let Ve=0,J=t.width,re=t.height,te=1,Ce=null,De=null;const Te=new ft(0,0,J,re),xt=new ft(0,0,J,re);let ze=!1;const nt=new oc;let Ye=!1,We=!1;const yt=new Ze,Tt=new U,It=new ft,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function St(){return q===null?te:1}let D=n;function Kt(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zl}`),t.addEventListener("webglcontextlost",mt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",An,!1),D===null){const N="webgl2";if(D=Kt(N,S),D===null)throw Kt(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw qe("WebGLRenderer: "+S.message),S}let Ke,R,x,B,V,Z,ne,ae,Y,K,le,ye,ue,ce,be,Ae,Ne,I,se,$,he,me,j;function Me(){Ke=new wx(D),Ke.init(),he=new gM(D,Ke),R=new vx(D,Ke,e,he),x=new pM(D,Ke),R.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),W=D.createFramebuffer(),X=D.createFramebuffer(),O=D.createFramebuffer(),B=new Rx(D),V=new eM,Z=new mM(D,Ke,x,V,R,he,B),ne=new bx(C),ae=new L0(D),me=new mx(D,ae),Y=new Tx(D,ae,B,me),K=new Px(D,Y,ae,me,B),I=new Cx(D,R,Z),be=new xx(V),le=new j_(C,ne,Ke,R,me,be),ye=new SM(C,V),ue=new nM,ce=new lM(Ke),Ne=new px(C,ne,x,K,g,l),Ae=new fM(C,K,R),j=new EM(D,B,R,x),se=new gx(D,Ke,B),$=new Ax(D,Ke,B),B.programs=le.programs,C.capabilities=R,C.extensions=Ke,C.properties=V,C.renderLists=ue,C.shadowMap=Ae,C.state=x,C.info=B}Me(),v!==tn&&(E=new Lx(v,t.width,t.height,o,s,r));const xe=new MM(C,D);this.xr=xe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=Ke.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ke.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(S){S!==void 0&&(te=S,this.setSize(J,re,!1))},this.getSize=function(S){return S.set(J,re)},this.setSize=function(S,N,G=!0){if(xe.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}J=S,re=N,t.width=Math.floor(S*te),t.height=Math.floor(N*te),G===!0&&(t.style.width=S+"px",t.style.height=N+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(J*te,re*te).floor()},this.setDrawingBufferSize=function(S,N,G){J=S,re=N,te=G,t.width=Math.floor(S*G),t.height=Math.floor(N*G),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(v===tn){qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){Re("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(Q)},this.getViewport=function(S){return S.copy(Te)},this.setViewport=function(S,N,G,k){S.isVector4?Te.set(S.x,S.y,S.z,S.w):Te.set(S,N,G,k),x.viewport(Q.copy(Te).multiplyScalar(te).round())},this.getScissor=function(S){return S.copy(xt)},this.setScissor=function(S,N,G,k){S.isVector4?xt.set(S.x,S.y,S.z,S.w):xt.set(S,N,G,k),x.scissor(oe.copy(xt).multiplyScalar(te).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(S){x.setScissorTest(ze=S)},this.setOpaqueSort=function(S){Ce=S},this.setTransparentSort=function(S){De=S},this.getClearColor=function(S){return S.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,G=!0){let k=0;if(S){let z=!1;if(q!==null){const pe=q.texture.format;z=m.has(pe)}if(z){const pe=q.texture.type,ve=p.has(pe),fe=Ne.getClearColor(),_e=Ne.getClearAlpha(),Se=fe.r,Fe=fe.g,Oe=fe.b;ve?(y[0]=Se,y[1]=Fe,y[2]=Oe,y[3]=_e,D.clearBufferuiv(D.COLOR,0,y)):(w[0]=Se,w[1]=Fe,w[2]=Oe,w[3]=_e,D.clearBufferiv(D.COLOR,0,w))}else k|=D.COLOR_BUFFER_BIT}N&&(k|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),L=S},this.dispose=function(){t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",An,!1),Ne.dispose(),ue.dispose(),ce.dispose(),V.dispose(),ne.dispose(),K.dispose(),me.dispose(),j.dispose(),le.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",vc),xe.removeEventListener("sessionend",xc),Si.stop()};function mt(S){S.preventDefault(),nh("WebGLRenderer: Context Lost."),P=!0}function at(){nh("WebGLRenderer: Context Restored."),P=!1;const S=B.autoReset,N=Ae.enabled,G=Ae.autoUpdate,k=Ae.needsUpdate,z=Ae.type;Me(),B.autoReset=S,Ae.enabled=N,Ae.autoUpdate=G,Ae.needsUpdate=k,Ae.type=z}function An(S){qe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Rn(S){const N=S.target;N.removeEventListener("dispose",Rn),Zd(N)}function Zd(S){Yd(S),V.remove(S)}function Yd(S){const N=V.get(S).programs;N!==void 0&&(N.forEach(function(G){le.releaseProgram(G)}),S.isShaderMaterial&&le.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,G,k,z,pe){N===null&&(N=Nt);const ve=z.isMesh&&z.matrixWorld.determinantAffine()<0,fe=Jd(S,N,G,k,z);x.setMaterial(k,ve);let _e=G.index,Se=1;if(k.wireframe===!0){if(_e=Y.getWireframeAttribute(G),_e===void 0)return;Se=2}const Fe=G.drawRange,Oe=G.attributes.position;let Ee=Fe.start*Se,Qe=(Fe.start+Fe.count)*Se;pe!==null&&(Ee=Math.max(Ee,pe.start*Se),Qe=Math.min(Qe,(pe.start+pe.count)*Se)),_e!==null?(Ee=Math.max(Ee,0),Qe=Math.min(Qe,_e.count)):Oe!=null&&(Ee=Math.max(Ee,0),Qe=Math.min(Qe,Oe.count));const _t=Qe-Ee;if(_t<0||_t===1/0)return;me.setup(z,k,fe,G,_e);let gt,it=se;if(_e!==null&&(gt=ae.get(_e),it=$,it.setIndex(gt)),z.isMesh)k.wireframe===!0?(x.setLineWidth(k.wireframeLinewidth*St()),it.setMode(D.LINES)):it.setMode(D.TRIANGLES);else if(z.isLine){let Ut=k.linewidth;Ut===void 0&&(Ut=1),x.setLineWidth(Ut*St()),z.isLineSegments?it.setMode(D.LINES):z.isLineLoop?it.setMode(D.LINE_LOOP):it.setMode(D.LINE_STRIP)}else z.isPoints?it.setMode(D.POINTS):z.isSprite&&it.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))it.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ut=z._multiDrawStarts,ge=z._multiDrawCounts,sn=z._multiDrawCount,Xe=_e?ae.get(_e).bytesPerElement:1,hn=V.get(k).currentProgram.getUniforms();for(let Cn=0;Cn<sn;Cn++)hn.setValue(D,"_gl_DrawID",Cn),it.render(Ut[Cn]/Xe,ge[Cn])}else if(z.isInstancedMesh)it.renderInstances(Ee,_t,z.count);else if(G.isInstancedBufferGeometry){const Ut=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ge=Math.min(G.instanceCount,Ut);it.renderInstances(Ee,_t,ge)}else it.render(Ee,_t)};function gc(S,N,G){S.transparent===!0&&S.side===Un&&S.forceSinglePass===!1?(S.side=$t,S.needsUpdate=!0,Er(S,N,G),S.side=ti,S.needsUpdate=!0,Er(S,N,G),S.side=Un):Er(S,N,G)}this.compile=function(S,N,G=null){G===null&&(G=S),b=ce.get(G),b.init(N),_.push(b),G.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(b.pushLight(z),z.castShadow&&b.pushShadow(z))}),S!==G&&S.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(b.pushLight(z),z.castShadow&&b.pushShadow(z))}),b.setupLights();const k=new Set;return S.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const pe=z.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){const fe=pe[ve];gc(fe,G,z),k.add(fe)}else gc(pe,G,z),k.add(pe)}),b=_.pop(),k},this.compileAsync=function(S,N,G=null){const k=this.compile(S,N,G);return new Promise(z=>{function pe(){if(k.forEach(function(ve){V.get(ve).currentProgram.isReady()&&k.delete(ve)}),k.size===0){z(S);return}setTimeout(pe,10)}Ke.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Ba=null;function $d(S){Ba&&Ba(S)}function vc(){Si.stop()}function xc(){Si.start()}const Si=new bd;Si.setAnimationLoop($d),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(S){Ba=S,xe.setAnimationLoop(S),S===null?Si.stop():Si.start()},xe.addEventListener("sessionstart",vc),xe.addEventListener("sessionend",xc),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;L!==null&&L.renderStart(S,N);const G=xe.enabled===!0&&xe.isPresenting===!0,k=E!==null&&(q===null||G)&&E.begin(C,q);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(N),N=xe.getCamera()),S.isScene===!0&&S.onBeforeRender(C,S,N,q),b=ce.get(S,_.length),b.init(N),b.state.textureUnits=Z.getTextureUnits(),_.push(b),yt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),nt.setFromProjectionMatrix(yt,kn,N.reversedDepth),We=this.localClippingEnabled,Ye=be.init(this.clippingPlanes,We),T=ue.get(S,A.length),T.init(),A.push(T),xe.enabled===!0&&xe.isPresenting===!0){const ve=C.xr.getDepthSensingMesh();ve!==null&&ka(ve,N,-1/0,C.sortObjects)}ka(S,N,0,C.sortObjects),T.finish(),C.sortObjects===!0&&T.sort(Ce,De,N.reversedDepth),pt=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,pt&&Ne.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ye===!0&&be.beginShadows();const z=b.state.shadowsArray;if(Ae.render(z,S,N),Ye===!0&&be.endShadows(),(k&&E.hasRenderPass())===!1){const ve=T.opaque,fe=T.transmissive;if(b.setupLights(),N.isArrayCamera){const _e=N.cameras;if(fe.length>0)for(let Se=0,Fe=_e.length;Se<Fe;Se++){const Oe=_e[Se];Mc(ve,fe,S,Oe)}pt&&Ne.render(S);for(let Se=0,Fe=_e.length;Se<Fe;Se++){const Oe=_e[Se];_c(T,S,Oe,Oe.viewport)}}else fe.length>0&&Mc(ve,fe,S,N),pt&&Ne.render(S),_c(T,S,N)}q!==null&&F===0&&(Z.updateMultisampleRenderTarget(q),Z.updateRenderTargetMipmap(q)),k&&E.end(C),S.isScene===!0&&S.onAfterRender(C,S,N),me.resetDefaultState(),ee=-1,ie=null,_.pop(),_.length>0?(b=_[_.length-1],Z.setTextureUnits(b.state.textureUnits),Ye===!0&&be.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?T=A[A.length-1]:T=null,L!==null&&L.renderEnd()};function ka(S,N,G,k){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLightProbeGrid)b.pushLightProbeGrid(S);else if(S.isLight)b.pushLight(S),S.castShadow&&b.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||nt.intersectsSprite(S)){k&&It.setFromMatrixPosition(S.matrixWorld).applyMatrix4(yt);const ve=K.update(S),fe=S.material;fe.visible&&T.push(S,ve,fe,G,It.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||nt.intersectsObject(S))){const ve=K.update(S),fe=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),It.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),It.copy(ve.boundingSphere.center)),It.applyMatrix4(S.matrixWorld).applyMatrix4(yt)),Array.isArray(fe)){const _e=ve.groups;for(let Se=0,Fe=_e.length;Se<Fe;Se++){const Oe=_e[Se],Ee=fe[Oe.materialIndex];Ee&&Ee.visible&&T.push(S,ve,Ee,G,It.z,Oe)}}else fe.visible&&T.push(S,ve,fe,G,It.z,null)}}const pe=S.children;for(let ve=0,fe=pe.length;ve<fe;ve++)ka(pe[ve],N,G,k)}function _c(S,N,G,k){const{opaque:z,transmissive:pe,transparent:ve}=S;b.setupLightsView(G),Ye===!0&&be.setGlobalState(C.clippingPlanes,G),k&&x.viewport(Q.copy(k)),z.length>0&&Sr(z,N,G),pe.length>0&&Sr(pe,N,G),ve.length>0&&Sr(ve,N,G),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Mc(S,N,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[k.id]===void 0){const Ee=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[k.id]=new bn(1,1,{generateMipmaps:!0,type:Ee?ni:tn,minFilter:Bn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ge.workingColorSpace})}const pe=b.state.transmissionRenderTarget[k.id],ve=k.viewport||Q;pe.setSize(ve.z*C.transmissionResolutionScale,ve.w*C.transmissionResolutionScale);const fe=C.getRenderTarget(),_e=C.getActiveCubeFace(),Se=C.getActiveMipmapLevel();C.setRenderTarget(pe),C.getClearColor($e),Ve=C.getClearAlpha(),Ve<1&&C.setClearColor(16777215,.5),C.clear(),pt&&Ne.render(G);const Fe=C.toneMapping;C.toneMapping=Gn;const Oe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),b.setupLightsView(k),Ye===!0&&be.setGlobalState(C.clippingPlanes,k),Sr(S,G,k),Z.updateMultisampleRenderTarget(pe),Z.updateRenderTargetMipmap(pe),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Qe=0,_t=N.length;Qe<_t;Qe++){const gt=N[Qe],{object:it,geometry:Ut,material:ge,group:sn}=gt;if(ge.side===Un&&it.layers.test(k.layers)){const Xe=ge.side;ge.side=$t,ge.needsUpdate=!0,yc(it,G,k,Ut,ge,sn),ge.side=Xe,ge.needsUpdate=!0,Ee=!0}}Ee===!0&&(Z.updateMultisampleRenderTarget(pe),Z.updateRenderTargetMipmap(pe))}C.setRenderTarget(fe,_e,Se),C.setClearColor($e,Ve),Oe!==void 0&&(k.viewport=Oe),C.toneMapping=Fe}function Sr(S,N,G){const k=N.isScene===!0?N.overrideMaterial:null;for(let z=0,pe=S.length;z<pe;z++){const ve=S[z],{object:fe,geometry:_e,group:Se}=ve;let Fe=ve.material;Fe.allowOverride===!0&&k!==null&&(Fe=k),fe.layers.test(G.layers)&&yc(fe,N,G,_e,Fe,Se)}}function yc(S,N,G,k,z,pe){S.onBeforeRender(C,N,G,k,z,pe),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),z.onBeforeRender(C,N,G,k,S,pe),z.transparent===!0&&z.side===Un&&z.forceSinglePass===!1?(z.side=$t,z.needsUpdate=!0,C.renderBufferDirect(G,N,k,z,S,pe),z.side=ti,z.needsUpdate=!0,C.renderBufferDirect(G,N,k,z,S,pe),z.side=Un):C.renderBufferDirect(G,N,k,z,S,pe),S.onAfterRender(C,N,G,k,z,pe)}function Er(S,N,G){N.isScene!==!0&&(N=Nt);const k=V.get(S),z=b.state.lights,pe=b.state.shadowsArray,ve=z.state.version,fe=le.getParameters(S,z.state,pe,N,G,b.state.lightProbeGridArray),_e=le.getProgramCacheKey(fe);let Se=k.programs;k.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?N.environment:null,k.fog=N.fog;const Fe=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;k.envMap=ne.get(S.envMap||k.environment,Fe),k.envMapRotation=k.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Se===void 0&&(S.addEventListener("dispose",Rn),Se=new Map,k.programs=Se);let Oe=Se.get(_e);if(Oe!==void 0){if(k.currentProgram===Oe&&k.lightsStateVersion===ve)return Ec(S,fe),Oe}else fe.uniforms=le.getUniforms(S),L!==null&&S.isNodeMaterial&&L.build(S,G,fe),S.onBeforeCompile(fe,C),Oe=le.acquireProgram(fe,_e),Se.set(_e,Oe),k.uniforms=fe.uniforms;const Ee=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ee.clippingPlanes=be.uniform),Ec(S,fe),k.needsLights=jd(S),k.lightsStateVersion=ve,k.needsLights&&(Ee.ambientLightColor.value=z.state.ambient,Ee.lightProbe.value=z.state.probe,Ee.directionalLights.value=z.state.directional,Ee.directionalLightShadows.value=z.state.directionalShadow,Ee.spotLights.value=z.state.spot,Ee.spotLightShadows.value=z.state.spotShadow,Ee.rectAreaLights.value=z.state.rectArea,Ee.ltc_1.value=z.state.rectAreaLTC1,Ee.ltc_2.value=z.state.rectAreaLTC2,Ee.pointLights.value=z.state.point,Ee.pointLightShadows.value=z.state.pointShadow,Ee.hemisphereLights.value=z.state.hemi,Ee.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ee.spotLightMatrix.value=z.state.spotLightMatrix,Ee.spotLightMap.value=z.state.spotLightMap,Ee.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=b.state.lightProbeGridArray.length>0,k.currentProgram=Oe,k.uniformsList=null,Oe}function Sc(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=fa.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Ec(S,N){const G=V.get(S);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function Kd(S,N){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(N.matrixWorld);for(let G=0,k=S.length;G<k;G++){const z=S[G];if(z.texture!==null&&z.boundingBox.containsPoint(M))return z}return null}function Jd(S,N,G,k,z){N.isScene!==!0&&(N=Nt),Z.resetTextureUnits();const pe=N.fog,ve=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?N.environment:null,fe=q===null?C.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Ge.workingColorSpace,_e=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Se=ne.get(k.envMap||ve,_e),Fe=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Oe=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ee=!!G.morphAttributes.position,Qe=!!G.morphAttributes.normal,_t=!!G.morphAttributes.color;let gt=Gn;k.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(gt=C.toneMapping);const it=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ut=it!==void 0?it.length:0,ge=V.get(k),sn=b.state.lights;if(Ye===!0&&(We===!0||S!==ie)){const ot=S===ie&&k.id===ee;be.setState(k,S,ot)}let Xe=!1;k.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==sn.state.version||ge.outputColorSpace!==fe||z.isBatchedMesh&&ge.batching===!1||!z.isBatchedMesh&&ge.batching===!0||z.isBatchedMesh&&ge.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&ge.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&ge.instancing===!1||!z.isInstancedMesh&&ge.instancing===!0||z.isSkinnedMesh&&ge.skinning===!1||!z.isSkinnedMesh&&ge.skinning===!0||z.isInstancedMesh&&ge.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&ge.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&ge.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&ge.instancingMorph===!1&&z.morphTexture!==null||ge.envMap!==Se||k.fog===!0&&ge.fog!==pe||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==be.numPlanes||ge.numIntersection!==be.numIntersection)||ge.vertexAlphas!==Fe||ge.vertexTangents!==Oe||ge.morphTargets!==Ee||ge.morphNormals!==Qe||ge.morphColors!==_t||ge.toneMapping!==gt||ge.morphTargetsCount!==Ut||!!ge.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Xe=!0):(Xe=!0,ge.__version=k.version);let hn=ge.currentProgram;Xe===!0&&(hn=Er(k,N,z),L&&k.isNodeMaterial&&L.onUpdateProgram(k,hn,ge));let Cn=!1,ai=!1,Zi=!1;const st=hn.getUniforms(),Mt=ge.uniforms;if(x.useProgram(hn.program)&&(Cn=!0,ai=!0,Zi=!0),k.id!==ee&&(ee=k.id,ai=!0),ge.needsLights){const ot=Kd(b.state.lightProbeGridArray,z);ge.lightProbeGrid!==ot&&(ge.lightProbeGrid=ot,ai=!0)}if(Cn||ie!==S){x.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),st.setValue(D,"projectionMatrix",S.projectionMatrix),st.setValue(D,"viewMatrix",S.matrixWorldInverse);const li=st.map.cameraPosition;li!==void 0&&li.setValue(D,Tt.setFromMatrixPosition(S.matrixWorld)),R.logarithmicDepthBuffer&&st.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&st.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),ie!==S&&(ie=S,ai=!0,Zi=!0)}if(ge.needsLights&&(sn.state.directionalShadowMap.length>0&&st.setValue(D,"directionalShadowMap",sn.state.directionalShadowMap,Z),sn.state.spotShadowMap.length>0&&st.setValue(D,"spotShadowMap",sn.state.spotShadowMap,Z),sn.state.pointShadowMap.length>0&&st.setValue(D,"pointShadowMap",sn.state.pointShadowMap,Z)),z.isSkinnedMesh){st.setOptional(D,z,"bindMatrix"),st.setOptional(D,z,"bindMatrixInverse");const ot=z.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),st.setValue(D,"boneTexture",ot.boneTexture,Z))}z.isBatchedMesh&&(st.setOptional(D,z,"batchingTexture"),st.setValue(D,"batchingTexture",z._matricesTexture,Z),st.setOptional(D,z,"batchingIdTexture"),st.setValue(D,"batchingIdTexture",z._indirectTexture,Z),st.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&st.setValue(D,"batchingColorTexture",z._colorsTexture,Z));const oi=G.morphAttributes;if((oi.position!==void 0||oi.normal!==void 0||oi.color!==void 0)&&I.update(z,G,hn),(ai||ge.receiveShadow!==z.receiveShadow)&&(ge.receiveShadow=z.receiveShadow,st.setValue(D,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&N.environment!==null&&(Mt.envMapIntensity.value=N.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=wM()),ai){if(st.setValue(D,"toneMappingExposure",C.toneMappingExposure),ge.needsLights&&Qd(Mt,Zi),pe&&k.fog===!0&&ye.refreshFogUniforms(Mt,pe),ye.refreshMaterialUniforms(Mt,k,te,re,b.state.transmissionRenderTarget[S.id]),ge.needsLights&&ge.lightProbeGrid){const ot=ge.lightProbeGrid;Mt.probesSH.value=ot.texture,Mt.probesMin.value.copy(ot.boundingBox.min),Mt.probesMax.value.copy(ot.boundingBox.max),Mt.probesResolution.value.copy(ot.resolution)}fa.upload(D,Sc(ge),Mt,Z)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(fa.upload(D,Sc(ge),Mt,Z),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&st.setValue(D,"center",z.center),st.setValue(D,"modelViewMatrix",z.modelViewMatrix),st.setValue(D,"normalMatrix",z.normalMatrix),st.setValue(D,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){const ot=k.uniformsGroups;for(let li=0,Yi=ot.length;li<Yi;li++){const bc=ot[li];j.update(bc,hn),j.bind(bc,hn)}}return hn}function Qd(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function jd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(S,N,G){const k=V.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),V.get(S.texture).__webglTexture=N,V.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const G=V.get(S);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,G=0){q=S,H=N,F=G;let k=null,z=!1,pe=!1;if(S){const fe=V.get(S);if(fe.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(D.FRAMEBUFFER,fe.__webglFramebuffer),Q.copy(S.viewport),oe.copy(S.scissor),ke=S.scissorTest,x.viewport(Q),x.scissor(oe),x.setScissorTest(ke),ee=-1;return}else if(fe.__webglFramebuffer===void 0)Z.setupRenderTarget(S);else if(fe.__hasExternalTextures)Z.rebindTextures(S,V.get(S.texture).__webglTexture,V.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Fe=S.depthTexture;if(fe.__boundDepthTexture!==Fe){if(Fe!==null&&V.has(Fe)&&(S.width!==Fe.image.width||S.height!==Fe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(S)}}const _e=S.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(pe=!0);const Se=V.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Se[N])?k=Se[N][G]:k=Se[N],z=!0):S.samples>0&&Z.useMultisampledRTT(S)===!1?k=V.get(S).__webglMultisampledFramebuffer:Array.isArray(Se)?k=Se[G]:k=Se,Q.copy(S.viewport),oe.copy(S.scissor),ke=S.scissorTest}else Q.copy(Te).multiplyScalar(te).floor(),oe.copy(xt).multiplyScalar(te).floor(),ke=ze;if(G!==0&&(k=W),x.bindFramebuffer(D.FRAMEBUFFER,k)&&x.drawBuffers(S,k),x.viewport(Q),x.scissor(oe),x.setScissorTest(ke),z){const fe=V.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,fe.__webglTexture,G)}else if(pe){const fe=N;for(let _e=0;_e<S.textures.length;_e++){const Se=V.get(S.textures[_e]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+_e,Se.__webglTexture,G,fe)}}else if(S!==null&&G!==0){const fe=V.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,fe.__webglTexture,G)}ee=-1},this.readRenderTargetPixels=function(S,N,G,k,z,pe,ve,fe=0){if(!(S&&S.isWebGLRenderTarget)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(_e=_e[ve]),_e){x.bindFramebuffer(D.FRAMEBUFFER,_e);try{const Se=S.textures[fe],Fe=Se.format,Oe=Se.type;if(S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+fe),!R.textureFormatReadable(Fe)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(Oe)){qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-k&&G>=0&&G<=S.height-z&&D.readPixels(N,G,k,z,he.convert(Fe),he.convert(Oe),pe)}finally{const Se=q!==null?V.get(q).__webglFramebuffer:null;x.bindFramebuffer(D.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(S,N,G,k,z,pe,ve,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(_e=_e[ve]),_e)if(N>=0&&N<=S.width-k&&G>=0&&G<=S.height-z){x.bindFramebuffer(D.FRAMEBUFFER,_e);const Se=S.textures[fe],Fe=Se.format,Oe=Se.type;if(S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+fe),!R.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ee),D.bufferData(D.PIXEL_PACK_BUFFER,pe.byteLength,D.STREAM_READ),D.readPixels(N,G,k,z,he.convert(Fe),he.convert(Oe),0);const Qe=q!==null?V.get(q).__webglFramebuffer:null;x.bindFramebuffer(D.FRAMEBUFFER,Qe);const _t=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Xm(D,_t,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ee),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pe),D.deleteBuffer(Ee),D.deleteSync(_t),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,G=0){const k=Math.pow(2,-G),z=Math.floor(S.image.width*k),pe=Math.floor(S.image.height*k),ve=N!==null?N.x:0,fe=N!==null?N.y:0;Z.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,G,0,0,ve,fe,z,pe),x.unbindTexture()},this.copyTextureToTexture=function(S,N,G=null,k=null,z=0,pe=0){let ve,fe,_e,Se,Fe,Oe,Ee,Qe,_t;const gt=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(G!==null)ve=G.max.x-G.min.x,fe=G.max.y-G.min.y,_e=G.isBox3?G.max.z-G.min.z:1,Se=G.min.x,Fe=G.min.y,Oe=G.isBox3?G.min.z:0;else{const Mt=Math.pow(2,-z);ve=Math.floor(gt.width*Mt),fe=Math.floor(gt.height*Mt),S.isDataArrayTexture?_e=gt.depth:S.isData3DTexture?_e=Math.floor(gt.depth*Mt):_e=1,Se=0,Fe=0,Oe=0}k!==null?(Ee=k.x,Qe=k.y,_t=k.z):(Ee=0,Qe=0,_t=0);const it=he.convert(N.format),Ut=he.convert(N.type);let ge;N.isData3DTexture?(Z.setTexture3D(N,0),ge=D.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Z.setTexture2DArray(N,0),ge=D.TEXTURE_2D_ARRAY):(Z.setTexture2D(N,0),ge=D.TEXTURE_2D),x.activeTexture(D.TEXTURE0),x.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),x.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),x.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);const sn=x.getParameter(D.UNPACK_ROW_LENGTH),Xe=x.getParameter(D.UNPACK_IMAGE_HEIGHT),hn=x.getParameter(D.UNPACK_SKIP_PIXELS),Cn=x.getParameter(D.UNPACK_SKIP_ROWS),ai=x.getParameter(D.UNPACK_SKIP_IMAGES);x.pixelStorei(D.UNPACK_ROW_LENGTH,gt.width),x.pixelStorei(D.UNPACK_IMAGE_HEIGHT,gt.height),x.pixelStorei(D.UNPACK_SKIP_PIXELS,Se),x.pixelStorei(D.UNPACK_SKIP_ROWS,Fe),x.pixelStorei(D.UNPACK_SKIP_IMAGES,Oe);const Zi=S.isDataArrayTexture||S.isData3DTexture,st=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const Mt=V.get(S),oi=V.get(N),ot=V.get(Mt.__renderTarget),li=V.get(oi.__renderTarget);x.bindFramebuffer(D.READ_FRAMEBUFFER,ot.__webglFramebuffer),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,li.__webglFramebuffer);for(let Yi=0;Yi<_e;Yi++)Zi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,V.get(S).__webglTexture,z,Oe+Yi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,V.get(N).__webglTexture,pe,_t+Yi)),D.blitFramebuffer(Se,Fe,ve,fe,Ee,Qe,ve,fe,D.DEPTH_BUFFER_BIT,D.NEAREST);x.bindFramebuffer(D.READ_FRAMEBUFFER,null),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(z!==0||S.isRenderTargetTexture||V.has(S)){const Mt=V.get(S),oi=V.get(N);x.bindFramebuffer(D.READ_FRAMEBUFFER,X),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,O);for(let ot=0;ot<_e;ot++)Zi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Mt.__webglTexture,z,Oe+ot):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Mt.__webglTexture,z),st?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,oi.__webglTexture,pe,_t+ot):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,oi.__webglTexture,pe),z!==0?D.blitFramebuffer(Se,Fe,ve,fe,Ee,Qe,ve,fe,D.COLOR_BUFFER_BIT,D.NEAREST):st?D.copyTexSubImage3D(ge,pe,Ee,Qe,_t+ot,Se,Fe,ve,fe):D.copyTexSubImage2D(ge,pe,Ee,Qe,Se,Fe,ve,fe);x.bindFramebuffer(D.READ_FRAMEBUFFER,null),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else st?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(ge,pe,Ee,Qe,_t,ve,fe,_e,it,Ut,gt.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(ge,pe,Ee,Qe,_t,ve,fe,_e,it,gt.data):D.texSubImage3D(ge,pe,Ee,Qe,_t,ve,fe,_e,it,Ut,gt):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pe,Ee,Qe,ve,fe,it,Ut,gt.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pe,Ee,Qe,gt.width,gt.height,it,gt.data):D.texSubImage2D(D.TEXTURE_2D,pe,Ee,Qe,ve,fe,it,Ut,gt);x.pixelStorei(D.UNPACK_ROW_LENGTH,sn),x.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Xe),x.pixelStorei(D.UNPACK_SKIP_PIXELS,hn),x.pixelStorei(D.UNPACK_SKIP_ROWS,Cn),x.pixelStorei(D.UNPACK_SKIP_IMAGES,ai),pe===0&&N.generateMipmaps&&D.generateMipmap(ge),x.unbindTexture()},this.initRenderTarget=function(S){V.get(S).__webglFramebuffer===void 0&&Z.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Z.setTextureCube(S,0):S.isData3DTexture?Z.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Z.setTexture2DArray(S,0):Z.setTexture2D(S,0),x.unbindTexture()},this.resetState=function(){H=0,F=0,q=null,x.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ge._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ge._getUnpackColorSpace()}}class AM extends Ta{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new vt;e.deleteAttribute("uv");const t=new Rt({side:$t}),n=new Rt,s=new hc(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new tt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new mr(e,n,6),o=new wt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new tt(e,ps(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new tt(e,ps(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new tt(e,ps(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const d=new tt(e,ps(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const u=new tt(e,ps(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new tt(e,ps(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ps(i){return new E0({color:0,emissive:16777215,emissiveIntensity:i})}const Be={bodyAlbedo:11817007,eye:1842204,eyeFlash:16742954,splat:15884554,gold:11569758,shellWarm:15263453,shellCool:13095385,mechDark:1710622,coreDark:395563,violetDeep:2958169,violet:8481213,violetRim:15065333,structDark:1515560,structMid:2700355,structHi:3361379,panel:5399675,steelPale:11387080,cyan:3319759,cyanPale:9230551},Sn={roughness:.26,edgeRoughness:.5,edgeValue:.84,emissive:.12},_n={skyColor:6131632,groundColor:5003883,hemiIntensity:1.4,keyColor:14477552,keyIntensity:.62,environmentIntensity:.4,background:855827,fogNear:34,fogFar:96,exposure:1.1};function Ld(){return typeof window<"u"&&typeof window.matchMedia=="function"?i=>window.matchMedia(i):null}function Dd(i=typeof navigator<"u"?navigator:{},e=Ld()){return(e?e("(pointer: coarse)").matches:!1)&&(i.maxTouchPoints??0)>=1}function RM(i,e,t){const n=i.get("touch");return n==="1"?!0:n==="0"?!1:Dd(e,t)}const Nd={high:{level:"high",pixelRatioCap:2,maxFixtures:10,shadows:!0,shadowMapSize:1024,anisotropyCap:16,paintTexelsPerMetre:20,paintMapMax:2048,decalCapacity:160,dropletCapacity:160,flashCapacity:8,projectileLights:2,projectileShader:!0,prewarmShaders:!0},medium:{level:"medium",pixelRatioCap:1.5,maxFixtures:7,shadows:!0,shadowMapSize:512,anisotropyCap:8,paintTexelsPerMetre:14,paintMapMax:1024,decalCapacity:96,dropletCapacity:96,flashCapacity:6,projectileLights:2,projectileShader:!0,prewarmShaders:!0},low:{level:"low",pixelRatioCap:1,maxFixtures:4,shadows:!1,shadowMapSize:512,anisotropyCap:4,paintTexelsPerMetre:9,paintMapMax:512,decalCapacity:48,dropletCapacity:48,flashCapacity:4,projectileLights:1,projectileShader:!1,prewarmShaders:!0}};function Fd(i){return Nd[i]}function gr(i){return i==="high"||i==="medium"||i==="low"}function Ud(i=typeof navigator<"u"?navigator:{},e=Ld()){return Dd(i,e)?"low":(i.hardwareConcurrency??8)<=4?"medium":"high"}function CM(i){const e=i.get("quality"),t=gr(e)?e:Ud(),n=Nd[t];return i.get("basicfx")==="1"&&n.projectileShader?{...n,projectileShader:!1}:n}const $h=Math.PI/180,sr={worldFovY:75,weaponFovY:52,maxPortraitFovY:100};function Kh(i,e){if(!(e>0)||e>=1)return i;const t=2*Math.atan(Math.tan(i*$h/2)/e)/$h;return Math.min(t,sr.maxPortraitFovY)}const Jh=2;class PM{renderer;scene;camera;viewScene;viewCamera;key;hemi;environment;fixtures=[];placements=[];chosen=[];chosenDistance=[];lastFixtureX=Number.NaN;lastFixtureZ=Number.NaN;sizedWidth=-1;sizedHeight=-1;sizedRatio=-1;maxPixelRatio;quality;keyHeight=3.9;constructor(e,t=Fd("high")){this.quality=t,this.maxPixelRatio=t.pixelRatioCap,this.renderer=new TM({canvas:e,antialias:t.level!=="low",powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.maxPixelRatio)),this.renderer.outputColorSpace=Zt,this.renderer.toneMapping=$l,this.renderer.toneMappingExposure=_n.exposure,this.renderer.shadowMap.enabled=t.shadows,this.renderer.shadowMap.type=or,this.renderer.autoClear=!1,this.renderer.info.autoReset=!1,this.scene=new Ta,this.scene.background=new Pe(_n.background),this.scene.fog=new ac(_n.background,_n.fogNear,_n.fogFar),this.camera=new en(sr.worldFovY,1,.1,200),this.hemi=new Mh(_n.skyColor,_n.groundColor,_n.hemiIntensity),this.scene.add(this.hemi),this.key=new wh(_n.keyColor,_n.keyIntensity),this.key.castShadow=t.shadows,this.key.shadow.mapSize.set(t.shadowMapSize,t.shadowMapSize),this.key.shadow.bias=-.0016,this.key.shadow.normalBias=.03;const n=this.key.shadow.camera;n.near=.5,n.far=38,n.left=-14,n.right=14,n.top=14,n.bottom=-14,n.updateProjectionMatrix(),this.scene.add(this.key),this.scene.add(this.key.target);const s=new Il(this.renderer);this.environment=s.fromScene(new AM,.04).texture,s.dispose(),this.scene.environment=this.environment,this.scene.environmentIntensity=_n.environmentIntensity,this.viewScene=new Ta,this.viewScene.environment=this.environment,this.viewScene.environmentIntensity=1,this.viewCamera=new en(sr.weaponFovY,1,.01,12);const r=new wh(16777215,2.1);r.position.set(.7,1.2,1.4),this.viewScene.add(r),this.viewScene.add(new Mh(10470624,2761504,1)),this.resize()}resize(){const e=window.innerWidth,t=window.innerHeight,n=Math.min(window.devicePixelRatio,this.maxPixelRatio);if(e===this.sizedWidth&&t===this.sizedHeight&&n===this.sizedRatio)return!1;this.sizedWidth=e,this.sizedHeight=t,this.sizedRatio=n,this.renderer.setPixelRatio(n),this.renderer.setSize(e,t,!1);const s=e/Math.max(1,t);return this.camera.aspect=s,this.camera.fov=Kh(sr.worldFovY,s),this.camera.updateProjectionMatrix(),this.viewCamera.aspect=s,this.viewCamera.fov=Kh(sr.weaponFovY,s),this.viewCamera.updateProjectionMatrix(),!0}setMaxPixelRatio(e){this.maxPixelRatio=Math.max(1,e)}get pixelRatioCap(){return this.maxPixelRatio}get maxAnisotropy(){return Math.min(this.renderer.capabilities.getMaxAnisotropy(),this.quality.anisotropyCap)}configureForFacility(e){this.clearFixtures(),this.placements=e.rooms.flatMap(s=>s.lights);const t=Math.min(this.quality.maxFixtures,this.placements.length);for(let s=0;s<t;s++){const r=new hc(16777215,0,1,2);this.scene.add(r),this.fixtures.push(r)}this.lastFixtureX=Number.NaN,this.lastFixtureZ=Number.NaN;let n=4;for(const s of e.rooms)n=Math.max(n,s.ceilY);this.keyHeight=n-.7}setFixtureFocus(e,t){if(this.fixtures.length===0)return;const n=e-this.lastFixtureX,s=t-this.lastFixtureZ;if(Number.isFinite(n)&&n*n+s*s<Jh*Jh)return;this.lastFixtureX=e,this.lastFixtureZ=t;const r=this.fixtures.length;this.chosen.length=0,this.chosenDistance.length=0;for(let a=0;a<this.placements.length;a++){const o=this.placements[a],l=o.x-e,c=o.z-t,h=l*l+c*c;if(this.chosen.length===r&&h>=this.chosenDistance[r-1])continue;let d=this.chosen.length<r?this.chosen.length:r-1;for(;d>0&&this.chosenDistance[d-1]>h;)this.chosen[d]=this.chosen[d-1],this.chosenDistance[d]=this.chosenDistance[d-1],d--;this.chosen[d]=a,this.chosenDistance[d]=h}for(let a=0;a<r;a++){const o=this.fixtures[a],l=this.placements[this.chosen[a]??-1];if(!l){o.intensity=0;continue}o.position.set(l.x,l.y,l.z),o.color.setHex(l.color),o.intensity=l.intensity,o.distance=l.distance}}setShadowFocus(e,t){this.key.position.set(e+6,this.keyHeight,t+8),this.key.target.position.set(e,0,t),this.key.target.updateMatrixWorld()}prewarm(){this.quality.prewarmShaders&&(this.renderer.compile(this.scene,this.camera),this.renderer.compile(this.viewScene,this.viewCamera),this.render())}render(){this.renderer.info.reset(),this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.renderer.clearDepth(),this.renderer.render(this.viewScene,this.viewCamera)}get drawCalls(){return this.renderer.info.render.calls}get triangles(){return this.renderer.info.render.triangles}get programCount(){return this.renderer.info.programs?.length??0}get geometryCount(){return this.renderer.info.memory.geometries}get textureCount(){return this.renderer.info.memory.textures}get lightCount(){return this.fixtures.length}get pointLightCount(){let e=0;return this.scene.traverseVisible(t=>{t.isPointLight&&e++}),e}get fixtureCount(){return this.placements.length}clearFixtures(){for(const e of this.fixtures)this.scene.remove(e),e.dispose();this.fixtures.length=0}dispose(){this.clearFixtures(),this.key.shadow.map?.dispose(),this.key.shadow.map=null,this.environment.dispose(),this.renderer.dispose()}}const ms={step:.75,floor:1,minSamples:600,breachRatio:.2};class IM{cap;enabledFlag;downgradeCount=0;eligibleFrames=0;constructor(e,t){this.cap=e,this.enabledFlag=t}get pixelRatioCap(){return this.cap}get downgrades(){return this.downgradeCount}get enabled(){return this.enabledFlag}get exhausted(){return this.cap<=ms.floor}setEnabled(e){this.enabledFlag!==e&&(this.enabledFlag=e,this.eligibleFrames=0)}setBase(e){return this.eligibleFrames=0,this.downgradeCount=0,this.cap===e?!1:(this.cap=e,!0)}consider(e){if(!this.enabledFlag||this.exhausted)return!1;if(!e.runActive||!e.visible||e.timerScheduled)return this.eligibleFrames=0,!1;if(this.eligibleFrames++,this.eligibleFrames<ms.minSamples||e.samples<ms.minSamples||e.breaches/e.samples<ms.breachRatio)return!1;const t=Math.max(ms.floor,this.cap*ms.step);return this.eligibleFrames=0,t===this.cap?!1:(this.cap=t,this.downgradeCount++,!0)}}const LM={floorPlate:2,wallPanel:2,structure:1,ceilingPanel:2,machine:1,machineDark:1,hazard:.5,glass:1,emissive:1,lamp:1,emergency:1};function Gi(i){const e=document.createElement("canvas");e.width=i,e.height=i;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot generate lab textures");return{ctx:t,el:e}}function Ci(i,e,t=!0){const n=new lc(i);return n.wrapS=zi,n.wrapT=zi,n.colorSpace=t?Zt:Mn,n.anisotropy=e,n.generateMipmaps=!0,n.minFilter=Bn,n}function Hn(i){return`#${i.toString(16).padStart(6,"0")}`}function yr(i,e,t,n,s){for(let r=0;r<n;r++){const a=t()*e,o=t()*e,l=1+t()*3,c=1+t()*3,h=t()<.6;i.fillStyle=h?`rgba(0,0,0,${s})`:`rgba(255,255,255,${s*.7})`,i.fillRect(a,o,l,c)}}function Nl(i,e,t,n){i.fillStyle="rgba(0,0,0,0.34)",i.beginPath(),i.arc(e,t+n*.35,n,0,Math.PI*2),i.fill(),i.fillStyle="rgba(255,255,255,0.16)",i.beginPath(),i.arc(e,t,n,0,Math.PI*2),i.fill()}function DM(i,e){const{ctx:t,el:n}=Gi(i),s=i*.028;t.fillStyle=Hn(Be.structDark),t.fillRect(0,0,i,i),t.fillStyle=Hn(Be.structMid),t.fillRect(s,s,i-s*2,i-s*2),t.fillStyle="rgba(255,255,255,0.05)",t.fillRect(s,s,i-s*2,s*.9),t.fillStyle="rgba(0,0,0,0.18)",t.fillRect(s,i-s*1.9,i-s*2,s*.9),t.strokeStyle="rgba(0,0,0,0.22)",t.lineWidth=Math.max(1,i*.006),t.beginPath(),t.moveTo(i/2,s),t.lineTo(i/2,i-s),t.moveTo(s,i/2),t.lineTo(i-s,i/2),t.stroke();const r=i*.014;for(const[o,l]of[[s*2.6,s*2.6],[i-s*2.6,s*2.6],[s*2.6,i-s*2.6],[i-s*2.6,i-s*2.6]])Nl(t,o,l,r);yr(t,i,e,260,.06);const a=Gi(i);return a.ctx.fillStyle="#ffffff",a.ctx.fillRect(0,0,i,i),a.ctx.fillStyle="#b9b9b9",a.ctx.fillRect(s,s,i-s*2,i-s*2),a.ctx.strokeStyle="rgba(255,255,255,0.5)",a.ctx.lineWidth=Math.max(1,i*.006),a.ctx.beginPath(),a.ctx.moveTo(i/2,s),a.ctx.lineTo(i/2,i-s),a.ctx.moveTo(s,i/2),a.ctx.lineTo(i-s,i/2),a.ctx.stroke(),{albedo:n,rough:a.el}}function NM(i,e){const{ctx:t,el:n}=Gi(i),s=i*.022;t.fillStyle=Hn(Be.structMid),t.fillRect(0,0,i,i),t.fillStyle=Hn(Be.panel),t.fillRect(s,s,i-s*2,i-s*2),t.fillStyle=Hn(Be.structMid),t.fillRect(0,i/2-s/2,i,s),t.fillStyle="rgba(0,0,0,0.16)",t.fillRect(i*.16,i*.09,i*.68,i*.28),t.fillStyle="rgba(255,255,255,0.07)",t.fillRect(i*.16,i*.09,i*.68,i*.014);const r=i*.011;for(let a=0;a<4;a++){const o=i*(.09+a*.273);Nl(t,o,i*.55,r),Nl(t,o,i*.94,r)}for(let a=0;a<26;a++){const o=e()*i,l=1+e()*2.5;t.fillStyle=`rgba(0,0,0,${.02+e()*.03})`,t.fillRect(o,s,l,i-s*2)}return yr(t,i,e,160,.045),n}function FM(i,e){const{ctx:t,el:n}=Gi(i);t.fillStyle=Hn(Be.structDark),t.fillRect(0,0,i,i),t.fillStyle=Hn(Be.structHi),t.fillRect(0,i*.1,i,i*.8);for(let s=0;s<6;s++){const r=i*(.16+s*.13);t.fillStyle="rgba(0,0,0,0.24)",t.fillRect(0,r,i,i*.028),t.fillStyle="rgba(255,255,255,0.08)",t.fillRect(0,r+i*.028,i,i*.012)}return yr(t,i,e,120,.05),n}function UM(i,e){const{ctx:t,el:n}=Gi(i);t.fillStyle=Hn(Be.structHi),t.fillRect(0,0,i,i);const s=i/2,r=s*.09;for(let a=0;a<2;a++)for(let o=0;o<2;o++)t.fillStyle=Hn(Be.panel),t.fillRect(o*s+r,a*s+r,s-r*2,s-r*2),t.fillStyle="rgba(255,255,255,0.1)",t.fillRect(o*s+r,a*s+r,s-r*2,r*.5),t.fillStyle="rgba(0,0,0,0.16)",t.fillRect(o*s+r,a*s+s-r*1.5,s-r*2,r*.5);return yr(t,i,e,90,.035),n}function OM(i,e){const{ctx:t,el:n}=Gi(i);t.fillStyle=Hn(Be.steelPale),t.fillRect(0,0,i,i),t.fillStyle="rgba(0,0,0,0.14)",t.fillRect(0,i*.46,i,i*.03),t.fillStyle="rgba(255,255,255,0.28)",t.fillRect(0,i*.49,i,i*.012);for(let r=0;r<7;r++)t.fillStyle="rgba(0,0,0,0.34)",t.fillRect(i*(.14+r*.104),i*.64,i*.05,i*.2);const s=t.createLinearGradient(0,i*.7,0,i);return s.addColorStop(0,"rgba(23,32,40,0)"),s.addColorStop(1,"rgba(23,32,40,0.42)"),t.fillStyle=s,t.fillRect(0,i*.7,i,i*.3),yr(t,i,e,140,.05),n}function BM(i){const{ctx:e,el:t}=Gi(i);e.fillStyle="#161514",e.fillRect(0,0,i,i),e.strokeStyle="#c9a227",e.lineWidth=i*.22,e.beginPath();for(let n=-2;n<4;n++){const s=n*i*.5;e.moveTo(s,0),e.lineTo(s+i,i)}return e.stroke(),t}function kM(i){const e=Vt("clawd-lab-kit","dressing"),t=Math.min(8,Math.max(1,i)),n=DM(512,e),s=Ci(n.albedo,t),r=Ci(n.rough,t,!1),a=Ci(NM(512,e),t),o=Ci(FM(256,e),t),l=Ci(UM(256,e),t),c=Ci(OM(256,e),t),h=Ci(BM(128),t),d=[s,r,a,o,l,c,h],u={floorPlate:new Rt({map:s,roughnessMap:r,roughness:.85,metalness:.22}),wallPanel:new Rt({map:a,roughness:.8,metalness:.1}),structure:new Rt({map:o,roughness:.66,metalness:.34}),ceilingPanel:new Rt({map:l,roughness:.86,metalness:.08,color:12898264}),machine:new Rt({map:c,roughness:.52,metalness:.18}),machineDark:new Rt({color:Be.structDark,roughness:.58,metalness:.45}),hazard:new Rt({map:h,roughness:.74,metalness:.12}),glass:new Rt({color:Be.steelPale,roughness:.06,metalness:0,transparent:!0,opacity:.24,side:Un,depthWrite:!1}),emissive:new wn({color:Be.cyan,toneMapped:!0}),lamp:new wn({color:Be.cyanPale,toneMapped:!0}),emergency:new wn({color:14173482,toneMapped:!0})};return{byStyle:u,paintedStyle:"floorPlate",dispose(){for(const f of Object.values(u))f.dispose();for(const f of d)f.dispose()}}}function Od(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Wt;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=Qh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][u]);const g=Qh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function Qh(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new nn(a,t,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/t;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<t;g++){const v=h.getComponent(u,g);o.setComponent(u+d,g,v)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}const Bd=.85,kd=3.05,zd=.66;function je(i,e,t){const n=i.get(e);n?n.push(t):i.set(e,[t])}function et(i,e,t,n,s=0,r=0){const a=new Ze,o=new Tn(r,s,0,"YXZ");return a.makeRotationFromEuler(o),a.setPosition(e,t,n),i.applyMatrix4(a),i}function zM(i,e){const t=e.scale,n=Bd*t,s=kd*t,r=e.y+zd*t;je(i,"glass",et(new ct(n,n,s,20,1,!0),e.x,r+s/2,e.z,e.yaw));const a=n*1.09;je(i,"machine",et(new ct(a,a,.22*t,20),e.x,r+.09*t,e.z,e.yaw)),je(i,"machine",et(new ct(a,a,.26*t,20),e.x,r+s-.1*t,e.z,e.yaw)),je(i,"machineDark",et(new ct(a*1.06,a*.94,.3*t,20),e.x,r+s+.13*t,e.z,e.yaw));for(let o=0;o<4;o++){const l=e.yaw+o*Math.PI/2+.4;je(i,"machineDark",et(new ct(.045*t,.045*t,s,6),e.x+Math.cos(l)*a,r+s/2,e.z+Math.sin(l)*a))}je(i,"machineDark",et(new ct(n*.17,n*.2,s*(.5+e.variant*.3),10),e.x,r+s*.3,e.z,e.yaw)),je(i,"emissive",et(new ct(n*.09,n*.09,s*.86,8),e.x,r+s*.5,e.z,e.yaw))}function VM(i,e){const t=e.scale,n=Bd*t,s=kd*t,r=e.y+zd*t,a=s*(.26+e.variant*.24),o=n*1.09;je(i,"glass",et(new ct(n,n,a,20,1,!0),e.x,r+a/2,e.z,e.yaw)),je(i,"machine",et(new ct(o,o,.22*t,20),e.x,r+.09*t,e.z,e.yaw)),je(i,"machine",et(new ct(o,o,.26*t,20),e.x+(e.variant-.5)*.16*t,r+a+.1*t,e.z,e.yaw,.22+e.variant*.16));for(let l=0;l<4;l++){const c=e.yaw+l*Math.PI/2+.4,d=l%2===0?s:a+.2*t;je(i,"machineDark",et(new ct(.045*t,.045*t,d,6),e.x+Math.cos(c)*o,r+d/2,e.z+Math.sin(c)*o))}je(i,"machineDark",et(new ct(n*.17,n*.2,a*.7,10),e.x,r+a*.35,e.z,e.yaw))}function GM(i,e){const t=e.length??8,n=[.075,.055,.045],s=[0,.17,.3];for(let a=0;a<n.length;a++){const o=new ct(n[a]*e.scale,n[a]*e.scale,t,8);o.rotateX(Math.PI/2),je(i,"machineDark",et(o,e.x+s[a]*(e.variant<.5?1:-1),e.y-a*.04,e.z,e.yaw))}const r=Math.max(2,Math.round(t/4));for(let a=0;a<r;a++){const o=e.z-t/2+t/(r-1||1)*a,l=new ct(.13*e.scale,.13*e.scale,.1*e.scale,8);l.rotateX(Math.PI/2),je(i,"machine",et(l,e.x+.14,e.y-.02,o,e.yaw))}}function HM(i,e){je(i,"machineDark",et(new vt(.86*e.scale,.62*e.scale,.07*e.scale),e.x,e.y+.3*e.scale,e.z,e.yaw,-.38)),je(i,"emissive",et(new vt(.74*e.scale,.5*e.scale,.02*e.scale),e.x,e.y+.3*e.scale,e.z,e.yaw,-.38)),je(i,"machineDark",et(new ct(.035,.035,.16*e.scale,6),e.x,e.y+.06*e.scale,e.z,e.yaw))}function WM(i,e){je(i,"machineDark",et(new ct(.06*e.scale,.08*e.scale,.16*e.scale,8),e.x,e.y,e.z)),je(i,"emergency",et(new yi(.11*e.scale,10,6,0,Math.PI*2,0,Math.PI*.62),e.x,e.y+.07*e.scale,e.z)),je(i,"machineDark",et(new ct(.115*e.scale,.115*e.scale,.03*e.scale,10),e.x,e.y+.06*e.scale,e.z))}function XM(i,e){const t=e.scale;je(i,"machineDark",et(new ct(2.25*t,2.4*t,.26*t,16),e.x,e.y+.13*t,e.z,e.yaw)),je(i,"machine",et(new ct(1.65*t,1.82*t,.2*t,16),e.x,e.y+.3*t,e.z,e.yaw));const n=new _i(1.95*t,.12*t,6,32);n.rotateX(Math.PI/2),je(i,"hazard",et(n,e.x,e.y+.31*t,e.z,e.yaw));const s=new _i(1.42*t,.055*t,5,28);s.rotateX(Math.PI/2),je(i,"emissive",et(s,e.x,e.y+.42*t,e.z,e.yaw)),je(i,"machineDark",et(new _i(1.62*t,.14*t,8,32),e.x,e.y+1.82*t,e.z+.22*t,e.yaw)),je(i,"emissive",et(new _i(1.62*t,.035*t,5,32),e.x,e.y+1.82*t,e.z+.06*t,e.yaw));for(let r=0;r<4;r++){const a=e.yaw+Math.PI/4+r*Math.PI/2,o=e.x+Math.cos(a)*2.05*t,l=e.z+Math.sin(a)*2.05*t;je(i,"machine",et(new vt(.48*t,.52*t,.72*t),o,e.y+.42*t,l,-a)),je(i,"emergency",et(new vt(.22*t,.08*t,.06*t),o,e.y+.63*t,l,-a))}}function qM(i){const e=new Map;for(const n of i)switch(n.kind){case"containmentTank":zM(e,n);break;case"breachedTank":VM(e,n);break;case"pipeRun":GM(e,n);break;case"wallConsole":HM(e,n);break;case"beacon":WM(e,n);break;case"containmentMachine":XM(e,n);break}const t=new Map;for(const[n,s]of e){for(const a of s)a.deleteAttribute("tangent"),a.deleteAttribute("color");const r=s.length===1?s[0]:Od(s,!1);if(r){if(s.length>1)for(const a of s)a.dispose();r.computeBoundingSphere(),t.set(n,r)}}return t}function ZM(){return{position:[],normal:[],uv:[]}}function jh(i){return i.position.length===0}function YM(i,e,t,n,s,r,a,o){const l=1/Math.max(1e-6,o);gs(i,s,t,a,s,t,n,s,r,n,s,r,a,1,0,0,a*l,t*l,n*l,r*l),gs(i,e,t,n,e,t,a,e,r,a,e,r,n,-1,0,0,n*l,t*l,a*l,r*l),gs(i,e,r,a,s,r,a,s,r,n,e,r,n,0,1,0,e*l,a*l,s*l,n*l),gs(i,e,t,n,s,t,n,s,t,a,e,t,a,0,-1,0,e*l,n*l,s*l,a*l),gs(i,e,t,a,s,t,a,s,r,a,e,r,a,0,0,1,e*l,t*l,s*l,r*l),gs(i,s,t,n,e,t,n,e,r,n,s,r,n,0,0,-1,s*l,t*l,e*l,r*l)}function gs(i,e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m,p,y,w){const M=i.position,T=i.normal,b=i.uv;M.push(e,t,n,s,r,a,o,l,c),M.push(e,t,n,o,l,c,h,d,u);for(let A=0;A<6;A++)T.push(f,g,v);b.push(m,p,y,p,y,w),b.push(m,p,y,w,m,w)}function eu(i){const e=new Wt;return e.setAttribute("position",new ht(new Float32Array(i.position),3)),e.setAttribute("normal",new ht(new Float32Array(i.normal),3)),e.setAttribute("uv",new ht(new Float32Array(i.uv),2)),e.computeBoundingSphere(),e}const wo=["floorPlate","wallPanel","structure","ceilingPanel","machine","machineDark","hazard","emissive","lamp","emergency","glass"];function $M(i){if(i.surface)return i.surface;switch(i.kind){case"floor":return"floorPlate";case"wall":return"wallPanel";case"ceiling":return"ceilingPanel";case"prop":return"machine"}}const KM=new Set(["structure","machine","machineDark","hazard","glass"]);class JM{group=new Oi;scene;materials;meshes=[];geometries=[];paintUniforms={uPaintMap:{value:null},uPaintMin:{value:new Le},uPaintInvSize:{value:new Le(1,1)},uPaintColor:{value:new Pe(Be.splat)},uPaintRoughness:{value:Sn.roughness},uPaintEdgeRoughness:{value:Sn.edgeRoughness},uPaintEdgeValue:{value:Sn.edgeValue},uPaintEmissive:{value:Sn.emissive}};constructor(e,t){this.scene=e,this.materials=t,this.scene.add(this.group),QM(t.byStyle[t.paintedStyle],this.paintUniforms)}build(e,t){this.clear(),t&&(this.paintUniforms.uPaintMap.value=t.map,this.paintUniforms.uPaintMin.value=t.min,this.paintUniforms.uPaintInvSize.value=t.invSize);const n=new Map,s=new Map;for(const o of e.rooms)for(const l of o.brushes){if(l.collisionOnly)continue;const c=$M(l),h=l.kind==="prop"?s:n;let d=h.get(c);d||(d=ZM(),h.set(c,d)),YM(d,l.minX,l.minY,l.minZ,l.maxX,l.maxY,l.maxZ,LM[c])}for(const o of wo){const l=n.get(o);l&&!jh(l)&&this.addMesh(o,eu(l),!1)}for(const o of wo){const l=s.get(o);l&&!jh(l)&&this.addMesh(o,eu(l),!0)}const r=[];for(const o of e.rooms)for(const l of o.props)r.push(l);const a=qM(r);for(const o of wo){const l=a.get(o);l&&this.addMesh(o,l,!0)}}addMesh(e,t,n){const s=this.materials.byStyle[e],r=new tt(t,s);r.castShadow=n&&KM.has(e),r.receiveShadow=e!=="glass"&&e!=="emissive"&&e!=="lamp"&&e!=="emergency",r.frustumCulled=!1,e==="glass"&&(r.renderOrder=1),this.group.add(r),this.meshes.push(r),this.geometries.push(t)}clear(){for(const e of this.meshes)this.group.remove(e);for(const e of this.geometries)e.dispose();this.meshes.length=0,this.geometries.length=0}get meshCount(){return this.meshes.length}dispose(){this.clear(),this.scene.remove(this.group)}}function QM(i,e){i.onBeforeCompile=t=>{for(const[n,s]of Object.entries(e))t.uniforms[n]=s;t.vertexShader=t.vertexShader.replace("#include <common>",`
        #include <common>
        uniform vec2 uPaintMin;
        uniform vec2 uPaintInvSize;
        varying vec2 vPaintUv;
      `).replace("#include <begin_vertex>",`
        #include <begin_vertex>
        #ifdef USE_INSTANCING
          vec4 paintWorld = modelMatrix * instanceMatrix * vec4( transformed, 1.0 );
        #else
          vec4 paintWorld = modelMatrix * vec4( transformed, 1.0 );
        #endif
        vPaintUv = ( paintWorld.xz - uPaintMin ) * uPaintInvSize;
      `),t.fragmentShader=t.fragmentShader.replace("#include <common>",`
        #include <common>
        uniform sampler2D uPaintMap;
        uniform vec3 uPaintColor;
        uniform float uPaintRoughness;
        uniform float uPaintEdgeRoughness;
        uniform float uPaintEdgeValue;
        uniform float uPaintEmissive;
        varying vec2 vPaintUv;
        vec4 paintTexel;
        float paintThickness;
      `).replace("#include <color_fragment>",`
        #include <color_fragment>
        paintTexel = texture2D( uPaintMap, vPaintUv );
        {
          // The map is premultiplied, so the stored brightness is recovered by
          // dividing out coverage before it is applied to the splat colour. The
          // green channel carries atlas thickness the same way (Milestone 8D).
          float coverage = clamp( paintTexel.a, 0.0, 1.0 );
          float inv = 1.0 / max( paintTexel.a, 1e-4 );
          float brightness = paintTexel.r * inv;
          paintThickness = clamp( paintTexel.g * inv, 0.0, 1.0 );
          diffuseColor.rgb = mix(
            diffuseColor.rgb,
            uPaintColor * brightness * mix( uPaintEdgeValue, 1.0, paintThickness ),
            coverage
          );
        }
      `).replace("#include <roughnessmap_fragment>",`
        #include <roughnessmap_fragment>
        roughnessFactor = mix(
          roughnessFactor,
          mix( uPaintEdgeRoughness, uPaintRoughness, paintThickness ),
          clamp( paintTexel.a, 0.0, 1.0 )
        );
      `).replace("#include <emissivemap_fragment>",`
        #include <emissivemap_fragment>
        totalEmissiveRadiance += uPaintColor * uPaintEmissive * clamp( paintTexel.a, 0.0, 1.0 );
      `)},i.customProgramCacheKey=()=>"clawd-floor-paint"}const tu=new U,nu=new U,Kr=new U;class jM{positions=[];normals=[];uvs=[];uvScale;constructor(e){this.uvScale=e}tri(e,t,n,s,r,a,o,l,c,h,d,u){tu.set(s-e,r-t,a-n),nu.set(o-e,l-t,c-n),Kr.crossVectors(tu,nu),Kr.x*h+Kr.y*d+Kr.z*u<0?(this.vertex(e,t,n,h,d,u),this.vertex(o,l,c,h,d,u),this.vertex(s,r,a,h,d,u)):(this.vertex(e,t,n,h,d,u),this.vertex(s,r,a,h,d,u),this.vertex(o,l,c,h,d,u))}quad(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v){this.tri(e,t,n,s,r,a,o,l,c,f,g,v),this.tri(e,t,n,o,l,c,h,d,u,f,g,v)}vertex(e,t,n,s,r,a){this.positions.push(e,t,n),this.normals.push(s,r,a);const o=Math.abs(s),l=Math.abs(r),c=Math.abs(a);o>=l&&o>=c?this.uvs.push(n*this.uvScale,t*this.uvScale):l>=c?this.uvs.push(e*this.uvScale,n*this.uvScale):this.uvs.push(e*this.uvScale,t*this.uvScale)}finish(){const e=new Wt;return e.setAttribute("position",new ht(this.positions,3)),e.setAttribute("normal",new ht(this.normals,3)),e.setAttribute("uv",new ht(this.uvs,2)),e.computeBoundingSphere(),e}}const Nn=1/Math.SQRT2,To=1/Math.sqrt(3);function Jr(i,e,t,n,s={}){const r=i/2,a=e/2,o=t/2,l=Math.max(0,Math.min(n,Math.min(r,a,o)*.49)),c=r-l,h=a-l,d=o-l,u=new jM(s.uvScale??1),f=s.sockets??[],g=f.length>0?ey(c,h,f):null;for(const v of[1,-1])u.quad(v*r,-h,-d,v*r,h,-d,v*r,h,d,v*r,-h,d,v,0,0),u.quad(-c,v*a,-d,c,v*a,-d,c,v*a,d,-c,v*a,d,0,v,0),v===-1&&f.length>0?iy(u,o,f,g.x,g.y):u.quad(-c,-h,v*o,c,-h,v*o,c,h,v*o,-c,h,v*o,0,0,v);for(const v of[1,-1]){for(const m of[1,-1])u.quad(v*r,m*h,-d,v*c,m*a,-d,v*c,m*a,d,v*r,m*h,d,v*Nn,m*Nn,0);for(const m of[1,-1])m===-1&&g?ty(u,v,r,c,h,d,o,g.y):u.quad(v*r,-h,m*d,v*c,-h,m*o,v*c,h,m*o,v*r,h,m*d,v*Nn,0,m*Nn)}for(const v of[1,-1])for(const m of[1,-1])m===-1&&g?ny(u,v,a,c,h,d,o,g.x):u.quad(-c,v*a,m*d,c,v*a,m*d,c,v*h,m*o,-c,v*h,m*o,0,v*Nn,m*Nn);for(const v of[1,-1])for(const m of[1,-1])for(const p of[1,-1])u.tri(v*r,m*h,p*d,v*c,m*a,p*d,v*c,m*h,p*o,v*To,m*To,p*To);return u.finish()}function ey(i,e,t){const n=new Set([-i,i]),s=new Set([-e,e]);for(const r of t)n.add(r.x-r.width/2),n.add(r.x+r.width/2),s.add(r.y-r.height/2),s.add(r.y+r.height/2);return{x:[...n].sort((r,a)=>r-a),y:[...s].sort((r,a)=>r-a)}}function ty(i,e,t,n,s,r,a,o){const l=e*t,c=e*n,h=e*Nn,d=-Nn;for(let u=0;u<o.length-1;u++)i.tri(l,-s,-r,c,o[u],-a,c,o[u+1],-a,h,0,d);i.tri(l,-s,-r,c,o[o.length-1],-a,l,s,-r,h,0,d)}function ny(i,e,t,n,s,r,a,o){const l=e*t,c=e*s,h=e*Nn,d=-Nn;i.tri(-n,l,-r,n,l,-r,o[o.length-1],c,-a,0,h,d);for(let u=o.length-1;u>0;u--)i.tri(-n,l,-r,o[u],c,-a,o[u-1],c,-a,0,h,d)}function iy(i,e,t,n,s){for(let r=0;r<n.length-1;r++)for(let a=0;a<s.length-1;a++){const o=n[r],l=n[r+1],c=s[a],h=s[a+1],d=(o+l)/2,u=(c+h)/2;t.some(g=>Math.abs(d-g.x)<g.width/2&&Math.abs(u-g.y)<g.height/2)||i.quad(o,c,-e,l,c,-e,l,h,-e,o,h,-e,0,0,-1)}for(const r of t){const a=r.x-r.width/2,o=r.x+r.width/2,l=r.y-r.height/2,c=r.y+r.height/2,h=-e,d=-e+r.depth;i.quad(a,l,h,a,c,h,a,c,d,a,l,d,1,0,0),i.quad(o,l,h,o,c,h,o,c,d,o,l,d,-1,0,0),i.quad(a,l,h,o,l,h,o,l,d,a,l,d,0,1,0),i.quad(a,c,h,o,c,h,o,c,d,a,c,d,0,-1,0),i.quad(a,l,d,o,l,d,o,c,d,a,c,d,0,0,-1)}}const $s=18;function sy(i=256){const e=document.createElement("canvas");e.width=i,e.height=i;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot build the mottle texture");t.fillStyle="#ffffff",t.fillRect(0,0,i,i);const n=Vt("clawd-mottle","specimen"),s=i/$s;for(let a=0;a<$s*$s;a++){const o=a%$s,l=Math.floor(a/$s),c=n();let h;if(c<.12)h=we(n,.944,.972);else if(c<.42)h=we(n,.975,.993);else continue;const d=Math.round(h*255);t.fillStyle=`rgb(${d},${d},${d})`,t.fillRect(o*s,l*s,s,s)}const r=new lc(e);return r.colorSpace=Zt,r.wrapS=zi,r.wrapT=zi,r.minFilter=Bn,r.magFilter=bt,r.generateMipmaps=!0,r.anisotropy=4,r.needsUpdate=!0,r}const ry=1.6,ay=.45,iu=.62;function Ao(i){return i<=0?0:i>=1?1:i}function oy(i,e){const t=e>0?e:0;switch(i){case"windUp":return Ao(t/fn.windUpTime)**2;case"lunge":return 1-(1-iu)*Ao(t/fn.lungeTime);case"recover":return iu*(1-Ao(t/(fn.recoverTime*ay)));default:return 0}}function ly(i,e,t){if(!t)return{lift:0,swing:0};const n=i+e;return{lift:Math.max(0,Math.sin(n))*.11,swing:Math.cos(n)*.09}}const cy=.55;function hy(i,e,t,n){if(!i)return{squash:1,stance:1,eye:0};const s=.5+.5*Math.sin(e*2.4),r=n>0?1-t/cy:0,a=r<=0?0:r>=1?1:r,o=a*a;return{squash:1-s*.018-o*.12,stance:1+o*.1,eye:o*.72}}const uc=1.46,Vd=1,dc=.82,Ts=.45,Ni=Ts+Vd/2,Qr=uc/2-.13-.105,jr=dc/2-.13-.105,uy=.04,su=.02,Fl=.19,Gd=.03,Aa=.27,Ra=.27,ea=Fl+.01,Ul=.045,ru=-dc/2+Ul-.003+Gd/2,dy=[{x:-Aa,y:Ra,width:ea,height:ea,depth:Ul},{x:Aa,y:Ra,width:ea,height:ea,depth:Ul}],Ro=[{name:"body",shape:"body",px:0,py:Ni,pz:0,dark:!1,gait:0},{name:"eyeLeft",shape:"eye",px:-Aa,py:Ni+Ra,pz:ru,dark:!0,gait:0},{name:"eyeRight",shape:"eye",px:Aa,py:Ni+Ra,pz:ru,dark:!0,gait:0},{name:"sideLeft",shape:"side",px:-.905,py:Ni+.1,pz:0,dark:!1,gait:0},{name:"sideRight",shape:"side",px:uc/2+.175,py:Ni+.1,pz:0,dark:!1,gait:0},{name:"legFrontLeft",shape:"leg",px:-Qr,py:Ts/2,pz:-jr,dark:!1,gait:0},{name:"legFrontRight",shape:"leg",px:Qr,py:Ts/2,pz:-jr,dark:!1,gait:Math.PI},{name:"legRearLeft",shape:"leg",px:-Qr,py:Ts/2,pz:jr,dark:!1,gait:Math.PI},{name:"legRearRight",shape:"leg",px:Qr,py:Ts/2,pz:jr,dark:!1,gait:0}];function fy(i){switch(i){case"body":return Jr(uc,Vd,dc,uy,{sockets:dy});case"eye":return Jr(Fl,Fl,Gd,.008);case"side":return Jr(.35,.4,.45,su);default:return Jr(.21,Ts,.21,su)}}const py=new Ze().makeScale(0,0,0);class my{geometries=new Map;mottle;bodyMaterial;eyeMaterial;eyeFlash;slots=[];root=new wt;part=new wt;matrix=new Ze;scene;capacity;constructor(e,t){this.scene=e,this.capacity=t,this.mottle=sy(),this.bodyMaterial=new Rt({color:Be.bodyAlbedo,map:this.mottle,roughness:.78,metalness:.02}),this.eyeMaterial=gy(),this.eyeFlash=new Ds(new Float32Array(t),1);for(const n of Ro){let s=this.geometries.get(n.shape);s||(s=fy(n.shape),n.shape==="eye"&&s.setAttribute("aEyeFlash",this.eyeFlash),this.geometries.set(n.shape,s));const r=new mr(s,n.dark?this.eyeMaterial:this.bodyMaterial,t);r.castShadow=!n.dark,r.receiveShadow=!1,r.frustumCulled=!1,r.count=0,this.slots.push(r),this.scene.add(r)}}update(e,t){const n=Math.min(e.length,this.capacity),s=this.eyeFlash.array;let r=!1;for(let a=0;a<n;a++){const o=e[a],l=o.def.scale,c=hy(!!o.def.brood&&o.state==="approach",o.stateTime,o.broodTimer,o.broodRemaining),h=Math.max(oy(o.state,o.stateTime),c.eye);s[a]!==h&&(s[a]=h,r=!0);const d=o.prevX+(o.x-o.prevX)*t,u=o.prevZ+(o.z-o.prevZ)*t,f=vy(o.prevYaw,o.yaw,t);let g=1,v=0;o.state==="windUp"?g=1-.22*Math.min(1,o.stateTime/fn.windUpTime):o.state==="lunge"?(g=1.14,v=.12):o.state==="recover"&&(g=1-.1*(1-Math.min(1,o.stateTime/fn.recoverTime))),g*=c.squash;const m=o.hurtTime>0?o.hurtTime/.18:0;g*=1-.18*m;const p=Math.sin(o.gaitPhase)*.035;let y=Math.sin(o.gaitPhase*.5)*.05,w=1,M=1,T=0;if(o.state==="dying"){const A=Math.min(1,o.stateTime/kl.implodeTime),_=A*A;w=1-.85*_,M=1-.42*_,T=.3*_,y=0,g=1}const b=l*M;this.root.position.set(d,o.y+T,u),this.root.rotation.set(0,f+(1-w)*2.6,y),this.root.scale.set(b,b,b),this.root.updateMatrix();for(let A=0;A<Ro.length;A++){const _=Ro[A],E=A>=5;let C=_.px,P=_.py,L=_.pz;if(E){const X=ly(o.gaitPhase,_.gait,!o.def.stationary);C*=c.stance,P=_.py+X.lift,L=_.pz+X.swing}else P=_.py*g+p+v;C*=w,P=Ni+(P-Ni)*w,L*=w;const W=1-.45*(1-w);this.part.position.set(C,P,L),this.part.rotation.set(0,0,0),this.part.scale.set(W,(E?1:g)*W,W),this.part.updateMatrix(),this.matrix.multiplyMatrices(this.root.matrix,this.part.matrix),this.slots[A].setMatrixAt(a,this.matrix)}}for(let a=0;a<this.slots.length;a++){const o=this.slots[a];if(o.count>n)for(let l=n;l<o.count;l++)o.setMatrixAt(l,py);o.count=n,o.instanceMatrix.needsUpdate=!0}r&&(this.eyeFlash.needsUpdate=!0)}dispose(){for(const e of this.slots)this.scene.remove(e),e.dispose();this.slots.length=0;for(const e of this.geometries.values())e.dispose();this.geometries.clear(),this.mottle.dispose(),this.bodyMaterial.dispose(),this.eyeMaterial.dispose()}}function gy(){const i=new Rt({color:Be.eye,roughness:.45,metalness:0});return i.onBeforeCompile=e=>{e.uniforms.uEyeFlash={value:new Pe(Be.eyeFlash).multiplyScalar(ry)},e.vertexShader=e.vertexShader.replace("#include <common>",`
        #include <common>
        attribute float aEyeFlash;
        varying float vEyeFlash;
      `).replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vEyeFlash = aEyeFlash;
      `),e.fragmentShader=e.fragmentShader.replace("#include <common>",`
        #include <common>
        uniform vec3 uEyeFlash;
        varying float vEyeFlash;
      `).replace("#include <emissivemap_fragment>",`
        #include <emissivemap_fragment>
        totalEmissiveRadiance += uEyeFlash * vEyeFlash;
      `)},i.customProgramCacheKey=()=>"clawd-eye-flash",i}function vy(i,e,t){let n=(e-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*t}const xy=`
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vLocal;

  void main() {
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    // Scale is uniform on this mesh, so the normal matrix reduces to mat3.
    vNormalW = normalize( mat3( modelMatrix ) * normal );
    vViewDir = cameraPosition - worldPosition.xyz;
    vLocal = normalize( position );
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`,_y=`
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uRim;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vLocal;

  void main() {
    vec3 n = normalize( vNormalW );
    vec3 v = normalize( vViewDir );
    float facing = 1.0 - abs( dot( n, v ) );

    // The boundary. Raised to a high power so the centre stays genuinely dark
    // and the shell does not turn into a glowing ball.
    float rim = pow( facing, 3.6 );

    // Two counter-rotating band sets over the sphere, so the filaments shear
    // against each other instead of marching in lockstep.
    float theta = atan( vLocal.y, vLocal.x );
    float phi = acos( clamp( vLocal.z, -1.0, 1.0 ) );
    float bands = sin( theta * 4.0 + phi * 6.0 + uTime * 5.0 )
                + 0.6 * sin( theta * 7.0 - phi * 11.0 - uTime * 3.2 );
    // Narrow window: a wide one averages the two band sets into a flat halo,
    // which is exactly what the plain-material fallback already looks like.
    float filament = smoothstep( 0.32, 0.86, bands * 0.55 + 0.5 );

    float energy = rim * ( 0.28 + 1.15 * filament );
    vec3 color = mix( uDeep, uMid, clamp( energy * 2.2, 0.0, 1.0 ) );
    // The near-white rim is a thin highlight on the very edge, not the body of
    // the effect — at a low power it bleaches the violet out of the hue band.
    color = mix( color, uRim, pow( facing, 14.0 ) );

    gl_FragColor = vec4( color * uIntensity, clamp( energy, 0.0, 1.0 ) );
  }
`;function My(){const i=new mn({vertexShader:xy,fragmentShader:_y,uniforms:{uTime:{value:0},uIntensity:{value:1.15},uDeep:{value:new Pe(Be.violetDeep)},uMid:{value:new Pe(Be.violet)},uRim:{value:new Pe(Be.violetRim)}},transparent:!0,blending:Bi,depthWrite:!1});return{material:i,setTime(e){i.uniforms.uTime.value=e}}}function yy(){return{material:new wn({color:Be.violet,transparent:!0,opacity:.62,blending:Bi,depthWrite:!1}),setTime(){}}}const au=2,Sy=7,Ey=.28;class by{group=new Oi;cores=[];shells=[];trails=[];lights=[];originIds;originX;originY;originZ;nextOriginSlot=0;coreGeo;shellGeo;trailGeo;coreMat;shell;trailMat;trailDirection=new U;trailMidpoint=new U;trailUp=new U(0,1,0);scene;capacity;lightCount;constructor(e,t,n=!0,s=au){this.scene=e,this.capacity=t,this.lightCount=Math.max(0,Math.min(au,s)),this.originIds=new Int32Array(t),this.originX=new Float32Array(t),this.originY=new Float32Array(t),this.originZ=new Float32Array(t),this.originIds.fill(-1),this.coreGeo=new yi(ln.radius*.86,16,12),this.shellGeo=new yi(ln.radius*1.4,24,16),this.trailGeo=new ct(.01,.022,1,8,1,!0),this.coreMat=new wn({color:Be.coreDark}),this.shell=n?My():yy(),this.trailMat=new wn({color:Be.violet,transparent:!0,opacity:.4,blending:Bi,depthWrite:!1});for(let r=0;r<t;r++){const a=new tt(this.coreGeo,this.coreMat),o=new tt(this.shellGeo,this.shell.material),l=new tt(this.trailGeo,this.trailMat);a.visible=!1,o.visible=!1,l.visible=!1,a.frustumCulled=!1,o.frustumCulled=!1,l.frustumCulled=!1,this.group.add(l,a,o),this.cores.push(a),this.shells.push(o),this.trails.push(l)}for(let r=0;r<this.lightCount;r++){const a=new hc(Be.violet,0,7,2);this.group.add(a),this.lights.push(a)}this.scene.add(this.group)}beginShot(e,t,n,s){let r=-1;for(let a=0;a<this.capacity;a++)if(this.originIds[a]<0){r=a;break}r<0&&(r=this.nextOriginSlot,this.nextOriginSlot=(this.nextOriginSlot+1)%this.capacity),this.originIds[r]=e,this.originX[r]=t,this.originY[r]=n,this.originZ[r]=s}reset(){this.originIds.fill(-1),this.nextOriginSlot=0;for(let e=0;e<this.capacity;e++)this.cores[e].visible=!1,this.shells[e].visible=!1,this.trails[e].visible=!1;for(const e of this.lights)e.intensity=0}update(e,t,n){const s=Math.min(e.length,this.capacity);this.shell.setTime(n);for(let r=0;r<s;r++){const a=e[r];let o=a.prevX+(a.x-a.prevX)*t,l=a.prevY+(a.y-a.prevY)*t,c=a.prevZ+(a.z-a.prevZ)*t,h=-1;for(let v=0;v<this.capacity;v++){if(this.originIds[v]!==a.id)continue;h=v;const m=ln.lifetime-a.life,p=m*ln.speed,y=Math.min(1,p/Sy),w=y*y*(3-2*y);o=this.originX[v]+(o-this.originX[v])*w,l=this.originY[v]+(l-this.originY[v])*w,c=this.originZ[v]+(c-this.originZ[v])*w,m>=Ey&&(this.originIds[v]=-1,h=-1);break}const d=this.cores[r],u=this.shells[r],f=this.trails[r];if(d.position.set(o,l,c),u.position.set(o,l,c),d.visible=!0,u.visible=!0,h>=0){const v=this.originX[h],m=this.originY[h],p=this.originZ[h];this.trailDirection.set(o-v,l-m,c-p);const y=this.trailDirection.length();y>.001?(this.trailDirection.multiplyScalar(1/y),this.trailMidpoint.set((o+v)*.5,(l+m)*.5,(c+p)*.5),f.position.copy(this.trailMidpoint),f.quaternion.setFromUnitVectors(this.trailUp,this.trailDirection),f.scale.set(1,y,1),f.visible=!0):f.visible=!1}else f.visible=!1;const g=1+Math.sin(n*18+r)*.07;if(u.scale.setScalar(g),u.rotation.set(n*1.3+r,n*2.2+r*2.1,0),r<this.lightCount){const v=this.lights[r];v.position.set(o,l,c),v.intensity=5.5}}for(let r=s;r<this.capacity;r++)this.cores[r].visible=!1,this.shells[r].visible=!1,this.trails[r].visible=!1;for(let r=s;r<this.lightCount;r++)this.lights[r].intensity=0}dispose(){this.scene.remove(this.group),this.coreGeo.dispose(),this.shellGeo.dispose(),this.trailGeo.dispose(),this.coreMat.dispose(),this.shell.material.dispose(),this.trailMat.dispose(),this.cores.length=0,this.shells.length=0,this.trails.length=0;for(const e of this.lights)e.dispose();this.lights.length=0,this.reset()}}const wy=.08,ou=.55,Oa=8,vs=new Float64Array(Oa),xs=new Float64Array(Oa),_s=new Float64Array(Oa);function Ty(){return{x:0,y:0,z:0,nx:0,ny:0,nz:0,distance:0}}function Ay(i,e,t,n,s,r,a,o,l,c){const h=Math.hypot(n,s),d=h>1e-4,u=d?n/h:0,f=d?s/h:0,g=d?Math.atan2(u,f):r()*Math.PI*2;let v=0;for(let p=0;p<4;p++){const y=g+p*Math.PI/2+(r()-.5)*.5;vs[v]=Math.sin(y),xs[v]=(r()-.5)*.5,_s[v]=Math.cos(y),v++}for(vs[v]=(r()-.5)*.3,xs[v]=1,_s[v]=(r()-.5)*.3,v++,d&&(vs[v]=u,xs[v]=.12,_s[v]=f,v++);v<Oa;){const p=r()*Math.PI*2,y=r()*.8-.1;vs[v]=Math.sin(p),xs[v]=y,_s[v]=Math.cos(p),v++}let m=0;for(let p=0;p<v&&m<c;p++){const y=Math.hypot(vs[p],xs[p],_s[p]);if(y<1e-6)continue;const w=vs[p]/y*o,M=xs[p]/y*o,T=_s[p]/y*o;let b=Number.POSITIVE_INFINITY,A=0,_=0,E=0;for(let H=0;H<a.length;H++){const F=a[H];if(F.kind==="floor")continue;const q=lr(i,e,t,w,M,T,F,0,jt);q>=0&&q<b&&(b=q,A=jt.nx,_=jt.ny,E=jt.nz)}if(!Number.isFinite(b))continue;const C=b*o;if(C<wy)continue;const P=i+w*b,L=e+M*b,W=t+T*b;let X=!1;for(let H=0;H<m;H++){const F=l[H],q=F.x-P,ee=F.y-L,ie=F.z-W;if(q*q+ee*ee+ie*ie<ou*ou){X=!0;break}}if(X)continue;const O=l[m];O.x=P,O.y=L,O.z=W,O.nx=A,O.ny=_,O.nz=E,O.distance=C,m++}return m}const vi=6,Es=3,Hd=2,fc=1/Es,pc=1/Hd,Ry=.12,Cy=.045,Py=.46,Iy=.5;function Ly(i=256){const e=i*Es,t=i*Hd,n=document.createElement("canvas");n.width=e,n.height=t;const s=n.getContext("2d");if(!s)throw new Error("2D canvas context unavailable — cannot build the splat atlas");s.clearRect(0,0,e,t),s.fillStyle="#ffffff";for(let l=0;l<vi;l++){const c=l%Es,h=Math.floor(l/Es);s.save(),s.translate(c*i,h*i),s.beginPath(),s.rect(0,0,i,i),s.clip(),Ny(s,i,Vt("splat-atlas",`variant-${l}`)),s.restore()}const r=document.createElement("canvas");r.width=e,r.height=t;const a=r.getContext("2d");if(!a)throw new Error("2D canvas context unavailable — cannot build the splat atlas");Dy(a,s,n,i);const o=new lc(r);return o.colorSpace=Mn,o.wrapS=cn,o.wrapT=cn,o.minFilter=Bn,o.magFilter=bt,o.generateMipmaps=!0,o.anisotropy=4,o.needsUpdate=!0,{texture:o,variantOffset(l,c){const h=l%vi;return c.set(h%Es*fc,Math.floor(h/Es)*pc)},dispose(){o.dispose()}}}function Dy(i,e,t,n){const{width:s,height:r}=t,a=document.createElement("canvas");a.width=s,a.height=r;const o=a.getContext("2d");if(!o)throw new Error("2D canvas context unavailable — cannot build the splat atlas");o.filter=`blur(${(n*Cy).toFixed(2)}px)`,o.drawImage(t,0,0);const l=e.getImageData(0,0,s,r).data,c=o.getImageData(0,0,s,r).data,h=i.createImageData(s,r),d=h.data;for(let u=0;u<d.length;u+=4){const f=l[u+3],g=(c[u+3]/255-Py)/Iy;d[u]=255,d[u+1]=g<=0?0:g>=1?255:Math.round(g*255),d[u+2]=0,d[u+3]=f}i.putImageData(h,0,0)}function Ny(i,e,t){const n=e/2,s=e/2,r=e/2*(1-Ry),a=9+Math.floor(t()*5),o=t()*Math.PI*2;for(let c=0;c<a;c++){const h=c/a*Math.PI*2+we(t,-.16,.16);Fy(i,n,s,o+h,r*we(t,.52,.98),r*we(t,.115,.165),we(t,-.3,.3),t)}Ol(i,n,s,r*we(t,.3,.38),20,.16,t);const l=5+Math.floor(t()*6);for(let c=0;c<l;c++){const h=t()*Math.PI*2,d=r*we(t,.62,.99);Ol(i,n+Math.cos(h)*d,s+Math.sin(h)*d,r*we(t,.018,.052),9,.3,t)}}const As=16,Ms=new Float64Array((As+1)*2),ta=new Float64Array((As+1)*2);function Fy(i,e,t,n,s,r,a,o){for(let c=0;c<=As;c++){const h=c/As,d=n+a*h*h,u=s*h,f=e+Math.cos(d)*u,g=t+Math.sin(d)*u,v=1-.62*h,m=1+.85*Math.exp(-(((h-.9)/.11)**2)),p=r*v*m,y=-Math.sin(d),w=Math.cos(d);Ms[c*2]=f+y*p,Ms[c*2+1]=g+w*p,ta[c*2]=f-y*p,ta[c*2+1]=g-w*p}i.beginPath(),i.moveTo(Ms[0],Ms[1]);for(let c=1;c<=As;c++)i.lineTo(Ms[c*2],Ms[c*2+1]);for(let c=As;c>=0;c--)i.lineTo(ta[c*2],ta[c*2+1]);i.closePath(),i.fill();const l=n+a;Ol(i,e+Math.cos(l)*s,t+Math.sin(l)*s,r*we(o,.42,.62),10,.26,o)}function Ol(i,e,t,n,s,r,a){if(n<=.2)return;const o=new Float64Array(s),l=new Float64Array(s);for(let c=0;c<s;c++){const h=c/s*Math.PI*2,d=n*(1+we(a,-r,r));o[c]=e+Math.cos(h)*d,l[c]=t+Math.sin(h)*d}i.beginPath(),i.moveTo((o[s-1]+o[0])/2,(l[s-1]+l[0])/2);for(let c=0;c<s;c++){const h=(c+1)%s;i.quadraticCurveTo(o[c],l[c],(o[c]+o[h])/2,(l[c]+l[h])/2)}i.closePath(),i.fill()}const Ks=4.5,lu=4,Uy=8,na=Uy,cu=16,Oy=.84,By=.5,Co=.012,Po=new Ze().makeScale(0,0,0);class ky{renderer;scene;atlas;paintTexelsPerMetre;paintMapMax;paintTarget=null;paintMin=new Le;paintInvSize=new Le;stampScene=new Ta;stampCamera=new Na(-1,1,1,-1,0,1);stampGeometry;stampMaterial;stampTransform;stampParams;stampMesh;decalCapacity;decalSoftCap;decalGeometry;decalMaterial;decalMesh;decalAttr;decalOrder;decalFade;decalFading;decalCounter=0;decalActive=0;hits=[];normal=new U;forward=new U(0,0,1);rollAxis=new U;quaternion=new si;roll=new si;matrix=new Ze;position=new U;scaleVec=new U;variantUv=new Le;savedClear=new Pe;index=null;nearby=[];rng=Vt("boot","effects");dripQueue=new Float32Array(cu*5);dripCount=0;constructor(e,t,n={}){this.renderer=e,this.scene=t,this.paintTexelsPerMetre=n.paintTexelsPerMetre??20,this.paintMapMax=n.paintMapMax??2048,this.decalCapacity=n.decalCapacity??96,this.decalSoftCap=Math.floor(this.decalCapacity*Oy),this.atlas=Ly();for(let s=0;s<lu;s++)this.hits.push(Ty());this.stampGeometry=zy(na),this.stampTransform=this.stampGeometry.getAttribute("aStamp"),this.stampParams=this.stampGeometry.getAttribute("aParams"),this.stampMaterial=Vy(this.atlas.texture),this.stampMesh=new tt(this.stampGeometry,this.stampMaterial),this.stampMesh.frustumCulled=!1,this.stampScene.add(this.stampMesh),this.decalGeometry=new Mr(1,1),this.decalAttr=new Ds(new Float32Array(this.decalCapacity*4),4),this.decalGeometry.setAttribute("aSplat",this.decalAttr),this.decalMaterial=Gy(this.atlas.texture),this.decalMesh=new mr(this.decalGeometry,this.decalMaterial,this.decalCapacity),this.decalMesh.frustumCulled=!1,this.decalMesh.castShadow=!1,this.decalMesh.receiveShadow=!0,this.decalMesh.count=this.decalCapacity,this.decalMesh.renderOrder=1,this.decalOrder=new Float64Array(this.decalCapacity).fill(-1),this.decalFade=new Float32Array(this.decalCapacity),this.decalFading=new Uint8Array(this.decalCapacity);for(let s=0;s<this.decalCapacity;s++)this.decalMesh.setMatrixAt(s,Po);this.decalMesh.instanceMatrix.needsUpdate=!0,this.scene.add(this.decalMesh)}beginFacility(e,t,n){this.index=t,this.rng=Vt(n,"effects");const s=Math.max(1,e.maxX-e.minX),r=Math.max(1,e.maxZ-e.minZ);this.paintMin.set(e.minX,e.minZ),this.paintInvSize.set(1/s,1/r);const a=Math.min(this.paintTexelsPerMetre,this.paintMapMax/Math.max(s,r)),o=Math.max(64,Math.round(s*a)),l=Math.max(64,Math.round(r*a));this.paintTarget&&(this.paintTarget.width!==o||this.paintTarget.height!==l)&&(this.paintTarget.dispose(),this.paintTarget=null),this.paintTarget||(this.paintTarget=new bn(o,l,{depthBuffer:!1,stencilBuffer:!1,format:pn,type:tn,colorSpace:Mn,minFilter:bt,magFilter:bt,generateMipmaps:!1}),this.paintTarget.texture.wrapS=cn,this.paintTarget.texture.wrapT=cn),this.stampMaterial.uniforms.uPaintMin.value.copy(this.paintMin),this.stampMaterial.uniforms.uPaintInvSize.value.copy(this.paintInvSize),this.dripCount=0,this.clearPaint(),this.clearDecals(),this.stampContamination(e)}stampContamination(e){const t=this.paintTarget;if(!t)return;const n=this.stampTransform.array,s=this.stampParams.array,r=this.renderer.getRenderTarget();let a=0;const o=()=>{a!==0&&(this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=a,this.renderer.setRenderTarget(t),this.renderer.render(this.stampScene,this.stampCamera),a=0)};for(const l of e.rooms)for(const c of l.contamination)n[a*4]=c.x,n[a*4+1]=c.z,n[a*4+2]=c.variant*Math.PI*2,n[a*4+3]=c.radius*2,this.atlas.variantOffset(Math.min(vi-1,Math.floor(c.variant*vi)),this.variantUv),s[a*4]=this.variantUv.x,s[a*4+1]=this.variantUv.y,s[a*4+2]=c.brightness,s[a*4+3]=c.coverage,a++,a===na&&o();o(),this.renderer.setRenderTarget(r)}get floorPaint(){return this.paintTarget?{map:this.paintTarget.texture,min:this.paintMin,invSize:this.paintInvSize}:null}splat(e,t,n,s,r,a){this.stampFloor(e,n,s,r,a),this.placeDecals(e,t,n,s,r,a)}stampDrip(e,t,n,s,r){if(this.dripCount>=cu)return;const a=this.dripCount*5;this.dripQueue[a]=e,this.dripQueue[a+1]=t,this.dripQueue[a+2]=n,this.dripQueue[a+3]=s,this.dripQueue[a+4]=r,this.dripCount++}update(e){if(this.dripCount>0&&this.flushDrips(),this.decalActive===0)return;let t=!1;for(let n=0;n<this.decalCapacity;n++){if(this.decalOrder[n]<0||this.decalFading[n]===0)continue;const s=this.decalFade[n]-e/By;s<=0?this.freeDecal(n):(this.decalFade[n]=s,this.decalAttr.array[n*4+2]=s),t=!0}t&&(this.decalAttr.needsUpdate=!0,this.decalMesh.instanceMatrix.needsUpdate=!0)}dispose(){this.scene.remove(this.decalMesh),this.decalMesh.dispose(),this.decalGeometry.dispose(),this.decalMaterial.dispose(),this.stampScene.remove(this.stampMesh),this.stampGeometry.dispose(),this.stampMaterial.dispose(),this.paintTarget?.dispose(),this.paintTarget=null,this.atlas.dispose()}stampFloor(e,t,n,s,r){const a=this.paintTarget;if(!a)return;const o=this.stampTransform.array,l=this.stampParams.array,c=this.rng,h=Math.hypot(s,r),d=h>1e-4?s/h:0,u=h>1e-4?r/h:0;let f=0;const g=(p,y,w,M)=>{f>=na||(o[f*4]=p,o[f*4+1]=y,o[f*4+2]=c()*Math.PI*2,o[f*4+3]=w,this.atlas.variantOffset(Math.floor(c()*vi),this.variantUv),l[f*4]=this.variantUv.x,l[f*4+1]=this.variantUv.y,l[f*4+2]=M,l[f*4+3]=1,f++)};g(e,t,3*n,we(c,.9,1.12));const v=4+Math.floor(c()*3);for(let p=0;p<v;p++){const y=we(c,-1.15,1.15),w=d*Math.cos(y)-u*Math.sin(y),M=d*Math.sin(y)+u*Math.cos(y),T=we(c,.8,2.6)*n,b=c()*Math.PI*2,A=h>1e-4?0:we(c,.8,2.4)*n;g(e+w*T+Math.cos(b)*A,t+M*T+Math.sin(b)*A,we(c,.7,1.7)*n,we(c,.78,1.15))}this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=f;const m=this.renderer.getRenderTarget();this.renderer.setRenderTarget(a),this.renderer.render(this.stampScene,this.stampCamera),this.renderer.setRenderTarget(m)}flushDrips(){const e=this.paintTarget;if(!e){this.dripCount=0;return}const t=this.stampTransform.array,n=this.stampParams.array,s=this.renderer.getRenderTarget();let r=0;const a=()=>{r!==0&&(this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=r,this.renderer.setRenderTarget(e),this.renderer.render(this.stampScene,this.stampCamera),r=0)};for(let o=0;o<this.dripCount;o++){const l=o*5,c=this.dripQueue[l+4];t[r*4]=this.dripQueue[l],t[r*4+1]=this.dripQueue[l+1],t[r*4+2]=c*Math.PI*2,t[r*4+3]=this.dripQueue[l+2],this.atlas.variantOffset(Math.min(vi-1,Math.floor(c*vi)),this.variantUv),n[r*4]=this.variantUv.x,n[r*4+1]=this.variantUv.y,n[r*4+2]=this.dripQueue[l+3],n[r*4+3]=1,r++,r===na&&a()}a(),this.renderer.setRenderTarget(s),this.dripCount=0}clearPaint(){const e=this.paintTarget;if(!e)return;this.renderer.getClearColor(this.savedClear);const t=this.renderer.getClearAlpha(),n=this.renderer.getRenderTarget();this.renderer.setRenderTarget(e),this.renderer.setClearColor(0,0),this.renderer.clear(!0,!1,!1),this.renderer.setRenderTarget(n),this.renderer.setClearColor(this.savedClear,t)}placeDecals(e,t,n,s,r,a){const o=t+.9*s,l=this.index;if(!l)return;l.query(e-Ks,n-Ks,e+Ks,n+Ks,this.nearby);const c=Ay(e,o,n,r,a,this.rng,this.nearby,Ks,this.hits,lu);for(let h=0;h<c;h++){const d=this.hits[h],u=this.allocateDecal();if(u<0)break;this.normal.set(d.nx,d.ny,d.nz),this.quaternion.setFromUnitVectors(this.forward,this.normal),this.rollAxis.copy(this.normal),this.roll.setFromAxisAngle(this.rollAxis,this.rng()*Math.PI*2),this.quaternion.premultiply(this.roll);const f=Math.max(1.1,2.5-.16*d.distance)*s*we(this.rng,.85,1.15);this.position.set(d.x+d.nx*Co,d.y+d.ny*Co,d.z+d.nz*Co),this.scaleVec.set(f,f,1),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.decalMesh.setMatrixAt(u,this.matrix),this.atlas.variantOffset(Math.floor(this.rng()*vi),this.variantUv),this.decalAttr.array[u*4]=this.variantUv.x,this.decalAttr.array[u*4+1]=this.variantUv.y,this.decalAttr.array[u*4+2]=1,this.decalAttr.array[u*4+3]=we(this.rng,.82,1.14)}c>0&&(this.decalMesh.instanceMatrix.needsUpdate=!0,this.decalAttr.needsUpdate=!0,this.retireOldest())}allocateDecal(){for(let t=0;t<this.decalCapacity;t++)if(this.decalOrder[t]<0)return this.decalOrder[t]=this.decalCounter++,this.decalFade[t]=1,this.decalFading[t]=0,this.decalActive++,t;let e=-1;for(let t=0;t<this.decalCapacity;t++)this.decalFading[t]!==0&&(e<0||this.decalOrder[t]<this.decalOrder[e])&&(e=t);if(e<0){e=0;for(let t=1;t<this.decalCapacity;t++)this.decalOrder[t]<this.decalOrder[e]&&(e=t)}return this.decalOrder[e]=this.decalCounter++,this.decalFade[e]=1,this.decalFading[e]=0,e}retireOldest(){let e=0;for(let n=0;n<this.decalCapacity;n++)this.decalOrder[n]>=0&&this.decalFading[n]===0&&e++;let t=e-this.decalSoftCap;for(;t>0;){let n=-1;for(let s=0;s<this.decalCapacity;s++)this.decalOrder[s]<0||this.decalFading[s]===1||(n<0||this.decalOrder[s]<this.decalOrder[n])&&(n=s);if(n<0)return;this.decalFading[n]=1,t--}}freeDecal(e){this.decalOrder[e]<0||(this.decalOrder[e]=-1,this.decalFade[e]=0,this.decalFading[e]=0,this.decalAttr.array[e*4+2]=0,this.decalMesh.setMatrixAt(e,Po),this.decalActive--)}clearDecals(){for(let e=0;e<this.decalCapacity;e++)this.decalOrder[e]=-1,this.decalFade[e]=0,this.decalFading[e]=0,this.decalAttr.array[e*4+2]=0,this.decalMesh.setMatrixAt(e,Po);this.decalCounter=0,this.decalActive=0,this.decalAttr.needsUpdate=!0,this.decalMesh.instanceMatrix.needsUpdate=!0}get decalCount(){return this.decalActive}get settledDecalCount(){let e=0;for(let t=0;t<this.decalCapacity;t++)this.decalOrder[t]>=0&&this.decalFading[t]===0&&e++;return e}}function zy(i){const e=new R0;return e.setAttribute("position",new nn(new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),3)),e.setAttribute("uv",new nn(new Float32Array([0,0,1,0,1,1,0,1]),2)),e.setIndex([0,1,2,0,2,3]),e.setAttribute("aStamp",new Ds(new Float32Array(i*4),4)),e.setAttribute("aParams",new Ds(new Float32Array(i*4),4)),e.instanceCount=0,e}function Vy(i){return new mn({uniforms:{uAtlas:{value:i},uPaintMin:{value:new Le},uPaintInvSize:{value:new Le}},vertexShader:`
      attribute vec4 aStamp;
      attribute vec4 aParams;
      uniform vec2 uPaintMin;
      uniform vec2 uPaintInvSize;
      varying vec2 vUv;
      varying vec2 vBrightCoverage;

      void main() {
        float c = cos( aStamp.z );
        float s = sin( aStamp.z );
        vec2 local = position.xy * aStamp.w;
        vec2 world = aStamp.xy + vec2( local.x * c - local.y * s, local.x * s + local.y * c );
        vec2 paintUv = ( world - uPaintMin ) * uPaintInvSize;
        gl_Position = vec4( paintUv * 2.0 - 1.0, 0.0, 1.0 );
        vUv = uv * vec2( ${fc.toFixed(6)}, ${pc.toFixed(6)} ) + aParams.xy;
        vBrightCoverage = aParams.zw;
      }
    `,fragmentShader:`
      uniform sampler2D uAtlas;
      varying vec2 vUv;
      varying vec2 vBrightCoverage;

      void main() {
        vec4 atlas = texture2D( uAtlas, vUv );
        float coverage = atlas.a * vBrightCoverage.y;
        if ( coverage <= 0.004 ) discard;
        gl_FragColor = vec4(
          vBrightCoverage.x * coverage,
          atlas.g * coverage,
          0.0,
          coverage
        );
      }
    `,transparent:!0,depthTest:!1,depthWrite:!1,blending:Ju,blendEquation:Qn,blendSrc:Wo,blendDst:ur,blendEquationAlpha:Qn,blendSrcAlpha:Wo,blendDstAlpha:ur})}function Gy(i){const e=new Rt({color:Be.splat,emissive:Be.splat,emissiveIntensity:Sn.emissive,roughness:Sn.roughness,metalness:0,transparent:!0,depthWrite:!1,alphaTest:.04,side:ti,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4});return e.onBeforeCompile=t=>{t.uniforms.uSplatAtlas={value:i},t.vertexShader=t.vertexShader.replace("#include <common>",`
        #include <common>
        attribute vec4 aSplat;
        varying vec2 vSplatUv;
        varying vec2 vSplatFadeBright;
      `).replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vSplatUv = uv * vec2( ${fc.toFixed(6)}, ${pc.toFixed(6)} ) + aSplat.xy;
        vSplatFadeBright = aSplat.zw;
      `),t.fragmentShader=t.fragmentShader.replace("#include <common>",`
        #include <common>
        uniform sampler2D uSplatAtlas;
        varying vec2 vSplatUv;
        varying vec2 vSplatFadeBright;
        float splatThickness;
      `).replace("#include <color_fragment>",`
        #include <color_fragment>
        {
          vec4 splatTexel = texture2D( uSplatAtlas, vSplatUv );
          splatThickness = splatTexel.g;
          diffuseColor.a *= splatTexel.a * vSplatFadeBright.x;
          // Thin edges are slightly darker, exactly as on the floor: DESIGN.md
          // §1.2 requires a floor splat and a wall splat to read as one paint,
          // so both tiers apply the same thickness response.
          diffuseColor.rgb *= vSplatFadeBright.y
            * mix( ${Sn.edgeValue.toFixed(3)}, 1.0, splatThickness );
        }
      `).replace("#include <roughnessmap_fragment>",`
        #include <roughnessmap_fragment>
        roughnessFactor = mix(
          ${Sn.edgeRoughness.toFixed(3)},
          ${Sn.roughness.toFixed(3)},
          splatThickness
        );
      `)},e.customProgramCacheKey=()=>"clawd-splat-decal",e}const Hy=16,Wy=.85,Xy=16,qy=7,Zy=.34,Yy=3.4,hu=.13,ia=new Ze().makeScale(0,0,0);class $y{scene;dropletCapacity;dropletGeometry;dropletMaterial;droplets;px;py;pz;vx;vy;vz;size;spin;life;mark;markVariant;markBright;nextDroplet=0;activeDroplets=0;onDropletLand=null;flashCapacity;flashGeometry;flashMaterial;flashes;flashX;flashY;flashZ;flashScale;flashLife;nextFlash=0;matrix=new Ze;position=new U;quaternion=new si;euler=new Tn;scaleVec=new U;colour=new Pe;floorY=0;rng=Vt("boot","effects-burst");constructor(e,t={}){this.scene=e,this.dropletCapacity=t.dropletCapacity??160,this.flashCapacity=t.flashCapacity??6,this.dropletGeometry=new vt(1,1,1),this.dropletMaterial=new Rt({color:Be.splat,emissive:Be.splat,emissiveIntensity:Sn.emissive,roughness:Sn.roughness,metalness:0}),this.droplets=new mr(this.dropletGeometry,this.dropletMaterial,this.dropletCapacity),this.droplets.frustumCulled=!1,this.droplets.castShadow=!1,this.droplets.count=this.dropletCapacity,this.px=new Float32Array(this.dropletCapacity),this.py=new Float32Array(this.dropletCapacity),this.pz=new Float32Array(this.dropletCapacity),this.vx=new Float32Array(this.dropletCapacity),this.vy=new Float32Array(this.dropletCapacity),this.vz=new Float32Array(this.dropletCapacity),this.size=new Float32Array(this.dropletCapacity),this.spin=new Float32Array(this.dropletCapacity),this.life=new Float32Array(this.dropletCapacity),this.mark=new Uint8Array(this.dropletCapacity),this.markVariant=new Float32Array(this.dropletCapacity),this.markBright=new Float32Array(this.dropletCapacity),this.flashGeometry=new yi(.5,12,8),this.flashMaterial=new wn({color:Be.splat,transparent:!0,opacity:.52,blending:Bi,depthWrite:!1}),this.flashes=new mr(this.flashGeometry,this.flashMaterial,this.flashCapacity),this.flashes.frustumCulled=!1,this.flashes.count=this.flashCapacity,this.flashes.renderOrder=2,this.flashX=new Float32Array(this.flashCapacity),this.flashY=new Float32Array(this.flashCapacity),this.flashZ=new Float32Array(this.flashCapacity),this.flashScale=new Float32Array(this.flashCapacity),this.flashLife=new Float32Array(this.flashCapacity),this.reset(),this.scene.add(this.droplets),this.scene.add(this.flashes)}beginRoom(e,t){this.floorY=e,this.rng=Vt(t,"effects-burst"),this.reset()}burst(e,t,n,s,r,a){const o=this.rng,l=t+.72*s;this.spawnFlash(e,l,n,s);const c=Math.round(Hy*s);for(let h=0;h<c;h++){const d=this.nextDroplet;this.nextDroplet=(this.nextDroplet+1)%this.dropletCapacity,this.life[d]<=0&&this.activeDroplets++;const u=o()*Math.PI*2,f=we(o,.25,1),g=we(o,2.4,6.2)*s,v=Math.sqrt(Math.max(0,1-f*f));this.px[d]=e+Math.cos(u)*.12*s,this.py[d]=l,this.pz[d]=n+Math.sin(u)*.12*s,this.vx[d]=(Math.cos(u)*v+r*.55)*g,this.vy[d]=f*g*.85,this.vz[d]=(Math.sin(u)*v+a*.55)*g,this.size[d]=we(o,.07,.19)*s,this.spin[d]=we(o,-14,14),this.life[d]=Wy*we(o,.7,1.15),this.mark[d]=o()<Zy?1:0,this.markVariant[d]=o(),this.markBright[d]=we(o,.66,.92)}}update(e,t){let n=!1;for(let r=0;r<this.dropletCapacity;r++){if(this.life[r]<=0)continue;n=!0;const a=this.life[r]-e;if(this.life[r]=a,a<=0){this.activeDroplets--,this.droplets.setMatrixAt(r,ia);continue}this.vy[r]=this.vy[r]-Xy*e,this.px[r]=this.px[r]+this.vx[r]*e,this.py[r]=this.py[r]+this.vy[r]*e,this.pz[r]=this.pz[r]+this.vz[r]*e;const o=this.floorY+this.size[r]*.5;if(this.py[r]<=o){this.py[r]=o,this.vy[r]=0,this.mark[r]===1&&(this.mark[r]=0,this.onDropletLand?.(this.px[r],this.pz[r],this.size[r]*Yy,this.markBright[r],this.markVariant[r]));const h=Math.max(0,1-qy*e);this.vx[r]=this.vx[r]*h,this.vz[r]=this.vz[r]*h}const l=Math.min(1,a/.22),c=this.size[r]*l;this.position.set(this.px[r],this.py[r],this.pz[r]),this.euler.set(t*this.spin[r],t*this.spin[r]*.7,0),this.quaternion.setFromEuler(this.euler),this.scaleVec.set(c,c,c),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.droplets.setMatrixAt(r,this.matrix)}n&&(this.droplets.instanceMatrix.needsUpdate=!0);let s=!1;for(let r=0;r<this.flashCapacity;r++){if(this.flashLife[r]<=0)continue;s=!0;const a=this.flashLife[r]-e;if(this.flashLife[r]=a,a<=0){this.flashes.setMatrixAt(r,ia);continue}const o=1-a/hu,l=this.flashScale[r]*(.35+1.25*Math.sqrt(o));this.position.set(this.flashX[r],this.flashY[r],this.flashZ[r]),this.quaternion.identity(),this.scaleVec.set(l,l,l),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.flashes.setMatrixAt(r,this.matrix);const c=Math.max(0,1-o);this.colour.setHex(Be.splat).multiplyScalar(c*c*c),this.flashes.setColorAt(r,this.colour)}s&&(this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0))}get dropletCount(){return this.activeDroplets}reset(){this.life.fill(0),this.flashLife.fill(0),this.mark.fill(0),this.nextDroplet=0,this.nextFlash=0,this.activeDroplets=0;for(let e=0;e<this.dropletCapacity;e++)this.droplets.setMatrixAt(e,ia);for(let e=0;e<this.flashCapacity;e++)this.flashes.setMatrixAt(e,ia),this.flashes.setColorAt(e,this.colour.setHex(Be.splat));this.droplets.instanceMatrix.needsUpdate=!0,this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0)}dispose(){this.scene.remove(this.droplets),this.scene.remove(this.flashes),this.droplets.dispose(),this.flashes.dispose(),this.dropletGeometry.dispose(),this.dropletMaterial.dispose(),this.flashGeometry.dispose(),this.flashMaterial.dispose()}spawnFlash(e,t,n,s){const r=this.nextFlash;this.nextFlash=(this.nextFlash+1)%this.flashCapacity,this.flashX[r]=e,this.flashY[r]=t,this.flashZ[r]=n,this.flashScale[r]=.95*s,this.flashLife[r]=hu}}const Js=new U(.42,-.14,-.8),Io=.16,Lo=-.02,Do=.05,Ky=.84,Qs=-.63,uu=.16,Jy=.32;function dn(i,e,t=20){const n=new ct(i,i,e,t,1);return n.rotateX(Math.PI/2),n}function Qy(i,e,t,n=20){const s=new ct(i,e,t,n,1);return s.rotateX(Math.PI/2),s}function du(i,e,t=16){const n=new ct(i,i,e,t,1);return n.rotateZ(Math.PI/2),n}function sa(i,e,t=24){return new _i(i,e,8,t)}function fu(i,e,t=24){const n=new _i(i,e,8,t);return n.rotateY(Math.PI/2),n}class jy{group=new Oi;materials=new Map;geometries=[];meshes=[];core;rotor;muzzleLaunchCore;muzzleLaunchBolt;emissiveMaterial;muzzleLaunchMaterial;emissiveBase=new Pe(Be.violet);muzzleClip=new U;muzzleRay=new U;swayX=0;swayY=0;recoil=0;bob=0;spin=0;muzzleLaunchTime=0;viewScene;constructor(e){this.viewScene=e,this.materials.set("gold",new Rt({color:Be.gold,metalness:.95,roughness:.26,envMapIntensity:1.5})),this.materials.set("shellWarm",new Rt({color:Be.shellWarm,metalness:.28,roughness:.34,envMapIntensity:1.1})),this.materials.set("shellCool",new Rt({color:Be.shellCool,metalness:.72,roughness:.3,envMapIntensity:1.3})),this.materials.set("dark",new Rt({color:Be.mechDark,metalness:.6,roughness:.5})),this.materials.set("accent",new Rt({color:9380896,metalness:.3,roughness:.4})),this.emissiveMaterial=new wn({color:Be.violet}),this.materials.set("emissive",this.emissiveMaterial),this.muzzleLaunchMaterial=new wn({color:Be.violetRim,transparent:!0,opacity:0,blending:Bi,depthWrite:!1});const t=new Map,n=(l,c,h=0,d=0,u=0)=>{c.translate(h,d,u);const f=t.get(l);f?f.push(c):t.set(l,[c])};n("dark",dn(.058,1.05,16),0,0,-.14),n("shellCool",dn(.092,.66),0,0,-.12),n("gold",dn(.108,.1),0,0,-.4),n("gold",dn(.106,.075),0,0,-.2),n("gold",dn(.104,.06),0,0,0),n("gold",dn(.102,.05),0,0,.17),n("shellWarm",dn(.098,.075),0,0,-.5),n("gold",dn(.092,.055),0,0,-.555),n("shellCool",dn(.082,.035),0,0,-.593),n("gold",Qy(.07,.08,.03),0,0,Qs),n("shellWarm",new vt(.185,.15,.22),0,-.005,.29),n("gold",new vt(.196,.028,.2),0,.078,.29),n("gold",new vt(.196,.024,.16),0,-.085,.29),n("dark",new vt(.13,.105,.035),0,-.005,.405),n("gold",new vt(.152,.126,.018),0,-.005,.393),n("dark",new vt(.06,.085,.16),0,-.125,.19),n("shellWarm",new vt(.115,.055,.4),0,.108,-.12),n("gold",new vt(.102,.03,.2),0,.148,.02);for(let l=0;l<5;l++)n("dark",new vt(.082,.014,.012),0,.161,-.06+l*.04);n("gold",new vt(.036,.115,.34),-.098,.015,.06),n("dark",new vt(.013,.055,.26),-.12,.015,.06),n("gold",fu(.08,.015),-.092,0,-.17),n("dark",du(.07,.026),-.088,0,-.17),n("emissive",fu(.052,.01),-.102,0,-.17),n("shellCool",du(.028,.046),-.106,0,-.17),n("emissive",sa(.046,.008),0,0,-.558),n("emissive",sa(.035,.007),0,0,-.596),n("emissive",sa(.024,.006),0,0,Qs+.006),n("shellCool",dn(.012,.22,10),-.082,-.095,.12),n("accent",dn(.019,.05,10),-.082,-.095,.235);for(const[l,c]of t){const h=Od(c,!1);for(const u of c)u.dispose();if(!h)continue;this.geometries.push(h);const d=new tt(h,this.materials.get(l));this.group.add(d),this.meshes.push(d)}const s=new yi(.036,14,10);this.geometries.push(s),this.core=new tt(s,this.emissiveMaterial),this.core.position.set(0,0,Qs+.01),this.group.add(this.core);const r=new yi(.055,12,8);this.geometries.push(r),this.muzzleLaunchCore=new tt(r,this.muzzleLaunchMaterial),this.muzzleLaunchCore.visible=!1,this.group.add(this.muzzleLaunchCore),this.meshes.push(this.muzzleLaunchCore);const a=dn(.022,1,8);this.geometries.push(a),this.muzzleLaunchBolt=new tt(a,this.muzzleLaunchMaterial),this.muzzleLaunchBolt.visible=!1,this.group.add(this.muzzleLaunchBolt),this.meshes.push(this.muzzleLaunchBolt);const o=sa(.104,.013,28);this.geometries.push(o),this.rotor=new tt(o,this.materials.get("gold")),this.rotor.position.set(0,0,-.4),this.group.add(this.rotor),this.group.position.copy(Js),this.group.rotation.set(Lo,Io,Do),this.group.scale.setScalar(Ky),this.viewScene.add(this.group)}writeMuzzleWorld(e,t,n){this.group.updateWorldMatrix(!0,!0),this.core.getWorldPosition(this.muzzleClip),this.muzzleClip.project(t),this.muzzleRay.set(this.muzzleClip.x,this.muzzleClip.y,.5).unproject(e).sub(e.position).normalize(),n.copy(e.position).addScaledVector(this.muzzleRay,.72)}kick(){this.recoil=1,this.muzzleLaunchTime=uu}reset(){this.swayX=0,this.swayY=0,this.recoil=0,this.bob=0,this.spin=0,this.muzzleLaunchTime=0,this.group.position.copy(Js),this.group.rotation.set(Lo,Io,Do),this.core.scale.setScalar(1.2),this.emissiveMaterial.color.copy(this.emissiveBase),this.rotor.rotation.z=0,this.muzzleLaunchCore.visible=!1,this.muzzleLaunchBolt.visible=!1,this.muzzleLaunchMaterial.opacity=0}update(e,t,n,s,r){const a=Math.max(-.05,Math.min(.05,-t*.9)),o=Math.max(-.05,Math.min(.05,-n*.9));this.swayX=bs(this.swayX,a,9,e),this.swayY=bs(this.swayY,o,9,e),this.recoil=bs(this.recoil,0,11,e),this.bob=bs(this.bob,s>.4?1:0,6,e);const l=r*9.5,c=Math.sin(l)*.012*this.bob,h=Math.abs(Math.cos(l))*.014*this.bob;this.group.position.set(Js.x+this.swayX+c,Js.y+this.swayY-h,Js.z+this.recoil*.075),this.group.rotation.set(Lo+this.recoil*.16-this.swayY*.5,Io+this.swayX*.6,Do+this.swayX*.35);const d=1-this.recoil;this.core.scale.setScalar(.45+d*.75),this.emissiveMaterial.color.copy(this.emissiveBase).multiplyScalar(.35+d*.65),this.muzzleLaunchTime=Math.max(0,this.muzzleLaunchTime-e);const u=1-this.muzzleLaunchTime/uu,f=Jy*u,g=this.muzzleLaunchTime>0;this.muzzleLaunchCore.visible=g,this.muzzleLaunchBolt.visible=g,g?(this.muzzleLaunchCore.position.set(0,0,Qs-f),this.muzzleLaunchCore.scale.setScalar(.8+u*.35),this.muzzleLaunchBolt.position.set(0,0,Qs-f*.5),this.muzzleLaunchBolt.scale.set(1,1,Math.max(.02,f)),this.muzzleLaunchMaterial.opacity=(1-u)*.9):this.muzzleLaunchMaterial.opacity=0,this.spin+=e*(2+this.recoil*26),this.rotor.rotation.z=this.spin}dispose(){this.viewScene.remove(this.group);for(const e of this.meshes)this.group.remove(e);this.meshes.length=0;for(const e of this.geometries)e.dispose();for(const e of this.materials.values())e.dispose();this.muzzleLaunchMaterial.dispose(),this.geometries.length=0,this.materials.clear()}}class eS{bobPhase=0;bobAmount=0;shake=0;shakeSeed=0;camera;constructor(e){this.camera=e,this.camera.rotation.order="YXZ"}addShake(e){this.shake=Math.min(1,this.shake+e),this.shakeSeed+=1.7}update(e,t,n,s,r){const a=e.prevX+(e.x-e.prevX)*s,o=e.prevZ+(e.z-e.prevZ)*s,l=Math.hypot(e.vx,e.vz);this.bobAmount=bs(this.bobAmount,l>.5?1:0,7,r),this.bobPhase+=l*r*1.65;const c=Math.abs(Math.sin(this.bobPhase))*.035*this.bobAmount,h=Math.sin(this.bobPhase*.5)*.006*this.bobAmount;this.shake=bs(this.shake,0,7,r);const d=this.shake*this.shake*.045,u=Math.sin(this.shakeSeed*12.9898)*d,f=Math.sin(this.shakeSeed*78.233)*d;this.camera.position.set(a,e.y+lt.eyeHeight+c,o),this.camera.rotation.set(n+f,t+u,h)}reset(){this.bobPhase=0,this.bobAmount=0,this.shake=0}}function At(i){const e=document.getElementById(i);if(!e)throw new Error(`HUD element #${i} is missing from index.html`);return e}const tS=2.4,nS=new Intl.NumberFormat;function pu(i){return nS.format(i)}class iS{hud=At("hud");crosshair=At("crosshair");hitmarker=At("hitmarker");damage=At("damage");integrity=At("integrity");integrityFill=At("integrity-fill");debug=At("debug");captureHint=At("capture-hint");overTitle=At("over-title");overScore=At("over-score");overStats=At("over-stats");status=At("status");statusMain=At("status-main");statusSub=At("status-sub");scorePop=At("score-pop");screens={title:At("screen-title"),pause:At("screen-pause"),settings:At("screen-settings"),over:At("screen-over")};hitTimer=0;statusTimer=0;damageTimer=null;debugVisible=!1;showScreen(e){for(const[t,n]of Object.entries(this.screens))n.hidden=t!==e;this.hud.hidden=e!=="none"}setDebugVisible(e){this.debugVisible=e,this.debug.hidden=!e}toggleDebug(){return this.setDebugVisible(!this.debugVisible),this.debugVisible}get isDebugVisible(){return this.debugVisible}setIntegrity(e,t){const n=Math.max(0,Math.min(1,e/t));this.integrityFill.style.width=`${n*100}%`,this.integrity.classList.toggle("low",n<=.34)}flashHit(){this.hitmarker.classList.remove("show"),this.hitmarker.offsetWidth,this.hitmarker.classList.add("show"),this.hitTimer=.24}flashDamage(){this.damage.classList.add("show"),this.damageTimer!==null&&window.clearTimeout(this.damageTimer),this.damageTimer=window.setTimeout(()=>{this.damageTimer=null,this.damage.classList.remove("show")},60)}setCooling(e){this.crosshair.classList.toggle("cooling",e)}setCaptureHint(e){this.captureHint.hidden=!e}setStatus(e,t="",n="neutral"){this.statusMain.textContent=e,this.statusSub.textContent=t,this.status.classList.toggle("alert",n==="alert"),this.status.classList.toggle("secure",n==="secure"),this.status.classList.add("show"),this.statusTimer=tS}clearStatus(){this.statusTimer=0,this.status.classList.remove("show")}flashScore(e,t){this.scorePop.innerHTML=t>1?`+${e}<span class="chain">&times;${t}</span>`:`+${e}`,this.scorePop.classList.remove("show"),this.scorePop.offsetWidth,this.scorePop.classList.add("show")}update(e){this.hitTimer>0&&(this.hitTimer-=e,this.hitTimer<=0&&this.hitmarker.classList.remove("show")),this.statusTimer>0&&(this.statusTimer-=e,this.statusTimer<=0&&this.status.classList.remove("show"))}setResults(e,t,n,s,r){const a=e.shots>0?e.hits/e.shots*100:0;this.overTitle.textContent=r?"CONTAINMENT RESTORED":"CONTAINMENT LOST",this.screens.over.classList.toggle("secure",r),this.overScore.textContent=e.score.toLocaleString(),this.overStats.innerHTML=[`Specimens popped &nbsp;<b>${e.kills}</b>`,`Sectors held &nbsp;<b>${t} / ${n}</b>`,`Best chain &nbsp;<b>${e.bestChain>1?`${e.bestChain}`:"—"}</b>`,`Accuracy &nbsp;<b>${a.toFixed(0)}%</b>`,`Integrity recovered &nbsp;<b>${e.integrityRestored>0?e.integrityRestored:"—"}</b>`,`Time &nbsp;<b>${e.timeAlive.toFixed(1)}s</b>`,`Seed &nbsp;<b>${s}</b>`].join("<br />")}setDebug(e){if(!this.debugVisible)return;const t=e.frame;this.debug.textContent=[`seed      ${e.seed}`,`quality   ${e.quality}  dpr ${e.pixelRatio.toFixed(2)}  cap ${e.pixelRatioCap.toFixed(2)}${e.adaptiveSteps>0?`  adapt -${e.adaptiveSteps}`:""}`,`frame ms  p50 ${t.p50.toFixed(2)}  p95 ${t.p95.toFixed(2)}`,`          p99 ${t.p99.toFixed(2)}  max ${t.worst.toFixed(2)}`,`hitches   ${t.hitches}  (>20ms, ${t.samples} frames)`,`draws     ${e.drawCalls}  / 150`,`tris      ${pu(e.triangles)}  / 350k`,`gpu       ${e.geometries} geo  ${e.textures} tex  ${e.programs} prog`,`world     ${e.meshes} meshes  ${e.brushes} brushes`,`lights    ${e.lights} lit / ${e.fixtures} placed`,`rooms     ${e.rooms}  ${e.roomArchetype} esc ${e.roomEscalation.toFixed(2)}`,`sectors   ${e.sectorsCleared} / ${e.sectors} held`,`threat    ${e.threatSpent} / ${e.threatBudget} here  ${e.requiredThreat} req / ${e.threatTotal} all`,`enemies   ${e.enemies}`,`shots     ${e.projectiles}`,`decals    ${e.decals} / ${e.decalBudget}  drops ${e.droplets}`,`score     ${pu(e.score)}`,`gen ms    ${e.genMs.toFixed(2)}  try ${e.attempts}${e.fallback?" FALLBACK":""}`,`warm ms   ${e.prewarmMs.toFixed(2)}`].join(`
`)}dispose(){this.damageTimer!==null&&(window.clearTimeout(this.damageTimer),this.damageTimer=null),this.hitTimer=0,this.statusTimer=0,this.hitmarker.classList.remove("show"),this.damage.classList.remove("show"),this.status.classList.remove("show"),this.scorePop.classList.remove("show")}}const mu=9,gu=5,ra=.14,vu=.92,sS=.42;function rS(i,e){const t={discovered:new Uint8Array(i),reveal:new Float32Array(i)};return e>=0&&e<i&&(t.discovered[e]=1,t.reveal[e]=1),t}function aS(i,e){return e<0||e>=i.discovered.length||i.discovered[e]?!1:(i.discovered[e]=1,i.reveal[e]=0,!0)}function oS(i,e){let t=!1;const n=Math.max(0,e)/sS;if(n===0)return!1;for(let s=0;s<i.discovered.length;s++)!i.discovered[s]||i.reveal[s]>=1||(i.reveal[s]=Math.min(1,i.reveal[s]+n),t=!0);return t}function No(i,e){return i.discovered[e]?1-(1-(i.reveal[e]??0))**3:0}class lS{canvas;ctx;base=document.createElement("canvas");baseCtx;plan=null;discovery=null;projection=null;reduceMotion=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;dirty=!0;constructor(e){this.canvas=e;const t=e.getContext("2d"),n=this.base.getContext("2d");if(!t||!n)throw new Error("2D canvas context unavailable — cannot draw the minimap");this.ctx=t,this.baseCtx=n}setPlan(e){this.plan=e,this.discovery=rS(e.rooms.length,e.startRoomId),this.dirty=!0}discover(e){!this.discovery||!aS(this.discovery,e)||(this.reduceMotion&&(this.discovery.reveal[e]=1),this.dirty=!0)}get discoveredCount(){const e=this.discovery;if(!e)return 0;let t=0;for(const n of e.discovered)t+=n;return t}draw(e,t,n,s,r){const a=this.plan,o=this.discovery;if(!a||!o)return;const l=Math.min(window.devicePixelRatio||1,2),c=this.canvas.clientWidth,h=this.canvas.clientHeight;if(c===0||h===0)return;const d=Math.round(c*l),u=Math.round(h*l);(this.canvas.width!==d||this.canvas.height!==u)&&(this.canvas.width=d,this.canvas.height=u,this.base.width=d,this.base.height=u,this.dirty=!0),oS(o,r)&&(this.dirty=!0),this.dirty&&this.redrawBase(c,h,l);const f=this.ctx;f.setTransform(l,0,0,l,0,0),f.clearRect(0,0,c,h),f.drawImage(this.base,0,0,c,h);const g=this.projection,v=a.rooms[s];if(!g||!v)return;const m=b=>g.offsetX+b*g.scale,p=b=>g.offsetZ+b*g.scale;f.strokeStyle="#1fc9c2",f.lineWidth=1.5,f.strokeRect(m(v.minX),p(v.minZ),(v.maxX-v.minX)*g.scale,(v.maxZ-v.minZ)*g.scale);const y=m(e),w=p(t),M=-Math.sin(n),T=-Math.cos(n);f.strokeStyle="#e8e6dd",f.lineWidth=1.5,f.beginPath(),f.moveTo(y,w),f.lineTo(y+M*8,w+T*8),f.stroke(),f.fillStyle="#1fc9c2",f.beginPath(),f.arc(y,w,2.25,0,Math.PI*2),f.fill()}redrawBase(e,t,n){const s=this.plan,r=this.discovery,a=this.baseCtx;let o=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY,c=Number.POSITIVE_INFINITY,h=Number.NEGATIVE_INFINITY;for(const p of s.rooms)o=Math.min(o,p.minX),l=Math.max(l,p.maxX),c=Math.min(c,p.minZ),h=Math.max(h,p.maxZ);const d=Math.max(1,l-o),u=Math.max(1,h-c),f=Math.min((e-mu*2)/d,(t-mu*2)/u),g={scale:f,offsetX:(e-d*f)/2-o*f,offsetZ:(t-u*f)/2-c*f};this.projection=g;const v=p=>g.offsetX+p*f,m=p=>g.offsetZ+p*f;a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,e,t);for(const p of s.connections){const y=s.rooms[p.a],w=s.rooms[p.b];if(!y||!w)continue;const M=Math.min(No(r,p.a),No(r,p.b));a.save(),a.filter=M<.999?`blur(${gu*(1-M)}px)`:"none",a.globalAlpha=ra+(vu-ra)*M,a.strokeStyle="#788ead",a.lineWidth=1.2,a.beginPath(),a.moveTo(v((y.minX+y.maxX)/2),m((y.minZ+y.maxZ)/2)),a.lineTo(v((w.minX+w.maxX)/2),m((w.minZ+w.maxZ)/2)),a.stroke(),a.restore()}for(const p of s.rooms){const y=No(r,p.id),w=v(p.minX),M=m(p.minZ),T=(p.maxX-p.minX)*f,b=(p.maxZ-p.minZ)*f;a.save(),a.filter=y<.999?`blur(${gu*(1-y)}px)`:"none",a.globalAlpha=ra+(vu-ra)*y,a.fillStyle=y>0?"#172028":"#293443",a.strokeStyle=y>0?"#788ead":"#52647b",a.lineWidth=1,a.fillRect(w,M,T,b),a.strokeRect(w,M,T,b),a.restore()}this.dirty=!1}dispose(){this.plan=null,this.discovery=null,this.projection=null,this.dirty=!0,this.canvas.width=1,this.canvas.height=1,this.base.width=1,this.base.height=1}}function ys(i){const e=document.getElementById(i);if(!e)throw new Error(`Touch element #${i} is missing from index.html`);return e}class cS{root=ys("touch");stick=ys("touch-stick");knob=ys("touch-knob");aim=ys("touch-aim");pause=ys("touch-pause");sprint=ys("touch-sprint");active;gameplayVisible=!1;constructor(e){this.active=e,document.body.classList.toggle("touch",e),this.syncVisibility()}get isActive(){return this.active}setGameplayVisible(e){this.gameplayVisible=e,this.syncVisibility()}setStick(e,t,n){this.knob.style.transform=`translate(calc(-50% + ${e.toFixed(4)} * var(--stick-travel)), calc(-50% + ${t.toFixed(4)} * var(--stick-travel)))`,this.stick.classList.toggle("held",n)}setSprint(e){this.sprint.classList.toggle("on",e),this.sprint.setAttribute("aria-pressed",e?"true":"false")}dispose(){document.body.classList.remove("touch"),this.root.hidden=!0,this.stick.classList.remove("held"),this.sprint.classList.remove("on"),this.setStick(0,0,!1)}syncVisibility(){this.root.hidden=!(this.active&&this.gameplayVisible)}}const Ca={master:.75,effects:1},xu=.02,hS=.7,Fo={attackTime:.035,holdTime:.34,decayTime:.85};function pa(i){return Number.isFinite(i)?i<0?0:i>1?1:i:0}const Qt={onset:.18,urgentOnset:.55,peak:.085,sustainScale:.18,urgentScale:.72,slowHz:.28,urgentHz:.66,slowFreq:292,urgentFreq:524};function _u(i,e,t){if(t<=e)return i>=t?1:0;const n=(i-e)/(t-e);return n<=0?0:n>=1?1:n}function uS(i){const e=Number.isFinite(i)?pa(i):0,t=_u(e,Qt.onset,1/3),n=_u(e,Qt.urgentOnset,2/3);return{slow:Qt.peak*Qt.sustainScale*t,urgent:Qt.peak*Qt.sustainScale*Qt.urgentScale*n,pulseSlow:Qt.peak*t,pulseUrgent:Qt.peak*Qt.urgentScale*n}}const rr={mouseSensitivity:{min:8e-4,max:.006,step:2e-4},touchSensitivity:{min:.0016,max:.01,step:2e-4},masterVolume:{min:0,max:1,step:.05},effectsVolume:{min:0,max:1,step:.05}};function Bl(){return{masterVolume:Ca.master,effectsVolume:Ca.effects,mouseSensitivity:Nu,touchSensitivity:zt.lookSensitivity,invertY:!1,quality:"auto",autoFire:!1,adaptive:!0}}function dS(i){return i==="auto"||gr(i)}class fS{values;onChange=null;constructor(e){if(this.values=Bl(),!e)return;const t=e.get("quality");gr(t)&&(this.values.quality=t);const n=e.get("adaptive");n==="0"?this.values.adaptive=!1:n==="1"&&(this.values.adaptive=!0)}get snapshot(){return this.values}get(e){return this.values[e]}set(e,t){const n=this.coerce(e,t);return n===void 0||this.values[e]===n?!1:(this.values[e]=n,this.onChange?.(e,this.values),!0)}reset(){const e=Bl();for(const t of Object.keys(e))this.set(t,e[t])}coerce(e,t){switch(e){case"mouseSensitivity":case"touchSensitivity":case"masterVolume":case"effectsVolume":{const n=rr[e],s=Number(t);return Number.isFinite(s)?Vn(s,n.min,n.max):void 0}case"invertY":case"autoFire":case"adaptive":return!!t;case"quality":return dS(t)?t:void 0;default:return}}}function Xt(i){const e=document.getElementById(i);if(!e)throw new Error(`Settings element #${i} is missing from index.html`);return e}function Mu(i,e){return e>0?`${(i/e).toFixed(2)}×`:i.toFixed(4)}function yu(i){return`${Math.round(i*100)}%`}const Su=["auto","high","medium","low"];class pS{options;masterRange=Xt("opt-master");masterValue=Xt("opt-master-value");effectsRange=Xt("opt-effects");effectsValue=Xt("opt-effects-value");mouseRange=Xt("opt-mouse");mouseValue=Xt("opt-mouse-value");touchRange=Xt("opt-touch");touchValue=Xt("opt-touch-value");invertToggle=Xt("opt-invert");autoFireToggle=Xt("opt-autofire");qualityGroup=Xt("opt-quality");adaptiveToggle=Xt("opt-adaptive");note=Xt("opt-note");backButton=Xt("btn-settings-back");reloadButton=Xt("btn-settings-reload");qualityButtons;defaults;bootLevel=null;onBack=null;onReload=null;constructor(e,t){this.options=e,this.defaults=t,this.qualityButtons=Array.from(this.qualityGroup.querySelectorAll("button[data-quality]")),this.applyRange(this.mouseRange,rr.mouseSensitivity),this.applyRange(this.touchRange,rr.touchSensitivity),this.applyRange(this.masterRange,rr.masterVolume),this.applyRange(this.effectsRange,rr.effectsVolume),this.masterRange.addEventListener("input",this.onMasterInput),this.effectsRange.addEventListener("input",this.onEffectsInput),this.mouseRange.addEventListener("input",this.onMouseInput),this.touchRange.addEventListener("input",this.onTouchInput),this.invertToggle.addEventListener("click",this.onInvertClick),this.autoFireToggle.addEventListener("click",this.onAutoFireClick),this.adaptiveToggle.addEventListener("click",this.onAdaptiveClick),this.qualityGroup.addEventListener("click",this.onQualityClick),this.qualityGroup.addEventListener("keydown",this.onQualityKeyDown),this.backButton.addEventListener("click",this.onBackClick),this.reloadButton.addEventListener("click",this.onReloadClick),this.refresh()}setBootLevel(e){this.bootLevel=e,this.refresh()}refresh(){const e=this.options.snapshot;this.masterRange.value=String(e.masterVolume),this.masterValue.textContent=yu(e.masterVolume),this.effectsRange.value=String(e.effectsVolume),this.effectsValue.textContent=yu(e.effectsVolume),this.mouseRange.value=String(e.mouseSensitivity),this.mouseValue.textContent=Mu(e.mouseSensitivity,this.defaults.mouseSensitivity),this.touchRange.value=String(e.touchSensitivity),this.touchValue.textContent=Mu(e.touchSensitivity,this.defaults.touchSensitivity),this.setToggle(this.invertToggle,e.invertY),this.setToggle(this.autoFireToggle,e.autoFire),this.setToggle(this.adaptiveToggle,e.adaptive);for(const t of this.qualityButtons){const n=t.dataset.quality===e.quality;t.setAttribute("aria-checked",n?"true":"false"),t.tabIndex=n?0:-1}this.syncNote(e.quality)}dispose(){this.masterRange.removeEventListener("input",this.onMasterInput),this.effectsRange.removeEventListener("input",this.onEffectsInput),this.mouseRange.removeEventListener("input",this.onMouseInput),this.touchRange.removeEventListener("input",this.onTouchInput),this.invertToggle.removeEventListener("click",this.onInvertClick),this.autoFireToggle.removeEventListener("click",this.onAutoFireClick),this.adaptiveToggle.removeEventListener("click",this.onAdaptiveClick),this.qualityGroup.removeEventListener("click",this.onQualityClick),this.qualityGroup.removeEventListener("keydown",this.onQualityKeyDown),this.backButton.removeEventListener("click",this.onBackClick),this.reloadButton.removeEventListener("click",this.onReloadClick),this.note.hidden=!0,this.reloadButton.hidden=!0}applyRange(e,t){e.min=String(t.min),e.max=String(t.max),e.step=String(t.step)}setToggle(e,t){e.setAttribute("aria-pressed",t?"true":"false"),e.textContent=t?"On":"Off"}syncNote(e){const t=this.bootLevel!==null&&gr(e)&&e!==this.bootLevel;this.note.hidden=!t,this.reloadButton.hidden=!t,t&&(this.note.textContent="Resolution changed now — lighting, shadows, textures and effect pools need a reload.")}onMasterInput=()=>{this.options.set("masterVolume",this.masterRange.valueAsNumber)};onEffectsInput=()=>{this.options.set("effectsVolume",this.effectsRange.valueAsNumber)};onMouseInput=()=>{this.options.set("mouseSensitivity",this.mouseRange.valueAsNumber)};onTouchInput=()=>{this.options.set("touchSensitivity",this.touchRange.valueAsNumber)};onInvertClick=()=>{this.options.set("invertY",!this.options.get("invertY"))};onAutoFireClick=()=>{this.options.set("autoFire",!this.options.get("autoFire"))};onAdaptiveClick=()=>{this.options.set("adaptive",!this.options.get("adaptive"))};onQualityClick=e=>{const t=e.target;if(!(t instanceof Element))return;const s=t.closest("button[data-quality]")?.dataset.quality;!s||!Su.includes(s)||this.options.set("quality",s)};onQualityKeyDown=e=>{const t=e.target;if(!(t instanceof Element))return;const n=t.closest("button[data-quality]");if(!n)return;const s=this.qualityButtons.indexOf(n);if(s<0)return;let r=s;switch(e.key){case"ArrowRight":case"ArrowDown":r=(s+1)%this.qualityButtons.length;break;case"ArrowLeft":case"ArrowUp":r=(s-1+this.qualityButtons.length)%this.qualityButtons.length;break;case"Home":r=0;break;case"End":r=this.qualityButtons.length-1;break;default:return}e.preventDefault();const a=this.qualityButtons[r],o=a?.dataset.quality;!o||!Su.includes(o)||(this.options.set("quality",o),a.focus())};onBackClick=()=>{this.onBack?.()};onReloadClick=()=>{const e=this.options.get("quality");gr(e)&&this.onReload?.(e)}}const Pi=600,js=16,Eu=20;function mS(){return{enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0}}function gS(){return{at:0,ms:0,simMs:0,renderMs:0,enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0,programsCompiled:0}}class vS{frames=new Float32Array(Pi);sim=new Float32Array(Pi);render=new Float32Array(Pi);sorted=new Float32Array(Pi);index=0;filled=0;hitchCount=0;breachCount=0;elapsed=0;hitchLog=[];hitchWrite=0;hitchFilled=0;lastPrograms=0;peak=mS();constructor(){for(let e=0;e<js;e++)this.hitchLog.push(gS())}addFrame(e,t,n,s){this.filled===Pi&&this.frames[this.index]>Eu&&this.breachCount--,this.frames[this.index]=e,this.sim[this.index]=t,this.render[this.index]=n,this.index=(this.index+1)%Pi,this.filled<Pi&&this.filled++,this.elapsed+=e/1e3,s.enemies>this.peak.enemies&&(this.peak.enemies=s.enemies),s.projectiles>this.peak.projectiles&&(this.peak.projectiles=s.projectiles),s.decals>this.peak.decals&&(this.peak.decals=s.decals),s.droplets>this.peak.droplets&&(this.peak.droplets=s.droplets),s.drawCalls>this.peak.drawCalls&&(this.peak.drawCalls=s.drawCalls),s.triangles>this.peak.triangles&&(this.peak.triangles=s.triangles),s.programs>this.peak.programs&&(this.peak.programs=s.programs);const r=Math.max(0,s.programs-this.lastPrograms);if(this.lastPrograms=s.programs,e>Eu){this.hitchCount++,this.breachCount++;const a=this.hitchLog[this.hitchWrite];a.at=this.elapsed,a.ms=e,a.simMs=t,a.renderMs=n,a.enemies=s.enemies,a.projectiles=s.projectiles,a.decals=s.decals,a.droplets=s.droplets,a.drawCalls=s.drawCalls,a.triangles=s.triangles,a.programs=s.programs,a.programsCompiled=r,this.hitchWrite=(this.hitchWrite+1)%js,this.hitchFilled<js&&this.hitchFilled++}}syncPrograms(e){this.lastPrograms=e}reset(){this.index=0,this.filled=0,this.hitchCount=0,this.breachCount=0,this.elapsed=0,this.hitchWrite=0,this.hitchFilled=0;const e=this.peak;e.enemies=0,e.projectiles=0,e.decals=0,e.droplets=0,e.drawCalls=0,e.triangles=0,e.programs=0}get sampleCount(){return this.filled}get windowBreaches(){return this.breachCount}report(){return this.percentiles(this.frames)}performance(){const e=this.elapsed/60;return{frame:this.percentiles(this.frames),sim:this.percentiles(this.sim),render:this.percentiles(this.render),windowSeconds:+this.elapsed.toFixed(3),hitchesPerMinute:e>0?+(this.hitchCount/e).toFixed(2):0,hitches:this.recentHitches(),peak:{...this.peak}}}recentHitches(){const e=[],t=this.hitchFilled<js?0:this.hitchWrite;for(let n=0;n<this.hitchFilled;n++)e.push({...this.hitchLog[(t+n)%js]});return e}percentiles(e){const t=this.filled;if(t===0)return{p50:0,p95:0,p99:0,worst:0,hitches:0,samples:0};const n=this.sorted.subarray(0,t);return n.set(e.subarray(0,t)),n.sort(),{p50:aa(Uo(n,t,.5)),p95:aa(Uo(n,t,.95)),p99:aa(Uo(n,t,.99)),worst:aa(n[t-1]),hitches:this.hitchCount,samples:t}}}function Uo(i,e,t){const n=Math.min(e-1,Math.max(0,Math.ceil(t*e)-1));return i[n]}function aa(i){return Math.round(i*1e3)/1e3}const xS={entry:"#2c4a52",corridor:"#1d2a35",junction:"#243444",gallery:"#20303c",lab:"#3a3040",storage:"#38313c",containment:"#43303a",reactor:"#4e3134",chamber:"#5a3326"},bu=10;class _S{canvas;ctx;plan=null;visible=!1;constructor(e){this.canvas=e;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot draw the debug map");this.ctx=t}setPlan(e){this.plan=e}setVisible(e){this.visible=e,this.canvas.hidden=!e}get isVisible(){return this.visible}draw(e){const t=this.plan;if(!this.visible||!t)return;const n=Math.min(window.devicePixelRatio||1,2),s=this.canvas.clientWidth,r=this.canvas.clientHeight;if(s===0||r===0)return;this.canvas.width!==Math.round(s*n)&&(this.canvas.width=Math.round(s*n)),this.canvas.height!==Math.round(r*n)&&(this.canvas.height=Math.round(r*n));const a=this.ctx;a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,s,r),a.fillStyle="rgba(13, 15, 19, 0.82)",a.fillRect(0,0,s,r);const o=Math.max(1,t.maxX-t.minX),l=Math.max(1,t.maxZ-t.minZ),c=Math.min((s-bu*2)/o,(r-bu*2)/l),h=(s-o*c)/2-t.minX*c,d=(r-l*c)/2-t.minZ*c,u=M=>h+M*c,f=M=>d+M*c;for(const M of t.connections){const T=t.rooms[M.a],b=t.rooms[M.b];!T||!b||(a.beginPath(),a.moveTo(u((T.minX+T.maxX)/2),f((T.minZ+T.maxZ)/2)),a.lineTo(u((b.minX+b.maxX)/2),f((b.minZ+b.maxZ)/2)),a.strokeStyle=M.loop?"#1fc9c2":M.critical?"#adc0c8":"#52647b",a.lineWidth=M.critical?2:1,a.setLineDash(M.loop?[3,3]:[]),a.stroke())}a.setLineDash([]),a.font="9px ui-monospace, Menlo, monospace",a.textAlign="center",a.textBaseline="middle";for(const M of t.rooms){const T=u(M.minX),b=f(M.minZ),A=(M.maxX-M.minX)*c,_=(M.maxZ-M.minZ)*c;a.fillStyle=xS[M.archetype],a.fillRect(T,b,A,_);const E=M.id===e.engagedRoomId,C=M.id===e.activeRoomId;a.strokeStyle=E?"#f2610a":C?"#1fc9c2":e.cleared[M.id]?"#5d7a5d":"#52647b",a.lineWidth=E||C?2:1,a.strokeRect(T,b,A,_),a.strokeStyle="#f2610a",a.lineWidth=1;for(const P of M.enemySpawns)a.beginPath(),a.moveTo(u(P.x),f(P.z)),a.lineTo(u(P.entryX),f(P.entryZ)),a.stroke();A>22&&_>14&&(a.fillStyle="#adc0c8",a.fillText(`${M.id}`,T+A/2,b+_/2))}a.fillStyle="#f2610a";for(const M of e.enemies)a.fillRect(u(M.x)-1.5,f(M.z)-1.5,3,3);const g=u(e.playerX),v=f(e.playerZ),m=-Math.sin(e.playerYaw),p=-Math.cos(e.playerYaw);a.strokeStyle="#1fc9c2",a.lineWidth=2,a.beginPath(),a.moveTo(g,v),a.lineTo(g+m*10,v+p*10),a.stroke(),a.fillStyle="#1fc9c2",a.beginPath(),a.arc(g,v,2.5,0,Math.PI*2),a.fill();const y=t.report;a.textAlign="left",a.fillStyle=y.fallback?"#f2610a":"#788ead";const w=[`${y.seed}  ${y.rooms}r ${y.connections}c ${y.loops}L`,`try ${y.attempts}  ${y.ms.toFixed(1)}ms${y.fallback?"  FALLBACK":""}`];y.warnings.length>0&&w.push(y.warnings[0]);for(let M=0;M<w.length;M++)a.fillText(w[M],6,r-8-(w.length-1-M)*11)}dispose(){this.plan=null,this.setVisible(!1)}}class MS{accumulator=0;lastTime=0;running=!1;started=!1;stopped=!1;scheduler="probing";frameId=0;probeTimer=null;timerFrame=null;step;render;requestFrame;cancelFrame;constructor(e,t,n,s){this.step=e,this.render=t,this.requestFrame=n,this.cancelFrame=s}start(){this.started||(this.started=!0,this.stopped=!1,this.running=!0,this.lastTime=performance.now(),this.scheduleFrame())}setRunning(e){e&&!this.running&&this.resetClock(),this.running=e}get isRunning(){return this.running}get usesTimerFallback(){return this.scheduler==="timer"}stop(){this.running=!1,this.stopped=!0,this.frameId!==0&&this.cancelFrame(this.frameId),this.probeTimer!==null&&clearTimeout(this.probeTimer),this.timerFrame!==null&&clearTimeout(this.timerFrame),this.frameId=0,this.probeTimer=null,this.timerFrame=null}resetClock(){this.lastTime=performance.now(),this.accumulator=0}scheduleFrame(){if(!this.stopped){if(this.scheduler==="timer"){this.timerFrame=setTimeout(this.onTimerFrame,1e3/60);return}this.frameId=this.requestFrame(this.onAnimationFrame),this.scheduler==="probing"&&this.probeTimer===null&&(this.probeTimer=setTimeout(this.onProbeTimeout,80))}}onAnimationFrame=e=>{this.stopped||this.scheduler==="timer"||(this.scheduler==="probing"&&(this.scheduler="raf",this.probeTimer!==null&&clearTimeout(this.probeTimer),this.probeTimer=null),this.frameId=0,this.tick(e))};onProbeTimeout=()=>{this.stopped||this.scheduler!=="probing"||(this.probeTimer=null,this.cancelFrame(this.frameId),this.frameId=0,this.scheduler="timer",this.tick(performance.now()))};onTimerFrame=()=>{this.stopped||this.scheduler!=="timer"||(this.timerFrame=null,this.tick(performance.now()))};tick(e){if(this.stopped)return;const t=Math.max(0,e-this.lastTime);this.lastTime=e;const n=Math.min(t,250)/1e3;if(this.running){this.accumulator+=n;let r=0;for(;this.accumulator>=Fi&&r<wc;)this.step(Fi),this.accumulator-=Fi,r++;r===wc&&(this.accumulator=0)}const s=this.running?this.accumulator/Fi:0;this.render(s,t,n),this.scheduleFrame()}}const ma={gain:1,pan:0},wu=9,yS=1.2,SS=.85;function ES(i,e,t,n,s,r=ma){const a=n-i,o=s-e,l=Math.hypot(a,o);if(r.gain=wu/(wu+l),l<yS)return r.pan=0,r;const c=Math.cos(t),h=-Math.sin(t),d=(a*c+o*h)/l;return r.pan=Vn(d,-1,1)*SS,r}let ar=null;function bS(i){if(ar&&ar.sampleRate===i.sampleRate)return ar;const e=Math.floor(i.sampleRate*2),t=i.createBuffer(1,e,i.sampleRate),n=t.getChannelData(0);let s=2654435769;for(let r=0;r<e;r++)s=Math.imul(s,1664525)+1013904223>>>0,n[r]=s/2147483648-1;return ar=t,t}function wS(){ar=null}function Wd(i,e,t,n,s){const r=Math.max(1e-4,t*.001);i.setValueAtTime(1e-4,e),i.linearRampToValueAtTime(t,e+n),i.exponentialRampToValueAtTime(r,e+n+s),i.setValueAtTime(0,e+n+s+.001)}function Ht(i,e,t){const n=i.createOscillator(),s=i.createGain();n.type=t.type??"sine",t.detune&&(n.detune.value=t.detune),n.frequency.setValueAtTime(Math.max(1,t.freq),t.start),t.freqTo!==void 0&&n.frequency.exponentialRampToValueAtTime(Math.max(1,t.freqTo),t.start+t.duration),Wd(s.gain,t.start,t.gain,t.attack??.004,t.duration),n.connect(s).connect(e),n.start(t.start),n.stop(t.start+t.duration+.05),n.onended=()=>{n.disconnect(),s.disconnect()}}function ri(i,e,t){const n=i.createBufferSource();n.buffer=bS(i),n.loop=!0;const s=i.createBiquadFilter();s.type=t.filter??"bandpass",s.frequency.setValueAtTime(Math.max(20,t.freq),t.start),t.freqTo!==void 0&&s.frequency.exponentialRampToValueAtTime(Math.max(20,t.freqTo),t.start+t.duration),t.q!==void 0&&(s.Q.value=t.q);const r=i.createGain();Wd(r.gain,t.start,t.gain,t.attack??.002,t.duration),n.connect(s).connect(r).connect(e),n.start(t.start),n.stop(t.start+t.duration+.05),n.onended=()=>{n.disconnect(),s.disconnect(),r.disconnect()}}function mc(i,e,t,n){ri(i,e,{start:t,duration:.03,gain:n,attack:.001,filter:"highpass",freq:2200})}const TS=2,AS=6,RS=12,Xd=-1,Tu=0,Xi=1;class CS{ctx=null;master=null;limiter=null;sfxBus=null;ambienceGain=null;alarmSlow=null;alarmUrgent=null;persistentNodes=[];releaseTimers=new Map;listenerX=0;listenerZ=0;listenerYaw=0;muted=!1;volume=Ca.master;effects=Ca.effects;escalation=0;announcedEscalation=0;pendingEscalationPulse=!1;suspended=!1;voicesThisFrame=0;get ready(){return this.ctx!==null&&this.ctx.state==="running"}get isMuted(){return this.muted}unlock(){if(!this.ctx){const e=window.AudioContext??window.webkitAudioContext;if(!e)return;try{this.ctx=new e}catch{this.ctx=null;return}this.master=this.ctx.createGain(),this.limiter=this.ctx.createDynamicsCompressor(),this.limiter.threshold.value=-8,this.limiter.knee.value=6,this.limiter.ratio.value=12,this.limiter.attack.value=.002,this.limiter.release.value=.18,this.sfxBus=this.ctx.createGain(),this.ambienceGain=this.ctx.createGain(),this.ambienceGain.gain.value=0,this.sfxBus.connect(this.limiter),this.ambienceGain.connect(this.limiter),this.limiter.connect(this.master),this.master.connect(this.ctx.destination),this.applyVolume(),this.applyEffects(),this.startAmbience(),this.startAlarm();const t=this.pendingEscalationPulse;this.pendingEscalationPulse=!1,this.applyEscalation(t)}this.ctx.resume().catch(()=>{}),this.suspended=!1}setSuspended(e){!this.ctx||this.suspended===e||(this.suspended=e,e?this.ctx.suspend().catch(()=>{}):this.ctx.resume().catch(()=>{}))}setMuted(e){this.muted=e,this.applyVolume()}toggleMuted(){return this.setMuted(!this.muted),this.muted}setMasterVolume(e){this.volume=pa(e),this.applyVolume()}setEffectsVolume(e){this.effects=pa(e),this.applyEffects()}get masterVolume(){return this.volume}get effectsVolume(){return this.effects}setEscalation(e){const t=pa(e);if(t===this.escalation)return;const n=t>this.announcedEscalation;n&&(this.announcedEscalation=t),this.escalation=t,n&&(!this.ctx||!this.alarmSlow||!this.alarmUrgent)&&(this.pendingEscalationPulse=!0),this.applyEscalation(n)}resetEscalation(){this.escalation=0,this.announcedEscalation=0,this.pendingEscalationPulse=!1,this.applyEscalation(!1)}get escalationLevel(){return this.escalation}alarmGains(){return!this.alarmSlow||!this.alarmUrgent?{slow:-1,urgent:-1}:{slow:this.alarmSlow.gain.value,urgent:this.alarmUrgent.gain.value}}setListener(e,t,n){this.listenerX=e,this.listenerZ=t,this.listenerYaw=n}beginFrame(){this.voicesThisFrame=0}get now(){return this.ctx?this.ctx.currentTime:0}get context(){return this.ctx}voice(e=1,t=Tu){if(!this.ctx||!this.sfxBus||this.suspended||!this.claimVoice(t))return null;const n=this.ctx.createGain();return n.gain.value=e,n.connect(this.sfxBus),this.scheduleRelease(n),n}spatialVoice(e,t,n=1,s=Tu){if(!this.ctx||!this.sfxBus||this.suspended)return null;ES(this.listenerX,this.listenerZ,this.listenerYaw,e,t,ma);const r=n*ma.gain;if(r<.01||!this.claimVoice(s))return null;const a=this.ctx.createGain();a.gain.value=r;const o=this.ctx.createStereoPanner();return o.pan.value=ma.pan,a.connect(o).connect(this.sfxBus),this.scheduleRelease(a,o),a}dispose(){this.stopPersistent(),this.cancelPendingReleases(),this.master?.disconnect(),this.limiter?.disconnect(),this.sfxBus?.disconnect(),this.ambienceGain?.disconnect(),this.alarmSlow?.disconnect(),this.alarmUrgent?.disconnect();const e=this.ctx;this.ctx=null,this.master=null,this.limiter=null,this.sfxBus=null,this.ambienceGain=null,this.alarmSlow=null,this.alarmUrgent=null,wS(),e?.close().catch(()=>{})}claimVoice(e){const t=e>=Xi?RS:e<=Xd?TS:AS;return this.voicesThisFrame>=t?!1:(this.voicesThisFrame++,!0)}applyVolume(){if(!this.master||!this.ctx)return;const e=this.muted?0:this.volume;this.master.gain.setTargetAtTime(e,this.ctx.currentTime,xu)}applyEffects(){!this.sfxBus||!this.ctx||this.sfxBus.gain.setTargetAtTime(this.effects,this.ctx.currentTime,xu)}applyEscalation(e){if(!this.ctx||!this.alarmSlow||!this.alarmUrgent)return;const t=uS(this.escalation),n=this.ctx.currentTime;this.scheduleAlarmGain(this.alarmSlow.gain,t.slow,t.pulseSlow,n,e),this.scheduleAlarmGain(this.alarmUrgent.gain,t.urgent,t.pulseUrgent,n,e)}scheduleAlarmGain(e,t,n,s,r){const a=e.value;if(e.cancelScheduledValues(s),e.setValueAtTime(a,s),!r||n<=t){e.setTargetAtTime(t,s,hS);return}e.setTargetAtTime(n,s,Fo.attackTime),e.setTargetAtTime(t,s+Fo.holdTime,Fo.decayTime)}scheduleRelease(...e){const t=window.setTimeout(()=>{this.releaseTimers.delete(t);for(const n of e)n.disconnect()},4e3);this.releaseTimers.set(t,e)}cancelPendingReleases(){for(const[e,t]of this.releaseTimers){window.clearTimeout(e);for(const n of t)n.disconnect()}this.releaseTimers.clear()}startAmbience(){const e=this.ctx,t=this.ambienceGain;if(!e||!t)return;const n=e.createOscillator();n.type="sawtooth",n.frequency.value=55;const s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=180,s.Q.value=3;const r=e.createGain();r.gain.value=.08,n.connect(s).connect(r).connect(t),n.start();const a=e.createOscillator();a.type="sine",a.frequency.value=82.5;const o=e.createGain();o.gain.value=.035,a.connect(o).connect(t),a.start(),this.persistentNodes.push(n,s,r,a,o),t.gain.setValueAtTime(0,e.currentTime),t.gain.linearRampToValueAtTime(.5,e.currentTime+1.5)}startAlarm(){const e=this.ctx,t=this.sfxBus;!e||!t||(this.alarmSlow=this.buildAlarmLayer(e,t,Qt.slowFreq,Qt.slowHz,"square",900),this.alarmUrgent=this.buildAlarmLayer(e,t,Qt.urgentFreq,Qt.urgentHz,"triangle",1500))}buildAlarmLayer(e,t,n,s,r,a){const o=e.createOscillator();o.type=r,o.frequency.value=n;const l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=a,l.Q.value=.7;const c=e.createGain();c.gain.value=.5;const h=e.createOscillator();h.type="sine",h.frequency.value=s;const d=e.createGain();d.gain.value=.5,h.connect(d).connect(c.gain);const u=e.createGain();return u.gain.value=0,o.connect(l).connect(c).connect(u).connect(t),o.start(),h.start(),this.persistentNodes.push(o,l,c,h,d,u),u}stopPersistent(){for(const e of this.persistentNodes){const t=e;if(typeof t.stop=="function")try{t.stop()}catch{}e.disconnect()}this.persistentNodes.length=0}}let qi=Vt("boot","audio");function PS(i){qi=Vt(i,"audio")}function IS(i){const e=i.voice(.55,Xi);if(!e)return;const t=i.context;if(!t)return;const n=i.now,s=we(qi,.94,1.06);Ht(t,e,{type:"sine",freq:420*s,freqTo:48,start:n,duration:.24,gain:.9}),Ht(t,e,{type:"sawtooth",freq:220*s,freqTo:60,start:n,duration:.14,gain:.22}),ri(t,e,{start:n,duration:.16,gain:.4,filter:"bandpass",freq:1800,freqTo:300,q:1.2}),mc(t,e,n,.5)}function LS(i,e){const t=i.voice(.12);if(!t)return;const n=i.context;if(!n)return;const s=i.now+e*.35;Ht(n,t,{type:"triangle",freq:300,freqTo:900,start:s,duration:e*.6,gain:.5,attack:e*.4})}function DS(i,e,t){const n=i.spatialVoice(e,t,.4);if(!n)return;const s=i.context;if(!s)return;const r=i.now;Ht(s,n,{type:"sine",freq:180*we(qi,.9,1.1),freqTo:45,start:r,duration:.16,gain:.7}),ri(s,n,{start:r,duration:.09,gain:.35,filter:"lowpass",freq:900,freqTo:200})}function NS(i,e,t){const n=i.spatialVoice(e,t,.42);if(!n)return;const s=i.context;if(!s)return;const r=i.now;Ht(s,n,{type:"triangle",freq:260*we(qi,.85,1.15),freqTo:90,start:r,duration:.1,gain:.6}),ri(s,n,{start:r,duration:.06,gain:.3,filter:"bandpass",freq:700,q:1})}function FS(i,e,t,n){const s=i.spatialVoice(e,t,.17*n,Xd);if(!s)return;const r=i.context;if(!r)return;const a=i.now,o=we(qi,.88,1.14)/n;Ht(r,s,{type:"sine",freq:128*o,freqTo:54*o,start:a,duration:.07,gain:.5}),ri(r,s,{start:a,duration:.05,gain:.28,filter:"lowpass",freq:620*o,freqTo:190})}function Oo(i,e,t){const n=i.spatialVoice(e,t,.3);if(!n)return;const s=i.context;if(!s)return;const r=i.now;Ht(s,n,{type:"square",freq:150,freqTo:380,start:r,duration:.32,gain:.16,attack:.06})}function US(i,e,t,n){const s=i.spatialVoice(e,t,.5,Xi);if(!s)return;const r=i.context;if(!r)return;const a=i.now;Ht(r,s,{type:"triangle",freq:180,freqTo:1400,start:a,duration:n,gain:.32,attack:n*.7}),ri(r,s,{start:a,duration:n,gain:.3,attack:n*.8,filter:"bandpass",freq:400,freqTo:3200,q:4})}function OS(i,e,t,n){const s=i.spatialVoice(e,t,.9,Xi);if(!s)return;const r=i.context;if(!r)return;const a=i.now,o=we(qi,.92,1.09)/n;Ht(r,s,{type:"sine",freq:190*o,freqTo:38*o,start:a,duration:.26*n,gain:1}),ri(r,s,{start:a,duration:.2*n,gain:.75,filter:"bandpass",freq:2600*o,freqTo:240*o,q:1.6}),mc(r,s,a,.55)}function BS(i,e,t){const n=i.spatialVoice(e,t,.4,Xi);if(!n)return;const s=i.context;if(!s)return;const r=i.now+.045;ri(s,n,{start:r,duration:.13,gain:.5,attack:.006,filter:"lowpass",freq:1600*we(qi,.85,1.2),freqTo:400})}function kS(i){const e=i.voice(.7,Xi);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Ht(t,e,{type:"sine",freq:120,freqTo:40,start:n,duration:.3,gain:.9}),ri(t,e,{start:n,duration:.18,gain:.4,filter:"bandpass",freq:1400,freqTo:500,q:.8})}function zS(i){const e=i.voice(.8,Xi);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Ht(t,e,{type:"sawtooth",freq:220,freqTo:30,start:n,duration:1.2,gain:.5}),Ht(t,e,{type:"sine",freq:110,freqTo:22,start:n,duration:1.4,gain:.5})}function VS(i){const e=i.voice(.35);if(!e)return;const t=i.context;if(!t)return;const n=i.now;for(let s=0;s<2;s++)Ht(t,e,{type:"square",freq:620,start:n+s*.18,duration:.12,gain:.28})}function Bo(i){const e=i.voice(.35);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Ht(t,e,{type:"triangle",freq:520,start:n,duration:.14,gain:.3}),Ht(t,e,{type:"triangle",freq:780,start:n+.13,duration:.2,gain:.3})}function er(i){const e=i.voice(.4);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Ht(t,e,{type:"triangle",freq:880,start:n,duration:.09,gain:.3}),mc(t,e,n,.18)}const GS=12,oa=.2,HS=.5,WS={playerRadius:lt.radius,playerHeight:lt.height,enemyRadius:sf,enemyHeight:rf};class XS{renderApp;labMaterials;worldView;enemyView;projectileView;splatView;burstView;weaponView;cameraController;audio=new CS;hud=new iS;minimap;stats=new vS;debugMap;startButton=document.getElementById("btn-start");resumeButton=document.getElementById("btn-resume");retryButton=document.getElementById("btn-retry");newSeedButton=document.getElementById("btn-newseed");optionsButton=document.getElementById("btn-options");optionsPauseButton=document.getElementById("btn-options-pause");pauseScreen=document.getElementById("screen-pause");input;touchLayer;touch;actions=Yf();loop;state;seed;screen="title";genMs=0;prewarmMs=0;prevYaw=0;prevPitch=0;elapsed=0;debugAge=oa;roomName="";mapEnemies=[];clearedRooms=[];muzzleWorld=new U;quality;frameContext={enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0};stepMs=0;resizeRecheck=0;viewportAge=0;options;settings;adaptive;settingsReturn="title";constructor(e){const t=new URLSearchParams(location.search);this.seed=Uc(t.get("seed")),this.quality=CM(t),this.options=new fS(t),this.renderApp=new PM(e,this.quality),this.adaptive=new IM(this.quality.pixelRatioCap,this.options.get("adaptive")),this.labMaterials=kM(this.renderApp.maxAnisotropy),this.worldView=new JM(this.renderApp.scene,this.labMaterials),this.enemyView=new my(this.renderApp.scene,Yt.maxAlive),this.projectileView=new by(this.renderApp.scene,GS,this.quality.projectileShader,this.quality.projectileLights),this.splatView=new ky(this.renderApp.renderer,this.renderApp.scene,{paintTexelsPerMetre:this.quality.paintTexelsPerMetre,paintMapMax:this.quality.paintMapMax,decalCapacity:this.quality.decalCapacity}),this.burstView=new $y(this.renderApp.scene,{dropletCapacity:this.quality.dropletCapacity,flashCapacity:this.quality.flashCapacity}),this.burstView.onDropletLand=(n,s,r,a,o)=>{this.splatView.stampDrip(n,s,r,a,o)},this.weaponView=new jy(this.renderApp.viewScene),this.cameraController=new eS(this.renderApp.camera),this.debugMap=new _S(document.getElementById("debug-map")),this.minimap=new lS(document.getElementById("minimap-canvas")),this.input=new Jf(e,this.actions,{sensitivity:this.options.get("mouseSensitivity"),invertY:this.options.get("invertY")}),this.input.onLockStateChange=(n,s)=>{if(this.screen==="none"){if(n){this.hud.setCaptureHint(!1);return}s?this.hud.setCaptureHint(!this.touchLayer.isActive):this.setScreen("pause")}},this.input.onSuspend=()=>{this.screen==="none"&&this.setScreen("pause")},this.touchLayer=new cS(RM(t)),this.touch=new Qf({stick:this.touchLayer.stick,aim:this.touchLayer.aim,pause:this.touchLayer.pause,sprint:this.touchLayer.sprint},this.actions,{sensitivity:this.options.get("touchSensitivity"),invertY:this.options.get("invertY"),autoFire:this.options.get("autoFire")}),this.touch.peer=this.input,this.input.peer=this.touch,this.touch.onStickChange=(n,s,r)=>this.touchLayer.setStick(n,s,r),this.touch.onSprintChange=n=>this.touchLayer.setSprint(n),this.settings=new pS(this.options,Bl()),this.settings.setBootLevel(this.quality.level),this.settings.onBack=()=>this.setScreen(this.settingsReturn),this.settings.onReload=n=>this.reloadWithQuality(n),this.options.onChange=n=>this.applyOption(n),this.audio.setMasterVolume(this.options.get("masterVolume")),this.audio.setEffectsVolume(this.options.get("effectsVolume")),this.state=this.createRun(this.seed),this.loop=new MS(n=>this.step(n),(n,s,r)=>this.renderFrame(n,s,r),n=>window.requestAnimationFrame(n),n=>window.cancelAnimationFrame(n)),this.bindUi(),window.addEventListener("resize",this.onResize),window.addEventListener("orientationchange",this.onResize),t.get("debug")==="1"&&(this.hud.setDebugVisible(!0),this.debugMap.setVisible(!0)),this.setScreen("title"),this.loop.start(),this.loop.setRunning(!1)}onStartClick=()=>{this.audio.unlock(),er(this.audio),this.restart(!0)};onResumeClick=()=>{this.audio.unlock(),this.setScreen("none")};onRetryClick=()=>{this.audio.unlock(),er(this.audio),this.restart(!0)};onNewSeedClick=()=>{this.audio.unlock(),er(this.audio),this.restart(!1)};onPauseScreenClick=e=>{if(this.touch.consumePauseClickSuppression())return;const t=e.target;t instanceof Element&&t.closest("button")||this.setScreen("none")};createRun(e){const t=performance.now(),n=am(e,{validation:WS,now:()=>performance.now()}),s=Gf(n,Vt(e,"sim"));this.genMs=performance.now()-t,this.splatView.beginFacility(n,s.index,e),this.burstView.beginRoom(0,e),PS(e),this.audio.resetEscalation(),this.worldView.build(n,this.splatView.floorPaint),this.renderApp.configureForFacility(n),this.renderApp.setFixtureFocus(n.playerSpawn.x,n.playerSpawn.z),this.debugMap.setPlan(n),this.minimap.setPlan(n),this.clearedRooms.length=0;for(const a of n.rooms)this.clearedRooms.push(a.encounter.budget<=0);this.actions.yaw=n.playerSpawn.yaw,this.actions.pitch=0,this.prevYaw=this.actions.yaw,this.prevPitch=0,this.cameraController.reset(),this.enemyView.update(s.enemies,0),this.projectileView.reset(),this.weaponView.reset(),this.stats.reset(),this.debugAge=oa,this.cameraController.update(s.player,this.actions.yaw,0,0,0);const r=performance.now();return this.renderApp.setShadowFocus(s.player.x,s.player.z),this.renderApp.prewarm(),this.prewarmMs=performance.now()-r,this.stats.syncPrograms(this.renderApp.programCount),this.hud.setIntegrity(s.player.hp,lt.maxHp),this.hud.clearStatus(),this.roomName=n.rooms[n.startRoomId].name,s}restart(e=!0){e||(this.seed=Uc(null)),this.state=this.createRun(this.seed),this.elapsed=0,this.input.release(),this.touch.release(),this.loop.resetClock(),this.setScreen("none"),this.hud.setStatus(this.roomName,"Containment has failed — reach the core chamber","alert")}setScreen(e){this.screen=e,this.hud.showScreen(e),this.loop.setRunning(e==="none"),this.input.setCaptureEnabled(e==="none"),this.touch.setEnabled(e==="none"),this.touchLayer.setGameplayVisible(e==="none"),this.audio.setSuspended(e!=="none"),e==="none"?(this.input.requestLock(),this.hud.setCaptureHint(this.needsCaptureHint)):(this.hud.setCaptureHint(!1),this.input.release(),this.input.releaseLock(),this.touch.release()),e==="over"&&(this.hud.clearStatus(),this.hud.setResults(this.state.stats,xa(this.state),va(this.state),this.state.seed,this.state.status==="cleared"))}applyOption(e){const t=this.options.snapshot;switch(e){case"masterVolume":this.audio.setMasterVolume(t.masterVolume);break;case"effectsVolume":this.audio.setEffectsVolume(t.effectsVolume);break;case"mouseSensitivity":this.input.setSensitivity(t.mouseSensitivity);break;case"touchSensitivity":this.touch.setSensitivity(t.touchSensitivity);break;case"invertY":this.input.setInvertY(t.invertY),this.touch.setInvertY(t.invertY);break;case"autoFire":this.touch.setAutoFire(t.autoFire);break;case"adaptive":this.adaptive.setEnabled(t.adaptive);break;case"quality":this.applyQualityChoice();break}this.settings.refresh()}applyQualityChoice(){const e=this.options.get("quality"),t=e==="auto"?Ud():e;e!=="auto"&&this.options.get("adaptive")&&this.options.set("adaptive",!1),this.adaptive.setBase(Fd(t).pixelRatioCap)&&this.commitPixelRatioCap()}commitPixelRatioCap(){this.renderApp.setMaxPixelRatio(this.adaptive.pixelRatioCap),this.renderApp.resize()}reloadWithQuality(e){const t=new URLSearchParams(location.search);t.set("quality",e),t.set("seed",this.seed),t.set("adaptive",this.options.get("adaptive")?"1":"0"),location.search=t.toString()}openSettings(e){this.settingsReturn=e,this.settings.refresh(),this.setScreen("settings")}onMenuPointerDown=()=>{this.audio.unlock()};onOptionsClick=()=>{this.audio.unlock(),er(this.audio),this.openSettings("title")};onOptionsPauseClick=()=>{this.audio.unlock(),er(this.audio),this.openSettings("pause")};get menuButtons(){return[this.startButton,this.resumeButton,this.retryButton,this.newSeedButton,this.optionsButton,this.optionsPauseButton]}bindUi(){for(const e of this.menuButtons)e?.addEventListener("pointerdown",this.onMenuPointerDown);this.startButton?.addEventListener("click",this.onStartClick),this.resumeButton?.addEventListener("click",this.onResumeClick),this.retryButton?.addEventListener("click",this.onRetryClick),this.newSeedButton?.addEventListener("click",this.onNewSeedClick),this.optionsButton?.addEventListener("click",this.onOptionsClick),this.optionsPauseButton?.addEventListener("click",this.onOptionsPauseClick),this.pauseScreen?.addEventListener("click",this.onPauseScreenClick)}unbindUi(){for(const e of this.menuButtons)e?.removeEventListener("pointerdown",this.onMenuPointerDown);this.startButton?.removeEventListener("click",this.onStartClick),this.resumeButton?.removeEventListener("click",this.onResumeClick),this.retryButton?.removeEventListener("click",this.onRetryClick),this.newSeedButton?.removeEventListener("click",this.onNewSeedClick),this.optionsButton?.removeEventListener("click",this.onOptionsClick),this.optionsPauseButton?.removeEventListener("click",this.onOptionsPauseClick),this.pauseScreen?.removeEventListener("click",this.onPauseScreenClick)}step(e){const t=performance.now();Xf(this.state,this.actions,e),this.touch.acknowledgeFireLatch(),this.stepMs+=performance.now()-t}renderFrame(e,t,n,s=!0){const r=performance.now(),a=this.stepMs;this.stepMs=0,this.elapsed+=n,this.handleInputEdges();const o=this.state,l=this.actions.yaw,c=this.actions.pitch,h=l-this.prevYaw,d=c-this.prevPitch;if(this.prevYaw=l,this.prevPitch=c,this.cameraController.update(o.player,l,c,e,n),this.renderApp.setShadowFocus(o.player.x,o.player.z),this.renderApp.setFixtureFocus(o.player.x,o.player.z),this.audio.beginFrame(),this.audio.setListener(o.player.x,o.player.z,l),this.enemyView.update(o.enemies,e),this.drainEvents(),this.projectileView.update(o.projectiles,e,this.elapsed),this.splatView.update(n),this.burstView.update(n,this.elapsed),this.weaponView.update(n,h,d,Math.hypot(o.player.vx,o.player.vz),this.elapsed),this.hud.update(n),this.hud.setCooling(o.player.fireCooldown>0),this.hud.setCaptureHint(this.needsCaptureHint),this.minimap.draw(o.player.x,o.player.z,l,o.activeRoomId,n),this.viewportAge+=n,this.viewportAge>=HS&&(this.viewportAge=0,this.applyViewportChange()),this.debugAge+=n,this.hud.isDebugVisible&&this.debugAge>=oa){this.debugAge=0;const f=o.engagedRoomId>=0?o.runtime[o.engagedRoomId]:void 0;this.hud.setDebug({seed:o.seed,quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveSteps:this.adaptive.downgrades,frame:this.stats.report(),drawCalls:this.renderApp.drawCalls,triangles:this.renderApp.triangles,programs:this.renderApp.programCount,geometries:this.renderApp.geometryCount,textures:this.renderApp.textureCount,meshes:this.worldView.meshCount,lights:this.renderApp.lightCount,fixtures:this.renderApp.fixtureCount,rooms:o.rooms.length,roomArchetype:o.rooms[o.activeRoomId]?.archetype??"—",roomEscalation:o.rooms[o.activeRoomId]?.escalation??0,sectors:va(o),brushes:o.brushes.length,sectorsCleared:xa(o),threatTotal:o.plan.report.threatTotal,requiredThreat:o.plan.report.requiredThreat,threatSpent:f?f.threatSpent:0,threatBudget:f?o.rooms[f.id].encounter.budget:0,enemies:o.enemies.length,projectiles:o.projectiles.length,decals:this.splatView.decalCount,decalBudget:this.quality.decalCapacity,droplets:this.burstView.dropletCount,score:o.stats.score,genMs:this.genMs,prewarmMs:this.prewarmMs,attempts:o.plan.report.attempts,fallback:o.plan.report.fallback})}if(this.debugMap.isVisible){this.mapEnemies.length=0;for(const f of o.enemies)this.mapEnemies.push({x:f.x,z:f.z});this.debugMap.draw({playerX:o.player.x,playerZ:o.player.z,playerYaw:l,activeRoomId:o.activeRoomId,engagedRoomId:o.engagedRoomId,cleared:this.clearedRooms,enemies:this.mapEnemies})}if(this.renderApp.render(),!s){this.stats.syncPrograms(this.renderApp.programCount);return}const u=this.frameContext;u.enemies=o.enemies.length,u.projectiles=o.projectiles.length,u.decals=this.splatView.decalCount,u.droplets=this.burstView.dropletCount,u.drawCalls=this.renderApp.drawCalls,u.triangles=this.renderApp.triangles,u.programs=this.renderApp.programCount,this.stats.addFrame(t,a,performance.now()-r,u),this.adaptive.consider({runActive:this.screen==="none",visible:!document.hidden,timerScheduled:this.loop.usesTimerFallback,samples:this.stats.sampleCount,breaches:this.stats.windowBreaches})&&this.commitPixelRatioCap()}handleInputEdges(){if(this.input.consumeDebugToggle()){const n=this.hud.toggleDebug();this.debugMap.setVisible(n),n&&(this.debugAge=oa)}this.input.consumeMuteToggle()&&this.audio.toggleMuted(),this.input.consumeRestart()&&(this.screen==="over"?this.restart(!1):this.screen!=="title"&&this.screen!=="settings"&&this.restart(!0));const e=this.input.consumePause(),t=this.touch.consumePause();(e||t)&&(this.screen==="none"?this.setScreen("pause"):this.screen==="pause"?this.setScreen("none"):this.screen==="settings"&&this.setScreen(this.settingsReturn))}drainEvents(){const e=this.state.events;for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case"shot":this.weaponView.writeMuzzleWorld(this.renderApp.camera,this.renderApp.viewCamera,this.muzzleWorld),this.projectileView.beginShot(n.id,this.muzzleWorld.x,this.muzzleWorld.y,this.muzzleWorld.z),this.weaponView.kick(),this.cameraController.addShake(.16),IS(this.audio),LS(this.audio,Ss.cooldown);break;case"impactWorld":DS(this.audio,n.x,n.z);break;case"enemyHurt":this.hud.flashHit(),NS(this.audio,n.x,n.z);break;case"enemyStep":FS(this.audio,n.x,n.z,n.scale);break;case"enemyWindUp":Oo(this.audio,n.x,n.z);break;case"anchorRising":n.kind==="containmentMachine"?this.hud.setStatus("Production line — active","The facility is making more specimens","alert"):this.hud.setStatus("Primary containment — open","Something is coming up through the floor","alert"),this.cameraController.addShake(.34),Oo(this.audio,n.x,n.z);break;case"broodReleased":this.cameraController.addShake(.06),Oo(this.audio,n.x,n.z);break;case"enemyKilled":this.hud.flashHit(),this.cameraController.addShake(.08),US(this.audio,n.x,n.z,kl.implodeTime);break;case"enemyBurst":this.splatView.splat(n.x,n.y,n.z,n.scale,n.dirX,n.dirZ),this.burstView.burst(n.x,n.y,n.z,n.scale,n.dirX,n.dirZ),this.cameraController.addShake(.22),OS(this.audio,n.x,n.z,n.scale),BS(this.audio,n.x,n.z);break;case"scored":this.hud.flashScore(n.amount,n.chain);break;case"roomEntered":this.minimap.discover(n.room),this.audio.setEscalation(n.escalation),this.hud.setStatus(n.name,n.final?"Primary containment — secure it to end the run":n.hostile?"Containment breach detected":"Sector secure",n.hostile?"alert":"secure");break;case"roomCleared":this.clearedRooms[n.room]=!0,this.hud.setIntegrity(n.hp,lt.maxHp),this.hud.setStatus(n.required?"Sector secure":"Optional sector secure",n.heal>0?`${n.cleared} of ${n.total} required sectors held — integrity +${n.heal}`:`${n.cleared} of ${n.total} required sectors held`,"secure"),Bo(this.audio);break;case"waveStarted":this.hud.setStatus(`Wave ${n.wave} of ${n.waveCount}`,`${n.count} specimen${n.count===1?"":"s"} inbound`,"alert"),VS(this.audio);break;case"waveCleared":this.hud.setStatus("Wave clear",`${n.waveCount-n.wave} remaining`),Bo(this.audio);break;case"runCleared":Bo(this.audio),this.setScreen("over");break;case"playerHurt":this.hud.setIntegrity(n.hp,lt.maxHp),this.hud.flashDamage(),this.cameraController.addShake(.5),kS(this.audio);break;case"playerDied":zS(this.audio),this.setScreen("over");break}}e.length=0}advance(e){for(let t=0;t<e;t++)this.step(Fi);this.renderFrame(0,Fi*1e3,Fi,!1)}get buildPlan(){return this.state.plan}setActions(e){Object.assign(this.actions,e)}setOption(e,t){return this.options.set(e,t)}optionValues(){return{...this.options.snapshot}}profileBegin(){this.stats.reset()}profile(){return{...this.stats.performance(),quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveEnabled:this.adaptive.enabled,adaptiveDowngrades:this.adaptive.downgrades,genMs:+this.genMs.toFixed(2),prewarmMs:+this.prewarmMs.toFixed(2),...this.resources()}}resources(){return{geometries:this.renderApp.geometryCount,textures:this.renderApp.textureCount,programs:this.renderApp.programCount,worldMeshes:this.worldView.meshCount,lights:this.renderApp.lightCount,pointLights:this.renderApp.pointLightCount}}snapshot(){const e=this.state,t=e.engagedRoomId>=0?e.runtime[e.engagedRoomId]:void 0;return{seed:e.seed,tick:e.tick,status:e.status,screen:this.screen,rooms:e.rooms.length,discoveredRooms:this.minimap.discoveredCount,activeRoom:e.activeRoomId,engagedRoom:e.engagedRoomId,roomsCleared:e.stats.roomsCleared,wave:t?t.wave:0,waveCount:t?t.waveCount:0,pendingArrivals:t?t.roster.length:0,threatSpent:t?t.threatSpent:0,threatBudget:t?e.rooms[t.id].encounter.budget:0,runThreat:e.plan.report.requiredThreat,facilityThreat:e.plan.report.threatTotal,enemies:e.enemies.length,projectiles:e.projectiles.length,decals:this.splatView.decalCount,settledDecals:this.splatView.settledDecalCount,droplets:this.burstView.dropletCount,hp:e.player.hp,player:{x:+e.player.x.toFixed(3),z:+e.player.z.toFixed(3)},specimens:e.enemies.map(n=>({x:+n.x.toFixed(2),z:+n.z.toFixed(2),state:n.state,variant:n.variant})),aim:{yaw:+this.actions.yaw.toFixed(4),pitch:+this.actions.pitch.toFixed(4)},pointerLocked:this.input.isLocked,touch:{active:this.touchLayer.isActive,...this.touch.state()},stats:e.stats,quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveDowngrades:this.adaptive.downgrades,options:{...this.options.snapshot},audio:{ready:this.audio.ready,muted:this.audio.isMuted,master:this.audio.masterVolume,effects:this.audio.effectsVolume,escalation:this.audio.escalationLevel,alarm:this.audio.alarmGains()},drawCalls:this.renderApp.drawCalls,triangles:this.renderApp.triangles,frame:this.stats.report(),resources:this.resources(),generation:e.plan.report}}onResize=()=>{this.applyViewportChange(),this.resizeRecheck!==0&&window.cancelAnimationFrame(this.resizeRecheck),this.resizeRecheck=window.requestAnimationFrame(()=>{this.resizeRecheck=0,this.applyViewportChange()})};applyViewportChange(){this.renderApp.resize()&&this.touch.handleViewportChange()}get needsCaptureHint(){return this.input.needsCaptureHint&&!this.touchLayer.isActive}dispose(){window.removeEventListener("resize",this.onResize),window.removeEventListener("orientationchange",this.onResize),this.resizeRecheck!==0&&(window.cancelAnimationFrame(this.resizeRecheck),this.resizeRecheck=0),this.unbindUi(),this.settings.dispose(),this.options.onChange=null,this.loop.stop(),this.input.dispose(),this.touch.dispose(),this.touchLayer.dispose(),this.worldView.dispose(),this.enemyView.dispose(),this.projectileView.dispose(),this.splatView.dispose(),this.burstView.dispose(),this.audio.dispose(),this.hud.dispose(),this.minimap.dispose(),this.weaponView.dispose(),this.debugMap.dispose(),this.labMaterials.dispose(),this.renderApp.dispose()}}const qd=document.getElementById("view");if(!qd)throw new Error("Canvas #view is missing from index.html");try{const i=new XS(qd);window.game=i}catch(i){console.error("[clawd-pop-3d] failed to start",i);const e=document.getElementById("screen-title");e&&(e.innerHTML='<div><div class="result-title">WebGL unavailable</div><div class="hint">This game needs a browser with WebGL2 enabled.</div></div>')}
