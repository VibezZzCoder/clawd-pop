(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const _f=60,ki=1/_f,zc=5,ce={radius:.4,height:1.8,eyeHeight:1.7,walkSpeed:5,sprintSpeed:7.6,accel:62,friction:13,maxHp:100,roomClearHeal:25,hurtCooldown:.6,pitchLimit:Math.PI/2-.02},As={cooldown:.42,inputBuffer:.16,spawnForward:.6},Oe={speed:46,radius:.3,damage:100,lifetime:3,maxStepDistance:.5},Vn={walker:{name:"walker",scale:1,hp:100,radius:.55,height:1.45,speed:2.7,turnRate:6,damage:12,threatCost:1},runner:{name:"runner",scale:.75,hp:60,radius:.42,height:1.09,speed:4.3,turnRate:9,damage:8,threatCost:1},heavy:{name:"heavy",scale:1.4,hp:250,radius:.72,height:2.03,speed:1.85,turnRate:3.4,damage:22,threatCost:3},mini:{name:"mini",scale:.55,hp:40,radius:.34,height:.8,speed:4.6,turnRate:10,damage:6,threatCost:1},containmentMachine:{name:"containmentMachine",scale:1.55,hp:500,radius:.85,height:2.25,speed:0,turnRate:2.2,damage:0,threatCost:2,stationary:!0,brood:{variant:"mini",total:4,perRelease:2,firstDelay:1,interval:3.6,enrageBelow:.4,enragedInterval:2.6,radius:1.45,entryRadius:2.35,collapseOnDeath:!0,collapseStagger:0}},orchestrator:{name:"orchestrator",scale:2.2,hp:1200,radius:1.15,height:3.19,speed:0,turnRate:1.8,damage:0,threatCost:4,stationary:!0,brood:{variant:"mini",total:10,perRelease:2,firstDelay:1.2,interval:3,enrageBelow:.45,enragedInterval:1.7,radius:1.9,entryRadius:3.2,collapseOnDeath:!0,collapseStagger:.09}}},Mf={containmentMachine:"containmentMachine",orchestrator:"orchestrator"};function yf(i){return Mf[i]}const Wu=Object.values(Vn).filter(i=>!i.stationary),Sf=Math.max(...Wu.map(i=>i.radius)),Ef=Math.max(...Wu.map(i=>i.height));Math.max(...Object.values(Vn).filter(i=>i.stationary).map(i=>Math.max(i.radius,(i.brood?.entryRadius??0)+Vn[i.brood?.variant??"walker"].radius)));Math.max(...Object.values(Vn).filter(i=>i.stationary).map(i=>i.height));const mn={range:2,windUpTime:.45,lungeTime:.22,lungeSpeed:9.5,recoverTime:.65,contactPad:.12},Kl={implodeTime:.15},Zo={separationRadius:1.35,separationStrength:9,speedJitter:.16},jn={progressThreshold:.35,trigger:.35,duration:1.1,directBlend:.3,detoursBeforeEscape:2,escapeProbeDistance:7,escapeDuration:2.6,progressResetDistance:.7},Ke={maxAlive:16,engageDelay:1.4,waveDelay:1.6,clearDelay:1.6,minSpawnDistance:6,spawnStagger:.35,staggerDepthScale:.045,staggerFloor:.18,firstWaveArc:140*Math.PI/180,entrySpeed:3.8,anchorRiseTime:1.8},$o={hz:8,losInterval:.2,directRange:16},yi={killBase:{walker:100,runner:150,heavy:260,mini:60,containmentMachine:700,orchestrator:1500},chainWindow:2,chainStep:.35,chainMax:8,wavePerWave:250,roomClear:400,runComplete:2500},Ya=Math.PI*2;function Gn(i,t,e){return i<t?t:i>e?e:i}function bf(i,t,e){return i+(t-i)*e}function Xu(i,t){let e=(t-i)%Ya;return e>Math.PI&&(e-=Ya),e<-Math.PI&&(e+=Ya),e}function Cs(i,t,e,n){return bf(i,t,1-Math.exp(-e*n))}function Jl(i){return-Math.sin(i)}function Ql(i){return-Math.cos(i)}function wf(i){return Math.cos(i)}function Tf(i){return-Math.sin(i)}function qu(i,t,e,n){const s=e-i,r=n-t;return Math.sqrt(s*s+r*r)}const pa=1e-9,en={t:1,nx:0,ny:0,nz:0};function Hi(i,t,e,n,s,r,a,o,l){const c=a.minX-o,h=a.maxX+o,u=a.minY-o,d=a.maxY+o,f=a.minZ-o,m=a.maxZ+o;let v=0,g=1,p=-1,y=0;if(Math.abs(n)<pa){if(i<c||i>h)return-1}else{const w=1/n;let M=(c-i)*w,T=(h-i)*w,b=-1;if(M>T){const A=M;M=T,T=A,b=1}if(M>v&&(v=M,p=0,y=b),T<g&&(g=T),v>g)return-1}if(Math.abs(s)<pa){if(t<u||t>d)return-1}else{const w=1/s;let M=(u-t)*w,T=(d-t)*w,b=-1;if(M>T){const A=M;M=T,T=A,b=1}if(M>v&&(v=M,p=1,y=b),T<g&&(g=T),v>g)return-1}if(Math.abs(r)<pa){if(e<f||e>m)return-1}else{const w=1/r;let M=(f-e)*w,T=(m-e)*w,b=-1;if(M>T){const A=M;M=T,T=A,b=1}if(M>v&&(v=M,p=2,y=b),T<g&&(g=T),v>g)return-1}if(v>1||g<0)return-1;if(l.t=v,l.nx=p===0?y:0,l.ny=p===1?y:0,l.nz=p===2?y:0,p===-1){const w=Math.hypot(n,s,r)||1;l.nx=-n/w,l.ny=-s/w,l.nz=-r/w}return v}function Af(i,t,e){return i<e.maxY&&i+t>e.minY}function Yu(i,t,e,n,s=3){let r=!1;for(let a=0;a<s;a++){let o=!1;for(let l=0;l<n.length;l++){const c=n[l];if(!Af(i.y,e,c))continue;const h=Gn(i.x,c.minX,c.maxX),u=Gn(i.z,c.minZ,c.maxZ),d=i.x-h,f=i.z-u,m=d*d+f*f;if(!(m>=t*t)){if(m>pa){const v=Math.sqrt(m),g=t-v;i.x+=d/v*g,i.z+=f/v*g}else{const v=i.x-c.minX,g=c.maxX-i.x,p=i.z-c.minZ,y=c.maxZ-i.z,w=Math.min(v,g,p,y);w===v?i.x=c.minX-t:w===g?i.x=c.maxX+t:w===p?i.z=c.minZ-t:i.z=c.maxZ+t}o=!0,r=!0}}if(!o)break}return r}function Rf(i,t,e,n,s,r,a){const o=n-i,l=s-t,c=r-e;for(let h=0;h<a.length;h++){const u=a[h];if(!(u.kind==="floor"||u.kind==="ceiling")&&Hi(i,t,e,o,l,c,u,0,en)>=0)return!1}return!0}const Cf=256;function Ne(i,t){i.length>=Cf||i.push(t)}const kc=[];function Pf(i,t,e){const n=i.player;n.prevX=n.x,n.prevZ=n.z,n.hurtCooldown>0&&(n.hurtCooldown=Math.max(0,n.hurtCooldown-e));let s=Gn(t.moveX,-1,1),r=Gn(t.moveZ,-1,1);const a=Math.hypot(s,r);a>1&&(s/=a,r/=a);const o=t.sprint?ce.sprintSpeed:ce.walkSpeed,l=Jl(n.yaw),c=Ql(n.yaw),h=wf(n.yaw),u=Tf(n.yaw),d=(l*r+h*s)*o,f=(c*r+u*s)*o;if(a>.001)n.vx+=(d-n.vx)*Math.min(1,ce.accel*e),n.vz+=(f-n.vz)*Math.min(1,ce.accel*e);else{const v=Math.max(0,1-ce.friction*e);n.vx*=v,n.vz*=v}n.x+=n.vx*e,n.z+=n.vz*e,n.y=i.floorY;const m=ce.radius;i.index.query(Math.min(n.prevX,n.x)-m,Math.min(n.prevZ,n.z)-m,Math.max(n.prevX,n.x)+m,Math.max(n.prevZ,n.z)+m,kc),Yu(n,ce.radius,ce.height,kc)}function If(i,t,e){const n=i.player;if(n.fireCooldown>0&&(n.fireCooldown=Math.max(0,n.fireCooldown-e)),t.firePressed&&(t.firePressed=!1,n.fireBuffer=As.inputBuffer),n.fireBuffer>0&&(n.fireBuffer=Math.max(0,n.fireBuffer-e)),!(t.firePrimary||n.fireBuffer>0)||n.fireCooldown>0||!n.alive)return;n.fireBuffer=0,n.fireCooldown=As.cooldown,i.stats.shots+=1;const r=Math.cos(n.pitch),a=Jl(n.yaw)*r,o=Math.sin(n.pitch),l=Ql(n.yaw)*r,c=n.y+ce.eyeHeight,h=n.x+a*As.spawnForward,u=c+o*As.spawnForward,d=n.z+l*As.spawnForward,f=i.nextId++;i.projectiles.push({id:f,x:h,y:u,z:d,prevX:h,prevY:u,prevZ:d,vx:a*Oe.speed,vy:o*Oe.speed,vz:l*Oe.speed,life:Oe.lifetime,alive:!0}),Ne(i.events,{type:"shot",id:f,x:h,y:u,z:d,dx:a,dy:o,dz:l})}const Lf=.5,Df=.5;function Zu(i,t){let e=Number.POSITIVE_INFINITY,n=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY;for(const f of i)for(const m of f.brushes)m.minX<e&&(e=m.minX),m.minZ<n&&(n=m.minZ),m.maxX>s&&(s=m.maxX),m.maxZ>r&&(r=m.maxZ);const a=Lf,o=Math.floor(e/a)*a,l=Math.floor(n/a)*a,c=Math.max(1,Math.ceil((s-o)/a)),h=Math.max(1,Math.ceil((r-l)/a)),u=new Uint8Array(c*h),d={cell:a,minX:o,minZ:l,cols:c,rows:h,walkable:u};for(const f of i)for(const m of f.brushes)m.kind==="floor"&&Vc(d,m.minX,m.minZ,m.maxX,m.maxZ,0,v=>{u[v]=1});for(const f of i)for(const m of f.brushes)m.kind==="floor"||m.kind==="ceiling"||m.maxY<=.05||m.minY>=t.height||Vc(d,m.minX,m.minZ,m.maxX,m.maxZ,t.radius,v=>{u[v]=0});return d}function Vc(i,t,e,n,s,r,a){const o=Gc(i.minX,i.cell,i.cols,t-r,n+r),l=Gc(i.minZ,i.cell,i.rows,e-r,s+r);for(let c=l.lo;c<=l.hi;c++){const h=c*i.cols;for(let u=o.lo;u<=o.hi;u++)a(h+u)}}function Gc(i,t,e,n,s){const r=Math.max(0,Math.ceil((n-i)/t-.5)),a=Math.min(e-1,Math.floor((s-i)/t-.5));return{lo:r,hi:a}}function Hc(i,t,e){const n=Math.floor((t-i.minX)/i.cell),s=Math.floor((e-i.minZ)/i.cell);return n<0||s<0||n>=i.cols||s>=i.rows?-1:s*i.cols+n}function Ps(i,t,e,n=6){const s=Math.floor((t-i.minX)/i.cell),r=Math.floor((e-i.minZ)/i.cell);for(let a=0;a<=n;a++)for(let o=-a;o<=a;o++)for(let l=-a;l<=a;l++){if(a>0&&Math.abs(l)!==a&&Math.abs(o)!==a)continue;const c=s+l,h=r+o;if(c<0||h<0||c>=i.cols||h>=i.rows)continue;const u=h*i.cols+c;if(i.walkable[u])return u}return-1}function Wc(i,t,e){if(e.fill(0),t<0||!i.walkable[t])return 0;const n=[t];e[t]=1;let s=1;for(;n.length>0;){const r=n.pop(),a=r%i.cols,o=(r-a)/i.cols;for(let l=-1;l<=1;l++){const c=o+l;if(!(c<0||c>=i.rows))for(let h=-1;h<=1;h++){if(h===0&&l===0)continue;const u=a+h;if(u<0||u>=i.cols)continue;const d=c*i.cols+u;e[d]||!jl(i,a,o,u,c)||(e[d]=1,s++,n.push(d))}}}return s}function jl(i,t,e,n,s){if(t<0||e<0||t>=i.cols||e>=i.rows||n<0||s<0||n>=i.cols||s>=i.rows||!i.walkable[e*i.cols+t]||!i.walkable[s*i.cols+n])return!1;const r=n-t,a=s-e;return Math.abs(r)>1||Math.abs(a)>1||r===0&&a===0?!1:r===0||a===0?!0:!!(i.walkable[e*i.cols+n]&&i.walkable[s*i.cols+t])}function Nf(i){let t=0;for(let e=0;e<i.walkable.length;e++)t+=i.walkable[e];return t}const Sa=-1;function Ff(i){const t=i.cols*i.rows;return{grid:i,dist:new Int32Array(t).fill(Sa),queue:new Int32Array(t),goalCell:-1,timer:0}}function $u(i,t,e,n){i.timer-=n;const s=Ps(i.grid,t,e);return s<0||s===i.goalCell&&i.timer>0?!1:(i.timer=1/$o.hz,Uf(i,s),!0)}function Uf(i,t){const{grid:e,dist:n,queue:s}=i,{cols:r,rows:a}=e;n.fill(Sa),i.goalCell=t,n[t]=0,s[0]=t;let o=0,l=1;for(;o<l;){const c=s[o++],h=n[c]+1,u=c%r,d=(c-u)/r;for(let f=-1;f<=1;f++){const m=d+f;if(!(m<0||m>=a))for(let v=-1;v<=1;v++){if(v===0&&f===0)continue;const g=u+v;if(g<0||g>=r)continue;const p=m*r+g;n[p]!==Sa||!jl(e,u,d,g,m)||(n[p]=h,s[l++]=p)}}}}function Of(i,t,e,n){const{grid:s,dist:r}=i,{cols:a,rows:o,cell:l}=s,c=Ps(s,t,e,3);if(c<0)return!1;const h=r[c];if(h<=0)return!1;const u=c%a,d=(c-u)/a;let f=h,m=0,v=0,g=!1;for(let b=-1;b<=1;b++){const A=d+b;if(!(A<0||A>=o))for(let _=-1;_<=1;_++){if(_===0&&b===0)continue;const E=u+_;if(E<0||E>=a||!jl(s,u,d,E,A))continue;const C=r[A*a+E];C===Sa||C>=f||(f=C,m=E,v=A,g=!0)}}if(!g)return!1;const p=s.minX+(m+.5)*l,y=s.minZ+(v+.5)*l,w=p-t,M=y-e,T=Math.hypot(w,M);return T<1e-5?!1:(n.x=w/T,n.z=M/T,!0)}function Ku(i,t,e,n=0,s=0,r=!0){return!t.alive||t.hp<=0?!1:(t.hp-=e,t.hurtTime=.18,i.stats.hits+=1,t.hp<=0?(t.hp=0,t.state="dying",t.stateTime=0,t.vx=0,t.vz=0,t.deathDirX=n,t.deathDirZ=s,i.stats.kills+=1,Bf(i,t),Ne(i.events,{type:"enemyKilled",id:t.id,x:t.x,y:t.y,z:t.z,scale:t.def.scale,dirX:n,dirZ:s}),cp(i,t.variant,r)):Ne(i.events,{type:"enemyHurt",id:t.id,x:t.x,y:t.y,z:t.z}),!0)}function Bf(i,t){const e=t.def.brood;if(!e||!e.collapseOnDeath)return;let n=0;for(const s of i.enemies)!s.alive||s.parentId!==t.id||s.state==="dying"||s.collapseTimer>=0||(s.collapseTimer=n*e.collapseStagger,s.collapseExtendsChain=e.collapseStagger>0,s.deathDirX=t.deathDirX,s.deathDirZ=t.deathDirZ,n+=1)}function zf(i,t){const e=i.player;return!e.alive||e.hurtCooldown>0?!1:(e.hp=Math.max(0,e.hp-t),e.hurtCooldown=ce.hurtCooldown,i.stats.damageTaken+=t,Ne(i.events,{type:"playerHurt",amount:t,hp:e.hp}),!0)}function Ko(i,t){if(i.enemies.length>=Ke.maxAlive)return null;const e=t.def,n=t.sink??0,s={id:i.nextId++,variant:e.name,def:e,x:t.x,y:i.floorY-n,z:t.z,prevX:t.x,prevZ:t.z,vx:0,vz:0,yaw:t.yaw,prevYaw:t.yaw,hp:e.hp,state:"entering",stateTime:0,gaitPhase:i.rng()*Math.PI*2,movedLast:0,stuckTime:0,detourTime:0,detourSide:(i.nextId&1)===0?1:-1,detourAttempts:0,unstickBestDistance:Number.POSITIVE_INFINITY,escapeTime:0,escapeDirX:0,escapeDirZ:0,entryX:t.entryX,entryZ:t.entryZ,hasSight:!1,losTimer:i.nextId%12/60,speedScale:1+(i.rng()-.5)*2*Zo.speedJitter,hurtTime:0,lungeDirX:0,lungeDirZ:0,lungeConnected:!1,deathDirX:0,deathDirZ:0,yOffset:-n,broodTimer:e.brood?e.brood.firstDelay:0,broodRemaining:e.brood?e.brood.total:0,parentId:t.parentId??-1,collapseTimer:-1,collapseExtendsChain:!1,alive:!0};return i.enemies.push(s),s}const Xc=[],qc=[],Yc=[],Za={x:0,z:0},kf=2.6;function Vf(i,t){const e=i.enemies,n=e.length;for(let s=0;s<n;s++){const r=e[s];if(r.alive){if(r.prevX=r.x,r.prevZ=r.z,r.prevYaw=r.yaw,r.stateTime+=t,r.hurtTime>0&&(r.hurtTime=Math.max(0,r.hurtTime-t)),r.collapseTimer>=0&&r.state!=="dying"&&(r.collapseTimer-=t,r.collapseTimer<=0)){Ku(i,r,r.hp,r.deathDirX,r.deathDirZ,r.collapseExtendsChain);continue}r.def.brood&&r.state!=="dying"&&r.state!=="entering"&&Hf(i,r,t),Gf(i,r,t)}}qf(e,t);for(let s=0;s<e.length;s++){const r=e[s];if(!r.alive)continue;if(r.y=i.floorY+r.yOffset,r.def.stationary){r.movedLast=0;continue}r.x+=r.vx*t,r.z+=r.vz*t;const a=r.def.radius;i.index.query(Math.min(r.prevX,r.x)-a,Math.min(r.prevZ,r.z)-a,Math.max(r.prevX,r.x)+a,Math.max(r.prevZ,r.z)+a,Xc),Yu(r,a,r.def.height,Xc),r.movedLast=qu(r.prevX,r.prevZ,r.x,r.z);const o=r.gaitPhase;r.gaitPhase+=r.movedLast*kf,(r.state==="approach"||r.state==="entering")&&Math.floor(o/Math.PI)!==Math.floor(r.gaitPhase/Math.PI)&&Ne(i.events,{type:"enemyStep",id:r.id,x:r.x,y:r.y,z:r.z,scale:r.def.scale})}}function Gf(i,t,e){const n=i.player,s=n.x-t.x,r=n.z-t.z,a=Math.hypot(s,r),o=t.def.radius+ce.radius+mn.contactPad;switch(t.state){case"dying":{t.vx=0,t.vz=0,t.stateTime>=Kl.implodeTime&&(t.alive=!1,Ne(i.events,{type:"enemyBurst",id:t.id,x:t.x,y:t.y,z:t.z,scale:t.def.scale,dirX:t.deathDirX,dirZ:t.deathDirZ}));break}case"entering":{if(t.def.stationary){t.vx=0,t.vz=0,Ai(t,s,r,e);const d=Math.min(1,t.stateTime/Ke.anchorRiseTime);t.yOffset=-t.def.height*(1-d),d>=1&&(t.yOffset=0,ts(t,"approach"));break}const l=t.entryX-t.x,c=t.entryZ-t.z,h=Math.hypot(l,c);if(h<=.12){t.x=t.entryX,t.z=t.entryZ,t.vx=0,t.vz=0,ts(t,"approach");break}const u=1/h;Ai(t,l,c,e),t.vx=l*u*Ke.entrySpeed,t.vz=c*u*Ke.entrySpeed;break}case"approach":{if(t.def.stationary){t.vx=0,t.vz=0,Ai(t,s,r,e);break}if(a<=mn.range+t.def.radius&&n.alive){ts(t,"windUp"),t.vx=0,t.vz=0,Ai(t,s,r,e),Ne(i.events,{type:"enemyWindUp",id:t.id,x:t.x,y:t.y,z:t.z});break}const l=t.def.speed*t.speedScale,c=a>1e-4?1/a:0;let h=s*c,u=r*c;t.losTimer-=e,t.losTimer<=0&&(t.losTimer=$o.losInterval,t.hasSight=a<=$o.directRange&&Wf(i,t)),!t.hasSight&&Of(i.nav,t.x,t.z,Za)&&(h=Za.x,u=Za.z),Ai(t,h,u,e),a<t.unstickBestDistance-jn.progressResetDistance&&(t.unstickBestDistance=a,t.detourAttempts=0);const f=t.movedLast/Math.max(1e-4,l*e)<jn.progressThreshold;if(t.escapeTime>0)t.escapeTime=Math.max(0,t.escapeTime-e),Ai(t,t.escapeDirX,t.escapeDirZ,e),t.vx=t.escapeDirX*l,t.vz=t.escapeDirZ*l;else if(t.detourTime>0)t.detourTime=Math.max(0,t.detourTime-e),t.stuckTime=f?t.stuckTime+e:0,t.vx=(h*jn.directBlend-u*t.detourSide)*l,t.vz=(u*jn.directBlend+h*t.detourSide)*l;else if(f){if(t.stuckTime+=e,t.stuckTime>=jn.trigger)if(t.stuckTime=0,t.detourAttempts+=1,t.detourAttempts>=jn.detoursBeforeEscape){const m=Xf(i,t,h,u);t.escapeDirX=m.x,t.escapeDirZ=m.z,t.escapeTime=jn.escapeDuration,t.detourTime=0}else t.detourSide=-t.detourSide,t.detourTime=jn.duration;t.vx=h*l,t.vz=u*l}else t.stuckTime=0,t.vx=h*l,t.vz=u*l;break}case"windUp":{if(t.vx=0,t.vz=0,Ai(t,s,r,e),t.stateTime>=mn.windUpTime){const l=a>1e-4?1/a:0;t.lungeDirX=s*l,t.lungeDirZ=r*l,t.lungeConnected=!1,ts(t,"lunge"),Ne(i.events,{type:"enemyLunge",id:t.id,x:t.x,y:t.y,z:t.z})}break}case"lunge":{t.vx=t.lungeDirX*mn.lungeSpeed,t.vz=t.lungeDirZ*mn.lungeSpeed,!t.lungeConnected&&a<=o&&n.alive&&zf(i,t.def.damage)&&(t.lungeConnected=!0),t.stateTime>=mn.lungeTime&&ts(t,"recover");break}case"recover":{const l=Math.max(0,1-9*e);t.vx*=l,t.vz*=l,t.stateTime>=mn.recoverTime&&ts(t,"approach");break}}}function Hf(i,t,e){const n=t.def.brood;if(t.broodRemaining<=0||!i.player.alive||(t.broodTimer-=e,t.broodTimer>0))return;const s=t.hp<=t.def.hp*n.enrageBelow;t.broodTimer=s?n.enragedInterval:n.interval;const r=Vn[n.variant],a=Math.min(n.perRelease,t.broodRemaining);let o=0;for(let l=0;l<a;l++){const c=i.rng()*Math.PI*2,h=Math.sin(c),u=Math.cos(c);if(!Ko(i,{def:r,x:t.x+h*n.radius,z:t.z+u*n.radius,yaw:Math.atan2(-h,-u),entryX:t.x+h*n.entryRadius,entryZ:t.z+u*n.entryRadius,parentId:t.id}))break;t.broodRemaining-=1,o+=1}o>0&&Ne(i.events,{type:"broodReleased",id:t.id,x:t.x,y:t.y,z:t.z,count:o,remaining:t.broodRemaining})}function Wf(i,t){const e=i.player,n=t.y+t.def.height*.6,s=e.y+ce.eyeHeight*.6;return i.index.query(Math.min(t.x,e.x)-.1,Math.min(t.z,e.z)-.1,Math.max(t.x,e.x)+.1,Math.max(t.z,e.z)+.1,qc),Rf(t.x,n,t.z,e.x,s,e.z,qc)}function Xf(i,t,e,n){const s=Math.atan2(-n,-e),r=[0,Math.PI/4,-Math.PI/4,Math.PI/2,-Math.PI/2,Math.PI],a=jn.escapeProbeDistance;let o=-e,l=-n,c=-1;i.index.query(t.x-a,t.z-a,t.x+a,t.z+a,Yc);for(const h of r){const u=s+h,d=Math.cos(u),f=Math.sin(u);let m=a;for(const v of Yc){if(v.kind==="floor"||v.kind==="ceiling")continue;const g=Hi(t.x,t.y+t.def.height*.5,t.z,d*a,0,f*a,v,t.def.radius,en);g>=0&&(m=Math.min(m,g*a))}m>c&&(c=m,o=d,l=f)}return{x:o,z:l}}function ts(i,t){i.state=t,i.stateTime=0}function Ai(i,t,e,n){if(Math.abs(t)<1e-5&&Math.abs(e)<1e-5)return;const s=Math.atan2(-t,-e);i.yaw+=Xu(i.yaw,s)*Math.min(1,i.def.turnRate*n)}function qf(i,t){for(let e=0;e<i.length;e++){const n=i[e];if(!(!n.alive||n.state==="lunge"||n.state==="dying"))for(let s=e+1;s<i.length;s++){const r=i[s];if(!r.alive||r.state==="lunge"||r.state==="dying")continue;const a=r.x-n.x,o=r.z-n.z,l=a*a+o*o,c=Zo.separationRadius*(n.def.scale+r.def.scale)*.5;if(l>=c*c||l<1e-8)continue;const h=Math.sqrt(l),u=(1-h/c)*Zo.separationStrength*t,d=a/h,f=o/h;n.def.stationary||(n.vx-=d*u,n.vz-=f*u),r.def.stationary||(r.vx+=d*u,r.vz+=f*u)}}}const Ri={minX:0,minY:0,minZ:0,maxX:0,maxY:0,maxZ:0},ke={t:1,nx:0,ny:0,nz:0},$a=[];function Yf(i,t){for(let e=0;e<i.projectiles.length;e++){const n=i.projectiles[e];if(n.alive){if(n.life-=t,n.life<=0){n.alive=!1;continue}Zf(i,n,t)}}}function Zf(i,t,e){t.prevX=t.x,t.prevY=t.y,t.prevZ=t.z;const n=t.vx*e,s=t.vy*e,r=t.vz*e,a=Math.hypot(n,s,r),o=Math.max(1,Math.ceil(a/Oe.maxStepDistance)),l=n/o,c=s/o,h=r/o;for(let u=0;u<o;u++){const d=t.x,f=t.y,m=t.z;ke.t=Number.POSITIVE_INFINITY;let v=null;for(let p=0;p<i.enemies.length;p++){const y=i.enemies[p];if(!y.alive||y.state==="dying")continue;const w=y.def.radius;Ri.minX=y.x-w,Ri.maxX=y.x+w,Ri.minY=y.y,Ri.maxY=y.y+y.def.height,Ri.minZ=y.z-w,Ri.maxZ=y.z+w;const M=Hi(d,f,m,l,c,h,Ri,Oe.radius,en);M>=0&&M<ke.t&&(ke.t=M,ke.nx=en.nx,ke.ny=en.ny,ke.nz=en.nz,v=y)}const g=Oe.radius;i.index.query(Math.min(d,d+l)-g,Math.min(m,m+h)-g,Math.max(d,d+l)+g,Math.max(m,m+h)+g,$a);for(let p=0;p<$a.length;p++){const y=$a[p],w=Hi(d,f,m,l,c,h,y,Oe.radius,en);w>=0&&w<ke.t&&(ke.t=w,ke.nx=en.nx,ke.ny=en.ny,ke.nz=en.nz,v=null)}if(Number.isFinite(ke.t)){const p=ke.t;if(t.x=d+l*p,t.y=f+c*p,t.z=m+h*p,t.alive=!1,v){const y=Math.hypot(t.vx,t.vz);Ku(i,v,Oe.damage,y>1e-4?t.vx/y:0,y>1e-4?t.vz/y:0)}else Ne(i.events,{type:"impactWorld",x:t.x,y:t.y,z:t.z,nx:ke.nx,ny:ke.ny,nz:ke.nz});return}t.x=d+l,t.y=f+c,t.z=m+h}}const Zc={t:1,nx:0,ny:0,nz:0},Rr=[],Ci={minX:0,minY:0,minZ:0,maxX:0,maxY:0,maxZ:0};function $f(i,t,e,n,s,r,a,o){const l=s*o,c=r*o,h=a*o,u=Oe.radius;let d=Number.POSITIVE_INFINITY;for(let f=0;f<i.enemies.length;f++){const m=i.enemies[f];if(!m.alive||m.state==="dying")continue;const v=m.def.radius;Ci.minX=m.x-v,Ci.maxX=m.x+v,Ci.minY=m.y,Ci.maxY=m.y+m.def.height,Ci.minZ=m.z-v,Ci.maxZ=m.z+v;const g=Hi(t,e,n,l,c,h,Ci,u,Zc);g>=0&&g<d&&(d=g)}i.index.query(Math.min(t,t+l)-u,Math.min(n,n+h)-u,Math.max(t,t+l)+u,Math.max(n,n+h)+u,Rr);for(let f=0;f<Rr.length;f++){const m=Hi(t,e,n,l,c,h,Rr[f],u,Zc);m>=0&&m<d&&(d=m)}return Rr.length=0,Number.isFinite(d)?d*o:o}const Kf=4;class Jf{all;cell;minX;minZ;cols;rows;starts;items;mark;stamp;constructor(t,e=Kf){this.all=t,this.cell=e,this.stamp=0;let n=Number.POSITIVE_INFINITY,s=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,a=Number.NEGATIVE_INFINITY;for(const h of t)h.minX<n&&(n=h.minX),h.minZ<s&&(s=h.minZ),h.maxX>r&&(r=h.maxX),h.maxZ>a&&(a=h.maxZ);Number.isFinite(n)||(n=0,s=0,r=e,a=e),this.minX=n,this.minZ=s,this.cols=Math.max(1,Math.ceil((r-n)/e)+1),this.rows=Math.max(1,Math.ceil((a-s)/e)+1);const o=this.cols*this.rows,l=new Int32Array(o+1);for(const h of t)this.forEachBucket(h.minX,h.minZ,h.maxX,h.maxZ,u=>{l[u+1]+=1});for(let h=0;h<o;h++)l[h+1]+=l[h];this.starts=l,this.items=new Int32Array(l[o]);const c=new Int32Array(o);for(let h=0;h<t.length;h++){const u=t[h];this.forEachBucket(u.minX,u.minZ,u.maxX,u.maxZ,d=>{this.items[this.starts[d]+c[d]]=h,c[d]+=1})}this.mark=new Int32Array(t.length)}query(t,e,n,s,r){this.stamp+=1;const a=this.stamp;let o=0;return this.forEachBucket(t,e,n,s,l=>{const c=this.starts[l+1];for(let h=this.starts[l];h<c;h++){const u=this.items[h];this.mark[u]!==a&&(this.mark[u]=a,r[o++]=this.all[u])}}),r.length=o,r}get bucketCount(){return this.cols*this.rows}forEachBucket(t,e,n,s,r){const a=Math.max(0,Math.min(this.cols-1,Math.floor((t-this.minX)/this.cell))),o=Math.max(0,Math.min(this.cols-1,Math.floor((n-this.minX)/this.cell))),l=Math.max(0,Math.min(this.rows-1,Math.floor((e-this.minZ)/this.cell))),c=Math.max(0,Math.min(this.rows-1,Math.floor((s-this.minZ)/this.cell)));for(let h=l;h<=c;h++){const u=h*this.cols;for(let d=a;d<=o;d++)r(u+d)}}}const $c=Math.min(...Object.values(Vn).map(i=>i.threatCost));function Qf(i,t,e){const n=[];let s=Math.max($c,Math.round(i));const r=Vn.heavy,a=Vn.runner;for(;s>=$c;){const o=e();let l=Vn.walker;o<t.heavyChance?r.threatCost<=s&&(l=r):o<t.heavyChance+t.runnerChance&&a.threatCost<=s&&(l=a),n.push(l.name),s-=l.threatCost}return n}function jf(i,t){return t.z<i.minZ?0:t.x>i.maxX?1:t.z>i.maxZ?2:3}const es={distance:1e3,variety:200,visible:120,laneChange:40,farthest:1,farthestClamp:30};function tp(i,t,e,n,s,r,a,o,l){if(t.length===0)return null;const c=(r%t.length+t.length)%t.length,h=Ke.firstWaveArc/2;let u=null,d=Number.NEGATIVE_INFINITY;for(let f=0;f<t.length;f++){const m=(c+f)%t.length,v=t[m],g=jf(i,v),p=qu(v.entryX,v.entryZ,e,n),y=p>=Ke.minSpawnDistance;let w=y?es.distance:0;g!==a&&(w+=es.variety),m!==o&&(w+=es.laneChange),l&&ep(e,n,s,v,h)&&(w+=es.visible),w+=Math.min(p,es.farthestClamp)*es.farthest,w>d&&(d=w,u={spawn:v,index:m,source:g,fair:y})}return u}function ep(i,t,e,n,s){const r=n.entryX-i,a=n.entryZ-t;if(r===0&&a===0)return!0;const o=Math.atan2(Jl(e),Ql(e)),l=Math.atan2(r,a);return Math.abs(Xu(o,l))<=s}function np(i){const t=Ke.spawnStagger/(1+Math.max(0,i)*Ke.staggerDepthScale);return Math.max(Ke.staggerFloor,t)}function ip(i,t,e,n){if(t.roster.length>0){t.spawnTimer-=n,t.spawnTimer<=0&&i.enemies.length<Ke.maxAlive&&(ap(i,t,e),t.spawnTimer=np(e.depth));return}if(i.enemies.length>0)return;if(t.wave>=t.waveCount){if(t.waveTimer-=n,t.waveTimer>0)return;sp(i,t,e);return}if(t.waveTimer-=n,t.waveTimer>0)return;t.wave>0&&(i.stats.score+=yi.wavePerWave*t.wave,Ne(i.events,{type:"waveCleared",wave:t.wave,waveCount:t.waveCount})),t.wave+=1;const s=Math.max(1,e.encounter.waveBudget[t.wave-1]??1),r=Qf(s,e.encounter,i.rng),a=e.encounter.anchored&&t.wave>=t.waveCount?e.anchor:null,o=a!==null;a&&r.unshift(yf(a.kind)),t.roster=r,t.threatSpent+=s+(o?e.encounter.anchorThreat:0),t.spawnTimer=0,t.spawnCursor=Math.floor(i.rng()*Math.max(1,e.enemySpawns.length)),t.lastSource=-1,t.lastLane=-1,t.waveTimer=t.wave>=t.waveCount?Ke.clearDelay:Ke.waveDelay,Ne(i.events,{type:"waveStarted",wave:t.wave,waveCount:t.waveCount,count:r.length,threat:s})}function sp(i,t,e){t.state="cleared",i.engagedRoomId=-1,i.stats.roomsCleared+=1,i.stats.score+=yi.wavePerWave*t.wave,i.stats.score+=yi.roomClear*(1+e.depth);const n=Math.min(ce.roomClearHeal,ce.maxHp-i.player.hp);n>0&&(i.player.hp+=n,i.stats.integrityRestored+=n),Ne(i.events,{type:"roomCleared",room:e.id,name:e.name,required:tc(e),cleared:ba(i),total:Ea(i),heal:n,hp:i.player.hp}),rp(i)&&i.runtime[i.plan.finalRoomId].state==="cleared"&&(i.stats.score+=yi.runComplete,i.status="cleared",Ne(i.events,{type:"runCleared",score:i.stats.score}))}function tc(i){return i.critical&&i.encounter.budget>0}function Ea(i){let t=0;for(const e of i.rooms)tc(e)&&(t+=1);return t}function ba(i){let t=0;for(const e of i.rooms)tc(e)&&i.runtime[e.id].state==="cleared"&&(t+=1);return t}function rp(i){return ba(i)===Ea(i)}function ap(i,t,e){const n=t.roster[0];if(!n)return;const s=Vn[n];if(s.stationary){const l=e.anchor;if(!l){t.roster.shift();return}const c=Ko(i,{def:s,x:l.x,z:l.z,yaw:l.yaw,entryX:l.x,entryZ:l.z,sink:s.height});if(!c)return;t.roster.shift(),Ne(i.events,{type:"anchorRising",kind:l.kind,id:c.id,x:l.x,y:i.floorY,z:l.z});return}const r=tp(e,e.enemySpawns,i.player.x,i.player.z,i.player.yaw,t.spawnCursor,t.lastSource,t.lastLane,t.wave===1);if(!r){t.roster.length=0;return}const a=r.spawn;Ko(i,{def:s,x:a.x,z:a.z,yaw:a.yaw,entryX:a.entryX,entryZ:a.entryZ})&&(t.roster.shift(),t.spawnCursor=(r.index+1)%e.enemySpawns.length,t.lastSource=r.source,t.lastLane=r.index)}function op(i,t){const e=i.playerSpawn,n=[];for(const a of i.rooms)for(const o of a.brushes)n.push(o);const s=i.rooms.map(a=>({id:a.id,state:a.encounter.budget>0?"idle":"cleared",wave:0,waveCount:a.encounter.waveBudget.length,waveTimer:Ke.engageDelay,roster:[],spawnTimer:0,spawnCursor:0,lastSource:-1,lastLane:-1,threatSpent:0})),r={seed:i.seed,tick:0,time:0,status:"playing",plan:i,rooms:i.rooms,runtime:s,brushes:n,index:new Jf(n),nav:Ff(i.nav),floorY:0,activeRoomId:i.startRoomId,engagedRoomId:-1,player:{x:e.x,y:0,z:e.z,prevX:e.x,prevZ:e.z,vx:0,vz:0,yaw:e.yaw,pitch:0,hp:ce.maxHp,fireCooldown:0,fireBuffer:0,hurtCooldown:0,alive:!0},enemies:[],projectiles:[],events:[],stats:{shots:0,hits:0,kills:0,damageTaken:0,timeAlive:0,score:0,bestChain:0,roomsCleared:0,integrityRestored:0},nextId:1,lastKillTime:Number.NEGATIVE_INFINITY,chain:0,rng:t};return $u(r.nav,e.x,e.z,1),r}function lp(i,t,e){for(const n of i.rooms)if(t>=n.minX&&t<=n.maxX&&e>=n.minZ&&e<=n.maxZ)return n.id;return-1}function cp(i,t,e=!0){e&&(i.chain=i.time-i.lastKillTime<=yi.chainWindow?i.chain+1:1,i.lastKillTime=i.time,i.chain>i.stats.bestChain&&(i.stats.bestChain=i.chain));const n=e?i.chain:1,s=Math.min(yi.chainMax,n)-1,r=Math.round(yi.killBase[t]*(1+s*yi.chainStep));i.stats.score+=r,Ne(i.events,{type:"scored",amount:r,chain:n,total:i.stats.score})}function hp(i,t,e){i.status==="playing"&&(i.player.yaw=t.yaw,i.player.pitch=t.pitch,Pf(i,t,e),If(i,t,e),$u(i.nav,i.player.x,i.player.z,e),Vf(i,e),Yf(i,e),up(i),i.stats.timeAlive+=e,i.player.hp<=0&&i.player.alive&&(i.player.alive=!1,i.status="dead",Ne(i.events,{type:"playerDied"})),i.status==="playing"&&dp(i,e)),i.tick+=1,i.time+=e}function up(i){let t=0;for(let e=0;e<i.enemies.length;e++){const n=i.enemies[e];n.alive&&(i.enemies[t++]=n)}i.enemies.length=t,t=0;for(let e=0;e<i.projectiles.length;e++){const n=i.projectiles[e];n.alive&&(i.projectiles[t++]=n)}i.projectiles.length=t}function dp(i,t){const e=lp(i,i.player.x,i.player.z);if(e>=0&&e!==i.activeRoomId){i.activeRoomId=e;const n=i.rooms[e];Ne(i.events,{type:"roomEntered",room:e,name:n.name,depth:n.depth,escalation:n.escalation,hostile:i.runtime[e].state==="idle",final:e===i.plan.finalRoomId})}if(i.engagedRoomId<0){const n=i.runtime[i.activeRoomId];n&&n.state==="idle"&&(n.state="engaged",n.waveTimer=Ke.engageDelay,i.engagedRoomId=n.id);return}ip(i,i.runtime[i.engagedRoomId],i.rooms[i.engagedRoomId],t)}function fp(){return{moveX:0,moveZ:0,yaw:0,pitch:0,sprint:!1,firePrimary:!1,firePressed:!1,interact:!1}}function pp(i){i.moveX=0,i.moveZ=0,i.sprint=!1,i.firePrimary=!1,i.firePressed=!1,i.interact=!1}const Ju=.0022,mp=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];class gp{actions;held=new Set;canvas;sensitivity;invertY;disposed=!1;captureEnabled=!1;hadLock=!1;dragging=!1;dragX=0;dragY=0;lockFailed=!1;fireHeld=!1;pausePressed=!1;restartPressed=!1;debugPressed=!1;mutePressed=!1;peer=null;onLockStateChange=null;onSuspend=null;constructor(t,e,n={}){this.canvas=t,this.actions=e,this.sensitivity=n.sensitivity??Ju,this.invertY=n.invertY??!1,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVisibility),document.addEventListener("pointerlockchange",this.onPointerLock),document.addEventListener("pointerlockerror",this.onPointerLockError),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mouseup",this.onMouseUp)}setCaptureEnabled(t){this.captureEnabled=t,t||(this.dragging=!1,this.hadLock=!1)}get needsCaptureHint(){return this.captureEnabled&&!this.isLocked}get isLocked(){return document.pointerLockElement===this.canvas}requestLock(){if(this.isLocked)return;let t;try{t=this.canvas.requestPointerLock()}catch{this.markLockFailed();return}t&&typeof t.catch=="function"&&t.catch(()=>this.markLockFailed())}markLockFailed(){this.lockFailed=!0,this.onLockStateChange?.(!1,!0)}releaseLock(){this.isLocked&&document.exitPointerLock()}setSensitivity(t){this.sensitivity=t}setInvertY(t){this.invertY=t}consumePause(){const t=this.pausePressed;return this.pausePressed=!1,t}consumeRestart(){const t=this.restartPressed;return this.restartPressed=!1,t}consumeDebugToggle(){const t=this.debugPressed;return this.debugPressed=!1,t}consumeMuteToggle(){const t=this.mutePressed;return this.mutePressed=!1,t}release(){this.held.clear(),this.fireHeld=!1,pp(this.actions),this.peer&&this.peer.movementActive&&this.peer.writeMovement(),this.syncFire(),this.dragging=!1,this.dragX=0,this.dragY=0,this.pausePressed=!1,this.restartPressed=!1,this.debugPressed=!1,this.mutePressed=!1}dispose(){this.disposed||(this.disposed=!0,this.release(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVisibility),document.removeEventListener("pointerlockchange",this.onPointerLock),document.removeEventListener("pointerlockerror",this.onPointerLockError),document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mouseup",this.onMouseUp))}get movementActive(){for(const t of mp)if(this.held.has(t))return!0;return!1}get fireActive(){return this.fireHeld}writeMovement(){const t=this.actions,e=(this.held.has("KeyW")?1:0)+(this.held.has("ArrowUp")?1:0),n=(this.held.has("KeyS")?1:0)+(this.held.has("ArrowDown")?1:0),s=(this.held.has("KeyA")?1:0)+(this.held.has("ArrowLeft")?1:0),r=(this.held.has("KeyD")?1:0)+(this.held.has("ArrowRight")?1:0);t.moveZ=Gn(e-n,-1,1),t.moveX=Gn(r-s,-1,1),t.sprint=this.held.has("ShiftLeft")||this.held.has("ShiftRight")}syncMovement(){if(this.actions.interact=this.held.has("KeyE"),this.movementActive){this.writeMovement();return}const t=this.peer;if(t&&t.movementActive){t.writeMovement();return}this.writeMovement()}syncFire(){this.actions.firePrimary=this.fireHeld||!!this.peer?.fireActive}onKeyDown=t=>{if(!(t.repeat&&(t.code==="Escape"||t.code==="KeyR"||t.code==="F3"||t.code==="KeyM"))){switch(t.code){case"Escape":if(this.isLocked)return;this.pausePressed=!0;break;case"KeyR":this.restartPressed=!0;break;case"F3":this.debugPressed=!0,t.preventDefault();break;case"KeyM":this.mutePressed=!0;break}this.held.add(t.code),t.code==="Space"&&t.preventDefault(),this.syncMovement()}};onKeyUp=t=>{this.held.delete(t.code),this.syncMovement()};onBlur=()=>{this.release(),this.onSuspend?.()};onVisibility=()=>{document.hidden&&(this.release(),this.onSuspend?.())};onPointerLock=()=>{const t=this.isLocked;t?(this.hadLock=!0,this.lockFailed=!1):(this.hadLock&&this.release(),this.dragging=!1),this.onLockStateChange?.(t,this.lockFailed)};onPointerLockError=()=>{this.markLockFailed()};onMouseMove=t=>{if(!this.captureEnabled||!this.isLocked&&!this.dragging)return;const e=this.isLocked?t.movementX:t.clientX-this.dragX,n=this.isLocked?t.movementY:t.clientY-this.dragY;this.isLocked||(this.dragX=t.clientX,this.dragY=t.clientY);const s=this.actions;s.yaw-=e*this.sensitivity,s.pitch+=(this.invertY?n:-n)*this.sensitivity,s.pitch=Gn(s.pitch,-ce.pitchLimit,ce.pitchLimit)};onMouseDown=t=>{!this.captureEnabled||t.button!==0||(this.fireHeld=!0,this.syncFire(),this.actions.firePressed=!0,this.isLocked||(this.dragging=!0,this.dragX=t.clientX,this.dragY=t.clientY,this.requestLock()))};onMouseUp=t=>{t.button===0&&(this.fireHeld=!1,this.syncFire(),this.dragging=!1,this.dragX=0,this.dragY=0)}}const He={stickTravel:54,stickDeadzone:.16,lookSensitivity:.0042,portraitLookSensitivity:.0084,tapSlop:14,tapMaxSeconds:.3};class vp{actions;zones;now;isPortrait;sensitivity;portraitSensitivity;aimSensitivity;invertY;autoFire;disposed=!1;enabled=!1;movePointer=null;stickCx=0;stickCy=0;stickTravel=He.stickTravel;rawX=0;rawY=0;outX=0;outZ=0;aimPointer=null;aimX=0;aimY=0;aimDownAt=0;aimTravel=0;aimDragging=!1;pausePressed=!1;pauseClickPending=!1;sprintOn=!1;latchedFire=!1;autoFireHeld=!1;peer=null;onStickChange=null;onStickOrigin=null;onAimOrigin=null;onSprintChange=null;constructor(t,e,n={}){this.zones=t,this.actions=e,this.sensitivity=n.sensitivity??He.lookSensitivity,this.portraitSensitivity=n.portraitSensitivity??this.sensitivity*(He.portraitLookSensitivity/He.lookSensitivity),this.aimSensitivity=this.sensitivity,this.invertY=n.invertY??!1,this.autoFire=n.autoFire??!1,this.now=n.now??(()=>performance.now()),this.isPortrait=n.isPortrait??(()=>window.innerHeight>window.innerWidth),t.move.addEventListener("pointerdown",this.onStickDown),t.aim.addEventListener("pointerdown",this.onAimDown),t.pause.addEventListener("pointerdown",this.onPauseDown),t.sprint.addEventListener("pointerdown",this.onSprintDown),window.addEventListener("pointerdown",this.onAnyPointerDown,!0),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerCancel),window.addEventListener("lostpointercapture",this.onPointerCancel),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVisibility)}setEnabled(t){this.enabled!==t&&(this.enabled=t,t||this.release())}get isEnabled(){return this.enabled}setSensitivity(t){this.sensitivity=t,this.portraitSensitivity=t*(He.portraitLookSensitivity/He.lookSensitivity)}setInvertY(t){this.invertY=t}setAutoFire(t){this.autoFire!==t&&(this.autoFire=t,t?this.aimPointer!==null&&this.holdAutoFire():this.releaseAutoFire())}holdAutoFire(){this.autoFireHeld||(this.autoFireHeld=!0,this.syncFire())}releaseAutoFire(){this.autoFireHeld&&(this.autoFireHeld=!1,this.syncFire())}syncFire(){this.actions.firePrimary=this.autoFireHeld||!!this.peer?.fireActive}consumePause(){const t=this.pausePressed;return this.pausePressed=!1,t}consumePauseClickSuppression(){const t=this.pauseClickPending;return this.pauseClickPending=!1,t}acknowledgeFireLatch(){this.actions.firePressed||(this.latchedFire=!1)}get movementActive(){return this.movePointer!==null}get fireActive(){return this.autoFireHeld}writeMovement(){this.actions.moveX=this.outX,this.actions.moveZ=this.outZ,this.actions.sprint=this.sprintOn}applyMovement(){if(this.movementActive){this.writeMovement();return}const t=this.peer;if(t&&t.movementActive){t.writeMovement();return}this.actions.moveX=0,this.actions.moveZ=0,this.actions.sprint=this.sprintOn}release(){this.movePointer=null,this.aimPointer=null,this.onAimOrigin?.(0,0,!1),this.rawX=0,this.rawY=0,this.outX=0,this.outZ=0,this.aimTravel=0,this.aimDragging=!1,this.pausePressed=!1,this.sprintOn&&(this.sprintOn=!1,this.onSprintChange?.(!1)),this.latchedFire&&(this.actions.firePressed=!1,this.latchedFire=!1),this.releaseAutoFire(),this.applyMovement(),this.onStickChange?.(0,0,!1),this.onStickOrigin?.(0,0)}handleViewportChange(){this.stickCx=0,this.stickCy=0,this.stickTravel=He.stickTravel,this.release()}dispose(){this.disposed||(this.disposed=!0,this.release(),this.zones.move.removeEventListener("pointerdown",this.onStickDown),this.zones.aim.removeEventListener("pointerdown",this.onAimDown),this.zones.pause.removeEventListener("pointerdown",this.onPauseDown),this.zones.sprint.removeEventListener("pointerdown",this.onSprintDown),window.removeEventListener("pointerdown",this.onAnyPointerDown,!0),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),window.removeEventListener("lostpointercapture",this.onPointerCancel),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVisibility))}state(){return{movePointer:this.movePointer,aimPointer:this.aimPointer,stickX:+this.rawX.toFixed(4),stickY:+this.rawY.toFixed(4),moveX:+this.outX.toFixed(4),moveZ:+this.outZ.toFixed(4),aiming:this.aimDragging,sprint:this.sprintOn,autoFire:this.autoFire,autoFiring:this.autoFireHeld}}stamp(t){return t.timeStamp>0?t.timeStamp:this.now()}owns(t){return this.enabled&&t.pointerType!=="mouse"}claim(t){t.cancelable&&t.preventDefault();const e=t.currentTarget;try{e?.setPointerCapture?.(t.pointerId)}catch{}}onStickDown=t=>{if(!this.owns(t)||this.movePointer!==null)return;this.claim(t),this.movePointer=t.pointerId;const e=this.zones.stick.getBoundingClientRect();this.stickCx=t.clientX,this.stickCy=t.clientY,this.onStickOrigin?.(t.clientX-(e.left+e.width/2),t.clientY-(e.top+e.height/2)),this.stickTravel=e.width>0?e.width/2:He.stickTravel,this.updateStick(t.clientX,t.clientY)};onAimDown=t=>{!this.owns(t)||this.aimPointer!==null||(this.claim(t),this.aimPointer=t.pointerId,this.onAimOrigin?.(t.clientX,t.clientY,!0),this.aimX=t.clientX,this.aimY=t.clientY,this.aimDownAt=this.stamp(t),this.aimTravel=0,this.aimDragging=!1,this.aimSensitivity=this.isPortrait()?this.portraitSensitivity:this.sensitivity,this.autoFire&&this.holdAutoFire())};onPauseDown=t=>{t.cancelable&&t.preventDefault(),this.pausePressed=!0,this.pauseClickPending=!0};onAnyPointerDown=()=>{this.pauseClickPending=!1};onSprintDown=t=>{this.enabled&&(t.cancelable&&t.preventDefault(),this.sprintOn=!this.sprintOn,this.onSprintChange?.(this.sprintOn),this.applyMovement())};onPointerMove=t=>{if(!this.enabled)return;if(t.pointerId===this.movePointer){this.updateStick(t.clientX,t.clientY);return}if(t.pointerId!==this.aimPointer)return;const e=t.clientX-this.aimX,n=t.clientY-this.aimY;this.aimX=t.clientX,this.aimY=t.clientY;const s=Math.hypot(e,n);this.aimTravel+=s;let r=1;if(!this.aimDragging){if(this.aimTravel<=He.tapSlop)return;this.aimDragging=!0,r=s>0?(this.aimTravel-He.tapSlop)/s:0}const a=this.actions;a.yaw-=e*r*this.aimSensitivity,a.pitch+=(this.invertY?n:-n)*r*this.aimSensitivity,a.pitch=Gn(a.pitch,-ce.pitchLimit,ce.pitchLimit)};onPointerUp=t=>{if(t.pointerId===this.movePointer){this.endStick();return}if(t.pointerId!==this.aimPointer)return;this.aimPointer=null,this.onAimOrigin?.(0,0,!1),this.releaseAutoFire();const e=(this.stamp(t)-this.aimDownAt)/1e3,n=this.enabled&&!this.aimDragging&&this.aimTravel<=He.tapSlop&&e<=He.tapMaxSeconds;this.aimTravel=0,this.aimDragging=!1,n&&(this.autoFire||this.actions.firePressed||(this.actions.firePressed=!0,this.latchedFire=!0))};onPointerCancel=t=>{if(t.pointerId===this.movePointer){this.endStick();return}t.pointerId===this.aimPointer&&(this.aimPointer=null,this.onAimOrigin?.(0,0,!1),this.releaseAutoFire(),this.aimTravel=0,this.aimDragging=!1)};onBlur=()=>{this.release()};onVisibility=()=>{document.hidden&&this.release()};updateStick(t,e){const n=Math.max(1,this.stickTravel);let s=(t-this.stickCx)/n,r=(e-this.stickCy)/n;const a=Math.hypot(s,r);a>1&&(s/=a,r/=a),this.rawX=s,this.rawY=r;const o=Math.min(1,a);if(o<=He.stickDeadzone)this.outX=0,this.outZ=0;else{const l=(o-He.stickDeadzone)/(1-He.stickDeadzone)/o;this.outX=s*l||0,this.outZ=-r*l||0}this.applyMovement(),this.onStickChange?.(this.rawX,this.rawY,!0)}endStick(){this.movePointer=null,this.rawX=0,this.rawY=0,this.outX=0,this.outZ=0,this.applyMovement(),this.onStickChange?.(0,0,!1),this.onStickOrigin?.(0,0)}}function xp(i){let t=1779033703^i.length;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),3432918353),t=t<<13|t>>>19;return function(){return t=Math.imul(t^t>>>16,2246822507),t=Math.imul(t^t>>>13,3266489909),t^=t>>>16,t>>>0}}function _p(i,t,e,n){return function(){i>>>=0,t>>>=0,e>>>=0,n>>>=0;let r=i+t|0;return i=t^t>>>9,t=e+(e<<3)|0,e=e<<21|e>>>11,n=n+1|0,r=r+n|0,e=e+r|0,(r>>>0)/4294967296}}function Fe(i,t){const e=xp(`${i}:${t}`),n=_p(e(),e(),e(),e());for(let s=0;s<12;s++)n();return n}function wt(i,t,e){return t+(e-t)*i()}function Jo(i,t,e){return t+Math.floor(i()*(e-t))}function Cr(i,t){if(t.length===0)throw new Error("pick() called with an empty array");return t[Math.min(t.length-1,Math.floor(i()*t.length))]}const Kc="abcdefghijklmnopqrstuvwxyz0123456789";function Mp(){let i="";for(let t=0;t<8;t++)i+=Kc[Math.floor(Math.random()*Kc.length)];return i}function Jc(i){const t=(i??"").trim().toLowerCase();return t.length>0?t.slice(0,32):Mp()}const Sr={entry:{key:"entry",width:[13,17],depth:[12,16],ceiling:[4.2,4.6],columns:[0,0],tanks:[1,2],crates:[2,4],consoles:[1,2],threatDensity:0,waves:[0,0],labels:["DECONTAMINATION","AIRLOCK","QUARANTINE ENTRY"],deepLabels:["DECONTAMINATION","AIRLOCK","QUARANTINE ENTRY"]},corridor:{key:"corridor",width:[6,8],depth:[16,26],long:[16,26],narrow:[6,8],ceiling:[3.8,4.2],columns:[0,0],tanks:[0,0],crates:[0,2],consoles:[0,2],threatDensity:0,waves:[0,0],labels:["SERVICE RUN","TRANSIT CORRIDOR","ACCESS SPUR"],deepLabels:["SEALED SPUR","FLOODED RUN","UNLOGGED ACCESS"]},junction:{key:"junction",width:[11,14],depth:[11,14],ceiling:[4.4,5],columns:[1,1],tanks:[0,1],crates:[1,3],consoles:[1,2],threatDensity:0,waves:[0,0],labels:["SECTOR JUNCTION","CONTROL NODE","DISTRIBUTION HUB"],deepLabels:["DARK NODE","ABANDONED CONTROL","SILENT HUB"]},gallery:{key:"gallery",width:[9,12],depth:[17,23],long:[17,23],narrow:[9,12],ceiling:[4.2,4.8],columns:[0,0],tanks:[1,2],crates:[0,2],consoles:[2,4],threatDensity:0,waves:[0,0],labels:["OBSERVATION RUN","VIEWING GALLERY","SPECIMEN WALK"],deepLabels:["EMPTY GALLERY","BLIND OBSERVATION","WATCH ROOM"]},lab:{key:"lab",width:[15,19],depth:[15,18],ceiling:[4,4.6],columns:[0,1],tanks:[2,3],crates:[3,6],consoles:[2,4],threatDensity:2.6,waves:[1,2],labels:["CULTURE VAULT","ASSAY LAB","SEQUENCING SUITE","INCUBATION BAY"],deepLabels:["SUBJECT ANNEX","CULTURE OVERFLOW","UNLOGGED ASSAY"]},storage:{key:"storage",width:[17,22],depth:[15,18],ceiling:[3.6,4],columns:[0,1],tanks:[0,1],crates:[6,10],consoles:[0,1],threatDensity:2.4,waves:[1,2],labels:["SUPPLY HOLD","CRATE STORE","MATERIEL BAY","COLD STORE"],deepLabels:["SPOILED STORE","CONDEMNED HOLD","OVERFLOW STACK"]},containment:{key:"containment",width:[20,26],depth:[20,28],ceiling:[4.6,5.4],columns:[2,3],tanks:[3,5],crates:[3,6],consoles:[2,4],threatDensity:2.2,waves:[2,3],labels:["CONTAINMENT BAY","SPECIMEN HOLD","ISOLATION WARD","HOLDING PEN"],deepLabels:["BREACHED HOLD","EMPTY PENS","RELEASE WARD"]},reactor:{key:"reactor",width:[22,28],depth:[18,24],ceiling:[5.2,6],columns:[3,4],tanks:[1,2],crates:[1,3],consoles:[3,5],threatDensity:3,waves:[2,3],labels:["COOLANT PLANT","POWER SPINE","THERMAL VAULT"],deepLabels:["RUNAWAY PLANT","THERMAL BREACH","DEAD SPINE"]},chamber:{key:"chamber",width:[24,30],depth:[24,30],ceiling:[5.2,6],columns:[3,4],tanks:[4,6],crates:[2,5],consoles:[2,3],threatDensity:2.8,waves:[3,3],labels:["PRIMARY CONTAINMENT","REACTOR VAULT","CORE CHAMBER"],deepLabels:["PRIMARY BREACH","ORIGIN CHAMBER","CORE — OPEN"]}},Qu=["lab","storage"],ju=["containment","reactor"],yp=["corridor","junction"],Sp=["corridor","junction","gallery"];[...Qu,...ju];function Qc(i){return i?ju:Qu}function Ep(i){return i?Sp:yp}function bp(i){return Sr[i].threatDensity>0}function Qo(i,t,e){let n,s;if(i.long&&i.narrow){const a=Math.round(wt(t,i.long[0],i.long[1])),o=Math.round(wt(t,i.narrow[0],i.narrow[1]));n=e===0?a:o,s=e===0?o:a}else n=Math.round(wt(t,i.width[0],i.width[1])),s=Math.round(wt(t,i.depth[0],i.depth[1]));const r=Math.round(wt(t,i.ceiling[0],i.ceiling[1])*4)/4;return{width:n,depth:s,ceiling:r}}function ar(i,t){return i[1]<=i[0]?i[0]:Jo(t,i[0],i[1]+1)}const wp=8,Tp=10,Ap=1,Rp=3,Cp=12,Pp=.5;function Ip(i){const t=[],e=[],n=(m,v,g)=>{const p={id:t.length,archetype:m,depth:v<0?0:t[v].depth+1,critical:g,parent:v,children:[]};return t.push(p),v>=0&&(t[v].children.push(p.id),e.push({a:v,b:p.id,critical:g})),p},s=n("entry",-1,!0),r=[s.id],a=Jo(i,wp-2,Tp-1);let o=s.id,l=!0;const c=Math.ceil(a*Pp);for(let m=0;m<a;m++){const v=m>=c,g=l?Cr(i,Ep(v)):Cr(i,Qc(v)),p=n(g,o,!0);r.push(p.id),o=p.id,l=!l}const h=n("chamber",o,!0);r.push(h.id);const u=r.filter(m=>{const v=t[m];return!bp(v.archetype)&&v.archetype!=="entry"}),d=Jo(i,Ap,Rp+1),f=new Set;for(let m=0;m<d&&t.length<Cp&&u.length!==0;m++){let v=-1;for(let g=0;g<6;g++){const p=Cr(i,u);if(!f.has(p)){v=p;break}}v<0||(f.add(v),n(Cr(i,Qc(t[v].depth>c)),v,!1))}return{nodes:t,edges:e,startId:s.id,finalId:h.id,criticalPath:r}}const Bn=.5,cn=Bn*3,Lp=3,Ua=1.6,ec=3.2,Dp=1.2,On=.5,Pr=4,ns=.55,hi=.3,jc=.34,Np=.13,th=.07,Fp=5,eh=9,Nn=1.3,td=2.4,ed=3,Up=1.7,nh=1.2,nd=.72,Op=2.05,Bp=.35,ae=nd*2+Bp,Ui=3.54,id=3.19,Xn=[0,1,0,1],Vs=[-1,1,1,-1];function sd(i){return(i+2)%4}const zp=[0,2,-2,4,-4,7,-7,11,-11],ih=2,rd=.01;function kp(i,t,e){return i.minX<t.maxX+e&&t.minX<i.maxX+e&&i.minZ<t.maxZ+e&&t.minZ<i.maxZ+e}function sh(i,t){const e=t.slice();for(let n=e.length-1;n>0;n--){const s=Math.floor(i()*(n+1)),r=e[n];e[n]=e[s],e[s]=r}return e}function Vp(i,t){const e=[0,1,2,3];if(t===-1)return sh(i,e);const n=t,s=sd(t),r=sh(i,e.filter(a=>a!==n&&a!==s));return i()<.45?[n,r[0],r[1],s]:[r[0],n,r[1],s]}function ad(i,t,e){const n=e===0?i.minX:i.minZ,s=e===0?i.maxX:i.maxZ,r=e===0?t.minX:t.minZ,a=e===0?t.maxX:t.maxZ;return{lo:Math.max(n,r),hi:Math.min(s,a)}}const wa=(Ua+Dp)*2;function od(i,t,e,n,s){for(const r of i)if(!(r.a!==t&&r.b!==t&&r.a!==e&&r.b!==e)&&Math.abs(r.x-n)<wa&&Math.abs(r.z-s)<wa)return!0;return!1}function Gp(i,t){const e=[],n=[],s=new Map,a={rooms:e,doors:n,byId:s,incoming:new Map,nextConnectionId:0},o=i.nodes[i.startId],l=Qo(Sr[o.archetype],t,1),c={id:o.id,archetype:o.archetype,depth:o.depth,critical:o.critical,minX:-Math.floor(l.width/2),maxX:-Math.floor(l.width/2)+l.width,minZ:-Math.floor(l.depth/2),maxZ:-Math.floor(l.depth/2)+l.depth,ceiling:l.ceiling};e.push(c),s.set(c.id,c);for(let h=1;h<i.criticalPath.length;h++){const u=i.criticalPath[h],d=i.nodes[u];if(!rh(a,d,d.parent,t))return null}for(const h of i.nodes)h.critical||s.has(h.id)||h.parent<0||!s.has(h.parent)||rh(a,h,h.parent,t);return Hp(e,n,t),{rooms:e,doors:n}}function rh(i,t,e,n){const s=i.byId.get(e);if(!s)return!1;const r=Sr[t.archetype],a=Qo(r,n,0),o=Qo(r,n,1),l=Vp(n,i.incoming.get(e)??-1);for(const c of l){const h=c===0||c===2?o:a,u=c===0||c===2?0:1,d=u===0?(s.minX+s.maxX)/2:(s.minZ+s.maxZ)/2;for(const f of zp){const m=Math.round(d+f),v=h.width/2,g=h.depth/2;let p,y;c===0?(y=s.minZ-cn-h.depth,p=m-v):c===2?(y=s.maxZ+cn,p=m-v):c===1?(p=s.maxX+cn,y=m-g):(p=s.minX-cn-h.width,y=m-g);const w={id:t.id,archetype:t.archetype,depth:t.depth,critical:t.critical,minX:p,maxX:p+h.width,minZ:y,maxZ:y+h.depth,ceiling:h.ceiling};let M=!0;for(const E of i.rooms)if(E.id!==e&&kp(w,E,cn-rd)){M=!1;break}if(!M)continue;const T=ad(s,w,u);if(T.hi-T.lo<wa)continue;const b=Math.round((T.lo+T.hi)/2*2)/2,A=u===0?b:c===1?s.maxX+cn/2:s.minX-cn/2,_=u===0?c===0?s.minZ-cn/2:s.maxZ+cn/2:b;if(!od(i.doors,e,t.id,A,_))return i.rooms.push(w),i.byId.set(w.id,w),i.doors.push({connectionId:i.nextConnectionId++,a:e,b:t.id,sideA:c,x:A,z:_,halfWidth:Ua,height:Math.min(ec,Math.min(s.ceiling,w.ceiling)-.8),critical:t.critical,loop:!1}),i.incoming.set(t.id,c),!0}}return!1}function Hp(i,t,e){const n=new Set;for(const a of t)n.add(a.a<a.b?`${a.a}:${a.b}`:`${a.b}:${a.a}`);let s=t.length,r=0;for(let a=0;a<i.length&&r<ih;a++)for(let o=a+1;o<i.length&&r<ih;o++){const l=i[a],c=i[o];if(!n.has(`${l.id}:${c.id}`)&&!(wt(e,0,1)>.55))for(const h of[0,1,2,3]){const u=h===0||h===2?0:1;let d;if(h===0?d=l.minZ-c.maxZ:h===2?d=c.minZ-l.maxZ:h===1?d=c.minX-l.maxX:d=l.minX-c.maxX,d<cn-rd||d>Lp)continue;const f=ad(l,c,u);if(f.hi-f.lo<wa)continue;const m=Math.round((f.lo+f.hi)/2*2)/2,v=u===0?m:h===1?l.maxX+d/2:l.minX-d/2,g=u===0?h===0?l.minZ-d/2:l.maxZ+d/2:m;if(!od(t,l.id,c.id,v,g)){t.push({connectionId:s++,a:l.id,b:c.id,sideA:h,x:v,z:g,halfWidth:Ua,height:Math.min(ec,Math.min(l.ceiling,c.ceiling)-.8),critical:!1,loop:!0}),n.add(`${l.id}:${c.id}`),r++;break}}}}const Wp=nd,Xp=Op,qp=2,Yp=3,_i={strangeLabels:.45,breachedTankChance:.72,beaconsMin:0,beaconsMax:2,emergencyFixture:.55,emergencyIntensity:13,spotsPerIntake:3};function pr(i,t,e,n,s,r,a,o){return{minX:i,minY:t,minZ:e,maxX:n,maxY:s,maxZ:r,kind:a,surface:o}}function de(i,t,e,n,s,r,a,o){return pr(i-n/2,t-s/2,e-r/2,i+n/2,t+s/2,e+r/2,a,o)}function ue(i,t,e,n,s,r,a,o,l,c){n-e<1e-4||r-s<1e-4||o-a<1e-4||(t===0?i.push(pr(e,s,a,n,r,o,l,c)):i.push(pr(a,s,e,o,r,n,l,c)))}function Gs(i,t){switch(t){case 0:return i.minZ;case 1:return i.maxX;case 2:return i.maxZ;default:return i.minX}}function nc(i,t){return Xn[t]===0?{lo:i.minX,hi:i.maxX}:{lo:i.minZ,hi:i.maxZ}}function Oa(i,t,e,n,s){for(const r of i)if(!(n<=r.minX||t>=r.maxX)&&!(s<=r.minZ||e>=r.maxZ))return!0;return!1}function mr(i,t,e,n){const s=i-t-e,r=n-(i+t);return s>0&&s<ae?e+t:r>0&&r<ae?n-t:i}function Ba(i,t,e,n,s,r){for(const a of i)if(!(a.kind!=="prop"||a.minY>.35||a.maxY<=.05)&&!(n+r<=a.minX||t-r>=a.maxX)&&!(s+r<=a.minZ||e-r>=a.maxZ))return!0;return!1}function Ka(i,t,e,n=Wp,s=Xp){for(let r=0;r<i.length;r++){const a=i[r];if(a.kind==="floor"||a.kind==="ceiling"||a.minY>=s||a.maxY<=.05)continue;const o=Math.max(a.minX,Math.min(t,a.maxX)),l=Math.max(a.minZ,Math.min(e,a.maxZ)),c=o-t,h=l-e;if(c*c+h*h<n*n)return a}}function Zp(i,t,e,n){const s=Bn,r=Xn[e],a=Vs[e],o=Gs(t,e),l=a<0?o-s:o,c=a<0?o:o+s,h=nc(t,e),u=h.lo-s,d=h.hi+s,f=n.slice().sort((v,g)=>v.lo-g.lo);let m=u;for(const v of f)ue(i,r,m,v.lo,0,t.ceiling,l,c,"wall","wallPanel"),ue(i,r,v.lo,v.hi,v.height,t.ceiling,l,c,"wall","wallPanel"),m=Math.max(m,v.hi);ue(i,r,m,d,0,t.ceiling,l,c,"wall","wallPanel")}function $p(i,t,e){const n=Bn,s=Xn[e.sideA],r=[];let a,o;if(s===0?(a=Math.min(i.maxZ,t.maxZ),o=Math.max(i.minZ,t.minZ)):(a=Math.min(i.maxX,t.maxX),o=Math.max(i.minX,t.minX)),o<a){const m=a;a=o,o=m}const l=a+n,c=o-n,h=s===0?e.x:e.z,u=e.halfWidth,d=u+On,f=Math.max(i.ceiling,t.ceiling);return ue(r,s,h-d,h+d,-n,0,l,c,"floor","floorPlate"),ue(r,s,h-d,h-u,0,f,l,c,"wall","structure"),ue(r,s,h+u,h+d,0,f,l,c,"wall","structure"),ue(r,s,h-u,h+u,e.height,f,l,c,"wall","structure"),r}function Kp(i,t,e,n){const{layout:s,dressing:r}=n,a=Sr[i.archetype],o=Bn,l=i.ceiling,{minX:c,maxX:h,minZ:u,maxZ:d}=i,f=h-c,m=d-u,v=(c+h)/2,g=(u+d)/2,p=[],y=[],w=[],M=[],T=[],b=[],A=Math.min(1,Math.max(0,n.escalation));p.push(pr(c-o,-o,u-o,h+o,0,d+o,"floor","floorPlate"),pr(c-o,l,u-o,h+o,l+o,d+o,"ceiling","ceilingPanel"));const _=[[],[],[],[]];for(const Q of t){const ot=Xn[Q.side]===0?Q.x:Q.z;_[Q.side].push({lo:ot-Q.halfWidth,hi:ot+Q.halfWidth,height:Q.height}),ld(M,i,Q.side,ot,Q.halfWidth+.7,2.6),jp(p,i,Q.side,ot,Q.halfWidth,Q.height)}e.budget>0&&nm(i,t,_,M,p,T,n);for(const Q of[0,1,2,3])Zp(p,i,Q,_[Q]);tm(p,i,_),em(p,i,_);const E=Math.max(0,Math.round(m/Fp)-1);for(let Q=0;Q<E;Q++){const ot=u+m/(E+1)*(Q+1);p.push(de(v,l-.18,ot,f,.36,.55,"ceiling","structure"))}const C=Math.max(1,Math.min(3,Math.round(f/eh))),P=Math.max(1,Math.min(4,Math.round(m/eh))),D=Math.max(1.4,Math.min(2.9,f/C-1.4)),W=C*P,X=e.budget<=0&&W>=2&&A>=_i.emergencyFixture?Math.floor(r()*W):-1;for(let Q=0;Q<C;Q++)for(let ot=0;ot<P;ot++){const zt=c+f/(C+1)*(Q+1),Kt=u+m/(P+1)*(ot+1),Vt=Q*P+ot===X;p.push(de(zt,l-.13,Kt,D,.26,1.05,"ceiling","machineDark"),de(zt,l-.28,Kt,D-.3,.08,.78,"ceiling",Vt?"emergency":"lamp")),w.push({x:zt,y:l-.5,z:Kt,color:Vt?14173484:12572904,intensity:Vt?_i.emergencyIntensity:34,distance:Math.max(16,Math.min(28,Math.max(f,m)*1.1))})}f>9&&y.push({kind:"pipeRun",x:c+1.15,y:l-.62,z:g,yaw:0,scale:1,variant:.3,length:m-1},{kind:"pipeRun",x:h-1.15,y:l-.62,z:g,yaw:0,scale:1,variant:.7,length:m-1});const O=Math.round(_i.beaconsMin+(_i.beaconsMax-_i.beaconsMin)*A);for(let Q=0;Q<O;Q++){const ot=Q%2===0?-1:1,zt=v+ot*(f/2-.6),Kt=g+(Q<2?0:(r()-.5)*m*.5);y.push({kind:"beacon",x:zt,y:l-1,z:Kt,yaw:0,scale:1.2,variant:r()}),w.push({x:zt,y:l-1.2,z:Kt,color:14173484,intensity:6,distance:9})}const H=M.slice();i.archetype==="entry"&&H.push({minX:v-3,minZ:g-3,maxX:v+3,maxZ:g+3});const U=e.anchored&&n.anchorKind?Jp(i,t,n.anchorKind):null;U&&(H.push({minX:U.x-Ui,minZ:U.z-Ui,maxX:U.x+Ui,maxZ:U.z+Ui}),U.kind==="containmentMachine"&&sm(p,y,i,U)),rm(p,i,H,ar(a.columns,s),s),am(p,y,b,i,H,ar(a.tanks,r),A,r),lm(p,y,i,H,ar(a.consoles,r),r),cm(p,i,H,ar(a.crates,r),r),om(b,i,T,A,r),U&&b.push({x:U.x,z:U.z,radius:Ui*.62,coverage:wt(r,.4,.55),brightness:wt(r,.3,.44),variant:r()});for(const Q of T){if(Ka(p,Q.x,Q.z))throw new Error(`Enemy entrance origin blocked at (${Q.x}, ${Q.z}) in room ${i.id}`);if(Ka(p,Q.entryX,Q.entryZ))throw new Error(`Enemy entrance handoff blocked at (${Q.entryX}, ${Q.entryZ}) in room ${i.id}`)}if(U&&Ka(p,U.x,U.z,Ui,id))throw new Error(`Anchor blocked at (${U.x}, ${U.z}) in room ${i.id}`);const q=A>=_i.strangeLabels?a.deepLabels:a.labels,tt=q[Math.floor(s()*q.length)%q.length],it=1+Math.floor(s()*89);return{id:i.id,name:`${tt} ${String(it).padStart(2,"0")}`,archetype:i.archetype,depth:i.depth,escalation:A,critical:i.critical,minX:c,maxX:h,minZ:u,maxZ:d,floorY:0,ceilY:l,brushes:p,props:y,lights:w,contamination:b,doorways:t.slice(),enemySpawns:T,anchor:U,encounter:e}}function Jp(i,t,e){const n=(i.minX+i.maxX)/2,s=(i.minZ+i.maxZ)/2,r=t[0];if(!r)return{kind:e,x:n,z:s,yaw:0};const a=Qp(i,r);return{kind:e,x:n,z:s,yaw:Math.atan2(-(a.x-n),-(a.z-s))}}function Qp(i,t){switch(t.side){case 0:return{x:t.x,z:i.minZ};case 1:return{x:i.maxX,z:t.z};case 2:return{x:t.x,z:i.maxZ};default:return{x:i.minX,z:t.z}}}function ld(i,t,e,n,s,r){const a=Vs[e],o=Gs(t,e),l=a<0?o:o-r;Xn[e]===0?i.push({minX:n-s,maxX:n+s,minZ:l,maxZ:l+r}):i.push({minX:l,maxX:l+r,minZ:n-s,maxZ:n+s})}function jp(i,t,e,n,s,r){const a=Xn[e],o=Vs[e],l=Gs(t,e),c=.35,h=o<0?l:l-c,u=o<0?l+c:l,d=s+On;ue(i,a,n-d,n-s,0,r+On,h,u,"wall","structure"),ue(i,a,n+s,n+d,0,r+On,h,u,"wall","structure"),ue(i,a,n-s,n+s,r,r+On,h,u,"wall","structure");const f=o<0?u:h-.06;ue(i,a,n-d,n+d,r+.12,r+On-.12,f,f+.06,"wall","hazard")}function tm(i,t,e){const n=t.ceiling,s=(a,o)=>{for(const l of e[a])if(o>l.lo-ns-On&&o<l.hi+ns+On)return!1;return!0},r=(a,o)=>{const l=o-a,c=Math.floor((l-Pr)/Pr);if(c<0)return[];const h=[],u=(l-Pr)/Math.max(1,c);for(let d=0;d<=c;d++)h.push(a+Pr*.5+d*u);return h};for(const a of r(t.minZ,t.maxZ))s(3,a)&&i.push(de(t.minX+hi/2,n/2,a,hi,n,ns,"wall","structure")),s(1,a)&&i.push(de(t.maxX-hi/2,n/2,a,hi,n,ns,"wall","structure"));for(const a of r(t.minX,t.maxX))s(0,a)&&i.push(de(a,n/2,t.minZ+hi/2,ns,n,hi,"wall","structure")),s(2,a)&&i.push(de(a,n/2,t.maxZ-hi/2,ns,n,hi,"wall","structure"))}function em(i,t,e){const n=jc,s=jc+Np;for(const r of[0,1,2,3]){const a=Xn[r],o=Vs[r],l=Gs(t,r),c=o<0?l:l-th,h=o<0?l+th:l,u=nc(t,r),d=e[r].slice().sort((m,v)=>m.lo-v.lo);let f=u.lo;for(const m of d){const v=Math.min(m.lo-On,u.hi);v-f>=.2&&ue(i,a,f,v,n,s,c,h,"wall","emissive"),f=Math.max(f,m.hi+On)}u.hi-f>=.2&&ue(i,a,f,u.hi,n,s,c,h,"wall","emissive")}}function nm(i,t,e,n,s,r,a){const o=Bn,l=Math.floor(a.layout()*4);for(let c=0;c<4&&r.length<Yp;c++){const h=(l+c)%4,u=Xn[h],d=Vs[h],f=Gs(i,h),m=nc(i,h),v=(m.lo+m.hi)/2,g=(m.hi-m.lo)/4,p=[v,v-g,v+g];let y=Number.NaN;for(const b of p){const A=Math.round(b*2)/2;if(A-Nn<m.lo+1||A+Nn>m.hi-1)continue;let _=!1;for(const q of e[h])if(A+Nn+1.2>q.lo&&A-Nn-1.2<q.hi){_=!0;break}for(const q of t){if(_)break;if(Xn[q.side]===u)continue;const tt=u===0?q.z:q.x,it=u===0?q.x:q.z;Math.abs(tt-f)<4&&Math.abs(it-A)<4&&(_=!0)}if(_)continue;const E=f+d*(o+ed),C=Math.min(f,E),P=Math.max(f,E),D=A-Nn-o,W=A+Nn+o,X=u===0?D:C,O=u===0?W:P,H=u===0?C:D,U=u===0?P:W;if(a.isFree(X,H,O,U)){a.reserve(X,H,O,U),y=A;break}}if(Number.isNaN(y))continue;e[h].push({lo:y-Nn,hi:y+Nn,height:td}),ld(n,i,h,y,Nn+.7,nh+1.4),im(s,i,h,y);const w=f+d*(o+Up),M=f-d*nh,T=h===0?Math.PI:h===2?0:h===1?Math.PI/2:-Math.PI/2;r.push(u===0?{x:y,z:w,yaw:T,entryX:y,entryZ:M}:{x:w,z:y,yaw:T,entryX:M,entryZ:y})}}function im(i,t,e,n){const s=Bn,r=Xn[e],a=Vs[e],o=Gs(t,e),l=o+a*s,c=o+a*(s+ed),h=Math.min(l,c),u=Math.max(l,c),d=Nn,f=td;ue(i,r,n-d,n+d,-s,0,h,u,"floor","floorPlate"),ue(i,r,n-d,n+d,f,f+s,h,u,"ceiling","structure"),ue(i,r,n-d-s,n-d,0,f,h,u,"wall","machineDark"),ue(i,r,n+d,n+d+s,0,f,h,u,"wall","machineDark");const m=a<0?h:u-s;ue(i,r,n-d,n+d,0,f,m,m+s,"wall","machineDark");const v=a<0?h+s:u-s-.05;ue(i,r,n-d+.3,n+d-.3,.5,f-.5,v,v+.05,"wall","emissive");const g=a<0?o:o-.3,p=a<0?o+.3:o;ue(i,r,n-d-.35,n-d,0,f+.35,g,p,"wall","structure"),ue(i,r,n+d,n+d+.35,0,f+.35,g,p,"wall","structure"),ue(i,r,n-d,n+d,f,f+.08,g,p,"wall","structure"),ue(i,r,n-d,n+d,f+.27,f+.35,g,p,"wall","structure"),ue(i,r,n-d,n+d,f+.08,f+.27,g,p,"wall","hazard")}function sm(i,t,e,n){t.push({kind:"containmentMachine",x:n.x,y:0,z:n.z,yaw:n.yaw,scale:1,variant:e.depth/10});const s=3.15,r=.42,a=Math.max(3.5,e.ceiling-.65);for(const c of[-1,1])for(const h of[-1,1]){const u=n.x+c*s,d=n.z+h*s;i.push(de(u,a/2,d,r,a,r,"prop","structure"),de(u,.42,d,.62,.72,.62,"prop","hazard"))}const o=Math.max(3.35,a-.18),l=s*2-r;i.push(de(n.x,o,n.z-s,l,.3,r,"prop","machineDark"),de(n.x,o,n.z+s,l,.3,r,"prop","machineDark"),de(n.x-s,o,n.z,r,.3,l,"prop","machineDark"),de(n.x+s,o,n.z,r,.3,l,"prop","machineDark"))}function rm(i,t,e,n,s){const r=t.ceiling,a=(t.maxX-t.minX)/2,o=(t.maxZ-t.minZ)/2,l=(t.minX+t.maxX)/2,c=(t.minZ+t.maxZ)/2,h=.75;for(let u=0;u<n;u++){const d=l+(u%2===0?-1:1)*wt(s,a*.3,a*.56),f=c+(u<2?-1:1)*wt(s,o*.15,o*.55);d-h-t.minX<ae||t.maxX-d-h<ae||f-h-t.minZ<ae||t.maxZ-f-h<ae||Oa(e,d-h-ae,f-h-ae,d+h+ae,f+h+ae)||Ba(i,d-h,f-h,d+h,f+h,ae)||i.push(de(d,r/2,f,1.25,r,1.25,"prop","structure"),de(d,.55,f,1.42,.9,1.42,"prop","hazard"),de(d,1.06,f,1.5,.12,1.5,"prop","machineDark"))}}function am(i,t,e,n,s,r,a,o){const d=n.maxZ-n.minZ,f=a*_i.breachedTankChance;let m=0;for(let v=0;v<r*5&&m<r;v++){const g=v%2===0?-1:1,p=mr(g<0?n.minX+1.9:n.maxX-1.9,1.15,n.minX,n.maxX),y=mr(n.minZ+d*(.14+.72*o()),1.15,n.minZ,n.maxZ);if(p-1.15<n.minX-1e-6||p+1.15>n.maxX+1e-6||y-1.15<n.minZ-1e-6||y+1.15>n.maxZ+1e-6||!ic(n,p,y,1.15)||Oa(s,p-1.15-ae,y-1.15-ae,p+1.15+ae,y+1.15+ae)||Ba(i,p-1.15,y-1.15,p+1.15,y+1.15,ae))continue;const w=wt(o,0,Math.PI),M=o(),T=o()<f;i.push(de(p,.24,y,1.15*2,.48,1.15*2,"prop","machineDark"),de(p,.55,y,1.15*2-.25,.1,1.15*2-.25,"prop",T?"machineDark":"emissive"));const b=de(p,.66+3.05/2,y,.731*2,3.05,.731*2,"prop","glass");b.collisionOnly=!0,i.push(b),t.push({kind:T?"breachedTank":"containmentTank",x:p,y:0,z:y,yaw:w,scale:1,variant:M}),T&&e.push({x:p,z:y,radius:wt(o,1.5,2.3),coverage:wt(o,.3,.5),brightness:wt(o,.3,.46),variant:M}),m++}}function om(i,t,e,n,s){const r=Math.round(n*_i.spotsPerIntake);if(!(r<=0))for(const a of e)for(let o=0;o<r;o++){const l=(o+.5)/r,c=a.x+(a.entryX-a.x)*(.55+l*1.1)+wt(s,-.7,.7),h=a.z+(a.entryZ-a.z)*(.55+l*1.1)+wt(s,-.7,.7);c<t.minX||c>t.maxX||h<t.minZ||h>t.maxZ||i.push({x:c,z:h,radius:wt(s,.9,1.9)*(1-l*.4),coverage:wt(s,.22,.42)*(1-l*.35),brightness:wt(s,.28,.44),variant:s()})}}function lm(i,t,e,n,s,r){const a=e.maxZ-e.minZ,o=1;let l=0;for(let c=0;c<s*5&&l<s;c++){const h=c%2===0?-1:1,u=h<0?e.minX+.36:e.maxX-.36,d=mr(e.minZ+a*(.12+.76*r()),o,e.minZ,e.maxZ);d-o<e.minZ-1e-6||d+o>e.maxZ+1e-6||ic(e,u,d,o)&&(Oa(n,u-.4-ae,d-o-ae,u+.4+ae,d+o+ae)||Ba(i,u-.4,d-o,u+.4,d+o,ae)||(i.push(de(u,.5,d,.72,1,1.9,"prop","machine"),de(u,1.02,d,.8,.1,2,"prop","machineDark")),t.push({kind:"wallConsole",x:u,y:1.07,z:d,yaw:h<0?Math.PI/2:-Math.PI/2,scale:1,variant:r()}),l++))}}function cm(i,t,e,n,s){let r=0;for(let a=0;a<n*6&&r<n;a++){const o=wt(s,.85,1.25),l=o/2,c=mr(t.minX+l+(t.maxX-t.minX-o)*s(),l,t.minX,t.maxX),h=mr(t.minZ+l+(t.maxZ-t.minZ-o)*s(),l,t.minZ,t.maxZ);if(c-l<t.minX-1e-6||c+l>t.maxX+1e-6||h-l<t.minZ-1e-6||h+l>t.maxZ+1e-6||!ic(t,c,h,l)||Oa(e,c-l-ae,h-l-ae,c+l+ae,h+l+ae)||Ba(i,c-l,h-l,c+l,h+l,ae))continue;const u=.12;i.push(de(c,(o-u)/2,h,o,o-u,o,"prop","machine"),de(c,o-u/2,h,o*1.04,u,o*1.04,"prop","hazard")),r++}}function ic(i,t,e,n){const s=[t-n-i.minX,i.maxX-(t+n),e-n-i.minZ,i.maxZ-(e+n)];for(const r of s)if(r>.001&&r<ae)return!1;return!0}const hm=100,cd=3,um=.1,dm=.06,fm=.45,pm=3,mm=.055,gm=.3,vm={containmentMachine:6,orchestrator:14},xm=6;function _m(i,t,e,n=null){if(t.threatDensity<=0)return{budget:0,waveBudget:[],runnerChance:0,heavyChance:0,anchored:!1,anchorThreat:0};const s=n!==null,r=n?vm[n]:0,a=(i.maxX-i.minX)*(i.maxZ-i.minZ),o=1+i.depth*.11,l=i.critical?1:.85,c=Math.max(cd+r,Math.round(a/hm*t.threatDensity*o*l*wt(e,.92,1.12))),h=Math.max(1,ar(t.waves,e)),u={budget:c,waveBudget:[],runnerChance:Math.min(fm,um+i.depth*dm),heavyChance:Math.min(gm,Math.max(0,i.depth-pm)*mm),anchored:s,anchorThreat:r};return hd(u,h),u}function hd(i,t){const e=Math.max(ud(i),i.budget-i.anchorThreat);i.waveBudget=ym(e,t),i.budget=i.anchorThreat+i.waveBudget.reduce((n,s)=>n+s,0)}function ud(i){return Math.max(i.waveBudget.length,i.anchorThreat>0?xm:cd)}function ah(i){return i.anchorThreat+ud(i)}const is={min:72,max:88};function Mm(i){const t=i.filter(a=>a.budget>0);if(t.length===0)return 0;const e=()=>t.reduce((a,o)=>a+o.budget,0),n=e(),s=n<is.min?is.min/n:n>is.max?is.max/n:1;if(s!==1)for(const a of t)a.budget=Math.max(ah(a),Math.round(a.budget*s));const r=t.length*64;for(let a=0;a<r&&e()>is.max;a++){const o=oh(t,l=>l.budget>ah(l),(l,c)=>c.budget-l.budget);if(!o)break;o.budget-=1}for(let a=0;a<r&&e()<is.min;a++){const o=oh(t,()=>!0,(l,c)=>l.budget-c.budget);if(!o)break;o.budget+=1}for(const a of t)hd(a,a.waveBudget.length);return e()}function oh(i,t,e){let n;for(const s of i)t(s)&&(!n||e(s,n)<0)&&(n=s);return n}function ym(i,t){const e=t*(t+1)/2,n=[];let s=0;for(let r=0;r<t-1;r++){const a=Math.max(1,Math.round(i*(r+1)/e));n.push(a),s+=a}return n.push(Math.max(1,i-s)),n}const Sm=.05;function Ir(i,t,e,n,s,r){for(const a of i.brushes){if(a.kind==="floor"||a.kind==="ceiling"||r<=a.minY||s>=a.maxY)continue;const o=Math.max(a.minX,Math.min(t,a.maxX)),l=Math.max(a.minZ,Math.min(e,a.maxZ));if((o-t)**2+(l-e)**2<n*n)return!0}return!1}function dd(i,t){const e=[],n=[],s=new Map;for(const f of i.rooms)s.set(f.id,f);const r=new Map;for(const f of i.connections){if(!s.has(f.a)||!s.has(f.b)){e.push(`connection ${f.id} references a missing room`);continue}r.has(f.a)||r.set(f.a,[]),r.has(f.b)||r.set(f.b,[]),r.get(f.a).push(f.b),r.get(f.b).push(f.a)}const a=new Set([i.startRoomId]),o=[i.startRoomId];for(;o.length>0;){const f=o.pop();for(const m of r.get(f)??[])a.has(m)||(a.add(m),o.push(m))}a.has(i.finalRoomId)||e.push("the final chamber is unreachable in the room graph");for(const f of i.rooms)a.has(f.id)||e.push(`room ${f.id} is not connected to the entry`),f.doorways.length===0&&e.push(`room ${f.id} has no doorway`);for(let f=0;f<i.rooms.length;f++)for(let m=f+1;m<i.rooms.length;m++){const v=i.rooms[f],g=i.rooms[m],p=cn-.01;v.minX<g.maxX+p&&g.minX<v.maxX+p&&v.minZ<g.maxZ+p&&g.minZ<v.maxZ+p&&e.push(`rooms ${v.id} and ${g.id} overlap`)}const l=s.get(i.startRoomId);l?Ir(l,i.playerSpawn.x,i.playerSpawn.z,t.playerRadius,.05,t.playerHeight)&&e.push("the player spawn is inside collision"):e.push("the entry room is missing");for(const f of i.rooms)if(!(f.encounter.budget<=0)){f.enemySpawns.length<qp&&e.push(`room ${f.id} fights with only ${f.enemySpawns.length} arrival lane(s)`);for(const m of f.enemySpawns)Ir(f,m.x,m.z,t.enemyRadius,.05,t.enemyHeight)&&e.push(`room ${f.id} has a blocked entrance origin`),Ir(f,m.entryX,m.entryZ,t.enemyRadius,.05,t.enemyHeight)&&e.push(`room ${f.id} has a blocked entrance handoff`);f.encounter.anchored?f.anchor?Ir(f,f.anchor.x,f.anchor.z,Ui,.05,id)&&e.push(`room ${f.id} has a blocked anchor`):e.push(`room ${f.id} declares an anchored specimen with no anchor`):f.anchor&&e.push(`room ${f.id} has an anchor but no anchored specimen`)}const c=i.nav,h=Ps(c,i.playerSpawn.x,i.playerSpawn.z);if(h<0)e.push("the player spawn has no walkable navigation cell");else{const f=new Uint8Array(c.walkable.length),m=Wc(c,h,f),v=Nf(c);m<v&&n.push(`${v-m} walkable cells are isolated from the spawn`);for(const g of i.rooms){const p=(g.minX+g.maxX)/2,y=(g.minZ+g.maxZ)/2,w=Ps(c,p,y);(w<0||!f[w])&&e.push(`room ${g.id} cannot be walked to from the entry`);for(const M of g.enemySpawns){const T=Hc(c,M.entryX,M.entryZ);(T<0||!f[T])&&e.push(`room ${g.id} has an entrance that cannot reach the player`)}}}const u=Zu(i.rooms,{radius:Math.max(0,t.enemyRadius-Sm),height:t.enemyHeight}),d=Ps(u,i.playerSpawn.x,i.playerSpawn.z);if(d<0)e.push("the largest specimen has no walkable cell at the player spawn");else{const f=new Uint8Array(u.walkable.length);Wc(u,d,f);for(const m of i.rooms){const v=(m.minX+m.maxX)/2,g=(m.minZ+m.maxZ)/2,p=Ps(u,v,g);if(p<0||!f[p]){e.push(`room ${m.id} is unreachable by the largest specimen`);continue}for(const y of m.enemySpawns){const w=Hc(u,y.entryX,y.entryZ);(w<0||!f[w])&&e.push(`room ${m.id} has an entrance the largest specimen cannot leave`)}}}return{problems:e,warnings:n}}const Em=12,lh=[4,6,8];function bm(i){const t=Number.isFinite(i)?Math.max(0,i):0;let e=0;for(const n of lh){if(t<n)break;e+=1}return e/lh.length}function wm(i,t){const e=t.now??(()=>0),n=t.maxAttempts??Em,s=e();for(let a=0;a<n;a++){const o=Tm(i,a,t.validation);if(o)return o.report.attempts=a+1,o.report.ms=e()-s,o}const r=Im(i,t.validation);return r.report.attempts=n,r.report.fallback=!0,r.report.ms=e()-s,r}function Tm(i,t,e){const n=t===0?"":`:${t}`,s=Fe(i,`layout${n}`),r=Fe(i,`dressing${n}`),a=Fe(i,`enemies${n}`),o=Ip(s),l=Gp(o,s);if(!l)return null;const c=Am(l,o.startId,o.finalId,o.criticalPath);let h;try{h=fd(i,c.layout,c.startId,c.finalId,c.criticalPath,{layout:s,dressing:r,enemies:a})}catch{return null}const u=dd(h,e);return u.problems.length>0?null:(h.report.warnings=u.warnings,h)}function Am(i,t,e,n){const s=new Map;i.rooms.forEach((o,l)=>s.set(o.id,l));const r=i.rooms.map((o,l)=>({...o,id:l})),a=i.doors.map((o,l)=>({...o,connectionId:l,a:s.get(o.a),b:s.get(o.b)}));return{layout:{rooms:r,doors:a},startId:s.get(t)??0,finalId:s.get(e)??r.length-1,criticalPath:n.filter(o=>s.has(o)).map(o=>s.get(o))}}function fd(i,t,e,n,s,r){const a=new Map;for(const E of t.rooms)a.set(E.id,E);const o=t.rooms.map(E=>({minX:E.minX-Bn,minZ:E.minZ-Bn,maxX:E.maxX+Bn,maxZ:E.maxZ+Bn,owner:E.id})),l=Rm(t.rooms,n),c=new Map;for(const E of t.rooms){const C=E.id===n?"orchestrator":E.id===l?"containmentMachine":null;c.set(E.id,_m(E,Sr[E.archetype],r.enemies,C))}const h=[];for(const E of t.rooms)E.critical&&h.push(c.get(E.id));const u=Mm(h),d=[...c.values()].reduce((E,C)=>E+C.budget,0),f=[];for(const E of t.rooms){const C=[];for(const X of t.doors)X.a===E.id?C.push(ch(X,X.sideA)):X.b===E.id&&C.push(ch(X,sd(X.sideA)));const P=c.get(E.id),D=E.id,W={layout:r.layout,dressing:r.dressing,escalation:bm(E.depth),anchorKind:E.id===n?"orchestrator":E.id===l?"containmentMachine":null,isFree(X,O,H,U){for(const q of o)if(q.owner!==D&&!(H<=q.minX||X>=q.maxX)&&!(U<=q.minZ||O>=q.maxZ))return!1;return!0},reserve(X,O,H,U){o.push({minX:X,minZ:O,maxX:H,maxZ:U,owner:-1})}};f.push(Kp(E,C,P,W))}const m=new Map;for(const E of f)m.set(E.id,E);for(const E of t.doors){const C=a.get(E.a),P=a.get(E.b),D=m.get(Math.min(E.a,E.b));for(const W of $p(C,P,E))D.brushes.push(W)}const v=Zu(f,{radius:Df,height:1.4});let g=Number.POSITIVE_INFINITY,p=Number.POSITIVE_INFINITY,y=Number.NEGATIVE_INFINITY,w=Number.NEGATIVE_INFINITY,M=0,T=0,b=0;const A={};for(const E of f){M+=E.brushes.length,T+=E.contamination.length,E.escalation>b&&(b=E.escalation),A[E.archetype]=(A[E.archetype]??0)+1;for(const C of E.brushes)C.minX<g&&(g=C.minX),C.minZ<p&&(p=C.minZ),C.maxX>y&&(y=C.maxX),C.maxZ>w&&(w=C.maxZ)}const _={seed:i,attempts:1,fallback:!1,rooms:f.length,connections:t.doors.length,loops:t.doors.filter(E=>E.loop).length,brushes:M,threatTotal:d,requiredThreat:u,archetypes:A,escalationPeak:+b.toFixed(3),contamination:T,criticalPath:s.slice(),warnings:[],ms:0};return{seed:i,rooms:f,connections:t.doors.map(E=>({id:E.connectionId,a:E.a,b:E.b,x:E.x,z:E.z,critical:E.critical,loop:E.loop})),startRoomId:e,finalRoomId:n,playerSpawn:Cm(m.get(e)),nav:v,report:_,minX:g,maxX:y,minZ:p,maxZ:w}}function Rm(i,t){const e=i.find(n=>n.id!==t&&n.critical&&(n.archetype==="containment"||n.archetype==="reactor"));if(!e)throw new Error("Facility has no deep non-final combat room for its machine");return e.id}function ch(i,t){return{connectionId:i.connectionId,side:t,x:i.x,z:i.z,halfWidth:i.halfWidth,height:i.height}}function Cm(i){const t=(i.minX+i.maxX)/2,e=(i.minZ+i.maxZ)/2,n=i.doorways[0];if(!n)return{x:t,z:e,yaw:0};const s=Pm(i,n);return{x:t,z:e,yaw:Math.atan2(-(s.x-t),-(s.z-e))}}function Pm(i,t){switch(t.side){case 0:return{x:t.x,z:i.minZ};case 1:return{x:i.maxX,z:t.z};case 2:return{x:t.x,z:i.maxZ};default:return{x:i.minX,z:t.z}}}function Im(i,t){const e=Fe(i,"layout:fallback"),n=Fe(i,"dressing:fallback"),s=Fe(i,"enemies:fallback"),r=[{archetype:"entry",width:14,depth:12,ceiling:4.5},{archetype:"corridor",width:8,depth:18,ceiling:4},{archetype:"lab",width:18,depth:16,ceiling:4.5},{archetype:"junction",width:13,depth:13,ceiling:4.75},{archetype:"storage",width:20,depth:16,ceiling:3.75},{archetype:"gallery",width:10,depth:20,ceiling:4.5},{archetype:"containment",width:22,depth:24,ceiling:5},{archetype:"reactor",width:24,depth:20,ceiling:5.5},{archetype:"chamber",width:26,depth:26,ceiling:5.5}],a=[];let o=r[0].depth/2;for(let d=0;d<r.length;d++){const f=r[d];d>0&&(o=a[d-1].minZ-cn),a.push({id:d,archetype:f.archetype,depth:d,critical:!0,minX:-f.width/2,maxX:f.width/2,minZ:o-f.depth,maxZ:o,ceiling:f.ceiling})}const l=[];for(let d=0;d<a.length-1;d++)l.push({connectionId:d,a:d,b:d+1,sideA:0,x:0,z:a[d].minZ-cn/2,halfWidth:Ua,height:ec,critical:!0,loop:!1});const c=a.map(d=>d.id),h=fd(i,{rooms:a,doors:l},0,a.length-1,c,{layout:e,dressing:n,enemies:s}),u=dd(h,t);if(u.problems.length>0)throw new Error(`the deterministic fallback facility is invalid: ${u.problems.join("; ")}`);return h.report.warnings=u.warnings,h}const sc="185",Lm=0,hh=1,Dm=2,fr=1,Nm=2,or=3,ii=0,Je=1,gn=2,ei=0,Ds=1,bi=2,uh=3,dh=4,pd=5,ti=100,Fm=101,Um=102,Om=103,Bm=104,zm=200,jo=201,km=202,Vm=203,tl=204,gr=205,Gm=206,Hm=207,Wm=208,Xm=209,qm=210,Ym=211,Zm=212,$m=213,Km=214,el=0,nl=1,il=2,Us=3,sl=4,rl=5,al=6,ol=7,rc=0,Jm=1,Qm=2,Hn=0,md=1,gd=2,vd=3,ac=4,xd=5,_d=6,Md=7,yd=300,Wi=301,Os=302,Ja=303,Qa=304,za=306,Xi=1e3,hn=1001,ll=1002,Be=1003,jm=1004,Lr=1005,be=1006,ja=1007,zn=1008,rn=1009,Sd=1010,Ed=1011,vr=1012,oc=1013,qn=1014,Tn=1015,si=1016,lc=1017,cc=1018,xr=1020,bd=35902,wd=35899,Td=1021,Ad=1022,vn=1023,ri=1026,Vi=1027,hc=1028,uc=1029,qi=1030,dc=1031,fc=1033,ma=33776,ga=33777,va=33778,xa=33779,cl=35840,hl=35841,ul=35842,dl=35843,fl=36196,pl=37492,ml=37496,gl=37488,vl=37489,Ta=37490,xl=37491,_l=37808,Ml=37809,yl=37810,Sl=37811,El=37812,bl=37813,wl=37814,Tl=37815,Al=37816,Rl=37817,Cl=37818,Pl=37819,Il=37820,Ll=37821,Dl=36492,Nl=36494,Fl=36495,Ul=36283,Ol=36284,Aa=36285,Bl=36286,t0=3200,Ra=0,e0=1,En="",$e="srgb",Ca="srgb-linear",Pa="linear",Qt="srgb",ss=7680,fh=519,n0=512,i0=513,s0=514,pc=515,r0=516,a0=517,mc=518,o0=519,ph=35044,mh=35048,gh="300 es",kn=2e3,_r=2001;function l0(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ia(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function c0(){const i=Ia("canvas");return i.style.display="block",i}const vh={};function xh(...i){const t="THREE."+i.shift();console.log(t,...i)}function Rd(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Rt(...i){i=Rd(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function qt(...i){i=Rd(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Ns(...i){const t=i.join(" ");t in vh||(vh[t]=!0,Rt(...i))}function h0(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const u0={[el]:nl,[il]:al,[sl]:ol,[Us]:rl,[nl]:el,[al]:il,[ol]:sl,[rl]:Us};class Zi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],to=Math.PI/180,zl=180/Math.PI;function Er(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ve[i&255]+Ve[i>>8&255]+Ve[i>>16&255]+Ve[i>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]).toLowerCase()}function Ht(i,t,e){return Math.max(t,Math.min(e,i))}function d0(i,t){return(i%t+t)%t}function eo(i,t,e){return(1-e)*i+e*t}function Xs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function je(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class It{static{It.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(u!==v||l!==d||c!==f||h!==m){let g=l*d+c*f+h*m+u*v;g<0&&(d=-d,f=-f,m=-m,v=-v,g=-g);let p=1-o;if(g<.9995){const y=Math.acos(g),w=Math.sin(y);p=Math.sin(p*y)/w,o=Math.sin(o*y)/w,l=l*p+d*o,c=c*p+f*o,h=h*p+m*o,u=u*p+v*o}else{l=l*p+d*o,c=c*p+f*o,h=h*p+m*o,u=u*p+v*o;const y=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=y,c*=y,h*=y,u*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-o*f,t[e+2]=c*m+h*f+o*d-l*u,t[e+3]=h*m-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{static{L.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(_h.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(_h.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return no.copy(this).projectOnVector(t),this.sub(no)}reflect(t){return this.sub(no.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const no=new L,_h=new Yn;class Lt{static{Lt.prototype.isMatrix3=!0}constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],v=s[0],g=s[3],p=s[6],y=s[1],w=s[4],M=s[7],T=s[2],b=s[5],A=s[8];return r[0]=a*v+o*y+l*T,r[3]=a*g+o*w+l*b,r[6]=a*p+o*M+l*A,r[1]=c*v+h*y+u*T,r[4]=c*g+h*w+u*b,r[7]=c*p+h*M+u*A,r[2]=d*v+f*y+m*T,r[5]=d*g+f*w+m*b,r[8]=d*p+f*M+m*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=d*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Ns("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(io.makeScale(t,e)),this}rotate(t){return Ns("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(io.makeRotation(-t)),this}translate(t,e){return Ns("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(io.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const io=new Lt,Mh=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yh=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function f0(){const i={enabled:!0,workingColorSpace:Ca,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qt&&(s.r=ni(s.r),s.g=ni(s.g),s.b=ni(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(s.r=Fs(s.r),s.g=Fs(s.g),s.b=Fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===En?Pa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ns("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ns("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ca]:{primaries:t,whitePoint:n,transfer:Pa,toXYZ:Mh,fromXYZ:yh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:t,whitePoint:n,transfer:Qt,toXYZ:Mh,fromXYZ:yh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}}),i}const Gt=f0();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let rs;class p0{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{rs===void 0&&(rs=Ia("canvas")),rs.width=t.width,rs.height=t.height;const s=rs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=rs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ia("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ni(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ni(e[n]/255)*255):e[n]=ni(e[n]);return{data:e,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let m0=0;class gc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:m0++}),this.uuid=Er(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(so(s[a].image)):r.push(so(s[a]))}else r=so(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function so(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?p0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}let g0=0;const ro=new L;class We extends Zi{constructor(t=We.DEFAULT_IMAGE,e=We.DEFAULT_MAPPING,n=hn,s=hn,r=be,a=zn,o=vn,l=rn,c=We.DEFAULT_ANISOTROPY,h=En){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:g0++}),this.uuid=Er(),this.name="",this.source=new gc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ro).x}get height(){return this.source.getSize(ro).y}get depth(){return this.source.getSize(ro).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Rt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Rt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==yd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Xi:t.x=t.x-Math.floor(t.x);break;case hn:t.x=t.x<0?0:1;break;case ll:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Xi:t.y=t.y-Math.floor(t.y);break;case hn:t.y=t.y<0?0:1;break;case ll:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}We.DEFAULT_IMAGE=null;We.DEFAULT_MAPPING=yd;We.DEFAULT_ANISOTROPY=1;class fe{static{fe.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,M=(f+1)/2,T=(p+1)/2,b=(h+d)/4,A=(u+v)/4,_=(m+g)/4;return w>M&&w>T?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=b/n,r=A/n):M>T?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=b/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=A/r,s=_/r),this.set(n,s,r,e),this}let y=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-v)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class v0 extends Zi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:be,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new We(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:be,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new gc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class An extends v0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Cd extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class x0 extends We{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yt{static{Yt.prototype.isMatrix4=!0}constructor(t,e,n,s,r,a,o,l,c,h,u,d,f,m,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,d,f,m,v,g)}set(t,e,n,s,r,a,o,l,c,h,u,d,f,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/as.setFromMatrixColumn(t,0).length(),r=1/as.setFromMatrixColumn(t,1).length(),a=1/as.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,m=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,v=c*u;e[0]=d+v*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,m=o*h,v=o*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=m*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,f=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_0,t,M0)}lookAt(t,e,n){const s=this.elements;return on.subVectors(t,e),on.lengthSq()===0&&(on.z=1),on.normalize(),ui.crossVectors(n,on),ui.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),ui.crossVectors(n,on)),ui.normalize(),Dr.crossVectors(on,ui),s[0]=ui.x,s[4]=Dr.x,s[8]=on.x,s[1]=ui.y,s[5]=Dr.y,s[9]=on.y,s[2]=ui.z,s[6]=Dr.z,s[10]=on.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],y=n[3],w=n[7],M=n[11],T=n[15],b=s[0],A=s[4],_=s[8],E=s[12],C=s[1],P=s[5],D=s[9],W=s[13],X=s[2],O=s[6],H=s[10],U=s[14],q=s[3],tt=s[7],it=s[11],Q=s[15];return r[0]=a*b+o*C+l*X+c*q,r[4]=a*A+o*P+l*O+c*tt,r[8]=a*_+o*D+l*H+c*it,r[12]=a*E+o*W+l*U+c*Q,r[1]=h*b+u*C+d*X+f*q,r[5]=h*A+u*P+d*O+f*tt,r[9]=h*_+u*D+d*H+f*it,r[13]=h*E+u*W+d*U+f*Q,r[2]=m*b+v*C+g*X+p*q,r[6]=m*A+v*P+g*O+p*tt,r[10]=m*_+v*D+g*H+p*it,r[14]=m*E+v*W+g*U+p*Q,r[3]=y*b+w*C+M*X+T*q,r[7]=y*A+w*P+M*O+T*tt,r[11]=y*_+w*D+M*H+T*it,r[15]=y*E+w*W+M*U+T*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],v=t[7],g=t[11],p=t[15],y=l*f-c*d,w=o*f-c*u,M=o*d-l*u,T=a*f-c*h,b=a*d-l*h,A=a*u-o*h;return e*(v*y-g*w+p*M)-n*(m*y-g*T+p*b)+s*(m*w-v*T+p*A)-r*(m*M-v*b+g*A)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],v=t[13],g=t[14],p=t[15],y=e*o-n*a,w=e*l-s*a,M=e*c-r*a,T=n*l-s*o,b=n*c-r*o,A=s*c-r*l,_=h*v-u*m,E=h*g-d*m,C=h*p-f*m,P=u*g-d*v,D=u*p-f*v,W=d*p-f*g,X=y*W-w*D+M*P+T*C-b*E+A*_;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/X;return t[0]=(o*W-l*D+c*P)*O,t[1]=(s*D-n*W-r*P)*O,t[2]=(v*A-g*b+p*T)*O,t[3]=(d*b-u*A-f*T)*O,t[4]=(l*C-a*W-c*E)*O,t[5]=(e*W-s*C+r*E)*O,t[6]=(g*M-m*A-p*w)*O,t[7]=(h*A-d*M+f*w)*O,t[8]=(a*D-o*C+c*_)*O,t[9]=(n*C-e*D-r*_)*O,t[10]=(m*b-v*M+p*y)*O,t[11]=(u*M-h*b-f*y)*O,t[12]=(o*E-a*P-l*_)*O,t[13]=(e*P-n*E+s*_)*O,t[14]=(v*w-m*T-g*y)*O,t[15]=(h*T-u*w+d*y)*O,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,m=r*u,v=a*h,g=a*u,p=o*u,y=l*c,w=l*h,M=l*u,T=n.x,b=n.y,A=n.z;return s[0]=(1-(v+p))*T,s[1]=(f+M)*T,s[2]=(m-w)*T,s[3]=0,s[4]=(f-M)*b,s[5]=(1-(d+p))*b,s[6]=(g+y)*b,s[7]=0,s[8]=(m+w)*A,s[9]=(g-y)*A,s[10]=(1-(d+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=as.set(s[0],s[1],s[2]).length();const o=as.set(s[4],s[5],s[6]).length(),l=as.set(s[8],s[9],s[10]).length();r<0&&(a=-a),_n.copy(this);const c=1/a,h=1/o,u=1/l;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,e.setFromRotationMatrix(_n),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=kn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===kn)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===_r)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=kn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===kn)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===_r)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const as=new L,_n=new Yt,_0=new L(0,0,0),M0=new L(1,1,1),ui=new L,Dr=new L,on=new L,Sh=new Yt,Eh=new Yn;class Rn{constructor(t=0,e=0,n=0,s=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Sh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Sh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Eh.setFromEuler(this),this.setFromQuaternion(Eh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class Pd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let y0=0;const bh=new L,os=new Yn,Zn=new Yt,Nr=new L,qs=new L,S0=new L,E0=new Yn,wh=new L(1,0,0),Th=new L(0,1,0),Ah=new L(0,0,1),Rh={type:"added"},b0={type:"removed"},ls={type:"childadded",child:null},ao={type:"childremoved",child:null};class we extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:y0++}),this.uuid=Er(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new L,e=new Rn,n=new Yn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Yt},normalMatrix:{value:new Lt}}),this.matrix=new Yt,this.matrixWorld=new Yt,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(wh,t)}rotateY(t){return this.rotateOnAxis(Th,t)}rotateZ(t){return this.rotateOnAxis(Ah,t)}translateOnAxis(t,e){return bh.copy(t).applyQuaternion(this.quaternion),this.position.add(bh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wh,t)}translateY(t){return this.translateOnAxis(Th,t)}translateZ(t){return this.translateOnAxis(Ah,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Nr.copy(t):Nr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(qs,Nr,this.up):Zn.lookAt(Nr,qs,this.up),this.quaternion.setFromRotationMatrix(Zn),s&&(Zn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(Zn),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Rh),ls.child=t,this.dispatchEvent(ls),ls.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(b0),ao.child=t,this.dispatchEvent(ao),ao.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Zn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Zn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Rh),ls.child=t,this.dispatchEvent(ls),ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,t,S0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,E0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}we.DEFAULT_UP=new L(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Gi extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const w0={type:"move"};class oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(w0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Gi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},Fr={h:0,s:0,l:0};function lo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ct{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Gt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Gt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Gt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Gt.workingColorSpace){if(t=d0(t,1),e=Ht(e,0,1),n=Ht(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=lo(a,r,t+1/3),this.g=lo(a,r,t),this.b=lo(a,r,t-1/3)}return Gt.colorSpaceToWorking(this,s),this}setStyle(t,e=$e){function n(r){r!==void 0&&parseFloat(r)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const n=Id[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=Fs(t.r),this.g=Fs(t.g),this.b=Fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return Gt.workingToColorSpace(Ge.copy(this),t),Math.round(Ht(Ge.r*255,0,255))*65536+Math.round(Ht(Ge.g*255,0,255))*256+Math.round(Ht(Ge.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Gt.workingColorSpace){Gt.workingToColorSpace(Ge.copy(this),e);const n=Ge.r,s=Ge.g,r=Ge.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Gt.workingColorSpace){return Gt.workingToColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=$e){Gt.workingToColorSpace(Ge.copy(this),t);const e=Ge.r,n=Ge.g,s=Ge.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(di),this.setHSL(di.h+t,di.s+e,di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(di),t.getHSL(Fr);const n=eo(di.h,Fr.h,e),s=eo(di.s,Fr.s,e),r=eo(di.l,Fr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new Ct;Ct.NAMES=Id;class vc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ct(t),this.near=e,this.far=n}clone(){return new vc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class La extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Mn=new L,$n=new L,co=new L,Kn=new L,cs=new L,hs=new L,Ch=new L,ho=new L,uo=new L,fo=new L,po=new fe,mo=new fe,go=new fe;class bn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Mn.subVectors(t,e),s.cross(Mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Mn.subVectors(s,e),$n.subVectors(n,e),co.subVectors(t,e);const a=Mn.dot(Mn),o=Mn.dot($n),l=Mn.dot(co),c=$n.dot($n),h=$n.dot(co),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Kn.x),l.addScaledVector(a,Kn.y),l.addScaledVector(o,Kn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return po.setScalar(0),mo.setScalar(0),go.setScalar(0),po.fromBufferAttribute(t,e),mo.fromBufferAttribute(t,n),go.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(po,r.x),a.addScaledVector(mo,r.y),a.addScaledVector(go,r.z),a}static isFrontFacing(t,e,n,s){return Mn.subVectors(n,e),$n.subVectors(t,e),Mn.cross($n).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),Mn.cross($n).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return bn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return bn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return bn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;cs.subVectors(s,n),hs.subVectors(r,n),ho.subVectors(t,n);const l=cs.dot(ho),c=hs.dot(ho);if(l<=0&&c<=0)return e.copy(n);uo.subVectors(t,s);const h=cs.dot(uo),u=hs.dot(uo);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(cs,a);fo.subVectors(t,r);const f=cs.dot(fo),m=hs.dot(fo);if(m>=0&&f<=m)return e.copy(r);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(hs,o);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Ch.subVectors(r,s),o=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(Ch,o);const p=1/(g+v+d);return a=v*p,o=d*p,e.copy(n).addScaledVector(cs,a).addScaledVector(hs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class $i{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,yn):yn.fromBufferAttribute(r,a),yn.applyMatrix4(t.matrixWorld),this.expandByPoint(yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ur.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ur.copy(n.boundingBox)),Ur.applyMatrix4(t.matrixWorld),this.union(Ur)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,yn),yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ys),Or.subVectors(this.max,Ys),us.subVectors(t.a,Ys),ds.subVectors(t.b,Ys),fs.subVectors(t.c,Ys),fi.subVectors(ds,us),pi.subVectors(fs,ds),Pi.subVectors(us,fs);let e=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Pi.z,Pi.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Pi.z,0,-Pi.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Pi.y,Pi.x,0];return!vo(e,us,ds,fs,Or)||(e=[1,0,0,0,1,0,0,0,1],!vo(e,us,ds,fs,Or))?!1:(Br.crossVectors(fi,pi),e=[Br.x,Br.y,Br.z],vo(e,us,ds,fs,Or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Jn=[new L,new L,new L,new L,new L,new L,new L,new L],yn=new L,Ur=new $i,us=new L,ds=new L,fs=new L,fi=new L,pi=new L,Pi=new L,Ys=new L,Or=new L,Br=new L,Ii=new L;function vo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ii.fromArray(i,r);const o=s.x*Math.abs(Ii.x)+s.y*Math.abs(Ii.y)+s.z*Math.abs(Ii.z),l=t.dot(Ii),c=e.dot(Ii),h=n.dot(Ii);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Ee=new L,zr=new It;let T0=0;class Xe extends Zi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:T0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ph,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zr.fromBufferAttribute(this,e),zr.applyMatrix3(t),this.setXY(e,zr.x,zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=je(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xs(e,this.array)),e}setX(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xs(e,this.array)),e}setY(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xs(e,this.array)),e}setW(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array),s=je(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array),s=je(s,this.array),r=je(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ph&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Ld extends Xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Dd extends Xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class $t extends Xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}const A0=new $i,Zs=new L,xo=new L;class br{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):A0.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zs.subVectors(t,this.center);const e=Zs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Zs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(xo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zs.copy(t.center).add(xo)),this.expandByPoint(Zs.copy(t.center).sub(xo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let R0=0;const fn=new Yt,_o=new we,ps=new L,ln=new $i,$s=new $i,De=new L;class Ie extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=Er(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(l0(t)?Dd:Ld)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Lt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,n){return fn.makeTranslation(t,e,n),this.applyMatrix4(fn),this}scale(t,e,n){return fn.makeScale(t,e,n),this.applyMatrix4(fn),this}lookAt(t){return _o.lookAt(t),_o.updateMatrix(),this.applyMatrix4(_o.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ps).negate(),this.translate(ps.x,ps.y,ps.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $t(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];ln.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new br);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(ln.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];$s.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(ln.min,$s.min),ln.expandByPoint(De),De.addVectors(ln.max,$s.max),ln.expandByPoint(De)):(ln.expandByPoint($s.min),ln.expandByPoint($s.max))}ln.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)De.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(De));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)De.fromBufferAttribute(o,c),l&&(ps.fromBufferAttribute(t,c),De.add(ps)),s=Math.max(s,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Xe(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new L,l[_]=new L;const c=new L,h=new L,u=new L,d=new It,f=new It,m=new It,v=new L,g=new L;function p(_,E,C){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,C),d.fromBufferAttribute(r,_),f.fromBufferAttribute(r,E),m.fromBufferAttribute(r,C),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(P),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),o[_].add(v),o[E].add(v),o[C].add(v),l[_].add(g),l[E].add(g),l[C].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let _=0,E=y.length;_<E;++_){const C=y[_],P=C.start,D=C.count;for(let W=P,X=P+D;W<X;W+=3)p(t.getX(W+0),t.getX(W+1),t.getX(W+2))}const w=new L,M=new L,T=new L,b=new L;function A(_){T.fromBufferAttribute(s,_),b.copy(T);const E=o[_];w.copy(E),w.sub(T.multiplyScalar(T.dot(E))).normalize(),M.crossVectors(b,E);const P=M.dot(l[_])<0?-1:1;a.setXYZW(_,w.x,w.y,w.z,P)}for(let _=0,E=y.length;_<E;++_){const C=y[_],P=C.start,D=C.count;for(let W=P,X=P+D;W<X;W+=3)A(t.getX(W+0)),A(t.getX(W+1)),A(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new Xe(d,h,u)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ie,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let C0=0;class Hs extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=Er(),this.name="",this.type="Material",this.blending=Ds,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tl,this.blendDst=gr,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ct(0,0,0),this.blendAlpha=0,this.depthFunc=Us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Rt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Rt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(n.blending=this.blending),this.side!==ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==tl&&(n.blendSrc=this.blendSrc),this.blendDst!==gr&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Us&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ct().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new It().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new It().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Qn=new L,Mo=new L,kr=new L,mi=new L,yo=new L,Vr=new L,So=new L;class P0{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Qn.copy(this.origin).addScaledVector(this.direction,e),Qn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Mo.copy(t).add(e).multiplyScalar(.5),kr.copy(e).sub(t).normalize(),mi.copy(this.origin).sub(Mo);const r=t.distanceTo(e)*.5,a=-this.direction.dot(kr),o=mi.dot(this.direction),l=-mi.dot(kr),c=mi.lengthSq(),h=Math.abs(1-a*a);let u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Mo).addScaledVector(kr,d),f}intersectSphere(t,e){Qn.subVectors(t.center,this.origin);const n=Qn.dot(this.direction),s=Qn.dot(Qn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Qn)!==null}intersectTriangle(t,e,n,s,r){yo.subVectors(e,t),Vr.subVectors(n,t),So.crossVectors(yo,Vr);let a=this.direction.dot(So),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;mi.subVectors(this.origin,t);const l=o*this.direction.dot(Vr.crossVectors(mi,Vr));if(l<0)return null;const c=o*this.direction.dot(yo.cross(mi));if(c<0||l+c>a)return null;const h=-o*mi.dot(So);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class un extends Hs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ph=new Yt,Li=new P0,Gr=new br,Ih=new L,Hr=new L,Wr=new L,Xr=new L,Eo=new L,qr=new L,Lh=new L,Yr=new L;class jt extends we{constructor(t=new Ie,e=new un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){qr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Eo.fromBufferAttribute(u,t),a?qr.addScaledVector(Eo,h):qr.addScaledVector(Eo.sub(e),h))}e.add(qr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(r),Li.copy(t.ray).recast(t.near),!(Gr.containsPoint(Li.origin)===!1&&(Li.intersectSphere(Gr,Ih)===null||Li.origin.distanceToSquared(Ih)>(t.far-t.near)**2))&&(Ph.copy(r).invert(),Li.copy(t.ray).applyMatrix4(Ph),!(n.boundingBox!==null&&Li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Li)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),w=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let M=y,T=w;M<T;M+=3){const b=o.getX(M),A=o.getX(M+1),_=o.getX(M+2);s=Zr(this,p,t,n,c,h,u,b,A,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const y=o.getX(g),w=o.getX(g+1),M=o.getX(g+2);s=Zr(this,a,t,n,c,h,u,y,w,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),w=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let M=y,T=w;M<T;M+=3){const b=M,A=M+1,_=M+2;s=Zr(this,p,t,n,c,h,u,b,A,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const y=g,w=g+1,M=g+2;s=Zr(this,a,t,n,c,h,u,y,w,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function I0(i,t,e,n,s,r,a,o){let l;if(t.side===Je?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ii,o),l===null)return null;Yr.copy(o),Yr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Yr);return c<e.near||c>e.far?null:{distance:c,point:Yr.clone(),object:i}}function Zr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Hr),i.getVertexPosition(l,Wr),i.getVertexPosition(c,Xr);const h=I0(i,t,e,n,Hr,Wr,Xr,Lh);if(h){const u=new L;bn.getBarycoord(Lh,Hr,Wr,Xr,u),s&&(h.uv=bn.getInterpolatedAttribute(s,o,l,c,u,new It)),r&&(h.uv1=bn.getInterpolatedAttribute(r,o,l,c,u,new It)),a&&(h.normal=bn.getInterpolatedAttribute(a,o,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new L,materialIndex:0};bn.getNormal(Hr,Wr,Xr,d.normal),h.face=d,h.barycoord=u}return h}class Nd extends We{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Be,h=Be,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mr extends Xe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ms=new Yt,Dh=new Yt,$r=[],Nh=new $i,L0=new Yt,Ks=new jt,Js=new br;class Bs extends jt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Mr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,L0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new $i),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),Nh.copy(t.boundingBox).applyMatrix4(ms),this.boundingBox.union(Nh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new br),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),Js.copy(t.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(Js)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ks.geometry=this.geometry,Ks.material=this.material,Ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Js.copy(this.boundingSphere),Js.applyMatrix4(n),t.ray.intersectsSphere(Js)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ms),Dh.multiplyMatrices(n,ms),Ks.matrixWorld=Dh,Ks.raycast(t,$r);for(let a=0,o=$r.length;a<o;a++){const l=$r[a];l.instanceId=r,l.object=this,e.push(l)}$r.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Mr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Nd(new Float32Array(s*this.count),s,this.count,hc,Tn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const bo=new L,D0=new L,N0=new Lt;class Oi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=bo.subVectors(n,e).cross(D0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(bo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||N0.getNormalMatrix(t),s=this.coplanarPoint(bo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new br,F0=new It(.5,.5),Kr=new L;class xc{constructor(t=new Oi,e=new Oi,n=new Oi,s=new Oi,r=new Oi,a=new Oi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=kn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],v=r[9],g=r[10],p=r[11],y=r[12],w=r[13],M=r[14],T=r[15];if(s[0].setComponents(c-a,f-h,p-m,T-y).normalize(),s[1].setComponents(c+a,f+h,p+m,T+y).normalize(),s[2].setComponents(c+o,f+u,p+v,T+w).normalize(),s[3].setComponents(c-o,f-u,p-v,T-w).normalize(),n)s[4].setComponents(l,d,g,M).normalize(),s[5].setComponents(c-l,f-d,p-g,T-M).normalize();else if(s[4].setComponents(c-l,f-d,p-g,T-M).normalize(),e===kn)s[5].setComponents(c+l,f+d,p+g,T+M).normalize();else if(e===_r)s[5].setComponents(l,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(t){Di.center.set(0,0,0);const e=F0.distanceTo(t.center);return Di.radius=.7071067811865476+e,Di.applyMatrix4(t.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Kr.x=s.normal.x>0?t.max.x:t.min.x,Kr.y=s.normal.y>0?t.max.y:t.min.y,Kr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Kr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fd extends We{constructor(t=[],e=Wi,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _c extends We{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zs extends We{constructor(t,e,n=qn,s,r,a,o=Be,l=Be,c,h=ri,u=1){if(h!==ri&&h!==Vi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new gc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class U0 extends zs{constructor(t,e=qn,n=Wi,s,r,a=Be,o=Be,l,c=ri){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Ud extends We{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ve extends Ie{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(u,2));function m(v,g,p,y,w,M,T,b,A,_,E){const C=M/A,P=T/_,D=M/2,W=T/2,X=b/2,O=A+1,H=_+1;let U=0,q=0;const tt=new L;for(let it=0;it<H;it++){const Q=it*P-W;for(let ot=0;ot<O;ot++){const zt=ot*C-D;tt[v]=zt*y,tt[g]=Q*w,tt[p]=X,c.push(tt.x,tt.y,tt.z),tt[v]=0,tt[g]=0,tt[p]=b>0?1:-1,h.push(tt.x,tt.y,tt.z),u.push(ot/A),u.push(1-it/_),U+=1}}for(let it=0;it<_;it++)for(let Q=0;Q<A;Q++){const ot=d+Q+O*it,zt=d+Q+O*(it+1),Kt=d+(Q+1)+O*(it+1),Vt=d+(Q+1)+O*it;l.push(ot,zt,Vt),l.push(zt,Kt,Vt),q+=6}o.addGroup(f,q,E),f+=q,d+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ve(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Mc extends Ie{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new L,h=new It;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(o,3)),this.setAttribute("uv",new $t(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class he extends Ie{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const v=[],g=n/2;let p=0;y(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new $t(u,3)),this.setAttribute("normal",new $t(d,3)),this.setAttribute("uv",new $t(f,2));function y(){const M=new L,T=new L;let b=0;const A=(e-t)/n;for(let _=0;_<=r;_++){const E=[],C=_/r,P=C*(e-t)+t;for(let D=0;D<=s;D++){const W=D/s,X=W*l+o,O=Math.sin(X),H=Math.cos(X);T.x=P*O,T.y=-C*n+g,T.z=P*H,u.push(T.x,T.y,T.z),M.set(O,A,H).normalize(),d.push(M.x,M.y,M.z),f.push(W,1-C),E.push(m++)}v.push(E)}for(let _=0;_<s;_++)for(let E=0;E<r;E++){const C=v[E][_],P=v[E+1][_],D=v[E+1][_+1],W=v[E][_+1];(t>0||E!==0)&&(h.push(C,P,W),b+=3),(e>0||E!==r-1)&&(h.push(P,D,W),b+=3)}c.addGroup(p,b,0),p+=b}function w(M){const T=m,b=new It,A=new L;let _=0;const E=M===!0?t:e,C=M===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,g*C,0),d.push(0,C,0),f.push(.5,.5),m++;const P=m;for(let D=0;D<=s;D++){const X=D/s*l+o,O=Math.cos(X),H=Math.sin(X);A.x=E*H,A.y=g*C,A.z=E*O,u.push(A.x,A.y,A.z),d.push(0,C,0),b.x=O*.5+.5,b.y=H*.5*C+.5,f.push(b.x,b.y),m++}for(let D=0;D<s;D++){const W=T+D,X=P+D;M===!0?h.push(X,X+1,W):h.push(X+1,X,W),_+=3}c.addGroup(p,_,M===!0?1:2),p+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ka extends Ie{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const y=p*d-a;for(let w=0;w<c;w++){const M=w*u-r;m.push(M,-y,0),v.push(0,0,1),g.push(w/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const w=y+c*p,M=y+c*(p+1),T=y+1+c*(p+1),b=y+1+c*p;f.push(w,M,b),f.push(M,T,b)}this.setIndex(f),this.setAttribute("position",new $t(m,3)),this.setAttribute("normal",new $t(v,3)),this.setAttribute("uv",new $t(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ka(t.width,t.height,t.widthSegments,t.heightSegments)}}class yc extends Ie{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let u=t;const d=(e-t)/s,f=new L,m=new It;for(let v=0;v<=s;v++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let v=0;v<s;v++){const g=v*(n+1);for(let p=0;p<n;p++){const y=p+g,w=y,M=y+n+1,T=y+n+2,b=y+1;o.push(w,M,b),o.push(M,T,b)}}this.setIndex(o),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(c,3)),this.setAttribute("uv",new $t(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class wi extends Ie{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new L,d=new L,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const y=[],w=p/n,M=a+w*o,T=t*Math.cos(M),b=Math.sqrt(t*t-T*T);let A=0;p===0&&a===0?A=.5/e:p===n&&l===Math.PI&&(A=-.5/e);for(let _=0;_<=e;_++){const E=_/e,C=s+E*r;u.x=-b*Math.cos(C),u.y=T,u.z=b*Math.sin(C),m.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(E+A,1-w),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const w=h[p][y+1],M=h[p][y],T=h[p+1][y],b=h[p+1][y+1];(p!==0||a>0)&&f.push(w,M,b),(p!==n-1||l<Math.PI)&&f.push(M,T,b)}this.setIndex(f),this.setAttribute("position",new $t(m,3)),this.setAttribute("normal",new $t(v,3)),this.setAttribute("uv",new $t(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Si extends Ie{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],u=[],d=new L,f=new L,m=new L;for(let v=0;v<=n;v++){const g=a+v/n*o;for(let p=0;p<=s;p++){const y=p/s*r;f.x=(t+e*Math.cos(g))*Math.cos(y),f.y=(t+e*Math.cos(g))*Math.sin(y),f.z=e*Math.sin(g),c.push(f.x,f.y,f.z),d.x=t*Math.cos(y),d.y=t*Math.sin(y),m.subVectors(f,d).normalize(),h.push(m.x,m.y,m.z),u.push(p/s),u.push(v/n)}}for(let v=1;v<=n;v++)for(let g=1;g<=s;g++){const p=(s+1)*v+g-1,y=(s+1)*(v-1)+g-1,w=(s+1)*(v-1)+g,M=(s+1)*v+g;l.push(p,y,M),l.push(y,w,M)}this.setIndex(l),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Si(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}function ks(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Fh(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Fh(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ze(i){const t={};for(let e=0;e<i.length;e++){const n=ks(i[e]);for(const s in n)t[s]=n[s]}return t}function Fh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function O0(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Od(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Gt.workingColorSpace}const B0={clone:ks,merge:Ze};var z0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,k0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xn extends Hs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=z0,this.fragmentShader=k0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ks(t.uniforms),this.uniformsGroups=O0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ct().setHex(s.value);break;case"v2":this.uniforms[n].value=new It().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new fe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Lt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Yt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class V0 extends xn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Re extends Hs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ra,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class G0 extends Hs{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ra,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=rc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class H0 extends Hs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=t0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class W0 extends Hs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Sc extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ct(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Uh extends Sc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const wo=new Yt,Oh=new L,Bh=new L;class Bd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new Yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xc,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Oh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Oh),Bh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Bh),e.updateMatrixWorld(),wo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===_r||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Jr=new L,Qr=new Yn,Ln=new L;class zd extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Yt,this.projectionMatrix=new Yt,this.projectionMatrixInverse=new Yt,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Jr,Qr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jr,Qr,Ln.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Jr,Qr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Jr,Qr,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gi=new L,zh=new It,kh=new It;class nn extends zd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=zl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(to*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zl*2*Math.atan(Math.tan(to*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(gi.x,gi.y).multiplyScalar(-t/gi.z),gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gi.x,gi.y).multiplyScalar(-t/gi.z)}getViewSize(t,e){return this.getViewBounds(t,zh,kh),e.subVectors(kh,zh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(to*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class X0 extends Bd{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0}}class Ec extends Sc{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new X0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Va extends zd{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class q0 extends Bd{constructor(){super(new Va(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vh extends Sc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new q0}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class Y0 extends Ie{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}const gs=-90,vs=1;class Z0 extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(gs,vs,t,e);s.layers=this.layers,this.add(s);const r=new nn(gs,vs,t,e);r.layers=this.layers,this.add(r);const a=new nn(gs,vs,t,e);a.layers=this.layers,this.add(a);const o=new nn(gs,vs,t,e);o.layers=this.layers,this.add(o);const l=new nn(gs,vs,t,e);l.layers=this.layers,this.add(l);const c=new nn(gs,vs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===kn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_r)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class $0 extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class kd{static{kd.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}}function Gh(i,t,e,n){const s=K0(n);switch(e){case Td:return i*t;case hc:return i*t/s.components*s.byteLength;case uc:return i*t/s.components*s.byteLength;case qi:return i*t*2/s.components*s.byteLength;case dc:return i*t*2/s.components*s.byteLength;case Ad:return i*t*3/s.components*s.byteLength;case vn:return i*t*4/s.components*s.byteLength;case fc:return i*t*4/s.components*s.byteLength;case ma:case ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case va:case xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case hl:case dl:return Math.max(i,16)*Math.max(t,8)/4;case cl:case ul:return Math.max(i,8)*Math.max(t,8)/2;case fl:case pl:case gl:case vl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ml:case Ta:case xl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case _l:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ml:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case yl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Sl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case El:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case wl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Tl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Al:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Rl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Cl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Pl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Il:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ll:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Dl:case Nl:case Fl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ul:case Ol:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Aa:case Bl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function K0(i){switch(i){case rn:case Sd:return{byteLength:1,components:1};case vr:case Ed:case si:return{byteLength:2,components:1};case lc:case cc:return{byteLength:2,components:4};case qn:case oc:case Tn:return{byteLength:4,components:1};case bd:case wd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sc}}));typeof window<"u"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sc);function Vd(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function J0(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],v=u[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const v=u[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Q0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,j0=`#ifdef USE_ALPHAHASH
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
#endif`,tg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,eg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ng=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ig=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sg=`#ifdef USE_AOMAP
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
#endif`,rg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ag=`#ifdef USE_BATCHING
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
#endif`,og=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ug=`#ifdef USE_IRIDESCENCE
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
#endif`,dg=`#ifdef USE_BUMPMAP
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
#endif`,fg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,xg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_g=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Mg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,yg=`#define PI 3.141592653589793
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
} // validated`,Sg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Eg=`vec3 transformedNormal = objectNormal;
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
#endif`,bg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ag=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pg=`#ifdef USE_ENVMAP
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
#endif`,Ig=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Lg=`#ifdef USE_ENVMAP
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
#endif`,Dg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ng=`#ifdef USE_ENVMAP
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
#endif`,Fg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ug=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Og=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zg=`#ifdef USE_GRADIENTMAP
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
}`,kg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Wg=`#ifdef USE_ENVMAP
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
#endif`,Xg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$g=`PhysicalMaterial material;
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
#endif`,Kg=`uniform sampler2D dfgLUT;
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
}`,Jg=`
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
#endif`,Qg=`#if defined( RE_IndirectDiffuse )
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
#endif`,jg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tv=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,ev=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,av=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ov=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lv=`#if defined( USE_POINTS_UV )
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
#endif`,cv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pv=`#ifdef USE_MORPHTARGETS
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
#endif`,mv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_v=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,yv=`#ifdef USE_NORMALMAP
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
#endif`,Sv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ev=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Av=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Rv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Iv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Uv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ov=`float getShadowMask() {
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
}`,Bv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zv=`#ifdef USE_SKINNING
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
#endif`,kv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vv=`#ifdef USE_SKINNING
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
#endif`,Gv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qv=`#ifdef USE_TRANSMISSION
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
#endif`,Yv=`#ifdef USE_TRANSMISSION
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
#endif`,Zv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jv=`uniform sampler2D t2D;
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
}`,tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ex=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ix=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sx=`#include <common>
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
}`,rx=`#if DEPTH_PACKING == 3200
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
}`,ax=`#define DISTANCE
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
}`,ox=`#define DISTANCE
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
}`,lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hx=`uniform float scale;
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
}`,ux=`uniform vec3 diffuse;
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
}`,dx=`#include <common>
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
}`,fx=`uniform vec3 diffuse;
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
}`,px=`#define LAMBERT
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
}`,mx=`#define LAMBERT
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
}`,gx=`#define MATCAP
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
}`,vx=`#define MATCAP
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
}`,xx=`#define NORMAL
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
}`,_x=`#define NORMAL
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
}`,Mx=`#define PHONG
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
}`,yx=`#define PHONG
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
}`,Sx=`#define STANDARD
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
}`,Ex=`#define STANDARD
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
}`,bx=`#define TOON
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
}`,wx=`#define TOON
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
}`,Tx=`uniform float size;
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
}`,Ax=`uniform vec3 diffuse;
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
}`,Rx=`#include <common>
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
}`,Cx=`uniform vec3 color;
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
}`,Px=`uniform float rotation;
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
}`,Ix=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:Q0,alphahash_pars_fragment:j0,alphamap_fragment:tg,alphamap_pars_fragment:eg,alphatest_fragment:ng,alphatest_pars_fragment:ig,aomap_fragment:sg,aomap_pars_fragment:rg,batching_pars_vertex:ag,batching_vertex:og,begin_vertex:lg,beginnormal_vertex:cg,bsdfs:hg,iridescence_fragment:ug,bumpmap_pars_fragment:dg,clipping_planes_fragment:fg,clipping_planes_pars_fragment:pg,clipping_planes_pars_vertex:mg,clipping_planes_vertex:gg,color_fragment:vg,color_pars_fragment:xg,color_pars_vertex:_g,color_vertex:Mg,common:yg,cube_uv_reflection_fragment:Sg,defaultnormal_vertex:Eg,displacementmap_pars_vertex:bg,displacementmap_vertex:wg,emissivemap_fragment:Tg,emissivemap_pars_fragment:Ag,colorspace_fragment:Rg,colorspace_pars_fragment:Cg,envmap_fragment:Pg,envmap_common_pars_fragment:Ig,envmap_pars_fragment:Lg,envmap_pars_vertex:Dg,envmap_physical_pars_fragment:Wg,envmap_vertex:Ng,fog_vertex:Fg,fog_pars_vertex:Ug,fog_fragment:Og,fog_pars_fragment:Bg,gradientmap_pars_fragment:zg,lightmap_pars_fragment:kg,lights_lambert_fragment:Vg,lights_lambert_pars_fragment:Gg,lights_pars_begin:Hg,lights_toon_fragment:Xg,lights_toon_pars_fragment:qg,lights_phong_fragment:Yg,lights_phong_pars_fragment:Zg,lights_physical_fragment:$g,lights_physical_pars_fragment:Kg,lights_fragment_begin:Jg,lights_fragment_maps:Qg,lights_fragment_end:jg,lightprobes_pars_fragment:tv,logdepthbuf_fragment:ev,logdepthbuf_pars_fragment:nv,logdepthbuf_pars_vertex:iv,logdepthbuf_vertex:sv,map_fragment:rv,map_pars_fragment:av,map_particle_fragment:ov,map_particle_pars_fragment:lv,metalnessmap_fragment:cv,metalnessmap_pars_fragment:hv,morphinstance_vertex:uv,morphcolor_vertex:dv,morphnormal_vertex:fv,morphtarget_pars_vertex:pv,morphtarget_vertex:mv,normal_fragment_begin:gv,normal_fragment_maps:vv,normal_pars_fragment:xv,normal_pars_vertex:_v,normal_vertex:Mv,normalmap_pars_fragment:yv,clearcoat_normal_fragment_begin:Sv,clearcoat_normal_fragment_maps:Ev,clearcoat_pars_fragment:bv,iridescence_pars_fragment:wv,opaque_fragment:Tv,packing:Av,premultiplied_alpha_fragment:Rv,project_vertex:Cv,dithering_fragment:Pv,dithering_pars_fragment:Iv,roughnessmap_fragment:Lv,roughnessmap_pars_fragment:Dv,shadowmap_pars_fragment:Nv,shadowmap_pars_vertex:Fv,shadowmap_vertex:Uv,shadowmask_pars_fragment:Ov,skinbase_vertex:Bv,skinning_pars_vertex:zv,skinning_vertex:kv,skinnormal_vertex:Vv,specularmap_fragment:Gv,specularmap_pars_fragment:Hv,tonemapping_fragment:Wv,tonemapping_pars_fragment:Xv,transmission_fragment:qv,transmission_pars_fragment:Yv,uv_pars_fragment:Zv,uv_pars_vertex:$v,uv_vertex:Kv,worldpos_vertex:Jv,background_vert:Qv,background_frag:jv,backgroundCube_vert:tx,backgroundCube_frag:ex,cube_vert:nx,cube_frag:ix,depth_vert:sx,depth_frag:rx,distance_vert:ax,distance_frag:ox,equirect_vert:lx,equirect_frag:cx,linedashed_vert:hx,linedashed_frag:ux,meshbasic_vert:dx,meshbasic_frag:fx,meshlambert_vert:px,meshlambert_frag:mx,meshmatcap_vert:gx,meshmatcap_frag:vx,meshnormal_vert:xx,meshnormal_frag:_x,meshphong_vert:Mx,meshphong_frag:yx,meshphysical_vert:Sx,meshphysical_frag:Ex,meshtoon_vert:bx,meshtoon_frag:wx,points_vert:Tx,points_frag:Ax,shadow_vert:Rx,shadow_frag:Cx,sprite_vert:Px,sprite_frag:Ix},dt={common:{diffuse:{value:new Ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Ct(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Fn={basic:{uniforms:Ze([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Ze([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ct(0)},envMapIntensity:{value:1}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Ze([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ct(0)},specular:{value:new Ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Ze([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Ze([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Ct(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Ze([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Ze([dt.points,dt.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Ze([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Ze([dt.common,dt.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Ze([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Ze([dt.sprite,dt.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distance:{uniforms:Ze([dt.common,dt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distance_vert,fragmentShader:Ot.distance_frag},shadow:{uniforms:Ze([dt.lights,dt.fog,{color:{value:new Ct(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};Fn.physical={uniforms:Ze([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Ct(0)},specularColor:{value:new Ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const jr={r:0,b:0,g:0},Lx=new Yt,Gd=new Lt;Gd.set(-1,0,0,0,1,0,0,0,1);function Dx(i,t,e,n,s,r){const a=new Ct(0);let o=s===!0?0:1,l,c,h=null,u=0,d=null;function f(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){const M=y.backgroundBlurriness>0;w=t.get(w,M)}return w}function m(y){let w=!1;const M=f(y);M===null?g(a,o):M&&M.isColor&&(g(M,1),w=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(y,w){const M=f(w);M&&(M.isCubeTexture||M.mapping===za)?(c===void 0&&(c=new jt(new ve(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:ks(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Lx.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Gd),c.material.toneMapped=Gt.getTransfer(M.colorSpace)!==Qt,(h!==M||u!==M.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new jt(new ka(2,2),new xn({name:"BackgroundMaterial",uniforms:ks(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Gt.getTransfer(M.colorSpace)!==Qt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,w){y.getRGB(jr,Od(i)),e.buffers.color.setClear(jr.r,jr.g,jr.b,w,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,g(a,o)},render:m,addToRenderList:v,dispose:p}}function Nx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(P,D,W,X,O){let H=!1;const U=u(P,X,W,D);r!==U&&(r=U,c(r.object)),H=f(P,X,W,O),H&&m(P,X,W,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,M(P,D,W,X),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function u(P,D,W,X){const O=X.wireframe===!0;let H=n[D.id];H===void 0&&(H={},n[D.id]=H);const U=P.isInstancedMesh===!0?P.id:0;let q=H[U];q===void 0&&(q={},H[U]=q);let tt=q[W.id];tt===void 0&&(tt={},q[W.id]=tt);let it=tt[O];return it===void 0&&(it=d(l()),tt[O]=it),it}function d(P){const D=[],W=[],X=[];for(let O=0;O<e;O++)D[O]=0,W[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:W,attributeDivisors:X,object:P,attributes:{},index:null}}function f(P,D,W,X){const O=r.attributes,H=D.attributes;let U=0;const q=W.getAttributes();for(const tt in q)if(q[tt].location>=0){const Q=O[tt];let ot=H[tt];if(ot===void 0&&(tt==="instanceMatrix"&&P.instanceMatrix&&(ot=P.instanceMatrix),tt==="instanceColor"&&P.instanceColor&&(ot=P.instanceColor)),Q===void 0||Q.attribute!==ot||ot&&Q.data!==ot.data)return!0;U++}return r.attributesNum!==U||r.index!==X}function m(P,D,W,X){const O={},H=D.attributes;let U=0;const q=W.getAttributes();for(const tt in q)if(q[tt].location>=0){let Q=H[tt];Q===void 0&&(tt==="instanceMatrix"&&P.instanceMatrix&&(Q=P.instanceMatrix),tt==="instanceColor"&&P.instanceColor&&(Q=P.instanceColor));const ot={};ot.attribute=Q,Q&&Q.data&&(ot.data=Q.data),O[tt]=ot,U++}r.attributes=O,r.attributesNum=U,r.index=X}function v(){const P=r.newAttributes;for(let D=0,W=P.length;D<W;D++)P[D]=0}function g(P){p(P,0)}function p(P,D){const W=r.newAttributes,X=r.enabledAttributes,O=r.attributeDivisors;W[P]=1,X[P]===0&&(i.enableVertexAttribArray(P),X[P]=1),O[P]!==D&&(i.vertexAttribDivisor(P,D),O[P]=D)}function y(){const P=r.newAttributes,D=r.enabledAttributes;for(let W=0,X=D.length;W<X;W++)D[W]!==P[W]&&(i.disableVertexAttribArray(W),D[W]=0)}function w(P,D,W,X,O,H,U){U===!0?i.vertexAttribIPointer(P,D,W,O,H):i.vertexAttribPointer(P,D,W,X,O,H)}function M(P,D,W,X){v();const O=X.attributes,H=W.getAttributes(),U=D.defaultAttributeValues;for(const q in H){const tt=H[q];if(tt.location>=0){let it=O[q];if(it===void 0&&(q==="instanceMatrix"&&P.instanceMatrix&&(it=P.instanceMatrix),q==="instanceColor"&&P.instanceColor&&(it=P.instanceColor)),it!==void 0){const Q=it.normalized,ot=it.itemSize,zt=t.get(it);if(zt===void 0)continue;const Kt=zt.buffer,Vt=zt.type,J=zt.bytesPerElement,rt=Vt===i.INT||Vt===i.UNSIGNED_INT||it.gpuType===oc;if(it.isInterleavedBufferAttribute){const et=it.data,Pt=et.stride,Dt=it.offset;if(et.isInstancedInterleavedBuffer){for(let Tt=0;Tt<tt.locationSize;Tt++)p(tt.location+Tt,et.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Tt=0;Tt<tt.locationSize;Tt++)g(tt.location+Tt);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let Tt=0;Tt<tt.locationSize;Tt++)w(tt.location+Tt,ot/tt.locationSize,Vt,Q,Pt*J,(Dt+ot/tt.locationSize*Tt)*J,rt)}else{if(it.isInstancedBufferAttribute){for(let et=0;et<tt.locationSize;et++)p(tt.location+et,it.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let et=0;et<tt.locationSize;et++)g(tt.location+et);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let et=0;et<tt.locationSize;et++)w(tt.location+et,ot/tt.locationSize,Vt,Q,ot*J,ot/tt.locationSize*et*J,rt)}}else if(U!==void 0){const Q=U[q];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(tt.location,Q);break;case 3:i.vertexAttrib3fv(tt.location,Q);break;case 4:i.vertexAttrib4fv(tt.location,Q);break;default:i.vertexAttrib1fv(tt.location,Q)}}}}y()}function T(){E();for(const P in n){const D=n[P];for(const W in D){const X=D[W];for(const O in X){const H=X[O];for(const U in H)h(H[U].object),delete H[U];delete X[O]}}delete n[P]}}function b(P){if(n[P.id]===void 0)return;const D=n[P.id];for(const W in D){const X=D[W];for(const O in X){const H=X[O];for(const U in H)h(H[U].object),delete H[U];delete X[O]}}delete n[P.id]}function A(P){for(const D in n){const W=n[D];for(const X in W){const O=W[X];if(O[P.id]===void 0)continue;const H=O[P.id];for(const U in H)h(H[U].object),delete H[U];delete O[P.id]}}}function _(P){for(const D in n){const W=n[D],X=P.isInstancedMesh===!0?P.id:0,O=W[X];if(O!==void 0){for(const H in O){const U=O[H];for(const q in U)h(U[q].object),delete U[q];delete O[H]}delete W[X],Object.keys(W).length===0&&delete n[D]}}}function E(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:C,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:y}}function Fx(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ux(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==vn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===si&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==rn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Tn&&!_)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Rt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:M,maxSamples:T,samples:b}}function Ox(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Oi,o=new Lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const y=r?0:n,w=y*4;let M=p.clippingState||null;l.value=M,M=h(m,d,w,f);for(let T=0;T!==w;++T)M[T]=e[T];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let w=0,M=f;w!==v;++w,M+=4)a.copy(u[w]).applyMatrix4(y,o),a.normal.toArray(g,M),g[M+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}const Ei=4,Hh=[.125,.215,.35,.446,.526,.582],Bi=20,Bx=256,Qs=new Va,Wh=new Ct;let To=null,Ao=0,Ro=0,Co=!1;const zx=new L;class kl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=zx}=r;To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(To,Ao,Ro),this._renderer.xr.enabled=Co,t.scissorTest=!1,xs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===Os?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:be,minFilter:be,generateMipmaps:!1,type:si,format:vn,colorSpace:Ca,depthBuffer:!1},s=Xh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xh(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=kx(r)),this._blurMaterial=Gx(r,t,e),this._ggxMaterial=Vx(r,t,e)}return s}_compileMaterial(t){const e=new jt(new Ie,t);this._renderer.compile(e,Qs)}_sceneToCubeUV(t,e,n,s,r){const l=new nn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Wh),u.toneMapping=Hn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jt(new ve,new un({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let p=!1;const y=t.background;y?y.isColor&&(g.color.copy(y),t.background=null,p=!0):(g.color.copy(Wh),p=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const T=this._cubeSize;xs(s,M*T,w>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(v,l),u.render(t,l)}u.toneMapping=f,u.autoClear=d,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Wi||t.mapping===Os;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;xs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Qs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:m}=this,v=this._sizeLods[n],g=3*v*(n>m-Ei?n-m+Ei:0),p=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=m-e,xs(r,g,p,3*v,2*v),s.setRenderTarget(r),s.render(o,Qs),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,xs(t,g,p,3*v,2*v),s.setRenderTarget(t),s.render(o,Qs)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&qt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Bi-1),v=r/m,g=isFinite(r)?1+Math.floor(h*v):Bi;g>Bi&&Rt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Bi}`);const p=[];let y=0;for(let A=0;A<Bi;++A){const _=A/v,E=Math.exp(-_*_/2);p.push(E),A===0?y+=E:A<g&&(y+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:w}=this;d.dTheta.value=m,d.mipInt.value=w-n;const M=this._sizeLods[s],T=3*M*(s>w-Ei?s-w+Ei:0),b=4*(this._cubeSize-M);xs(e,T,b,3*M,2*M),l.setRenderTarget(e),l.render(u,Qs)}}function kx(i){const t=[],e=[],n=[];let s=i;const r=i-Ei+1+Hh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Ei?l=Hh[a-i+Ei-1]:a===0&&(l=0),e.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,v=3,g=2,p=1,y=new Float32Array(v*m*f),w=new Float32Array(g*m*f),M=new Float32Array(p*m*f);for(let b=0;b<f;b++){const A=b%3*2/3-1,_=b>2?0:-1,E=[A,_,0,A+2/3,_,0,A+2/3,_+1,0,A,_,0,A+2/3,_+1,0,A,_+1,0];y.set(E,v*m*b),w.set(d,g*m*b);const C=[b,b,b,b,b,b];M.set(C,p*m*b)}const T=new Ie;T.setAttribute("position",new Xe(y,v)),T.setAttribute("uv",new Xe(w,g)),T.setAttribute("faceIndex",new Xe(M,p)),n.push(new jt(T,null)),s>Ei&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Xh(i,t,e){const n=new An(i,t,e);return n.texture.mapping=za,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Vx(i,t,e){return new xn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Bx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Gx(i,t,e){const n=new Float32Array(Bi),s=new L(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function qh(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Yh(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ga(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Ga(){return`

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
	`}class Hd extends An{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Fd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ve(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:ei});r.uniforms.tEquirect.value=e;const a=new jt(s,r),o=e.minFilter;return e.minFilter===zn&&(e.minFilter=be),new Z0(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}function Hx(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===Ja||f===Qa)if(t.has(d)){const m=t.get(d).texture;return o(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const v=new Hd(m.height);return v.fromEquirectangularTexture(i,d),t.set(d,v),d.addEventListener("dispose",c),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,m=f===Ja||f===Qa,v=f===Wi||f===Os;if(m||v){let g=e.get(d);const p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new kl(i)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{const y=d.image;return m&&y&&y.height>0||v&&y&&l(y)?(n===null&&(n=new kl(i)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,f){return f===Ja?d.mapping=Wi:f===Qa&&(d.mapping=Os),d}function l(d){let f=0;const m=6;for(let v=0;v<m;v++)d[v]!==void 0&&f++;return f===m}function c(d){const f=d.target;f.removeEventListener("dispose",c);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Wx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ns("WebGLRenderer: "+n+" extension not supported."),s}}}function Xx(i,t,e,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let v=0;if(m===void 0)return;if(f!==null){const y=f.array;v=f.version;for(let w=0,M=y.length;w<M;w+=3){const T=y[w+0],b=y[w+1],A=y[w+2];d.push(T,b,b,A,A,T)}}else{const y=m.array;v=m.version;for(let w=0,M=y.length/3-1;w<M;w+=3){const T=w+0,b=w+1,A=w+2;d.push(T,b,b,A,A,T)}}const g=new(m.count>=65535?Dd:Ld)(d,1);g.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function qx(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){i.drawElements(n,d,r,u*a),e.update(d,n,1)}function c(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*a,f),e.update(d,n,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let v=0;for(let g=0;g<f;g++)v+=d[g];e.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Yx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:qt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Zx(i,t,e){const n=new WeakMap,s=new fe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let C=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",C)};var f=C;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let M=0;m===!0&&(M=1),v===!0&&(M=2),g===!0&&(M=3);let T=o.attributes.position.count*M,b=1;T>t.maxTextureSize&&(b=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const A=new Float32Array(T*b*4*u),_=new Cd(A,T,b,u);_.type=Tn,_.needsUpdate=!0;const E=M*4;for(let P=0;P<u;P++){const D=p[P],W=y[P],X=w[P],O=T*b*4*P;for(let H=0;H<D.count;H++){const U=H*E;m===!0&&(s.fromBufferAttribute(D,H),A[O+U+0]=s.x,A[O+U+1]=s.y,A[O+U+2]=s.z,A[O+U+3]=0),v===!0&&(s.fromBufferAttribute(W,H),A[O+U+4]=s.x,A[O+U+5]=s.y,A[O+U+6]=s.z,A[O+U+7]=0),g===!0&&(s.fromBufferAttribute(X,H),A[O+U+8]=s.x,A[O+U+9]=s.y,A[O+U+10]=s.z,A[O+U+11]=X.itemSize===4?s.w:1)}}d={count:u,texture:_,size:new It(T,b)},n.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function $x(i,t,e,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Kx={[md]:"LINEAR_TONE_MAPPING",[gd]:"REINHARD_TONE_MAPPING",[vd]:"CINEON_TONE_MAPPING",[ac]:"ACES_FILMIC_TONE_MAPPING",[_d]:"AGX_TONE_MAPPING",[Md]:"NEUTRAL_TONE_MAPPING",[xd]:"CUSTOM_TONE_MAPPING"};function Jx(i,t,e,n,s,r){const a=new An(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new zs(t,e):void 0}),o=new An(t,e,{type:si,depthBuffer:!1,stencilBuffer:!1}),l=new Ie;l.setAttribute("position",new $t([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new $t([0,2,0,0,2,0],2));const c=new V0({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new jt(l,c),u=new Va(-1,1,1,-1,0,1);let d=null,f=null,m=!1,v,g=null,p=[],y=!1;this.setSize=function(w,M){a.setSize(w,M),o.setSize(w,M);for(let T=0;T<p.length;T++){const b=p[T];b.setSize&&b.setSize(w,M)}},this.setEffects=function(w){p=w,y=p.length>0&&p[0].isRenderPass===!0;const M=a.width,T=a.height;for(let b=0;b<p.length;b++){const A=p[b];A.setSize&&A.setSize(M,T)}},this.begin=function(w,M){if(m||w.toneMapping===Hn&&p.length===0)return!1;if(g=M,M!==null){const T=M.width,b=M.height;(a.width!==T||a.height!==b)&&this.setSize(T,b)}return y===!1&&w.setRenderTarget(a),v=w.toneMapping,w.toneMapping=Hn,!0},this.hasRenderPass=function(){return y},this.end=function(w,M){w.toneMapping=v,m=!0;let T=a,b=o;for(let A=0;A<p.length;A++){const _=p[A];if(_.enabled!==!1&&(_.render(w,b,T,M),_.needsSwap!==!1)){const E=T;T=b,b=E}}if(d!==w.outputColorSpace||f!==w.toneMapping){d=w.outputColorSpace,f=w.toneMapping,c.defines={},Gt.getTransfer(d)===Qt&&(c.defines.SRGB_TRANSFER="");const A=Kx[f];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,w.setRenderTarget(g),w.render(h,u),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Wd=new We,Vl=new zs(1,1),Xd=new Cd,qd=new x0,Yd=new Fd,Zh=[],$h=[],Kh=new Float32Array(16),Jh=new Float32Array(9),Qh=new Float32Array(4);function Ws(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Zh[s];if(r===void 0&&(r=new Float32Array(s),Zh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Pe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ha(i,t){let e=$h[t];e===void 0&&(e=new Int32Array(t),$h[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Qx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function jx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2fv(this.addr,t),Pe(e,t)}}function t_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;i.uniform3fv(this.addr,t),Pe(e,t)}}function e_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4fv(this.addr,t),Pe(e,t)}}function n_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Qh.set(n),i.uniformMatrix2fv(this.addr,!1,Qh),Pe(e,n)}}function i_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Jh.set(n),i.uniformMatrix3fv(this.addr,!1,Jh),Pe(e,n)}}function s_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Kh.set(n),i.uniformMatrix4fv(this.addr,!1,Kh),Pe(e,n)}}function r_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function a_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2iv(this.addr,t),Pe(e,t)}}function o_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3iv(this.addr,t),Pe(e,t)}}function l_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4iv(this.addr,t),Pe(e,t)}}function c_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function h_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2uiv(this.addr,t),Pe(e,t)}}function u_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3uiv(this.addr,t),Pe(e,t)}}function d_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4uiv(this.addr,t),Pe(e,t)}}function f_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Vl.compareFunction=e.isReversedDepthBuffer()?mc:pc,r=Vl):r=Wd,e.setTexture2D(t||r,s)}function p_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||qd,s)}function m_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Yd,s)}function g_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Xd,s)}function v_(i){switch(i){case 5126:return Qx;case 35664:return jx;case 35665:return t_;case 35666:return e_;case 35674:return n_;case 35675:return i_;case 35676:return s_;case 5124:case 35670:return r_;case 35667:case 35671:return a_;case 35668:case 35672:return o_;case 35669:case 35673:return l_;case 5125:return c_;case 36294:return h_;case 36295:return u_;case 36296:return d_;case 35678:case 36198:case 36298:case 36306:case 35682:return f_;case 35679:case 36299:case 36307:return p_;case 35680:case 36300:case 36308:case 36293:return m_;case 36289:case 36303:case 36311:case 36292:return g_}}function x_(i,t){i.uniform1fv(this.addr,t)}function __(i,t){const e=Ws(t,this.size,2);i.uniform2fv(this.addr,e)}function M_(i,t){const e=Ws(t,this.size,3);i.uniform3fv(this.addr,e)}function y_(i,t){const e=Ws(t,this.size,4);i.uniform4fv(this.addr,e)}function S_(i,t){const e=Ws(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function E_(i,t){const e=Ws(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function b_(i,t){const e=Ws(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function w_(i,t){i.uniform1iv(this.addr,t)}function T_(i,t){i.uniform2iv(this.addr,t)}function A_(i,t){i.uniform3iv(this.addr,t)}function R_(i,t){i.uniform4iv(this.addr,t)}function C_(i,t){i.uniform1uiv(this.addr,t)}function P_(i,t){i.uniform2uiv(this.addr,t)}function I_(i,t){i.uniform3uiv(this.addr,t)}function L_(i,t){i.uniform4uiv(this.addr,t)}function D_(i,t,e){const n=this.cache,s=t.length,r=Ha(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Vl:a=Wd;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function N_(i,t,e){const n=this.cache,s=t.length,r=Ha(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||qd,r[a])}function F_(i,t,e){const n=this.cache,s=t.length,r=Ha(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Yd,r[a])}function U_(i,t,e){const n=this.cache,s=t.length,r=Ha(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Xd,r[a])}function O_(i){switch(i){case 5126:return x_;case 35664:return __;case 35665:return M_;case 35666:return y_;case 35674:return S_;case 35675:return E_;case 35676:return b_;case 5124:case 35670:return w_;case 35667:case 35671:return T_;case 35668:case 35672:return A_;case 35669:case 35673:return R_;case 5125:return C_;case 36294:return P_;case 36295:return I_;case 36296:return L_;case 35678:case 36198:case 36298:case 36306:case 35682:return D_;case 35679:case 36299:case 36307:return N_;case 35680:case 36300:case 36308:case 36293:return F_;case 36289:case 36303:case 36311:case 36292:return U_}}class B_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=v_(e.type)}}class z_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=O_(e.type)}}class k_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Po=/(\w+)(\])?(\[|\.)?/g;function jh(i,t){i.seq.push(t),i.map[t.id]=t}function V_(i,t,e){const n=i.name,s=n.length;for(Po.lastIndex=0;;){const r=Po.exec(n),a=Po.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){jh(e,c===void 0?new B_(o,i,t):new z_(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new k_(o),jh(e,u)),e=u}}}class _a{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);V_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function tu(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const G_=37297;let H_=0;function W_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const eu=new Lt;function X_(i){Gt._getMatrix(eu,Gt.workingColorSpace,i);const t=`mat3( ${eu.elements.map(e=>e.toFixed(4))} )`;switch(Gt.getTransfer(i)){case Pa:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function nu(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+W_(i.getShaderSource(t),o)}else return r}function q_(i,t){const e=X_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Y_={[md]:"Linear",[gd]:"Reinhard",[vd]:"Cineon",[ac]:"ACESFilmic",[_d]:"AgX",[Md]:"Neutral",[xd]:"Custom"};function Z_(i,t){const e=Y_[t];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ta=new L;function $_(){Gt.getLuminanceCoefficients(ta);const i=ta.x.toFixed(4),t=ta.y.toFixed(4),e=ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function K_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function J_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Q_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function lr(i){return i!==""}function iu(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function su(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const j_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gl(i){return i.replace(j_,eM)}const tM=new Map;function eM(i,t){let e=Ot[t];if(e===void 0){const n=tM.get(t);if(n!==void 0)e=Ot[n],Rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Gl(e)}const nM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ru(i){return i.replace(nM,iM)}function iM(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function au(i){let t=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const sM={[fr]:"SHADOWMAP_TYPE_PCF",[or]:"SHADOWMAP_TYPE_VSM"};function rM(i){return sM[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const aM={[Wi]:"ENVMAP_TYPE_CUBE",[Os]:"ENVMAP_TYPE_CUBE",[za]:"ENVMAP_TYPE_CUBE_UV"};function oM(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":aM[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const lM={[Os]:"ENVMAP_MODE_REFRACTION"};function cM(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":lM[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const hM={[rc]:"ENVMAP_BLENDING_MULTIPLY",[Jm]:"ENVMAP_BLENDING_MIX",[Qm]:"ENVMAP_BLENDING_ADD"};function uM(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":hM[i.combine]||"ENVMAP_BLENDING_NONE"}function dM(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function fM(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=rM(e),c=oM(e),h=cM(e),u=uM(e),d=dM(e),f=K_(e),m=J_(r),v=s.createProgram();let g,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(lr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(lr).join(`
`),p.length>0&&(p+=`
`)):(g=[au(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),p=[au(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hn?"#define TONE_MAPPING":"",e.toneMapping!==Hn?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Hn?Z_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,q_("linearToOutputTexel",e.outputColorSpace),$_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(lr).join(`
`)),a=Gl(a),a=iu(a,e),a=su(a,e),o=Gl(o),o=iu(o,e),o=su(o,e),a=ru(a),o=ru(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===gh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===gh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=y+g+a,M=y+p+o,T=tu(s,s.VERTEX_SHADER,w),b=tu(s,s.FRAGMENT_SHADER,M);s.attachShader(v,T),s.attachShader(v,b),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(P){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(v)||"",W=s.getShaderInfoLog(T)||"",X=s.getShaderInfoLog(b)||"",O=D.trim(),H=W.trim(),U=X.trim();let q=!0,tt=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,b);else{const it=nu(s,T,"vertex"),Q=nu(s,b,"fragment");qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+it+`
`+Q)}else O!==""?Rt("WebGLProgram: Program Info Log:",O):(H===""||U==="")&&(tt=!1);tt&&(P.diagnostics={runnable:q,programLog:O,vertexShader:{log:H,prefix:g},fragmentShader:{log:U,prefix:p}})}s.deleteShader(T),s.deleteShader(b),_=new _a(s,v),E=Q_(s,v)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(v,G_)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=H_++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=b,this}let pM=0;class mM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new gM(t),e.set(t,n)),n}}class gM{constructor(t){this.id=pM++,this.code=t,this.usedTimes=0}}function vM(i){return i===qi||i===Ta||i===Aa}function xM(i,t,e,n,s,r){const a=new Pd,o=new mM,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,E,C,P,D,W){const X=P.fog,O=D.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,U=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,q=t.get(_.envMap||H,U),tt=q&&q.mapping===za?q.image.height:null,it=f[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Rt("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const Q=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ot=Q!==void 0?Q.length:0;let zt=0;O.morphAttributes.position!==void 0&&(zt=1),O.morphAttributes.normal!==void 0&&(zt=2),O.morphAttributes.color!==void 0&&(zt=3);let Kt,Vt,J,rt;if(it){const xt=Fn[it];Kt=xt.vertexShader,Vt=xt.fragmentShader}else{Kt=_.vertexShader,Vt=_.fragmentShader;const xt=o.getVertexShaderStage(_),me=o.getFragmentShaderStage(_);o.update(_,xt,me),J=xt.id,rt=me.id}const et=i.getRenderTarget(),Pt=i.state.buffers.depth.getReversed(),Dt=D.isInstancedMesh===!0,Tt=D.isBatchedMesh===!0,xe=!!_.map,kt=!!_.matcap,ie=!!q,Zt=!!_.aoMap,Wt=!!_.lightMap,ye=!!_.bumpMap&&_.wireframe===!1,Te=!!_.normalMap,Le=!!_.displacementMap,Ue=!!_.emissiveMap,pe=!!_.metalnessMap,Se=!!_.roughnessMap,N=_.anisotropy>0,Qe=_.clearcoat>0,Jt=_.dispersion>0,R=_.iridescence>0,x=_.sheen>0,B=_.transmission>0,V=N&&!!_.anisotropyMap,Y=Qe&&!!_.clearcoatMap,nt=Qe&&!!_.clearcoatNormalMap,at=Qe&&!!_.clearcoatRoughnessMap,Z=R&&!!_.iridescenceMap,K=R&&!!_.iridescenceThicknessMap,lt=x&&!!_.sheenColorMap,yt=x&&!!_.sheenRoughnessMap,ut=!!_.specularMap,ct=!!_.specularColorMap,bt=!!_.specularIntensityMap,At=B&&!!_.transmissionMap,Nt=B&&!!_.thicknessMap,I=!!_.gradientMap,st=!!_.alphaMap,$=_.alphaTest>0,ht=!!_.alphaHash,mt=!!_.extensions;let j=Hn;_.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(j=i.toneMapping);const Mt={shaderID:it,shaderType:_.type,shaderName:_.name,vertexShader:Kt,fragmentShader:Vt,defines:_.defines,customVertexShaderID:J,customFragmentShaderID:rt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Tt,batchingColor:Tt&&D._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&D.instanceColor!==null,instancingMorph:Dt&&D.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Gt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:xe,matcap:kt,envMap:ie,envMapMode:ie&&q.mapping,envMapCubeUVHeight:tt,aoMap:Zt,lightMap:Wt,bumpMap:ye,normalMap:Te,displacementMap:Le,emissiveMap:Ue,normalMapObjectSpace:Te&&_.normalMapType===e0,normalMapTangentSpace:Te&&_.normalMapType===Ra,packedNormalMap:Te&&_.normalMapType===Ra&&vM(_.normalMap.format),metalnessMap:pe,roughnessMap:Se,anisotropy:N,anisotropyMap:V,clearcoat:Qe,clearcoatMap:Y,clearcoatNormalMap:nt,clearcoatRoughnessMap:at,dispersion:Jt,iridescence:R,iridescenceMap:Z,iridescenceThicknessMap:K,sheen:x,sheenColorMap:lt,sheenRoughnessMap:yt,specularMap:ut,specularColorMap:ct,specularIntensityMap:bt,transmission:B,transmissionMap:At,thicknessMap:Nt,gradientMap:I,opaque:_.transparent===!1&&_.blending===Ds&&_.alphaToCoverage===!1,alphaMap:st,alphaTest:$,alphaHash:ht,combine:_.combine,mapUv:xe&&m(_.map.channel),aoMapUv:Zt&&m(_.aoMap.channel),lightMapUv:Wt&&m(_.lightMap.channel),bumpMapUv:ye&&m(_.bumpMap.channel),normalMapUv:Te&&m(_.normalMap.channel),displacementMapUv:Le&&m(_.displacementMap.channel),emissiveMapUv:Ue&&m(_.emissiveMap.channel),metalnessMapUv:pe&&m(_.metalnessMap.channel),roughnessMapUv:Se&&m(_.roughnessMap.channel),anisotropyMapUv:V&&m(_.anisotropyMap.channel),clearcoatMapUv:Y&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:nt&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:K&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:yt&&m(_.sheenRoughnessMap.channel),specularMapUv:ut&&m(_.specularMap.channel),specularColorMapUv:ct&&m(_.specularColorMap.channel),specularIntensityMapUv:bt&&m(_.specularIntensityMap.channel),transmissionMapUv:At&&m(_.transmissionMap.channel),thicknessMapUv:Nt&&m(_.thicknessMap.channel),alphaMapUv:st&&m(_.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Te||N),vertexNormals:!!O.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!O.attributes.uv&&(xe||st),fog:!!X,useFog:_.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||O.attributes.normal===void 0&&Te===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Pt,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:zt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:j,decodeVideoTexture:xe&&_.map.isVideoTexture===!0&&Gt.getTransfer(_.map.colorSpace)===Qt,decodeVideoTextureEmissive:Ue&&_.emissiveMap.isVideoTexture===!0&&Gt.getTransfer(_.emissiveMap.colorSpace)===Qt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===gn,flipSided:_.side===Je,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:mt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&_.extensions.multiDraw===!0||Tt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Mt.vertexUv1s=l.has(1),Mt.vertexUv2s=l.has(2),Mt.vertexUv3s=l.has(3),l.clear(),Mt}function g(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const C in _.defines)E.push(C),E.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(p(E,_),y(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function p(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function y(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function w(_){const E=f[_.type];let C;if(E){const P=Fn[E];C=B0.clone(P.uniforms)}else C=_.uniforms;return C}function M(_,E){let C=h.get(E);return C!==void 0?++C.usedTimes:(C=new fM(i,E,_,s),c.push(C),h.set(E,C)),C}function T(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function A(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:w,acquireProgram:M,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:A}}function _M(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function MM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function ou(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function lu(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,m,v,g,p){let y=i[t];return y===void 0?(y={id:d.id,object:d,geometry:f,material:m,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:g,group:p},i[t]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=m,y.materialVariant=a(d),y.groupOrder=v,y.renderOrder=d.renderOrder,y.z=g,y.group=p),t++,y}function l(d,f,m,v,g,p){const y=o(d,f,m,v,g,p);m.transmission>0?n.push(y):m.transparent===!0?s.push(y):e.push(y)}function c(d,f,m,v,g,p){const y=o(d,f,m,v,g,p);m.transmission>0?n.unshift(y):m.transparent===!0?s.unshift(y):e.unshift(y)}function h(d,f,m){e.length>1&&e.sort(d||MM),n.length>1&&n.sort(f||ou),s.length>1&&s.sort(f||ou),m&&(e.reverse(),n.reverse(),s.reverse())}function u(){for(let d=t,f=i.length;d<f;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function yM(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new lu,i.set(n,[a])):s>=r.length?(a=new lu,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function SM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Ct};break;case"SpotLight":e={position:new L,direction:new L,color:new Ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Ct,groundColor:new Ct};break;case"RectAreaLight":e={color:new Ct,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function EM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let bM=0;function wM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function TM(i){const t=new SM,e=EM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new Yt,a=new Yt;function o(c){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,y=0,w=0,M=0,T=0,b=0,A=0;c.sort(wM);for(let E=0,C=c.length;E<C;E++){const P=c[E],D=P.color,W=P.intensity,X=P.distance;let O=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===qi?O=P.shadow.map.texture:O=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=D.r*W,u+=D.g*W,d+=D.b*W;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],W);A++}else if(P.isDirectionalLight){const H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const U=P.shadow,q=e.get(P);q.shadowIntensity=U.intensity,q.shadowBias=U.bias,q.shadowNormalBias=U.normalBias,q.shadowRadius=U.radius,q.shadowMapSize=U.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=P.shadow.matrix,y++}n.directional[f]=H,f++}else if(P.isSpotLight){const H=t.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(D).multiplyScalar(W),H.distance=X,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[v]=H;const U=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,U.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[v]=U.matrix,P.castShadow){const q=e.get(P);q.shadowIntensity=U.intensity,q.shadowBias=U.bias,q.shadowNormalBias=U.normalBias,q.shadowRadius=U.radius,q.shadowMapSize=U.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=O,M++}v++}else if(P.isRectAreaLight){const H=t.get(P);H.color.copy(D).multiplyScalar(W),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=H,g++}else if(P.isPointLight){const H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const U=P.shadow,q=e.get(P);q.shadowIntensity=U.intensity,q.shadowBias=U.bias,q.shadowNormalBias=U.normalBias,q.shadowRadius=U.radius,q.shadowMapSize=U.mapSize,q.shadowCameraNear=U.camera.near,q.shadowCameraFar=U.camera.far,n.pointShadow[m]=q,n.pointShadowMap[m]=O,n.pointShadowMatrix[m]=P.shadow.matrix,w++}n.point[m]=H,m++}else if(P.isHemisphereLight){const H=t.get(P);H.skyColor.copy(P.color).multiplyScalar(W),H.groundColor.copy(P.groundColor).multiplyScalar(W),n.hemi[p]=H,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const _=n.hash;(_.directionalLength!==f||_.pointLength!==m||_.spotLength!==v||_.rectAreaLength!==g||_.hemiLength!==p||_.numDirectionalShadows!==y||_.numPointShadows!==w||_.numSpotShadows!==M||_.numSpotMaps!==T||_.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=M+T-b,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,_.directionalLength=f,_.pointLength=m,_.spotLength=v,_.rectAreaLength=g,_.hemiLength=p,_.numDirectionalShadows=y,_.numPointShadows=w,_.numSpotShadows=M,_.numSpotMaps=T,_.numLightProbes=A,n.version=bM++)}function l(c,h){let u=0,d=0,f=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const w=c[p];if(w.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),u++}else if(w.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),f++}else if(w.isRectAreaLight){const M=n.rectArea[m];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(g),a.identity(),r.copy(w.matrixWorld),r.premultiply(g),a.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),m++}else if(w.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(g),d++}else if(w.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function cu(i){const t=new TM(i),e=[],n=[],s=[];function r(d){u.camera=d,e.length=0,n.length=0,s.length=0}function a(d){e.push(d)}function o(d){n.push(d)}function l(d){s.push(d)}function c(){t.setup(e)}function h(d){t.setupView(e,d)}const u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function AM(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new cu(i),t.set(s,[o])):r>=a.length?(o=new cu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const RM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,CM=`uniform sampler2D shadow_pass;
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
}`,PM=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],IM=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],hu=new Yt,js=new L,Io=new L;function LM(i,t,e){let n=new xc;const s=new It,r=new It,a=new fe,o=new H0,l=new W0,c={},h=e.maxTextureSize,u={[ii]:Je,[Je]:ii,[gn]:gn},d=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:RM,fragmentShader:CM}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Ie;m.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new jt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fr;let p=this.type;this.render=function(b,A,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===Nm&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=fr);const E=i.getRenderTarget(),C=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),D=i.state;D.setBlending(ei),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const W=p!==this.type;W&&A.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=b.length;X<O;X++){const H=b[X],U=H.shadow;if(U===void 0){Rt("WebGLShadowMap:",H,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const q=U.getFrameExtents();s.multiply(q),r.copy(U.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,U.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,U.mapSize.y=r.y));const tt=i.state.buffers.depth.getReversed();if(U.camera._reversedDepth=tt,U.map===null||W===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===or){if(H.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new An(s.x,s.y,{format:qi,type:si,minFilter:be,magFilter:be,generateMipmaps:!1}),U.map.texture.name=H.name+".shadowMap",U.map.depthTexture=new zs(s.x,s.y,Tn),U.map.depthTexture.name=H.name+".shadowMapDepth",U.map.depthTexture.format=ri,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Be,U.map.depthTexture.magFilter=Be}else H.isPointLight?(U.map=new Hd(s.x),U.map.depthTexture=new U0(s.x,qn)):(U.map=new An(s.x,s.y),U.map.depthTexture=new zs(s.x,s.y,qn)),U.map.depthTexture.name=H.name+".shadowMap",U.map.depthTexture.format=ri,this.type===fr?(U.map.depthTexture.compareFunction=tt?mc:pc,U.map.depthTexture.minFilter=be,U.map.depthTexture.magFilter=be):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Be,U.map.depthTexture.magFilter=Be);U.camera.updateProjectionMatrix()}const it=U.map.isWebGLCubeRenderTarget?6:1;for(let Q=0;Q<it;Q++){if(U.map.isWebGLCubeRenderTarget)i.setRenderTarget(U.map,Q),i.clear();else{Q===0&&(i.setRenderTarget(U.map),i.clear());const ot=U.getViewport(Q);a.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),D.viewport(a)}if(H.isPointLight){const ot=U.camera,zt=U.matrix,Kt=H.distance||ot.far;Kt!==ot.far&&(ot.far=Kt,ot.updateProjectionMatrix()),js.setFromMatrixPosition(H.matrixWorld),ot.position.copy(js),Io.copy(ot.position),Io.add(PM[Q]),ot.up.copy(IM[Q]),ot.lookAt(Io),ot.updateMatrixWorld(),zt.makeTranslation(-js.x,-js.y,-js.z),hu.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),U._frustum.setFromProjectionMatrix(hu,ot.coordinateSystem,ot.reversedDepth)}else U.updateMatrices(H);n=U.getFrustum(),M(A,_,U.camera,H,this.type)}U.isPointLightShadow!==!0&&this.type===or&&y(U,_),U.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(E,C,P)};function y(b,A){const _=t.update(v);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new An(s.x,s.y,{format:qi,type:si})),d.uniforms.shadow_pass.value=b.map.depthTexture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(A,null,_,d,v,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(A,null,_,f,v,null)}function w(b,A,_,E){let C=null;const P=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)C=P;else if(C=_.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const D=C.uuid,W=A.uuid;let X=c[D];X===void 0&&(X={},c[D]=X);let O=X[W];O===void 0&&(O=C.clone(),X[W]=O,A.addEventListener("dispose",T)),C=O}if(C.visible=A.visible,C.wireframe=A.wireframe,E===or?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:u[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const D=i.properties.get(C);D.light=_}return C}function M(b,A,_,E,C){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&C===or)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);const W=t.update(b),X=b.material;if(Array.isArray(X)){const O=W.groups;for(let H=0,U=O.length;H<U;H++){const q=O[H],tt=X[q.materialIndex];if(tt&&tt.visible){const it=w(b,tt,E,C);b.onBeforeShadow(i,b,A,_,W,it,q),i.renderBufferDirect(_,null,W,it,b,q),b.onAfterShadow(i,b,A,_,W,it,q)}}}else if(X.visible){const O=w(b,X,E,C);b.onBeforeShadow(i,b,A,_,W,O,null),i.renderBufferDirect(_,null,W,O,b,null),b.onAfterShadow(i,b,A,_,W,O,null)}}const D=b.children;for(let W=0,X=D.length;W<X;W++)M(D[W],A,_,E,C)}function T(b){b.target.removeEventListener("dispose",T);for(const _ in c){const E=c[_],C=b.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function DM(i,t){function e(){let I=!1;const st=new fe;let $=null;const ht=new fe(0,0,0,0);return{setMask:function(mt){$!==mt&&!I&&(i.colorMask(mt,mt,mt,mt),$=mt)},setLocked:function(mt){I=mt},setClear:function(mt,j,Mt,xt,me){me===!0&&(mt*=xt,j*=xt,Mt*=xt),st.set(mt,j,Mt,xt),ht.equals(st)===!1&&(i.clearColor(mt,j,Mt,xt),ht.copy(st))},reset:function(){I=!1,$=null,ht.set(-1,0,0,0)}}}function n(){let I=!1,st=!1,$=null,ht=null,mt=null;return{setReversed:function(j){if(st!==j){const Mt=t.get("EXT_clip_control");j?Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.ZERO_TO_ONE_EXT):Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.NEGATIVE_ONE_TO_ONE_EXT),st=j;const xt=mt;mt=null,this.setClear(xt)}},getReversed:function(){return st},setTest:function(j){j?et(i.DEPTH_TEST):Pt(i.DEPTH_TEST)},setMask:function(j){$!==j&&!I&&(i.depthMask(j),$=j)},setFunc:function(j){if(st&&(j=u0[j]),ht!==j){switch(j){case el:i.depthFunc(i.NEVER);break;case nl:i.depthFunc(i.ALWAYS);break;case il:i.depthFunc(i.LESS);break;case Us:i.depthFunc(i.LEQUAL);break;case sl:i.depthFunc(i.EQUAL);break;case rl:i.depthFunc(i.GEQUAL);break;case al:i.depthFunc(i.GREATER);break;case ol:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ht=j}},setLocked:function(j){I=j},setClear:function(j){mt!==j&&(mt=j,st&&(j=1-j),i.clearDepth(j))},reset:function(){I=!1,$=null,ht=null,mt=null,st=!1}}}function s(){let I=!1,st=null,$=null,ht=null,mt=null,j=null,Mt=null,xt=null,me=null;return{setTest:function(oe){I||(oe?et(i.STENCIL_TEST):Pt(i.STENCIL_TEST))},setMask:function(oe){st!==oe&&!I&&(i.stencilMask(oe),st=oe)},setFunc:function(oe,Cn,Pn){($!==oe||ht!==Cn||mt!==Pn)&&(i.stencilFunc(oe,Cn,Pn),$=oe,ht=Cn,mt=Pn)},setOp:function(oe,Cn,Pn){(j!==oe||Mt!==Cn||xt!==Pn)&&(i.stencilOp(oe,Cn,Pn),j=oe,Mt=Cn,xt=Pn)},setLocked:function(oe){I=oe},setClear:function(oe){me!==oe&&(i.clearStencil(oe),me=oe)},reset:function(){I=!1,st=null,$=null,ht=null,mt=null,j=null,Mt=null,xt=null,me=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d={},f=new WeakMap,m=[],v=null,g=!1,p=null,y=null,w=null,M=null,T=null,b=null,A=null,_=new Ct(0,0,0),E=0,C=!1,P=null,D=null,W=null,X=null,O=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,q=0;const tt=i.getParameter(i.VERSION);tt.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(tt)[1]),U=q>=1):tt.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]),U=q>=2);let it=null,Q={};const ot=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),Kt=new fe().fromArray(ot),Vt=new fe().fromArray(zt);function J(I,st,$,ht){const mt=new Uint8Array(4),j=i.createTexture();i.bindTexture(I,j),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Mt=0;Mt<$;Mt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,ht,0,i.RGBA,i.UNSIGNED_BYTE,mt):i.texImage2D(st+Mt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,mt);return j}const rt={};rt[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),rt[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),rt[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(Us),ye(!1),Te(hh),et(i.CULL_FACE),Zt(ei);function et(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Pt(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Dt(I,st){return d[I]!==st?(i.bindFramebuffer(I,st),d[I]=st,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=st),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=st),!0):!1}function Tt(I,st){let $=m,ht=!1;if(I){$=f.get(st),$===void 0&&($=[],f.set(st,$));const mt=I.textures;if($.length!==mt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Mt=mt.length;j<Mt;j++)$[j]=i.COLOR_ATTACHMENT0+j;$.length=mt.length,ht=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,ht=!0);ht&&i.drawBuffers($)}function xe(I){return v!==I?(i.useProgram(I),v=I,!0):!1}const kt={[ti]:i.FUNC_ADD,[Fm]:i.FUNC_SUBTRACT,[Um]:i.FUNC_REVERSE_SUBTRACT};kt[Om]=i.MIN,kt[Bm]=i.MAX;const ie={[zm]:i.ZERO,[jo]:i.ONE,[km]:i.SRC_COLOR,[tl]:i.SRC_ALPHA,[qm]:i.SRC_ALPHA_SATURATE,[Wm]:i.DST_COLOR,[Gm]:i.DST_ALPHA,[Vm]:i.ONE_MINUS_SRC_COLOR,[gr]:i.ONE_MINUS_SRC_ALPHA,[Xm]:i.ONE_MINUS_DST_COLOR,[Hm]:i.ONE_MINUS_DST_ALPHA,[Ym]:i.CONSTANT_COLOR,[Zm]:i.ONE_MINUS_CONSTANT_COLOR,[$m]:i.CONSTANT_ALPHA,[Km]:i.ONE_MINUS_CONSTANT_ALPHA};function Zt(I,st,$,ht,mt,j,Mt,xt,me,oe){if(I===ei){g===!0&&(Pt(i.BLEND),g=!1);return}if(g===!1&&(et(i.BLEND),g=!0),I!==pd){if(I!==p||oe!==C){if((y!==ti||T!==ti)&&(i.blendEquation(i.FUNC_ADD),y=ti,T=ti),oe)switch(I){case Ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bi:i.blendFunc(i.ONE,i.ONE);break;case uh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case dh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qt("WebGLState: Invalid blending: ",I);break}else switch(I){case Ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case uh:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dh:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",I);break}w=null,M=null,b=null,A=null,_.set(0,0,0),E=0,p=I,C=oe}return}mt=mt||st,j=j||$,Mt=Mt||ht,(st!==y||mt!==T)&&(i.blendEquationSeparate(kt[st],kt[mt]),y=st,T=mt),($!==w||ht!==M||j!==b||Mt!==A)&&(i.blendFuncSeparate(ie[$],ie[ht],ie[j],ie[Mt]),w=$,M=ht,b=j,A=Mt),(xt.equals(_)===!1||me!==E)&&(i.blendColor(xt.r,xt.g,xt.b,me),_.copy(xt),E=me),p=I,C=!1}function Wt(I,st){I.side===gn?Pt(i.CULL_FACE):et(i.CULL_FACE);let $=I.side===Je;st&&($=!$),ye($),I.blending===Ds&&I.transparent===!1?Zt(ei):Zt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const ht=I.stencilWrite;o.setTest(ht),ht&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Ue(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):Pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ye(I){P!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),P=I)}function Te(I){I!==Lm?(et(i.CULL_FACE),I!==D&&(I===hh?i.cullFace(i.BACK):I===Dm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Pt(i.CULL_FACE),D=I}function Le(I){I!==W&&(U&&i.lineWidth(I),W=I)}function Ue(I,st,$){I?(et(i.POLYGON_OFFSET_FILL),(X!==st||O!==$)&&(X=st,O=$,a.getReversed()&&(st=-st),i.polygonOffset(st,$))):Pt(i.POLYGON_OFFSET_FILL)}function pe(I){I?et(i.SCISSOR_TEST):Pt(i.SCISSOR_TEST)}function Se(I){I===void 0&&(I=i.TEXTURE0+H-1),it!==I&&(i.activeTexture(I),it=I)}function N(I,st,$){$===void 0&&(it===null?$=i.TEXTURE0+H-1:$=it);let ht=Q[$];ht===void 0&&(ht={type:void 0,texture:void 0},Q[$]=ht),(ht.type!==I||ht.texture!==st)&&(it!==$&&(i.activeTexture($),it=$),i.bindTexture(I,st||rt[I]),ht.type=I,ht.texture=st)}function Qe(){const I=Q[it];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Jt(){try{i.compressedTexImage2D(...arguments)}catch(I){qt("WebGLState:",I)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(I){qt("WebGLState:",I)}}function x(){try{i.texSubImage2D(...arguments)}catch(I){qt("WebGLState:",I)}}function B(){try{i.texSubImage3D(...arguments)}catch(I){qt("WebGLState:",I)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(I){qt("WebGLState:",I)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(I){qt("WebGLState:",I)}}function nt(){try{i.texStorage2D(...arguments)}catch(I){qt("WebGLState:",I)}}function at(){try{i.texStorage3D(...arguments)}catch(I){qt("WebGLState:",I)}}function Z(){try{i.texImage2D(...arguments)}catch(I){qt("WebGLState:",I)}}function K(){try{i.texImage3D(...arguments)}catch(I){qt("WebGLState:",I)}}function lt(I){return u[I]!==void 0?u[I]:i.getParameter(I)}function yt(I,st){u[I]!==st&&(i.pixelStorei(I,st),u[I]=st)}function ut(I){Kt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Kt.copy(I))}function ct(I){Vt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Vt.copy(I))}function bt(I,st){let $=c.get(st);$===void 0&&($=new WeakMap,c.set(st,$));let ht=$.get(I);ht===void 0&&(ht=i.getUniformBlockIndex(st,I.name),$.set(I,ht))}function At(I,st){const ht=c.get(st).get(I);l.get(st)!==ht&&(i.uniformBlockBinding(st,ht,I.__bindingPointIndex),l.set(st,ht))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},it=null,Q={},d={},f=new WeakMap,m=[],v=null,g=!1,p=null,y=null,w=null,M=null,T=null,b=null,A=null,_=new Ct(0,0,0),E=0,C=!1,P=null,D=null,W=null,X=null,O=null,Kt.set(0,0,i.canvas.width,i.canvas.height),Vt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:Pt,bindFramebuffer:Dt,drawBuffers:Tt,useProgram:xe,setBlending:Zt,setMaterial:Wt,setFlipSided:ye,setCullFace:Te,setLineWidth:Le,setPolygonOffset:Ue,setScissorTest:pe,activeTexture:Se,bindTexture:N,unbindTexture:Qe,compressedTexImage2D:Jt,compressedTexImage3D:R,texImage2D:Z,texImage3D:K,pixelStorei:yt,getParameter:lt,updateUBOMapping:bt,uniformBlockBinding:At,texStorage2D:nt,texStorage3D:at,texSubImage2D:x,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:Y,scissor:ut,viewport:ct,reset:Nt}}function NM(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,h=new WeakMap,u=new Set;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,x){return m?new OffscreenCanvas(R,x):Ia("canvas")}function g(R,x,B){let V=1;const Y=Jt(R);if((Y.width>B||Y.height>B)&&(V=B/Math.max(Y.width,Y.height)),V<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const nt=Math.floor(V*Y.width),at=Math.floor(V*Y.height);d===void 0&&(d=v(nt,at));const Z=x?v(nt,at):d;return Z.width=nt,Z.height=at,Z.getContext("2d").drawImage(R,0,0,nt,at),Rt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+nt+"x"+at+")."),Z}else return"data"in R&&Rt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),R;return R}function p(R){return R.generateMipmaps}function y(R){i.generateMipmap(R)}function w(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,x,B,V,Y,nt=!1){if(R!==null){if(i[R]!==void 0)return i[R];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let at;V&&(at=t.get("EXT_texture_norm16"),at||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=x;if(x===i.RED&&(B===i.FLOAT&&(Z=i.R32F),B===i.HALF_FLOAT&&(Z=i.R16F),B===i.UNSIGNED_BYTE&&(Z=i.R8),B===i.UNSIGNED_SHORT&&at&&(Z=at.R16_EXT),B===i.SHORT&&at&&(Z=at.R16_SNORM_EXT)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.R8UI),B===i.UNSIGNED_SHORT&&(Z=i.R16UI),B===i.UNSIGNED_INT&&(Z=i.R32UI),B===i.BYTE&&(Z=i.R8I),B===i.SHORT&&(Z=i.R16I),B===i.INT&&(Z=i.R32I)),x===i.RG&&(B===i.FLOAT&&(Z=i.RG32F),B===i.HALF_FLOAT&&(Z=i.RG16F),B===i.UNSIGNED_BYTE&&(Z=i.RG8),B===i.UNSIGNED_SHORT&&at&&(Z=at.RG16_EXT),B===i.SHORT&&at&&(Z=at.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RG8UI),B===i.UNSIGNED_SHORT&&(Z=i.RG16UI),B===i.UNSIGNED_INT&&(Z=i.RG32UI),B===i.BYTE&&(Z=i.RG8I),B===i.SHORT&&(Z=i.RG16I),B===i.INT&&(Z=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),B===i.UNSIGNED_INT&&(Z=i.RGB32UI),B===i.BYTE&&(Z=i.RGB8I),B===i.SHORT&&(Z=i.RGB16I),B===i.INT&&(Z=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),B===i.UNSIGNED_INT&&(Z=i.RGBA32UI),B===i.BYTE&&(Z=i.RGBA8I),B===i.SHORT&&(Z=i.RGBA16I),B===i.INT&&(Z=i.RGBA32I)),x===i.RGB&&(B===i.UNSIGNED_SHORT&&at&&(Z=at.RGB16_EXT),B===i.SHORT&&at&&(Z=at.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),x===i.RGBA){const K=nt?Pa:Gt.getTransfer(Y);B===i.FLOAT&&(Z=i.RGBA32F),B===i.HALF_FLOAT&&(Z=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Z=K===Qt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&at&&(Z=at.RGBA16_EXT),B===i.SHORT&&at&&(Z=at.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function T(R,x){let B;return R?x===null||x===qn||x===xr?B=i.DEPTH24_STENCIL8:x===Tn?B=i.DEPTH32F_STENCIL8:x===vr&&(B=i.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===qn||x===xr?B=i.DEPTH_COMPONENT24:x===Tn?B=i.DEPTH_COMPONENT32F:x===vr&&(B=i.DEPTH_COMPONENT16),B}function b(R,x){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==Be&&R.minFilter!==be?Math.log2(Math.max(x.width,x.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?x.mipmaps.length:1}function A(R){const x=R.target;x.removeEventListener("dispose",A),E(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function _(R){const x=R.target;x.removeEventListener("dispose",_),P(x)}function E(R){const x=n.get(R);if(x.__webglInit===void 0)return;const B=R.source,V=f.get(B);if(V){const Y=V[x.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&C(R),Object.keys(V).length===0&&f.delete(B)}n.remove(R)}function C(R){const x=n.get(R);i.deleteTexture(x.__webglTexture);const B=R.source,V=f.get(B);delete V[x.__cacheKey],a.memory.textures--}function P(R){const x=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(x.__webglFramebuffer[V]))for(let Y=0;Y<x.__webglFramebuffer[V].length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[V][Y]);else i.deleteFramebuffer(x.__webglFramebuffer[V]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[V])}else{if(Array.isArray(x.__webglFramebuffer))for(let V=0;V<x.__webglFramebuffer.length;V++)i.deleteFramebuffer(x.__webglFramebuffer[V]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let V=0;V<x.__webglColorRenderbuffer.length;V++)x.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[V]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=R.textures;for(let V=0,Y=B.length;V<Y;V++){const nt=n.get(B[V]);nt.__webglTexture&&(i.deleteTexture(nt.__webglTexture),a.memory.textures--),n.remove(B[V])}n.remove(R)}let D=0;function W(){D=0}function X(){return D}function O(R){D=R}function H(){const R=D;return R>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),D+=1,R}function U(R){const x=[];return x.push(R.wrapS),x.push(R.wrapT),x.push(R.wrapR||0),x.push(R.magFilter),x.push(R.minFilter),x.push(R.anisotropy),x.push(R.internalFormat),x.push(R.format),x.push(R.type),x.push(R.generateMipmaps),x.push(R.premultiplyAlpha),x.push(R.flipY),x.push(R.unpackAlignment),x.push(R.colorSpace),x.join()}function q(R,x){const B=n.get(R);if(R.isVideoTexture&&N(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&B.__version!==R.version){const V=R.image;if(V===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{Pt(B,R,x);return}}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function tt(R,x){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){Pt(B,R,x);return}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function it(R,x){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){Pt(B,R,x);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function Q(R,x){const B=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&B.__version!==R.version){Dt(B,R,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}const ot={[Xi]:i.REPEAT,[hn]:i.CLAMP_TO_EDGE,[ll]:i.MIRRORED_REPEAT},zt={[Be]:i.NEAREST,[jm]:i.NEAREST_MIPMAP_NEAREST,[Lr]:i.NEAREST_MIPMAP_LINEAR,[be]:i.LINEAR,[ja]:i.LINEAR_MIPMAP_NEAREST,[zn]:i.LINEAR_MIPMAP_LINEAR},Kt={[n0]:i.NEVER,[o0]:i.ALWAYS,[i0]:i.LESS,[pc]:i.LEQUAL,[s0]:i.EQUAL,[mc]:i.GEQUAL,[r0]:i.GREATER,[a0]:i.NOTEQUAL};function Vt(R,x){if(x.type===Tn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===be||x.magFilter===ja||x.magFilter===Lr||x.magFilter===zn||x.minFilter===be||x.minFilter===ja||x.minFilter===Lr||x.minFilter===zn)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ot[x.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ot[x.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ot[x.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,zt[x.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,zt[x.minFilter]),x.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Kt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Be||x.minFilter!==Lr&&x.minFilter!==zn||x.type===Tn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function J(R,x){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,x.addEventListener("dispose",A));const V=x.source;let Y=f.get(V);Y===void 0&&(Y={},f.set(V,Y));const nt=U(x);if(nt!==R.__cacheKey){Y[nt]===void 0&&(Y[nt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Y[nt].usedTimes++;const at=Y[R.__cacheKey];at!==void 0&&(Y[R.__cacheKey].usedTimes--,at.usedTimes===0&&C(x)),R.__cacheKey=nt,R.__webglTexture=Y[nt].texture}return B}function rt(R,x,B){return Math.floor(Math.floor(R/B)/x)}function et(R,x,B,V){const nt=R.updateRanges;if(nt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,B,V,x.data);else{nt.sort((yt,ut)=>yt.start-ut.start);let at=0;for(let yt=1;yt<nt.length;yt++){const ut=nt[at],ct=nt[yt],bt=ut.start+ut.count,At=rt(ct.start,x.width,4),Nt=rt(ut.start,x.width,4);ct.start<=bt+1&&At===Nt&&rt(ct.start+ct.count-1,x.width,4)===At?ut.count=Math.max(ut.count,ct.start+ct.count-ut.start):(++at,nt[at]=ct)}nt.length=at+1;const Z=e.getParameter(i.UNPACK_ROW_LENGTH),K=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let yt=0,ut=nt.length;yt<ut;yt++){const ct=nt[yt],bt=Math.floor(ct.start/4),At=Math.ceil(ct.count/4),Nt=bt%x.width,I=Math.floor(bt/x.width),st=At,$=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,I),e.texSubImage2D(i.TEXTURE_2D,0,Nt,I,st,$,B,V,x.data)}R.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,K),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function Pt(R,x,B){let V=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=i.TEXTURE_3D);const Y=J(R,x),nt=x.source;e.bindTexture(V,R.__webglTexture,i.TEXTURE0+B);const at=n.get(nt);if(nt.version!==at.__version||Y===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const $=Gt.getPrimaries(Gt.workingColorSpace),ht=x.colorSpace===En?null:Gt.getPrimaries(x.colorSpace),mt=x.colorSpace===En||$===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let K=g(x.image,!1,s.maxTextureSize);K=Qe(x,K);const lt=r.convert(x.format,x.colorSpace),yt=r.convert(x.type);let ut=M(x.internalFormat,lt,yt,x.normalized,x.colorSpace,x.isVideoTexture);Vt(V,x);let ct;const bt=x.mipmaps,At=x.isVideoTexture!==!0,Nt=at.__version===void 0||Y===!0,I=nt.dataReady,st=b(x,K);if(x.isDepthTexture)ut=T(x.format===Vi,x.type),Nt&&(At?e.texStorage2D(i.TEXTURE_2D,1,ut,K.width,K.height):e.texImage2D(i.TEXTURE_2D,0,ut,K.width,K.height,0,lt,yt,null));else if(x.isDataTexture)if(bt.length>0){At&&Nt&&e.texStorage2D(i.TEXTURE_2D,st,ut,bt[0].width,bt[0].height);for(let $=0,ht=bt.length;$<ht;$++)ct=bt[$],At?I&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,ct.width,ct.height,lt,yt,ct.data):e.texImage2D(i.TEXTURE_2D,$,ut,ct.width,ct.height,0,lt,yt,ct.data);x.generateMipmaps=!1}else At?(Nt&&e.texStorage2D(i.TEXTURE_2D,st,ut,K.width,K.height),I&&et(x,K,lt,yt)):e.texImage2D(i.TEXTURE_2D,0,ut,K.width,K.height,0,lt,yt,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){At&&Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,st,ut,bt[0].width,bt[0].height,K.depth);for(let $=0,ht=bt.length;$<ht;$++)if(ct=bt[$],x.format!==vn)if(lt!==null)if(At){if(I)if(x.layerUpdates.size>0){const mt=Gh(ct.width,ct.height,x.format,x.type);for(const j of x.layerUpdates){const Mt=ct.data.subarray(j*mt/ct.data.BYTES_PER_ELEMENT,(j+1)*mt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,j,ct.width,ct.height,1,lt,Mt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ct.width,ct.height,K.depth,lt,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,ut,ct.width,ct.height,K.depth,0,ct.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else At?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ct.width,ct.height,K.depth,lt,yt,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,ut,ct.width,ct.height,K.depth,0,lt,yt,ct.data)}else{At&&Nt&&e.texStorage2D(i.TEXTURE_2D,st,ut,bt[0].width,bt[0].height);for(let $=0,ht=bt.length;$<ht;$++)ct=bt[$],x.format!==vn?lt!==null?At?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ct.width,ct.height,lt,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,$,ut,ct.width,ct.height,0,ct.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):At?I&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,ct.width,ct.height,lt,yt,ct.data):e.texImage2D(i.TEXTURE_2D,$,ut,ct.width,ct.height,0,lt,yt,ct.data)}else if(x.isDataArrayTexture)if(At){if(Nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,st,ut,K.width,K.height,K.depth),I)if(x.layerUpdates.size>0){const $=Gh(K.width,K.height,x.format,x.type);for(const ht of x.layerUpdates){const mt=K.data.subarray(ht*$/K.data.BYTES_PER_ELEMENT,(ht+1)*$/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ht,K.width,K.height,1,lt,yt,mt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,lt,yt,K.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ut,K.width,K.height,K.depth,0,lt,yt,K.data);else if(x.isData3DTexture)At?(Nt&&e.texStorage3D(i.TEXTURE_3D,st,ut,K.width,K.height,K.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,lt,yt,K.data)):e.texImage3D(i.TEXTURE_3D,0,ut,K.width,K.height,K.depth,0,lt,yt,K.data);else if(x.isFramebufferTexture){if(Nt)if(At)e.texStorage2D(i.TEXTURE_2D,st,ut,K.width,K.height);else{let $=K.width,ht=K.height;for(let mt=0;mt<st;mt++)e.texImage2D(i.TEXTURE_2D,mt,ut,$,ht,0,lt,yt,null),$>>=1,ht>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),u.add(x),$.onpaint=ht=>{const mt=ht.changedElements;for(const j of u)mt.includes(j.image)&&(j.needsUpdate=!0)},$.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{const mt=i.RGBA,j=i.RGBA,Mt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,mt,j,Mt,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(bt.length>0){if(At&&Nt){const $=Jt(bt[0]);e.texStorage2D(i.TEXTURE_2D,st,ut,$.width,$.height)}for(let $=0,ht=bt.length;$<ht;$++)ct=bt[$],At?I&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,lt,yt,ct):e.texImage2D(i.TEXTURE_2D,$,ut,lt,yt,ct);x.generateMipmaps=!1}else if(At){if(Nt){const $=Jt(K);e.texStorage2D(i.TEXTURE_2D,st,ut,$.width,$.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,yt,K)}else e.texImage2D(i.TEXTURE_2D,0,ut,lt,yt,K);p(x)&&y(V),at.__version=nt.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function Dt(R,x,B){if(x.image.length!==6)return;const V=J(R,x),Y=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+B);const nt=n.get(Y);if(Y.version!==nt.__version||V===!0){e.activeTexture(i.TEXTURE0+B);const at=Gt.getPrimaries(Gt.workingColorSpace),Z=x.colorSpace===En?null:Gt.getPrimaries(x.colorSpace),K=x.colorSpace===En||at===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const lt=x.isCompressedTexture||x.image[0].isCompressedTexture,yt=x.image[0]&&x.image[0].isDataTexture,ut=[];for(let j=0;j<6;j++)!lt&&!yt?ut[j]=g(x.image[j],!0,s.maxCubemapSize):ut[j]=yt?x.image[j].image:x.image[j],ut[j]=Qe(x,ut[j]);const ct=ut[0],bt=r.convert(x.format,x.colorSpace),At=r.convert(x.type),Nt=M(x.internalFormat,bt,At,x.normalized,x.colorSpace),I=x.isVideoTexture!==!0,st=nt.__version===void 0||V===!0,$=Y.dataReady;let ht=b(x,ct);Vt(i.TEXTURE_CUBE_MAP,x);let mt;if(lt){I&&st&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Nt,ct.width,ct.height);for(let j=0;j<6;j++){mt=ut[j].mipmaps;for(let Mt=0;Mt<mt.length;Mt++){const xt=mt[Mt];x.format!==vn?bt!==null?I?$&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt,0,0,xt.width,xt.height,bt,xt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt,Nt,xt.width,xt.height,0,xt.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt,0,0,xt.width,xt.height,bt,At,xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt,Nt,xt.width,xt.height,0,bt,At,xt.data)}}}else{if(mt=x.mipmaps,I&&st){mt.length>0&&ht++;const j=Jt(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Nt,j.width,j.height)}for(let j=0;j<6;j++)if(yt){I?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ut[j].width,ut[j].height,bt,At,ut[j].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Nt,ut[j].width,ut[j].height,0,bt,At,ut[j].data);for(let Mt=0;Mt<mt.length;Mt++){const me=mt[Mt].image[j].image;I?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt+1,0,0,me.width,me.height,bt,At,me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt+1,Nt,me.width,me.height,0,bt,At,me.data)}}else{I?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,bt,At,ut[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Nt,bt,At,ut[j]);for(let Mt=0;Mt<mt.length;Mt++){const xt=mt[Mt];I?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt+1,0,0,bt,At,xt.image[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt+1,Nt,bt,At,xt.image[j])}}}p(x)&&y(i.TEXTURE_CUBE_MAP),nt.__version=Y.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function Tt(R,x,B,V,Y,nt){const at=r.convert(B.format,B.colorSpace),Z=r.convert(B.type),K=M(B.internalFormat,at,Z,B.normalized,B.colorSpace),lt=n.get(x),yt=n.get(B);if(yt.__renderTarget=x,!lt.__hasExternalTextures){const ut=Math.max(1,x.width>>nt),ct=Math.max(1,x.height>>nt);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,nt,K,ut,ct,x.depth,0,at,Z,null):e.texImage2D(Y,nt,K,ut,ct,0,at,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Se(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Y,yt.__webglTexture,0,pe(x)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Y,yt.__webglTexture,nt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(R,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,R),x.depthBuffer){const V=x.depthTexture,Y=V&&V.isDepthTexture?V.type:null,nt=T(x.stencilBuffer,Y),at=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Se(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe(x),nt,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pe(x),nt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,nt,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,R)}else{const V=x.textures;for(let Y=0;Y<V.length;Y++){const nt=V[Y],at=r.convert(nt.format,nt.colorSpace),Z=r.convert(nt.type),K=M(nt.internalFormat,at,Z,nt.normalized,nt.colorSpace);Se(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe(x),K,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pe(x),K,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,K,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function kt(R,x,B){const V=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(x.depthTexture);if(Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,x.depthTexture);const lt=r.convert(x.depthTexture.format),yt=r.convert(x.depthTexture.type);let ut;x.depthTexture.format===ri?ut=i.DEPTH_COMPONENT24:x.depthTexture.format===Vi&&(ut=i.DEPTH24_STENCIL8);for(let ct=0;ct<6;ct++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,ut,x.width,x.height,0,lt,yt,null)}}else q(x.depthTexture,0);const nt=Y.__webglTexture,at=pe(x),Z=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,K=x.depthTexture.format===Vi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===ri)Se(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,nt,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,nt,0);else if(x.depthTexture.format===Vi)Se(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,nt,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,nt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(R){const x=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==R.depthTexture){const V=R.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){const Y=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",Y)};V.addEventListener("dispose",Y),x.__depthDisposeCallback=Y}x.__boundDepthTexture=V}if(R.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let V=0;V<6;V++)kt(x.__webglFramebuffer[V],R,V);else{const V=R.texture.mipmaps;V&&V.length>0?kt(x.__webglFramebuffer[0],R,0):kt(x.__webglFramebuffer,R,0)}else if(B){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=i.createRenderbuffer(),xe(x.__webglDepthbuffer[V],R,!1);else{const Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=x.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,nt)}}else{const V=R.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),xe(x.__webglDepthbuffer,R,!1);else{const Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,nt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Zt(R,x,B){const V=n.get(R);x!==void 0&&Tt(V.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&ie(R)}function Wt(R){const x=R.texture,B=n.get(R),V=n.get(x);R.addEventListener("dispose",_);const Y=R.textures,nt=R.isWebGLCubeRenderTarget===!0,at=Y.length>1;if(at||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=x.version,a.memory.textures++),nt){B.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[Z]=[];for(let K=0;K<x.mipmaps.length;K++)B.__webglFramebuffer[Z][K]=i.createFramebuffer()}else B.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let Z=0;Z<x.mipmaps.length;Z++)B.__webglFramebuffer[Z]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(at)for(let Z=0,K=Y.length;Z<K;Z++){const lt=n.get(Y[Z]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&Se(R)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){const K=Y[Z];B.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Z]);const lt=r.convert(K.format,K.colorSpace),yt=r.convert(K.type),ut=M(K.internalFormat,lt,yt,K.normalized,K.colorSpace,R.isXRRenderTarget===!0),ct=pe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,ut,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,B.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(B.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(nt){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,x);for(let Z=0;Z<6;Z++)if(x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Tt(B.__webglFramebuffer[Z][K],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,K);else Tt(B.__webglFramebuffer[Z],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);p(x)&&y(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(at){for(let Z=0,K=Y.length;Z<K;Z++){const lt=Y[Z],yt=n.get(lt);let ut=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ut=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,yt.__webglTexture),Vt(ut,lt),Tt(B.__webglFramebuffer,R,lt,i.COLOR_ATTACHMENT0+Z,ut,0),p(lt)&&y(ut)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Z=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,V.__webglTexture),Vt(Z,x),x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Tt(B.__webglFramebuffer[K],R,x,i.COLOR_ATTACHMENT0,Z,K);else Tt(B.__webglFramebuffer,R,x,i.COLOR_ATTACHMENT0,Z,0);p(x)&&y(Z),e.unbindTexture()}R.depthBuffer&&ie(R)}function ye(R){const x=R.textures;for(let B=0,V=x.length;B<V;B++){const Y=x[B];if(p(Y)){const nt=w(R),at=n.get(Y).__webglTexture;e.bindTexture(nt,at),y(nt),e.unbindTexture()}}}const Te=[],Le=[];function Ue(R){if(R.samples>0){if(Se(R)===!1){const x=R.textures,B=R.width,V=R.height;let Y=i.COLOR_BUFFER_BIT;const nt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=n.get(R),Z=x.length>1;if(Z)for(let lt=0;lt<x.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,at.__webglMultisampledFramebuffer);const K=R.texture.mipmaps;K&&K.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let lt=0;lt<x.length;lt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,at.__webglColorRenderbuffer[lt]);const yt=n.get(x[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,yt,0)}i.blitFramebuffer(0,0,B,V,0,0,B,V,Y,i.NEAREST),l===!0&&(Te.length=0,Le.length=0,Te.push(i.COLOR_ATTACHMENT0+lt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Te.push(nt),Le.push(nt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Te))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let lt=0;lt<x.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,at.__webglColorRenderbuffer[lt]);const yt=n.get(x[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,yt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const x=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function pe(R){return Math.min(s.maxSamples,R.samples)}function Se(R){const x=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function N(R){const x=a.render.frame;h.get(R)!==x&&(h.set(R,x),R.update())}function Qe(R,x){const B=R.colorSpace,V=R.format,Y=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==Ca&&B!==En&&(Gt.getTransfer(B)===Qt?(V!==vn||Y!==rn)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",B)),x}function Jt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=q,this.setTexture2DArray=tt,this.setTexture3D=it,this.setTextureCube=Q,this.rebindTextures=Zt,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=Se,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function FM(i,t){function e(n,s=En){let r;const a=Gt.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===lc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===cc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===bd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===wd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Sd)return i.BYTE;if(n===Ed)return i.SHORT;if(n===vr)return i.UNSIGNED_SHORT;if(n===oc)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===si)return i.HALF_FLOAT;if(n===Td)return i.ALPHA;if(n===Ad)return i.RGB;if(n===vn)return i.RGBA;if(n===ri)return i.DEPTH_COMPONENT;if(n===Vi)return i.DEPTH_STENCIL;if(n===hc)return i.RED;if(n===uc)return i.RED_INTEGER;if(n===qi)return i.RG;if(n===dc)return i.RG_INTEGER;if(n===fc)return i.RGBA_INTEGER;if(n===ma||n===ga||n===va||n===xa)if(a===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===cl||n===hl||n===ul||n===dl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===cl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===hl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ul)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===dl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fl||n===pl||n===ml||n===gl||n===vl||n===Ta||n===xl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===fl||n===pl)return a===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ml)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===gl)return r.COMPRESSED_R11_EAC;if(n===vl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ta)return r.COMPRESSED_RG11_EAC;if(n===xl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===_l||n===Ml||n===yl||n===Sl||n===El||n===bl||n===wl||n===Tl||n===Al||n===Rl||n===Cl||n===Pl||n===Il||n===Ll)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_l)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ml)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===yl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Sl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===El)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Tl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Al)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Rl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Cl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Il)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ll)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Dl||n===Nl||n===Fl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Dl)return a===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Nl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ul||n===Ol||n===Aa||n===Bl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ul)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Aa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const UM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,OM=`
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

}`;class BM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Ud(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new xn({vertexShader:UM,fragmentShader:OM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new jt(new ka(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zM extends Zi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const v=typeof XRWebGLBinding<"u",g=new BM,p={},y=e.getContextAttributes();let w=null,M=null;const T=[],b=[],A=new It;let _=null;const E=new nn;E.viewport=new fe;const C=new nn;C.viewport=new fe;const P=[E,C],D=new $0;let W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let rt=T[J];return rt===void 0&&(rt=new oo,T[J]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(J){let rt=T[J];return rt===void 0&&(rt=new oo,T[J]=rt),rt.getGripSpace()},this.getHand=function(J){let rt=T[J];return rt===void 0&&(rt=new oo,T[J]=rt),rt.getHandSpace()};function O(J){const rt=b.indexOf(J.inputSource);if(rt===-1)return;const et=T[rt];et!==void 0&&(et.update(J.inputSource,J.frame,c||a),et.dispatchEvent({type:J.type,data:J.inputSource}))}function H(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",U);for(let J=0;J<T.length;J++){const rt=b[J];rt!==null&&(b[J]=null,T[J].disconnect(rt))}W=null,X=null,g.reset();for(const J in p)delete p[J];t.setRenderTarget(w),f=null,d=null,u=null,s=null,M=null,Vt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",H),s.addEventListener("inputsourceschange",U),y.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let et=null,Pt=null,Dt=null;y.depth&&(Dt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=y.stencil?Vi:ri,Pt=y.stencil?xr:qn);const Tt={colorFormat:e.RGBA8,depthFormat:Dt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Tt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new An(d.textureWidth,d.textureHeight,{format:vn,type:rn,depthTexture:new zs(d.textureWidth,d.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const et={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new An(f.framebufferWidth,f.framebufferHeight,{format:vn,type:rn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Vt.setContext(s),Vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function U(J){for(let rt=0;rt<J.removed.length;rt++){const et=J.removed[rt],Pt=b.indexOf(et);Pt>=0&&(b[Pt]=null,T[Pt].disconnect(et))}for(let rt=0;rt<J.added.length;rt++){const et=J.added[rt];let Pt=b.indexOf(et);if(Pt===-1){for(let Tt=0;Tt<T.length;Tt++)if(Tt>=b.length){b.push(et),Pt=Tt;break}else if(b[Tt]===null){b[Tt]=et,Pt=Tt;break}if(Pt===-1)break}const Dt=T[Pt];Dt&&Dt.connect(et)}}const q=new L,tt=new L;function it(J,rt,et){q.setFromMatrixPosition(rt.matrixWorld),tt.setFromMatrixPosition(et.matrixWorld);const Pt=q.distanceTo(tt),Dt=rt.projectionMatrix.elements,Tt=et.projectionMatrix.elements,xe=Dt[14]/(Dt[10]-1),kt=Dt[14]/(Dt[10]+1),ie=(Dt[9]+1)/Dt[5],Zt=(Dt[9]-1)/Dt[5],Wt=(Dt[8]-1)/Dt[0],ye=(Tt[8]+1)/Tt[0],Te=xe*Wt,Le=xe*ye,Ue=Pt/(-Wt+ye),pe=Ue*-Wt;if(rt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(pe),J.translateZ(Ue),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Dt[10]===-1)J.projectionMatrix.copy(rt.projectionMatrix),J.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const Se=xe+Ue,N=kt+Ue,Qe=Te-pe,Jt=Le+(Pt-pe),R=ie*kt/N*Se,x=Zt*kt/N*Se;J.projectionMatrix.makePerspective(Qe,Jt,R,x,Se,N),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Q(J,rt){rt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(rt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let rt=J.near,et=J.far;g.texture!==null&&(g.depthNear>0&&(rt=g.depthNear),g.depthFar>0&&(et=g.depthFar)),D.near=C.near=E.near=rt,D.far=C.far=E.far=et,(W!==D.near||X!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),W=D.near,X=D.far),D.layers.mask=J.layers.mask|6,E.layers.mask=D.layers.mask&-5,C.layers.mask=D.layers.mask&-3;const Pt=J.parent,Dt=D.cameras;Q(D,Pt);for(let Tt=0;Tt<Dt.length;Tt++)Q(Dt[Tt],Pt);Dt.length===2?it(D,E,C):D.projectionMatrix.copy(E.projectionMatrix),ot(J,D,Pt)};function ot(J,rt,et){et===null?J.matrix.copy(rt.matrixWorld):(J.matrix.copy(et.matrixWorld),J.matrix.invert(),J.matrix.multiply(rt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(rt.projectionMatrix),J.projectionMatrixInverse.copy(rt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=zl*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(J){return p[J]};let zt=null;function Kt(J,rt){if(h=rt.getViewerPose(c||a),m=rt,h!==null){const et=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Pt=!1;et.length!==D.cameras.length&&(D.cameras.length=0,Pt=!0);for(let kt=0;kt<et.length;kt++){const ie=et[kt];let Zt=null;if(f!==null)Zt=f.getViewport(ie);else{const ye=u.getViewSubImage(d,ie);Zt=ye.viewport,kt===0&&(t.setRenderTargetTextures(M,ye.colorTexture,ye.depthStencilTexture),t.setRenderTarget(M))}let Wt=P[kt];Wt===void 0&&(Wt=new nn,Wt.layers.enable(kt),Wt.viewport=new fe,P[kt]=Wt),Wt.matrix.fromArray(ie.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(ie.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),kt===0&&(D.matrix.copy(Wt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Pt===!0&&D.cameras.push(Wt)}const Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const kt=u.getDepthInformation(et[0]);kt&&kt.isValid&&kt.texture&&g.init(kt,s.renderState)}if(Dt&&Dt.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let kt=0;kt<et.length;kt++){const ie=et[kt].camera;if(ie){let Zt=p[ie];Zt||(Zt=new Ud,p[ie]=Zt);const Wt=u.getCameraImage(ie);Zt.sourceTexture=Wt}}}}for(let et=0;et<T.length;et++){const Pt=b[et],Dt=T[et];Pt!==null&&Dt!==void 0&&Dt.update(Pt,rt,c||a)}zt&&zt(J,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),m=null}const Vt=new Vd;Vt.setAnimationLoop(Kt),this.setAnimationLoop=function(J){zt=J},this.dispose=function(){}}}const kM=new Yt,Zd=new Lt;Zd.set(-1,0,0,0,1,0,0,0,1);function VM(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Od(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,w,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,M)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,y,w):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Je&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Je&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=t.get(p),w=y.envMap,M=y.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(kM.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Zd),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,w){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=w*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const y=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function GM(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,T){const b=T.program;n.uniformBlockBinding(M,b)}function c(M,T){let b=s[M.id];b===void 0&&(g(M),b=h(M),s[M.id]=b,M.addEventListener("dispose",y));const A=T.program;n.updateUBOMapping(M,A);const _=t.render.frame;r[M.id]!==_&&(d(M),r[M.id]=_)}function h(M){const T=u();M.__bindingPointIndex=T;const b=i.createBuffer(),A=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,A,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,b),b}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const T=s[M.id],b=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,E=b.length;_<E;_++){const C=b[_];if(Array.isArray(C))for(let P=0,D=C.length;P<D;P++)f(C[P],_,P,A);else f(C,_,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,T,b,A){if(v(M,T,b,A)===!0){const _=M.__offset,E=M.value;if(Array.isArray(E)){let C=0;for(let P=0;P<E.length;P++){const D=E[P],W=p(D);m(D,M.__data,C),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(C+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(E,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function m(M,T,b){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,b)}function v(M,T,b,A){const _=M.value,E=T+"_"+b;if(A[E]===void 0)return typeof _=="number"||typeof _=="boolean"?A[E]=_:ArrayBuffer.isView(_)?A[E]=_.slice():A[E]=_.clone(),!0;{const C=A[E];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return A[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function g(M){const T=M.uniforms;let b=0;const A=16;for(let E=0,C=T.length;E<C;E++){const P=Array.isArray(T[E])?T[E]:[T[E]];for(let D=0,W=P.length;D<W;D++){const X=P[D],O=Array.isArray(X.value)?X.value:[X.value];for(let H=0,U=O.length;H<U;H++){const q=O[H],tt=p(q),it=b%A,Q=it%tt.boundary,ot=it+Q;b+=Q,ot!==0&&A-ot<tt.storage&&(b+=A-ot),X.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=b,b+=tt.storage}}}const _=b%A;return _>0&&(b+=A-_),M.__size=b,M.__cache={},this}function p(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",M),T}function y(M){const T=M.target;T.removeEventListener("dispose",y);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function w(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}const HM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Dn=null;function WM(){return Dn===null&&(Dn=new Nd(HM,16,16,qi,si),Dn.name="DFG_LUT",Dn.minFilter=be,Dn.magFilter=be,Dn.wrapS=hn,Dn.wrapT=hn,Dn.generateMipmaps=!1,Dn.needsUpdate=!0),Dn}class XM{constructor(t={}){const{canvas:e=c0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=rn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const v=f,g=new Set([fc,dc,uc]),p=new Set([rn,qn,vr,xr,lc,cc]),y=new Uint32Array(4),w=new Int32Array(4),M=new L;let T=null,b=null;const A=[],_=[];let E=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let P=!1,D=null,W=null,X=null,O=null;this._outputColorSpace=$e;let H=0,U=0,q=null,tt=-1,it=null;const Q=new fe,ot=new fe;let zt=null;const Kt=new Ct(0);let Vt=0,J=e.width,rt=e.height,et=1,Pt=null,Dt=null;const Tt=new fe(0,0,J,rt),xe=new fe(0,0,J,rt);let kt=!1;const ie=new xc;let Zt=!1,Wt=!1;const ye=new Yt,Te=new L,Le=new fe,Ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pe=!1;function Se(){return q===null?et:1}let N=n;function Qe(S,F){return e.getContext(S,F)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${sc}`),e.addEventListener("webglcontextlost",me,!1),e.addEventListener("webglcontextrestored",oe,!1),e.addEventListener("webglcontextcreationerror",Cn,!1),N===null){const F="webgl2";if(N=Qe(F,S),N===null)throw Qe(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw qt("WebGLRenderer: "+S.message),S}let Jt,R,x,B,V,Y,nt,at,Z,K,lt,yt,ut,ct,bt,At,Nt,I,st,$,ht,mt,j;function Mt(){Jt=new Wx(N),Jt.init(),ht=new FM(N,Jt),R=new Ux(N,Jt,t,ht),x=new DM(N,Jt),R.reversedDepthBuffer&&d&&x.buffers.depth.setReversed(!0),W=N.createFramebuffer(),X=N.createFramebuffer(),O=N.createFramebuffer(),B=new Yx(N),V=new _M,Y=new NM(N,Jt,x,V,R,ht,B),nt=new Hx(C),at=new J0(N),mt=new Nx(N,at),Z=new Xx(N,at,B,mt),K=new $x(N,Z,at,mt,B),I=new Zx(N,R,Y),bt=new Ox(V),lt=new xM(C,nt,Jt,R,mt,bt),yt=new VM(C,V),ut=new yM,ct=new AM(Jt),Nt=new Dx(C,nt,x,K,m,l),At=new LM(C,K,R),j=new GM(N,B,R,x),st=new Fx(N,Jt,B),$=new qx(N,Jt,B),B.programs=lt.programs,C.capabilities=R,C.extensions=Jt,C.properties=V,C.renderLists=ut,C.shadowMap=At,C.state=x,C.info=B}Mt(),v!==rn&&(E=new Jx(v,e.width,e.height,o,s,r));const xt=new zM(C,N);this.xr=xt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=Jt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Jt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(S){S!==void 0&&(et=S,this.setSize(J,rt,!1))},this.getSize=function(S){return S.set(J,rt)},this.setSize=function(S,F,G=!0){if(xt.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}J=S,rt=F,e.width=Math.floor(S*et),e.height=Math.floor(F*et),G===!0&&(e.style.width=S+"px",e.style.height=F+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(J*et,rt*et).floor()},this.setDrawingBufferSize=function(S,F,G){J=S,rt=F,et=G,e.width=Math.floor(S*G),e.height=Math.floor(F*G),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(v===rn){qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(Q)},this.getViewport=function(S){return S.copy(Tt)},this.setViewport=function(S,F,G,z){S.isVector4?Tt.set(S.x,S.y,S.z,S.w):Tt.set(S,F,G,z),x.viewport(Q.copy(Tt).multiplyScalar(et).round())},this.getScissor=function(S){return S.copy(xe)},this.setScissor=function(S,F,G,z){S.isVector4?xe.set(S.x,S.y,S.z,S.w):xe.set(S,F,G,z),x.scissor(ot.copy(xe).multiplyScalar(et).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(S){x.setScissorTest(kt=S)},this.setOpaqueSort=function(S){Pt=S},this.setTransparentSort=function(S){Dt=S},this.getClearColor=function(S){return S.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,G=!0){let z=0;if(S){let k=!1;if(q!==null){const pt=q.texture.format;k=g.has(pt)}if(k){const pt=q.texture.type,vt=p.has(pt),ft=Nt.getClearColor(),_t=Nt.getClearAlpha(),St=ft.r,Ft=ft.g,Bt=ft.b;vt?(y[0]=St,y[1]=Ft,y[2]=Bt,y[3]=_t,N.clearBufferuiv(N.COLOR,0,y)):(w[0]=St,w[1]=Ft,w[2]=Bt,w[3]=_t,N.clearBufferiv(N.COLOR,0,w))}else z|=N.COLOR_BUFFER_BIT}F&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),D=S},this.dispose=function(){e.removeEventListener("webglcontextlost",me,!1),e.removeEventListener("webglcontextrestored",oe,!1),e.removeEventListener("webglcontextcreationerror",Cn,!1),Nt.dispose(),ut.dispose(),ct.dispose(),V.dispose(),nt.dispose(),K.dispose(),mt.dispose(),j.dispose(),lt.dispose(),xt.dispose(),xt.removeEventListener("sessionstart",Ic),xt.removeEventListener("sessionend",Lc),Ti.stop()};function me(S){S.preventDefault(),xh("WebGLRenderer: Context Lost."),P=!0}function oe(){xh("WebGLRenderer: Context Restored."),P=!1;const S=B.autoReset,F=At.enabled,G=At.autoUpdate,z=At.needsUpdate,k=At.type;Mt(),B.autoReset=S,At.enabled=F,At.autoUpdate=G,At.needsUpdate=z,At.type=k}function Cn(S){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Pn(S){const F=S.target;F.removeEventListener("dispose",Pn),df(F)}function df(S){ff(S),V.remove(S)}function ff(S){const F=V.get(S).programs;F!==void 0&&(F.forEach(function(G){lt.releaseProgram(G)}),S.isShaderMaterial&&lt.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,G,z,k,pt){F===null&&(F=Ue);const vt=k.isMesh&&k.matrixWorld.determinantAffine()<0,ft=gf(S,F,G,z,k);x.setMaterial(z,vt);let _t=G.index,St=1;if(z.wireframe===!0){if(_t=Z.getWireframeAttribute(G),_t===void 0)return;St=2}const Ft=G.drawRange,Bt=G.attributes.position;let Et=Ft.start*St,te=(Ft.start+Ft.count)*St;pt!==null&&(Et=Math.max(Et,pt.start*St),te=Math.min(te,(pt.start+pt.count)*St)),_t!==null?(Et=Math.max(Et,0),te=Math.min(te,_t.count)):Bt!=null&&(Et=Math.max(Et,0),te=Math.min(te,Bt.count));const _e=te-Et;if(_e<0||_e===1/0)return;mt.setup(k,z,ft,G,_t);let ge,se=st;if(_t!==null&&(ge=at.get(_t),se=$,se.setIndex(ge)),k.isMesh)z.wireframe===!0?(x.setLineWidth(z.wireframeLinewidth*Se()),se.setMode(N.LINES)):se.setMode(N.TRIANGLES);else if(k.isLine){let ze=z.linewidth;ze===void 0&&(ze=1),x.setLineWidth(ze*Se()),k.isLineSegments?se.setMode(N.LINES):k.isLineLoop?se.setMode(N.LINE_LOOP):se.setMode(N.LINE_STRIP)}else k.isPoints?se.setMode(N.POINTS):k.isSprite&&se.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(Jt.get("WEBGL_multi_draw"))se.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const ze=k._multiDrawStarts,gt=k._multiDrawCounts,an=k._multiDrawCount,Xt=_t?at.get(_t).bytesPerElement:1,dn=V.get(z).currentProgram.getUniforms();for(let In=0;In<an;In++)dn.setValue(N,"_gl_DrawID",In),se.render(ze[In]/Xt,gt[In])}else if(k.isInstancedMesh)se.renderInstances(Et,_e,k.count);else if(G.isInstancedBufferGeometry){const ze=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,gt=Math.min(G.instanceCount,ze);se.renderInstances(Et,_e,gt)}else se.render(Et,_e)};function Pc(S,F,G){S.transparent===!0&&S.side===gn&&S.forceSinglePass===!1?(S.side=Je,S.needsUpdate=!0,Ar(S,F,G),S.side=ii,S.needsUpdate=!0,Ar(S,F,G),S.side=gn):Ar(S,F,G)}this.compile=function(S,F,G=null){G===null&&(G=S),b=ct.get(G),b.init(F),_.push(b),G.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(b.pushLight(k),k.castShadow&&b.pushShadow(k))}),S!==G&&S.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(b.pushLight(k),k.castShadow&&b.pushShadow(k))}),b.setupLights();const z=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const pt=k.material;if(pt)if(Array.isArray(pt))for(let vt=0;vt<pt.length;vt++){const ft=pt[vt];Pc(ft,G,k),z.add(ft)}else Pc(pt,G,k),z.add(pt)}),b=_.pop(),z},this.compileAsync=function(S,F,G=null){const z=this.compile(S,F,G);return new Promise(k=>{function pt(){if(z.forEach(function(vt){V.get(vt).currentProgram.isReady()&&z.delete(vt)}),z.size===0){k(S);return}setTimeout(pt,10)}Jt.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let Xa=null;function pf(S){Xa&&Xa(S)}function Ic(){Ti.stop()}function Lc(){Ti.start()}const Ti=new Vd;Ti.setAnimationLoop(pf),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(S){Xa=S,xt.setAnimationLoop(S),S===null?Ti.stop():Ti.start()},xt.addEventListener("sessionstart",Ic),xt.addEventListener("sessionend",Lc),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(S,F);const G=xt.enabled===!0&&xt.isPresenting===!0,z=E!==null&&(q===null||G)&&E.begin(C,q);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),xt.enabled===!0&&xt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(xt.cameraAutoUpdate===!0&&xt.updateCamera(F),F=xt.getCamera()),S.isScene===!0&&S.onBeforeRender(C,S,F,q),b=ct.get(S,_.length),b.init(F),b.state.textureUnits=Y.getTextureUnits(),_.push(b),ye.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ie.setFromProjectionMatrix(ye,kn,F.reversedDepth),Wt=this.localClippingEnabled,Zt=bt.init(this.clippingPlanes,Wt),T=ut.get(S,A.length),T.init(),A.push(T),xt.enabled===!0&&xt.isPresenting===!0){const vt=C.xr.getDepthSensingMesh();vt!==null&&qa(vt,F,-1/0,C.sortObjects)}qa(S,F,0,C.sortObjects),T.finish(),C.sortObjects===!0&&T.sort(Pt,Dt,F.reversedDepth),pe=xt.enabled===!1||xt.isPresenting===!1||xt.hasDepthSensing()===!1,pe&&Nt.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Zt===!0&&bt.beginShadows();const k=b.state.shadowsArray;if(At.render(k,S,F),Zt===!0&&bt.endShadows(),(z&&E.hasRenderPass())===!1){const vt=T.opaque,ft=T.transmissive;if(b.setupLights(),F.isArrayCamera){const _t=F.cameras;if(ft.length>0)for(let St=0,Ft=_t.length;St<Ft;St++){const Bt=_t[St];Nc(vt,ft,S,Bt)}pe&&Nt.render(S);for(let St=0,Ft=_t.length;St<Ft;St++){const Bt=_t[St];Dc(T,S,Bt,Bt.viewport)}}else ft.length>0&&Nc(vt,ft,S,F),pe&&Nt.render(S),Dc(T,S,F)}q!==null&&U===0&&(Y.updateMultisampleRenderTarget(q),Y.updateRenderTargetMipmap(q)),z&&E.end(C),S.isScene===!0&&S.onAfterRender(C,S,F),mt.resetDefaultState(),tt=-1,it=null,_.pop(),_.length>0?(b=_[_.length-1],Y.setTextureUnits(b.state.textureUnits),Zt===!0&&bt.setGlobalState(C.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?T=A[A.length-1]:T=null,D!==null&&D.renderEnd()};function qa(S,F,G,z){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)b.pushLightProbeGrid(S);else if(S.isLight)b.pushLight(S),S.castShadow&&b.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ie.intersectsSprite(S)){z&&Le.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ye);const vt=K.update(S),ft=S.material;ft.visible&&T.push(S,vt,ft,G,Le.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ie.intersectsObject(S))){const vt=K.update(S),ft=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Le.copy(S.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Le.copy(vt.boundingSphere.center)),Le.applyMatrix4(S.matrixWorld).applyMatrix4(ye)),Array.isArray(ft)){const _t=vt.groups;for(let St=0,Ft=_t.length;St<Ft;St++){const Bt=_t[St],Et=ft[Bt.materialIndex];Et&&Et.visible&&T.push(S,vt,Et,G,Le.z,Bt)}}else ft.visible&&T.push(S,vt,ft,G,Le.z,null)}}const pt=S.children;for(let vt=0,ft=pt.length;vt<ft;vt++)qa(pt[vt],F,G,z)}function Dc(S,F,G,z){const{opaque:k,transmissive:pt,transparent:vt}=S;b.setupLightsView(G),Zt===!0&&bt.setGlobalState(C.clippingPlanes,G),z&&x.viewport(Q.copy(z)),k.length>0&&Tr(k,F,G),pt.length>0&&Tr(pt,F,G),vt.length>0&&Tr(vt,F,G),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Nc(S,F,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[z.id]===void 0){const Et=Jt.has("EXT_color_buffer_half_float")||Jt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[z.id]=new An(1,1,{generateMipmaps:!0,type:Et?si:rn,minFilter:zn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Gt.workingColorSpace})}const pt=b.state.transmissionRenderTarget[z.id],vt=z.viewport||Q;pt.setSize(vt.z*C.transmissionResolutionScale,vt.w*C.transmissionResolutionScale);const ft=C.getRenderTarget(),_t=C.getActiveCubeFace(),St=C.getActiveMipmapLevel();C.setRenderTarget(pt),C.getClearColor(Kt),Vt=C.getClearAlpha(),Vt<1&&C.setClearColor(16777215,.5),C.clear(),pe&&Nt.render(G);const Ft=C.toneMapping;C.toneMapping=Hn;const Bt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),b.setupLightsView(z),Zt===!0&&bt.setGlobalState(C.clippingPlanes,z),Tr(S,G,z),Y.updateMultisampleRenderTarget(pt),Y.updateRenderTargetMipmap(pt),Jt.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let te=0,_e=F.length;te<_e;te++){const ge=F[te],{object:se,geometry:ze,material:gt,group:an}=ge;if(gt.side===gn&&se.layers.test(z.layers)){const Xt=gt.side;gt.side=Je,gt.needsUpdate=!0,Fc(se,G,z,ze,gt,an),gt.side=Xt,gt.needsUpdate=!0,Et=!0}}Et===!0&&(Y.updateMultisampleRenderTarget(pt),Y.updateRenderTargetMipmap(pt))}C.setRenderTarget(ft,_t,St),C.setClearColor(Kt,Vt),Bt!==void 0&&(z.viewport=Bt),C.toneMapping=Ft}function Tr(S,F,G){const z=F.isScene===!0?F.overrideMaterial:null;for(let k=0,pt=S.length;k<pt;k++){const vt=S[k],{object:ft,geometry:_t,group:St}=vt;let Ft=vt.material;Ft.allowOverride===!0&&z!==null&&(Ft=z),ft.layers.test(G.layers)&&Fc(ft,F,G,_t,Ft,St)}}function Fc(S,F,G,z,k,pt){S.onBeforeRender(C,F,G,z,k,pt),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(C,F,G,z,S,pt),k.transparent===!0&&k.side===gn&&k.forceSinglePass===!1?(k.side=Je,k.needsUpdate=!0,C.renderBufferDirect(G,F,z,k,S,pt),k.side=ii,k.needsUpdate=!0,C.renderBufferDirect(G,F,z,k,S,pt),k.side=gn):C.renderBufferDirect(G,F,z,k,S,pt),S.onAfterRender(C,F,G,z,k,pt)}function Ar(S,F,G){F.isScene!==!0&&(F=Ue);const z=V.get(S),k=b.state.lights,pt=b.state.shadowsArray,vt=k.state.version,ft=lt.getParameters(S,k.state,pt,F,G,b.state.lightProbeGridArray),_t=lt.getProgramCacheKey(ft);let St=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,z.fog=F.fog;const Ft=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=nt.get(S.envMap||z.environment,Ft),z.envMapRotation=z.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,St===void 0&&(S.addEventListener("dispose",Pn),St=new Map,z.programs=St);let Bt=St.get(_t);if(Bt!==void 0){if(z.currentProgram===Bt&&z.lightsStateVersion===vt)return Oc(S,ft),Bt}else ft.uniforms=lt.getUniforms(S),D!==null&&S.isNodeMaterial&&D.build(S,G,ft),S.onBeforeCompile(ft,C),Bt=lt.acquireProgram(ft,_t),St.set(_t,Bt),z.uniforms=ft.uniforms;const Et=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Et.clippingPlanes=bt.uniform),Oc(S,ft),z.needsLights=xf(S),z.lightsStateVersion=vt,z.needsLights&&(Et.ambientLightColor.value=k.state.ambient,Et.lightProbe.value=k.state.probe,Et.directionalLights.value=k.state.directional,Et.directionalLightShadows.value=k.state.directionalShadow,Et.spotLights.value=k.state.spot,Et.spotLightShadows.value=k.state.spotShadow,Et.rectAreaLights.value=k.state.rectArea,Et.ltc_1.value=k.state.rectAreaLTC1,Et.ltc_2.value=k.state.rectAreaLTC2,Et.pointLights.value=k.state.point,Et.pointLightShadows.value=k.state.pointShadow,Et.hemisphereLights.value=k.state.hemi,Et.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Et.spotLightMatrix.value=k.state.spotLightMatrix,Et.spotLightMap.value=k.state.spotLightMap,Et.pointShadowMatrix.value=k.state.pointShadowMatrix),z.lightProbeGrid=b.state.lightProbeGridArray.length>0,z.currentProgram=Bt,z.uniformsList=null,Bt}function Uc(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=_a.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function Oc(S,F){const G=V.get(S);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function mf(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(F.matrixWorld);for(let G=0,z=S.length;G<z;G++){const k=S[G];if(k.texture!==null&&k.boundingBox.containsPoint(M))return k}return null}function gf(S,F,G,z,k){F.isScene!==!0&&(F=Ue),Y.resetTextureUnits();const pt=F.fog,vt=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?F.environment:null,ft=q===null?C.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Gt.workingColorSpace,_t=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,St=nt.get(z.envMap||vt,_t),Ft=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Bt=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Et=!!G.morphAttributes.position,te=!!G.morphAttributes.normal,_e=!!G.morphAttributes.color;let ge=Hn;z.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(ge=C.toneMapping);const se=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ze=se!==void 0?se.length:0,gt=V.get(z),an=b.state.lights;if(Zt===!0&&(Wt===!0||S!==it)){const le=S===it&&z.id===tt;bt.setState(z,S,le)}let Xt=!1;z.version===gt.__version?(gt.needsLights&&gt.lightsStateVersion!==an.state.version||gt.outputColorSpace!==ft||k.isBatchedMesh&&gt.batching===!1||!k.isBatchedMesh&&gt.batching===!0||k.isBatchedMesh&&gt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&gt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&gt.instancing===!1||!k.isInstancedMesh&&gt.instancing===!0||k.isSkinnedMesh&&gt.skinning===!1||!k.isSkinnedMesh&&gt.skinning===!0||k.isInstancedMesh&&gt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&gt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&gt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&gt.instancingMorph===!1&&k.morphTexture!==null||gt.envMap!==St||z.fog===!0&&gt.fog!==pt||gt.numClippingPlanes!==void 0&&(gt.numClippingPlanes!==bt.numPlanes||gt.numIntersection!==bt.numIntersection)||gt.vertexAlphas!==Ft||gt.vertexTangents!==Bt||gt.morphTargets!==Et||gt.morphNormals!==te||gt.morphColors!==_e||gt.toneMapping!==ge||gt.morphTargetsCount!==ze||!!gt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Xt=!0):(Xt=!0,gt.__version=z.version);let dn=gt.currentProgram;Xt===!0&&(dn=Ar(z,F,k),D&&z.isNodeMaterial&&D.onUpdateProgram(z,dn,gt));let In=!1,oi=!1,Qi=!1;const re=dn.getUniforms(),Me=gt.uniforms;if(x.useProgram(dn.program)&&(In=!0,oi=!0,Qi=!0),z.id!==tt&&(tt=z.id,oi=!0),gt.needsLights){const le=mf(b.state.lightProbeGridArray,k);gt.lightProbeGrid!==le&&(gt.lightProbeGrid=le,oi=!0)}if(In||it!==S){x.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),re.setValue(N,"projectionMatrix",S.projectionMatrix),re.setValue(N,"viewMatrix",S.matrixWorldInverse);const ci=re.map.cameraPosition;ci!==void 0&&ci.setValue(N,Te.setFromMatrixPosition(S.matrixWorld)),R.logarithmicDepthBuffer&&re.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&re.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),it!==S&&(it=S,oi=!0,Qi=!0)}if(gt.needsLights&&(an.state.directionalShadowMap.length>0&&re.setValue(N,"directionalShadowMap",an.state.directionalShadowMap,Y),an.state.spotShadowMap.length>0&&re.setValue(N,"spotShadowMap",an.state.spotShadowMap,Y),an.state.pointShadowMap.length>0&&re.setValue(N,"pointShadowMap",an.state.pointShadowMap,Y)),k.isSkinnedMesh){re.setOptional(N,k,"bindMatrix"),re.setOptional(N,k,"bindMatrixInverse");const le=k.skeleton;le&&(le.boneTexture===null&&le.computeBoneTexture(),re.setValue(N,"boneTexture",le.boneTexture,Y))}k.isBatchedMesh&&(re.setOptional(N,k,"batchingTexture"),re.setValue(N,"batchingTexture",k._matricesTexture,Y),re.setOptional(N,k,"batchingIdTexture"),re.setValue(N,"batchingIdTexture",k._indirectTexture,Y),re.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&re.setValue(N,"batchingColorTexture",k._colorsTexture,Y));const li=G.morphAttributes;if((li.position!==void 0||li.normal!==void 0||li.color!==void 0)&&I.update(k,G,dn),(oi||gt.receiveShadow!==k.receiveShadow)&&(gt.receiveShadow=k.receiveShadow,re.setValue(N,"receiveShadow",k.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&F.environment!==null&&(Me.envMapIntensity.value=F.environmentIntensity),Me.dfgLUT!==void 0&&(Me.dfgLUT.value=WM()),oi){if(re.setValue(N,"toneMappingExposure",C.toneMappingExposure),gt.needsLights&&vf(Me,Qi),pt&&z.fog===!0&&yt.refreshFogUniforms(Me,pt),yt.refreshMaterialUniforms(Me,z,et,rt,b.state.transmissionRenderTarget[S.id]),gt.needsLights&&gt.lightProbeGrid){const le=gt.lightProbeGrid;Me.probesSH.value=le.texture,Me.probesMin.value.copy(le.boundingBox.min),Me.probesMax.value.copy(le.boundingBox.max),Me.probesResolution.value.copy(le.resolution)}_a.upload(N,Uc(gt),Me,Y)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(_a.upload(N,Uc(gt),Me,Y),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&re.setValue(N,"center",k.center),re.setValue(N,"modelViewMatrix",k.modelViewMatrix),re.setValue(N,"normalMatrix",k.normalMatrix),re.setValue(N,"modelMatrix",k.matrixWorld),z.uniformsGroups!==void 0){const le=z.uniformsGroups;for(let ci=0,ji=le.length;ci<ji;ci++){const Bc=le[ci];j.update(Bc,dn),j.bind(Bc,dn)}}return dn}function vf(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function xf(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(S,F,G){const z=V.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),V.get(S.texture).__webglTexture=F,V.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){const G=V.get(S);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,G=0){q=S,H=F,U=G;let z=null,k=!1,pt=!1;if(S){const ft=V.get(S);if(ft.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(N.FRAMEBUFFER,ft.__webglFramebuffer),Q.copy(S.viewport),ot.copy(S.scissor),zt=S.scissorTest,x.viewport(Q),x.scissor(ot),x.setScissorTest(zt),tt=-1;return}else if(ft.__webglFramebuffer===void 0)Y.setupRenderTarget(S);else if(ft.__hasExternalTextures)Y.rebindTextures(S,V.get(S.texture).__webglTexture,V.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ft=S.depthTexture;if(ft.__boundDepthTexture!==Ft){if(Ft!==null&&V.has(Ft)&&(S.width!==Ft.image.width||S.height!==Ft.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(S)}}const _t=S.texture;(_t.isData3DTexture||_t.isDataArrayTexture||_t.isCompressedArrayTexture)&&(pt=!0);const St=V.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(St[F])?z=St[F][G]:z=St[F],k=!0):S.samples>0&&Y.useMultisampledRTT(S)===!1?z=V.get(S).__webglMultisampledFramebuffer:Array.isArray(St)?z=St[G]:z=St,Q.copy(S.viewport),ot.copy(S.scissor),zt=S.scissorTest}else Q.copy(Tt).multiplyScalar(et).floor(),ot.copy(xe).multiplyScalar(et).floor(),zt=kt;if(G!==0&&(z=W),x.bindFramebuffer(N.FRAMEBUFFER,z)&&x.drawBuffers(S,z),x.viewport(Q),x.scissor(ot),x.setScissorTest(zt),k){const ft=V.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,ft.__webglTexture,G)}else if(pt){const ft=F;for(let _t=0;_t<S.textures.length;_t++){const St=V.get(S.textures[_t]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+_t,St.__webglTexture,G,ft)}}else if(S!==null&&G!==0){const ft=V.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ft.__webglTexture,G)}tt=-1},this.readRenderTargetPixels=function(S,F,G,z,k,pt,vt,ft=0){if(!(S&&S.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&vt!==void 0&&(_t=_t[vt]),_t){x.bindFramebuffer(N.FRAMEBUFFER,_t);try{const St=S.textures[ft],Ft=St.format,Bt=St.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ft),!R.textureFormatReadable(Ft)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(Bt)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-z&&G>=0&&G<=S.height-k&&N.readPixels(F,G,z,k,ht.convert(Ft),ht.convert(Bt),pt)}finally{const St=q!==null?V.get(q).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(S,F,G,z,k,pt,vt,ft=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&vt!==void 0&&(_t=_t[vt]),_t)if(F>=0&&F<=S.width-z&&G>=0&&G<=S.height-k){x.bindFramebuffer(N.FRAMEBUFFER,_t);const St=S.textures[ft],Ft=St.format,Bt=St.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ft),!R.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Et=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Et),N.bufferData(N.PIXEL_PACK_BUFFER,pt.byteLength,N.STREAM_READ),N.readPixels(F,G,z,k,ht.convert(Ft),ht.convert(Bt),0);const te=q!==null?V.get(q).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,te);const _e=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await h0(N,_e,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Et),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pt),N.deleteBuffer(Et),N.deleteSync(_e),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,G=0){const z=Math.pow(2,-G),k=Math.floor(S.image.width*z),pt=Math.floor(S.image.height*z),vt=F!==null?F.x:0,ft=F!==null?F.y:0;Y.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,vt,ft,k,pt),x.unbindTexture()},this.copyTextureToTexture=function(S,F,G=null,z=null,k=0,pt=0){let vt,ft,_t,St,Ft,Bt,Et,te,_e;const ge=S.isCompressedTexture?S.mipmaps[pt]:S.image;if(G!==null)vt=G.max.x-G.min.x,ft=G.max.y-G.min.y,_t=G.isBox3?G.max.z-G.min.z:1,St=G.min.x,Ft=G.min.y,Bt=G.isBox3?G.min.z:0;else{const Me=Math.pow(2,-k);vt=Math.floor(ge.width*Me),ft=Math.floor(ge.height*Me),S.isDataArrayTexture?_t=ge.depth:S.isData3DTexture?_t=Math.floor(ge.depth*Me):_t=1,St=0,Ft=0,Bt=0}z!==null?(Et=z.x,te=z.y,_e=z.z):(Et=0,te=0,_e=0);const se=ht.convert(F.format),ze=ht.convert(F.type);let gt;F.isData3DTexture?(Y.setTexture3D(F,0),gt=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Y.setTexture2DArray(F,0),gt=N.TEXTURE_2D_ARRAY):(Y.setTexture2D(F,0),gt=N.TEXTURE_2D),x.activeTexture(N.TEXTURE0),x.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),x.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),x.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const an=x.getParameter(N.UNPACK_ROW_LENGTH),Xt=x.getParameter(N.UNPACK_IMAGE_HEIGHT),dn=x.getParameter(N.UNPACK_SKIP_PIXELS),In=x.getParameter(N.UNPACK_SKIP_ROWS),oi=x.getParameter(N.UNPACK_SKIP_IMAGES);x.pixelStorei(N.UNPACK_ROW_LENGTH,ge.width),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ge.height),x.pixelStorei(N.UNPACK_SKIP_PIXELS,St),x.pixelStorei(N.UNPACK_SKIP_ROWS,Ft),x.pixelStorei(N.UNPACK_SKIP_IMAGES,Bt);const Qi=S.isDataArrayTexture||S.isData3DTexture,re=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const Me=V.get(S),li=V.get(F),le=V.get(Me.__renderTarget),ci=V.get(li.__renderTarget);x.bindFramebuffer(N.READ_FRAMEBUFFER,le.__webglFramebuffer),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,ci.__webglFramebuffer);for(let ji=0;ji<_t;ji++)Qi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(S).__webglTexture,k,Bt+ji),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(F).__webglTexture,pt,_e+ji)),N.blitFramebuffer(St,Ft,vt,ft,Et,te,vt,ft,N.DEPTH_BUFFER_BIT,N.NEAREST);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||V.has(S)){const Me=V.get(S),li=V.get(F);x.bindFramebuffer(N.READ_FRAMEBUFFER,X),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,O);for(let le=0;le<_t;le++)Qi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Me.__webglTexture,k,Bt+le):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Me.__webglTexture,k),re?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,li.__webglTexture,pt,_e+le):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,li.__webglTexture,pt),k!==0?N.blitFramebuffer(St,Ft,vt,ft,Et,te,vt,ft,N.COLOR_BUFFER_BIT,N.NEAREST):re?N.copyTexSubImage3D(gt,pt,Et,te,_e+le,St,Ft,vt,ft):N.copyTexSubImage2D(gt,pt,Et,te,St,Ft,vt,ft);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else re?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(gt,pt,Et,te,_e,vt,ft,_t,se,ze,ge.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(gt,pt,Et,te,_e,vt,ft,_t,se,ge.data):N.texSubImage3D(gt,pt,Et,te,_e,vt,ft,_t,se,ze,ge):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pt,Et,te,vt,ft,se,ze,ge.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pt,Et,te,ge.width,ge.height,se,ge.data):N.texSubImage2D(N.TEXTURE_2D,pt,Et,te,vt,ft,se,ze,ge);x.pixelStorei(N.UNPACK_ROW_LENGTH,an),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Xt),x.pixelStorei(N.UNPACK_SKIP_PIXELS,dn),x.pixelStorei(N.UNPACK_SKIP_ROWS,In),x.pixelStorei(N.UNPACK_SKIP_IMAGES,oi),pt===0&&F.generateMipmaps&&N.generateMipmap(gt),x.unbindTexture()},this.initRenderTarget=function(S){V.get(S).__webglFramebuffer===void 0&&Y.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Y.setTextureCube(S,0):S.isData3DTexture?Y.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Y.setTexture2DArray(S,0):Y.setTexture2D(S,0),x.unbindTexture()},this.resetState=function(){H=0,U=0,q=null,x.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Gt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Gt._getUnpackColorSpace()}}class qM extends La{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new ve;t.deleteAttribute("uv");const e=new Re({side:Je}),n=new Re,s=new Ec(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new jt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Bs(t,n,6),o=new we;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new jt(t,_s(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new jt(t,_s(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new jt(t,_s(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new jt(t,_s(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new jt(t,_s(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new jt(t,_s(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function _s(i){return new G0({color:0,emissive:16777215,emissiveIntensity:i})}const Ut={bodyAlbedo:11817007,eye:1842204,eyeFlash:16742954,splat:15884554,gold:11569758,shellWarm:15263453,shellCool:13095385,mechDark:1710622,coreDark:395563,violetDeep:2958169,violet:8481213,violetRim:15065333,structDark:1515560,structMid:2700355,structHi:3361379,panel:5399675,steelPale:11387080,cyan:3319759,cyanPale:9230551},wn={roughness:.26,edgeRoughness:.5,edgeValue:.84,emissive:.12},Sn={skyColor:6131632,groundColor:5003883,hemiIntensity:1.4,keyColor:14477552,keyIntensity:.62,environmentIntensity:.4,background:855827,fogNear:34,fogFar:96,exposure:1.1};function $d(){return typeof window<"u"&&typeof window.matchMedia=="function"?i=>window.matchMedia(i):null}function Kd(i=typeof navigator<"u"?navigator:{},t=$d()){return(t?t("(pointer: coarse)").matches:!1)&&(i.maxTouchPoints??0)>=1}function YM(i,t,e){const n=i.get("touch");return n==="1"?!0:n==="0"?!1:Kd(t,e)}const Jd={high:{level:"high",pixelRatioCap:2,maxFixtures:10,shadows:!0,shadowMapSize:1024,anisotropyCap:16,paintTexelsPerMetre:20,paintMapMax:2048,decalCapacity:160,dropletCapacity:160,flashCapacity:8,impactCapacity:12,projectileLights:2,projectileShader:!0,prewarmShaders:!0},medium:{level:"medium",pixelRatioCap:1.5,maxFixtures:7,shadows:!0,shadowMapSize:512,anisotropyCap:8,paintTexelsPerMetre:14,paintMapMax:1024,decalCapacity:96,dropletCapacity:96,flashCapacity:6,impactCapacity:8,projectileLights:2,projectileShader:!0,prewarmShaders:!0},low:{level:"low",pixelRatioCap:1,maxFixtures:4,shadows:!1,shadowMapSize:512,anisotropyCap:4,paintTexelsPerMetre:9,paintMapMax:512,decalCapacity:48,dropletCapacity:48,flashCapacity:4,impactCapacity:6,projectileLights:1,projectileShader:!1,prewarmShaders:!0}};function Qd(i){return Jd[i]}function yr(i){return i==="high"||i==="medium"||i==="low"}function jd(i=typeof navigator<"u"?navigator:{},t=$d()){return Kd(i,t)?"low":(i.hardwareConcurrency??8)<=4?"medium":"high"}function ZM(i){const t=i.get("quality"),e=yr(t)?t:jd(),n=Jd[e];return i.get("basicfx")==="1"&&n.projectileShader?{...n,projectileShader:!1}:n}const uu=Math.PI/180,cr={worldFovY:75,weaponFovY:52,maxPortraitFovY:100};function du(i,t){if(!(t>0)||t>=1)return i;const e=2*Math.atan(Math.tan(i*uu/2)/t)/uu;return Math.min(e,cr.maxPortraitFovY)}const fu=2;class $M{renderer;scene;camera;viewScene;viewCamera;key;hemi;environment;fixtures=[];placements=[];chosen=[];chosenDistance=[];lastFixtureX=Number.NaN;lastFixtureZ=Number.NaN;sizedWidth=-1;sizedHeight=-1;sizedRatio=-1;maxPixelRatio;quality;keyHeight=3.9;constructor(t,e=Qd("high")){this.quality=e,this.maxPixelRatio=e.pixelRatioCap,this.renderer=new XM({canvas:t,antialias:e.level!=="low",powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.maxPixelRatio)),this.renderer.outputColorSpace=$e,this.renderer.toneMapping=ac,this.renderer.toneMappingExposure=Sn.exposure,this.renderer.shadowMap.enabled=e.shadows,this.renderer.shadowMap.type=fr,this.renderer.autoClear=!1,this.renderer.info.autoReset=!1,this.scene=new La,this.scene.background=new Ct(Sn.background),this.scene.fog=new vc(Sn.background,Sn.fogNear,Sn.fogFar),this.camera=new nn(cr.worldFovY,1,.1,200),this.hemi=new Uh(Sn.skyColor,Sn.groundColor,Sn.hemiIntensity),this.scene.add(this.hemi),this.key=new Vh(Sn.keyColor,Sn.keyIntensity),this.key.castShadow=e.shadows,this.key.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize),this.key.shadow.bias=-.0016,this.key.shadow.normalBias=.03;const n=this.key.shadow.camera;n.near=.5,n.far=38,n.left=-14,n.right=14,n.top=14,n.bottom=-14,n.updateProjectionMatrix(),this.scene.add(this.key),this.scene.add(this.key.target);const s=new kl(this.renderer);this.environment=s.fromScene(new qM,.04).texture,s.dispose(),this.scene.environment=this.environment,this.scene.environmentIntensity=Sn.environmentIntensity,this.viewScene=new La,this.viewScene.environment=this.environment,this.viewScene.environmentIntensity=1,this.viewCamera=new nn(cr.weaponFovY,1,.01,12);const r=new Vh(16777215,2.1);r.position.set(.7,1.2,1.4),this.viewScene.add(r),this.viewScene.add(new Uh(10470624,2761504,1)),this.resize()}resize(){const t=window.innerWidth,e=window.innerHeight,n=Math.min(window.devicePixelRatio,this.maxPixelRatio);if(t===this.sizedWidth&&e===this.sizedHeight&&n===this.sizedRatio)return!1;this.sizedWidth=t,this.sizedHeight=e,this.sizedRatio=n,this.renderer.setPixelRatio(n),this.renderer.setSize(t,e,!1);const s=t/Math.max(1,e);return this.camera.aspect=s,this.camera.fov=du(cr.worldFovY,s),this.camera.updateProjectionMatrix(),this.viewCamera.aspect=s,this.viewCamera.fov=du(cr.weaponFovY,s),this.viewCamera.updateProjectionMatrix(),!0}setMaxPixelRatio(t){this.maxPixelRatio=Math.max(1,t)}get pixelRatioCap(){return this.maxPixelRatio}get maxAnisotropy(){return Math.min(this.renderer.capabilities.getMaxAnisotropy(),this.quality.anisotropyCap)}configureForFacility(t){this.clearFixtures(),this.placements=t.rooms.flatMap(s=>s.lights);const e=Math.min(this.quality.maxFixtures,this.placements.length);for(let s=0;s<e;s++){const r=new Ec(16777215,0,1,2);this.scene.add(r),this.fixtures.push(r)}this.lastFixtureX=Number.NaN,this.lastFixtureZ=Number.NaN;let n=4;for(const s of t.rooms)n=Math.max(n,s.ceilY);this.keyHeight=n-.7}setFixtureFocus(t,e){if(this.fixtures.length===0)return;const n=t-this.lastFixtureX,s=e-this.lastFixtureZ;if(Number.isFinite(n)&&n*n+s*s<fu*fu)return;this.lastFixtureX=t,this.lastFixtureZ=e;const r=this.fixtures.length;this.chosen.length=0,this.chosenDistance.length=0;for(let a=0;a<this.placements.length;a++){const o=this.placements[a],l=o.x-t,c=o.z-e,h=l*l+c*c;if(this.chosen.length===r&&h>=this.chosenDistance[r-1])continue;let u=this.chosen.length<r?this.chosen.length:r-1;for(;u>0&&this.chosenDistance[u-1]>h;)this.chosen[u]=this.chosen[u-1],this.chosenDistance[u]=this.chosenDistance[u-1],u--;this.chosen[u]=a,this.chosenDistance[u]=h}for(let a=0;a<r;a++){const o=this.fixtures[a],l=this.placements[this.chosen[a]??-1];if(!l){o.intensity=0;continue}o.position.set(l.x,l.y,l.z),o.color.setHex(l.color),o.intensity=l.intensity,o.distance=l.distance}}setShadowFocus(t,e){this.key.position.set(t+6,this.keyHeight,e+8),this.key.target.position.set(t,0,e),this.key.target.updateMatrixWorld()}prewarm(){this.quality.prewarmShaders&&(this.renderer.compile(this.scene,this.camera),this.renderer.compile(this.viewScene,this.viewCamera),this.render())}render(){this.renderer.info.reset(),this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.renderer.clearDepth(),this.renderer.render(this.viewScene,this.viewCamera)}get drawCalls(){return this.renderer.info.render.calls}get triangles(){return this.renderer.info.render.triangles}get programCount(){return this.renderer.info.programs?.length??0}get geometryCount(){return this.renderer.info.memory.geometries}get textureCount(){return this.renderer.info.memory.textures}get lightCount(){return this.fixtures.length}get pointLightCount(){let t=0;return this.scene.traverseVisible(e=>{e.isPointLight&&t++}),t}get fixtureCount(){return this.placements.length}clearFixtures(){for(const t of this.fixtures)this.scene.remove(t),t.dispose();this.fixtures.length=0}dispose(){this.clearFixtures(),this.key.shadow.map?.dispose(),this.key.shadow.map=null,this.environment.dispose(),this.renderer.dispose()}}const Ms={step:.75,floor:1,minSamples:600,breachRatio:.2};class KM{cap;enabledFlag;downgradeCount=0;eligibleFrames=0;constructor(t,e){this.cap=t,this.enabledFlag=e}get pixelRatioCap(){return this.cap}get downgrades(){return this.downgradeCount}get enabled(){return this.enabledFlag}get exhausted(){return this.cap<=Ms.floor}setEnabled(t){this.enabledFlag!==t&&(this.enabledFlag=t,this.eligibleFrames=0)}setBase(t){return this.eligibleFrames=0,this.downgradeCount=0,this.cap===t?!1:(this.cap=t,!0)}consider(t){if(!this.enabledFlag||this.exhausted)return!1;if(!t.runActive||!t.visible||t.timerScheduled)return this.eligibleFrames=0,!1;if(this.eligibleFrames++,this.eligibleFrames<Ms.minSamples||t.samples<Ms.minSamples||t.breaches/t.samples<Ms.breachRatio)return!1;const e=Math.max(Ms.floor,this.cap*Ms.step);return this.eligibleFrames=0,e===this.cap?!1:(this.cap=e,this.downgradeCount++,!0)}}const JM={floorPlate:2,wallPanel:2,structure:1,ceilingPanel:2,machine:1,machineDark:1,hazard:.5,glass:1,emissive:1,lamp:1,emergency:1};function Yi(i){const t=document.createElement("canvas");t.width=i,t.height=i;const e=t.getContext("2d");if(!e)throw new Error("2D canvas context unavailable — cannot generate lab textures");return{ctx:e,el:t}}function Ni(i,t,e=!0){const n=new _c(i);return n.wrapS=Xi,n.wrapT=Xi,n.colorSpace=e?$e:En,n.anisotropy=t,n.generateMipmaps=!0,n.minFilter=zn,n}function Wn(i){return`#${i.toString(16).padStart(6,"0")}`}function wr(i,t,e,n,s){for(let r=0;r<n;r++){const a=e()*t,o=e()*t,l=1+e()*3,c=1+e()*3,h=e()<.6;i.fillStyle=h?`rgba(0,0,0,${s})`:`rgba(255,255,255,${s*.7})`,i.fillRect(a,o,l,c)}}function Hl(i,t,e,n){i.fillStyle="rgba(0,0,0,0.34)",i.beginPath(),i.arc(t,e+n*.35,n,0,Math.PI*2),i.fill(),i.fillStyle="rgba(255,255,255,0.16)",i.beginPath(),i.arc(t,e,n,0,Math.PI*2),i.fill()}function QM(i,t){const{ctx:e,el:n}=Yi(i),s=i*.028;e.fillStyle=Wn(Ut.structDark),e.fillRect(0,0,i,i),e.fillStyle=Wn(Ut.structMid),e.fillRect(s,s,i-s*2,i-s*2),e.fillStyle="rgba(255,255,255,0.05)",e.fillRect(s,s,i-s*2,s*.9),e.fillStyle="rgba(0,0,0,0.18)",e.fillRect(s,i-s*1.9,i-s*2,s*.9),e.strokeStyle="rgba(0,0,0,0.22)",e.lineWidth=Math.max(1,i*.006),e.beginPath(),e.moveTo(i/2,s),e.lineTo(i/2,i-s),e.moveTo(s,i/2),e.lineTo(i-s,i/2),e.stroke();const r=i*.014;for(const[o,l]of[[s*2.6,s*2.6],[i-s*2.6,s*2.6],[s*2.6,i-s*2.6],[i-s*2.6,i-s*2.6]])Hl(e,o,l,r);wr(e,i,t,260,.06);const a=Yi(i);return a.ctx.fillStyle="#ffffff",a.ctx.fillRect(0,0,i,i),a.ctx.fillStyle="#b9b9b9",a.ctx.fillRect(s,s,i-s*2,i-s*2),a.ctx.strokeStyle="rgba(255,255,255,0.5)",a.ctx.lineWidth=Math.max(1,i*.006),a.ctx.beginPath(),a.ctx.moveTo(i/2,s),a.ctx.lineTo(i/2,i-s),a.ctx.moveTo(s,i/2),a.ctx.lineTo(i-s,i/2),a.ctx.stroke(),{albedo:n,rough:a.el}}function jM(i,t){const{ctx:e,el:n}=Yi(i),s=i*.022;e.fillStyle=Wn(Ut.structMid),e.fillRect(0,0,i,i),e.fillStyle=Wn(Ut.panel),e.fillRect(s,s,i-s*2,i-s*2),e.fillStyle=Wn(Ut.structMid),e.fillRect(0,i/2-s/2,i,s),e.fillStyle="rgba(0,0,0,0.16)",e.fillRect(i*.16,i*.09,i*.68,i*.28),e.fillStyle="rgba(255,255,255,0.07)",e.fillRect(i*.16,i*.09,i*.68,i*.014);const r=i*.011;for(let a=0;a<4;a++){const o=i*(.09+a*.273);Hl(e,o,i*.55,r),Hl(e,o,i*.94,r)}for(let a=0;a<26;a++){const o=t()*i,l=1+t()*2.5;e.fillStyle=`rgba(0,0,0,${.02+t()*.03})`,e.fillRect(o,s,l,i-s*2)}return wr(e,i,t,160,.045),n}function ty(i,t){const{ctx:e,el:n}=Yi(i);e.fillStyle=Wn(Ut.structDark),e.fillRect(0,0,i,i),e.fillStyle=Wn(Ut.structHi),e.fillRect(0,i*.1,i,i*.8);for(let s=0;s<6;s++){const r=i*(.16+s*.13);e.fillStyle="rgba(0,0,0,0.24)",e.fillRect(0,r,i,i*.028),e.fillStyle="rgba(255,255,255,0.08)",e.fillRect(0,r+i*.028,i,i*.012)}return wr(e,i,t,120,.05),n}function ey(i,t){const{ctx:e,el:n}=Yi(i);e.fillStyle=Wn(Ut.structHi),e.fillRect(0,0,i,i);const s=i/2,r=s*.09;for(let a=0;a<2;a++)for(let o=0;o<2;o++)e.fillStyle=Wn(Ut.panel),e.fillRect(o*s+r,a*s+r,s-r*2,s-r*2),e.fillStyle="rgba(255,255,255,0.1)",e.fillRect(o*s+r,a*s+r,s-r*2,r*.5),e.fillStyle="rgba(0,0,0,0.16)",e.fillRect(o*s+r,a*s+s-r*1.5,s-r*2,r*.5);return wr(e,i,t,90,.035),n}function ny(i,t){const{ctx:e,el:n}=Yi(i);e.fillStyle=Wn(Ut.steelPale),e.fillRect(0,0,i,i),e.fillStyle="rgba(0,0,0,0.14)",e.fillRect(0,i*.46,i,i*.03),e.fillStyle="rgba(255,255,255,0.28)",e.fillRect(0,i*.49,i,i*.012);for(let r=0;r<7;r++)e.fillStyle="rgba(0,0,0,0.34)",e.fillRect(i*(.14+r*.104),i*.64,i*.05,i*.2);const s=e.createLinearGradient(0,i*.7,0,i);return s.addColorStop(0,"rgba(23,32,40,0)"),s.addColorStop(1,"rgba(23,32,40,0.42)"),e.fillStyle=s,e.fillRect(0,i*.7,i,i*.3),wr(e,i,t,140,.05),n}function iy(i){const{ctx:t,el:e}=Yi(i);t.fillStyle="#161514",t.fillRect(0,0,i,i),t.strokeStyle="#c9a227",t.lineWidth=i*.22,t.beginPath();for(let n=-2;n<4;n++){const s=n*i*.5;t.moveTo(s,0),t.lineTo(s+i,i)}return t.stroke(),e}function sy(i){const t=Fe("clawd-lab-kit","dressing"),e=Math.min(8,Math.max(1,i)),n=QM(512,t),s=Ni(n.albedo,e),r=Ni(n.rough,e,!1),a=Ni(jM(512,t),e),o=Ni(ty(256,t),e),l=Ni(ey(256,t),e),c=Ni(ny(256,t),e),h=Ni(iy(128),e),u=[s,r,a,o,l,c,h],d={floorPlate:new Re({map:s,roughnessMap:r,roughness:.85,metalness:.22}),wallPanel:new Re({map:a,roughness:.8,metalness:.1}),structure:new Re({map:o,roughness:.66,metalness:.34}),ceilingPanel:new Re({map:l,roughness:.86,metalness:.08,color:12898264}),machine:new Re({map:c,roughness:.52,metalness:.18}),machineDark:new Re({color:Ut.structDark,roughness:.58,metalness:.45}),hazard:new Re({map:h,roughness:.74,metalness:.12}),glass:new Re({color:Ut.steelPale,roughness:.06,metalness:0,transparent:!0,opacity:.24,side:gn,depthWrite:!1}),emissive:new un({color:Ut.cyan,toneMapped:!0}),lamp:new un({color:Ut.cyanPale,toneMapped:!0}),emergency:new un({color:14173482,toneMapped:!0})};return{byStyle:d,paintedStyle:"floorPlate",dispose(){for(const f of Object.values(d))f.dispose();for(const f of u)f.dispose()}}}function tf(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Ie;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=pu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][d]);const m=pu(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function pu(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Xe(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){const v=h.getComponent(d,m);o.setComponent(d+u,m,v)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const ef=.85,nf=3.05,sf=.66;function ee(i,t,e){const n=i.get(t);n?n.push(e):i.set(t,[e])}function ne(i,t,e,n,s=0,r=0){const a=new Yt,o=new Rn(r,s,0,"YXZ");return a.makeRotationFromEuler(o),a.setPosition(t,e,n),i.applyMatrix4(a),i}function ry(i,t){const e=t.scale,n=ef*e,s=nf*e,r=t.y+sf*e;ee(i,"glass",ne(new he(n,n,s,20,1,!0),t.x,r+s/2,t.z,t.yaw));const a=n*1.09;ee(i,"machine",ne(new he(a,a,.22*e,20),t.x,r+.09*e,t.z,t.yaw)),ee(i,"machine",ne(new he(a,a,.26*e,20),t.x,r+s-.1*e,t.z,t.yaw)),ee(i,"machineDark",ne(new he(a*1.06,a*.94,.3*e,20),t.x,r+s+.13*e,t.z,t.yaw));for(let o=0;o<4;o++){const l=t.yaw+o*Math.PI/2+.4;ee(i,"machineDark",ne(new he(.045*e,.045*e,s,6),t.x+Math.cos(l)*a,r+s/2,t.z+Math.sin(l)*a))}ee(i,"machineDark",ne(new he(n*.17,n*.2,s*(.5+t.variant*.3),10),t.x,r+s*.3,t.z,t.yaw)),ee(i,"emissive",ne(new he(n*.09,n*.09,s*.86,8),t.x,r+s*.5,t.z,t.yaw))}function ay(i,t){const e=t.scale,n=ef*e,s=nf*e,r=t.y+sf*e,a=s*(.26+t.variant*.24),o=n*1.09;ee(i,"glass",ne(new he(n,n,a,20,1,!0),t.x,r+a/2,t.z,t.yaw)),ee(i,"machine",ne(new he(o,o,.22*e,20),t.x,r+.09*e,t.z,t.yaw)),ee(i,"machine",ne(new he(o,o,.26*e,20),t.x+(t.variant-.5)*.16*e,r+a+.1*e,t.z,t.yaw,.22+t.variant*.16));for(let l=0;l<4;l++){const c=t.yaw+l*Math.PI/2+.4,u=l%2===0?s:a+.2*e;ee(i,"machineDark",ne(new he(.045*e,.045*e,u,6),t.x+Math.cos(c)*o,r+u/2,t.z+Math.sin(c)*o))}ee(i,"machineDark",ne(new he(n*.17,n*.2,a*.7,10),t.x,r+a*.35,t.z,t.yaw))}function oy(i,t){const e=t.length??8,n=[.075,.055,.045],s=[0,.17,.3];for(let a=0;a<n.length;a++){const o=new he(n[a]*t.scale,n[a]*t.scale,e,8);o.rotateX(Math.PI/2),ee(i,"machineDark",ne(o,t.x+s[a]*(t.variant<.5?1:-1),t.y-a*.04,t.z,t.yaw))}const r=Math.max(2,Math.round(e/4));for(let a=0;a<r;a++){const o=t.z-e/2+e/(r-1||1)*a,l=new he(.13*t.scale,.13*t.scale,.1*t.scale,8);l.rotateX(Math.PI/2),ee(i,"machine",ne(l,t.x+.14,t.y-.02,o,t.yaw))}}function ly(i,t){ee(i,"machineDark",ne(new ve(.86*t.scale,.62*t.scale,.07*t.scale),t.x,t.y+.3*t.scale,t.z,t.yaw,-.38)),ee(i,"emissive",ne(new ve(.74*t.scale,.5*t.scale,.02*t.scale),t.x,t.y+.3*t.scale,t.z,t.yaw,-.38)),ee(i,"machineDark",ne(new he(.035,.035,.16*t.scale,6),t.x,t.y+.06*t.scale,t.z,t.yaw))}function cy(i,t){ee(i,"machineDark",ne(new he(.06*t.scale,.08*t.scale,.16*t.scale,8),t.x,t.y,t.z)),ee(i,"emergency",ne(new wi(.11*t.scale,10,6,0,Math.PI*2,0,Math.PI*.62),t.x,t.y+.07*t.scale,t.z)),ee(i,"machineDark",ne(new he(.115*t.scale,.115*t.scale,.03*t.scale,10),t.x,t.y+.06*t.scale,t.z))}function hy(i,t){const e=t.scale;ee(i,"machineDark",ne(new he(2.25*e,2.4*e,.26*e,16),t.x,t.y+.13*e,t.z,t.yaw)),ee(i,"machine",ne(new he(1.65*e,1.82*e,.2*e,16),t.x,t.y+.3*e,t.z,t.yaw));const n=new Si(1.95*e,.12*e,6,32);n.rotateX(Math.PI/2),ee(i,"hazard",ne(n,t.x,t.y+.31*e,t.z,t.yaw));const s=new Si(1.42*e,.055*e,5,28);s.rotateX(Math.PI/2),ee(i,"emissive",ne(s,t.x,t.y+.42*e,t.z,t.yaw)),ee(i,"machineDark",ne(new Si(1.62*e,.14*e,8,32),t.x,t.y+1.82*e,t.z+.22*e,t.yaw)),ee(i,"emissive",ne(new Si(1.62*e,.035*e,5,32),t.x,t.y+1.82*e,t.z+.06*e,t.yaw));for(let r=0;r<4;r++){const a=t.yaw+Math.PI/4+r*Math.PI/2,o=t.x+Math.cos(a)*2.05*e,l=t.z+Math.sin(a)*2.05*e;ee(i,"machine",ne(new ve(.48*e,.52*e,.72*e),o,t.y+.42*e,l,-a)),ee(i,"emergency",ne(new ve(.22*e,.08*e,.06*e),o,t.y+.63*e,l,-a))}}function uy(i){const t=new Map;for(const n of i)switch(n.kind){case"containmentTank":ry(t,n);break;case"breachedTank":ay(t,n);break;case"pipeRun":oy(t,n);break;case"wallConsole":ly(t,n);break;case"beacon":cy(t,n);break;case"containmentMachine":hy(t,n);break}const e=new Map;for(const[n,s]of t){for(const a of s)a.deleteAttribute("tangent"),a.deleteAttribute("color");const r=s.length===1?s[0]:tf(s,!1);if(r){if(s.length>1)for(const a of s)a.dispose();r.computeBoundingSphere(),e.set(n,r)}}return e}function dy(){return{position:[],normal:[],uv:[]}}function mu(i){return i.position.length===0}function fy(i,t,e,n,s,r,a,o){const l=1/Math.max(1e-6,o);ys(i,s,e,a,s,e,n,s,r,n,s,r,a,1,0,0,a*l,e*l,n*l,r*l),ys(i,t,e,n,t,e,a,t,r,a,t,r,n,-1,0,0,n*l,e*l,a*l,r*l),ys(i,t,r,a,s,r,a,s,r,n,t,r,n,0,1,0,t*l,a*l,s*l,n*l),ys(i,t,e,n,s,e,n,s,e,a,t,e,a,0,-1,0,t*l,n*l,s*l,a*l),ys(i,t,e,a,s,e,a,s,r,a,t,r,a,0,0,1,t*l,e*l,s*l,r*l),ys(i,s,e,n,t,e,n,t,r,n,s,r,n,0,0,-1,s*l,e*l,t*l,r*l)}function ys(i,t,e,n,s,r,a,o,l,c,h,u,d,f,m,v,g,p,y,w){const M=i.position,T=i.normal,b=i.uv;M.push(t,e,n,s,r,a,o,l,c),M.push(t,e,n,o,l,c,h,u,d);for(let A=0;A<6;A++)T.push(f,m,v);b.push(g,p,y,p,y,w),b.push(g,p,y,w,g,w)}function gu(i){const t=new Ie;return t.setAttribute("position",new $t(new Float32Array(i.position),3)),t.setAttribute("normal",new $t(new Float32Array(i.normal),3)),t.setAttribute("uv",new $t(new Float32Array(i.uv),2)),t.computeBoundingSphere(),t}const Lo=["floorPlate","wallPanel","structure","ceilingPanel","machine","machineDark","hazard","emissive","lamp","emergency","glass"];function py(i){if(i.surface)return i.surface;switch(i.kind){case"floor":return"floorPlate";case"wall":return"wallPanel";case"ceiling":return"ceilingPanel";case"prop":return"machine"}}const my=new Set(["structure","machine","machineDark","hazard","glass"]);class gy{group=new Gi;scene;materials;meshes=[];geometries=[];paintUniforms={uPaintMap:{value:null},uPaintMin:{value:new It},uPaintInvSize:{value:new It(1,1)},uPaintColor:{value:new Ct(Ut.splat)},uPaintRoughness:{value:wn.roughness},uPaintEdgeRoughness:{value:wn.edgeRoughness},uPaintEdgeValue:{value:wn.edgeValue},uPaintEmissive:{value:wn.emissive}};constructor(t,e){this.scene=t,this.materials=e,this.scene.add(this.group),vy(e.byStyle[e.paintedStyle],this.paintUniforms)}build(t,e){this.clear(),e&&(this.paintUniforms.uPaintMap.value=e.map,this.paintUniforms.uPaintMin.value=e.min,this.paintUniforms.uPaintInvSize.value=e.invSize);const n=new Map,s=new Map;for(const o of t.rooms)for(const l of o.brushes){if(l.collisionOnly)continue;const c=py(l),h=l.kind==="prop"?s:n;let u=h.get(c);u||(u=dy(),h.set(c,u)),fy(u,l.minX,l.minY,l.minZ,l.maxX,l.maxY,l.maxZ,JM[c])}for(const o of Lo){const l=n.get(o);l&&!mu(l)&&this.addMesh(o,gu(l),!1)}for(const o of Lo){const l=s.get(o);l&&!mu(l)&&this.addMesh(o,gu(l),!0)}const r=[];for(const o of t.rooms)for(const l of o.props)r.push(l);const a=uy(r);for(const o of Lo){const l=a.get(o);l&&this.addMesh(o,l,!0)}}addMesh(t,e,n){const s=this.materials.byStyle[t],r=new jt(e,s);r.castShadow=n&&my.has(t),r.receiveShadow=t!=="glass"&&t!=="emissive"&&t!=="lamp"&&t!=="emergency",r.frustumCulled=!1,t==="glass"&&(r.renderOrder=1),r.userData.splatPaint=t!=="floorPlate",this.group.add(r),this.meshes.push(r),this.geometries.push(e)}clear(){for(const t of this.meshes)this.group.remove(t);for(const t of this.geometries)t.dispose();this.meshes.length=0,this.geometries.length=0}get paintReceivers(){return this.meshes}get meshCount(){return this.meshes.length}dispose(){this.clear(),this.scene.remove(this.group)}}function vy(i,t){i.onBeforeCompile=e=>{for(const[n,s]of Object.entries(t))e.uniforms[n]=s;e.vertexShader=e.vertexShader.replace("#include <common>",`
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
      `),e.fragmentShader=e.fragmentShader.replace("#include <common>",`
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
      `)},i.customProgramCacheKey=()=>"clawd-floor-paint"}const vu=new L,xu=new L,ea=new L;class xy{positions=[];normals=[];uvs=[];uvScale;constructor(t){this.uvScale=t}tri(t,e,n,s,r,a,o,l,c,h,u,d){vu.set(s-t,r-e,a-n),xu.set(o-t,l-e,c-n),ea.crossVectors(vu,xu),ea.x*h+ea.y*u+ea.z*d<0?(this.vertex(t,e,n,h,u,d),this.vertex(o,l,c,h,u,d),this.vertex(s,r,a,h,u,d)):(this.vertex(t,e,n,h,u,d),this.vertex(s,r,a,h,u,d),this.vertex(o,l,c,h,u,d))}quad(t,e,n,s,r,a,o,l,c,h,u,d,f,m,v){this.tri(t,e,n,s,r,a,o,l,c,f,m,v),this.tri(t,e,n,o,l,c,h,u,d,f,m,v)}vertex(t,e,n,s,r,a){this.positions.push(t,e,n),this.normals.push(s,r,a);const o=Math.abs(s),l=Math.abs(r),c=Math.abs(a);o>=l&&o>=c?this.uvs.push(n*this.uvScale,e*this.uvScale):l>=c?this.uvs.push(t*this.uvScale,n*this.uvScale):this.uvs.push(t*this.uvScale,e*this.uvScale)}finish(){const t=new Ie;return t.setAttribute("position",new $t(this.positions,3)),t.setAttribute("normal",new $t(this.normals,3)),t.setAttribute("uv",new $t(this.uvs,2)),t.computeBoundingSphere(),t}}const Un=1/Math.SQRT2,Do=1/Math.sqrt(3);function na(i,t,e,n,s={}){const r=i/2,a=t/2,o=e/2,l=Math.max(0,Math.min(n,Math.min(r,a,o)*.49)),c=r-l,h=a-l,u=o-l,d=new xy(s.uvScale??1),f=s.sockets??[],m=f.length>0?_y(c,h,f):null;for(const v of[1,-1])d.quad(v*r,-h,-u,v*r,h,-u,v*r,h,u,v*r,-h,u,v,0,0),d.quad(-c,v*a,-u,c,v*a,-u,c,v*a,u,-c,v*a,u,0,v,0),v===-1&&f.length>0?Sy(d,o,f,m.x,m.y):d.quad(-c,-h,v*o,c,-h,v*o,c,h,v*o,-c,h,v*o,0,0,v);for(const v of[1,-1]){for(const g of[1,-1])d.quad(v*r,g*h,-u,v*c,g*a,-u,v*c,g*a,u,v*r,g*h,u,v*Un,g*Un,0);for(const g of[1,-1])g===-1&&m?My(d,v,r,c,h,u,o,m.y):d.quad(v*r,-h,g*u,v*c,-h,g*o,v*c,h,g*o,v*r,h,g*u,v*Un,0,g*Un)}for(const v of[1,-1])for(const g of[1,-1])g===-1&&m?yy(d,v,a,c,h,u,o,m.x):d.quad(-c,v*a,g*u,c,v*a,g*u,c,v*h,g*o,-c,v*h,g*o,0,v*Un,g*Un);for(const v of[1,-1])for(const g of[1,-1])for(const p of[1,-1])d.tri(v*r,g*h,p*u,v*c,g*a,p*u,v*c,g*h,p*o,v*Do,g*Do,p*Do);return d.finish()}function _y(i,t,e){const n=new Set([-i,i]),s=new Set([-t,t]);for(const r of e)n.add(r.x-r.width/2),n.add(r.x+r.width/2),s.add(r.y-r.height/2),s.add(r.y+r.height/2);return{x:[...n].sort((r,a)=>r-a),y:[...s].sort((r,a)=>r-a)}}function My(i,t,e,n,s,r,a,o){const l=t*e,c=t*n,h=t*Un,u=-Un;for(let d=0;d<o.length-1;d++)i.tri(l,-s,-r,c,o[d],-a,c,o[d+1],-a,h,0,u);i.tri(l,-s,-r,c,o[o.length-1],-a,l,s,-r,h,0,u)}function yy(i,t,e,n,s,r,a,o){const l=t*e,c=t*s,h=t*Un,u=-Un;i.tri(-n,l,-r,n,l,-r,o[o.length-1],c,-a,0,h,u);for(let d=o.length-1;d>0;d--)i.tri(-n,l,-r,o[d],c,-a,o[d-1],c,-a,0,h,u)}function Sy(i,t,e,n,s){for(let r=0;r<n.length-1;r++)for(let a=0;a<s.length-1;a++){const o=n[r],l=n[r+1],c=s[a],h=s[a+1],u=(o+l)/2,d=(c+h)/2;e.some(m=>Math.abs(u-m.x)<m.width/2&&Math.abs(d-m.y)<m.height/2)||i.quad(o,c,-t,l,c,-t,l,h,-t,o,h,-t,0,0,-1)}for(const r of e){const a=r.x-r.width/2,o=r.x+r.width/2,l=r.y-r.height/2,c=r.y+r.height/2,h=-t,u=-t+r.depth;i.quad(a,l,h,a,c,h,a,c,u,a,l,u,1,0,0),i.quad(o,l,h,o,c,h,o,c,u,o,l,u,-1,0,0),i.quad(a,l,h,o,l,h,o,l,u,a,l,u,0,1,0),i.quad(a,c,h,o,c,h,o,c,u,a,c,u,0,-1,0),i.quad(a,l,u,o,l,u,o,c,u,a,c,u,0,0,-1)}}const tr=18;function Ey(i=256){const t=document.createElement("canvas");t.width=i,t.height=i;const e=t.getContext("2d");if(!e)throw new Error("2D canvas context unavailable — cannot build the mottle texture");e.fillStyle="#ffffff",e.fillRect(0,0,i,i);const n=Fe("clawd-mottle","specimen"),s=i/tr;for(let a=0;a<tr*tr;a++){const o=a%tr,l=Math.floor(a/tr),c=n();let h;if(c<.12)h=wt(n,.944,.972);else if(c<.42)h=wt(n,.975,.993);else continue;const u=Math.round(h*255);e.fillStyle=`rgb(${u},${u},${u})`,e.fillRect(o*s,l*s,s,s)}const r=new _c(t);return r.colorSpace=$e,r.wrapS=Xi,r.wrapT=Xi,r.minFilter=zn,r.magFilter=be,r.generateMipmaps=!0,r.anisotropy=4,r.needsUpdate=!0,r}const by=1.6,wy=.45,_u=.62;function No(i){return i<=0?0:i>=1?1:i}function Ty(i,t){const e=t>0?t:0;switch(i){case"windUp":return No(e/mn.windUpTime)**2;case"lunge":return 1-(1-_u)*No(e/mn.lungeTime);case"recover":return _u*(1-No(e/(mn.recoverTime*wy)));default:return 0}}function Ay(i,t,e){if(!e)return{lift:0,swing:0};const n=i+t;return{lift:Math.max(0,Math.sin(n))*.11,swing:Math.cos(n)*.09}}const Ry=.55;function Cy(i,t,e,n){if(!i)return{squash:1,stance:1,eye:0};const s=.5+.5*Math.sin(t*2.4),r=n>0?1-e/Ry:0,a=r<=0?0:r>=1?1:r,o=a*a;return{squash:1-s*.018-o*.12,stance:1+o*.1,eye:o*.72}}const bc=1.46,rf=1,wc=.82,Is=.45,zi=Is+rf/2,ia=bc/2-.13-.105,sa=wc/2-.13-.105,Py=.04,Mu=.02,Wl=.19,af=.03,Da=.27,Na=.27,ra=Wl+.01,Xl=.045,yu=-wc/2+Xl-.003+af/2,Iy=[{x:-Da,y:Na,width:ra,height:ra,depth:Xl},{x:Da,y:Na,width:ra,height:ra,depth:Xl}],Fo=[{name:"body",shape:"body",px:0,py:zi,pz:0,dark:!1,gait:0},{name:"eyeLeft",shape:"eye",px:-Da,py:zi+Na,pz:yu,dark:!0,gait:0},{name:"eyeRight",shape:"eye",px:Da,py:zi+Na,pz:yu,dark:!0,gait:0},{name:"sideLeft",shape:"side",px:-.905,py:zi+.1,pz:0,dark:!1,gait:0},{name:"sideRight",shape:"side",px:bc/2+.175,py:zi+.1,pz:0,dark:!1,gait:0},{name:"legFrontLeft",shape:"leg",px:-ia,py:Is/2,pz:-sa,dark:!1,gait:0},{name:"legFrontRight",shape:"leg",px:ia,py:Is/2,pz:-sa,dark:!1,gait:Math.PI},{name:"legRearLeft",shape:"leg",px:-ia,py:Is/2,pz:sa,dark:!1,gait:Math.PI},{name:"legRearRight",shape:"leg",px:ia,py:Is/2,pz:sa,dark:!1,gait:0}];function Ly(i){switch(i){case"body":return na(bc,rf,wc,Py,{sockets:Iy});case"eye":return na(Wl,Wl,af,.008);case"side":return na(.35,.4,.45,Mu);default:return na(.21,Is,.21,Mu)}}const Dy=new Yt().makeScale(0,0,0);class Ny{geometries=new Map;mottle;bodyMaterial;eyeMaterial;eyeFlash;slots=[];root=new we;part=new we;matrix=new Yt;scene;capacity;constructor(t,e){this.scene=t,this.capacity=e,this.mottle=Ey(),this.bodyMaterial=new Re({color:Ut.bodyAlbedo,map:this.mottle,roughness:.78,metalness:.02}),this.eyeMaterial=Fy(),this.eyeFlash=new Mr(new Float32Array(e),1);for(const n of Fo){let s=this.geometries.get(n.shape);s||(s=Ly(n.shape),n.shape==="eye"&&s.setAttribute("aEyeFlash",this.eyeFlash),this.geometries.set(n.shape,s));const r=new Bs(s,n.dark?this.eyeMaterial:this.bodyMaterial,e);r.castShadow=!n.dark,r.receiveShadow=!1,r.frustumCulled=!1,r.count=0,this.slots.push(r),this.scene.add(r)}}update(t,e){const n=Math.min(t.length,this.capacity),s=this.eyeFlash.array;let r=!1;for(let a=0;a<n;a++){const o=t[a],l=o.def.scale,c=Cy(!!o.def.brood&&o.state==="approach",o.stateTime,o.broodTimer,o.broodRemaining),h=Math.max(Ty(o.state,o.stateTime),c.eye);s[a]!==h&&(s[a]=h,r=!0);const u=o.prevX+(o.x-o.prevX)*e,d=o.prevZ+(o.z-o.prevZ)*e,f=Uy(o.prevYaw,o.yaw,e);let m=1,v=0;o.state==="windUp"?m=1-.22*Math.min(1,o.stateTime/mn.windUpTime):o.state==="lunge"?(m=1.14,v=.12):o.state==="recover"&&(m=1-.1*(1-Math.min(1,o.stateTime/mn.recoverTime))),m*=c.squash;const g=o.hurtTime>0?o.hurtTime/.18:0;m*=1-.18*g;const p=Math.sin(o.gaitPhase)*.035;let y=Math.sin(o.gaitPhase*.5)*.05,w=1,M=1,T=0;if(o.state==="dying"){const A=Math.min(1,o.stateTime/Kl.implodeTime),_=A*A;w=1-.85*_,M=1-.42*_,T=.3*_,y=0,m=1}const b=l*M;this.root.position.set(u,o.y+T,d),this.root.rotation.set(0,f+(1-w)*2.6,y),this.root.scale.set(b,b,b),this.root.updateMatrix();for(let A=0;A<Fo.length;A++){const _=Fo[A],E=A>=5;let C=_.px,P=_.py,D=_.pz;if(E){const X=Ay(o.gaitPhase,_.gait,!o.def.stationary);C*=c.stance,P=_.py+X.lift,D=_.pz+X.swing}else P=_.py*m+p+v;C*=w,P=zi+(P-zi)*w,D*=w;const W=1-.45*(1-w);this.part.position.set(C,P,D),this.part.rotation.set(0,0,0),this.part.scale.set(W,(E?1:m)*W,W),this.part.updateMatrix(),this.matrix.multiplyMatrices(this.root.matrix,this.part.matrix),this.slots[A].setMatrixAt(a,this.matrix)}}for(let a=0;a<this.slots.length;a++){const o=this.slots[a];if(o.count>n)for(let l=n;l<o.count;l++)o.setMatrixAt(l,Dy);o.count=n,o.instanceMatrix.needsUpdate=!0}r&&(this.eyeFlash.needsUpdate=!0)}dispose(){for(const t of this.slots)this.scene.remove(t),t.dispose();this.slots.length=0;for(const t of this.geometries.values())t.dispose();this.geometries.clear(),this.mottle.dispose(),this.bodyMaterial.dispose(),this.eyeMaterial.dispose()}}function Fy(){const i=new Re({color:Ut.eye,roughness:.45,metalness:0});return i.onBeforeCompile=t=>{t.uniforms.uEyeFlash={value:new Ct(Ut.eyeFlash).multiplyScalar(by)},t.vertexShader=t.vertexShader.replace("#include <common>",`
        #include <common>
        attribute float aEyeFlash;
        varying float vEyeFlash;
      `).replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vEyeFlash = aEyeFlash;
      `),t.fragmentShader=t.fragmentShader.replace("#include <common>",`
        #include <common>
        uniform vec3 uEyeFlash;
        varying float vEyeFlash;
      `).replace("#include <emissivemap_fragment>",`
        #include <emissivemap_fragment>
        totalEmissiveRadiance += uEyeFlash * vEyeFlash;
      `)},i.customProgramCacheKey=()=>"clawd-eye-flash",i}function Uy(i,t,e){let n=(t-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*e}const Oy=`
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
`,By=`
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
`;function zy(){const i=new xn({vertexShader:Oy,fragmentShader:By,uniforms:{uTime:{value:0},uIntensity:{value:1.15},uDeep:{value:new Ct(Ut.violetDeep)},uMid:{value:new Ct(Ut.violet)},uRim:{value:new Ct(Ut.violetRim)}},transparent:!0,blending:bi,depthWrite:!1});return{material:i,setTime(t){i.uniforms.uTime.value=t}}}function ky(){return{material:new un({color:Ut.violet,transparent:!0,opacity:.62,blending:bi,depthWrite:!1}),setTime(){}}}const Su=2,ql=7,of=.4,Vy=.5,Gy=ql+of,Hy=.28;class Wy{group=new Gi;cores=[];shells=[];trails=[];lights=[];originIds;originX;originY;originZ;originConverge;nextOriginSlot=0;coreGeo;shellGeo;trailGeo;coreMat;shell;trailMat;trailDirection=new L;trailMidpoint=new L;trailUp=new L(0,1,0);scene;capacity;lightCount;constructor(t,e,n=!0,s=Su){this.scene=t,this.capacity=e,this.lightCount=Math.max(0,Math.min(Su,s)),this.originIds=new Int32Array(e),this.originX=new Float32Array(e),this.originY=new Float32Array(e),this.originZ=new Float32Array(e),this.originConverge=new Float32Array(e).fill(ql),this.originIds.fill(-1),this.coreGeo=new wi(Oe.radius*.86,16,12),this.shellGeo=new wi(Oe.radius*1.4,24,16),this.trailGeo=new he(.01,.022,1,8,1,!0),this.coreMat=new un({color:Ut.coreDark}),this.shell=n?zy():ky(),this.trailMat=new un({color:Ut.violet,transparent:!0,opacity:.4,blending:bi,depthWrite:!1});for(let r=0;r<e;r++){const a=new jt(this.coreGeo,this.coreMat),o=new jt(this.shellGeo,this.shell.material),l=new jt(this.trailGeo,this.trailMat);a.visible=!1,o.visible=!1,l.visible=!1,a.frustumCulled=!1,o.frustumCulled=!1,l.frustumCulled=!1,this.group.add(l,a,o),this.cores.push(a),this.shells.push(o),this.trails.push(l)}for(let r=0;r<this.lightCount;r++){const a=new Ec(Ut.violet,0,7,2);this.group.add(a),this.lights.push(a)}this.scene.add(this.group)}beginShot(t,e,n,s,r=Number.POSITIVE_INFINITY){let a=-1;for(let o=0;o<this.capacity;o++)if(this.originIds[o]<0){a=o;break}a<0&&(a=this.nextOriginSlot,this.nextOriginSlot=(this.nextOriginSlot+1)%this.capacity),this.originIds[a]=t,this.originX[a]=e,this.originY[a]=n,this.originZ[a]=s,this.originConverge[a]=Math.max(Vy,Math.min(ql,r-of))}reset(){this.originIds.fill(-1),this.nextOriginSlot=0;for(let t=0;t<this.capacity;t++)this.cores[t].visible=!1,this.shells[t].visible=!1,this.trails[t].visible=!1;for(const t of this.lights)t.intensity=0}update(t,e,n){const s=Math.min(t.length,this.capacity);this.shell.setTime(n);for(let r=0;r<s;r++){const a=t[r];let o=a.prevX+(a.x-a.prevX)*e,l=a.prevY+(a.y-a.prevY)*e,c=a.prevZ+(a.z-a.prevZ)*e,h=-1;for(let v=0;v<this.capacity;v++){if(this.originIds[v]!==a.id)continue;h=v;const g=Oe.lifetime-a.life,p=g*Oe.speed,y=Math.min(1,p/this.originConverge[v]),w=y*y*(3-2*y);o=this.originX[v]+(o-this.originX[v])*w,l=this.originY[v]+(l-this.originY[v])*w,c=this.originZ[v]+(c-this.originZ[v])*w,g>=Hy&&(this.originIds[v]=-1,h=-1);break}const u=this.cores[r],d=this.shells[r],f=this.trails[r];if(u.position.set(o,l,c),d.position.set(o,l,c),u.visible=!0,d.visible=!0,h>=0){const v=this.originX[h],g=this.originY[h],p=this.originZ[h];this.trailDirection.set(o-v,l-g,c-p);const y=this.trailDirection.length();y>.001?(this.trailDirection.multiplyScalar(1/y),this.trailMidpoint.set((o+v)*.5,(l+g)*.5,(c+p)*.5),f.position.copy(this.trailMidpoint),f.quaternion.setFromUnitVectors(this.trailUp,this.trailDirection),f.scale.set(1,y,1),f.visible=!0):f.visible=!1}else f.visible=!1;const m=1+Math.sin(n*18+r)*.07;if(d.scale.setScalar(m),d.rotation.set(n*1.3+r,n*2.2+r*2.1,0),r<this.lightCount){const v=this.lights[r];v.position.set(o,l,c),v.intensity=5.5}}for(let r=s;r<this.capacity;r++)this.cores[r].visible=!1,this.shells[r].visible=!1,this.trails[r].visible=!1;for(let r=s;r<this.lightCount;r++)this.lights[r].intensity=0}dispose(){this.scene.remove(this.group),this.coreGeo.dispose(),this.shellGeo.dispose(),this.trailGeo.dispose(),this.coreMat.dispose(),this.shell.material.dispose(),this.trailMat.dispose(),this.cores.length=0,this.shells.length=0,this.trails.length=0;for(const t of this.lights)t.dispose();this.lights.length=0,this.reset()}}const hr=384,vi=4,sn=1e-7,Xy=128,Uo=.001;function Yl(i,t,e,n,s){const r=[];for(let a=0;a<i.length;a++){const o=i[a],l=i[(a+1)%i.length],c=o[0]*t+o[1]*e+o[2]*n+s,h=l[0]*t+l[1]*e+l[2]*n+s;if(c>=-sn&&r.push(o),c>sn&&h<-sn||c<-sn&&h>sn){const u=c/(c-h);r.push([o[0]+(l[0]-o[0])*u,o[1]+(l[1]-o[1])*u,o[2]+(l[2]-o[2])*u])}}return r}function qy(i,t,e){const n=i.map(u=>u[0]),s=i.map(u=>u[1]),r=t.points.map(u=>u[0]),a=t.points.map(u=>u[1]);if(Math.min(...n)>=Math.max(...r)-sn||Math.max(...n)<=Math.min(...r)+sn||Math.min(...s)>=Math.max(...a)-sn||Math.max(...s)<=Math.min(...a)+sn)return[i];const o=[];let l=i;const c=[],h=t.id<e.id?sn*4:-sn*4;c.push([t.plane[0]-e.plane[0],t.plane[1]-e.plane[1],0,t.plane[2]-e.plane[2]+h]);for(let u=0;u<t.points.length;u++){const d=t.points[u],f=t.points[(u+1)%t.points.length],m=f[0]-d[0],v=f[1]-d[1];c.push([-v,m,0,v*d[0]-m*d[1]])}for(const[u,d,f,m]of c){if(l.length<3)break;const v=Yl(l,-u,-d,-f,-m);v.length>=3&&o.push(v),l=Yl(l,u,d,f,m)}return o}class Yy{triangles=[];cells=new Map;clear(){this.triangles=[],this.cells.clear()}build(t){this.clear();const e=new L;for(const n of t){n.updateWorldMatrix(!0,!1);const s=n.geometry.getAttribute("position"),r=n.geometry.index,a=r?.count??s.count;for(let o=0;o<a;o+=3){const l=[];for(let m=0;m<3;m++)e.fromBufferAttribute(s,r?r.getX(o+m):o+m).applyMatrix4(n.matrixWorld),l.push([e.x,e.y,e.z]);const c=new L(...l[1]).sub(new L(...l[0])),h=new L(...l[2]).sub(new L(...l[0]));if(c.cross(h),c.lengthSq()<sn*sn)continue;c.normalize();const u=this.triangles.length;this.triangles.push({points:l,normal:[c.x,c.y,c.z],paint:n.userData.splatPaint!==!1});const d=l.map(m=>m[0]),f=l.map(m=>m[2]);for(let m=Math.floor(Math.min(...d)/vi);m<=Math.floor(Math.max(...d)/vi);m++)for(let v=Math.floor(Math.min(...f)/vi);v<=Math.floor(Math.max(...f)/vi);v++){const g=`${m},${v}`;let p=this.cells.get(g);p||this.cells.set(g,p=[]),p.push(u)}}}}project(t,e,n,s){const r={positions:[],normals:[],uvs:[]},a=e.clone().normalize(),o=new Yn().setFromUnitVectors(new L(0,0,1),a);o.premultiply(new Yn().setFromAxisAngle(a,s));const l=new L(1,0,0).applyQuaternion(o),c=new L(0,1,0).applyQuaternion(o),h=n*.9,u=new Set;for(let f=Math.floor((t.x-h)/vi);f<=Math.floor((t.x+h)/vi);f++)for(let m=Math.floor((t.z-h)/vi);m<=Math.floor((t.z+h)/vi);m++)for(const v of this.cells.get(`${f},${m}`)??[])u.add(v);const d=[];for(const f of u){const m=this.triangles[f],v=new L(...m.normal),g=v.dot(a);if(g<.05)continue;let p=m.points.map(([w,M,T])=>{const b=new L(w,M,T).sub(t);return[b.dot(l)/n,b.dot(c)/n,b.dot(a)/n]});const y=[-v.dot(l)/g,-v.dot(c)/g,0];y[2]=p[0][2]-y[0]*p[0][0]-y[1]*p[0][1];for(let w=0;w<3;w++)for(const M of[-1,1]){const T=[0,0,0];T[w]=M,p=Yl(p,T[0],T[1],T[2],.5)}p.length>=3&&d.push({id:f,points:p,normal:m.normal,plane:y,paint:m.paint})}d.sort((f,m)=>m.plane[2]-f.plane[2]||f.id-m.id);for(const f of d){if(!f.paint)continue;let m=[f.points];for(const v of d)if(v!==f){if(m=m.flatMap(g=>qy(g,v,f)),m.length>Xy){m=[];break}if(m.length===0)break}for(const v of m)for(let g=1;g<v.length-1;g++){const p=[v[0],v[g],v[g+1]],[y,w,M]=p;if(!((w[0]-y[0])*(M[1]-y[1])-(w[1]-y[1])*(M[0]-y[0])<sn)){if(r.positions.length/3+3>hr)return r;for(const b of p){const A=t.clone().addScaledVector(l,b[0]*n).addScaledVector(c,b[1]*n).addScaledVector(a,b[2]*n);r.positions.push(A.x+f.normal[0]*Uo,A.y+f.normal[1]*Uo,A.z+f.normal[2]*Uo),r.normals.push(...f.normal),r.uvs.push(b[0]+.5,b[1]+.5)}}}}return r}}const Zy=.08,Eu=.55,Wa=8,Ss=new Float64Array(Wa),Es=new Float64Array(Wa),bs=new Float64Array(Wa);function $y(){return{x:0,y:0,z:0,nx:0,ny:0,nz:0,distance:0}}function Ky(i,t,e,n,s,r,a,o,l,c){const h=Math.hypot(n,s),u=h>1e-4,d=u?n/h:0,f=u?s/h:0,m=u?Math.atan2(d,f):r()*Math.PI*2;let v=0;for(let p=0;p<4;p++){const y=m+p*Math.PI/2+(r()-.5)*.5;Ss[v]=Math.sin(y),Es[v]=(r()-.5)*.5,bs[v]=Math.cos(y),v++}for(Ss[v]=(r()-.5)*.3,Es[v]=1,bs[v]=(r()-.5)*.3,v++,u&&(Ss[v]=d,Es[v]=.12,bs[v]=f,v++);v<Wa;){const p=r()*Math.PI*2,y=r()*.8-.1;Ss[v]=Math.sin(p),Es[v]=y,bs[v]=Math.cos(p),v++}let g=0;for(let p=0;p<v&&g<c;p++){const y=Math.hypot(Ss[p],Es[p],bs[p]);if(y<1e-6)continue;const w=Ss[p]/y*o,M=Es[p]/y*o,T=bs[p]/y*o;let b=Number.POSITIVE_INFINITY,A=0,_=0,E=0;for(let H=0;H<a.length;H++){const U=a[H];if(U.kind==="floor")continue;const q=Hi(i,t,e,w,M,T,U,0,en);q>=0&&q<b&&(b=q,A=en.nx,_=en.ny,E=en.nz)}if(!Number.isFinite(b))continue;const C=b*o;if(C<Zy)continue;const P=i+w*b,D=t+M*b,W=e+T*b;let X=!1;for(let H=0;H<g;H++){const U=l[H],q=U.x-P,tt=U.y-D,it=U.z-W;if(q*q+tt*tt+it*it<Eu*Eu){X=!0;break}}if(X)continue;const O=l[g];O.x=P,O.y=D,O.z=W,O.nx=A,O.ny=_,O.nz=E,O.distance=C,g++}return g}const Mi=6,Rs=3,lf=2,Tc=1/Rs,Ac=1/lf,Jy=.12,Qy=.045,jy=.46,tS=.5;function eS(i=256){const t=i*Rs,e=i*lf,n=document.createElement("canvas");n.width=t,n.height=e;const s=n.getContext("2d");if(!s)throw new Error("2D canvas context unavailable — cannot build the splat atlas");s.clearRect(0,0,t,e),s.fillStyle="#ffffff";for(let l=0;l<Mi;l++){const c=l%Rs,h=Math.floor(l/Rs);s.save(),s.translate(c*i,h*i),s.beginPath(),s.rect(0,0,i,i),s.clip(),iS(s,i,Fe("splat-atlas",`variant-${l}`)),s.restore()}const r=document.createElement("canvas");r.width=t,r.height=e;const a=r.getContext("2d");if(!a)throw new Error("2D canvas context unavailable — cannot build the splat atlas");nS(a,s,n,i);const o=new _c(r);return o.colorSpace=En,o.wrapS=hn,o.wrapT=hn,o.minFilter=zn,o.magFilter=be,o.generateMipmaps=!0,o.anisotropy=4,o.needsUpdate=!0,{texture:o,variantOffset(l,c){const h=l%Mi;return c.set(h%Rs*Tc,Math.floor(h/Rs)*Ac)},dispose(){o.dispose()}}}function nS(i,t,e,n){const{width:s,height:r}=e,a=document.createElement("canvas");a.width=s,a.height=r;const o=a.getContext("2d");if(!o)throw new Error("2D canvas context unavailable — cannot build the splat atlas");o.filter=`blur(${(n*Qy).toFixed(2)}px)`,o.drawImage(e,0,0);const l=t.getImageData(0,0,s,r).data,c=o.getImageData(0,0,s,r).data,h=i.createImageData(s,r),u=h.data;for(let d=0;d<u.length;d+=4){const f=l[d+3],m=(c[d+3]/255-jy)/tS;u[d]=255,u[d+1]=m<=0?0:m>=1?255:Math.round(m*255),u[d+2]=0,u[d+3]=f}i.putImageData(h,0,0)}function iS(i,t,e){const n=t/2,s=t/2,r=t/2*(1-Jy),a=9+Math.floor(e()*5),o=e()*Math.PI*2;for(let c=0;c<a;c++){const h=c/a*Math.PI*2+wt(e,-.16,.16);sS(i,n,s,o+h,r*wt(e,.52,.98),r*wt(e,.115,.165),wt(e,-.3,.3),e)}Zl(i,n,s,r*wt(e,.3,.38),20,.16,e);const l=5+Math.floor(e()*6);for(let c=0;c<l;c++){const h=e()*Math.PI*2,u=r*wt(e,.62,.99);Zl(i,n+Math.cos(h)*u,s+Math.sin(h)*u,r*wt(e,.018,.052),9,.3,e)}}const Ls=16,ws=new Float64Array((Ls+1)*2),aa=new Float64Array((Ls+1)*2);function sS(i,t,e,n,s,r,a,o){for(let c=0;c<=Ls;c++){const h=c/Ls,u=n+a*h*h,d=s*h,f=t+Math.cos(u)*d,m=e+Math.sin(u)*d,v=1-.62*h,g=1+.85*Math.exp(-(((h-.9)/.11)**2)),p=r*v*g,y=-Math.sin(u),w=Math.cos(u);ws[c*2]=f+y*p,ws[c*2+1]=m+w*p,aa[c*2]=f-y*p,aa[c*2+1]=m-w*p}i.beginPath(),i.moveTo(ws[0],ws[1]);for(let c=1;c<=Ls;c++)i.lineTo(ws[c*2],ws[c*2+1]);for(let c=Ls;c>=0;c--)i.lineTo(aa[c*2],aa[c*2+1]);i.closePath(),i.fill();const l=n+a;Zl(i,t+Math.cos(l)*s,e+Math.sin(l)*s,r*wt(o,.42,.62),10,.26,o)}function Zl(i,t,e,n,s,r,a){if(n<=.2)return;const o=new Float64Array(s),l=new Float64Array(s);for(let c=0;c<s;c++){const h=c/s*Math.PI*2,u=n*(1+wt(a,-r,r));o[c]=t+Math.cos(h)*u,l[c]=e+Math.sin(h)*u}i.beginPath(),i.moveTo((o[s-1]+o[0])/2,(l[s-1]+l[0])/2);for(let c=0;c<s;c++){const h=(c+1)%s;i.quadraticCurveTo(o[c],l[c],(o[c]+o[h])/2,(l[c]+l[h])/2)}i.closePath(),i.fill()}const er=4.5,bu=4,rS=8,oa=rS,wu=16,aS=.84,oS=.5;class lS{renderer;scene;atlas;paintTexelsPerMetre;paintMapMax;paintTarget=null;paintMin=new It;paintInvSize=new It;stampScene=new La;stampCamera=new Va(-1,1,1,-1,0,1);stampGeometry;stampMaterial;stampTransform;stampParams;stampMesh;decalCapacity;decalSoftCap;decalGeometry;projection=new Yy;decalVertices;decalMaterial;decalMesh;decalAttr;decalOrder;decalFade;decalFading;decalCounter=0;decalActive=0;hits=[];normal=new L;position=new L;variantUv=new It;savedClear=new Ct;index=null;nearby=[];rng=Fe("boot","effects");dripQueue=new Float32Array(wu*5);dripCount=0;constructor(t,e,n={}){this.renderer=t,this.scene=e,this.paintTexelsPerMetre=n.paintTexelsPerMetre??20,this.paintMapMax=n.paintMapMax??2048,this.decalCapacity=n.decalCapacity??96,this.decalSoftCap=Math.floor(this.decalCapacity*aS),this.atlas=eS();for(let r=0;r<bu;r++)this.hits.push($y());this.stampGeometry=cS(oa),this.stampTransform=this.stampGeometry.getAttribute("aStamp"),this.stampParams=this.stampGeometry.getAttribute("aParams"),this.stampMaterial=hS(this.atlas.texture),this.stampMesh=new jt(this.stampGeometry,this.stampMaterial),this.stampMesh.frustumCulled=!1,this.stampScene.add(this.stampMesh);const s=this.decalCapacity*hr;this.decalVertices=new Uint16Array(this.decalCapacity),this.decalGeometry=new Ie;for(const[r,a]of[["position",3],["normal",3],["uv",2],["aSplat",4]])this.decalGeometry.setAttribute(r,new Xe(new Float32Array(s*a),a).setUsage(mh));this.decalAttr=this.decalGeometry.getAttribute("aSplat"),this.decalGeometry.setIndex(new Xe(new Uint32Array(s),1).setUsage(mh)),this.decalGeometry.setDrawRange(0,0),this.decalMaterial=uS(this.atlas.texture),this.decalMesh=new jt(this.decalGeometry,this.decalMaterial),this.decalMesh.frustumCulled=!1,this.decalMesh.castShadow=!1,this.decalMesh.receiveShadow=!0,this.decalMesh.renderOrder=1,this.decalOrder=new Float64Array(this.decalCapacity).fill(-1),this.decalFade=new Float32Array(this.decalCapacity),this.decalFading=new Uint8Array(this.decalCapacity),this.decalMesh.visible=!1,this.scene.add(this.decalMesh)}beginFacility(t,e,n){this.index=e,this.rng=Fe(n,"effects");const s=Math.max(1,t.maxX-t.minX),r=Math.max(1,t.maxZ-t.minZ);this.paintMin.set(t.minX,t.minZ),this.paintInvSize.set(1/s,1/r);const a=Math.min(this.paintTexelsPerMetre,this.paintMapMax/Math.max(s,r)),o=Math.max(64,Math.round(s*a)),l=Math.max(64,Math.round(r*a));this.paintTarget&&(this.paintTarget.width!==o||this.paintTarget.height!==l)&&(this.paintTarget.dispose(),this.paintTarget=null),this.paintTarget||(this.paintTarget=new An(o,l,{depthBuffer:!1,stencilBuffer:!1,format:vn,type:rn,colorSpace:En,minFilter:be,magFilter:be,generateMipmaps:!1}),this.paintTarget.texture.wrapS=hn,this.paintTarget.texture.wrapT=hn),this.stampMaterial.uniforms.uPaintMin.value.copy(this.paintMin),this.stampMaterial.uniforms.uPaintInvSize.value.copy(this.paintInvSize),this.dripCount=0,this.clearPaint(),this.clearDecals(),this.stampContamination(t)}stampContamination(t){const e=this.paintTarget;if(!e)return;const n=this.stampTransform.array,s=this.stampParams.array,r=this.renderer.getRenderTarget();let a=0;const o=()=>{a!==0&&(this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=a,this.renderer.setRenderTarget(e),this.renderer.render(this.stampScene,this.stampCamera),a=0)};for(const l of t.rooms)for(const c of l.contamination)n[a*4]=c.x,n[a*4+1]=c.z,n[a*4+2]=c.variant*Math.PI*2,n[a*4+3]=c.radius*2,this.atlas.variantOffset(Math.min(Mi-1,Math.floor(c.variant*Mi)),this.variantUv),s[a*4]=this.variantUv.x,s[a*4+1]=this.variantUv.y,s[a*4+2]=c.brightness,s[a*4+3]=c.coverage,a++,a===oa&&o();o(),this.renderer.setRenderTarget(r)}get floorPaint(){return this.paintTarget?{map:this.paintTarget.texture,min:this.paintMin,invSize:this.paintInvSize}:null}splat(t,e,n,s,r,a){this.stampFloor(t,n,s,r,a),this.placeDecals(t,e,n,s,r,a)}stampDrip(t,e,n,s,r){if(this.dripCount>=wu)return;const a=this.dripCount*5;this.dripQueue[a]=t,this.dripQueue[a+1]=e,this.dripQueue[a+2]=n,this.dripQueue[a+3]=s,this.dripQueue[a+4]=r,this.dripCount++}update(t){if(this.dripCount>0&&this.flushDrips(),this.decalActive===0)return;let e=!1;for(let n=0;n<this.decalCapacity;n++){if(this.decalOrder[n]<0||this.decalFading[n]===0)continue;const s=this.decalFade[n]-t/oS;s<=0?this.freeDecal(n):(this.decalFade[n]=s,this.setDecalFade(n,s)),e=!0}e&&(this.decalAttr.needsUpdate=!0,this.refreshDecalDraws())}dispose(){this.scene.remove(this.decalMesh),this.projection.clear(),this.decalGeometry.dispose(),this.decalMaterial.dispose(),this.stampScene.remove(this.stampMesh),this.stampGeometry.dispose(),this.stampMaterial.dispose(),this.paintTarget?.dispose(),this.paintTarget=null,this.atlas.dispose()}stampFloor(t,e,n,s,r){const a=this.paintTarget;if(!a)return;const o=this.stampTransform.array,l=this.stampParams.array,c=this.rng,h=Math.hypot(s,r),u=h>1e-4?s/h:0,d=h>1e-4?r/h:0;let f=0;const m=(p,y,w,M)=>{f>=oa||(o[f*4]=p,o[f*4+1]=y,o[f*4+2]=c()*Math.PI*2,o[f*4+3]=w,this.atlas.variantOffset(Math.floor(c()*Mi),this.variantUv),l[f*4]=this.variantUv.x,l[f*4+1]=this.variantUv.y,l[f*4+2]=M,l[f*4+3]=1,f++)};m(t,e,3*n,wt(c,.9,1.12));const v=4+Math.floor(c()*3);for(let p=0;p<v;p++){const y=wt(c,-1.15,1.15),w=u*Math.cos(y)-d*Math.sin(y),M=u*Math.sin(y)+d*Math.cos(y),T=wt(c,.8,2.6)*n,b=c()*Math.PI*2,A=h>1e-4?0:wt(c,.8,2.4)*n;m(t+w*T+Math.cos(b)*A,e+M*T+Math.sin(b)*A,wt(c,.7,1.7)*n,wt(c,.78,1.15))}this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=f;const g=this.renderer.getRenderTarget();this.renderer.setRenderTarget(a),this.renderer.render(this.stampScene,this.stampCamera),this.renderer.setRenderTarget(g)}flushDrips(){const t=this.paintTarget;if(!t){this.dripCount=0;return}const e=this.stampTransform.array,n=this.stampParams.array,s=this.renderer.getRenderTarget();let r=0;const a=()=>{r!==0&&(this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=r,this.renderer.setRenderTarget(t),this.renderer.render(this.stampScene,this.stampCamera),r=0)};for(let o=0;o<this.dripCount;o++){const l=o*5,c=this.dripQueue[l+4];e[r*4]=this.dripQueue[l],e[r*4+1]=this.dripQueue[l+1],e[r*4+2]=c*Math.PI*2,e[r*4+3]=this.dripQueue[l+2],this.atlas.variantOffset(Math.min(Mi-1,Math.floor(c*Mi)),this.variantUv),n[r*4]=this.variantUv.x,n[r*4+1]=this.variantUv.y,n[r*4+2]=this.dripQueue[l+3],n[r*4+3]=1,r++,r===oa&&a()}a(),this.renderer.setRenderTarget(s),this.dripCount=0}clearPaint(){const t=this.paintTarget;if(!t)return;this.renderer.getClearColor(this.savedClear);const e=this.renderer.getClearAlpha(),n=this.renderer.getRenderTarget();this.renderer.setRenderTarget(t),this.renderer.setClearColor(0,0),this.renderer.clear(!0,!1,!1),this.renderer.setRenderTarget(n),this.renderer.setClearColor(this.savedClear,e)}placeDecals(t,e,n,s,r,a){const o=e+.9*s,l=this.index;if(!l)return;l.query(t-er,n-er,t+er,n+er,this.nearby);const c=Ky(t,o,n,r,a,this.rng,this.nearby,er,this.hits,bu);for(let h=0;h<c;h++){const u=this.hits[h];this.normal.set(t-u.x,o-u.y,n-u.z).normalize();const d=this.rng()*Math.PI*2,f=Math.max(1.1,2.5-.16*u.distance)*s*wt(this.rng,.85,1.15);this.position.set(u.x,u.y,u.z);const m=this.projection.project(this.position,this.normal,f,d);this.atlas.variantOffset(Math.floor(this.rng()*Mi),this.variantUv);const v=wt(this.rng,.82,1.14);if(m.positions.length===0)continue;const g=this.allocateDecal();if(g<0)break;const p=g*hr;this.decalVertices[g]=m.positions.length/3;for(const[y,w,M]of[["position",m.positions,3],["normal",m.normals,3],["uv",m.uvs,2]]){const T=this.decalGeometry.getAttribute(y);T.array.set(w,p*M),T.addUpdateRange(p*M,w.length),T.needsUpdate=!0}for(let y=p;y<p+this.decalVertices[g];y++)this.decalAttr.setXYZW(y,this.variantUv.x,this.variantUv.y,1,v);this.decalAttr.addUpdateRange(p*4,this.decalVertices[g]*4)}c>0&&(this.refreshDecalDraws(),this.decalAttr.needsUpdate=!0,this.retireOldest())}allocateDecal(){for(let e=0;e<this.decalCapacity;e++)if(this.decalOrder[e]<0)return this.decalOrder[e]=this.decalCounter++,this.decalFade[e]=1,this.decalFading[e]=0,this.decalActive++,e;let t=-1;for(let e=0;e<this.decalCapacity;e++)this.decalFading[e]!==0&&(t<0||this.decalOrder[e]<this.decalOrder[t])&&(t=e);if(t<0){t=0;for(let e=1;e<this.decalCapacity;e++)this.decalOrder[e]<this.decalOrder[t]&&(t=e)}return this.decalOrder[t]=this.decalCounter++,this.decalFade[t]=1,this.decalFading[t]=0,t}retireOldest(){let t=0;for(let n=0;n<this.decalCapacity;n++)this.decalOrder[n]>=0&&this.decalFading[n]===0&&t++;let e=t-this.decalSoftCap;for(;e>0;){let n=-1;for(let s=0;s<this.decalCapacity;s++)this.decalOrder[s]<0||this.decalFading[s]===1||(n<0||this.decalOrder[s]<this.decalOrder[n])&&(n=s);if(n<0)return;this.decalFading[n]=1,e--}}freeDecal(t){this.decalOrder[t]<0||(this.decalOrder[t]=-1,this.decalFade[t]=0,this.decalFading[t]=0,this.decalVertices[t]=0,this.decalActive--)}clearDecals(){for(let t=0;t<this.decalCapacity;t++)this.decalOrder[t]=-1,this.decalFade[t]=0,this.decalFading[t]=0,this.decalVertices[t]=0;this.decalCounter=0,this.decalActive=0,this.decalAttr.needsUpdate=!0,this.refreshDecalDraws()}setReceivers(t){this.projection.build(t)}setDecalFade(t,e){const n=t*hr;for(let s=n;s<n+this.decalVertices[t];s++)this.decalAttr.setZ(s,e);this.decalAttr.addUpdateRange(n*4,this.decalVertices[t]*4)}refreshDecalDraws(){const t=this.decalGeometry.index;let e=0;for(let n=0;n<this.decalCapacity;n++)for(let s=0;s<this.decalVertices[n];s++)t.setX(e++,n*hr+s);t.addUpdateRange(0,e),t.needsUpdate=!0,this.decalGeometry.setDrawRange(0,e),this.decalMesh.visible=e>0}get decalCount(){return this.decalActive}get settledDecalCount(){let t=0;for(let e=0;e<this.decalCapacity;e++)this.decalOrder[e]>=0&&this.decalFading[e]===0&&t++;return t}}function cS(i){const t=new Y0;return t.setAttribute("position",new Xe(new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),3)),t.setAttribute("uv",new Xe(new Float32Array([0,0,1,0,1,1,0,1]),2)),t.setIndex([0,1,2,0,2,3]),t.setAttribute("aStamp",new Mr(new Float32Array(i*4),4)),t.setAttribute("aParams",new Mr(new Float32Array(i*4),4)),t.instanceCount=0,t}function hS(i){return new xn({uniforms:{uAtlas:{value:i},uPaintMin:{value:new It},uPaintInvSize:{value:new It}},vertexShader:`
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
        vUv = uv * vec2( ${Tc.toFixed(6)}, ${Ac.toFixed(6)} ) + aParams.xy;
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
    `,transparent:!0,depthTest:!1,depthWrite:!1,blending:pd,blendEquation:ti,blendSrc:jo,blendDst:gr,blendEquationAlpha:ti,blendSrcAlpha:jo,blendDstAlpha:gr})}function uS(i){const t=new Re({color:Ut.splat,emissive:Ut.splat,emissiveIntensity:wn.emissive,roughness:wn.roughness,metalness:0,transparent:!0,depthWrite:!1,alphaTest:.04,side:ii,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4});return t.onBeforeCompile=e=>{e.uniforms.uSplatAtlas={value:i},e.vertexShader=e.vertexShader.replace("#include <common>",`
        #include <common>
        attribute vec4 aSplat;
        varying vec2 vSplatUv;
        varying vec2 vSplatFadeBright;
      `).replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vSplatUv = uv * vec2( ${Tc.toFixed(6)}, ${Ac.toFixed(6)} ) + aSplat.xy;
        vSplatFadeBright = aSplat.zw;
      `),e.fragmentShader=e.fragmentShader.replace("#include <common>",`
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
            * mix( ${wn.edgeValue.toFixed(3)}, 1.0, splatThickness );
        }
      `).replace("#include <roughnessmap_fragment>",`
        #include <roughnessmap_fragment>
        roughnessFactor = mix(
          ${wn.edgeRoughness.toFixed(3)},
          ${wn.roughness.toFixed(3)},
          splatThickness
        );
      `)},t.customProgramCacheKey=()=>"clawd-splat-surface-patch",t}const dS=16,fS=.85,pS=16,mS=7,gS=.34,vS=3.4,Tu=.13,la=new Yt().makeScale(0,0,0);class xS{scene;dropletCapacity;dropletGeometry;dropletMaterial;droplets;px;py;pz;vx;vy;vz;size;spin;life;mark;markVariant;markBright;nextDroplet=0;activeDroplets=0;onDropletLand=null;flashCapacity;flashGeometry;flashMaterial;flashes;flashX;flashY;flashZ;flashScale;flashLife;nextFlash=0;matrix=new Yt;position=new L;quaternion=new Yn;euler=new Rn;scaleVec=new L;colour=new Ct;floorY=0;rng=Fe("boot","effects-burst");constructor(t,e={}){this.scene=t,this.dropletCapacity=e.dropletCapacity??160,this.flashCapacity=e.flashCapacity??6,this.dropletGeometry=new ve(1,1,1),this.dropletMaterial=new Re({color:Ut.splat,emissive:Ut.splat,emissiveIntensity:wn.emissive,roughness:wn.roughness,metalness:0}),this.droplets=new Bs(this.dropletGeometry,this.dropletMaterial,this.dropletCapacity),this.droplets.frustumCulled=!1,this.droplets.castShadow=!1,this.droplets.count=this.dropletCapacity,this.px=new Float32Array(this.dropletCapacity),this.py=new Float32Array(this.dropletCapacity),this.pz=new Float32Array(this.dropletCapacity),this.vx=new Float32Array(this.dropletCapacity),this.vy=new Float32Array(this.dropletCapacity),this.vz=new Float32Array(this.dropletCapacity),this.size=new Float32Array(this.dropletCapacity),this.spin=new Float32Array(this.dropletCapacity),this.life=new Float32Array(this.dropletCapacity),this.mark=new Uint8Array(this.dropletCapacity),this.markVariant=new Float32Array(this.dropletCapacity),this.markBright=new Float32Array(this.dropletCapacity),this.flashGeometry=new wi(.5,12,8),this.flashMaterial=new un({color:Ut.splat,transparent:!0,opacity:.52,blending:bi,depthWrite:!1}),this.flashes=new Bs(this.flashGeometry,this.flashMaterial,this.flashCapacity),this.flashes.frustumCulled=!1,this.flashes.count=this.flashCapacity,this.flashes.renderOrder=2,this.flashX=new Float32Array(this.flashCapacity),this.flashY=new Float32Array(this.flashCapacity),this.flashZ=new Float32Array(this.flashCapacity),this.flashScale=new Float32Array(this.flashCapacity),this.flashLife=new Float32Array(this.flashCapacity),this.reset(),this.scene.add(this.droplets),this.scene.add(this.flashes)}beginRoom(t,e){this.floorY=t,this.rng=Fe(e,"effects-burst"),this.reset()}burst(t,e,n,s,r,a){const o=this.rng,l=e+.72*s;this.spawnFlash(t,l,n,s);const c=Math.round(dS*s);for(let h=0;h<c;h++){const u=this.nextDroplet;this.nextDroplet=(this.nextDroplet+1)%this.dropletCapacity,this.life[u]<=0&&this.activeDroplets++;const d=o()*Math.PI*2,f=wt(o,.25,1),m=wt(o,2.4,6.2)*s,v=Math.sqrt(Math.max(0,1-f*f));this.px[u]=t+Math.cos(d)*.12*s,this.py[u]=l,this.pz[u]=n+Math.sin(d)*.12*s,this.vx[u]=(Math.cos(d)*v+r*.55)*m,this.vy[u]=f*m*.85,this.vz[u]=(Math.sin(d)*v+a*.55)*m,this.size[u]=wt(o,.07,.19)*s,this.spin[u]=wt(o,-14,14),this.life[u]=fS*wt(o,.7,1.15),this.mark[u]=o()<gS?1:0,this.markVariant[u]=o(),this.markBright[u]=wt(o,.66,.92)}}update(t,e){let n=!1;for(let r=0;r<this.dropletCapacity;r++){if(this.life[r]<=0)continue;n=!0;const a=this.life[r]-t;if(this.life[r]=a,a<=0){this.activeDroplets--,this.droplets.setMatrixAt(r,la);continue}this.vy[r]=this.vy[r]-pS*t,this.px[r]=this.px[r]+this.vx[r]*t,this.py[r]=this.py[r]+this.vy[r]*t,this.pz[r]=this.pz[r]+this.vz[r]*t;const o=this.floorY+this.size[r]*.5;if(this.py[r]<=o){this.py[r]=o,this.vy[r]=0,this.mark[r]===1&&(this.mark[r]=0,this.onDropletLand?.(this.px[r],this.pz[r],this.size[r]*vS,this.markBright[r],this.markVariant[r]));const h=Math.max(0,1-mS*t);this.vx[r]=this.vx[r]*h,this.vz[r]=this.vz[r]*h}const l=Math.min(1,a/.22),c=this.size[r]*l;this.position.set(this.px[r],this.py[r],this.pz[r]),this.euler.set(e*this.spin[r],e*this.spin[r]*.7,0),this.quaternion.setFromEuler(this.euler),this.scaleVec.set(c,c,c),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.droplets.setMatrixAt(r,this.matrix)}n&&(this.droplets.instanceMatrix.needsUpdate=!0);let s=!1;for(let r=0;r<this.flashCapacity;r++){if(this.flashLife[r]<=0)continue;s=!0;const a=this.flashLife[r]-t;if(this.flashLife[r]=a,a<=0){this.flashes.setMatrixAt(r,la);continue}const o=1-a/Tu,l=this.flashScale[r]*(.35+1.25*Math.sqrt(o));this.position.set(this.flashX[r],this.flashY[r],this.flashZ[r]),this.quaternion.identity(),this.scaleVec.set(l,l,l),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.flashes.setMatrixAt(r,this.matrix);const c=Math.max(0,1-o);this.colour.setHex(Ut.splat).multiplyScalar(c*c*c),this.flashes.setColorAt(r,this.colour)}s&&(this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0))}get dropletCount(){return this.activeDroplets}reset(){this.life.fill(0),this.flashLife.fill(0),this.mark.fill(0),this.nextDroplet=0,this.nextFlash=0,this.activeDroplets=0;for(let t=0;t<this.dropletCapacity;t++)this.droplets.setMatrixAt(t,la);for(let t=0;t<this.flashCapacity;t++)this.flashes.setMatrixAt(t,la),this.flashes.setColorAt(t,this.colour.setHex(Ut.splat));this.droplets.instanceMatrix.needsUpdate=!0,this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0)}dispose(){this.scene.remove(this.droplets),this.scene.remove(this.flashes),this.droplets.dispose(),this.flashes.dispose(),this.dropletGeometry.dispose(),this.dropletMaterial.dispose(),this.flashGeometry.dispose(),this.flashMaterial.dispose()}spawnFlash(t,e,n,s){const r=this.nextFlash;this.nextFlash=(this.nextFlash+1)%this.flashCapacity,this.flashX[r]=t,this.flashY[r]=e,this.flashZ[r]=n,this.flashScale[r]=.95*s,this.flashLife[r]=Tu}}const _S=.16,Au=.8,MS=2,yS=.86;function Rc(i){return i<=0?0:i>=1?1:i}function SS(i,t){const e=Rc(i);return t*(Au+(MS-Au)*Math.sqrt(e))}function ES(i){const t=1-Rc(i);return t*t}function bS(i,t){const e=1-Rc(i);return t*yS*Math.sqrt(e*e*e)}const Oo=.012,wS=.7,TS=.92,ca=new Yt().makeScale(0,0,0),AS=new L(0,0,1);class RS{scene;capacity;ringGeometry;coreGeometry;ringMaterial;coreMaterial;rings;cores;x;y;z;nx;ny;nz;size;life;total;fresh;next=0;live=0;matrix=new Yt;position=new L;normal=new L;quaternion=new Yn;scaleVec=new L;colour=new Ct;rng=Fe("boot","effects-impact");constructor(t,e={}){this.scene=t,this.capacity=Math.max(1,e.capacity??8),this.ringGeometry=new yc(.72,1,28,1),this.coreGeometry=new Mc(1,20),this.ringMaterial=new un({color:16777215,transparent:!0,opacity:wS,blending:bi,depthWrite:!1,side:gn,forceSinglePass:!0}),this.coreMaterial=new un({color:Ut.coreDark,transparent:!0,opacity:TS,depthWrite:!1,side:gn,forceSinglePass:!0}),this.rings=new Bs(this.ringGeometry,this.ringMaterial,this.capacity),this.cores=new Bs(this.coreGeometry,this.coreMaterial,this.capacity);for(const n of[this.rings,this.cores])n.frustumCulled=!1,n.castShadow=!1,n.receiveShadow=!1,n.count=this.capacity;this.cores.renderOrder=2,this.rings.renderOrder=3,this.x=new Float32Array(this.capacity),this.y=new Float32Array(this.capacity),this.z=new Float32Array(this.capacity),this.nx=new Float32Array(this.capacity),this.ny=new Float32Array(this.capacity),this.nz=new Float32Array(this.capacity),this.size=new Float32Array(this.capacity),this.life=new Float32Array(this.capacity),this.total=new Float32Array(this.capacity),this.fresh=new Uint8Array(this.capacity),this.reset(),this.scene.add(this.cores),this.scene.add(this.rings)}beginRun(t){this.rng=Fe(t,"effects-impact"),this.reset()}spawn(t,e,n,s,r,a){const o=this.next;this.next=(this.next+1)%this.capacity,this.life[o]<=0&&this.live++,this.x[o]=t+s*Oo,this.y[o]=e+r*Oo,this.z[o]=n+a*Oo,this.nx[o]=s,this.ny[o]=r,this.nz[o]=a,this.size[o]=wt(this.rng,.9,1.15);const l=_S*wt(this.rng,.9,1.1);this.total[o]=l,this.life[o]=l,this.fresh[o]=1}update(t){let e=!1;for(let n=0;n<this.capacity;n++){if(this.life[n]<=0)continue;e=!0;const s=this.life[n]-(this.fresh[n]?0:t);if(this.fresh[n]=0,this.life[n]=s,s<=0){this.rings.setMatrixAt(n,ca),this.cores.setMatrixAt(n,ca),this.live--;continue}const r=1-s/this.total[n],a=this.size[n];this.position.set(this.x[n],this.y[n],this.z[n]),this.normal.set(this.nx[n],this.ny[n],this.nz[n]),this.quaternion.setFromUnitVectors(AS,this.normal);const o=SS(r,Oe.radius)*a;this.scaleVec.set(o,o,1),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.rings.setMatrixAt(n,this.matrix),this.colour.setHex(Ut.violet).multiplyScalar(ES(r)),this.rings.setColorAt(n,this.colour);const l=bS(r,Oe.radius)*a;this.scaleVec.set(l,l,1),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.cores.setMatrixAt(n,this.matrix)}this.rings.visible=this.live>0,this.cores.visible=this.live>0,e&&(this.rings.instanceMatrix.needsUpdate=!0,this.cores.instanceMatrix.needsUpdate=!0,this.rings.instanceColor&&(this.rings.instanceColor.needsUpdate=!0))}get liveCount(){return this.live}get poolCapacity(){return this.capacity}reset(){this.life.fill(0),this.fresh.fill(0),this.next=0,this.live=0,this.rings.visible=!1,this.cores.visible=!1;for(let t=0;t<this.capacity;t++)this.rings.setMatrixAt(t,ca),this.cores.setMatrixAt(t,ca),this.rings.setColorAt(t,this.colour.setHex(Ut.violet));this.rings.instanceMatrix.needsUpdate=!0,this.cores.instanceMatrix.needsUpdate=!0,this.rings.instanceColor&&(this.rings.instanceColor.needsUpdate=!0)}dispose(){this.scene.remove(this.rings),this.scene.remove(this.cores),this.rings.dispose(),this.cores.dispose(),this.ringGeometry.dispose(),this.coreGeometry.dispose(),this.ringMaterial.dispose(),this.coreMaterial.dispose()}}const Bo=[],Ts=1e-6,CS=["minX","minY","minZ"],PS=["maxX","maxY","maxZ"],IS=["x","y","z"],zo=["nx","ny","nz"];function LS(i,t,e){const n=Oe.radius;e.x=t.x-t.nx*n,e.y=t.y-t.ny*n,e.z=t.z-t.nz*n,e.nx=t.nx,e.ny=t.ny,e.nz=t.nz,i.query(t.x-n,t.z-n,t.x+n,t.z+n,Bo);let s=-1/0;for(const r of Bo){let a=-1/0,o=1/0,l=-1,c=!0;for(let h=0;h<3;h++){const u=t[IS[h]],d=t[zo[h]],f=r[CS[h]],m=r[PS[h]];if(u<f-n-Ts||u>m+n+Ts){c=!1;break}if(Math.abs(d)<Ts){if(u<f-Ts||u>m+Ts){c=!1;break}continue}const v=(f-u)/d,g=(m-u)/d;a=Math.max(a,Math.min(v,g));const p=Math.max(v,g);p<o&&(o=p,l=h)}!c||l<0||a>o+Ts||o<=s||(s=o,e.x=t.x+t.nx*o,e.y=t.y+t.ny*o,e.z=t.z+t.nz*o,e.nx=0,e.ny=0,e.nz=0,e[zo[l]]=Math.sign(t[zo[l]]))}Bo.length=0}const nr=new L(.42,-.14,-.8),ko=.16,Vo=-.02,Go=.05,DS=.84,ir=-.63,Ru=.16,NS=.32;function pn(i,t,e=20){const n=new he(i,i,t,e,1);return n.rotateX(Math.PI/2),n}function FS(i,t,e,n=20){const s=new he(i,t,e,n,1);return s.rotateX(Math.PI/2),s}function Cu(i,t,e=16){const n=new he(i,i,t,e,1);return n.rotateZ(Math.PI/2),n}function ha(i,t,e=24){return new Si(i,t,8,e)}function Pu(i,t,e=24){const n=new Si(i,t,8,e);return n.rotateY(Math.PI/2),n}class US{group=new Gi;materials=new Map;geometries=[];meshes=[];core;rotor;muzzleLaunchCore;muzzleLaunchBolt;emissiveMaterial;muzzleLaunchMaterial;emissiveBase=new Ct(Ut.violet);muzzleClip=new L;muzzleRay=new L;swayX=0;swayY=0;recoil=0;bob=0;spin=0;muzzleLaunchTime=0;viewScene;constructor(t){this.viewScene=t,this.materials.set("gold",new Re({color:Ut.gold,metalness:.95,roughness:.26,envMapIntensity:1.5})),this.materials.set("shellWarm",new Re({color:Ut.shellWarm,metalness:.28,roughness:.34,envMapIntensity:1.1})),this.materials.set("shellCool",new Re({color:Ut.shellCool,metalness:.72,roughness:.3,envMapIntensity:1.3})),this.materials.set("dark",new Re({color:Ut.mechDark,metalness:.6,roughness:.5})),this.materials.set("accent",new Re({color:9380896,metalness:.3,roughness:.4})),this.emissiveMaterial=new un({color:Ut.violet}),this.materials.set("emissive",this.emissiveMaterial),this.muzzleLaunchMaterial=new un({color:Ut.violetRim,transparent:!0,opacity:0,blending:bi,depthWrite:!1});const e=new Map,n=(l,c,h=0,u=0,d=0)=>{c.translate(h,u,d);const f=e.get(l);f?f.push(c):e.set(l,[c])};n("dark",pn(.058,1.05,16),0,0,-.14),n("shellCool",pn(.092,.66),0,0,-.12),n("gold",pn(.108,.1),0,0,-.4),n("gold",pn(.106,.075),0,0,-.2),n("gold",pn(.104,.06),0,0,0),n("gold",pn(.102,.05),0,0,.17),n("shellWarm",pn(.098,.075),0,0,-.5),n("gold",pn(.092,.055),0,0,-.555),n("shellCool",pn(.082,.035),0,0,-.593),n("gold",FS(.07,.08,.03),0,0,ir),n("shellWarm",new ve(.185,.15,.22),0,-.005,.29),n("gold",new ve(.196,.028,.2),0,.078,.29),n("gold",new ve(.196,.024,.16),0,-.085,.29),n("dark",new ve(.13,.105,.035),0,-.005,.405),n("gold",new ve(.152,.126,.018),0,-.005,.393),n("dark",new ve(.06,.085,.16),0,-.125,.19),n("shellWarm",new ve(.115,.055,.4),0,.108,-.12),n("gold",new ve(.102,.03,.2),0,.148,.02);for(let l=0;l<5;l++)n("dark",new ve(.082,.014,.012),0,.161,-.06+l*.04);n("gold",new ve(.036,.115,.34),-.098,.015,.06),n("dark",new ve(.013,.055,.26),-.12,.015,.06),n("gold",Pu(.08,.015),-.092,0,-.17),n("dark",Cu(.07,.026),-.088,0,-.17),n("emissive",Pu(.052,.01),-.102,0,-.17),n("shellCool",Cu(.028,.046),-.106,0,-.17),n("emissive",ha(.046,.008),0,0,-.558),n("emissive",ha(.035,.007),0,0,-.596),n("emissive",ha(.024,.006),0,0,ir+.006),n("shellCool",pn(.012,.22,10),-.082,-.095,.12),n("accent",pn(.019,.05,10),-.082,-.095,.235);for(const[l,c]of e){const h=tf(c,!1);for(const d of c)d.dispose();if(!h)continue;this.geometries.push(h);const u=new jt(h,this.materials.get(l));this.group.add(u),this.meshes.push(u)}const s=new wi(.036,14,10);this.geometries.push(s),this.core=new jt(s,this.emissiveMaterial),this.core.position.set(0,0,ir+.01),this.group.add(this.core);const r=new wi(.055,12,8);this.geometries.push(r),this.muzzleLaunchCore=new jt(r,this.muzzleLaunchMaterial),this.muzzleLaunchCore.visible=!1,this.group.add(this.muzzleLaunchCore),this.meshes.push(this.muzzleLaunchCore);const a=pn(.022,1,8);this.geometries.push(a),this.muzzleLaunchBolt=new jt(a,this.muzzleLaunchMaterial),this.muzzleLaunchBolt.visible=!1,this.group.add(this.muzzleLaunchBolt),this.meshes.push(this.muzzleLaunchBolt);const o=ha(.104,.013,28);this.geometries.push(o),this.rotor=new jt(o,this.materials.get("gold")),this.rotor.position.set(0,0,-.4),this.group.add(this.rotor),this.group.position.copy(nr),this.group.rotation.set(Vo,ko,Go),this.group.scale.setScalar(DS),this.viewScene.add(this.group)}writeMuzzleWorld(t,e,n){this.group.updateWorldMatrix(!0,!0),this.core.getWorldPosition(this.muzzleClip),this.muzzleClip.project(e),this.muzzleRay.set(this.muzzleClip.x,this.muzzleClip.y,.5).unproject(t).sub(t.position).normalize(),n.copy(t.position).addScaledVector(this.muzzleRay,.72)}kick(){this.recoil=1,this.muzzleLaunchTime=Ru}reset(){this.swayX=0,this.swayY=0,this.recoil=0,this.bob=0,this.spin=0,this.muzzleLaunchTime=0,this.group.position.copy(nr),this.group.rotation.set(Vo,ko,Go),this.core.scale.setScalar(1.2),this.emissiveMaterial.color.copy(this.emissiveBase),this.rotor.rotation.z=0,this.muzzleLaunchCore.visible=!1,this.muzzleLaunchBolt.visible=!1,this.muzzleLaunchMaterial.opacity=0}update(t,e,n,s,r){const a=Math.max(-.05,Math.min(.05,-e*.9)),o=Math.max(-.05,Math.min(.05,-n*.9));this.swayX=Cs(this.swayX,a,9,t),this.swayY=Cs(this.swayY,o,9,t),this.recoil=Cs(this.recoil,0,11,t),this.bob=Cs(this.bob,s>.4?1:0,6,t);const l=r*9.5,c=Math.sin(l)*.012*this.bob,h=Math.abs(Math.cos(l))*.014*this.bob;this.group.position.set(nr.x+this.swayX+c,nr.y+this.swayY-h,nr.z+this.recoil*.075),this.group.rotation.set(Vo+this.recoil*.16-this.swayY*.5,ko+this.swayX*.6,Go+this.swayX*.35);const u=1-this.recoil;this.core.scale.setScalar(.45+u*.75),this.emissiveMaterial.color.copy(this.emissiveBase).multiplyScalar(.35+u*.65),this.muzzleLaunchTime=Math.max(0,this.muzzleLaunchTime-t);const d=1-this.muzzleLaunchTime/Ru,f=NS*d,m=this.muzzleLaunchTime>0;this.muzzleLaunchCore.visible=m,this.muzzleLaunchBolt.visible=m,m?(this.muzzleLaunchCore.position.set(0,0,ir-f),this.muzzleLaunchCore.scale.setScalar(.8+d*.35),this.muzzleLaunchBolt.position.set(0,0,ir-f*.5),this.muzzleLaunchBolt.scale.set(1,1,Math.max(.02,f)),this.muzzleLaunchMaterial.opacity=(1-d)*.9):this.muzzleLaunchMaterial.opacity=0,this.spin+=t*(2+this.recoil*26),this.rotor.rotation.z=this.spin}dispose(){this.viewScene.remove(this.group);for(const t of this.meshes)this.group.remove(t);this.meshes.length=0;for(const t of this.geometries)t.dispose();for(const t of this.materials.values())t.dispose();this.muzzleLaunchMaterial.dispose(),this.geometries.length=0,this.materials.clear()}}class OS{bobPhase=0;bobAmount=0;shake=0;shakeSeed=0;camera;constructor(t){this.camera=t,this.camera.rotation.order="YXZ"}addShake(t){this.shake=Math.min(1,this.shake+t),this.shakeSeed+=1.7}update(t,e,n,s,r){const a=t.prevX+(t.x-t.prevX)*s,o=t.prevZ+(t.z-t.prevZ)*s,l=Math.hypot(t.vx,t.vz);this.bobAmount=Cs(this.bobAmount,l>.5?1:0,7,r),this.bobPhase+=l*r*1.65;const c=Math.abs(Math.sin(this.bobPhase))*.035*this.bobAmount,h=Math.sin(this.bobPhase*.5)*.006*this.bobAmount;this.shake=Cs(this.shake,0,7,r);const u=this.shake*this.shake*.045,d=Math.sin(this.shakeSeed*12.9898)*u,f=Math.sin(this.shakeSeed*78.233)*u;this.camera.position.set(a,t.y+ce.eyeHeight+c,o),this.camera.rotation.set(n+f,e+d,h)}reset(){this.bobPhase=0,this.bobAmount=0,this.shake=0}}function Ae(i){const t=document.getElementById(i);if(!t)throw new Error(`HUD element #${i} is missing from index.html`);return t}const BS=2.4,zS=new Intl.NumberFormat;function Iu(i){return zS.format(i)}class kS{hud=Ae("hud");crosshair=Ae("crosshair");hitmarker=Ae("hitmarker");damage=Ae("damage");integrity=Ae("integrity");integrityFill=Ae("integrity-fill");debug=Ae("debug");captureHint=Ae("capture-hint");overTitle=Ae("over-title");overScore=Ae("over-score");overStats=Ae("over-stats");status=Ae("status");statusMain=Ae("status-main");statusSub=Ae("status-sub");scorePop=Ae("score-pop");screens={title:Ae("screen-title"),pause:Ae("screen-pause"),settings:Ae("screen-settings"),over:Ae("screen-over")};hitTimer=0;statusTimer=0;damageTimer=null;debugVisible=!1;showScreen(t){for(const[e,n]of Object.entries(this.screens))n.hidden=e!==t;this.hud.hidden=t!=="none"}setDebugVisible(t){this.debugVisible=t,this.debug.hidden=!t}toggleDebug(){return this.setDebugVisible(!this.debugVisible),this.debugVisible}get isDebugVisible(){return this.debugVisible}setIntegrity(t,e){const n=Math.max(0,Math.min(1,t/e));this.integrityFill.style.width=`${n*100}%`,this.integrity.classList.toggle("low",n<=.34)}flashHit(){this.hitmarker.classList.remove("show"),this.hitmarker.offsetWidth,this.hitmarker.classList.add("show"),this.hitTimer=.24}flashDamage(){this.damage.classList.add("show"),this.damageTimer!==null&&window.clearTimeout(this.damageTimer),this.damageTimer=window.setTimeout(()=>{this.damageTimer=null,this.damage.classList.remove("show")},60)}setCooling(t){this.crosshair.classList.toggle("cooling",t)}setCaptureHint(t){this.captureHint.hidden=!t}setStatus(t,e="",n="neutral"){this.statusMain.textContent=t,this.statusSub.textContent=e,this.status.classList.toggle("alert",n==="alert"),this.status.classList.toggle("secure",n==="secure"),this.status.classList.add("show"),this.statusTimer=BS}clearStatus(){this.statusTimer=0,this.status.classList.remove("show")}flashScore(t,e){this.scorePop.innerHTML=e>1?`+${t}<span class="chain">&times;${e}</span>`:`+${t}`,this.scorePop.classList.remove("show"),this.scorePop.offsetWidth,this.scorePop.classList.add("show")}update(t){this.hitTimer>0&&(this.hitTimer-=t,this.hitTimer<=0&&this.hitmarker.classList.remove("show")),this.statusTimer>0&&(this.statusTimer-=t,this.statusTimer<=0&&this.status.classList.remove("show"))}setResults(t,e,n,s,r){const a=t.shots>0?t.hits/t.shots*100:0;this.overTitle.textContent=r?"CONTAINMENT RESTORED":"CONTAINMENT LOST",this.screens.over.classList.toggle("secure",r),this.overScore.textContent=t.score.toLocaleString(),this.overStats.innerHTML=[`Specimens popped &nbsp;<b>${t.kills}</b>`,`Sectors held &nbsp;<b>${e} / ${n}</b>`,`Best chain &nbsp;<b>${t.bestChain>1?`${t.bestChain}`:"—"}</b>`,`Accuracy &nbsp;<b>${a.toFixed(0)}%</b>`,`Integrity recovered &nbsp;<b>${t.integrityRestored>0?t.integrityRestored:"—"}</b>`,`Time &nbsp;<b>${t.timeAlive.toFixed(1)}s</b>`,`Seed &nbsp;<b>${s}</b>`].join("<br />")}setDebug(t){if(!this.debugVisible)return;const e=t.frame;this.debug.textContent=[`seed      ${t.seed}`,`quality   ${t.quality}  dpr ${t.pixelRatio.toFixed(2)}  cap ${t.pixelRatioCap.toFixed(2)}${t.adaptiveSteps>0?`  adapt -${t.adaptiveSteps}`:""}`,`frame ms  p50 ${e.p50.toFixed(2)}  p95 ${e.p95.toFixed(2)}`,`          p99 ${e.p99.toFixed(2)}  max ${e.worst.toFixed(2)}`,`hitches   ${e.hitches}  (>20ms, ${e.samples} frames)`,`draws     ${t.drawCalls}  / 150`,`tris      ${Iu(t.triangles)}  / 350k`,`gpu       ${t.geometries} geo  ${t.textures} tex  ${t.programs} prog`,`world     ${t.meshes} meshes  ${t.brushes} brushes`,`lights    ${t.lights} lit / ${t.fixtures} placed`,`rooms     ${t.rooms}  ${t.roomArchetype} esc ${t.roomEscalation.toFixed(2)}`,`sectors   ${t.sectorsCleared} / ${t.sectors} held`,`threat    ${t.threatSpent} / ${t.threatBudget} here  ${t.requiredThreat} req / ${t.threatTotal} all`,`enemies   ${t.enemies}`,`shots     ${t.projectiles}`,`decals    ${t.decals} / ${t.decalBudget}  drops ${t.droplets}`,`score     ${Iu(t.score)}`,`gen ms    ${t.genMs.toFixed(2)}  try ${t.attempts}${t.fallback?" FALLBACK":""}`,`warm ms   ${t.prewarmMs.toFixed(2)}`].join(`
`)}dispose(){this.damageTimer!==null&&(window.clearTimeout(this.damageTimer),this.damageTimer=null),this.hitTimer=0,this.statusTimer=0,this.hitmarker.classList.remove("show"),this.damage.classList.remove("show"),this.status.classList.remove("show"),this.scorePop.classList.remove("show")}}const Lu=9,Du=5,ua=.14,Nu=.92,VS=.42;function GS(i,t){const e={discovered:new Uint8Array(i),reveal:new Float32Array(i)};return t>=0&&t<i&&(e.discovered[t]=1,e.reveal[t]=1),e}function HS(i,t){return t<0||t>=i.discovered.length||i.discovered[t]?!1:(i.discovered[t]=1,i.reveal[t]=0,!0)}function WS(i,t){let e=!1;const n=Math.max(0,t)/VS;if(n===0)return!1;for(let s=0;s<i.discovered.length;s++)!i.discovered[s]||i.reveal[s]>=1||(i.reveal[s]=Math.min(1,i.reveal[s]+n),e=!0);return e}function Ho(i,t){return i.discovered[t]?1-(1-(i.reveal[t]??0))**3:0}class XS{canvas;ctx;base=document.createElement("canvas");baseCtx;plan=null;discovery=null;projection=null;reduceMotion=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;dirty=!0;constructor(t){this.canvas=t;const e=t.getContext("2d"),n=this.base.getContext("2d");if(!e||!n)throw new Error("2D canvas context unavailable — cannot draw the minimap");this.ctx=e,this.baseCtx=n}setPlan(t){this.plan=t,this.discovery=GS(t.rooms.length,t.startRoomId),this.dirty=!0}discover(t){!this.discovery||!HS(this.discovery,t)||(this.reduceMotion&&(this.discovery.reveal[t]=1),this.dirty=!0)}get discoveredCount(){const t=this.discovery;if(!t)return 0;let e=0;for(const n of t.discovered)e+=n;return e}draw(t,e,n,s,r){const a=this.plan,o=this.discovery;if(!a||!o)return;const l=Math.min(window.devicePixelRatio||1,2),c=this.canvas.clientWidth,h=this.canvas.clientHeight;if(c===0||h===0)return;const u=Math.round(c*l),d=Math.round(h*l);(this.canvas.width!==u||this.canvas.height!==d)&&(this.canvas.width=u,this.canvas.height=d,this.base.width=u,this.base.height=d,this.dirty=!0),WS(o,r)&&(this.dirty=!0),this.dirty&&this.redrawBase(c,h,l);const f=this.ctx;f.setTransform(l,0,0,l,0,0),f.clearRect(0,0,c,h),f.drawImage(this.base,0,0,c,h);const m=this.projection,v=a.rooms[s];if(!m||!v)return;const g=b=>m.offsetX+b*m.scale,p=b=>m.offsetZ+b*m.scale;f.strokeStyle="#1fc9c2",f.lineWidth=1.5,f.strokeRect(g(v.minX),p(v.minZ),(v.maxX-v.minX)*m.scale,(v.maxZ-v.minZ)*m.scale);const y=g(t),w=p(e),M=-Math.sin(n),T=-Math.cos(n);f.strokeStyle="#e8e6dd",f.lineWidth=1.5,f.beginPath(),f.moveTo(y,w),f.lineTo(y+M*8,w+T*8),f.stroke(),f.fillStyle="#1fc9c2",f.beginPath(),f.arc(y,w,2.25,0,Math.PI*2),f.fill()}redrawBase(t,e,n){const s=this.plan,r=this.discovery,a=this.baseCtx;let o=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY,c=Number.POSITIVE_INFINITY,h=Number.NEGATIVE_INFINITY;for(const p of s.rooms)o=Math.min(o,p.minX),l=Math.max(l,p.maxX),c=Math.min(c,p.minZ),h=Math.max(h,p.maxZ);const u=Math.max(1,l-o),d=Math.max(1,h-c),f=Math.min((t-Lu*2)/u,(e-Lu*2)/d),m={scale:f,offsetX:(t-u*f)/2-o*f,offsetZ:(e-d*f)/2-c*f};this.projection=m;const v=p=>m.offsetX+p*f,g=p=>m.offsetZ+p*f;a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,t,e);for(const p of s.connections){const y=s.rooms[p.a],w=s.rooms[p.b];if(!y||!w)continue;const M=Math.min(Ho(r,p.a),Ho(r,p.b));a.save(),a.filter=M<.999?`blur(${Du*(1-M)}px)`:"none",a.globalAlpha=ua+(Nu-ua)*M,a.strokeStyle="#788ead",a.lineWidth=1.2,a.beginPath(),a.moveTo(v((y.minX+y.maxX)/2),g((y.minZ+y.maxZ)/2)),a.lineTo(v((w.minX+w.maxX)/2),g((w.minZ+w.maxZ)/2)),a.stroke(),a.restore()}for(const p of s.rooms){const y=Ho(r,p.id),w=v(p.minX),M=g(p.minZ),T=(p.maxX-p.minX)*f,b=(p.maxZ-p.minZ)*f;a.save(),a.filter=y<.999?`blur(${Du*(1-y)}px)`:"none",a.globalAlpha=ua+(Nu-ua)*y,a.fillStyle=y>0?"#172028":"#293443",a.strokeStyle=y>0?"#788ead":"#52647b",a.lineWidth=1,a.fillRect(w,M,T,b),a.strokeRect(w,M,T,b),a.restore()}this.dirty=!1}dispose(){this.plan=null,this.discovery=null,this.projection=null,this.dirty=!0,this.canvas.width=1,this.canvas.height=1,this.base.width=1,this.base.height=1}}function xi(i){const t=document.getElementById(i);if(!t)throw new Error(`Touch element #${i} is missing from index.html`);return t}class qS{root=xi("touch");move=xi("touch-move");fireRing=xi("touch-fire-ring");stick=xi("touch-stick");knob=xi("touch-knob");aim=xi("touch-aim");pause=xi("touch-pause");sprint=xi("touch-sprint");active;gameplayVisible=!1;constructor(t){this.active=t,document.body.classList.toggle("touch",t),this.syncVisibility()}get isActive(){return this.active}setGameplayVisible(t){this.gameplayVisible=t,this.syncVisibility()}setStick(t,e,n){this.knob.style.transform=`translate(calc(-50% + ${t.toFixed(4)} * var(--stick-travel)), calc(-50% + ${e.toFixed(4)} * var(--stick-travel)))`,this.stick.classList.toggle("held",n)}setStickOrigin(t,e){this.stick.style.transform=`translate(${t}px, ${e}px)`}setAimOrigin(t,e,n){if(!n){this.fireRing.style.transform="";return}const s=this.fireRing.getBoundingClientRect();this.fireRing.style.transform=`translate(${t-s.left-s.width/2}px, ${e-s.top-s.height/2}px)`}setSprint(t){this.sprint.classList.toggle("on",t),this.sprint.setAttribute("aria-pressed",t?"true":"false")}dispose(){document.body.classList.remove("touch"),this.root.hidden=!0,this.stick.classList.remove("held"),this.sprint.classList.remove("on"),this.setStick(0,0,!1)}syncVisibility(){this.root.hidden=!(this.active&&this.gameplayVisible)}}const Fa={master:.75,effects:1},Fu=.02,YS=.7,Wo={attackTime:.035,holdTime:.34,decayTime:.85};function Ma(i){return Number.isFinite(i)?i<0?0:i>1?1:i:0}const tn={onset:.18,urgentOnset:.55,peak:.085,sustainScale:.18,urgentScale:.72,slowHz:.28,urgentHz:.66,slowFreq:292,urgentFreq:524};function Uu(i,t,e){if(e<=t)return i>=e?1:0;const n=(i-t)/(e-t);return n<=0?0:n>=1?1:n}function ZS(i){const t=Number.isFinite(i)?Ma(i):0,e=Uu(t,tn.onset,1/3),n=Uu(t,tn.urgentOnset,2/3);return{slow:tn.peak*tn.sustainScale*e,urgent:tn.peak*tn.sustainScale*tn.urgentScale*n,pulseSlow:tn.peak*e,pulseUrgent:tn.peak*tn.urgentScale*n}}const ur={mouseSensitivity:{min:8e-4,max:.006,step:2e-4},touchSensitivity:{min:.0016,max:.01,step:2e-4},masterVolume:{min:0,max:1,step:.05},effectsVolume:{min:0,max:1,step:.05}};function $l(){return{masterVolume:Fa.master,effectsVolume:Fa.effects,mouseSensitivity:Ju,touchSensitivity:He.lookSensitivity,invertY:!1,quality:"auto",autoFire:!1,adaptive:!0}}function $S(i){return i==="auto"||yr(i)}class KS{values;onChange=null;constructor(t){if(this.values=$l(),!t)return;const e=t.get("quality");yr(e)&&(this.values.quality=e);const n=t.get("adaptive");n==="0"?this.values.adaptive=!1:n==="1"&&(this.values.adaptive=!0)}get snapshot(){return this.values}get(t){return this.values[t]}set(t,e){const n=this.coerce(t,e);return n===void 0||this.values[t]===n?!1:(this.values[t]=n,this.onChange?.(t,this.values),!0)}reset(){const t=$l();for(const e of Object.keys(t))this.set(e,t[e])}coerce(t,e){switch(t){case"mouseSensitivity":case"touchSensitivity":case"masterVolume":case"effectsVolume":{const n=ur[t],s=Number(e);return Number.isFinite(s)?Gn(s,n.min,n.max):void 0}case"invertY":case"autoFire":case"adaptive":return!!e;case"quality":return $S(e)?e:void 0;default:return}}}function Ye(i){const t=document.getElementById(i);if(!t)throw new Error(`Settings element #${i} is missing from index.html`);return t}function Ou(i,t){return t>0?`${(i/t).toFixed(2)}×`:i.toFixed(4)}function Bu(i){return`${Math.round(i*100)}%`}const zu=["auto","high","medium","low"];class JS{options;masterRange=Ye("opt-master");masterValue=Ye("opt-master-value");effectsRange=Ye("opt-effects");effectsValue=Ye("opt-effects-value");mouseRange=Ye("opt-mouse");mouseValue=Ye("opt-mouse-value");touchRange=Ye("opt-touch");touchValue=Ye("opt-touch-value");invertToggle=Ye("opt-invert");autoFireToggle=Ye("opt-autofire");qualityGroup=Ye("opt-quality");adaptiveToggle=Ye("opt-adaptive");note=Ye("opt-note");backButton=Ye("btn-settings-back");reloadButton=Ye("btn-settings-reload");qualityButtons;defaults;bootLevel=null;onBack=null;onReload=null;constructor(t,e){this.options=t,this.defaults=e,this.qualityButtons=Array.from(this.qualityGroup.querySelectorAll("button[data-quality]")),this.applyRange(this.mouseRange,ur.mouseSensitivity),this.applyRange(this.touchRange,ur.touchSensitivity),this.applyRange(this.masterRange,ur.masterVolume),this.applyRange(this.effectsRange,ur.effectsVolume),this.masterRange.addEventListener("input",this.onMasterInput),this.effectsRange.addEventListener("input",this.onEffectsInput),this.mouseRange.addEventListener("input",this.onMouseInput),this.touchRange.addEventListener("input",this.onTouchInput),this.invertToggle.addEventListener("click",this.onInvertClick),this.autoFireToggle.addEventListener("click",this.onAutoFireClick),this.adaptiveToggle.addEventListener("click",this.onAdaptiveClick),this.qualityGroup.addEventListener("click",this.onQualityClick),this.qualityGroup.addEventListener("keydown",this.onQualityKeyDown),this.backButton.addEventListener("click",this.onBackClick),this.reloadButton.addEventListener("click",this.onReloadClick),this.refresh()}setBootLevel(t){this.bootLevel=t,this.refresh()}refresh(){const t=this.options.snapshot;this.masterRange.value=String(t.masterVolume),this.masterValue.textContent=Bu(t.masterVolume),this.effectsRange.value=String(t.effectsVolume),this.effectsValue.textContent=Bu(t.effectsVolume),this.mouseRange.value=String(t.mouseSensitivity),this.mouseValue.textContent=Ou(t.mouseSensitivity,this.defaults.mouseSensitivity),this.touchRange.value=String(t.touchSensitivity),this.touchValue.textContent=Ou(t.touchSensitivity,this.defaults.touchSensitivity),this.setToggle(this.invertToggle,t.invertY),this.setToggle(this.autoFireToggle,t.autoFire),this.setToggle(this.adaptiveToggle,t.adaptive);for(const e of this.qualityButtons){const n=e.dataset.quality===t.quality;e.setAttribute("aria-checked",n?"true":"false"),e.tabIndex=n?0:-1}this.syncNote(t.quality)}dispose(){this.masterRange.removeEventListener("input",this.onMasterInput),this.effectsRange.removeEventListener("input",this.onEffectsInput),this.mouseRange.removeEventListener("input",this.onMouseInput),this.touchRange.removeEventListener("input",this.onTouchInput),this.invertToggle.removeEventListener("click",this.onInvertClick),this.autoFireToggle.removeEventListener("click",this.onAutoFireClick),this.adaptiveToggle.removeEventListener("click",this.onAdaptiveClick),this.qualityGroup.removeEventListener("click",this.onQualityClick),this.qualityGroup.removeEventListener("keydown",this.onQualityKeyDown),this.backButton.removeEventListener("click",this.onBackClick),this.reloadButton.removeEventListener("click",this.onReloadClick),this.note.hidden=!0,this.reloadButton.hidden=!0}applyRange(t,e){t.min=String(e.min),t.max=String(e.max),t.step=String(e.step)}setToggle(t,e){t.setAttribute("aria-pressed",e?"true":"false"),t.textContent=e?"On":"Off"}syncNote(t){const e=this.bootLevel!==null&&yr(t)&&t!==this.bootLevel;this.note.hidden=!e,this.reloadButton.hidden=!e,e&&(this.note.textContent="Resolution changed now — lighting, shadows, textures and effect pools need a reload.")}onMasterInput=()=>{this.options.set("masterVolume",this.masterRange.valueAsNumber)};onEffectsInput=()=>{this.options.set("effectsVolume",this.effectsRange.valueAsNumber)};onMouseInput=()=>{this.options.set("mouseSensitivity",this.mouseRange.valueAsNumber)};onTouchInput=()=>{this.options.set("touchSensitivity",this.touchRange.valueAsNumber)};onInvertClick=()=>{this.options.set("invertY",!this.options.get("invertY"))};onAutoFireClick=()=>{this.options.set("autoFire",!this.options.get("autoFire"))};onAdaptiveClick=()=>{this.options.set("adaptive",!this.options.get("adaptive"))};onQualityClick=t=>{const e=t.target;if(!(e instanceof Element))return;const s=e.closest("button[data-quality]")?.dataset.quality;!s||!zu.includes(s)||this.options.set("quality",s)};onQualityKeyDown=t=>{const e=t.target;if(!(e instanceof Element))return;const n=e.closest("button[data-quality]");if(!n)return;const s=this.qualityButtons.indexOf(n);if(s<0)return;let r=s;switch(t.key){case"ArrowRight":case"ArrowDown":r=(s+1)%this.qualityButtons.length;break;case"ArrowLeft":case"ArrowUp":r=(s-1+this.qualityButtons.length)%this.qualityButtons.length;break;case"Home":r=0;break;case"End":r=this.qualityButtons.length-1;break;default:return}t.preventDefault();const a=this.qualityButtons[r],o=a?.dataset.quality;!o||!zu.includes(o)||(this.options.set("quality",o),a.focus())};onBackClick=()=>{this.onBack?.()};onReloadClick=()=>{const t=this.options.get("quality");yr(t)&&this.onReload?.(t)}}const Fi=600,sr=16,ku=20;function QS(){return{enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0}}function jS(){return{at:0,ms:0,simMs:0,renderMs:0,enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0,programsCompiled:0}}class tE{frames=new Float32Array(Fi);sim=new Float32Array(Fi);render=new Float32Array(Fi);sorted=new Float32Array(Fi);index=0;filled=0;hitchCount=0;breachCount=0;elapsed=0;hitchLog=[];hitchWrite=0;hitchFilled=0;lastPrograms=0;peak=QS();constructor(){for(let t=0;t<sr;t++)this.hitchLog.push(jS())}addFrame(t,e,n,s){this.filled===Fi&&this.frames[this.index]>ku&&this.breachCount--,this.frames[this.index]=t,this.sim[this.index]=e,this.render[this.index]=n,this.index=(this.index+1)%Fi,this.filled<Fi&&this.filled++,this.elapsed+=t/1e3,s.enemies>this.peak.enemies&&(this.peak.enemies=s.enemies),s.projectiles>this.peak.projectiles&&(this.peak.projectiles=s.projectiles),s.decals>this.peak.decals&&(this.peak.decals=s.decals),s.droplets>this.peak.droplets&&(this.peak.droplets=s.droplets),s.drawCalls>this.peak.drawCalls&&(this.peak.drawCalls=s.drawCalls),s.triangles>this.peak.triangles&&(this.peak.triangles=s.triangles),s.programs>this.peak.programs&&(this.peak.programs=s.programs);const r=Math.max(0,s.programs-this.lastPrograms);if(this.lastPrograms=s.programs,t>ku){this.hitchCount++,this.breachCount++;const a=this.hitchLog[this.hitchWrite];a.at=this.elapsed,a.ms=t,a.simMs=e,a.renderMs=n,a.enemies=s.enemies,a.projectiles=s.projectiles,a.decals=s.decals,a.droplets=s.droplets,a.drawCalls=s.drawCalls,a.triangles=s.triangles,a.programs=s.programs,a.programsCompiled=r,this.hitchWrite=(this.hitchWrite+1)%sr,this.hitchFilled<sr&&this.hitchFilled++}}syncPrograms(t){this.lastPrograms=t}reset(){this.index=0,this.filled=0,this.hitchCount=0,this.breachCount=0,this.elapsed=0,this.hitchWrite=0,this.hitchFilled=0;const t=this.peak;t.enemies=0,t.projectiles=0,t.decals=0,t.droplets=0,t.drawCalls=0,t.triangles=0,t.programs=0}get sampleCount(){return this.filled}get windowBreaches(){return this.breachCount}report(){return this.percentiles(this.frames)}performance(){const t=this.elapsed/60;return{frame:this.percentiles(this.frames),sim:this.percentiles(this.sim),render:this.percentiles(this.render),windowSeconds:+this.elapsed.toFixed(3),hitchesPerMinute:t>0?+(this.hitchCount/t).toFixed(2):0,hitches:this.recentHitches(),peak:{...this.peak}}}recentHitches(){const t=[],e=this.hitchFilled<sr?0:this.hitchWrite;for(let n=0;n<this.hitchFilled;n++)t.push({...this.hitchLog[(e+n)%sr]});return t}percentiles(t){const e=this.filled;if(e===0)return{p50:0,p95:0,p99:0,worst:0,hitches:0,samples:0};const n=this.sorted.subarray(0,e);return n.set(t.subarray(0,e)),n.sort(),{p50:da(Xo(n,e,.5)),p95:da(Xo(n,e,.95)),p99:da(Xo(n,e,.99)),worst:da(n[e-1]),hitches:this.hitchCount,samples:e}}}function Xo(i,t,e){const n=Math.min(t-1,Math.max(0,Math.ceil(e*t)-1));return i[n]}function da(i){return Math.round(i*1e3)/1e3}const eE={entry:"#2c4a52",corridor:"#1d2a35",junction:"#243444",gallery:"#20303c",lab:"#3a3040",storage:"#38313c",containment:"#43303a",reactor:"#4e3134",chamber:"#5a3326"},Vu=10;class nE{canvas;ctx;plan=null;visible=!1;constructor(t){this.canvas=t;const e=t.getContext("2d");if(!e)throw new Error("2D canvas context unavailable — cannot draw the debug map");this.ctx=e}setPlan(t){this.plan=t}setVisible(t){this.visible=t,this.canvas.hidden=!t}get isVisible(){return this.visible}draw(t){const e=this.plan;if(!this.visible||!e)return;const n=Math.min(window.devicePixelRatio||1,2),s=this.canvas.clientWidth,r=this.canvas.clientHeight;if(s===0||r===0)return;this.canvas.width!==Math.round(s*n)&&(this.canvas.width=Math.round(s*n)),this.canvas.height!==Math.round(r*n)&&(this.canvas.height=Math.round(r*n));const a=this.ctx;a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,s,r),a.fillStyle="rgba(13, 15, 19, 0.82)",a.fillRect(0,0,s,r);const o=Math.max(1,e.maxX-e.minX),l=Math.max(1,e.maxZ-e.minZ),c=Math.min((s-Vu*2)/o,(r-Vu*2)/l),h=(s-o*c)/2-e.minX*c,u=(r-l*c)/2-e.minZ*c,d=M=>h+M*c,f=M=>u+M*c;for(const M of e.connections){const T=e.rooms[M.a],b=e.rooms[M.b];!T||!b||(a.beginPath(),a.moveTo(d((T.minX+T.maxX)/2),f((T.minZ+T.maxZ)/2)),a.lineTo(d((b.minX+b.maxX)/2),f((b.minZ+b.maxZ)/2)),a.strokeStyle=M.loop?"#1fc9c2":M.critical?"#adc0c8":"#52647b",a.lineWidth=M.critical?2:1,a.setLineDash(M.loop?[3,3]:[]),a.stroke())}a.setLineDash([]),a.font="9px ui-monospace, Menlo, monospace",a.textAlign="center",a.textBaseline="middle";for(const M of e.rooms){const T=d(M.minX),b=f(M.minZ),A=(M.maxX-M.minX)*c,_=(M.maxZ-M.minZ)*c;a.fillStyle=eE[M.archetype],a.fillRect(T,b,A,_);const E=M.id===t.engagedRoomId,C=M.id===t.activeRoomId;a.strokeStyle=E?"#f2610a":C?"#1fc9c2":t.cleared[M.id]?"#5d7a5d":"#52647b",a.lineWidth=E||C?2:1,a.strokeRect(T,b,A,_),a.strokeStyle="#f2610a",a.lineWidth=1;for(const P of M.enemySpawns)a.beginPath(),a.moveTo(d(P.x),f(P.z)),a.lineTo(d(P.entryX),f(P.entryZ)),a.stroke();A>22&&_>14&&(a.fillStyle="#adc0c8",a.fillText(`${M.id}`,T+A/2,b+_/2))}a.fillStyle="#f2610a";for(const M of t.enemies)a.fillRect(d(M.x)-1.5,f(M.z)-1.5,3,3);const m=d(t.playerX),v=f(t.playerZ),g=-Math.sin(t.playerYaw),p=-Math.cos(t.playerYaw);a.strokeStyle="#1fc9c2",a.lineWidth=2,a.beginPath(),a.moveTo(m,v),a.lineTo(m+g*10,v+p*10),a.stroke(),a.fillStyle="#1fc9c2",a.beginPath(),a.arc(m,v,2.5,0,Math.PI*2),a.fill();const y=e.report;a.textAlign="left",a.fillStyle=y.fallback?"#f2610a":"#788ead";const w=[`${y.seed}  ${y.rooms}r ${y.connections}c ${y.loops}L`,`try ${y.attempts}  ${y.ms.toFixed(1)}ms${y.fallback?"  FALLBACK":""}`];y.warnings.length>0&&w.push(y.warnings[0]);for(let M=0;M<w.length;M++)a.fillText(w[M],6,r-8-(w.length-1-M)*11)}dispose(){this.plan=null,this.setVisible(!1)}}class iE{accumulator=0;lastTime=0;running=!1;started=!1;stopped=!1;scheduler="probing";frameId=0;probeTimer=null;timerFrame=null;step;render;requestFrame;cancelFrame;constructor(t,e,n,s){this.step=t,this.render=e,this.requestFrame=n,this.cancelFrame=s}start(){this.started||(this.started=!0,this.stopped=!1,this.running=!0,this.lastTime=performance.now(),this.scheduleFrame())}setRunning(t){t&&!this.running&&this.resetClock(),this.running=t}get isRunning(){return this.running}get usesTimerFallback(){return this.scheduler==="timer"}stop(){this.running=!1,this.stopped=!0,this.frameId!==0&&this.cancelFrame(this.frameId),this.probeTimer!==null&&clearTimeout(this.probeTimer),this.timerFrame!==null&&clearTimeout(this.timerFrame),this.frameId=0,this.probeTimer=null,this.timerFrame=null}resetClock(){this.lastTime=performance.now(),this.accumulator=0}scheduleFrame(){if(!this.stopped){if(this.scheduler==="timer"){this.timerFrame=setTimeout(this.onTimerFrame,1e3/60);return}this.frameId=this.requestFrame(this.onAnimationFrame),this.scheduler==="probing"&&this.probeTimer===null&&(this.probeTimer=setTimeout(this.onProbeTimeout,80))}}onAnimationFrame=t=>{this.stopped||this.scheduler==="timer"||(this.scheduler==="probing"&&(this.scheduler="raf",this.probeTimer!==null&&clearTimeout(this.probeTimer),this.probeTimer=null),this.frameId=0,this.tick(t))};onProbeTimeout=()=>{this.stopped||this.scheduler!=="probing"||(this.probeTimer=null,this.cancelFrame(this.frameId),this.frameId=0,this.scheduler="timer",this.tick(performance.now()))};onTimerFrame=()=>{this.stopped||this.scheduler!=="timer"||(this.timerFrame=null,this.tick(performance.now()))};tick(t){if(this.stopped)return;const e=Math.max(0,t-this.lastTime);this.lastTime=t;const n=Math.min(e,250)/1e3;if(this.running){this.accumulator+=n;let r=0;for(;this.accumulator>=ki&&r<zc;)this.step(ki),this.accumulator-=ki,r++;r===zc&&(this.accumulator=0)}const s=this.running?this.accumulator/ki:0;this.render(s,e,n),this.scheduleFrame()}}const ya={gain:1,pan:0},Gu=9,sE=1.2,rE=.85;function aE(i,t,e,n,s,r=ya){const a=n-i,o=s-t,l=Math.hypot(a,o);if(r.gain=Gu/(Gu+l),l<sE)return r.pan=0,r;const c=Math.cos(e),h=-Math.sin(e),u=(a*c+o*h)/l;return r.pan=Gn(u,-1,1)*rE,r}let dr=null;function oE(i){if(dr&&dr.sampleRate===i.sampleRate)return dr;const t=Math.floor(i.sampleRate*2),e=i.createBuffer(1,t,i.sampleRate),n=e.getChannelData(0);let s=2654435769;for(let r=0;r<t;r++)s=Math.imul(s,1664525)+1013904223>>>0,n[r]=s/2147483648-1;return dr=e,e}function lE(){dr=null}function cf(i,t,e,n,s){const r=Math.max(1e-4,e*.001);i.setValueAtTime(1e-4,t),i.linearRampToValueAtTime(e,t+n),i.exponentialRampToValueAtTime(r,t+n+s),i.setValueAtTime(0,t+n+s+.001)}function qe(i,t,e){const n=i.createOscillator(),s=i.createGain();n.type=e.type??"sine",e.detune&&(n.detune.value=e.detune),n.frequency.setValueAtTime(Math.max(1,e.freq),e.start),e.freqTo!==void 0&&n.frequency.exponentialRampToValueAtTime(Math.max(1,e.freqTo),e.start+e.duration),cf(s.gain,e.start,e.gain,e.attack??.004,e.duration),n.connect(s).connect(t),n.start(e.start),n.stop(e.start+e.duration+.05),n.onended=()=>{n.disconnect(),s.disconnect()}}function ai(i,t,e){const n=i.createBufferSource();n.buffer=oE(i),n.loop=!0;const s=i.createBiquadFilter();s.type=e.filter??"bandpass",s.frequency.setValueAtTime(Math.max(20,e.freq),e.start),e.freqTo!==void 0&&s.frequency.exponentialRampToValueAtTime(Math.max(20,e.freqTo),e.start+e.duration),e.q!==void 0&&(s.Q.value=e.q);const r=i.createGain();cf(r.gain,e.start,e.gain,e.attack??.002,e.duration),n.connect(s).connect(r).connect(t),n.start(e.start),n.stop(e.start+e.duration+.05),n.onended=()=>{n.disconnect(),s.disconnect(),r.disconnect()}}function Cc(i,t,e,n){ai(i,t,{start:e,duration:.03,gain:n,attack:.001,filter:"highpass",freq:2200})}const cE=2,hE=6,uE=12,hf=-1,Hu=0,Ki=1;class dE{ctx=null;master=null;limiter=null;sfxBus=null;ambienceGain=null;alarmSlow=null;alarmUrgent=null;persistentNodes=[];releaseTimers=new Map;listenerX=0;listenerZ=0;listenerYaw=0;muted=!1;volume=Fa.master;effects=Fa.effects;escalation=0;announcedEscalation=0;pendingEscalationPulse=!1;suspended=!1;voicesThisFrame=0;get ready(){return this.ctx!==null&&this.ctx.state==="running"}get isMuted(){return this.muted}unlock(){if(!this.ctx){const t=window.AudioContext??window.webkitAudioContext;if(!t)return;try{this.ctx=new t}catch{this.ctx=null;return}this.master=this.ctx.createGain(),this.limiter=this.ctx.createDynamicsCompressor(),this.limiter.threshold.value=-8,this.limiter.knee.value=6,this.limiter.ratio.value=12,this.limiter.attack.value=.002,this.limiter.release.value=.18,this.sfxBus=this.ctx.createGain(),this.ambienceGain=this.ctx.createGain(),this.ambienceGain.gain.value=0,this.sfxBus.connect(this.limiter),this.ambienceGain.connect(this.limiter),this.limiter.connect(this.master),this.master.connect(this.ctx.destination),this.applyVolume(),this.applyEffects(),this.startAmbience(),this.startAlarm();const e=this.pendingEscalationPulse;this.pendingEscalationPulse=!1,this.applyEscalation(e)}this.ctx.resume().catch(()=>{}),this.suspended=!1}setSuspended(t){!this.ctx||this.suspended===t||(this.suspended=t,t?this.ctx.suspend().catch(()=>{}):this.ctx.resume().catch(()=>{}))}setMuted(t){this.muted=t,this.applyVolume()}toggleMuted(){return this.setMuted(!this.muted),this.muted}setMasterVolume(t){this.volume=Ma(t),this.applyVolume()}setEffectsVolume(t){this.effects=Ma(t),this.applyEffects()}get masterVolume(){return this.volume}get effectsVolume(){return this.effects}setEscalation(t){const e=Ma(t);if(e===this.escalation)return;const n=e>this.announcedEscalation;n&&(this.announcedEscalation=e),this.escalation=e,n&&(!this.ctx||!this.alarmSlow||!this.alarmUrgent)&&(this.pendingEscalationPulse=!0),this.applyEscalation(n)}resetEscalation(){this.escalation=0,this.announcedEscalation=0,this.pendingEscalationPulse=!1,this.applyEscalation(!1)}get escalationLevel(){return this.escalation}alarmGains(){return!this.alarmSlow||!this.alarmUrgent?{slow:-1,urgent:-1}:{slow:this.alarmSlow.gain.value,urgent:this.alarmUrgent.gain.value}}setListener(t,e,n){this.listenerX=t,this.listenerZ=e,this.listenerYaw=n}beginFrame(){this.voicesThisFrame=0}get now(){return this.ctx?this.ctx.currentTime:0}get context(){return this.ctx}voice(t=1,e=Hu){if(!this.ctx||!this.sfxBus||this.suspended||!this.claimVoice(e))return null;const n=this.ctx.createGain();return n.gain.value=t,n.connect(this.sfxBus),this.scheduleRelease(n),n}spatialVoice(t,e,n=1,s=Hu){if(!this.ctx||!this.sfxBus||this.suspended)return null;aE(this.listenerX,this.listenerZ,this.listenerYaw,t,e,ya);const r=n*ya.gain;if(r<.01||!this.claimVoice(s))return null;const a=this.ctx.createGain();a.gain.value=r;const o=this.ctx.createStereoPanner();return o.pan.value=ya.pan,a.connect(o).connect(this.sfxBus),this.scheduleRelease(a,o),a}dispose(){this.stopPersistent(),this.cancelPendingReleases(),this.master?.disconnect(),this.limiter?.disconnect(),this.sfxBus?.disconnect(),this.ambienceGain?.disconnect(),this.alarmSlow?.disconnect(),this.alarmUrgent?.disconnect();const t=this.ctx;this.ctx=null,this.master=null,this.limiter=null,this.sfxBus=null,this.ambienceGain=null,this.alarmSlow=null,this.alarmUrgent=null,lE(),t?.close().catch(()=>{})}claimVoice(t){const e=t>=Ki?uE:t<=hf?cE:hE;return this.voicesThisFrame>=e?!1:(this.voicesThisFrame++,!0)}applyVolume(){if(!this.master||!this.ctx)return;const t=this.muted?0:this.volume;this.master.gain.setTargetAtTime(t,this.ctx.currentTime,Fu)}applyEffects(){!this.sfxBus||!this.ctx||this.sfxBus.gain.setTargetAtTime(this.effects,this.ctx.currentTime,Fu)}applyEscalation(t){if(!this.ctx||!this.alarmSlow||!this.alarmUrgent)return;const e=ZS(this.escalation),n=this.ctx.currentTime;this.scheduleAlarmGain(this.alarmSlow.gain,e.slow,e.pulseSlow,n,t),this.scheduleAlarmGain(this.alarmUrgent.gain,e.urgent,e.pulseUrgent,n,t)}scheduleAlarmGain(t,e,n,s,r){const a=t.value;if(t.cancelScheduledValues(s),t.setValueAtTime(a,s),!r||n<=e){t.setTargetAtTime(e,s,YS);return}t.setTargetAtTime(n,s,Wo.attackTime),t.setTargetAtTime(e,s+Wo.holdTime,Wo.decayTime)}scheduleRelease(...t){const e=window.setTimeout(()=>{this.releaseTimers.delete(e);for(const n of t)n.disconnect()},4e3);this.releaseTimers.set(e,t)}cancelPendingReleases(){for(const[t,e]of this.releaseTimers){window.clearTimeout(t);for(const n of e)n.disconnect()}this.releaseTimers.clear()}startAmbience(){const t=this.ctx,e=this.ambienceGain;if(!t||!e)return;const n=t.createOscillator();n.type="sawtooth",n.frequency.value=55;const s=t.createBiquadFilter();s.type="lowpass",s.frequency.value=180,s.Q.value=3;const r=t.createGain();r.gain.value=.08,n.connect(s).connect(r).connect(e),n.start();const a=t.createOscillator();a.type="sine",a.frequency.value=82.5;const o=t.createGain();o.gain.value=.035,a.connect(o).connect(e),a.start(),this.persistentNodes.push(n,s,r,a,o),e.gain.setValueAtTime(0,t.currentTime),e.gain.linearRampToValueAtTime(.5,t.currentTime+1.5)}startAlarm(){const t=this.ctx,e=this.sfxBus;!t||!e||(this.alarmSlow=this.buildAlarmLayer(t,e,tn.slowFreq,tn.slowHz,"square",900),this.alarmUrgent=this.buildAlarmLayer(t,e,tn.urgentFreq,tn.urgentHz,"triangle",1500))}buildAlarmLayer(t,e,n,s,r,a){const o=t.createOscillator();o.type=r,o.frequency.value=n;const l=t.createBiquadFilter();l.type="lowpass",l.frequency.value=a,l.Q.value=.7;const c=t.createGain();c.gain.value=.5;const h=t.createOscillator();h.type="sine",h.frequency.value=s;const u=t.createGain();u.gain.value=.5,h.connect(u).connect(c.gain);const d=t.createGain();return d.gain.value=0,o.connect(l).connect(c).connect(d).connect(e),o.start(),h.start(),this.persistentNodes.push(o,l,c,h,u,d),d}stopPersistent(){for(const t of this.persistentNodes){const e=t;if(typeof e.stop=="function")try{e.stop()}catch{}t.disconnect()}this.persistentNodes.length=0}}let Ji=Fe("boot","audio");function fE(i){Ji=Fe(i,"audio")}function pE(i){const t=i.voice(.55,Ki);if(!t)return;const e=i.context;if(!e)return;const n=i.now,s=wt(Ji,.94,1.06);qe(e,t,{type:"sine",freq:420*s,freqTo:48,start:n,duration:.24,gain:.9}),qe(e,t,{type:"sawtooth",freq:220*s,freqTo:60,start:n,duration:.14,gain:.22}),ai(e,t,{start:n,duration:.16,gain:.4,filter:"bandpass",freq:1800,freqTo:300,q:1.2}),Cc(e,t,n,.5)}function mE(i,t){const e=i.voice(.12);if(!e)return;const n=i.context;if(!n)return;const s=i.now+t*.35;qe(n,e,{type:"triangle",freq:300,freqTo:900,start:s,duration:t*.6,gain:.5,attack:t*.4})}function gE(i,t,e){const n=i.spatialVoice(t,e,.4);if(!n)return;const s=i.context;if(!s)return;const r=i.now;qe(s,n,{type:"sine",freq:180*wt(Ji,.9,1.1),freqTo:45,start:r,duration:.16,gain:.7}),ai(s,n,{start:r,duration:.09,gain:.35,filter:"lowpass",freq:900,freqTo:200})}function vE(i,t,e){const n=i.spatialVoice(t,e,.42);if(!n)return;const s=i.context;if(!s)return;const r=i.now;qe(s,n,{type:"triangle",freq:260*wt(Ji,.85,1.15),freqTo:90,start:r,duration:.1,gain:.6}),ai(s,n,{start:r,duration:.06,gain:.3,filter:"bandpass",freq:700,q:1})}function xE(i,t,e,n){const s=i.spatialVoice(t,e,.17*n,hf);if(!s)return;const r=i.context;if(!r)return;const a=i.now,o=wt(Ji,.88,1.14)/n;qe(r,s,{type:"sine",freq:128*o,freqTo:54*o,start:a,duration:.07,gain:.5}),ai(r,s,{start:a,duration:.05,gain:.28,filter:"lowpass",freq:620*o,freqTo:190})}function qo(i,t,e){const n=i.spatialVoice(t,e,.3);if(!n)return;const s=i.context;if(!s)return;const r=i.now;qe(s,n,{type:"square",freq:150,freqTo:380,start:r,duration:.32,gain:.16,attack:.06})}function _E(i,t,e,n){const s=i.spatialVoice(t,e,.5,Ki);if(!s)return;const r=i.context;if(!r)return;const a=i.now;qe(r,s,{type:"triangle",freq:180,freqTo:1400,start:a,duration:n,gain:.32,attack:n*.7}),ai(r,s,{start:a,duration:n,gain:.3,attack:n*.8,filter:"bandpass",freq:400,freqTo:3200,q:4})}function ME(i,t,e,n){const s=i.spatialVoice(t,e,.9,Ki);if(!s)return;const r=i.context;if(!r)return;const a=i.now,o=wt(Ji,.92,1.09)/n;qe(r,s,{type:"sine",freq:190*o,freqTo:38*o,start:a,duration:.26*n,gain:1}),ai(r,s,{start:a,duration:.2*n,gain:.75,filter:"bandpass",freq:2600*o,freqTo:240*o,q:1.6}),Cc(r,s,a,.55)}function yE(i,t,e){const n=i.spatialVoice(t,e,.4,Ki);if(!n)return;const s=i.context;if(!s)return;const r=i.now+.045;ai(s,n,{start:r,duration:.13,gain:.5,attack:.006,filter:"lowpass",freq:1600*wt(Ji,.85,1.2),freqTo:400})}function SE(i){const t=i.voice(.7,Ki);if(!t)return;const e=i.context;if(!e)return;const n=i.now;qe(e,t,{type:"sine",freq:120,freqTo:40,start:n,duration:.3,gain:.9}),ai(e,t,{start:n,duration:.18,gain:.4,filter:"bandpass",freq:1400,freqTo:500,q:.8})}function EE(i){const t=i.voice(.8,Ki);if(!t)return;const e=i.context;if(!e)return;const n=i.now;qe(e,t,{type:"sawtooth",freq:220,freqTo:30,start:n,duration:1.2,gain:.5}),qe(e,t,{type:"sine",freq:110,freqTo:22,start:n,duration:1.4,gain:.5})}function bE(i){const t=i.voice(.35);if(!t)return;const e=i.context;if(!e)return;const n=i.now;for(let s=0;s<2;s++)qe(e,t,{type:"square",freq:620,start:n+s*.18,duration:.12,gain:.28})}function Yo(i){const t=i.voice(.35);if(!t)return;const e=i.context;if(!e)return;const n=i.now;qe(e,t,{type:"triangle",freq:520,start:n,duration:.14,gain:.3}),qe(e,t,{type:"triangle",freq:780,start:n+.13,duration:.2,gain:.3})}function rr(i){const t=i.voice(.4);if(!t)return;const e=i.context;if(!e)return;const n=i.now;qe(e,t,{type:"triangle",freq:880,start:n,duration:.09,gain:.3}),Cc(e,t,n,.18)}const wE=12,fa=.2,TE=.5,AE={playerRadius:ce.radius,playerHeight:ce.height,enemyRadius:Sf,enemyHeight:Ef};class RE{renderApp;labMaterials;worldView;enemyView;projectileView;splatView;burstView;impactView;weaponView;cameraController;audio=new dE;hud=new kS;minimap;stats=new tE;debugMap;startButton=document.getElementById("btn-start");resumeButton=document.getElementById("btn-resume");retryButton=document.getElementById("btn-retry");newSeedButton=document.getElementById("btn-newseed");optionsButton=document.getElementById("btn-options");optionsPauseButton=document.getElementById("btn-options-pause");pauseScreen=document.getElementById("screen-pause");input;touchLayer;touch;actions=fp();loop;state;seed;screen="title";genMs=0;prewarmMs=0;prevYaw=0;prevPitch=0;elapsed=0;debugAge=fa;roomName="";mapEnemies=[];clearedRooms=[];muzzleWorld=new L;impactSurface={x:0,y:0,z:0,nx:0,ny:0,nz:0};quality;frameContext={enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0};stepMs=0;resizeRecheck=0;viewportAge=0;options;settings;adaptive;settingsReturn="title";constructor(t){const e=new URLSearchParams(location.search);this.seed=Jc(e.get("seed")),this.quality=ZM(e),this.options=new KS(e),this.renderApp=new $M(t,this.quality),this.adaptive=new KM(this.quality.pixelRatioCap,this.options.get("adaptive")),this.labMaterials=sy(this.renderApp.maxAnisotropy),this.worldView=new gy(this.renderApp.scene,this.labMaterials),this.enemyView=new Ny(this.renderApp.scene,Ke.maxAlive),this.projectileView=new Wy(this.renderApp.scene,wE,this.quality.projectileShader,this.quality.projectileLights),this.splatView=new lS(this.renderApp.renderer,this.renderApp.scene,{paintTexelsPerMetre:this.quality.paintTexelsPerMetre,paintMapMax:this.quality.paintMapMax,decalCapacity:this.quality.decalCapacity}),this.burstView=new xS(this.renderApp.scene,{dropletCapacity:this.quality.dropletCapacity,flashCapacity:this.quality.flashCapacity}),this.burstView.onDropletLand=(n,s,r,a,o)=>{this.splatView.stampDrip(n,s,r,a,o)},this.impactView=new RS(this.renderApp.scene,{capacity:this.quality.impactCapacity}),this.weaponView=new US(this.renderApp.viewScene),this.cameraController=new OS(this.renderApp.camera),this.debugMap=new nE(document.getElementById("debug-map")),this.minimap=new XS(document.getElementById("minimap-canvas")),this.input=new gp(t,this.actions,{sensitivity:this.options.get("mouseSensitivity"),invertY:this.options.get("invertY")}),this.input.onLockStateChange=(n,s)=>{if(this.screen==="none"){if(n){this.hud.setCaptureHint(!1);return}s?this.hud.setCaptureHint(!this.touchLayer.isActive):this.setScreen("pause")}},this.input.onSuspend=()=>{this.screen==="none"&&this.setScreen("pause")},this.touchLayer=new qS(YM(e)),this.touch=new vp({stick:this.touchLayer.stick,move:this.touchLayer.move,aim:this.touchLayer.aim,pause:this.touchLayer.pause,sprint:this.touchLayer.sprint},this.actions,{sensitivity:this.options.get("touchSensitivity"),invertY:this.options.get("invertY"),autoFire:this.options.get("autoFire")}),this.touch.peer=this.input,this.input.peer=this.touch,this.touch.onStickChange=(n,s,r)=>this.touchLayer.setStick(n,s,r),this.touch.onStickOrigin=(n,s)=>this.touchLayer.setStickOrigin(n,s),this.touch.onAimOrigin=(n,s,r)=>this.touchLayer.setAimOrigin(n,s,r),this.touch.onSprintChange=n=>this.touchLayer.setSprint(n),this.settings=new JS(this.options,$l()),this.settings.setBootLevel(this.quality.level),this.settings.onBack=()=>this.setScreen(this.settingsReturn),this.settings.onReload=n=>this.reloadWithQuality(n),this.options.onChange=n=>this.applyOption(n),this.audio.setMasterVolume(this.options.get("masterVolume")),this.audio.setEffectsVolume(this.options.get("effectsVolume")),this.state=this.createRun(this.seed),this.loop=new iE(n=>this.step(n),(n,s,r)=>this.renderFrame(n,s,r),n=>window.requestAnimationFrame(n),n=>window.cancelAnimationFrame(n)),this.bindUi(),window.addEventListener("resize",this.onResize),window.addEventListener("orientationchange",this.onResize),e.get("debug")==="1"&&(this.hud.setDebugVisible(!0),this.debugMap.setVisible(!0)),this.setScreen("title"),this.loop.start(),this.loop.setRunning(!1)}onStartClick=()=>{this.audio.unlock(),rr(this.audio),this.restart(!0)};onResumeClick=()=>{this.audio.unlock(),this.setScreen("none")};onRetryClick=()=>{this.audio.unlock(),rr(this.audio),this.restart(!0)};onNewSeedClick=()=>{this.audio.unlock(),rr(this.audio),this.restart(!1)};onPauseScreenClick=t=>{if(this.touch.consumePauseClickSuppression())return;const e=t.target;e instanceof Element&&e.closest("button")||this.setScreen("none")};createRun(t){const e=performance.now(),n=wm(t,{validation:AE,now:()=>performance.now()}),s=op(n,Fe(t,"sim"));this.genMs=performance.now()-e,this.splatView.beginFacility(n,s.index,t),this.burstView.beginRoom(0,t),this.impactView.beginRun(t),fE(t),this.audio.resetEscalation(),this.worldView.build(n,this.splatView.floorPaint),this.splatView.setReceivers(this.worldView.paintReceivers),this.renderApp.configureForFacility(n),this.renderApp.setFixtureFocus(n.playerSpawn.x,n.playerSpawn.z),this.debugMap.setPlan(n),this.minimap.setPlan(n),this.clearedRooms.length=0;for(const a of n.rooms)this.clearedRooms.push(a.encounter.budget<=0);this.actions.yaw=n.playerSpawn.yaw,this.actions.pitch=0,this.prevYaw=this.actions.yaw,this.prevPitch=0,this.cameraController.reset(),this.enemyView.update(s.enemies,0),this.projectileView.reset(),this.weaponView.reset(),this.stats.reset(),this.debugAge=fa,this.cameraController.update(s.player,this.actions.yaw,0,0,0);const r=performance.now();return this.renderApp.setShadowFocus(s.player.x,s.player.z),this.renderApp.prewarm(),this.prewarmMs=performance.now()-r,this.stats.syncPrograms(this.renderApp.programCount),this.hud.setIntegrity(s.player.hp,ce.maxHp),this.hud.clearStatus(),this.roomName=n.rooms[n.startRoomId].name,s}restart(t=!0){t||(this.seed=Jc(null)),this.state=this.createRun(this.seed),this.elapsed=0,this.input.release(),this.touch.release(),this.loop.resetClock(),this.setScreen("none"),this.hud.setStatus(this.roomName,"Containment has failed — reach the core chamber","alert")}setScreen(t){this.screen=t,this.hud.showScreen(t),this.loop.setRunning(t==="none"),this.input.setCaptureEnabled(t==="none"),this.touch.setEnabled(t==="none"),this.touchLayer.setGameplayVisible(t==="none"),this.audio.setSuspended(t!=="none"),t==="none"?(this.input.requestLock(),this.hud.setCaptureHint(this.needsCaptureHint)):(this.hud.setCaptureHint(!1),this.input.release(),this.input.releaseLock(),this.touch.release()),t==="over"&&(this.hud.clearStatus(),this.hud.setResults(this.state.stats,ba(this.state),Ea(this.state),this.state.seed,this.state.status==="cleared"))}applyOption(t){const e=this.options.snapshot;switch(t){case"masterVolume":this.audio.setMasterVolume(e.masterVolume);break;case"effectsVolume":this.audio.setEffectsVolume(e.effectsVolume);break;case"mouseSensitivity":this.input.setSensitivity(e.mouseSensitivity);break;case"touchSensitivity":this.touch.setSensitivity(e.touchSensitivity);break;case"invertY":this.input.setInvertY(e.invertY),this.touch.setInvertY(e.invertY);break;case"autoFire":this.touch.setAutoFire(e.autoFire);break;case"adaptive":this.adaptive.setEnabled(e.adaptive);break;case"quality":this.applyQualityChoice();break}this.settings.refresh()}applyQualityChoice(){const t=this.options.get("quality"),e=t==="auto"?jd():t;t!=="auto"&&this.options.get("adaptive")&&this.options.set("adaptive",!1),this.adaptive.setBase(Qd(e).pixelRatioCap)&&this.commitPixelRatioCap()}commitPixelRatioCap(){this.renderApp.setMaxPixelRatio(this.adaptive.pixelRatioCap),this.renderApp.resize()}reloadWithQuality(t){const e=new URLSearchParams(location.search);e.set("quality",t),e.set("seed",this.seed),e.set("adaptive",this.options.get("adaptive")?"1":"0"),location.search=e.toString()}openSettings(t){this.settingsReturn=t,this.settings.refresh(),this.setScreen("settings")}onMenuPointerDown=()=>{this.audio.unlock()};onOptionsClick=()=>{this.audio.unlock(),rr(this.audio),this.openSettings("title")};onOptionsPauseClick=()=>{this.audio.unlock(),rr(this.audio),this.openSettings("pause")};get menuButtons(){return[this.startButton,this.resumeButton,this.retryButton,this.newSeedButton,this.optionsButton,this.optionsPauseButton]}bindUi(){for(const t of this.menuButtons)t?.addEventListener("pointerdown",this.onMenuPointerDown);this.startButton?.addEventListener("click",this.onStartClick),this.resumeButton?.addEventListener("click",this.onResumeClick),this.retryButton?.addEventListener("click",this.onRetryClick),this.newSeedButton?.addEventListener("click",this.onNewSeedClick),this.optionsButton?.addEventListener("click",this.onOptionsClick),this.optionsPauseButton?.addEventListener("click",this.onOptionsPauseClick),this.pauseScreen?.addEventListener("click",this.onPauseScreenClick)}unbindUi(){for(const t of this.menuButtons)t?.removeEventListener("pointerdown",this.onMenuPointerDown);this.startButton?.removeEventListener("click",this.onStartClick),this.resumeButton?.removeEventListener("click",this.onResumeClick),this.retryButton?.removeEventListener("click",this.onRetryClick),this.newSeedButton?.removeEventListener("click",this.onNewSeedClick),this.optionsButton?.removeEventListener("click",this.onOptionsClick),this.optionsPauseButton?.removeEventListener("click",this.onOptionsPauseClick),this.pauseScreen?.removeEventListener("click",this.onPauseScreenClick)}step(t){const e=performance.now();hp(this.state,this.actions,t),this.touch.acknowledgeFireLatch(),this.stepMs+=performance.now()-e}renderFrame(t,e,n,s=!0){const r=performance.now(),a=this.stepMs;this.stepMs=0,this.elapsed+=n,this.handleInputEdges();const o=this.state,l=this.actions.yaw,c=this.actions.pitch,h=l-this.prevYaw,u=c-this.prevPitch;if(this.prevYaw=l,this.prevPitch=c,this.cameraController.update(o.player,l,c,t,n),this.renderApp.setShadowFocus(o.player.x,o.player.z),this.renderApp.setFixtureFocus(o.player.x,o.player.z),this.audio.beginFrame(),this.audio.setListener(o.player.x,o.player.z,l),this.enemyView.update(o.enemies,t),this.drainEvents(),this.projectileView.update(o.projectiles,t,this.elapsed),this.splatView.update(n),this.burstView.update(n,this.elapsed),this.impactView.update(n),this.weaponView.update(n,h,u,Math.hypot(o.player.vx,o.player.vz),this.elapsed),this.hud.update(n),this.hud.setCooling(o.player.fireCooldown>0),this.hud.setCaptureHint(this.needsCaptureHint),this.minimap.draw(o.player.x,o.player.z,l,o.activeRoomId,n),this.viewportAge+=n,this.viewportAge>=TE&&(this.viewportAge=0,this.applyViewportChange()),this.debugAge+=n,this.hud.isDebugVisible&&this.debugAge>=fa){this.debugAge=0;const f=o.engagedRoomId>=0?o.runtime[o.engagedRoomId]:void 0;this.hud.setDebug({seed:o.seed,quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveSteps:this.adaptive.downgrades,frame:this.stats.report(),drawCalls:this.renderApp.drawCalls,triangles:this.renderApp.triangles,programs:this.renderApp.programCount,geometries:this.renderApp.geometryCount,textures:this.renderApp.textureCount,meshes:this.worldView.meshCount,lights:this.renderApp.lightCount,fixtures:this.renderApp.fixtureCount,rooms:o.rooms.length,roomArchetype:o.rooms[o.activeRoomId]?.archetype??"—",roomEscalation:o.rooms[o.activeRoomId]?.escalation??0,sectors:Ea(o),brushes:o.brushes.length,sectorsCleared:ba(o),threatTotal:o.plan.report.threatTotal,requiredThreat:o.plan.report.requiredThreat,threatSpent:f?f.threatSpent:0,threatBudget:f?o.rooms[f.id].encounter.budget:0,enemies:o.enemies.length,projectiles:o.projectiles.length,decals:this.splatView.decalCount,decalBudget:this.quality.decalCapacity,droplets:this.burstView.dropletCount,score:o.stats.score,genMs:this.genMs,prewarmMs:this.prewarmMs,attempts:o.plan.report.attempts,fallback:o.plan.report.fallback})}if(this.debugMap.isVisible){this.mapEnemies.length=0;for(const f of o.enemies)this.mapEnemies.push({x:f.x,z:f.z});this.debugMap.draw({playerX:o.player.x,playerZ:o.player.z,playerYaw:l,activeRoomId:o.activeRoomId,engagedRoomId:o.engagedRoomId,cleared:this.clearedRooms,enemies:this.mapEnemies})}if(this.renderApp.render(),!s){this.stats.syncPrograms(this.renderApp.programCount);return}const d=this.frameContext;d.enemies=o.enemies.length,d.projectiles=o.projectiles.length,d.decals=this.splatView.decalCount,d.droplets=this.burstView.dropletCount,d.drawCalls=this.renderApp.drawCalls,d.triangles=this.renderApp.triangles,d.programs=this.renderApp.programCount,this.stats.addFrame(e,a,performance.now()-r,d),this.adaptive.consider({runActive:this.screen==="none",visible:!document.hidden,timerScheduled:this.loop.usesTimerFallback,samples:this.stats.sampleCount,breaches:this.stats.windowBreaches})&&this.commitPixelRatioCap()}handleInputEdges(){if(this.input.consumeDebugToggle()){const n=this.hud.toggleDebug();this.debugMap.setVisible(n),n&&(this.debugAge=fa)}this.input.consumeMuteToggle()&&this.audio.toggleMuted(),this.input.consumeRestart()&&(this.screen==="over"?this.restart(!1):this.screen!=="title"&&this.screen!=="settings"&&this.restart(!0));const t=this.input.consumePause(),e=this.touch.consumePause();(t||e)&&(this.screen==="none"?this.setScreen("pause"):this.screen==="pause"?this.setScreen("none"):this.screen==="settings"&&this.setScreen(this.settingsReturn))}drainEvents(){const t=this.state.events;for(let e=0;e<t.length;e++){const n=t[e];switch(n.type){case"shot":{this.weaponView.writeMuzzleWorld(this.renderApp.camera,this.renderApp.viewCamera,this.muzzleWorld);const s=$f(this.state,n.x,n.y,n.z,n.dx,n.dy,n.dz,Gy);this.projectileView.beginShot(n.id,this.muzzleWorld.x,this.muzzleWorld.y,this.muzzleWorld.z,s),this.weaponView.kick(),this.cameraController.addShake(.16),pE(this.audio),mE(this.audio,As.cooldown);break}case"impactWorld":LS(this.state.index,n,this.impactSurface),this.impactView.spawn(this.impactSurface.x,this.impactSurface.y,this.impactSurface.z,this.impactSurface.nx,this.impactSurface.ny,this.impactSurface.nz),gE(this.audio,n.x,n.z);break;case"enemyHurt":this.hud.flashHit(),vE(this.audio,n.x,n.z);break;case"enemyStep":xE(this.audio,n.x,n.z,n.scale);break;case"enemyWindUp":qo(this.audio,n.x,n.z);break;case"anchorRising":n.kind==="containmentMachine"?this.hud.setStatus("Production line — active","The facility is making more specimens","alert"):this.hud.setStatus("Primary containment — open","Something is coming up through the floor","alert"),this.cameraController.addShake(.34),qo(this.audio,n.x,n.z);break;case"broodReleased":this.cameraController.addShake(.06),qo(this.audio,n.x,n.z);break;case"enemyKilled":this.hud.flashHit(),this.cameraController.addShake(.08),_E(this.audio,n.x,n.z,Kl.implodeTime);break;case"enemyBurst":this.splatView.splat(n.x,n.y,n.z,n.scale,n.dirX,n.dirZ),this.burstView.burst(n.x,n.y,n.z,n.scale,n.dirX,n.dirZ),this.cameraController.addShake(.22),ME(this.audio,n.x,n.z,n.scale),yE(this.audio,n.x,n.z);break;case"scored":this.hud.flashScore(n.amount,n.chain);break;case"roomEntered":this.minimap.discover(n.room),this.audio.setEscalation(n.escalation),this.hud.setStatus(n.name,n.final?"Primary containment — secure it to end the run":n.hostile?"Containment breach detected":"Sector secure",n.hostile?"alert":"secure");break;case"roomCleared":this.clearedRooms[n.room]=!0,this.hud.setIntegrity(n.hp,ce.maxHp),this.hud.setStatus(n.required?"Sector secure":"Optional sector secure",n.heal>0?`${n.cleared} of ${n.total} required sectors held — integrity +${n.heal}`:`${n.cleared} of ${n.total} required sectors held`,"secure"),Yo(this.audio);break;case"waveStarted":this.hud.setStatus(`Wave ${n.wave} of ${n.waveCount}`,`${n.count} specimen${n.count===1?"":"s"} inbound`,"alert"),bE(this.audio);break;case"waveCleared":this.hud.setStatus("Wave clear",`${n.waveCount-n.wave} remaining`),Yo(this.audio);break;case"runCleared":Yo(this.audio),this.setScreen("over");break;case"playerHurt":this.hud.setIntegrity(n.hp,ce.maxHp),this.hud.flashDamage(),this.cameraController.addShake(.5),SE(this.audio);break;case"playerDied":EE(this.audio),this.setScreen("over");break}}t.length=0}advance(t){for(let e=0;e<t;e++)this.step(ki);this.renderFrame(0,ki*1e3,ki,!1)}get buildPlan(){return this.state.plan}setActions(t){Object.assign(this.actions,t)}setOption(t,e){return this.options.set(t,e)}optionValues(){return{...this.options.snapshot}}profileBegin(){this.stats.reset()}profile(){return{...this.stats.performance(),quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveEnabled:this.adaptive.enabled,adaptiveDowngrades:this.adaptive.downgrades,genMs:+this.genMs.toFixed(2),prewarmMs:+this.prewarmMs.toFixed(2),...this.resources()}}resources(){return{geometries:this.renderApp.geometryCount,textures:this.renderApp.textureCount,programs:this.renderApp.programCount,worldMeshes:this.worldView.meshCount,lights:this.renderApp.lightCount,pointLights:this.renderApp.pointLightCount}}snapshot(){const t=this.state,e=t.engagedRoomId>=0?t.runtime[t.engagedRoomId]:void 0;return{seed:t.seed,tick:t.tick,status:t.status,screen:this.screen,rooms:t.rooms.length,discoveredRooms:this.minimap.discoveredCount,activeRoom:t.activeRoomId,engagedRoom:t.engagedRoomId,roomsCleared:t.stats.roomsCleared,wave:e?e.wave:0,waveCount:e?e.waveCount:0,pendingArrivals:e?e.roster.length:0,threatSpent:e?e.threatSpent:0,threatBudget:e?t.rooms[e.id].encounter.budget:0,runThreat:t.plan.report.requiredThreat,facilityThreat:t.plan.report.threatTotal,enemies:t.enemies.length,projectiles:t.projectiles.length,decals:this.splatView.decalCount,settledDecals:this.splatView.settledDecalCount,droplets:this.burstView.dropletCount,impacts:this.impactView.liveCount,impactCapacity:this.impactView.poolCapacity,hp:t.player.hp,player:{x:+t.player.x.toFixed(3),z:+t.player.z.toFixed(3)},specimens:t.enemies.map(n=>({x:+n.x.toFixed(2),z:+n.z.toFixed(2),state:n.state,variant:n.variant})),aim:{yaw:+this.actions.yaw.toFixed(4),pitch:+this.actions.pitch.toFixed(4)},pointerLocked:this.input.isLocked,touch:{active:this.touchLayer.isActive,...this.touch.state()},stats:t.stats,quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveDowngrades:this.adaptive.downgrades,options:{...this.options.snapshot},audio:{ready:this.audio.ready,muted:this.audio.isMuted,master:this.audio.masterVolume,effects:this.audio.effectsVolume,escalation:this.audio.escalationLevel,alarm:this.audio.alarmGains()},drawCalls:this.renderApp.drawCalls,triangles:this.renderApp.triangles,frame:this.stats.report(),resources:this.resources(),generation:t.plan.report}}onResize=()=>{this.applyViewportChange(),this.resizeRecheck!==0&&window.cancelAnimationFrame(this.resizeRecheck),this.resizeRecheck=window.requestAnimationFrame(()=>{this.resizeRecheck=0,this.applyViewportChange()})};applyViewportChange(){this.renderApp.resize()&&this.touch.handleViewportChange()}get needsCaptureHint(){return this.input.needsCaptureHint&&!this.touchLayer.isActive}dispose(){window.removeEventListener("resize",this.onResize),window.removeEventListener("orientationchange",this.onResize),this.resizeRecheck!==0&&(window.cancelAnimationFrame(this.resizeRecheck),this.resizeRecheck=0),this.unbindUi(),this.settings.dispose(),this.options.onChange=null,this.loop.stop(),this.input.dispose(),this.touch.dispose(),this.touchLayer.dispose(),this.worldView.dispose(),this.enemyView.dispose(),this.projectileView.dispose(),this.splatView.dispose(),this.burstView.dispose(),this.impactView.dispose(),this.audio.dispose(),this.hud.dispose(),this.minimap.dispose(),this.weaponView.dispose(),this.debugMap.dispose(),this.labMaterials.dispose(),this.renderApp.dispose()}}const uf=document.getElementById("view");if(!uf)throw new Error("Canvas #view is missing from index.html");try{const i=new RE(uf);window.game=i}catch(i){console.error("[clawd-pop-3d] failed to start",i);const t=document.getElementById("screen-title");t&&(t.innerHTML='<div><div class="result-title">WebGL unavailable</div><div class="hint">This game needs a browser with WebGL2 enabled.</div></div>')}
