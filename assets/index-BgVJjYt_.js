(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Ed=60,Ai=1/Ed,mc=5,rt={radius:.4,height:1.8,eyeHeight:1.7,walkSpeed:5,sprintSpeed:7.6,accel:62,friction:13,maxHp:100,roomClearHeal:25,hurtCooldown:.6,pitchLimit:Math.PI/2-.02},ds={cooldown:.42,inputBuffer:.16,spawnForward:.6},rn={speed:46,radius:.3,damage:100,lifetime:3,maxStepDistance:.5},_s={walker:{name:"walker",scale:1,hp:100,radius:.55,height:1.45,speed:2.7,turnRate:6,damage:12,threatCost:1},runner:{name:"runner",scale:.75,hp:60,radius:.42,height:1.09,speed:4.3,turnRate:9,damage:8,threatCost:1}},Yn={range:2,windUpTime:.45,lungeTime:.22,lungeSpeed:9.5,recoverTime:.65,contactPad:.12},Il={implodeTime:.15},Co={separationRadius:1.35,separationStrength:9,speedJitter:.16},Zn={progressThreshold:.35,trigger:.35,duration:1.1,directBlend:.3,detoursBeforeEscape:2,escapeProbeDistance:7,escapeDuration:2.6,progressResetDistance:.7},on={maxAlive:16,engageDelay:1.4,waveDelay:1.6,clearDelay:1.6,minSpawnDistance:6,spawnStagger:.35,staggerDepthScale:.045,staggerFloor:.18,firstWaveArc:140*Math.PI/180,entrySpeed:3.8},Ro={hz:8,losInterval:.2,directRange:16},di={killBase:{walker:100,runner:150},chainWindow:2,chainStep:.35,chainMax:8,wavePerWave:250,roomClear:400,runComplete:2500},La=Math.PI*2;function On(i,e,t){return i<e?e:i>t?t:i}function wd(i,e,t){return i+(e-i)*t}function uu(i,e){let t=(e-i)%La;return t>Math.PI&&(t-=La),t<-Math.PI&&(t+=La),t}function fs(i,e,t,n){return wd(i,e,1-Math.exp(-t*n))}function Ll(i){return-Math.sin(i)}function Dl(i){return-Math.cos(i)}function Td(i){return Math.cos(i)}function Ad(i){return-Math.sin(i)}function du(i,e,t,n){const s=t-i,r=n-e;return Math.sqrt(s*s+r*r)}const Qr=1e-9,Kt={t:1,nx:0,ny:0,nz:0};function js(i,e,t,n,s,r,a,o,l){const c=a.minX-o,h=a.maxX+o,d=a.minY-o,u=a.maxY+o,f=a.minZ-o,m=a.maxZ+o;let v=0,g=1,p=-1,y=0;if(Math.abs(n)<Qr){if(i<c||i>h)return-1}else{const w=1/n;let M=(c-i)*w,b=(h-i)*w,E=-1;if(M>b){const C=M;M=b,b=C,E=1}if(M>v&&(v=M,p=0,y=E),b<g&&(g=b),v>g)return-1}if(Math.abs(s)<Qr){if(e<d||e>u)return-1}else{const w=1/s;let M=(d-e)*w,b=(u-e)*w,E=-1;if(M>b){const C=M;M=b,b=C,E=1}if(M>v&&(v=M,p=1,y=E),b<g&&(g=b),v>g)return-1}if(Math.abs(r)<Qr){if(t<f||t>m)return-1}else{const w=1/r;let M=(f-t)*w,b=(m-t)*w,E=-1;if(M>b){const C=M;M=b,b=C,E=1}if(M>v&&(v=M,p=2,y=E),b<g&&(g=b),v>g)return-1}if(v>1||g<0)return-1;if(l.t=v,l.nx=p===0?y:0,l.ny=p===1?y:0,l.nz=p===2?y:0,p===-1){const w=Math.hypot(n,s,r)||1;l.nx=-n/w,l.ny=-s/w,l.nz=-r/w}return v}function Cd(i,e,t){return i<t.maxY&&i+e>t.minY}function fu(i,e,t,n,s=3){let r=!1;for(let a=0;a<s;a++){let o=!1;for(let l=0;l<n.length;l++){const c=n[l];if(!Cd(i.y,t,c))continue;const h=On(i.x,c.minX,c.maxX),d=On(i.z,c.minZ,c.maxZ),u=i.x-h,f=i.z-d,m=u*u+f*f;if(!(m>=e*e)){if(m>Qr){const v=Math.sqrt(m),g=e-v;i.x+=u/v*g,i.z+=f/v*g}else{const v=i.x-c.minX,g=c.maxX-i.x,p=i.z-c.minZ,y=c.maxZ-i.z,w=Math.min(v,g,p,y);w===v?i.x=c.minX-e:w===g?i.x=c.maxX+e:w===p?i.z=c.minZ-e:i.z=c.maxZ+e}o=!0,r=!0}}if(!o)break}return r}function Rd(i,e,t,n,s,r,a){const o=n-i,l=s-e,c=r-t;for(let h=0;h<a.length;h++){const d=a[h];if(!(d.kind==="floor"||d.kind==="ceiling")&&js(i,e,t,o,l,c,d,0,Kt)>=0)return!1}return!0}const Pd=256;function Xt(i,e){i.length>=Pd||i.push(e)}const gc=[];function Id(i,e,t){const n=i.player;n.prevX=n.x,n.prevZ=n.z,n.hurtCooldown>0&&(n.hurtCooldown=Math.max(0,n.hurtCooldown-t));let s=On(e.moveX,-1,1),r=On(e.moveZ,-1,1);const a=Math.hypot(s,r);a>1&&(s/=a,r/=a);const o=e.sprint?rt.sprintSpeed:rt.walkSpeed,l=Ll(n.yaw),c=Dl(n.yaw),h=Td(n.yaw),d=Ad(n.yaw),u=(l*r+h*s)*o,f=(c*r+d*s)*o;if(a>.001)n.vx+=(u-n.vx)*Math.min(1,rt.accel*t),n.vz+=(f-n.vz)*Math.min(1,rt.accel*t);else{const v=Math.max(0,1-rt.friction*t);n.vx*=v,n.vz*=v}n.x+=n.vx*t,n.z+=n.vz*t,n.y=i.floorY;const m=rt.radius;i.index.query(Math.min(n.prevX,n.x)-m,Math.min(n.prevZ,n.z)-m,Math.max(n.prevX,n.x)+m,Math.max(n.prevZ,n.z)+m,gc),fu(n,rt.radius,rt.height,gc)}function Ld(i,e,t){const n=i.player;if(n.fireCooldown>0&&(n.fireCooldown=Math.max(0,n.fireCooldown-t)),e.firePressed&&(e.firePressed=!1,n.fireBuffer=ds.inputBuffer),n.fireBuffer>0&&(n.fireBuffer=Math.max(0,n.fireBuffer-t)),!(e.firePrimary||n.fireBuffer>0)||n.fireCooldown>0||!n.alive)return;n.fireBuffer=0,n.fireCooldown=ds.cooldown,i.stats.shots+=1;const r=Math.cos(n.pitch),a=Ll(n.yaw)*r,o=Math.sin(n.pitch),l=Dl(n.yaw)*r,c=n.y+rt.eyeHeight,h=n.x+a*ds.spawnForward,d=c+o*ds.spawnForward,u=n.z+l*ds.spawnForward,f=i.nextId++;i.projectiles.push({id:f,x:h,y:d,z:u,prevX:h,prevY:d,prevZ:u,vx:a*rn.speed,vy:o*rn.speed,vz:l*rn.speed,life:rn.lifetime,alive:!0}),Xt(i.events,{type:"shot",id:f,x:h,y:d,z:u,dx:a,dy:o,dz:l})}const Dd=.5,Nd=.5;function Fd(i,e){let t=Number.POSITIVE_INFINITY,n=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY;for(const f of i)for(const m of f.brushes)m.minX<t&&(t=m.minX),m.minZ<n&&(n=m.minZ),m.maxX>s&&(s=m.maxX),m.maxZ>r&&(r=m.maxZ);const a=Dd,o=Math.floor(t/a)*a,l=Math.floor(n/a)*a,c=Math.max(1,Math.ceil((s-o)/a)),h=Math.max(1,Math.ceil((r-l)/a)),d=new Uint8Array(c*h),u={cell:a,minX:o,minZ:l,cols:c,rows:h,walkable:d};for(const f of i)for(const m of f.brushes)m.kind==="floor"&&vc(u,m.minX,m.minZ,m.maxX,m.maxZ,0,v=>{d[v]=1});for(const f of i)for(const m of f.brushes)m.kind==="floor"||m.kind==="ceiling"||m.maxY<=.05||m.minY>=e.height||vc(u,m.minX,m.minZ,m.maxX,m.maxZ,e.radius,v=>{d[v]=0});return u}function vc(i,e,t,n,s,r,a){const o=xc(i.minX,i.cell,i.cols,e-r,n+r),l=xc(i.minZ,i.cell,i.rows,t-r,s+r);for(let c=l.lo;c<=l.hi;c++){const h=c*i.cols;for(let d=o.lo;d<=o.hi;d++)a(h+d)}}function xc(i,e,t,n,s){const r=Math.max(0,Math.ceil((n-i)/e-.5)),a=Math.min(t-1,Math.floor((s-i)/e-.5));return{lo:r,hi:a}}function Ud(i,e,t){const n=Math.floor((e-i.minX)/i.cell),s=Math.floor((t-i.minZ)/i.cell);return n<0||s<0||n>=i.cols||s>=i.rows?-1:s*i.cols+n}function ra(i,e,t,n=6){const s=Math.floor((e-i.minX)/i.cell),r=Math.floor((t-i.minZ)/i.cell);for(let a=0;a<=n;a++)for(let o=-a;o<=a;o++)for(let l=-a;l<=a;l++){if(a>0&&Math.abs(l)!==a&&Math.abs(o)!==a)continue;const c=s+l,h=r+o;if(c<0||h<0||c>=i.cols||h>=i.rows)continue;const d=h*i.cols+c;if(i.walkable[d])return d}return-1}function Od(i,e,t){if(t.fill(0),e<0||!i.walkable[e])return 0;const n=[e];t[e]=1;let s=1;for(;n.length>0;){const r=n.pop(),a=r%i.cols,o=(r-a)/i.cols;for(let l=-1;l<=1;l++){const c=o+l;if(!(c<0||c>=i.rows))for(let h=-1;h<=1;h++){if(h===0&&l===0)continue;const d=a+h;if(d<0||d>=i.cols)continue;const u=c*i.cols+d;t[u]||!Nl(i,a,o,d,c)||(t[u]=1,s++,n.push(u))}}}return s}function Nl(i,e,t,n,s){if(e<0||t<0||e>=i.cols||t>=i.rows||n<0||s<0||n>=i.cols||s>=i.rows||!i.walkable[t*i.cols+e]||!i.walkable[s*i.cols+n])return!1;const r=n-e,a=s-t;return Math.abs(r)>1||Math.abs(a)>1||r===0&&a===0?!1:r===0||a===0?!0:!!(i.walkable[t*i.cols+n]&&i.walkable[s*i.cols+e])}function Bd(i){let e=0;for(let t=0;t<i.walkable.length;t++)e+=i.walkable[t];return e}const aa=-1;function kd(i){const e=i.cols*i.rows;return{grid:i,dist:new Int32Array(e).fill(aa),queue:new Int32Array(e),goalCell:-1,timer:0}}function pu(i,e,t,n){i.timer-=n;const s=ra(i.grid,e,t);return s<0||s===i.goalCell&&i.timer>0?!1:(i.timer=1/Ro.hz,zd(i,s),!0)}function zd(i,e){const{grid:t,dist:n,queue:s}=i,{cols:r,rows:a}=t;n.fill(aa),i.goalCell=e,n[e]=0,s[0]=e;let o=0,l=1;for(;o<l;){const c=s[o++],h=n[c]+1,d=c%r,u=(c-d)/r;for(let f=-1;f<=1;f++){const m=u+f;if(!(m<0||m>=a))for(let v=-1;v<=1;v++){if(v===0&&f===0)continue;const g=d+v;if(g<0||g>=r)continue;const p=m*r+g;n[p]!==aa||!Nl(t,d,u,g,m)||(n[p]=h,s[l++]=p)}}}}function Vd(i,e,t,n){const{grid:s,dist:r}=i,{cols:a,rows:o,cell:l}=s,c=ra(s,e,t,3);if(c<0)return!1;const h=r[c];if(h<=0)return!1;const d=c%a,u=(c-d)/a;let f=h,m=0,v=0,g=!1;for(let E=-1;E<=1;E++){const C=u+E;if(!(C<0||C>=o))for(let _=-1;_<=1;_++){if(_===0&&E===0)continue;const T=d+_;if(T<0||T>=a||!Nl(s,d,u,T,C))continue;const P=r[C*a+T];P===aa||P>=f||(f=P,m=T,v=C,g=!0)}}if(!g)return!1;const p=s.minX+(m+.5)*l,y=s.minZ+(v+.5)*l,w=p-e,M=y-t,b=Math.hypot(w,M);return b<1e-5?!1:(n.x=w/b,n.z=M/b,!0)}function Gd(i,e,t,n=0,s=0){return!e.alive||e.hp<=0?!1:(e.hp-=t,e.hurtTime=.18,i.stats.hits+=1,e.hp<=0?(e.hp=0,e.state="dying",e.stateTime=0,e.vx=0,e.vz=0,e.deathDirX=n,e.deathDirZ=s,i.stats.kills+=1,Xt(i.events,{type:"enemyKilled",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale,dirX:n,dirZ:s}),uf(i,e.variant)):Xt(i.events,{type:"enemyHurt",id:e.id,x:e.x,y:e.y,z:e.z}),!0)}function Hd(i,e){const t=i.player;return!t.alive||t.hurtCooldown>0?!1:(t.hp=Math.max(0,t.hp-e),t.hurtCooldown=rt.hurtCooldown,i.stats.damageTaken+=e,Xt(i.events,{type:"playerHurt",amount:e,hp:t.hp}),!0)}const _c=[],Mc=[],yc=[],Da={x:0,z:0};function Wd(i,e){const t=i.enemies;for(let n=0;n<t.length;n++){const s=t[n];s.alive&&(s.prevX=s.x,s.prevZ=s.z,s.prevYaw=s.yaw,s.stateTime+=e,s.hurtTime>0&&(s.hurtTime=Math.max(0,s.hurtTime-e)),Xd(i,s,e))}Yd(t,e);for(let n=0;n<t.length;n++){const s=t[n];if(!s.alive)continue;s.x+=s.vx*e,s.z+=s.vz*e,s.y=i.floorY;const r=s.def.radius;i.index.query(Math.min(s.prevX,s.x)-r,Math.min(s.prevZ,s.z)-r,Math.max(s.prevX,s.x)+r,Math.max(s.prevZ,s.z)+r,_c),fu(s,r,s.def.height,_c),s.movedLast=du(s.prevX,s.prevZ,s.x,s.z),s.gaitPhase+=s.movedLast*2.6}}function Xd(i,e,t){const n=i.player,s=n.x-e.x,r=n.z-e.z,a=Math.hypot(s,r),o=e.def.radius+rt.radius+Yn.contactPad;switch(e.state){case"dying":{e.vx=0,e.vz=0,e.stateTime>=Il.implodeTime&&(e.alive=!1,Xt(i.events,{type:"enemyBurst",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale,dirX:e.deathDirX,dirZ:e.deathDirZ}));break}case"entering":{const l=e.entryX-e.x,c=e.entryZ-e.z,h=Math.hypot(l,c);if(h<=.12){e.x=e.entryX,e.z=e.entryZ,e.vx=0,e.vz=0,Ps(e,"approach");break}const d=1/h;Is(e,l,c,t),e.vx=l*d*on.entrySpeed,e.vz=c*d*on.entrySpeed;break}case"approach":{if(a<=Yn.range+e.def.radius&&n.alive){Ps(e,"windUp"),e.vx=0,e.vz=0,Is(e,s,r,t),Xt(i.events,{type:"enemyWindUp",id:e.id,x:e.x,y:e.y,z:e.z});break}const l=e.def.speed*e.speedScale,c=a>1e-4?1/a:0;let h=s*c,d=r*c;e.losTimer-=t,e.losTimer<=0&&(e.losTimer=Ro.losInterval,e.hasSight=a<=Ro.directRange&&qd(i,e)),!e.hasSight&&Vd(i.nav,e.x,e.z,Da)&&(h=Da.x,d=Da.z),Is(e,h,d,t),a<e.unstickBestDistance-Zn.progressResetDistance&&(e.unstickBestDistance=a,e.detourAttempts=0);const f=e.movedLast/Math.max(1e-4,l*t)<Zn.progressThreshold;if(e.escapeTime>0)e.escapeTime=Math.max(0,e.escapeTime-t),Is(e,e.escapeDirX,e.escapeDirZ,t),e.vx=e.escapeDirX*l,e.vz=e.escapeDirZ*l;else if(e.detourTime>0)e.detourTime=Math.max(0,e.detourTime-t),e.stuckTime=f?e.stuckTime+t:0,e.vx=(h*Zn.directBlend-d*e.detourSide)*l,e.vz=(d*Zn.directBlend+h*e.detourSide)*l;else if(f){if(e.stuckTime+=t,e.stuckTime>=Zn.trigger)if(e.stuckTime=0,e.detourAttempts+=1,e.detourAttempts>=Zn.detoursBeforeEscape){const m=Zd(i,e,h,d);e.escapeDirX=m.x,e.escapeDirZ=m.z,e.escapeTime=Zn.escapeDuration,e.detourTime=0}else e.detourSide=-e.detourSide,e.detourTime=Zn.duration;e.vx=h*l,e.vz=d*l}else e.stuckTime=0,e.vx=h*l,e.vz=d*l;break}case"windUp":{if(e.vx=0,e.vz=0,Is(e,s,r,t),e.stateTime>=Yn.windUpTime){const l=a>1e-4?1/a:0;e.lungeDirX=s*l,e.lungeDirZ=r*l,e.lungeConnected=!1,Ps(e,"lunge"),Xt(i.events,{type:"enemyLunge",id:e.id,x:e.x,y:e.y,z:e.z})}break}case"lunge":{e.vx=e.lungeDirX*Yn.lungeSpeed,e.vz=e.lungeDirZ*Yn.lungeSpeed,!e.lungeConnected&&a<=o&&n.alive&&Hd(i,e.def.damage)&&(e.lungeConnected=!0),e.stateTime>=Yn.lungeTime&&Ps(e,"recover");break}case"recover":{const l=Math.max(0,1-9*t);e.vx*=l,e.vz*=l,e.stateTime>=Yn.recoverTime&&Ps(e,"approach");break}}}function qd(i,e){const t=i.player,n=e.y+e.def.height*.6,s=t.y+rt.eyeHeight*.6;return i.index.query(Math.min(e.x,t.x)-.1,Math.min(e.z,t.z)-.1,Math.max(e.x,t.x)+.1,Math.max(e.z,t.z)+.1,Mc),Rd(e.x,n,e.z,t.x,s,t.z,Mc)}function Zd(i,e,t,n){const s=Math.atan2(-n,-t),r=[0,Math.PI/4,-Math.PI/4,Math.PI/2,-Math.PI/2,Math.PI],a=Zn.escapeProbeDistance;let o=-t,l=-n,c=-1;i.index.query(e.x-a,e.z-a,e.x+a,e.z+a,yc);for(const h of r){const d=s+h,u=Math.cos(d),f=Math.sin(d);let m=a;for(const v of yc){if(v.kind==="floor"||v.kind==="ceiling")continue;const g=js(e.x,e.y+e.def.height*.5,e.z,u*a,0,f*a,v,e.def.radius,Kt);g>=0&&(m=Math.min(m,g*a))}m>c&&(c=m,o=u,l=f)}return{x:o,z:l}}function Ps(i,e){i.state=e,i.stateTime=0}function Is(i,e,t,n){if(Math.abs(e)<1e-5&&Math.abs(t)<1e-5)return;const s=Math.atan2(-e,-t);i.yaw+=uu(i.yaw,s)*Math.min(1,i.def.turnRate*n)}function Yd(i,e){for(let t=0;t<i.length;t++){const n=i[t];if(!(!n.alive||n.state==="lunge"||n.state==="dying"))for(let s=t+1;s<i.length;s++){const r=i[s];if(!r.alive||r.state==="lunge"||r.state==="dying")continue;const a=r.x-n.x,o=r.z-n.z,l=a*a+o*o,c=Co.separationRadius*(n.def.scale+r.def.scale)*.5;if(l>=c*c||l<1e-8)continue;const h=Math.sqrt(l),d=(1-h/c)*Co.separationStrength*e,u=a/h,f=o/h;n.vx-=u*d,n.vz-=f*d,r.vx+=u*d,r.vz+=f*d}}}const vi={minX:0,minY:0,minZ:0,maxX:0,maxY:0,maxZ:0},Nt={t:1,nx:0,ny:0,nz:0},Na=[];function $d(i,e){for(let t=0;t<i.projectiles.length;t++){const n=i.projectiles[t];if(n.alive){if(n.life-=e,n.life<=0){n.alive=!1;continue}Kd(i,n,e)}}}function Kd(i,e,t){e.prevX=e.x,e.prevY=e.y,e.prevZ=e.z;const n=e.vx*t,s=e.vy*t,r=e.vz*t,a=Math.hypot(n,s,r),o=Math.max(1,Math.ceil(a/rn.maxStepDistance)),l=n/o,c=s/o,h=r/o;for(let d=0;d<o;d++){const u=e.x,f=e.y,m=e.z;Nt.t=Number.POSITIVE_INFINITY;let v=null;for(let p=0;p<i.enemies.length;p++){const y=i.enemies[p];if(!y.alive||y.state==="dying")continue;const w=y.def.radius;vi.minX=y.x-w,vi.maxX=y.x+w,vi.minY=y.y,vi.maxY=y.y+y.def.height,vi.minZ=y.z-w,vi.maxZ=y.z+w;const M=js(u,f,m,l,c,h,vi,rn.radius,Kt);M>=0&&M<Nt.t&&(Nt.t=M,Nt.nx=Kt.nx,Nt.ny=Kt.ny,Nt.nz=Kt.nz,v=y)}const g=rn.radius;i.index.query(Math.min(u,u+l)-g,Math.min(m,m+h)-g,Math.max(u,u+l)+g,Math.max(m,m+h)+g,Na);for(let p=0;p<Na.length;p++){const y=Na[p],w=js(u,f,m,l,c,h,y,rn.radius,Kt);w>=0&&w<Nt.t&&(Nt.t=w,Nt.nx=Kt.nx,Nt.ny=Kt.ny,Nt.nz=Kt.nz,v=null)}if(Number.isFinite(Nt.t)){const p=Nt.t;if(e.x=u+l*p,e.y=f+c*p,e.z=m+h*p,e.alive=!1,v){const y=Math.hypot(e.vx,e.vz);Gd(i,v,rn.damage,y>1e-4?e.vx/y:0,y>1e-4?e.vz/y:0)}else Xt(i.events,{type:"impactWorld",x:e.x,y:e.y,z:e.z,nx:Nt.nx,ny:Nt.ny,nz:Nt.nz});return}e.x=u+l,e.y=f+c,e.z=m+h}}const Jd=4;class Qd{all;cell;minX;minZ;cols;rows;starts;items;mark;stamp;constructor(e,t=Jd){this.all=e,this.cell=t,this.stamp=0;let n=Number.POSITIVE_INFINITY,s=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,a=Number.NEGATIVE_INFINITY;for(const h of e)h.minX<n&&(n=h.minX),h.minZ<s&&(s=h.minZ),h.maxX>r&&(r=h.maxX),h.maxZ>a&&(a=h.maxZ);Number.isFinite(n)||(n=0,s=0,r=t,a=t),this.minX=n,this.minZ=s,this.cols=Math.max(1,Math.ceil((r-n)/t)+1),this.rows=Math.max(1,Math.ceil((a-s)/t)+1);const o=this.cols*this.rows,l=new Int32Array(o+1);for(const h of e)this.forEachBucket(h.minX,h.minZ,h.maxX,h.maxZ,d=>{l[d+1]+=1});for(let h=0;h<o;h++)l[h+1]+=l[h];this.starts=l,this.items=new Int32Array(l[o]);const c=new Int32Array(o);for(let h=0;h<e.length;h++){const d=e[h];this.forEachBucket(d.minX,d.minZ,d.maxX,d.maxZ,u=>{this.items[this.starts[u]+c[u]]=h,c[u]+=1})}this.mark=new Int32Array(e.length)}query(e,t,n,s,r){this.stamp+=1;const a=this.stamp;let o=0;return this.forEachBucket(e,t,n,s,l=>{const c=this.starts[l+1];for(let h=this.starts[l];h<c;h++){const d=this.items[h];this.mark[d]!==a&&(this.mark[d]=a,r[o++]=this.all[d])}}),r.length=o,r}get bucketCount(){return this.cols*this.rows}forEachBucket(e,t,n,s,r){const a=Math.max(0,Math.min(this.cols-1,Math.floor((e-this.minX)/this.cell))),o=Math.max(0,Math.min(this.cols-1,Math.floor((n-this.minX)/this.cell))),l=Math.max(0,Math.min(this.rows-1,Math.floor((t-this.minZ)/this.cell))),c=Math.max(0,Math.min(this.rows-1,Math.floor((s-this.minZ)/this.cell)));for(let h=l;h<=c;h++){const d=h*this.cols;for(let u=a;u<=o;u++)r(d+u)}}}const Sc=Math.min(...Object.values(_s).map(i=>i.threatCost));function jd(i,e,t){const n=[];let s=Math.max(Sc,Math.round(i));for(;s>=Sc;){const r=t()<e,a=_s.runner,o=r&&a.threatCost<=s?a:_s.walker;n.push(o.name),s-=o.threatCost}return n}function ef(i,e){return e.z<i.minZ?0:e.x>i.maxX?1:e.z>i.maxZ?2:3}const zi={distance:1e3,variety:200,visible:120,laneChange:40,farthest:1,farthestClamp:30};function tf(i,e,t,n,s,r,a,o,l){if(e.length===0)return null;const c=(r%e.length+e.length)%e.length,h=on.firstWaveArc/2;let d=null,u=Number.NEGATIVE_INFINITY;for(let f=0;f<e.length;f++){const m=(c+f)%e.length,v=e[m],g=ef(i,v),p=du(v.entryX,v.entryZ,t,n),y=p>=on.minSpawnDistance;let w=y?zi.distance:0;g!==a&&(w+=zi.variety),m!==o&&(w+=zi.laneChange),l&&nf(t,n,s,v,h)&&(w+=zi.visible),w+=Math.min(p,zi.farthestClamp)*zi.farthest,w>u&&(u=w,d={spawn:v,index:m,source:g,fair:y})}return d}function nf(i,e,t,n,s){const r=n.entryX-i,a=n.entryZ-e;if(r===0&&a===0)return!0;const o=Math.atan2(Ll(t),Dl(t)),l=Math.atan2(r,a);return Math.abs(uu(o,l))<=s}function sf(i){const e=on.spawnStagger/(1+Math.max(0,i)*on.staggerDepthScale);return Math.max(on.staggerFloor,e)}function rf(i,e,t,n){if(e.roster.length>0){e.spawnTimer-=n,e.spawnTimer<=0&&i.enemies.length<on.maxAlive&&(lf(i,e,t),e.spawnTimer=sf(t.depth));return}if(i.enemies.length>0)return;if(e.wave>=e.waveCount){if(e.waveTimer-=n,e.waveTimer>0)return;af(i,e,t);return}if(e.waveTimer-=n,e.waveTimer>0)return;e.wave>0&&(i.stats.score+=di.wavePerWave*e.wave,Xt(i.events,{type:"waveCleared",wave:e.wave,waveCount:e.waveCount})),e.wave+=1;const s=Math.max(1,t.encounter.waveBudget[e.wave-1]??1),r=jd(s,t.encounter.runnerChance,i.rng);e.roster=r,e.threatSpent+=s,e.spawnTimer=0,e.spawnCursor=Math.floor(i.rng()*Math.max(1,t.enemySpawns.length)),e.lastSource=-1,e.lastLane=-1,e.waveTimer=e.wave>=e.waveCount?on.clearDelay:on.waveDelay,Xt(i.events,{type:"waveStarted",wave:e.wave,waveCount:e.waveCount,count:r.length,threat:s})}function af(i,e,t){e.state="cleared",i.engagedRoomId=-1,i.stats.roomsCleared+=1,i.stats.score+=di.wavePerWave*e.wave,i.stats.score+=di.roomClear*(1+t.depth);const n=Math.min(rt.roomClearHeal,rt.maxHp-i.player.hp);n>0&&(i.player.hp+=n,i.stats.integrityRestored+=n),Xt(i.events,{type:"roomCleared",room:t.id,name:t.name,required:Fl(t),cleared:la(i),total:oa(i),heal:n,hp:i.player.hp}),of(i)&&i.runtime[i.plan.finalRoomId].state==="cleared"&&(i.stats.score+=di.runComplete,i.status="cleared",Xt(i.events,{type:"runCleared",score:i.stats.score}))}function Fl(i){return i.critical&&i.encounter.budget>0}function oa(i){let e=0;for(const t of i.rooms)Fl(t)&&(e+=1);return e}function la(i){let e=0;for(const t of i.rooms)Fl(t)&&i.runtime[t.id].state==="cleared"&&(e+=1);return e}function of(i){return la(i)===oa(i)}function lf(i,e,t){const n=e.roster.shift();if(!n)return;const s=tf(t,t.enemySpawns,i.player.x,i.player.z,i.player.yaw,e.spawnCursor,e.lastSource,e.lastLane,e.wave===1);if(!s){e.roster.length=0;return}e.spawnCursor=(s.index+1)%t.enemySpawns.length,e.lastSource=s.source,e.lastLane=s.index;const r=_s[n],a=s.spawn;i.enemies.push({id:i.nextId++,variant:r.name,def:r,x:a.x,y:i.floorY,z:a.z,prevX:a.x,prevZ:a.z,vx:0,vz:0,yaw:a.yaw,prevYaw:a.yaw,hp:r.hp,state:"entering",stateTime:0,gaitPhase:i.rng()*Math.PI*2,movedLast:0,stuckTime:0,detourTime:0,detourSide:(i.nextId&1)===0?1:-1,detourAttempts:0,unstickBestDistance:Number.POSITIVE_INFINITY,escapeTime:0,escapeDirX:0,escapeDirZ:0,entryX:a.entryX,entryZ:a.entryZ,hasSight:!1,losTimer:i.nextId%12/60,speedScale:1+(i.rng()-.5)*2*Co.speedJitter,hurtTime:0,lungeDirX:0,lungeDirZ:0,lungeConnected:!1,deathDirX:0,deathDirZ:0,alive:!0})}function cf(i,e){const t=i.playerSpawn,n=[];for(const a of i.rooms)for(const o of a.brushes)n.push(o);const s=i.rooms.map(a=>({id:a.id,state:a.encounter.budget>0?"idle":"cleared",wave:0,waveCount:a.encounter.waveBudget.length,waveTimer:on.engageDelay,roster:[],spawnTimer:0,spawnCursor:0,lastSource:-1,lastLane:-1,threatSpent:0})),r={seed:i.seed,tick:0,time:0,status:"playing",plan:i,rooms:i.rooms,runtime:s,brushes:n,index:new Qd(n),nav:kd(i.nav),floorY:0,activeRoomId:i.startRoomId,engagedRoomId:-1,player:{x:t.x,y:0,z:t.z,prevX:t.x,prevZ:t.z,vx:0,vz:0,yaw:t.yaw,pitch:0,hp:rt.maxHp,fireCooldown:0,fireBuffer:0,hurtCooldown:0,alive:!0},enemies:[],projectiles:[],events:[],stats:{shots:0,hits:0,kills:0,damageTaken:0,timeAlive:0,score:0,bestChain:0,roomsCleared:0,integrityRestored:0},nextId:1,lastKillTime:Number.NEGATIVE_INFINITY,chain:0,rng:e};return pu(r.nav,t.x,t.z,1),r}function hf(i,e,t){for(const n of i.rooms)if(e>=n.minX&&e<=n.maxX&&t>=n.minZ&&t<=n.maxZ)return n.id;return-1}function uf(i,e){i.chain=i.time-i.lastKillTime<=di.chainWindow?i.chain+1:1,i.lastKillTime=i.time,i.chain>i.stats.bestChain&&(i.stats.bestChain=i.chain);const t=Math.min(di.chainMax,i.chain)-1,n=Math.round(di.killBase[e]*(1+t*di.chainStep));i.stats.score+=n,Xt(i.events,{type:"scored",amount:n,chain:i.chain,total:i.stats.score})}function df(i,e,t){i.status==="playing"&&(i.player.yaw=e.yaw,i.player.pitch=e.pitch,Id(i,e,t),Ld(i,e,t),pu(i.nav,i.player.x,i.player.z,t),Wd(i,t),$d(i,t),ff(i),i.stats.timeAlive+=t,i.player.hp<=0&&i.player.alive&&(i.player.alive=!1,i.status="dead",Xt(i.events,{type:"playerDied"})),i.status==="playing"&&pf(i,t)),i.tick+=1,i.time+=t}function ff(i){let e=0;for(let t=0;t<i.enemies.length;t++){const n=i.enemies[t];n.alive&&(i.enemies[e++]=n)}i.enemies.length=e,e=0;for(let t=0;t<i.projectiles.length;t++){const n=i.projectiles[t];n.alive&&(i.projectiles[e++]=n)}i.projectiles.length=e}function pf(i,e){const t=hf(i,i.player.x,i.player.z);if(t>=0&&t!==i.activeRoomId){i.activeRoomId=t;const n=i.rooms[t];Xt(i.events,{type:"roomEntered",room:t,name:n.name,depth:n.depth,hostile:i.runtime[t].state==="idle",final:t===i.plan.finalRoomId})}if(i.engagedRoomId<0){const n=i.runtime[i.activeRoomId];n&&n.state==="idle"&&(n.state="engaged",n.waveTimer=on.engageDelay,i.engagedRoomId=n.id);return}rf(i,i.runtime[i.engagedRoomId],i.rooms[i.engagedRoomId],e)}function mf(){return{moveX:0,moveZ:0,yaw:0,pitch:0,sprint:!1,firePrimary:!1,firePressed:!1,interact:!1}}function gf(i){i.moveX=0,i.moveZ=0,i.sprint=!1,i.firePrimary=!1,i.firePressed=!1,i.interact=!1}const mu=.0022,vf=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];class xf{actions;held=new Set;canvas;sensitivity;invertY;disposed=!1;captureEnabled=!1;hadLock=!1;dragging=!1;dragX=0;dragY=0;lockFailed=!1;fireHeld=!1;pausePressed=!1;restartPressed=!1;debugPressed=!1;mutePressed=!1;peer=null;onLockStateChange=null;onSuspend=null;constructor(e,t,n={}){this.canvas=e,this.actions=t,this.sensitivity=n.sensitivity??mu,this.invertY=n.invertY??!1,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVisibility),document.addEventListener("pointerlockchange",this.onPointerLock),document.addEventListener("pointerlockerror",this.onPointerLockError),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mouseup",this.onMouseUp)}setCaptureEnabled(e){this.captureEnabled=e,e||(this.dragging=!1,this.hadLock=!1)}get needsCaptureHint(){return this.captureEnabled&&!this.isLocked}get isLocked(){return document.pointerLockElement===this.canvas}requestLock(){if(this.isLocked)return;let e;try{e=this.canvas.requestPointerLock()}catch{this.markLockFailed();return}e&&typeof e.catch=="function"&&e.catch(()=>this.markLockFailed())}markLockFailed(){this.lockFailed=!0,this.onLockStateChange?.(!1,!0)}releaseLock(){this.isLocked&&document.exitPointerLock()}setSensitivity(e){this.sensitivity=e}setInvertY(e){this.invertY=e}consumePause(){const e=this.pausePressed;return this.pausePressed=!1,e}consumeRestart(){const e=this.restartPressed;return this.restartPressed=!1,e}consumeDebugToggle(){const e=this.debugPressed;return this.debugPressed=!1,e}consumeMuteToggle(){const e=this.mutePressed;return this.mutePressed=!1,e}release(){this.held.clear(),this.fireHeld=!1,gf(this.actions),this.peer&&this.peer.movementActive&&this.peer.writeMovement(),this.syncFire(),this.dragging=!1,this.dragX=0,this.dragY=0,this.pausePressed=!1,this.restartPressed=!1,this.debugPressed=!1,this.mutePressed=!1}dispose(){this.disposed||(this.disposed=!0,this.release(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVisibility),document.removeEventListener("pointerlockchange",this.onPointerLock),document.removeEventListener("pointerlockerror",this.onPointerLockError),document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mouseup",this.onMouseUp))}get movementActive(){for(const e of vf)if(this.held.has(e))return!0;return!1}get fireActive(){return this.fireHeld}writeMovement(){const e=this.actions,t=(this.held.has("KeyW")?1:0)+(this.held.has("ArrowUp")?1:0),n=(this.held.has("KeyS")?1:0)+(this.held.has("ArrowDown")?1:0),s=(this.held.has("KeyA")?1:0)+(this.held.has("ArrowLeft")?1:0),r=(this.held.has("KeyD")?1:0)+(this.held.has("ArrowRight")?1:0);e.moveZ=On(t-n,-1,1),e.moveX=On(r-s,-1,1),e.sprint=this.held.has("ShiftLeft")||this.held.has("ShiftRight")}syncMovement(){if(this.actions.interact=this.held.has("KeyE"),this.movementActive){this.writeMovement();return}const e=this.peer;if(e&&e.movementActive){e.writeMovement();return}this.writeMovement()}syncFire(){this.actions.firePrimary=this.fireHeld||!!this.peer?.fireActive}onKeyDown=e=>{if(!(e.repeat&&(e.code==="Escape"||e.code==="KeyR"||e.code==="F3"||e.code==="KeyM"))){switch(e.code){case"Escape":if(this.isLocked)return;this.pausePressed=!0;break;case"KeyR":this.restartPressed=!0;break;case"F3":this.debugPressed=!0,e.preventDefault();break;case"KeyM":this.mutePressed=!0;break}this.held.add(e.code),e.code==="Space"&&e.preventDefault(),this.syncMovement()}};onKeyUp=e=>{this.held.delete(e.code),this.syncMovement()};onBlur=()=>{this.release(),this.onSuspend?.()};onVisibility=()=>{document.hidden&&(this.release(),this.onSuspend?.())};onPointerLock=()=>{const e=this.isLocked;e?(this.hadLock=!0,this.lockFailed=!1):(this.hadLock&&this.release(),this.dragging=!1),this.onLockStateChange?.(e,this.lockFailed)};onPointerLockError=()=>{this.markLockFailed()};onMouseMove=e=>{if(!this.captureEnabled||!this.isLocked&&!this.dragging)return;const t=this.isLocked?e.movementX:e.clientX-this.dragX,n=this.isLocked?e.movementY:e.clientY-this.dragY;this.isLocked||(this.dragX=e.clientX,this.dragY=e.clientY);const s=this.actions;s.yaw-=t*this.sensitivity,s.pitch+=(this.invertY?n:-n)*this.sensitivity,s.pitch=On(s.pitch,-rt.pitchLimit,rt.pitchLimit)};onMouseDown=e=>{!this.captureEnabled||e.button!==0||(this.fireHeld=!0,this.syncFire(),this.actions.firePressed=!0,this.isLocked||(this.dragging=!0,this.dragX=e.clientX,this.dragY=e.clientY,this.requestLock()))};onMouseUp=e=>{e.button===0&&(this.fireHeld=!1,this.syncFire(),this.dragging=!1,this.dragX=0,this.dragY=0)}}const Ot={stickTravel:54,stickDeadzone:.16,lookSensitivity:.0042,portraitLookSensitivity:.0084,tapSlop:14,tapMaxSeconds:.3};class _f{actions;zones;now;isPortrait;sensitivity;portraitSensitivity;aimSensitivity;invertY;autoFire;disposed=!1;enabled=!1;movePointer=null;stickCx=0;stickCy=0;stickTravel=Ot.stickTravel;rawX=0;rawY=0;outX=0;outZ=0;aimPointer=null;aimX=0;aimY=0;aimDownAt=0;aimTravel=0;aimDragging=!1;pausePressed=!1;sprintOn=!1;latchedFire=!1;autoFireHeld=!1;peer=null;onStickChange=null;onSprintChange=null;constructor(e,t,n={}){this.zones=e,this.actions=t,this.sensitivity=n.sensitivity??Ot.lookSensitivity,this.portraitSensitivity=n.portraitSensitivity??this.sensitivity*(Ot.portraitLookSensitivity/Ot.lookSensitivity),this.aimSensitivity=this.sensitivity,this.invertY=n.invertY??!1,this.autoFire=n.autoFire??!1,this.now=n.now??(()=>performance.now()),this.isPortrait=n.isPortrait??(()=>window.innerHeight>window.innerWidth),e.stick.addEventListener("pointerdown",this.onStickDown),e.aim.addEventListener("pointerdown",this.onAimDown),e.pause.addEventListener("pointerdown",this.onPauseDown),e.sprint.addEventListener("pointerdown",this.onSprintDown),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerCancel),window.addEventListener("lostpointercapture",this.onPointerCancel),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVisibility)}setEnabled(e){this.enabled!==e&&(this.enabled=e,e||this.release())}get isEnabled(){return this.enabled}setSensitivity(e){this.sensitivity=e,this.portraitSensitivity=e*(Ot.portraitLookSensitivity/Ot.lookSensitivity)}setInvertY(e){this.invertY=e}setAutoFire(e){this.autoFire!==e&&(this.autoFire=e,e?this.aimPointer!==null&&this.holdAutoFire():this.releaseAutoFire())}holdAutoFire(){this.autoFireHeld||(this.autoFireHeld=!0,this.syncFire())}releaseAutoFire(){this.autoFireHeld&&(this.autoFireHeld=!1,this.syncFire())}syncFire(){this.actions.firePrimary=this.autoFireHeld||!!this.peer?.fireActive}consumePause(){const e=this.pausePressed;return this.pausePressed=!1,e}acknowledgeFireLatch(){this.actions.firePressed||(this.latchedFire=!1)}get movementActive(){return this.movePointer!==null}get fireActive(){return this.autoFireHeld}writeMovement(){this.actions.moveX=this.outX,this.actions.moveZ=this.outZ,this.actions.sprint=this.sprintOn}applyMovement(){if(this.movementActive){this.writeMovement();return}const e=this.peer;if(e&&e.movementActive){e.writeMovement();return}this.actions.moveX=0,this.actions.moveZ=0,this.actions.sprint=this.sprintOn}release(){this.movePointer=null,this.aimPointer=null,this.rawX=0,this.rawY=0,this.outX=0,this.outZ=0,this.aimTravel=0,this.aimDragging=!1,this.pausePressed=!1,this.sprintOn&&(this.sprintOn=!1,this.onSprintChange?.(!1)),this.latchedFire&&(this.actions.firePressed=!1,this.latchedFire=!1),this.releaseAutoFire(),this.applyMovement(),this.onStickChange?.(0,0,!1)}handleViewportChange(){this.stickCx=0,this.stickCy=0,this.stickTravel=Ot.stickTravel,this.release()}dispose(){this.disposed||(this.disposed=!0,this.release(),this.zones.stick.removeEventListener("pointerdown",this.onStickDown),this.zones.aim.removeEventListener("pointerdown",this.onAimDown),this.zones.pause.removeEventListener("pointerdown",this.onPauseDown),this.zones.sprint.removeEventListener("pointerdown",this.onSprintDown),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),window.removeEventListener("lostpointercapture",this.onPointerCancel),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVisibility))}state(){return{movePointer:this.movePointer,aimPointer:this.aimPointer,stickX:+this.rawX.toFixed(4),stickY:+this.rawY.toFixed(4),moveX:+this.outX.toFixed(4),moveZ:+this.outZ.toFixed(4),aiming:this.aimDragging,sprint:this.sprintOn,autoFire:this.autoFire,autoFiring:this.autoFireHeld}}stamp(e){return e.timeStamp>0?e.timeStamp:this.now()}owns(e){return this.enabled&&e.pointerType!=="mouse"}claim(e){e.cancelable&&e.preventDefault();const t=e.currentTarget;try{t?.setPointerCapture?.(e.pointerId)}catch{}}onStickDown=e=>{if(!this.owns(e)||this.movePointer!==null)return;this.claim(e),this.movePointer=e.pointerId;const t=this.zones.stick.getBoundingClientRect();this.stickCx=t.left+t.width/2,this.stickCy=t.top+t.height/2,this.stickTravel=t.width>0?t.width/2:Ot.stickTravel,this.updateStick(e.clientX,e.clientY)};onAimDown=e=>{!this.owns(e)||this.aimPointer!==null||(this.claim(e),this.aimPointer=e.pointerId,this.aimX=e.clientX,this.aimY=e.clientY,this.aimDownAt=this.stamp(e),this.aimTravel=0,this.aimDragging=!1,this.aimSensitivity=this.isPortrait()?this.portraitSensitivity:this.sensitivity,this.autoFire&&this.holdAutoFire())};onPauseDown=e=>{e.cancelable&&e.preventDefault(),this.pausePressed=!0};onSprintDown=e=>{this.enabled&&(e.cancelable&&e.preventDefault(),this.sprintOn=!this.sprintOn,this.onSprintChange?.(this.sprintOn),this.applyMovement())};onPointerMove=e=>{if(!this.enabled)return;if(e.pointerId===this.movePointer){this.updateStick(e.clientX,e.clientY);return}if(e.pointerId!==this.aimPointer)return;const t=e.clientX-this.aimX,n=e.clientY-this.aimY;this.aimX=e.clientX,this.aimY=e.clientY;const s=Math.hypot(t,n);this.aimTravel+=s;let r=1;if(!this.aimDragging){if(this.aimTravel<=Ot.tapSlop)return;this.aimDragging=!0,r=s>0?(this.aimTravel-Ot.tapSlop)/s:0}const a=this.actions;a.yaw-=t*r*this.aimSensitivity,a.pitch+=(this.invertY?n:-n)*r*this.aimSensitivity,a.pitch=On(a.pitch,-rt.pitchLimit,rt.pitchLimit)};onPointerUp=e=>{if(e.pointerId===this.movePointer){this.endStick();return}if(e.pointerId!==this.aimPointer)return;this.aimPointer=null,this.releaseAutoFire();const t=(this.stamp(e)-this.aimDownAt)/1e3,n=this.enabled&&!this.aimDragging&&this.aimTravel<=Ot.tapSlop&&t<=Ot.tapMaxSeconds;this.aimTravel=0,this.aimDragging=!1,n&&(this.autoFire||this.actions.firePressed||(this.actions.firePressed=!0,this.latchedFire=!0))};onPointerCancel=e=>{if(e.pointerId===this.movePointer){this.endStick();return}e.pointerId===this.aimPointer&&(this.aimPointer=null,this.releaseAutoFire(),this.aimTravel=0,this.aimDragging=!1)};onBlur=()=>{this.release()};onVisibility=()=>{document.hidden&&this.release()};updateStick(e,t){const n=Math.max(1,this.stickTravel);let s=(e-this.stickCx)/n,r=(t-this.stickCy)/n;const a=Math.hypot(s,r);a>1&&(s/=a,r/=a),this.rawX=s,this.rawY=r;const o=Math.min(1,a);if(o<=Ot.stickDeadzone)this.outX=0,this.outZ=0;else{const l=(o-Ot.stickDeadzone)/(1-Ot.stickDeadzone)/o;this.outX=s*l||0,this.outZ=-r*l||0}this.applyMovement(),this.onStickChange?.(this.rawX,this.rawY,!0)}endStick(){this.movePointer=null,this.rawX=0,this.rawY=0,this.outX=0,this.outZ=0,this.applyMovement(),this.onStickChange?.(0,0,!1)}}function Mf(i){let e=1779033703^i.length;for(let t=0;t<i.length;t++)e=Math.imul(e^i.charCodeAt(t),3432918353),e=e<<13|e>>>19;return function(){return e=Math.imul(e^e>>>16,2246822507),e=Math.imul(e^e>>>13,3266489909),e^=e>>>16,e>>>0}}function yf(i,e,t,n){return function(){i>>>=0,e>>>=0,t>>>=0,n>>>=0;let r=i+e|0;return i=e^e>>>9,e=t+(t<<3)|0,t=t<<21|t>>>11,n=n+1|0,r=r+n|0,t=t+r|0,(r>>>0)/4294967296}}function kt(i,e){const t=Mf(`${i}:${e}`),n=yf(t(),t(),t(),t());for(let s=0;s<12;s++)n();return n}function Ue(i,e,t){return e+(t-e)*i()}function Po(i,e,t){return e+Math.floor(i()*(t-e))}function gr(i,e){if(e.length===0)throw new Error("pick() called with an empty array");return e[Math.min(e.length-1,Math.floor(i()*e.length))]}const bc="abcdefghijklmnopqrstuvwxyz0123456789";function Sf(){let i="";for(let e=0;e<8;e++)i+=bc[Math.floor(Math.random()*bc.length)];return i}function Ec(i){const e=(i??"").trim().toLowerCase();return e.length>0?e.slice(0,32):Sf()}const Io=[16,26],Lo=[6,8],cr={entry:{key:"entry",width:[13,17],depth:[12,16],ceiling:[4.2,4.6],columns:[0,0],tanks:[1,2],crates:[2,4],consoles:[1,2],threatDensity:0,waves:[0,0],labels:["DECONTAMINATION","AIRLOCK","QUARANTINE ENTRY"]},corridor:{key:"corridor",width:Lo,depth:Io,ceiling:[3.8,4.2],columns:[0,0],tanks:[0,0],crates:[0,2],consoles:[0,2],threatDensity:0,waves:[0,0],labels:["SERVICE RUN","TRANSIT CORRIDOR","ACCESS SPUR"]},junction:{key:"junction",width:[11,14],depth:[11,14],ceiling:[4.4,5],columns:[1,1],tanks:[0,1],crates:[1,3],consoles:[1,2],threatDensity:0,waves:[0,0],labels:["SECTOR JUNCTION","CONTROL NODE","DISTRIBUTION HUB"]},lab:{key:"lab",width:[15,19],depth:[14,18],ceiling:[4,4.6],columns:[0,1],tanks:[2,3],crates:[3,6],consoles:[2,4],threatDensity:2.6,waves:[1,2],labels:["CULTURE VAULT","ASSAY LAB","SEQUENCING SUITE","INCUBATION BAY"]},containment:{key:"containment",width:[20,26],depth:[20,28],ceiling:[4.6,5.4],columns:[2,3],tanks:[3,5],crates:[3,6],consoles:[2,4],threatDensity:2.2,waves:[2,3],labels:["CONTAINMENT BAY","SPECIMEN HOLD","ISOLATION WARD","HOLDING PEN"]},chamber:{key:"chamber",width:[24,30],depth:[24,30],ceiling:[5.2,6],columns:[3,4],tanks:[4,6],crates:[2,5],consoles:[2,3],threatDensity:2.8,waves:[3,3],labels:["PRIMARY CONTAINMENT","REACTOR VAULT","CORE CHAMBER"]}},wc=["lab","containment"],bf=["corridor","junction"];function Ef(i){return cr[i].threatDensity>0}function Do(i,e,t){let n,s;if(i.key==="corridor"){const a=Math.round(Ue(e,Io[0],Io[1])),o=Math.round(Ue(e,Lo[0],Lo[1]));n=t===0?a:o,s=t===0?o:a}else n=Math.round(Ue(e,i.width[0],i.width[1])),s=Math.round(Ue(e,i.depth[0],i.depth[1]));const r=Math.round(Ue(e,i.ceiling[0],i.ceiling[1])*4)/4;return{width:n,depth:s,ceiling:r}}function Zs(i,e){return i[1]<=i[0]?i[0]:Po(e,i[0],i[1]+1)}const wf=8,Tf=10,Af=1,Cf=3,Rf=12;function Pf(i){const e=[],t=[],n=(f,m,v)=>{const g={id:e.length,archetype:f,depth:m<0?0:e[m].depth+1,critical:v,parent:m,children:[]};return e.push(g),m>=0&&(e[m].children.push(g.id),t.push({a:m,b:g.id,critical:v})),g},s=n("entry",-1,!0),r=[s.id],a=Po(i,wf-2,Tf-1);let o=s.id,l=!0;for(let f=0;f<a;f++){const m=l?gr(i,bf):gr(i,wc),v=n(m,o,!0);r.push(v.id),o=v.id,l=!l}const c=n("chamber",o,!0);r.push(c.id);const h=r.filter(f=>{const m=e[f];return!Ef(m.archetype)&&m.archetype!=="entry"}),d=Po(i,Af,Cf+1),u=new Set;for(let f=0;f<d&&e.length<Rf&&h.length!==0;f++){let m=-1;for(let v=0;v<6;v++){const g=gr(i,h);if(!u.has(g)){m=g;break}}m<0||(u.add(m),n(gr(i,wc),m,!1))}return{nodes:e,edges:t,startId:s.id,finalId:c.id,criticalPath:r}}const Nn=.5,sn=Nn*3,If=3,ya=1.6,Ul=3.2,Lf=1.2,In=.5,vr=4,Vi=.55,ri=.3,Tc=.34,Df=.13,Ac=.07,Nf=5,Cc=9,Cn=1.3,gu=2.4,vu=3,Ff=1.7,Rc=1.2,nt=1.45,zn=[0,1,0,1],ws=[-1,1,1,-1];function xu(i){return(i+2)%4}const Uf=[0,2,-2,4,-4,7,-7,11,-11],Pc=2,_u=.01;function Of(i,e,t){return i.minX<e.maxX+t&&e.minX<i.maxX+t&&i.minZ<e.maxZ+t&&e.minZ<i.maxZ+t}function Ic(i,e){const t=e.slice();for(let n=t.length-1;n>0;n--){const s=Math.floor(i()*(n+1)),r=t[n];t[n]=t[s],t[s]=r}return t}function Bf(i,e){const t=[0,1,2,3];if(e===-1)return Ic(i,t);const n=e,s=xu(e),r=Ic(i,t.filter(a=>a!==n&&a!==s));return i()<.45?[n,r[0],r[1],s]:[r[0],n,r[1],s]}function Mu(i,e,t){const n=t===0?i.minX:i.minZ,s=t===0?i.maxX:i.maxZ,r=t===0?e.minX:e.minZ,a=t===0?e.maxX:e.maxZ;return{lo:Math.max(n,r),hi:Math.min(s,a)}}const ca=(ya+Lf)*2;function yu(i,e,t,n,s){for(const r of i)if(!(r.a!==e&&r.b!==e&&r.a!==t&&r.b!==t)&&Math.abs(r.x-n)<ca&&Math.abs(r.z-s)<ca)return!0;return!1}function kf(i,e){const t=[],n=[],s=new Map,a={rooms:t,doors:n,byId:s,incoming:new Map,nextConnectionId:0},o=i.nodes[i.startId],l=Do(cr[o.archetype],e,1),c={id:o.id,archetype:o.archetype,depth:o.depth,critical:o.critical,minX:-Math.floor(l.width/2),maxX:-Math.floor(l.width/2)+l.width,minZ:-Math.floor(l.depth/2),maxZ:-Math.floor(l.depth/2)+l.depth,ceiling:l.ceiling};t.push(c),s.set(c.id,c);for(let h=1;h<i.criticalPath.length;h++){const d=i.criticalPath[h],u=i.nodes[d];if(!Lc(a,u,u.parent,e))return null}for(const h of i.nodes)h.critical||s.has(h.id)||h.parent<0||!s.has(h.parent)||Lc(a,h,h.parent,e);return zf(t,n,e),{rooms:t,doors:n}}function Lc(i,e,t,n){const s=i.byId.get(t);if(!s)return!1;const r=cr[e.archetype],a=Do(r,n,0),o=Do(r,n,1),l=Bf(n,i.incoming.get(t)??-1);for(const c of l){const h=c===0||c===2?o:a,d=c===0||c===2?0:1,u=d===0?(s.minX+s.maxX)/2:(s.minZ+s.maxZ)/2;for(const f of Uf){const m=Math.round(u+f),v=h.width/2,g=h.depth/2;let p,y;c===0?(y=s.minZ-sn-h.depth,p=m-v):c===2?(y=s.maxZ+sn,p=m-v):c===1?(p=s.maxX+sn,y=m-g):(p=s.minX-sn-h.width,y=m-g);const w={id:e.id,archetype:e.archetype,depth:e.depth,critical:e.critical,minX:p,maxX:p+h.width,minZ:y,maxZ:y+h.depth,ceiling:h.ceiling};let M=!0;for(const T of i.rooms)if(T.id!==t&&Of(w,T,sn-_u)){M=!1;break}if(!M)continue;const b=Mu(s,w,d);if(b.hi-b.lo<ca)continue;const E=Math.round((b.lo+b.hi)/2*2)/2,C=d===0?E:c===1?s.maxX+sn/2:s.minX-sn/2,_=d===0?c===0?s.minZ-sn/2:s.maxZ+sn/2:E;if(!yu(i.doors,t,e.id,C,_))return i.rooms.push(w),i.byId.set(w.id,w),i.doors.push({connectionId:i.nextConnectionId++,a:t,b:e.id,sideA:c,x:C,z:_,halfWidth:ya,height:Math.min(Ul,Math.min(s.ceiling,w.ceiling)-.8),critical:e.critical,loop:!1}),i.incoming.set(e.id,c),!0}}return!1}function zf(i,e,t){const n=new Set;for(const a of e)n.add(a.a<a.b?`${a.a}:${a.b}`:`${a.b}:${a.a}`);let s=e.length,r=0;for(let a=0;a<i.length&&r<Pc;a++)for(let o=a+1;o<i.length&&r<Pc;o++){const l=i[a],c=i[o];if(!n.has(`${l.id}:${c.id}`)&&!(Ue(t,0,1)>.55))for(const h of[0,1,2,3]){const d=h===0||h===2?0:1;let u;if(h===0?u=l.minZ-c.maxZ:h===2?u=c.minZ-l.maxZ:h===1?u=c.minX-l.maxX:u=l.minX-c.maxX,u<sn-_u||u>If)continue;const f=Mu(l,c,d);if(f.hi-f.lo<ca)continue;const m=Math.round((f.lo+f.hi)/2*2)/2,v=d===0?m:h===1?l.maxX+u/2:l.minX-u/2,g=d===0?h===0?l.minZ-u/2:l.maxZ+u/2:m;if(!yu(e,l.id,c.id,v,g)){e.push({connectionId:s++,a:l.id,b:c.id,sideA:h,x:v,z:g,halfWidth:ya,height:Math.min(Ul,Math.min(l.ceiling,c.ceiling)-.8),critical:!1,loop:!0}),n.add(`${l.id}:${c.id}`),r++;break}}}}const Dc=.55,Vf=1.5,Gf=2,Hf=3;function er(i,e,t,n,s,r,a,o){return{minX:i,minY:e,minZ:t,maxX:n,maxY:s,maxZ:r,kind:a,surface:o}}function It(i,e,t,n,s,r,a,o){return er(i-n/2,e-s/2,t-r/2,i+n/2,e+s/2,t+r/2,a,o)}function ot(i,e,t,n,s,r,a,o,l,c){n-t<1e-4||r-s<1e-4||o-a<1e-4||(e===0?i.push(er(t,s,a,n,r,o,l,c)):i.push(er(a,s,t,o,r,n,l,c)))}function Ts(i,e){switch(e){case 0:return i.minZ;case 1:return i.maxX;case 2:return i.maxZ;default:return i.minX}}function Ol(i,e){return zn[e]===0?{lo:i.minX,hi:i.maxX}:{lo:i.minZ,hi:i.maxZ}}function Sa(i,e,t,n,s){for(const r of i)if(!(n<=r.minX||e>=r.maxX)&&!(s<=r.minZ||t>=r.maxZ))return!0;return!1}function tr(i,e,t,n){const s=i-e-t,r=n-(i+e);return s>0&&s<nt?t+e:r>0&&r<nt?n-e:i}function ba(i,e,t,n,s,r){for(const a of i)if(!(a.kind!=="prop"||a.minY>.35||a.maxY<=.05)&&!(n+r<=a.minX||e-r>=a.maxX)&&!(s+r<=a.minZ||t-r>=a.maxZ))return!0;return!1}function Nc(i,e,t){for(let n=0;n<i.length;n++){const s=i[n];if(s.kind==="floor"||s.kind==="ceiling"||s.minY>=Vf||s.maxY<=.05)continue;const r=Math.max(s.minX,Math.min(e,s.maxX)),a=Math.max(s.minZ,Math.min(t,s.maxZ)),o=r-e,l=a-t;if(o*o+l*l<Dc*Dc)return s}}function Wf(i,e,t,n){const s=Nn,r=zn[t],a=ws[t],o=Ts(e,t),l=a<0?o-s:o,c=a<0?o:o+s,h=Ol(e,t),d=h.lo-s,u=h.hi+s,f=n.slice().sort((v,g)=>v.lo-g.lo);let m=d;for(const v of f)ot(i,r,m,v.lo,0,e.ceiling,l,c,"wall","wallPanel"),ot(i,r,v.lo,v.hi,v.height,e.ceiling,l,c,"wall","wallPanel"),m=Math.max(m,v.hi);ot(i,r,m,u,0,e.ceiling,l,c,"wall","wallPanel")}function Xf(i,e,t){const n=Nn,s=zn[t.sideA],r=[];let a,o;if(s===0?(a=Math.min(i.maxZ,e.maxZ),o=Math.max(i.minZ,e.minZ)):(a=Math.min(i.maxX,e.maxX),o=Math.max(i.minX,e.minX)),o<a){const m=a;a=o,o=m}const l=a+n,c=o-n,h=s===0?t.x:t.z,d=t.halfWidth,u=d+In,f=Math.max(i.ceiling,e.ceiling);return ot(r,s,h-u,h+u,-n,0,l,c,"floor","floorPlate"),ot(r,s,h-u,h-d,0,f,l,c,"wall","structure"),ot(r,s,h+d,h+u,0,f,l,c,"wall","structure"),ot(r,s,h-d,h+d,t.height,f,l,c,"wall","structure"),r}function qf(i,e,t,n){const{layout:s,dressing:r}=n,a=cr[i.archetype],o=Nn,l=i.ceiling,{minX:c,maxX:h,minZ:d,maxZ:u}=i,f=h-c,m=u-d,v=(c+h)/2,g=(d+u)/2,p=[],y=[],w=[],M=[],b=[];p.push(er(c-o,-o,d-o,h+o,0,u+o,"floor","floorPlate"),er(c-o,l,d-o,h+o,l+o,u+o,"ceiling","ceilingPanel"));const E=[[],[],[],[]];for(const B of e){const N=zn[B.side]===0?B.x:B.z;E[B.side].push({lo:N-B.halfWidth,hi:N+B.halfWidth,height:B.height}),Su(M,i,B.side,N,B.halfWidth+.7,2.6),Zf(p,i,B.side,N,B.halfWidth,B.height)}t.budget>0&&Kf(i,e,E,M,p,b,n);for(const B of[0,1,2,3])Wf(p,i,B,E[B]);Yf(p,i,E),$f(p,i,E);const C=Math.max(0,Math.round(m/Nf)-1);for(let B=0;B<C;B++){const N=d+m/(C+1)*(B+1);p.push(It(v,l-.18,N,f,.36,.55,"ceiling","structure"))}const _=Math.max(1,Math.min(3,Math.round(f/Cc))),T=Math.max(1,Math.min(4,Math.round(m/Cc))),P=Math.max(1.4,Math.min(2.9,f/_-1.4));for(let B=0;B<_;B++)for(let N=0;N<T;N++){const X=c+f/(_+1)*(B+1),k=d+m/(T+1)*(N+1);p.push(It(X,l-.13,k,P,.26,1.05,"ceiling","machineDark"),It(X,l-.28,k,P-.3,.08,.78,"ceiling","lamp")),w.push({x:X,y:l-.5,z:k,color:12572904,intensity:34,distance:Math.max(16,Math.min(28,Math.max(f,m)*1.1))})}if(f>9&&y.push({kind:"pipeRun",x:c+1.15,y:l-.62,z:g,yaw:0,scale:1,variant:.3,length:m-1},{kind:"pipeRun",x:h-1.15,y:l-.62,z:g,yaw:0,scale:1,variant:.7,length:m-1}),i.depth>=3&&r()<Math.min(.75,i.depth*.12)){const B=v+(r()<.5?-1:1)*(f/2-.6);y.push({kind:"beacon",x:B,y:l-1,z:g,yaw:0,scale:1.2,variant:r()}),w.push({x:B,y:l-1.2,z:g,color:14173484,intensity:6,distance:9})}const R=M.slice();i.archetype==="entry"&&R.push({minX:v-3,minZ:g-3,maxX:v+3,maxZ:g+3}),Qf(p,i,R,Zs(a.columns,s),s),jf(p,y,i,R,Zs(a.tanks,r),r),ep(p,y,i,R,Zs(a.consoles,r),r),tp(p,i,R,Zs(a.crates,r),r);for(const B of b){if(Nc(p,B.x,B.z))throw new Error(`Enemy entrance origin blocked at (${B.x}, ${B.z}) in room ${i.id}`);if(Nc(p,B.entryX,B.entryZ))throw new Error(`Enemy entrance handoff blocked at (${B.entryX}, ${B.entryZ}) in room ${i.id}`)}const D=a.labels[Math.floor(s()*a.labels.length)%a.labels.length],W=1+Math.floor(s()*89);return{id:i.id,name:`${D} ${String(W).padStart(2,"0")}`,archetype:i.archetype,depth:i.depth,critical:i.critical,minX:c,maxX:h,minZ:d,maxZ:u,floorY:0,ceilY:l,brushes:p,props:y,lights:w,doorways:e.slice(),enemySpawns:b,encounter:t}}function Su(i,e,t,n,s,r){const a=ws[t],o=Ts(e,t),l=a<0?o:o-r;zn[t]===0?i.push({minX:n-s,maxX:n+s,minZ:l,maxZ:l+r}):i.push({minX:l,maxX:l+r,minZ:n-s,maxZ:n+s})}function Zf(i,e,t,n,s,r){const a=zn[t],o=ws[t],l=Ts(e,t),c=.35,h=o<0?l:l-c,d=o<0?l+c:l,u=s+In;ot(i,a,n-u,n-s,0,r+In,h,d,"wall","structure"),ot(i,a,n+s,n+u,0,r+In,h,d,"wall","structure"),ot(i,a,n-u,n+u,r,r+In,h,d,"wall","structure");const f=o<0?d:h-.06;ot(i,a,n-u,n+u,r+.12,r+In-.12,f,f+.06,"wall","hazard")}function Yf(i,e,t){const n=e.ceiling,s=(a,o)=>{for(const l of t[a])if(o>l.lo-Vi-In&&o<l.hi+Vi+In)return!1;return!0},r=(a,o)=>{const l=o-a,c=Math.floor((l-vr)/vr);if(c<0)return[];const h=[],d=(l-vr)/Math.max(1,c);for(let u=0;u<=c;u++)h.push(a+vr*.5+u*d);return h};for(const a of r(e.minZ,e.maxZ))s(3,a)&&i.push(It(e.minX+ri/2,n/2,a,ri,n,Vi,"wall","structure")),s(1,a)&&i.push(It(e.maxX-ri/2,n/2,a,ri,n,Vi,"wall","structure"));for(const a of r(e.minX,e.maxX))s(0,a)&&i.push(It(a,n/2,e.minZ+ri/2,Vi,n,ri,"wall","structure")),s(2,a)&&i.push(It(a,n/2,e.maxZ-ri/2,Vi,n,ri,"wall","structure"))}function $f(i,e,t){const n=Tc,s=Tc+Df;for(const r of[0,1,2,3]){const a=zn[r],o=ws[r],l=Ts(e,r),c=o<0?l:l-Ac,h=o<0?l+Ac:l,d=Ol(e,r),u=t[r].slice().sort((m,v)=>m.lo-v.lo);let f=d.lo;for(const m of u){const v=Math.min(m.lo-In,d.hi);v-f>=.2&&ot(i,a,f,v,n,s,c,h,"wall","emissive"),f=Math.max(f,m.hi+In)}d.hi-f>=.2&&ot(i,a,f,d.hi,n,s,c,h,"wall","emissive")}}function Kf(i,e,t,n,s,r,a){const o=Nn,l=Math.floor(a.layout()*4);for(let c=0;c<4&&r.length<Hf;c++){const h=(l+c)%4,d=zn[h],u=ws[h],f=Ts(i,h),m=Ol(i,h),v=(m.lo+m.hi)/2,g=(m.hi-m.lo)/4,p=[v,v-g,v+g];let y=Number.NaN;for(const E of p){const C=Math.round(E*2)/2;if(C-Cn<m.lo+1||C+Cn>m.hi-1)continue;let _=!1;for(const Y of t[h])if(C+Cn+1.2>Y.lo&&C-Cn-1.2<Y.hi){_=!0;break}for(const Y of e){if(_)break;if(zn[Y.side]===d)continue;const j=d===0?Y.z:Y.x,ne=d===0?Y.x:Y.z;Math.abs(j-f)<4&&Math.abs(ne-C)<4&&(_=!0)}if(_)continue;const T=f+u*(o+vu),P=Math.min(f,T),R=Math.max(f,T),D=C-Cn-o,W=C+Cn+o,B=d===0?D:P,N=d===0?W:R,X=d===0?P:D,k=d===0?R:W;if(a.isFree(B,X,N,k)){a.reserve(B,X,N,k),y=C;break}}if(Number.isNaN(y))continue;t[h].push({lo:y-Cn,hi:y+Cn,height:gu}),Su(n,i,h,y,Cn+.7,Rc+1.4),Jf(s,i,h,y);const w=f+u*(o+Ff),M=f-u*Rc,b=h===0?Math.PI:h===2?0:h===1?Math.PI/2:-Math.PI/2;r.push(d===0?{x:y,z:w,yaw:b,entryX:y,entryZ:M}:{x:w,z:y,yaw:b,entryX:M,entryZ:y})}}function Jf(i,e,t,n){const s=Nn,r=zn[t],a=ws[t],o=Ts(e,t),l=o+a*s,c=o+a*(s+vu),h=Math.min(l,c),d=Math.max(l,c),u=Cn,f=gu;ot(i,r,n-u,n+u,-s,0,h,d,"floor","floorPlate"),ot(i,r,n-u,n+u,f,f+s,h,d,"ceiling","structure"),ot(i,r,n-u-s,n-u,0,f,h,d,"wall","machineDark"),ot(i,r,n+u,n+u+s,0,f,h,d,"wall","machineDark");const m=a<0?h:d-s;ot(i,r,n-u,n+u,0,f,m,m+s,"wall","machineDark");const v=a<0?h+s:d-s-.05;ot(i,r,n-u+.3,n+u-.3,.5,f-.5,v,v+.05,"wall","emissive");const g=a<0?o:o-.3,p=a<0?o+.3:o;ot(i,r,n-u-.35,n-u,0,f+.35,g,p,"wall","structure"),ot(i,r,n+u,n+u+.35,0,f+.35,g,p,"wall","structure"),ot(i,r,n-u-.35,n+u+.35,f,f+.35,g,p,"wall","structure"),ot(i,r,n-u,n+u,f+.08,f+.27,g,p,"wall","hazard")}function Qf(i,e,t,n,s){const r=e.ceiling,a=(e.maxX-e.minX)/2,o=(e.maxZ-e.minZ)/2,l=(e.minX+e.maxX)/2,c=(e.minZ+e.maxZ)/2,h=.75;for(let d=0;d<n;d++){const u=l+(d%2===0?-1:1)*Ue(s,a*.3,a*.56),f=c+(d<2?-1:1)*Ue(s,o*.15,o*.55);u-h-e.minX<nt||e.maxX-u-h<nt||f-h-e.minZ<nt||e.maxZ-f-h<nt||Sa(t,u-h-nt,f-h-nt,u+h+nt,f+h+nt)||ba(i,u-h,f-h,u+h,f+h,nt)||i.push(It(u,r/2,f,1.25,r,1.25,"prop","structure"),It(u,.55,f,1.42,.9,1.42,"prop","hazard"),It(u,1.06,f,1.5,.12,1.5,"prop","machineDark"))}}function jf(i,e,t,n,s,r){const h=t.maxZ-t.minZ;let d=0;for(let u=0;u<s*5&&d<s;u++){const f=u%2===0?-1:1,m=tr(f<0?t.minX+1.9:t.maxX-1.9,1.15,t.minX,t.maxX),v=tr(t.minZ+h*(.14+.72*r()),1.15,t.minZ,t.maxZ);if(m-1.15<t.minX-1e-6||m+1.15>t.maxX+1e-6||v-1.15<t.minZ-1e-6||v+1.15>t.maxZ+1e-6||!Bl(t,m,v,1.15)||Sa(n,m-1.15-nt,v-1.15-nt,m+1.15+nt,v+1.15+nt)||ba(i,m-1.15,v-1.15,m+1.15,v+1.15,nt))continue;i.push(It(m,.24,v,1.15*2,.48,1.15*2,"prop","machineDark"),It(m,.55,v,1.15*2-.25,.1,1.15*2-.25,"prop","emissive"));const g=It(m,.66+3.05/2,v,.731*2,3.05,.731*2,"prop","glass");g.collisionOnly=!0,i.push(g),e.push({kind:"containmentTank",x:m,y:0,z:v,yaw:Ue(r,0,Math.PI),scale:1,variant:r()}),d++}}function ep(i,e,t,n,s,r){const a=t.maxZ-t.minZ,o=1;let l=0;for(let c=0;c<s*5&&l<s;c++){const h=c%2===0?-1:1,d=h<0?t.minX+.36:t.maxX-.36,u=tr(t.minZ+a*(.12+.76*r()),o,t.minZ,t.maxZ);u-o<t.minZ-1e-6||u+o>t.maxZ+1e-6||Bl(t,d,u,o)&&(Sa(n,d-.4-nt,u-o-nt,d+.4+nt,u+o+nt)||ba(i,d-.4,u-o,d+.4,u+o,nt)||(i.push(It(d,.5,u,.72,1,1.9,"prop","machine"),It(d,1.02,u,.8,.1,2,"prop","machineDark")),e.push({kind:"wallConsole",x:d,y:1.07,z:u,yaw:h<0?Math.PI/2:-Math.PI/2,scale:1,variant:r()}),l++))}}function tp(i,e,t,n,s){let r=0;for(let a=0;a<n*6&&r<n;a++){const o=Ue(s,.85,1.25),l=o/2,c=tr(e.minX+l+(e.maxX-e.minX-o)*s(),l,e.minX,e.maxX),h=tr(e.minZ+l+(e.maxZ-e.minZ-o)*s(),l,e.minZ,e.maxZ);c-l<e.minX-1e-6||c+l>e.maxX+1e-6||h-l<e.minZ-1e-6||h+l>e.maxZ+1e-6||Bl(e,c,h,l)&&(Sa(t,c-l-nt,h-l-nt,c+l+nt,h+l+nt)||ba(i,c-l,h-l,c+l,h+l,nt)||(i.push(It(c,o/2,h,o,o,o,"prop","machine"),It(c,o-.06,h,o*1.04,.12,o*1.04,"prop","hazard")),r++))}}function Bl(i,e,t,n){const s=[e-n-i.minX,i.maxX-(e+n),t-n-i.minZ,i.maxZ-(t+n)];for(const r of s)if(r>.001&&r<nt)return!1;return!0}const np=100,No=3,ip=.1,sp=.06,rp=.45;function ap(i,e,t){if(e.threatDensity<=0)return{budget:0,waveBudget:[],runnerChance:0};const n=(i.maxX-i.minX)*(i.maxZ-i.minZ),s=1+i.depth*.11,r=i.critical?1:.85,a=Math.max(No,Math.round(n/np*e.threatDensity*s*r*Ue(t,.92,1.12))),o=Math.max(1,Zs(e.waves,t));return{budget:a,waveBudget:bu(a,o),runnerChance:Math.min(rp,ip+i.depth*sp)}}const Gi={min:72,max:88};function op(i){const e=i.filter(a=>a.budget>0);if(e.length===0)return 0;const t=()=>e.reduce((a,o)=>a+o.budget,0),n=t(),s=n<Gi.min?Gi.min/n:n>Gi.max?Gi.max/n:1;if(s!==1)for(const a of e)a.budget=Math.max(No,Math.round(a.budget*s));const r=e.length*64;for(let a=0;a<r&&t()>Gi.max;a++){const o=Fc(e,l=>l.budget>No,(l,c)=>c.budget-l.budget);if(!o)break;o.budget-=1}for(let a=0;a<r&&t()<Gi.min;a++){const o=Fc(e,()=>!0,(l,c)=>l.budget-c.budget);if(!o)break;o.budget+=1}for(const a of e)a.waveBudget=bu(a.budget,a.waveBudget.length),a.budget=a.waveBudget.reduce((o,l)=>o+l,0);return t()}function Fc(i,e,t){let n;for(const s of i)e(s)&&(!n||t(s,n)<0)&&(n=s);return n}function bu(i,e){const t=e*(e+1)/2,n=[];let s=0;for(let r=0;r<e-1;r++){const a=Math.max(1,Math.round(i*(r+1)/t));n.push(a),s+=a}return n.push(Math.max(1,i-s)),n}function Fa(i,e,t,n,s,r){for(const a of i.brushes){if(a.kind==="floor"||a.kind==="ceiling"||r<=a.minY||s>=a.maxY)continue;const o=Math.max(a.minX,Math.min(e,a.maxX)),l=Math.max(a.minZ,Math.min(t,a.maxZ));if((o-e)**2+(l-t)**2<n*n)return!0}return!1}function Eu(i,e){const t=[],n=[],s=new Map;for(const d of i.rooms)s.set(d.id,d);const r=new Map;for(const d of i.connections){if(!s.has(d.a)||!s.has(d.b)){t.push(`connection ${d.id} references a missing room`);continue}r.has(d.a)||r.set(d.a,[]),r.has(d.b)||r.set(d.b,[]),r.get(d.a).push(d.b),r.get(d.b).push(d.a)}const a=new Set([i.startRoomId]),o=[i.startRoomId];for(;o.length>0;){const d=o.pop();for(const u of r.get(d)??[])a.has(u)||(a.add(u),o.push(u))}a.has(i.finalRoomId)||t.push("the final chamber is unreachable in the room graph");for(const d of i.rooms)a.has(d.id)||t.push(`room ${d.id} is not connected to the entry`),d.doorways.length===0&&t.push(`room ${d.id} has no doorway`);for(let d=0;d<i.rooms.length;d++)for(let u=d+1;u<i.rooms.length;u++){const f=i.rooms[d],m=i.rooms[u],v=sn-.01;f.minX<m.maxX+v&&m.minX<f.maxX+v&&f.minZ<m.maxZ+v&&m.minZ<f.maxZ+v&&t.push(`rooms ${f.id} and ${m.id} overlap`)}const l=s.get(i.startRoomId);l?Fa(l,i.playerSpawn.x,i.playerSpawn.z,e.playerRadius,.05,e.playerHeight)&&t.push("the player spawn is inside collision"):t.push("the entry room is missing");for(const d of i.rooms)if(!(d.encounter.budget<=0)){d.enemySpawns.length<Gf&&t.push(`room ${d.id} fights with only ${d.enemySpawns.length} arrival lane(s)`);for(const u of d.enemySpawns)Fa(d,u.x,u.z,e.enemyRadius,.05,e.enemyHeight)&&t.push(`room ${d.id} has a blocked entrance origin`),Fa(d,u.entryX,u.entryZ,e.enemyRadius,.05,e.enemyHeight)&&t.push(`room ${d.id} has a blocked entrance handoff`)}const c=i.nav,h=ra(c,i.playerSpawn.x,i.playerSpawn.z);if(h<0)t.push("the player spawn has no walkable navigation cell");else{const d=new Uint8Array(c.walkable.length),u=Od(c,h,d),f=Bd(c);u<f&&n.push(`${f-u} walkable cells are isolated from the spawn`);for(const m of i.rooms){const v=(m.minX+m.maxX)/2,g=(m.minZ+m.maxZ)/2,p=ra(c,v,g);(p<0||!d[p])&&t.push(`room ${m.id} cannot be walked to from the entry`);for(const y of m.enemySpawns){const w=Ud(c,y.entryX,y.entryZ);(w<0||!d[w])&&t.push(`room ${m.id} has an entrance that cannot reach the player`)}}}return{problems:t,warnings:n}}const lp=12;function cp(i,e){const t=e.now??(()=>0),n=e.maxAttempts??lp,s=t();for(let a=0;a<n;a++){const o=hp(i,a,e.validation);if(o)return o.report.attempts=a+1,o.report.ms=t()-s,o}const r=pp(i,e.validation);return r.report.attempts=n,r.report.fallback=!0,r.report.ms=t()-s,r}function hp(i,e,t){const n=e===0?"":`:${e}`,s=kt(i,`layout${n}`),r=kt(i,`dressing${n}`),a=kt(i,`enemies${n}`),o=Pf(s),l=kf(o,s);if(!l)return null;const c=up(l,o.startId,o.finalId,o.criticalPath);let h;try{h=wu(i,c.layout,c.startId,c.finalId,c.criticalPath,{layout:s,dressing:r,enemies:a})}catch{return null}const d=Eu(h,t);return d.problems.length>0?null:(h.report.warnings=d.warnings,h)}function up(i,e,t,n){const s=new Map;i.rooms.forEach((o,l)=>s.set(o.id,l));const r=i.rooms.map((o,l)=>({...o,id:l})),a=i.doors.map((o,l)=>({...o,connectionId:l,a:s.get(o.a),b:s.get(o.b)}));return{layout:{rooms:r,doors:a},startId:s.get(e)??0,finalId:s.get(t)??r.length-1,criticalPath:n.filter(o=>s.has(o)).map(o=>s.get(o))}}function wu(i,e,t,n,s,r){const a=new Map;for(const b of e.rooms)a.set(b.id,b);const o=e.rooms.map(b=>({minX:b.minX-Nn,minZ:b.minZ-Nn,maxX:b.maxX+Nn,maxZ:b.maxZ+Nn,owner:b.id})),l=new Map;for(const b of e.rooms)l.set(b.id,ap(b,cr[b.archetype],r.enemies));const c=[];for(const b of e.rooms)b.critical&&c.push(l.get(b.id));const h=op(c),d=[...l.values()].reduce((b,E)=>b+E.budget,0),u=[];for(const b of e.rooms){const E=[];for(const P of e.doors)P.a===b.id?E.push(Uc(P,P.sideA)):P.b===b.id&&E.push(Uc(P,xu(P.sideA)));const C=l.get(b.id),_=b.id,T={layout:r.layout,dressing:r.dressing,isFree(P,R,D,W){for(const B of o)if(B.owner!==_&&!(D<=B.minX||P>=B.maxX)&&!(W<=B.minZ||R>=B.maxZ))return!1;return!0},reserve(P,R,D,W){o.push({minX:P,minZ:R,maxX:D,maxZ:W,owner:-1})}};u.push(qf(b,E,C,T))}const f=new Map;for(const b of u)f.set(b.id,b);for(const b of e.doors){const E=a.get(b.a),C=a.get(b.b),_=f.get(Math.min(b.a,b.b));for(const T of Xf(E,C,b))_.brushes.push(T)}const m=Fd(u,{radius:Nd,height:1.4});let v=Number.POSITIVE_INFINITY,g=Number.POSITIVE_INFINITY,p=Number.NEGATIVE_INFINITY,y=Number.NEGATIVE_INFINITY,w=0;for(const b of u){w+=b.brushes.length;for(const E of b.brushes)E.minX<v&&(v=E.minX),E.minZ<g&&(g=E.minZ),E.maxX>p&&(p=E.maxX),E.maxZ>y&&(y=E.maxZ)}const M={seed:i,attempts:1,fallback:!1,rooms:u.length,connections:e.doors.length,loops:e.doors.filter(b=>b.loop).length,brushes:w,threatTotal:d,requiredThreat:h,criticalPath:s.slice(),warnings:[],ms:0};return{seed:i,rooms:u,connections:e.doors.map(b=>({id:b.connectionId,a:b.a,b:b.b,x:b.x,z:b.z,critical:b.critical,loop:b.loop})),startRoomId:t,finalRoomId:n,playerSpawn:dp(f.get(t)),nav:m,report:M,minX:v,maxX:p,minZ:g,maxZ:y}}function Uc(i,e){return{connectionId:i.connectionId,side:e,x:i.x,z:i.z,halfWidth:i.halfWidth,height:i.height}}function dp(i){const e=(i.minX+i.maxX)/2,t=(i.minZ+i.maxZ)/2,n=i.doorways[0];if(!n)return{x:e,z:t,yaw:0};const s=fp(i,n);return{x:e,z:t,yaw:Math.atan2(-(s.x-e),-(s.z-t))}}function fp(i,e){switch(e.side){case 0:return{x:e.x,z:i.minZ};case 1:return{x:i.maxX,z:e.z};case 2:return{x:e.x,z:i.maxZ};default:return{x:i.minX,z:e.z}}}function pp(i,e){const t=kt(i,"layout:fallback"),n=kt(i,"dressing:fallback"),s=kt(i,"enemies:fallback"),r=[{archetype:"entry",width:14,depth:12,ceiling:4.5},{archetype:"corridor",width:8,depth:18,ceiling:4},{archetype:"lab",width:18,depth:16,ceiling:4.5},{archetype:"junction",width:13,depth:13,ceiling:4.75},{archetype:"containment",width:22,depth:24,ceiling:5},{archetype:"corridor",width:8,depth:18,ceiling:4},{archetype:"lab",width:18,depth:16,ceiling:4.5},{archetype:"chamber",width:26,depth:26,ceiling:5.5}],a=[];let o=r[0].depth/2;for(let u=0;u<r.length;u++){const f=r[u];u>0&&(o=a[u-1].minZ-sn),a.push({id:u,archetype:f.archetype,depth:u,critical:!0,minX:-f.width/2,maxX:f.width/2,minZ:o-f.depth,maxZ:o,ceiling:f.ceiling})}const l=[];for(let u=0;u<a.length-1;u++)l.push({connectionId:u,a:u,b:u+1,sideA:0,x:0,z:a[u].minZ-sn/2,halfWidth:ya,height:Ul,critical:!0,loop:!1});const c=a.map(u=>u.id),h=wu(i,{rooms:a,doors:l},0,a.length-1,c,{layout:t,dressing:n,enemies:s}),d=Eu(h,e);if(d.problems.length>0)throw new Error(`the deterministic fallback facility is invalid: ${d.problems.join("; ")}`);return h.report.warnings=d.warnings,h}const kl="185",mp=0,Oc=1,gp=2,Qs=1,vp=2,Ys=3,Qn=0,qt=1,Ln=2,Kn=0,gs=1,Pi=2,Bc=3,kc=4,Tu=5,$n=100,xp=101,_p=102,Mp=103,yp=104,Sp=200,Fo=201,bp=202,Ep=203,Uo=204,nr=205,wp=206,Tp=207,Ap=208,Cp=209,Rp=210,Pp=211,Ip=212,Lp=213,Dp=214,Oo=0,Bo=1,ko=2,Ms=3,zo=4,Vo=5,Go=6,Ho=7,zl=0,Np=1,Fp=2,Bn=0,Au=1,Cu=2,Ru=3,Vl=4,Pu=5,Iu=6,Lu=7,Du=300,Ii=301,ys=302,Ua=303,Oa=304,Ea=306,Li=1e3,an=1001,Wo=1002,Lt=1003,Up=1004,xr=1005,Mt=1006,Ba=1007,Fn=1008,Qt=1009,Nu=1010,Fu=1011,ir=1012,Gl=1013,Vn=1014,_n=1015,jn=1016,Hl=1017,Wl=1018,sr=1020,Uu=35902,Ou=35899,Bu=1021,ku=1022,un=1023,ei=1026,Ci=1027,Xl=1028,ql=1029,Di=1030,Zl=1031,Yl=1033,jr=33776,ea=33777,ta=33778,na=33779,Xo=35840,qo=35841,Zo=35842,Yo=35843,$o=36196,Ko=37492,Jo=37496,Qo=37488,jo=37489,ha=37490,el=37491,tl=37808,nl=37809,il=37810,sl=37811,rl=37812,al=37813,ol=37814,ll=37815,cl=37816,hl=37817,ul=37818,dl=37819,fl=37820,pl=37821,ml=36492,gl=36494,vl=36495,xl=36283,_l=36284,ua=36285,Ml=36286,Op=3200,da=0,Bp=1,Dn="",Bt="srgb",fa="srgb-linear",pa="linear",Ke="srgb",Hi=7680,zc=519,kp=512,zp=513,Vp=514,$l=515,Gp=516,Hp=517,Kl=518,Wp=519,Vc=35044,Gc="300 es",Un=2e3,rr=2001;function Xp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ma(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qp(){const i=ma("canvas");return i.style.display="block",i}const Hc={};function Wc(...i){const e="THREE."+i.shift();console.log(e,...i)}function zu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ae(...i){i=zu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function We(...i){i=zu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function vs(...i){const e=i.join(" ");e in Hc||(Hc[e]=!0,Ae(...i))}function Zp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Yp={[Oo]:Bo,[ko]:Go,[zo]:Ho,[Ms]:Vo,[Bo]:Oo,[Go]:ko,[Ho]:zo,[Vo]:Ms};class Fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ka=Math.PI/180,yl=180/Math.PI;function hr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]).toLowerCase()}function Ve(i,e,t){return Math.max(e,Math.min(t,i))}function $p(i,e){return(i%e+e)%e}function za(i,e,t){return(1-t)*i+t*e}function Ls(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $t(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ie{static{Ie.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ti{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(d!==v||l!==u||c!==f||h!==m){let g=l*u+c*f+h*m+d*v;g<0&&(u=-u,f=-f,m=-m,v=-v,g=-g);let p=1-o;if(g<.9995){const y=Math.acos(g),w=Math.sin(y);p=Math.sin(p*y)/w,o=Math.sin(o*y)/w,l=l*p+u*o,c=c*p+f*o,h=h*p+m*o,d=d*p+v*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+m*o,d=d*p+v*o;const y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*d+l*f-c*u,e[t+1]=l*m+h*u+c*d-o*f,e[t+2]=c*m+h*f+o*u-l*d,e[t+3]=h*m-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:Ae("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{static{U.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Va.copy(this).projectOnVector(e),this.sub(Va)}reflect(e){return this.sub(Va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Va=new U,Xc=new ti;class Pe{static{Pe.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],v=s[0],g=s[3],p=s[6],y=s[1],w=s[4],M=s[7],b=s[2],E=s[5],C=s[8];return r[0]=a*v+o*y+l*b,r[3]=a*g+o*w+l*E,r[6]=a*p+o*M+l*C,r[1]=c*v+h*y+d*b,r[4]=c*g+h*w+d*E,r[7]=c*p+h*M+d*C,r[2]=u*v+f*y+m*b,r[5]=u*g+f*w+m*E,r[8]=u*p+f*M+m*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=t*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=d*v,e[1]=(s*c-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=u*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return vs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ga.makeScale(e,t)),this}rotate(e){return vs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ga.makeRotation(-e)),this}translate(e,t){return vs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ga.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ga=new Pe,qc=new Pe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zc=new Pe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Kp(){const i={enabled:!0,workingColorSpace:fa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ke&&(s.r=Jn(s.r),s.g=Jn(s.g),s.b=Jn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ke&&(s.r=xs(s.r),s.g=xs(s.g),s.b=xs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Dn?pa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return vs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return vs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[fa]:{primaries:e,whitePoint:n,transfer:pa,toXYZ:qc,fromXYZ:Zc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bt},outputColorSpaceConfig:{drawingBufferColorSpace:Bt}},[Bt]:{primaries:e,whitePoint:n,transfer:Ke,toXYZ:qc,fromXYZ:Zc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bt}}}),i}const ze=Kp();function Jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function xs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Wi;class Jp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Wi===void 0&&(Wi=ma("canvas")),Wi.width=e.width,Wi.height=e.height;const s=Wi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Wi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ma("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Jn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Jn(t[n]/255)*255):t[n]=Jn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ae("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qp=0;class Jl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=hr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ha(s[a].image)):r.push(Ha(s[a]))}else r=Ha(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ha(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ae("Texture: Unable to serialize Texture."),{})}let jp=0;const Wa=new U;class zt extends Fi{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=an,s=an,r=Mt,a=Fn,o=un,l=Qt,c=zt.DEFAULT_ANISOTROPY,h=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=hr(),this.name="",this.source=new Jl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ie(0,0),this.repeat=new Ie(1,1),this.center=new Ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wa).x}get height(){return this.source.getSize(Wa).y}get depth(){return this.source.getSize(Wa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ae(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ae(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Li:e.x=e.x-Math.floor(e.x);break;case an:e.x=e.x<0?0:1;break;case Wo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Li:e.y=e.y-Math.floor(e.y);break;case an:e.y=e.y<0?0:1;break;case Wo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=Du;zt.DEFAULT_ANISOTROPY=1;class lt{static{lt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,M=(f+1)/2,b=(p+1)/2,E=(h+u)/4,C=(d+v)/4,_=(m+g)/4;return w>M&&w>b?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=E/n,r=C/n):M>b?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=E/s,r=_/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=C/r,s=_/r),this.set(n,s,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(d-v)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class em extends Fi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new zt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Mt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Jl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mn extends em{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Vu extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tm extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xe{static{Xe.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,m,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,m,v,g)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,m,v,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Xi.setFromMatrixColumn(e,0).length(),r=1/Xi.setFromMatrixColumn(e,1).length(),a=1/Xi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,m=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,m=c*h,v=c*d;t[0]=u+v*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,m=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,m=o*h,v=o*d;t[0]=l*h,t[4]=m*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=m*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+m,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nm,e,im)}lookAt(e,t,n){const s=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ai.crossVectors(n,tn),ai.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ai.crossVectors(n,tn)),ai.normalize(),_r.crossVectors(tn,ai),s[0]=ai.x,s[4]=_r.x,s[8]=tn.x,s[1]=ai.y,s[5]=_r.y,s[9]=tn.y,s[2]=ai.z,s[6]=_r.z,s[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],y=n[3],w=n[7],M=n[11],b=n[15],E=s[0],C=s[4],_=s[8],T=s[12],P=s[1],R=s[5],D=s[9],W=s[13],B=s[2],N=s[6],X=s[10],k=s[14],Y=s[3],j=s[7],ne=s[11],pe=s[15];return r[0]=a*E+o*P+l*B+c*Y,r[4]=a*C+o*R+l*N+c*j,r[8]=a*_+o*D+l*X+c*ne,r[12]=a*T+o*W+l*k+c*pe,r[1]=h*E+d*P+u*B+f*Y,r[5]=h*C+d*R+u*N+f*j,r[9]=h*_+d*D+u*X+f*ne,r[13]=h*T+d*W+u*k+f*pe,r[2]=m*E+v*P+g*B+p*Y,r[6]=m*C+v*R+g*N+p*j,r[10]=m*_+v*D+g*X+p*ne,r[14]=m*T+v*W+g*k+p*pe,r[3]=y*E+w*P+M*B+b*Y,r[7]=y*C+w*R+M*N+b*j,r[11]=y*_+w*D+M*X+b*ne,r[15]=y*T+w*W+M*k+b*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],m=e[3],v=e[7],g=e[11],p=e[15],y=l*f-c*u,w=o*f-c*d,M=o*u-l*d,b=a*f-c*h,E=a*u-l*h,C=a*d-o*h;return t*(v*y-g*w+p*M)-n*(m*y-g*b+p*E)+s*(m*w-v*b+p*C)-r*(m*M-v*E+g*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],m=e[12],v=e[13],g=e[14],p=e[15],y=t*o-n*a,w=t*l-s*a,M=t*c-r*a,b=n*l-s*o,E=n*c-r*o,C=s*c-r*l,_=h*v-d*m,T=h*g-u*m,P=h*p-f*m,R=d*g-u*v,D=d*p-f*v,W=u*p-f*g,B=y*W-w*D+M*R+b*P-E*T+C*_;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/B;return e[0]=(o*W-l*D+c*R)*N,e[1]=(s*D-n*W-r*R)*N,e[2]=(v*C-g*E+p*b)*N,e[3]=(u*E-d*C-f*b)*N,e[4]=(l*P-a*W-c*T)*N,e[5]=(t*W-s*P+r*T)*N,e[6]=(g*M-m*C-p*w)*N,e[7]=(h*C-u*M+f*w)*N,e[8]=(a*D-o*P+c*_)*N,e[9]=(n*P-t*D-r*_)*N,e[10]=(m*E-v*M+p*y)*N,e[11]=(d*M-h*E-f*y)*N,e[12]=(o*T-a*R-l*_)*N,e[13]=(t*R-n*T+s*_)*N,e[14]=(v*w-m*b-g*y)*N,e[15]=(h*b-d*w+u*y)*N,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,m=r*d,v=a*h,g=a*d,p=o*d,y=l*c,w=l*h,M=l*d,b=n.x,E=n.y,C=n.z;return s[0]=(1-(v+p))*b,s[1]=(f+M)*b,s[2]=(m-w)*b,s[3]=0,s[4]=(f-M)*E,s[5]=(1-(u+p))*E,s[6]=(g+y)*E,s[7]=0,s[8]=(m+w)*C,s[9]=(g-y)*C,s[10]=(1-(u+v))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Xi.set(s[0],s[1],s[2]).length();const o=Xi.set(s[4],s[5],s[6]).length(),l=Xi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),fn.copy(this);const c=1/a,h=1/o,d=1/l;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=d,fn.elements[9]*=d,fn.elements[10]*=d,t.setFromRotationMatrix(fn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Un,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===Un)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===rr)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Un,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s);let m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===Un)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===rr)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Xi=new U,fn=new Xe,nm=new U(0,0,0),im=new U(1,1,1),ai=new U,_r=new U,tn=new U,Yc=new Xe,$c=new ti;class Sn{constructor(e=0,t=0,n=0,s=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ae("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $c.setFromEuler(this),this.setFromQuaternion($c,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class Gu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sm=0;const Kc=new U,qi=new ti,Gn=new Xe,Mr=new U,Ds=new U,rm=new U,am=new ti,Jc=new U(1,0,0),Qc=new U(0,1,0),jc=new U(0,0,1),eh={type:"added"},om={type:"removed"},Zi={type:"childadded",child:null},Xa={type:"childremoved",child:null};class yt extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new U,t=new Sn,n=new ti,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xe},normalMatrix:{value:new Pe}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.multiply(qi),this}rotateOnWorldAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.premultiply(qi),this}rotateX(e){return this.rotateOnAxis(Jc,e)}rotateY(e){return this.rotateOnAxis(Qc,e)}rotateZ(e){return this.rotateOnAxis(jc,e)}translateOnAxis(e,t){return Kc.copy(e).applyQuaternion(this.quaternion),this.position.add(Kc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jc,e)}translateY(e){return this.translateOnAxis(Qc,e)}translateZ(e){return this.translateOnAxis(jc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Mr.copy(e):Mr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Ds,Mr,this.up):Gn.lookAt(Mr,Ds,this.up),this.quaternion.setFromRotationMatrix(Gn),s&&(Gn.extractRotation(s.matrixWorld),qi.setFromRotationMatrix(Gn),this.quaternion.premultiply(qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(eh),Zi.child=e,this.dispatchEvent(Zi),Zi.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(om),Xa.child=e,this.dispatchEvent(Xa),Xa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(eh),Zi.child=e,this.dispatchEvent(Zi),Zi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,e,rm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,am,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}yt.DEFAULT_UP=new U(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ri extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lm={type:"move"};class qa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(lm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ri;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Hu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},oi={h:0,s:0,l:0},yr={h:0,s:0,l:0};function Za(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Re{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,ze.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ze.workingColorSpace){if(e=$p(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Za(a,r,e+1/3),this.g=Za(a,r,e),this.b=Za(a,r,e-1/3)}return ze.colorSpaceToWorking(this,s),this}setStyle(e,t=Bt){function n(r){r!==void 0&&parseFloat(r)<1&&Ae("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ae("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ae("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){const n=Hu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ae("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jn(e.r),this.g=Jn(e.g),this.b=Jn(e.b),this}copyLinearToSRGB(e){return this.r=xs(e.r),this.g=xs(e.g),this.b=xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return ze.workingToColorSpace(Ut.copy(this),e),Math.round(Ve(Ut.r*255,0,255))*65536+Math.round(Ve(Ut.g*255,0,255))*256+Math.round(Ve(Ut.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.workingToColorSpace(Ut.copy(this),t);const n=Ut.r,s=Ut.g,r=Ut.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ze.workingColorSpace){return ze.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=Bt){ze.workingToColorSpace(Ut.copy(this),e);const t=Ut.r,n=Ut.g,s=Ut.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(oi),this.setHSL(oi.h+e,oi.s+t,oi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(oi),e.getHSL(yr);const n=za(oi.h,yr.h,t),s=za(oi.s,yr.s,t),r=za(oi.l,yr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new Re;Re.NAMES=Hu;class Ql{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Re(e),this.near=t,this.far=n}clone(){return new Ql(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ga extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const pn=new U,Hn=new U,Ya=new U,Wn=new U,Yi=new U,$i=new U,th=new U,$a=new U,Ka=new U,Ja=new U,Qa=new lt,ja=new lt,eo=new lt;class xn{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),pn.subVectors(e,t),s.cross(pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){pn.subVectors(s,t),Hn.subVectors(n,t),Ya.subVectors(e,t);const a=pn.dot(pn),o=pn.dot(Hn),l=pn.dot(Ya),c=Hn.dot(Hn),h=Hn.dot(Ya),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Wn.x),l.addScaledVector(a,Wn.y),l.addScaledVector(o,Wn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Qa.setScalar(0),ja.setScalar(0),eo.setScalar(0),Qa.fromBufferAttribute(e,t),ja.fromBufferAttribute(e,n),eo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Qa,r.x),a.addScaledVector(ja,r.y),a.addScaledVector(eo,r.z),a}static isFrontFacing(e,t,n,s){return pn.subVectors(n,t),Hn.subVectors(e,t),pn.cross(Hn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),pn.cross(Hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return xn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return xn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Yi.subVectors(s,n),$i.subVectors(r,n),$a.subVectors(e,n);const l=Yi.dot($a),c=$i.dot($a);if(l<=0&&c<=0)return t.copy(n);Ka.subVectors(e,s);const h=Yi.dot(Ka),d=$i.dot(Ka);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Yi,a);Ja.subVectors(e,r);const f=Yi.dot(Ja),m=$i.dot(Ja);if(m>=0&&f<=m)return t.copy(r);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector($i,o);const g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return th.subVectors(r,s),o=(d-h)/(d-h+(f-m)),t.copy(s).addScaledVector(th,o);const p=1/(g+v+u);return a=v*p,o=u*p,t.copy(n).addScaledVector(Yi,a).addScaledVector($i,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ui{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,mn):mn.fromBufferAttribute(r,a),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Sr.copy(n.boundingBox)),Sr.applyMatrix4(e.matrixWorld),this.union(Sr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ns),br.subVectors(this.max,Ns),Ki.subVectors(e.a,Ns),Ji.subVectors(e.b,Ns),Qi.subVectors(e.c,Ns),li.subVectors(Ji,Ki),ci.subVectors(Qi,Ji),xi.subVectors(Ki,Qi);let t=[0,-li.z,li.y,0,-ci.z,ci.y,0,-xi.z,xi.y,li.z,0,-li.x,ci.z,0,-ci.x,xi.z,0,-xi.x,-li.y,li.x,0,-ci.y,ci.x,0,-xi.y,xi.x,0];return!to(t,Ki,Ji,Qi,br)||(t=[1,0,0,0,1,0,0,0,1],!to(t,Ki,Ji,Qi,br))?!1:(Er.crossVectors(li,ci),t=[Er.x,Er.y,Er.z],to(t,Ki,Ji,Qi,br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Xn=[new U,new U,new U,new U,new U,new U,new U,new U],mn=new U,Sr=new Ui,Ki=new U,Ji=new U,Qi=new U,li=new U,ci=new U,xi=new U,Ns=new U,br=new U,Er=new U,_i=new U;function to(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){_i.fromArray(i,r);const o=s.x*Math.abs(_i.x)+s.y*Math.abs(_i.y)+s.z*Math.abs(_i.z),l=e.dot(_i),c=t.dot(_i),h=n.dot(_i);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const xt=new U,wr=new Ie;let cm=0;class jt extends Fi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vc,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)wr.fromBufferAttribute(this,t),wr.applyMatrix3(e),this.setXY(t,wr.x,wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ls(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ls(t,this.array)),t}setX(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ls(t,this.array)),t}setY(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ls(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ls(t,this.array)),t}setW(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),s=$t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),s=$t(s,this.array),r=$t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Wu extends jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Xu extends jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class at extends jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const hm=new Ui,Fs=new U,no=new U;class ur{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):hm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);const t=Fs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Fs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(no.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add(no)),this.expandByPoint(Fs.copy(e.center).sub(no))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let um=0;const cn=new Xe,io=new yt,ji=new U,nn=new Ui,Us=new Ui,Ct=new U;class Vt extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xp(e)?Xu:Wu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Pe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,n){return cn.makeTranslation(e,t,n),this.applyMatrix4(cn),this}scale(e,t,n){return cn.makeScale(e,t,n),this.applyMatrix4(cn),this}lookAt(e){return io.lookAt(e),io.updateMatrix(),this.applyMatrix4(io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new at(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ae("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Us.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(nn.min,Us.min),nn.expandByPoint(Ct),Ct.addVectors(nn.max,Us.max),nn.expandByPoint(Ct)):(nn.expandByPoint(Us.min),nn.expandByPoint(Us.max))}nn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ct.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ct));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ct.fromBufferAttribute(o,c),l&&(ji.fromBufferAttribute(e,c),Ct.add(ji)),s=Math.max(s,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new jt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new U,l[_]=new U;const c=new U,h=new U,d=new U,u=new Ie,f=new Ie,m=new Ie,v=new U,g=new U;function p(_,T,P){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,P),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,T),m.fromBufferAttribute(r,P),h.sub(c),d.sub(c),f.sub(u),m.sub(u);const R=1/(f.x*m.y-m.x*f.y);isFinite(R)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(R),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(R),o[_].add(v),o[T].add(v),o[P].add(v),l[_].add(g),l[T].add(g),l[P].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let _=0,T=y.length;_<T;++_){const P=y[_],R=P.start,D=P.count;for(let W=R,B=R+D;W<B;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const w=new U,M=new U,b=new U,E=new U;function C(_){b.fromBufferAttribute(s,_),E.copy(b);const T=o[_];w.copy(T),w.sub(b.multiplyScalar(b.dot(T))).normalize(),M.crossVectors(E,T);const R=M.dot(l[_])<0?-1:1;a.setXYZW(_,w.x,w.y,w.z,R)}for(let _=0,T=y.length;_<T;++_){const P=y[_],R=P.start,D=P.count;for(let W=R,B=R+D;W<B;W+=3)C(e.getX(W+0)),C(e.getX(W+1)),C(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,h=new U,d=new U;if(e)for(let u=0,f=e.count;u<f;u+=3){const m=e.getX(u+0),v=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)u[m++]=c[f++]}return new jt(u,h,d)}if(this.index===null)return Ae("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let dm=0;class As extends Fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=hr(),this.name="",this.type="Material",this.blending=gs,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uo,this.blendDst=nr,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ae(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ae(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==Qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Uo&&(n.blendSrc=this.blendSrc),this.blendDst!==nr&&(n.blendDst=this.blendDst),this.blendEquation!==$n&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Re().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ie().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ie().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const qn=new U,so=new U,Tr=new U,hi=new U,ro=new U,Ar=new U,ao=new U;class fm{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){so.copy(e).add(t).multiplyScalar(.5),Tr.copy(t).sub(e).normalize(),hi.copy(this.origin).sub(so);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Tr),o=hi.dot(this.direction),l=-hi.dot(Tr),c=hi.lengthSq(),h=Math.abs(1-a*a);let d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(so).addScaledVector(Tr,u),f}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),s=qn.dot(qn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,s,r){ro.subVectors(t,e),Ar.subVectors(n,e),ao.crossVectors(ro,Ar);let a=this.direction.dot(ao),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;hi.subVectors(this.origin,e);const l=o*this.direction.dot(Ar.crossVectors(hi,Ar));if(l<0)return null;const c=o*this.direction.dot(ro.cross(hi));if(c<0||l+c>a)return null;const h=-o*hi.dot(ao);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yn extends As{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const nh=new Xe,Mi=new fm,Cr=new ur,ih=new U,Rr=new U,Pr=new U,Ir=new U,oo=new U,Lr=new U,sh=new U,Dr=new U;class Qe extends yt{constructor(e=new Vt,t=new yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Lr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(oo.fromBufferAttribute(d,e),a?Lr.addScaledVector(oo,h):Lr.addScaledVector(oo.sub(t),h))}t.add(Lr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(r),Mi.copy(e.ray).recast(e.near),!(Cr.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(Cr,ih)===null||Mi.origin.distanceToSquared(ih)>(e.far-e.near)**2))&&(nh.copy(r).invert(),Mi.copy(e.ray).applyMatrix4(nh),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Mi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),w=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let M=y,b=w;M<b;M+=3){const E=o.getX(M),C=o.getX(M+1),_=o.getX(M+2);s=Nr(this,p,e,n,c,h,d,E,C,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const y=o.getX(g),w=o.getX(g+1),M=o.getX(g+2);s=Nr(this,a,e,n,c,h,d,y,w,M),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),w=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let M=y,b=w;M<b;M+=3){const E=M,C=M+1,_=M+2;s=Nr(this,p,e,n,c,h,d,E,C,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const y=g,w=g+1,M=g+2;s=Nr(this,a,e,n,c,h,d,y,w,M),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function pm(i,e,t,n,s,r,a,o){let l;if(e.side===qt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Qn,o),l===null)return null;Dr.copy(o),Dr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Dr);return c<t.near||c>t.far?null:{distance:c,point:Dr.clone(),object:i}}function Nr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Rr),i.getVertexPosition(l,Pr),i.getVertexPosition(c,Ir);const h=pm(i,e,t,n,Rr,Pr,Ir,sh);if(h){const d=new U;xn.getBarycoord(sh,Rr,Pr,Ir,d),s&&(h.uv=xn.getInterpolatedAttribute(s,o,l,c,d,new Ie)),r&&(h.uv1=xn.getInterpolatedAttribute(r,o,l,c,d,new Ie)),a&&(h.normal=xn.getInterpolatedAttribute(a,o,l,c,d,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new U,materialIndex:0};xn.getNormal(Rr,Pr,Ir,u.normal),h.face=u,h.barycoord=d}return h}class qu extends zt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Lt,h=Lt,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ar extends jt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const es=new Xe,rh=new Xe,Fr=[],ah=new Ui,mm=new Xe,Os=new Qe,Bs=new ur;class or extends Qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ar(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,mm)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,es),ah.copy(e.boundingBox).applyMatrix4(es),this.boundingBox.union(ah)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ur),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,es),Bs.copy(e.boundingSphere).applyMatrix4(es),this.boundingSphere.union(Bs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Os.geometry=this.geometry,Os.material=this.material,Os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bs.copy(this.boundingSphere),Bs.applyMatrix4(n),e.ray.intersectsSphere(Bs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,es),rh.multiplyMatrices(n,es),Os.matrixWorld=rh,Os.raycast(e,Fr);for(let a=0,o=Fr.length;a<o;a++){const l=Fr[a];l.instanceId=r,l.object=this,t.push(l)}Fr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ar(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new qu(new Float32Array(s*this.count),s,this.count,Xl,_n));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const lo=new U,gm=new U,vm=new Pe;class Ei{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=lo.subVectors(n,t).cross(gm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(lo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vm.getNormalMatrix(e),s=this.coplanarPoint(lo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new ur,xm=new Ie(.5,.5),Ur=new U;class jl{constructor(e=new Ei,t=new Ei,n=new Ei,s=new Ei,r=new Ei,a=new Ei){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Un,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],v=r[9],g=r[10],p=r[11],y=r[12],w=r[13],M=r[14],b=r[15];if(s[0].setComponents(c-a,f-h,p-m,b-y).normalize(),s[1].setComponents(c+a,f+h,p+m,b+y).normalize(),s[2].setComponents(c+o,f+d,p+v,b+w).normalize(),s[3].setComponents(c-o,f-d,p-v,b-w).normalize(),n)s[4].setComponents(l,u,g,M).normalize(),s[5].setComponents(c-l,f-u,p-g,b-M).normalize();else if(s[4].setComponents(c-l,f-u,p-g,b-M).normalize(),t===Un)s[5].setComponents(c+l,f+u,p+g,b+M).normalize();else if(t===rr)s[5].setComponents(l,u,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(e){yi.center.set(0,0,0);const t=xm.distanceTo(e.center);return yi.radius=.7071067811865476+t,yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ur.x=s.normal.x>0?e.max.x:e.min.x,Ur.y=s.normal.y>0?e.max.y:e.min.y,Ur.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zu extends zt{constructor(e=[],t=Ii,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ec extends zt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ss extends zt{constructor(e,t,n=Vn,s,r,a,o=Lt,l=Lt,c,h=ei,d=1){if(h!==ei&&h!==Ci)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Jl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class _m extends Ss{constructor(e,t=Vn,n=Ii,s,r,a=Lt,o=Lt,l,c=ei){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Yu extends zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class _t extends Vt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(d,2));function m(v,g,p,y,w,M,b,E,C,_,T){const P=M/C,R=b/_,D=M/2,W=b/2,B=E/2,N=C+1,X=_+1;let k=0,Y=0;const j=new U;for(let ne=0;ne<X;ne++){const pe=ne*R-W;for(let ve=0;ve<N;ve++){const qe=ve*P-D;j[v]=qe*y,j[g]=pe*w,j[p]=B,c.push(j.x,j.y,j.z),j[v]=0,j[g]=0,j[p]=E>0?1:-1,h.push(j.x,j.y,j.z),d.push(ve/C),d.push(1-ne/_),k+=1}}for(let ne=0;ne<_;ne++)for(let pe=0;pe<C;pe++){const ve=u+pe+N*ne,qe=u+pe+N*(ne+1),ct=u+(pe+1)+N*(ne+1),Ze=u+(pe+1)+N*ne;l.push(ve,qe,Ze),l.push(qe,ct,Ze),Y+=6}o.addGroup(f,Y,T),f+=Y,u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _t(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Rt extends Vt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let m=0;const v=[],g=n/2;let p=0;y(),a===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new at(d,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(f,2));function y(){const M=new U,b=new U;let E=0;const C=(t-e)/n;for(let _=0;_<=r;_++){const T=[],P=_/r,R=P*(t-e)+e;for(let D=0;D<=s;D++){const W=D/s,B=W*l+o,N=Math.sin(B),X=Math.cos(B);b.x=R*N,b.y=-P*n+g,b.z=R*X,d.push(b.x,b.y,b.z),M.set(N,C,X).normalize(),u.push(M.x,M.y,M.z),f.push(W,1-P),T.push(m++)}v.push(T)}for(let _=0;_<s;_++)for(let T=0;T<r;T++){const P=v[T][_],R=v[T+1][_],D=v[T+1][_+1],W=v[T][_+1];(e>0||T!==0)&&(h.push(P,R,W),E+=3),(t>0||T!==r-1)&&(h.push(R,D,W),E+=3)}c.addGroup(p,E,0),p+=E}function w(M){const b=m,E=new Ie,C=new U;let _=0;const T=M===!0?e:t,P=M===!0?1:-1;for(let D=1;D<=s;D++)d.push(0,g*P,0),u.push(0,P,0),f.push(.5,.5),m++;const R=m;for(let D=0;D<=s;D++){const B=D/s*l+o,N=Math.cos(B),X=Math.sin(B);C.x=T*X,C.y=g*P,C.z=T*N,d.push(C.x,C.y,C.z),u.push(0,P,0),E.x=N*.5+.5,E.y=X*.5*P+.5,f.push(E.x,E.y),m++}for(let D=0;D<s;D++){const W=b+D,B=R+D;M===!0?h.push(B,B+1,W):h.push(B+1,B,W),_+=3}c.addGroup(p,_,M===!0?1:2),p+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dr extends Vt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const y=p*u-a;for(let w=0;w<c;w++){const M=w*d-r;m.push(M,-y,0),v.push(0,0,1),g.push(w/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const w=y+c*p,M=y+c*(p+1),b=y+1+c*(p+1),E=y+1+c*p;f.push(w,M,E),f.push(M,b,E)}this.setIndex(f),this.setAttribute("position",new at(m,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dr(e.width,e.height,e.widthSegments,e.heightSegments)}}class pi extends Vt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new U,u=new U,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const y=[],w=p/n,M=a+w*o,b=e*Math.cos(M),E=Math.sqrt(e*e-b*b);let C=0;p===0&&a===0?C=.5/t:p===n&&l===Math.PI&&(C=-.5/t);for(let _=0;_<=t;_++){const T=_/t,P=s+T*r;d.x=-E*Math.cos(P),d.y=b,d.z=E*Math.sin(P),m.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(T+C,1-w),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const w=h[p][y+1],M=h[p][y],b=h[p+1][y],E=h[p+1][y+1];(p!==0||a>0)&&f.push(w,M,E),(p!==n-1||l<Math.PI)&&f.push(M,b,E)}this.setIndex(f),this.setAttribute("position",new at(m,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class wa extends Vt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],d=[],u=new U,f=new U,m=new U;for(let v=0;v<=n;v++){const g=a+v/n*o;for(let p=0;p<=s;p++){const y=p/s*r;f.x=(e+t*Math.cos(g))*Math.cos(y),f.y=(e+t*Math.cos(g))*Math.sin(y),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),m.subVectors(f,u).normalize(),h.push(m.x,m.y,m.z),d.push(p/s),d.push(v/n)}}for(let v=1;v<=n;v++)for(let g=1;g<=s;g++){const p=(s+1)*v+g-1,y=(s+1)*(v-1)+g-1,w=(s+1)*(v-1)+g,M=(s+1)*v+g;l.push(p,y,M),l.push(y,w,M)}this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wa(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function bs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(oh(s))s.isRenderTargetTexture?(Ae("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(oh(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Gt(i){const e={};for(let t=0;t<i.length;t++){const n=bs(i[t]);for(const s in n)e[s]=n[s]}return e}function oh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Mm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function $u(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}const ym={clone:bs,merge:Gt};var Sm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends As{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sm,this.fragmentShader=bm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bs(e.uniforms),this.uniformsGroups=Mm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Re().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ie().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new lt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Pe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Xe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Em extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Et extends As{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=da,this.normalScale=new Ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wm extends As{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=da,this.normalScale=new Ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=zl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tm extends As{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Op,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Am extends As{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class tc extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class lh extends tc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const co=new Xe,ch=new U,hh=new U;class Ku{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ie(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jl,this._frameExtents=new Ie(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ch.setFromMatrixPosition(e.matrixWorld),t.position.copy(ch),hh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hh),t.updateMatrixWorld(),co.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(co,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===rr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(co)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Or=new U,Br=new ti,Tn=new U;class Ju extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Or,Br,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Or,Br,Tn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Or,Br,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Or,Br,Tn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ui=new U,uh=new Ie,dh=new Ie;class Jt extends Ju{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ka*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yl*2*Math.atan(Math.tan(ka*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ui.x,ui.y).multiplyScalar(-e/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-e/ui.z)}getViewSize(e,t){return this.getViewBounds(e,uh,dh),t.subVectors(dh,uh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ka*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Cm extends Ku{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}}class nc extends tc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Cm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Ta extends Ju{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Rm extends Ku{constructor(){super(new Ta(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fh extends tc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Rm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Pm extends Vt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const ts=-90,ns=1;class Im extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Jt(ts,ns,e,t);s.layers=this.layers,this.add(s);const r=new Jt(ts,ns,e,t);r.layers=this.layers,this.add(r);const a=new Jt(ts,ns,e,t);a.layers=this.layers,this.add(a);const o=new Jt(ts,ns,e,t);o.layers=this.layers,this.add(o);const l=new Jt(ts,ns,e,t);l.layers=this.layers,this.add(l);const c=new Jt(ts,ns,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Lm extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Qu{static{Qu.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}}function ph(i,e,t,n){const s=Dm(n);switch(t){case Bu:return i*e;case Xl:return i*e/s.components*s.byteLength;case ql:return i*e/s.components*s.byteLength;case Di:return i*e*2/s.components*s.byteLength;case Zl:return i*e*2/s.components*s.byteLength;case ku:return i*e*3/s.components*s.byteLength;case un:return i*e*4/s.components*s.byteLength;case Yl:return i*e*4/s.components*s.byteLength;case jr:case ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ta:case na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qo:case Yo:return Math.max(i,16)*Math.max(e,8)/4;case Xo:case Zo:return Math.max(i,8)*Math.max(e,8)/2;case $o:case Ko:case Qo:case jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Jo:case ha:case el:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case tl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case nl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case il:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case sl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case rl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case al:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ol:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ll:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case cl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case hl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ul:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case dl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case fl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case pl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ml:case gl:case vl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case xl:case _l:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ua:case Ml:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dm(i){switch(i){case Qt:case Nu:return{byteLength:1,components:1};case ir:case Fu:case jn:return{byteLength:2,components:1};case Hl:case Wl:return{byteLength:2,components:4};case Vn:case Gl:case _n:return{byteLength:4,components:1};case Uu:case Ou:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kl}}));typeof window<"u"&&(window.__THREE__?Ae("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kl);function ju(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Nm(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){const m=d[u],v=d[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){const v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Fm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Um=`#ifdef USE_ALPHAHASH
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
#endif`,Om=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,km=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vm=`#ifdef USE_AOMAP
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
#endif`,Gm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hm=`#ifdef USE_BATCHING
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
#endif`,Wm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ym=`#ifdef USE_IRIDESCENCE
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
#endif`,$m=`#ifdef USE_BUMPMAP
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
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,e0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,t0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,n0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,i0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,s0=`#define PI 3.141592653589793
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
} // validated`,r0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,a0=`vec3 transformedNormal = objectNormal;
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
#endif`,o0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,l0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,c0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,h0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,u0="gl_FragColor = linearToOutputTexel( gl_FragColor );",d0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,f0=`#ifdef USE_ENVMAP
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
#endif`,p0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,m0=`#ifdef USE_ENVMAP
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
#endif`,g0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,v0=`#ifdef USE_ENVMAP
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
#endif`,x0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,M0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,y0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,S0=`#ifdef USE_GRADIENTMAP
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
}`,b0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,w0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,T0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,A0=`#ifdef USE_ENVMAP
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
#endif`,C0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,R0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,P0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,L0=`PhysicalMaterial material;
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
#endif`,D0=`uniform sampler2D dfgLUT;
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
}`,N0=`
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
#endif`,F0=`#if defined( RE_IndirectDiffuse )
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
#endif`,U0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,O0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,B0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,k0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,G0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,H0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,W0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,X0=`#if defined( USE_POINTS_UV )
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
#endif`,q0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Z0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Y0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,K0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J0=`#ifdef USE_MORPHTARGETS
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
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,eg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sg=`#ifdef USE_NORMALMAP
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
#endif`,rg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ug=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_g=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mg=`float getShadowMask() {
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
}`,yg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sg=`#ifdef USE_SKINNING
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
#endif`,bg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Eg=`#ifdef USE_SKINNING
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
#endif`,wg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ag=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rg=`#ifdef USE_TRANSMISSION
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
#endif`,Pg=`#ifdef USE_TRANSMISSION
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
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ng=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ug=`uniform sampler2D t2D;
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
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`#include <common>
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
}`,Gg=`#if DEPTH_PACKING == 3200
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
}`,Hg=`#define DISTANCE
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
}`,Wg=`#define DISTANCE
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
}`,Xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`uniform float scale;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,$g=`#include <common>
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
}`,Kg=`uniform vec3 diffuse;
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
}`,Jg=`#define LAMBERT
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
}`,Qg=`#define LAMBERT
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
}`,jg=`#define MATCAP
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
}`,ev=`#define MATCAP
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
}`,tv=`#define NORMAL
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
}`,nv=`#define NORMAL
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
}`,iv=`#define PHONG
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
}`,sv=`#define PHONG
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
}`,rv=`#define STANDARD
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
}`,av=`#define STANDARD
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
}`,ov=`#define TOON
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
}`,lv=`#define TOON
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
}`,cv=`uniform float size;
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
}`,hv=`uniform vec3 diffuse;
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
}`,uv=`#include <common>
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
}`,dv=`uniform vec3 color;
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
}`,fv=`uniform float rotation;
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
}`,pv=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:Fm,alphahash_pars_fragment:Um,alphamap_fragment:Om,alphamap_pars_fragment:Bm,alphatest_fragment:km,alphatest_pars_fragment:zm,aomap_fragment:Vm,aomap_pars_fragment:Gm,batching_pars_vertex:Hm,batching_vertex:Wm,begin_vertex:Xm,beginnormal_vertex:qm,bsdfs:Zm,iridescence_fragment:Ym,bumpmap_pars_fragment:$m,clipping_planes_fragment:Km,clipping_planes_pars_fragment:Jm,clipping_planes_pars_vertex:Qm,clipping_planes_vertex:jm,color_fragment:e0,color_pars_fragment:t0,color_pars_vertex:n0,color_vertex:i0,common:s0,cube_uv_reflection_fragment:r0,defaultnormal_vertex:a0,displacementmap_pars_vertex:o0,displacementmap_vertex:l0,emissivemap_fragment:c0,emissivemap_pars_fragment:h0,colorspace_fragment:u0,colorspace_pars_fragment:d0,envmap_fragment:f0,envmap_common_pars_fragment:p0,envmap_pars_fragment:m0,envmap_pars_vertex:g0,envmap_physical_pars_fragment:A0,envmap_vertex:v0,fog_vertex:x0,fog_pars_vertex:_0,fog_fragment:M0,fog_pars_fragment:y0,gradientmap_pars_fragment:S0,lightmap_pars_fragment:b0,lights_lambert_fragment:E0,lights_lambert_pars_fragment:w0,lights_pars_begin:T0,lights_toon_fragment:C0,lights_toon_pars_fragment:R0,lights_phong_fragment:P0,lights_phong_pars_fragment:I0,lights_physical_fragment:L0,lights_physical_pars_fragment:D0,lights_fragment_begin:N0,lights_fragment_maps:F0,lights_fragment_end:U0,lightprobes_pars_fragment:O0,logdepthbuf_fragment:B0,logdepthbuf_pars_fragment:k0,logdepthbuf_pars_vertex:z0,logdepthbuf_vertex:V0,map_fragment:G0,map_pars_fragment:H0,map_particle_fragment:W0,map_particle_pars_fragment:X0,metalnessmap_fragment:q0,metalnessmap_pars_fragment:Z0,morphinstance_vertex:Y0,morphcolor_vertex:$0,morphnormal_vertex:K0,morphtarget_pars_vertex:J0,morphtarget_vertex:Q0,normal_fragment_begin:j0,normal_fragment_maps:eg,normal_pars_fragment:tg,normal_pars_vertex:ng,normal_vertex:ig,normalmap_pars_fragment:sg,clearcoat_normal_fragment_begin:rg,clearcoat_normal_fragment_maps:ag,clearcoat_pars_fragment:og,iridescence_pars_fragment:lg,opaque_fragment:cg,packing:hg,premultiplied_alpha_fragment:ug,project_vertex:dg,dithering_fragment:fg,dithering_pars_fragment:pg,roughnessmap_fragment:mg,roughnessmap_pars_fragment:gg,shadowmap_pars_fragment:vg,shadowmap_pars_vertex:xg,shadowmap_vertex:_g,shadowmask_pars_fragment:Mg,skinbase_vertex:yg,skinning_pars_vertex:Sg,skinning_vertex:bg,skinnormal_vertex:Eg,specularmap_fragment:wg,specularmap_pars_fragment:Tg,tonemapping_fragment:Ag,tonemapping_pars_fragment:Cg,transmission_fragment:Rg,transmission_pars_fragment:Pg,uv_pars_fragment:Ig,uv_pars_vertex:Lg,uv_vertex:Dg,worldpos_vertex:Ng,background_vert:Fg,background_frag:Ug,backgroundCube_vert:Og,backgroundCube_frag:Bg,cube_vert:kg,cube_frag:zg,depth_vert:Vg,depth_frag:Gg,distance_vert:Hg,distance_frag:Wg,equirect_vert:Xg,equirect_frag:qg,linedashed_vert:Zg,linedashed_frag:Yg,meshbasic_vert:$g,meshbasic_frag:Kg,meshlambert_vert:Jg,meshlambert_frag:Qg,meshmatcap_vert:jg,meshmatcap_frag:ev,meshnormal_vert:tv,meshnormal_frag:nv,meshphong_vert:iv,meshphong_frag:sv,meshphysical_vert:rv,meshphysical_frag:av,meshtoon_vert:ov,meshtoon_frag:lv,points_vert:cv,points_frag:hv,shadow_vert:uv,shadow_frag:dv,sprite_vert:fv,sprite_frag:pv},he={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pe},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pe}},envmap:{envMap:{value:null},envMapRotation:{value:new Pe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pe},normalScale:{value:new Ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0},uvTransform:{value:new Pe}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new Ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pe},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0}}},Rn={basic:{uniforms:Gt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Gt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Re(0)},envMapIntensity:{value:1}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Gt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Gt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Gt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Re(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Gt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Gt([he.points,he.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Gt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Gt([he.common,he.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Gt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Gt([he.sprite,he.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Pe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pe}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distance:{uniforms:Gt([he.common,he.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distance_vert,fragmentShader:Fe.distance_frag},shadow:{uniforms:Gt([he.lights,he.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};Rn.physical={uniforms:Gt([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pe},clearcoatNormalScale:{value:new Ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pe},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pe},transmissionSamplerSize:{value:new Ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pe},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pe},anisotropyVector:{value:new Ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pe}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const kr={r:0,b:0,g:0},mv=new Xe,ed=new Pe;ed.set(-1,0,0,0,1,0,0,0,1);function gv(i,e,t,n,s,r){const a=new Re(0);let o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){const M=y.backgroundBlurriness>0;w=e.get(w,M)}return w}function m(y){let w=!1;const M=f(y);M===null?g(a,o):M&&M.isColor&&(g(M,1),w=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(y,w){const M=f(w);M&&(M.isCubeTexture||M.mapping===Ea)?(c===void 0&&(c=new Qe(new _t(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:bs(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(mv.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ed),c.material.toneMapped=ze.getTransfer(M.colorSpace)!==Ke,(h!==M||d!==M.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Qe(new dr(2,2),new dn({name:"BackgroundMaterial",uniforms:bs(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ze.getTransfer(M.colorSpace)!==Ke,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,w){y.getRGB(kr,$u(i)),t.buffers.color.setClear(kr.r,kr.g,kr.b,w,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,g(a,o)},render:m,addToRenderList:v,dispose:p}}function vv(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(R,D,W,B,N){let X=!1;const k=d(R,B,W,D);r!==k&&(r=k,c(r.object)),X=f(R,B,W,N),X&&m(R,B,W,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,M(R,D,W,B),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function d(R,D,W,B){const N=B.wireframe===!0;let X=n[D.id];X===void 0&&(X={},n[D.id]=X);const k=R.isInstancedMesh===!0?R.id:0;let Y=X[k];Y===void 0&&(Y={},X[k]=Y);let j=Y[W.id];j===void 0&&(j={},Y[W.id]=j);let ne=j[N];return ne===void 0&&(ne=u(l()),j[N]=ne),ne}function u(R){const D=[],W=[],B=[];for(let N=0;N<t;N++)D[N]=0,W[N]=0,B[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:W,attributeDivisors:B,object:R,attributes:{},index:null}}function f(R,D,W,B){const N=r.attributes,X=D.attributes;let k=0;const Y=W.getAttributes();for(const j in Y)if(Y[j].location>=0){const pe=N[j];let ve=X[j];if(ve===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(ve=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(ve=R.instanceColor)),pe===void 0||pe.attribute!==ve||ve&&pe.data!==ve.data)return!0;k++}return r.attributesNum!==k||r.index!==B}function m(R,D,W,B){const N={},X=D.attributes;let k=0;const Y=W.getAttributes();for(const j in Y)if(Y[j].location>=0){let pe=X[j];pe===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(pe=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(pe=R.instanceColor));const ve={};ve.attribute=pe,pe&&pe.data&&(ve.data=pe.data),N[j]=ve,k++}r.attributes=N,r.attributesNum=k,r.index=B}function v(){const R=r.newAttributes;for(let D=0,W=R.length;D<W;D++)R[D]=0}function g(R){p(R,0)}function p(R,D){const W=r.newAttributes,B=r.enabledAttributes,N=r.attributeDivisors;W[R]=1,B[R]===0&&(i.enableVertexAttribArray(R),B[R]=1),N[R]!==D&&(i.vertexAttribDivisor(R,D),N[R]=D)}function y(){const R=r.newAttributes,D=r.enabledAttributes;for(let W=0,B=D.length;W<B;W++)D[W]!==R[W]&&(i.disableVertexAttribArray(W),D[W]=0)}function w(R,D,W,B,N,X,k){k===!0?i.vertexAttribIPointer(R,D,W,N,X):i.vertexAttribPointer(R,D,W,B,N,X)}function M(R,D,W,B){v();const N=B.attributes,X=W.getAttributes(),k=D.defaultAttributeValues;for(const Y in X){const j=X[Y];if(j.location>=0){let ne=N[Y];if(ne===void 0&&(Y==="instanceMatrix"&&R.instanceMatrix&&(ne=R.instanceMatrix),Y==="instanceColor"&&R.instanceColor&&(ne=R.instanceColor)),ne!==void 0){const pe=ne.normalized,ve=ne.itemSize,qe=e.get(ne);if(qe===void 0)continue;const ct=qe.buffer,Ze=qe.type,J=qe.bytesPerElement,se=Ze===i.INT||Ze===i.UNSIGNED_INT||ne.gpuType===Gl;if(ne.isInterleavedBufferAttribute){const ee=ne.data,Ce=ee.stride,Le=ne.offset;if(ee.isInstancedInterleavedBuffer){for(let we=0;we<j.locationSize;we++)p(j.location+we,ee.meshPerAttribute);R.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let we=0;we<j.locationSize;we++)g(j.location+we);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let we=0;we<j.locationSize;we++)w(j.location+we,ve/j.locationSize,Ze,pe,Ce*J,(Le+ve/j.locationSize*we)*J,se)}else{if(ne.isInstancedBufferAttribute){for(let ee=0;ee<j.locationSize;ee++)p(j.location+ee,ne.meshPerAttribute);R.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ee=0;ee<j.locationSize;ee++)g(j.location+ee);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let ee=0;ee<j.locationSize;ee++)w(j.location+ee,ve/j.locationSize,Ze,pe,ve*J,ve/j.locationSize*ee*J,se)}}else if(k!==void 0){const pe=k[Y];if(pe!==void 0)switch(pe.length){case 2:i.vertexAttrib2fv(j.location,pe);break;case 3:i.vertexAttrib3fv(j.location,pe);break;case 4:i.vertexAttrib4fv(j.location,pe);break;default:i.vertexAttrib1fv(j.location,pe)}}}}y()}function b(){T();for(const R in n){const D=n[R];for(const W in D){const B=D[W];for(const N in B){const X=B[N];for(const k in X)h(X[k].object),delete X[k];delete B[N]}}delete n[R]}}function E(R){if(n[R.id]===void 0)return;const D=n[R.id];for(const W in D){const B=D[W];for(const N in B){const X=B[N];for(const k in X)h(X[k].object),delete X[k];delete B[N]}}delete n[R.id]}function C(R){for(const D in n){const W=n[D];for(const B in W){const N=W[B];if(N[R.id]===void 0)continue;const X=N[R.id];for(const k in X)h(X[k].object),delete X[k];delete N[R.id]}}}function _(R){for(const D in n){const W=n[D],B=R.isInstancedMesh===!0?R.id:0,N=W[B];if(N!==void 0){for(const X in N){const k=N[X];for(const Y in k)h(k[Y].object),delete k[Y];delete N[X]}delete W[B],Object.keys(W).length===0&&delete n[D]}}}function T(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:y}}function xv(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function _v(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==un&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const _=C===jn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Qt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==_n&&!_)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Ae("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ae("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:M,maxSamples:b,samples:E}}function Mv(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ei,o=new Pe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const m=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const y=r?0:n,w=y*4;let M=p.clippingState||null;l.value=M,M=h(m,u,w,f);for(let b=0;b!==w;++b)M[b]=t[b];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,m){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let w=0,M=f;w!==v;++w,M+=4)a.copy(d[w]).applyMatrix4(y,o),a.normal.toArray(g,M),g[M+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}const fi=4,mh=[.125,.215,.35,.446,.526,.582],wi=20,yv=256,ks=new Ta,gh=new Re;let ho=null,uo=0,fo=0,po=!1;const Sv=new U;class Sl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Sv}=r;ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_h(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ho,uo,fo),this._renderer.xr.enabled=po,e.scissorTest=!1,is(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ii||e.mapping===ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Mt,minFilter:Mt,generateMipmaps:!1,type:jn,format:un,colorSpace:fa,depthBuffer:!1},s=vh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=bv(r)),this._blurMaterial=wv(r,e,t),this._ggxMaterial=Ev(r,e,t)}return s}_compileMaterial(e){const t=new Qe(new Vt,e);this._renderer.compile(t,ks)}_sceneToCubeUV(e,t,n,s,r){const l=new Jt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(gh),d.toneMapping=Bn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qe(new _t,new yn({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let p=!1;const y=e.background;y?y.isColor&&(g.color.copy(y),e.background=null,p=!0):(g.color.copy(gh),p=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const b=this._cubeSize;is(s,M*b,w>2?b:0,b,b),d.setRenderTarget(s),p&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ii||e.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_h()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;is(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ks)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:m}=this,v=this._sizeLods[n],g=3*v*(n>m-fi?n-m+fi:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,is(r,g,p,3*v,2*v),s.setRenderTarget(r),s.render(o,ks),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,is(e,g,p,3*v,2*v),s.setRenderTarget(e),s.render(o,ks)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&We("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=c;const u=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*wi-1),v=r/m,g=isFinite(r)?1+Math.floor(h*v):wi;g>wi&&Ae(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${wi}`);const p=[];let y=0;for(let C=0;C<wi;++C){const _=C/v,T=Math.exp(-_*_/2);p.push(T),C===0?y+=T:C<g&&(y+=2*T)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:w}=this;u.dTheta.value=m,u.mipInt.value=w-n;const M=this._sizeLods[s],b=3*M*(s>w-fi?s-w+fi:0),E=4*(this._cubeSize-M);is(t,b,E,3*M,2*M),l.setRenderTarget(t),l.render(d,ks)}}function bv(i){const e=[],t=[],n=[];let s=i;const r=i-fi+1+mh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-fi?l=mh[a-i+fi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,v=3,g=2,p=1,y=new Float32Array(v*m*f),w=new Float32Array(g*m*f),M=new Float32Array(p*m*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,_=E>2?0:-1,T=[C,_,0,C+2/3,_,0,C+2/3,_+1,0,C,_,0,C+2/3,_+1,0,C,_+1,0];y.set(T,v*m*E),w.set(u,g*m*E);const P=[E,E,E,E,E,E];M.set(P,p*m*E)}const b=new Vt;b.setAttribute("position",new jt(y,v)),b.setAttribute("uv",new jt(w,g)),b.setAttribute("faceIndex",new jt(M,p)),n.push(new Qe(b,null)),s>fi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function vh(i,e,t){const n=new Mn(i,e,t);return n.texture.mapping=Ea,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function is(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ev(i,e,t){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Aa(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function wv(i,e,t){const n=new Float32Array(wi),s=new U(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Aa(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function xh(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Aa(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function _h(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Aa(){return`

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
	`}class td extends Mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Zu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new _t(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:Kn});r.uniforms.tEquirect.value=t;const a=new Qe(s,r),o=t.minFilter;return t.minFilter===Fn&&(t.minFilter=Mt),new Im(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function Tv(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===Ua||f===Oa)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const v=new td(m.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,m=f===Ua||f===Oa,v=f===Ii||f===ys;if(m||v){let g=t.get(u);const p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Sl(i)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const y=u.image;return m&&y&&y.height>0||v&&y&&l(y)?(n===null&&(n=new Sl(i)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===Ua?u.mapping=Ii:f===Oa&&(u.mapping=ys),u}function l(u){let f=0;const m=6;for(let v=0;v<m;v++)u[v]!==void 0&&f++;return f===m}function c(u){const f=u.target;f.removeEventListener("dispose",c);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Av(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&vs("WebGLRenderer: "+n+" extension not supported."),s}}}function Cv(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,m=d.attributes.position;let v=0;if(m===void 0)return;if(f!==null){const y=f.array;v=f.version;for(let w=0,M=y.length;w<M;w+=3){const b=y[w+0],E=y[w+1],C=y[w+2];u.push(b,E,E,C,C,b)}}else{const y=m.array;v=m.version;for(let w=0,M=y.length/3-1;w<M;w+=3){const b=w+0,E=w+1,C=w+2;u.push(b,E,E,C,C,b)}}const g=new(m.count>=65535?Xu:Wu)(u,1);g.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Rv(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let v=0;for(let g=0;g<f;g++)v+=u[g];t.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Pv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:We("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Iv(i,e,t){const n=new WeakMap,s=new lt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let P=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",P)};var f=P;u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let M=0;m===!0&&(M=1),v===!0&&(M=2),g===!0&&(M=3);let b=o.attributes.position.count*M,E=1;b>e.maxTextureSize&&(E=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const C=new Float32Array(b*E*4*d),_=new Vu(C,b,E,d);_.type=_n,_.needsUpdate=!0;const T=M*4;for(let R=0;R<d;R++){const D=p[R],W=y[R],B=w[R],N=b*E*4*R;for(let X=0;X<D.count;X++){const k=X*T;m===!0&&(s.fromBufferAttribute(D,X),C[N+k+0]=s.x,C[N+k+1]=s.y,C[N+k+2]=s.z,C[N+k+3]=0),v===!0&&(s.fromBufferAttribute(W,X),C[N+k+4]=s.x,C[N+k+5]=s.y,C[N+k+6]=s.z,C[N+k+7]=0),g===!0&&(s.fromBufferAttribute(B,X),C[N+k+8]=s.x,C[N+k+9]=s.y,C[N+k+10]=s.z,C[N+k+11]=B.itemSize===4?s.w:1)}}u={count:d,texture:_,size:new Ie(b,E)},n.set(o,u),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Lv(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const Dv={[Au]:"LINEAR_TONE_MAPPING",[Cu]:"REINHARD_TONE_MAPPING",[Ru]:"CINEON_TONE_MAPPING",[Vl]:"ACES_FILMIC_TONE_MAPPING",[Iu]:"AGX_TONE_MAPPING",[Lu]:"NEUTRAL_TONE_MAPPING",[Pu]:"CUSTOM_TONE_MAPPING"};function Nv(i,e,t,n,s,r){const a=new Mn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Ss(e,t):void 0}),o=new Mn(e,t,{type:jn,depthBuffer:!1,stencilBuffer:!1}),l=new Vt;l.setAttribute("position",new at([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new at([0,2,0,0,2,0],2));const c=new Em({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Qe(l,c),d=new Ta(-1,1,1,-1,0,1);let u=null,f=null,m=!1,v,g=null,p=[],y=!1;this.setSize=function(w,M){a.setSize(w,M),o.setSize(w,M);for(let b=0;b<p.length;b++){const E=p[b];E.setSize&&E.setSize(w,M)}},this.setEffects=function(w){p=w,y=p.length>0&&p[0].isRenderPass===!0;const M=a.width,b=a.height;for(let E=0;E<p.length;E++){const C=p[E];C.setSize&&C.setSize(M,b)}},this.begin=function(w,M){if(m||w.toneMapping===Bn&&p.length===0)return!1;if(g=M,M!==null){const b=M.width,E=M.height;(a.width!==b||a.height!==E)&&this.setSize(b,E)}return y===!1&&w.setRenderTarget(a),v=w.toneMapping,w.toneMapping=Bn,!0},this.hasRenderPass=function(){return y},this.end=function(w,M){w.toneMapping=v,m=!0;let b=a,E=o;for(let C=0;C<p.length;C++){const _=p[C];if(_.enabled!==!1&&(_.render(w,E,b,M),_.needsSwap!==!1)){const T=b;b=E,E=T}}if(u!==w.outputColorSpace||f!==w.toneMapping){u=w.outputColorSpace,f=w.toneMapping,c.defines={},ze.getTransfer(u)===Ke&&(c.defines.SRGB_TRANSFER="");const C=Dv[f];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=b.texture,w.setRenderTarget(g),w.render(h,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const nd=new zt,bl=new Ss(1,1),id=new Vu,sd=new tm,rd=new Zu,Mh=[],yh=[],Sh=new Float32Array(16),bh=new Float32Array(9),Eh=new Float32Array(4);function Cs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Mh[s];if(r===void 0&&(r=new Float32Array(s),Mh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ca(i,e){let t=yh[e];t===void 0&&(t=new Int32Array(e),yh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Fv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Uv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function Ov(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function Bv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function kv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,n))return;Eh.set(n),i.uniformMatrix2fv(this.addr,!1,Eh),Tt(t,n)}}function zv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,n))return;bh.set(n),i.uniformMatrix3fv(this.addr,!1,bh),Tt(t,n)}}function Vv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,n))return;Sh.set(n),i.uniformMatrix4fv(this.addr,!1,Sh),Tt(t,n)}}function Gv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Hv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function Wv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function Xv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function qv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function Yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function $v(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function Kv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(bl.compareFunction=t.isReversedDepthBuffer()?Kl:$l,r=bl):r=nd,t.setTexture2D(e||r,s)}function Jv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||sd,s)}function Qv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||rd,s)}function jv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||id,s)}function ex(i){switch(i){case 5126:return Fv;case 35664:return Uv;case 35665:return Ov;case 35666:return Bv;case 35674:return kv;case 35675:return zv;case 35676:return Vv;case 5124:case 35670:return Gv;case 35667:case 35671:return Hv;case 35668:case 35672:return Wv;case 35669:case 35673:return Xv;case 5125:return qv;case 36294:return Zv;case 36295:return Yv;case 36296:return $v;case 35678:case 36198:case 36298:case 36306:case 35682:return Kv;case 35679:case 36299:case 36307:return Jv;case 35680:case 36300:case 36308:case 36293:return Qv;case 36289:case 36303:case 36311:case 36292:return jv}}function tx(i,e){i.uniform1fv(this.addr,e)}function nx(i,e){const t=Cs(e,this.size,2);i.uniform2fv(this.addr,t)}function ix(i,e){const t=Cs(e,this.size,3);i.uniform3fv(this.addr,t)}function sx(i,e){const t=Cs(e,this.size,4);i.uniform4fv(this.addr,t)}function rx(i,e){const t=Cs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ax(i,e){const t=Cs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ox(i,e){const t=Cs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function lx(i,e){i.uniform1iv(this.addr,e)}function cx(i,e){i.uniform2iv(this.addr,e)}function hx(i,e){i.uniform3iv(this.addr,e)}function ux(i,e){i.uniform4iv(this.addr,e)}function dx(i,e){i.uniform1uiv(this.addr,e)}function fx(i,e){i.uniform2uiv(this.addr,e)}function px(i,e){i.uniform3uiv(this.addr,e)}function mx(i,e){i.uniform4uiv(this.addr,e)}function gx(i,e,t){const n=this.cache,s=e.length,r=Ca(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=bl:a=nd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function vx(i,e,t){const n=this.cache,s=e.length,r=Ca(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||sd,r[a])}function xx(i,e,t){const n=this.cache,s=e.length,r=Ca(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||rd,r[a])}function _x(i,e,t){const n=this.cache,s=e.length,r=Ca(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||id,r[a])}function Mx(i){switch(i){case 5126:return tx;case 35664:return nx;case 35665:return ix;case 35666:return sx;case 35674:return rx;case 35675:return ax;case 35676:return ox;case 5124:case 35670:return lx;case 35667:case 35671:return cx;case 35668:case 35672:return hx;case 35669:case 35673:return ux;case 5125:return dx;case 36294:return fx;case 36295:return px;case 36296:return mx;case 35678:case 36198:case 36298:case 36306:case 35682:return gx;case 35679:case 36299:case 36307:return vx;case 35680:case 36300:case 36308:case 36293:return xx;case 36289:case 36303:case 36311:case 36292:return _x}}class yx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ex(t.type)}}class Sx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Mx(t.type)}}class bx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const mo=/(\w+)(\])?(\[|\.)?/g;function wh(i,e){i.seq.push(e),i.map[e.id]=e}function Ex(i,e,t){const n=i.name,s=n.length;for(mo.lastIndex=0;;){const r=mo.exec(n),a=mo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){wh(t,c===void 0?new yx(o,i,e):new Sx(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new bx(o),wh(t,d)),t=d}}}class ia{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Ex(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Th(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const wx=37297;let Tx=0;function Ax(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Ah=new Pe;function Cx(i){ze._getMatrix(Ah,ze.workingColorSpace,i);const e=`mat3( ${Ah.elements.map(t=>t.toFixed(4))} )`;switch(ze.getTransfer(i)){case pa:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return Ae("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ch(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Ax(i.getShaderSource(e),o)}else return r}function Rx(i,e){const t=Cx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Px={[Au]:"Linear",[Cu]:"Reinhard",[Ru]:"Cineon",[Vl]:"ACESFilmic",[Iu]:"AgX",[Lu]:"Neutral",[Pu]:"Custom"};function Ix(i,e){const t=Px[e];return t===void 0?(Ae("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const zr=new U;function Lx(){ze.getLuminanceCoefficients(zr);const i=zr.x.toFixed(4),e=zr.y.toFixed(4),t=zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function Nx(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Fx(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function $s(i){return i!==""}function Rh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ph(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ux=/^[ \t]*#include +<([\w\d./]+)>/gm;function El(i){return i.replace(Ux,Bx)}const Ox=new Map;function Bx(i,e){let t=Fe[e];if(t===void 0){const n=Ox.get(e);if(n!==void 0)t=Fe[n],Ae('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return El(t)}const kx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ih(i){return i.replace(kx,zx)}function zx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Vx={[Qs]:"SHADOWMAP_TYPE_PCF",[Ys]:"SHADOWMAP_TYPE_VSM"};function Gx(i){return Vx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Hx={[Ii]:"ENVMAP_TYPE_CUBE",[ys]:"ENVMAP_TYPE_CUBE",[Ea]:"ENVMAP_TYPE_CUBE_UV"};function Wx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Hx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Xx={[ys]:"ENVMAP_MODE_REFRACTION"};function qx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Xx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Zx={[zl]:"ENVMAP_BLENDING_MULTIPLY",[Np]:"ENVMAP_BLENDING_MIX",[Fp]:"ENVMAP_BLENDING_ADD"};function Yx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Zx[i.combine]||"ENVMAP_BLENDING_NONE"}function $x(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Kx(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Gx(t),c=Wx(t),h=qx(t),d=Yx(t),u=$x(t),f=Dx(t),m=Nx(r),v=s.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($s).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($s).join(`
`),p.length>0&&(p+=`
`)):(g=[Lh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),p=[Lh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Bn?Ix("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,Rx("linearToOutputTexel",t.outputColorSpace),Lx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($s).join(`
`)),a=El(a),a=Rh(a,t),a=Ph(a,t),o=El(o),o=Rh(o,t),o=Ph(o,t),a=Ih(a),o=Ih(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=y+g+a,M=y+p+o,b=Th(s,s.VERTEX_SHADER,w),E=Th(s,s.FRAGMENT_SHADER,M);s.attachShader(v,b),s.attachShader(v,E),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(R){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(v)||"",W=s.getShaderInfoLog(b)||"",B=s.getShaderInfoLog(E)||"",N=D.trim(),X=W.trim(),k=B.trim();let Y=!0,j=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,b,E);else{const ne=Ch(s,b,"vertex"),pe=Ch(s,E,"fragment");We("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+N+`
`+ne+`
`+pe)}else N!==""?Ae("WebGLProgram: Program Info Log:",N):(X===""||k==="")&&(j=!1);j&&(R.diagnostics={runnable:Y,programLog:N,vertexShader:{log:X,prefix:g},fragmentShader:{log:k,prefix:p}})}s.deleteShader(b),s.deleteShader(E),_=new ia(s,v),T=Fx(s,v)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,wx)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Tx++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=E,this}let Jx=0;class Qx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new jx(e),t.set(e,n)),n}}class jx{constructor(e){this.id=Jx++,this.code=e,this.usedTimes=0}}function e_(i){return i===Di||i===ha||i===ua}function t_(i,e,t,n,s,r){const a=new Gu,o=new Qx,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,T,P,R,D,W){const B=R.fog,N=D.geometry,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,k=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,Y=e.get(_.envMap||X,k),j=Y&&Y.mapping===Ea?Y.image.height:null,ne=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Ae("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const pe=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ve=pe!==void 0?pe.length:0;let qe=0;N.morphAttributes.position!==void 0&&(qe=1),N.morphAttributes.normal!==void 0&&(qe=2),N.morphAttributes.color!==void 0&&(qe=3);let ct,Ze,J,se;if(ne){const xe=Rn[ne];ct=xe.vertexShader,Ze=xe.fragmentShader}else{ct=_.vertexShader,Ze=_.fragmentShader;const xe=o.getVertexShaderStage(_),ut=o.getFragmentShaderStage(_);o.update(_,xe,ut),J=xe.id,se=ut.id}const ee=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),Le=D.isInstancedMesh===!0,we=D.isBatchedMesh===!0,ft=!!_.map,ke=!!_.matcap,je=!!Y,Ye=!!_.aoMap,Ge=!!_.lightMap,gt=!!_.bumpMap&&_.wireframe===!1,St=!!_.normalMap,At=!!_.displacementMap,Pt=!!_.emissiveMap,ht=!!_.metalnessMap,vt=!!_.roughnessMap,L=_.anisotropy>0,Yt=_.clearcoat>0,$e=_.dispersion>0,A=_.iridescence>0,x=_.sheen>0,O=_.transmission>0,G=L&&!!_.anisotropyMap,q=Yt&&!!_.clearcoatMap,te=Yt&&!!_.clearcoatNormalMap,re=Yt&&!!_.clearcoatRoughnessMap,Z=A&&!!_.iridescenceMap,K=A&&!!_.iridescenceThicknessMap,ae=x&&!!_.sheenColorMap,ye=x&&!!_.sheenRoughnessMap,ce=!!_.specularMap,oe=!!_.specularColorMap,Ee=!!_.specularIntensityMap,Te=O&&!!_.transmissionMap,De=O&&!!_.thicknessMap,I=!!_.gradientMap,ie=!!_.alphaMap,$=_.alphaTest>0,le=!!_.alphaHash,fe=!!_.extensions;let Q=Bn;_.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Q=i.toneMapping);const Me={shaderID:ne,shaderType:_.type,shaderName:_.name,vertexShader:ct,fragmentShader:Ze,defines:_.defines,customVertexShaderID:J,customFragmentShaderID:se,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:we,batchingColor:we&&D._colorsTexture!==null,instancing:Le,instancingColor:Le&&D.instanceColor!==null,instancingMorph:Le&&D.morphTexture!==null,outputColorSpace:ee===null?i.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:ze.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ft,matcap:ke,envMap:je,envMapMode:je&&Y.mapping,envMapCubeUVHeight:j,aoMap:Ye,lightMap:Ge,bumpMap:gt,normalMap:St,displacementMap:At,emissiveMap:Pt,normalMapObjectSpace:St&&_.normalMapType===Bp,normalMapTangentSpace:St&&_.normalMapType===da,packedNormalMap:St&&_.normalMapType===da&&e_(_.normalMap.format),metalnessMap:ht,roughnessMap:vt,anisotropy:L,anisotropyMap:G,clearcoat:Yt,clearcoatMap:q,clearcoatNormalMap:te,clearcoatRoughnessMap:re,dispersion:$e,iridescence:A,iridescenceMap:Z,iridescenceThicknessMap:K,sheen:x,sheenColorMap:ae,sheenRoughnessMap:ye,specularMap:ce,specularColorMap:oe,specularIntensityMap:Ee,transmission:O,transmissionMap:Te,thicknessMap:De,gradientMap:I,opaque:_.transparent===!1&&_.blending===gs&&_.alphaToCoverage===!1,alphaMap:ie,alphaTest:$,alphaHash:le,combine:_.combine,mapUv:ft&&m(_.map.channel),aoMapUv:Ye&&m(_.aoMap.channel),lightMapUv:Ge&&m(_.lightMap.channel),bumpMapUv:gt&&m(_.bumpMap.channel),normalMapUv:St&&m(_.normalMap.channel),displacementMapUv:At&&m(_.displacementMap.channel),emissiveMapUv:Pt&&m(_.emissiveMap.channel),metalnessMapUv:ht&&m(_.metalnessMap.channel),roughnessMapUv:vt&&m(_.roughnessMap.channel),anisotropyMapUv:G&&m(_.anisotropyMap.channel),clearcoatMapUv:q&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:te&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:K&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(_.sheenRoughnessMap.channel),specularMapUv:ce&&m(_.specularMap.channel),specularColorMapUv:oe&&m(_.specularColorMap.channel),specularIntensityMapUv:Ee&&m(_.specularIntensityMap.channel),transmissionMapUv:Te&&m(_.transmissionMap.channel),thicknessMapUv:De&&m(_.thicknessMap.channel),alphaMapUv:ie&&m(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(St||L),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!N.attributes.uv&&(ft||ie),fog:!!B,useFog:_.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&St===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ce,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:qe,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Q,decodeVideoTexture:ft&&_.map.isVideoTexture===!0&&ze.getTransfer(_.map.colorSpace)===Ke,decodeVideoTextureEmissive:Pt&&_.emissiveMap.isVideoTexture===!0&&ze.getTransfer(_.emissiveMap.colorSpace)===Ke,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ln,flipSided:_.side===qt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:fe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&_.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function g(_){const T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)T.push(P),T.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(p(T,_),y(T,_),T.push(i.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function p(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function y(_,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function w(_){const T=f[_.type];let P;if(T){const R=Rn[T];P=ym.clone(R.uniforms)}else P=_.uniforms;return P}function M(_,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new Kx(i,T,_,s),c.push(P),h.set(T,P)),P}function b(_){if(--_.usedTimes===0){const T=c.indexOf(_);c[T]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:w,acquireProgram:M,releaseProgram:b,releaseShaderCache:E,programs:c,dispose:C}}function n_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function i_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Dh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Nh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,v,g,p){let y=i[e];return y===void 0?(y={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:g,group:p},i[e]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=m,y.materialVariant=a(u),y.groupOrder=v,y.renderOrder=u.renderOrder,y.z=g,y.group=p),e++,y}function l(u,f,m,v,g,p){const y=o(u,f,m,v,g,p);m.transmission>0?n.push(y):m.transparent===!0?s.push(y):t.push(y)}function c(u,f,m,v,g,p){const y=o(u,f,m,v,g,p);m.transmission>0?n.unshift(y):m.transparent===!0?s.unshift(y):t.unshift(y)}function h(u,f,m){t.length>1&&t.sort(u||i_),n.length>1&&n.sort(f||Dh),s.length>1&&s.sort(f||Dh),m&&(t.reverse(),n.reverse(),s.reverse())}function d(){for(let u=e,f=i.length;u<f;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function s_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Nh,i.set(n,[a])):s>=r.length?(a=new Nh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function r_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Re};break;case"SpotLight":t={position:new U,direction:new U,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function a_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let o_=0;function l_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function c_(i){const e=new r_,t=a_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const s=new U,r=new Xe,a=new Xe;function o(c){let h=0,d=0,u=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,y=0,w=0,M=0,b=0,E=0,C=0;c.sort(l_);for(let T=0,P=c.length;T<P;T++){const R=c[T],D=R.color,W=R.intensity,B=R.distance;let N=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Di?N=R.shadow.map.texture:N=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=D.r*W,d+=D.g*W,u+=D.b*W;else if(R.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(R.sh.coefficients[X],W);C++}else if(R.isDirectionalLight){const X=e.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const k=R.shadow,Y=t.get(R);Y.shadowIntensity=k.intensity,Y.shadowBias=k.bias,Y.shadowNormalBias=k.normalBias,Y.shadowRadius=k.radius,Y.shadowMapSize=k.mapSize,n.directionalShadow[f]=Y,n.directionalShadowMap[f]=N,n.directionalShadowMatrix[f]=R.shadow.matrix,y++}n.directional[f]=X,f++}else if(R.isSpotLight){const X=e.get(R);X.position.setFromMatrixPosition(R.matrixWorld),X.color.copy(D).multiplyScalar(W),X.distance=B,X.coneCos=Math.cos(R.angle),X.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),X.decay=R.decay,n.spot[v]=X;const k=R.shadow;if(R.map&&(n.spotLightMap[b]=R.map,b++,k.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[v]=k.matrix,R.castShadow){const Y=t.get(R);Y.shadowIntensity=k.intensity,Y.shadowBias=k.bias,Y.shadowNormalBias=k.normalBias,Y.shadowRadius=k.radius,Y.shadowMapSize=k.mapSize,n.spotShadow[v]=Y,n.spotShadowMap[v]=N,M++}v++}else if(R.isRectAreaLight){const X=e.get(R);X.color.copy(D).multiplyScalar(W),X.halfWidth.set(R.width*.5,0,0),X.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=X,g++}else if(R.isPointLight){const X=e.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),X.distance=R.distance,X.decay=R.decay,R.castShadow){const k=R.shadow,Y=t.get(R);Y.shadowIntensity=k.intensity,Y.shadowBias=k.bias,Y.shadowNormalBias=k.normalBias,Y.shadowRadius=k.radius,Y.shadowMapSize=k.mapSize,Y.shadowCameraNear=k.camera.near,Y.shadowCameraFar=k.camera.far,n.pointShadow[m]=Y,n.pointShadowMap[m]=N,n.pointShadowMatrix[m]=R.shadow.matrix,w++}n.point[m]=X,m++}else if(R.isHemisphereLight){const X=e.get(R);X.skyColor.copy(R.color).multiplyScalar(W),X.groundColor.copy(R.groundColor).multiplyScalar(W),n.hemi[p]=X,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const _=n.hash;(_.directionalLength!==f||_.pointLength!==m||_.spotLength!==v||_.rectAreaLength!==g||_.hemiLength!==p||_.numDirectionalShadows!==y||_.numPointShadows!==w||_.numSpotShadows!==M||_.numSpotMaps!==b||_.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=M+b-E,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,_.directionalLength=f,_.pointLength=m,_.spotLength=v,_.rectAreaLength=g,_.hemiLength=p,_.numDirectionalShadows=y,_.numPointShadows=w,_.numSpotShadows=M,_.numSpotMaps=b,_.numLightProbes=C,n.version=o_++)}function l(c,h){let d=0,u=0,f=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const w=c[p];if(w.isDirectionalLight){const M=n.directional[d];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),d++}else if(w.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),f++}else if(w.isRectAreaLight){const M=n.rectArea[m];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(g),a.identity(),r.copy(w.matrixWorld),r.premultiply(g),a.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),m++}else if(w.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(g),u++}else if(w.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Fh(i){const e=new c_(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function h_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Fh(i),e.set(s,[o])):r>=a.length?(o=new Fh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const u_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,d_=`uniform sampler2D shadow_pass;
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
}`,f_=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],p_=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Uh=new Xe,zs=new U,go=new U;function m_(i,e,t){let n=new jl;const s=new Ie,r=new Ie,a=new lt,o=new Tm,l=new Am,c={},h=t.maxTextureSize,d={[Qn]:qt,[qt]:Qn,[Ln]:Ln},u=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ie},radius:{value:4}},vertexShader:u_,fragmentShader:d_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new Vt;m.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Qe(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qs;let p=this.type;this.render=function(E,C,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===vp&&(Ae("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Qs);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Kn),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const W=p!==this.type;W&&C.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(N=>N.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,N=E.length;B<N;B++){const X=E[B],k=X.shadow;if(k===void 0){Ae("WebGLShadowMap:",X,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const Y=k.getFrameExtents();s.multiply(Y),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,k.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=j,k.map===null||W===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Ys){if(X.isPointLight){Ae("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Mn(s.x,s.y,{format:Di,type:jn,minFilter:Mt,magFilter:Mt,generateMipmaps:!1}),k.map.texture.name=X.name+".shadowMap",k.map.depthTexture=new Ss(s.x,s.y,_n),k.map.depthTexture.name=X.name+".shadowMapDepth",k.map.depthTexture.format=ei,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Lt,k.map.depthTexture.magFilter=Lt}else X.isPointLight?(k.map=new td(s.x),k.map.depthTexture=new _m(s.x,Vn)):(k.map=new Mn(s.x,s.y),k.map.depthTexture=new Ss(s.x,s.y,Vn)),k.map.depthTexture.name=X.name+".shadowMap",k.map.depthTexture.format=ei,this.type===Qs?(k.map.depthTexture.compareFunction=j?Kl:$l,k.map.depthTexture.minFilter=Mt,k.map.depthTexture.magFilter=Mt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Lt,k.map.depthTexture.magFilter=Lt);k.camera.updateProjectionMatrix()}const ne=k.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<ne;pe++){if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,pe),i.clear();else{pe===0&&(i.setRenderTarget(k.map),i.clear());const ve=k.getViewport(pe);a.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),D.viewport(a)}if(X.isPointLight){const ve=k.camera,qe=k.matrix,ct=X.distance||ve.far;ct!==ve.far&&(ve.far=ct,ve.updateProjectionMatrix()),zs.setFromMatrixPosition(X.matrixWorld),ve.position.copy(zs),go.copy(ve.position),go.add(f_[pe]),ve.up.copy(p_[pe]),ve.lookAt(go),ve.updateMatrixWorld(),qe.makeTranslation(-zs.x,-zs.y,-zs.z),Uh.multiplyMatrices(ve.projectionMatrix,ve.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Uh,ve.coordinateSystem,ve.reversedDepth)}else k.updateMatrices(X);n=k.getFrustum(),M(C,_,k.camera,X,this.type)}k.isPointLightShadow!==!0&&this.type===Ys&&y(k,_),k.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(T,P,R)};function y(E,C){const _=e.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Mn(s.x,s.y,{format:Di,type:jn})),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,_,u,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,_,f,v,null)}function w(E,C,_,T){let P=null;const R=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)P=R;else if(P=_.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const D=P.uuid,W=C.uuid;let B=c[D];B===void 0&&(B={},c[D]=B);let N=B[W];N===void 0&&(N=P.clone(),B[W]=N,C.addEventListener("dispose",b)),P=N}if(P.visible=C.visible,P.wireframe=C.wireframe,T===Ys?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:d[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const D=i.properties.get(P);D.light=_}return P}function M(E,C,_,T,P){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===Ys)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);const W=e.update(E),B=E.material;if(Array.isArray(B)){const N=W.groups;for(let X=0,k=N.length;X<k;X++){const Y=N[X],j=B[Y.materialIndex];if(j&&j.visible){const ne=w(E,j,T,P);E.onBeforeShadow(i,E,C,_,W,ne,Y),i.renderBufferDirect(_,null,W,ne,E,Y),E.onAfterShadow(i,E,C,_,W,ne,Y)}}}else if(B.visible){const N=w(E,B,T,P);E.onBeforeShadow(i,E,C,_,W,N,null),i.renderBufferDirect(_,null,W,N,E,null),E.onAfterShadow(i,E,C,_,W,N,null)}}const D=E.children;for(let W=0,B=D.length;W<B;W++)M(D[W],C,_,T,P)}function b(E){E.target.removeEventListener("dispose",b);for(const _ in c){const T=c[_],P=E.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function g_(i,e){function t(){let I=!1;const ie=new lt;let $=null;const le=new lt(0,0,0,0);return{setMask:function(fe){$!==fe&&!I&&(i.colorMask(fe,fe,fe,fe),$=fe)},setLocked:function(fe){I=fe},setClear:function(fe,Q,Me,xe,ut){ut===!0&&(fe*=xe,Q*=xe,Me*=xe),ie.set(fe,Q,Me,xe),le.equals(ie)===!1&&(i.clearColor(fe,Q,Me,xe),le.copy(ie))},reset:function(){I=!1,$=null,le.set(-1,0,0,0)}}}function n(){let I=!1,ie=!1,$=null,le=null,fe=null;return{setReversed:function(Q){if(ie!==Q){const Me=e.get("EXT_clip_control");Q?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),ie=Q;const xe=fe;fe=null,this.setClear(xe)}},getReversed:function(){return ie},setTest:function(Q){Q?ee(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(Q){$!==Q&&!I&&(i.depthMask(Q),$=Q)},setFunc:function(Q){if(ie&&(Q=Yp[Q]),le!==Q){switch(Q){case Oo:i.depthFunc(i.NEVER);break;case Bo:i.depthFunc(i.ALWAYS);break;case ko:i.depthFunc(i.LESS);break;case Ms:i.depthFunc(i.LEQUAL);break;case zo:i.depthFunc(i.EQUAL);break;case Vo:i.depthFunc(i.GEQUAL);break;case Go:i.depthFunc(i.GREATER);break;case Ho:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}le=Q}},setLocked:function(Q){I=Q},setClear:function(Q){fe!==Q&&(fe=Q,ie&&(Q=1-Q),i.clearDepth(Q))},reset:function(){I=!1,$=null,le=null,fe=null,ie=!1}}}function s(){let I=!1,ie=null,$=null,le=null,fe=null,Q=null,Me=null,xe=null,ut=null;return{setTest:function(it){I||(it?ee(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(it){ie!==it&&!I&&(i.stencilMask(it),ie=it)},setFunc:function(it,bn,En){($!==it||le!==bn||fe!==En)&&(i.stencilFunc(it,bn,En),$=it,le=bn,fe=En)},setOp:function(it,bn,En){(Q!==it||Me!==bn||xe!==En)&&(i.stencilOp(it,bn,En),Q=it,Me=bn,xe=En)},setLocked:function(it){I=it},setClear:function(it){ut!==it&&(i.clearStencil(it),ut=it)},reset:function(){I=!1,ie=null,$=null,le=null,fe=null,Q=null,Me=null,xe=null,ut=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u={},f=new WeakMap,m=[],v=null,g=!1,p=null,y=null,w=null,M=null,b=null,E=null,C=null,_=new Re(0,0,0),T=0,P=!1,R=null,D=null,W=null,B=null,N=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,Y=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(j)[1]),k=Y>=1):j.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),k=Y>=2);let ne=null,pe={};const ve=i.getParameter(i.SCISSOR_BOX),qe=i.getParameter(i.VIEWPORT),ct=new lt().fromArray(ve),Ze=new lt().fromArray(qe);function J(I,ie,$,le){const fe=new Uint8Array(4),Q=i.createTexture();i.bindTexture(I,Q),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Me=0;Me<$;Me++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(ie,0,i.RGBA,1,1,le,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(ie+Me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return Q}const se={};se[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),se[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),se[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(i.DEPTH_TEST),a.setFunc(Ms),gt(!1),St(Oc),ee(i.CULL_FACE),Ye(Kn);function ee(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Ce(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Le(I,ie){return u[I]!==ie?(i.bindFramebuffer(I,ie),u[I]=ie,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ie),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ie),!0):!1}function we(I,ie){let $=m,le=!1;if(I){$=f.get(ie),$===void 0&&($=[],f.set(ie,$));const fe=I.textures;if($.length!==fe.length||$[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,Me=fe.length;Q<Me;Q++)$[Q]=i.COLOR_ATTACHMENT0+Q;$.length=fe.length,le=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,le=!0);le&&i.drawBuffers($)}function ft(I){return v!==I?(i.useProgram(I),v=I,!0):!1}const ke={[$n]:i.FUNC_ADD,[xp]:i.FUNC_SUBTRACT,[_p]:i.FUNC_REVERSE_SUBTRACT};ke[Mp]=i.MIN,ke[yp]=i.MAX;const je={[Sp]:i.ZERO,[Fo]:i.ONE,[bp]:i.SRC_COLOR,[Uo]:i.SRC_ALPHA,[Rp]:i.SRC_ALPHA_SATURATE,[Ap]:i.DST_COLOR,[wp]:i.DST_ALPHA,[Ep]:i.ONE_MINUS_SRC_COLOR,[nr]:i.ONE_MINUS_SRC_ALPHA,[Cp]:i.ONE_MINUS_DST_COLOR,[Tp]:i.ONE_MINUS_DST_ALPHA,[Pp]:i.CONSTANT_COLOR,[Ip]:i.ONE_MINUS_CONSTANT_COLOR,[Lp]:i.CONSTANT_ALPHA,[Dp]:i.ONE_MINUS_CONSTANT_ALPHA};function Ye(I,ie,$,le,fe,Q,Me,xe,ut,it){if(I===Kn){g===!0&&(Ce(i.BLEND),g=!1);return}if(g===!1&&(ee(i.BLEND),g=!0),I!==Tu){if(I!==p||it!==P){if((y!==$n||b!==$n)&&(i.blendEquation(i.FUNC_ADD),y=$n,b=$n),it)switch(I){case gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pi:i.blendFunc(i.ONE,i.ONE);break;case Bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case kc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:We("WebGLState: Invalid blending: ",I);break}else switch(I){case gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bc:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case kc:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",I);break}w=null,M=null,E=null,C=null,_.set(0,0,0),T=0,p=I,P=it}return}fe=fe||ie,Q=Q||$,Me=Me||le,(ie!==y||fe!==b)&&(i.blendEquationSeparate(ke[ie],ke[fe]),y=ie,b=fe),($!==w||le!==M||Q!==E||Me!==C)&&(i.blendFuncSeparate(je[$],je[le],je[Q],je[Me]),w=$,M=le,E=Q,C=Me),(xe.equals(_)===!1||ut!==T)&&(i.blendColor(xe.r,xe.g,xe.b,ut),_.copy(xe),T=ut),p=I,P=!1}function Ge(I,ie){I.side===Ln?Ce(i.CULL_FACE):ee(i.CULL_FACE);let $=I.side===qt;ie&&($=!$),gt($),I.blending===gs&&I.transparent===!1?Ye(Kn):Ye(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const le=I.stencilWrite;o.setTest(le),le&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Pt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ee(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function gt(I){R!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),R=I)}function St(I){I!==mp?(ee(i.CULL_FACE),I!==D&&(I===Oc?i.cullFace(i.BACK):I===gp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),D=I}function At(I){I!==W&&(k&&i.lineWidth(I),W=I)}function Pt(I,ie,$){I?(ee(i.POLYGON_OFFSET_FILL),(B!==ie||N!==$)&&(B=ie,N=$,a.getReversed()&&(ie=-ie),i.polygonOffset(ie,$))):Ce(i.POLYGON_OFFSET_FILL)}function ht(I){I?ee(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function vt(I){I===void 0&&(I=i.TEXTURE0+X-1),ne!==I&&(i.activeTexture(I),ne=I)}function L(I,ie,$){$===void 0&&(ne===null?$=i.TEXTURE0+X-1:$=ne);let le=pe[$];le===void 0&&(le={type:void 0,texture:void 0},pe[$]=le),(le.type!==I||le.texture!==ie)&&(ne!==$&&(i.activeTexture($),ne=$),i.bindTexture(I,ie||se[I]),le.type=I,le.texture=ie)}function Yt(){const I=pe[ne];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function $e(){try{i.compressedTexImage2D(...arguments)}catch(I){We("WebGLState:",I)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(I){We("WebGLState:",I)}}function x(){try{i.texSubImage2D(...arguments)}catch(I){We("WebGLState:",I)}}function O(){try{i.texSubImage3D(...arguments)}catch(I){We("WebGLState:",I)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(I){We("WebGLState:",I)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(I){We("WebGLState:",I)}}function te(){try{i.texStorage2D(...arguments)}catch(I){We("WebGLState:",I)}}function re(){try{i.texStorage3D(...arguments)}catch(I){We("WebGLState:",I)}}function Z(){try{i.texImage2D(...arguments)}catch(I){We("WebGLState:",I)}}function K(){try{i.texImage3D(...arguments)}catch(I){We("WebGLState:",I)}}function ae(I){return d[I]!==void 0?d[I]:i.getParameter(I)}function ye(I,ie){d[I]!==ie&&(i.pixelStorei(I,ie),d[I]=ie)}function ce(I){ct.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),ct.copy(I))}function oe(I){Ze.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Ze.copy(I))}function Ee(I,ie){let $=c.get(ie);$===void 0&&($=new WeakMap,c.set(ie,$));let le=$.get(I);le===void 0&&(le=i.getUniformBlockIndex(ie,I.name),$.set(I,le))}function Te(I,ie){const le=c.get(ie).get(I);l.get(ie)!==le&&(i.uniformBlockBinding(ie,le,I.__bindingPointIndex),l.set(ie,le))}function De(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ne=null,pe={},u={},f=new WeakMap,m=[],v=null,g=!1,p=null,y=null,w=null,M=null,b=null,E=null,C=null,_=new Re(0,0,0),T=0,P=!1,R=null,D=null,W=null,B=null,N=null,ct.set(0,0,i.canvas.width,i.canvas.height),Ze.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:Ce,bindFramebuffer:Le,drawBuffers:we,useProgram:ft,setBlending:Ye,setMaterial:Ge,setFlipSided:gt,setCullFace:St,setLineWidth:At,setPolygonOffset:Pt,setScissorTest:ht,activeTexture:vt,bindTexture:L,unbindTexture:Yt,compressedTexImage2D:$e,compressedTexImage3D:A,texImage2D:Z,texImage3D:K,pixelStorei:ye,getParameter:ae,updateUBOMapping:Ee,uniformBlockBinding:Te,texStorage2D:te,texStorage3D:re,texSubImage2D:x,texSubImage3D:O,compressedTexSubImage2D:G,compressedTexSubImage3D:q,scissor:ce,viewport:oe,reset:De}}function v_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ie,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,x){return m?new OffscreenCanvas(A,x):ma("canvas")}function g(A,x,O){let G=1;const q=$e(A);if((q.width>O||q.height>O)&&(G=O/Math.max(q.width,q.height)),G<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const te=Math.floor(G*q.width),re=Math.floor(G*q.height);u===void 0&&(u=v(te,re));const Z=x?v(te,re):u;return Z.width=te,Z.height=re,Z.getContext("2d").drawImage(A,0,0,te,re),Ae("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+te+"x"+re+")."),Z}else return"data"in A&&Ae("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),A;return A}function p(A){return A.generateMipmaps}function y(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(A,x,O,G,q,te=!1){if(A!==null){if(i[A]!==void 0)return i[A];Ae("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let re;G&&(re=e.get("EXT_texture_norm16"),re||Ae("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=x;if(x===i.RED&&(O===i.FLOAT&&(Z=i.R32F),O===i.HALF_FLOAT&&(Z=i.R16F),O===i.UNSIGNED_BYTE&&(Z=i.R8),O===i.UNSIGNED_SHORT&&re&&(Z=re.R16_EXT),O===i.SHORT&&re&&(Z=re.R16_SNORM_EXT)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.R8UI),O===i.UNSIGNED_SHORT&&(Z=i.R16UI),O===i.UNSIGNED_INT&&(Z=i.R32UI),O===i.BYTE&&(Z=i.R8I),O===i.SHORT&&(Z=i.R16I),O===i.INT&&(Z=i.R32I)),x===i.RG&&(O===i.FLOAT&&(Z=i.RG32F),O===i.HALF_FLOAT&&(Z=i.RG16F),O===i.UNSIGNED_BYTE&&(Z=i.RG8),O===i.UNSIGNED_SHORT&&re&&(Z=re.RG16_EXT),O===i.SHORT&&re&&(Z=re.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RG8UI),O===i.UNSIGNED_SHORT&&(Z=i.RG16UI),O===i.UNSIGNED_INT&&(Z=i.RG32UI),O===i.BYTE&&(Z=i.RG8I),O===i.SHORT&&(Z=i.RG16I),O===i.INT&&(Z=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),O===i.UNSIGNED_INT&&(Z=i.RGB32UI),O===i.BYTE&&(Z=i.RGB8I),O===i.SHORT&&(Z=i.RGB16I),O===i.INT&&(Z=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),O===i.UNSIGNED_INT&&(Z=i.RGBA32UI),O===i.BYTE&&(Z=i.RGBA8I),O===i.SHORT&&(Z=i.RGBA16I),O===i.INT&&(Z=i.RGBA32I)),x===i.RGB&&(O===i.UNSIGNED_SHORT&&re&&(Z=re.RGB16_EXT),O===i.SHORT&&re&&(Z=re.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),x===i.RGBA){const K=te?pa:ze.getTransfer(q);O===i.FLOAT&&(Z=i.RGBA32F),O===i.HALF_FLOAT&&(Z=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Z=K===Ke?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&re&&(Z=re.RGBA16_EXT),O===i.SHORT&&re&&(Z=re.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function b(A,x){let O;return A?x===null||x===Vn||x===sr?O=i.DEPTH24_STENCIL8:x===_n?O=i.DEPTH32F_STENCIL8:x===ir&&(O=i.DEPTH24_STENCIL8,Ae("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Vn||x===sr?O=i.DEPTH_COMPONENT24:x===_n?O=i.DEPTH_COMPONENT32F:x===ir&&(O=i.DEPTH_COMPONENT16),O}function E(A,x){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Lt&&A.minFilter!==Mt?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function C(A){const x=A.target;x.removeEventListener("dispose",C),T(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function _(A){const x=A.target;x.removeEventListener("dispose",_),R(x)}function T(A){const x=n.get(A);if(x.__webglInit===void 0)return;const O=A.source,G=f.get(O);if(G){const q=G[x.__cacheKey];q.usedTimes--,q.usedTimes===0&&P(A),Object.keys(G).length===0&&f.delete(O)}n.remove(A)}function P(A){const x=n.get(A);i.deleteTexture(x.__webglTexture);const O=A.source,G=f.get(O);delete G[x.__cacheKey],a.memory.textures--}function R(A){const x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(x.__webglFramebuffer[G]))for(let q=0;q<x.__webglFramebuffer[G].length;q++)i.deleteFramebuffer(x.__webglFramebuffer[G][q]);else i.deleteFramebuffer(x.__webglFramebuffer[G]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[G])}else{if(Array.isArray(x.__webglFramebuffer))for(let G=0;G<x.__webglFramebuffer.length;G++)i.deleteFramebuffer(x.__webglFramebuffer[G]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let G=0;G<x.__webglColorRenderbuffer.length;G++)x.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[G]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=A.textures;for(let G=0,q=O.length;G<q;G++){const te=n.get(O[G]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),n.remove(O[G])}n.remove(A)}let D=0;function W(){D=0}function B(){return D}function N(A){D=A}function X(){const A=D;return A>=s.maxTextures&&Ae("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),D+=1,A}function k(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function Y(A,x){const O=n.get(A);if(A.isVideoTexture&&L(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const G=A.image;if(G===null)Ae("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Ae("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(O,A,x);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function j(A,x){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Ce(O,A,x);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function ne(A,x){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Ce(O,A,x);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function pe(A,x){const O=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){Le(O,A,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}const ve={[Li]:i.REPEAT,[an]:i.CLAMP_TO_EDGE,[Wo]:i.MIRRORED_REPEAT},qe={[Lt]:i.NEAREST,[Up]:i.NEAREST_MIPMAP_NEAREST,[xr]:i.NEAREST_MIPMAP_LINEAR,[Mt]:i.LINEAR,[Ba]:i.LINEAR_MIPMAP_NEAREST,[Fn]:i.LINEAR_MIPMAP_LINEAR},ct={[kp]:i.NEVER,[Wp]:i.ALWAYS,[zp]:i.LESS,[$l]:i.LEQUAL,[Vp]:i.EQUAL,[Kl]:i.GEQUAL,[Gp]:i.GREATER,[Hp]:i.NOTEQUAL};function Ze(A,x){if(x.type===_n&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Mt||x.magFilter===Ba||x.magFilter===xr||x.magFilter===Fn||x.minFilter===Mt||x.minFilter===Ba||x.minFilter===xr||x.minFilter===Fn)&&Ae("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,ve[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,ve[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,ve[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,qe[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,qe[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ct[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Lt||x.minFilter!==xr&&x.minFilter!==Fn||x.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function J(A,x){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",C));const G=x.source;let q=f.get(G);q===void 0&&(q={},f.set(G,q));const te=k(x);if(te!==A.__cacheKey){q[te]===void 0&&(q[te]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[te].usedTimes++;const re=q[A.__cacheKey];re!==void 0&&(q[A.__cacheKey].usedTimes--,re.usedTimes===0&&P(x)),A.__cacheKey=te,A.__webglTexture=q[te].texture}return O}function se(A,x,O){return Math.floor(Math.floor(A/O)/x)}function ee(A,x,O,G){const te=A.updateRanges;if(te.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,O,G,x.data);else{te.sort((ye,ce)=>ye.start-ce.start);let re=0;for(let ye=1;ye<te.length;ye++){const ce=te[re],oe=te[ye],Ee=ce.start+ce.count,Te=se(oe.start,x.width,4),De=se(ce.start,x.width,4);oe.start<=Ee+1&&Te===De&&se(oe.start+oe.count-1,x.width,4)===Te?ce.count=Math.max(ce.count,oe.start+oe.count-ce.start):(++re,te[re]=oe)}te.length=re+1;const Z=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),ae=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let ye=0,ce=te.length;ye<ce;ye++){const oe=te[ye],Ee=Math.floor(oe.start/4),Te=Math.ceil(oe.count/4),De=Ee%x.width,I=Math.floor(Ee/x.width),ie=Te,$=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,De),t.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,De,I,ie,$,O,G,x.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,ae)}}function Ce(A,x,O){let G=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(G=i.TEXTURE_3D);const q=J(A,x),te=x.source;t.bindTexture(G,A.__webglTexture,i.TEXTURE0+O);const re=n.get(te);if(te.version!==re.__version||q===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const $=ze.getPrimaries(ze.workingColorSpace),le=x.colorSpace===Dn?null:ze.getPrimaries(x.colorSpace),fe=x.colorSpace===Dn||$===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let K=g(x.image,!1,s.maxTextureSize);K=Yt(x,K);const ae=r.convert(x.format,x.colorSpace),ye=r.convert(x.type);let ce=M(x.internalFormat,ae,ye,x.normalized,x.colorSpace,x.isVideoTexture);Ze(G,x);let oe;const Ee=x.mipmaps,Te=x.isVideoTexture!==!0,De=re.__version===void 0||q===!0,I=te.dataReady,ie=E(x,K);if(x.isDepthTexture)ce=b(x.format===Ci,x.type),De&&(Te?t.texStorage2D(i.TEXTURE_2D,1,ce,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,ce,K.width,K.height,0,ae,ye,null));else if(x.isDataTexture)if(Ee.length>0){Te&&De&&t.texStorage2D(i.TEXTURE_2D,ie,ce,Ee[0].width,Ee[0].height);for(let $=0,le=Ee.length;$<le;$++)oe=Ee[$],Te?I&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,oe.width,oe.height,ae,ye,oe.data):t.texImage2D(i.TEXTURE_2D,$,ce,oe.width,oe.height,0,ae,ye,oe.data);x.generateMipmaps=!1}else Te?(De&&t.texStorage2D(i.TEXTURE_2D,ie,ce,K.width,K.height),I&&ee(x,K,ae,ye)):t.texImage2D(i.TEXTURE_2D,0,ce,K.width,K.height,0,ae,ye,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Te&&De&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,ce,Ee[0].width,Ee[0].height,K.depth);for(let $=0,le=Ee.length;$<le;$++)if(oe=Ee[$],x.format!==un)if(ae!==null)if(Te){if(I)if(x.layerUpdates.size>0){const fe=ph(oe.width,oe.height,x.format,x.type);for(const Q of x.layerUpdates){const Me=oe.data.subarray(Q*fe/oe.data.BYTES_PER_ELEMENT,(Q+1)*fe/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,Q,oe.width,oe.height,1,ae,Me)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,K.depth,ae,oe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,ce,oe.width,oe.height,K.depth,0,oe.data,0,0);else Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Te?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,oe.width,oe.height,K.depth,ae,ye,oe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,ce,oe.width,oe.height,K.depth,0,ae,ye,oe.data)}else{Te&&De&&t.texStorage2D(i.TEXTURE_2D,ie,ce,Ee[0].width,Ee[0].height);for(let $=0,le=Ee.length;$<le;$++)oe=Ee[$],x.format!==un?ae!==null?Te?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,oe.width,oe.height,ae,oe.data):t.compressedTexImage2D(i.TEXTURE_2D,$,ce,oe.width,oe.height,0,oe.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Te?I&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,oe.width,oe.height,ae,ye,oe.data):t.texImage2D(i.TEXTURE_2D,$,ce,oe.width,oe.height,0,ae,ye,oe.data)}else if(x.isDataArrayTexture)if(Te){if(De&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,ce,K.width,K.height,K.depth),I)if(x.layerUpdates.size>0){const $=ph(K.width,K.height,x.format,x.type);for(const le of x.layerUpdates){const fe=K.data.subarray(le*$/K.data.BYTES_PER_ELEMENT,(le+1)*$/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,le,K.width,K.height,1,ae,ye,fe)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ae,ye,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,K.width,K.height,K.depth,0,ae,ye,K.data);else if(x.isData3DTexture)Te?(De&&t.texStorage3D(i.TEXTURE_3D,ie,ce,K.width,K.height,K.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ae,ye,K.data)):t.texImage3D(i.TEXTURE_3D,0,ce,K.width,K.height,K.depth,0,ae,ye,K.data);else if(x.isFramebufferTexture){if(De)if(Te)t.texStorage2D(i.TEXTURE_2D,ie,ce,K.width,K.height);else{let $=K.width,le=K.height;for(let fe=0;fe<ie;fe++)t.texImage2D(i.TEXTURE_2D,fe,ce,$,le,0,ae,ye,null),$>>=1,le>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),d.add(x),$.onpaint=le=>{const fe=le.changedElements;for(const Q of d)fe.includes(Q.image)&&(Q.needsUpdate=!0)},$.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{const fe=i.RGBA,Q=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,fe,Q,Me,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ee.length>0){if(Te&&De){const $=$e(Ee[0]);t.texStorage2D(i.TEXTURE_2D,ie,ce,$.width,$.height)}for(let $=0,le=Ee.length;$<le;$++)oe=Ee[$],Te?I&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ae,ye,oe):t.texImage2D(i.TEXTURE_2D,$,ce,ae,ye,oe);x.generateMipmaps=!1}else if(Te){if(De){const $=$e(K);t.texStorage2D(i.TEXTURE_2D,ie,ce,$.width,$.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae,ye,K)}else t.texImage2D(i.TEXTURE_2D,0,ce,ae,ye,K);p(x)&&y(G),re.__version=te.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Le(A,x,O){if(x.image.length!==6)return;const G=J(A,x),q=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);const te=n.get(q);if(q.version!==te.__version||G===!0){t.activeTexture(i.TEXTURE0+O);const re=ze.getPrimaries(ze.workingColorSpace),Z=x.colorSpace===Dn?null:ze.getPrimaries(x.colorSpace),K=x.colorSpace===Dn||re===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const ae=x.isCompressedTexture||x.image[0].isCompressedTexture,ye=x.image[0]&&x.image[0].isDataTexture,ce=[];for(let Q=0;Q<6;Q++)!ae&&!ye?ce[Q]=g(x.image[Q],!0,s.maxCubemapSize):ce[Q]=ye?x.image[Q].image:x.image[Q],ce[Q]=Yt(x,ce[Q]);const oe=ce[0],Ee=r.convert(x.format,x.colorSpace),Te=r.convert(x.type),De=M(x.internalFormat,Ee,Te,x.normalized,x.colorSpace),I=x.isVideoTexture!==!0,ie=te.__version===void 0||G===!0,$=q.dataReady;let le=E(x,oe);Ze(i.TEXTURE_CUBE_MAP,x);let fe;if(ae){I&&ie&&t.texStorage2D(i.TEXTURE_CUBE_MAP,le,De,oe.width,oe.height);for(let Q=0;Q<6;Q++){fe=ce[Q].mipmaps;for(let Me=0;Me<fe.length;Me++){const xe=fe[Me];x.format!==un?Ee!==null?I?$&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,0,0,xe.width,xe.height,Ee,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,De,xe.width,xe.height,0,xe.data):Ae("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,0,0,xe.width,xe.height,Ee,Te,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me,De,xe.width,xe.height,0,Ee,Te,xe.data)}}}else{if(fe=x.mipmaps,I&&ie){fe.length>0&&le++;const Q=$e(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,le,De,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ye){I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ce[Q].width,ce[Q].height,Ee,Te,ce[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,De,ce[Q].width,ce[Q].height,0,Ee,Te,ce[Q].data);for(let Me=0;Me<fe.length;Me++){const ut=fe[Me].image[Q].image;I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,0,0,ut.width,ut.height,Ee,Te,ut.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,De,ut.width,ut.height,0,Ee,Te,ut.data)}}else{I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ee,Te,ce[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,De,Ee,Te,ce[Q]);for(let Me=0;Me<fe.length;Me++){const xe=fe[Me];I?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,0,0,Ee,Te,xe.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Me+1,De,Ee,Te,xe.image[Q])}}}p(x)&&y(i.TEXTURE_CUBE_MAP),te.__version=q.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function we(A,x,O,G,q,te){const re=r.convert(O.format,O.colorSpace),Z=r.convert(O.type),K=M(O.internalFormat,re,Z,O.normalized,O.colorSpace),ae=n.get(x),ye=n.get(O);if(ye.__renderTarget=x,!ae.__hasExternalTextures){const ce=Math.max(1,x.width>>te),oe=Math.max(1,x.height>>te);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?t.texImage3D(q,te,K,ce,oe,x.depth,0,re,Z,null):t.texImage2D(q,te,K,ce,oe,0,re,Z,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,q,ye.__webglTexture,0,ht(x)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,q,ye.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(A,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){const G=x.depthTexture,q=G&&G.isDepthTexture?G.type:null,te=b(x.stencilBuffer,q),re=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(x),te,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(x),te,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,te,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,A)}else{const G=x.textures;for(let q=0;q<G.length;q++){const te=G[q],re=r.convert(te.format,te.colorSpace),Z=r.convert(te.type),K=M(te.internalFormat,re,Z,te.normalized,te.colorSpace);vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(x),K,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(x),K,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,K,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ke(A,x,O){const G=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=n.get(x.depthTexture);if(q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G){if(q.__webglInit===void 0&&(q.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,x.depthTexture);const ae=r.convert(x.depthTexture.format),ye=r.convert(x.depthTexture.type);let ce;x.depthTexture.format===ei?ce=i.DEPTH_COMPONENT24:x.depthTexture.format===Ci&&(ce=i.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ce,x.width,x.height,0,ae,ye,null)}}else Y(x.depthTexture,0);const te=q.__webglTexture,re=ht(x),Z=G?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,K=x.depthTexture.format===Ci?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===ei)vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,te,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,te,0);else if(x.depthTexture.format===Ci)vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,te,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function je(A){const x=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const G=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),G){const q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,G.removeEventListener("dispose",q)};G.addEventListener("dispose",q),x.__depthDisposeCallback=q}x.__boundDepthTexture=G}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let G=0;G<6;G++)ke(x.__webglFramebuffer[G],A,G);else{const G=A.texture.mipmaps;G&&G.length>0?ke(x.__webglFramebuffer[0],A,0):ke(x.__webglFramebuffer,A,0)}else if(O){x.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[G]),x.__webglDepthbuffer[G]===void 0)x.__webglDepthbuffer[G]=i.createRenderbuffer(),ft(x.__webglDepthbuffer[G],A,!1);else{const q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=x.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,te)}}else{const G=A.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ft(x.__webglDepthbuffer,A,!1);else{const q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,te)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(A,x,O){const G=n.get(A);x!==void 0&&we(G.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&je(A)}function Ge(A){const x=A.texture,O=n.get(A),G=n.get(x);A.addEventListener("dispose",_);const q=A.textures,te=A.isWebGLCubeRenderTarget===!0,re=q.length>1;if(re||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=x.version,a.memory.textures++),te){O.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[Z]=[];for(let K=0;K<x.mipmaps.length;K++)O.__webglFramebuffer[Z][K]=i.createFramebuffer()}else O.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let Z=0;Z<x.mipmaps.length;Z++)O.__webglFramebuffer[Z]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(re)for(let Z=0,K=q.length;Z<K;Z++){const ae=n.get(q[Z]);ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&vt(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Z=0;Z<q.length;Z++){const K=q[Z];O.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[Z]);const ae=r.convert(K.format,K.colorSpace),ye=r.convert(K.type),ce=M(K.internalFormat,ae,ye,K.normalized,K.colorSpace,A.isXRRenderTarget===!0),oe=ht(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,ce,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,O.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),ft(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,x);for(let Z=0;Z<6;Z++)if(x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)we(O.__webglFramebuffer[Z][K],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,K);else we(O.__webglFramebuffer[Z],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);p(x)&&y(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let Z=0,K=q.length;Z<K;Z++){const ae=q[Z],ye=n.get(ae);let ce=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ce=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,ye.__webglTexture),Ze(ce,ae),we(O.__webglFramebuffer,A,ae,i.COLOR_ATTACHMENT0+Z,ce,0),p(ae)&&y(ce)}t.unbindTexture()}else{let Z=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Z=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,G.__webglTexture),Ze(Z,x),x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)we(O.__webglFramebuffer[K],A,x,i.COLOR_ATTACHMENT0,Z,K);else we(O.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,Z,0);p(x)&&y(Z),t.unbindTexture()}A.depthBuffer&&je(A)}function gt(A){const x=A.textures;for(let O=0,G=x.length;O<G;O++){const q=x[O];if(p(q)){const te=w(A),re=n.get(q).__webglTexture;t.bindTexture(te,re),y(te),t.unbindTexture()}}}const St=[],At=[];function Pt(A){if(A.samples>0){if(vt(A)===!1){const x=A.textures,O=A.width,G=A.height;let q=i.COLOR_BUFFER_BIT;const te=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=n.get(A),Z=x.length>1;if(Z)for(let ae=0;ae<x.length;ae++)t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);const K=A.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let ae=0;ae<x.length;ae++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const ye=n.get(x[ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ye,0)}i.blitFramebuffer(0,0,O,G,0,0,O,G,q,i.NEAREST),l===!0&&(St.length=0,At.length=0,St.push(i.COLOR_ATTACHMENT0+ae),A.depthBuffer&&A.resolveDepthBuffer===!1&&(St.push(te),At.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,At)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ae=0;ae<x.length;ae++){t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const ye=n.get(x[ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,ye,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function ht(A){return Math.min(s.maxSamples,A.samples)}function vt(A){const x=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function L(A){const x=a.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function Yt(A,x){const O=A.colorSpace,G=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==fa&&O!==Dn&&(ze.getTransfer(O)===Ke?(G!==un||q!==Qt)&&Ae("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",O)),x}function $e(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=W,this.getTextureUnits=B,this.setTextureUnits=N,this.setTexture2D=Y,this.setTexture2DArray=j,this.setTexture3D=ne,this.setTextureCube=pe,this.rebindTextures=Ye,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=we,this.useMultisampledRTT=vt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function x_(i,e){function t(n,s=Dn){let r;const a=ze.getTransfer(s);if(n===Qt)return i.UNSIGNED_BYTE;if(n===Hl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Wl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ou)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nu)return i.BYTE;if(n===Fu)return i.SHORT;if(n===ir)return i.UNSIGNED_SHORT;if(n===Gl)return i.INT;if(n===Vn)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===jn)return i.HALF_FLOAT;if(n===Bu)return i.ALPHA;if(n===ku)return i.RGB;if(n===un)return i.RGBA;if(n===ei)return i.DEPTH_COMPONENT;if(n===Ci)return i.DEPTH_STENCIL;if(n===Xl)return i.RED;if(n===ql)return i.RED_INTEGER;if(n===Di)return i.RG;if(n===Zl)return i.RG_INTEGER;if(n===Yl)return i.RGBA_INTEGER;if(n===jr||n===ea||n===ta||n===na)if(a===Ke)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===jr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===jr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xo||n===qo||n===Zo||n===Yo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===$o||n===Ko||n===Jo||n===Qo||n===jo||n===ha||n===el)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===$o||n===Ko)return a===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Jo)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Qo)return r.COMPRESSED_R11_EAC;if(n===jo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ha)return r.COMPRESSED_RG11_EAC;if(n===el)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl||n===pl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===tl)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===nl)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===il)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===sl)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===rl)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===al)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ol)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ll)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===cl)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===hl)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ul)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===dl)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===fl)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===pl)return a===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ml||n===gl||n===vl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ml)return a===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===gl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xl||n===_l||n===ua||n===Ml)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===xl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===_l)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ml)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const __=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,M_=`
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

}`;class y_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Yu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new dn({vertexShader:__,fragmentShader:M_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qe(new dr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class S_ extends Fi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null;const v=typeof XRWebGLBinding<"u",g=new y_,p={},y=t.getContextAttributes();let w=null,M=null;const b=[],E=[],C=new Ie;let _=null;const T=new Jt;T.viewport=new lt;const P=new Jt;P.viewport=new lt;const R=[T,P],D=new Lm;let W=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let se=b[J];return se===void 0&&(se=new qa,b[J]=se),se.getTargetRaySpace()},this.getControllerGrip=function(J){let se=b[J];return se===void 0&&(se=new qa,b[J]=se),se.getGripSpace()},this.getHand=function(J){let se=b[J];return se===void 0&&(se=new qa,b[J]=se),se.getHandSpace()};function N(J){const se=E.indexOf(J.inputSource);if(se===-1)return;const ee=b[se];ee!==void 0&&(ee.update(J.inputSource,J.frame,c||a),ee.dispatchEvent({type:J.type,data:J.inputSource}))}function X(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",k);for(let J=0;J<b.length;J++){const se=E[J];se!==null&&(E[J]=null,b[J].disconnect(se))}W=null,B=null,g.reset();for(const J in p)delete p[J];e.setRenderTarget(w),f=null,u=null,d=null,s=null,M=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Ae("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Ae("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",X),s.addEventListener("inputsourceschange",k),y.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ce=null,Le=null;y.depth&&(Le=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=y.stencil?Ci:ei,Ce=y.stencil?sr:Vn);const we={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(we),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new Mn(u.textureWidth,u.textureHeight,{format:un,type:Qt,depthTexture:new Ss(u.textureWidth,u.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Mn(f.framebufferWidth,f.framebufferHeight,{format:un,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function k(J){for(let se=0;se<J.removed.length;se++){const ee=J.removed[se],Ce=E.indexOf(ee);Ce>=0&&(E[Ce]=null,b[Ce].disconnect(ee))}for(let se=0;se<J.added.length;se++){const ee=J.added[se];let Ce=E.indexOf(ee);if(Ce===-1){for(let we=0;we<b.length;we++)if(we>=E.length){E.push(ee),Ce=we;break}else if(E[we]===null){E[we]=ee,Ce=we;break}if(Ce===-1)break}const Le=b[Ce];Le&&Le.connect(ee)}}const Y=new U,j=new U;function ne(J,se,ee){Y.setFromMatrixPosition(se.matrixWorld),j.setFromMatrixPosition(ee.matrixWorld);const Ce=Y.distanceTo(j),Le=se.projectionMatrix.elements,we=ee.projectionMatrix.elements,ft=Le[14]/(Le[10]-1),ke=Le[14]/(Le[10]+1),je=(Le[9]+1)/Le[5],Ye=(Le[9]-1)/Le[5],Ge=(Le[8]-1)/Le[0],gt=(we[8]+1)/we[0],St=ft*Ge,At=ft*gt,Pt=Ce/(-Ge+gt),ht=Pt*-Ge;if(se.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ht),J.translateZ(Pt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Le[10]===-1)J.projectionMatrix.copy(se.projectionMatrix),J.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const vt=ft+Pt,L=ke+Pt,Yt=St-ht,$e=At+(Ce-ht),A=je*ke/L*vt,x=Ye*ke/L*vt;J.projectionMatrix.makePerspective(Yt,$e,A,x,vt,L),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function pe(J,se){se===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(se.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let se=J.near,ee=J.far;g.texture!==null&&(g.depthNear>0&&(se=g.depthNear),g.depthFar>0&&(ee=g.depthFar)),D.near=P.near=T.near=se,D.far=P.far=T.far=ee,(W!==D.near||B!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),W=D.near,B=D.far),D.layers.mask=J.layers.mask|6,T.layers.mask=D.layers.mask&-5,P.layers.mask=D.layers.mask&-3;const Ce=J.parent,Le=D.cameras;pe(D,Ce);for(let we=0;we<Le.length;we++)pe(Le[we],Ce);Le.length===2?ne(D,T,P):D.projectionMatrix.copy(T.projectionMatrix),ve(J,D,Ce)};function ve(J,se,ee){ee===null?J.matrix.copy(se.matrixWorld):(J.matrix.copy(ee.matrixWorld),J.matrix.invert(),J.matrix.multiply(se.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(se.projectionMatrix),J.projectionMatrixInverse.copy(se.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=yl*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(J){return p[J]};let qe=null;function ct(J,se){if(h=se.getViewerPose(c||a),m=se,h!==null){const ee=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ce=!1;ee.length!==D.cameras.length&&(D.cameras.length=0,Ce=!0);for(let ke=0;ke<ee.length;ke++){const je=ee[ke];let Ye=null;if(f!==null)Ye=f.getViewport(je);else{const gt=d.getViewSubImage(u,je);Ye=gt.viewport,ke===0&&(e.setRenderTargetTextures(M,gt.colorTexture,gt.depthStencilTexture),e.setRenderTarget(M))}let Ge=R[ke];Ge===void 0&&(Ge=new Jt,Ge.layers.enable(ke),Ge.viewport=new lt,R[ke]=Ge),Ge.matrix.fromArray(je.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(je.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),ke===0&&(D.matrix.copy(Ge.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Ce===!0&&D.cameras.push(Ge)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const ke=d.getDepthInformation(ee[0]);ke&&ke.isValid&&ke.texture&&g.init(ke,s.renderState)}if(Le&&Le.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let ke=0;ke<ee.length;ke++){const je=ee[ke].camera;if(je){let Ye=p[je];Ye||(Ye=new Yu,p[je]=Ye);const Ge=d.getCameraImage(je);Ye.sourceTexture=Ge}}}}for(let ee=0;ee<b.length;ee++){const Ce=E[ee],Le=b[ee];Ce!==null&&Le!==void 0&&Le.update(Ce,se,c||a)}qe&&qe(J,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),m=null}const Ze=new ju;Ze.setAnimationLoop(ct),this.setAnimationLoop=function(J){qe=J},this.dispose=function(){}}}const b_=new Xe,ad=new Pe;ad.set(-1,0,0,0,1,0,0,0,1);function E_(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,$u(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,w,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,M)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,y,w):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===qt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===qt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),w=y.envMap,M=y.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(b_.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(ad),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,w){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=w*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function w_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,b){const E=b.program;n.uniformBlockBinding(M,E)}function c(M,b){let E=s[M.id];E===void 0&&(g(M),E=h(M),s[M.id]=E,M.addEventListener("dispose",y));const C=b.program;n.updateUBOMapping(M,C);const _=e.render.frame;r[M.id]!==_&&(u(M),r[M.id]=_)}function h(M){const b=d();M.__bindingPointIndex=b;const E=i.createBuffer(),C=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,C,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,E),E}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return We("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const b=s[M.id],E=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let _=0,T=E.length;_<T;_++){const P=E[_];if(Array.isArray(P))for(let R=0,D=P.length;R<D;R++)f(P[R],_,R,C);else f(P,_,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,b,E,C){if(v(M,b,E,C)===!0){const _=M.__offset,T=M.value;if(Array.isArray(T)){let P=0;for(let R=0;R<T.length;R++){const D=T[R],W=p(D);m(D,M.__data,P),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function m(M,b,E){typeof M=="number"||typeof M=="boolean"?b[0]=M:M.isMatrix3?(b[0]=M.elements[0],b[1]=M.elements[1],b[2]=M.elements[2],b[3]=0,b[4]=M.elements[3],b[5]=M.elements[4],b[6]=M.elements[5],b[7]=0,b[8]=M.elements[6],b[9]=M.elements[7],b[10]=M.elements[8],b[11]=0):ArrayBuffer.isView(M)?b.set(new M.constructor(M.buffer,M.byteOffset,b.length)):M.toArray(b,E)}function v(M,b,E,C){const _=M.value,T=b+"_"+E;if(C[T]===void 0)return typeof _=="number"||typeof _=="boolean"?C[T]=_:ArrayBuffer.isView(_)?C[T]=_.slice():C[T]=_.clone(),!0;{const P=C[T];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return C[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function g(M){const b=M.uniforms;let E=0;const C=16;for(let T=0,P=b.length;T<P;T++){const R=Array.isArray(b[T])?b[T]:[b[T]];for(let D=0,W=R.length;D<W;D++){const B=R[D],N=Array.isArray(B.value)?B.value:[B.value];for(let X=0,k=N.length;X<k;X++){const Y=N[X],j=p(Y),ne=E%C,pe=ne%j.boundary,ve=ne+pe;E+=pe,ve!==0&&C-ve<j.storage&&(E+=C-ve),B.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=E,E+=j.storage}}}const _=E%C;return _>0&&(E+=C-_),M.__size=E,M.__cache={},this}function p(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?Ae("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(b.boundary=16,b.storage=M.byteLength):Ae("WebGLRenderer: Unsupported uniform value type.",M),b}function y(M){const b=M.target;b.removeEventListener("dispose",y);const E=a.indexOf(b.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function w(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}const T_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let An=null;function A_(){return An===null&&(An=new qu(T_,16,16,Di,jn),An.name="DFG_LUT",An.minFilter=Mt,An.magFilter=Mt,An.wrapS=an,An.wrapT=an,An.generateMipmaps=!1,An.needsUpdate=!0),An}class C_{constructor(e={}){const{canvas:t=qp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Qt}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const v=f,g=new Set([Yl,Zl,ql]),p=new Set([Qt,Vn,ir,sr,Hl,Wl]),y=new Uint32Array(4),w=new Int32Array(4),M=new U;let b=null,E=null;const C=[],_=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,D=null,W=null,B=null,N=null;this._outputColorSpace=Bt;let X=0,k=0,Y=null,j=-1,ne=null;const pe=new lt,ve=new lt;let qe=null;const ct=new Re(0);let Ze=0,J=t.width,se=t.height,ee=1,Ce=null,Le=null;const we=new lt(0,0,J,se),ft=new lt(0,0,J,se);let ke=!1;const je=new jl;let Ye=!1,Ge=!1;const gt=new Xe,St=new U,At=new lt,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ht=!1;function vt(){return Y===null?ee:1}let L=n;function Yt(S,F){return t.getContext(S,F)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${kl}`),t.addEventListener("webglcontextlost",ut,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",bn,!1),L===null){const F="webgl2";if(L=Yt(F,S),L===null)throw Yt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw We("WebGLRenderer: "+S.message),S}let $e,A,x,O,G,q,te,re,Z,K,ae,ye,ce,oe,Ee,Te,De,I,ie,$,le,fe,Q;function Me(){$e=new Av(L),$e.init(),le=new x_(L,$e),A=new _v(L,$e,e,le),x=new g_(L,$e),A.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),W=L.createFramebuffer(),B=L.createFramebuffer(),N=L.createFramebuffer(),O=new Pv(L),G=new n_,q=new v_(L,$e,x,G,A,le,O),te=new Tv(P),re=new Nm(L),fe=new vv(L,re),Z=new Cv(L,re,O,fe),K=new Lv(L,Z,re,fe,O),I=new Iv(L,A,q),Ee=new Mv(G),ae=new t_(P,te,$e,A,fe,Ee),ye=new E_(P,G),ce=new s_,oe=new h_($e),De=new gv(P,te,x,K,m,l),Te=new m_(P,K,A),Q=new w_(L,O,A,x),ie=new xv(L,$e,O),$=new Rv(L,$e,O),O.programs=ae.programs,P.capabilities=A,P.extensions=$e,P.properties=G,P.renderLists=ce,P.shadowMap=Te,P.state=x,P.info=O}Me(),v!==Qt&&(T=new Nv(v,t.width,t.height,o,s,r));const xe=new S_(P,L);this.xr=xe,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=$e.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=$e.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(S){S!==void 0&&(ee=S,this.setSize(J,se,!1))},this.getSize=function(S){return S.set(J,se)},this.setSize=function(S,F,H=!0){if(xe.isPresenting){Ae("WebGLRenderer: Can't change size while VR device is presenting.");return}J=S,se=F,t.width=Math.floor(S*ee),t.height=Math.floor(F*ee),H===!0&&(t.style.width=S+"px",t.style.height=F+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(J*ee,se*ee).floor()},this.setDrawingBufferSize=function(S,F,H){J=S,se=F,ee=H,t.width=Math.floor(S*H),t.height=Math.floor(F*H),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(v===Qt){We("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Ae("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(pe)},this.getViewport=function(S){return S.copy(we)},this.setViewport=function(S,F,H,z){S.isVector4?we.set(S.x,S.y,S.z,S.w):we.set(S,F,H,z),x.viewport(pe.copy(we).multiplyScalar(ee).round())},this.getScissor=function(S){return S.copy(ft)},this.setScissor=function(S,F,H,z){S.isVector4?ft.set(S.x,S.y,S.z,S.w):ft.set(S,F,H,z),x.scissor(ve.copy(ft).multiplyScalar(ee).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(S){x.setScissorTest(ke=S)},this.setOpaqueSort=function(S){Ce=S},this.setTransparentSort=function(S){Le=S},this.getClearColor=function(S){return S.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,H=!0){let z=0;if(S){let V=!1;if(Y!==null){const de=Y.texture.format;V=g.has(de)}if(V){const de=Y.texture.type,ge=p.has(de),ue=De.getClearColor(),_e=De.getClearAlpha(),Se=ue.r,Ne=ue.g,Oe=ue.b;ge?(y[0]=Se,y[1]=Ne,y[2]=Oe,y[3]=_e,L.clearBufferuiv(L.COLOR,0,y)):(w[0]=Se,w[1]=Ne,w[2]=Oe,w[3]=_e,L.clearBufferiv(L.COLOR,0,w))}else z|=L.COLOR_BUFFER_BIT}F&&(z|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),D=S},this.dispose=function(){t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",bn,!1),De.dispose(),ce.dispose(),oe.dispose(),G.dispose(),te.dispose(),K.dispose(),fe.dispose(),Q.dispose(),ae.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",oc),xe.removeEventListener("sessionend",lc),gi.stop()};function ut(S){S.preventDefault(),Wc("WebGLRenderer: Context Lost."),R=!0}function it(){Wc("WebGLRenderer: Context Restored."),R=!1;const S=O.autoReset,F=Te.enabled,H=Te.autoUpdate,z=Te.needsUpdate,V=Te.type;Me(),O.autoReset=S,Te.enabled=F,Te.autoUpdate=H,Te.needsUpdate=z,Te.type=V}function bn(S){We("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function En(S){const F=S.target;F.removeEventListener("dispose",En),vd(F)}function vd(S){xd(S),G.remove(S)}function xd(S){const F=G.get(S).programs;F!==void 0&&(F.forEach(function(H){ae.releaseProgram(H)}),S.isShaderMaterial&&ae.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,H,z,V,de){F===null&&(F=Pt);const ge=V.isMesh&&V.matrixWorld.determinantAffine()<0,ue=yd(S,F,H,z,V);x.setMaterial(z,ge);let _e=H.index,Se=1;if(z.wireframe===!0){if(_e=Z.getWireframeAttribute(H),_e===void 0)return;Se=2}const Ne=H.drawRange,Oe=H.attributes.position;let be=Ne.start*Se,Je=(Ne.start+Ne.count)*Se;de!==null&&(be=Math.max(be,de.start*Se),Je=Math.min(Je,(de.start+de.count)*Se)),_e!==null?(be=Math.max(be,0),Je=Math.min(Je,_e.count)):Oe!=null&&(be=Math.max(be,0),Je=Math.min(Je,Oe.count));const pt=Je-be;if(pt<0||pt===1/0)return;fe.setup(V,z,ue,H,_e);let dt,et=ie;if(_e!==null&&(dt=re.get(_e),et=$,et.setIndex(dt)),V.isMesh)z.wireframe===!0?(x.setLineWidth(z.wireframeLinewidth*vt()),et.setMode(L.LINES)):et.setMode(L.TRIANGLES);else if(V.isLine){let Dt=z.linewidth;Dt===void 0&&(Dt=1),x.setLineWidth(Dt*vt()),V.isLineSegments?et.setMode(L.LINES):V.isLineLoop?et.setMode(L.LINE_LOOP):et.setMode(L.LINE_STRIP)}else V.isPoints?et.setMode(L.POINTS):V.isSprite&&et.setMode(L.TRIANGLES);if(V.isBatchedMesh)if($e.get("WEBGL_multi_draw"))et.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Dt=V._multiDrawStarts,me=V._multiDrawCounts,en=V._multiDrawCount,He=_e?re.get(_e).bytesPerElement:1,ln=G.get(z).currentProgram.getUniforms();for(let wn=0;wn<en;wn++)ln.setValue(L,"_gl_DrawID",wn),et.render(Dt[wn]/He,me[wn])}else if(V.isInstancedMesh)et.renderInstances(be,pt,V.count);else if(H.isInstancedBufferGeometry){const Dt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,me=Math.min(H.instanceCount,Dt);et.renderInstances(be,pt,me)}else et.render(be,pt)};function ac(S,F,H){S.transparent===!0&&S.side===Ln&&S.forceSinglePass===!1?(S.side=qt,S.needsUpdate=!0,mr(S,F,H),S.side=Qn,S.needsUpdate=!0,mr(S,F,H),S.side=Ln):mr(S,F,H)}this.compile=function(S,F,H=null){H===null&&(H=S),E=oe.get(H),E.init(F),_.push(E),H.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),S!==H&&S.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights();const z=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const de=V.material;if(de)if(Array.isArray(de))for(let ge=0;ge<de.length;ge++){const ue=de[ge];ac(ue,H,V),z.add(ue)}else ac(de,H,V),z.add(de)}),E=_.pop(),z},this.compileAsync=function(S,F,H=null){const z=this.compile(S,F,H);return new Promise(V=>{function de(){if(z.forEach(function(ge){G.get(ge).currentProgram.isReady()&&z.delete(ge)}),z.size===0){V(S);return}setTimeout(de,10)}$e.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Pa=null;function _d(S){Pa&&Pa(S)}function oc(){gi.stop()}function lc(){gi.start()}const gi=new ju;gi.setAnimationLoop(_d),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(S){Pa=S,xe.setAnimationLoop(S),S===null?gi.stop():gi.start()},xe.addEventListener("sessionstart",oc),xe.addEventListener("sessionend",lc),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;D!==null&&D.renderStart(S,F);const H=xe.enabled===!0&&xe.isPresenting===!0,z=T!==null&&(Y===null||H)&&T.begin(P,Y);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(F),F=xe.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,F,Y),E=oe.get(S,_.length),E.init(F),E.state.textureUnits=q.getTextureUnits(),_.push(E),gt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),je.setFromProjectionMatrix(gt,Un,F.reversedDepth),Ge=this.localClippingEnabled,Ye=Ee.init(this.clippingPlanes,Ge),b=ce.get(S,C.length),b.init(),C.push(b),xe.enabled===!0&&xe.isPresenting===!0){const ge=P.xr.getDepthSensingMesh();ge!==null&&Ia(ge,F,-1/0,P.sortObjects)}Ia(S,F,0,P.sortObjects),b.finish(),P.sortObjects===!0&&b.sort(Ce,Le,F.reversedDepth),ht=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,ht&&De.addToRenderList(b,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ye===!0&&Ee.beginShadows();const V=E.state.shadowsArray;if(Te.render(V,S,F),Ye===!0&&Ee.endShadows(),(z&&T.hasRenderPass())===!1){const ge=b.opaque,ue=b.transmissive;if(E.setupLights(),F.isArrayCamera){const _e=F.cameras;if(ue.length>0)for(let Se=0,Ne=_e.length;Se<Ne;Se++){const Oe=_e[Se];hc(ge,ue,S,Oe)}ht&&De.render(S);for(let Se=0,Ne=_e.length;Se<Ne;Se++){const Oe=_e[Se];cc(b,S,Oe,Oe.viewport)}}else ue.length>0&&hc(ge,ue,S,F),ht&&De.render(S),cc(b,S,F)}Y!==null&&k===0&&(q.updateMultisampleRenderTarget(Y),q.updateRenderTargetMipmap(Y)),z&&T.end(P),S.isScene===!0&&S.onAfterRender(P,S,F),fe.resetDefaultState(),j=-1,ne=null,_.pop(),_.length>0?(E=_[_.length-1],q.setTextureUnits(E.state.textureUnits),Ye===!0&&Ee.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?b=C[C.length-1]:b=null,D!==null&&D.renderEnd()};function Ia(S,F,H,z){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)E.pushLightProbeGrid(S);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||je.intersectsSprite(S)){z&&At.setFromMatrixPosition(S.matrixWorld).applyMatrix4(gt);const ge=K.update(S),ue=S.material;ue.visible&&b.push(S,ge,ue,H,At.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||je.intersectsObject(S))){const ge=K.update(S),ue=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),At.copy(S.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),At.copy(ge.boundingSphere.center)),At.applyMatrix4(S.matrixWorld).applyMatrix4(gt)),Array.isArray(ue)){const _e=ge.groups;for(let Se=0,Ne=_e.length;Se<Ne;Se++){const Oe=_e[Se],be=ue[Oe.materialIndex];be&&be.visible&&b.push(S,ge,be,H,At.z,Oe)}}else ue.visible&&b.push(S,ge,ue,H,At.z,null)}}const de=S.children;for(let ge=0,ue=de.length;ge<ue;ge++)Ia(de[ge],F,H,z)}function cc(S,F,H,z){const{opaque:V,transmissive:de,transparent:ge}=S;E.setupLightsView(H),Ye===!0&&Ee.setGlobalState(P.clippingPlanes,H),z&&x.viewport(pe.copy(z)),V.length>0&&pr(V,F,H),de.length>0&&pr(de,F,H),ge.length>0&&pr(ge,F,H),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function hc(S,F,H,z){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[z.id]===void 0){const be=$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[z.id]=new Mn(1,1,{generateMipmaps:!0,type:be?jn:Qt,minFilter:Fn,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace})}const de=E.state.transmissionRenderTarget[z.id],ge=z.viewport||pe;de.setSize(ge.z*P.transmissionResolutionScale,ge.w*P.transmissionResolutionScale);const ue=P.getRenderTarget(),_e=P.getActiveCubeFace(),Se=P.getActiveMipmapLevel();P.setRenderTarget(de),P.getClearColor(ct),Ze=P.getClearAlpha(),Ze<1&&P.setClearColor(16777215,.5),P.clear(),ht&&De.render(H);const Ne=P.toneMapping;P.toneMapping=Bn;const Oe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),Ye===!0&&Ee.setGlobalState(P.clippingPlanes,z),pr(S,H,z),q.updateMultisampleRenderTarget(de),q.updateRenderTargetMipmap(de),$e.has("WEBGL_multisampled_render_to_texture")===!1){let be=!1;for(let Je=0,pt=F.length;Je<pt;Je++){const dt=F[Je],{object:et,geometry:Dt,material:me,group:en}=dt;if(me.side===Ln&&et.layers.test(z.layers)){const He=me.side;me.side=qt,me.needsUpdate=!0,uc(et,H,z,Dt,me,en),me.side=He,me.needsUpdate=!0,be=!0}}be===!0&&(q.updateMultisampleRenderTarget(de),q.updateRenderTargetMipmap(de))}P.setRenderTarget(ue,_e,Se),P.setClearColor(ct,Ze),Oe!==void 0&&(z.viewport=Oe),P.toneMapping=Ne}function pr(S,F,H){const z=F.isScene===!0?F.overrideMaterial:null;for(let V=0,de=S.length;V<de;V++){const ge=S[V],{object:ue,geometry:_e,group:Se}=ge;let Ne=ge.material;Ne.allowOverride===!0&&z!==null&&(Ne=z),ue.layers.test(H.layers)&&uc(ue,F,H,_e,Ne,Se)}}function uc(S,F,H,z,V,de){S.onBeforeRender(P,F,H,z,V,de),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(P,F,H,z,S,de),V.transparent===!0&&V.side===Ln&&V.forceSinglePass===!1?(V.side=qt,V.needsUpdate=!0,P.renderBufferDirect(H,F,z,V,S,de),V.side=Qn,V.needsUpdate=!0,P.renderBufferDirect(H,F,z,V,S,de),V.side=Ln):P.renderBufferDirect(H,F,z,V,S,de),S.onAfterRender(P,F,H,z,V,de)}function mr(S,F,H){F.isScene!==!0&&(F=Pt);const z=G.get(S),V=E.state.lights,de=E.state.shadowsArray,ge=V.state.version,ue=ae.getParameters(S,V.state,de,F,H,E.state.lightProbeGridArray),_e=ae.getProgramCacheKey(ue);let Se=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,z.fog=F.fog;const Ne=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=te.get(S.envMap||z.environment,Ne),z.envMapRotation=z.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Se===void 0&&(S.addEventListener("dispose",En),Se=new Map,z.programs=Se);let Oe=Se.get(_e);if(Oe!==void 0){if(z.currentProgram===Oe&&z.lightsStateVersion===ge)return fc(S,ue),Oe}else ue.uniforms=ae.getUniforms(S),D!==null&&S.isNodeMaterial&&D.build(S,H,ue),S.onBeforeCompile(ue,P),Oe=ae.acquireProgram(ue,_e),Se.set(_e,Oe),z.uniforms=ue.uniforms;const be=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(be.clippingPlanes=Ee.uniform),fc(S,ue),z.needsLights=bd(S),z.lightsStateVersion=ge,z.needsLights&&(be.ambientLightColor.value=V.state.ambient,be.lightProbe.value=V.state.probe,be.directionalLights.value=V.state.directional,be.directionalLightShadows.value=V.state.directionalShadow,be.spotLights.value=V.state.spot,be.spotLightShadows.value=V.state.spotShadow,be.rectAreaLights.value=V.state.rectArea,be.ltc_1.value=V.state.rectAreaLTC1,be.ltc_2.value=V.state.rectAreaLTC2,be.pointLights.value=V.state.point,be.pointLightShadows.value=V.state.pointShadow,be.hemisphereLights.value=V.state.hemi,be.directionalShadowMatrix.value=V.state.directionalShadowMatrix,be.spotLightMatrix.value=V.state.spotLightMatrix,be.spotLightMap.value=V.state.spotLightMap,be.pointShadowMatrix.value=V.state.pointShadowMatrix),z.lightProbeGrid=E.state.lightProbeGridArray.length>0,z.currentProgram=Oe,z.uniformsList=null,Oe}function dc(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=ia.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function fc(S,F){const H=G.get(S);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function Md(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(F.matrixWorld);for(let H=0,z=S.length;H<z;H++){const V=S[H];if(V.texture!==null&&V.boundingBox.containsPoint(M))return V}return null}function yd(S,F,H,z,V){F.isScene!==!0&&(F=Pt),q.resetTextureUnits();const de=F.fog,ge=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?F.environment:null,ue=Y===null?P.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ze.workingColorSpace,_e=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Se=te.get(z.envMap||ge,_e),Ne=z.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Oe=!!H.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),be=!!H.morphAttributes.position,Je=!!H.morphAttributes.normal,pt=!!H.morphAttributes.color;let dt=Bn;z.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(dt=P.toneMapping);const et=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Dt=et!==void 0?et.length:0,me=G.get(z),en=E.state.lights;if(Ye===!0&&(Ge===!0||S!==ne)){const st=S===ne&&z.id===j;Ee.setState(z,S,st)}let He=!1;z.version===me.__version?(me.needsLights&&me.lightsStateVersion!==en.state.version||me.outputColorSpace!==ue||V.isBatchedMesh&&me.batching===!1||!V.isBatchedMesh&&me.batching===!0||V.isBatchedMesh&&me.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&me.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&me.instancing===!1||!V.isInstancedMesh&&me.instancing===!0||V.isSkinnedMesh&&me.skinning===!1||!V.isSkinnedMesh&&me.skinning===!0||V.isInstancedMesh&&me.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&me.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&me.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&me.instancingMorph===!1&&V.morphTexture!==null||me.envMap!==Se||z.fog===!0&&me.fog!==de||me.numClippingPlanes!==void 0&&(me.numClippingPlanes!==Ee.numPlanes||me.numIntersection!==Ee.numIntersection)||me.vertexAlphas!==Ne||me.vertexTangents!==Oe||me.morphTargets!==be||me.morphNormals!==Je||me.morphColors!==pt||me.toneMapping!==dt||me.morphTargetsCount!==Dt||!!me.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(He=!0):(He=!0,me.__version=z.version);let ln=me.currentProgram;He===!0&&(ln=mr(z,F,V),D&&z.isNodeMaterial&&D.onUpdateProgram(z,ln,me));let wn=!1,ni=!1,Bi=!1;const tt=ln.getUniforms(),mt=me.uniforms;if(x.useProgram(ln.program)&&(wn=!0,ni=!0,Bi=!0),z.id!==j&&(j=z.id,ni=!0),me.needsLights){const st=Md(E.state.lightProbeGridArray,V);me.lightProbeGrid!==st&&(me.lightProbeGrid=st,ni=!0)}if(wn||ne!==S){x.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),tt.setValue(L,"projectionMatrix",S.projectionMatrix),tt.setValue(L,"viewMatrix",S.matrixWorldInverse);const si=tt.map.cameraPosition;si!==void 0&&si.setValue(L,St.setFromMatrixPosition(S.matrixWorld)),A.logarithmicDepthBuffer&&tt.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&tt.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),ne!==S&&(ne=S,ni=!0,Bi=!0)}if(me.needsLights&&(en.state.directionalShadowMap.length>0&&tt.setValue(L,"directionalShadowMap",en.state.directionalShadowMap,q),en.state.spotShadowMap.length>0&&tt.setValue(L,"spotShadowMap",en.state.spotShadowMap,q),en.state.pointShadowMap.length>0&&tt.setValue(L,"pointShadowMap",en.state.pointShadowMap,q)),V.isSkinnedMesh){tt.setOptional(L,V,"bindMatrix"),tt.setOptional(L,V,"bindMatrixInverse");const st=V.skeleton;st&&(st.boneTexture===null&&st.computeBoneTexture(),tt.setValue(L,"boneTexture",st.boneTexture,q))}V.isBatchedMesh&&(tt.setOptional(L,V,"batchingTexture"),tt.setValue(L,"batchingTexture",V._matricesTexture,q),tt.setOptional(L,V,"batchingIdTexture"),tt.setValue(L,"batchingIdTexture",V._indirectTexture,q),tt.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&tt.setValue(L,"batchingColorTexture",V._colorsTexture,q));const ii=H.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&I.update(V,H,ln),(ni||me.receiveShadow!==V.receiveShadow)&&(me.receiveShadow=V.receiveShadow,tt.setValue(L,"receiveShadow",V.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&F.environment!==null&&(mt.envMapIntensity.value=F.environmentIntensity),mt.dfgLUT!==void 0&&(mt.dfgLUT.value=A_()),ni){if(tt.setValue(L,"toneMappingExposure",P.toneMappingExposure),me.needsLights&&Sd(mt,Bi),de&&z.fog===!0&&ye.refreshFogUniforms(mt,de),ye.refreshMaterialUniforms(mt,z,ee,se,E.state.transmissionRenderTarget[S.id]),me.needsLights&&me.lightProbeGrid){const st=me.lightProbeGrid;mt.probesSH.value=st.texture,mt.probesMin.value.copy(st.boundingBox.min),mt.probesMax.value.copy(st.boundingBox.max),mt.probesResolution.value.copy(st.resolution)}ia.upload(L,dc(me),mt,q)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ia.upload(L,dc(me),mt,q),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&tt.setValue(L,"center",V.center),tt.setValue(L,"modelViewMatrix",V.modelViewMatrix),tt.setValue(L,"normalMatrix",V.normalMatrix),tt.setValue(L,"modelMatrix",V.matrixWorld),z.uniformsGroups!==void 0){const st=z.uniformsGroups;for(let si=0,ki=st.length;si<ki;si++){const pc=st[si];Q.update(pc,ln),Q.bind(pc,ln)}}return ln}function Sd(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function bd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(S,F,H){const z=G.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),G.get(S.texture).__webglTexture=F,G.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:H,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){const H=G.get(S);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,H=0){Y=S,X=F,k=H;let z=null,V=!1,de=!1;if(S){const ue=G.get(S);if(ue.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(L.FRAMEBUFFER,ue.__webglFramebuffer),pe.copy(S.viewport),ve.copy(S.scissor),qe=S.scissorTest,x.viewport(pe),x.scissor(ve),x.setScissorTest(qe),j=-1;return}else if(ue.__webglFramebuffer===void 0)q.setupRenderTarget(S);else if(ue.__hasExternalTextures)q.rebindTextures(S,G.get(S.texture).__webglTexture,G.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ne=S.depthTexture;if(ue.__boundDepthTexture!==Ne){if(Ne!==null&&G.has(Ne)&&(S.width!==Ne.image.width||S.height!==Ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(S)}}const _e=S.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(de=!0);const Se=G.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Se[F])?z=Se[F][H]:z=Se[F],V=!0):S.samples>0&&q.useMultisampledRTT(S)===!1?z=G.get(S).__webglMultisampledFramebuffer:Array.isArray(Se)?z=Se[H]:z=Se,pe.copy(S.viewport),ve.copy(S.scissor),qe=S.scissorTest}else pe.copy(we).multiplyScalar(ee).floor(),ve.copy(ft).multiplyScalar(ee).floor(),qe=ke;if(H!==0&&(z=W),x.bindFramebuffer(L.FRAMEBUFFER,z)&&x.drawBuffers(S,z),x.viewport(pe),x.scissor(ve),x.setScissorTest(qe),V){const ue=G.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,ue.__webglTexture,H)}else if(de){const ue=F;for(let _e=0;_e<S.textures.length;_e++){const Se=G.get(S.textures[_e]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+_e,Se.__webglTexture,H,ue)}}else if(S!==null&&H!==0){const ue=G.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ue.__webglTexture,H)}j=-1},this.readRenderTargetPixels=function(S,F,H,z,V,de,ge,ue=0){if(!(S&&S.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=G.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ge!==void 0&&(_e=_e[ge]),_e){x.bindFramebuffer(L.FRAMEBUFFER,_e);try{const Se=S.textures[ue],Ne=Se.format,Oe=Se.type;if(S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ue),!A.textureFormatReadable(Ne)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Oe)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-z&&H>=0&&H<=S.height-V&&L.readPixels(F,H,z,V,le.convert(Ne),le.convert(Oe),de)}finally{const Se=Y!==null?G.get(Y).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(S,F,H,z,V,de,ge,ue=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=G.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ge!==void 0&&(_e=_e[ge]),_e)if(F>=0&&F<=S.width-z&&H>=0&&H<=S.height-V){x.bindFramebuffer(L.FRAMEBUFFER,_e);const Se=S.textures[ue],Ne=Se.format,Oe=Se.type;if(S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ue),!A.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const be=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,be),L.bufferData(L.PIXEL_PACK_BUFFER,de.byteLength,L.STREAM_READ),L.readPixels(F,H,z,V,le.convert(Ne),le.convert(Oe),0);const Je=Y!==null?G.get(Y).__webglFramebuffer:null;x.bindFramebuffer(L.FRAMEBUFFER,Je);const pt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Zp(L,pt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,be),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,de),L.deleteBuffer(be),L.deleteSync(pt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,H=0){const z=Math.pow(2,-H),V=Math.floor(S.image.width*z),de=Math.floor(S.image.height*z),ge=F!==null?F.x:0,ue=F!==null?F.y:0;q.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,ge,ue,V,de),x.unbindTexture()},this.copyTextureToTexture=function(S,F,H=null,z=null,V=0,de=0){let ge,ue,_e,Se,Ne,Oe,be,Je,pt;const dt=S.isCompressedTexture?S.mipmaps[de]:S.image;if(H!==null)ge=H.max.x-H.min.x,ue=H.max.y-H.min.y,_e=H.isBox3?H.max.z-H.min.z:1,Se=H.min.x,Ne=H.min.y,Oe=H.isBox3?H.min.z:0;else{const mt=Math.pow(2,-V);ge=Math.floor(dt.width*mt),ue=Math.floor(dt.height*mt),S.isDataArrayTexture?_e=dt.depth:S.isData3DTexture?_e=Math.floor(dt.depth*mt):_e=1,Se=0,Ne=0,Oe=0}z!==null?(be=z.x,Je=z.y,pt=z.z):(be=0,Je=0,pt=0);const et=le.convert(F.format),Dt=le.convert(F.type);let me;F.isData3DTexture?(q.setTexture3D(F,0),me=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(q.setTexture2DArray(F,0),me=L.TEXTURE_2D_ARRAY):(q.setTexture2D(F,0),me=L.TEXTURE_2D),x.activeTexture(L.TEXTURE0),x.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),x.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),x.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const en=x.getParameter(L.UNPACK_ROW_LENGTH),He=x.getParameter(L.UNPACK_IMAGE_HEIGHT),ln=x.getParameter(L.UNPACK_SKIP_PIXELS),wn=x.getParameter(L.UNPACK_SKIP_ROWS),ni=x.getParameter(L.UNPACK_SKIP_IMAGES);x.pixelStorei(L.UNPACK_ROW_LENGTH,dt.width),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,dt.height),x.pixelStorei(L.UNPACK_SKIP_PIXELS,Se),x.pixelStorei(L.UNPACK_SKIP_ROWS,Ne),x.pixelStorei(L.UNPACK_SKIP_IMAGES,Oe);const Bi=S.isDataArrayTexture||S.isData3DTexture,tt=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const mt=G.get(S),ii=G.get(F),st=G.get(mt.__renderTarget),si=G.get(ii.__renderTarget);x.bindFramebuffer(L.READ_FRAMEBUFFER,st.__webglFramebuffer),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let ki=0;ki<_e;ki++)Bi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,G.get(S).__webglTexture,V,Oe+ki),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,G.get(F).__webglTexture,de,pt+ki)),L.blitFramebuffer(Se,Ne,ge,ue,be,Je,ge,ue,L.DEPTH_BUFFER_BIT,L.NEAREST);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||G.has(S)){const mt=G.get(S),ii=G.get(F);x.bindFramebuffer(L.READ_FRAMEBUFFER,B),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,N);for(let st=0;st<_e;st++)Bi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,mt.__webglTexture,V,Oe+st):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,mt.__webglTexture,V),tt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ii.__webglTexture,de,pt+st):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ii.__webglTexture,de),V!==0?L.blitFramebuffer(Se,Ne,ge,ue,be,Je,ge,ue,L.COLOR_BUFFER_BIT,L.NEAREST):tt?L.copyTexSubImage3D(me,de,be,Je,pt+st,Se,Ne,ge,ue):L.copyTexSubImage2D(me,de,be,Je,Se,Ne,ge,ue);x.bindFramebuffer(L.READ_FRAMEBUFFER,null),x.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else tt?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(me,de,be,Je,pt,ge,ue,_e,et,Dt,dt.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(me,de,be,Je,pt,ge,ue,_e,et,dt.data):L.texSubImage3D(me,de,be,Je,pt,ge,ue,_e,et,Dt,dt):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,de,be,Je,ge,ue,et,Dt,dt.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,de,be,Je,dt.width,dt.height,et,dt.data):L.texSubImage2D(L.TEXTURE_2D,de,be,Je,ge,ue,et,Dt,dt);x.pixelStorei(L.UNPACK_ROW_LENGTH,en),x.pixelStorei(L.UNPACK_IMAGE_HEIGHT,He),x.pixelStorei(L.UNPACK_SKIP_PIXELS,ln),x.pixelStorei(L.UNPACK_SKIP_ROWS,wn),x.pixelStorei(L.UNPACK_SKIP_IMAGES,ni),de===0&&F.generateMipmaps&&L.generateMipmap(me),x.unbindTexture()},this.initRenderTarget=function(S){G.get(S).__webglFramebuffer===void 0&&q.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?q.setTextureCube(S,0):S.isData3DTexture?q.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?q.setTexture2DArray(S,0):q.setTexture2D(S,0),x.unbindTexture()},this.resetState=function(){X=0,k=0,Y=null,x.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}}class R_ extends ga{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new _t;e.deleteAttribute("uv");const t=new Et({side:qt}),n=new Et,s=new nc(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Qe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new or(e,n,6),o=new yt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new Qe(e,ss(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new Qe(e,ss(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new Qe(e,ss(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const d=new Qe(e,ss(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const u=new Qe(e,ss(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new Qe(e,ss(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ss(i){return new wm({color:0,emissive:16777215,emissiveIntensity:i})}const Be={bodyAlbedo:11817007,eye:1842204,splat:15884554,gold:11569758,shellWarm:15263453,shellCool:13095385,mechDark:1710622,coreDark:395563,violetDeep:2958169,violet:8481213,violetRim:15065333,structDark:1515560,structMid:2700355,structHi:3361379,panel:5399675,steelPale:11387080,cyan:3319759,cyanPale:9230551},Es={roughness:.26,emissive:.12},gn={skyColor:6131632,groundColor:5003883,hemiIntensity:1.4,keyColor:14477552,keyIntensity:.62,environmentIntensity:.4,background:855827,fogNear:34,fogFar:96,exposure:1.1};function od(){return typeof window<"u"&&typeof window.matchMedia=="function"?i=>window.matchMedia(i):null}function ld(i=typeof navigator<"u"?navigator:{},e=od()){return(e?e("(pointer: coarse)").matches:!1)&&(i.maxTouchPoints??0)>=1}function P_(i,e,t){const n=i.get("touch");return n==="1"?!0:n==="0"?!1:ld(e,t)}const cd={high:{level:"high",pixelRatioCap:2,maxFixtures:10,shadows:!0,shadowMapSize:1024,anisotropyCap:16,paintTexelsPerMetre:20,paintMapMax:2048,decalCapacity:160,dropletCapacity:160,flashCapacity:8,projectileLights:2,projectileShader:!0,prewarmShaders:!0},medium:{level:"medium",pixelRatioCap:1.5,maxFixtures:7,shadows:!0,shadowMapSize:512,anisotropyCap:8,paintTexelsPerMetre:14,paintMapMax:1024,decalCapacity:96,dropletCapacity:96,flashCapacity:6,projectileLights:2,projectileShader:!0,prewarmShaders:!0},low:{level:"low",pixelRatioCap:1,maxFixtures:4,shadows:!1,shadowMapSize:512,anisotropyCap:4,paintTexelsPerMetre:9,paintMapMax:512,decalCapacity:48,dropletCapacity:48,flashCapacity:4,projectileLights:1,projectileShader:!1,prewarmShaders:!0}};function hd(i){return cd[i]}function lr(i){return i==="high"||i==="medium"||i==="low"}function ud(i=typeof navigator<"u"?navigator:{},e=od()){return ld(i,e)?"low":(i.hardwareConcurrency??8)<=4?"medium":"high"}function I_(i){const e=i.get("quality"),t=lr(e)?e:ud(),n=cd[t];return i.get("basicfx")==="1"&&n.projectileShader?{...n,projectileShader:!1}:n}const Oh=Math.PI/180,Ks={worldFovY:75,weaponFovY:52,maxPortraitFovY:100};function Bh(i,e){if(!(e>0)||e>=1)return i;const t=2*Math.atan(Math.tan(i*Oh/2)/e)/Oh;return Math.min(t,Ks.maxPortraitFovY)}const kh=2;class L_{renderer;scene;camera;viewScene;viewCamera;key;hemi;environment;fixtures=[];placements=[];chosen=[];chosenDistance=[];lastFixtureX=Number.NaN;lastFixtureZ=Number.NaN;sizedWidth=-1;sizedHeight=-1;sizedRatio=-1;maxPixelRatio;quality;keyHeight=3.9;constructor(e,t=hd("high")){this.quality=t,this.maxPixelRatio=t.pixelRatioCap,this.renderer=new C_({canvas:e,antialias:t.level!=="low",powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.maxPixelRatio)),this.renderer.outputColorSpace=Bt,this.renderer.toneMapping=Vl,this.renderer.toneMappingExposure=gn.exposure,this.renderer.shadowMap.enabled=t.shadows,this.renderer.shadowMap.type=Qs,this.renderer.autoClear=!1,this.renderer.info.autoReset=!1,this.scene=new ga,this.scene.background=new Re(gn.background),this.scene.fog=new Ql(gn.background,gn.fogNear,gn.fogFar),this.camera=new Jt(Ks.worldFovY,1,.1,200),this.hemi=new lh(gn.skyColor,gn.groundColor,gn.hemiIntensity),this.scene.add(this.hemi),this.key=new fh(gn.keyColor,gn.keyIntensity),this.key.castShadow=t.shadows,this.key.shadow.mapSize.set(t.shadowMapSize,t.shadowMapSize),this.key.shadow.bias=-.0016,this.key.shadow.normalBias=.03;const n=this.key.shadow.camera;n.near=.5,n.far=38,n.left=-14,n.right=14,n.top=14,n.bottom=-14,n.updateProjectionMatrix(),this.scene.add(this.key),this.scene.add(this.key.target);const s=new Sl(this.renderer);this.environment=s.fromScene(new R_,.04).texture,s.dispose(),this.scene.environment=this.environment,this.scene.environmentIntensity=gn.environmentIntensity,this.viewScene=new ga,this.viewScene.environment=this.environment,this.viewScene.environmentIntensity=1,this.viewCamera=new Jt(Ks.weaponFovY,1,.01,12);const r=new fh(16777215,2.1);r.position.set(.7,1.2,1.4),this.viewScene.add(r),this.viewScene.add(new lh(10470624,2761504,1)),this.resize()}resize(){const e=window.innerWidth,t=window.innerHeight,n=Math.min(window.devicePixelRatio,this.maxPixelRatio);if(e===this.sizedWidth&&t===this.sizedHeight&&n===this.sizedRatio)return!1;this.sizedWidth=e,this.sizedHeight=t,this.sizedRatio=n,this.renderer.setPixelRatio(n),this.renderer.setSize(e,t,!1);const s=e/Math.max(1,t);return this.camera.aspect=s,this.camera.fov=Bh(Ks.worldFovY,s),this.camera.updateProjectionMatrix(),this.viewCamera.aspect=s,this.viewCamera.fov=Bh(Ks.weaponFovY,s),this.viewCamera.updateProjectionMatrix(),!0}setMaxPixelRatio(e){this.maxPixelRatio=Math.max(1,e)}get pixelRatioCap(){return this.maxPixelRatio}get maxAnisotropy(){return Math.min(this.renderer.capabilities.getMaxAnisotropy(),this.quality.anisotropyCap)}configureForFacility(e){this.clearFixtures(),this.placements=e.rooms.flatMap(s=>s.lights);const t=Math.min(this.quality.maxFixtures,this.placements.length);for(let s=0;s<t;s++){const r=new nc(16777215,0,1,2);this.scene.add(r),this.fixtures.push(r)}this.lastFixtureX=Number.NaN,this.lastFixtureZ=Number.NaN;let n=4;for(const s of e.rooms)n=Math.max(n,s.ceilY);this.keyHeight=n-.7}setFixtureFocus(e,t){if(this.fixtures.length===0)return;const n=e-this.lastFixtureX,s=t-this.lastFixtureZ;if(Number.isFinite(n)&&n*n+s*s<kh*kh)return;this.lastFixtureX=e,this.lastFixtureZ=t;const r=this.fixtures.length;this.chosen.length=0,this.chosenDistance.length=0;for(let a=0;a<this.placements.length;a++){const o=this.placements[a],l=o.x-e,c=o.z-t,h=l*l+c*c;if(this.chosen.length===r&&h>=this.chosenDistance[r-1])continue;let d=this.chosen.length<r?this.chosen.length:r-1;for(;d>0&&this.chosenDistance[d-1]>h;)this.chosen[d]=this.chosen[d-1],this.chosenDistance[d]=this.chosenDistance[d-1],d--;this.chosen[d]=a,this.chosenDistance[d]=h}for(let a=0;a<r;a++){const o=this.fixtures[a],l=this.placements[this.chosen[a]??-1];if(!l){o.intensity=0;continue}o.position.set(l.x,l.y,l.z),o.color.setHex(l.color),o.intensity=l.intensity,o.distance=l.distance}}setShadowFocus(e,t){this.key.position.set(e+6,this.keyHeight,t+8),this.key.target.position.set(e,0,t),this.key.target.updateMatrixWorld()}prewarm(){this.quality.prewarmShaders&&(this.renderer.compile(this.scene,this.camera),this.renderer.compile(this.viewScene,this.viewCamera),this.render())}render(){this.renderer.info.reset(),this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.renderer.clearDepth(),this.renderer.render(this.viewScene,this.viewCamera)}get drawCalls(){return this.renderer.info.render.calls}get triangles(){return this.renderer.info.render.triangles}get programCount(){return this.renderer.info.programs?.length??0}get geometryCount(){return this.renderer.info.memory.geometries}get textureCount(){return this.renderer.info.memory.textures}get lightCount(){return this.fixtures.length}get pointLightCount(){let e=0;return this.scene.traverseVisible(t=>{t.isPointLight&&e++}),e}get fixtureCount(){return this.placements.length}clearFixtures(){for(const e of this.fixtures)this.scene.remove(e),e.dispose();this.fixtures.length=0}dispose(){this.clearFixtures(),this.key.shadow.map?.dispose(),this.key.shadow.map=null,this.environment.dispose(),this.renderer.dispose()}}const rs={step:.75,floor:1,minSamples:600,breachRatio:.2};class D_{cap;enabledFlag;downgradeCount=0;eligibleFrames=0;constructor(e,t){this.cap=e,this.enabledFlag=t}get pixelRatioCap(){return this.cap}get downgrades(){return this.downgradeCount}get enabled(){return this.enabledFlag}get exhausted(){return this.cap<=rs.floor}setEnabled(e){this.enabledFlag!==e&&(this.enabledFlag=e,this.eligibleFrames=0)}setBase(e){return this.eligibleFrames=0,this.downgradeCount=0,this.cap===e?!1:(this.cap=e,!0)}consider(e){if(!this.enabledFlag||this.exhausted)return!1;if(!e.runActive||!e.visible||e.timerScheduled)return this.eligibleFrames=0,!1;if(this.eligibleFrames++,this.eligibleFrames<rs.minSamples||e.samples<rs.minSamples||e.breaches/e.samples<rs.breachRatio)return!1;const t=Math.max(rs.floor,this.cap*rs.step);return this.eligibleFrames=0,t===this.cap?!1:(this.cap=t,this.downgradeCount++,!0)}}const N_={floorPlate:2,wallPanel:2,structure:1,ceilingPanel:2,machine:1,machineDark:1,hazard:.5,glass:1,emissive:1,lamp:1,emergency:1};function Ni(i){const e=document.createElement("canvas");e.width=i,e.height=i;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot generate lab textures");return{ctx:t,el:e}}function Si(i,e,t=!0){const n=new ec(i);return n.wrapS=Li,n.wrapT=Li,n.colorSpace=t?Bt:Dn,n.anisotropy=e,n.generateMipmaps=!0,n.minFilter=Fn,n}function kn(i){return`#${i.toString(16).padStart(6,"0")}`}function fr(i,e,t,n,s){for(let r=0;r<n;r++){const a=t()*e,o=t()*e,l=1+t()*3,c=1+t()*3,h=t()<.6;i.fillStyle=h?`rgba(0,0,0,${s})`:`rgba(255,255,255,${s*.7})`,i.fillRect(a,o,l,c)}}function wl(i,e,t,n){i.fillStyle="rgba(0,0,0,0.34)",i.beginPath(),i.arc(e,t+n*.35,n,0,Math.PI*2),i.fill(),i.fillStyle="rgba(255,255,255,0.16)",i.beginPath(),i.arc(e,t,n,0,Math.PI*2),i.fill()}function F_(i,e){const{ctx:t,el:n}=Ni(i),s=i*.028;t.fillStyle=kn(Be.structDark),t.fillRect(0,0,i,i),t.fillStyle=kn(Be.structMid),t.fillRect(s,s,i-s*2,i-s*2),t.fillStyle="rgba(255,255,255,0.05)",t.fillRect(s,s,i-s*2,s*.9),t.fillStyle="rgba(0,0,0,0.18)",t.fillRect(s,i-s*1.9,i-s*2,s*.9),t.strokeStyle="rgba(0,0,0,0.22)",t.lineWidth=Math.max(1,i*.006),t.beginPath(),t.moveTo(i/2,s),t.lineTo(i/2,i-s),t.moveTo(s,i/2),t.lineTo(i-s,i/2),t.stroke();const r=i*.014;for(const[o,l]of[[s*2.6,s*2.6],[i-s*2.6,s*2.6],[s*2.6,i-s*2.6],[i-s*2.6,i-s*2.6]])wl(t,o,l,r);fr(t,i,e,260,.06);const a=Ni(i);return a.ctx.fillStyle="#ffffff",a.ctx.fillRect(0,0,i,i),a.ctx.fillStyle="#b9b9b9",a.ctx.fillRect(s,s,i-s*2,i-s*2),a.ctx.strokeStyle="rgba(255,255,255,0.5)",a.ctx.lineWidth=Math.max(1,i*.006),a.ctx.beginPath(),a.ctx.moveTo(i/2,s),a.ctx.lineTo(i/2,i-s),a.ctx.moveTo(s,i/2),a.ctx.lineTo(i-s,i/2),a.ctx.stroke(),{albedo:n,rough:a.el}}function U_(i,e){const{ctx:t,el:n}=Ni(i),s=i*.022;t.fillStyle=kn(Be.structMid),t.fillRect(0,0,i,i),t.fillStyle=kn(Be.panel),t.fillRect(s,s,i-s*2,i-s*2),t.fillStyle=kn(Be.structMid),t.fillRect(0,i/2-s/2,i,s),t.fillStyle="rgba(0,0,0,0.16)",t.fillRect(i*.16,i*.09,i*.68,i*.28),t.fillStyle="rgba(255,255,255,0.07)",t.fillRect(i*.16,i*.09,i*.68,i*.014);const r=i*.011;for(let a=0;a<4;a++){const o=i*(.09+a*.273);wl(t,o,i*.55,r),wl(t,o,i*.94,r)}for(let a=0;a<26;a++){const o=e()*i,l=1+e()*2.5;t.fillStyle=`rgba(0,0,0,${.02+e()*.03})`,t.fillRect(o,s,l,i-s*2)}return fr(t,i,e,160,.045),n}function O_(i,e){const{ctx:t,el:n}=Ni(i);t.fillStyle=kn(Be.structDark),t.fillRect(0,0,i,i),t.fillStyle=kn(Be.structHi),t.fillRect(0,i*.1,i,i*.8);for(let s=0;s<6;s++){const r=i*(.16+s*.13);t.fillStyle="rgba(0,0,0,0.24)",t.fillRect(0,r,i,i*.028),t.fillStyle="rgba(255,255,255,0.08)",t.fillRect(0,r+i*.028,i,i*.012)}return fr(t,i,e,120,.05),n}function B_(i,e){const{ctx:t,el:n}=Ni(i);t.fillStyle=kn(Be.structHi),t.fillRect(0,0,i,i);const s=i/2,r=s*.09;for(let a=0;a<2;a++)for(let o=0;o<2;o++)t.fillStyle=kn(Be.panel),t.fillRect(o*s+r,a*s+r,s-r*2,s-r*2),t.fillStyle="rgba(255,255,255,0.1)",t.fillRect(o*s+r,a*s+r,s-r*2,r*.5),t.fillStyle="rgba(0,0,0,0.16)",t.fillRect(o*s+r,a*s+s-r*1.5,s-r*2,r*.5);return fr(t,i,e,90,.035),n}function k_(i,e){const{ctx:t,el:n}=Ni(i);t.fillStyle=kn(Be.steelPale),t.fillRect(0,0,i,i),t.fillStyle="rgba(0,0,0,0.14)",t.fillRect(0,i*.46,i,i*.03),t.fillStyle="rgba(255,255,255,0.28)",t.fillRect(0,i*.49,i,i*.012);for(let r=0;r<7;r++)t.fillStyle="rgba(0,0,0,0.34)",t.fillRect(i*(.14+r*.104),i*.64,i*.05,i*.2);const s=t.createLinearGradient(0,i*.7,0,i);return s.addColorStop(0,"rgba(23,32,40,0)"),s.addColorStop(1,"rgba(23,32,40,0.42)"),t.fillStyle=s,t.fillRect(0,i*.7,i,i*.3),fr(t,i,e,140,.05),n}function z_(i){const{ctx:e,el:t}=Ni(i);e.fillStyle="#161514",e.fillRect(0,0,i,i),e.strokeStyle="#c9a227",e.lineWidth=i*.22,e.beginPath();for(let n=-2;n<4;n++){const s=n*i*.5;e.moveTo(s,0),e.lineTo(s+i,i)}return e.stroke(),t}function V_(i){const e=kt("clawd-lab-kit","dressing"),t=Math.min(8,Math.max(1,i)),n=F_(512,e),s=Si(n.albedo,t),r=Si(n.rough,t,!1),a=Si(U_(512,e),t),o=Si(O_(256,e),t),l=Si(B_(256,e),t),c=Si(k_(256,e),t),h=Si(z_(128),t),d=[s,r,a,o,l,c,h],u={floorPlate:new Et({map:s,roughnessMap:r,roughness:.85,metalness:.22}),wallPanel:new Et({map:a,roughness:.8,metalness:.1}),structure:new Et({map:o,roughness:.66,metalness:.34}),ceilingPanel:new Et({map:l,roughness:.86,metalness:.08,color:12898264}),machine:new Et({map:c,roughness:.52,metalness:.18}),machineDark:new Et({color:Be.structDark,roughness:.58,metalness:.45}),hazard:new Et({map:h,roughness:.74,metalness:.12}),glass:new Et({color:Be.steelPale,roughness:.06,metalness:0,transparent:!0,opacity:.24,side:Ln,depthWrite:!1}),emissive:new yn({color:Be.cyan,toneMapped:!0}),lamp:new yn({color:Be.cyanPale,toneMapped:!0}),emergency:new yn({color:14173482,toneMapped:!0})};return{byStyle:u,paintedStyle:"floorPlate",dispose(){for(const f of Object.values(u))f.dispose();for(const f of d)f.dispose()}}}function dd(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Vt;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=zh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][u]);const m=zh(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function zh(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new jt(a,t,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/t;for(let u=0,f=h.count;u<f;u++)for(let m=0;m<t;m++){const v=h.getComponent(u,m);o.setComponent(u+d,m,v)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}const G_=.85,H_=3.05,W_=.66;function Ht(i,e,t){const n=i.get(e);n?n.push(t):i.set(e,[t])}function Wt(i,e,t,n,s=0,r=0){const a=new Xe,o=new Sn(r,s,0,"YXZ");return a.makeRotationFromEuler(o),a.setPosition(e,t,n),i.applyMatrix4(a),i}function X_(i,e){const t=e.scale,n=G_*t,s=H_*t,r=e.y+W_*t;Ht(i,"glass",Wt(new Rt(n,n,s,20,1,!0),e.x,r+s/2,e.z,e.yaw));const a=n*1.09;Ht(i,"machine",Wt(new Rt(a,a,.22*t,20),e.x,r+.09*t,e.z,e.yaw)),Ht(i,"machine",Wt(new Rt(a,a,.26*t,20),e.x,r+s-.1*t,e.z,e.yaw)),Ht(i,"machineDark",Wt(new Rt(a*1.06,a*.94,.3*t,20),e.x,r+s+.13*t,e.z,e.yaw));for(let o=0;o<4;o++){const l=e.yaw+o*Math.PI/2+.4;Ht(i,"machineDark",Wt(new Rt(.045*t,.045*t,s,6),e.x+Math.cos(l)*a,r+s/2,e.z+Math.sin(l)*a))}Ht(i,"machineDark",Wt(new Rt(n*.17,n*.2,s*(.5+e.variant*.3),10),e.x,r+s*.3,e.z,e.yaw)),Ht(i,"emissive",Wt(new Rt(n*.09,n*.09,s*.86,8),e.x,r+s*.5,e.z,e.yaw))}function q_(i,e){const t=e.length??8,n=[.075,.055,.045],s=[0,.17,.3];for(let a=0;a<n.length;a++){const o=new Rt(n[a]*e.scale,n[a]*e.scale,t,8);o.rotateX(Math.PI/2),Ht(i,"machineDark",Wt(o,e.x+s[a]*(e.variant<.5?1:-1),e.y-a*.04,e.z,e.yaw))}const r=Math.max(2,Math.round(t/4));for(let a=0;a<r;a++){const o=e.z-t/2+t/(r-1||1)*a,l=new Rt(.13*e.scale,.13*e.scale,.1*e.scale,8);l.rotateX(Math.PI/2),Ht(i,"machine",Wt(l,e.x+.14,e.y-.02,o,e.yaw))}}function Z_(i,e){Ht(i,"machineDark",Wt(new _t(.86*e.scale,.62*e.scale,.07*e.scale),e.x,e.y+.3*e.scale,e.z,e.yaw,-.38)),Ht(i,"emissive",Wt(new _t(.74*e.scale,.5*e.scale,.02*e.scale),e.x,e.y+.3*e.scale,e.z,e.yaw,-.38)),Ht(i,"machineDark",Wt(new Rt(.035,.035,.16*e.scale,6),e.x,e.y+.06*e.scale,e.z,e.yaw))}function Y_(i,e){Ht(i,"machineDark",Wt(new Rt(.06*e.scale,.08*e.scale,.16*e.scale,8),e.x,e.y,e.z)),Ht(i,"emergency",Wt(new pi(.11*e.scale,10,6,0,Math.PI*2,0,Math.PI*.62),e.x,e.y+.07*e.scale,e.z)),Ht(i,"machineDark",Wt(new Rt(.115*e.scale,.115*e.scale,.03*e.scale,10),e.x,e.y+.06*e.scale,e.z))}function $_(i){const e=new Map;for(const n of i)switch(n.kind){case"containmentTank":X_(e,n);break;case"pipeRun":q_(e,n);break;case"wallConsole":Z_(e,n);break;case"beacon":Y_(e,n);break}const t=new Map;for(const[n,s]of e){for(const a of s)a.deleteAttribute("tangent"),a.deleteAttribute("color");const r=s.length===1?s[0]:dd(s,!1);if(r){if(s.length>1)for(const a of s)a.dispose();r.computeBoundingSphere(),t.set(n,r)}}return t}function K_(){return{position:[],normal:[],uv:[]}}function Vh(i){return i.position.length===0}function J_(i,e,t,n,s,r,a,o){const l=1/Math.max(1e-6,o);as(i,s,t,a,s,t,n,s,r,n,s,r,a,1,0,0,a*l,t*l,n*l,r*l),as(i,e,t,n,e,t,a,e,r,a,e,r,n,-1,0,0,n*l,t*l,a*l,r*l),as(i,e,r,a,s,r,a,s,r,n,e,r,n,0,1,0,e*l,a*l,s*l,n*l),as(i,e,t,n,s,t,n,s,t,a,e,t,a,0,-1,0,e*l,n*l,s*l,a*l),as(i,e,t,a,s,t,a,s,r,a,e,r,a,0,0,1,e*l,t*l,s*l,r*l),as(i,s,t,n,e,t,n,e,r,n,s,r,n,0,0,-1,s*l,t*l,e*l,r*l)}function as(i,e,t,n,s,r,a,o,l,c,h,d,u,f,m,v,g,p,y,w){const M=i.position,b=i.normal,E=i.uv;M.push(e,t,n,s,r,a,o,l,c),M.push(e,t,n,o,l,c,h,d,u);for(let C=0;C<6;C++)b.push(f,m,v);E.push(g,p,y,p,y,w),E.push(g,p,y,w,g,w)}function Gh(i){const e=new Vt;return e.setAttribute("position",new at(new Float32Array(i.position),3)),e.setAttribute("normal",new at(new Float32Array(i.normal),3)),e.setAttribute("uv",new at(new Float32Array(i.uv),2)),e.computeBoundingSphere(),e}const vo=["floorPlate","wallPanel","structure","ceilingPanel","machine","machineDark","hazard","emissive","lamp","emergency","glass"];function Q_(i){if(i.surface)return i.surface;switch(i.kind){case"floor":return"floorPlate";case"wall":return"wallPanel";case"ceiling":return"ceilingPanel";case"prop":return"machine"}}const j_=new Set(["structure","machine","machineDark","hazard","glass"]);class eM{group=new Ri;scene;materials;meshes=[];geometries=[];paintUniforms={uPaintMap:{value:null},uPaintMin:{value:new Ie},uPaintInvSize:{value:new Ie(1,1)},uPaintColor:{value:new Re(Be.splat)},uPaintRoughness:{value:Es.roughness},uPaintEmissive:{value:Es.emissive}};constructor(e,t){this.scene=e,this.materials=t,this.scene.add(this.group),tM(t.byStyle[t.paintedStyle],this.paintUniforms)}build(e,t){this.clear(),t&&(this.paintUniforms.uPaintMap.value=t.map,this.paintUniforms.uPaintMin.value=t.min,this.paintUniforms.uPaintInvSize.value=t.invSize);const n=new Map,s=new Map;for(const o of e.rooms)for(const l of o.brushes){if(l.collisionOnly)continue;const c=Q_(l),h=l.kind==="prop"?s:n;let d=h.get(c);d||(d=K_(),h.set(c,d)),J_(d,l.minX,l.minY,l.minZ,l.maxX,l.maxY,l.maxZ,N_[c])}for(const o of vo){const l=n.get(o);l&&!Vh(l)&&this.addMesh(o,Gh(l),!1)}for(const o of vo){const l=s.get(o);l&&!Vh(l)&&this.addMesh(o,Gh(l),!0)}const r=[];for(const o of e.rooms)for(const l of o.props)r.push(l);const a=$_(r);for(const o of vo){const l=a.get(o);l&&this.addMesh(o,l,!0)}}addMesh(e,t,n){const s=this.materials.byStyle[e],r=new Qe(t,s);r.castShadow=n&&j_.has(e),r.receiveShadow=e!=="glass"&&e!=="emissive"&&e!=="lamp"&&e!=="emergency",r.frustumCulled=!1,e==="glass"&&(r.renderOrder=1),this.group.add(r),this.meshes.push(r),this.geometries.push(t)}clear(){for(const e of this.meshes)this.group.remove(e);for(const e of this.geometries)e.dispose();this.meshes.length=0,this.geometries.length=0}get meshCount(){return this.meshes.length}dispose(){this.clear(),this.scene.remove(this.group)}}function tM(i,e){i.onBeforeCompile=t=>{for(const[n,s]of Object.entries(e))t.uniforms[n]=s;t.vertexShader=t.vertexShader.replace("#include <common>",`
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
        uniform float uPaintEmissive;
        varying vec2 vPaintUv;
        vec4 paintTexel;
      `).replace("#include <color_fragment>",`
        #include <color_fragment>
        paintTexel = texture2D( uPaintMap, vPaintUv );
        {
          // The map is premultiplied, so the stored brightness is recovered by
          // dividing out coverage before it is applied to the splat colour.
          float coverage = clamp( paintTexel.a, 0.0, 1.0 );
          float brightness = paintTexel.r / max( paintTexel.a, 1e-4 );
          diffuseColor.rgb = mix( diffuseColor.rgb, uPaintColor * brightness, coverage );
        }
      `).replace("#include <roughnessmap_fragment>",`
        #include <roughnessmap_fragment>
        roughnessFactor = mix( roughnessFactor, uPaintRoughness, clamp( paintTexel.a, 0.0, 1.0 ) );
      `).replace("#include <emissivemap_fragment>",`
        #include <emissivemap_fragment>
        totalEmissiveRadiance += uPaintColor * uPaintEmissive * clamp( paintTexel.a, 0.0, 1.0 );
      `)},i.customProgramCacheKey=()=>"clawd-floor-paint"}const Hh=new U,Wh=new U,Vr=new U;class nM{positions=[];normals=[];uvs=[];uvScale;constructor(e){this.uvScale=e}tri(e,t,n,s,r,a,o,l,c,h,d,u){Hh.set(s-e,r-t,a-n),Wh.set(o-e,l-t,c-n),Vr.crossVectors(Hh,Wh),Vr.x*h+Vr.y*d+Vr.z*u<0?(this.vertex(e,t,n,h,d,u),this.vertex(o,l,c,h,d,u),this.vertex(s,r,a,h,d,u)):(this.vertex(e,t,n,h,d,u),this.vertex(s,r,a,h,d,u),this.vertex(o,l,c,h,d,u))}quad(e,t,n,s,r,a,o,l,c,h,d,u,f,m,v){this.tri(e,t,n,s,r,a,o,l,c,f,m,v),this.tri(e,t,n,o,l,c,h,d,u,f,m,v)}vertex(e,t,n,s,r,a){this.positions.push(e,t,n),this.normals.push(s,r,a);const o=Math.abs(s),l=Math.abs(r),c=Math.abs(a);o>=l&&o>=c?this.uvs.push(n*this.uvScale,t*this.uvScale):l>=c?this.uvs.push(e*this.uvScale,n*this.uvScale):this.uvs.push(e*this.uvScale,t*this.uvScale)}finish(){const e=new Vt;return e.setAttribute("position",new at(this.positions,3)),e.setAttribute("normal",new at(this.normals,3)),e.setAttribute("uv",new at(this.uvs,2)),e.computeBoundingSphere(),e}}const Pn=1/Math.SQRT2,xo=1/Math.sqrt(3);function Gr(i,e,t,n,s={}){const r=i/2,a=e/2,o=t/2,l=Math.max(0,Math.min(n,Math.min(r,a,o)*.49)),c=r-l,h=a-l,d=o-l,u=new nM(s.uvScale??1),f=s.sockets??[],m=f.length>0?iM(c,h,f):null;for(const v of[1,-1])u.quad(v*r,-h,-d,v*r,h,-d,v*r,h,d,v*r,-h,d,v,0,0),u.quad(-c,v*a,-d,c,v*a,-d,c,v*a,d,-c,v*a,d,0,v,0),v===-1&&f.length>0?aM(u,o,f,m.x,m.y):u.quad(-c,-h,v*o,c,-h,v*o,c,h,v*o,-c,h,v*o,0,0,v);for(const v of[1,-1]){for(const g of[1,-1])u.quad(v*r,g*h,-d,v*c,g*a,-d,v*c,g*a,d,v*r,g*h,d,v*Pn,g*Pn,0);for(const g of[1,-1])g===-1&&m?sM(u,v,r,c,h,d,o,m.y):u.quad(v*r,-h,g*d,v*c,-h,g*o,v*c,h,g*o,v*r,h,g*d,v*Pn,0,g*Pn)}for(const v of[1,-1])for(const g of[1,-1])g===-1&&m?rM(u,v,a,c,h,d,o,m.x):u.quad(-c,v*a,g*d,c,v*a,g*d,c,v*h,g*o,-c,v*h,g*o,0,v*Pn,g*Pn);for(const v of[1,-1])for(const g of[1,-1])for(const p of[1,-1])u.tri(v*r,g*h,p*d,v*c,g*a,p*d,v*c,g*h,p*o,v*xo,g*xo,p*xo);return u.finish()}function iM(i,e,t){const n=new Set([-i,i]),s=new Set([-e,e]);for(const r of t)n.add(r.x-r.width/2),n.add(r.x+r.width/2),s.add(r.y-r.height/2),s.add(r.y+r.height/2);return{x:[...n].sort((r,a)=>r-a),y:[...s].sort((r,a)=>r-a)}}function sM(i,e,t,n,s,r,a,o){const l=e*t,c=e*n,h=e*Pn,d=-Pn;for(let u=0;u<o.length-1;u++)i.tri(l,-s,-r,c,o[u],-a,c,o[u+1],-a,h,0,d);i.tri(l,-s,-r,c,o[o.length-1],-a,l,s,-r,h,0,d)}function rM(i,e,t,n,s,r,a,o){const l=e*t,c=e*s,h=e*Pn,d=-Pn;i.tri(-n,l,-r,n,l,-r,o[o.length-1],c,-a,0,h,d);for(let u=o.length-1;u>0;u--)i.tri(-n,l,-r,o[u],c,-a,o[u-1],c,-a,0,h,d)}function aM(i,e,t,n,s){for(let r=0;r<n.length-1;r++)for(let a=0;a<s.length-1;a++){const o=n[r],l=n[r+1],c=s[a],h=s[a+1],d=(o+l)/2,u=(c+h)/2;t.some(m=>Math.abs(d-m.x)<m.width/2&&Math.abs(u-m.y)<m.height/2)||i.quad(o,c,-e,l,c,-e,l,h,-e,o,h,-e,0,0,-1)}for(const r of t){const a=r.x-r.width/2,o=r.x+r.width/2,l=r.y-r.height/2,c=r.y+r.height/2,h=-e,d=-e+r.depth;i.quad(a,l,h,a,c,h,a,c,d,a,l,d,1,0,0),i.quad(o,l,h,o,c,h,o,c,d,o,l,d,-1,0,0),i.quad(a,l,h,o,l,h,o,l,d,a,l,d,0,1,0),i.quad(a,c,h,o,c,h,o,c,d,a,c,d,0,-1,0),i.quad(a,l,d,o,l,d,o,c,d,a,c,d,0,0,-1)}}const Vs=18;function oM(i=256){const e=document.createElement("canvas");e.width=i,e.height=i;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot build the mottle texture");t.fillStyle="#ffffff",t.fillRect(0,0,i,i);const n=kt("clawd-mottle","specimen"),s=i/Vs;for(let a=0;a<Vs*Vs;a++){const o=a%Vs,l=Math.floor(a/Vs),c=n();let h;if(c<.12)h=Ue(n,.944,.972);else if(c<.42)h=Ue(n,.975,.993);else continue;const d=Math.round(h*255);t.fillStyle=`rgb(${d},${d},${d})`,t.fillRect(o*s,l*s,s,s)}const r=new ec(e);return r.colorSpace=Bt,r.wrapS=Li,r.wrapT=Li,r.minFilter=Fn,r.magFilter=Mt,r.generateMipmaps=!0,r.anisotropy=4,r.needsUpdate=!0,r}const ic=1.46,fd=1,sc=.82,ps=.45,Ti=ps+fd/2,Hr=ic/2-.13-.105,Wr=sc/2-.13-.105,lM=.04,Xh=.02,Tl=.19,pd=.03,va=.27,xa=.27,Xr=Tl+.01,Al=.045,qh=-sc/2+Al-.003+pd/2,cM=[{x:-va,y:xa,width:Xr,height:Xr,depth:Al},{x:va,y:xa,width:Xr,height:Xr,depth:Al}],_o=[{name:"body",shape:"body",px:0,py:Ti,pz:0,dark:!1,gait:0},{name:"eyeLeft",shape:"eye",px:-va,py:Ti+xa,pz:qh,dark:!0,gait:0},{name:"eyeRight",shape:"eye",px:va,py:Ti+xa,pz:qh,dark:!0,gait:0},{name:"sideLeft",shape:"side",px:-.905,py:Ti+.1,pz:0,dark:!1,gait:0},{name:"sideRight",shape:"side",px:ic/2+.175,py:Ti+.1,pz:0,dark:!1,gait:0},{name:"legFrontLeft",shape:"leg",px:-Hr,py:ps/2,pz:-Wr,dark:!1,gait:0},{name:"legFrontRight",shape:"leg",px:Hr,py:ps/2,pz:-Wr,dark:!1,gait:Math.PI},{name:"legRearLeft",shape:"leg",px:-Hr,py:ps/2,pz:Wr,dark:!1,gait:Math.PI},{name:"legRearRight",shape:"leg",px:Hr,py:ps/2,pz:Wr,dark:!1,gait:0}];function hM(i){switch(i){case"body":return Gr(ic,fd,sc,lM,{sockets:cM});case"eye":return Gr(Tl,Tl,pd,.008);case"side":return Gr(.35,.4,.45,Xh);default:return Gr(.21,ps,.21,Xh)}}const uM=new Xe().makeScale(0,0,0);class dM{geometries=new Map;mottle;bodyMaterial;eyeMaterial;slots=[];root=new yt;part=new yt;matrix=new Xe;scene;capacity;constructor(e,t){this.scene=e,this.capacity=t,this.mottle=oM(),this.bodyMaterial=new Et({color:Be.bodyAlbedo,map:this.mottle,roughness:.78,metalness:.02}),this.eyeMaterial=new Et({color:Be.eye,roughness:.45,metalness:0});for(const n of _o){let s=this.geometries.get(n.shape);s||(s=hM(n.shape),this.geometries.set(n.shape,s));const r=new or(s,n.dark?this.eyeMaterial:this.bodyMaterial,t);r.castShadow=!n.dark,r.receiveShadow=!1,r.frustumCulled=!1,r.count=0,this.slots.push(r),this.scene.add(r)}}update(e,t){const n=Math.min(e.length,this.capacity);for(let s=0;s<n;s++){const r=e[s],a=r.def.scale,o=r.prevX+(r.x-r.prevX)*t,l=r.prevZ+(r.z-r.prevZ)*t,c=fM(r.prevYaw,r.yaw,t);let h=1,d=0;r.state==="windUp"?h=1-.22*Math.min(1,r.stateTime/Yn.windUpTime):r.state==="lunge"?(h=1.14,d=.12):r.state==="recover"&&(h=1-.1*(1-Math.min(1,r.stateTime/Yn.recoverTime)));const u=r.hurtTime>0?r.hurtTime/.18:0;h*=1-.18*u;const f=Math.sin(r.gaitPhase)*.035;let m=Math.sin(r.gaitPhase*.5)*.05,v=1,g=1,p=0;if(r.state==="dying"){const w=Math.min(1,r.stateTime/Il.implodeTime),M=w*w;v=1-.85*M,g=1-.42*M,p=.3*M,m=0,h=1}const y=a*g;this.root.position.set(o,r.y+p,l),this.root.rotation.set(0,c+(1-v)*2.6,m),this.root.scale.set(y,y,y),this.root.updateMatrix();for(let w=0;w<_o.length;w++){const M=_o[w],b=w>=5;let E=M.py,C=M.pz;if(b){const P=r.gaitPhase+M.gait,R=Math.max(0,Math.sin(P))*.11;E=M.py+R,C=M.pz+Math.cos(P)*.09}else E=M.py*h+f+d;const _=M.px*v;E=Ti+(E-Ti)*v,C*=v;const T=1-.45*(1-v);this.part.position.set(_,E,C),this.part.rotation.set(0,0,0),this.part.scale.set(T,(b?1:h)*T,T),this.part.updateMatrix(),this.matrix.multiplyMatrices(this.root.matrix,this.part.matrix),this.slots[w].setMatrixAt(s,this.matrix)}}for(let s=0;s<this.slots.length;s++){const r=this.slots[s];if(r.count>n)for(let a=n;a<r.count;a++)r.setMatrixAt(a,uM);r.count=n,r.instanceMatrix.needsUpdate=!0}}dispose(){for(const e of this.slots)this.scene.remove(e),e.dispose();this.slots.length=0;for(const e of this.geometries.values())e.dispose();this.geometries.clear(),this.mottle.dispose(),this.bodyMaterial.dispose(),this.eyeMaterial.dispose()}}function fM(i,e,t){let n=(e-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*t}const pM=`
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
`,mM=`
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
`;function gM(){const i=new dn({vertexShader:pM,fragmentShader:mM,uniforms:{uTime:{value:0},uIntensity:{value:1.15},uDeep:{value:new Re(Be.violetDeep)},uMid:{value:new Re(Be.violet)},uRim:{value:new Re(Be.violetRim)}},transparent:!0,blending:Pi,depthWrite:!1});return{material:i,setTime(e){i.uniforms.uTime.value=e}}}function vM(){return{material:new yn({color:Be.violet,transparent:!0,opacity:.62,blending:Pi,depthWrite:!1}),setTime(){}}}const Zh=2,xM=7,_M=.28;class MM{group=new Ri;cores=[];shells=[];trails=[];lights=[];originIds;originX;originY;originZ;nextOriginSlot=0;coreGeo;shellGeo;trailGeo;coreMat;shell;trailMat;trailDirection=new U;trailMidpoint=new U;trailUp=new U(0,1,0);scene;capacity;lightCount;constructor(e,t,n=!0,s=Zh){this.scene=e,this.capacity=t,this.lightCount=Math.max(0,Math.min(Zh,s)),this.originIds=new Int32Array(t),this.originX=new Float32Array(t),this.originY=new Float32Array(t),this.originZ=new Float32Array(t),this.originIds.fill(-1),this.coreGeo=new pi(rn.radius*.86,16,12),this.shellGeo=new pi(rn.radius*1.4,24,16),this.trailGeo=new Rt(.01,.022,1,8,1,!0),this.coreMat=new yn({color:Be.coreDark}),this.shell=n?gM():vM(),this.trailMat=new yn({color:Be.violet,transparent:!0,opacity:.4,blending:Pi,depthWrite:!1});for(let r=0;r<t;r++){const a=new Qe(this.coreGeo,this.coreMat),o=new Qe(this.shellGeo,this.shell.material),l=new Qe(this.trailGeo,this.trailMat);a.visible=!1,o.visible=!1,l.visible=!1,a.frustumCulled=!1,o.frustumCulled=!1,l.frustumCulled=!1,this.group.add(l,a,o),this.cores.push(a),this.shells.push(o),this.trails.push(l)}for(let r=0;r<this.lightCount;r++){const a=new nc(Be.violet,0,7,2);this.group.add(a),this.lights.push(a)}this.scene.add(this.group)}beginShot(e,t,n,s){let r=-1;for(let a=0;a<this.capacity;a++)if(this.originIds[a]<0){r=a;break}r<0&&(r=this.nextOriginSlot,this.nextOriginSlot=(this.nextOriginSlot+1)%this.capacity),this.originIds[r]=e,this.originX[r]=t,this.originY[r]=n,this.originZ[r]=s}reset(){this.originIds.fill(-1),this.nextOriginSlot=0;for(let e=0;e<this.capacity;e++)this.cores[e].visible=!1,this.shells[e].visible=!1,this.trails[e].visible=!1;for(const e of this.lights)e.intensity=0}update(e,t,n){const s=Math.min(e.length,this.capacity);this.shell.setTime(n);for(let r=0;r<s;r++){const a=e[r];let o=a.prevX+(a.x-a.prevX)*t,l=a.prevY+(a.y-a.prevY)*t,c=a.prevZ+(a.z-a.prevZ)*t,h=-1;for(let v=0;v<this.capacity;v++){if(this.originIds[v]!==a.id)continue;h=v;const g=rn.lifetime-a.life,p=g*rn.speed,y=Math.min(1,p/xM),w=y*y*(3-2*y);o=this.originX[v]+(o-this.originX[v])*w,l=this.originY[v]+(l-this.originY[v])*w,c=this.originZ[v]+(c-this.originZ[v])*w,g>=_M&&(this.originIds[v]=-1,h=-1);break}const d=this.cores[r],u=this.shells[r],f=this.trails[r];if(d.position.set(o,l,c),u.position.set(o,l,c),d.visible=!0,u.visible=!0,h>=0){const v=this.originX[h],g=this.originY[h],p=this.originZ[h];this.trailDirection.set(o-v,l-g,c-p);const y=this.trailDirection.length();y>.001?(this.trailDirection.multiplyScalar(1/y),this.trailMidpoint.set((o+v)*.5,(l+g)*.5,(c+p)*.5),f.position.copy(this.trailMidpoint),f.quaternion.setFromUnitVectors(this.trailUp,this.trailDirection),f.scale.set(1,y,1),f.visible=!0):f.visible=!1}else f.visible=!1;const m=1+Math.sin(n*18+r)*.07;if(u.scale.setScalar(m),u.rotation.set(n*1.3+r,n*2.2+r*2.1,0),r<this.lightCount){const v=this.lights[r];v.position.set(o,l,c),v.intensity=5.5}}for(let r=s;r<this.capacity;r++)this.cores[r].visible=!1,this.shells[r].visible=!1,this.trails[r].visible=!1;for(let r=s;r<this.lightCount;r++)this.lights[r].intensity=0}dispose(){this.scene.remove(this.group),this.coreGeo.dispose(),this.shellGeo.dispose(),this.trailGeo.dispose(),this.coreMat.dispose(),this.shell.material.dispose(),this.trailMat.dispose(),this.cores.length=0,this.shells.length=0,this.trails.length=0;for(const e of this.lights)e.dispose();this.lights.length=0,this.reset()}}const yM=.08,Yh=.55,Ra=8,os=new Float64Array(Ra),ls=new Float64Array(Ra),cs=new Float64Array(Ra);function SM(){return{x:0,y:0,z:0,nx:0,ny:0,nz:0,distance:0}}function bM(i,e,t,n,s,r,a,o,l,c){const h=Math.hypot(n,s),d=h>1e-4,u=d?n/h:0,f=d?s/h:0,m=d?Math.atan2(u,f):r()*Math.PI*2;let v=0;for(let p=0;p<4;p++){const y=m+p*Math.PI/2+(r()-.5)*.5;os[v]=Math.sin(y),ls[v]=(r()-.5)*.5,cs[v]=Math.cos(y),v++}for(os[v]=(r()-.5)*.3,ls[v]=1,cs[v]=(r()-.5)*.3,v++,d&&(os[v]=u,ls[v]=.12,cs[v]=f,v++);v<Ra;){const p=r()*Math.PI*2,y=r()*.8-.1;os[v]=Math.sin(p),ls[v]=y,cs[v]=Math.cos(p),v++}let g=0;for(let p=0;p<v&&g<c;p++){const y=Math.hypot(os[p],ls[p],cs[p]);if(y<1e-6)continue;const w=os[p]/y*o,M=ls[p]/y*o,b=cs[p]/y*o;let E=Number.POSITIVE_INFINITY,C=0,_=0,T=0;for(let X=0;X<a.length;X++){const k=a[X];if(k.kind==="floor")continue;const Y=js(i,e,t,w,M,b,k,0,Kt);Y>=0&&Y<E&&(E=Y,C=Kt.nx,_=Kt.ny,T=Kt.nz)}if(!Number.isFinite(E))continue;const P=E*o;if(P<yM)continue;const R=i+w*E,D=e+M*E,W=t+b*E;let B=!1;for(let X=0;X<g;X++){const k=l[X],Y=k.x-R,j=k.y-D,ne=k.z-W;if(Y*Y+j*j+ne*ne<Yh*Yh){B=!0;break}}if(B)continue;const N=l[g];N.x=R,N.y=D,N.z=W,N.nx=C,N.ny=_,N.nz=T,N.distance=P,g++}return g}const _a=4,Ma=.5,EM=.12;function wM(i=256){const e=document.createElement("canvas");e.width=i*2,e.height=i*2;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot build the splat atlas");t.clearRect(0,0,e.width,e.height),t.fillStyle="#ffffff";for(let s=0;s<_a;s++){const r=s%2,a=Math.floor(s/2);t.save(),t.translate(r*i,a*i),t.beginPath(),t.rect(0,0,i,i),t.clip(),TM(t,i,kt("splat-atlas",`variant-${s}`)),t.restore()}const n=new ec(e);return n.colorSpace=Bt,n.wrapS=an,n.wrapT=an,n.minFilter=Fn,n.magFilter=Mt,n.generateMipmaps=!0,n.anisotropy=4,n.needsUpdate=!0,{texture:n,variantOffset(s,r){const a=s%_a;return r.set(a%2*Ma,Math.floor(a/2)*Ma)},dispose(){n.dispose()}}}function TM(i,e,t){const n=e/2,s=e/2,r=e/2*(1-EM),a=9+Math.floor(t()*5),o=t()*Math.PI*2;for(let c=0;c<a;c++){const h=c/a*Math.PI*2+Ue(t,-.16,.16);AM(i,n,s,o+h,r*Ue(t,.52,.98),r*Ue(t,.115,.165),Ue(t,-.3,.3),t)}Cl(i,n,s,r*Ue(t,.3,.38),20,.16,t);const l=5+Math.floor(t()*6);for(let c=0;c<l;c++){const h=t()*Math.PI*2,d=r*Ue(t,.62,.99);Cl(i,n+Math.cos(h)*d,s+Math.sin(h)*d,r*Ue(t,.018,.052),9,.3,t)}}const ms=16,hs=new Float64Array((ms+1)*2),qr=new Float64Array((ms+1)*2);function AM(i,e,t,n,s,r,a,o){for(let c=0;c<=ms;c++){const h=c/ms,d=n+a*h*h,u=s*h,f=e+Math.cos(d)*u,m=t+Math.sin(d)*u,v=1-.62*h,g=1+.85*Math.exp(-(((h-.9)/.11)**2)),p=r*v*g,y=-Math.sin(d),w=Math.cos(d);hs[c*2]=f+y*p,hs[c*2+1]=m+w*p,qr[c*2]=f-y*p,qr[c*2+1]=m-w*p}i.beginPath(),i.moveTo(hs[0],hs[1]);for(let c=1;c<=ms;c++)i.lineTo(hs[c*2],hs[c*2+1]);for(let c=ms;c>=0;c--)i.lineTo(qr[c*2],qr[c*2+1]);i.closePath(),i.fill();const l=n+a;Cl(i,e+Math.cos(l)*s,t+Math.sin(l)*s,r*Ue(o,.42,.62),10,.26,o)}function Cl(i,e,t,n,s,r,a){if(n<=.2)return;const o=new Float64Array(s),l=new Float64Array(s);for(let c=0;c<s;c++){const h=c/s*Math.PI*2,d=n*(1+Ue(a,-r,r));o[c]=e+Math.cos(h)*d,l[c]=t+Math.sin(h)*d}i.beginPath(),i.moveTo((o[s-1]+o[0])/2,(l[s-1]+l[0])/2);for(let c=0;c<s;c++){const h=(c+1)%s;i.quadraticCurveTo(o[c],l[c],(o[c]+o[h])/2,(l[c]+l[h])/2)}i.closePath(),i.fill()}const Gs=4.5,$h=4,Kh=8,CM=.84,RM=.5,Mo=.012,yo=new Xe().makeScale(0,0,0);class PM{renderer;scene;atlas;paintTexelsPerMetre;paintMapMax;paintTarget=null;paintMin=new Ie;paintInvSize=new Ie;stampScene=new ga;stampCamera=new Ta(-1,1,1,-1,0,1);stampGeometry;stampMaterial;stampTransform;stampParams;stampMesh;decalCapacity;decalSoftCap;decalGeometry;decalMaterial;decalMesh;decalAttr;decalOrder;decalFade;decalFading;decalCounter=0;decalActive=0;hits=[];normal=new U;forward=new U(0,0,1);rollAxis=new U;quaternion=new ti;roll=new ti;matrix=new Xe;position=new U;scaleVec=new U;variantUv=new Ie;savedClear=new Re;index=null;nearby=[];rng=kt("boot","effects");constructor(e,t,n={}){this.renderer=e,this.scene=t,this.paintTexelsPerMetre=n.paintTexelsPerMetre??20,this.paintMapMax=n.paintMapMax??2048,this.decalCapacity=n.decalCapacity??96,this.decalSoftCap=Math.floor(this.decalCapacity*CM),this.atlas=wM();for(let s=0;s<$h;s++)this.hits.push(SM());this.stampGeometry=IM(Kh),this.stampTransform=this.stampGeometry.getAttribute("aStamp"),this.stampParams=this.stampGeometry.getAttribute("aParams"),this.stampMaterial=LM(this.atlas.texture),this.stampMesh=new Qe(this.stampGeometry,this.stampMaterial),this.stampMesh.frustumCulled=!1,this.stampScene.add(this.stampMesh),this.decalGeometry=new dr(1,1),this.decalAttr=new ar(new Float32Array(this.decalCapacity*4),4),this.decalGeometry.setAttribute("aSplat",this.decalAttr),this.decalMaterial=DM(this.atlas.texture),this.decalMesh=new or(this.decalGeometry,this.decalMaterial,this.decalCapacity),this.decalMesh.frustumCulled=!1,this.decalMesh.castShadow=!1,this.decalMesh.receiveShadow=!0,this.decalMesh.count=this.decalCapacity,this.decalMesh.renderOrder=1,this.decalOrder=new Float64Array(this.decalCapacity).fill(-1),this.decalFade=new Float32Array(this.decalCapacity),this.decalFading=new Uint8Array(this.decalCapacity);for(let s=0;s<this.decalCapacity;s++)this.decalMesh.setMatrixAt(s,yo);this.decalMesh.instanceMatrix.needsUpdate=!0,this.scene.add(this.decalMesh)}beginFacility(e,t,n){this.index=t,this.rng=kt(n,"effects");const s=Math.max(1,e.maxX-e.minX),r=Math.max(1,e.maxZ-e.minZ);this.paintMin.set(e.minX,e.minZ),this.paintInvSize.set(1/s,1/r);const a=Math.min(this.paintTexelsPerMetre,this.paintMapMax/Math.max(s,r)),o=Math.max(64,Math.round(s*a)),l=Math.max(64,Math.round(r*a));this.paintTarget&&(this.paintTarget.width!==o||this.paintTarget.height!==l)&&(this.paintTarget.dispose(),this.paintTarget=null),this.paintTarget||(this.paintTarget=new Mn(o,l,{depthBuffer:!1,stencilBuffer:!1,format:un,type:Qt,colorSpace:Dn,minFilter:Mt,magFilter:Mt,generateMipmaps:!1}),this.paintTarget.texture.wrapS=an,this.paintTarget.texture.wrapT=an),this.stampMaterial.uniforms.uPaintMin.value.copy(this.paintMin),this.stampMaterial.uniforms.uPaintInvSize.value.copy(this.paintInvSize),this.clearPaint(),this.clearDecals()}get floorPaint(){return this.paintTarget?{map:this.paintTarget.texture,min:this.paintMin,invSize:this.paintInvSize}:null}splat(e,t,n,s,r,a){this.stampFloor(e,n,s,r,a),this.placeDecals(e,t,n,s,r,a)}update(e){if(this.decalActive===0)return;let t=!1;for(let n=0;n<this.decalCapacity;n++){if(this.decalOrder[n]<0||this.decalFading[n]===0)continue;const s=this.decalFade[n]-e/RM;s<=0?this.freeDecal(n):(this.decalFade[n]=s,this.decalAttr.array[n*4+2]=s),t=!0}t&&(this.decalAttr.needsUpdate=!0,this.decalMesh.instanceMatrix.needsUpdate=!0)}dispose(){this.scene.remove(this.decalMesh),this.decalMesh.dispose(),this.decalGeometry.dispose(),this.decalMaterial.dispose(),this.stampScene.remove(this.stampMesh),this.stampGeometry.dispose(),this.stampMaterial.dispose(),this.paintTarget?.dispose(),this.paintTarget=null,this.atlas.dispose()}stampFloor(e,t,n,s,r){const a=this.paintTarget;if(!a)return;const o=this.stampTransform.array,l=this.stampParams.array,c=this.rng,h=Math.hypot(s,r),d=h>1e-4?s/h:0,u=h>1e-4?r/h:0;let f=0;const m=(p,y,w,M)=>{f>=Kh||(o[f*4]=p,o[f*4+1]=y,o[f*4+2]=c()*Math.PI*2,o[f*4+3]=w,this.atlas.variantOffset(Math.floor(c()*_a),this.variantUv),l[f*3]=this.variantUv.x,l[f*3+1]=this.variantUv.y,l[f*3+2]=M,f++)};m(e,t,3*n,Ue(c,.9,1.12));const v=4+Math.floor(c()*3);for(let p=0;p<v;p++){const y=Ue(c,-1.15,1.15),w=d*Math.cos(y)-u*Math.sin(y),M=d*Math.sin(y)+u*Math.cos(y),b=Ue(c,.8,2.6)*n,E=c()*Math.PI*2,C=h>1e-4?0:Ue(c,.8,2.4)*n;m(e+w*b+Math.cos(E)*C,t+M*b+Math.sin(E)*C,Ue(c,.7,1.7)*n,Ue(c,.78,1.15))}this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=f;const g=this.renderer.getRenderTarget();this.renderer.setRenderTarget(a),this.renderer.render(this.stampScene,this.stampCamera),this.renderer.setRenderTarget(g)}clearPaint(){const e=this.paintTarget;if(!e)return;this.renderer.getClearColor(this.savedClear);const t=this.renderer.getClearAlpha(),n=this.renderer.getRenderTarget();this.renderer.setRenderTarget(e),this.renderer.setClearColor(0,0),this.renderer.clear(!0,!1,!1),this.renderer.setRenderTarget(n),this.renderer.setClearColor(this.savedClear,t)}placeDecals(e,t,n,s,r,a){const o=t+.9*s,l=this.index;if(!l)return;l.query(e-Gs,n-Gs,e+Gs,n+Gs,this.nearby);const c=bM(e,o,n,r,a,this.rng,this.nearby,Gs,this.hits,$h);for(let h=0;h<c;h++){const d=this.hits[h],u=this.allocateDecal();if(u<0)break;this.normal.set(d.nx,d.ny,d.nz),this.quaternion.setFromUnitVectors(this.forward,this.normal),this.rollAxis.copy(this.normal),this.roll.setFromAxisAngle(this.rollAxis,this.rng()*Math.PI*2),this.quaternion.premultiply(this.roll);const f=Math.max(1.1,2.5-.16*d.distance)*s*Ue(this.rng,.85,1.15);this.position.set(d.x+d.nx*Mo,d.y+d.ny*Mo,d.z+d.nz*Mo),this.scaleVec.set(f,f,1),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.decalMesh.setMatrixAt(u,this.matrix),this.atlas.variantOffset(Math.floor(this.rng()*_a),this.variantUv),this.decalAttr.array[u*4]=this.variantUv.x,this.decalAttr.array[u*4+1]=this.variantUv.y,this.decalAttr.array[u*4+2]=1,this.decalAttr.array[u*4+3]=Ue(this.rng,.82,1.14)}c>0&&(this.decalMesh.instanceMatrix.needsUpdate=!0,this.decalAttr.needsUpdate=!0,this.retireOldest())}allocateDecal(){for(let t=0;t<this.decalCapacity;t++)if(this.decalOrder[t]<0)return this.decalOrder[t]=this.decalCounter++,this.decalFade[t]=1,this.decalFading[t]=0,this.decalActive++,t;let e=-1;for(let t=0;t<this.decalCapacity;t++)this.decalFading[t]!==0&&(e<0||this.decalOrder[t]<this.decalOrder[e])&&(e=t);if(e<0){e=0;for(let t=1;t<this.decalCapacity;t++)this.decalOrder[t]<this.decalOrder[e]&&(e=t)}return this.decalOrder[e]=this.decalCounter++,this.decalFade[e]=1,this.decalFading[e]=0,e}retireOldest(){let e=0;for(let n=0;n<this.decalCapacity;n++)this.decalOrder[n]>=0&&this.decalFading[n]===0&&e++;let t=e-this.decalSoftCap;for(;t>0;){let n=-1;for(let s=0;s<this.decalCapacity;s++)this.decalOrder[s]<0||this.decalFading[s]===1||(n<0||this.decalOrder[s]<this.decalOrder[n])&&(n=s);if(n<0)return;this.decalFading[n]=1,t--}}freeDecal(e){this.decalOrder[e]<0||(this.decalOrder[e]=-1,this.decalFade[e]=0,this.decalFading[e]=0,this.decalAttr.array[e*4+2]=0,this.decalMesh.setMatrixAt(e,yo),this.decalActive--)}clearDecals(){for(let e=0;e<this.decalCapacity;e++)this.decalOrder[e]=-1,this.decalFade[e]=0,this.decalFading[e]=0,this.decalAttr.array[e*4+2]=0,this.decalMesh.setMatrixAt(e,yo);this.decalCounter=0,this.decalActive=0,this.decalAttr.needsUpdate=!0,this.decalMesh.instanceMatrix.needsUpdate=!0}get decalCount(){return this.decalActive}get settledDecalCount(){let e=0;for(let t=0;t<this.decalCapacity;t++)this.decalOrder[t]>=0&&this.decalFading[t]===0&&e++;return e}}function IM(i){const e=new Pm;return e.setAttribute("position",new jt(new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),3)),e.setAttribute("uv",new jt(new Float32Array([0,0,1,0,1,1,0,1]),2)),e.setIndex([0,1,2,0,2,3]),e.setAttribute("aStamp",new ar(new Float32Array(i*4),4)),e.setAttribute("aParams",new ar(new Float32Array(i*3),3)),e.instanceCount=0,e}function LM(i){return new dn({uniforms:{uAtlas:{value:i},uPaintMin:{value:new Ie},uPaintInvSize:{value:new Ie}},vertexShader:`
      attribute vec4 aStamp;
      attribute vec3 aParams;
      uniform vec2 uPaintMin;
      uniform vec2 uPaintInvSize;
      varying vec2 vUv;
      varying float vBrightness;

      void main() {
        float c = cos( aStamp.z );
        float s = sin( aStamp.z );
        vec2 local = position.xy * aStamp.w;
        vec2 world = aStamp.xy + vec2( local.x * c - local.y * s, local.x * s + local.y * c );
        vec2 paintUv = ( world - uPaintMin ) * uPaintInvSize;
        gl_Position = vec4( paintUv * 2.0 - 1.0, 0.0, 1.0 );
        vUv = uv * ${Ma.toFixed(4)} + aParams.xy;
        vBrightness = aParams.z;
      }
    `,fragmentShader:`
      uniform sampler2D uAtlas;
      varying vec2 vUv;
      varying float vBrightness;

      void main() {
        float coverage = texture2D( uAtlas, vUv ).a;
        if ( coverage <= 0.004 ) discard;
        gl_FragColor = vec4( vBrightness * coverage, 0.0, 0.0, coverage );
      }
    `,transparent:!0,depthTest:!1,depthWrite:!1,blending:Tu,blendEquation:$n,blendSrc:Fo,blendDst:nr,blendEquationAlpha:$n,blendSrcAlpha:Fo,blendDstAlpha:nr})}function DM(i){const e=new Et({color:Be.splat,emissive:Be.splat,emissiveIntensity:Es.emissive,roughness:Es.roughness,metalness:0,transparent:!0,depthWrite:!1,alphaTest:.04,side:Qn,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4});return e.onBeforeCompile=t=>{t.uniforms.uSplatAtlas={value:i},t.vertexShader=t.vertexShader.replace("#include <common>",`
        #include <common>
        attribute vec4 aSplat;
        varying vec2 vSplatUv;
        varying vec2 vSplatFadeBright;
      `).replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vSplatUv = uv * ${Ma.toFixed(4)} + aSplat.xy;
        vSplatFadeBright = aSplat.zw;
      `),t.fragmentShader=t.fragmentShader.replace("#include <common>",`
        #include <common>
        uniform sampler2D uSplatAtlas;
        varying vec2 vSplatUv;
        varying vec2 vSplatFadeBright;
      `).replace("#include <color_fragment>",`
        #include <color_fragment>
        diffuseColor.a *= texture2D( uSplatAtlas, vSplatUv ).a * vSplatFadeBright.x;
        diffuseColor.rgb *= vSplatFadeBright.y;
      `)},e.customProgramCacheKey=()=>"clawd-splat-decal",e}const NM=16,FM=.85,UM=16,OM=7,Jh=.13,Zr=new Xe().makeScale(0,0,0);class BM{scene;dropletCapacity;dropletGeometry;dropletMaterial;droplets;px;py;pz;vx;vy;vz;size;spin;life;nextDroplet=0;activeDroplets=0;flashCapacity;flashGeometry;flashMaterial;flashes;flashX;flashY;flashZ;flashScale;flashLife;nextFlash=0;matrix=new Xe;position=new U;quaternion=new ti;euler=new Sn;scaleVec=new U;colour=new Re;floorY=0;rng=kt("boot","effects-burst");constructor(e,t={}){this.scene=e,this.dropletCapacity=t.dropletCapacity??160,this.flashCapacity=t.flashCapacity??6,this.dropletGeometry=new _t(1,1,1),this.dropletMaterial=new Et({color:Be.splat,emissive:Be.splat,emissiveIntensity:Es.emissive,roughness:Es.roughness,metalness:0}),this.droplets=new or(this.dropletGeometry,this.dropletMaterial,this.dropletCapacity),this.droplets.frustumCulled=!1,this.droplets.castShadow=!1,this.droplets.count=this.dropletCapacity,this.px=new Float32Array(this.dropletCapacity),this.py=new Float32Array(this.dropletCapacity),this.pz=new Float32Array(this.dropletCapacity),this.vx=new Float32Array(this.dropletCapacity),this.vy=new Float32Array(this.dropletCapacity),this.vz=new Float32Array(this.dropletCapacity),this.size=new Float32Array(this.dropletCapacity),this.spin=new Float32Array(this.dropletCapacity),this.life=new Float32Array(this.dropletCapacity),this.flashGeometry=new pi(.5,12,8),this.flashMaterial=new yn({color:Be.splat,transparent:!0,opacity:.52,blending:Pi,depthWrite:!1}),this.flashes=new or(this.flashGeometry,this.flashMaterial,this.flashCapacity),this.flashes.frustumCulled=!1,this.flashes.count=this.flashCapacity,this.flashes.renderOrder=2,this.flashX=new Float32Array(this.flashCapacity),this.flashY=new Float32Array(this.flashCapacity),this.flashZ=new Float32Array(this.flashCapacity),this.flashScale=new Float32Array(this.flashCapacity),this.flashLife=new Float32Array(this.flashCapacity),this.reset(),this.scene.add(this.droplets),this.scene.add(this.flashes)}beginRoom(e,t){this.floorY=e,this.rng=kt(t,"effects-burst"),this.reset()}burst(e,t,n,s,r,a){const o=this.rng,l=t+.72*s;this.spawnFlash(e,l,n,s);const c=Math.round(NM*s);for(let h=0;h<c;h++){const d=this.nextDroplet;this.nextDroplet=(this.nextDroplet+1)%this.dropletCapacity,this.life[d]<=0&&this.activeDroplets++;const u=o()*Math.PI*2,f=Ue(o,.25,1),m=Ue(o,2.4,6.2)*s,v=Math.sqrt(Math.max(0,1-f*f));this.px[d]=e+Math.cos(u)*.12*s,this.py[d]=l,this.pz[d]=n+Math.sin(u)*.12*s,this.vx[d]=(Math.cos(u)*v+r*.55)*m,this.vy[d]=f*m*.85,this.vz[d]=(Math.sin(u)*v+a*.55)*m,this.size[d]=Ue(o,.07,.19)*s,this.spin[d]=Ue(o,-14,14),this.life[d]=FM*Ue(o,.7,1.15)}}update(e,t){let n=!1;for(let r=0;r<this.dropletCapacity;r++){if(this.life[r]<=0)continue;n=!0;const a=this.life[r]-e;if(this.life[r]=a,a<=0){this.activeDroplets--,this.droplets.setMatrixAt(r,Zr);continue}this.vy[r]=this.vy[r]-UM*e,this.px[r]=this.px[r]+this.vx[r]*e,this.py[r]=this.py[r]+this.vy[r]*e,this.pz[r]=this.pz[r]+this.vz[r]*e;const o=this.floorY+this.size[r]*.5;if(this.py[r]<=o){this.py[r]=o,this.vy[r]=0;const h=Math.max(0,1-OM*e);this.vx[r]=this.vx[r]*h,this.vz[r]=this.vz[r]*h}const l=Math.min(1,a/.22),c=this.size[r]*l;this.position.set(this.px[r],this.py[r],this.pz[r]),this.euler.set(t*this.spin[r],t*this.spin[r]*.7,0),this.quaternion.setFromEuler(this.euler),this.scaleVec.set(c,c,c),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.droplets.setMatrixAt(r,this.matrix)}n&&(this.droplets.instanceMatrix.needsUpdate=!0);let s=!1;for(let r=0;r<this.flashCapacity;r++){if(this.flashLife[r]<=0)continue;s=!0;const a=this.flashLife[r]-e;if(this.flashLife[r]=a,a<=0){this.flashes.setMatrixAt(r,Zr);continue}const o=1-a/Jh,l=this.flashScale[r]*(.35+1.25*Math.sqrt(o));this.position.set(this.flashX[r],this.flashY[r],this.flashZ[r]),this.quaternion.identity(),this.scaleVec.set(l,l,l),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.flashes.setMatrixAt(r,this.matrix);const c=Math.max(0,1-o);this.colour.setHex(Be.splat).multiplyScalar(c*c*c),this.flashes.setColorAt(r,this.colour)}s&&(this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0))}get dropletCount(){return this.activeDroplets}reset(){this.life.fill(0),this.flashLife.fill(0),this.nextDroplet=0,this.nextFlash=0,this.activeDroplets=0;for(let e=0;e<this.dropletCapacity;e++)this.droplets.setMatrixAt(e,Zr);for(let e=0;e<this.flashCapacity;e++)this.flashes.setMatrixAt(e,Zr),this.flashes.setColorAt(e,this.colour.setHex(Be.splat));this.droplets.instanceMatrix.needsUpdate=!0,this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0)}dispose(){this.scene.remove(this.droplets),this.scene.remove(this.flashes),this.droplets.dispose(),this.flashes.dispose(),this.dropletGeometry.dispose(),this.dropletMaterial.dispose(),this.flashGeometry.dispose(),this.flashMaterial.dispose()}spawnFlash(e,t,n,s){const r=this.nextFlash;this.nextFlash=(this.nextFlash+1)%this.flashCapacity,this.flashX[r]=e,this.flashY[r]=t,this.flashZ[r]=n,this.flashScale[r]=.95*s,this.flashLife[r]=Jh}}const Hs=new U(.42,-.14,-.8),So=.16,bo=-.02,Eo=.05,kM=.84,Ws=-.63,Qh=.16,zM=.32;function hn(i,e,t=20){const n=new Rt(i,i,e,t,1);return n.rotateX(Math.PI/2),n}function VM(i,e,t,n=20){const s=new Rt(i,e,t,n,1);return s.rotateX(Math.PI/2),s}function jh(i,e,t=16){const n=new Rt(i,i,e,t,1);return n.rotateZ(Math.PI/2),n}function Yr(i,e,t=24){return new wa(i,e,8,t)}function eu(i,e,t=24){const n=new wa(i,e,8,t);return n.rotateY(Math.PI/2),n}class GM{group=new Ri;materials=new Map;geometries=[];meshes=[];core;rotor;muzzleLaunchCore;muzzleLaunchBolt;emissiveMaterial;muzzleLaunchMaterial;emissiveBase=new Re(Be.violet);muzzleClip=new U;muzzleRay=new U;swayX=0;swayY=0;recoil=0;bob=0;spin=0;muzzleLaunchTime=0;viewScene;constructor(e){this.viewScene=e,this.materials.set("gold",new Et({color:Be.gold,metalness:.95,roughness:.26,envMapIntensity:1.5})),this.materials.set("shellWarm",new Et({color:Be.shellWarm,metalness:.28,roughness:.34,envMapIntensity:1.1})),this.materials.set("shellCool",new Et({color:Be.shellCool,metalness:.72,roughness:.3,envMapIntensity:1.3})),this.materials.set("dark",new Et({color:Be.mechDark,metalness:.6,roughness:.5})),this.materials.set("accent",new Et({color:9380896,metalness:.3,roughness:.4})),this.emissiveMaterial=new yn({color:Be.violet}),this.materials.set("emissive",this.emissiveMaterial),this.muzzleLaunchMaterial=new yn({color:Be.violetRim,transparent:!0,opacity:0,blending:Pi,depthWrite:!1});const t=new Map,n=(l,c,h=0,d=0,u=0)=>{c.translate(h,d,u);const f=t.get(l);f?f.push(c):t.set(l,[c])};n("dark",hn(.058,1.05,16),0,0,-.14),n("shellCool",hn(.092,.66),0,0,-.12),n("gold",hn(.108,.1),0,0,-.4),n("gold",hn(.106,.075),0,0,-.2),n("gold",hn(.104,.06),0,0,0),n("gold",hn(.102,.05),0,0,.17),n("shellWarm",hn(.098,.075),0,0,-.5),n("gold",hn(.092,.055),0,0,-.555),n("shellCool",hn(.082,.035),0,0,-.593),n("gold",VM(.07,.08,.03),0,0,Ws),n("shellWarm",new _t(.185,.15,.22),0,-.005,.29),n("gold",new _t(.196,.028,.2),0,.078,.29),n("gold",new _t(.196,.024,.16),0,-.085,.29),n("dark",new _t(.13,.105,.035),0,-.005,.405),n("gold",new _t(.152,.126,.018),0,-.005,.393),n("dark",new _t(.06,.085,.16),0,-.125,.19),n("shellWarm",new _t(.115,.055,.4),0,.108,-.12),n("gold",new _t(.102,.03,.2),0,.148,.02);for(let l=0;l<5;l++)n("dark",new _t(.082,.014,.012),0,.161,-.06+l*.04);n("gold",new _t(.036,.115,.34),-.098,.015,.06),n("dark",new _t(.013,.055,.26),-.12,.015,.06),n("gold",eu(.08,.015),-.092,0,-.17),n("dark",jh(.07,.026),-.088,0,-.17),n("emissive",eu(.052,.01),-.102,0,-.17),n("shellCool",jh(.028,.046),-.106,0,-.17),n("emissive",Yr(.046,.008),0,0,-.558),n("emissive",Yr(.035,.007),0,0,-.596),n("emissive",Yr(.024,.006),0,0,Ws+.006),n("shellCool",hn(.012,.22,10),-.082,-.095,.12),n("accent",hn(.019,.05,10),-.082,-.095,.235);for(const[l,c]of t){const h=dd(c,!1);for(const u of c)u.dispose();if(!h)continue;this.geometries.push(h);const d=new Qe(h,this.materials.get(l));this.group.add(d),this.meshes.push(d)}const s=new pi(.036,14,10);this.geometries.push(s),this.core=new Qe(s,this.emissiveMaterial),this.core.position.set(0,0,Ws+.01),this.group.add(this.core);const r=new pi(.055,12,8);this.geometries.push(r),this.muzzleLaunchCore=new Qe(r,this.muzzleLaunchMaterial),this.muzzleLaunchCore.visible=!1,this.group.add(this.muzzleLaunchCore),this.meshes.push(this.muzzleLaunchCore);const a=hn(.022,1,8);this.geometries.push(a),this.muzzleLaunchBolt=new Qe(a,this.muzzleLaunchMaterial),this.muzzleLaunchBolt.visible=!1,this.group.add(this.muzzleLaunchBolt),this.meshes.push(this.muzzleLaunchBolt);const o=Yr(.104,.013,28);this.geometries.push(o),this.rotor=new Qe(o,this.materials.get("gold")),this.rotor.position.set(0,0,-.4),this.group.add(this.rotor),this.group.position.copy(Hs),this.group.rotation.set(bo,So,Eo),this.group.scale.setScalar(kM),this.viewScene.add(this.group)}writeMuzzleWorld(e,t,n){this.group.updateWorldMatrix(!0,!0),this.core.getWorldPosition(this.muzzleClip),this.muzzleClip.project(t),this.muzzleRay.set(this.muzzleClip.x,this.muzzleClip.y,.5).unproject(e).sub(e.position).normalize(),n.copy(e.position).addScaledVector(this.muzzleRay,.72)}kick(){this.recoil=1,this.muzzleLaunchTime=Qh}reset(){this.swayX=0,this.swayY=0,this.recoil=0,this.bob=0,this.spin=0,this.muzzleLaunchTime=0,this.group.position.copy(Hs),this.group.rotation.set(bo,So,Eo),this.core.scale.setScalar(1.2),this.emissiveMaterial.color.copy(this.emissiveBase),this.rotor.rotation.z=0,this.muzzleLaunchCore.visible=!1,this.muzzleLaunchBolt.visible=!1,this.muzzleLaunchMaterial.opacity=0}update(e,t,n,s,r){const a=Math.max(-.05,Math.min(.05,-t*.9)),o=Math.max(-.05,Math.min(.05,-n*.9));this.swayX=fs(this.swayX,a,9,e),this.swayY=fs(this.swayY,o,9,e),this.recoil=fs(this.recoil,0,11,e),this.bob=fs(this.bob,s>.4?1:0,6,e);const l=r*9.5,c=Math.sin(l)*.012*this.bob,h=Math.abs(Math.cos(l))*.014*this.bob;this.group.position.set(Hs.x+this.swayX+c,Hs.y+this.swayY-h,Hs.z+this.recoil*.075),this.group.rotation.set(bo+this.recoil*.16-this.swayY*.5,So+this.swayX*.6,Eo+this.swayX*.35);const d=1-this.recoil;this.core.scale.setScalar(.45+d*.75),this.emissiveMaterial.color.copy(this.emissiveBase).multiplyScalar(.35+d*.65),this.muzzleLaunchTime=Math.max(0,this.muzzleLaunchTime-e);const u=1-this.muzzleLaunchTime/Qh,f=zM*u,m=this.muzzleLaunchTime>0;this.muzzleLaunchCore.visible=m,this.muzzleLaunchBolt.visible=m,m?(this.muzzleLaunchCore.position.set(0,0,Ws-f),this.muzzleLaunchCore.scale.setScalar(.8+u*.35),this.muzzleLaunchBolt.position.set(0,0,Ws-f*.5),this.muzzleLaunchBolt.scale.set(1,1,Math.max(.02,f)),this.muzzleLaunchMaterial.opacity=(1-u)*.9):this.muzzleLaunchMaterial.opacity=0,this.spin+=e*(2+this.recoil*26),this.rotor.rotation.z=this.spin}dispose(){this.viewScene.remove(this.group);for(const e of this.meshes)this.group.remove(e);this.meshes.length=0;for(const e of this.geometries)e.dispose();for(const e of this.materials.values())e.dispose();this.muzzleLaunchMaterial.dispose(),this.geometries.length=0,this.materials.clear()}}class HM{bobPhase=0;bobAmount=0;shake=0;shakeSeed=0;camera;constructor(e){this.camera=e,this.camera.rotation.order="YXZ"}addShake(e){this.shake=Math.min(1,this.shake+e),this.shakeSeed+=1.7}update(e,t,n,s,r){const a=e.prevX+(e.x-e.prevX)*s,o=e.prevZ+(e.z-e.prevZ)*s,l=Math.hypot(e.vx,e.vz);this.bobAmount=fs(this.bobAmount,l>.5?1:0,7,r),this.bobPhase+=l*r*1.65;const c=Math.abs(Math.sin(this.bobPhase))*.035*this.bobAmount,h=Math.sin(this.bobPhase*.5)*.006*this.bobAmount;this.shake=fs(this.shake,0,7,r);const d=this.shake*this.shake*.045,u=Math.sin(this.shakeSeed*12.9898)*d,f=Math.sin(this.shakeSeed*78.233)*d;this.camera.position.set(a,e.y+rt.eyeHeight+c,o),this.camera.rotation.set(n+f,t+u,h)}reset(){this.bobPhase=0,this.bobAmount=0,this.shake=0}}function bt(i){const e=document.getElementById(i);if(!e)throw new Error(`HUD element #${i} is missing from index.html`);return e}const WM=2.4,XM=new Intl.NumberFormat;function tu(i){return XM.format(i)}class qM{hud=bt("hud");crosshair=bt("crosshair");hitmarker=bt("hitmarker");damage=bt("damage");integrity=bt("integrity");integrityFill=bt("integrity-fill");debug=bt("debug");captureHint=bt("capture-hint");overTitle=bt("over-title");overScore=bt("over-score");overStats=bt("over-stats");status=bt("status");statusMain=bt("status-main");statusSub=bt("status-sub");scorePop=bt("score-pop");screens={title:bt("screen-title"),pause:bt("screen-pause"),settings:bt("screen-settings"),over:bt("screen-over")};hitTimer=0;statusTimer=0;damageTimer=null;debugVisible=!1;showScreen(e){for(const[t,n]of Object.entries(this.screens))n.hidden=t!==e;this.hud.hidden=e!=="none"}setDebugVisible(e){this.debugVisible=e,this.debug.hidden=!e}toggleDebug(){return this.setDebugVisible(!this.debugVisible),this.debugVisible}get isDebugVisible(){return this.debugVisible}setIntegrity(e,t){const n=Math.max(0,Math.min(1,e/t));this.integrityFill.style.width=`${n*100}%`,this.integrity.classList.toggle("low",n<=.34)}flashHit(){this.hitmarker.classList.remove("show"),this.hitmarker.offsetWidth,this.hitmarker.classList.add("show"),this.hitTimer=.24}flashDamage(){this.damage.classList.add("show"),this.damageTimer!==null&&window.clearTimeout(this.damageTimer),this.damageTimer=window.setTimeout(()=>{this.damageTimer=null,this.damage.classList.remove("show")},60)}setCooling(e){this.crosshair.classList.toggle("cooling",e)}setCaptureHint(e){this.captureHint.hidden=!e}setStatus(e,t="",n="neutral"){this.statusMain.textContent=e,this.statusSub.textContent=t,this.status.classList.toggle("alert",n==="alert"),this.status.classList.toggle("secure",n==="secure"),this.status.classList.add("show"),this.statusTimer=WM}clearStatus(){this.statusTimer=0,this.status.classList.remove("show")}flashScore(e,t){this.scorePop.innerHTML=t>1?`+${e}<span class="chain">&times;${t}</span>`:`+${e}`,this.scorePop.classList.remove("show"),this.scorePop.offsetWidth,this.scorePop.classList.add("show")}update(e){this.hitTimer>0&&(this.hitTimer-=e,this.hitTimer<=0&&this.hitmarker.classList.remove("show")),this.statusTimer>0&&(this.statusTimer-=e,this.statusTimer<=0&&this.status.classList.remove("show"))}setResults(e,t,n,s,r){const a=e.shots>0?e.hits/e.shots*100:0;this.overTitle.textContent=r?"CONTAINMENT RESTORED":"CONTAINMENT LOST",this.screens.over.classList.toggle("secure",r),this.overScore.textContent=e.score.toLocaleString(),this.overStats.innerHTML=[`Specimens popped &nbsp;<b>${e.kills}</b>`,`Sectors held &nbsp;<b>${t} / ${n}</b>`,`Best chain &nbsp;<b>${e.bestChain>1?`${e.bestChain}`:"—"}</b>`,`Accuracy &nbsp;<b>${a.toFixed(0)}%</b>`,`Integrity recovered &nbsp;<b>${e.integrityRestored>0?e.integrityRestored:"—"}</b>`,`Time &nbsp;<b>${e.timeAlive.toFixed(1)}s</b>`,`Seed &nbsp;<b>${s}</b>`].join("<br />")}setDebug(e){if(!this.debugVisible)return;const t=e.frame;this.debug.textContent=[`seed      ${e.seed}`,`quality   ${e.quality}  dpr ${e.pixelRatio.toFixed(2)}  cap ${e.pixelRatioCap.toFixed(2)}${e.adaptiveSteps>0?`  adapt -${e.adaptiveSteps}`:""}`,`frame ms  p50 ${t.p50.toFixed(2)}  p95 ${t.p95.toFixed(2)}`,`          p99 ${t.p99.toFixed(2)}  max ${t.worst.toFixed(2)}`,`hitches   ${t.hitches}  (>20ms, ${t.samples} frames)`,`draws     ${e.drawCalls}  / 150`,`tris      ${tu(e.triangles)}  / 350k`,`gpu       ${e.geometries} geo  ${e.textures} tex  ${e.programs} prog`,`world     ${e.meshes} meshes  ${e.brushes} brushes`,`lights    ${e.lights} lit / ${e.fixtures} placed`,`rooms     ${e.rooms} total`,`sectors   ${e.sectorsCleared} / ${e.sectors} held`,`threat    ${e.threatSpent} / ${e.threatBudget} here  ${e.requiredThreat} req / ${e.threatTotal} all`,`enemies   ${e.enemies}`,`shots     ${e.projectiles}`,`decals    ${e.decals} / ${e.decalBudget}  drops ${e.droplets}`,`score     ${tu(e.score)}`,`gen ms    ${e.genMs.toFixed(2)}  try ${e.attempts}${e.fallback?" FALLBACK":""}`,`warm ms   ${e.prewarmMs.toFixed(2)}`].join(`
`)}dispose(){this.damageTimer!==null&&(window.clearTimeout(this.damageTimer),this.damageTimer=null),this.hitTimer=0,this.statusTimer=0,this.hitmarker.classList.remove("show"),this.damage.classList.remove("show"),this.status.classList.remove("show"),this.scorePop.classList.remove("show")}}const nu=9,iu=5,$r=.14,su=.92,ZM=.42;function YM(i,e){const t={discovered:new Uint8Array(i),reveal:new Float32Array(i)};return e>=0&&e<i&&(t.discovered[e]=1,t.reveal[e]=1),t}function $M(i,e){return e<0||e>=i.discovered.length||i.discovered[e]?!1:(i.discovered[e]=1,i.reveal[e]=0,!0)}function KM(i,e){let t=!1;const n=Math.max(0,e)/ZM;if(n===0)return!1;for(let s=0;s<i.discovered.length;s++)!i.discovered[s]||i.reveal[s]>=1||(i.reveal[s]=Math.min(1,i.reveal[s]+n),t=!0);return t}function wo(i,e){return i.discovered[e]?1-(1-(i.reveal[e]??0))**3:0}class JM{canvas;ctx;base=document.createElement("canvas");baseCtx;plan=null;discovery=null;projection=null;reduceMotion=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;dirty=!0;constructor(e){this.canvas=e;const t=e.getContext("2d"),n=this.base.getContext("2d");if(!t||!n)throw new Error("2D canvas context unavailable — cannot draw the minimap");this.ctx=t,this.baseCtx=n}setPlan(e){this.plan=e,this.discovery=YM(e.rooms.length,e.startRoomId),this.dirty=!0}discover(e){!this.discovery||!$M(this.discovery,e)||(this.reduceMotion&&(this.discovery.reveal[e]=1),this.dirty=!0)}get discoveredCount(){const e=this.discovery;if(!e)return 0;let t=0;for(const n of e.discovered)t+=n;return t}draw(e,t,n,s,r){const a=this.plan,o=this.discovery;if(!a||!o)return;const l=Math.min(window.devicePixelRatio||1,2),c=this.canvas.clientWidth,h=this.canvas.clientHeight;if(c===0||h===0)return;const d=Math.round(c*l),u=Math.round(h*l);(this.canvas.width!==d||this.canvas.height!==u)&&(this.canvas.width=d,this.canvas.height=u,this.base.width=d,this.base.height=u,this.dirty=!0),KM(o,r)&&(this.dirty=!0),this.dirty&&this.redrawBase(c,h,l);const f=this.ctx;f.setTransform(l,0,0,l,0,0),f.clearRect(0,0,c,h),f.drawImage(this.base,0,0,c,h);const m=this.projection,v=a.rooms[s];if(!m||!v)return;const g=E=>m.offsetX+E*m.scale,p=E=>m.offsetZ+E*m.scale;f.strokeStyle="#1fc9c2",f.lineWidth=1.5,f.strokeRect(g(v.minX),p(v.minZ),(v.maxX-v.minX)*m.scale,(v.maxZ-v.minZ)*m.scale);const y=g(e),w=p(t),M=-Math.sin(n),b=-Math.cos(n);f.strokeStyle="#e8e6dd",f.lineWidth=1.5,f.beginPath(),f.moveTo(y,w),f.lineTo(y+M*8,w+b*8),f.stroke(),f.fillStyle="#1fc9c2",f.beginPath(),f.arc(y,w,2.25,0,Math.PI*2),f.fill()}redrawBase(e,t,n){const s=this.plan,r=this.discovery,a=this.baseCtx;let o=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY,c=Number.POSITIVE_INFINITY,h=Number.NEGATIVE_INFINITY;for(const p of s.rooms)o=Math.min(o,p.minX),l=Math.max(l,p.maxX),c=Math.min(c,p.minZ),h=Math.max(h,p.maxZ);const d=Math.max(1,l-o),u=Math.max(1,h-c),f=Math.min((e-nu*2)/d,(t-nu*2)/u),m={scale:f,offsetX:(e-d*f)/2-o*f,offsetZ:(t-u*f)/2-c*f};this.projection=m;const v=p=>m.offsetX+p*f,g=p=>m.offsetZ+p*f;a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,e,t);for(const p of s.connections){const y=s.rooms[p.a],w=s.rooms[p.b];if(!y||!w)continue;const M=Math.min(wo(r,p.a),wo(r,p.b));a.save(),a.filter=M<.999?`blur(${iu*(1-M)}px)`:"none",a.globalAlpha=$r+(su-$r)*M,a.strokeStyle="#788ead",a.lineWidth=1.2,a.beginPath(),a.moveTo(v((y.minX+y.maxX)/2),g((y.minZ+y.maxZ)/2)),a.lineTo(v((w.minX+w.maxX)/2),g((w.minZ+w.maxZ)/2)),a.stroke(),a.restore()}for(const p of s.rooms){const y=wo(r,p.id),w=v(p.minX),M=g(p.minZ),b=(p.maxX-p.minX)*f,E=(p.maxZ-p.minZ)*f;a.save(),a.filter=y<.999?`blur(${iu*(1-y)}px)`:"none",a.globalAlpha=$r+(su-$r)*y,a.fillStyle=y>0?"#172028":"#293443",a.strokeStyle=y>0?"#788ead":"#52647b",a.lineWidth=1,a.fillRect(w,M,b,E),a.strokeRect(w,M,b,E),a.restore()}this.dirty=!1}dispose(){this.plan=null,this.discovery=null,this.projection=null,this.dirty=!0,this.canvas.width=1,this.canvas.height=1,this.base.width=1,this.base.height=1}}function us(i){const e=document.getElementById(i);if(!e)throw new Error(`Touch element #${i} is missing from index.html`);return e}class QM{root=us("touch");stick=us("touch-stick");knob=us("touch-knob");aim=us("touch-aim");pause=us("touch-pause");sprint=us("touch-sprint");active;gameplayVisible=!1;constructor(e){this.active=e,document.body.classList.toggle("touch",e),this.syncVisibility()}get isActive(){return this.active}setGameplayVisible(e){this.gameplayVisible=e,this.syncVisibility()}setStick(e,t,n){this.knob.style.transform=`translate(calc(-50% + ${e.toFixed(4)} * var(--stick-travel)), calc(-50% + ${t.toFixed(4)} * var(--stick-travel)))`,this.stick.classList.toggle("held",n)}setSprint(e){this.sprint.classList.toggle("on",e),this.sprint.setAttribute("aria-pressed",e?"true":"false")}dispose(){document.body.classList.remove("touch"),this.root.hidden=!0,this.stick.classList.remove("held"),this.sprint.classList.remove("on"),this.setStick(0,0,!1)}syncVisibility(){this.root.hidden=!(this.active&&this.gameplayVisible)}}const Rl={mouseSensitivity:{min:8e-4,max:.006,step:2e-4},touchSensitivity:{min:.0016,max:.01,step:2e-4}};function Pl(){return{mouseSensitivity:mu,touchSensitivity:Ot.lookSensitivity,invertY:!1,quality:"auto",autoFire:!1,adaptive:!0}}function jM(i){return i==="auto"||lr(i)}class ey{values;onChange=null;constructor(e){if(this.values=Pl(),!e)return;const t=e.get("quality");lr(t)&&(this.values.quality=t);const n=e.get("adaptive");n==="0"?this.values.adaptive=!1:n==="1"&&(this.values.adaptive=!0)}get snapshot(){return this.values}get(e){return this.values[e]}set(e,t){const n=this.coerce(e,t);return n===void 0||this.values[e]===n?!1:(this.values[e]=n,this.onChange?.(e,this.values),!0)}reset(){const e=Pl();for(const t of Object.keys(e))this.set(t,e[t])}coerce(e,t){switch(e){case"mouseSensitivity":case"touchSensitivity":{const n=Rl[e],s=Number(t);return Number.isFinite(s)?On(s,n.min,n.max):void 0}case"invertY":case"autoFire":case"adaptive":return!!t;case"quality":return jM(t)?t:void 0;default:return}}}function vn(i){const e=document.getElementById(i);if(!e)throw new Error(`Settings element #${i} is missing from index.html`);return e}function ru(i,e){return e>0?`${(i/e).toFixed(2)}×`:i.toFixed(4)}const au=["auto","high","medium","low"];class ty{options;mouseRange=vn("opt-mouse");mouseValue=vn("opt-mouse-value");touchRange=vn("opt-touch");touchValue=vn("opt-touch-value");invertToggle=vn("opt-invert");autoFireToggle=vn("opt-autofire");qualityGroup=vn("opt-quality");adaptiveToggle=vn("opt-adaptive");note=vn("opt-note");backButton=vn("btn-settings-back");reloadButton=vn("btn-settings-reload");qualityButtons;defaults;bootLevel=null;onBack=null;onReload=null;constructor(e,t){this.options=e,this.defaults=t,this.qualityButtons=Array.from(this.qualityGroup.querySelectorAll("button[data-quality]")),this.applyRange(this.mouseRange,Rl.mouseSensitivity),this.applyRange(this.touchRange,Rl.touchSensitivity),this.mouseRange.addEventListener("input",this.onMouseInput),this.touchRange.addEventListener("input",this.onTouchInput),this.invertToggle.addEventListener("click",this.onInvertClick),this.autoFireToggle.addEventListener("click",this.onAutoFireClick),this.adaptiveToggle.addEventListener("click",this.onAdaptiveClick),this.qualityGroup.addEventListener("click",this.onQualityClick),this.qualityGroup.addEventListener("keydown",this.onQualityKeyDown),this.backButton.addEventListener("click",this.onBackClick),this.reloadButton.addEventListener("click",this.onReloadClick),this.refresh()}setBootLevel(e){this.bootLevel=e,this.refresh()}refresh(){const e=this.options.snapshot;this.mouseRange.value=String(e.mouseSensitivity),this.mouseValue.textContent=ru(e.mouseSensitivity,this.defaults.mouseSensitivity),this.touchRange.value=String(e.touchSensitivity),this.touchValue.textContent=ru(e.touchSensitivity,this.defaults.touchSensitivity),this.setToggle(this.invertToggle,e.invertY),this.setToggle(this.autoFireToggle,e.autoFire),this.setToggle(this.adaptiveToggle,e.adaptive);for(const t of this.qualityButtons){const n=t.dataset.quality===e.quality;t.setAttribute("aria-checked",n?"true":"false"),t.tabIndex=n?0:-1}this.syncNote(e.quality)}dispose(){this.mouseRange.removeEventListener("input",this.onMouseInput),this.touchRange.removeEventListener("input",this.onTouchInput),this.invertToggle.removeEventListener("click",this.onInvertClick),this.autoFireToggle.removeEventListener("click",this.onAutoFireClick),this.adaptiveToggle.removeEventListener("click",this.onAdaptiveClick),this.qualityGroup.removeEventListener("click",this.onQualityClick),this.qualityGroup.removeEventListener("keydown",this.onQualityKeyDown),this.backButton.removeEventListener("click",this.onBackClick),this.reloadButton.removeEventListener("click",this.onReloadClick),this.note.hidden=!0,this.reloadButton.hidden=!0}applyRange(e,t){e.min=String(t.min),e.max=String(t.max),e.step=String(t.step)}setToggle(e,t){e.setAttribute("aria-pressed",t?"true":"false"),e.textContent=t?"On":"Off"}syncNote(e){const t=this.bootLevel!==null&&lr(e)&&e!==this.bootLevel;this.note.hidden=!t,this.reloadButton.hidden=!t,t&&(this.note.textContent="Resolution changed now — lighting, shadows, textures and effect pools need a reload.")}onMouseInput=()=>{this.options.set("mouseSensitivity",this.mouseRange.valueAsNumber)};onTouchInput=()=>{this.options.set("touchSensitivity",this.touchRange.valueAsNumber)};onInvertClick=()=>{this.options.set("invertY",!this.options.get("invertY"))};onAutoFireClick=()=>{this.options.set("autoFire",!this.options.get("autoFire"))};onAdaptiveClick=()=>{this.options.set("adaptive",!this.options.get("adaptive"))};onQualityClick=e=>{const t=e.target;if(!(t instanceof Element))return;const s=t.closest("button[data-quality]")?.dataset.quality;!s||!au.includes(s)||this.options.set("quality",s)};onQualityKeyDown=e=>{const t=e.target;if(!(t instanceof Element))return;const n=t.closest("button[data-quality]");if(!n)return;const s=this.qualityButtons.indexOf(n);if(s<0)return;let r=s;switch(e.key){case"ArrowRight":case"ArrowDown":r=(s+1)%this.qualityButtons.length;break;case"ArrowLeft":case"ArrowUp":r=(s-1+this.qualityButtons.length)%this.qualityButtons.length;break;case"Home":r=0;break;case"End":r=this.qualityButtons.length-1;break;default:return}e.preventDefault();const a=this.qualityButtons[r],o=a?.dataset.quality;!o||!au.includes(o)||(this.options.set("quality",o),a.focus())};onBackClick=()=>{this.onBack?.()};onReloadClick=()=>{const e=this.options.get("quality");lr(e)&&this.onReload?.(e)}}const bi=600,Xs=16,ou=20;function ny(){return{enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0}}function iy(){return{at:0,ms:0,simMs:0,renderMs:0,enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0,programsCompiled:0}}class sy{frames=new Float32Array(bi);sim=new Float32Array(bi);render=new Float32Array(bi);sorted=new Float32Array(bi);index=0;filled=0;hitchCount=0;breachCount=0;elapsed=0;hitchLog=[];hitchWrite=0;hitchFilled=0;lastPrograms=0;peak=ny();constructor(){for(let e=0;e<Xs;e++)this.hitchLog.push(iy())}addFrame(e,t,n,s){this.filled===bi&&this.frames[this.index]>ou&&this.breachCount--,this.frames[this.index]=e,this.sim[this.index]=t,this.render[this.index]=n,this.index=(this.index+1)%bi,this.filled<bi&&this.filled++,this.elapsed+=e/1e3,s.enemies>this.peak.enemies&&(this.peak.enemies=s.enemies),s.projectiles>this.peak.projectiles&&(this.peak.projectiles=s.projectiles),s.decals>this.peak.decals&&(this.peak.decals=s.decals),s.droplets>this.peak.droplets&&(this.peak.droplets=s.droplets),s.drawCalls>this.peak.drawCalls&&(this.peak.drawCalls=s.drawCalls),s.triangles>this.peak.triangles&&(this.peak.triangles=s.triangles),s.programs>this.peak.programs&&(this.peak.programs=s.programs);const r=Math.max(0,s.programs-this.lastPrograms);if(this.lastPrograms=s.programs,e>ou){this.hitchCount++,this.breachCount++;const a=this.hitchLog[this.hitchWrite];a.at=this.elapsed,a.ms=e,a.simMs=t,a.renderMs=n,a.enemies=s.enemies,a.projectiles=s.projectiles,a.decals=s.decals,a.droplets=s.droplets,a.drawCalls=s.drawCalls,a.triangles=s.triangles,a.programs=s.programs,a.programsCompiled=r,this.hitchWrite=(this.hitchWrite+1)%Xs,this.hitchFilled<Xs&&this.hitchFilled++}}syncPrograms(e){this.lastPrograms=e}reset(){this.index=0,this.filled=0,this.hitchCount=0,this.breachCount=0,this.elapsed=0,this.hitchWrite=0,this.hitchFilled=0;const e=this.peak;e.enemies=0,e.projectiles=0,e.decals=0,e.droplets=0,e.drawCalls=0,e.triangles=0,e.programs=0}get sampleCount(){return this.filled}get windowBreaches(){return this.breachCount}report(){return this.percentiles(this.frames)}performance(){const e=this.elapsed/60;return{frame:this.percentiles(this.frames),sim:this.percentiles(this.sim),render:this.percentiles(this.render),windowSeconds:+this.elapsed.toFixed(3),hitchesPerMinute:e>0?+(this.hitchCount/e).toFixed(2):0,hitches:this.recentHitches(),peak:{...this.peak}}}recentHitches(){const e=[],t=this.hitchFilled<Xs?0:this.hitchWrite;for(let n=0;n<this.hitchFilled;n++)e.push({...this.hitchLog[(t+n)%Xs]});return e}percentiles(e){const t=this.filled;if(t===0)return{p50:0,p95:0,p99:0,worst:0,hitches:0,samples:0};const n=this.sorted.subarray(0,t);return n.set(e.subarray(0,t)),n.sort(),{p50:Kr(To(n,t,.5)),p95:Kr(To(n,t,.95)),p99:Kr(To(n,t,.99)),worst:Kr(n[t-1]),hitches:this.hitchCount,samples:t}}}function To(i,e,t){const n=Math.min(e-1,Math.max(0,Math.ceil(t*e)-1));return i[n]}function Kr(i){return Math.round(i*1e3)/1e3}const ry={entry:"#2c4a52",corridor:"#1d2a35",junction:"#243444",lab:"#3a3040",containment:"#43303a",chamber:"#5a3326"},lu=10;class ay{canvas;ctx;plan=null;visible=!1;constructor(e){this.canvas=e;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot draw the debug map");this.ctx=t}setPlan(e){this.plan=e}setVisible(e){this.visible=e,this.canvas.hidden=!e}get isVisible(){return this.visible}draw(e){const t=this.plan;if(!this.visible||!t)return;const n=Math.min(window.devicePixelRatio||1,2),s=this.canvas.clientWidth,r=this.canvas.clientHeight;if(s===0||r===0)return;this.canvas.width!==Math.round(s*n)&&(this.canvas.width=Math.round(s*n)),this.canvas.height!==Math.round(r*n)&&(this.canvas.height=Math.round(r*n));const a=this.ctx;a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,s,r),a.fillStyle="rgba(13, 15, 19, 0.82)",a.fillRect(0,0,s,r);const o=Math.max(1,t.maxX-t.minX),l=Math.max(1,t.maxZ-t.minZ),c=Math.min((s-lu*2)/o,(r-lu*2)/l),h=(s-o*c)/2-t.minX*c,d=(r-l*c)/2-t.minZ*c,u=M=>h+M*c,f=M=>d+M*c;for(const M of t.connections){const b=t.rooms[M.a],E=t.rooms[M.b];!b||!E||(a.beginPath(),a.moveTo(u((b.minX+b.maxX)/2),f((b.minZ+b.maxZ)/2)),a.lineTo(u((E.minX+E.maxX)/2),f((E.minZ+E.maxZ)/2)),a.strokeStyle=M.loop?"#1fc9c2":M.critical?"#adc0c8":"#52647b",a.lineWidth=M.critical?2:1,a.setLineDash(M.loop?[3,3]:[]),a.stroke())}a.setLineDash([]),a.font="9px ui-monospace, Menlo, monospace",a.textAlign="center",a.textBaseline="middle";for(const M of t.rooms){const b=u(M.minX),E=f(M.minZ),C=(M.maxX-M.minX)*c,_=(M.maxZ-M.minZ)*c;a.fillStyle=ry[M.archetype],a.fillRect(b,E,C,_);const T=M.id===e.engagedRoomId,P=M.id===e.activeRoomId;a.strokeStyle=T?"#f2610a":P?"#1fc9c2":e.cleared[M.id]?"#5d7a5d":"#52647b",a.lineWidth=T||P?2:1,a.strokeRect(b,E,C,_),a.strokeStyle="#f2610a",a.lineWidth=1;for(const R of M.enemySpawns)a.beginPath(),a.moveTo(u(R.x),f(R.z)),a.lineTo(u(R.entryX),f(R.entryZ)),a.stroke();C>22&&_>14&&(a.fillStyle="#adc0c8",a.fillText(`${M.id}`,b+C/2,E+_/2))}a.fillStyle="#f2610a";for(const M of e.enemies)a.fillRect(u(M.x)-1.5,f(M.z)-1.5,3,3);const m=u(e.playerX),v=f(e.playerZ),g=-Math.sin(e.playerYaw),p=-Math.cos(e.playerYaw);a.strokeStyle="#1fc9c2",a.lineWidth=2,a.beginPath(),a.moveTo(m,v),a.lineTo(m+g*10,v+p*10),a.stroke(),a.fillStyle="#1fc9c2",a.beginPath(),a.arc(m,v,2.5,0,Math.PI*2),a.fill();const y=t.report;a.textAlign="left",a.fillStyle=y.fallback?"#f2610a":"#788ead";const w=[`${y.seed}  ${y.rooms}r ${y.connections}c ${y.loops}L`,`try ${y.attempts}  ${y.ms.toFixed(1)}ms${y.fallback?"  FALLBACK":""}`];y.warnings.length>0&&w.push(y.warnings[0]);for(let M=0;M<w.length;M++)a.fillText(w[M],6,r-8-(w.length-1-M)*11)}dispose(){this.plan=null,this.setVisible(!1)}}class oy{accumulator=0;lastTime=0;running=!1;started=!1;stopped=!1;scheduler="probing";frameId=0;probeTimer=null;timerFrame=null;step;render;requestFrame;cancelFrame;constructor(e,t,n,s){this.step=e,this.render=t,this.requestFrame=n,this.cancelFrame=s}start(){this.started||(this.started=!0,this.stopped=!1,this.running=!0,this.lastTime=performance.now(),this.scheduleFrame())}setRunning(e){e&&!this.running&&this.resetClock(),this.running=e}get isRunning(){return this.running}get usesTimerFallback(){return this.scheduler==="timer"}stop(){this.running=!1,this.stopped=!0,this.frameId!==0&&this.cancelFrame(this.frameId),this.probeTimer!==null&&clearTimeout(this.probeTimer),this.timerFrame!==null&&clearTimeout(this.timerFrame),this.frameId=0,this.probeTimer=null,this.timerFrame=null}resetClock(){this.lastTime=performance.now(),this.accumulator=0}scheduleFrame(){if(!this.stopped){if(this.scheduler==="timer"){this.timerFrame=setTimeout(this.onTimerFrame,1e3/60);return}this.frameId=this.requestFrame(this.onAnimationFrame),this.scheduler==="probing"&&this.probeTimer===null&&(this.probeTimer=setTimeout(this.onProbeTimeout,80))}}onAnimationFrame=e=>{this.stopped||this.scheduler==="timer"||(this.scheduler==="probing"&&(this.scheduler="raf",this.probeTimer!==null&&clearTimeout(this.probeTimer),this.probeTimer=null),this.frameId=0,this.tick(e))};onProbeTimeout=()=>{this.stopped||this.scheduler!=="probing"||(this.probeTimer=null,this.cancelFrame(this.frameId),this.frameId=0,this.scheduler="timer",this.tick(performance.now()))};onTimerFrame=()=>{this.stopped||this.scheduler!=="timer"||(this.timerFrame=null,this.tick(performance.now()))};tick(e){if(this.stopped)return;const t=e-this.lastTime;this.lastTime=e;const n=Math.min(t,250)/1e3;if(this.running){this.accumulator+=n;let r=0;for(;this.accumulator>=Ai&&r<mc;)this.step(Ai),this.accumulator-=Ai,r++;r===mc&&(this.accumulator=0)}const s=this.running?this.accumulator/Ai:0;this.render(s,t,n),this.scheduleFrame()}}const sa={gain:1,pan:0},cu=9,ly=1.2,cy=.85;function hy(i,e,t,n,s,r=sa){const a=n-i,o=s-e,l=Math.hypot(a,o);if(r.gain=cu/(cu+l),l<ly)return r.pan=0,r;const c=Math.cos(t),h=-Math.sin(t),d=(a*c+o*h)/l;return r.pan=On(d,-1,1)*cy,r}let Js=null;function uy(i){if(Js&&Js.sampleRate===i.sampleRate)return Js;const e=Math.floor(i.sampleRate*2),t=i.createBuffer(1,e,i.sampleRate),n=t.getChannelData(0);let s=2654435769;for(let r=0;r<e;r++)s=Math.imul(s,1664525)+1013904223>>>0,n[r]=s/2147483648-1;return Js=t,t}function dy(){Js=null}function md(i,e,t,n,s){const r=Math.max(1e-4,t*.001);i.setValueAtTime(1e-4,e),i.linearRampToValueAtTime(t,e+n),i.exponentialRampToValueAtTime(r,e+n+s),i.setValueAtTime(0,e+n+s+.001)}function Zt(i,e,t){const n=i.createOscillator(),s=i.createGain();n.type=t.type??"sine",t.detune&&(n.detune.value=t.detune),n.frequency.setValueAtTime(Math.max(1,t.freq),t.start),t.freqTo!==void 0&&n.frequency.exponentialRampToValueAtTime(Math.max(1,t.freqTo),t.start+t.duration),md(s.gain,t.start,t.gain,t.attack??.004,t.duration),n.connect(s).connect(e),n.start(t.start),n.stop(t.start+t.duration+.05),n.onended=()=>{n.disconnect(),s.disconnect()}}function mi(i,e,t){const n=i.createBufferSource();n.buffer=uy(i),n.loop=!0;const s=i.createBiquadFilter();s.type=t.filter??"bandpass",s.frequency.setValueAtTime(Math.max(20,t.freq),t.start),t.freqTo!==void 0&&s.frequency.exponentialRampToValueAtTime(Math.max(20,t.freqTo),t.start+t.duration),t.q!==void 0&&(s.Q.value=t.q);const r=i.createGain();md(r.gain,t.start,t.gain,t.attack??.002,t.duration),n.connect(s).connect(r).connect(e),n.start(t.start),n.stop(t.start+t.duration+.05),n.onended=()=>{n.disconnect(),s.disconnect(),r.disconnect()}}function rc(i,e,t,n){mi(i,e,{start:t,duration:.03,gain:n,attack:.001,filter:"highpass",freq:2200})}const fy=6,py=12,hu=0,Oi=1;class my{ctx=null;master=null;limiter=null;sfxBus=null;ambienceGain=null;ambienceNodes=[];releaseTimers=new Map;listenerX=0;listenerZ=0;listenerYaw=0;muted=!1;volume=.75;suspended=!1;voicesThisFrame=0;get ready(){return this.ctx!==null&&this.ctx.state==="running"}get isMuted(){return this.muted}unlock(){if(!this.ctx){const e=window.AudioContext??window.webkitAudioContext;if(!e)return;try{this.ctx=new e}catch{this.ctx=null;return}this.master=this.ctx.createGain(),this.limiter=this.ctx.createDynamicsCompressor(),this.limiter.threshold.value=-8,this.limiter.knee.value=6,this.limiter.ratio.value=12,this.limiter.attack.value=.002,this.limiter.release.value=.18,this.sfxBus=this.ctx.createGain(),this.ambienceGain=this.ctx.createGain(),this.ambienceGain.gain.value=0,this.sfxBus.connect(this.limiter),this.ambienceGain.connect(this.limiter),this.limiter.connect(this.master),this.master.connect(this.ctx.destination),this.applyVolume(),this.startAmbience()}this.ctx.resume().catch(()=>{}),this.suspended=!1}setSuspended(e){!this.ctx||this.suspended===e||(this.suspended=e,e?this.ctx.suspend().catch(()=>{}):this.ctx.resume().catch(()=>{}))}setMuted(e){this.muted=e,this.applyVolume()}toggleMuted(){return this.setMuted(!this.muted),this.muted}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),this.applyVolume()}setListener(e,t,n){this.listenerX=e,this.listenerZ=t,this.listenerYaw=n}beginFrame(){this.voicesThisFrame=0}get now(){return this.ctx?this.ctx.currentTime:0}get context(){return this.ctx}voice(e=1,t=hu){if(!this.ctx||!this.sfxBus||this.suspended||!this.claimVoice(t))return null;const n=this.ctx.createGain();return n.gain.value=e,n.connect(this.sfxBus),this.scheduleRelease(n),n}spatialVoice(e,t,n=1,s=hu){if(!this.ctx||!this.sfxBus||this.suspended)return null;hy(this.listenerX,this.listenerZ,this.listenerYaw,e,t,sa);const r=n*sa.gain;if(r<.01||!this.claimVoice(s))return null;const a=this.ctx.createGain();a.gain.value=r;const o=this.ctx.createStereoPanner();return o.pan.value=sa.pan,a.connect(o).connect(this.sfxBus),this.scheduleRelease(a,o),a}dispose(){this.stopAmbience(),this.cancelPendingReleases(),this.master?.disconnect(),this.limiter?.disconnect(),this.sfxBus?.disconnect(),this.ambienceGain?.disconnect();const e=this.ctx;this.ctx=null,this.master=null,this.limiter=null,this.sfxBus=null,this.ambienceGain=null,dy(),e?.close().catch(()=>{})}claimVoice(e){const t=e>=Oi?py:fy;return this.voicesThisFrame>=t?!1:(this.voicesThisFrame++,!0)}applyVolume(){if(!this.master||!this.ctx)return;const e=this.muted?0:this.volume;this.master.gain.setTargetAtTime(e,this.ctx.currentTime,.02)}scheduleRelease(...e){const t=window.setTimeout(()=>{this.releaseTimers.delete(t);for(const n of e)n.disconnect()},4e3);this.releaseTimers.set(t,e)}cancelPendingReleases(){for(const[e,t]of this.releaseTimers){window.clearTimeout(e);for(const n of t)n.disconnect()}this.releaseTimers.clear()}startAmbience(){const e=this.ctx,t=this.ambienceGain;if(!e||!t)return;const n=e.createOscillator();n.type="sawtooth",n.frequency.value=55;const s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=180,s.Q.value=3;const r=e.createGain();r.gain.value=.08,n.connect(s).connect(r).connect(t),n.start();const a=e.createOscillator();a.type="sine",a.frequency.value=82.5;const o=e.createGain();o.gain.value=.035,a.connect(o).connect(t),a.start(),this.ambienceNodes.push(n,s,r,a,o),t.gain.setValueAtTime(0,e.currentTime),t.gain.linearRampToValueAtTime(.5,e.currentTime+1.5)}stopAmbience(){for(const e of this.ambienceNodes){const t=e;if(typeof t.stop=="function")try{t.stop()}catch{}e.disconnect()}this.ambienceNodes.length=0}}let Rs=kt("boot","audio");function gy(i){Rs=kt(i,"audio")}function vy(i){const e=i.voice(.55,Oi);if(!e)return;const t=i.context;if(!t)return;const n=i.now,s=Ue(Rs,.94,1.06);Zt(t,e,{type:"sine",freq:420*s,freqTo:48,start:n,duration:.24,gain:.9}),Zt(t,e,{type:"sawtooth",freq:220*s,freqTo:60,start:n,duration:.14,gain:.22}),mi(t,e,{start:n,duration:.16,gain:.4,filter:"bandpass",freq:1800,freqTo:300,q:1.2}),rc(t,e,n,.5)}function xy(i,e){const t=i.voice(.12);if(!t)return;const n=i.context;if(!n)return;const s=i.now+e*.35;Zt(n,t,{type:"triangle",freq:300,freqTo:900,start:s,duration:e*.6,gain:.5,attack:e*.4})}function _y(i,e,t){const n=i.spatialVoice(e,t,.4);if(!n)return;const s=i.context;if(!s)return;const r=i.now;Zt(s,n,{type:"sine",freq:180*Ue(Rs,.9,1.1),freqTo:45,start:r,duration:.16,gain:.7}),mi(s,n,{start:r,duration:.09,gain:.35,filter:"lowpass",freq:900,freqTo:200})}function My(i,e,t){const n=i.spatialVoice(e,t,.42);if(!n)return;const s=i.context;if(!s)return;const r=i.now;Zt(s,n,{type:"triangle",freq:260*Ue(Rs,.85,1.15),freqTo:90,start:r,duration:.1,gain:.6}),mi(s,n,{start:r,duration:.06,gain:.3,filter:"bandpass",freq:700,q:1})}function yy(i,e,t){const n=i.spatialVoice(e,t,.3);if(!n)return;const s=i.context;if(!s)return;const r=i.now;Zt(s,n,{type:"square",freq:150,freqTo:380,start:r,duration:.32,gain:.16,attack:.06})}function Sy(i,e,t,n){const s=i.spatialVoice(e,t,.5,Oi);if(!s)return;const r=i.context;if(!r)return;const a=i.now;Zt(r,s,{type:"triangle",freq:180,freqTo:1400,start:a,duration:n,gain:.32,attack:n*.7}),mi(r,s,{start:a,duration:n,gain:.3,attack:n*.8,filter:"bandpass",freq:400,freqTo:3200,q:4})}function by(i,e,t,n){const s=i.spatialVoice(e,t,.9,Oi);if(!s)return;const r=i.context;if(!r)return;const a=i.now,o=Ue(Rs,.92,1.09)/n;Zt(r,s,{type:"sine",freq:190*o,freqTo:38*o,start:a,duration:.26*n,gain:1}),mi(r,s,{start:a,duration:.2*n,gain:.75,filter:"bandpass",freq:2600*o,freqTo:240*o,q:1.6}),rc(r,s,a,.55)}function Ey(i,e,t){const n=i.spatialVoice(e,t,.4,Oi);if(!n)return;const s=i.context;if(!s)return;const r=i.now+.045;mi(s,n,{start:r,duration:.13,gain:.5,attack:.006,filter:"lowpass",freq:1600*Ue(Rs,.85,1.2),freqTo:400})}function wy(i){const e=i.voice(.7,Oi);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Zt(t,e,{type:"sine",freq:120,freqTo:40,start:n,duration:.3,gain:.9}),mi(t,e,{start:n,duration:.18,gain:.4,filter:"bandpass",freq:1400,freqTo:500,q:.8})}function Ty(i){const e=i.voice(.8,Oi);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Zt(t,e,{type:"sawtooth",freq:220,freqTo:30,start:n,duration:1.2,gain:.5}),Zt(t,e,{type:"sine",freq:110,freqTo:22,start:n,duration:1.4,gain:.5})}function Ay(i){const e=i.voice(.35);if(!e)return;const t=i.context;if(!t)return;const n=i.now;for(let s=0;s<2;s++)Zt(t,e,{type:"square",freq:620,start:n+s*.18,duration:.12,gain:.28})}function Ao(i){const e=i.voice(.35);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Zt(t,e,{type:"triangle",freq:520,start:n,duration:.14,gain:.3}),Zt(t,e,{type:"triangle",freq:780,start:n+.13,duration:.2,gain:.3})}function qs(i){const e=i.voice(.4);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Zt(t,e,{type:"triangle",freq:880,start:n,duration:.09,gain:.3}),rc(t,e,n,.18)}const Cy=12,Jr=.2,Ry=.5,Py={playerRadius:rt.radius,playerHeight:rt.height,enemyRadius:_s.walker.radius,enemyHeight:_s.walker.height};class Iy{renderApp;labMaterials;worldView;enemyView;projectileView;splatView;burstView;weaponView;cameraController;audio=new my;hud=new qM;minimap;stats=new sy;debugMap;startButton=document.getElementById("btn-start");resumeButton=document.getElementById("btn-resume");retryButton=document.getElementById("btn-retry");newSeedButton=document.getElementById("btn-newseed");optionsButton=document.getElementById("btn-options");optionsPauseButton=document.getElementById("btn-options-pause");pauseScreen=document.getElementById("screen-pause");input;touchLayer;touch;actions=mf();loop;state;seed;screen="title";genMs=0;prewarmMs=0;prevYaw=0;prevPitch=0;elapsed=0;debugAge=Jr;roomName="";mapEnemies=[];clearedRooms=[];muzzleWorld=new U;quality;frameContext={enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0};stepMs=0;resizeRecheck=0;viewportAge=0;options;settings;adaptive;settingsReturn="title";constructor(e){const t=new URLSearchParams(location.search);this.seed=Ec(t.get("seed")),this.quality=I_(t),this.options=new ey(t),this.renderApp=new L_(e,this.quality),this.adaptive=new D_(this.quality.pixelRatioCap,this.options.get("adaptive")),this.labMaterials=V_(this.renderApp.maxAnisotropy),this.worldView=new eM(this.renderApp.scene,this.labMaterials),this.enemyView=new dM(this.renderApp.scene,on.maxAlive),this.projectileView=new MM(this.renderApp.scene,Cy,this.quality.projectileShader,this.quality.projectileLights),this.splatView=new PM(this.renderApp.renderer,this.renderApp.scene,{paintTexelsPerMetre:this.quality.paintTexelsPerMetre,paintMapMax:this.quality.paintMapMax,decalCapacity:this.quality.decalCapacity}),this.burstView=new BM(this.renderApp.scene,{dropletCapacity:this.quality.dropletCapacity,flashCapacity:this.quality.flashCapacity}),this.weaponView=new GM(this.renderApp.viewScene),this.cameraController=new HM(this.renderApp.camera),this.debugMap=new ay(document.getElementById("debug-map")),this.minimap=new JM(document.getElementById("minimap-canvas")),this.input=new xf(e,this.actions,{sensitivity:this.options.get("mouseSensitivity"),invertY:this.options.get("invertY")}),this.input.onLockStateChange=(n,s)=>{if(this.screen==="none"){if(n){this.hud.setCaptureHint(!1);return}s?this.hud.setCaptureHint(!this.touchLayer.isActive):this.setScreen("pause")}},this.input.onSuspend=()=>{this.screen==="none"&&this.setScreen("pause")},this.touchLayer=new QM(P_(t)),this.touch=new _f({stick:this.touchLayer.stick,aim:this.touchLayer.aim,pause:this.touchLayer.pause,sprint:this.touchLayer.sprint},this.actions,{sensitivity:this.options.get("touchSensitivity"),invertY:this.options.get("invertY"),autoFire:this.options.get("autoFire")}),this.touch.peer=this.input,this.input.peer=this.touch,this.touch.onStickChange=(n,s,r)=>this.touchLayer.setStick(n,s,r),this.touch.onSprintChange=n=>this.touchLayer.setSprint(n),this.settings=new ty(this.options,Pl()),this.settings.setBootLevel(this.quality.level),this.settings.onBack=()=>this.setScreen(this.settingsReturn),this.settings.onReload=n=>this.reloadWithQuality(n),this.options.onChange=n=>this.applyOption(n),this.state=this.createRun(this.seed),this.loop=new oy(n=>this.step(n),(n,s,r)=>this.renderFrame(n,s,r),n=>window.requestAnimationFrame(n),n=>window.cancelAnimationFrame(n)),this.bindUi(),window.addEventListener("resize",this.onResize),window.addEventListener("orientationchange",this.onResize),t.get("debug")==="1"&&(this.hud.setDebugVisible(!0),this.debugMap.setVisible(!0)),this.setScreen("title"),this.loop.start(),this.loop.setRunning(!1)}onStartClick=()=>{this.audio.unlock(),qs(this.audio),this.restart(!0)};onResumeClick=()=>{this.audio.unlock(),this.setScreen("none")};onRetryClick=()=>{this.audio.unlock(),qs(this.audio),this.restart(!0)};onNewSeedClick=()=>{this.audio.unlock(),qs(this.audio),this.restart(!1)};onPauseScreenClick=e=>{const t=e.target;t instanceof Element&&t.closest("button")||this.setScreen("none")};createRun(e){const t=performance.now(),n=cp(e,{validation:Py,now:()=>performance.now()}),s=cf(n,kt(e,"sim"));this.genMs=performance.now()-t,this.splatView.beginFacility(n,s.index,e),this.burstView.beginRoom(0,e),gy(e),this.worldView.build(n,this.splatView.floorPaint),this.renderApp.configureForFacility(n),this.renderApp.setFixtureFocus(n.playerSpawn.x,n.playerSpawn.z),this.debugMap.setPlan(n),this.minimap.setPlan(n),this.clearedRooms.length=0;for(const a of n.rooms)this.clearedRooms.push(a.encounter.budget<=0);this.actions.yaw=n.playerSpawn.yaw,this.actions.pitch=0,this.prevYaw=this.actions.yaw,this.prevPitch=0,this.cameraController.reset(),this.enemyView.update(s.enemies,0),this.projectileView.reset(),this.weaponView.reset(),this.stats.reset(),this.debugAge=Jr,this.cameraController.update(s.player,this.actions.yaw,0,0,0);const r=performance.now();return this.renderApp.setShadowFocus(s.player.x,s.player.z),this.renderApp.prewarm(),this.prewarmMs=performance.now()-r,this.stats.syncPrograms(this.renderApp.programCount),this.hud.setIntegrity(s.player.hp,rt.maxHp),this.hud.clearStatus(),this.roomName=n.rooms[n.startRoomId].name,s}restart(e=!0){e||(this.seed=Ec(null)),this.state=this.createRun(this.seed),this.elapsed=0,this.input.release(),this.touch.release(),this.loop.resetClock(),this.setScreen("none"),this.hud.setStatus(this.roomName,"Containment has failed — reach the core chamber","alert")}setScreen(e){this.screen=e,this.hud.showScreen(e),this.loop.setRunning(e==="none"),this.input.setCaptureEnabled(e==="none"),this.touch.setEnabled(e==="none"),this.touchLayer.setGameplayVisible(e==="none"),this.audio.setSuspended(e!=="none"),e==="none"?(this.input.requestLock(),this.hud.setCaptureHint(this.needsCaptureHint)):(this.hud.setCaptureHint(!1),this.input.release(),this.input.releaseLock(),this.touch.release()),e==="over"&&(this.hud.clearStatus(),this.hud.setResults(this.state.stats,la(this.state),oa(this.state),this.state.seed,this.state.status==="cleared"))}applyOption(e){const t=this.options.snapshot;switch(e){case"mouseSensitivity":this.input.setSensitivity(t.mouseSensitivity);break;case"touchSensitivity":this.touch.setSensitivity(t.touchSensitivity);break;case"invertY":this.input.setInvertY(t.invertY),this.touch.setInvertY(t.invertY);break;case"autoFire":this.touch.setAutoFire(t.autoFire);break;case"adaptive":this.adaptive.setEnabled(t.adaptive);break;case"quality":this.applyQualityChoice();break}this.settings.refresh()}applyQualityChoice(){const e=this.options.get("quality"),t=e==="auto"?ud():e;e!=="auto"&&this.options.get("adaptive")&&this.options.set("adaptive",!1),this.adaptive.setBase(hd(t).pixelRatioCap)&&this.commitPixelRatioCap()}commitPixelRatioCap(){this.renderApp.setMaxPixelRatio(this.adaptive.pixelRatioCap),this.renderApp.resize()}reloadWithQuality(e){const t=new URLSearchParams(location.search);t.set("quality",e),t.set("seed",this.seed),t.set("adaptive",this.options.get("adaptive")?"1":"0"),location.search=t.toString()}openSettings(e){this.settingsReturn=e,this.settings.refresh(),this.setScreen("settings")}onMenuPointerDown=()=>{this.audio.unlock()};onOptionsClick=()=>{this.audio.unlock(),qs(this.audio),this.openSettings("title")};onOptionsPauseClick=()=>{this.audio.unlock(),qs(this.audio),this.openSettings("pause")};get menuButtons(){return[this.startButton,this.resumeButton,this.retryButton,this.newSeedButton,this.optionsButton,this.optionsPauseButton]}bindUi(){for(const e of this.menuButtons)e?.addEventListener("pointerdown",this.onMenuPointerDown);this.startButton?.addEventListener("click",this.onStartClick),this.resumeButton?.addEventListener("click",this.onResumeClick),this.retryButton?.addEventListener("click",this.onRetryClick),this.newSeedButton?.addEventListener("click",this.onNewSeedClick),this.optionsButton?.addEventListener("click",this.onOptionsClick),this.optionsPauseButton?.addEventListener("click",this.onOptionsPauseClick),this.pauseScreen?.addEventListener("click",this.onPauseScreenClick)}unbindUi(){for(const e of this.menuButtons)e?.removeEventListener("pointerdown",this.onMenuPointerDown);this.startButton?.removeEventListener("click",this.onStartClick),this.resumeButton?.removeEventListener("click",this.onResumeClick),this.retryButton?.removeEventListener("click",this.onRetryClick),this.newSeedButton?.removeEventListener("click",this.onNewSeedClick),this.optionsButton?.removeEventListener("click",this.onOptionsClick),this.optionsPauseButton?.removeEventListener("click",this.onOptionsPauseClick),this.pauseScreen?.removeEventListener("click",this.onPauseScreenClick)}step(e){const t=performance.now();df(this.state,this.actions,e),this.touch.acknowledgeFireLatch(),this.stepMs+=performance.now()-t}renderFrame(e,t,n,s=!0){const r=performance.now(),a=this.stepMs;this.stepMs=0,this.elapsed+=n,this.handleInputEdges();const o=this.state,l=this.actions.yaw,c=this.actions.pitch,h=l-this.prevYaw,d=c-this.prevPitch;if(this.prevYaw=l,this.prevPitch=c,this.cameraController.update(o.player,l,c,e,n),this.renderApp.setShadowFocus(o.player.x,o.player.z),this.renderApp.setFixtureFocus(o.player.x,o.player.z),this.audio.beginFrame(),this.audio.setListener(o.player.x,o.player.z,l),this.enemyView.update(o.enemies,e),this.drainEvents(),this.projectileView.update(o.projectiles,e,this.elapsed),this.splatView.update(n),this.burstView.update(n,this.elapsed),this.weaponView.update(n,h,d,Math.hypot(o.player.vx,o.player.vz),this.elapsed),this.hud.update(n),this.hud.setCooling(o.player.fireCooldown>0),this.hud.setCaptureHint(this.needsCaptureHint),this.minimap.draw(o.player.x,o.player.z,l,o.activeRoomId,n),this.viewportAge+=n,this.viewportAge>=Ry&&(this.viewportAge=0,this.applyViewportChange()),this.debugAge+=n,this.hud.isDebugVisible&&this.debugAge>=Jr){this.debugAge=0;const f=o.engagedRoomId>=0?o.runtime[o.engagedRoomId]:void 0;this.hud.setDebug({seed:o.seed,quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveSteps:this.adaptive.downgrades,frame:this.stats.report(),drawCalls:this.renderApp.drawCalls,triangles:this.renderApp.triangles,programs:this.renderApp.programCount,geometries:this.renderApp.geometryCount,textures:this.renderApp.textureCount,meshes:this.worldView.meshCount,lights:this.renderApp.lightCount,fixtures:this.renderApp.fixtureCount,rooms:o.rooms.length,sectors:oa(o),brushes:o.brushes.length,sectorsCleared:la(o),threatTotal:o.plan.report.threatTotal,requiredThreat:o.plan.report.requiredThreat,threatSpent:f?f.threatSpent:0,threatBudget:f?o.rooms[f.id].encounter.budget:0,enemies:o.enemies.length,projectiles:o.projectiles.length,decals:this.splatView.decalCount,decalBudget:this.quality.decalCapacity,droplets:this.burstView.dropletCount,score:o.stats.score,genMs:this.genMs,prewarmMs:this.prewarmMs,attempts:o.plan.report.attempts,fallback:o.plan.report.fallback})}if(this.debugMap.isVisible){this.mapEnemies.length=0;for(const f of o.enemies)this.mapEnemies.push({x:f.x,z:f.z});this.debugMap.draw({playerX:o.player.x,playerZ:o.player.z,playerYaw:l,activeRoomId:o.activeRoomId,engagedRoomId:o.engagedRoomId,cleared:this.clearedRooms,enemies:this.mapEnemies})}if(this.renderApp.render(),!s){this.stats.syncPrograms(this.renderApp.programCount);return}const u=this.frameContext;u.enemies=o.enemies.length,u.projectiles=o.projectiles.length,u.decals=this.splatView.decalCount,u.droplets=this.burstView.dropletCount,u.drawCalls=this.renderApp.drawCalls,u.triangles=this.renderApp.triangles,u.programs=this.renderApp.programCount,this.stats.addFrame(t,a,performance.now()-r,u),this.adaptive.consider({runActive:this.screen==="none",visible:!document.hidden,timerScheduled:this.loop.usesTimerFallback,samples:this.stats.sampleCount,breaches:this.stats.windowBreaches})&&this.commitPixelRatioCap()}handleInputEdges(){if(this.input.consumeDebugToggle()){const n=this.hud.toggleDebug();this.debugMap.setVisible(n),n&&(this.debugAge=Jr)}this.input.consumeMuteToggle()&&this.audio.toggleMuted(),this.input.consumeRestart()&&(this.screen==="over"?this.restart(!1):this.screen!=="title"&&this.screen!=="settings"&&this.restart(!0));const e=this.input.consumePause(),t=this.touch.consumePause();(e||t)&&(this.screen==="none"?this.setScreen("pause"):this.screen==="pause"?this.setScreen("none"):this.screen==="settings"&&this.setScreen(this.settingsReturn))}drainEvents(){const e=this.state.events;for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case"shot":this.weaponView.writeMuzzleWorld(this.renderApp.camera,this.renderApp.viewCamera,this.muzzleWorld),this.projectileView.beginShot(n.id,this.muzzleWorld.x,this.muzzleWorld.y,this.muzzleWorld.z),this.weaponView.kick(),this.cameraController.addShake(.16),vy(this.audio),xy(this.audio,ds.cooldown);break;case"impactWorld":_y(this.audio,n.x,n.z);break;case"enemyHurt":this.hud.flashHit(),My(this.audio,n.x,n.z);break;case"enemyWindUp":yy(this.audio,n.x,n.z);break;case"enemyKilled":this.hud.flashHit(),this.cameraController.addShake(.08),Sy(this.audio,n.x,n.z,Il.implodeTime);break;case"enemyBurst":this.splatView.splat(n.x,n.y,n.z,n.scale,n.dirX,n.dirZ),this.burstView.burst(n.x,n.y,n.z,n.scale,n.dirX,n.dirZ),this.cameraController.addShake(.22),by(this.audio,n.x,n.z,n.scale),Ey(this.audio,n.x,n.z);break;case"scored":this.hud.flashScore(n.amount,n.chain);break;case"roomEntered":this.minimap.discover(n.room),this.hud.setStatus(n.name,n.final?"Primary containment — secure it to end the run":n.hostile?"Containment breach detected":"Sector secure",n.hostile?"alert":"secure");break;case"roomCleared":this.clearedRooms[n.room]=!0,this.hud.setIntegrity(n.hp,rt.maxHp),this.hud.setStatus(n.required?"Sector secure":"Optional sector secure",n.heal>0?`${n.cleared} of ${n.total} required sectors held — integrity +${n.heal}`:`${n.cleared} of ${n.total} required sectors held`,"secure"),Ao(this.audio);break;case"waveStarted":this.hud.setStatus(`Wave ${n.wave} of ${n.waveCount}`,`${n.count} specimen${n.count===1?"":"s"} inbound`,"alert"),Ay(this.audio);break;case"waveCleared":this.hud.setStatus("Wave clear",`${n.waveCount-n.wave} remaining`),Ao(this.audio);break;case"runCleared":Ao(this.audio),this.setScreen("over");break;case"playerHurt":this.hud.setIntegrity(n.hp,rt.maxHp),this.hud.flashDamage(),this.cameraController.addShake(.5),wy(this.audio);break;case"playerDied":Ty(this.audio),this.setScreen("over");break}}e.length=0}advance(e){for(let t=0;t<e;t++)this.step(Ai);this.renderFrame(0,Ai*1e3,Ai,!1)}get buildPlan(){return this.state.plan}setActions(e){Object.assign(this.actions,e)}setOption(e,t){return this.options.set(e,t)}optionValues(){return{...this.options.snapshot}}profileBegin(){this.stats.reset()}profile(){return{...this.stats.performance(),quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveEnabled:this.adaptive.enabled,adaptiveDowngrades:this.adaptive.downgrades,genMs:+this.genMs.toFixed(2),prewarmMs:+this.prewarmMs.toFixed(2),...this.resources()}}resources(){return{geometries:this.renderApp.geometryCount,textures:this.renderApp.textureCount,programs:this.renderApp.programCount,worldMeshes:this.worldView.meshCount,lights:this.renderApp.lightCount,pointLights:this.renderApp.pointLightCount}}snapshot(){const e=this.state,t=e.engagedRoomId>=0?e.runtime[e.engagedRoomId]:void 0;return{seed:e.seed,tick:e.tick,status:e.status,screen:this.screen,rooms:e.rooms.length,discoveredRooms:this.minimap.discoveredCount,activeRoom:e.activeRoomId,engagedRoom:e.engagedRoomId,roomsCleared:e.stats.roomsCleared,wave:t?t.wave:0,waveCount:t?t.waveCount:0,pendingArrivals:t?t.roster.length:0,threatSpent:t?t.threatSpent:0,threatBudget:t?e.rooms[t.id].encounter.budget:0,runThreat:e.plan.report.requiredThreat,facilityThreat:e.plan.report.threatTotal,enemies:e.enemies.length,projectiles:e.projectiles.length,decals:this.splatView.decalCount,settledDecals:this.splatView.settledDecalCount,droplets:this.burstView.dropletCount,hp:e.player.hp,player:{x:+e.player.x.toFixed(3),z:+e.player.z.toFixed(3)},specimens:e.enemies.map(n=>({x:+n.x.toFixed(2),z:+n.z.toFixed(2),state:n.state,variant:n.variant})),aim:{yaw:+this.actions.yaw.toFixed(4),pitch:+this.actions.pitch.toFixed(4)},pointerLocked:this.input.isLocked,touch:{active:this.touchLayer.isActive,...this.touch.state()},stats:e.stats,quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveDowngrades:this.adaptive.downgrades,options:{...this.options.snapshot},drawCalls:this.renderApp.drawCalls,triangles:this.renderApp.triangles,frame:this.stats.report(),resources:this.resources(),generation:e.plan.report}}onResize=()=>{this.applyViewportChange(),this.resizeRecheck!==0&&window.cancelAnimationFrame(this.resizeRecheck),this.resizeRecheck=window.requestAnimationFrame(()=>{this.resizeRecheck=0,this.applyViewportChange()})};applyViewportChange(){this.renderApp.resize()&&this.touch.handleViewportChange()}get needsCaptureHint(){return this.input.needsCaptureHint&&!this.touchLayer.isActive}dispose(){window.removeEventListener("resize",this.onResize),window.removeEventListener("orientationchange",this.onResize),this.resizeRecheck!==0&&(window.cancelAnimationFrame(this.resizeRecheck),this.resizeRecheck=0),this.unbindUi(),this.settings.dispose(),this.options.onChange=null,this.loop.stop(),this.input.dispose(),this.touch.dispose(),this.touchLayer.dispose(),this.worldView.dispose(),this.enemyView.dispose(),this.projectileView.dispose(),this.splatView.dispose(),this.burstView.dispose(),this.audio.dispose(),this.hud.dispose(),this.minimap.dispose(),this.weaponView.dispose(),this.debugMap.dispose(),this.labMaterials.dispose(),this.renderApp.dispose()}}const gd=document.getElementById("view");if(!gd)throw new Error("Canvas #view is missing from index.html");try{const i=new Iy(gd);window.game=i}catch(i){console.error("[clawd-pop-3d] failed to start",i);const e=document.getElementById("screen-title");e&&(e.innerHTML='<div><div class="result-title">WebGL unavailable</div><div class="hint">This game needs a browser with WebGL2 enabled.</div></div>')}
