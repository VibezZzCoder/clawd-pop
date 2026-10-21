(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const $e={half:2.65,rim:.13,doorTime:.45,travelTime:1.8,railTime:.2,railHeight:.52,headroom:.28},Za=$e.doorTime+$e.travelTime,br=.75,$f=i=>Math.max(0,Math.min(1,i)),dc=i=>{const e=$f(i);return e*e*(3-2*e)};function fc(i,e){return i>=Za?0:-(e+$e.headroom)*(1-dc((i-$e.doorTime)/$e.travelTime))}function Kf(i){return i<0?0:dc(i/$e.doorTime)}function Jf(i){return i<0?0:$e.railHeight*(1-dc((i-Za)/$e.railTime))}function Qf(i){return i>=0&&i<Za+$e.railTime}const jf=60,Ri=1/jf,rh=5,Ye={radius:.4,height:1.8,eyeHeight:1.7,walkSpeed:5,sprintSpeed:7.6,accel:62,friction:13,maxHp:100,roomClearHeal:20,hurtCooldown:.6,pitchLimit:Math.PI/2-.02},Ns={cooldown:.42,inputBuffer:.16,spawnForward:.6},Vt={speed:46,radius:.3,damage:100,lifetime:3,maxStepDistance:.5},Gt={capacity:12,radius:.23,speed:8,life:4,range:28,originHeight:.62,sightRetry:.2},xn={walker:{name:"walker",scale:1,hp:100,radius:.55,height:1.45,speed:2.7,turnRate:6,damage:12,threatCost:1,approach:{spread:2.2,commitDistance:1}},runner:{name:"runner",scale:.75,hp:60,radius:.42,height:1.09,speed:4.3,turnRate:9,damage:8,threatCost:1,approach:{spread:4.2,commitDistance:2,intercept:{leadTime:.6}}},heavy:{name:"heavy",scale:1.4,hp:250,radius:.72,height:2.03,speed:1.85,turnRate:3.4,damage:22,threatCost:3,approach:{spread:.45,commitDistance:1}},mini:{name:"mini",scale:.55,hp:40,radius:.34,height:.8,speed:4.6,turnRate:10,damage:6,threatCost:1,approach:{spread:1.3,commitDistance:1}},containmentMachine:{name:"containmentMachine",scale:1.55,hp:500,radius:.85,height:2.25,speed:0,turnRate:2.2,damage:0,threatCost:2,stationary:!0,ranged:{firstDelay:.35,windUp:.9,interval:3.2,enrageBelow:0,enragedInterval:3.2,shots:1,spread:0,damage:12},brood:{variant:"mini",total:4,perRelease:2,firstDelay:1,interval:3.6,enrageBelow:.4,enragedInterval:2.6,radius:1.45,entryRadius:2.35,collapseOnDeath:!0,collapseStagger:0}},orchestrator:{name:"orchestrator",scale:2.2,hp:1200,radius:1.15,height:3.19,speed:0,turnRate:1.8,damage:0,threatCost:4,stationary:!0,ranged:{firstDelay:.5,windUp:.9,interval:2.1,enrageBelow:.45,enragedInterval:1.3,shots:3,spread:.22,damage:16},brood:{variant:"mini",total:10,perRelease:2,firstDelay:1.2,interval:3,enrageBelow:.45,enragedInterval:1.7,radius:1.9,entryRadius:3.2,collapseOnDeath:!0,collapseStagger:.09}}},ep={containmentMachine:"containmentMachine",orchestrator:"orchestrator"};function fd(i){return ep[i]}const pd=Object.values(xn).filter(i=>!i.stationary),tp=Math.max(...pd.map(i=>i.radius)),np=Math.max(...pd.map(i=>i.height));Math.max(...Object.values(xn).filter(i=>i.stationary).map(i=>Math.max(i.radius,(i.brood?.entryRadius??0)+xn[i.brood?.variant??"walker"].radius)));Math.max(...Object.values(xn).filter(i=>i.stationary).map(i=>i.height));const en={range:2,windUpTime:.45,lungeTime:.22,lungeSpeed:9.5,recoverTime:.65,contactPad:.12},pc={implodeTime:.15},al={separationRadius:1.35,separationStrength:9,speedJitter:.16},mc={fadeDistance:3,clearance:.08,retryDelay:1.2},on={maxActive:2,reactionTime:.35,duration:.75,cooldown:2.2,retryDelay:.5,minSpeed:1.4,minDistance:5,maxDistance:14,maxLead:2.2,directionDot:.8,arrivalDistance:.5},ri={pairChance:.45,pairGap:.12,staggerMinScale:.8,staggerMaxScale:1.25,breathMin:.65,breathMax:.9},ai={progressThreshold:.35,trigger:.35,duration:1.1,directBlend:.3,detoursBeforeEscape:2,escapeProbeDistance:7,escapeDuration:2.6,progressResetDistance:.7},Lt={maxAlive:16,engageDelay:1.4,waveDelay:1.6,waveDelayDepthScale:.075,waveDelayFloor:.9,clearDelay:1,minSpawnDistance:6,spawnStagger:.35,staggerDepthScale:.045,staggerFloor:.18,firstWaveArc:140*Math.PI/180,entrySpeed:3.8,anchorRiseTime:Za},ol={hz:8,losInterval:.2,directRange:16},Pi={killBase:{walker:100,runner:150,heavy:260,mini:60,containmentMachine:700,orchestrator:1500},chainWindow:2,chainStep:.35,chainMax:8,wavePerWave:250,roomClear:400,runComplete:2500},oo=Math.PI*2;function Zn(i,e,t){return i<e?e:i>t?t:i}function ip(i,e,t){return i+(e-i)*t}function md(i,e){let t=(e-i)%oo;return t>Math.PI&&(t-=oo),t<-Math.PI&&(t+=oo),t}function Us(i,e,t,n){return ip(i,e,1-Math.exp(-t*n))}function gc(i){return-Math.sin(i)}function vc(i){return-Math.cos(i)}function sp(i){return Math.cos(i)}function rp(i){return-Math.sin(i)}function gd(i,e,t,n){const s=t-i,r=n-e;return Math.sqrt(s*s+r*r)}const ba=1e-9,Jt={t:1,nx:0,ny:0,nz:0};function ui(i,e,t,n,s,r,a,o,l){const c=a.minX-o,h=a.maxX+o,d=a.minY-o,u=a.maxY+o,f=a.minZ-o,m=a.maxZ+o;let v=0,g=1,p=-1,y=0;if(Math.abs(n)<ba){if(i<c||i>h)return-1}else{const E=1/n;let _=(c-i)*E,T=(h-i)*E,w=-1;if(_>T){const A=_;_=T,T=A,w=1}if(_>v&&(v=_,p=0,y=w),T<g&&(g=T),v>g)return-1}if(Math.abs(s)<ba){if(e<d||e>u)return-1}else{const E=1/s;let _=(d-e)*E,T=(u-e)*E,w=-1;if(_>T){const A=_;_=T,T=A,w=1}if(_>v&&(v=_,p=1,y=w),T<g&&(g=T),v>g)return-1}if(Math.abs(r)<ba){if(t<f||t>m)return-1}else{const E=1/r;let _=(f-t)*E,T=(m-t)*E,w=-1;if(_>T){const A=_;_=T,T=A,w=1}if(_>v&&(v=_,p=2,y=w),T<g&&(g=T),v>g)return-1}if(v>1||g<0)return-1;if(l.t=v,l.nx=p===0?y:0,l.ny=p===1?y:0,l.nz=p===2?y:0,p===-1){const E=Math.hypot(n,s,r)||1;l.nx=-n/E,l.ny=-s/E,l.nz=-r/E}return v}function vd(i,e,t){return i<t.maxY&&i+e>t.minY}function xc(i,e,t,n,s=3){let r=!1;for(let a=0;a<s;a++){let o=!1;for(let l=0;l<n.length;l++){const c=n[l];if(!vd(i.y,t,c))continue;const h=Zn(i.x,c.minX,c.maxX),d=Zn(i.z,c.minZ,c.maxZ),u=i.x-h,f=i.z-d,m=u*u+f*f;if(!(m>=e*e)){if(m>ba){const v=Math.sqrt(m),g=e-v;i.x+=u/v*g,i.z+=f/v*g}else{const v=i.x-c.minX,g=c.maxX-i.x,p=i.z-c.minZ,y=c.maxZ-i.z,E=Math.min(v,g,p,y);E===v?i.x=c.minX-e:E===g?i.x=c.maxX+e:E===p?i.z=c.minZ-e:i.z=c.maxZ+e}o=!0,r=!0}}if(!o)break}return r}const pr={minX:0,maxX:0,minZ:0,maxZ:0,minY:0,maxY:$e.railHeight,kind:"prop"},ap=[pr];function xd(i,e,t,n){for(const s of i.rooms){const r=s.anchor,a=i.runtime[s.id].anchorStartedAt;if(!r||a<0||!Qf(i.time-a))continue;const o=$e.half+$e.rim;pr.minX=r.x-o,pr.maxX=r.x+o,pr.minZ=r.z-o,pr.maxZ=r.z+o,xc(e,t,n,ap)}}function op(i,e,t,n){const s=$e.half+$e.rim+.08,r=(a,o,l)=>Math.abs(a-e)<s+l&&Math.abs(o-t)<s+l;return r(i.player.x,i.player.z,n)||i.enemies.some(a=>a.alive&&r(a.x,a.z,a.def.radius))}const lp=256;function vt(i,e){i.length>=lp||i.push(e)}const ah=[];function cp(i,e,t){const n=i.player;n.prevX=n.x,n.prevZ=n.z,n.hurtCooldown>0&&(n.hurtCooldown=Math.max(0,n.hurtCooldown-t));let s=Zn(e.moveX,-1,1),r=Zn(e.moveZ,-1,1);const a=Math.hypot(s,r);a>1&&(s/=a,r/=a);const o=e.sprint?Ye.sprintSpeed:Ye.walkSpeed,l=gc(n.yaw),c=vc(n.yaw),h=sp(n.yaw),d=rp(n.yaw),u=(l*r+h*s)*o,f=(c*r+d*s)*o;if(a>.001)n.vx+=(u-n.vx)*Math.min(1,Ye.accel*t),n.vz+=(f-n.vz)*Math.min(1,Ye.accel*t);else{const v=Math.max(0,1-Ye.friction*t);n.vx*=v,n.vz*=v}n.x+=n.vx*t,n.z+=n.vz*t,n.y=i.floorY;const m=Ye.radius;i.index.query(Math.min(n.prevX,n.x)-m,Math.min(n.prevZ,n.z)-m,Math.max(n.prevX,n.x)+m,Math.max(n.prevZ,n.z)+m,ah),xc(n,Ye.radius,Ye.height,ah),xd(i,n,Ye.radius,Ye.height)}function hp(i,e,t){const n=i.player;if(n.fireCooldown>0&&(n.fireCooldown=Math.max(0,n.fireCooldown-t)),e.firePressed&&(e.firePressed=!1,n.fireBuffer=Ns.inputBuffer),n.fireBuffer>0&&(n.fireBuffer=Math.max(0,n.fireBuffer-t)),!(e.firePrimary||n.fireBuffer>0)||n.fireCooldown>0||!n.alive)return;n.fireBuffer=0,n.fireCooldown=Ns.cooldown,i.stats.shots+=1;const r=Math.cos(n.pitch),a=gc(n.yaw)*r,o=Math.sin(n.pitch),l=vc(n.yaw)*r,c=n.y+Ye.eyeHeight,h=n.x+a*Ns.spawnForward,d=c+o*Ns.spawnForward,u=n.z+l*Ns.spawnForward,f=i.nextId++;i.projectiles.push({id:f,x:h,y:d,z:u,prevX:h,prevY:d,prevZ:u,vx:a*Vt.speed,vy:o*Vt.speed,vz:l*Vt.speed,life:Vt.lifetime,alive:!0}),vt(i.events,{type:"shot",id:f,x:h,y:d,z:u,dx:a,dy:o,dz:l})}const oh=[];function Vs(i,e,t,n,s,r){const a=e.def.radius+mc.clearance;i.index.query(Math.min(t,s)-a,Math.min(n,r)-a,Math.max(t,s)+a,Math.max(n,r)+a,oh);for(const o of oh)if(vd(e.y,e.def.height,o)&&ui(t,(o.minY+o.maxY)*.5,n,s-t,0,r-n,o,a,Jt)>=0)return!1;return!0}function up(i,e,t){e.approachClear=!1;const n=e.def.approach;if(!n||!e.hasSight||e.approachSide===0||e.interceptTime>0||e.approachRetryTime>0||e.detourTime>0||e.escapeTime>0)return;const s=en.range+e.def.radius+n.commitDistance,r=Math.min(1,Math.max(0,(t-s)/mc.fadeDistance));if(r===0)return;const a=n.spread*e.approachSide*r,o=(i.player.x-e.x)/t,l=(i.player.z-e.z)/t,c=i.player.x-l*a,h=i.player.z+o*a;!Vs(i,e,e.x,e.z,c,h)||!Vs(i,e,c,h,i.player.x,i.player.z)||(e.approachX=c,e.approachZ=h,e.approachClear=!0)}function dp(i,e,t,n,s,r){const a=e.def.approach?.intercept;if(!a)return;if(e.interceptCooldown=Math.max(0,e.interceptCooldown-t),e.interceptTime>0){e.interceptTime=Math.max(0,e.interceptTime-t),(s||!e.hasSight||e.detourTime>0||e.escapeTime>0||n<=en.range+e.def.radius+on.arrivalDistance||Math.hypot(e.interceptX-e.x,e.interceptZ-e.z)<=on.arrivalDistance||r&&!Vs(i,e,e.x,e.z,e.interceptX,e.interceptZ))&&(e.interceptTime=0),e.interceptTime===0&&(e.interceptCooldown=on.cooldown);return}if(s||!e.hasSight||e.approachRetryTime>0||e.detourTime>0||e.escapeTime>0||e.interceptCooldown>0||n<on.minDistance||n>on.maxDistance){e.interceptObserveTime=0;return}const o=(i.player.x-i.player.prevX)/t,l=(i.player.z-i.player.prevZ)/t,c=Math.hypot(o,l),h=Math.hypot(e.interceptVelocityX,e.interceptVelocityZ),d=h>0&&o*e.interceptVelocityX+l*e.interceptVelocityZ>=on.directionDot*c*h;if(e.interceptVelocityX=o,e.interceptVelocityZ=l,c<on.minSpeed){e.interceptObserveTime=0;return}if(e.interceptObserveTime=d?Math.min(on.reactionTime,e.interceptObserveTime+t):t,e.interceptObserveTime<on.reactionTime)return;let u=0;for(const g of i.enemies)g.alive&&g.state==="approach"&&g.interceptTime>0&&u++;if(u>=on.maxActive)return;e.interceptObserveTime=0;const f=Math.min(a.leadTime,on.maxLead/c),m=i.player.x+o*f,v=i.player.z+l*f;if(!Vs(i,e,e.x,e.z,m,v)||!Vs(i,e,i.player.x,i.player.z,m,v)){e.interceptCooldown=on.retryDelay;return}e.interceptX=m,e.interceptZ=v,e.interceptTime=on.duration,e.approachClear=!1}function _d(i,e,t,n=0,s=0,r=!0){if(!e.alive||e.hp<=0)return!1;if(e.hp-=t,e.hurtTime=.18,i.stats.hits+=1,e.hp<=0){e.hp=0,e.state="dying",e.stateTime=0,e.rangedCharge=0;for(const a of i.enemyBolts)a.ownerId===e.id&&(a.alive=!1);e.vx=0,e.vz=0,e.deathDirX=n,e.deathDirZ=s,i.stats.kills+=1,fp(i,e),e.def.stationary&&e.def.brood&&vt(i.events,{type:"anchorShutdown",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale,cascade:e.def.brood.collapseStagger>0}),vt(i.events,{type:"enemyKilled",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale,dirX:n,dirZ:s}),Yp(i,e.variant,r)}else vt(i.events,{type:"enemyHurt",id:e.id,x:e.x,y:e.y,z:e.z});return!0}function fp(i,e){const t=e.def.brood;if(!t||!t.collapseOnDeath)return;let n=0;for(const s of i.enemies)!s.alive||s.parentId!==e.id||s.state==="dying"||s.collapseTimer>=0||(s.collapseTimer=n*t.collapseStagger,s.collapseExtendsChain=t.collapseStagger>0,s.deathDirX=e.deathDirX,s.deathDirZ=e.deathDirZ,n+=1)}function Md(i,e){const t=i.player;return!t.alive||t.hurtCooldown>0?!1:(t.hp=Math.max(0,t.hp-e),t.hurtCooldown=Ye.hurtCooldown,i.stats.damageTaken+=e,vt(i.events,{type:"playerHurt",amount:e,hp:t.hp}),!0)}const lh=[],Ni={minX:0,minY:0,minZ:0,maxX:0,maxY:0,maxZ:0};function wa(i){return i.y+i.def.height*Gt.originHeight}function yd(i,e,t,n,s,r,a){i.index.query(Math.min(e,e+s)-Gt.radius,Math.min(n,n+a)-Gt.radius,Math.max(e,e+s)+Gt.radius,Math.max(n,n+a)+Gt.radius,lh);let o=1/0;for(const l of lh){const c=ui(e,t,n,s,r,a,l,Gt.radius,Jt);c>=0&&c<o&&(o=c)}return o}function pp(i,e,t){const n=e.def.ranged;if(!n||!i.player.alive||i.player.hp<=0){e.rangedCharge=0;return}if(e.rangedCharge>0){if(e.rangedCharge=Math.max(0,e.rangedCharge-t),e.rangedCharge>0)return;let c=0;for(const h of i.enemyBolts)h.alive||c++;if(c>=n.shots){const h=e.aimX-e.x,d=e.aimZ-e.z,u=e.aimY-wa(e),f=Math.hypot(h,u,d),m=Math.atan2(h,d),v=Math.hypot(h,d)/Math.max(.001,f)*Gt.speed;let g=0;for(const p of i.enemyBolts){if(p.alive)continue;const y=m+(g-(n.shots-1)/2)*n.spread;if(p.x=p.prevX=e.x,p.y=p.prevY=wa(e),p.z=p.prevZ=e.z,p.vx=Math.sin(y)*v,p.vy=u/Math.max(.001,f)*Gt.speed,p.vz=Math.cos(y)*v,p.damage=n.damage,p.ownerId=e.id,p.life=Gt.life,p.alive=!0,++g===n.shots)break}vt(i.events,{type:"rangedFire",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale})}e.rangedCooldown=e.hp/e.def.hp<n.enrageBelow?n.enragedInterval:n.interval;return}if(e.rangedCooldown=Math.max(0,e.rangedCooldown-t),e.rangedCooldown>0)return;e.rangedCooldown=Gt.sightRetry;const s=i.player,r=s.x-e.x,a=s.z-e.z,o=wa(e),l=s.y+Ye.height*.5;Math.hypot(r,a)>Gt.range||yd(i,e.x,o,e.z,r,l-o,a)<=1||(e.aimX=s.x,e.aimY=l,e.aimZ=s.z,e.rangedCharge=n.windUp,vt(i.events,{type:"rangedCharge",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale}))}function mp(i,e){const t=i.player;Ni.minX=t.x-Ye.radius,Ni.maxX=t.x+Ye.radius,Ni.minZ=t.z-Ye.radius,Ni.maxZ=t.z+Ye.radius,Ni.minY=t.y,Ni.maxY=t.y+Ye.height;for(const n of i.enemyBolts){if(!n.alive)continue;const s=i.enemies.find(f=>f.id===n.ownerId);if(n.life-=e,n.life<=0||!s?.alive||s.state==="dying"){n.alive=!1;continue}n.prevX=n.x,n.prevY=n.y,n.prevZ=n.z;const r=n.vx*e,a=n.vy*e,o=n.vz*e,l=yd(i,n.x,n.y,n.z,r,a,o),c=ui(n.x,n.y,n.z,r,a,o,Ni,Gt.radius,Jt),h=c>=0&&c<l,d=h?c:l,u=Math.min(1,d);n.x+=r*u,n.y+=a*u,n.z+=o*u,d<=1&&(n.alive=!1,h&&Md(i,n.damage))}}const gp=.5,vp=.5;function Sd(i,e){let t=Number.POSITIVE_INFINITY,n=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,r=Number.NEGATIVE_INFINITY;for(const f of i)for(const m of f.brushes)m.minX<t&&(t=m.minX),m.minZ<n&&(n=m.minZ),m.maxX>s&&(s=m.maxX),m.maxZ>r&&(r=m.maxZ);const a=gp,o=Math.floor(t/a)*a,l=Math.floor(n/a)*a,c=Math.max(1,Math.ceil((s-o)/a)),h=Math.max(1,Math.ceil((r-l)/a)),d=new Uint8Array(c*h),u={cell:a,minX:o,minZ:l,cols:c,rows:h,walkable:d};for(const f of i)for(const m of f.brushes)m.kind==="floor"&&ch(u,m.minX,m.minZ,m.maxX,m.maxZ,0,v=>{d[v]=1});for(const f of i)for(const m of f.brushes)m.kind==="floor"||m.kind==="ceiling"||m.maxY<=.05||m.minY>=e.height||ch(u,m.minX,m.minZ,m.maxX,m.maxZ,e.radius,v=>{d[v]=0});return u}function ch(i,e,t,n,s,r,a){const o=hh(i.minX,i.cell,i.cols,e-r,n+r),l=hh(i.minZ,i.cell,i.rows,t-r,s+r);for(let c=l.lo;c<=l.hi;c++){const h=c*i.cols;for(let d=o.lo;d<=o.hi;d++)a(h+d)}}function hh(i,e,t,n,s){const r=Math.max(0,Math.ceil((n-i)/e-.5)),a=Math.min(t-1,Math.floor((s-i)/e-.5));return{lo:r,hi:a}}function uh(i,e,t){const n=Math.floor((e-i.minX)/i.cell),s=Math.floor((t-i.minZ)/i.cell);return n<0||s<0||n>=i.cols||s>=i.rows?-1:s*i.cols+n}function Os(i,e,t,n=6){const s=Math.floor((e-i.minX)/i.cell),r=Math.floor((t-i.minZ)/i.cell);for(let a=0;a<=n;a++)for(let o=-a;o<=a;o++)for(let l=-a;l<=a;l++){if(a>0&&Math.abs(l)!==a&&Math.abs(o)!==a)continue;const c=s+l,h=r+o;if(c<0||h<0||c>=i.cols||h>=i.rows)continue;const d=h*i.cols+c;if(i.walkable[d])return d}return-1}function dh(i,e,t){if(t.fill(0),e<0||!i.walkable[e])return 0;const n=[e];t[e]=1;let s=1;for(;n.length>0;){const r=n.pop(),a=r%i.cols,o=(r-a)/i.cols;for(let l=-1;l<=1;l++){const c=o+l;if(!(c<0||c>=i.rows))for(let h=-1;h<=1;h++){if(h===0&&l===0)continue;const d=a+h;if(d<0||d>=i.cols)continue;const u=c*i.cols+d;t[u]||!_c(i,a,o,d,c)||(t[u]=1,s++,n.push(u))}}}return s}function _c(i,e,t,n,s){if(e<0||t<0||e>=i.cols||t>=i.rows||n<0||s<0||n>=i.cols||s>=i.rows||!i.walkable[t*i.cols+e]||!i.walkable[s*i.cols+n])return!1;const r=n-e,a=s-t;return Math.abs(r)>1||Math.abs(a)>1||r===0&&a===0?!1:r===0||a===0?!0:!!(i.walkable[t*i.cols+n]&&i.walkable[s*i.cols+e])}function xp(i){let e=0;for(let t=0;t<i.walkable.length;t++)e+=i.walkable[t];return e}const La=-1;function _p(i){const e=i.cols*i.rows;return{grid:i,dist:new Int32Array(e).fill(La),queue:new Int32Array(e),goalCell:-1,timer:0}}function bd(i,e,t,n){i.timer-=n;const s=Os(i.grid,e,t);return s<0||s===i.goalCell&&i.timer>0?!1:(i.timer=1/ol.hz,Mp(i,s),!0)}function Mp(i,e){const{grid:t,dist:n,queue:s}=i,{cols:r,rows:a}=t;n.fill(La),i.goalCell=e,n[e]=0,s[0]=e;let o=0,l=1;for(;o<l;){const c=s[o++],h=n[c]+1,d=c%r,u=(c-d)/r;for(let f=-1;f<=1;f++){const m=u+f;if(!(m<0||m>=a))for(let v=-1;v<=1;v++){if(v===0&&f===0)continue;const g=d+v;if(g<0||g>=r)continue;const p=m*r+g;n[p]!==La||!_c(t,d,u,g,m)||(n[p]=h,s[l++]=p)}}}}function yp(i,e,t,n){const{grid:s,dist:r}=i,{cols:a,rows:o,cell:l}=s,c=Os(s,e,t,3);if(c<0)return!1;const h=r[c];if(h<=0)return!1;const d=c%a,u=(c-d)/a;let f=h,m=0,v=0,g=!1;for(let w=-1;w<=1;w++){const A=u+w;if(!(A<0||A>=o))for(let M=-1;M<=1;M++){if(M===0&&w===0)continue;const b=d+M;if(b<0||b>=a||!_c(s,d,u,b,A))continue;const R=r[A*a+b];R===La||R>=f||(f=R,m=b,v=A,g=!0)}}if(!g)return!1;const p=s.minX+(m+.5)*l,y=s.minZ+(v+.5)*l,E=p-e,_=y-t,T=Math.hypot(E,_);return T<1e-5?!1:(n.x=E/T,n.z=_/T,!0)}function ll(i,e){if(i.enemies.length>=Lt.maxAlive)return null;const t=e.def,n=e.sink??0,s={id:i.nextId++,variant:t.name,def:t,x:e.x,y:i.floorY-n,z:e.z,prevX:e.x,prevZ:e.z,vx:0,vz:0,yaw:e.yaw,prevYaw:e.yaw,hp:t.hp,state:"entering",stateTime:0,gaitPhase:i.rng()*Math.PI*2,movedLast:0,stuckTime:0,detourTime:0,detourSide:(i.nextId&1)===0?1:-1,detourAttempts:0,unstickBestDistance:Number.POSITIVE_INFINITY,escapeTime:0,escapeDirX:0,escapeDirZ:0,entryX:e.entryX,entryZ:e.entryZ,hasSight:!1,losTimer:i.nextId%12/60,approachSide:t.stationary?0:(i.approachSerial+++2)%3-1,approachX:e.x,approachZ:e.z,approachClear:!1,approachRetryTime:0,interceptObserveTime:0,interceptVelocityX:0,interceptVelocityZ:0,interceptTime:0,interceptCooldown:0,interceptX:e.x,interceptZ:e.z,speedScale:1+(i.rng()-.5)*2*al.speedJitter,hurtTime:0,lungeDirX:0,lungeDirZ:0,lungeConnected:!1,deathDirX:0,deathDirZ:0,yOffset:-n,broodTimer:t.brood?t.brood.firstDelay:0,broodRemaining:t.brood?t.brood.total:0,rangedCooldown:t.ranged?.firstDelay??0,rangedCharge:0,aimX:e.x,aimY:0,aimZ:e.z,parentId:e.parentId??-1,collapseTimer:-1,collapseExtendsChain:!1,alive:!0};return i.enemies.push(s),s}const fh=[],ph=[],lo={x:0,z:0},Sp=2.6;function bp(i,e){const t=i.enemies,n=t.length;for(let s=0;s<n;s++){const r=t[s];if(r.alive){if(r.prevX=r.x,r.prevZ=r.z,r.prevYaw=r.yaw,r.stateTime+=e,r.def.stationary){const a=i.rooms.find(l=>l.anchor?.x===r.x&&l.anchor.z===r.z),o=a?i.runtime[a.id].anchorStartedAt:-1;o>=0&&(r.yOffset=fc(i.time+e-o,r.def.height))}if(r.hurtTime>0&&(r.hurtTime=Math.max(0,r.hurtTime-e)),r.collapseTimer>=0&&r.state!=="dying"&&(r.collapseTimer-=e,r.collapseTimer<=0)){_d(i,r,r.hp,r.deathDirX,r.deathDirZ,r.collapseExtendsChain);continue}r.def.brood&&r.state!=="dying"&&r.state!=="entering"&&Ep(i,r,e),wp(i,r,e)}}Ap(t,e);for(let s=0;s<t.length;s++){const r=t[s];if(!r.alive)continue;if(r.y=i.floorY+r.yOffset,r.def.stationary){r.movedLast=0;continue}r.x+=r.vx*e,r.z+=r.vz*e;const a=r.def.radius;i.index.query(Math.min(r.prevX,r.x)-a,Math.min(r.prevZ,r.z)-a,Math.max(r.prevX,r.x)+a,Math.max(r.prevZ,r.z)+a,fh),xc(r,a,r.def.height,fh),xd(i,r,a,r.def.height),r.movedLast=gd(r.prevX,r.prevZ,r.x,r.z);const o=r.gaitPhase;r.gaitPhase+=r.movedLast*Sp,(r.state==="approach"||r.state==="entering")&&Math.floor(o/Math.PI)!==Math.floor(r.gaitPhase/Math.PI)&&vt(i.events,{type:"enemyStep",id:r.id,x:r.x,y:r.y,z:r.z,scale:r.def.scale})}}function wp(i,e,t){const n=i.player,s=n.x-e.x,r=n.z-e.z,a=Math.hypot(s,r),o=e.def.radius+Ye.radius+en.contactPad;switch(e.state){case"dying":{e.vx=0,e.vz=0,e.stateTime>=pc.implodeTime&&(e.alive=!1,vt(i.events,{type:"enemyBurst",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale,dirX:e.deathDirX,dirZ:e.deathDirZ}));break}case"entering":{if(e.def.stationary){e.vx=0,e.vz=0,as(e,s,r,t);const u=Math.min(1,e.stateTime/Lt.anchorRiseTime);e.yOffset=fc(e.stateTime,e.def.height),u>=1&&(e.yOffset=0,rs(e,"approach"));break}const l=e.entryX-e.x,c=e.entryZ-e.z,h=Math.hypot(l,c);if(h<=.12){e.x=e.entryX,e.z=e.entryZ,e.vx=0,e.vz=0,rs(e,"approach");break}const d=1/h;as(e,l,c,t),e.vx=l*d*Lt.entrySpeed,e.vz=c*d*Lt.entrySpeed;break}case"approach":{if(e.def.stationary){e.vx=0,e.vz=0,pp(i,e,t),as(e,e.rangedCharge>0?e.aimX-e.x:s,e.rangedCharge>0?e.aimZ-e.z:r,t);break}if(a<=en.range+e.def.radius&&n.alive){rs(e,"windUp"),e.vx=0,e.vz=0,as(e,s,r,t),vt(i.events,{type:"enemyWindUp",id:e.id,x:e.x,y:e.y,z:e.z});break}const l=e.def.speed*e.speedScale,c=e.movedLast/Math.max(1e-4,l*t),h=e.stateTime>t*1.5&&c<ai.progressThreshold;e.approachRetryTime=Math.max(0,e.approachRetryTime-t),(h||e.detourTime>0||e.escapeTime>0)&&(e.approachRetryTime=mc.retryDelay,e.approachClear=!1);const d=a>1e-4?1/a:0;let u=s*d,f=r*d;e.losTimer-=t;const m=e.losTimer<=0;if(m&&(e.losTimer=ol.losInterval,e.hasSight=a<=ol.directRange&&Vs(i,e,e.x,e.z,n.x,n.z),up(i,e,a)),dp(i,e,t,a,h,m),!e.hasSight&&yp(i.nav,e.x,e.z,lo)&&(u=lo.x,f=lo.z),a<e.unstickBestDistance-ai.progressResetDistance&&(e.unstickBestDistance=a,e.detourAttempts=0),e.escapeTime>0)e.escapeTime=Math.max(0,e.escapeTime-t),e.vx=e.escapeDirX*l,e.vz=e.escapeDirZ*l;else if(e.detourTime>0)e.detourTime=Math.max(0,e.detourTime-t),e.stuckTime=h?e.stuckTime+t:0,e.vx=(u*ai.directBlend-f*e.detourSide)*l,e.vz=(f*ai.directBlend+u*e.detourSide)*l;else if(h){if(e.stuckTime+=t,e.stuckTime>=ai.trigger)if(e.stuckTime=0,e.detourAttempts+=1,e.detourAttempts>=ai.detoursBeforeEscape){const v=Tp(i,e,u,f);e.escapeDirX=v.x,e.escapeDirZ=v.z,e.escapeTime=ai.escapeDuration,e.detourTime=0}else e.detourSide=-e.detourSide,e.detourTime=ai.duration;e.vx=u*l,e.vz=f*l}else{e.stuckTime=0;const v=en.range+e.def.radius+(e.def.approach?.commitDistance??0),g=e.interceptTime>0;if(g||e.hasSight&&e.approachClear&&e.approachRetryTime===0&&a>v){const p=(g?e.interceptX:e.approachX)-e.x,y=(g?e.interceptZ:e.approachZ)-e.z,E=Math.hypot(p,y);E>.1&&(u=p/E,f=y/E)}e.vx=u*l,e.vz=f*l}as(e,e.vx,e.vz,t);break}case"windUp":{if(e.vx=0,e.vz=0,as(e,s,r,t),e.stateTime>=en.windUpTime){const l=a>1e-4?1/a:0;e.lungeDirX=s*l,e.lungeDirZ=r*l,e.lungeConnected=!1,rs(e,"lunge"),vt(i.events,{type:"enemyLunge",id:e.id,x:e.x,y:e.y,z:e.z})}break}case"lunge":{e.vx=e.lungeDirX*en.lungeSpeed,e.vz=e.lungeDirZ*en.lungeSpeed,!e.lungeConnected&&a<=o&&n.alive&&Md(i,e.def.damage)&&(e.lungeConnected=!0),e.stateTime>=en.lungeTime&&rs(e,"recover");break}case"recover":{const l=Math.max(0,1-9*t);e.vx*=l,e.vz*=l,e.stateTime>=en.recoverTime&&rs(e,"approach");break}}}function Ep(i,e,t){const n=e.def.brood;if(e.broodRemaining<=0||!i.player.alive)return;const s=e.broodTimer;if(e.broodTimer-=t,s>br&&e.broodTimer<=br&&vt(i.events,{type:"broodCharging",id:e.id,x:e.x,y:e.y,z:e.z,scale:e.def.scale}),e.broodTimer>0)return;const r=e.hp<=e.def.hp*n.enrageBelow;e.broodTimer=r?n.enragedInterval:n.interval;const a=xn[n.variant],o=Math.min(n.perRelease,e.broodRemaining);let l=0;for(let c=0;c<o;c++){const h=i.rng()*Math.PI*2,d=Math.sin(h),u=Math.cos(h);if(!ll(i,{def:a,x:e.x+d*n.radius,z:e.z+u*n.radius,yaw:Math.atan2(-d,-u),entryX:e.x+d*n.entryRadius,entryZ:e.z+u*n.entryRadius,parentId:e.id}))break;e.broodRemaining-=1,l+=1}l>0&&vt(i.events,{type:"broodReleased",id:e.id,x:e.x,y:e.y,z:e.z,count:l,remaining:e.broodRemaining,scale:e.def.scale})}function Tp(i,e,t,n){const s=Math.atan2(-n,-t),r=[0,Math.PI/4,-Math.PI/4,Math.PI/2,-Math.PI/2,Math.PI],a=ai.escapeProbeDistance;let o=-t,l=-n,c=-1;i.index.query(e.x-a,e.z-a,e.x+a,e.z+a,ph);for(const h of r){const d=s+h,u=Math.cos(d),f=Math.sin(d);let m=a;for(const v of ph){if(v.kind==="floor"||v.kind==="ceiling")continue;const g=ui(e.x,e.y+e.def.height*.5,e.z,u*a,0,f*a,v,e.def.radius,Jt);g>=0&&(m=Math.min(m,g*a))}m>c&&(c=m,o=u,l=f)}return{x:o,z:l}}function rs(i,e){i.state=e,i.stateTime=0,i.approachClear=!1,i.interceptTime>0&&(i.interceptCooldown=on.cooldown),i.interceptTime=0,i.interceptObserveTime=0}function as(i,e,t,n){if(Math.abs(e)<1e-5&&Math.abs(t)<1e-5)return;const s=Math.atan2(-e,-t);i.yaw+=md(i.yaw,s)*Math.min(1,i.def.turnRate*n)}function Ap(i,e){for(let t=0;t<i.length;t++){const n=i[t];if(!(!n.alive||n.state==="lunge"||n.state==="dying"))for(let s=t+1;s<i.length;s++){const r=i[s];if(!r.alive||r.state==="lunge"||r.state==="dying")continue;const a=r.x-n.x,o=r.z-n.z,l=a*a+o*o,c=al.separationRadius*(n.def.scale+r.def.scale)*.5;if(l>=c*c||l<1e-8)continue;const h=Math.sqrt(l),d=(1-h/c)*al.separationStrength*e,u=a/h,f=o/h;n.def.stationary||(n.vx-=u*d,n.vz-=f*d),r.def.stationary||(r.vx+=u*d,r.vz+=f*d)}}}const Fi={minX:0,minY:0,minZ:0,maxX:0,maxY:0,maxZ:0},qt={t:1,nx:0,ny:0,nz:0},co=[];function Cp(i,e){for(let t=0;t<i.projectiles.length;t++){const n=i.projectiles[t];if(n.alive){if(n.life-=e,n.life<=0){n.alive=!1;continue}Rp(i,n,e)}}}function Rp(i,e,t){e.prevX=e.x,e.prevY=e.y,e.prevZ=e.z;const n=e.vx*t,s=e.vy*t,r=e.vz*t,a=Math.hypot(n,s,r),o=Math.max(1,Math.ceil(a/Vt.maxStepDistance)),l=n/o,c=s/o,h=r/o;for(let d=0;d<o;d++){const u=e.x,f=e.y,m=e.z;qt.t=Number.POSITIVE_INFINITY;let v=null;for(let p=0;p<i.enemies.length;p++){const y=i.enemies[p];if(!y.alive||y.state==="dying")continue;const E=y.def.radius;Fi.minX=y.x-E,Fi.maxX=y.x+E,Fi.minY=y.y,Fi.maxY=y.y+y.def.height,Fi.minZ=y.z-E,Fi.maxZ=y.z+E;const _=ui(u,f,m,l,c,h,Fi,Vt.radius,Jt);_>=0&&_<qt.t&&(qt.t=_,qt.nx=Jt.nx,qt.ny=Jt.ny,qt.nz=Jt.nz,v=y)}const g=Vt.radius;i.index.query(Math.min(u,u+l)-g,Math.min(m,m+h)-g,Math.max(u,u+l)+g,Math.max(m,m+h)+g,co);for(let p=0;p<co.length;p++){const y=co[p],E=ui(u,f,m,l,c,h,y,Vt.radius,Jt);E>=0&&E<qt.t&&(qt.t=E,qt.nx=Jt.nx,qt.ny=Jt.ny,qt.nz=Jt.nz,v=null)}if(Number.isFinite(qt.t)){const p=qt.t;if(e.x=u+l*p,e.y=f+c*p,e.z=m+h*p,e.alive=!1,v){const y=Math.hypot(e.vx,e.vz);_d(i,v,Vt.damage,y>1e-4?e.vx/y:0,y>1e-4?e.vz/y:0)}else vt(i.events,{type:"impactWorld",x:e.x,y:e.y,z:e.z,nx:qt.nx,ny:qt.ny,nz:qt.nz});return}e.x=u+l,e.y=f+c,e.z=m+h}}const mh={t:1,nx:0,ny:0,nz:0},Br=[],Ui={minX:0,minY:0,minZ:0,maxX:0,maxY:0,maxZ:0};function Pp(i,e,t,n,s,r,a,o){const l=s*o,c=r*o,h=a*o,d=Vt.radius;let u=Number.POSITIVE_INFINITY;for(let f=0;f<i.enemies.length;f++){const m=i.enemies[f];if(!m.alive||m.state==="dying")continue;const v=m.def.radius;Ui.minX=m.x-v,Ui.maxX=m.x+v,Ui.minY=m.y,Ui.maxY=m.y+m.def.height,Ui.minZ=m.z-v,Ui.maxZ=m.z+v;const g=ui(e,t,n,l,c,h,Ui,d,mh);g>=0&&g<u&&(u=g)}i.index.query(Math.min(e,e+l)-d,Math.min(n,n+h)-d,Math.max(e,e+l)+d,Math.max(n,n+h)+d,Br);for(let f=0;f<Br.length;f++){const m=ui(e,t,n,l,c,h,Br[f],d,mh);m>=0&&m<u&&(u=m)}return Br.length=0,Number.isFinite(u)?u*o:o}const Ip=4;class Lp{all;cell;minX;minZ;cols;rows;starts;items;mark;stamp;constructor(e,t=Ip){this.all=e,this.cell=t,this.stamp=0;let n=Number.POSITIVE_INFINITY,s=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,a=Number.NEGATIVE_INFINITY;for(const h of e)h.minX<n&&(n=h.minX),h.minZ<s&&(s=h.minZ),h.maxX>r&&(r=h.maxX),h.maxZ>a&&(a=h.maxZ);Number.isFinite(n)||(n=0,s=0,r=t,a=t),this.minX=n,this.minZ=s,this.cols=Math.max(1,Math.ceil((r-n)/t)+1),this.rows=Math.max(1,Math.ceil((a-s)/t)+1);const o=this.cols*this.rows,l=new Int32Array(o+1);for(const h of e)this.forEachBucket(h.minX,h.minZ,h.maxX,h.maxZ,d=>{l[d+1]+=1});for(let h=0;h<o;h++)l[h+1]+=l[h];this.starts=l,this.items=new Int32Array(l[o]);const c=new Int32Array(o);for(let h=0;h<e.length;h++){const d=e[h];this.forEachBucket(d.minX,d.minZ,d.maxX,d.maxZ,u=>{this.items[this.starts[u]+c[u]]=h,c[u]+=1})}this.mark=new Int32Array(e.length)}query(e,t,n,s,r){this.stamp+=1;const a=this.stamp;let o=0;return this.forEachBucket(e,t,n,s,l=>{const c=this.starts[l+1];for(let h=this.starts[l];h<c;h++){const d=this.items[h];this.mark[d]!==a&&(this.mark[d]=a,r[o++]=this.all[d])}}),r.length=o,r}get bucketCount(){return this.cols*this.rows}forEachBucket(e,t,n,s,r){const a=Math.max(0,Math.min(this.cols-1,Math.floor((e-this.minX)/this.cell))),o=Math.max(0,Math.min(this.cols-1,Math.floor((n-this.minX)/this.cell))),l=Math.max(0,Math.min(this.rows-1,Math.floor((t-this.minZ)/this.cell))),c=Math.max(0,Math.min(this.rows-1,Math.floor((s-this.minZ)/this.cell)));for(let h=l;h<=c;h++){const d=h*this.cols;for(let u=a;u<=o;u++)r(d+u)}}}function Dp(i){let e=1779033703^i.length;for(let t=0;t<i.length;t++)e=Math.imul(e^i.charCodeAt(t),3432918353),e=e<<13|e>>>19;return function(){return e=Math.imul(e^e>>>16,2246822507),e=Math.imul(e^e>>>13,3266489909),e^=e>>>16,e>>>0}}function Np(i,e,t,n){return function(){i>>>=0,e>>>=0,t>>>=0,n>>>=0;let r=i+e|0;return i=e^e>>>9,e=t+(t<<3)|0,t=t<<21|t>>>11,n=n+1|0,r=r+n|0,t=t+r|0,(r>>>0)/4294967296}}function Dt(i,e){const t=Dp(`${i}:${e}`),n=Np(t(),t(),t(),t());for(let s=0;s<12;s++)n();return n}function Ee(i,e,t){return e+(t-e)*i()}function cl(i,e,t){return e+Math.floor(i()*(t-e))}function zr(i,e){if(e.length===0)throw new Error("pick() called with an empty array");return e[Math.min(e.length-1,Math.floor(i()*e.length))]}const gh="abcdefghijklmnopqrstuvwxyz0123456789";function Fp(){let i="";for(let e=0;e<8;e++)i+=gh[Math.floor(Math.random()*gh.length)];return i}function vh(i){const e=(i??"").trim().toLowerCase();return e.length>0?e.slice(0,32):Fp()}const xh=Math.min(...Object.values(xn).map(i=>i.threatCost));function Up(i,e,t){const n=[];let s=Math.max(xh,Math.round(i));const r=xn.heavy,a=xn.runner;for(;s>=xh;){const o=t();let l=xn.walker;o<e.heavyChance?r.threatCost<=s&&(l=r):o<e.heavyChance+e.runnerChance&&a.threatCost<=s&&(l=a),n.push(l.name),s-=l.threatCost}return n}function Op(i,e){return e.z<i.minZ?0:e.x>i.maxX?1:e.z>i.maxZ?2:3}const os={distance:1e3,variety:200,visible:120,laneChange:40,farthest:1,farthestClamp:30};function Bp(i,e,t,n,s,r,a,o,l,c=!1){if(e.length===0)return null;const h=(r%e.length+e.length)%e.length,d=Lt.firstWaveArc/2;let u=null,f=Number.NEGATIVE_INFINITY;for(let m=0;m<e.length;m++){const v=(h+m)%e.length,g=e[v],p=Op(i,g),y=gd(g.entryX,g.entryZ,t,n),E=y>=Lt.minSpawnDistance;if(c&&(!E||p===a))continue;let _=E?os.distance:0;p!==a&&(_+=os.variety),v!==o&&(_+=os.laneChange),l&&zp(t,n,s,g,d)&&(_+=os.visible),_+=Math.min(y,os.farthestClamp)*os.farthest,_>f&&(f=_,u={spawn:g,index:v,source:p,fair:E})}return u}function zp(i,e,t,n,s){const r=n.entryX-i,a=n.entryZ-e;if(r===0&&a===0)return!0;const o=Math.atan2(gc(t),vc(t)),l=Math.atan2(r,a);return Math.abs(md(o,l))<=s}function wd(i){const e=Lt.spawnStagger/(1+Math.max(0,i)*Lt.staggerDepthScale);return Math.max(Lt.staggerFloor,e)}function kp(i){return Math.max(Lt.waveDelayFloor,Lt.waveDelay/(1+Math.max(0,i)*Lt.waveDelayDepthScale))}function Vp(i,e,t){const n=wd(e),s=[];for(let r=0;r<i.length;r++)if(r===0)s.push({delay:0,paired:!1});else if(s[r-1].paired)s.push({delay:(ri.breathMin+t()*(ri.breathMax-ri.breathMin))*(n/Lt.spawnStagger),paired:!1});else{const o=!xn[i[r]].stationary&&!xn[i[r-1]].stationary&&t()<ri.pairChance;s.push({delay:o?ri.pairGap:n*(ri.staggerMinScale+t()*(ri.staggerMaxScale-ri.staggerMinScale)),paired:o})}return s}function Gp(i,e,t,n){if(e.roster.length>0){if(e.spawnTimer-=n,e.spawnTimer<=0&&i.enemies.length<Lt.maxAlive){const l=e.arrivals[e.arrivalIndex]?.paired??!1;Wp(i,e,t,l)&&(e.arrivalIndex++,e.spawnTimer=e.arrivals[e.arrivalIndex]?.delay??wd(t.depth))}return}if(i.enemies.length>0)return;if(e.wave>0&&e.wave<e.waveCount&&!e.waveClearAnnounced&&(e.waveClearAnnounced=!0,i.stats.score+=Pi.wavePerWave*e.wave,vt(i.events,{type:"waveCleared",wave:e.wave,waveCount:e.waveCount})),e.wave>=e.waveCount){if(e.waveTimer-=n,e.waveTimer>0)return;Hp(i,e,t);return}if(e.waveTimer-=n,e.waveTimer>0)return;e.wave+=1,e.waveClearAnnounced=!1;const s=Math.max(1,t.encounter.waveBudget[e.wave-1]??1),r=Up(s,t.encounter,i.rng),a=t.encounter.anchored&&e.wave>=e.waveCount?t.anchor:null,o=a!==null;a&&r.unshift(fd(a.kind)),e.roster=r,e.arrivals=Vp(r,t.depth,Dt(i.seed,`sim-arrivals:${t.id}:${e.wave}`)),e.arrivalIndex=0,e.threatSpent+=s+(o?t.encounter.anchorThreat:0),e.spawnTimer=0,e.spawnCursor=Math.floor(i.rng()*Math.max(1,t.enemySpawns.length)),e.lastSource=-1,e.lastLane=-1,e.waveTimer=e.wave>=e.waveCount?Lt.clearDelay:kp(t.depth),vt(i.events,{type:"waveStarted",wave:e.wave,waveCount:e.waveCount,count:r.length,threat:s})}function Hp(i,e,t){e.state="cleared",i.engagedRoomId=-1,i.stats.roomsCleared+=1,i.stats.score+=Pi.wavePerWave*e.wave,i.stats.score+=Pi.roomClear*(1+t.depth);const n=Math.min(Ye.roomClearHeal,Ye.maxHp-i.player.hp);n>0&&(i.player.hp+=n,i.stats.integrityRestored+=n),vt(i.events,{type:"roomCleared",room:t.id,name:t.name,required:Mc(t),cleared:Na(i),total:Da(i),heal:n,hp:i.player.hp}),Xp(i)&&i.runtime[i.plan.finalRoomId].state==="cleared"&&(i.stats.score+=Pi.runComplete,i.status="cleared",vt(i.events,{type:"runCleared",score:i.stats.score}))}function Mc(i){return i.critical&&i.encounter.budget>0}function Da(i){let e=0;for(const t of i.rooms)Mc(t)&&(e+=1);return e}function Na(i){let e=0;for(const t of i.rooms)Mc(t)&&i.runtime[t.id].state==="cleared"&&(e+=1);return e}function Xp(i){return Na(i)===Da(i)}function Wp(i,e,t,n){const s=e.roster[0];if(!s)return!1;const r=xn[s];if(r.stationary){const c=t.anchor;if(!c)return e.roster.shift(),!0;if(op(i,c.x,c.z,Ye.radius))return!1;const h=ll(i,{def:r,x:c.x,z:c.z,yaw:c.yaw,entryX:c.x,entryZ:c.z,sink:r.height+$e.headroom});return h?(e.anchorStartedAt=i.time+Ri,e.roster.shift(),vt(i.events,{type:"anchorRising",kind:c.kind,id:h.id,x:c.x,y:i.floorY,z:c.z,scale:r.scale}),!0):!1}const a=Bp(t,t.enemySpawns,i.player.x,i.player.z,i.player.yaw,e.spawnCursor,e.lastSource,e.lastLane,e.wave===1,n);if(!a)return n?(e.arrivals[e.arrivalIndex].paired=!1,e.spawnTimer=ri.breathMin,!1):(e.roster.length=0,!1);const o=a.spawn;return ll(i,{def:r,x:o.x,z:o.z,yaw:o.yaw,entryX:o.entryX,entryZ:o.entryZ})?(e.roster.shift(),e.spawnCursor=(a.index+1)%t.enemySpawns.length,e.lastSource=a.source,e.lastLane=a.index,!0):!1}function qp(i,e){const t=i.playerSpawn,n=[];for(const a of i.rooms)for(const o of a.brushes)n.push(o);const s=i.rooms.map(a=>({id:a.id,anchorStartedAt:-1,state:a.encounter.budget>0?"idle":"cleared",wave:0,waveCount:a.encounter.waveBudget.length,waveTimer:Lt.engageDelay,waveClearAnnounced:!1,roster:[],spawnTimer:0,arrivals:[],arrivalIndex:0,spawnCursor:0,lastSource:-1,lastLane:-1,threatSpent:0})),r={seed:i.seed,tick:0,time:0,status:"playing",plan:i,rooms:i.rooms,runtime:s,brushes:n,index:new Lp(n),nav:_p(i.nav),floorY:0,activeRoomId:i.startRoomId,engagedRoomId:-1,player:{x:t.x,y:0,z:t.z,prevX:t.x,prevZ:t.z,vx:0,vz:0,yaw:t.yaw,pitch:0,hp:Ye.maxHp,fireCooldown:0,fireBuffer:0,hurtCooldown:0,alive:!0},enemies:[],projectiles:[],enemyBolts:Array.from({length:Gt.capacity},()=>({x:0,y:0,z:0,prevX:0,prevY:0,prevZ:0,vx:0,vy:0,vz:0,life:0,alive:!1,ownerId:-1,damage:0})),events:[],stats:{shots:0,hits:0,kills:0,damageTaken:0,timeAlive:0,score:0,bestChain:0,roomsCleared:0,integrityRestored:0},nextId:1,approachSerial:0,lastKillTime:Number.NEGATIVE_INFINITY,chain:0,rng:e};return bd(r.nav,t.x,t.z,1),r}function Zp(i,e,t){for(const n of i.rooms)if(e>=n.minX&&e<=n.maxX&&t>=n.minZ&&t<=n.maxZ)return n.id;return-1}function Yp(i,e,t=!0){t&&(i.chain=i.time-i.lastKillTime<=Pi.chainWindow?i.chain+1:1,i.lastKillTime=i.time,i.chain>i.stats.bestChain&&(i.stats.bestChain=i.chain));const n=t?i.chain:1,s=Math.min(Pi.chainMax,n)-1,r=Math.round(Pi.killBase[e]*(1+s*Pi.chainStep));i.stats.score+=r,vt(i.events,{type:"scored",amount:r,chain:n,total:i.stats.score})}function $p(i,e,t){i.status==="playing"&&(i.player.yaw=e.yaw,i.player.pitch=e.pitch,cp(i,e,t),hp(i,e,t),bd(i.nav,i.player.x,i.player.z,t),bp(i,t),Cp(i,t),mp(i,t),Kp(i),i.stats.timeAlive+=t,i.player.hp<=0&&i.player.alive&&(i.player.alive=!1,i.status="dead",vt(i.events,{type:"playerDied"})),i.status==="playing"&&Jp(i,t)),i.tick+=1,i.time+=t}function Kp(i){let e=0;for(let t=0;t<i.enemies.length;t++){const n=i.enemies[t];n.alive&&(i.enemies[e++]=n)}i.enemies.length=e,e=0;for(let t=0;t<i.projectiles.length;t++){const n=i.projectiles[t];n.alive&&(i.projectiles[e++]=n)}i.projectiles.length=e}function Jp(i,e){const t=Zp(i,i.player.x,i.player.z);if(t>=0&&t!==i.activeRoomId){i.activeRoomId=t;const n=i.rooms[t];vt(i.events,{type:"roomEntered",room:t,name:n.name,depth:n.depth,escalation:n.escalation,hostile:i.runtime[t].state==="idle",final:t===i.plan.finalRoomId})}if(i.engagedRoomId<0){const n=i.runtime[i.activeRoomId];n&&n.state==="idle"&&(n.state="engaged",n.waveTimer=Lt.engageDelay,i.engagedRoomId=n.id);return}Gp(i,i.runtime[i.engagedRoomId],i.rooms[i.engagedRoomId],e)}function Qp(){return{moveX:0,moveZ:0,yaw:0,pitch:0,sprint:!1,firePrimary:!1,firePressed:!1,interact:!1}}function jp(i){i.moveX=0,i.moveZ=0,i.sprint=!1,i.firePrimary=!1,i.firePressed=!1,i.interact=!1}const Ed=.0022,em=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];class tm{actions;held=new Set;canvas;sensitivity;invertY;disposed=!1;captureEnabled=!1;hadLock=!1;dragging=!1;dragX=0;dragY=0;lockFailed=!1;fireHeld=!1;pausePressed=!1;restartPressed=!1;debugPressed=!1;mutePressed=!1;peer=null;onLockStateChange=null;onSuspend=null;constructor(e,t,n={}){this.canvas=e,this.actions=t,this.sensitivity=n.sensitivity??Ed,this.invertY=n.invertY??!1,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVisibility),document.addEventListener("pointerlockchange",this.onPointerLock),document.addEventListener("pointerlockerror",this.onPointerLockError),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mouseup",this.onMouseUp)}setCaptureEnabled(e){this.captureEnabled=e,e||(this.dragging=!1,this.hadLock=!1)}get needsCaptureHint(){return this.captureEnabled&&!this.isLocked}get isLocked(){return document.pointerLockElement===this.canvas}requestLock(){if(this.isLocked)return;let e;try{e=this.canvas.requestPointerLock()}catch{this.markLockFailed();return}e&&typeof e.catch=="function"&&e.catch(()=>this.markLockFailed())}markLockFailed(){this.lockFailed=!0,this.onLockStateChange?.(!1,!0)}releaseLock(){this.isLocked&&document.exitPointerLock()}setSensitivity(e){this.sensitivity=e}setInvertY(e){this.invertY=e}consumePause(){const e=this.pausePressed;return this.pausePressed=!1,e}consumeRestart(){const e=this.restartPressed;return this.restartPressed=!1,e}consumeDebugToggle(){const e=this.debugPressed;return this.debugPressed=!1,e}consumeMuteToggle(){const e=this.mutePressed;return this.mutePressed=!1,e}release(){this.held.clear(),this.fireHeld=!1,jp(this.actions),this.peer&&this.peer.movementActive&&this.peer.writeMovement(),this.syncFire(),this.dragging=!1,this.dragX=0,this.dragY=0,this.pausePressed=!1,this.restartPressed=!1,this.debugPressed=!1,this.mutePressed=!1}dispose(){this.disposed||(this.disposed=!0,this.release(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVisibility),document.removeEventListener("pointerlockchange",this.onPointerLock),document.removeEventListener("pointerlockerror",this.onPointerLockError),document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mousedown",this.onMouseDown),document.removeEventListener("mouseup",this.onMouseUp))}get movementActive(){for(const e of em)if(this.held.has(e))return!0;return!1}get fireActive(){return this.fireHeld}writeMovement(){const e=this.actions,t=(this.held.has("KeyW")?1:0)+(this.held.has("ArrowUp")?1:0),n=(this.held.has("KeyS")?1:0)+(this.held.has("ArrowDown")?1:0),s=(this.held.has("KeyA")?1:0)+(this.held.has("ArrowLeft")?1:0),r=(this.held.has("KeyD")?1:0)+(this.held.has("ArrowRight")?1:0);e.moveZ=Zn(t-n,-1,1),e.moveX=Zn(r-s,-1,1),e.sprint=this.held.has("ShiftLeft")||this.held.has("ShiftRight")}syncMovement(){if(this.actions.interact=this.held.has("KeyE"),this.movementActive){this.writeMovement();return}const e=this.peer;if(e&&e.movementActive){e.writeMovement();return}this.writeMovement()}syncFire(){this.actions.firePrimary=this.fireHeld||!!this.peer?.fireActive}onKeyDown=e=>{if(!(e.repeat&&(e.code==="Escape"||e.code==="KeyR"||e.code==="F3"||e.code==="KeyM"))){switch(e.code){case"Escape":if(this.isLocked)return;this.pausePressed=!0;break;case"KeyR":this.restartPressed=!0;break;case"F3":this.debugPressed=!0,e.preventDefault();break;case"KeyM":this.mutePressed=!0;break}this.held.add(e.code),e.code==="Space"&&e.preventDefault(),this.syncMovement()}};onKeyUp=e=>{this.held.delete(e.code),this.syncMovement()};onBlur=()=>{this.release(),this.onSuspend?.()};onVisibility=()=>{document.hidden&&(this.release(),this.onSuspend?.())};onPointerLock=()=>{const e=this.isLocked;e?(this.hadLock=!0,this.lockFailed=!1):(this.hadLock&&this.release(),this.dragging=!1),this.onLockStateChange?.(e,this.lockFailed)};onPointerLockError=()=>{this.markLockFailed()};onMouseMove=e=>{if(!this.captureEnabled||!this.isLocked&&!this.dragging)return;const t=this.isLocked?e.movementX:e.clientX-this.dragX,n=this.isLocked?e.movementY:e.clientY-this.dragY;this.isLocked||(this.dragX=e.clientX,this.dragY=e.clientY);const s=this.actions;s.yaw-=t*this.sensitivity,s.pitch+=(this.invertY?n:-n)*this.sensitivity,s.pitch=Zn(s.pitch,-Ye.pitchLimit,Ye.pitchLimit)};onMouseDown=e=>{!this.captureEnabled||e.button!==0||(this.fireHeld=!0,this.syncFire(),this.actions.firePressed=!0,this.isLocked||(this.dragging=!0,this.dragX=e.clientX,this.dragY=e.clientY,this.requestLock()))};onMouseUp=e=>{e.button===0&&(this.fireHeld=!1,this.syncFire(),this.dragging=!1,this.dragX=0,this.dragY=0)}}const Kt={stickTravel:54,stickDeadzone:.16,lookSensitivity:.0042,portraitLookSensitivity:.0084,tapSlop:14,tapMaxSeconds:.3};class nm{actions;zones;now;isPortrait;sensitivity;portraitSensitivity;aimSensitivity;invertY;autoFire;disposed=!1;enabled=!1;movePointer=null;stickCx=0;stickCy=0;stickTravel=Kt.stickTravel;rawX=0;rawY=0;outX=0;outZ=0;aimPointer=null;aimX=0;aimY=0;aimDownAt=0;aimTravel=0;aimDragging=!1;pausePressed=!1;pauseClickPending=!1;sprintOn=!1;latchedFire=!1;autoFireHeld=!1;peer=null;onStickChange=null;onStickOrigin=null;onAimOrigin=null;onSprintChange=null;constructor(e,t,n={}){this.zones=e,this.actions=t,this.sensitivity=n.sensitivity??Kt.lookSensitivity,this.portraitSensitivity=n.portraitSensitivity??this.sensitivity*(Kt.portraitLookSensitivity/Kt.lookSensitivity),this.aimSensitivity=this.sensitivity,this.invertY=n.invertY??!1,this.autoFire=n.autoFire??!1,this.now=n.now??(()=>performance.now()),this.isPortrait=n.isPortrait??(()=>window.innerHeight>window.innerWidth),e.move.addEventListener("pointerdown",this.onStickDown),e.aim.addEventListener("pointerdown",this.onAimDown),e.pause.addEventListener("pointerdown",this.onPauseDown),e.sprint.addEventListener("pointerdown",this.onSprintDown),window.addEventListener("pointerdown",this.onAnyPointerDown,!0),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerCancel),window.addEventListener("lostpointercapture",this.onPointerCancel),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVisibility)}setEnabled(e){this.enabled!==e&&(this.enabled=e,e||this.release())}get isEnabled(){return this.enabled}setSensitivity(e){this.sensitivity=e,this.portraitSensitivity=e*(Kt.portraitLookSensitivity/Kt.lookSensitivity)}setInvertY(e){this.invertY=e}setAutoFire(e){this.autoFire!==e&&(this.autoFire=e,e?this.aimPointer!==null&&this.holdAutoFire():this.releaseAutoFire())}holdAutoFire(){this.autoFireHeld||(this.autoFireHeld=!0,this.syncFire())}releaseAutoFire(){this.autoFireHeld&&(this.autoFireHeld=!1,this.syncFire())}syncFire(){this.actions.firePrimary=this.autoFireHeld||!!this.peer?.fireActive}consumePause(){const e=this.pausePressed;return this.pausePressed=!1,e}consumePauseClickSuppression(){const e=this.pauseClickPending;return this.pauseClickPending=!1,e}acknowledgeFireLatch(){this.actions.firePressed||(this.latchedFire=!1)}get movementActive(){return this.movePointer!==null}get fireActive(){return this.autoFireHeld}writeMovement(){this.actions.moveX=this.outX,this.actions.moveZ=this.outZ,this.actions.sprint=this.sprintOn}applyMovement(){if(this.movementActive){this.writeMovement();return}const e=this.peer;if(e&&e.movementActive){e.writeMovement();return}this.actions.moveX=0,this.actions.moveZ=0,this.actions.sprint=this.sprintOn}release(){this.movePointer=null,this.aimPointer=null,this.onAimOrigin?.(0,0,!1),this.rawX=0,this.rawY=0,this.outX=0,this.outZ=0,this.aimTravel=0,this.aimDragging=!1,this.pausePressed=!1,this.sprintOn&&(this.sprintOn=!1,this.onSprintChange?.(!1)),this.latchedFire&&(this.actions.firePressed=!1,this.latchedFire=!1),this.releaseAutoFire(),this.applyMovement(),this.onStickChange?.(0,0,!1),this.onStickOrigin?.(0,0)}handleViewportChange(){this.stickCx=0,this.stickCy=0,this.stickTravel=Kt.stickTravel,this.release()}dispose(){this.disposed||(this.disposed=!0,this.release(),this.zones.move.removeEventListener("pointerdown",this.onStickDown),this.zones.aim.removeEventListener("pointerdown",this.onAimDown),this.zones.pause.removeEventListener("pointerdown",this.onPauseDown),this.zones.sprint.removeEventListener("pointerdown",this.onSprintDown),window.removeEventListener("pointerdown",this.onAnyPointerDown,!0),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),window.removeEventListener("lostpointercapture",this.onPointerCancel),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVisibility))}state(){return{movePointer:this.movePointer,aimPointer:this.aimPointer,stickX:+this.rawX.toFixed(4),stickY:+this.rawY.toFixed(4),moveX:+this.outX.toFixed(4),moveZ:+this.outZ.toFixed(4),aiming:this.aimDragging,sprint:this.sprintOn,autoFire:this.autoFire,autoFiring:this.autoFireHeld}}stamp(e){return e.timeStamp>0?e.timeStamp:this.now()}owns(e){return this.enabled&&e.pointerType!=="mouse"}claim(e){e.cancelable&&e.preventDefault();const t=e.currentTarget;try{t?.setPointerCapture?.(e.pointerId)}catch{}}onStickDown=e=>{if(!this.owns(e)||this.movePointer!==null)return;this.claim(e),this.movePointer=e.pointerId;const t=this.zones.stick.getBoundingClientRect();this.stickCx=e.clientX,this.stickCy=e.clientY,this.onStickOrigin?.(e.clientX-(t.left+t.width/2),e.clientY-(t.top+t.height/2)),this.stickTravel=t.width>0?t.width/2:Kt.stickTravel,this.updateStick(e.clientX,e.clientY)};onAimDown=e=>{!this.owns(e)||this.aimPointer!==null||(this.claim(e),this.aimPointer=e.pointerId,this.onAimOrigin?.(e.clientX,e.clientY,!0),this.aimX=e.clientX,this.aimY=e.clientY,this.aimDownAt=this.stamp(e),this.aimTravel=0,this.aimDragging=!1,this.aimSensitivity=this.isPortrait()?this.portraitSensitivity:this.sensitivity,this.autoFire&&this.holdAutoFire())};onPauseDown=e=>{e.cancelable&&e.preventDefault(),this.pausePressed=!0,this.pauseClickPending=!0};onAnyPointerDown=()=>{this.pauseClickPending=!1};onSprintDown=e=>{this.enabled&&(e.cancelable&&e.preventDefault(),this.sprintOn=!this.sprintOn,this.onSprintChange?.(this.sprintOn),this.applyMovement())};onPointerMove=e=>{if(!this.enabled)return;if(e.pointerId===this.movePointer){this.updateStick(e.clientX,e.clientY);return}if(e.pointerId!==this.aimPointer)return;const t=e.clientX-this.aimX,n=e.clientY-this.aimY;this.aimX=e.clientX,this.aimY=e.clientY;const s=Math.hypot(t,n);this.aimTravel+=s;let r=1;if(!this.aimDragging){if(this.aimTravel<=Kt.tapSlop)return;this.aimDragging=!0,r=s>0?(this.aimTravel-Kt.tapSlop)/s:0}const a=this.actions;a.yaw-=t*r*this.aimSensitivity,a.pitch+=(this.invertY?n:-n)*r*this.aimSensitivity,a.pitch=Zn(a.pitch,-Ye.pitchLimit,Ye.pitchLimit)};onPointerUp=e=>{if(e.pointerId===this.movePointer){this.endStick();return}if(e.pointerId!==this.aimPointer)return;this.aimPointer=null,this.onAimOrigin?.(0,0,!1),this.releaseAutoFire();const t=(this.stamp(e)-this.aimDownAt)/1e3,n=this.enabled&&!this.aimDragging&&this.aimTravel<=Kt.tapSlop&&t<=Kt.tapMaxSeconds;this.aimTravel=0,this.aimDragging=!1,n&&(this.autoFire||this.actions.firePressed||(this.actions.firePressed=!0,this.latchedFire=!0))};onPointerCancel=e=>{if(e.pointerId===this.movePointer){this.endStick();return}e.pointerId===this.aimPointer&&(this.aimPointer=null,this.onAimOrigin?.(0,0,!1),this.releaseAutoFire(),this.aimTravel=0,this.aimDragging=!1)};onBlur=()=>{this.release()};onVisibility=()=>{document.hidden&&this.release()};updateStick(e,t){const n=Math.max(1,this.stickTravel);let s=(e-this.stickCx)/n,r=(t-this.stickCy)/n;const a=Math.hypot(s,r);a>1&&(s/=a,r/=a),this.rawX=s,this.rawY=r;const o=Math.min(1,a);if(o<=Kt.stickDeadzone)this.outX=0,this.outZ=0;else{const l=(o-Kt.stickDeadzone)/(1-Kt.stickDeadzone)/o;this.outX=s*l||0,this.outZ=-r*l||0}this.applyMovement(),this.onStickChange?.(this.rawX,this.rawY,!0)}endStick(){this.movePointer=null,this.rawX=0,this.rawY=0,this.outX=0,this.outZ=0,this.applyMovement(),this.onStickChange?.(0,0,!1),this.onStickOrigin?.(0,0)}}const Lr={entry:{key:"entry",width:[13,17],depth:[12,16],ceiling:[4.2,4.6],columns:[0,0],tanks:[1,2],crates:[2,4],consoles:[1,2],threatDensity:0,waves:[0,0],labels:["DECONTAMINATION","AIRLOCK","QUARANTINE ENTRY"],deepLabels:["DECONTAMINATION","AIRLOCK","QUARANTINE ENTRY"]},corridor:{key:"corridor",width:[6,8],depth:[16,26],long:[16,26],narrow:[6,8],ceiling:[3.8,4.2],columns:[0,0],tanks:[0,0],crates:[0,2],consoles:[0,2],threatDensity:0,waves:[0,0],labels:["SERVICE RUN","TRANSIT CORRIDOR","ACCESS SPUR"],deepLabels:["SEALED SPUR","FLOODED RUN","UNLOGGED ACCESS"]},junction:{key:"junction",width:[11,14],depth:[11,14],ceiling:[4.4,5],columns:[1,1],tanks:[0,1],crates:[1,3],consoles:[1,2],threatDensity:0,waves:[0,0],labels:["SECTOR JUNCTION","CONTROL NODE","DISTRIBUTION HUB"],deepLabels:["DARK NODE","ABANDONED CONTROL","SILENT HUB"]},gallery:{key:"gallery",width:[9,12],depth:[17,23],long:[17,23],narrow:[9,12],ceiling:[4.2,4.8],columns:[0,0],tanks:[1,2],crates:[0,2],consoles:[2,4],threatDensity:0,waves:[0,0],labels:["OBSERVATION RUN","VIEWING GALLERY","SPECIMEN WALK"],deepLabels:["EMPTY GALLERY","BLIND OBSERVATION","WATCH ROOM"]},lab:{key:"lab",width:[15,19],depth:[15,18],ceiling:[4,4.6],columns:[0,1],tanks:[2,3],crates:[3,6],consoles:[2,4],threatDensity:2.6,waves:[1,2],labels:["CULTURE VAULT","ASSAY LAB","SEQUENCING SUITE","INCUBATION BAY"],deepLabels:["SUBJECT ANNEX","CULTURE OVERFLOW","UNLOGGED ASSAY"]},storage:{key:"storage",width:[17,22],depth:[15,18],ceiling:[3.6,4],columns:[0,1],tanks:[0,1],crates:[6,10],consoles:[0,1],threatDensity:2.4,waves:[1,2],labels:["SUPPLY HOLD","CRATE STORE","MATERIEL BAY","COLD STORE"],deepLabels:["SPOILED STORE","CONDEMNED HOLD","OVERFLOW STACK"]},containment:{key:"containment",width:[20,26],depth:[20,28],ceiling:[4.6,5.4],columns:[2,3],tanks:[3,5],crates:[3,6],consoles:[2,4],threatDensity:2.2,waves:[2,3],labels:["CONTAINMENT BAY","SPECIMEN HOLD","ISOLATION WARD","HOLDING PEN"],deepLabels:["BREACHED HOLD","EMPTY PENS","RELEASE WARD"]},reactor:{key:"reactor",width:[22,28],depth:[18,24],ceiling:[5.2,6],columns:[3,4],tanks:[1,2],crates:[1,3],consoles:[3,5],threatDensity:3,waves:[2,3],labels:["COOLANT PLANT","POWER SPINE","THERMAL VAULT"],deepLabels:["RUNAWAY PLANT","THERMAL BREACH","DEAD SPINE"]},chamber:{key:"chamber",width:[24,30],depth:[24,30],ceiling:[5.2,6],columns:[3,4],tanks:[4,6],crates:[2,5],consoles:[2,3],threatDensity:2.8,waves:[3,3],labels:["PRIMARY CONTAINMENT","REACTOR VAULT","CORE CHAMBER"],deepLabels:["PRIMARY BREACH","ORIGIN CHAMBER","CORE — OPEN"]}},Td=["lab","storage"],Ad=["containment","reactor"],im=["corridor","junction"],sm=["corridor","junction","gallery"];[...Td,...Ad];function _h(i){return i?Ad:Td}function rm(i){return i?sm:im}function am(i){return Lr[i].threatDensity>0}function hl(i,e,t){let n,s;if(i.long&&i.narrow){const a=Math.round(Ee(e,i.long[0],i.long[1])),o=Math.round(Ee(e,i.narrow[0],i.narrow[1]));n=t===0?a:o,s=t===0?o:a}else n=Math.round(Ee(e,i.width[0],i.width[1])),s=Math.round(Ee(e,i.depth[0],i.depth[1]));const r=Math.round(Ee(e,i.ceiling[0],i.ceiling[1])*4)/4;return{width:n,depth:s,ceiling:r}}function mr(i,e){return i[1]<=i[0]?i[0]:cl(e,i[0],i[1]+1)}const om=8,lm=10,cm=1,hm=3,um=12,dm=.5;function fm(i){const e=[],t=[],n=(m,v,g)=>{const p={id:e.length,archetype:m,depth:v<0?0:e[v].depth+1,critical:g,parent:v,children:[]};return e.push(p),v>=0&&(e[v].children.push(p.id),t.push({a:v,b:p.id,critical:g})),p},s=n("entry",-1,!0),r=[s.id],a=cl(i,om-2,lm-1);let o=s.id,l=!0;const c=Math.ceil(a*dm);for(let m=0;m<a;m++){const v=m>=c,g=l?zr(i,rm(v)):zr(i,_h(v)),p=n(g,o,!0);r.push(p.id),o=p.id,l=!l}const h=n("chamber",o,!0);r.push(h.id);const d=r.filter(m=>{const v=e[m];return!am(v.archetype)&&v.archetype!=="entry"}),u=cl(i,cm,hm+1),f=new Set;for(let m=0;m<u&&e.length<um&&d.length!==0;m++){let v=-1;for(let g=0;g<6;g++){const p=zr(i,d);if(!f.has(p)){v=p;break}}v<0||(f.add(v),n(zr(i,_h(e[v].depth>c)),v,!1))}return{nodes:e,edges:t,startId:s.id,finalId:h.id,criticalPath:r}}const Xn=.5,mn=Xn*3,pm=3,Ya=1.6,yc=3.2,mm=1.2,Hn=.5,kr=4,ls=.55,xi=.3,Mh=.34,gm=.13,yh=.07,vm=5,Sh=9,kn=1.3,Cd=2.4,Rd=3,xm=1.7,bh=1.2,Pd=.72,_m=2.05,Mm=.35,ot=Pd*2+Mm,Hi=3.54,Id=3.19,Kn=[0,1,0,1],$s=[-1,1,1,-1];function Ld(i){return(i+2)%4}const ym=[0,2,-2,4,-4,7,-7,11,-11],wh=2,Dd=.01;function Sm(i,e,t){return i.minX<e.maxX+t&&e.minX<i.maxX+t&&i.minZ<e.maxZ+t&&e.minZ<i.maxZ+t}function Eh(i,e){const t=e.slice();for(let n=t.length-1;n>0;n--){const s=Math.floor(i()*(n+1)),r=t[n];t[n]=t[s],t[s]=r}return t}function bm(i,e){const t=[0,1,2,3];if(e===-1)return Eh(i,t);const n=e,s=Ld(e),r=Eh(i,t.filter(a=>a!==n&&a!==s));return i()<.45?[n,r[0],r[1],s]:[r[0],n,r[1],s]}function Nd(i,e,t){const n=t===0?i.minX:i.minZ,s=t===0?i.maxX:i.maxZ,r=t===0?e.minX:e.minZ,a=t===0?e.maxX:e.maxZ;return{lo:Math.max(n,r),hi:Math.min(s,a)}}const Fa=(Ya+mm)*2;function Fd(i,e,t,n,s){for(const r of i)if(!(r.a!==e&&r.b!==e&&r.a!==t&&r.b!==t)&&Math.abs(r.x-n)<Fa&&Math.abs(r.z-s)<Fa)return!0;return!1}function wm(i,e){const t=[],n=[],s=new Map,a={rooms:t,doors:n,byId:s,incoming:new Map,nextConnectionId:0},o=i.nodes[i.startId],l=hl(Lr[o.archetype],e,1),c={id:o.id,archetype:o.archetype,depth:o.depth,critical:o.critical,minX:-Math.floor(l.width/2),maxX:-Math.floor(l.width/2)+l.width,minZ:-Math.floor(l.depth/2),maxZ:-Math.floor(l.depth/2)+l.depth,ceiling:l.ceiling};t.push(c),s.set(c.id,c);for(let h=1;h<i.criticalPath.length;h++){const d=i.criticalPath[h],u=i.nodes[d];if(!Th(a,u,u.parent,e))return null}for(const h of i.nodes)h.critical||s.has(h.id)||h.parent<0||!s.has(h.parent)||Th(a,h,h.parent,e);return Em(t,n,e),{rooms:t,doors:n}}function Th(i,e,t,n){const s=i.byId.get(t);if(!s)return!1;const r=Lr[e.archetype],a=hl(r,n,0),o=hl(r,n,1),l=bm(n,i.incoming.get(t)??-1);for(const c of l){const h=c===0||c===2?o:a,d=c===0||c===2?0:1,u=d===0?(s.minX+s.maxX)/2:(s.minZ+s.maxZ)/2;for(const f of ym){const m=Math.round(u+f),v=h.width/2,g=h.depth/2;let p,y;c===0?(y=s.minZ-mn-h.depth,p=m-v):c===2?(y=s.maxZ+mn,p=m-v):c===1?(p=s.maxX+mn,y=m-g):(p=s.minX-mn-h.width,y=m-g);const E={id:e.id,archetype:e.archetype,depth:e.depth,critical:e.critical,minX:p,maxX:p+h.width,minZ:y,maxZ:y+h.depth,ceiling:h.ceiling};let _=!0;for(const b of i.rooms)if(b.id!==t&&Sm(E,b,mn-Dd)){_=!1;break}if(!_)continue;const T=Nd(s,E,d);if(T.hi-T.lo<Fa)continue;const w=Math.round((T.lo+T.hi)/2*2)/2,A=d===0?w:c===1?s.maxX+mn/2:s.minX-mn/2,M=d===0?c===0?s.minZ-mn/2:s.maxZ+mn/2:w;if(!Fd(i.doors,t,e.id,A,M))return i.rooms.push(E),i.byId.set(E.id,E),i.doors.push({connectionId:i.nextConnectionId++,a:t,b:e.id,sideA:c,x:A,z:M,halfWidth:Ya,height:Math.min(yc,Math.min(s.ceiling,E.ceiling)-.8),critical:e.critical,loop:!1}),i.incoming.set(e.id,c),!0}}return!1}function Em(i,e,t){const n=new Set;for(const a of e)n.add(a.a<a.b?`${a.a}:${a.b}`:`${a.b}:${a.a}`);let s=e.length,r=0;for(let a=0;a<i.length&&r<wh;a++)for(let o=a+1;o<i.length&&r<wh;o++){const l=i[a],c=i[o];if(!n.has(`${l.id}:${c.id}`)&&!(Ee(t,0,1)>.55))for(const h of[0,1,2,3]){const d=h===0||h===2?0:1;let u;if(h===0?u=l.minZ-c.maxZ:h===2?u=c.minZ-l.maxZ:h===1?u=c.minX-l.maxX:u=l.minX-c.maxX,u<mn-Dd||u>pm)continue;const f=Nd(l,c,d);if(f.hi-f.lo<Fa)continue;const m=Math.round((f.lo+f.hi)/2*2)/2,v=d===0?m:h===1?l.maxX+u/2:l.minX-u/2,g=d===0?h===0?l.minZ-u/2:l.maxZ+u/2:m;if(!Fd(e,l.id,c.id,v,g)){e.push({connectionId:s++,a:l.id,b:c.id,sideA:h,x:v,z:g,halfWidth:Ya,height:Math.min(yc,Math.min(l.ceiling,c.ceiling)-.8),critical:!1,loop:!0}),n.add(`${l.id}:${c.id}`),r++;break}}}}const at={supportOffset:3.15,supportWidth:.62,headRadius:2.02,headBottom:3.43,headTop:3.91,lowerRadius:1.73,lowerBottom:3.25},Tm=Pd,Am=_m,Cm=2,Rm=3,Ai={strangeLabels:.45,breachedTankChance:.72,beaconsMin:0,beaconsMax:2,emergencyFixture:.55,emergencyIntensity:13,spotsPerIntake:3};function wr(i,e,t,n,s,r,a,o){return{minX:i,minY:e,minZ:t,maxX:n,maxY:s,maxZ:r,kind:a,surface:o}}function ut(i,e,t,n,s,r,a,o){return wr(i-n/2,e-s/2,t-r/2,i+n/2,e+s/2,t+r/2,a,o)}function ht(i,e,t,n,s,r,a,o,l,c){n-t<1e-4||r-s<1e-4||o-a<1e-4||(e===0?i.push(wr(t,s,a,n,r,o,l,c)):i.push(wr(a,s,t,o,r,n,l,c)))}function Ks(i,e){switch(e){case 0:return i.minZ;case 1:return i.maxX;case 2:return i.maxZ;default:return i.minX}}function Sc(i,e){return Kn[e]===0?{lo:i.minX,hi:i.maxX}:{lo:i.minZ,hi:i.maxZ}}function $a(i,e,t,n,s){for(const r of i)if(!(n<=r.minX||e>=r.maxX)&&!(s<=r.minZ||t>=r.maxZ))return!0;return!1}function Er(i,e,t,n){const s=i-e-t,r=n-(i+e);return s>0&&s<ot?t+e:r>0&&r<ot?n-e:i}function Ka(i,e,t,n,s,r){for(const a of i)if(!(a.kind!=="prop"||a.minY>.35||a.maxY<=.05)&&!(n+r<=a.minX||e-r>=a.maxX)&&!(s+r<=a.minZ||t-r>=a.maxZ))return!0;return!1}function ho(i,e,t,n=Tm,s=Am){for(let r=0;r<i.length;r++){const a=i[r];if(a.kind==="floor"||a.kind==="ceiling"||a.minY>=s||a.maxY<=.05)continue;const o=Math.max(a.minX,Math.min(e,a.maxX)),l=Math.max(a.minZ,Math.min(t,a.maxZ)),c=o-e,h=l-t;if(c*c+h*h<n*n)return a}}function Pm(i,e,t,n){const s=Xn,r=Kn[t],a=$s[t],o=Ks(e,t),l=a<0?o-s:o,c=a<0?o:o+s,h=Sc(e,t),d=h.lo-s,u=h.hi+s,f=n.slice().sort((v,g)=>v.lo-g.lo);let m=d;for(const v of f)ht(i,r,m,v.lo,0,e.ceiling,l,c,"wall","wallPanel"),ht(i,r,v.lo,v.hi,v.height,e.ceiling,l,c,"wall","wallPanel"),m=Math.max(m,v.hi);ht(i,r,m,u,0,e.ceiling,l,c,"wall","wallPanel")}function Im(i,e,t){const n=Xn,s=Kn[t.sideA],r=[];let a,o;if(s===0?(a=Math.min(i.maxZ,e.maxZ),o=Math.max(i.minZ,e.minZ)):(a=Math.min(i.maxX,e.maxX),o=Math.max(i.minX,e.minX)),o<a){const m=a;a=o,o=m}const l=a+n,c=o-n,h=s===0?t.x:t.z,d=t.halfWidth,u=d+Hn,f=Math.max(i.ceiling,e.ceiling);return ht(r,s,h-u,h+u,-n,0,l,c,"floor","floorPlate"),ht(r,s,h-u,h-d,0,f,l,c,"wall","structure"),ht(r,s,h+d,h+u,0,f,l,c,"wall","structure"),ht(r,s,h-d,h+d,t.height,f,l,c,"wall","structure"),r}function Lm(i,e,t,n){const{layout:s,dressing:r}=n,a=Lr[i.archetype],o=Xn,l=i.ceiling,{minX:c,maxX:h,minZ:d,maxZ:u}=i,f=h-c,m=u-d,v=(c+h)/2,g=(d+u)/2,p=[],y=[],E=[],_=[],T=[],w=[],A=Math.min(1,Math.max(0,n.escalation));p.push(wr(c-o,-o,d-o,h+o,0,u+o,"floor","floorPlate"),wr(c-o,l,d-o,h+o,l+o,u+o,"ceiling","ceilingPanel"));const M=[[],[],[],[]];for(const Q of e){const oe=Kn[Q.side]===0?Q.x:Q.z;M[Q.side].push({lo:oe-Q.halfWidth,hi:oe+Q.halfWidth,height:Q.height}),Ud(_,i,Q.side,oe,Q.halfWidth+.7,2.6),Fm(p,i,Q.side,oe,Q.halfWidth,Q.height)}t.budget>0&&Bm(i,e,M,_,p,T,n);for(const Q of[0,1,2,3])Pm(p,i,Q,M[Q]);Um(p,i,M),Om(p,i,M);const b=Math.max(0,Math.round(m/vm)-1);for(let Q=0;Q<b;Q++){const oe=d+m/(b+1)*(Q+1);p.push(ut(v,l-.18,oe,f,.36,.55,"ceiling","structure"))}const R=Math.max(1,Math.min(3,Math.round(f/Sh))),P=Math.max(1,Math.min(4,Math.round(m/Sh))),D=Math.max(1.4,Math.min(2.9,f/R-1.4)),X=R*P,W=t.budget<=0&&X>=2&&A>=Ai.emergencyFixture?Math.floor(r()*X):-1;for(let Q=0;Q<R;Q++)for(let oe=0;oe<P;oe++){const ze=c+f/(R+1)*(Q+1),je=d+m/(P+1)*(oe+1),Ve=Q*P+oe===W;p.push(ut(ze,l-.13,je,D,.26,1.05,"ceiling","machineDark"),ut(ze,l-.28,je,D-.3,.08,.78,"ceiling",Ve?"emergency":"lamp")),E.push({x:ze,y:l-.5,z:je,color:Ve?14173484:12572904,intensity:Ve?Ai.emergencyIntensity:34,distance:Math.max(16,Math.min(28,Math.max(f,m)*1.1))})}f>9&&y.push({kind:"pipeRun",x:c+1.15,y:l-.62,z:g,yaw:0,scale:1,variant:.3,length:m-1},{kind:"pipeRun",x:h-1.15,y:l-.62,z:g,yaw:0,scale:1,variant:.7,length:m-1});const U=Math.round(Ai.beaconsMin+(Ai.beaconsMax-Ai.beaconsMin)*A);for(let Q=0;Q<U;Q++){const oe=Q%2===0?-1:1,ze=v+oe*(f/2-.6),je=g+(Q<2?0:(r()-.5)*m*.5);y.push({kind:"beacon",x:ze,y:l-1,z:je,yaw:0,scale:1.2,variant:r()}),E.push({x:ze,y:l-1.2,z:je,color:14173484,intensity:6,distance:9})}const H=_.slice();i.archetype==="entry"&&H.push({minX:v-3,minZ:g-3,maxX:v+3,maxZ:g+3});const O=t.anchored&&n.anchorKind?Dm(i,e,n.anchorKind):null;O&&(H.push({minX:O.x-Hi,minZ:O.z-Hi,maxX:O.x+Hi,maxZ:O.z+Hi}),O.kind==="containmentMachine"&&km(p,y,i,O)),Vm(p,i,H,mr(a.columns,s),s),Gm(p,y,w,i,H,mr(a.tanks,r),A,r),Xm(p,y,i,H,mr(a.consoles,r),r),Wm(p,i,H,mr(a.crates,r),r),Hm(w,i,T,A,r),O&&w.push({x:O.x,z:O.z,radius:Hi*.62,coverage:Ee(r,.4,.55),brightness:Ee(r,.3,.44),variant:r()});for(const Q of T){if(ho(p,Q.x,Q.z))throw new Error(`Enemy entrance origin blocked at (${Q.x}, ${Q.z}) in room ${i.id}`);if(ho(p,Q.entryX,Q.entryZ))throw new Error(`Enemy entrance handoff blocked at (${Q.entryX}, ${Q.entryZ}) in room ${i.id}`)}if(O&&ho(p,O.x,O.z,Hi,Id))throw new Error(`Anchor blocked at (${O.x}, ${O.z}) in room ${i.id}`);const q=A>=Ai.strangeLabels?a.deepLabels:a.labels,ee=q[Math.floor(s()*q.length)%q.length],ie=1+Math.floor(s()*89);return{id:i.id,name:`${ee} ${String(ie).padStart(2,"0")}`,archetype:i.archetype,depth:i.depth,escalation:A,critical:i.critical,minX:c,maxX:h,minZ:d,maxZ:u,floorY:0,ceilY:l,brushes:p,props:y,lights:E,contamination:w,doorways:e.slice(),enemySpawns:T,anchor:O,encounter:t}}function Dm(i,e,t){const n=(i.minX+i.maxX)/2,s=(i.minZ+i.maxZ)/2,r=e[0];if(!r)return{kind:t,x:n,z:s,yaw:0};const a=Nm(i,r);return{kind:t,x:n,z:s,yaw:Math.atan2(-(a.x-n),-(a.z-s))}}function Nm(i,e){switch(e.side){case 0:return{x:e.x,z:i.minZ};case 1:return{x:i.maxX,z:e.z};case 2:return{x:e.x,z:i.maxZ};default:return{x:i.minX,z:e.z}}}function Ud(i,e,t,n,s,r){const a=$s[t],o=Ks(e,t),l=a<0?o:o-r;Kn[t]===0?i.push({minX:n-s,maxX:n+s,minZ:l,maxZ:l+r}):i.push({minX:l,maxX:l+r,minZ:n-s,maxZ:n+s})}function Fm(i,e,t,n,s,r){const a=Kn[t],o=$s[t],l=Ks(e,t),c=.35,h=o<0?l:l-c,d=o<0?l+c:l,u=s+Hn;ht(i,a,n-u,n-s,0,r+Hn,h,d,"wall","structure"),ht(i,a,n+s,n+u,0,r+Hn,h,d,"wall","structure"),ht(i,a,n-s,n+s,r,r+Hn,h,d,"wall","structure");const f=o<0?d:h-.06;ht(i,a,n-u,n+u,r+.12,r+Hn-.12,f,f+.06,"wall","hazard")}function Um(i,e,t){const n=e.ceiling,s=(a,o)=>{for(const l of t[a])if(o>l.lo-ls-Hn&&o<l.hi+ls+Hn)return!1;return!0},r=(a,o)=>{const l=o-a,c=Math.floor((l-kr)/kr);if(c<0)return[];const h=[],d=(l-kr)/Math.max(1,c);for(let u=0;u<=c;u++)h.push(a+kr*.5+u*d);return h};for(const a of r(e.minZ,e.maxZ))s(3,a)&&i.push(ut(e.minX+xi/2,n/2,a,xi,n,ls,"wall","structure")),s(1,a)&&i.push(ut(e.maxX-xi/2,n/2,a,xi,n,ls,"wall","structure"));for(const a of r(e.minX,e.maxX))s(0,a)&&i.push(ut(a,n/2,e.minZ+xi/2,ls,n,xi,"wall","structure")),s(2,a)&&i.push(ut(a,n/2,e.maxZ-xi/2,ls,n,xi,"wall","structure"))}function Om(i,e,t){const n=Mh,s=Mh+gm;for(const r of[0,1,2,3]){const a=Kn[r],o=$s[r],l=Ks(e,r),c=o<0?l:l-yh,h=o<0?l+yh:l,d=Sc(e,r),u=t[r].slice().sort((m,v)=>m.lo-v.lo);let f=d.lo;for(const m of u){const v=Math.min(m.lo-Hn,d.hi);v-f>=.2&&ht(i,a,f,v,n,s,c,h,"wall","emissive"),f=Math.max(f,m.hi+Hn)}d.hi-f>=.2&&ht(i,a,f,d.hi,n,s,c,h,"wall","emissive")}}function Bm(i,e,t,n,s,r,a){const o=Xn,l=Math.floor(a.layout()*4);for(let c=0;c<4&&r.length<Rm;c++){const h=(l+c)%4,d=Kn[h],u=$s[h],f=Ks(i,h),m=Sc(i,h),v=(m.lo+m.hi)/2,g=(m.hi-m.lo)/4,p=[v,v-g,v+g];let y=Number.NaN;for(const w of p){const A=Math.round(w*2)/2;if(A-kn<m.lo+1||A+kn>m.hi-1)continue;let M=!1;for(const q of t[h])if(A+kn+1.2>q.lo&&A-kn-1.2<q.hi){M=!0;break}for(const q of e){if(M)break;if(Kn[q.side]===d)continue;const ee=d===0?q.z:q.x,ie=d===0?q.x:q.z;Math.abs(ee-f)<4&&Math.abs(ie-A)<4&&(M=!0)}if(M)continue;const b=f+u*(o+Rd),R=Math.min(f,b),P=Math.max(f,b),D=A-kn-o,X=A+kn+o,W=d===0?D:R,U=d===0?X:P,H=d===0?R:D,O=d===0?P:X;if(a.isFree(W,H,U,O)){a.reserve(W,H,U,O),y=A;break}}if(Number.isNaN(y))continue;t[h].push({lo:y-kn,hi:y+kn,height:Cd}),Ud(n,i,h,y,kn+.7,bh+1.4),zm(s,i,h,y);const E=f+u*(o+xm),_=f-u*bh,T=h===0?Math.PI:h===2?0:h===1?Math.PI/2:-Math.PI/2;r.push(d===0?{x:y,z:E,yaw:T,entryX:y,entryZ:_}:{x:E,z:y,yaw:T,entryX:_,entryZ:y})}}function zm(i,e,t,n){const s=Xn,r=Kn[t],a=$s[t],o=Ks(e,t),l=o+a*s,c=o+a*(s+Rd),h=Math.min(l,c),d=Math.max(l,c),u=kn,f=Cd;ht(i,r,n-u,n+u,-s,0,h,d,"floor","floorPlate"),ht(i,r,n-u,n+u,f,f+s,h,d,"ceiling","structure"),ht(i,r,n-u-s,n-u,0,f,h,d,"wall","machineDark"),ht(i,r,n+u,n+u+s,0,f,h,d,"wall","machineDark");const m=a<0?h:d-s;ht(i,r,n-u,n+u,0,f,m,m+s,"wall","machineDark");const v=a<0?h+s:d-s-.05;ht(i,r,n-u+.3,n+u-.3,.5,f-.5,v,v+.05,"wall","emissive");const g=a<0?o:o-.3,p=a<0?o+.3:o;ht(i,r,n-u-.35,n-u,0,f+.35,g,p,"wall","structure"),ht(i,r,n+u,n+u+.35,0,f+.35,g,p,"wall","structure"),ht(i,r,n-u,n+u,f,f+.08,g,p,"wall","structure"),ht(i,r,n-u,n+u,f+.27,f+.35,g,p,"wall","structure"),ht(i,r,n-u,n+u,f+.08,f+.27,g,p,"wall","hazard")}function km(i,e,t,n){const s=Math.max(3.5,t.ceiling-.65);e.push({kind:"containmentMachine",x:n.x,y:0,z:n.z,yaw:0,scale:1,variant:t.depth/10,height:s});const r=i.length,a=at.supportOffset,o=at.supportWidth;for(const h of[-1,1])for(const d of[-1,1]){const u=n.x+h*a,f=n.z+d*a;i.push(ut(u,s/2,f,o,s,o,"prop","structure"),ut(u,.42,f,.62,.72,.62,"prop","hazard"))}const l=Math.max(3.35,s-.18),c=a*2-o;i.push(ut(n.x,l,n.z-a,c,.3,o,"prop","machineDark"),ut(n.x,l,n.z+a,c,.3,o,"prop","machineDark"),ut(n.x-a,l,n.z,o,.3,c,"prop","machineDark"),ut(n.x+a,l,n.z,o,.3,c,"prop","machineDark"));for(const[h,d,u]of[[at.headRadius,at.headBottom,at.headTop],[at.lowerRadius,at.lowerBottom,at.headBottom]]){const f=h*Math.cos(Math.PI/8),m=h*(Math.cos(Math.PI/8)+Math.sin(Math.PI/8)),v=f*2/12;for(let g=0;g<12;g++){const p=-f+g*v,y=p+v,E=Math.min(f,m-Math.max(Math.abs(p),Math.abs(y)));i.push(ut(n.x,(d+u)/2,n.z+(p+y)/2,E*2,u-d,v,"prop","machineDark"))}}for(let h=r;h<i.length;h++)i[h].collisionOnly=!0}function Vm(i,e,t,n,s){const r=e.ceiling,a=(e.maxX-e.minX)/2,o=(e.maxZ-e.minZ)/2,l=(e.minX+e.maxX)/2,c=(e.minZ+e.maxZ)/2,h=.75;for(let d=0;d<n;d++){const u=l+(d%2===0?-1:1)*Ee(s,a*.3,a*.56),f=c+(d<2?-1:1)*Ee(s,o*.15,o*.55);u-h-e.minX<ot||e.maxX-u-h<ot||f-h-e.minZ<ot||e.maxZ-f-h<ot||$a(t,u-h-ot,f-h-ot,u+h+ot,f+h+ot)||Ka(i,u-h,f-h,u+h,f+h,ot)||i.push(ut(u,r/2,f,1.25,r,1.25,"prop","structure"),ut(u,.55,f,1.42,.9,1.42,"prop","hazard"),ut(u,1.06,f,1.5,.12,1.5,"prop","machineDark"))}}function Gm(i,e,t,n,s,r,a,o){const u=n.maxZ-n.minZ,f=a*Ai.breachedTankChance;let m=0;for(let v=0;v<r*5&&m<r;v++){const g=v%2===0?-1:1,p=Er(g<0?n.minX+1.9:n.maxX-1.9,1.15,n.minX,n.maxX),y=Er(n.minZ+u*(.14+.72*o()),1.15,n.minZ,n.maxZ);if(p-1.15<n.minX-1e-6||p+1.15>n.maxX+1e-6||y-1.15<n.minZ-1e-6||y+1.15>n.maxZ+1e-6||!bc(n,p,y,1.15)||$a(s,p-1.15-ot,y-1.15-ot,p+1.15+ot,y+1.15+ot)||Ka(i,p-1.15,y-1.15,p+1.15,y+1.15,ot))continue;const E=Ee(o,0,Math.PI),_=o(),T=o()<f;i.push(ut(p,.24,y,1.15*2,.48,1.15*2,"prop","machineDark"),ut(p,.55,y,1.15*2-.25,.1,1.15*2-.25,"prop",T?"machineDark":"emissive"));const w=ut(p,.66+3.05/2,y,.731*2,3.05,.731*2,"prop","glass");w.collisionOnly=!0,i.push(w),e.push({kind:T?"breachedTank":"containmentTank",x:p,y:0,z:y,yaw:E,scale:1,variant:_}),T&&t.push({x:p,z:y,radius:Ee(o,1.5,2.3),coverage:Ee(o,.3,.5),brightness:Ee(o,.3,.46),variant:_}),m++}}function Hm(i,e,t,n,s){const r=Math.round(n*Ai.spotsPerIntake);if(!(r<=0))for(const a of t)for(let o=0;o<r;o++){const l=(o+.5)/r,c=a.x+(a.entryX-a.x)*(.55+l*1.1)+Ee(s,-.7,.7),h=a.z+(a.entryZ-a.z)*(.55+l*1.1)+Ee(s,-.7,.7);c<e.minX||c>e.maxX||h<e.minZ||h>e.maxZ||i.push({x:c,z:h,radius:Ee(s,.9,1.9)*(1-l*.4),coverage:Ee(s,.22,.42)*(1-l*.35),brightness:Ee(s,.28,.44),variant:s()})}}function Xm(i,e,t,n,s,r){const a=t.maxZ-t.minZ,o=1;let l=0;for(let c=0;c<s*5&&l<s;c++){const h=c%2===0?-1:1,d=h<0?t.minX+.36:t.maxX-.36,u=Er(t.minZ+a*(.12+.76*r()),o,t.minZ,t.maxZ);u-o<t.minZ-1e-6||u+o>t.maxZ+1e-6||bc(t,d,u,o)&&($a(n,d-.4-ot,u-o-ot,d+.4+ot,u+o+ot)||Ka(i,d-.4,u-o,d+.4,u+o,ot)||(i.push(ut(d,.5,u,.72,1,1.9,"prop","machine"),ut(d,1.02,u,.8,.1,2,"prop","machineDark")),e.push({kind:"wallConsole",x:d,y:1.07,z:u,yaw:h<0?Math.PI/2:-Math.PI/2,scale:1,variant:r()}),l++))}}function Wm(i,e,t,n,s){let r=0;for(let a=0;a<n*6&&r<n;a++){const o=Ee(s,.85,1.25),l=o/2,c=Er(e.minX+l+(e.maxX-e.minX-o)*s(),l,e.minX,e.maxX),h=Er(e.minZ+l+(e.maxZ-e.minZ-o)*s(),l,e.minZ,e.maxZ);if(c-l<e.minX-1e-6||c+l>e.maxX+1e-6||h-l<e.minZ-1e-6||h+l>e.maxZ+1e-6||!bc(e,c,h,l)||$a(t,c-l-ot,h-l-ot,c+l+ot,h+l+ot)||Ka(i,c-l,h-l,c+l,h+l,ot))continue;const d=.12;i.push(ut(c,(o-d)/2,h,o,o-d,o,"prop","machine"),ut(c,o-d/2,h,o*1.04,d,o*1.04,"prop","hazard")),r++}}function bc(i,e,t,n){const s=[e-n-i.minX,i.maxX-(e+n),t-n-i.minZ,i.maxZ-(t+n)];for(const r of s)if(r>.001&&r<ot)return!1;return!0}const qm=100,Od=3,Zm=.1,Ym=.06,$m=.45,Km=3,Jm=.055,Qm=.3,jm={containmentMachine:6,orchestrator:14},e0=6;function t0(i,e,t,n=null){if(e.threatDensity<=0)return{budget:0,waveBudget:[],runnerChance:0,heavyChance:0,anchored:!1,anchorThreat:0};const s=n!==null,r=n?jm[n]:0,a=(i.maxX-i.minX)*(i.maxZ-i.minZ),o=1+i.depth*.11,l=i.critical?1:.85,c=Math.max(Od+r,Math.round(a/qm*e.threatDensity*o*l*Ee(t,.92,1.12))),h=Math.max(1,mr(e.waves,t)),d={budget:c,waveBudget:[],runnerChance:Math.min($m,Zm+i.depth*Ym),heavyChance:Math.min(Qm,Math.max(0,i.depth-Km)*Jm),anchored:s,anchorThreat:r};return Bd(d,h),d}function Bd(i,e){const t=Math.max(zd(i),i.budget-i.anchorThreat);i.waveBudget=i0(t,e),i.budget=i.anchorThreat+i.waveBudget.reduce((n,s)=>n+s,0)}function zd(i){return Math.max(i.waveBudget.length,i.anchorThreat>0?e0:Od)}function Ah(i){return i.anchorThreat+zd(i)}const cs={min:72,max:88};function n0(i){const e=i.filter(a=>a.budget>0);if(e.length===0)return 0;const t=()=>e.reduce((a,o)=>a+o.budget,0),n=t(),s=n<cs.min?cs.min/n:n>cs.max?cs.max/n:1;if(s!==1)for(const a of e)a.budget=Math.max(Ah(a),Math.round(a.budget*s));const r=e.length*64;for(let a=0;a<r&&t()>cs.max;a++){const o=Ch(e,l=>l.budget>Ah(l),(l,c)=>c.budget-l.budget);if(!o)break;o.budget-=1}for(let a=0;a<r&&t()<cs.min;a++){const o=Ch(e,()=>!0,(l,c)=>l.budget-c.budget);if(!o)break;o.budget+=1}for(const a of e)Bd(a,a.waveBudget.length);return t()}function Ch(i,e,t){let n;for(const s of i)e(s)&&(!n||t(s,n)<0)&&(n=s);return n}function i0(i,e){const t=e*(e+1)/2,n=[];let s=0;for(let r=0;r<e-1;r++){const a=Math.max(1,Math.round(i*(r+1)/t));n.push(a),s+=a}return n.push(Math.max(1,i-s)),n}const s0=.05;function Vr(i,e,t,n,s,r){for(const a of i.brushes){if(a.kind==="floor"||a.kind==="ceiling"||r<=a.minY||s>=a.maxY)continue;const o=Math.max(a.minX,Math.min(e,a.maxX)),l=Math.max(a.minZ,Math.min(t,a.maxZ));if((o-e)**2+(l-t)**2<n*n)return!0}return!1}function kd(i,e){const t=[],n=[],s=new Map;for(const f of i.rooms)s.set(f.id,f);const r=new Map;for(const f of i.connections){if(!s.has(f.a)||!s.has(f.b)){t.push(`connection ${f.id} references a missing room`);continue}r.has(f.a)||r.set(f.a,[]),r.has(f.b)||r.set(f.b,[]),r.get(f.a).push(f.b),r.get(f.b).push(f.a)}const a=new Set([i.startRoomId]),o=[i.startRoomId];for(;o.length>0;){const f=o.pop();for(const m of r.get(f)??[])a.has(m)||(a.add(m),o.push(m))}a.has(i.finalRoomId)||t.push("the final chamber is unreachable in the room graph");for(const f of i.rooms)a.has(f.id)||t.push(`room ${f.id} is not connected to the entry`),f.doorways.length===0&&t.push(`room ${f.id} has no doorway`);for(let f=0;f<i.rooms.length;f++)for(let m=f+1;m<i.rooms.length;m++){const v=i.rooms[f],g=i.rooms[m],p=mn-.01;v.minX<g.maxX+p&&g.minX<v.maxX+p&&v.minZ<g.maxZ+p&&g.minZ<v.maxZ+p&&t.push(`rooms ${v.id} and ${g.id} overlap`)}const l=s.get(i.startRoomId);l?Vr(l,i.playerSpawn.x,i.playerSpawn.z,e.playerRadius,.05,e.playerHeight)&&t.push("the player spawn is inside collision"):t.push("the entry room is missing");for(const f of i.rooms)if(!(f.encounter.budget<=0)){f.enemySpawns.length<Cm&&t.push(`room ${f.id} fights with only ${f.enemySpawns.length} arrival lane(s)`);for(const m of f.enemySpawns)Vr(f,m.x,m.z,e.enemyRadius,.05,e.enemyHeight)&&t.push(`room ${f.id} has a blocked entrance origin`),Vr(f,m.entryX,m.entryZ,e.enemyRadius,.05,e.enemyHeight)&&t.push(`room ${f.id} has a blocked entrance handoff`);f.encounter.anchored?f.anchor?Vr(f,f.anchor.x,f.anchor.z,Hi,.05,Id)&&t.push(`room ${f.id} has a blocked anchor`):t.push(`room ${f.id} declares an anchored specimen with no anchor`):f.anchor&&t.push(`room ${f.id} has an anchor but no anchored specimen`)}const c=i.nav,h=Os(c,i.playerSpawn.x,i.playerSpawn.z);if(h<0)t.push("the player spawn has no walkable navigation cell");else{const f=new Uint8Array(c.walkable.length),m=dh(c,h,f),v=xp(c);m<v&&n.push(`${v-m} walkable cells are isolated from the spawn`);for(const g of i.rooms){const p=(g.minX+g.maxX)/2,y=(g.minZ+g.maxZ)/2,E=Os(c,p,y);(E<0||!f[E])&&t.push(`room ${g.id} cannot be walked to from the entry`);for(const _ of g.enemySpawns){const T=uh(c,_.entryX,_.entryZ);(T<0||!f[T])&&t.push(`room ${g.id} has an entrance that cannot reach the player`)}}}const d=Sd(i.rooms,{radius:Math.max(0,e.enemyRadius-s0),height:e.enemyHeight}),u=Os(d,i.playerSpawn.x,i.playerSpawn.z);if(u<0)t.push("the largest specimen has no walkable cell at the player spawn");else{const f=new Uint8Array(d.walkable.length);dh(d,u,f);for(const m of i.rooms){const v=(m.minX+m.maxX)/2,g=(m.minZ+m.maxZ)/2,p=Os(d,v,g);if(p<0||!f[p]){t.push(`room ${m.id} is unreachable by the largest specimen`);continue}for(const y of m.enemySpawns){const E=uh(d,y.entryX,y.entryZ);(E<0||!f[E])&&t.push(`room ${m.id} has an entrance the largest specimen cannot leave`)}}}return{problems:t,warnings:n}}const r0=12,Rh=[4,6,8];function a0(i){const e=Number.isFinite(i)?Math.max(0,i):0;let t=0;for(const n of Rh){if(e<n)break;t+=1}return t/Rh.length}function o0(i,e){const t=e.now??(()=>0),n=e.maxAttempts??r0,s=t();for(let a=0;a<n;a++){const o=l0(i,a,e.validation);if(o)return o.report.attempts=a+1,o.report.ms=t()-s,o}const r=f0(i,e.validation);return r.report.attempts=n,r.report.fallback=!0,r.report.ms=t()-s,r}function l0(i,e,t){const n=e===0?"":`:${e}`,s=Dt(i,`layout${n}`),r=Dt(i,`dressing${n}`),a=Dt(i,`enemies${n}`),o=fm(s),l=wm(o,s);if(!l)return null;const c=c0(l,o.startId,o.finalId,o.criticalPath);let h;try{h=Vd(i,c.layout,c.startId,c.finalId,c.criticalPath,{layout:s,dressing:r,enemies:a})}catch{return null}const d=kd(h,t);return d.problems.length>0?null:(h.report.warnings=d.warnings,h)}function c0(i,e,t,n){const s=new Map;i.rooms.forEach((o,l)=>s.set(o.id,l));const r=i.rooms.map((o,l)=>({...o,id:l})),a=i.doors.map((o,l)=>({...o,connectionId:l,a:s.get(o.a),b:s.get(o.b)}));return{layout:{rooms:r,doors:a},startId:s.get(e)??0,finalId:s.get(t)??r.length-1,criticalPath:n.filter(o=>s.has(o)).map(o=>s.get(o))}}function Vd(i,e,t,n,s,r){const a=new Map;for(const b of e.rooms)a.set(b.id,b);const o=e.rooms.map(b=>({minX:b.minX-Xn,minZ:b.minZ-Xn,maxX:b.maxX+Xn,maxZ:b.maxZ+Xn,owner:b.id})),l=h0(e.rooms,n),c=new Map;for(const b of e.rooms){const R=b.id===n?"orchestrator":b.id===l?"containmentMachine":null;c.set(b.id,t0(b,Lr[b.archetype],r.enemies,R))}const h=[];for(const b of e.rooms)b.critical&&h.push(c.get(b.id));const d=n0(h),u=[...c.values()].reduce((b,R)=>b+R.budget,0),f=[];for(const b of e.rooms){const R=[];for(const W of e.doors)W.a===b.id?R.push(Ph(W,W.sideA)):W.b===b.id&&R.push(Ph(W,Ld(W.sideA)));const P=c.get(b.id),D=b.id,X={layout:r.layout,dressing:r.dressing,escalation:a0(b.depth),anchorKind:b.id===n?"orchestrator":b.id===l?"containmentMachine":null,isFree(W,U,H,O){for(const q of o)if(q.owner!==D&&!(H<=q.minX||W>=q.maxX)&&!(O<=q.minZ||U>=q.maxZ))return!1;return!0},reserve(W,U,H,O){o.push({minX:W,minZ:U,maxX:H,maxZ:O,owner:-1})}};f.push(Lm(b,R,P,X))}const m=new Map;for(const b of f)m.set(b.id,b);for(const b of e.doors){const R=a.get(b.a),P=a.get(b.b),D=m.get(Math.min(b.a,b.b));for(const X of Im(R,P,b))D.brushes.push(X)}const v=Sd(f,{radius:vp,height:1.4});let g=Number.POSITIVE_INFINITY,p=Number.POSITIVE_INFINITY,y=Number.NEGATIVE_INFINITY,E=Number.NEGATIVE_INFINITY,_=0,T=0,w=0;const A={};for(const b of f){_+=b.brushes.length,T+=b.contamination.length,b.escalation>w&&(w=b.escalation),A[b.archetype]=(A[b.archetype]??0)+1;for(const R of b.brushes)R.minX<g&&(g=R.minX),R.minZ<p&&(p=R.minZ),R.maxX>y&&(y=R.maxX),R.maxZ>E&&(E=R.maxZ)}const M={seed:i,attempts:1,fallback:!1,rooms:f.length,connections:e.doors.length,loops:e.doors.filter(b=>b.loop).length,brushes:_,threatTotal:u,requiredThreat:d,archetypes:A,escalationPeak:+w.toFixed(3),contamination:T,criticalPath:s.slice(),warnings:[],ms:0};return{seed:i,rooms:f,connections:e.doors.map(b=>({id:b.connectionId,a:b.a,b:b.b,x:b.x,z:b.z,critical:b.critical,loop:b.loop})),startRoomId:t,finalRoomId:n,playerSpawn:u0(m.get(t)),nav:v,report:M,minX:g,maxX:y,minZ:p,maxZ:E}}function h0(i,e){const t=i.find(n=>n.id!==e&&n.critical&&(n.archetype==="containment"||n.archetype==="reactor"));if(!t)throw new Error("Facility has no deep non-final combat room for its machine");return t.id}function Ph(i,e){return{connectionId:i.connectionId,side:e,x:i.x,z:i.z,halfWidth:i.halfWidth,height:i.height}}function u0(i){const e=(i.minX+i.maxX)/2,t=(i.minZ+i.maxZ)/2,n=i.doorways[0];if(!n)return{x:e,z:t,yaw:0};const s=d0(i,n);return{x:e,z:t,yaw:Math.atan2(-(s.x-e),-(s.z-t))}}function d0(i,e){switch(e.side){case 0:return{x:e.x,z:i.minZ};case 1:return{x:i.maxX,z:e.z};case 2:return{x:e.x,z:i.maxZ};default:return{x:i.minX,z:e.z}}}function f0(i,e){const t=Dt(i,"layout:fallback"),n=Dt(i,"dressing:fallback"),s=Dt(i,"enemies:fallback"),r=[{archetype:"entry",width:14,depth:12,ceiling:4.5},{archetype:"corridor",width:8,depth:18,ceiling:4},{archetype:"lab",width:18,depth:16,ceiling:4.5},{archetype:"junction",width:13,depth:13,ceiling:4.75},{archetype:"storage",width:20,depth:16,ceiling:3.75},{archetype:"gallery",width:10,depth:20,ceiling:4.5},{archetype:"containment",width:22,depth:24,ceiling:5},{archetype:"reactor",width:24,depth:20,ceiling:5.5},{archetype:"chamber",width:26,depth:26,ceiling:5.5}],a=[];let o=r[0].depth/2;for(let u=0;u<r.length;u++){const f=r[u];u>0&&(o=a[u-1].minZ-mn),a.push({id:u,archetype:f.archetype,depth:u,critical:!0,minX:-f.width/2,maxX:f.width/2,minZ:o-f.depth,maxZ:o,ceiling:f.ceiling})}const l=[];for(let u=0;u<a.length-1;u++)l.push({connectionId:u,a:u,b:u+1,sideA:0,x:0,z:a[u].minZ-mn/2,halfWidth:Ya,height:yc,critical:!0,loop:!1});const c=a.map(u=>u.id),h=Vd(i,{rooms:a,doors:l},0,a.length-1,c,{layout:t,dressing:n,enemies:s}),d=kd(h,e);if(d.problems.length>0)throw new Error(`the deterministic fallback facility is invalid: ${d.problems.join("; ")}`);return h.report.warnings=d.warnings,h}const wc="185",p0=0,Ih=1,m0=2,Sr=1,g0=2,gr=3,di=0,nn=1,gn=2,li=0,Gs=1,Li=2,Lh=3,Dh=4,Gd=5,oi=100,v0=101,x0=102,_0=103,M0=104,y0=200,ul=201,S0=202,b0=203,dl=204,Tr=205,w0=206,E0=207,T0=208,A0=209,C0=210,R0=211,P0=212,I0=213,L0=214,fl=0,pl=1,ml=2,Ws=3,gl=4,vl=5,xl=6,_l=7,Ec=0,D0=1,N0=2,Yn=0,Hd=1,Xd=2,Wd=3,Tc=4,qd=5,Zd=6,Yd=7,$d=300,$i=301,qs=302,uo=303,fo=304,Ja=306,Ki=1e3,vn=1001,Ml=1002,Ht=1003,F0=1004,Gr=1005,Ct=1006,po=1007,Wn=1008,un=1009,Kd=1010,Jd=1011,Ar=1012,Ac=1013,Jn=1014,In=1015,fi=1016,Cc=1017,Rc=1018,Cr=1020,Qd=35902,jd=35899,ef=1021,tf=1022,Sn=1023,pi=1026,Zi=1027,Pc=1028,Ic=1029,Ji=1030,Lc=1031,Dc=1033,Ea=33776,Ta=33777,Aa=33778,Ca=33779,yl=35840,Sl=35841,bl=35842,wl=35843,El=36196,Tl=37492,Al=37496,Cl=37488,Rl=37489,Ua=37490,Pl=37491,Il=37808,Ll=37809,Dl=37810,Nl=37811,Fl=37812,Ul=37813,Ol=37814,Bl=37815,zl=37816,kl=37817,Vl=37818,Gl=37819,Hl=37820,Xl=37821,Wl=36492,ql=36494,Zl=36495,Yl=36283,$l=36284,Oa=36285,Kl=36286,U0=3200,Ba=0,O0=1,Cn="",tn="srgb",za="srgb-linear",ka="linear",tt="srgb",hs=7680,Nh=519,B0=512,z0=513,k0=514,Nc=515,V0=516,G0=517,Fc=518,H0=519,Fh=35044,Jl=35048,Uh="300 es",qn=2e3,Rr=2001;function X0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Va(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function W0(){const i=Va("canvas");return i.style.display="block",i}const Oh={};function Bh(...i){const e="THREE."+i.shift();console.log(e,...i)}function nf(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Pe(...i){i=nf(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ze(...i){i=nf(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Hs(...i){const e=i.join(" ");e in Oh||(Oh[e]=!0,Pe(...i))}function q0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Z0={[fl]:pl,[ml]:xl,[gl]:_l,[Ws]:vl,[pl]:fl,[xl]:ml,[_l]:gl,[vl]:Ws};class ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mo=Math.PI/180,Ql=180/Math.PI;function Dr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function He(i,e,t){return Math.max(e,Math.min(t,i))}function Y0(i,e){return(i%e+e)%e}function go(i,e,t){return(1-t)*i+t*e}function js(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function an(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Le{static{Le.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Dn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(d!==v||l!==u||c!==f||h!==m){let g=l*u+c*f+h*m+d*v;g<0&&(u=-u,f=-f,m=-m,v=-v,g=-g);let p=1-o;if(g<.9995){const y=Math.acos(g),E=Math.sin(y);p=Math.sin(p*y)/E,o=Math.sin(o*y)/E,l=l*p+u*o,c=c*p+f*o,h=h*p+m*o,d=d*p+v*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+m*o,d=d*p+v*o;const y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*d+l*f-c*u,e[t+1]=l*m+h*u+c*d-o*f,e[t+2]=c*m+h*f+o*u-l*d,e[t+3]=h*m-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{static{I.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vo.copy(this).projectOnVector(e),this.sub(vo)}reflect(e){return this.sub(vo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vo=new I,zh=new Dn;class De{static{De.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],v=s[0],g=s[3],p=s[6],y=s[1],E=s[4],_=s[7],T=s[2],w=s[5],A=s[8];return r[0]=a*v+o*y+l*T,r[3]=a*g+o*E+l*w,r[6]=a*p+o*_+l*A,r[1]=c*v+h*y+d*T,r[4]=c*g+h*E+d*w,r[7]=c*p+h*_+d*A,r[2]=u*v+f*y+m*T,r[5]=u*g+f*E+m*w,r[8]=u*p+f*_+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=t*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=d*v,e[1]=(s*c-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=u*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Hs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xo.makeScale(e,t)),this}rotate(e){return Hs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xo.makeRotation(-e)),this}translate(e,t){return Hs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xo=new De,kh=new De().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vh=new De().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $0(){const i={enabled:!0,workingColorSpace:za,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===tt&&(s.r=ci(s.r),s.g=ci(s.g),s.b=ci(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===tt&&(s.r=Xs(s.r),s.g=Xs(s.g),s.b=Xs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Cn?ka:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Hs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Hs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[za]:{primaries:e,whitePoint:n,transfer:ka,toXYZ:kh,fromXYZ:Vh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:tn},outputColorSpaceConfig:{drawingBufferColorSpace:tn}},[tn]:{primaries:e,whitePoint:n,transfer:tt,toXYZ:kh,fromXYZ:Vh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:tn}}}),i}const Ge=$0();function ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let us;class K0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{us===void 0&&(us=Va("canvas")),us.width=e.width,us.height=e.height;const s=us.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=us}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Va("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ci(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ci(t[n]/255)*255):t[n]=ci(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let J0=0;class Uc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:J0++}),this.uuid=Dr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(_o(s[a].image)):r.push(_o(s[a]))}else r=_o(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function _o(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?K0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let Q0=0;const Mo=new I;class Qt extends ji{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,n=vn,s=vn,r=Ct,a=Wn,o=Sn,l=un,c=Qt.DEFAULT_ANISOTROPY,h=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Q0++}),this.uuid=Dr(),this.name="",this.source=new Uc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mo).x}get height(){return this.source.getSize(Mo).y}get depth(){return this.source.getSize(Mo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$d)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ki:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case Ml:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ki:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case Ml:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=$d;Qt.DEFAULT_ANISOTROPY=1;class ft{static{ft.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,_=(f+1)/2,T=(p+1)/2,w=(h+u)/4,A=(d+v)/4,M=(m+g)/4;return E>_&&E>T?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=w/n,r=A/n):_>T?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=M/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=A/r,s=M/r),this.set(n,s,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(d-v)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class j0 extends ji{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Qt(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Uc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ln extends j0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class sf extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class eg extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xe{static{Xe.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,m,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,m,v,g)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,m,v,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/ds.setFromMatrixColumn(e,0).length(),r=1/ds.setFromMatrixColumn(e,1).length(),a=1/ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,m=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,m=c*h,v=c*d;t[0]=u+v*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,m=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,m=o*h,v=o*d;t[0]=l*h,t[4]=m*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=m*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+m,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tg,e,ng)}lookAt(e,t,n){const s=this.elements;return fn.subVectors(e,t),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),_i.crossVectors(n,fn),_i.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),_i.crossVectors(n,fn)),_i.normalize(),Hr.crossVectors(fn,_i),s[0]=_i.x,s[4]=Hr.x,s[8]=fn.x,s[1]=_i.y,s[5]=Hr.y,s[9]=fn.y,s[2]=_i.z,s[6]=Hr.z,s[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],y=n[3],E=n[7],_=n[11],T=n[15],w=s[0],A=s[4],M=s[8],b=s[12],R=s[1],P=s[5],D=s[9],X=s[13],W=s[2],U=s[6],H=s[10],O=s[14],q=s[3],ee=s[7],ie=s[11],Q=s[15];return r[0]=a*w+o*R+l*W+c*q,r[4]=a*A+o*P+l*U+c*ee,r[8]=a*M+o*D+l*H+c*ie,r[12]=a*b+o*X+l*O+c*Q,r[1]=h*w+d*R+u*W+f*q,r[5]=h*A+d*P+u*U+f*ee,r[9]=h*M+d*D+u*H+f*ie,r[13]=h*b+d*X+u*O+f*Q,r[2]=m*w+v*R+g*W+p*q,r[6]=m*A+v*P+g*U+p*ee,r[10]=m*M+v*D+g*H+p*ie,r[14]=m*b+v*X+g*O+p*Q,r[3]=y*w+E*R+_*W+T*q,r[7]=y*A+E*P+_*U+T*ee,r[11]=y*M+E*D+_*H+T*ie,r[15]=y*b+E*X+_*O+T*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],m=e[3],v=e[7],g=e[11],p=e[15],y=l*f-c*u,E=o*f-c*d,_=o*u-l*d,T=a*f-c*h,w=a*u-l*h,A=a*d-o*h;return t*(v*y-g*E+p*_)-n*(m*y-g*T+p*w)+s*(m*E-v*T+p*A)-r*(m*_-v*w+g*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],m=e[12],v=e[13],g=e[14],p=e[15],y=t*o-n*a,E=t*l-s*a,_=t*c-r*a,T=n*l-s*o,w=n*c-r*o,A=s*c-r*l,M=h*v-d*m,b=h*g-u*m,R=h*p-f*m,P=d*g-u*v,D=d*p-f*v,X=u*p-f*g,W=y*X-E*D+_*P+T*R-w*b+A*M;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/W;return e[0]=(o*X-l*D+c*P)*U,e[1]=(s*D-n*X-r*P)*U,e[2]=(v*A-g*w+p*T)*U,e[3]=(u*w-d*A-f*T)*U,e[4]=(l*R-a*X-c*b)*U,e[5]=(t*X-s*R+r*b)*U,e[6]=(g*_-m*A-p*E)*U,e[7]=(h*A-u*_+f*E)*U,e[8]=(a*D-o*R+c*M)*U,e[9]=(n*R-t*D-r*M)*U,e[10]=(m*w-v*_+p*y)*U,e[11]=(d*_-h*w-f*y)*U,e[12]=(o*b-a*P-l*M)*U,e[13]=(t*P-n*b+s*M)*U,e[14]=(v*E-m*T-g*y)*U,e[15]=(h*T-d*E+u*y)*U,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,m=r*d,v=a*h,g=a*d,p=o*d,y=l*c,E=l*h,_=l*d,T=n.x,w=n.y,A=n.z;return s[0]=(1-(v+p))*T,s[1]=(f+_)*T,s[2]=(m-E)*T,s[3]=0,s[4]=(f-_)*w,s[5]=(1-(u+p))*w,s[6]=(g+y)*w,s[7]=0,s[8]=(m+E)*A,s[9]=(g-y)*A,s[10]=(1-(u+v))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ds.set(s[0],s[1],s[2]).length();const o=ds.set(s[4],s[5],s[6]).length(),l=ds.set(s[8],s[9],s[10]).length();r<0&&(a=-a),wn.copy(this);const c=1/a,h=1/o,d=1/l;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=d,wn.elements[9]*=d,wn.elements[10]*=d,t.setFromRotationMatrix(wn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=qn,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===qn)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Rr)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=qn,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s);let m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===qn)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===Rr)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ds=new I,wn=new Xe,tg=new I(0,0,0),ng=new I(1,1,1),_i=new I,Hr=new I,fn=new I,Gh=new Xe,Hh=new Dn;class Nn{constructor(e=0,t=0,n=0,s=Nn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hh.setFromEuler(this),this.setFromQuaternion(Hh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Nn.DEFAULT_ORDER="XYZ";class rf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ig=0;const Xh=new I,fs=new Dn,ei=new Xe,Xr=new I,er=new I,sg=new I,rg=new Dn,Wh=new I(1,0,0),qh=new I(0,1,0),Zh=new I(0,0,1),Yh={type:"added"},ag={type:"removed"},ps={type:"childadded",child:null},yo={type:"childremoved",child:null};class bt extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ig++}),this.uuid=Dr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new I,t=new Nn,n=new Dn,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Xe},normalMatrix:{value:new De}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.multiply(fs),this}rotateOnWorldAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.premultiply(fs),this}rotateX(e){return this.rotateOnAxis(Wh,e)}rotateY(e){return this.rotateOnAxis(qh,e)}rotateZ(e){return this.rotateOnAxis(Zh,e)}translateOnAxis(e,t){return Xh.copy(e).applyQuaternion(this.quaternion),this.position.add(Xh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wh,e)}translateY(e){return this.translateOnAxis(qh,e)}translateZ(e){return this.translateOnAxis(Zh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ei.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xr.copy(e):Xr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ei.lookAt(er,Xr,this.up):ei.lookAt(Xr,er,this.up),this.quaternion.setFromRotationMatrix(ei),s&&(ei.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(ei),this.quaternion.premultiply(fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yh),ps.child=e,this.dispatchEvent(ps),ps.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ag),yo.child=e,this.dispatchEvent(yo),yo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(ei),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yh),ps.child=e,this.dispatchEvent(ps),ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,sg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,rg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}bt.DEFAULT_UP=new I(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Yi extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const og={type:"move"};class So{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(og)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Yi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const af={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},Wr={h:0,s:0,l:0};function bo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Re{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ge.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ge.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ge.workingColorSpace){if(e=Y0(e,1),t=He(t,0,1),n=He(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=bo(a,r,e+1/3),this.g=bo(a,r,e),this.b=bo(a,r,e-1/3)}return Ge.colorSpaceToWorking(this,s),this}setStyle(e,t=tn){function n(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=tn){const n=af[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=tn){return Ge.workingToColorSpace(Yt.copy(this),e),Math.round(He(Yt.r*255,0,255))*65536+Math.round(He(Yt.g*255,0,255))*256+Math.round(He(Yt.b*255,0,255))}getHexString(e=tn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ge.workingColorSpace){Ge.workingToColorSpace(Yt.copy(this),t);const n=Yt.r,s=Yt.g,r=Yt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ge.workingColorSpace){return Ge.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=tn){Ge.workingToColorSpace(Yt.copy(this),e);const t=Yt.r,n=Yt.g,s=Yt.b;return e!==tn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(Wr);const n=go(Mi.h,Wr.h,t),s=go(Mi.s,Wr.s,t),r=go(Mi.l,Wr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new Re;Re.NAMES=af;class Oc{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Re(e),this.near=t,this.far=n}clone(){return new Oc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ga extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const En=new I,ti=new I,wo=new I,ni=new I,ms=new I,gs=new I,$h=new I,Eo=new I,To=new I,Ao=new I,Co=new ft,Ro=new ft,Po=new ft;class Rn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),En.subVectors(e,t),s.cross(En);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){En.subVectors(s,t),ti.subVectors(n,t),wo.subVectors(e,t);const a=En.dot(En),o=En.dot(ti),l=En.dot(wo),c=ti.dot(ti),h=ti.dot(wo),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ni.x),l.addScaledVector(a,ni.y),l.addScaledVector(o,ni.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Co.setScalar(0),Ro.setScalar(0),Po.setScalar(0),Co.fromBufferAttribute(e,t),Ro.fromBufferAttribute(e,n),Po.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Co,r.x),a.addScaledVector(Ro,r.y),a.addScaledVector(Po,r.z),a}static isFrontFacing(e,t,n,s){return En.subVectors(n,t),ti.subVectors(e,t),En.cross(ti).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),En.cross(ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Rn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ms.subVectors(s,n),gs.subVectors(r,n),Eo.subVectors(e,n);const l=ms.dot(Eo),c=gs.dot(Eo);if(l<=0&&c<=0)return t.copy(n);To.subVectors(e,s);const h=ms.dot(To),d=gs.dot(To);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ms,a);Ao.subVectors(e,r);const f=ms.dot(Ao),m=gs.dot(Ao);if(m>=0&&f<=m)return t.copy(r);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(gs,o);const g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return $h.subVectors(r,s),o=(d-h)/(d-h+(f-m)),t.copy(s).addScaledVector($h,o);const p=1/(g+v+u);return a=v*p,o=u*p,t.copy(n).addScaledVector(ms,a).addScaledVector(gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class es{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Tn):Tn.fromBufferAttribute(r,a),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qr.copy(n.boundingBox)),qr.applyMatrix4(e.matrixWorld),this.union(qr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tr),Zr.subVectors(this.max,tr),vs.subVectors(e.a,tr),xs.subVectors(e.b,tr),_s.subVectors(e.c,tr),yi.subVectors(xs,vs),Si.subVectors(_s,xs),Oi.subVectors(vs,_s);let t=[0,-yi.z,yi.y,0,-Si.z,Si.y,0,-Oi.z,Oi.y,yi.z,0,-yi.x,Si.z,0,-Si.x,Oi.z,0,-Oi.x,-yi.y,yi.x,0,-Si.y,Si.x,0,-Oi.y,Oi.x,0];return!Io(t,vs,xs,_s,Zr)||(t=[1,0,0,0,1,0,0,0,1],!Io(t,vs,xs,_s,Zr))?!1:(Yr.crossVectors(yi,Si),t=[Yr.x,Yr.y,Yr.z],Io(t,vs,xs,_s,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ii=[new I,new I,new I,new I,new I,new I,new I,new I],Tn=new I,qr=new es,vs=new I,xs=new I,_s=new I,yi=new I,Si=new I,Oi=new I,tr=new I,Zr=new I,Yr=new I,Bi=new I;function Io(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Bi.fromArray(i,r);const o=s.x*Math.abs(Bi.x)+s.y*Math.abs(Bi.y)+s.z*Math.abs(Bi.z),l=e.dot(Bi),c=t.dot(Bi),h=n.dot(Bi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Tt=new I,$r=new Le;let lg=0;class Xt extends ji{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Fh,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)$r.fromBufferAttribute(this,t),$r.applyMatrix3(e),this.setXY(t,$r.x,$r.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=js(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=js(t,this.array)),t}setX(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=js(t,this.array)),t}setY(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=js(t,this.array)),t}setZ(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=js(t,this.array)),t}setW(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array),s=an(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array),s=an(s,this.array),r=an(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Fh&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class of extends Xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class lf extends Xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Qe extends Xt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const cg=new es,nr=new I,Lo=new I;class Nr{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):cg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);const t=nr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(nr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(Lo)),this.expandByPoint(nr.copy(e.center).sub(Lo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let hg=0;const Mn=new Xe,Do=new bt,Ms=new I,pn=new es,ir=new es,zt=new I;class Ot extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hg++}),this.uuid=Dr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(X0(e)?lf:of)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new De().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,t,n){return Mn.makeTranslation(e,t,n),this.applyMatrix4(Mn),this}scale(e,t,n){return Mn.makeScale(e,t,n),this.applyMatrix4(Mn),this}lookAt(e){return Do.lookAt(e),Do.updateMatrix(),this.applyMatrix4(Do.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ms).negate(),this.translate(Ms.x,Ms.y,Ms.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Qe(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new es);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ir.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(pn.min,ir.min),pn.expandByPoint(zt),zt.addVectors(pn.max,ir.max),pn.expandByPoint(zt)):(pn.expandByPoint(ir.min),pn.expandByPoint(ir.max))}pn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(zt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)zt.fromBufferAttribute(o,c),l&&(Ms.fromBufferAttribute(e,c),zt.add(Ms)),s=Math.max(s,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Xt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let M=0;M<n.count;M++)o[M]=new I,l[M]=new I;const c=new I,h=new I,d=new I,u=new Le,f=new Le,m=new Le,v=new I,g=new I;function p(M,b,R){c.fromBufferAttribute(n,M),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,R),u.fromBufferAttribute(r,M),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,R),h.sub(c),d.sub(c),f.sub(u),m.sub(u);const P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),o[M].add(v),o[b].add(v),o[R].add(v),l[M].add(g),l[b].add(g),l[R].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let M=0,b=y.length;M<b;++M){const R=y[M],P=R.start,D=R.count;for(let X=P,W=P+D;X<W;X+=3)p(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const E=new I,_=new I,T=new I,w=new I;function A(M){T.fromBufferAttribute(s,M),w.copy(T);const b=o[M];E.copy(b),E.sub(T.multiplyScalar(T.dot(b))).normalize(),_.crossVectors(w,b);const P=_.dot(l[M])<0?-1:1;a.setXYZW(M,E.x,E.y,E.z,P)}for(let M=0,b=y.length;M<b;++M){const R=y[M],P=R.start,D=R.count;for(let X=P,W=P+D;X<W;X+=3)A(e.getX(X+0)),A(e.getX(X+1)),A(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,d=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){const m=e.getX(u+0),v=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)u[m++]=c[f++]}return new Xt(u,h,d)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let ug=0;class Js extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=Dr(),this.name="",this.type="Material",this.blending=Gs,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dl,this.blendDst=Tr,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hs,this.stencilZFail=hs,this.stencilZPass=hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==dl&&(n.blendSrc=this.blendSrc),this.blendDst!==Tr&&(n.blendDst=this.blendDst),this.blendEquation!==oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Re().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Le().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Le().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const si=new I,No=new I,Kr=new I,bi=new I,Fo=new I,Jr=new I,Uo=new I;class dg{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,t),si.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){No.copy(e).add(t).multiplyScalar(.5),Kr.copy(t).sub(e).normalize(),bi.copy(this.origin).sub(No);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Kr),o=bi.dot(this.direction),l=-bi.dot(Kr),c=bi.lengthSq(),h=Math.abs(1-a*a);let d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(No).addScaledVector(Kr,u),f}intersectSphere(e,t){si.subVectors(e.center,this.origin);const n=si.dot(this.direction),s=si.dot(si)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,t,n,s,r){Fo.subVectors(t,e),Jr.subVectors(n,e),Uo.crossVectors(Fo,Jr);let a=this.direction.dot(Uo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;bi.subVectors(this.origin,e);const l=o*this.direction.dot(Jr.crossVectors(bi,Jr));if(l<0)return null;const c=o*this.direction.dot(Fo.cross(bi));if(c<0||l+c>a)return null;const h=-o*bi.dot(Uo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class sn extends Js{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kh=new Xe,zi=new dg,Qr=new Nr,Jh=new I,jr=new I,ea=new I,ta=new I,Oo=new I,na=new I,Qh=new I,ia=new I;class Je extends bt{constructor(e=new Ot,t=new sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){na.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Oo.fromBufferAttribute(d,e),a?na.addScaledVector(Oo,h):na.addScaledVector(Oo.sub(t),h))}t.add(na)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(Qr.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Qr,Jh)===null||zi.origin.distanceToSquared(Jh)>(e.far-e.near)**2))&&(Kh.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Kh),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),E=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=y,T=E;_<T;_+=3){const w=o.getX(_),A=o.getX(_+1),M=o.getX(_+2);s=sa(this,p,e,n,c,h,d,w,A,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const y=o.getX(g),E=o.getX(g+1),_=o.getX(g+2);s=sa(this,a,e,n,c,h,d,y,E,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),E=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=y,T=E;_<T;_+=3){const w=_,A=_+1,M=_+2;s=sa(this,p,e,n,c,h,d,w,A,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const y=g,E=g+1,_=g+2;s=sa(this,a,e,n,c,h,d,y,E,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function fg(i,e,t,n,s,r,a,o){let l;if(e.side===nn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===di,o),l===null)return null;ia.copy(o),ia.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ia);return c<t.near||c>t.far?null:{distance:c,point:ia.clone(),object:i}}function sa(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,jr),i.getVertexPosition(l,ea),i.getVertexPosition(c,ta);const h=fg(i,e,t,n,jr,ea,ta,Qh);if(h){const d=new I;Rn.getBarycoord(Qh,jr,ea,ta,d),s&&(h.uv=Rn.getInterpolatedAttribute(s,o,l,c,d,new Le)),r&&(h.uv1=Rn.getInterpolatedAttribute(r,o,l,c,d,new Le)),a&&(h.normal=Rn.getInterpolatedAttribute(a,o,l,c,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new I,materialIndex:0};Rn.getNormal(jr,ea,ta,u.normal),h.face=u,h.barycoord=d}return h}class cf extends Qt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Ht,h=Ht,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pr extends Xt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ys=new Xe,jh=new Xe,ra=[],eu=new es,pg=new Xe,sr=new Je,rr=new Nr;class hi extends Je{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,pg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new es),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ys),eu.copy(e.boundingBox).applyMatrix4(ys),this.boundingBox.union(eu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Nr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ys),rr.copy(e.boundingSphere).applyMatrix4(ys),this.boundingSphere.union(rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(sr.geometry=this.geometry,sr.material=this.material,sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rr.copy(this.boundingSphere),rr.applyMatrix4(n),e.ray.intersectsSphere(rr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ys),jh.multiplyMatrices(n,ys),sr.matrixWorld=jh,sr.raycast(e,ra);for(let a=0,o=ra.length;a<o;a++){const l=ra[a];l.instanceId=r,l.object=this,t.push(l)}ra.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Pr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new cf(new Float32Array(s*this.count),s,this.count,Pc,In));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Bo=new I,mg=new I,gg=new De;class Xi{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Bo.subVectors(n,t).cross(mg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Bo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gg.getNormalMatrix(e),s=this.coplanarPoint(Bo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ki=new Nr,vg=new Le(.5,.5),aa=new I;class Bc{constructor(e=new Xi,t=new Xi,n=new Xi,s=new Xi,r=new Xi,a=new Xi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=qn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],v=r[9],g=r[10],p=r[11],y=r[12],E=r[13],_=r[14],T=r[15];if(s[0].setComponents(c-a,f-h,p-m,T-y).normalize(),s[1].setComponents(c+a,f+h,p+m,T+y).normalize(),s[2].setComponents(c+o,f+d,p+v,T+E).normalize(),s[3].setComponents(c-o,f-d,p-v,T-E).normalize(),n)s[4].setComponents(l,u,g,_).normalize(),s[5].setComponents(c-l,f-u,p-g,T-_).normalize();else if(s[4].setComponents(c-l,f-u,p-g,T-_).normalize(),t===qn)s[5].setComponents(c+l,f+u,p+g,T+_).normalize();else if(t===Rr)s[5].setComponents(l,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);const t=vg.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(aa.x=s.normal.x>0?e.max.x:e.min.x,aa.y=s.normal.y>0?e.max.y:e.min.y,aa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(aa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hf extends Qt{constructor(e=[],t=$i,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zc extends Qt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Zs extends Qt{constructor(e,t,n=Jn,s,r,a,o=Ht,l=Ht,c,h=pi,d=1){if(h!==pi&&h!==Zi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xg extends Zs{constructor(e,t=Jn,n=$i,s,r,a=Ht,o=Ht,l,c=pi){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class uf extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class yt extends Ot{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Qe(c,3)),this.setAttribute("normal",new Qe(h,3)),this.setAttribute("uv",new Qe(d,2));function m(v,g,p,y,E,_,T,w,A,M,b){const R=_/A,P=T/M,D=_/2,X=T/2,W=w/2,U=A+1,H=M+1;let O=0,q=0;const ee=new I;for(let ie=0;ie<H;ie++){const Q=ie*P-X;for(let oe=0;oe<U;oe++){const ze=oe*R-D;ee[v]=ze*y,ee[g]=Q*E,ee[p]=W,c.push(ee.x,ee.y,ee.z),ee[v]=0,ee[g]=0,ee[p]=w>0?1:-1,h.push(ee.x,ee.y,ee.z),d.push(oe/A),d.push(1-ie/M),O+=1}}for(let ie=0;ie<M;ie++)for(let Q=0;Q<A;Q++){const oe=u+Q+U*ie,ze=u+Q+U*(ie+1),je=u+(Q+1)+U*(ie+1),Ve=u+(Q+1)+U*ie;l.push(oe,ze,Ve),l.push(ze,je,Ve),q+=6}o.addGroup(f,q,b),f+=q,u+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class kc extends Ot{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new I,h=new Le;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Qe(a,3)),this.setAttribute("normal",new Qe(o,3)),this.setAttribute("uv",new Qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class dt extends Ot{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let m=0;const v=[],g=n/2;let p=0;y(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Qe(d,3)),this.setAttribute("normal",new Qe(u,3)),this.setAttribute("uv",new Qe(f,2));function y(){const _=new I,T=new I;let w=0;const A=(t-e)/n;for(let M=0;M<=r;M++){const b=[],R=M/r,P=R*(t-e)+e;for(let D=0;D<=s;D++){const X=D/s,W=X*l+o,U=Math.sin(W),H=Math.cos(W);T.x=P*U,T.y=-R*n+g,T.z=P*H,d.push(T.x,T.y,T.z),_.set(U,A,H).normalize(),u.push(_.x,_.y,_.z),f.push(X,1-R),b.push(m++)}v.push(b)}for(let M=0;M<s;M++)for(let b=0;b<r;b++){const R=v[b][M],P=v[b+1][M],D=v[b+1][M+1],X=v[b][M+1];(e>0||b!==0)&&(h.push(R,P,X),w+=3),(t>0||b!==r-1)&&(h.push(P,D,X),w+=3)}c.addGroup(p,w,0),p+=w}function E(_){const T=m,w=new Le,A=new I;let M=0;const b=_===!0?e:t,R=_===!0?1:-1;for(let D=1;D<=s;D++)d.push(0,g*R,0),u.push(0,R,0),f.push(.5,.5),m++;const P=m;for(let D=0;D<=s;D++){const W=D/s*l+o,U=Math.cos(W),H=Math.sin(W);A.x=b*H,A.y=g*R,A.z=b*U,d.push(A.x,A.y,A.z),u.push(0,R,0),w.x=U*.5+.5,w.y=H*.5*R+.5,f.push(w.x,w.y),m++}for(let D=0;D<s;D++){const X=T+D,W=P+D;_===!0?h.push(W,W+1,X):h.push(W+1,W,X),M+=3}c.addGroup(p,M,_===!0?1:2),p+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qa extends Ot{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const y=p*u-a;for(let E=0;E<c;E++){const _=E*d-r;m.push(_,-y,0),v.push(0,0,1),g.push(E/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const E=y+c*p,_=y+c*(p+1),T=y+1+c*(p+1),w=y+1+c*p;f.push(E,_,w),f.push(_,T,w)}this.setIndex(f),this.setAttribute("position",new Qe(m,3)),this.setAttribute("normal",new Qe(v,3)),this.setAttribute("uv",new Qe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qa(e.width,e.height,e.widthSegments,e.heightSegments)}}class ja extends Ot{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let d=e;const u=(t-e)/s,f=new I,m=new Le;for(let v=0;v<=s;v++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}d+=u}for(let v=0;v<s;v++){const g=v*(n+1);for(let p=0;p<n;p++){const y=p+g,E=y,_=y+n+1,T=y+n+2,w=y+1;o.push(E,_,w),o.push(_,T,w)}}this.setIndex(o),this.setAttribute("position",new Qe(l,3)),this.setAttribute("normal",new Qe(c,3)),this.setAttribute("uv",new Qe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ja(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Qn extends Ot{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new I,u=new I,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const y=[],E=p/n,_=a+E*o,T=e*Math.cos(_),w=Math.sqrt(e*e-T*T);let A=0;p===0&&a===0?A=.5/t:p===n&&l===Math.PI&&(A=-.5/t);for(let M=0;M<=t;M++){const b=M/t,R=s+b*r;d.x=-w*Math.cos(R),d.y=T,d.z=w*Math.sin(R),m.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(b+A,1-E),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const E=h[p][y+1],_=h[p][y],T=h[p+1][y],w=h[p+1][y+1];(p!==0||a>0)&&f.push(E,_,w),(p!==n-1||l<Math.PI)&&f.push(_,T,w)}this.setIndex(f),this.setAttribute("position",new Qe(m,3)),this.setAttribute("normal",new Qe(v,3)),this.setAttribute("uv",new Qe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class eo extends Ot{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],d=[],u=new I,f=new I,m=new I;for(let v=0;v<=n;v++){const g=a+v/n*o;for(let p=0;p<=s;p++){const y=p/s*r;f.x=(e+t*Math.cos(g))*Math.cos(y),f.y=(e+t*Math.cos(g))*Math.sin(y),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),m.subVectors(f,u).normalize(),h.push(m.x,m.y,m.z),d.push(p/s),d.push(v/n)}}for(let v=1;v<=n;v++)for(let g=1;g<=s;g++){const p=(s+1)*v+g-1,y=(s+1)*(v-1)+g-1,E=(s+1)*(v-1)+g,_=(s+1)*v+g;l.push(p,y,_),l.push(y,E,_)}this.setIndex(l),this.setAttribute("position",new Qe(c,3)),this.setAttribute("normal",new Qe(h,3)),this.setAttribute("uv",new Qe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Ys(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(tu(s))s.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(tu(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function jt(i){const e={};for(let t=0;t<i.length;t++){const n=Ys(i[t]);for(const s in n)e[s]=n[s]}return e}function tu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function _g(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function df(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}const Mg={clone:Ys,merge:jt};var yg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Js{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yg,this.fragmentShader=Sg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ys(e.uniforms),this.uniformsGroups=_g(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Re().setHex(s.value);break;case"v2":this.uniforms[n].value=new Le().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ft().fromArray(s.value);break;case"m3":this.uniforms[n].value=new De().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Xe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class bg extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class It extends Js{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wg extends Js{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=Ec,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Eg extends Js{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=U0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tg extends Js{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Vc extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class nu extends Vc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const zo=new Xe,iu=new I,su=new I;class ff{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bc,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;iu.setFromMatrixPosition(e.matrixWorld),t.position.copy(iu),su.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(su),t.updateMatrixWorld(),zo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Rr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(zo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const oa=new I,la=new Dn,Bn=new I;class pf extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(oa,la,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,la,Bn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(oa,la,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,la,Bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const wi=new I,ru=new Le,au=new Le;class cn extends pf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ql*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ql*2*Math.atan(Math.tan(mo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wi.x,wi.y).multiplyScalar(-e/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-e/wi.z)}getViewSize(e,t){return this.getViewBounds(e,ru,au),t.subVectors(au,ru)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(mo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ag extends ff{constructor(){super(new cn(90,1,.5,500)),this.isPointLightShadow=!0}}class Gc extends Vc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ag}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class to extends pf{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cg extends ff{constructor(){super(new to(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ou extends Vc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new Cg}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Rg extends Ot{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ss=-90,bs=1;class Pg extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new cn(Ss,bs,e,t);s.layers=this.layers,this.add(s);const r=new cn(Ss,bs,e,t);r.layers=this.layers,this.add(r);const a=new cn(Ss,bs,e,t);a.layers=this.layers,this.add(a);const o=new cn(Ss,bs,e,t);o.layers=this.layers,this.add(o);const l=new cn(Ss,bs,e,t);l.layers=this.layers,this.add(l);const c=new cn(Ss,bs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===qn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Ig extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class mf{static{mf.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}}function lu(i,e,t,n){const s=Lg(n);switch(t){case ef:return i*e;case Pc:return i*e/s.components*s.byteLength;case Ic:return i*e/s.components*s.byteLength;case Ji:return i*e*2/s.components*s.byteLength;case Lc:return i*e*2/s.components*s.byteLength;case tf:return i*e*3/s.components*s.byteLength;case Sn:return i*e*4/s.components*s.byteLength;case Dc:return i*e*4/s.components*s.byteLength;case Ea:case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Aa:case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sl:case wl:return Math.max(i,16)*Math.max(e,8)/4;case yl:case bl:return Math.max(i,8)*Math.max(e,8)/2;case El:case Tl:case Cl:case Rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Al:case Ua:case Pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Il:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ll:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Dl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Fl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ul:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ol:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Bl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case zl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case kl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Vl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Gl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Hl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Xl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Wl:case ql:case Zl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Yl:case $l:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Oa:case Kl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lg(i){switch(i){case un:case Kd:return{byteLength:1,components:1};case Ar:case Jd:case fi:return{byteLength:2,components:1};case Cc:case Rc:return{byteLength:2,components:4};case Jn:case Ac:case In:return{byteLength:4,components:1};case Qd:case jd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wc}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wc);function gf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Dg(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){const m=d[u],v=d[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){const v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Ng=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fg=`#ifdef USE_ALPHAHASH
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
#endif`,Ug=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Og=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kg=`#ifdef USE_AOMAP
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
#endif`,Vg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gg=`#ifdef USE_BATCHING
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
#endif`,Hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Zg=`#ifdef USE_IRIDESCENCE
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
#endif`,Yg=`#ifdef USE_BUMPMAP
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
#endif`,$g=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ev=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,iv=`#define PI 3.141592653589793
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
} // validated`,sv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rv=`vec3 transformedNormal = objectNormal;
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
#endif`,av=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ov=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hv="gl_FragColor = linearToOutputTexel( gl_FragColor );",uv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dv=`#ifdef USE_ENVMAP
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
#endif`,fv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pv=`#ifdef USE_ENVMAP
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
#endif`,mv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gv=`#ifdef USE_ENVMAP
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
#endif`,vv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_v=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yv=`#ifdef USE_GRADIENTMAP
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
}`,Sv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ev=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Tv=`#ifdef USE_ENVMAP
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
#endif`,Av=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Iv=`PhysicalMaterial material;
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
#endif`,Lv=`uniform sampler2D dfgLUT;
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
}`,Dv=`
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
#endif`,Nv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Uv=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ov=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xv=`#if defined( USE_POINTS_UV )
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
#endif`,Wv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$v=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kv=`#ifdef USE_MORPHTARGETS
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
#endif`,Jv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ix=`#ifdef USE_NORMALMAP
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
#endif`,sx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ax=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ox=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ux=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,px=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_x=`float getShadowMask() {
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
}`,Mx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yx=`#ifdef USE_SKINNING
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
#endif`,Sx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bx=`#ifdef USE_SKINNING
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
#endif`,wx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ex=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ax=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cx=`#ifdef USE_TRANSMISSION
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
#endif`,Rx=`#ifdef USE_TRANSMISSION
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
#endif`,Px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fx=`uniform sampler2D t2D;
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
}`,Ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ox=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kx=`#include <common>
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
}`,Vx=`#if DEPTH_PACKING == 3200
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
}`,Gx=`#define DISTANCE
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
}`,Hx=`#define DISTANCE
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
}`,Xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qx=`uniform float scale;
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
}`,Zx=`uniform vec3 diffuse;
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
}`,Yx=`#include <common>
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
}`,$x=`uniform vec3 diffuse;
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
}`,Kx=`#define LAMBERT
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
}`,Jx=`#define LAMBERT
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
}`,Qx=`#define MATCAP
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
}`,jx=`#define MATCAP
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
}`,e_=`#define NORMAL
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
}`,t_=`#define NORMAL
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
}`,n_=`#define PHONG
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
}`,i_=`#define PHONG
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
}`,s_=`#define STANDARD
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
}`,r_=`#define STANDARD
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
}`,a_=`#define TOON
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
}`,o_=`#define TOON
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
}`,l_=`uniform float size;
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
}`,c_=`uniform vec3 diffuse;
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
}`,h_=`#include <common>
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
}`,u_=`uniform vec3 color;
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
}`,d_=`uniform float rotation;
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
}`,f_=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:Ng,alphahash_pars_fragment:Fg,alphamap_fragment:Ug,alphamap_pars_fragment:Og,alphatest_fragment:Bg,alphatest_pars_fragment:zg,aomap_fragment:kg,aomap_pars_fragment:Vg,batching_pars_vertex:Gg,batching_vertex:Hg,begin_vertex:Xg,beginnormal_vertex:Wg,bsdfs:qg,iridescence_fragment:Zg,bumpmap_pars_fragment:Yg,clipping_planes_fragment:$g,clipping_planes_pars_fragment:Kg,clipping_planes_pars_vertex:Jg,clipping_planes_vertex:Qg,color_fragment:jg,color_pars_fragment:ev,color_pars_vertex:tv,color_vertex:nv,common:iv,cube_uv_reflection_fragment:sv,defaultnormal_vertex:rv,displacementmap_pars_vertex:av,displacementmap_vertex:ov,emissivemap_fragment:lv,emissivemap_pars_fragment:cv,colorspace_fragment:hv,colorspace_pars_fragment:uv,envmap_fragment:dv,envmap_common_pars_fragment:fv,envmap_pars_fragment:pv,envmap_pars_vertex:mv,envmap_physical_pars_fragment:Tv,envmap_vertex:gv,fog_vertex:vv,fog_pars_vertex:xv,fog_fragment:_v,fog_pars_fragment:Mv,gradientmap_pars_fragment:yv,lightmap_pars_fragment:Sv,lights_lambert_fragment:bv,lights_lambert_pars_fragment:wv,lights_pars_begin:Ev,lights_toon_fragment:Av,lights_toon_pars_fragment:Cv,lights_phong_fragment:Rv,lights_phong_pars_fragment:Pv,lights_physical_fragment:Iv,lights_physical_pars_fragment:Lv,lights_fragment_begin:Dv,lights_fragment_maps:Nv,lights_fragment_end:Fv,lightprobes_pars_fragment:Uv,logdepthbuf_fragment:Ov,logdepthbuf_pars_fragment:Bv,logdepthbuf_pars_vertex:zv,logdepthbuf_vertex:kv,map_fragment:Vv,map_pars_fragment:Gv,map_particle_fragment:Hv,map_particle_pars_fragment:Xv,metalnessmap_fragment:Wv,metalnessmap_pars_fragment:qv,morphinstance_vertex:Zv,morphcolor_vertex:Yv,morphnormal_vertex:$v,morphtarget_pars_vertex:Kv,morphtarget_vertex:Jv,normal_fragment_begin:Qv,normal_fragment_maps:jv,normal_pars_fragment:ex,normal_pars_vertex:tx,normal_vertex:nx,normalmap_pars_fragment:ix,clearcoat_normal_fragment_begin:sx,clearcoat_normal_fragment_maps:rx,clearcoat_pars_fragment:ax,iridescence_pars_fragment:ox,opaque_fragment:lx,packing:cx,premultiplied_alpha_fragment:hx,project_vertex:ux,dithering_fragment:dx,dithering_pars_fragment:fx,roughnessmap_fragment:px,roughnessmap_pars_fragment:mx,shadowmap_pars_fragment:gx,shadowmap_pars_vertex:vx,shadowmap_vertex:xx,shadowmask_pars_fragment:_x,skinbase_vertex:Mx,skinning_pars_vertex:yx,skinning_vertex:Sx,skinnormal_vertex:bx,specularmap_fragment:wx,specularmap_pars_fragment:Ex,tonemapping_fragment:Tx,tonemapping_pars_fragment:Ax,transmission_fragment:Cx,transmission_pars_fragment:Rx,uv_pars_fragment:Px,uv_pars_vertex:Ix,uv_vertex:Lx,worldpos_vertex:Dx,background_vert:Nx,background_frag:Fx,backgroundCube_vert:Ux,backgroundCube_frag:Ox,cube_vert:Bx,cube_frag:zx,depth_vert:kx,depth_frag:Vx,distance_vert:Gx,distance_frag:Hx,equirect_vert:Xx,equirect_frag:Wx,linedashed_vert:qx,linedashed_frag:Zx,meshbasic_vert:Yx,meshbasic_frag:$x,meshlambert_vert:Kx,meshlambert_frag:Jx,meshmatcap_vert:Qx,meshmatcap_frag:jx,meshnormal_vert:e_,meshnormal_frag:t_,meshphong_vert:n_,meshphong_frag:i_,meshphysical_vert:s_,meshphysical_frag:r_,meshtoon_vert:a_,meshtoon_frag:o_,points_vert:l_,points_frag:c_,shadow_vert:h_,shadow_frag:u_,sprite_vert:d_,sprite_frag:f_},de={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},Vn={basic:{uniforms:jt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:jt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Re(0)},envMapIntensity:{value:1}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:jt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:jt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:jt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Re(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:jt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:jt([de.points,de.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:jt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:jt([de.common,de.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:jt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:jt([de.sprite,de.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distance:{uniforms:jt([de.common,de.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distance_vert,fragmentShader:Oe.distance_frag},shadow:{uniforms:jt([de.lights,de.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};Vn.physical={uniforms:jt([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const ca={r:0,b:0,g:0},p_=new Xe,vf=new De;vf.set(-1,0,0,0,1,0,0,0,1);function m_(i,e,t,n,s,r){const a=new Re(0);let o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let E=y.isScene===!0?y.background:null;if(E&&E.isTexture){const _=y.backgroundBlurriness>0;E=e.get(E,_)}return E}function m(y){let E=!1;const _=f(y);_===null?g(a,o):_&&_.isColor&&(g(_,1),E=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(y,E){const _=f(E);_&&(_.isCubeTexture||_.mapping===Ja)?(c===void 0&&(c=new Je(new yt(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Ys(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(p_.makeRotationFromEuler(E.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(vf),c.material.toneMapped=Ge.getTransfer(_.colorSpace)!==tt,(h!==_||d!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Je(new Qa(2,2),new bn({name:"BackgroundMaterial",uniforms:Ys(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Ge.getTransfer(_.colorSpace)!==tt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,E){y.getRGB(ca,df(i)),t.buffers.color.setClear(ca.r,ca.g,ca.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,E=1){a.set(y),o=E,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,g(a,o)},render:m,addToRenderList:v,dispose:p}}function g_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(P,D,X,W,U){let H=!1;const O=d(P,W,X,D);r!==O&&(r=O,c(r.object)),H=f(P,W,X,U),H&&m(P,W,X,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,_(P,D,X,W),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function d(P,D,X,W){const U=W.wireframe===!0;let H=n[D.id];H===void 0&&(H={},n[D.id]=H);const O=P.isInstancedMesh===!0?P.id:0;let q=H[O];q===void 0&&(q={},H[O]=q);let ee=q[X.id];ee===void 0&&(ee={},q[X.id]=ee);let ie=ee[U];return ie===void 0&&(ie=u(l()),ee[U]=ie),ie}function u(P){const D=[],X=[],W=[];for(let U=0;U<t;U++)D[U]=0,X[U]=0,W[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:X,attributeDivisors:W,object:P,attributes:{},index:null}}function f(P,D,X,W){const U=r.attributes,H=D.attributes;let O=0;const q=X.getAttributes();for(const ee in q)if(q[ee].location>=0){const Q=U[ee];let oe=H[ee];if(oe===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(oe=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(oe=P.instanceColor)),Q===void 0||Q.attribute!==oe||oe&&Q.data!==oe.data)return!0;O++}return r.attributesNum!==O||r.index!==W}function m(P,D,X,W){const U={},H=D.attributes;let O=0;const q=X.getAttributes();for(const ee in q)if(q[ee].location>=0){let Q=H[ee];Q===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(Q=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(Q=P.instanceColor));const oe={};oe.attribute=Q,Q&&Q.data&&(oe.data=Q.data),U[ee]=oe,O++}r.attributes=U,r.attributesNum=O,r.index=W}function v(){const P=r.newAttributes;for(let D=0,X=P.length;D<X;D++)P[D]=0}function g(P){p(P,0)}function p(P,D){const X=r.newAttributes,W=r.enabledAttributes,U=r.attributeDivisors;X[P]=1,W[P]===0&&(i.enableVertexAttribArray(P),W[P]=1),U[P]!==D&&(i.vertexAttribDivisor(P,D),U[P]=D)}function y(){const P=r.newAttributes,D=r.enabledAttributes;for(let X=0,W=D.length;X<W;X++)D[X]!==P[X]&&(i.disableVertexAttribArray(X),D[X]=0)}function E(P,D,X,W,U,H,O){O===!0?i.vertexAttribIPointer(P,D,X,U,H):i.vertexAttribPointer(P,D,X,W,U,H)}function _(P,D,X,W){v();const U=W.attributes,H=X.getAttributes(),O=D.defaultAttributeValues;for(const q in H){const ee=H[q];if(ee.location>=0){let ie=U[q];if(ie===void 0&&(q==="instanceMatrix"&&P.instanceMatrix&&(ie=P.instanceMatrix),q==="instanceColor"&&P.instanceColor&&(ie=P.instanceColor)),ie!==void 0){const Q=ie.normalized,oe=ie.itemSize,ze=e.get(ie);if(ze===void 0)continue;const je=ze.buffer,Ve=ze.type,J=ze.bytesPerElement,re=Ve===i.INT||Ve===i.UNSIGNED_INT||ie.gpuType===Ac;if(ie.isInterleavedBufferAttribute){const te=ie.data,Ie=te.stride,Ne=ie.offset;if(te.isInstancedInterleavedBuffer){for(let Te=0;Te<ee.locationSize;Te++)p(ee.location+Te,te.meshPerAttribute);P.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Te=0;Te<ee.locationSize;Te++)g(ee.location+Te);i.bindBuffer(i.ARRAY_BUFFER,je);for(let Te=0;Te<ee.locationSize;Te++)E(ee.location+Te,oe/ee.locationSize,Ve,Q,Ie*J,(Ne+oe/ee.locationSize*Te)*J,re)}else{if(ie.isInstancedBufferAttribute){for(let te=0;te<ee.locationSize;te++)p(ee.location+te,ie.meshPerAttribute);P.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let te=0;te<ee.locationSize;te++)g(ee.location+te);i.bindBuffer(i.ARRAY_BUFFER,je);for(let te=0;te<ee.locationSize;te++)E(ee.location+te,oe/ee.locationSize,Ve,Q,oe*J,oe/ee.locationSize*te*J,re)}}else if(O!==void 0){const Q=O[q];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(ee.location,Q);break;case 3:i.vertexAttrib3fv(ee.location,Q);break;case 4:i.vertexAttrib4fv(ee.location,Q);break;default:i.vertexAttrib1fv(ee.location,Q)}}}}y()}function T(){b();for(const P in n){const D=n[P];for(const X in D){const W=D[X];for(const U in W){const H=W[U];for(const O in H)h(H[O].object),delete H[O];delete W[U]}}delete n[P]}}function w(P){if(n[P.id]===void 0)return;const D=n[P.id];for(const X in D){const W=D[X];for(const U in W){const H=W[U];for(const O in H)h(H[O].object),delete H[O];delete W[U]}}delete n[P.id]}function A(P){for(const D in n){const X=n[D];for(const W in X){const U=X[W];if(U[P.id]===void 0)continue;const H=U[P.id];for(const O in H)h(H[O].object),delete H[O];delete U[P.id]}}}function M(P){for(const D in n){const X=n[D],W=P.isInstancedMesh===!0?P.id:0,U=X[W];if(U!==void 0){for(const H in U){const O=U[H];for(const q in O)h(O[q].object),delete O[q];delete U[H]}delete X[W],Object.keys(X).length===0&&delete n[D]}}}function b(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:M,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:y}}function v_(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function x_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Sn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const M=A===fi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==un&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==In&&!M)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Pe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:E,maxFragmentUniforms:_,maxSamples:T,samples:w}}function __(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Xi,o=new De,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const m=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const y=r?0:n,E=y*4;let _=p.clippingState||null;l.value=_,_=h(m,u,E,f);for(let T=0;T!==E;++T)_[T]=t[T];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,m){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,_=f;E!==v;++E,_+=4)a.copy(d[E]).applyMatrix4(y,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}const Ii=4,cu=[.125,.215,.35,.446,.526,.582],Wi=20,M_=256,ar=new to,hu=new Re;let ko=null,Vo=0,Go=0,Ho=!1;const y_=new I;class jl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=y_}=r;ko=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=du(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ko,Vo,Go),this._renderer.xr.enabled=Ho,e.scissorTest=!1,ws(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$i||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ko=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:fi,format:Sn,colorSpace:za,depthBuffer:!1},s=uu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uu(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=S_(r)),this._blurMaterial=w_(r,e,t),this._ggxMaterial=b_(r,e,t)}return s}_compileMaterial(e){const t=new Je(new Ot,e);this._renderer.compile(t,ar)}_sceneToCubeUV(e,t,n,s,r){const l=new cn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(hu),d.toneMapping=Yn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Je(new yt,new sn({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let p=!1;const y=e.background;y?y.isColor&&(g.color.copy(y),e.background=null,p=!0):(g.color.copy(hu),p=!0);for(let E=0;E<6;E++){const _=E%3;_===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):_===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const T=this._cubeSize;ws(s,_*T,E>2?T:0,T,T),d.setRenderTarget(s),p&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===$i||e.mapping===qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=du());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ws(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ar)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:m}=this,v=this._sizeLods[n],g=3*v*(n>m-Ii?n-m+Ii:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,ws(r,g,p,3*v,2*v),s.setRenderTarget(r),s.render(o,ar),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,ws(e,g,p,3*v,2*v),s.setRenderTarget(e),s.render(o,ar)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ze("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=c;const u=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Wi-1),v=r/m,g=isFinite(r)?1+Math.floor(h*v):Wi;g>Wi&&Pe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Wi}`);const p=[];let y=0;for(let A=0;A<Wi;++A){const M=A/v,b=Math.exp(-M*M/2);p.push(b),A===0?y+=b:A<g&&(y+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:E}=this;u.dTheta.value=m,u.mipInt.value=E-n;const _=this._sizeLods[s],T=3*_*(s>E-Ii?s-E+Ii:0),w=4*(this._cubeSize-_);ws(t,T,w,3*_,2*_),l.setRenderTarget(t),l.render(d,ar)}}function S_(i){const e=[],t=[],n=[];let s=i;const r=i-Ii+1+cu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ii?l=cu[a-i+Ii-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,v=3,g=2,p=1,y=new Float32Array(v*m*f),E=new Float32Array(g*m*f),_=new Float32Array(p*m*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,M=w>2?0:-1,b=[A,M,0,A+2/3,M,0,A+2/3,M+1,0,A,M,0,A+2/3,M+1,0,A,M+1,0];y.set(b,v*m*w),E.set(u,g*m*w);const R=[w,w,w,w,w,w];_.set(R,p*m*w)}const T=new Ot;T.setAttribute("position",new Xt(y,v)),T.setAttribute("uv",new Xt(E,g)),T.setAttribute("faceIndex",new Xt(_,p)),n.push(new Je(T,null)),s>Ii&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function uu(i,e,t){const n=new Ln(i,e,t);return n.texture.mapping=Ja,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ws(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function b_(i,e,t){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:M_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:no(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function w_(i,e,t){const n=new Float32Array(Wi),s=new I(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:no(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function du(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:no(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function fu(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:no(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function no(){return`

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
	`}class xf extends Ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new hf(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new yt(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:li});r.uniforms.tEquirect.value=t;const a=new Je(s,r),o=t.minFilter;return t.minFilter===Wn&&(t.minFilter=Ct),new Pg(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function E_(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===uo||f===fo)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const v=new xf(m.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,m=f===uo||f===fo,v=f===$i||f===qs;if(m||v){let g=t.get(u);const p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new jl(i)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{const y=u.image;return m&&y&&y.height>0||v&&y&&l(y)?(n===null&&(n=new jl(i)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===uo?u.mapping=$i:f===fo&&(u.mapping=qs),u}function l(u){let f=0;const m=6;for(let v=0;v<m;v++)u[v]!==void 0&&f++;return f===m}function c(u){const f=u.target;f.removeEventListener("dispose",c);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function T_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Hs("WebGLRenderer: "+n+" extension not supported."),s}}}function A_(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,m=d.attributes.position;let v=0;if(m===void 0)return;if(f!==null){const y=f.array;v=f.version;for(let E=0,_=y.length;E<_;E+=3){const T=y[E+0],w=y[E+1],A=y[E+2];u.push(T,w,w,A,A,T)}}else{const y=m.array;v=m.version;for(let E=0,_=y.length/3-1;E<_;E+=3){const T=E+0,w=E+1,A=E+2;u.push(T,w,w,A,A,T)}}const g=new(m.count>=65535?lf:of)(u,1);g.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function C_(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let v=0;for(let g=0;g<f;g++)v+=u[g];t.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function R_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ze("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function P_(i,e,t){const n=new WeakMap,s=new ft;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let R=function(){M.dispose(),n.delete(o),o.removeEventListener("dispose",R)};var f=R;u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let _=0;m===!0&&(_=1),v===!0&&(_=2),g===!0&&(_=3);let T=o.attributes.position.count*_,w=1;T>e.maxTextureSize&&(w=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const A=new Float32Array(T*w*4*d),M=new sf(A,T,w,d);M.type=In,M.needsUpdate=!0;const b=_*4;for(let P=0;P<d;P++){const D=p[P],X=y[P],W=E[P],U=T*w*4*P;for(let H=0;H<D.count;H++){const O=H*b;m===!0&&(s.fromBufferAttribute(D,H),A[U+O+0]=s.x,A[U+O+1]=s.y,A[U+O+2]=s.z,A[U+O+3]=0),v===!0&&(s.fromBufferAttribute(X,H),A[U+O+4]=s.x,A[U+O+5]=s.y,A[U+O+6]=s.z,A[U+O+7]=0),g===!0&&(s.fromBufferAttribute(W,H),A[U+O+8]=s.x,A[U+O+9]=s.y,A[U+O+10]=s.z,A[U+O+11]=W.itemSize===4?s.w:1)}}u={count:d,texture:M,size:new Le(T,w)},n.set(o,u),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function I_(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const L_={[Hd]:"LINEAR_TONE_MAPPING",[Xd]:"REINHARD_TONE_MAPPING",[Wd]:"CINEON_TONE_MAPPING",[Tc]:"ACES_FILMIC_TONE_MAPPING",[Zd]:"AGX_TONE_MAPPING",[Yd]:"NEUTRAL_TONE_MAPPING",[qd]:"CUSTOM_TONE_MAPPING"};function D_(i,e,t,n,s,r){const a=new Ln(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Zs(e,t):void 0}),o=new Ln(e,t,{type:fi,depthBuffer:!1,stencilBuffer:!1}),l=new Ot;l.setAttribute("position",new Qe([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Qe([0,2,0,0,2,0],2));const c=new bg({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Je(l,c),d=new to(-1,1,1,-1,0,1);let u=null,f=null,m=!1,v,g=null,p=[],y=!1;this.setSize=function(E,_){a.setSize(E,_),o.setSize(E,_);for(let T=0;T<p.length;T++){const w=p[T];w.setSize&&w.setSize(E,_)}},this.setEffects=function(E){p=E,y=p.length>0&&p[0].isRenderPass===!0;const _=a.width,T=a.height;for(let w=0;w<p.length;w++){const A=p[w];A.setSize&&A.setSize(_,T)}},this.begin=function(E,_){if(m||E.toneMapping===Yn&&p.length===0)return!1;if(g=_,_!==null){const T=_.width,w=_.height;(a.width!==T||a.height!==w)&&this.setSize(T,w)}return y===!1&&E.setRenderTarget(a),v=E.toneMapping,E.toneMapping=Yn,!0},this.hasRenderPass=function(){return y},this.end=function(E,_){E.toneMapping=v,m=!0;let T=a,w=o;for(let A=0;A<p.length;A++){const M=p[A];if(M.enabled!==!1&&(M.render(E,w,T,_),M.needsSwap!==!1)){const b=T;T=w,w=b}}if(u!==E.outputColorSpace||f!==E.toneMapping){u=E.outputColorSpace,f=E.toneMapping,c.defines={},Ge.getTransfer(u)===tt&&(c.defines.SRGB_TRANSFER="");const A=L_[f];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,E.setRenderTarget(g),E.render(h,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const _f=new Qt,ec=new Zs(1,1),Mf=new sf,yf=new eg,Sf=new hf,pu=[],mu=[],gu=new Float32Array(16),vu=new Float32Array(9),xu=new Float32Array(4);function Qs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=pu[s];if(r===void 0&&(r=new Float32Array(s),pu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function io(i,e){let t=mu[e];t===void 0&&(t=new Int32Array(e),mu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function N_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function F_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2fv(this.addr,e),Ut(t,e)}}function U_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;i.uniform3fv(this.addr,e),Ut(t,e)}}function O_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4fv(this.addr,e),Ut(t,e)}}function B_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Ft(t,n))return;xu.set(n),i.uniformMatrix2fv(this.addr,!1,xu),Ut(t,n)}}function z_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Ft(t,n))return;vu.set(n),i.uniformMatrix3fv(this.addr,!1,vu),Ut(t,n)}}function k_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Ft(t,n))return;gu.set(n),i.uniformMatrix4fv(this.addr,!1,gu),Ut(t,n)}}function V_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function G_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2iv(this.addr,e),Ut(t,e)}}function H_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3iv(this.addr,e),Ut(t,e)}}function X_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4iv(this.addr,e),Ut(t,e)}}function W_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function q_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2uiv(this.addr,e),Ut(t,e)}}function Z_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3uiv(this.addr,e),Ut(t,e)}}function Y_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4uiv(this.addr,e),Ut(t,e)}}function $_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ec.compareFunction=t.isReversedDepthBuffer()?Fc:Nc,r=ec):r=_f,t.setTexture2D(e||r,s)}function K_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||yf,s)}function J_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Sf,s)}function Q_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Mf,s)}function j_(i){switch(i){case 5126:return N_;case 35664:return F_;case 35665:return U_;case 35666:return O_;case 35674:return B_;case 35675:return z_;case 35676:return k_;case 5124:case 35670:return V_;case 35667:case 35671:return G_;case 35668:case 35672:return H_;case 35669:case 35673:return X_;case 5125:return W_;case 36294:return q_;case 36295:return Z_;case 36296:return Y_;case 35678:case 36198:case 36298:case 36306:case 35682:return $_;case 35679:case 36299:case 36307:return K_;case 35680:case 36300:case 36308:case 36293:return J_;case 36289:case 36303:case 36311:case 36292:return Q_}}function eM(i,e){i.uniform1fv(this.addr,e)}function tM(i,e){const t=Qs(e,this.size,2);i.uniform2fv(this.addr,t)}function nM(i,e){const t=Qs(e,this.size,3);i.uniform3fv(this.addr,t)}function iM(i,e){const t=Qs(e,this.size,4);i.uniform4fv(this.addr,t)}function sM(i,e){const t=Qs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function rM(i,e){const t=Qs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function aM(i,e){const t=Qs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function oM(i,e){i.uniform1iv(this.addr,e)}function lM(i,e){i.uniform2iv(this.addr,e)}function cM(i,e){i.uniform3iv(this.addr,e)}function hM(i,e){i.uniform4iv(this.addr,e)}function uM(i,e){i.uniform1uiv(this.addr,e)}function dM(i,e){i.uniform2uiv(this.addr,e)}function fM(i,e){i.uniform3uiv(this.addr,e)}function pM(i,e){i.uniform4uiv(this.addr,e)}function mM(i,e,t){const n=this.cache,s=e.length,r=io(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ec:a=_f;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function gM(i,e,t){const n=this.cache,s=e.length,r=io(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||yf,r[a])}function vM(i,e,t){const n=this.cache,s=e.length,r=io(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Sf,r[a])}function xM(i,e,t){const n=this.cache,s=e.length,r=io(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Mf,r[a])}function _M(i){switch(i){case 5126:return eM;case 35664:return tM;case 35665:return nM;case 35666:return iM;case 35674:return sM;case 35675:return rM;case 35676:return aM;case 5124:case 35670:return oM;case 35667:case 35671:return lM;case 35668:case 35672:return cM;case 35669:case 35673:return hM;case 5125:return uM;case 36294:return dM;case 36295:return fM;case 36296:return pM;case 35678:case 36198:case 36298:case 36306:case 35682:return mM;case 35679:case 36299:case 36307:return gM;case 35680:case 36300:case 36308:case 36293:return vM;case 36289:case 36303:case 36311:case 36292:return xM}}class MM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=j_(t.type)}}class yM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_M(t.type)}}class SM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Xo=/(\w+)(\])?(\[|\.)?/g;function _u(i,e){i.seq.push(e),i.map[e.id]=e}function bM(i,e,t){const n=i.name,s=n.length;for(Xo.lastIndex=0;;){const r=Xo.exec(n),a=Xo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){_u(t,c===void 0?new MM(o,i,e):new yM(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new SM(o),_u(t,d)),t=d}}}class Ra{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);bM(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Mu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const wM=37297;let EM=0;function TM(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const yu=new De;function AM(i){Ge._getMatrix(yu,Ge.workingColorSpace,i);const e=`mat3( ${yu.elements.map(t=>t.toFixed(4))} )`;switch(Ge.getTransfer(i)){case ka:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Su(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+TM(i.getShaderSource(e),o)}else return r}function CM(i,e){const t=AM(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const RM={[Hd]:"Linear",[Xd]:"Reinhard",[Wd]:"Cineon",[Tc]:"ACESFilmic",[Zd]:"AgX",[Yd]:"Neutral",[qd]:"Custom"};function PM(i,e){const t=RM[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ha=new I;function IM(){Ge.getLuminanceCoefficients(ha);const i=ha.x.toFixed(4),e=ha.y.toFixed(4),t=ha.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function LM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vr).join(`
`)}function DM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function NM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function vr(i){return i!==""}function bu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const FM=/^[ \t]*#include +<([\w\d./]+)>/gm;function tc(i){return i.replace(FM,OM)}const UM=new Map;function OM(i,e){let t=Oe[e];if(t===void 0){const n=UM.get(e);if(n!==void 0)t=Oe[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return tc(t)}const BM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eu(i){return i.replace(BM,zM)}function zM(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const kM={[Sr]:"SHADOWMAP_TYPE_PCF",[gr]:"SHADOWMAP_TYPE_VSM"};function VM(i){return kM[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const GM={[$i]:"ENVMAP_TYPE_CUBE",[qs]:"ENVMAP_TYPE_CUBE",[Ja]:"ENVMAP_TYPE_CUBE_UV"};function HM(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":GM[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const XM={[qs]:"ENVMAP_MODE_REFRACTION"};function WM(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":XM[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const qM={[Ec]:"ENVMAP_BLENDING_MULTIPLY",[D0]:"ENVMAP_BLENDING_MIX",[N0]:"ENVMAP_BLENDING_ADD"};function ZM(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":qM[i.combine]||"ENVMAP_BLENDING_NONE"}function YM(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function $M(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=VM(t),c=HM(t),h=WM(t),d=ZM(t),u=YM(t),f=LM(t),m=DM(r),v=s.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(vr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(vr).join(`
`),p.length>0&&(p+=`
`)):(g=[Tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vr).join(`
`),p=[Tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yn?"#define TONE_MAPPING":"",t.toneMapping!==Yn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Yn?PM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,CM("linearToOutputTexel",t.outputColorSpace),IM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vr).join(`
`)),a=tc(a),a=bu(a,t),a=wu(a,t),o=tc(o),o=bu(o,t),o=wu(o,t),a=Eu(a),o=Eu(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=y+g+a,_=y+p+o,T=Mu(s,s.VERTEX_SHADER,E),w=Mu(s,s.FRAGMENT_SHADER,_);s.attachShader(v,T),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(P){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(v)||"",X=s.getShaderInfoLog(T)||"",W=s.getShaderInfoLog(w)||"",U=D.trim(),H=X.trim(),O=W.trim();let q=!0,ee=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,w);else{const ie=Su(s,T,"vertex"),Q=Su(s,w,"fragment");Ze("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+ie+`
`+Q)}else U!==""?Pe("WebGLProgram: Program Info Log:",U):(H===""||O==="")&&(ee=!1);ee&&(P.diagnostics={runnable:q,programLog:U,vertexShader:{log:H,prefix:g},fragmentShader:{log:O,prefix:p}})}s.deleteShader(T),s.deleteShader(w),M=new Ra(s,v),b=NM(s,v)}let M;this.getUniforms=function(){return M===void 0&&A(this),M};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,wM)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=EM++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=w,this}let KM=0;class JM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new QM(e),t.set(e,n)),n}}class QM{constructor(e){this.id=KM++,this.code=e,this.usedTimes=0}}function jM(i){return i===Ji||i===Ua||i===Oa}function ey(i,e,t,n,s,r){const a=new rf,o=new JM,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(M){return l.add(M),M===0?"uv":`uv${M}`}function v(M,b,R,P,D,X){const W=P.fog,U=D.geometry,H=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,O=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,q=e.get(M.envMap||H,O),ee=q&&q.mapping===Ja?q.image.height:null,ie=f[M.type];M.precision!==null&&(u=n.getMaxPrecision(M.precision),u!==M.precision&&Pe("WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const Q=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,oe=Q!==void 0?Q.length:0;let ze=0;U.morphAttributes.position!==void 0&&(ze=1),U.morphAttributes.normal!==void 0&&(ze=2),U.morphAttributes.color!==void 0&&(ze=3);let je,Ve,J,re;if(ie){const xe=Vn[ie];je=xe.vertexShader,Ve=xe.fragmentShader}else{je=M.vertexShader,Ve=M.fragmentShader;const xe=o.getVertexShaderStage(M),mt=o.getFragmentShaderStage(M);o.update(M,xe,mt),J=xe.id,re=mt.id}const te=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Ne=D.isInstancedMesh===!0,Te=D.isBatchedMesh===!0,xt=!!M.map,ke=!!M.matcap,it=!!q,Ke=!!M.aoMap,We=!!M.lightMap,wt=!!M.bumpMap&&M.wireframe===!1,Rt=!!M.normalMap,Bt=!!M.displacementMap,kt=!!M.emissiveMap,pt=!!M.metalnessMap,Et=!!M.roughnessMap,N=M.anisotropy>0,rn=M.clearcoat>0,et=M.dispersion>0,C=M.iridescence>0,x=M.sheen>0,B=M.transmission>0,V=N&&!!M.anisotropyMap,Z=rn&&!!M.clearcoatMap,ne=rn&&!!M.clearcoatNormalMap,ae=rn&&!!M.clearcoatRoughnessMap,Y=C&&!!M.iridescenceMap,K=C&&!!M.iridescenceThicknessMap,le=x&&!!M.sheenColorMap,ye=x&&!!M.sheenRoughnessMap,ue=!!M.specularMap,ce=!!M.specularColorMap,we=!!M.specularIntensityMap,Ae=B&&!!M.transmissionMap,Fe=B&&!!M.thicknessMap,L=!!M.gradientMap,se=!!M.alphaMap,$=M.alphaTest>0,he=!!M.alphaHash,me=!!M.extensions;let j=Yn;M.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(j=i.toneMapping);const Me={shaderID:ie,shaderType:M.type,shaderName:M.name,vertexShader:je,fragmentShader:Ve,defines:M.defines,customVertexShaderID:J,customFragmentShaderID:re,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:Te,batchingColor:Te&&D._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&D.instanceColor!==null,instancingMorph:Ne&&D.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Ge.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:xt,matcap:ke,envMap:it,envMapMode:it&&q.mapping,envMapCubeUVHeight:ee,aoMap:Ke,lightMap:We,bumpMap:wt,normalMap:Rt,displacementMap:Bt,emissiveMap:kt,normalMapObjectSpace:Rt&&M.normalMapType===O0,normalMapTangentSpace:Rt&&M.normalMapType===Ba,packedNormalMap:Rt&&M.normalMapType===Ba&&jM(M.normalMap.format),metalnessMap:pt,roughnessMap:Et,anisotropy:N,anisotropyMap:V,clearcoat:rn,clearcoatMap:Z,clearcoatNormalMap:ne,clearcoatRoughnessMap:ae,dispersion:et,iridescence:C,iridescenceMap:Y,iridescenceThicknessMap:K,sheen:x,sheenColorMap:le,sheenRoughnessMap:ye,specularMap:ue,specularColorMap:ce,specularIntensityMap:we,transmission:B,transmissionMap:Ae,thicknessMap:Fe,gradientMap:L,opaque:M.transparent===!1&&M.blending===Gs&&M.alphaToCoverage===!1,alphaMap:se,alphaTest:$,alphaHash:he,combine:M.combine,mapUv:xt&&m(M.map.channel),aoMapUv:Ke&&m(M.aoMap.channel),lightMapUv:We&&m(M.lightMap.channel),bumpMapUv:wt&&m(M.bumpMap.channel),normalMapUv:Rt&&m(M.normalMap.channel),displacementMapUv:Bt&&m(M.displacementMap.channel),emissiveMapUv:kt&&m(M.emissiveMap.channel),metalnessMapUv:pt&&m(M.metalnessMap.channel),roughnessMapUv:Et&&m(M.roughnessMap.channel),anisotropyMapUv:V&&m(M.anisotropyMap.channel),clearcoatMapUv:Z&&m(M.clearcoatMap.channel),clearcoatNormalMapUv:ne&&m(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&m(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&m(M.iridescenceMap.channel),iridescenceThicknessMapUv:K&&m(M.iridescenceThicknessMap.channel),sheenColorMapUv:le&&m(M.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(M.sheenRoughnessMap.channel),specularMapUv:ue&&m(M.specularMap.channel),specularColorMapUv:ce&&m(M.specularColorMap.channel),specularIntensityMapUv:we&&m(M.specularIntensityMap.channel),transmissionMapUv:Ae&&m(M.transmissionMap.channel),thicknessMapUv:Fe&&m(M.thicknessMap.channel),alphaMapUv:se&&m(M.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Rt||N),vertexNormals:!!U.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!U.attributes.uv&&(xt||se),fog:!!W,useFog:M.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||U.attributes.normal===void 0&&Rt===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ie,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:ze,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:j,decodeVideoTexture:xt&&M.map.isVideoTexture===!0&&Ge.getTransfer(M.map.colorSpace)===tt,decodeVideoTextureEmissive:kt&&M.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(M.emissiveMap.colorSpace)===tt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===gn,flipSided:M.side===nn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:me&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&M.extensions.multiDraw===!0||Te)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function g(M){const b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)b.push(R),b.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(p(b,M),y(b,M),b.push(i.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function p(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function y(M,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),M.push(a.mask)}function E(M){const b=f[M.type];let R;if(b){const P=Vn[b];R=Mg.clone(P.uniforms)}else R=M.uniforms;return R}function _(M,b){let R=h.get(b);return R!==void 0?++R.usedTimes:(R=new $M(i,b,M,s),c.push(R),h.set(b,R)),R}function T(M){if(--M.usedTimes===0){const b=c.indexOf(M);c[b]=c[c.length-1],c.pop(),h.delete(M.cacheKey),M.destroy()}}function w(M){o.remove(M)}function A(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:E,acquireProgram:_,releaseProgram:T,releaseShaderCache:w,programs:c,dispose:A}}function ty(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ny(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Au(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Cu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,v,g,p){let y=i[e];return y===void 0?(y={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:g,group:p},i[e]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=m,y.materialVariant=a(u),y.groupOrder=v,y.renderOrder=u.renderOrder,y.z=g,y.group=p),e++,y}function l(u,f,m,v,g,p){const y=o(u,f,m,v,g,p);m.transmission>0?n.push(y):m.transparent===!0?s.push(y):t.push(y)}function c(u,f,m,v,g,p){const y=o(u,f,m,v,g,p);m.transmission>0?n.unshift(y):m.transparent===!0?s.unshift(y):t.unshift(y)}function h(u,f,m){t.length>1&&t.sort(u||ny),n.length>1&&n.sort(f||Au),s.length>1&&s.sort(f||Au),m&&(t.reverse(),n.reverse(),s.reverse())}function d(){for(let u=e,f=i.length;u<f;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function iy(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Cu,i.set(n,[a])):s>=r.length?(a=new Cu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function sy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Re};break;case"SpotLight":t={position:new I,direction:new I,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function ry(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let ay=0;function oy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ly(i){const e=new sy,t=ry(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const s=new I,r=new Xe,a=new Xe;function o(c){let h=0,d=0,u=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,y=0,E=0,_=0,T=0,w=0,A=0;c.sort(oy);for(let b=0,R=c.length;b<R;b++){const P=c[b],D=P.color,X=P.intensity,W=P.distance;let U=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ji?U=P.shadow.map.texture:U=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=D.r*X,d+=D.g*X,u+=D.b*X;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],X);A++}else if(P.isDirectionalLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const O=P.shadow,q=t.get(P);q.shadowIntensity=O.intensity,q.shadowBias=O.bias,q.shadowNormalBias=O.normalBias,q.shadowRadius=O.radius,q.shadowMapSize=O.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=P.shadow.matrix,y++}n.directional[f]=H,f++}else if(P.isSpotLight){const H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(D).multiplyScalar(X),H.distance=W,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[v]=H;const O=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,O.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[v]=O.matrix,P.castShadow){const q=t.get(P);q.shadowIntensity=O.intensity,q.shadowBias=O.bias,q.shadowNormalBias=O.normalBias,q.shadowRadius=O.radius,q.shadowMapSize=O.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=U,_++}v++}else if(P.isRectAreaLight){const H=e.get(P);H.color.copy(D).multiplyScalar(X),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=H,g++}else if(P.isPointLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const O=P.shadow,q=t.get(P);q.shadowIntensity=O.intensity,q.shadowBias=O.bias,q.shadowNormalBias=O.normalBias,q.shadowRadius=O.radius,q.shadowMapSize=O.mapSize,q.shadowCameraNear=O.camera.near,q.shadowCameraFar=O.camera.far,n.pointShadow[m]=q,n.pointShadowMap[m]=U,n.pointShadowMatrix[m]=P.shadow.matrix,E++}n.point[m]=H,m++}else if(P.isHemisphereLight){const H=e.get(P);H.skyColor.copy(P.color).multiplyScalar(X),H.groundColor.copy(P.groundColor).multiplyScalar(X),n.hemi[p]=H,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const M=n.hash;(M.directionalLength!==f||M.pointLength!==m||M.spotLength!==v||M.rectAreaLength!==g||M.hemiLength!==p||M.numDirectionalShadows!==y||M.numPointShadows!==E||M.numSpotShadows!==_||M.numSpotMaps!==T||M.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=_+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,M.directionalLength=f,M.pointLength=m,M.spotLength=v,M.rectAreaLength=g,M.hemiLength=p,M.numDirectionalShadows=y,M.numPointShadows=E,M.numSpotShadows=_,M.numSpotMaps=T,M.numLightProbes=A,n.version=ay++)}function l(c,h){let d=0,u=0,f=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const E=c[p];if(E.isDirectionalLight){const _=n.directional[d];_.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(E.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(E.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(E.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(E.width*.5,0,0),_.halfHeight.set(0,E.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(E.isPointLight){const _=n.point[u];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(g),u++}else if(E.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(E.matrixWorld),_.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Ru(i){const e=new ly(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function cy(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Ru(i),e.set(s,[o])):r>=a.length?(o=new Ru(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const hy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uy=`uniform sampler2D shadow_pass;
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
}`,dy=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],fy=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Pu=new Xe,or=new I,Wo=new I;function py(i,e,t){let n=new Bc;const s=new Le,r=new Le,a=new ft,o=new Eg,l=new Tg,c={},h=t.maxTextureSize,d={[di]:nn,[nn]:di,[gn]:gn},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:hy,fragmentShader:uy}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new Ot;m.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Je(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sr;let p=this.type;this.render=function(w,A,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===g0&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Sr);const b=i.getRenderTarget(),R=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),D=i.state;D.setBlending(li),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const X=p!==this.type;X&&A.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(U=>U.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,U=w.length;W<U;W++){const H=w[W],O=H.shadow;if(O===void 0){Pe("WebGLShadowMap:",H,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const q=O.getFrameExtents();s.multiply(q),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,O.mapSize.y=r.y));const ee=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=ee,O.map===null||X===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===gr){if(H.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new Ln(s.x,s.y,{format:Ji,type:fi,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),O.map.texture.name=H.name+".shadowMap",O.map.depthTexture=new Zs(s.x,s.y,In),O.map.depthTexture.name=H.name+".shadowMapDepth",O.map.depthTexture.format=pi,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ht,O.map.depthTexture.magFilter=Ht}else H.isPointLight?(O.map=new xf(s.x),O.map.depthTexture=new xg(s.x,Jn)):(O.map=new Ln(s.x,s.y),O.map.depthTexture=new Zs(s.x,s.y,Jn)),O.map.depthTexture.name=H.name+".shadowMap",O.map.depthTexture.format=pi,this.type===Sr?(O.map.depthTexture.compareFunction=ee?Fc:Nc,O.map.depthTexture.minFilter=Ct,O.map.depthTexture.magFilter=Ct):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ht,O.map.depthTexture.magFilter=Ht);O.camera.updateProjectionMatrix()}const ie=O.map.isWebGLCubeRenderTarget?6:1;for(let Q=0;Q<ie;Q++){if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,Q),i.clear();else{Q===0&&(i.setRenderTarget(O.map),i.clear());const oe=O.getViewport(Q);a.set(r.x*oe.x,r.y*oe.y,r.x*oe.z,r.y*oe.w),D.viewport(a)}if(H.isPointLight){const oe=O.camera,ze=O.matrix,je=H.distance||oe.far;je!==oe.far&&(oe.far=je,oe.updateProjectionMatrix()),or.setFromMatrixPosition(H.matrixWorld),oe.position.copy(or),Wo.copy(oe.position),Wo.add(dy[Q]),oe.up.copy(fy[Q]),oe.lookAt(Wo),oe.updateMatrixWorld(),ze.makeTranslation(-or.x,-or.y,-or.z),Pu.multiplyMatrices(oe.projectionMatrix,oe.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Pu,oe.coordinateSystem,oe.reversedDepth)}else O.updateMatrices(H);n=O.getFrustum(),_(A,M,O.camera,H,this.type)}O.isPointLightShadow!==!0&&this.type===gr&&y(O,M),O.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,R,P)};function y(w,A){const M=e.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ln(s.x,s.y,{format:Ji,type:fi})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,M,u,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,M,f,v,null)}function E(w,A,M,b){let R=null;const P=M.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)R=P;else if(R=M.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const D=R.uuid,X=A.uuid;let W=c[D];W===void 0&&(W={},c[D]=W);let U=W[X];U===void 0&&(U=R.clone(),W[X]=U,A.addEventListener("dispose",T)),R=U}if(R.visible=A.visible,R.wireframe=A.wireframe,b===gr?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:d[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,M.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const D=i.properties.get(R);D.light=M}return R}function _(w,A,M,b,R){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===gr)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,w.matrixWorld);const X=e.update(w),W=w.material;if(Array.isArray(W)){const U=X.groups;for(let H=0,O=U.length;H<O;H++){const q=U[H],ee=W[q.materialIndex];if(ee&&ee.visible){const ie=E(w,ee,b,R);w.onBeforeShadow(i,w,A,M,X,ie,q),i.renderBufferDirect(M,null,X,ie,w,q),w.onAfterShadow(i,w,A,M,X,ie,q)}}}else if(W.visible){const U=E(w,W,b,R);w.onBeforeShadow(i,w,A,M,X,U,null),i.renderBufferDirect(M,null,X,U,w,null),w.onAfterShadow(i,w,A,M,X,U,null)}}const D=w.children;for(let X=0,W=D.length;X<W;X++)_(D[X],A,M,b,R)}function T(w){w.target.removeEventListener("dispose",T);for(const M in c){const b=c[M],R=w.target.uuid;R in b&&(b[R].dispose(),delete b[R])}}}function my(i,e){function t(){let L=!1;const se=new ft;let $=null;const he=new ft(0,0,0,0);return{setMask:function(me){$!==me&&!L&&(i.colorMask(me,me,me,me),$=me)},setLocked:function(me){L=me},setClear:function(me,j,Me,xe,mt){mt===!0&&(me*=xe,j*=xe,Me*=xe),se.set(me,j,Me,xe),he.equals(se)===!1&&(i.clearColor(me,j,Me,xe),he.copy(se))},reset:function(){L=!1,$=null,he.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,$=null,he=null,me=null;return{setReversed:function(j){if(se!==j){const Me=e.get("EXT_clip_control");j?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),se=j;const xe=me;me=null,this.setClear(xe)}},getReversed:function(){return se},setTest:function(j){j?te(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(j){$!==j&&!L&&(i.depthMask(j),$=j)},setFunc:function(j){if(se&&(j=Z0[j]),he!==j){switch(j){case fl:i.depthFunc(i.NEVER);break;case pl:i.depthFunc(i.ALWAYS);break;case ml:i.depthFunc(i.LESS);break;case Ws:i.depthFunc(i.LEQUAL);break;case gl:i.depthFunc(i.EQUAL);break;case vl:i.depthFunc(i.GEQUAL);break;case xl:i.depthFunc(i.GREATER);break;case _l:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}he=j}},setLocked:function(j){L=j},setClear:function(j){me!==j&&(me=j,se&&(j=1-j),i.clearDepth(j))},reset:function(){L=!1,$=null,he=null,me=null,se=!1}}}function s(){let L=!1,se=null,$=null,he=null,me=null,j=null,Me=null,xe=null,mt=null;return{setTest:function(lt){L||(lt?te(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(lt){se!==lt&&!L&&(i.stencilMask(lt),se=lt)},setFunc:function(lt,Fn,Un){($!==lt||he!==Fn||me!==Un)&&(i.stencilFunc(lt,Fn,Un),$=lt,he=Fn,me=Un)},setOp:function(lt,Fn,Un){(j!==lt||Me!==Fn||xe!==Un)&&(i.stencilOp(lt,Fn,Un),j=lt,Me=Fn,xe=Un)},setLocked:function(lt){L=lt},setClear:function(lt){mt!==lt&&(i.clearStencil(lt),mt=lt)},reset:function(){L=!1,se=null,$=null,he=null,me=null,j=null,Me=null,xe=null,mt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u={},f=new WeakMap,m=[],v=null,g=!1,p=null,y=null,E=null,_=null,T=null,w=null,A=null,M=new Re(0,0,0),b=0,R=!1,P=null,D=null,X=null,W=null,U=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,q=0;const ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(ee)[1]),O=q>=1):ee.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),O=q>=2);let ie=null,Q={};const oe=i.getParameter(i.SCISSOR_BOX),ze=i.getParameter(i.VIEWPORT),je=new ft().fromArray(oe),Ve=new ft().fromArray(ze);function J(L,se,$,he){const me=new Uint8Array(4),j=i.createTexture();i.bindTexture(L,j),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Me=0;Me<$;Me++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,he,0,i.RGBA,i.UNSIGNED_BYTE,me):i.texImage2D(se+Me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,me);return j}const re={};re[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),re[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),re[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(Ws),wt(!1),Rt(Ih),te(i.CULL_FACE),Ke(li);function te(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function Ie(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Ne(L,se){return u[L]!==se?(i.bindFramebuffer(L,se),u[L]=se,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Te(L,se){let $=m,he=!1;if(L){$=f.get(se),$===void 0&&($=[],f.set(se,$));const me=L.textures;if($.length!==me.length||$[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Me=me.length;j<Me;j++)$[j]=i.COLOR_ATTACHMENT0+j;$.length=me.length,he=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,he=!0);he&&i.drawBuffers($)}function xt(L){return v!==L?(i.useProgram(L),v=L,!0):!1}const ke={[oi]:i.FUNC_ADD,[v0]:i.FUNC_SUBTRACT,[x0]:i.FUNC_REVERSE_SUBTRACT};ke[_0]=i.MIN,ke[M0]=i.MAX;const it={[y0]:i.ZERO,[ul]:i.ONE,[S0]:i.SRC_COLOR,[dl]:i.SRC_ALPHA,[C0]:i.SRC_ALPHA_SATURATE,[T0]:i.DST_COLOR,[w0]:i.DST_ALPHA,[b0]:i.ONE_MINUS_SRC_COLOR,[Tr]:i.ONE_MINUS_SRC_ALPHA,[A0]:i.ONE_MINUS_DST_COLOR,[E0]:i.ONE_MINUS_DST_ALPHA,[R0]:i.CONSTANT_COLOR,[P0]:i.ONE_MINUS_CONSTANT_COLOR,[I0]:i.CONSTANT_ALPHA,[L0]:i.ONE_MINUS_CONSTANT_ALPHA};function Ke(L,se,$,he,me,j,Me,xe,mt,lt){if(L===li){g===!0&&(Ie(i.BLEND),g=!1);return}if(g===!1&&(te(i.BLEND),g=!0),L!==Gd){if(L!==p||lt!==R){if((y!==oi||T!==oi)&&(i.blendEquation(i.FUNC_ADD),y=oi,T=oi),lt)switch(L){case Gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Li:i.blendFunc(i.ONE,i.ONE);break;case Lh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Dh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ze("WebGLState: Invalid blending: ",L);break}else switch(L){case Gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Li:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Lh:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dh:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",L);break}E=null,_=null,w=null,A=null,M.set(0,0,0),b=0,p=L,R=lt}return}me=me||se,j=j||$,Me=Me||he,(se!==y||me!==T)&&(i.blendEquationSeparate(ke[se],ke[me]),y=se,T=me),($!==E||he!==_||j!==w||Me!==A)&&(i.blendFuncSeparate(it[$],it[he],it[j],it[Me]),E=$,_=he,w=j,A=Me),(xe.equals(M)===!1||mt!==b)&&(i.blendColor(xe.r,xe.g,xe.b,mt),M.copy(xe),b=mt),p=L,R=!1}function We(L,se){L.side===gn?Ie(i.CULL_FACE):te(i.CULL_FACE);let $=L.side===nn;se&&($=!$),wt($),L.blending===Gs&&L.transparent===!1?Ke(li):Ke(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const he=L.stencilWrite;o.setTest(he),he&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),kt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function wt(L){P!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),P=L)}function Rt(L){L!==p0?(te(i.CULL_FACE),L!==D&&(L===Ih?i.cullFace(i.BACK):L===m0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),D=L}function Bt(L){L!==X&&(O&&i.lineWidth(L),X=L)}function kt(L,se,$){L?(te(i.POLYGON_OFFSET_FILL),(W!==se||U!==$)&&(W=se,U=$,a.getReversed()&&(se=-se),i.polygonOffset(se,$))):Ie(i.POLYGON_OFFSET_FILL)}function pt(L){L?te(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function Et(L){L===void 0&&(L=i.TEXTURE0+H-1),ie!==L&&(i.activeTexture(L),ie=L)}function N(L,se,$){$===void 0&&(ie===null?$=i.TEXTURE0+H-1:$=ie);let he=Q[$];he===void 0&&(he={type:void 0,texture:void 0},Q[$]=he),(he.type!==L||he.texture!==se)&&(ie!==$&&(i.activeTexture($),ie=$),i.bindTexture(L,se||re[L]),he.type=L,he.texture=se)}function rn(){const L=Q[ie];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function et(){try{i.compressedTexImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function x(){try{i.texSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function B(){try{i.texSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function Z(){try{i.compressedTexSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ne(){try{i.texStorage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ae(){try{i.texStorage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function Y(){try{i.texImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function K(){try{i.texImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function le(L){return d[L]!==void 0?d[L]:i.getParameter(L)}function ye(L,se){d[L]!==se&&(i.pixelStorei(L,se),d[L]=se)}function ue(L){je.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),je.copy(L))}function ce(L){Ve.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Ve.copy(L))}function we(L,se){let $=c.get(se);$===void 0&&($=new WeakMap,c.set(se,$));let he=$.get(L);he===void 0&&(he=i.getUniformBlockIndex(se,L.name),$.set(L,he))}function Ae(L,se){const he=c.get(se).get(L);l.get(se)!==he&&(i.uniformBlockBinding(se,he,L.__bindingPointIndex),l.set(se,he))}function Fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ie=null,Q={},u={},f=new WeakMap,m=[],v=null,g=!1,p=null,y=null,E=null,_=null,T=null,w=null,A=null,M=new Re(0,0,0),b=0,R=!1,P=null,D=null,X=null,W=null,U=null,je.set(0,0,i.canvas.width,i.canvas.height),Ve.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:te,disable:Ie,bindFramebuffer:Ne,drawBuffers:Te,useProgram:xt,setBlending:Ke,setMaterial:We,setFlipSided:wt,setCullFace:Rt,setLineWidth:Bt,setPolygonOffset:kt,setScissorTest:pt,activeTexture:Et,bindTexture:N,unbindTexture:rn,compressedTexImage2D:et,compressedTexImage3D:C,texImage2D:Y,texImage3D:K,pixelStorei:ye,getParameter:le,updateUBOMapping:we,uniformBlockBinding:Ae,texStorage2D:ne,texStorage3D:ae,texSubImage2D:x,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:ue,viewport:ce,reset:Fe}}function gy(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Le,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,x){return m?new OffscreenCanvas(C,x):Va("canvas")}function g(C,x,B){let V=1;const Z=et(C);if((Z.width>B||Z.height>B)&&(V=B/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ne=Math.floor(V*Z.width),ae=Math.floor(V*Z.height);u===void 0&&(u=v(ne,ae));const Y=x?v(ne,ae):u;return Y.width=ne,Y.height=ae,Y.getContext("2d").drawImage(C,0,0,ne,ae),Pe("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ne+"x"+ae+")."),Y}else return"data"in C&&Pe("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function p(C){return C.generateMipmaps}function y(C){i.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(C,x,B,V,Z,ne=!1){if(C!==null){if(i[C]!==void 0)return i[C];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ae;V&&(ae=e.get("EXT_texture_norm16"),ae||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=x;if(x===i.RED&&(B===i.FLOAT&&(Y=i.R32F),B===i.HALF_FLOAT&&(Y=i.R16F),B===i.UNSIGNED_BYTE&&(Y=i.R8),B===i.UNSIGNED_SHORT&&ae&&(Y=ae.R16_EXT),B===i.SHORT&&ae&&(Y=ae.R16_SNORM_EXT)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.R8UI),B===i.UNSIGNED_SHORT&&(Y=i.R16UI),B===i.UNSIGNED_INT&&(Y=i.R32UI),B===i.BYTE&&(Y=i.R8I),B===i.SHORT&&(Y=i.R16I),B===i.INT&&(Y=i.R32I)),x===i.RG&&(B===i.FLOAT&&(Y=i.RG32F),B===i.HALF_FLOAT&&(Y=i.RG16F),B===i.UNSIGNED_BYTE&&(Y=i.RG8),B===i.UNSIGNED_SHORT&&ae&&(Y=ae.RG16_EXT),B===i.SHORT&&ae&&(Y=ae.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RG8UI),B===i.UNSIGNED_SHORT&&(Y=i.RG16UI),B===i.UNSIGNED_INT&&(Y=i.RG32UI),B===i.BYTE&&(Y=i.RG8I),B===i.SHORT&&(Y=i.RG16I),B===i.INT&&(Y=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),B===i.UNSIGNED_INT&&(Y=i.RGB32UI),B===i.BYTE&&(Y=i.RGB8I),B===i.SHORT&&(Y=i.RGB16I),B===i.INT&&(Y=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),B===i.UNSIGNED_INT&&(Y=i.RGBA32UI),B===i.BYTE&&(Y=i.RGBA8I),B===i.SHORT&&(Y=i.RGBA16I),B===i.INT&&(Y=i.RGBA32I)),x===i.RGB&&(B===i.UNSIGNED_SHORT&&ae&&(Y=ae.RGB16_EXT),B===i.SHORT&&ae&&(Y=ae.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),x===i.RGBA){const K=ne?ka:Ge.getTransfer(Z);B===i.FLOAT&&(Y=i.RGBA32F),B===i.HALF_FLOAT&&(Y=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Y=K===tt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ae&&(Y=ae.RGBA16_EXT),B===i.SHORT&&ae&&(Y=ae.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function T(C,x){let B;return C?x===null||x===Jn||x===Cr?B=i.DEPTH24_STENCIL8:x===In?B=i.DEPTH32F_STENCIL8:x===Ar&&(B=i.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Jn||x===Cr?B=i.DEPTH_COMPONENT24:x===In?B=i.DEPTH_COMPONENT32F:x===Ar&&(B=i.DEPTH_COMPONENT16),B}function w(C,x){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ht&&C.minFilter!==Ct?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function A(C){const x=C.target;x.removeEventListener("dispose",A),b(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function M(C){const x=C.target;x.removeEventListener("dispose",M),P(x)}function b(C){const x=n.get(C);if(x.__webglInit===void 0)return;const B=C.source,V=f.get(B);if(V){const Z=V[x.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(C),Object.keys(V).length===0&&f.delete(B)}n.remove(C)}function R(C){const x=n.get(C);i.deleteTexture(x.__webglTexture);const B=C.source,V=f.get(B);delete V[x.__cacheKey],a.memory.textures--}function P(C){const x=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(x.__webglFramebuffer[V]))for(let Z=0;Z<x.__webglFramebuffer[V].length;Z++)i.deleteFramebuffer(x.__webglFramebuffer[V][Z]);else i.deleteFramebuffer(x.__webglFramebuffer[V]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[V])}else{if(Array.isArray(x.__webglFramebuffer))for(let V=0;V<x.__webglFramebuffer.length;V++)i.deleteFramebuffer(x.__webglFramebuffer[V]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let V=0;V<x.__webglColorRenderbuffer.length;V++)x.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[V]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=C.textures;for(let V=0,Z=B.length;V<Z;V++){const ne=n.get(B[V]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(B[V])}n.remove(C)}let D=0;function X(){D=0}function W(){return D}function U(C){D=C}function H(){const C=D;return C>=s.maxTextures&&Pe("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),D+=1,C}function O(C){const x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function q(C,x){const B=n.get(C);if(C.isVideoTexture&&N(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){const V=C.image;if(V===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(B,C,x);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function ee(C,x){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){Ie(B,C,x);return}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function ie(C,x){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){Ie(B,C,x);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function Q(C,x){const B=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&B.__version!==C.version){Ne(B,C,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}const oe={[Ki]:i.REPEAT,[vn]:i.CLAMP_TO_EDGE,[Ml]:i.MIRRORED_REPEAT},ze={[Ht]:i.NEAREST,[F0]:i.NEAREST_MIPMAP_NEAREST,[Gr]:i.NEAREST_MIPMAP_LINEAR,[Ct]:i.LINEAR,[po]:i.LINEAR_MIPMAP_NEAREST,[Wn]:i.LINEAR_MIPMAP_LINEAR},je={[B0]:i.NEVER,[H0]:i.ALWAYS,[z0]:i.LESS,[Nc]:i.LEQUAL,[k0]:i.EQUAL,[Fc]:i.GEQUAL,[V0]:i.GREATER,[G0]:i.NOTEQUAL};function Ve(C,x){if(x.type===In&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Ct||x.magFilter===po||x.magFilter===Gr||x.magFilter===Wn||x.minFilter===Ct||x.minFilter===po||x.minFilter===Gr||x.minFilter===Wn)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,oe[x.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,oe[x.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,oe[x.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ze[x.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ze[x.minFilter]),x.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,je[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ht||x.minFilter!==Gr&&x.minFilter!==Wn||x.type===In&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function J(C,x){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",A));const V=x.source;let Z=f.get(V);Z===void 0&&(Z={},f.set(V,Z));const ne=O(x);if(ne!==C.__cacheKey){Z[ne]===void 0&&(Z[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[ne].usedTimes++;const ae=Z[C.__cacheKey];ae!==void 0&&(Z[C.__cacheKey].usedTimes--,ae.usedTimes===0&&R(x)),C.__cacheKey=ne,C.__webglTexture=Z[ne].texture}return B}function re(C,x,B){return Math.floor(Math.floor(C/B)/x)}function te(C,x,B,V){const ne=C.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,B,V,x.data);else{ne.sort((ye,ue)=>ye.start-ue.start);let ae=0;for(let ye=1;ye<ne.length;ye++){const ue=ne[ae],ce=ne[ye],we=ue.start+ue.count,Ae=re(ce.start,x.width,4),Fe=re(ue.start,x.width,4);ce.start<=we+1&&Ae===Fe&&re(ce.start+ce.count-1,x.width,4)===Ae?ue.count=Math.max(ue.count,ce.start+ce.count-ue.start):(++ae,ne[ae]=ce)}ne.length=ae+1;const Y=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),le=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let ye=0,ue=ne.length;ye<ue;ye++){const ce=ne[ye],we=Math.floor(ce.start/4),Ae=Math.ceil(ce.count/4),Fe=we%x.width,L=Math.floor(we/x.width),se=Ae,$=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(i.UNPACK_SKIP_ROWS,L),t.texSubImage2D(i.TEXTURE_2D,0,Fe,L,se,$,B,V,x.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Y),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,le)}}function Ie(C,x,B){let V=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=i.TEXTURE_3D);const Z=J(C,x),ne=x.source;t.bindTexture(V,C.__webglTexture,i.TEXTURE0+B);const ae=n.get(ne);if(ne.version!==ae.__version||Z===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const $=Ge.getPrimaries(Ge.workingColorSpace),he=x.colorSpace===Cn?null:Ge.getPrimaries(x.colorSpace),me=x.colorSpace===Cn||$===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let K=g(x.image,!1,s.maxTextureSize);K=rn(x,K);const le=r.convert(x.format,x.colorSpace),ye=r.convert(x.type);let ue=_(x.internalFormat,le,ye,x.normalized,x.colorSpace,x.isVideoTexture);Ve(V,x);let ce;const we=x.mipmaps,Ae=x.isVideoTexture!==!0,Fe=ae.__version===void 0||Z===!0,L=ne.dataReady,se=w(x,K);if(x.isDepthTexture)ue=T(x.format===Zi,x.type),Fe&&(Ae?t.texStorage2D(i.TEXTURE_2D,1,ue,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,ue,K.width,K.height,0,le,ye,null));else if(x.isDataTexture)if(we.length>0){Ae&&Fe&&t.texStorage2D(i.TEXTURE_2D,se,ue,we[0].width,we[0].height);for(let $=0,he=we.length;$<he;$++)ce=we[$],Ae?L&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ce.width,ce.height,le,ye,ce.data):t.texImage2D(i.TEXTURE_2D,$,ue,ce.width,ce.height,0,le,ye,ce.data);x.generateMipmaps=!1}else Ae?(Fe&&t.texStorage2D(i.TEXTURE_2D,se,ue,K.width,K.height),L&&te(x,K,le,ye)):t.texImage2D(i.TEXTURE_2D,0,ue,K.width,K.height,0,le,ye,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ae&&Fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,ue,we[0].width,we[0].height,K.depth);for(let $=0,he=we.length;$<he;$++)if(ce=we[$],x.format!==Sn)if(le!==null)if(Ae){if(L)if(x.layerUpdates.size>0){const me=lu(ce.width,ce.height,x.format,x.type);for(const j of x.layerUpdates){const Me=ce.data.subarray(j*me/ce.data.BYTES_PER_ELEMENT,(j+1)*me/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,j,ce.width,ce.height,1,le,Me)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ce.width,ce.height,K.depth,le,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,ue,ce.width,ce.height,K.depth,0,ce.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ae?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ce.width,ce.height,K.depth,le,ye,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,ue,ce.width,ce.height,K.depth,0,le,ye,ce.data)}else{Ae&&Fe&&t.texStorage2D(i.TEXTURE_2D,se,ue,we[0].width,we[0].height);for(let $=0,he=we.length;$<he;$++)ce=we[$],x.format!==Sn?le!==null?Ae?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ce.width,ce.height,le,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,$,ue,ce.width,ce.height,0,ce.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ae?L&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ce.width,ce.height,le,ye,ce.data):t.texImage2D(i.TEXTURE_2D,$,ue,ce.width,ce.height,0,le,ye,ce.data)}else if(x.isDataArrayTexture)if(Ae){if(Fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,ue,K.width,K.height,K.depth),L)if(x.layerUpdates.size>0){const $=lu(K.width,K.height,x.format,x.type);for(const he of x.layerUpdates){const me=K.data.subarray(he*$/K.data.BYTES_PER_ELEMENT,(he+1)*$/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,he,K.width,K.height,1,le,ye,me)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,le,ye,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ue,K.width,K.height,K.depth,0,le,ye,K.data);else if(x.isData3DTexture)Ae?(Fe&&t.texStorage3D(i.TEXTURE_3D,se,ue,K.width,K.height,K.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,le,ye,K.data)):t.texImage3D(i.TEXTURE_3D,0,ue,K.width,K.height,K.depth,0,le,ye,K.data);else if(x.isFramebufferTexture){if(Fe)if(Ae)t.texStorage2D(i.TEXTURE_2D,se,ue,K.width,K.height);else{let $=K.width,he=K.height;for(let me=0;me<se;me++)t.texImage2D(i.TEXTURE_2D,me,ue,$,he,0,le,ye,null),$>>=1,he>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),d.add(x),$.onpaint=he=>{const me=he.changedElements;for(const j of d)me.includes(j.image)&&(j.needsUpdate=!0)},$.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{const me=i.RGBA,j=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,me,j,Me,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(we.length>0){if(Ae&&Fe){const $=et(we[0]);t.texStorage2D(i.TEXTURE_2D,se,ue,$.width,$.height)}for(let $=0,he=we.length;$<he;$++)ce=we[$],Ae?L&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,le,ye,ce):t.texImage2D(i.TEXTURE_2D,$,ue,le,ye,ce);x.generateMipmaps=!1}else if(Ae){if(Fe){const $=et(K);t.texStorage2D(i.TEXTURE_2D,se,ue,$.width,$.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,ye,K)}else t.texImage2D(i.TEXTURE_2D,0,ue,le,ye,K);p(x)&&y(V),ae.__version=ne.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function Ne(C,x,B){if(x.image.length!==6)return;const V=J(C,x),Z=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+B);const ne=n.get(Z);if(Z.version!==ne.__version||V===!0){t.activeTexture(i.TEXTURE0+B);const ae=Ge.getPrimaries(Ge.workingColorSpace),Y=x.colorSpace===Cn?null:Ge.getPrimaries(x.colorSpace),K=x.colorSpace===Cn||ae===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const le=x.isCompressedTexture||x.image[0].isCompressedTexture,ye=x.image[0]&&x.image[0].isDataTexture,ue=[];for(let j=0;j<6;j++)!le&&!ye?ue[j]=g(x.image[j],!0,s.maxCubemapSize):ue[j]=ye?x.image[j].image:x.image[j],ue[j]=rn(x,ue[j]);const ce=ue[0],we=r.convert(x.format,x.colorSpace),Ae=r.convert(x.type),Fe=_(x.internalFormat,we,Ae,x.normalized,x.colorSpace),L=x.isVideoTexture!==!0,se=ne.__version===void 0||V===!0,$=Z.dataReady;let he=w(x,ce);Ve(i.TEXTURE_CUBE_MAP,x);let me;if(le){L&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Fe,ce.width,ce.height);for(let j=0;j<6;j++){me=ue[j].mipmaps;for(let Me=0;Me<me.length;Me++){const xe=me[Me];x.format!==Sn?we!==null?L?$&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,xe.width,xe.height,we,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Fe,xe.width,xe.height,0,xe.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,xe.width,xe.height,we,Ae,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Fe,xe.width,xe.height,0,we,Ae,xe.data)}}}else{if(me=x.mipmaps,L&&se){me.length>0&&he++;const j=et(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Fe,j.width,j.height)}for(let j=0;j<6;j++)if(ye){L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ue[j].width,ue[j].height,we,Ae,ue[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,ue[j].width,ue[j].height,0,we,Ae,ue[j].data);for(let Me=0;Me<me.length;Me++){const mt=me[Me].image[j].image;L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,mt.width,mt.height,we,Ae,mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Fe,mt.width,mt.height,0,we,Ae,mt.data)}}else{L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,we,Ae,ue[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,we,Ae,ue[j]);for(let Me=0;Me<me.length;Me++){const xe=me[Me];L?$&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,we,Ae,xe.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Fe,we,Ae,xe.image[j])}}}p(x)&&y(i.TEXTURE_CUBE_MAP),ne.__version=Z.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function Te(C,x,B,V,Z,ne){const ae=r.convert(B.format,B.colorSpace),Y=r.convert(B.type),K=_(B.internalFormat,ae,Y,B.normalized,B.colorSpace),le=n.get(x),ye=n.get(B);if(ye.__renderTarget=x,!le.__hasExternalTextures){const ue=Math.max(1,x.width>>ne),ce=Math.max(1,x.height>>ne);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,ne,K,ue,ce,x.depth,0,ae,Y,null):t.texImage2D(Z,ne,K,ue,ce,0,ae,Y,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Et(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Z,ye.__webglTexture,0,pt(x)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Z,ye.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(C,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,C),x.depthBuffer){const V=x.depthTexture,Z=V&&V.isDepthTexture?V.type:null,ne=T(x.stencilBuffer,Z),ae=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Et(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(x),ne,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(x),ne,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ne,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,C)}else{const V=x.textures;for(let Z=0;Z<V.length;Z++){const ne=V[Z],ae=r.convert(ne.format,ne.colorSpace),Y=r.convert(ne.type),K=_(ne.internalFormat,ae,Y,ne.normalized,ne.colorSpace);Et(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(x),K,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(x),K,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,K,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ke(C,x,B){const V=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(x.depthTexture);if(Z.__renderTarget=x,(!Z.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),Z.__webglTexture===void 0){Z.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,x.depthTexture);const le=r.convert(x.depthTexture.format),ye=r.convert(x.depthTexture.type);let ue;x.depthTexture.format===pi?ue=i.DEPTH_COMPONENT24:x.depthTexture.format===Zi&&(ue=i.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,ue,x.width,x.height,0,le,ye,null)}}else q(x.depthTexture,0);const ne=Z.__webglTexture,ae=pt(x),Y=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,K=x.depthTexture.format===Zi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===pi)Et(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Y,ne,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,K,Y,ne,0);else if(x.depthTexture.format===Zi)Et(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Y,ne,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,K,Y,ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(C){const x=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){const V=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){const Z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),x.__depthDisposeCallback=Z}x.__boundDepthTexture=V}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let V=0;V<6;V++)ke(x.__webglFramebuffer[V],C,V);else{const V=C.texture.mipmaps;V&&V.length>0?ke(x.__webglFramebuffer[0],C,0):ke(x.__webglFramebuffer,C,0)}else if(B){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=i.createRenderbuffer(),xt(x.__webglDepthbuffer[V],C,!1);else{const Z=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=x.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ne)}}else{const V=C.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),xt(x.__webglDepthbuffer,C,!1);else{const Z=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ke(C,x,B){const V=n.get(C);x!==void 0&&Te(V.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&it(C)}function We(C){const x=C.texture,B=n.get(C),V=n.get(x);C.addEventListener("dispose",M);const Z=C.textures,ne=C.isWebGLCubeRenderTarget===!0,ae=Z.length>1;if(ae||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=x.version,a.memory.textures++),ne){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let K=0;K<x.mipmaps.length;K++)B.__webglFramebuffer[Y][K]=i.createFramebuffer()}else B.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<x.mipmaps.length;Y++)B.__webglFramebuffer[Y]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ae)for(let Y=0,K=Z.length;Y<K;Y++){const le=n.get(Z[Y]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Et(C)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<Z.length;Y++){const K=Z[Y];B.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);const le=r.convert(K.format,K.colorSpace),ye=r.convert(K.type),ue=_(K.internalFormat,le,ye,K.normalized,K.colorSpace,C.isXRRenderTarget===!0),ce=pt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,ue,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),xt(B.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,x);for(let Y=0;Y<6;Y++)if(x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Te(B.__webglFramebuffer[Y][K],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,K);else Te(B.__webglFramebuffer[Y],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(x)&&y(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let Y=0,K=Z.length;Y<K;Y++){const le=Z[Y],ye=n.get(le);let ue=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ue=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,ye.__webglTexture),Ve(ue,le),Te(B.__webglFramebuffer,C,le,i.COLOR_ATTACHMENT0+Y,ue,0),p(le)&&y(ue)}t.unbindTexture()}else{let Y=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Y=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Y,V.__webglTexture),Ve(Y,x),x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Te(B.__webglFramebuffer[K],C,x,i.COLOR_ATTACHMENT0,Y,K);else Te(B.__webglFramebuffer,C,x,i.COLOR_ATTACHMENT0,Y,0);p(x)&&y(Y),t.unbindTexture()}C.depthBuffer&&it(C)}function wt(C){const x=C.textures;for(let B=0,V=x.length;B<V;B++){const Z=x[B];if(p(Z)){const ne=E(C),ae=n.get(Z).__webglTexture;t.bindTexture(ne,ae),y(ne),t.unbindTexture()}}}const Rt=[],Bt=[];function kt(C){if(C.samples>0){if(Et(C)===!1){const x=C.textures,B=C.width,V=C.height;let Z=i.COLOR_BUFFER_BIT;const ne=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=n.get(C),Y=x.length>1;if(Y)for(let le=0;le<x.length;le++)t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);const K=C.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let le=0;le<x.length;le++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);const ye=n.get(x[le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ye,0)}i.blitFramebuffer(0,0,B,V,0,0,B,V,Z,i.NEAREST),l===!0&&(Rt.length=0,Bt.length=0,Rt.push(i.COLOR_ATTACHMENT0+le),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Rt.push(ne),Bt.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Bt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Rt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let le=0;le<x.length;le++){t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,ae.__webglColorRenderbuffer[le]);const ye=n.get(x[le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,ye,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const x=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function pt(C){return Math.min(s.maxSamples,C.samples)}function Et(C){const x=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function N(C){const x=a.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function rn(C,x){const B=C.colorSpace,V=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==za&&B!==Cn&&(Ge.getTransfer(B)===tt?(V!==Sn||Z!==un)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",B)),x}function et(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=X,this.getTextureUnits=W,this.setTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=ee,this.setTexture3D=ie,this.setTextureCube=Q,this.rebindTextures=Ke,this.setupRenderTarget=We,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function vy(i,e){function t(n,s=Cn){let r;const a=Ge.getTransfer(s);if(n===un)return i.UNSIGNED_BYTE;if(n===Cc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Rc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Kd)return i.BYTE;if(n===Jd)return i.SHORT;if(n===Ar)return i.UNSIGNED_SHORT;if(n===Ac)return i.INT;if(n===Jn)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===fi)return i.HALF_FLOAT;if(n===ef)return i.ALPHA;if(n===tf)return i.RGB;if(n===Sn)return i.RGBA;if(n===pi)return i.DEPTH_COMPONENT;if(n===Zi)return i.DEPTH_STENCIL;if(n===Pc)return i.RED;if(n===Ic)return i.RED_INTEGER;if(n===Ji)return i.RG;if(n===Lc)return i.RG_INTEGER;if(n===Dc)return i.RGBA_INTEGER;if(n===Ea||n===Ta||n===Aa||n===Ca)if(a===tt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ea)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ea)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===yl||n===Sl||n===bl||n===wl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===yl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===bl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===El||n===Tl||n===Al||n===Cl||n===Rl||n===Ua||n===Pl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===El||n===Tl)return a===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Al)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Cl)return r.COMPRESSED_R11_EAC;if(n===Rl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ua)return r.COMPRESSED_RG11_EAC;if(n===Pl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Il||n===Ll||n===Dl||n===Nl||n===Fl||n===Ul||n===Ol||n===Bl||n===zl||n===kl||n===Vl||n===Gl||n===Hl||n===Xl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Il)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ll)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Dl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Nl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ul)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ol)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Gl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Hl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xl)return a===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Wl||n===ql||n===Zl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Wl)return a===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ql)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Yl||n===$l||n===Oa||n===Kl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Yl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===$l)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Oa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Kl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Cr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const xy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_y=`
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

}`;class My{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new uf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new bn({vertexShader:xy,fragmentShader:_y,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Je(new Qa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class yy extends ji{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null;const v=typeof XRWebGLBinding<"u",g=new My,p={},y=t.getContextAttributes();let E=null,_=null;const T=[],w=[],A=new Le;let M=null;const b=new cn;b.viewport=new ft;const R=new cn;R.viewport=new ft;const P=[b,R],D=new Ig;let X=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let re=T[J];return re===void 0&&(re=new So,T[J]=re),re.getTargetRaySpace()},this.getControllerGrip=function(J){let re=T[J];return re===void 0&&(re=new So,T[J]=re),re.getGripSpace()},this.getHand=function(J){let re=T[J];return re===void 0&&(re=new So,T[J]=re),re.getHandSpace()};function U(J){const re=w.indexOf(J.inputSource);if(re===-1)return;const te=T[re];te!==void 0&&(te.update(J.inputSource,J.frame,c||a),te.dispatchEvent({type:J.type,data:J.inputSource}))}function H(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",O);for(let J=0;J<T.length;J++){const re=w[J];re!==null&&(w[J]=null,T[J].disconnect(re))}X=null,W=null,g.reset();for(const J in p)delete p[J];e.setRenderTarget(E),f=null,u=null,d=null,s=null,_=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",H),s.addEventListener("inputsourceschange",O),y.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,Ie=null,Ne=null;y.depth&&(Ne=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=y.stencil?Zi:pi,Ie=y.stencil?Cr:Jn);const Te={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Te),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new Ln(u.textureWidth,u.textureHeight,{format:Sn,type:un,depthTexture:new Zs(u.textureWidth,u.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const te={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Ln(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:un,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ve.setContext(s),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function O(J){for(let re=0;re<J.removed.length;re++){const te=J.removed[re],Ie=w.indexOf(te);Ie>=0&&(w[Ie]=null,T[Ie].disconnect(te))}for(let re=0;re<J.added.length;re++){const te=J.added[re];let Ie=w.indexOf(te);if(Ie===-1){for(let Te=0;Te<T.length;Te++)if(Te>=w.length){w.push(te),Ie=Te;break}else if(w[Te]===null){w[Te]=te,Ie=Te;break}if(Ie===-1)break}const Ne=T[Ie];Ne&&Ne.connect(te)}}const q=new I,ee=new I;function ie(J,re,te){q.setFromMatrixPosition(re.matrixWorld),ee.setFromMatrixPosition(te.matrixWorld);const Ie=q.distanceTo(ee),Ne=re.projectionMatrix.elements,Te=te.projectionMatrix.elements,xt=Ne[14]/(Ne[10]-1),ke=Ne[14]/(Ne[10]+1),it=(Ne[9]+1)/Ne[5],Ke=(Ne[9]-1)/Ne[5],We=(Ne[8]-1)/Ne[0],wt=(Te[8]+1)/Te[0],Rt=xt*We,Bt=xt*wt,kt=Ie/(-We+wt),pt=kt*-We;if(re.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(pt),J.translateZ(kt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ne[10]===-1)J.projectionMatrix.copy(re.projectionMatrix),J.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const Et=xt+kt,N=ke+kt,rn=Rt-pt,et=Bt+(Ie-pt),C=it*ke/N*Et,x=Ke*ke/N*Et;J.projectionMatrix.makePerspective(rn,et,C,x,Et,N),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Q(J,re){re===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(re.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let re=J.near,te=J.far;g.texture!==null&&(g.depthNear>0&&(re=g.depthNear),g.depthFar>0&&(te=g.depthFar)),D.near=R.near=b.near=re,D.far=R.far=b.far=te,(X!==D.near||W!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),X=D.near,W=D.far),D.layers.mask=J.layers.mask|6,b.layers.mask=D.layers.mask&-5,R.layers.mask=D.layers.mask&-3;const Ie=J.parent,Ne=D.cameras;Q(D,Ie);for(let Te=0;Te<Ne.length;Te++)Q(Ne[Te],Ie);Ne.length===2?ie(D,b,R):D.projectionMatrix.copy(b.projectionMatrix),oe(J,D,Ie)};function oe(J,re,te){te===null?J.matrix.copy(re.matrixWorld):(J.matrix.copy(te.matrixWorld),J.matrix.invert(),J.matrix.multiply(re.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(re.projectionMatrix),J.projectionMatrixInverse.copy(re.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ql*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(J){return p[J]};let ze=null;function je(J,re){if(h=re.getViewerPose(c||a),m=re,h!==null){const te=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let Ie=!1;te.length!==D.cameras.length&&(D.cameras.length=0,Ie=!0);for(let ke=0;ke<te.length;ke++){const it=te[ke];let Ke=null;if(f!==null)Ke=f.getViewport(it);else{const wt=d.getViewSubImage(u,it);Ke=wt.viewport,ke===0&&(e.setRenderTargetTextures(_,wt.colorTexture,wt.depthStencilTexture),e.setRenderTarget(_))}let We=P[ke];We===void 0&&(We=new cn,We.layers.enable(ke),We.viewport=new ft,P[ke]=We),We.matrix.fromArray(it.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(it.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),ke===0&&(D.matrix.copy(We.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Ie===!0&&D.cameras.push(We)}const Ne=s.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const ke=d.getDepthInformation(te[0]);ke&&ke.isValid&&ke.texture&&g.init(ke,s.renderState)}if(Ne&&Ne.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let ke=0;ke<te.length;ke++){const it=te[ke].camera;if(it){let Ke=p[it];Ke||(Ke=new uf,p[it]=Ke);const We=d.getCameraImage(it);Ke.sourceTexture=We}}}}for(let te=0;te<T.length;te++){const Ie=w[te],Ne=T[te];Ie!==null&&Ne!==void 0&&Ne.update(Ie,re,c||a)}ze&&ze(J,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),m=null}const Ve=new gf;Ve.setAnimationLoop(je),this.setAnimationLoop=function(J){ze=J},this.dispose=function(){}}}const Sy=new Xe,bf=new De;bf.set(-1,0,0,0,1,0,0,0,1);function by(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,df(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,E,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,y,E):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===nn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===nn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),E=y.envMap,_=y.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(Sy.makeRotationFromEuler(_)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(bf),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=E*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===nn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function wy(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,T){const w=T.program;n.uniformBlockBinding(_,w)}function c(_,T){let w=s[_.id];w===void 0&&(g(_),w=h(_),s[_.id]=w,_.addEventListener("dispose",y));const A=T.program;n.updateUBOMapping(_,A);const M=e.render.frame;r[_.id]!==M&&(u(_),r[_.id]=M)}function h(_){const T=d();_.__bindingPointIndex=T;const w=i.createBuffer(),A=_.__size,M=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,A,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,w),w}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const T=s[_.id],w=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let M=0,b=w.length;M<b;M++){const R=w[M];if(Array.isArray(R))for(let P=0,D=R.length;P<D;P++)f(R[P],M,P,A);else f(R,M,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,T,w,A){if(v(_,T,w,A)===!0){const M=_.__offset,b=_.value;if(Array.isArray(b)){let R=0;for(let P=0;P<b.length;P++){const D=b[P],X=p(D);m(D,_.__data,R),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(R+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(b,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,_.__data)}}function m(_,T,w){typeof _=="number"||typeof _=="boolean"?T[0]=_:_.isMatrix3?(T[0]=_.elements[0],T[1]=_.elements[1],T[2]=_.elements[2],T[3]=0,T[4]=_.elements[3],T[5]=_.elements[4],T[6]=_.elements[5],T[7]=0,T[8]=_.elements[6],T[9]=_.elements[7],T[10]=_.elements[8],T[11]=0):ArrayBuffer.isView(_)?T.set(new _.constructor(_.buffer,_.byteOffset,T.length)):_.toArray(T,w)}function v(_,T,w,A){const M=_.value,b=T+"_"+w;if(A[b]===void 0)return typeof M=="number"||typeof M=="boolean"?A[b]=M:ArrayBuffer.isView(M)?A[b]=M.slice():A[b]=M.clone(),!0;{const R=A[b];if(typeof M=="number"||typeof M=="boolean"){if(R!==M)return A[b]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(R.equals(M)===!1)return R.copy(M),!0}}return!1}function g(_){const T=_.uniforms;let w=0;const A=16;for(let b=0,R=T.length;b<R;b++){const P=Array.isArray(T[b])?T[b]:[T[b]];for(let D=0,X=P.length;D<X;D++){const W=P[D],U=Array.isArray(W.value)?W.value:[W.value];for(let H=0,O=U.length;H<O;H++){const q=U[H],ee=p(q),ie=w%A,Q=ie%ee.boundary,oe=ie+Q;w+=Q,oe!==0&&A-oe<ee.storage&&(w+=A-oe),W.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=w,w+=ee.storage}}}const M=w%A;return M>0&&(w+=A-M),_.__size=w,_.__cache={},this}function p(_){const T={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(T.boundary=4,T.storage=4):_.isVector2?(T.boundary=8,T.storage=8):_.isVector3||_.isColor?(T.boundary=16,T.storage=12):_.isVector4?(T.boundary=16,T.storage=16):_.isMatrix3?(T.boundary=48,T.storage=48):_.isMatrix4?(T.boundary=64,T.storage=64):_.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(T.boundary=16,T.storage=_.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",_),T}function y(_){const T=_.target;T.removeEventListener("dispose",y);const w=a.indexOf(T.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function E(){for(const _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:E}}const Ey=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let zn=null;function Ty(){return zn===null&&(zn=new cf(Ey,16,16,Ji,fi),zn.name="DFG_LUT",zn.minFilter=Ct,zn.magFilter=Ct,zn.wrapS=vn,zn.wrapT=vn,zn.generateMipmaps=!1,zn.needsUpdate=!0),zn}class Ay{constructor(e={}){const{canvas:t=W0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=un}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const v=f,g=new Set([Dc,Lc,Ic]),p=new Set([un,Jn,Ar,Cr,Cc,Rc]),y=new Uint32Array(4),E=new Int32Array(4),_=new I;let T=null,w=null;const A=[],M=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let P=!1,D=null,X=null,W=null,U=null;this._outputColorSpace=tn;let H=0,O=0,q=null,ee=-1,ie=null;const Q=new ft,oe=new ft;let ze=null;const je=new Re(0);let Ve=0,J=t.width,re=t.height,te=1,Ie=null,Ne=null;const Te=new ft(0,0,J,re),xt=new ft(0,0,J,re);let ke=!1;const it=new Bc;let Ke=!1,We=!1;const wt=new Xe,Rt=new I,Bt=new ft,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function Et(){return q===null?te:1}let N=n;function rn(S,F){return t.getContext(S,F)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wc}`),t.addEventListener("webglcontextlost",mt,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",Fn,!1),N===null){const F="webgl2";if(N=rn(F,S),N===null)throw rn(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw Ze("WebGLRenderer: "+S.message),S}let et,C,x,B,V,Z,ne,ae,Y,K,le,ye,ue,ce,we,Ae,Fe,L,se,$,he,me,j;function Me(){et=new T_(N),et.init(),he=new vy(N,et),C=new x_(N,et,e,he),x=new my(N,et),C.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),X=N.createFramebuffer(),W=N.createFramebuffer(),U=N.createFramebuffer(),B=new R_(N),V=new ty,Z=new gy(N,et,x,V,C,he,B),ne=new E_(R),ae=new Dg(N),me=new g_(N,ae),Y=new A_(N,ae,B,me),K=new I_(N,Y,ae,me,B),L=new P_(N,C,Z),we=new __(V),le=new ey(R,ne,et,C,me,we),ye=new by(R,V),ue=new iy,ce=new cy(et),Fe=new m_(R,ne,x,K,m,l),Ae=new py(R,K,C),j=new wy(N,B,C,x),se=new v_(N,et,B),$=new C_(N,et,B),B.programs=le.programs,R.capabilities=C,R.extensions=et,R.properties=V,R.renderLists=ue,R.shadowMap=Ae,R.state=x,R.info=B}Me(),v!==un&&(b=new D_(v,t.width,t.height,o,s,r));const xe=new yy(R,N);this.xr=xe,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=et.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=et.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(S){S!==void 0&&(te=S,this.setSize(J,re,!1))},this.getSize=function(S){return S.set(J,re)},this.setSize=function(S,F,G=!0){if(xe.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}J=S,re=F,t.width=Math.floor(S*te),t.height=Math.floor(F*te),G===!0&&(t.style.width=S+"px",t.style.height=F+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(J*te,re*te).floor()},this.setDrawingBufferSize=function(S,F,G){J=S,re=F,te=G,t.width=Math.floor(S*G),t.height=Math.floor(F*G),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(v===un){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(Q)},this.getViewport=function(S){return S.copy(Te)},this.setViewport=function(S,F,G,z){S.isVector4?Te.set(S.x,S.y,S.z,S.w):Te.set(S,F,G,z),x.viewport(Q.copy(Te).multiplyScalar(te).round())},this.getScissor=function(S){return S.copy(xt)},this.setScissor=function(S,F,G,z){S.isVector4?xt.set(S.x,S.y,S.z,S.w):xt.set(S,F,G,z),x.scissor(oe.copy(xt).multiplyScalar(te).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(S){x.setScissorTest(ke=S)},this.setOpaqueSort=function(S){Ie=S},this.setTransparentSort=function(S){Ne=S},this.getClearColor=function(S){return S.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,G=!0){let z=0;if(S){let k=!1;if(q!==null){const pe=q.texture.format;k=g.has(pe)}if(k){const pe=q.texture.type,ve=p.has(pe),fe=Fe.getClearColor(),_e=Fe.getClearAlpha(),Se=fe.r,Ue=fe.g,Be=fe.b;ve?(y[0]=Se,y[1]=Ue,y[2]=Be,y[3]=_e,N.clearBufferuiv(N.COLOR,0,y)):(E[0]=Se,E[1]=Ue,E[2]=Be,E[3]=_e,N.clearBufferiv(N.COLOR,0,E))}else z|=N.COLOR_BUFFER_BIT}F&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),D=S},this.dispose=function(){t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",Fn,!1),Fe.dispose(),ue.dispose(),ce.dispose(),V.dispose(),ne.dispose(),K.dispose(),me.dispose(),j.dispose(),le.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",Jc),xe.removeEventListener("sessionend",Qc),Di.stop()};function mt(S){S.preventDefault(),Bh("WebGLRenderer: Context Lost."),P=!0}function lt(){Bh("WebGLRenderer: Context Restored."),P=!1;const S=B.autoReset,F=Ae.enabled,G=Ae.autoUpdate,z=Ae.needsUpdate,k=Ae.type;Me(),B.autoReset=S,Ae.enabled=F,Ae.autoUpdate=G,Ae.needsUpdate=z,Ae.type=k}function Fn(S){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Un(S){const F=S.target;F.removeEventListener("dispose",Un),Gf(F)}function Gf(S){Hf(S),V.remove(S)}function Hf(S){const F=V.get(S).programs;F!==void 0&&(F.forEach(function(G){le.releaseProgram(G)}),S.isShaderMaterial&&le.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,G,z,k,pe){F===null&&(F=kt);const ve=k.isMesh&&k.matrixWorld.determinantAffine()<0,fe=qf(S,F,G,z,k);x.setMaterial(z,ve);let _e=G.index,Se=1;if(z.wireframe===!0){if(_e=Y.getWireframeAttribute(G),_e===void 0)return;Se=2}const Ue=G.drawRange,Be=G.attributes.position;let be=Ue.start*Se,nt=(Ue.start+Ue.count)*Se;pe!==null&&(be=Math.max(be,pe.start*Se),nt=Math.min(nt,(pe.start+pe.count)*Se)),_e!==null?(be=Math.max(be,0),nt=Math.min(nt,_e.count)):Be!=null&&(be=Math.max(be,0),nt=Math.min(nt,Be.count));const _t=nt-be;if(_t<0||_t===1/0)return;me.setup(k,z,fe,G,_e);let gt,st=se;if(_e!==null&&(gt=ae.get(_e),st=$,st.setIndex(gt)),k.isMesh)z.wireframe===!0?(x.setLineWidth(z.wireframeLinewidth*Et()),st.setMode(N.LINES)):st.setMode(N.TRIANGLES);else if(k.isLine){let Wt=z.linewidth;Wt===void 0&&(Wt=1),x.setLineWidth(Wt*Et()),k.isLineSegments?st.setMode(N.LINES):k.isLineLoop?st.setMode(N.LINE_LOOP):st.setMode(N.LINE_STRIP)}else k.isPoints?st.setMode(N.POINTS):k.isSprite&&st.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(et.get("WEBGL_multi_draw"))st.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Wt=k._multiDrawStarts,ge=k._multiDrawCounts,dn=k._multiDrawCount,qe=_e?ae.get(_e).bytesPerElement:1,_n=V.get(z).currentProgram.getUniforms();for(let On=0;On<dn;On++)_n.setValue(N,"_gl_DrawID",On),st.render(Wt[On]/qe,ge[On])}else if(k.isInstancedMesh)st.renderInstances(be,_t,k.count);else if(G.isInstancedBufferGeometry){const Wt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ge=Math.min(G.instanceCount,Wt);st.renderInstances(be,_t,ge)}else st.render(be,_t)};function Kc(S,F,G){S.transparent===!0&&S.side===gn&&S.forceSinglePass===!1?(S.side=nn,S.needsUpdate=!0,Or(S,F,G),S.side=di,S.needsUpdate=!0,Or(S,F,G),S.side=gn):Or(S,F,G)}this.compile=function(S,F,G=null){G===null&&(G=S),w=ce.get(G),w.init(F),M.push(w),G.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(w.pushLight(k),k.castShadow&&w.pushShadow(k))}),S!==G&&S.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(w.pushLight(k),k.castShadow&&w.pushShadow(k))}),w.setupLights();const z=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const pe=k.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){const fe=pe[ve];Kc(fe,G,k),z.add(fe)}else Kc(pe,G,k),z.add(pe)}),w=M.pop(),z},this.compileAsync=function(S,F,G=null){const z=this.compile(S,F,G);return new Promise(k=>{function pe(){if(z.forEach(function(ve){V.get(ve).currentProgram.isReady()&&z.delete(ve)}),z.size===0){k(S);return}setTimeout(pe,10)}et.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let ro=null;function Xf(S){ro&&ro(S)}function Jc(){Di.stop()}function Qc(){Di.start()}const Di=new gf;Di.setAnimationLoop(Xf),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(S){ro=S,xe.setAnimationLoop(S),S===null?Di.stop():Di.start()},xe.addEventListener("sessionstart",Jc),xe.addEventListener("sessionend",Qc),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(S,F);const G=xe.enabled===!0&&xe.isPresenting===!0,z=b!==null&&(q===null||G)&&b.begin(R,q);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(F),F=xe.getCamera()),S.isScene===!0&&S.onBeforeRender(R,S,F,q),w=ce.get(S,M.length),w.init(F),w.state.textureUnits=Z.getTextureUnits(),M.push(w),wt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),it.setFromProjectionMatrix(wt,qn,F.reversedDepth),We=this.localClippingEnabled,Ke=we.init(this.clippingPlanes,We),T=ue.get(S,A.length),T.init(),A.push(T),xe.enabled===!0&&xe.isPresenting===!0){const ve=R.xr.getDepthSensingMesh();ve!==null&&ao(ve,F,-1/0,R.sortObjects)}ao(S,F,0,R.sortObjects),T.finish(),R.sortObjects===!0&&T.sort(Ie,Ne,F.reversedDepth),pt=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,pt&&Fe.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&we.beginShadows();const k=w.state.shadowsArray;if(Ae.render(k,S,F),Ke===!0&&we.endShadows(),(z&&b.hasRenderPass())===!1){const ve=T.opaque,fe=T.transmissive;if(w.setupLights(),F.isArrayCamera){const _e=F.cameras;if(fe.length>0)for(let Se=0,Ue=_e.length;Se<Ue;Se++){const Be=_e[Se];eh(ve,fe,S,Be)}pt&&Fe.render(S);for(let Se=0,Ue=_e.length;Se<Ue;Se++){const Be=_e[Se];jc(T,S,Be,Be.viewport)}}else fe.length>0&&eh(ve,fe,S,F),pt&&Fe.render(S),jc(T,S,F)}q!==null&&O===0&&(Z.updateMultisampleRenderTarget(q),Z.updateRenderTargetMipmap(q)),z&&b.end(R),S.isScene===!0&&S.onAfterRender(R,S,F),me.resetDefaultState(),ee=-1,ie=null,M.pop(),M.length>0?(w=M[M.length-1],Z.setTextureUnits(w.state.textureUnits),Ke===!0&&we.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?T=A[A.length-1]:T=null,D!==null&&D.renderEnd()};function ao(S,F,G,z){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)w.pushLightProbeGrid(S);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||it.intersectsSprite(S)){z&&Bt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(wt);const ve=K.update(S),fe=S.material;fe.visible&&T.push(S,ve,fe,G,Bt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||it.intersectsObject(S))){const ve=K.update(S),fe=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Bt.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Bt.copy(ve.boundingSphere.center)),Bt.applyMatrix4(S.matrixWorld).applyMatrix4(wt)),Array.isArray(fe)){const _e=ve.groups;for(let Se=0,Ue=_e.length;Se<Ue;Se++){const Be=_e[Se],be=fe[Be.materialIndex];be&&be.visible&&T.push(S,ve,be,G,Bt.z,Be)}}else fe.visible&&T.push(S,ve,fe,G,Bt.z,null)}}const pe=S.children;for(let ve=0,fe=pe.length;ve<fe;ve++)ao(pe[ve],F,G,z)}function jc(S,F,G,z){const{opaque:k,transmissive:pe,transparent:ve}=S;w.setupLightsView(G),Ke===!0&&we.setGlobalState(R.clippingPlanes,G),z&&x.viewport(Q.copy(z)),k.length>0&&Ur(k,F,G),pe.length>0&&Ur(pe,F,G),ve.length>0&&Ur(ve,F,G),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function eh(S,F,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[z.id]===void 0){const be=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[z.id]=new Ln(1,1,{generateMipmaps:!0,type:be?fi:un,minFilter:Wn,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ge.workingColorSpace})}const pe=w.state.transmissionRenderTarget[z.id],ve=z.viewport||Q;pe.setSize(ve.z*R.transmissionResolutionScale,ve.w*R.transmissionResolutionScale);const fe=R.getRenderTarget(),_e=R.getActiveCubeFace(),Se=R.getActiveMipmapLevel();R.setRenderTarget(pe),R.getClearColor(je),Ve=R.getClearAlpha(),Ve<1&&R.setClearColor(16777215,.5),R.clear(),pt&&Fe.render(G);const Ue=R.toneMapping;R.toneMapping=Yn;const Be=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),w.setupLightsView(z),Ke===!0&&we.setGlobalState(R.clippingPlanes,z),Ur(S,G,z),Z.updateMultisampleRenderTarget(pe),Z.updateRenderTargetMipmap(pe),et.has("WEBGL_multisampled_render_to_texture")===!1){let be=!1;for(let nt=0,_t=F.length;nt<_t;nt++){const gt=F[nt],{object:st,geometry:Wt,material:ge,group:dn}=gt;if(ge.side===gn&&st.layers.test(z.layers)){const qe=ge.side;ge.side=nn,ge.needsUpdate=!0,th(st,G,z,Wt,ge,dn),ge.side=qe,ge.needsUpdate=!0,be=!0}}be===!0&&(Z.updateMultisampleRenderTarget(pe),Z.updateRenderTargetMipmap(pe))}R.setRenderTarget(fe,_e,Se),R.setClearColor(je,Ve),Be!==void 0&&(z.viewport=Be),R.toneMapping=Ue}function Ur(S,F,G){const z=F.isScene===!0?F.overrideMaterial:null;for(let k=0,pe=S.length;k<pe;k++){const ve=S[k],{object:fe,geometry:_e,group:Se}=ve;let Ue=ve.material;Ue.allowOverride===!0&&z!==null&&(Ue=z),fe.layers.test(G.layers)&&th(fe,F,G,_e,Ue,Se)}}function th(S,F,G,z,k,pe){S.onBeforeRender(R,F,G,z,k,pe),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(R,F,G,z,S,pe),k.transparent===!0&&k.side===gn&&k.forceSinglePass===!1?(k.side=nn,k.needsUpdate=!0,R.renderBufferDirect(G,F,z,k,S,pe),k.side=di,k.needsUpdate=!0,R.renderBufferDirect(G,F,z,k,S,pe),k.side=gn):R.renderBufferDirect(G,F,z,k,S,pe),S.onAfterRender(R,F,G,z,k,pe)}function Or(S,F,G){F.isScene!==!0&&(F=kt);const z=V.get(S),k=w.state.lights,pe=w.state.shadowsArray,ve=k.state.version,fe=le.getParameters(S,k.state,pe,F,G,w.state.lightProbeGridArray),_e=le.getProgramCacheKey(fe);let Se=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,z.fog=F.fog;const Ue=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=ne.get(S.envMap||z.environment,Ue),z.envMapRotation=z.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Se===void 0&&(S.addEventListener("dispose",Un),Se=new Map,z.programs=Se);let Be=Se.get(_e);if(Be!==void 0){if(z.currentProgram===Be&&z.lightsStateVersion===ve)return ih(S,fe),Be}else fe.uniforms=le.getUniforms(S),D!==null&&S.isNodeMaterial&&D.build(S,G,fe),S.onBeforeCompile(fe,R),Be=le.acquireProgram(fe,_e),Se.set(_e,Be),z.uniforms=fe.uniforms;const be=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(be.clippingPlanes=we.uniform),ih(S,fe),z.needsLights=Yf(S),z.lightsStateVersion=ve,z.needsLights&&(be.ambientLightColor.value=k.state.ambient,be.lightProbe.value=k.state.probe,be.directionalLights.value=k.state.directional,be.directionalLightShadows.value=k.state.directionalShadow,be.spotLights.value=k.state.spot,be.spotLightShadows.value=k.state.spotShadow,be.rectAreaLights.value=k.state.rectArea,be.ltc_1.value=k.state.rectAreaLTC1,be.ltc_2.value=k.state.rectAreaLTC2,be.pointLights.value=k.state.point,be.pointLightShadows.value=k.state.pointShadow,be.hemisphereLights.value=k.state.hemi,be.directionalShadowMatrix.value=k.state.directionalShadowMatrix,be.spotLightMatrix.value=k.state.spotLightMatrix,be.spotLightMap.value=k.state.spotLightMap,be.pointShadowMatrix.value=k.state.pointShadowMatrix),z.lightProbeGrid=w.state.lightProbeGridArray.length>0,z.currentProgram=Be,z.uniformsList=null,Be}function nh(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=Ra.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function ih(S,F){const G=V.get(S);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Wf(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;_.setFromMatrixPosition(F.matrixWorld);for(let G=0,z=S.length;G<z;G++){const k=S[G];if(k.texture!==null&&k.boundingBox.containsPoint(_))return k}return null}function qf(S,F,G,z,k){F.isScene!==!0&&(F=kt),Z.resetTextureUnits();const pe=F.fog,ve=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?F.environment:null,fe=q===null?R.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Ge.workingColorSpace,_e=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Se=ne.get(z.envMap||ve,_e),Ue=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Be=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),be=!!G.morphAttributes.position,nt=!!G.morphAttributes.normal,_t=!!G.morphAttributes.color;let gt=Yn;z.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(gt=R.toneMapping);const st=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Wt=st!==void 0?st.length:0,ge=V.get(z),dn=w.state.lights;if(Ke===!0&&(We===!0||S!==ie)){const ct=S===ie&&z.id===ee;we.setState(z,S,ct)}let qe=!1;z.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==dn.state.version||ge.outputColorSpace!==fe||k.isBatchedMesh&&ge.batching===!1||!k.isBatchedMesh&&ge.batching===!0||k.isBatchedMesh&&ge.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&ge.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&ge.instancing===!1||!k.isInstancedMesh&&ge.instancing===!0||k.isSkinnedMesh&&ge.skinning===!1||!k.isSkinnedMesh&&ge.skinning===!0||k.isInstancedMesh&&ge.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&ge.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&ge.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&ge.instancingMorph===!1&&k.morphTexture!==null||ge.envMap!==Se||z.fog===!0&&ge.fog!==pe||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==we.numPlanes||ge.numIntersection!==we.numIntersection)||ge.vertexAlphas!==Ue||ge.vertexTangents!==Be||ge.morphTargets!==be||ge.morphNormals!==nt||ge.morphColors!==_t||ge.toneMapping!==gt||ge.morphTargetsCount!==Wt||!!ge.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(qe=!0):(qe=!0,ge.__version=z.version);let _n=ge.currentProgram;qe===!0&&(_n=Or(z,F,k),D&&z.isNodeMaterial&&D.onUpdateProgram(z,_n,ge));let On=!1,mi=!1,is=!1;const rt=_n.getUniforms(),Mt=ge.uniforms;if(x.useProgram(_n.program)&&(On=!0,mi=!0,is=!0),z.id!==ee&&(ee=z.id,mi=!0),ge.needsLights){const ct=Wf(w.state.lightProbeGridArray,k);ge.lightProbeGrid!==ct&&(ge.lightProbeGrid=ct,mi=!0)}if(On||ie!==S){x.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),rt.setValue(N,"projectionMatrix",S.projectionMatrix),rt.setValue(N,"viewMatrix",S.matrixWorldInverse);const vi=rt.map.cameraPosition;vi!==void 0&&vi.setValue(N,Rt.setFromMatrixPosition(S.matrixWorld)),C.logarithmicDepthBuffer&&rt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&rt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),ie!==S&&(ie=S,mi=!0,is=!0)}if(ge.needsLights&&(dn.state.directionalShadowMap.length>0&&rt.setValue(N,"directionalShadowMap",dn.state.directionalShadowMap,Z),dn.state.spotShadowMap.length>0&&rt.setValue(N,"spotShadowMap",dn.state.spotShadowMap,Z),dn.state.pointShadowMap.length>0&&rt.setValue(N,"pointShadowMap",dn.state.pointShadowMap,Z)),k.isSkinnedMesh){rt.setOptional(N,k,"bindMatrix"),rt.setOptional(N,k,"bindMatrixInverse");const ct=k.skeleton;ct&&(ct.boneTexture===null&&ct.computeBoneTexture(),rt.setValue(N,"boneTexture",ct.boneTexture,Z))}k.isBatchedMesh&&(rt.setOptional(N,k,"batchingTexture"),rt.setValue(N,"batchingTexture",k._matricesTexture,Z),rt.setOptional(N,k,"batchingIdTexture"),rt.setValue(N,"batchingIdTexture",k._indirectTexture,Z),rt.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&rt.setValue(N,"batchingColorTexture",k._colorsTexture,Z));const gi=G.morphAttributes;if((gi.position!==void 0||gi.normal!==void 0||gi.color!==void 0)&&L.update(k,G,_n),(mi||ge.receiveShadow!==k.receiveShadow)&&(ge.receiveShadow=k.receiveShadow,rt.setValue(N,"receiveShadow",k.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&F.environment!==null&&(Mt.envMapIntensity.value=F.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=Ty()),mi){if(rt.setValue(N,"toneMappingExposure",R.toneMappingExposure),ge.needsLights&&Zf(Mt,is),pe&&z.fog===!0&&ye.refreshFogUniforms(Mt,pe),ye.refreshMaterialUniforms(Mt,z,te,re,w.state.transmissionRenderTarget[S.id]),ge.needsLights&&ge.lightProbeGrid){const ct=ge.lightProbeGrid;Mt.probesSH.value=ct.texture,Mt.probesMin.value.copy(ct.boundingBox.min),Mt.probesMax.value.copy(ct.boundingBox.max),Mt.probesResolution.value.copy(ct.resolution)}Ra.upload(N,nh(ge),Mt,Z)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ra.upload(N,nh(ge),Mt,Z),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&rt.setValue(N,"center",k.center),rt.setValue(N,"modelViewMatrix",k.modelViewMatrix),rt.setValue(N,"normalMatrix",k.normalMatrix),rt.setValue(N,"modelMatrix",k.matrixWorld),z.uniformsGroups!==void 0){const ct=z.uniformsGroups;for(let vi=0,ss=ct.length;vi<ss;vi++){const sh=ct[vi];j.update(sh,_n),j.bind(sh,_n)}}return _n}function Zf(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function Yf(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(S,F,G){const z=V.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),V.get(S.texture).__webglTexture=F,V.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){const G=V.get(S);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,G=0){q=S,H=F,O=G;let z=null,k=!1,pe=!1;if(S){const fe=V.get(S);if(fe.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(N.FRAMEBUFFER,fe.__webglFramebuffer),Q.copy(S.viewport),oe.copy(S.scissor),ze=S.scissorTest,x.viewport(Q),x.scissor(oe),x.setScissorTest(ze),ee=-1;return}else if(fe.__webglFramebuffer===void 0)Z.setupRenderTarget(S);else if(fe.__hasExternalTextures)Z.rebindTextures(S,V.get(S.texture).__webglTexture,V.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ue=S.depthTexture;if(fe.__boundDepthTexture!==Ue){if(Ue!==null&&V.has(Ue)&&(S.width!==Ue.image.width||S.height!==Ue.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(S)}}const _e=S.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(pe=!0);const Se=V.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Se[F])?z=Se[F][G]:z=Se[F],k=!0):S.samples>0&&Z.useMultisampledRTT(S)===!1?z=V.get(S).__webglMultisampledFramebuffer:Array.isArray(Se)?z=Se[G]:z=Se,Q.copy(S.viewport),oe.copy(S.scissor),ze=S.scissorTest}else Q.copy(Te).multiplyScalar(te).floor(),oe.copy(xt).multiplyScalar(te).floor(),ze=ke;if(G!==0&&(z=X),x.bindFramebuffer(N.FRAMEBUFFER,z)&&x.drawBuffers(S,z),x.viewport(Q),x.scissor(oe),x.setScissorTest(ze),k){const fe=V.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,fe.__webglTexture,G)}else if(pe){const fe=F;for(let _e=0;_e<S.textures.length;_e++){const Se=V.get(S.textures[_e]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+_e,Se.__webglTexture,G,fe)}}else if(S!==null&&G!==0){const fe=V.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,G)}ee=-1},this.readRenderTargetPixels=function(S,F,G,z,k,pe,ve,fe=0){if(!(S&&S.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(_e=_e[ve]),_e){x.bindFramebuffer(N.FRAMEBUFFER,_e);try{const Se=S.textures[fe],Ue=Se.format,Be=Se.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!C.textureFormatReadable(Ue)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Be)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-z&&G>=0&&G<=S.height-k&&N.readPixels(F,G,z,k,he.convert(Ue),he.convert(Be),pe)}finally{const Se=q!==null?V.get(q).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(S,F,G,z,k,pe,ve,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(_e=_e[ve]),_e)if(F>=0&&F<=S.width-z&&G>=0&&G<=S.height-k){x.bindFramebuffer(N.FRAMEBUFFER,_e);const Se=S.textures[fe],Ue=Se.format,Be=Se.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!C.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const be=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,be),N.bufferData(N.PIXEL_PACK_BUFFER,pe.byteLength,N.STREAM_READ),N.readPixels(F,G,z,k,he.convert(Ue),he.convert(Be),0);const nt=q!==null?V.get(q).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,nt);const _t=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await q0(N,_t,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,be),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pe),N.deleteBuffer(be),N.deleteSync(_t),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,G=0){const z=Math.pow(2,-G),k=Math.floor(S.image.width*z),pe=Math.floor(S.image.height*z),ve=F!==null?F.x:0,fe=F!==null?F.y:0;Z.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,ve,fe,k,pe),x.unbindTexture()},this.copyTextureToTexture=function(S,F,G=null,z=null,k=0,pe=0){let ve,fe,_e,Se,Ue,Be,be,nt,_t;const gt=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(G!==null)ve=G.max.x-G.min.x,fe=G.max.y-G.min.y,_e=G.isBox3?G.max.z-G.min.z:1,Se=G.min.x,Ue=G.min.y,Be=G.isBox3?G.min.z:0;else{const Mt=Math.pow(2,-k);ve=Math.floor(gt.width*Mt),fe=Math.floor(gt.height*Mt),S.isDataArrayTexture?_e=gt.depth:S.isData3DTexture?_e=Math.floor(gt.depth*Mt):_e=1,Se=0,Ue=0,Be=0}z!==null?(be=z.x,nt=z.y,_t=z.z):(be=0,nt=0,_t=0);const st=he.convert(F.format),Wt=he.convert(F.type);let ge;F.isData3DTexture?(Z.setTexture3D(F,0),ge=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Z.setTexture2DArray(F,0),ge=N.TEXTURE_2D_ARRAY):(Z.setTexture2D(F,0),ge=N.TEXTURE_2D),x.activeTexture(N.TEXTURE0),x.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),x.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),x.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const dn=x.getParameter(N.UNPACK_ROW_LENGTH),qe=x.getParameter(N.UNPACK_IMAGE_HEIGHT),_n=x.getParameter(N.UNPACK_SKIP_PIXELS),On=x.getParameter(N.UNPACK_SKIP_ROWS),mi=x.getParameter(N.UNPACK_SKIP_IMAGES);x.pixelStorei(N.UNPACK_ROW_LENGTH,gt.width),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,gt.height),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Se),x.pixelStorei(N.UNPACK_SKIP_ROWS,Ue),x.pixelStorei(N.UNPACK_SKIP_IMAGES,Be);const is=S.isDataArrayTexture||S.isData3DTexture,rt=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const Mt=V.get(S),gi=V.get(F),ct=V.get(Mt.__renderTarget),vi=V.get(gi.__renderTarget);x.bindFramebuffer(N.READ_FRAMEBUFFER,ct.__webglFramebuffer),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,vi.__webglFramebuffer);for(let ss=0;ss<_e;ss++)is&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(S).__webglTexture,k,Be+ss),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(F).__webglTexture,pe,_t+ss)),N.blitFramebuffer(Se,Ue,ve,fe,be,nt,ve,fe,N.DEPTH_BUFFER_BIT,N.NEAREST);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||V.has(S)){const Mt=V.get(S),gi=V.get(F);x.bindFramebuffer(N.READ_FRAMEBUFFER,W),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,U);for(let ct=0;ct<_e;ct++)is?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Mt.__webglTexture,k,Be+ct):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Mt.__webglTexture,k),rt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,gi.__webglTexture,pe,_t+ct):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,gi.__webglTexture,pe),k!==0?N.blitFramebuffer(Se,Ue,ve,fe,be,nt,ve,fe,N.COLOR_BUFFER_BIT,N.NEAREST):rt?N.copyTexSubImage3D(ge,pe,be,nt,_t+ct,Se,Ue,ve,fe):N.copyTexSubImage2D(ge,pe,be,nt,Se,Ue,ve,fe);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else rt?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(ge,pe,be,nt,_t,ve,fe,_e,st,Wt,gt.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(ge,pe,be,nt,_t,ve,fe,_e,st,gt.data):N.texSubImage3D(ge,pe,be,nt,_t,ve,fe,_e,st,Wt,gt):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pe,be,nt,ve,fe,st,Wt,gt.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pe,be,nt,gt.width,gt.height,st,gt.data):N.texSubImage2D(N.TEXTURE_2D,pe,be,nt,ve,fe,st,Wt,gt);x.pixelStorei(N.UNPACK_ROW_LENGTH,dn),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,qe),x.pixelStorei(N.UNPACK_SKIP_PIXELS,_n),x.pixelStorei(N.UNPACK_SKIP_ROWS,On),x.pixelStorei(N.UNPACK_SKIP_IMAGES,mi),pe===0&&F.generateMipmaps&&N.generateMipmap(ge),x.unbindTexture()},this.initRenderTarget=function(S){V.get(S).__webglFramebuffer===void 0&&Z.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Z.setTextureCube(S,0):S.isData3DTexture?Z.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Z.setTexture2DArray(S,0):Z.setTexture2D(S,0),x.unbindTexture()},this.resetState=function(){H=0,O=0,q=null,x.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ge._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ge._getUnpackColorSpace()}}class Cy extends Ga{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new yt;e.deleteAttribute("uv");const t=new It({side:nn}),n=new It,s=new Gc(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Je(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new hi(e,n,6),o=new bt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new Je(e,Es(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new Je(e,Es(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new Je(e,Es(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const d=new Je(e,Es(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const u=new Je(e,Es(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new Je(e,Es(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Es(i){return new wg({color:0,emissive:16777215,emissiveIntensity:i})}const Ce={bodyAlbedo:11817007,eye:1842204,eyeFlash:16742954,enemyCore:2361859,enemyDeep:6561799,enemyEnergy:16737549,enemyRim:16757386,splat:15884554,gold:11569758,shellWarm:15263453,shellCool:13095385,mechDark:1710622,coreDark:395563,violetDeep:2958169,violet:8481213,violetRim:15065333,structDark:1515560,structMid:2700355,structHi:3361379,panel:5399675,steelPale:11387080,cyan:3319759,cyanPale:9230551},Pn={roughness:.26,edgeRoughness:.5,edgeValue:.84,emissive:.12},An={skyColor:6131632,groundColor:5003883,hemiIntensity:1.4,keyColor:14477552,keyIntensity:.62,environmentIntensity:.4,background:855827,fogNear:34,fogFar:96,exposure:1.1};function wf(){return typeof window<"u"&&typeof window.matchMedia=="function"?i=>window.matchMedia(i):null}function Ef(i=typeof navigator<"u"?navigator:{},e=wf()){return(e?e("(pointer: coarse)").matches:!1)&&(i.maxTouchPoints??0)>=1}function Ry(i,e,t){const n=i.get("touch");return n==="1"?!0:n==="0"?!1:Ef(e,t)}const Tf={high:{level:"high",pixelRatioCap:2,maxFixtures:10,shadows:!0,shadowMapSize:1024,anisotropyCap:16,paintTexelsPerMetre:20,paintMapMax:2048,decalCapacity:160,dropletCapacity:160,flashCapacity:8,impactCapacity:12,projectileLights:2,projectileShader:!0,prewarmShaders:!0},medium:{level:"medium",pixelRatioCap:1.5,maxFixtures:7,shadows:!0,shadowMapSize:512,anisotropyCap:8,paintTexelsPerMetre:14,paintMapMax:1024,decalCapacity:96,dropletCapacity:96,flashCapacity:6,impactCapacity:8,projectileLights:2,projectileShader:!0,prewarmShaders:!0},low:{level:"low",pixelRatioCap:1,maxFixtures:4,shadows:!1,shadowMapSize:512,anisotropyCap:4,paintTexelsPerMetre:9,paintMapMax:512,decalCapacity:48,dropletCapacity:48,flashCapacity:4,impactCapacity:6,projectileLights:1,projectileShader:!1,prewarmShaders:!0}};function Af(i){return Tf[i]}function Ir(i){return i==="high"||i==="medium"||i==="low"}function Cf(i=typeof navigator<"u"?navigator:{},e=wf()){return Ef(i,e)?"low":(i.hardwareConcurrency??8)<=4?"medium":"high"}function Py(i){const e=i.get("quality"),t=Ir(e)?e:Cf(),n=Tf[t];return i.get("basicfx")==="1"&&n.projectileShader?{...n,projectileShader:!1}:n}const Iu=Math.PI/180,xr={worldFovY:75,weaponFovY:52,maxPortraitFovY:100};function Lu(i,e){if(!(e>0)||e>=1)return i;const t=2*Math.atan(Math.tan(i*Iu/2)/e)/Iu;return Math.min(t,xr.maxPortraitFovY)}const Du=2;class Iy{renderer;scene;camera;viewScene;viewCamera;key;hemi;environment;fixtures=[];placements=[];chosen=[];chosenDistance=[];lastFixtureX=Number.NaN;lastFixtureZ=Number.NaN;sizedWidth=-1;sizedHeight=-1;sizedRatio=-1;maxPixelRatio;quality;keyHeight=3.9;constructor(e,t=Af("high")){this.quality=t,this.maxPixelRatio=t.pixelRatioCap,this.renderer=new Ay({canvas:e,antialias:t.level!=="low",powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.maxPixelRatio)),this.renderer.outputColorSpace=tn,this.renderer.toneMapping=Tc,this.renderer.toneMappingExposure=An.exposure,this.renderer.shadowMap.enabled=t.shadows,this.renderer.shadowMap.type=Sr,this.renderer.autoClear=!1,this.renderer.info.autoReset=!1,this.scene=new Ga,this.scene.background=new Re(An.background),this.scene.fog=new Oc(An.background,An.fogNear,An.fogFar),this.camera=new cn(xr.worldFovY,1,.1,200),this.hemi=new nu(An.skyColor,An.groundColor,An.hemiIntensity),this.scene.add(this.hemi),this.key=new ou(An.keyColor,An.keyIntensity),this.key.castShadow=t.shadows,this.key.shadow.mapSize.set(t.shadowMapSize,t.shadowMapSize),this.key.shadow.bias=-.0016,this.key.shadow.normalBias=.03;const n=this.key.shadow.camera;n.near=.5,n.far=38,n.left=-14,n.right=14,n.top=14,n.bottom=-14,n.updateProjectionMatrix(),this.scene.add(this.key),this.scene.add(this.key.target);const s=new jl(this.renderer);this.environment=s.fromScene(new Cy,.04).texture,s.dispose(),this.scene.environment=this.environment,this.scene.environmentIntensity=An.environmentIntensity,this.viewScene=new Ga,this.viewScene.environment=this.environment,this.viewScene.environmentIntensity=1,this.viewCamera=new cn(xr.weaponFovY,1,.01,12);const r=new ou(16777215,2.1);r.position.set(.7,1.2,1.4),this.viewScene.add(r),this.viewScene.add(new nu(10470624,2761504,1)),this.resize()}resize(){const e=window.innerWidth,t=window.innerHeight,n=Math.min(window.devicePixelRatio,this.maxPixelRatio);if(e===this.sizedWidth&&t===this.sizedHeight&&n===this.sizedRatio)return!1;this.sizedWidth=e,this.sizedHeight=t,this.sizedRatio=n,this.renderer.setPixelRatio(n),this.renderer.setSize(e,t,!1);const s=e/Math.max(1,t);return this.camera.aspect=s,this.camera.fov=Lu(xr.worldFovY,s),this.camera.updateProjectionMatrix(),this.viewCamera.aspect=s,this.viewCamera.fov=Lu(xr.weaponFovY,s),this.viewCamera.updateProjectionMatrix(),!0}setMaxPixelRatio(e){this.maxPixelRatio=Math.max(1,e)}get pixelRatioCap(){return this.maxPixelRatio}get maxAnisotropy(){return Math.min(this.renderer.capabilities.getMaxAnisotropy(),this.quality.anisotropyCap)}configureForFacility(e){this.clearFixtures(),this.placements=e.rooms.flatMap(s=>s.lights);const t=Math.min(this.quality.maxFixtures,this.placements.length);for(let s=0;s<t;s++){const r=new Gc(16777215,0,1,2);this.scene.add(r),this.fixtures.push(r)}this.lastFixtureX=Number.NaN,this.lastFixtureZ=Number.NaN;let n=4;for(const s of e.rooms)n=Math.max(n,s.ceilY);this.keyHeight=n-.7}setFixtureFocus(e,t){if(this.fixtures.length===0)return;const n=e-this.lastFixtureX,s=t-this.lastFixtureZ;if(Number.isFinite(n)&&n*n+s*s<Du*Du)return;this.lastFixtureX=e,this.lastFixtureZ=t;const r=this.fixtures.length;this.chosen.length=0,this.chosenDistance.length=0;for(let a=0;a<this.placements.length;a++){const o=this.placements[a],l=o.x-e,c=o.z-t,h=l*l+c*c;if(this.chosen.length===r&&h>=this.chosenDistance[r-1])continue;let d=this.chosen.length<r?this.chosen.length:r-1;for(;d>0&&this.chosenDistance[d-1]>h;)this.chosen[d]=this.chosen[d-1],this.chosenDistance[d]=this.chosenDistance[d-1],d--;this.chosen[d]=a,this.chosenDistance[d]=h}for(let a=0;a<r;a++){const o=this.fixtures[a],l=this.placements[this.chosen[a]??-1];if(!l){o.intensity=0;continue}o.position.set(l.x,l.y,l.z),o.color.setHex(l.color),o.intensity=l.intensity,o.distance=l.distance}}setShadowFocus(e,t){this.key.position.set(e+6,this.keyHeight,t+8),this.key.target.position.set(e,0,t),this.key.target.updateMatrixWorld()}prewarm(){this.quality.prewarmShaders&&(this.renderer.compile(this.scene,this.camera),this.renderer.compile(this.viewScene,this.viewCamera),this.render())}render(){this.renderer.info.reset(),this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.renderer.clearDepth(),this.renderer.render(this.viewScene,this.viewCamera)}get drawCalls(){return this.renderer.info.render.calls}get triangles(){return this.renderer.info.render.triangles}get programCount(){return this.renderer.info.programs?.length??0}get geometryCount(){return this.renderer.info.memory.geometries}get textureCount(){return this.renderer.info.memory.textures}get lightCount(){return this.fixtures.length}get pointLightCount(){let e=0;return this.scene.traverseVisible(t=>{t.isPointLight&&e++}),e}get fixtureCount(){return this.placements.length}clearFixtures(){for(const e of this.fixtures)this.scene.remove(e),e.dispose();this.fixtures.length=0}dispose(){this.clearFixtures(),this.key.shadow.map?.dispose(),this.key.shadow.map=null,this.environment.dispose(),this.renderer.dispose()}}const Ts={step:.75,floor:1,minSamples:600,breachRatio:.2};class Ly{cap;enabledFlag;downgradeCount=0;eligibleFrames=0;constructor(e,t){this.cap=e,this.enabledFlag=t}get pixelRatioCap(){return this.cap}get downgrades(){return this.downgradeCount}get enabled(){return this.enabledFlag}get exhausted(){return this.cap<=Ts.floor}setEnabled(e){this.enabledFlag!==e&&(this.enabledFlag=e,this.eligibleFrames=0)}setBase(e){return this.eligibleFrames=0,this.downgradeCount=0,this.cap===e?!1:(this.cap=e,!0)}consider(e){if(!this.enabledFlag||this.exhausted)return!1;if(!e.runActive||!e.visible||e.timerScheduled)return this.eligibleFrames=0,!1;if(this.eligibleFrames++,this.eligibleFrames<Ts.minSamples||e.samples<Ts.minSamples||e.breaches/e.samples<Ts.breachRatio)return!1;const t=Math.max(Ts.floor,this.cap*Ts.step);return this.eligibleFrames=0,t===this.cap?!1:(this.cap=t,this.downgradeCount++,!0)}}const Ha={floorPlate:2,wallPanel:2,structure:1,ceilingPanel:2,machine:1,machineDark:1,hazard:.5,glass:1,emissive:1,lamp:1,emergency:1};function Qi(i){const e=document.createElement("canvas");e.width=i,e.height=i;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot generate lab textures");return{ctx:t,el:e}}function Vi(i,e,t=!0){const n=new zc(i);return n.wrapS=Ki,n.wrapT=Ki,n.colorSpace=t?tn:Cn,n.anisotropy=e,n.generateMipmaps=!0,n.minFilter=Wn,n}function $n(i){return`#${i.toString(16).padStart(6,"0")}`}function Fr(i,e,t,n,s){for(let r=0;r<n;r++){const a=t()*e,o=t()*e,l=1+t()*3,c=1+t()*3,h=t()<.6;i.fillStyle=h?`rgba(0,0,0,${s})`:`rgba(255,255,255,${s*.7})`,i.fillRect(a,o,l,c)}}function nc(i,e,t,n){i.fillStyle="rgba(0,0,0,0.34)",i.beginPath(),i.arc(e,t+n*.35,n,0,Math.PI*2),i.fill(),i.fillStyle="rgba(255,255,255,0.16)",i.beginPath(),i.arc(e,t,n,0,Math.PI*2),i.fill()}function Dy(i,e){const{ctx:t,el:n}=Qi(i),s=i*.028;t.fillStyle=$n(Ce.structDark),t.fillRect(0,0,i,i),t.fillStyle=$n(Ce.structMid),t.fillRect(s,s,i-s*2,i-s*2),t.fillStyle="rgba(255,255,255,0.05)",t.fillRect(s,s,i-s*2,s*.9),t.fillStyle="rgba(0,0,0,0.18)",t.fillRect(s,i-s*1.9,i-s*2,s*.9),t.strokeStyle="rgba(0,0,0,0.22)",t.lineWidth=Math.max(1,i*.006),t.beginPath(),t.moveTo(i/2,s),t.lineTo(i/2,i-s),t.moveTo(s,i/2),t.lineTo(i-s,i/2),t.stroke();const r=i*.014;for(const[o,l]of[[s*2.6,s*2.6],[i-s*2.6,s*2.6],[s*2.6,i-s*2.6],[i-s*2.6,i-s*2.6]])nc(t,o,l,r);Fr(t,i,e,260,.06);const a=Qi(i);return a.ctx.fillStyle="#ffffff",a.ctx.fillRect(0,0,i,i),a.ctx.fillStyle="#b9b9b9",a.ctx.fillRect(s,s,i-s*2,i-s*2),a.ctx.strokeStyle="rgba(255,255,255,0.5)",a.ctx.lineWidth=Math.max(1,i*.006),a.ctx.beginPath(),a.ctx.moveTo(i/2,s),a.ctx.lineTo(i/2,i-s),a.ctx.moveTo(s,i/2),a.ctx.lineTo(i-s,i/2),a.ctx.stroke(),{albedo:n,rough:a.el}}function Ny(i,e){const{ctx:t,el:n}=Qi(i),s=i*.022;t.fillStyle=$n(Ce.structMid),t.fillRect(0,0,i,i),t.fillStyle=$n(Ce.panel),t.fillRect(s,s,i-s*2,i-s*2),t.fillStyle=$n(Ce.structMid),t.fillRect(0,i/2-s/2,i,s),t.fillStyle="rgba(0,0,0,0.16)",t.fillRect(i*.16,i*.09,i*.68,i*.28),t.fillStyle="rgba(255,255,255,0.07)",t.fillRect(i*.16,i*.09,i*.68,i*.014);const r=i*.011;for(let a=0;a<4;a++){const o=i*(.09+a*.273);nc(t,o,i*.55,r),nc(t,o,i*.94,r)}for(let a=0;a<26;a++){const o=e()*i,l=1+e()*2.5;t.fillStyle=`rgba(0,0,0,${.02+e()*.03})`,t.fillRect(o,s,l,i-s*2)}return Fr(t,i,e,160,.045),n}function Fy(i,e){const{ctx:t,el:n}=Qi(i);t.fillStyle=$n(Ce.structDark),t.fillRect(0,0,i,i),t.fillStyle=$n(Ce.structHi),t.fillRect(0,i*.1,i,i*.8);for(let s=0;s<6;s++){const r=i*(.16+s*.13);t.fillStyle="rgba(0,0,0,0.24)",t.fillRect(0,r,i,i*.028),t.fillStyle="rgba(255,255,255,0.08)",t.fillRect(0,r+i*.028,i,i*.012)}return Fr(t,i,e,120,.05),n}function Uy(i,e){const{ctx:t,el:n}=Qi(i);t.fillStyle=$n(Ce.structHi),t.fillRect(0,0,i,i);const s=i/2,r=s*.09;for(let a=0;a<2;a++)for(let o=0;o<2;o++)t.fillStyle=$n(Ce.panel),t.fillRect(o*s+r,a*s+r,s-r*2,s-r*2),t.fillStyle="rgba(255,255,255,0.1)",t.fillRect(o*s+r,a*s+r,s-r*2,r*.5),t.fillStyle="rgba(0,0,0,0.16)",t.fillRect(o*s+r,a*s+s-r*1.5,s-r*2,r*.5);return Fr(t,i,e,90,.035),n}function Oy(i,e){const{ctx:t,el:n}=Qi(i);t.fillStyle=$n(Ce.steelPale),t.fillRect(0,0,i,i),t.fillStyle="rgba(0,0,0,0.14)",t.fillRect(0,i*.46,i,i*.03),t.fillStyle="rgba(255,255,255,0.28)",t.fillRect(0,i*.49,i,i*.012);for(let r=0;r<7;r++)t.fillStyle="rgba(0,0,0,0.34)",t.fillRect(i*(.14+r*.104),i*.64,i*.05,i*.2);const s=t.createLinearGradient(0,i*.7,0,i);return s.addColorStop(0,"rgba(23,32,40,0)"),s.addColorStop(1,"rgba(23,32,40,0.42)"),t.fillStyle=s,t.fillRect(0,i*.7,i,i*.3),Fr(t,i,e,140,.05),n}function By(i){const{ctx:e,el:t}=Qi(i);e.fillStyle="#161514",e.fillRect(0,0,i,i),e.strokeStyle="#c9a227",e.lineWidth=i*.22,e.beginPath();for(let n=-2;n<4;n++){const s=n*i*.5;e.moveTo(s,0),e.lineTo(s+i,i)}return e.stroke(),t}function zy(i){const e=Dt("clawd-lab-kit","dressing"),t=Math.min(8,Math.max(1,i)),n=Dy(512,e),s=Vi(n.albedo,t),r=Vi(n.rough,t,!1),a=Vi(Ny(512,e),t),o=Vi(Fy(256,e),t),l=Vi(Uy(256,e),t),c=Vi(Oy(256,e),t),h=Vi(By(128),t),d=[s,r,a,o,l,c,h],u={floorPlate:new It({map:s,roughnessMap:r,roughness:.85,metalness:.22}),wallPanel:new It({map:a,roughness:.8,metalness:.1}),structure:new It({map:o,roughness:.66,metalness:.34}),ceilingPanel:new It({map:l,roughness:.86,metalness:.08,color:12898264}),machine:new It({map:c,roughness:.52,metalness:.18}),machineDark:new It({color:Ce.structDark,roughness:.58,metalness:.45}),hazard:new It({map:h,roughness:.74,metalness:.12}),glass:new It({color:Ce.steelPale,roughness:.06,metalness:0,transparent:!0,opacity:.24,side:gn,depthWrite:!1}),emissive:new sn({color:Ce.cyan,toneMapped:!0}),lamp:new sn({color:Ce.cyanPale,toneMapped:!0}),emergency:new sn({color:14173482,toneMapped:!0})};return{byStyle:u,paintedStyle:"floorPlate",dispose(){for(const f of Object.values(u))f.dispose();for(const f of d)f.dispose()}}}function Rf(){return{position:[],normal:[],uv:[]}}function Nu(i){return i.position.length===0}function ic(i,e,t,n,s,r,a,o){const l=1/Math.max(1e-6,o);As(i,s,t,a,s,t,n,s,r,n,s,r,a,1,0,0,a*l,t*l,n*l,r*l),As(i,e,t,n,e,t,a,e,r,a,e,r,n,-1,0,0,n*l,t*l,a*l,r*l),As(i,e,r,a,s,r,a,s,r,n,e,r,n,0,1,0,e*l,a*l,s*l,n*l),As(i,e,t,n,s,t,n,s,t,a,e,t,a,0,-1,0,e*l,n*l,s*l,a*l),As(i,e,t,a,s,t,a,s,r,a,e,r,a,0,0,1,e*l,t*l,s*l,r*l),As(i,s,t,n,e,t,n,e,r,n,s,r,n,0,0,-1,s*l,t*l,e*l,r*l)}function As(i,e,t,n,s,r,a,o,l,c,h,d,u,f,m,v,g,p,y,E){const _=i.position,T=i.normal,w=i.uv;_.push(e,t,n,s,r,a,o,l,c),_.push(e,t,n,o,l,c,h,d,u);for(let A=0;A<6;A++)T.push(f,m,v);w.push(g,p,y,p,y,E),w.push(g,p,y,E,g,E)}function sc(i){const e=new Ot;return e.setAttribute("position",new Qe(new Float32Array(i.position),3)),e.setAttribute("normal",new Qe(new Float32Array(i.normal),3)),e.setAttribute("uv",new Qe(new Float32Array(i.uv),2)),e.computeBoundingSphere(),e}class ky{meshes=[];deck;doors=[];rails;indicators;level;base;height;remaining=-1;releaseUntil=-1;seenCore=!1;group;room;constructor(e,t,n){this.group=e,this.room=t;const s=t.anchor;this.height=xn[fd(s.kind)].height;const r=(u,f,m,v,g,p)=>[v-u/2,g-f/2,p-m/2,v+u/2,g+f/2,p+m/2],a=(u,f)=>{const m=Rf();for(const g of f)ic(m,g[0],g[1],g[2],g[3],g[4],g[5],Ha[u]);const v=new Je(sc(m),n.byStyle[u]);return v.position.set(s.x,0,s.z),v.receiveShadow=u!=="emissive",v.frustumCulled=!1,e.add(v),this.meshes.push(v),v},o=$e.half,l=this.height+$e.headroom+.3,c=[],h=[],d=[];for(const u of[-1,1]){c.push(r($e.rim,l,o*2,u*(o+$e.rim/2),-l/2,0)),c.push(r((o+$e.rim)*2,l,$e.rim,0,-l/2,u*(o+$e.rim/2))),h.push(r(.08,.16,(o+.03)*2,u*(o+.07),-.08,0)),h.push(r((o+.11)*2,.16,.08,0,-.08,u*(o+.07)));for(const f of[-1,1])h.push(r(.12,$e.railHeight-.16,.12,u*(o+.07),-.68/2,f*(o+.07)));d.push(r(.035,.02,1.3,u*(o+.07),.013,0)),d.push(r(1.3,.02,.035,0,.013,u*(o+.07)))}a("machineDark",c),this.deck=a("floorPlate",[r(o*2-.02,.16,o*2-.02,0,-.08,0)]);for(const u of[-1,1])this.doors.push(a("machine",[r(o-.012,.1,o*2-.012,u*o/2,-.07,0)]));this.rails=a("hazard",h),this.indicators=a("emissive",d),this.level=n.byStyle.emissive.clone(),this.base=this.level.color.clone(),this.indicators.material=this.level,this.deck.position.y=-this.height-$e.headroom,this.rails.visible=!1,this.level.color.multiplyScalar(.18)}update(e){const t=this.room.anchor,n=e.runtime[this.room.id],s=n.anchorStartedAt<0?-1:e.time-n.anchorStartedAt,r=e.enemies.find(h=>h.def.stationary&&h.x===t.x&&h.z===t.z);r&&(this.seenCore=!0);const a=Kf(s);for(let h=0;h<2;h++)this.doors[h].position.x=t.x+(h===0?-1:1)*a*($e.half+.03),this.doors[h].visible=a<1;this.deck.position.y=s<0?-this.height-$e.headroom:fc(s,this.height),this.rails.position.y=Jf(s),this.rails.visible=this.rails.position.y>.002;const o=n.state==="cleared"||this.seenCore&&(!r||!r.alive||r.state==="dying");r&&this.remaining>=0&&r.broodRemaining<this.remaining&&(this.releaseUntil=e.time+.18),r&&(this.remaining=r.broodRemaining);const l=r?.state==="approach"&&r.broodRemaining>0?Math.max(0,1-r.broodTimer/br):0,c=o?0:r?e.time<this.releaseUntil?1:.4+l*.6:.18;this.indicators.visible=!o,this.level.color.copy(this.base).multiplyScalar(c)}dispose(){for(const e of this.meshes)this.group.remove(e),e.geometry.dispose();this.level.dispose(),this.meshes.length=0}}function rc(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Ot;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=Fu(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][u]);const m=Fu(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function Fu(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new Xt(a,t,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/t;for(let u=0,f=h.count;u<f;u++)for(let m=0;m<t;m++){const v=h.getComponent(u,m);o.setComponent(u+d,m,v)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}const Uu=new I,Ou=new I,ua=new I;class Vy{positions=[];normals=[];uvs=[];uvScale;constructor(e){this.uvScale=e}tri(e,t,n,s,r,a,o,l,c,h,d,u){Uu.set(s-e,r-t,a-n),Ou.set(o-e,l-t,c-n),ua.crossVectors(Uu,Ou),ua.x*h+ua.y*d+ua.z*u<0?(this.vertex(e,t,n,h,d,u),this.vertex(o,l,c,h,d,u),this.vertex(s,r,a,h,d,u)):(this.vertex(e,t,n,h,d,u),this.vertex(s,r,a,h,d,u),this.vertex(o,l,c,h,d,u))}quad(e,t,n,s,r,a,o,l,c,h,d,u,f,m,v){this.tri(e,t,n,s,r,a,o,l,c,f,m,v),this.tri(e,t,n,o,l,c,h,d,u,f,m,v)}vertex(e,t,n,s,r,a){this.positions.push(e,t,n),this.normals.push(s,r,a);const o=Math.abs(s),l=Math.abs(r),c=Math.abs(a);o>=l&&o>=c?this.uvs.push(n*this.uvScale,t*this.uvScale):l>=c?this.uvs.push(e*this.uvScale,n*this.uvScale):this.uvs.push(e*this.uvScale,t*this.uvScale)}finish(){const e=new Ot;return e.setAttribute("position",new Qe(this.positions,3)),e.setAttribute("normal",new Qe(this.normals,3)),e.setAttribute("uv",new Qe(this.uvs,2)),e.computeBoundingSphere(),e}}const Gn=1/Math.SQRT2,qo=1/Math.sqrt(3);function Bs(i,e,t,n,s={}){const r=i/2,a=e/2,o=t/2,l=Math.max(0,Math.min(n,Math.min(r,a,o)*.49)),c=r-l,h=a-l,d=o-l,u=new Vy(s.uvScale??1),f=s.sockets??[],m=f.length>0?Gy(c,h,f):null;for(const v of[1,-1])u.quad(v*r,-h,-d,v*r,h,-d,v*r,h,d,v*r,-h,d,v,0,0),u.quad(-c,v*a,-d,c,v*a,-d,c,v*a,d,-c,v*a,d,0,v,0),v===-1&&f.length>0?Wy(u,o,f,m.x,m.y):u.quad(-c,-h,v*o,c,-h,v*o,c,h,v*o,-c,h,v*o,0,0,v);for(const v of[1,-1]){for(const g of[1,-1])u.quad(v*r,g*h,-d,v*c,g*a,-d,v*c,g*a,d,v*r,g*h,d,v*Gn,g*Gn,0);for(const g of[1,-1])g===-1&&m?Hy(u,v,r,c,h,d,o,m.y):u.quad(v*r,-h,g*d,v*c,-h,g*o,v*c,h,g*o,v*r,h,g*d,v*Gn,0,g*Gn)}for(const v of[1,-1])for(const g of[1,-1])g===-1&&m?Xy(u,v,a,c,h,d,o,m.x):u.quad(-c,v*a,g*d,c,v*a,g*d,c,v*h,g*o,-c,v*h,g*o,0,v*Gn,g*Gn);for(const v of[1,-1])for(const g of[1,-1])for(const p of[1,-1])u.tri(v*r,g*h,p*d,v*c,g*a,p*d,v*c,g*h,p*o,v*qo,g*qo,p*qo);return u.finish()}function Gy(i,e,t){const n=new Set([-i,i]),s=new Set([-e,e]);for(const r of t)n.add(r.x-r.width/2),n.add(r.x+r.width/2),s.add(r.y-r.height/2),s.add(r.y+r.height/2);return{x:[...n].sort((r,a)=>r-a),y:[...s].sort((r,a)=>r-a)}}function Hy(i,e,t,n,s,r,a,o){const l=e*t,c=e*n,h=e*Gn,d=-Gn;for(let u=0;u<o.length-1;u++)i.tri(l,-s,-r,c,o[u],-a,c,o[u+1],-a,h,0,d);i.tri(l,-s,-r,c,o[o.length-1],-a,l,s,-r,h,0,d)}function Xy(i,e,t,n,s,r,a,o){const l=e*t,c=e*s,h=e*Gn,d=-Gn;i.tri(-n,l,-r,n,l,-r,o[o.length-1],c,-a,0,h,d);for(let u=o.length-1;u>0;u--)i.tri(-n,l,-r,o[u],c,-a,o[u-1],c,-a,0,h,d)}function Wy(i,e,t,n,s){for(let r=0;r<n.length-1;r++)for(let a=0;a<s.length-1;a++){const o=n[r],l=n[r+1],c=s[a],h=s[a+1],d=(o+l)/2,u=(c+h)/2;t.some(m=>Math.abs(d-m.x)<m.width/2&&Math.abs(u-m.y)<m.height/2)||i.quad(o,c,-e,l,c,-e,l,h,-e,o,h,-e,0,0,-1)}for(const r of t){const a=r.x-r.width/2,o=r.x+r.width/2,l=r.y-r.height/2,c=r.y+r.height/2,h=-e,d=-e+r.depth;i.quad(a,l,h,a,c,h,a,c,d,a,l,d,1,0,0),i.quad(o,l,h,o,c,h,o,c,d,o,l,d,-1,0,0),i.quad(a,l,h,o,l,h,o,l,d,a,l,d,0,1,0),i.quad(a,c,h,o,c,h,o,c,d,a,c,d,0,-1,0),i.quad(a,l,d,o,l,d,o,c,d,a,c,d,0,0,-1)}}function qy(i,e){const t=i.height??4.1,n=Math.max(3.35,t-.18),s=new Xe().makeRotationY(i.yaw);s.scale(new I(i.scale,i.scale,i.scale)),s.setPosition(i.x,i.y,i.z);function r(h,d,u=0,f=0,m=0,v=0){d.rotateY(v),d.translate(u,f,m);const g=d.getAttribute("position"),p=d.getAttribute("normal"),y=new Float32Array(g.count*2),E=Ha[h];for(let _=0;_<g.count;_++){const T=Math.abs(p.getX(_)),w=Math.abs(p.getY(_)),A=Math.abs(p.getZ(_));y[_*2]=(T>w&&T>A?g.getZ(_):g.getX(_))/E,y[_*2+1]=(w>T&&w>A?g.getZ(_):g.getY(_))/E}d.setAttribute("uv",new Xt(y,2)),d.index||d.setIndex(Array.from({length:g.count},(_,T)=>T)),d.applyMatrix4(s),e(h,d)}function a(h,d,u,f,m,v=.02,g=0){r(h,v>0?Bs(d,u,f,v):new yt(d,u,f),...m,g)}function o(h,d,u,f,m,v=8){const g=new dt(d,u,f,v),p=g.toNonIndexed();g.dispose(),p.computeVertexNormals(),r(h,p,...m,Math.PI/8)}function l(h,d,u,f,m){const v=new I(...d),g=new I(...u),p=g.clone().sub(v),y=Bs(f,p.length(),m,.025);y.applyQuaternion(new Dn().setFromUnitVectors(new I(0,1,0),p.normalize()));const E=v.add(g).multiplyScalar(.5);r(h,y,E.x,E.y,E.z)}for(const h of[-1,1])for(const d of[-1,1]){const u=h*at.supportOffset,f=d*at.supportOffset;a("machineDark",.56,t,.42,[u,t/2,f],.045),a("machineDark",.62,.72,.62,[u,.42,f],.07);for(const v of[-1,1]){a("hazard",.44,.25,.005,[u,.3,f+v*.313],0),a("machine",.5,1.23,.08,[u,1.53,f+v*.27],.025),a("machine",.5,.58,.08,[u,t-.44,f+v*.27],.025),a("emissive",.035,.22,.012,[u+.16,1.48,f+v*.311],0);for(let g=0;g<4;g++)a("machine",.45,.04,.06,[u,2.53+g*.105,f+v*.26],0)}for(const v of[.85,2.22,t-.8])a("machineDark",.62,.12,.62,[u,v,f],.015);const m=[h*1.25,3.7,d*1.25];l("machineDark",[u,n-.06,f],m,.25,.27),l("machineDark",[u,n+.06,f-d*.12],[m[0],3.83,m[2]-d*.12],.1,.1),l("emissive",[u,n+.075,f-d*.15],[m[0],3.845,m[2]-d*.15],.025,.025)}const c=at.supportOffset*2-at.supportWidth;for(const h of[-1,1])for(const d of[0,1]){const u=d===0?[0,n,h*at.supportOffset]:[h*at.supportOffset,n,0];a("machineDark",c,.22,at.supportWidth,[u[0],u[1]-.04,u[2]],.025,d*Math.PI/2),a("machine",c,.08,.5,[u[0],u[1]+.11,u[2]],.015,d*Math.PI/2)}o("machineDark",at.headRadius,at.headRadius,at.headTop-at.headBottom,[0,(at.headTop+at.headBottom)/2,0]),o("machineDark",at.lowerRadius,1.6,at.headBottom-at.lowerBottom,[0,(at.headBottom+at.lowerBottom)/2,0]),o("machineDark",1.39,1.39,.025,[0,at.lowerBottom+.01,0]);for(let h=0;h<8;h++){const d=h*Math.PI/4,u=Math.sin(d),f=Math.cos(d);a("machine",1.34,.3,.12,[u*1.87,3.68,f*1.87],.035,d),a("machineDark",.55,.04,.22,[u*1.46,3.25,f*1.46],.01,d),a("emissive",.38,.012,.11,[u*1.46,3.226,f*1.46],0,d),a("machineDark",.075,.075,.018,[u*1.937,3.72,f*1.937],.01,d)}}const Pf=.85,If=3.05,Lf=.66;function St(i,e,t){const n=i.get(e);n?n.push(t):i.set(e,[t])}function At(i,e,t,n,s=0,r=0){const a=new Xe,o=new Nn(r,s,0,"YXZ");return a.makeRotationFromEuler(o),a.setPosition(e,t,n),i.applyMatrix4(a),i}function Zy(i,e){const t=e.scale,n=Pf*t,s=If*t,r=e.y+Lf*t;St(i,"glass",At(new dt(n,n,s,20,1,!0),e.x,r+s/2,e.z,e.yaw));const a=n*1.09;St(i,"machine",At(new dt(a,a,.22*t,20),e.x,r+.09*t,e.z,e.yaw)),St(i,"machine",At(new dt(a,a,.26*t,20),e.x,r+s-.1*t,e.z,e.yaw)),St(i,"machineDark",At(new dt(a*1.06,a*.94,.3*t,20),e.x,r+s+.13*t,e.z,e.yaw));for(let o=0;o<4;o++){const l=e.yaw+o*Math.PI/2+.4;St(i,"machineDark",At(new dt(.045*t,.045*t,s,6),e.x+Math.cos(l)*a,r+s/2,e.z+Math.sin(l)*a))}St(i,"machineDark",At(new dt(n*.17,n*.2,s*(.5+e.variant*.3),10),e.x,r+s*.3,e.z,e.yaw)),St(i,"emissive",At(new dt(n*.09,n*.09,s*.86,8),e.x,r+s*.5,e.z,e.yaw))}function Yy(i,e){const t=e.scale,n=Pf*t,s=If*t,r=e.y+Lf*t,a=s*(.26+e.variant*.24),o=n*1.09;St(i,"glass",At(new dt(n,n,a,20,1,!0),e.x,r+a/2,e.z,e.yaw)),St(i,"machine",At(new dt(o,o,.22*t,20),e.x,r+.09*t,e.z,e.yaw)),St(i,"machine",At(new dt(o,o,.26*t,20),e.x+(e.variant-.5)*.16*t,r+a+.1*t,e.z,e.yaw,.22+e.variant*.16));for(let l=0;l<4;l++){const c=e.yaw+l*Math.PI/2+.4,d=l%2===0?s:a+.2*t;St(i,"machineDark",At(new dt(.045*t,.045*t,d,6),e.x+Math.cos(c)*o,r+d/2,e.z+Math.sin(c)*o))}St(i,"machineDark",At(new dt(n*.17,n*.2,a*.7,10),e.x,r+a*.35,e.z,e.yaw))}function $y(i,e){const t=e.length??8,n=[.075,.055,.045],s=[0,.17,.3];for(let a=0;a<n.length;a++){const o=new dt(n[a]*e.scale,n[a]*e.scale,t,8);o.rotateX(Math.PI/2),St(i,"machineDark",At(o,e.x+s[a]*(e.variant<.5?1:-1),e.y-a*.04,e.z,e.yaw))}const r=Math.max(2,Math.round(t/4));for(let a=0;a<r;a++){const o=e.z-t/2+t/(r-1||1)*a,l=new dt(.13*e.scale,.13*e.scale,.1*e.scale,8);l.rotateX(Math.PI/2),St(i,"machine",At(l,e.x+.14,e.y-.02,o,e.yaw))}}function Ky(i,e){St(i,"machineDark",At(new yt(.86*e.scale,.62*e.scale,.07*e.scale),e.x,e.y+.3*e.scale,e.z,e.yaw,-.38)),St(i,"emissive",At(new yt(.74*e.scale,.5*e.scale,.02*e.scale),e.x,e.y+.3*e.scale,e.z,e.yaw,-.38)),St(i,"machineDark",At(new dt(.035,.035,.16*e.scale,6),e.x,e.y+.06*e.scale,e.z,e.yaw))}function Jy(i,e){St(i,"machineDark",At(new dt(.06*e.scale,.08*e.scale,.16*e.scale,8),e.x,e.y,e.z)),St(i,"emergency",At(new Qn(.11*e.scale,10,6,0,Math.PI*2,0,Math.PI*.62),e.x,e.y+.07*e.scale,e.z)),St(i,"machineDark",At(new dt(.115*e.scale,.115*e.scale,.03*e.scale,10),e.x,e.y+.06*e.scale,e.z))}function Qy(i,e){const t=new Map;for(const s of i)switch(s.kind){case"containmentTank":Zy(t,s);break;case"breachedTank":Yy(t,s);break;case"pipeRun":$y(t,s);break;case"wallConsole":Ky(t,s);break;case"beacon":Jy(t,s);break;case"containmentMachine":{const r=[];if(qy(s,(a,o)=>{a==="emissive"&&e?r.push(o):St(t,a,o)}),r.length>0){const a=rc(r,!1);for(const o of r)o.dispose();a.computeBoundingSphere(),e(s,a)}break}}const n=new Map;for(const[s,r]of t){for(const o of r)o.deleteAttribute("tangent"),o.deleteAttribute("color");const a=r.length===1?r[0]:rc(r,!1);if(a){if(r.length>1)for(const o of r)o.dispose();a.computeBoundingSphere(),n.set(s,a)}}return n}const Zo=["floorPlate","wallPanel","structure","ceilingPanel","machine","machineDark","hazard","emissive","lamp","emergency","glass"];function jy(i){if(i.surface)return i.surface;switch(i.kind){case"floor":return"floorPlate";case"wall":return"wallPanel";case"ceiling":return"ceilingPanel";case"prop":return"machine"}}const eS=new Set(["structure","machine","machineDark","hazard","glass"]);class tS{group=new Yi;scene;materials;meshes=[];geometries=[];lifts=[];cradleIndicators=[];paintUniforms={uPaintMap:{value:null},uPaintMin:{value:new Le},uPaintInvSize:{value:new Le(1,1)},uPaintColor:{value:new Re(Ce.splat)},uPaintRoughness:{value:Pn.roughness},uPaintEdgeRoughness:{value:Pn.edgeRoughness},uPaintEdgeValue:{value:Pn.edgeValue},uPaintEmissive:{value:Pn.emissive}};constructor(e,t){this.scene=e,this.materials=t,this.scene.add(this.group),nS(t.byStyle[t.paintedStyle],this.paintUniforms)}build(e,t){this.clear(),t&&(this.paintUniforms.uPaintMap.value=t.map,this.paintUniforms.uPaintMin.value=t.min,this.paintUniforms.uPaintInvSize.value=t.invSize);const n=new Map,s=new Map;for(const l of e.rooms)for(const c of l.brushes){if(c.collisionOnly)continue;const h=jy(c),d=c.kind==="prop"?s:n;let u=d.get(h);if(u||(u=Rf(),d.set(h,u)),c.kind==="floor"&&l.anchor&&c.minX<l.anchor.x-$e.half&&c.maxX>l.anchor.x+$e.half&&c.minZ<l.anchor.z-$e.half&&c.maxZ>l.anchor.z+$e.half){const f=l.anchor,m=$e.half+$e.rim;for(const[v,g,p,y]of[[c.minX,c.minZ,f.x-m,c.maxZ],[f.x+m,c.minZ,c.maxX,c.maxZ],[f.x-m,c.minZ,f.x+m,f.z-m],[f.x-m,f.z+m,f.x+m,c.maxZ]])ic(u,v,c.minY,g,p,c.maxY,y,Ha[h]);continue}ic(u,c.minX,c.minY,c.minZ,c.maxX,c.maxY,c.maxZ,Ha[h])}for(const l of Zo){const c=n.get(l);c&&!Nu(c)&&this.addMesh(l,sc(c),!1)}for(const l of Zo){const c=s.get(l);c&&!Nu(c)&&this.addMesh(l,sc(c),!0)}const r=[],a=new Map;for(const l of e.rooms)for(const c of l.props)r.push(c),a.set(c,l.id);const o=Qy(r,(l,c)=>{const h=this.addMesh("emissive",c,!1),d=this.materials.byStyle.emissive.clone(),u=d.color.clone();d.color.multiplyScalar(.18),h.material=d,this.cradleIndicators.push({roomId:a.get(l),x:l.x,z:l.z,seenCore:!1,mesh:h,material:d,base:u})});for(const l of Zo){const c=o.get(l);c&&this.addMesh(l,c,!0)}for(const l of e.rooms)l.anchor&&this.lifts.push(new ky(this.group,l,this.materials))}addMesh(e,t,n){const s=this.materials.byStyle[e],r=new Je(t,s);return r.castShadow=n&&eS.has(e),r.receiveShadow=e!=="glass"&&e!=="emissive"&&e!=="lamp"&&e!=="emergency",r.frustumCulled=!1,e==="glass"&&(r.renderOrder=1),r.userData.splatPaint=e!=="floorPlate",this.group.add(r),this.meshes.push(r),this.geometries.push(t),r}updateMachines(e){for(const t of this.lifts)t.update(e);for(const t of this.cradleIndicators){const n=e.enemies.find(a=>a.def.stationary&&a.x===t.x&&a.z===t.z);n&&(t.seenCore=!0);const s=e.runtime[t.roomId]?.state==="cleared"||t.seenCore&&(!n||!n.alive||n.state==="dying");t.mesh.visible=!s;const r=n?.state==="approach"&&n.broodRemaining>0?Math.max(0,1-n.broodTimer/br):0;t.material.color.copy(t.base).multiplyScalar(n&&!s?.4+r*.6:.18)}}clear(){for(const e of this.lifts)e.dispose();this.lifts.length=0;for(const e of this.cradleIndicators)e.material.dispose();this.cradleIndicators.length=0;for(const e of this.meshes)this.group.remove(e);for(const e of this.geometries)e.dispose();this.meshes.length=0,this.geometries.length=0}get paintReceivers(){return this.meshes}get meshCount(){return this.meshes.length+this.lifts.reduce((e,t)=>e+t.meshes.length,0)}dispose(){this.clear(),this.scene.remove(this.group)}}function nS(i,e){i.onBeforeCompile=t=>{for(const[n,s]of Object.entries(e))t.uniforms[n]=s;t.vertexShader=t.vertexShader.replace("#include <common>",`
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
      `)},i.customProgramCacheKey=()=>"clawd-floor-paint"}const lr=18;function iS(i=256){const e=document.createElement("canvas");e.width=i,e.height=i;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot build the mottle texture");t.fillStyle="#ffffff",t.fillRect(0,0,i,i);const n=Dt("clawd-mottle","specimen"),s=i/lr;for(let a=0;a<lr*lr;a++){const o=a%lr,l=Math.floor(a/lr),c=n();let h;if(c<.12)h=Ee(n,.944,.972);else if(c<.42)h=Ee(n,.975,.993);else continue;const d=Math.round(h*255);t.fillStyle=`rgb(${d},${d},${d})`,t.fillRect(o*s,l*s,s,s)}const r=new zc(e);return r.colorSpace=tn,r.wrapS=Ki,r.wrapT=Ki,r.minFilter=Wn,r.magFilter=Ct,r.generateMipmaps=!0,r.anisotropy=4,r.needsUpdate=!0,r}const sS=1.6,rS=.45,Bu=.62;function Yo(i){return i<=0?0:i>=1?1:i}function aS(i,e){const t=e>0?e:0;switch(i){case"windUp":return Yo(t/en.windUpTime)**2;case"lunge":return 1-(1-Bu)*Yo(t/en.lungeTime);case"recover":return Bu*(1-Yo(t/(en.recoverTime*rS)));default:return 0}}function oS(i,e,t){if(!t)return{lift:0,swing:0};const n=i+e;return{lift:Math.max(0,Math.sin(n))*.11,swing:Math.cos(n)*.09}}const lS=br;function cS(i,e,t,n){if(!i)return{squash:1,stance:1,eye:0};const s=.5+.5*Math.sin(e*2.4),r=n>0?1-t/lS:0,a=r<=0?0:r>=1?1:r,o=a*a;return{squash:1-s*.018-o*.12,stance:1+o*.1,eye:o}}const Hc=1.46,Df=1,Xc=.82,zs=.45,qi=zs+Df/2,zu=Hc/2-.13-.105,ku=.18,da=Xc/2-.13-.105,hS=.04,Vu=.02,ac=.19,Nf=.03,Xa=.27,Wa=.27,fa=ac+.01,oc=.045,Gu=-Xc/2+oc-.003+Nf/2,uS=[{x:-Xa,y:Wa,width:fa,height:fa,depth:oc},{x:Xa,y:Wa,width:fa,height:fa,depth:oc}],$o=[{name:"body",shape:"body",px:0,py:qi,pz:0,dark:!1,gait:0},{name:"eyeLeft",shape:"eye",px:-Xa,py:qi+Wa,pz:Gu,dark:!0,gait:0},{name:"eyeRight",shape:"eye",px:Xa,py:qi+Wa,pz:Gu,dark:!0,gait:0},{name:"sideLeft",shape:"side",px:-.905,py:qi+.1,pz:0,dark:!1,gait:0},{name:"sideRight",shape:"side",px:Hc/2+.175,py:qi+.1,pz:0,dark:!1,gait:0},{name:"legFrontLeft",shape:"leg",px:-zu,py:zs/2,pz:-da,dark:!1,gait:0},{name:"legFrontRight",shape:"leg",px:zu,py:zs/2,pz:-da,dark:!1,gait:Math.PI},{name:"legRearLeft",shape:"leg",px:-ku,py:zs/2,pz:da,dark:!1,gait:Math.PI},{name:"legRearRight",shape:"leg",px:ku,py:zs/2,pz:da,dark:!1,gait:0}];function dS(i){switch(i){case"body":return Bs(Hc,Df,Xc,hS,{sockets:uS});case"eye":return Bs(ac,ac,Nf,.008);case"side":return Bs(.35,.4,.45,Vu);default:return Bs(.21,zs,.21,Vu)}}const fS=new Xe().makeScale(0,0,0);class pS{geometries=new Map;mottle;bodyMaterial;eyeMaterial;eyeFlash;slots=[];root=new bt;part=new bt;matrix=new Xe;scene;capacity;constructor(e,t){this.scene=e,this.capacity=t,this.mottle=iS(),this.bodyMaterial=new It({color:Ce.bodyAlbedo,map:this.mottle,roughness:.78,metalness:.02}),this.eyeMaterial=mS(),this.eyeFlash=new Pr(new Float32Array(t),1);for(const n of $o){let s=this.geometries.get(n.shape);s||(s=dS(n.shape),n.shape==="eye"&&s.setAttribute("aEyeFlash",this.eyeFlash),this.geometries.set(n.shape,s));const r=new hi(s,n.dark?this.eyeMaterial:this.bodyMaterial,t);r.castShadow=!n.dark,r.receiveShadow=!1,r.frustumCulled=!1,r.count=0,this.slots.push(r),this.scene.add(r)}}update(e,t){const n=Math.min(e.length,this.capacity),s=this.eyeFlash.array;let r=!1;for(let a=0;a<n;a++){const o=e[a],l=o.def.scale,c=cS(!!o.def.brood&&o.state==="approach",o.stateTime,o.broodTimer,o.broodRemaining),h=o.state==="approach"&&o.rangedCharge>0&&o.def.ranged?1-o.rangedCharge/o.def.ranged.windUp:0,d=Math.max(aS(o.state,o.stateTime),c.eye,h);s[a]!==d&&(s[a]=d,r=!0);const u=o.prevX+(o.x-o.prevX)*t,f=o.prevZ+(o.z-o.prevZ)*t,m=gS(o.prevYaw,o.yaw,t);let v=1,g=0;o.state==="windUp"?v=1-.22*Math.min(1,o.stateTime/en.windUpTime):o.state==="lunge"?(v=1.14,g=.12):o.state==="recover"&&(v=1-.1*(1-Math.min(1,o.stateTime/en.recoverTime))),v*=c.squash,v*=1-.08*h;const p=o.hurtTime>0?o.hurtTime/.18:0;v*=1-.18*p;const y=o.def.stationary?0:Math.sin(o.gaitPhase)*.035;let E=o.def.stationary?0:Math.sin(o.gaitPhase*.5)*.05,_=1,T=1,w=0;if(o.state==="dying"){const M=Math.min(1,o.stateTime/pc.implodeTime),b=M*M;_=1-.85*b,T=1-.42*b,w=.3*b,E=0,v=1}const A=l*T;this.root.position.set(u,o.y+w,f),this.root.rotation.set(0,m+(1-_)*2.6,E),this.root.scale.set(A,A,A),this.root.updateMatrix();for(let M=0;M<$o.length;M++){const b=$o[M],R=M>=5;let P=b.px,D=b.py,X=b.pz;if(R){const U=oS(o.gaitPhase,b.gait,!o.def.stationary);P*=c.stance,D=b.py+U.lift,X=b.pz+U.swing}else D=b.py*v+y+g;P*=_,D=qi+(D-qi)*_,X*=_;const W=1-.45*(1-_);this.part.position.set(P,D,X),this.part.rotation.set(0,0,0),this.part.scale.set(W,(R?1:v)*W,W),this.part.updateMatrix(),this.matrix.multiplyMatrices(this.root.matrix,this.part.matrix),this.slots[M].setMatrixAt(a,this.matrix)}}for(let a=0;a<this.slots.length;a++){const o=this.slots[a];if(o.count>n)for(let l=n;l<o.count;l++)o.setMatrixAt(l,fS);o.count=n,o.instanceMatrix.needsUpdate=!0}r&&(this.eyeFlash.needsUpdate=!0)}dispose(){for(const e of this.slots)this.scene.remove(e),e.dispose();this.slots.length=0;for(const e of this.geometries.values())e.dispose();this.geometries.clear(),this.mottle.dispose(),this.bodyMaterial.dispose(),this.eyeMaterial.dispose()}}function mS(){const i=new It({color:Ce.eye,roughness:.45,metalness:0});return i.onBeforeCompile=e=>{e.uniforms.uEyeFlash={value:new Re(Ce.eyeFlash).multiplyScalar(sS)},e.vertexShader=e.vertexShader.replace("#include <common>",`
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
      `)},i.customProgramCacheKey=()=>"clawd-eye-flash",i}function gS(i,e,t){let n=(e-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*t}const vS=`
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vLocal;

  void main() {
    mat4 objectMatrix = modelMatrix;
    #ifdef USE_INSTANCING
      objectMatrix = modelMatrix * instanceMatrix;
    #endif
    vec4 worldPosition = objectMatrix * vec4( position, 1.0 );
    // Every core/shell uses uniform scale, including the instanced enemy pool.
    vNormalW = normalize( mat3( objectMatrix ) * normal );
    vViewDir = cameraPosition - worldPosition.xyz;
    vLocal = normalize( position );
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`,xS=`
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
`;function Ff(i={deep:Ce.violetDeep,mid:Ce.violet,rim:Ce.violetRim}){const e=new bn({vertexShader:vS,fragmentShader:xS,uniforms:{uTime:{value:0},uIntensity:{value:1.15},uDeep:{value:new Re(i.deep)},uMid:{value:new Re(i.mid)},uRim:{value:new Re(i.rim)}},transparent:!0,blending:Li,depthWrite:!1});return{material:e,setTime(t){e.uniforms.uTime.value=t}}}function Uf(i=Ce.violet){return{material:new sn({color:i,transparent:!0,opacity:.62,blending:Li,depthWrite:!1}),setTime(){}}}const Hu=new I(0,0,1);class _S{material=new sn({color:Ce.enemyCore});shell;haloMaterial=new sn({color:Ce.eyeFlash,side:gn});boltGeometry=new Qn(1,16,12);shellGeometry=new Qn(1,24,16);haloGeometry=new ja(.78,1,32);bolts=new hi(this.boltGeometry,this.material,Gt.capacity);shells;halos=new hi(this.haloGeometry,this.haloMaterial,Lt.maxAlive);transform=new bt;direction=new I;colour=new Re;scene;constructor(e,t=!0){this.scene=e,this.shell=t?Ff({deep:Ce.enemyDeep,mid:Ce.enemyEnergy,rim:Ce.enemyRim}):Uf(Ce.enemyEnergy),this.shells=new hi(this.shellGeometry,this.shell.material,Gt.capacity);for(const n of[this.bolts,this.shells,this.halos])n.count=0,n.visible=!1,n.frustumCulled=!1,n.instanceMatrix.setUsage(Jl),e.add(n)}update(e,t){this.shell.setTime(e.time);const n=this.transform;let s=0;for(const r of e.enemyBolts)r.alive&&(n.position.set(r.prevX+(r.x-r.prevX)*t,r.prevY+(r.y-r.prevY)*t,r.prevZ+(r.z-r.prevZ)*t),this.direction.set(r.vx,r.vy,r.vz).normalize(),n.quaternion.setFromUnitVectors(Hu,this.direction),n.scale.setScalar(Gt.radius*.86),n.updateMatrix(),this.bolts.setMatrixAt(s,n.matrix),n.scale.setScalar(Gt.radius*1.4),n.updateMatrix(),this.shells.setMatrixAt(s++,n.matrix));this.bolts.count=s,this.bolts.visible=s>0,this.shells.count=s,this.shells.visible=s>0,s&&(this.bolts.instanceMatrix.needsUpdate=!0,this.shells.instanceMatrix.needsUpdate=!0),s=0;for(const r of e.enemies){if(!r.alive||r.state!=="approach"||r.rangedCharge<=0||!r.def.ranged)continue;const a=1-r.rangedCharge/r.def.ranged.windUp,o=wa(r);this.direction.set(r.aimX-r.x,r.aimY-o,r.aimZ-r.z).normalize(),n.position.set(r.x,o,r.z).addScaledVector(this.direction,r.def.radius+.25),n.quaternion.setFromUnitVectors(Hu,this.direction),n.scale.setScalar(.3+.4*a),n.updateMatrix(),this.halos.setMatrixAt(s,n.matrix),this.colour.setScalar(.5+.5*a),this.halos.setColorAt(s++,this.colour)}this.halos.count=s,this.halos.visible=s>0,s&&(this.halos.instanceMatrix.needsUpdate=!0,this.halos.instanceColor.needsUpdate=!0)}dispose(){for(const e of[this.bolts,this.shells,this.halos])this.scene.remove(e),e.dispose();this.boltGeometry.dispose(),this.shellGeometry.dispose(),this.haloGeometry.dispose(),this.material.dispose(),this.shell.material.dispose(),this.haloMaterial.dispose()}}const Xu=2,lc=7,Of=.4,MS=.5,yS=lc+Of,SS=.28;class bS{group=new Yi;cores=[];shells=[];trails=[];lights=[];originIds;originX;originY;originZ;originConverge;nextOriginSlot=0;coreGeo;shellGeo;trailGeo;coreMat;shell;trailMat;trailDirection=new I;trailMidpoint=new I;trailUp=new I(0,1,0);scene;capacity;lightCount;constructor(e,t,n=!0,s=Xu){this.scene=e,this.capacity=t,this.lightCount=Math.max(0,Math.min(Xu,s)),this.originIds=new Int32Array(t),this.originX=new Float32Array(t),this.originY=new Float32Array(t),this.originZ=new Float32Array(t),this.originConverge=new Float32Array(t).fill(lc),this.originIds.fill(-1),this.coreGeo=new Qn(Vt.radius*.86,16,12),this.shellGeo=new Qn(Vt.radius*1.4,24,16),this.trailGeo=new dt(.01,.022,1,8,1,!0),this.coreMat=new sn({color:Ce.coreDark}),this.shell=n?Ff():Uf(),this.trailMat=new sn({color:Ce.violet,transparent:!0,opacity:.4,blending:Li,depthWrite:!1});for(let r=0;r<t;r++){const a=new Je(this.coreGeo,this.coreMat),o=new Je(this.shellGeo,this.shell.material),l=new Je(this.trailGeo,this.trailMat);a.visible=!1,o.visible=!1,l.visible=!1,a.frustumCulled=!1,o.frustumCulled=!1,l.frustumCulled=!1,this.group.add(l,a,o),this.cores.push(a),this.shells.push(o),this.trails.push(l)}for(let r=0;r<this.lightCount;r++){const a=new Gc(Ce.violet,0,7,2);this.group.add(a),this.lights.push(a)}this.scene.add(this.group)}beginShot(e,t,n,s,r=Number.POSITIVE_INFINITY){let a=-1;for(let o=0;o<this.capacity;o++)if(this.originIds[o]<0){a=o;break}a<0&&(a=this.nextOriginSlot,this.nextOriginSlot=(this.nextOriginSlot+1)%this.capacity),this.originIds[a]=e,this.originX[a]=t,this.originY[a]=n,this.originZ[a]=s,this.originConverge[a]=Math.max(MS,Math.min(lc,r-Of))}reset(){this.originIds.fill(-1),this.nextOriginSlot=0;for(let e=0;e<this.capacity;e++)this.cores[e].visible=!1,this.shells[e].visible=!1,this.trails[e].visible=!1;for(const e of this.lights)e.intensity=0}update(e,t,n){const s=Math.min(e.length,this.capacity);this.shell.setTime(n);for(let r=0;r<s;r++){const a=e[r];let o=a.prevX+(a.x-a.prevX)*t,l=a.prevY+(a.y-a.prevY)*t,c=a.prevZ+(a.z-a.prevZ)*t,h=-1;for(let v=0;v<this.capacity;v++){if(this.originIds[v]!==a.id)continue;h=v;const g=Vt.lifetime-a.life,p=g*Vt.speed,y=Math.min(1,p/this.originConverge[v]),E=y*y*(3-2*y);o=this.originX[v]+(o-this.originX[v])*E,l=this.originY[v]+(l-this.originY[v])*E,c=this.originZ[v]+(c-this.originZ[v])*E,g>=SS&&(this.originIds[v]=-1,h=-1);break}const d=this.cores[r],u=this.shells[r],f=this.trails[r];if(d.position.set(o,l,c),u.position.set(o,l,c),d.visible=!0,u.visible=!0,h>=0){const v=this.originX[h],g=this.originY[h],p=this.originZ[h];this.trailDirection.set(o-v,l-g,c-p);const y=this.trailDirection.length();y>.001?(this.trailDirection.multiplyScalar(1/y),this.trailMidpoint.set((o+v)*.5,(l+g)*.5,(c+p)*.5),f.position.copy(this.trailMidpoint),f.quaternion.setFromUnitVectors(this.trailUp,this.trailDirection),f.scale.set(1,y,1),f.visible=!0):f.visible=!1}else f.visible=!1;const m=1+Math.sin(n*18+r)*.07;if(u.scale.setScalar(m),u.rotation.set(n*1.3+r,n*2.2+r*2.1,0),r<this.lightCount){const v=this.lights[r];v.position.set(o,l,c),v.intensity=5.5}}for(let r=s;r<this.capacity;r++)this.cores[r].visible=!1,this.shells[r].visible=!1,this.trails[r].visible=!1;for(let r=s;r<this.lightCount;r++)this.lights[r].intensity=0}dispose(){this.scene.remove(this.group),this.coreGeo.dispose(),this.shellGeo.dispose(),this.trailGeo.dispose(),this.coreMat.dispose(),this.shell.material.dispose(),this.trailMat.dispose(),this.cores.length=0,this.shells.length=0,this.trails.length=0;for(const e of this.lights)e.dispose();this.lights.length=0,this.reset()}}const _r=384,Ei=4,hn=1e-7,wS=128,Ko=.001;function cc(i,e,t,n,s){const r=[];for(let a=0;a<i.length;a++){const o=i[a],l=i[(a+1)%i.length],c=o[0]*e+o[1]*t+o[2]*n+s,h=l[0]*e+l[1]*t+l[2]*n+s;if(c>=-hn&&r.push(o),c>hn&&h<-hn||c<-hn&&h>hn){const d=c/(c-h);r.push([o[0]+(l[0]-o[0])*d,o[1]+(l[1]-o[1])*d,o[2]+(l[2]-o[2])*d])}}return r}function ES(i,e,t){const n=i.map(d=>d[0]),s=i.map(d=>d[1]),r=e.points.map(d=>d[0]),a=e.points.map(d=>d[1]);if(Math.min(...n)>=Math.max(...r)-hn||Math.max(...n)<=Math.min(...r)+hn||Math.min(...s)>=Math.max(...a)-hn||Math.max(...s)<=Math.min(...a)+hn)return[i];const o=[];let l=i;const c=[],h=e.id<t.id?hn*4:-hn*4;c.push([e.plane[0]-t.plane[0],e.plane[1]-t.plane[1],0,e.plane[2]-t.plane[2]+h]);for(let d=0;d<e.points.length;d++){const u=e.points[d],f=e.points[(d+1)%e.points.length],m=f[0]-u[0],v=f[1]-u[1];c.push([-v,m,0,v*u[0]-m*u[1]])}for(const[d,u,f,m]of c){if(l.length<3)break;const v=cc(l,-d,-u,-f,-m);v.length>=3&&o.push(v),l=cc(l,d,u,f,m)}return o}class TS{triangles=[];cells=new Map;clear(){this.triangles=[],this.cells.clear()}build(e){this.clear();const t=new I;for(const n of e){n.updateWorldMatrix(!0,!1);const s=n.geometry.getAttribute("position"),r=n.geometry.index,a=r?.count??s.count;for(let o=0;o<a;o+=3){const l=[];for(let m=0;m<3;m++)t.fromBufferAttribute(s,r?r.getX(o+m):o+m).applyMatrix4(n.matrixWorld),l.push([t.x,t.y,t.z]);const c=new I(...l[1]).sub(new I(...l[0])),h=new I(...l[2]).sub(new I(...l[0]));if(c.cross(h),c.lengthSq()<hn*hn)continue;c.normalize();const d=this.triangles.length;this.triangles.push({points:l,normal:[c.x,c.y,c.z],paint:n.userData.splatPaint!==!1});const u=l.map(m=>m[0]),f=l.map(m=>m[2]);for(let m=Math.floor(Math.min(...u)/Ei);m<=Math.floor(Math.max(...u)/Ei);m++)for(let v=Math.floor(Math.min(...f)/Ei);v<=Math.floor(Math.max(...f)/Ei);v++){const g=`${m},${v}`;let p=this.cells.get(g);p||this.cells.set(g,p=[]),p.push(d)}}}}project(e,t,n,s){const r={positions:[],normals:[],uvs:[]},a=t.clone().normalize(),o=new Dn().setFromUnitVectors(new I(0,0,1),a);o.premultiply(new Dn().setFromAxisAngle(a,s));const l=new I(1,0,0).applyQuaternion(o),c=new I(0,1,0).applyQuaternion(o),h=n*.9,d=new Set;for(let f=Math.floor((e.x-h)/Ei);f<=Math.floor((e.x+h)/Ei);f++)for(let m=Math.floor((e.z-h)/Ei);m<=Math.floor((e.z+h)/Ei);m++)for(const v of this.cells.get(`${f},${m}`)??[])d.add(v);const u=[];for(const f of d){const m=this.triangles[f],v=new I(...m.normal),g=v.dot(a);if(g<.05)continue;let p=m.points.map(([E,_,T])=>{const w=new I(E,_,T).sub(e);return[w.dot(l)/n,w.dot(c)/n,w.dot(a)/n]});const y=[-v.dot(l)/g,-v.dot(c)/g,0];y[2]=p[0][2]-y[0]*p[0][0]-y[1]*p[0][1];for(let E=0;E<3;E++)for(const _ of[-1,1]){const T=[0,0,0];T[E]=_,p=cc(p,T[0],T[1],T[2],.5)}p.length>=3&&u.push({id:f,points:p,normal:m.normal,plane:y,paint:m.paint})}u.sort((f,m)=>m.plane[2]-f.plane[2]||f.id-m.id);for(const f of u){if(!f.paint)continue;let m=[f.points];for(const v of u)if(v!==f){if(m=m.flatMap(g=>ES(g,v,f)),m.length>wS){m=[];break}if(m.length===0)break}for(const v of m)for(let g=1;g<v.length-1;g++){const p=[v[0],v[g],v[g+1]],[y,E,_]=p;if(!((E[0]-y[0])*(_[1]-y[1])-(E[1]-y[1])*(_[0]-y[0])<hn)){if(r.positions.length/3+3>_r)return r;for(const w of p){const A=e.clone().addScaledVector(l,w[0]*n).addScaledVector(c,w[1]*n).addScaledVector(a,w[2]*n);r.positions.push(A.x+f.normal[0]*Ko,A.y+f.normal[1]*Ko,A.z+f.normal[2]*Ko),r.normals.push(...f.normal),r.uvs.push(w[0]+.5,w[1]+.5)}}}}return r}}const AS=.08,Wu=.55,so=8,Cs=new Float64Array(so),Rs=new Float64Array(so),Ps=new Float64Array(so);function CS(){return{x:0,y:0,z:0,nx:0,ny:0,nz:0,distance:0}}function RS(i,e,t,n,s,r,a,o,l,c){const h=Math.hypot(n,s),d=h>1e-4,u=d?n/h:0,f=d?s/h:0,m=d?Math.atan2(u,f):r()*Math.PI*2;let v=0;for(let p=0;p<4;p++){const y=m+p*Math.PI/2+(r()-.5)*.5;Cs[v]=Math.sin(y),Rs[v]=(r()-.5)*.5,Ps[v]=Math.cos(y),v++}for(Cs[v]=(r()-.5)*.3,Rs[v]=1,Ps[v]=(r()-.5)*.3,v++,d&&(Cs[v]=u,Rs[v]=.12,Ps[v]=f,v++);v<so;){const p=r()*Math.PI*2,y=r()*.8-.1;Cs[v]=Math.sin(p),Rs[v]=y,Ps[v]=Math.cos(p),v++}let g=0;for(let p=0;p<v&&g<c;p++){const y=Math.hypot(Cs[p],Rs[p],Ps[p]);if(y<1e-6)continue;const E=Cs[p]/y*o,_=Rs[p]/y*o,T=Ps[p]/y*o;let w=Number.POSITIVE_INFINITY,A=0,M=0,b=0;for(let H=0;H<a.length;H++){const O=a[H];if(O.kind==="floor")continue;const q=ui(i,e,t,E,_,T,O,0,Jt);q>=0&&q<w&&(w=q,A=Jt.nx,M=Jt.ny,b=Jt.nz)}if(!Number.isFinite(w))continue;const R=w*o;if(R<AS)continue;const P=i+E*w,D=e+_*w,X=t+T*w;let W=!1;for(let H=0;H<g;H++){const O=l[H],q=O.x-P,ee=O.y-D,ie=O.z-X;if(q*q+ee*ee+ie*ie<Wu*Wu){W=!0;break}}if(W)continue;const U=l[g];U.x=P,U.y=D,U.z=X,U.nx=A,U.ny=M,U.nz=b,U.distance=R,g++}return g}const Ci=6,Fs=3,Bf=2,Wc=1/Fs,qc=1/Bf,PS=.12,IS=.045,LS=.46,DS=.5;function NS(i=256){const e=i*Fs,t=i*Bf,n=document.createElement("canvas");n.width=e,n.height=t;const s=n.getContext("2d");if(!s)throw new Error("2D canvas context unavailable — cannot build the splat atlas");s.clearRect(0,0,e,t),s.fillStyle="#ffffff";for(let l=0;l<Ci;l++){const c=l%Fs,h=Math.floor(l/Fs);s.save(),s.translate(c*i,h*i),s.beginPath(),s.rect(0,0,i,i),s.clip(),US(s,i,Dt("splat-atlas",`variant-${l}`)),s.restore()}const r=document.createElement("canvas");r.width=e,r.height=t;const a=r.getContext("2d");if(!a)throw new Error("2D canvas context unavailable — cannot build the splat atlas");FS(a,s,n,i);const o=new zc(r);return o.colorSpace=Cn,o.wrapS=vn,o.wrapT=vn,o.minFilter=Wn,o.magFilter=Ct,o.generateMipmaps=!0,o.anisotropy=4,o.needsUpdate=!0,{texture:o,variantOffset(l,c){const h=l%Ci;return c.set(h%Fs*Wc,Math.floor(h/Fs)*qc)},dispose(){o.dispose()}}}function FS(i,e,t,n){const{width:s,height:r}=t,a=document.createElement("canvas");a.width=s,a.height=r;const o=a.getContext("2d");if(!o)throw new Error("2D canvas context unavailable — cannot build the splat atlas");o.filter=`blur(${(n*IS).toFixed(2)}px)`,o.drawImage(t,0,0);const l=e.getImageData(0,0,s,r).data,c=o.getImageData(0,0,s,r).data,h=i.createImageData(s,r),d=h.data;for(let u=0;u<d.length;u+=4){const f=l[u+3],m=(c[u+3]/255-LS)/DS;d[u]=255,d[u+1]=m<=0?0:m>=1?255:Math.round(m*255),d[u+2]=0,d[u+3]=f}i.putImageData(h,0,0)}function US(i,e,t){const n=e/2,s=e/2,r=e/2*(1-PS),a=9+Math.floor(t()*5),o=t()*Math.PI*2;for(let c=0;c<a;c++){const h=c/a*Math.PI*2+Ee(t,-.16,.16);OS(i,n,s,o+h,r*Ee(t,.52,.98),r*Ee(t,.115,.165),Ee(t,-.3,.3),t)}hc(i,n,s,r*Ee(t,.3,.38),20,.16,t);const l=5+Math.floor(t()*6);for(let c=0;c<l;c++){const h=t()*Math.PI*2,d=r*Ee(t,.62,.99);hc(i,n+Math.cos(h)*d,s+Math.sin(h)*d,r*Ee(t,.018,.052),9,.3,t)}}const ks=16,Is=new Float64Array((ks+1)*2),pa=new Float64Array((ks+1)*2);function OS(i,e,t,n,s,r,a,o){for(let c=0;c<=ks;c++){const h=c/ks,d=n+a*h*h,u=s*h,f=e+Math.cos(d)*u,m=t+Math.sin(d)*u,v=1-.62*h,g=1+.85*Math.exp(-(((h-.9)/.11)**2)),p=r*v*g,y=-Math.sin(d),E=Math.cos(d);Is[c*2]=f+y*p,Is[c*2+1]=m+E*p,pa[c*2]=f-y*p,pa[c*2+1]=m-E*p}i.beginPath(),i.moveTo(Is[0],Is[1]);for(let c=1;c<=ks;c++)i.lineTo(Is[c*2],Is[c*2+1]);for(let c=ks;c>=0;c--)i.lineTo(pa[c*2],pa[c*2+1]);i.closePath(),i.fill();const l=n+a;hc(i,e+Math.cos(l)*s,t+Math.sin(l)*s,r*Ee(o,.42,.62),10,.26,o)}function hc(i,e,t,n,s,r,a){if(n<=.2)return;const o=new Float64Array(s),l=new Float64Array(s);for(let c=0;c<s;c++){const h=c/s*Math.PI*2,d=n*(1+Ee(a,-r,r));o[c]=e+Math.cos(h)*d,l[c]=t+Math.sin(h)*d}i.beginPath(),i.moveTo((o[s-1]+o[0])/2,(l[s-1]+l[0])/2);for(let c=0;c<s;c++){const h=(c+1)%s;i.quadraticCurveTo(o[c],l[c],(o[c]+o[h])/2,(l[c]+l[h])/2)}i.closePath(),i.fill()}const cr=4.5,qu=4,BS=8,ma=BS,Zu=16,zS=.84,kS=.5;class VS{renderer;scene;atlas;paintTexelsPerMetre;paintMapMax;paintTarget=null;paintMin=new Le;paintInvSize=new Le;stampScene=new Ga;stampCamera=new to(-1,1,1,-1,0,1);stampGeometry;stampMaterial;stampTransform;stampParams;stampMesh;decalCapacity;decalSoftCap;decalGeometry;projection=new TS;decalVertices;decalMaterial;decalMesh;decalAttr;decalOrder;decalFade;decalFading;decalCounter=0;decalActive=0;hits=[];normal=new I;position=new I;variantUv=new Le;savedClear=new Re;index=null;nearby=[];rng=Dt("boot","effects");dripQueue=new Float32Array(Zu*5);dripCount=0;constructor(e,t,n={}){this.renderer=e,this.scene=t,this.paintTexelsPerMetre=n.paintTexelsPerMetre??20,this.paintMapMax=n.paintMapMax??2048,this.decalCapacity=n.decalCapacity??96,this.decalSoftCap=Math.floor(this.decalCapacity*zS),this.atlas=NS();for(let r=0;r<qu;r++)this.hits.push(CS());this.stampGeometry=GS(ma),this.stampTransform=this.stampGeometry.getAttribute("aStamp"),this.stampParams=this.stampGeometry.getAttribute("aParams"),this.stampMaterial=HS(this.atlas.texture),this.stampMesh=new Je(this.stampGeometry,this.stampMaterial),this.stampMesh.frustumCulled=!1,this.stampScene.add(this.stampMesh);const s=this.decalCapacity*_r;this.decalVertices=new Uint16Array(this.decalCapacity),this.decalGeometry=new Ot;for(const[r,a]of[["position",3],["normal",3],["uv",2],["aSplat",4]])this.decalGeometry.setAttribute(r,new Xt(new Float32Array(s*a),a).setUsage(Jl));this.decalAttr=this.decalGeometry.getAttribute("aSplat"),this.decalGeometry.setIndex(new Xt(new Uint32Array(s),1).setUsage(Jl)),this.decalGeometry.setDrawRange(0,0),this.decalMaterial=XS(this.atlas.texture),this.decalMesh=new Je(this.decalGeometry,this.decalMaterial),this.decalMesh.frustumCulled=!1,this.decalMesh.castShadow=!1,this.decalMesh.receiveShadow=!0,this.decalMesh.renderOrder=1,this.decalOrder=new Float64Array(this.decalCapacity).fill(-1),this.decalFade=new Float32Array(this.decalCapacity),this.decalFading=new Uint8Array(this.decalCapacity),this.decalMesh.visible=!1,this.scene.add(this.decalMesh)}beginFacility(e,t,n){this.index=t,this.rng=Dt(n,"effects");const s=Math.max(1,e.maxX-e.minX),r=Math.max(1,e.maxZ-e.minZ);this.paintMin.set(e.minX,e.minZ),this.paintInvSize.set(1/s,1/r);const a=Math.min(this.paintTexelsPerMetre,this.paintMapMax/Math.max(s,r)),o=Math.max(64,Math.round(s*a)),l=Math.max(64,Math.round(r*a));this.paintTarget&&(this.paintTarget.width!==o||this.paintTarget.height!==l)&&(this.paintTarget.dispose(),this.paintTarget=null),this.paintTarget||(this.paintTarget=new Ln(o,l,{depthBuffer:!1,stencilBuffer:!1,format:Sn,type:un,colorSpace:Cn,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),this.paintTarget.texture.wrapS=vn,this.paintTarget.texture.wrapT=vn),this.stampMaterial.uniforms.uPaintMin.value.copy(this.paintMin),this.stampMaterial.uniforms.uPaintInvSize.value.copy(this.paintInvSize),this.dripCount=0,this.clearPaint(),this.clearDecals(),this.stampContamination(e)}stampContamination(e){const t=this.paintTarget;if(!t)return;const n=this.stampTransform.array,s=this.stampParams.array,r=this.renderer.getRenderTarget();let a=0;const o=()=>{a!==0&&(this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=a,this.renderer.setRenderTarget(t),this.renderer.render(this.stampScene,this.stampCamera),a=0)};for(const l of e.rooms)for(const c of l.contamination)n[a*4]=c.x,n[a*4+1]=c.z,n[a*4+2]=c.variant*Math.PI*2,n[a*4+3]=c.radius*2,this.atlas.variantOffset(Math.min(Ci-1,Math.floor(c.variant*Ci)),this.variantUv),s[a*4]=this.variantUv.x,s[a*4+1]=this.variantUv.y,s[a*4+2]=c.brightness,s[a*4+3]=c.coverage,a++,a===ma&&o();o(),this.renderer.setRenderTarget(r)}get floorPaint(){return this.paintTarget?{map:this.paintTarget.texture,min:this.paintMin,invSize:this.paintInvSize}:null}splat(e,t,n,s,r,a){this.stampFloor(e,n,s,r,a),this.placeDecals(e,t,n,s,r,a)}stampDrip(e,t,n,s,r){if(this.dripCount>=Zu)return;const a=this.dripCount*5;this.dripQueue[a]=e,this.dripQueue[a+1]=t,this.dripQueue[a+2]=n,this.dripQueue[a+3]=s,this.dripQueue[a+4]=r,this.dripCount++}update(e){if(this.dripCount>0&&this.flushDrips(),this.decalActive===0)return;let t=!1;for(let n=0;n<this.decalCapacity;n++){if(this.decalOrder[n]<0||this.decalFading[n]===0)continue;const s=this.decalFade[n]-e/kS;s<=0?this.freeDecal(n):(this.decalFade[n]=s,this.setDecalFade(n,s)),t=!0}t&&(this.decalAttr.needsUpdate=!0,this.refreshDecalDraws())}dispose(){this.scene.remove(this.decalMesh),this.projection.clear(),this.decalGeometry.dispose(),this.decalMaterial.dispose(),this.stampScene.remove(this.stampMesh),this.stampGeometry.dispose(),this.stampMaterial.dispose(),this.paintTarget?.dispose(),this.paintTarget=null,this.atlas.dispose()}stampFloor(e,t,n,s,r){const a=this.paintTarget;if(!a)return;const o=this.stampTransform.array,l=this.stampParams.array,c=this.rng,h=Math.hypot(s,r),d=h>1e-4?s/h:0,u=h>1e-4?r/h:0;let f=0;const m=(p,y,E,_)=>{f>=ma||(o[f*4]=p,o[f*4+1]=y,o[f*4+2]=c()*Math.PI*2,o[f*4+3]=E,this.atlas.variantOffset(Math.floor(c()*Ci),this.variantUv),l[f*4]=this.variantUv.x,l[f*4+1]=this.variantUv.y,l[f*4+2]=_,l[f*4+3]=1,f++)};m(e,t,3*n,Ee(c,.9,1.12));const v=4+Math.floor(c()*3);for(let p=0;p<v;p++){const y=Ee(c,-1.15,1.15),E=d*Math.cos(y)-u*Math.sin(y),_=d*Math.sin(y)+u*Math.cos(y),T=Ee(c,.8,2.6)*n,w=c()*Math.PI*2,A=h>1e-4?0:Ee(c,.8,2.4)*n;m(e+E*T+Math.cos(w)*A,t+_*T+Math.sin(w)*A,Ee(c,.7,1.7)*n,Ee(c,.78,1.15))}this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=f;const g=this.renderer.getRenderTarget();this.renderer.setRenderTarget(a),this.renderer.render(this.stampScene,this.stampCamera),this.renderer.setRenderTarget(g)}flushDrips(){const e=this.paintTarget;if(!e){this.dripCount=0;return}const t=this.stampTransform.array,n=this.stampParams.array,s=this.renderer.getRenderTarget();let r=0;const a=()=>{r!==0&&(this.stampTransform.needsUpdate=!0,this.stampParams.needsUpdate=!0,this.stampGeometry.instanceCount=r,this.renderer.setRenderTarget(e),this.renderer.render(this.stampScene,this.stampCamera),r=0)};for(let o=0;o<this.dripCount;o++){const l=o*5,c=this.dripQueue[l+4];t[r*4]=this.dripQueue[l],t[r*4+1]=this.dripQueue[l+1],t[r*4+2]=c*Math.PI*2,t[r*4+3]=this.dripQueue[l+2],this.atlas.variantOffset(Math.min(Ci-1,Math.floor(c*Ci)),this.variantUv),n[r*4]=this.variantUv.x,n[r*4+1]=this.variantUv.y,n[r*4+2]=this.dripQueue[l+3],n[r*4+3]=1,r++,r===ma&&a()}a(),this.renderer.setRenderTarget(s),this.dripCount=0}clearPaint(){const e=this.paintTarget;if(!e)return;this.renderer.getClearColor(this.savedClear);const t=this.renderer.getClearAlpha(),n=this.renderer.getRenderTarget();this.renderer.setRenderTarget(e),this.renderer.setClearColor(0,0),this.renderer.clear(!0,!1,!1),this.renderer.setRenderTarget(n),this.renderer.setClearColor(this.savedClear,t)}placeDecals(e,t,n,s,r,a){const o=t+.9*s,l=this.index;if(!l)return;l.query(e-cr,n-cr,e+cr,n+cr,this.nearby);const c=RS(e,o,n,r,a,this.rng,this.nearby,cr,this.hits,qu);for(let h=0;h<c;h++){const d=this.hits[h];this.normal.set(e-d.x,o-d.y,n-d.z).normalize();const u=this.rng()*Math.PI*2,f=Math.max(1.1,2.5-.16*d.distance)*s*Ee(this.rng,.85,1.15);this.position.set(d.x,d.y,d.z);const m=this.projection.project(this.position,this.normal,f,u);this.atlas.variantOffset(Math.floor(this.rng()*Ci),this.variantUv);const v=Ee(this.rng,.82,1.14);if(m.positions.length===0)continue;const g=this.allocateDecal();if(g<0)break;const p=g*_r;this.decalVertices[g]=m.positions.length/3;for(const[y,E,_]of[["position",m.positions,3],["normal",m.normals,3],["uv",m.uvs,2]]){const T=this.decalGeometry.getAttribute(y);T.array.set(E,p*_),T.addUpdateRange(p*_,E.length),T.needsUpdate=!0}for(let y=p;y<p+this.decalVertices[g];y++)this.decalAttr.setXYZW(y,this.variantUv.x,this.variantUv.y,1,v);this.decalAttr.addUpdateRange(p*4,this.decalVertices[g]*4)}c>0&&(this.refreshDecalDraws(),this.decalAttr.needsUpdate=!0,this.retireOldest())}allocateDecal(){for(let t=0;t<this.decalCapacity;t++)if(this.decalOrder[t]<0)return this.decalOrder[t]=this.decalCounter++,this.decalFade[t]=1,this.decalFading[t]=0,this.decalActive++,t;let e=-1;for(let t=0;t<this.decalCapacity;t++)this.decalFading[t]!==0&&(e<0||this.decalOrder[t]<this.decalOrder[e])&&(e=t);if(e<0){e=0;for(let t=1;t<this.decalCapacity;t++)this.decalOrder[t]<this.decalOrder[e]&&(e=t)}return this.decalOrder[e]=this.decalCounter++,this.decalFade[e]=1,this.decalFading[e]=0,e}retireOldest(){let e=0;for(let n=0;n<this.decalCapacity;n++)this.decalOrder[n]>=0&&this.decalFading[n]===0&&e++;let t=e-this.decalSoftCap;for(;t>0;){let n=-1;for(let s=0;s<this.decalCapacity;s++)this.decalOrder[s]<0||this.decalFading[s]===1||(n<0||this.decalOrder[s]<this.decalOrder[n])&&(n=s);if(n<0)return;this.decalFading[n]=1,t--}}freeDecal(e){this.decalOrder[e]<0||(this.decalOrder[e]=-1,this.decalFade[e]=0,this.decalFading[e]=0,this.decalVertices[e]=0,this.decalActive--)}clearDecals(){for(let e=0;e<this.decalCapacity;e++)this.decalOrder[e]=-1,this.decalFade[e]=0,this.decalFading[e]=0,this.decalVertices[e]=0;this.decalCounter=0,this.decalActive=0,this.decalAttr.needsUpdate=!0,this.refreshDecalDraws()}setReceivers(e){this.projection.build(e)}setDecalFade(e,t){const n=e*_r;for(let s=n;s<n+this.decalVertices[e];s++)this.decalAttr.setZ(s,t);this.decalAttr.addUpdateRange(n*4,this.decalVertices[e]*4)}refreshDecalDraws(){const e=this.decalGeometry.index;let t=0;for(let n=0;n<this.decalCapacity;n++)for(let s=0;s<this.decalVertices[n];s++)e.setX(t++,n*_r+s);e.addUpdateRange(0,t),e.needsUpdate=!0,this.decalGeometry.setDrawRange(0,t),this.decalMesh.visible=t>0}get decalCount(){return this.decalActive}get settledDecalCount(){let e=0;for(let t=0;t<this.decalCapacity;t++)this.decalOrder[t]>=0&&this.decalFading[t]===0&&e++;return e}}function GS(i){const e=new Rg;return e.setAttribute("position",new Xt(new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),3)),e.setAttribute("uv",new Xt(new Float32Array([0,0,1,0,1,1,0,1]),2)),e.setIndex([0,1,2,0,2,3]),e.setAttribute("aStamp",new Pr(new Float32Array(i*4),4)),e.setAttribute("aParams",new Pr(new Float32Array(i*4),4)),e.instanceCount=0,e}function HS(i){return new bn({uniforms:{uAtlas:{value:i},uPaintMin:{value:new Le},uPaintInvSize:{value:new Le}},vertexShader:`
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
        vUv = uv * vec2( ${Wc.toFixed(6)}, ${qc.toFixed(6)} ) + aParams.xy;
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
    `,transparent:!0,depthTest:!1,depthWrite:!1,blending:Gd,blendEquation:oi,blendSrc:ul,blendDst:Tr,blendEquationAlpha:oi,blendSrcAlpha:ul,blendDstAlpha:Tr})}function XS(i){const e=new It({color:Ce.splat,emissive:Ce.splat,emissiveIntensity:Pn.emissive,roughness:Pn.roughness,metalness:0,transparent:!0,depthWrite:!1,alphaTest:.04,side:di,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4});return e.onBeforeCompile=t=>{t.uniforms.uSplatAtlas={value:i},t.vertexShader=t.vertexShader.replace("#include <common>",`
        #include <common>
        attribute vec4 aSplat;
        varying vec2 vSplatUv;
        varying vec2 vSplatFadeBright;
      `).replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vSplatUv = uv * vec2( ${Wc.toFixed(6)}, ${qc.toFixed(6)} ) + aSplat.xy;
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
            * mix( ${Pn.edgeValue.toFixed(3)}, 1.0, splatThickness );
        }
      `).replace("#include <roughnessmap_fragment>",`
        #include <roughnessmap_fragment>
        roughnessFactor = mix(
          ${Pn.edgeRoughness.toFixed(3)},
          ${Pn.roughness.toFixed(3)},
          splatThickness
        );
      `)},e.customProgramCacheKey=()=>"clawd-splat-surface-patch",e}const WS=16,qS=.85,ZS=16,YS=7,$S=.34,KS=3.4,Yu=.13,ga=new Xe().makeScale(0,0,0);class JS{scene;dropletCapacity;dropletGeometry;dropletMaterial;droplets;px;py;pz;vx;vy;vz;size;spin;life;mark;markVariant;markBright;nextDroplet=0;activeDroplets=0;onDropletLand=null;flashCapacity;flashGeometry;flashMaterial;flashes;flashX;flashY;flashZ;flashScale;flashLife;nextFlash=0;matrix=new Xe;position=new I;quaternion=new Dn;euler=new Nn;scaleVec=new I;colour=new Re;floorY=0;rng=Dt("boot","effects-burst");constructor(e,t={}){this.scene=e,this.dropletCapacity=t.dropletCapacity??160,this.flashCapacity=t.flashCapacity??6,this.dropletGeometry=new yt(1,1,1),this.dropletMaterial=new It({color:Ce.splat,emissive:Ce.splat,emissiveIntensity:Pn.emissive,roughness:Pn.roughness,metalness:0}),this.droplets=new hi(this.dropletGeometry,this.dropletMaterial,this.dropletCapacity),this.droplets.frustumCulled=!1,this.droplets.castShadow=!1,this.droplets.count=this.dropletCapacity,this.px=new Float32Array(this.dropletCapacity),this.py=new Float32Array(this.dropletCapacity),this.pz=new Float32Array(this.dropletCapacity),this.vx=new Float32Array(this.dropletCapacity),this.vy=new Float32Array(this.dropletCapacity),this.vz=new Float32Array(this.dropletCapacity),this.size=new Float32Array(this.dropletCapacity),this.spin=new Float32Array(this.dropletCapacity),this.life=new Float32Array(this.dropletCapacity),this.mark=new Uint8Array(this.dropletCapacity),this.markVariant=new Float32Array(this.dropletCapacity),this.markBright=new Float32Array(this.dropletCapacity),this.flashGeometry=new Qn(.5,12,8),this.flashMaterial=new sn({color:Ce.splat,transparent:!0,opacity:.52,blending:Li,depthWrite:!1}),this.flashes=new hi(this.flashGeometry,this.flashMaterial,this.flashCapacity),this.flashes.frustumCulled=!1,this.flashes.count=this.flashCapacity,this.flashes.renderOrder=2,this.flashX=new Float32Array(this.flashCapacity),this.flashY=new Float32Array(this.flashCapacity),this.flashZ=new Float32Array(this.flashCapacity),this.flashScale=new Float32Array(this.flashCapacity),this.flashLife=new Float32Array(this.flashCapacity),this.reset(),this.scene.add(this.droplets),this.scene.add(this.flashes)}beginRoom(e,t){this.floorY=e,this.rng=Dt(t,"effects-burst"),this.reset()}burst(e,t,n,s,r,a){const o=this.rng,l=t+.72*s;this.spawnFlash(e,l,n,s);const c=Math.round(WS*s);for(let h=0;h<c;h++){const d=this.nextDroplet;this.nextDroplet=(this.nextDroplet+1)%this.dropletCapacity,this.life[d]<=0&&this.activeDroplets++;const u=o()*Math.PI*2,f=Ee(o,.25,1),m=Ee(o,2.4,6.2)*s,v=Math.sqrt(Math.max(0,1-f*f));this.px[d]=e+Math.cos(u)*.12*s,this.py[d]=l,this.pz[d]=n+Math.sin(u)*.12*s,this.vx[d]=(Math.cos(u)*v+r*.55)*m,this.vy[d]=f*m*.85,this.vz[d]=(Math.sin(u)*v+a*.55)*m,this.size[d]=Ee(o,.07,.19)*s,this.spin[d]=Ee(o,-14,14),this.life[d]=qS*Ee(o,.7,1.15),this.mark[d]=o()<$S?1:0,this.markVariant[d]=o(),this.markBright[d]=Ee(o,.66,.92)}}update(e,t){let n=!1;for(let r=0;r<this.dropletCapacity;r++){if(this.life[r]<=0)continue;n=!0;const a=this.life[r]-e;if(this.life[r]=a,a<=0){this.activeDroplets--,this.droplets.setMatrixAt(r,ga);continue}this.vy[r]=this.vy[r]-ZS*e,this.px[r]=this.px[r]+this.vx[r]*e,this.py[r]=this.py[r]+this.vy[r]*e,this.pz[r]=this.pz[r]+this.vz[r]*e;const o=this.floorY+this.size[r]*.5;if(this.py[r]<=o){this.py[r]=o,this.vy[r]=0,this.mark[r]===1&&(this.mark[r]=0,this.onDropletLand?.(this.px[r],this.pz[r],this.size[r]*KS,this.markBright[r],this.markVariant[r]));const h=Math.max(0,1-YS*e);this.vx[r]=this.vx[r]*h,this.vz[r]=this.vz[r]*h}const l=Math.min(1,a/.22),c=this.size[r]*l;this.position.set(this.px[r],this.py[r],this.pz[r]),this.euler.set(t*this.spin[r],t*this.spin[r]*.7,0),this.quaternion.setFromEuler(this.euler),this.scaleVec.set(c,c,c),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.droplets.setMatrixAt(r,this.matrix)}n&&(this.droplets.instanceMatrix.needsUpdate=!0);let s=!1;for(let r=0;r<this.flashCapacity;r++){if(this.flashLife[r]<=0)continue;s=!0;const a=this.flashLife[r]-e;if(this.flashLife[r]=a,a<=0){this.flashes.setMatrixAt(r,ga);continue}const o=1-a/Yu,l=this.flashScale[r]*(.35+1.25*Math.sqrt(o));this.position.set(this.flashX[r],this.flashY[r],this.flashZ[r]),this.quaternion.identity(),this.scaleVec.set(l,l,l),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.flashes.setMatrixAt(r,this.matrix);const c=Math.max(0,1-o);this.colour.setHex(Ce.splat).multiplyScalar(c*c*c),this.flashes.setColorAt(r,this.colour)}s&&(this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0))}get dropletCount(){return this.activeDroplets}reset(){this.life.fill(0),this.flashLife.fill(0),this.mark.fill(0),this.nextDroplet=0,this.nextFlash=0,this.activeDroplets=0;for(let e=0;e<this.dropletCapacity;e++)this.droplets.setMatrixAt(e,ga);for(let e=0;e<this.flashCapacity;e++)this.flashes.setMatrixAt(e,ga),this.flashes.setColorAt(e,this.colour.setHex(Ce.splat));this.droplets.instanceMatrix.needsUpdate=!0,this.flashes.instanceMatrix.needsUpdate=!0,this.flashes.instanceColor&&(this.flashes.instanceColor.needsUpdate=!0)}dispose(){this.scene.remove(this.droplets),this.scene.remove(this.flashes),this.droplets.dispose(),this.flashes.dispose(),this.dropletGeometry.dispose(),this.dropletMaterial.dispose(),this.flashGeometry.dispose(),this.flashMaterial.dispose()}spawnFlash(e,t,n,s){const r=this.nextFlash;this.nextFlash=(this.nextFlash+1)%this.flashCapacity,this.flashX[r]=e,this.flashY[r]=t,this.flashZ[r]=n,this.flashScale[r]=.95*s,this.flashLife[r]=Yu}}const QS=.16,$u=.8,jS=2,eb=.86;function Zc(i){return i<=0?0:i>=1?1:i}function tb(i,e){const t=Zc(i);return e*($u+(jS-$u)*Math.sqrt(t))}function nb(i){const e=1-Zc(i);return e*e}function ib(i,e){const t=1-Zc(i);return e*eb*Math.sqrt(t*t*t)}const Jo=.012,sb=.7,rb=.92,va=new Xe().makeScale(0,0,0),ab=new I(0,0,1);class ob{scene;capacity;ringGeometry;coreGeometry;ringMaterial;coreMaterial;rings;cores;x;y;z;nx;ny;nz;size;life;total;fresh;next=0;live=0;matrix=new Xe;position=new I;normal=new I;quaternion=new Dn;scaleVec=new I;colour=new Re;rng=Dt("boot","effects-impact");constructor(e,t={}){this.scene=e,this.capacity=Math.max(1,t.capacity??8),this.ringGeometry=new ja(.72,1,28,1),this.coreGeometry=new kc(1,20),this.ringMaterial=new sn({color:16777215,transparent:!0,opacity:sb,blending:Li,depthWrite:!1,side:gn,forceSinglePass:!0}),this.coreMaterial=new sn({color:Ce.coreDark,transparent:!0,opacity:rb,depthWrite:!1,side:gn,forceSinglePass:!0}),this.rings=new hi(this.ringGeometry,this.ringMaterial,this.capacity),this.cores=new hi(this.coreGeometry,this.coreMaterial,this.capacity);for(const n of[this.rings,this.cores])n.frustumCulled=!1,n.castShadow=!1,n.receiveShadow=!1,n.count=this.capacity;this.cores.renderOrder=2,this.rings.renderOrder=3,this.x=new Float32Array(this.capacity),this.y=new Float32Array(this.capacity),this.z=new Float32Array(this.capacity),this.nx=new Float32Array(this.capacity),this.ny=new Float32Array(this.capacity),this.nz=new Float32Array(this.capacity),this.size=new Float32Array(this.capacity),this.life=new Float32Array(this.capacity),this.total=new Float32Array(this.capacity),this.fresh=new Uint8Array(this.capacity),this.reset(),this.scene.add(this.cores),this.scene.add(this.rings)}beginRun(e){this.rng=Dt(e,"effects-impact"),this.reset()}spawn(e,t,n,s,r,a){const o=this.next;this.next=(this.next+1)%this.capacity,this.life[o]<=0&&this.live++,this.x[o]=e+s*Jo,this.y[o]=t+r*Jo,this.z[o]=n+a*Jo,this.nx[o]=s,this.ny[o]=r,this.nz[o]=a,this.size[o]=Ee(this.rng,.9,1.15);const l=QS*Ee(this.rng,.9,1.1);this.total[o]=l,this.life[o]=l,this.fresh[o]=1}update(e){let t=!1;for(let n=0;n<this.capacity;n++){if(this.life[n]<=0)continue;t=!0;const s=this.life[n]-(this.fresh[n]?0:e);if(this.fresh[n]=0,this.life[n]=s,s<=0){this.rings.setMatrixAt(n,va),this.cores.setMatrixAt(n,va),this.live--;continue}const r=1-s/this.total[n],a=this.size[n];this.position.set(this.x[n],this.y[n],this.z[n]),this.normal.set(this.nx[n],this.ny[n],this.nz[n]),this.quaternion.setFromUnitVectors(ab,this.normal);const o=tb(r,Vt.radius)*a;this.scaleVec.set(o,o,1),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.rings.setMatrixAt(n,this.matrix),this.colour.setHex(Ce.violet).multiplyScalar(nb(r)),this.rings.setColorAt(n,this.colour);const l=ib(r,Vt.radius)*a;this.scaleVec.set(l,l,1),this.matrix.compose(this.position,this.quaternion,this.scaleVec),this.cores.setMatrixAt(n,this.matrix)}this.rings.visible=this.live>0,this.cores.visible=this.live>0,t&&(this.rings.instanceMatrix.needsUpdate=!0,this.cores.instanceMatrix.needsUpdate=!0,this.rings.instanceColor&&(this.rings.instanceColor.needsUpdate=!0))}get liveCount(){return this.live}get poolCapacity(){return this.capacity}reset(){this.life.fill(0),this.fresh.fill(0),this.next=0,this.live=0,this.rings.visible=!1,this.cores.visible=!1;for(let e=0;e<this.capacity;e++)this.rings.setMatrixAt(e,va),this.cores.setMatrixAt(e,va),this.rings.setColorAt(e,this.colour.setHex(Ce.violet));this.rings.instanceMatrix.needsUpdate=!0,this.cores.instanceMatrix.needsUpdate=!0,this.rings.instanceColor&&(this.rings.instanceColor.needsUpdate=!0)}dispose(){this.scene.remove(this.rings),this.scene.remove(this.cores),this.rings.dispose(),this.cores.dispose(),this.ringGeometry.dispose(),this.coreGeometry.dispose(),this.ringMaterial.dispose(),this.coreMaterial.dispose()}}const Qo=[],Ls=1e-6,lb=["minX","minY","minZ"],cb=["maxX","maxY","maxZ"],hb=["x","y","z"],jo=["nx","ny","nz"];function ub(i,e,t){const n=Vt.radius;t.x=e.x-e.nx*n,t.y=e.y-e.ny*n,t.z=e.z-e.nz*n,t.nx=e.nx,t.ny=e.ny,t.nz=e.nz,i.query(e.x-n,e.z-n,e.x+n,e.z+n,Qo);let s=-1/0;for(const r of Qo){let a=-1/0,o=1/0,l=-1,c=!0;for(let h=0;h<3;h++){const d=e[hb[h]],u=e[jo[h]],f=r[lb[h]],m=r[cb[h]];if(d<f-n-Ls||d>m+n+Ls){c=!1;break}if(Math.abs(u)<Ls){if(d<f-Ls||d>m+Ls){c=!1;break}continue}const v=(f-d)/u,g=(m-d)/u;a=Math.max(a,Math.min(v,g));const p=Math.max(v,g);p<o&&(o=p,l=h)}!c||l<0||a>o+Ls||o<=s||(s=o,t.x=e.x+e.nx*o,t.y=e.y+e.ny*o,t.z=e.z+e.nz*o,t.nx=0,t.ny=0,t.nz=0,t[jo[l]]=Math.sign(e[jo[l]]))}Qo.length=0}const hr=new I(.42,-.14,-.8),el=.16,tl=-.02,nl=.05,db=.84,ur=-.63,Ku=.16,fb=.32;function yn(i,e,t=20){const n=new dt(i,i,e,t,1);return n.rotateX(Math.PI/2),n}function pb(i,e,t,n=20){const s=new dt(i,e,t,n,1);return s.rotateX(Math.PI/2),s}function Ju(i,e,t=16){const n=new dt(i,i,e,t,1);return n.rotateZ(Math.PI/2),n}function xa(i,e,t=24){return new eo(i,e,8,t)}function Qu(i,e,t=24){const n=new eo(i,e,8,t);return n.rotateY(Math.PI/2),n}class mb{group=new Yi;materials=new Map;geometries=[];meshes=[];core;rotor;muzzleLaunchCore;muzzleLaunchBolt;emissiveMaterial;muzzleLaunchMaterial;emissiveBase=new Re(Ce.violet);muzzleClip=new I;muzzleRay=new I;swayX=0;swayY=0;recoil=0;bob=0;spin=0;muzzleLaunchTime=0;viewScene;constructor(e){this.viewScene=e,this.materials.set("gold",new It({color:Ce.gold,metalness:.95,roughness:.26,envMapIntensity:1.5})),this.materials.set("shellWarm",new It({color:Ce.shellWarm,metalness:.28,roughness:.34,envMapIntensity:1.1})),this.materials.set("shellCool",new It({color:Ce.shellCool,metalness:.72,roughness:.3,envMapIntensity:1.3})),this.materials.set("dark",new It({color:Ce.mechDark,metalness:.6,roughness:.5})),this.materials.set("accent",new It({color:9380896,metalness:.3,roughness:.4})),this.emissiveMaterial=new sn({color:Ce.violet}),this.materials.set("emissive",this.emissiveMaterial),this.muzzleLaunchMaterial=new sn({color:Ce.violetRim,transparent:!0,opacity:0,blending:Li,depthWrite:!1});const t=new Map,n=(l,c,h=0,d=0,u=0)=>{c.translate(h,d,u);const f=t.get(l);f?f.push(c):t.set(l,[c])};n("dark",yn(.058,1.05,16),0,0,-.14),n("shellCool",yn(.092,.66),0,0,-.12),n("gold",yn(.108,.1),0,0,-.4),n("gold",yn(.106,.075),0,0,-.2),n("gold",yn(.104,.06),0,0,0),n("gold",yn(.102,.05),0,0,.17),n("shellWarm",yn(.098,.075),0,0,-.5),n("gold",yn(.092,.055),0,0,-.555),n("shellCool",yn(.082,.035),0,0,-.593),n("gold",pb(.07,.08,.03),0,0,ur),n("shellWarm",new yt(.185,.15,.22),0,-.005,.29),n("gold",new yt(.196,.028,.2),0,.078,.29),n("gold",new yt(.196,.024,.16),0,-.085,.29),n("dark",new yt(.13,.105,.035),0,-.005,.405),n("gold",new yt(.152,.126,.018),0,-.005,.393),n("dark",new yt(.06,.085,.16),0,-.125,.19),n("shellWarm",new yt(.115,.055,.4),0,.108,-.12),n("gold",new yt(.102,.03,.2),0,.148,.02);for(let l=0;l<5;l++)n("dark",new yt(.082,.014,.012),0,.161,-.06+l*.04);n("gold",new yt(.036,.115,.34),-.098,.015,.06),n("dark",new yt(.013,.055,.26),-.12,.015,.06),n("gold",Qu(.08,.015),-.092,0,-.17),n("dark",Ju(.07,.026),-.088,0,-.17),n("emissive",Qu(.052,.01),-.102,0,-.17),n("shellCool",Ju(.028,.046),-.106,0,-.17),n("emissive",xa(.046,.008),0,0,-.558),n("emissive",xa(.035,.007),0,0,-.596),n("emissive",xa(.024,.006),0,0,ur+.006),n("shellCool",yn(.012,.22,10),-.082,-.095,.12),n("accent",yn(.019,.05,10),-.082,-.095,.235);for(const[l,c]of t){const h=rc(c,!1);for(const u of c)u.dispose();if(!h)continue;this.geometries.push(h);const d=new Je(h,this.materials.get(l));this.group.add(d),this.meshes.push(d)}const s=new Qn(.036,14,10);this.geometries.push(s),this.core=new Je(s,this.emissiveMaterial),this.core.position.set(0,0,ur+.01),this.group.add(this.core);const r=new Qn(.055,12,8);this.geometries.push(r),this.muzzleLaunchCore=new Je(r,this.muzzleLaunchMaterial),this.muzzleLaunchCore.visible=!1,this.group.add(this.muzzleLaunchCore),this.meshes.push(this.muzzleLaunchCore);const a=yn(.022,1,8);this.geometries.push(a),this.muzzleLaunchBolt=new Je(a,this.muzzleLaunchMaterial),this.muzzleLaunchBolt.visible=!1,this.group.add(this.muzzleLaunchBolt),this.meshes.push(this.muzzleLaunchBolt);const o=xa(.104,.013,28);this.geometries.push(o),this.rotor=new Je(o,this.materials.get("gold")),this.rotor.position.set(0,0,-.4),this.group.add(this.rotor),this.group.position.copy(hr),this.group.rotation.set(tl,el,nl),this.group.scale.setScalar(db),this.viewScene.add(this.group)}writeMuzzleWorld(e,t,n){this.group.updateWorldMatrix(!0,!0),this.core.getWorldPosition(this.muzzleClip),this.muzzleClip.project(t),this.muzzleRay.set(this.muzzleClip.x,this.muzzleClip.y,.5).unproject(e).sub(e.position).normalize(),n.copy(e.position).addScaledVector(this.muzzleRay,.72)}kick(){this.recoil=1,this.muzzleLaunchTime=Ku}reset(){this.swayX=0,this.swayY=0,this.recoil=0,this.bob=0,this.spin=0,this.muzzleLaunchTime=0,this.group.position.copy(hr),this.group.rotation.set(tl,el,nl),this.core.scale.setScalar(1.2),this.emissiveMaterial.color.copy(this.emissiveBase),this.rotor.rotation.z=0,this.muzzleLaunchCore.visible=!1,this.muzzleLaunchBolt.visible=!1,this.muzzleLaunchMaterial.opacity=0}update(e,t,n,s,r){const a=Math.max(-.05,Math.min(.05,-t*.9)),o=Math.max(-.05,Math.min(.05,-n*.9));this.swayX=Us(this.swayX,a,9,e),this.swayY=Us(this.swayY,o,9,e),this.recoil=Us(this.recoil,0,11,e),this.bob=Us(this.bob,s>.4?1:0,6,e);const l=r*9.5,c=Math.sin(l)*.012*this.bob,h=Math.abs(Math.cos(l))*.014*this.bob;this.group.position.set(hr.x+this.swayX+c,hr.y+this.swayY-h,hr.z+this.recoil*.075),this.group.rotation.set(tl+this.recoil*.16-this.swayY*.5,el+this.swayX*.6,nl+this.swayX*.35);const d=1-this.recoil;this.core.scale.setScalar(.45+d*.75),this.emissiveMaterial.color.copy(this.emissiveBase).multiplyScalar(.35+d*.65),this.muzzleLaunchTime=Math.max(0,this.muzzleLaunchTime-e);const u=1-this.muzzleLaunchTime/Ku,f=fb*u,m=this.muzzleLaunchTime>0;this.muzzleLaunchCore.visible=m,this.muzzleLaunchBolt.visible=m,m?(this.muzzleLaunchCore.position.set(0,0,ur-f),this.muzzleLaunchCore.scale.setScalar(.8+u*.35),this.muzzleLaunchBolt.position.set(0,0,ur-f*.5),this.muzzleLaunchBolt.scale.set(1,1,Math.max(.02,f)),this.muzzleLaunchMaterial.opacity=(1-u)*.9):this.muzzleLaunchMaterial.opacity=0,this.spin+=e*(2+this.recoil*26),this.rotor.rotation.z=this.spin}dispose(){this.viewScene.remove(this.group);for(const e of this.meshes)this.group.remove(e);this.meshes.length=0;for(const e of this.geometries)e.dispose();for(const e of this.materials.values())e.dispose();this.muzzleLaunchMaterial.dispose(),this.geometries.length=0,this.materials.clear()}}class gb{bobPhase=0;bobAmount=0;shake=0;shakeSeed=0;camera;constructor(e){this.camera=e,this.camera.rotation.order="YXZ"}addShake(e){this.shake=Math.min(1,this.shake+e),this.shakeSeed+=1.7}update(e,t,n,s,r){const a=e.prevX+(e.x-e.prevX)*s,o=e.prevZ+(e.z-e.prevZ)*s,l=Math.hypot(e.vx,e.vz);this.bobAmount=Us(this.bobAmount,l>.5?1:0,7,r),this.bobPhase+=l*r*1.65;const c=Math.abs(Math.sin(this.bobPhase))*.035*this.bobAmount;this.shake=Us(this.shake,0,7,r);const h=this.shake*this.shake*.045,d=Math.sin(this.shakeSeed*12.9898)*h,u=Math.sin(this.shakeSeed*78.233)*h;this.camera.position.set(a,e.y+Ye.eyeHeight+c,o),this.camera.rotation.set(n+u,t+d,0)}reset(){this.bobPhase=0,this.bobAmount=0,this.shake=0}}function Pt(i){const e=document.getElementById(i);if(!e)throw new Error(`HUD element #${i} is missing from index.html`);return e}const vb=2.4,xb=new Intl.NumberFormat;function ju(i){return xb.format(i)}class _b{hud=Pt("hud");crosshair=Pt("crosshair");hitmarker=Pt("hitmarker");damage=Pt("damage");integrity=Pt("integrity");integrityFill=Pt("integrity-fill");debug=Pt("debug");captureHint=Pt("capture-hint");overTitle=Pt("over-title");overScore=Pt("over-score");overStats=Pt("over-stats");status=Pt("status");statusMain=Pt("status-main");statusSub=Pt("status-sub");scorePop=Pt("score-pop");screens={title:Pt("screen-title"),pause:Pt("screen-pause"),settings:Pt("screen-settings"),over:Pt("screen-over")};hitTimer=0;statusTimer=0;damageTimer=null;debugVisible=!1;showScreen(e){for(const[t,n]of Object.entries(this.screens))n.hidden=t!==e;this.hud.hidden=e!=="none"}setDebugVisible(e){this.debugVisible=e,this.debug.hidden=!e}toggleDebug(){return this.setDebugVisible(!this.debugVisible),this.debugVisible}get isDebugVisible(){return this.debugVisible}setIntegrity(e,t){const n=Math.max(0,Math.min(1,e/t));this.integrityFill.style.width=`${n*100}%`,this.integrity.classList.toggle("low",n<=.34)}flashHit(){this.hitmarker.classList.remove("show"),this.hitmarker.offsetWidth,this.hitmarker.classList.add("show"),this.hitTimer=.24}flashDamage(){this.damage.classList.add("show"),this.damageTimer!==null&&window.clearTimeout(this.damageTimer),this.damageTimer=window.setTimeout(()=>{this.damageTimer=null,this.damage.classList.remove("show")},60)}setCooling(e){this.crosshair.classList.toggle("cooling",e)}setCaptureHint(e){this.captureHint.hidden=!e}setStatus(e,t="",n="neutral"){this.statusMain.textContent=e,this.statusSub.textContent=t,this.status.classList.toggle("alert",n==="alert"),this.status.classList.toggle("secure",n==="secure"),this.status.classList.add("show"),this.statusTimer=vb}clearStatus(){this.statusTimer=0,this.status.classList.remove("show")}flashScore(e,t){this.scorePop.innerHTML=t>1?`+${e}<span class="chain">&times;${t}</span>`:`+${e}`,this.scorePop.classList.remove("show"),this.scorePop.offsetWidth,this.scorePop.classList.add("show")}update(e){this.hitTimer>0&&(this.hitTimer-=e,this.hitTimer<=0&&this.hitmarker.classList.remove("show")),this.statusTimer>0&&(this.statusTimer-=e,this.statusTimer<=0&&this.status.classList.remove("show"))}setResults(e,t,n,s,r){const a=e.shots>0?e.hits/e.shots*100:0;this.overTitle.textContent=r?"CONTAINMENT RESTORED":"CONTAINMENT LOST",this.screens.over.classList.toggle("secure",r),this.overScore.textContent=e.score.toLocaleString(),this.overStats.innerHTML=[`Specimens popped &nbsp;<b>${e.kills}</b>`,`Sectors held &nbsp;<b>${t} / ${n}</b>`,`Best chain &nbsp;<b>${e.bestChain>1?`${e.bestChain}`:"—"}</b>`,`Accuracy &nbsp;<b>${a.toFixed(0)}%</b>`,`Integrity recovered &nbsp;<b>${e.integrityRestored>0?e.integrityRestored:"—"}</b>`,`Time &nbsp;<b>${e.timeAlive.toFixed(1)}s</b>`,`Seed &nbsp;<b>${s}</b>`].join("<br />")}setDebug(e){if(!this.debugVisible)return;const t=e.frame;this.debug.textContent=[`seed      ${e.seed}`,`quality   ${e.quality}  dpr ${e.pixelRatio.toFixed(2)}  cap ${e.pixelRatioCap.toFixed(2)}${e.adaptiveSteps>0?`  adapt -${e.adaptiveSteps}`:""}`,`frame ms  p50 ${t.p50.toFixed(2)}  p95 ${t.p95.toFixed(2)}`,`          p99 ${t.p99.toFixed(2)}  max ${t.worst.toFixed(2)}`,`hitches   ${t.hitches}  (>20ms, ${t.samples} frames)`,`draws     ${e.drawCalls}  / 150`,`tris      ${ju(e.triangles)}  / 350k`,`gpu       ${e.geometries} geo  ${e.textures} tex  ${e.programs} prog`,`world     ${e.meshes} meshes  ${e.brushes} brushes`,`lights    ${e.lights} lit / ${e.fixtures} placed`,`rooms     ${e.rooms}  ${e.roomArchetype} esc ${e.roomEscalation.toFixed(2)}`,`sectors   ${e.sectorsCleared} / ${e.sectors} held`,`threat    ${e.threatSpent} / ${e.threatBudget} here  ${e.requiredThreat} req / ${e.threatTotal} all`,`enemies   ${e.enemies}`,`shots     ${e.projectiles}`,`decals    ${e.decals} / ${e.decalBudget}  drops ${e.droplets}`,`score     ${ju(e.score)}`,`gen ms    ${e.genMs.toFixed(2)}  try ${e.attempts}${e.fallback?" FALLBACK":""}`,`warm ms   ${e.prewarmMs.toFixed(2)}`].join(`
`)}dispose(){this.damageTimer!==null&&(window.clearTimeout(this.damageTimer),this.damageTimer=null),this.hitTimer=0,this.statusTimer=0,this.hitmarker.classList.remove("show"),this.damage.classList.remove("show"),this.status.classList.remove("show"),this.scorePop.classList.remove("show")}}const ed=9,td=5,_a=.14,nd=.92,Mb=.42;function yb(i,e){const t={discovered:new Uint8Array(i),reveal:new Float32Array(i)};return e>=0&&e<i&&(t.discovered[e]=1,t.reveal[e]=1),t}function Sb(i,e){return e<0||e>=i.discovered.length||i.discovered[e]?!1:(i.discovered[e]=1,i.reveal[e]=0,!0)}function bb(i,e){let t=!1;const n=Math.max(0,e)/Mb;if(n===0)return!1;for(let s=0;s<i.discovered.length;s++)!i.discovered[s]||i.reveal[s]>=1||(i.reveal[s]=Math.min(1,i.reveal[s]+n),t=!0);return t}function il(i,e){return i.discovered[e]?1-(1-(i.reveal[e]??0))**3:0}class wb{canvas;ctx;base=document.createElement("canvas");baseCtx;plan=null;discovery=null;projection=null;reduceMotion=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;dirty=!0;constructor(e){this.canvas=e;const t=e.getContext("2d"),n=this.base.getContext("2d");if(!t||!n)throw new Error("2D canvas context unavailable — cannot draw the minimap");this.ctx=t,this.baseCtx=n}setPlan(e){this.plan=e,this.discovery=yb(e.rooms.length,e.startRoomId),this.dirty=!0}discover(e){!this.discovery||!Sb(this.discovery,e)||(this.reduceMotion&&(this.discovery.reveal[e]=1),this.dirty=!0)}get discoveredCount(){const e=this.discovery;if(!e)return 0;let t=0;for(const n of e.discovered)t+=n;return t}draw(e,t,n,s,r){const a=this.plan,o=this.discovery;if(!a||!o)return;const l=Math.min(window.devicePixelRatio||1,2),c=this.canvas.clientWidth,h=this.canvas.clientHeight;if(c===0||h===0)return;const d=Math.round(c*l),u=Math.round(h*l);(this.canvas.width!==d||this.canvas.height!==u)&&(this.canvas.width=d,this.canvas.height=u,this.base.width=d,this.base.height=u,this.dirty=!0),bb(o,r)&&(this.dirty=!0),this.dirty&&this.redrawBase(c,h,l);const f=this.ctx;f.setTransform(l,0,0,l,0,0),f.clearRect(0,0,c,h),f.drawImage(this.base,0,0,c,h);const m=this.projection,v=a.rooms[s];if(!m||!v)return;const g=w=>m.offsetX+w*m.scale,p=w=>m.offsetZ+w*m.scale;f.strokeStyle="#1fc9c2",f.lineWidth=1.5,f.strokeRect(g(v.minX),p(v.minZ),(v.maxX-v.minX)*m.scale,(v.maxZ-v.minZ)*m.scale);const y=g(e),E=p(t),_=-Math.sin(n),T=-Math.cos(n);f.strokeStyle="#e8e6dd",f.lineWidth=1.5,f.beginPath(),f.moveTo(y,E),f.lineTo(y+_*8,E+T*8),f.stroke(),f.fillStyle="#1fc9c2",f.beginPath(),f.arc(y,E,2.25,0,Math.PI*2),f.fill()}redrawBase(e,t,n){const s=this.plan,r=this.discovery,a=this.baseCtx;let o=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY,c=Number.POSITIVE_INFINITY,h=Number.NEGATIVE_INFINITY;for(const p of s.rooms)o=Math.min(o,p.minX),l=Math.max(l,p.maxX),c=Math.min(c,p.minZ),h=Math.max(h,p.maxZ);const d=Math.max(1,l-o),u=Math.max(1,h-c),f=Math.min((e-ed*2)/d,(t-ed*2)/u),m={scale:f,offsetX:(e-d*f)/2-o*f,offsetZ:(t-u*f)/2-c*f};this.projection=m;const v=p=>m.offsetX+p*f,g=p=>m.offsetZ+p*f;a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,e,t);for(const p of s.connections){const y=s.rooms[p.a],E=s.rooms[p.b];if(!y||!E)continue;const _=Math.min(il(r,p.a),il(r,p.b));a.save(),a.filter=_<.999?`blur(${td*(1-_)}px)`:"none",a.globalAlpha=_a+(nd-_a)*_,a.strokeStyle="#788ead",a.lineWidth=1.2,a.beginPath(),a.moveTo(v((y.minX+y.maxX)/2),g((y.minZ+y.maxZ)/2)),a.lineTo(v((E.minX+E.maxX)/2),g((E.minZ+E.maxZ)/2)),a.stroke(),a.restore()}for(const p of s.rooms){const y=il(r,p.id),E=v(p.minX),_=g(p.minZ),T=(p.maxX-p.minX)*f,w=(p.maxZ-p.minZ)*f;a.save(),a.filter=y<.999?`blur(${td*(1-y)}px)`:"none",a.globalAlpha=_a+(nd-_a)*y,a.fillStyle=y>0?"#172028":"#293443",a.strokeStyle=y>0?"#788ead":"#52647b",a.lineWidth=1,a.fillRect(E,_,T,w),a.strokeRect(E,_,T,w),a.restore()}this.dirty=!1}dispose(){this.plan=null,this.discovery=null,this.projection=null,this.dirty=!0,this.canvas.width=1,this.canvas.height=1,this.base.width=1,this.base.height=1}}function Ti(i){const e=document.getElementById(i);if(!e)throw new Error(`Touch element #${i} is missing from index.html`);return e}class Eb{root=Ti("touch");move=Ti("touch-move");fireRing=Ti("touch-fire-ring");stick=Ti("touch-stick");knob=Ti("touch-knob");aim=Ti("touch-aim");pause=Ti("touch-pause");sprint=Ti("touch-sprint");active;gameplayVisible=!1;constructor(e){this.active=e,document.body.classList.toggle("touch",e),this.syncVisibility()}get isActive(){return this.active}setGameplayVisible(e){this.gameplayVisible=e,this.syncVisibility()}setStick(e,t,n){this.knob.style.transform=`translate(calc(-50% + ${e.toFixed(4)} * var(--stick-travel)), calc(-50% + ${t.toFixed(4)} * var(--stick-travel)))`,this.stick.classList.toggle("held",n)}setStickOrigin(e,t){this.stick.style.transform=`translate(${e}px, ${t}px)`}setAimOrigin(e,t,n){if(!n){this.fireRing.style.transform="";return}const s=this.fireRing.getBoundingClientRect();this.fireRing.style.transform=`translate(${e-s.left-s.width/2}px, ${t-s.top-s.height/2}px)`}setSprint(e){this.sprint.classList.toggle("on",e),this.sprint.setAttribute("aria-pressed",e?"true":"false")}dispose(){document.body.classList.remove("touch"),this.root.hidden=!0,this.stick.classList.remove("held"),this.sprint.classList.remove("on"),this.setStick(0,0,!1)}syncVisibility(){this.root.hidden=!(this.active&&this.gameplayVisible)}}const qa={master:.75,effects:1},id=.02,Ma={ambient:2,normal:6,signature:10,hard:12},Tb=1.6,Ab={rise:{level:.32,length:.68,from:95,to:230},charge:{level:.27,length:.42,from:310,to:620},release:{level:.34,length:.22,from:145,to:55},shutdown:{level:.36,length:.85,from:260,to:32},aim:{level:.3,length:.65,from:430,to:1280},volley:{level:.32,length:.18,from:600,to:90}};function Cb(i){return 1.55/Math.max(1,Math.min(3,Number.isFinite(i)?i:1.55))}const Rb=.7,sl={attackTime:.035,holdTime:.34,decayTime:.85};function Pa(i){return Number.isFinite(i)?i<0?0:i>1?1:i:0}const ln={onset:.18,urgentOnset:.55,peak:.085,sustainScale:.18,urgentScale:.72,slowHz:.28,urgentHz:.66,slowFreq:292,urgentFreq:524};function sd(i,e,t){if(t<=e)return i>=t?1:0;const n=(i-e)/(t-e);return n<=0?0:n>=1?1:n}function Pb(i){const e=Number.isFinite(i)?Pa(i):0,t=sd(e,ln.onset,1/3),n=sd(e,ln.urgentOnset,2/3);return{slow:ln.peak*ln.sustainScale*t,urgent:ln.peak*ln.sustainScale*ln.urgentScale*n,pulseSlow:ln.peak*t,pulseUrgent:ln.peak*ln.urgentScale*n}}const Mr={mouseSensitivity:{min:8e-4,max:.006,step:2e-4},touchSensitivity:{min:.0016,max:.01,step:2e-4},masterVolume:{min:0,max:1,step:.05},effectsVolume:{min:0,max:1,step:.05}};function uc(){return{masterVolume:qa.master,effectsVolume:qa.effects,mouseSensitivity:Ed,touchSensitivity:Kt.lookSensitivity,invertY:!1,quality:"auto",autoFire:!1,adaptive:!0,showFps:!1}}function Ib(i){return i==="auto"||Ir(i)}class Lb{values;onChange=null;constructor(e){if(this.values=uc(),!e)return;const t=e.get("quality");Ir(t)&&(this.values.quality=t);const n=e.get("adaptive");n==="0"?this.values.adaptive=!1:n==="1"&&(this.values.adaptive=!0)}get snapshot(){return this.values}get(e){return this.values[e]}set(e,t){const n=this.coerce(e,t);return n===void 0||this.values[e]===n?!1:(this.values[e]=n,this.onChange?.(e,this.values),!0)}reset(){const e=uc();for(const t of Object.keys(e))this.set(t,e[t])}coerce(e,t){switch(e){case"mouseSensitivity":case"touchSensitivity":case"masterVolume":case"effectsVolume":{const n=Mr[e],s=Number(t);return Number.isFinite(s)?Zn(s,n.min,n.max):void 0}case"invertY":case"autoFire":case"adaptive":case"showFps":return!!t;case"quality":return Ib(t)?t:void 0;default:return}}}function $t(i){const e=document.getElementById(i);if(!e)throw new Error(`Settings element #${i} is missing from index.html`);return e}function rd(i,e){return e>0?`${(i/e).toFixed(2)}×`:i.toFixed(4)}function ad(i){return`${Math.round(i*100)}%`}const od=["auto","high","medium","low"];class Db{options;masterRange=$t("opt-master");masterValue=$t("opt-master-value");effectsRange=$t("opt-effects");effectsValue=$t("opt-effects-value");mouseRange=$t("opt-mouse");mouseValue=$t("opt-mouse-value");touchRange=$t("opt-touch");touchValue=$t("opt-touch-value");invertToggle=$t("opt-invert");autoFireToggle=$t("opt-autofire");qualityGroup=$t("opt-quality");adaptiveToggle=$t("opt-adaptive");fpsToggle=$t("opt-fps");note=$t("opt-note");backButton=$t("btn-settings-back");reloadButton=$t("btn-settings-reload");qualityButtons;defaults;bootLevel=null;onBack=null;onReload=null;constructor(e,t){this.options=e,this.defaults=t,this.qualityButtons=Array.from(this.qualityGroup.querySelectorAll("button[data-quality]")),this.applyRange(this.mouseRange,Mr.mouseSensitivity),this.applyRange(this.touchRange,Mr.touchSensitivity),this.applyRange(this.masterRange,Mr.masterVolume),this.applyRange(this.effectsRange,Mr.effectsVolume),this.masterRange.addEventListener("input",this.onMasterInput),this.effectsRange.addEventListener("input",this.onEffectsInput),this.mouseRange.addEventListener("input",this.onMouseInput),this.touchRange.addEventListener("input",this.onTouchInput),this.invertToggle.addEventListener("click",this.onInvertClick),this.autoFireToggle.addEventListener("click",this.onAutoFireClick),this.adaptiveToggle.addEventListener("click",this.onAdaptiveClick),this.fpsToggle.addEventListener("click",this.onFpsClick),this.qualityGroup.addEventListener("click",this.onQualityClick),this.qualityGroup.addEventListener("keydown",this.onQualityKeyDown),this.backButton.addEventListener("click",this.onBackClick),this.reloadButton.addEventListener("click",this.onReloadClick),this.refresh()}setBootLevel(e){this.bootLevel=e,this.refresh()}refresh(){const e=this.options.snapshot;this.masterRange.value=String(e.masterVolume),this.masterValue.textContent=ad(e.masterVolume),this.effectsRange.value=String(e.effectsVolume),this.effectsValue.textContent=ad(e.effectsVolume),this.mouseRange.value=String(e.mouseSensitivity),this.mouseValue.textContent=rd(e.mouseSensitivity,this.defaults.mouseSensitivity),this.touchRange.value=String(e.touchSensitivity),this.touchValue.textContent=rd(e.touchSensitivity,this.defaults.touchSensitivity),this.setToggle(this.invertToggle,e.invertY),this.setToggle(this.autoFireToggle,e.autoFire),this.setToggle(this.adaptiveToggle,e.adaptive),this.setToggle(this.fpsToggle,e.showFps);for(const t of this.qualityButtons){const n=t.dataset.quality===e.quality;t.setAttribute("aria-checked",n?"true":"false"),t.tabIndex=n?0:-1}this.syncNote(e.quality)}dispose(){this.masterRange.removeEventListener("input",this.onMasterInput),this.effectsRange.removeEventListener("input",this.onEffectsInput),this.mouseRange.removeEventListener("input",this.onMouseInput),this.touchRange.removeEventListener("input",this.onTouchInput),this.invertToggle.removeEventListener("click",this.onInvertClick),this.autoFireToggle.removeEventListener("click",this.onAutoFireClick),this.adaptiveToggle.removeEventListener("click",this.onAdaptiveClick),this.fpsToggle.removeEventListener("click",this.onFpsClick),this.qualityGroup.removeEventListener("click",this.onQualityClick),this.qualityGroup.removeEventListener("keydown",this.onQualityKeyDown),this.backButton.removeEventListener("click",this.onBackClick),this.reloadButton.removeEventListener("click",this.onReloadClick),this.note.hidden=!0,this.reloadButton.hidden=!0}applyRange(e,t){e.min=String(t.min),e.max=String(t.max),e.step=String(t.step)}setToggle(e,t){e.setAttribute("aria-pressed",t?"true":"false"),e.textContent=t?"On":"Off"}syncNote(e){const t=this.bootLevel!==null&&Ir(e)&&e!==this.bootLevel;this.note.hidden=!t,this.reloadButton.hidden=!t,t&&(this.note.textContent="Resolution changed now — lighting, shadows, textures and effect pools need a reload.")}onMasterInput=()=>{this.options.set("masterVolume",this.masterRange.valueAsNumber)};onEffectsInput=()=>{this.options.set("effectsVolume",this.effectsRange.valueAsNumber)};onMouseInput=()=>{this.options.set("mouseSensitivity",this.mouseRange.valueAsNumber)};onTouchInput=()=>{this.options.set("touchSensitivity",this.touchRange.valueAsNumber)};onInvertClick=()=>{this.options.set("invertY",!this.options.get("invertY"))};onAutoFireClick=()=>{this.options.set("autoFire",!this.options.get("autoFire"))};onAdaptiveClick=()=>{this.options.set("adaptive",!this.options.get("adaptive"))};onFpsClick=()=>{this.options.set("showFps",!this.options.get("showFps"))};onQualityClick=e=>{const t=e.target;if(!(t instanceof Element))return;const s=t.closest("button[data-quality]")?.dataset.quality;!s||!od.includes(s)||this.options.set("quality",s)};onQualityKeyDown=e=>{const t=e.target;if(!(t instanceof Element))return;const n=t.closest("button[data-quality]");if(!n)return;const s=this.qualityButtons.indexOf(n);if(s<0)return;let r=s;switch(e.key){case"ArrowRight":case"ArrowDown":r=(s+1)%this.qualityButtons.length;break;case"ArrowLeft":case"ArrowUp":r=(s-1+this.qualityButtons.length)%this.qualityButtons.length;break;case"Home":r=0;break;case"End":r=this.qualityButtons.length-1;break;default:return}e.preventDefault();const a=this.qualityButtons[r],o=a?.dataset.quality;!o||!od.includes(o)||(this.options.set("quality",o),a.focus())};onBackClick=()=>{this.onBack?.()};onReloadClick=()=>{const e=this.options.get("quality");Ir(e)&&this.onReload?.(e)}}class Nb{element;enabled=!1;primed=!1;elapsed=0;frames=0;constructor(e){this.element=e,this.setEnabled(!1)}setEnabled(e){this.enabled=e,this.element.hidden=!e,this.reset()}reset(){this.primed=!1,this.elapsed=this.frames=0,this.enabled&&(this.element.textContent="FPS —")}update(e,t){if(this.enabled){if(!t||!Number.isFinite(e)||e<=0){this.primed&&this.reset();return}if(!this.primed){this.primed=!0;return}this.elapsed+=e,this.frames++,!(this.elapsed<500)&&(this.element.textContent=`FPS ${Math.round(this.frames*1e3/this.elapsed)}`,this.elapsed=this.frames=0)}}}const Gi=600,dr=16,ld=20;function Fb(){return{enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0}}function Ub(){return{at:0,ms:0,simMs:0,renderMs:0,enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0,programsCompiled:0}}class Ob{frames=new Float32Array(Gi);sim=new Float32Array(Gi);render=new Float32Array(Gi);sorted=new Float32Array(Gi);index=0;filled=0;hitchCount=0;breachCount=0;elapsed=0;hitchLog=[];hitchWrite=0;hitchFilled=0;lastPrograms=0;peak=Fb();constructor(){for(let e=0;e<dr;e++)this.hitchLog.push(Ub())}addFrame(e,t,n,s){this.filled===Gi&&this.frames[this.index]>ld&&this.breachCount--,this.frames[this.index]=e,this.sim[this.index]=t,this.render[this.index]=n,this.index=(this.index+1)%Gi,this.filled<Gi&&this.filled++,this.elapsed+=e/1e3,s.enemies>this.peak.enemies&&(this.peak.enemies=s.enemies),s.projectiles>this.peak.projectiles&&(this.peak.projectiles=s.projectiles),s.decals>this.peak.decals&&(this.peak.decals=s.decals),s.droplets>this.peak.droplets&&(this.peak.droplets=s.droplets),s.drawCalls>this.peak.drawCalls&&(this.peak.drawCalls=s.drawCalls),s.triangles>this.peak.triangles&&(this.peak.triangles=s.triangles),s.programs>this.peak.programs&&(this.peak.programs=s.programs);const r=Math.max(0,s.programs-this.lastPrograms);if(this.lastPrograms=s.programs,e>ld){this.hitchCount++,this.breachCount++;const a=this.hitchLog[this.hitchWrite];a.at=this.elapsed,a.ms=e,a.simMs=t,a.renderMs=n,a.enemies=s.enemies,a.projectiles=s.projectiles,a.decals=s.decals,a.droplets=s.droplets,a.drawCalls=s.drawCalls,a.triangles=s.triangles,a.programs=s.programs,a.programsCompiled=r,this.hitchWrite=(this.hitchWrite+1)%dr,this.hitchFilled<dr&&this.hitchFilled++}}syncPrograms(e){this.lastPrograms=e}reset(){this.index=0,this.filled=0,this.hitchCount=0,this.breachCount=0,this.elapsed=0,this.hitchWrite=0,this.hitchFilled=0;const e=this.peak;e.enemies=0,e.projectiles=0,e.decals=0,e.droplets=0,e.drawCalls=0,e.triangles=0,e.programs=0}get sampleCount(){return this.filled}get windowBreaches(){return this.breachCount}report(){return this.percentiles(this.frames)}performance(){const e=this.elapsed/60;return{frame:this.percentiles(this.frames),sim:this.percentiles(this.sim),render:this.percentiles(this.render),windowSeconds:+this.elapsed.toFixed(3),hitchesPerMinute:e>0?+(this.hitchCount/e).toFixed(2):0,hitches:this.recentHitches(),peak:{...this.peak}}}recentHitches(){const e=[],t=this.hitchFilled<dr?0:this.hitchWrite;for(let n=0;n<this.hitchFilled;n++)e.push({...this.hitchLog[(t+n)%dr]});return e}percentiles(e){const t=this.filled;if(t===0)return{p50:0,p95:0,p99:0,worst:0,hitches:0,samples:0};const n=this.sorted.subarray(0,t);return n.set(e.subarray(0,t)),n.sort(),{p50:ya(rl(n,t,.5)),p95:ya(rl(n,t,.95)),p99:ya(rl(n,t,.99)),worst:ya(n[t-1]),hitches:this.hitchCount,samples:t}}}function rl(i,e,t){const n=Math.min(e-1,Math.max(0,Math.ceil(t*e)-1));return i[n]}function ya(i){return Math.round(i*1e3)/1e3}const Bb={entry:"#2c4a52",corridor:"#1d2a35",junction:"#243444",gallery:"#20303c",lab:"#3a3040",storage:"#38313c",containment:"#43303a",reactor:"#4e3134",chamber:"#5a3326"},cd=10;class zb{canvas;ctx;plan=null;visible=!1;constructor(e){this.canvas=e;const t=e.getContext("2d");if(!t)throw new Error("2D canvas context unavailable — cannot draw the debug map");this.ctx=t}setPlan(e){this.plan=e}setVisible(e){this.visible=e,this.canvas.hidden=!e}get isVisible(){return this.visible}draw(e){const t=this.plan;if(!this.visible||!t)return;const n=Math.min(window.devicePixelRatio||1,2),s=this.canvas.clientWidth,r=this.canvas.clientHeight;if(s===0||r===0)return;this.canvas.width!==Math.round(s*n)&&(this.canvas.width=Math.round(s*n)),this.canvas.height!==Math.round(r*n)&&(this.canvas.height=Math.round(r*n));const a=this.ctx;a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,s,r),a.fillStyle="rgba(13, 15, 19, 0.82)",a.fillRect(0,0,s,r);const o=Math.max(1,t.maxX-t.minX),l=Math.max(1,t.maxZ-t.minZ),c=Math.min((s-cd*2)/o,(r-cd*2)/l),h=(s-o*c)/2-t.minX*c,d=(r-l*c)/2-t.minZ*c,u=_=>h+_*c,f=_=>d+_*c;for(const _ of t.connections){const T=t.rooms[_.a],w=t.rooms[_.b];!T||!w||(a.beginPath(),a.moveTo(u((T.minX+T.maxX)/2),f((T.minZ+T.maxZ)/2)),a.lineTo(u((w.minX+w.maxX)/2),f((w.minZ+w.maxZ)/2)),a.strokeStyle=_.loop?"#1fc9c2":_.critical?"#adc0c8":"#52647b",a.lineWidth=_.critical?2:1,a.setLineDash(_.loop?[3,3]:[]),a.stroke())}a.setLineDash([]),a.font="9px ui-monospace, Menlo, monospace",a.textAlign="center",a.textBaseline="middle";for(const _ of t.rooms){const T=u(_.minX),w=f(_.minZ),A=(_.maxX-_.minX)*c,M=(_.maxZ-_.minZ)*c;a.fillStyle=Bb[_.archetype],a.fillRect(T,w,A,M);const b=_.id===e.engagedRoomId,R=_.id===e.activeRoomId;a.strokeStyle=b?"#f2610a":R?"#1fc9c2":e.cleared[_.id]?"#5d7a5d":"#52647b",a.lineWidth=b||R?2:1,a.strokeRect(T,w,A,M),a.strokeStyle="#f2610a",a.lineWidth=1;for(const P of _.enemySpawns)a.beginPath(),a.moveTo(u(P.x),f(P.z)),a.lineTo(u(P.entryX),f(P.entryZ)),a.stroke();A>22&&M>14&&(a.fillStyle="#adc0c8",a.fillText(`${_.id}`,T+A/2,w+M/2))}a.fillStyle="#f2610a";for(const _ of e.enemies)a.fillRect(u(_.x)-1.5,f(_.z)-1.5,3,3);const m=u(e.playerX),v=f(e.playerZ),g=-Math.sin(e.playerYaw),p=-Math.cos(e.playerYaw);a.strokeStyle="#1fc9c2",a.lineWidth=2,a.beginPath(),a.moveTo(m,v),a.lineTo(m+g*10,v+p*10),a.stroke(),a.fillStyle="#1fc9c2",a.beginPath(),a.arc(m,v,2.5,0,Math.PI*2),a.fill();const y=t.report;a.textAlign="left",a.fillStyle=y.fallback?"#f2610a":"#788ead";const E=[`${y.seed}  ${y.rooms}r ${y.connections}c ${y.loops}L`,`try ${y.attempts}  ${y.ms.toFixed(1)}ms${y.fallback?"  FALLBACK":""}`];y.warnings.length>0&&E.push(y.warnings[0]);for(let _=0;_<E.length;_++)a.fillText(E[_],6,r-8-(E.length-1-_)*11)}dispose(){this.plan=null,this.setVisible(!1)}}class kb{accumulator=0;lastTime=0;running=!1;started=!1;stopped=!1;scheduler="probing";frameId=0;probeTimer=null;timerFrame=null;step;render;requestFrame;cancelFrame;constructor(e,t,n,s){this.step=e,this.render=t,this.requestFrame=n,this.cancelFrame=s}start(){this.started||(this.started=!0,this.stopped=!1,this.running=!0,this.lastTime=performance.now(),this.scheduleFrame())}setRunning(e){e&&!this.running&&this.resetClock(),this.running=e}get isRunning(){return this.running}get usesTimerFallback(){return this.scheduler==="timer"}stop(){this.running=!1,this.stopped=!0,this.frameId!==0&&this.cancelFrame(this.frameId),this.probeTimer!==null&&clearTimeout(this.probeTimer),this.timerFrame!==null&&clearTimeout(this.timerFrame),this.frameId=0,this.probeTimer=null,this.timerFrame=null}resetClock(){this.lastTime=performance.now(),this.accumulator=0}scheduleFrame(){if(!this.stopped){if(this.scheduler==="timer"){this.timerFrame=setTimeout(this.onTimerFrame,1e3/60);return}this.frameId=this.requestFrame(this.onAnimationFrame),this.scheduler==="probing"&&this.probeTimer===null&&(this.probeTimer=setTimeout(this.onProbeTimeout,80))}}onAnimationFrame=e=>{this.stopped||this.scheduler==="timer"||(this.scheduler==="probing"&&(this.scheduler="raf",this.probeTimer!==null&&clearTimeout(this.probeTimer),this.probeTimer=null),this.frameId=0,this.tick(e))};onProbeTimeout=()=>{this.stopped||this.scheduler!=="probing"||(this.probeTimer=null,this.cancelFrame(this.frameId),this.frameId=0,this.scheduler="timer",this.tick(performance.now()))};onTimerFrame=()=>{this.stopped||this.scheduler!=="timer"||(this.timerFrame=null,this.tick(performance.now()))};tick(e){if(this.stopped)return;const t=Math.max(0,e-this.lastTime);this.lastTime=e;const n=Math.min(t,250)/1e3;if(this.running){this.accumulator+=n;let r=0;for(;this.accumulator>=Ri&&r<rh;)this.step(Ri),this.accumulator-=Ri,r++;r===rh&&(this.accumulator=0)}const s=this.running?this.accumulator/Ri:0;this.render(s,t,n),this.scheduleFrame()}}const Ia={gain:1,pan:0},hd=9,Vb=1.2,Gb=.85;function Hb(i,e,t,n,s,r=Ia){const a=n-i,o=s-e,l=Math.hypot(a,o);if(r.gain=hd/(hd+l),l<Vb)return r.pan=0,r;const c=Math.cos(t),h=-Math.sin(t),d=(a*c+o*h)/l;return r.pan=Zn(d,-1,1)*Gb,r}let yr=null;function Xb(i){if(yr&&yr.sampleRate===i.sampleRate)return yr;const e=Math.floor(i.sampleRate*2),t=i.createBuffer(1,e,i.sampleRate),n=t.getChannelData(0);let s=2654435769;for(let r=0;r<e;r++)s=Math.imul(s,1664525)+1013904223>>>0,n[r]=s/2147483648-1;return yr=t,t}function Wb(){yr=null}function zf(i,e,t,n,s){const r=Math.max(1e-4,t*.001);i.setValueAtTime(1e-4,e),i.linearRampToValueAtTime(t,e+n),i.exponentialRampToValueAtTime(r,e+n+s),i.setValueAtTime(0,e+n+s+.001)}function Nt(i,e,t){const n=i.createOscillator(),s=i.createGain();n.type=t.type??"sine",t.detune&&(n.detune.value=t.detune),n.frequency.setValueAtTime(Math.max(1,t.freq),t.start),t.freqTo!==void 0&&n.frequency.exponentialRampToValueAtTime(Math.max(1,t.freqTo),t.start+t.duration),zf(s.gain,t.start,t.gain,t.attack??.004,t.duration),n.connect(s).connect(e),n.start(t.start),n.stop(t.start+t.duration+.05),n.onended=()=>{n.disconnect(),s.disconnect()}}function jn(i,e,t){const n=i.createBufferSource();n.buffer=Xb(i),n.loop=!0;const s=i.createBiquadFilter();s.type=t.filter??"bandpass",s.frequency.setValueAtTime(Math.max(20,t.freq),t.start),t.freqTo!==void 0&&s.frequency.exponentialRampToValueAtTime(Math.max(20,t.freqTo),t.start+t.duration),t.q!==void 0&&(s.Q.value=t.q);const r=i.createGain();zf(r.gain,t.start,t.gain,t.attack??.002,t.duration),n.connect(s).connect(r).connect(e),n.start(t.start),n.stop(t.start+t.duration+.05),n.onended=()=>{n.disconnect(),s.disconnect(),r.disconnect()}}function Yc(i,e,t,n){jn(i,e,{start:t,duration:.03,gain:n,attack:.001,filter:"highpass",freq:2200})}const kf=-1,ud=0,ts=1,$c=2;class qb{ctx=null;master=null;limiter=null;sfxBus=null;ambienceGain=null;alarmSlow=null;alarmUrgent=null;persistentNodes=[];releaseTimers=new Map;listenerX=0;listenerZ=0;listenerYaw=0;muted=!1;volume=qa.master;effects=qa.effects;escalation=0;announcedEscalation=0;pendingEscalationPulse=!1;suspended=!1;suspendTimer=null;voicesThisFrame=0;get ready(){return this.ctx!==null&&this.ctx.state==="running"}get isMuted(){return this.muted}unlock(){if(this.cancelSuspend(),!this.ctx){const e=window.AudioContext??window.webkitAudioContext;if(!e)return;try{this.ctx=new e}catch{this.ctx=null;return}this.master=this.ctx.createGain(),this.limiter=this.ctx.createDynamicsCompressor(),this.limiter.threshold.value=-8,this.limiter.knee.value=6,this.limiter.ratio.value=12,this.limiter.attack.value=.002,this.limiter.release.value=.18,this.sfxBus=this.ctx.createGain(),this.ambienceGain=this.ctx.createGain(),this.ambienceGain.gain.value=0,this.sfxBus.connect(this.limiter),this.ambienceGain.connect(this.limiter),this.limiter.connect(this.master),this.master.connect(this.ctx.destination),this.applyVolume(),this.applyEffects(),this.startAmbience(),this.startAlarm();const t=this.pendingEscalationPulse;this.pendingEscalationPulse=!1,this.applyEscalation(t)}this.ctx.resume().catch(()=>{}),this.suspended=!1}setSuspended(e,t=0){if(this.cancelSuspend(),!(!this.ctx||this.suspended===e)){if(e&&t>0){this.suspendTimer=window.setTimeout(()=>this.setSuspended(!0),t*1e3);return}this.suspended=e,e?this.ctx.suspend().catch(()=>{}):this.ctx.resume().catch(()=>{})}}setMuted(e){this.muted=e,this.applyVolume()}toggleMuted(){return this.setMuted(!this.muted),this.muted}setMasterVolume(e){this.volume=Pa(e),this.applyVolume()}setEffectsVolume(e){this.effects=Pa(e),this.applyEffects()}get masterVolume(){return this.volume}get effectsVolume(){return this.effects}setEscalation(e){const t=Pa(e);if(t===this.escalation)return;const n=t>this.announcedEscalation;n&&(this.announcedEscalation=t),this.escalation=t,n&&(!this.ctx||!this.alarmSlow||!this.alarmUrgent)&&(this.pendingEscalationPulse=!0),this.applyEscalation(n)}resetEscalation(){this.cancelPendingReleases(),this.escalation=0,this.announcedEscalation=0,this.pendingEscalationPulse=!1,this.applyEscalation(!1)}get escalationLevel(){return this.escalation}alarmGains(){return!this.alarmSlow||!this.alarmUrgent?{slow:-1,urgent:-1}:{slow:this.alarmSlow.gain.value,urgent:this.alarmUrgent.gain.value}}setListener(e,t,n){this.listenerX=e,this.listenerZ=t,this.listenerYaw=n}beginFrame(){this.voicesThisFrame=0}get now(){return this.ctx?this.ctx.currentTime:0}get context(){return this.ctx}voice(e=1,t=ud){if(!this.ctx||!this.sfxBus||this.suspended||!this.claimVoice(t))return null;const n=this.ctx.createGain();return n.gain.value=e,n.connect(this.sfxBus),this.scheduleRelease(n),n}spatialVoice(e,t,n=1,s=ud){if(!this.ctx||!this.sfxBus||this.suspended)return null;Hb(this.listenerX,this.listenerZ,this.listenerYaw,e,t,Ia);const r=n*Ia.gain;if(r<.01||!this.claimVoice(s))return null;const a=this.ctx.createGain();a.gain.value=r;const o=this.ctx.createStereoPanner();return o.pan.value=Ia.pan,a.connect(o).connect(this.sfxBus),this.scheduleRelease(a,o),a}dispose(){this.cancelSuspend(),this.stopPersistent(),this.cancelPendingReleases(),this.master?.disconnect(),this.limiter?.disconnect(),this.sfxBus?.disconnect(),this.ambienceGain?.disconnect(),this.alarmSlow?.disconnect(),this.alarmUrgent?.disconnect();const e=this.ctx;this.ctx=null,this.master=null,this.limiter=null,this.sfxBus=null,this.ambienceGain=null,this.alarmSlow=null,this.alarmUrgent=null,Wb(),e?.close().catch(()=>{})}claimVoice(e){const t=e>=$c?Ma.hard:e>=ts?Ma.signature:e<=kf?Ma.ambient:Ma.normal;return this.voicesThisFrame>=t?!1:(this.voicesThisFrame++,!0)}cancelSuspend(){this.suspendTimer!==null&&window.clearTimeout(this.suspendTimer),this.suspendTimer=null}applyVolume(){if(!this.master||!this.ctx)return;const e=this.muted?0:this.volume;this.master.gain.setTargetAtTime(e,this.ctx.currentTime,id)}applyEffects(){!this.sfxBus||!this.ctx||this.sfxBus.gain.setTargetAtTime(this.effects,this.ctx.currentTime,id)}applyEscalation(e){if(!this.ctx||!this.alarmSlow||!this.alarmUrgent)return;const t=Pb(this.escalation),n=this.ctx.currentTime;this.scheduleAlarmGain(this.alarmSlow.gain,t.slow,t.pulseSlow,n,e),this.scheduleAlarmGain(this.alarmUrgent.gain,t.urgent,t.pulseUrgent,n,e)}scheduleAlarmGain(e,t,n,s,r){const a=e.value;if(e.cancelScheduledValues(s),e.setValueAtTime(a,s),!r||n<=t){e.setTargetAtTime(t,s,Rb);return}e.setTargetAtTime(n,s,sl.attackTime),e.setTargetAtTime(t,s+sl.holdTime,sl.decayTime)}scheduleRelease(...e){const t=window.setTimeout(()=>{this.releaseTimers.delete(t);for(const n of e)n.disconnect()},4e3);this.releaseTimers.set(t,e)}cancelPendingReleases(){for(const[e,t]of this.releaseTimers){window.clearTimeout(e);for(const n of t)n.disconnect()}this.releaseTimers.clear()}startAmbience(){const e=this.ctx,t=this.ambienceGain;if(!e||!t)return;const n=e.createOscillator();n.type="sawtooth",n.frequency.value=55;const s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=180,s.Q.value=3;const r=e.createGain();r.gain.value=.08,n.connect(s).connect(r).connect(t),n.start();const a=e.createOscillator();a.type="sine",a.frequency.value=82.5;const o=e.createGain();o.gain.value=.035,a.connect(o).connect(t),a.start(),this.persistentNodes.push(n,s,r,a,o),t.gain.setValueAtTime(0,e.currentTime),t.gain.linearRampToValueAtTime(.5,e.currentTime+1.5)}startAlarm(){const e=this.ctx,t=this.sfxBus;!e||!t||(this.alarmSlow=this.buildAlarmLayer(e,t,ln.slowFreq,ln.slowHz,"square",900),this.alarmUrgent=this.buildAlarmLayer(e,t,ln.urgentFreq,ln.urgentHz,"triangle",1500))}buildAlarmLayer(e,t,n,s,r,a){const o=e.createOscillator();o.type=r,o.frequency.value=n;const l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=a,l.Q.value=.7;const c=e.createGain();c.gain.value=.5;const h=e.createOscillator();h.type="sine",h.frequency.value=s;const d=e.createGain();d.gain.value=.5,h.connect(d).connect(c.gain);const u=e.createGain();return u.gain.value=0,o.connect(l).connect(c).connect(u).connect(t),o.start(),h.start(),this.persistentNodes.push(o,l,c,h,d,u),u}stopPersistent(){for(const e of this.persistentNodes){const t=e;if(typeof t.stop=="function")try{t.stop()}catch{}e.disconnect()}this.persistentNodes.length=0}}let ns=Dt("boot","audio");function Zb(i){ns=Dt(i,"audio")}function Yb(i){const e=i.voice(.55,ts);if(!e)return;const t=i.context;if(!t)return;const n=i.now,s=Ee(ns,.94,1.06);Nt(t,e,{type:"sine",freq:420*s,freqTo:48,start:n,duration:.24,gain:.9}),Nt(t,e,{type:"sawtooth",freq:220*s,freqTo:60,start:n,duration:.14,gain:.22}),jn(t,e,{start:n,duration:.16,gain:.4,filter:"bandpass",freq:1800,freqTo:300,q:1.2}),Yc(t,e,n,.5)}function $b(i,e){const t=i.voice(.12);if(!t)return;const n=i.context;if(!n)return;const s=i.now+e*.35;Nt(n,t,{type:"triangle",freq:300,freqTo:900,start:s,duration:e*.6,gain:.5,attack:e*.4})}function Kb(i,e,t){const n=i.spatialVoice(e,t,.4);if(!n)return;const s=i.context;if(!s)return;const r=i.now;Nt(s,n,{type:"sine",freq:180*Ee(ns,.9,1.1),freqTo:45,start:r,duration:.16,gain:.7}),jn(s,n,{start:r,duration:.09,gain:.35,filter:"lowpass",freq:900,freqTo:200})}function Ds(i,e,t,n,s){const r=Ab[e],a=i.spatialVoice(t,n,r.level,e==="aim"||e==="charge"?$c:void 0),o=i.context;if(!a||!o)return;const l=Cb(s),c=i.now+(e==="shutdown"?.26:0);if(Nt(o,a,{type:"triangle",freq:r.from*l,freqTo:r.to*l,start:c,duration:r.length,gain:.55,attack:e==="aim"?.38:e==="charge"?.12:.025}),e==="charge")for(let h=0;h<2;h++)Nt(o,a,{type:"sine",freq:(740+h*160)*l,start:c+h*.18,duration:.07,gain:.23});else e!=="aim"&&(jn(o,a,{start:c,duration:r.length*.6,gain:.25,filter:"lowpass",freq:e==="release"?1300:650,freqTo:140,attack:.015}),Nt(o,a,{type:"sine",freq:105*l,freqTo:42*l,start:c+(e==="rise"?.35:0),duration:.16,gain:.35}))}function Jb(i,e,t){const n=i.spatialVoice(e,t,.42);if(!n)return;const s=i.context;if(!s)return;const r=i.now;Nt(s,n,{type:"triangle",freq:260*Ee(ns,.85,1.15),freqTo:90,start:r,duration:.1,gain:.6}),jn(s,n,{start:r,duration:.06,gain:.3,filter:"bandpass",freq:700,q:1})}function Qb(i,e,t,n){const s=i.spatialVoice(e,t,.17*n,kf);if(!s)return;const r=i.context;if(!r)return;const a=i.now,o=Ee(ns,.88,1.14)/n;Nt(r,s,{type:"sine",freq:128*o,freqTo:54*o,start:a,duration:.07,gain:.5}),jn(r,s,{start:a,duration:.05,gain:.28,filter:"lowpass",freq:620*o,freqTo:190})}function jb(i,e,t){const n=i.spatialVoice(e,t,.3,$c);if(!n)return;const s=i.context;if(!s)return;const r=i.now;Nt(s,n,{type:"square",freq:150,freqTo:380,start:r,duration:.32,gain:.16,attack:.06})}function ew(i,e,t,n){const s=i.spatialVoice(e,t,.5,ts);if(!s)return;const r=i.context;if(!r)return;const a=i.now;Nt(r,s,{type:"triangle",freq:180,freqTo:1400,start:a,duration:n,gain:.32,attack:n*.7}),jn(r,s,{start:a,duration:n,gain:.3,attack:n*.8,filter:"bandpass",freq:400,freqTo:3200,q:4})}function tw(i,e,t,n){const s=i.spatialVoice(e,t,.9,ts);if(!s)return;const r=i.context;if(!r)return;const a=i.now,o=Ee(ns,.92,1.09)/n;Nt(r,s,{type:"sine",freq:190*o,freqTo:38*o,start:a,duration:.26*n,gain:1}),jn(r,s,{start:a,duration:.2*n,gain:.75,filter:"bandpass",freq:2600*o,freqTo:240*o,q:1.6}),Yc(r,s,a,.55)}function nw(i,e,t){const n=i.spatialVoice(e,t,.4,ts);if(!n)return;const s=i.context;if(!s)return;const r=i.now+.045;jn(s,n,{start:r,duration:.13,gain:.5,attack:.006,filter:"lowpass",freq:1600*Ee(ns,.85,1.2),freqTo:400})}function iw(i){const e=i.voice(.7,ts);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Nt(t,e,{type:"sine",freq:120,freqTo:40,start:n,duration:.3,gain:.9}),jn(t,e,{start:n,duration:.18,gain:.4,filter:"bandpass",freq:1400,freqTo:500,q:.8})}function sw(i){const e=i.voice(.8,ts);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Nt(t,e,{type:"sawtooth",freq:220,freqTo:30,start:n,duration:1.2,gain:.5}),Nt(t,e,{type:"sine",freq:110,freqTo:22,start:n,duration:1.4,gain:.5})}function rw(i){const e=i.voice(.35);if(!e)return;const t=i.context;if(!t)return;const n=i.now;for(let s=0;s<2;s++)Nt(t,e,{type:"square",freq:620,start:n+s*.18,duration:.12,gain:.28})}function dd(i){const e=i.voice(.35);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Nt(t,e,{type:"triangle",freq:520,start:n,duration:.14,gain:.3}),Nt(t,e,{type:"triangle",freq:780,start:n+.13,duration:.2,gain:.3})}function fr(i){const e=i.voice(.4);if(!e)return;const t=i.context;if(!t)return;const n=i.now;Nt(t,e,{type:"triangle",freq:880,start:n,duration:.09,gain:.3}),Yc(t,e,n,.18)}const aw=12,Sa=.2,ow=.5,lw={playerRadius:Ye.radius,playerHeight:Ye.height,enemyRadius:tp,enemyHeight:np};class cw{renderApp;labMaterials;worldView;enemyView;enemyAttackView;projectileView;splatView;burstView;impactView;weaponView;cameraController;audio=new qb;hud=new _b;minimap;stats=new Ob;fps=new Nb(document.getElementById("fps-counter"));debugMap;startButton=document.getElementById("btn-start");resumeButton=document.getElementById("btn-resume");retryButton=document.getElementById("btn-retry");newSeedButton=document.getElementById("btn-newseed");optionsButton=document.getElementById("btn-options");optionsPauseButton=document.getElementById("btn-options-pause");pauseScreen=document.getElementById("screen-pause");input;touchLayer;touch;actions=Qp();loop;state;seed;screen="title";genMs=0;prewarmMs=0;prevYaw=0;prevPitch=0;elapsed=0;debugAge=Sa;roomName="";mapEnemies=[];clearedRooms=[];muzzleWorld=new I;impactSurface={x:0,y:0,z:0,nx:0,ny:0,nz:0};quality;frameContext={enemies:0,projectiles:0,decals:0,droplets:0,drawCalls:0,triangles:0,programs:0};stepMs=0;resizeRecheck=0;viewportAge=0;options;settings;adaptive;settingsReturn="title";constructor(e){const t=new URLSearchParams(location.search);this.seed=vh(t.get("seed")),this.quality=Py(t),this.options=new Lb(t),this.renderApp=new Iy(e,this.quality),this.adaptive=new Ly(this.quality.pixelRatioCap,this.options.get("adaptive")),this.labMaterials=zy(this.renderApp.maxAnisotropy),this.worldView=new tS(this.renderApp.scene,this.labMaterials),this.enemyView=new pS(this.renderApp.scene,Lt.maxAlive),this.enemyAttackView=new _S(this.renderApp.scene,this.quality.projectileShader),this.projectileView=new bS(this.renderApp.scene,aw,this.quality.projectileShader,this.quality.projectileLights),this.splatView=new VS(this.renderApp.renderer,this.renderApp.scene,{paintTexelsPerMetre:this.quality.paintTexelsPerMetre,paintMapMax:this.quality.paintMapMax,decalCapacity:this.quality.decalCapacity}),this.burstView=new JS(this.renderApp.scene,{dropletCapacity:this.quality.dropletCapacity,flashCapacity:this.quality.flashCapacity}),this.burstView.onDropletLand=(n,s,r,a,o)=>{this.splatView.stampDrip(n,s,r,a,o)},this.impactView=new ob(this.renderApp.scene,{capacity:this.quality.impactCapacity}),this.weaponView=new mb(this.renderApp.viewScene),this.cameraController=new gb(this.renderApp.camera),this.debugMap=new zb(document.getElementById("debug-map")),this.minimap=new wb(document.getElementById("minimap-canvas")),this.input=new tm(e,this.actions,{sensitivity:this.options.get("mouseSensitivity"),invertY:this.options.get("invertY")}),this.input.onLockStateChange=(n,s)=>{if(this.screen==="none"){if(n){this.hud.setCaptureHint(!1);return}s?this.hud.setCaptureHint(!this.touchLayer.isActive):this.setScreen("pause")}},this.input.onSuspend=()=>{this.screen==="none"&&this.setScreen("pause")},this.touchLayer=new Eb(Ry(t)),this.touch=new nm({stick:this.touchLayer.stick,move:this.touchLayer.move,aim:this.touchLayer.aim,pause:this.touchLayer.pause,sprint:this.touchLayer.sprint},this.actions,{sensitivity:this.options.get("touchSensitivity"),invertY:this.options.get("invertY"),autoFire:this.options.get("autoFire")}),this.touch.peer=this.input,this.input.peer=this.touch,this.touch.onStickChange=(n,s,r)=>this.touchLayer.setStick(n,s,r),this.touch.onStickOrigin=(n,s)=>this.touchLayer.setStickOrigin(n,s),this.touch.onAimOrigin=(n,s,r)=>this.touchLayer.setAimOrigin(n,s,r),this.touch.onSprintChange=n=>this.touchLayer.setSprint(n),this.settings=new Db(this.options,uc()),this.settings.setBootLevel(this.quality.level),this.settings.onBack=()=>this.setScreen(this.settingsReturn),this.settings.onReload=n=>this.reloadWithQuality(n),this.options.onChange=n=>this.applyOption(n),this.audio.setMasterVolume(this.options.get("masterVolume")),this.audio.setEffectsVolume(this.options.get("effectsVolume")),this.state=this.createRun(this.seed),this.loop=new kb(n=>this.step(n),(n,s,r)=>this.renderFrame(n,s,r),n=>window.requestAnimationFrame(n),n=>window.cancelAnimationFrame(n)),this.bindUi(),window.addEventListener("resize",this.onResize),window.addEventListener("orientationchange",this.onResize),t.get("debug")==="1"&&(this.hud.setDebugVisible(!0),this.debugMap.setVisible(!0)),this.setScreen("title"),this.loop.start(),this.loop.setRunning(!1)}onStartClick=()=>{this.audio.unlock(),fr(this.audio),this.restart(!0)};onResumeClick=()=>{this.audio.unlock(),this.setScreen("none")};onRetryClick=()=>{this.audio.unlock(),fr(this.audio),this.restart(!0)};onNewSeedClick=()=>{this.audio.unlock(),fr(this.audio),this.restart(!1)};onPauseScreenClick=e=>{if(this.touch.consumePauseClickSuppression())return;const t=e.target;t instanceof Element&&t.closest("button")||this.setScreen("none")};createRun(e){const t=performance.now(),n=o0(e,{validation:lw,now:()=>performance.now()}),s=qp(n,Dt(e,"sim"));this.genMs=performance.now()-t,this.splatView.beginFacility(n,s.index,e),this.burstView.beginRoom(0,e),this.impactView.beginRun(e),Zb(e),this.audio.resetEscalation(),this.worldView.build(n,this.splatView.floorPaint),this.splatView.setReceivers(this.worldView.paintReceivers),this.renderApp.configureForFacility(n),this.renderApp.setFixtureFocus(n.playerSpawn.x,n.playerSpawn.z),this.debugMap.setPlan(n),this.minimap.setPlan(n),this.clearedRooms.length=0;for(const a of n.rooms)this.clearedRooms.push(a.encounter.budget<=0);this.actions.yaw=n.playerSpawn.yaw,this.actions.pitch=0,this.prevYaw=this.actions.yaw,this.prevPitch=0,this.cameraController.reset(),this.enemyView.update(s.enemies,0),this.enemyAttackView.update(s,0),this.projectileView.reset(),this.weaponView.reset(),this.stats.reset(),this.debugAge=Sa,this.cameraController.update(s.player,this.actions.yaw,0,0,0);const r=performance.now();return this.renderApp.setShadowFocus(s.player.x,s.player.z),this.renderApp.prewarm(),this.prewarmMs=performance.now()-r,this.stats.syncPrograms(this.renderApp.programCount),this.hud.setIntegrity(s.player.hp,Ye.maxHp),this.hud.clearStatus(),this.roomName=n.rooms[n.startRoomId].name,s}restart(e=!0){e||(this.seed=vh(null)),this.state=this.createRun(this.seed),this.elapsed=0,this.input.release(),this.touch.release(),this.loop.resetClock(),this.setScreen("none"),this.hud.setStatus(this.roomName,"Containment has failed — reach the core chamber","alert")}setScreen(e){this.fps.reset(),this.screen=e,this.hud.showScreen(e),this.loop.setRunning(e==="none"),this.input.setCaptureEnabled(e==="none"),this.touch.setEnabled(e==="none"),this.touchLayer.setGameplayVisible(e==="none"),this.audio.setSuspended(e!=="none",e==="over"?Tb:0),e==="none"?(this.input.requestLock(),this.hud.setCaptureHint(this.needsCaptureHint)):(this.hud.setCaptureHint(!1),this.input.release(),this.input.releaseLock(),this.touch.release()),e==="over"&&(this.hud.clearStatus(),this.hud.setResults(this.state.stats,Na(this.state),Da(this.state),this.state.seed,this.state.status==="cleared"))}applyOption(e){const t=this.options.snapshot;switch(e){case"masterVolume":this.audio.setMasterVolume(t.masterVolume);break;case"effectsVolume":this.audio.setEffectsVolume(t.effectsVolume);break;case"mouseSensitivity":this.input.setSensitivity(t.mouseSensitivity);break;case"touchSensitivity":this.touch.setSensitivity(t.touchSensitivity);break;case"invertY":this.input.setInvertY(t.invertY),this.touch.setInvertY(t.invertY);break;case"autoFire":this.touch.setAutoFire(t.autoFire);break;case"adaptive":this.adaptive.setEnabled(t.adaptive);break;case"showFps":this.fps.setEnabled(t.showFps);break;case"quality":this.applyQualityChoice();break}this.settings.refresh()}applyQualityChoice(){const e=this.options.get("quality"),t=e==="auto"?Cf():e;e!=="auto"&&this.options.get("adaptive")&&this.options.set("adaptive",!1),this.adaptive.setBase(Af(t).pixelRatioCap)&&this.commitPixelRatioCap()}commitPixelRatioCap(){this.renderApp.setMaxPixelRatio(this.adaptive.pixelRatioCap),this.renderApp.resize()}reloadWithQuality(e){const t=new URLSearchParams(location.search);t.set("quality",e),t.set("seed",this.seed),t.set("adaptive",this.options.get("adaptive")?"1":"0"),location.search=t.toString()}openSettings(e){this.settingsReturn=e,this.settings.refresh(),this.setScreen("settings")}onMenuPointerDown=()=>{this.audio.unlock()};onOptionsClick=()=>{this.audio.unlock(),fr(this.audio),this.openSettings("title")};onOptionsPauseClick=()=>{this.audio.unlock(),fr(this.audio),this.openSettings("pause")};get menuButtons(){return[this.startButton,this.resumeButton,this.retryButton,this.newSeedButton,this.optionsButton,this.optionsPauseButton]}bindUi(){for(const e of this.menuButtons)e?.addEventListener("pointerdown",this.onMenuPointerDown);this.startButton?.addEventListener("click",this.onStartClick),this.resumeButton?.addEventListener("click",this.onResumeClick),this.retryButton?.addEventListener("click",this.onRetryClick),this.newSeedButton?.addEventListener("click",this.onNewSeedClick),this.optionsButton?.addEventListener("click",this.onOptionsClick),this.optionsPauseButton?.addEventListener("click",this.onOptionsPauseClick),this.pauseScreen?.addEventListener("click",this.onPauseScreenClick)}unbindUi(){for(const e of this.menuButtons)e?.removeEventListener("pointerdown",this.onMenuPointerDown);this.startButton?.removeEventListener("click",this.onStartClick),this.resumeButton?.removeEventListener("click",this.onResumeClick),this.retryButton?.removeEventListener("click",this.onRetryClick),this.newSeedButton?.removeEventListener("click",this.onNewSeedClick),this.optionsButton?.removeEventListener("click",this.onOptionsClick),this.optionsPauseButton?.removeEventListener("click",this.onOptionsPauseClick),this.pauseScreen?.removeEventListener("click",this.onPauseScreenClick)}step(e){const t=performance.now();$p(this.state,this.actions,e),this.touch.acknowledgeFireLatch(),this.stepMs+=performance.now()-t}renderFrame(e,t,n,s=!0){const r=performance.now(),a=this.stepMs;this.stepMs=0,this.elapsed+=n,this.handleInputEdges();const o=this.state,l=this.actions.yaw,c=this.actions.pitch,h=l-this.prevYaw,d=c-this.prevPitch;if(this.prevYaw=l,this.prevPitch=c,this.cameraController.update(o.player,l,c,e,n),this.renderApp.setShadowFocus(o.player.x,o.player.z),this.renderApp.setFixtureFocus(o.player.x,o.player.z),this.audio.beginFrame(),this.audio.setListener(o.player.x,o.player.z,l),this.enemyView.update(o.enemies,e),this.enemyAttackView.update(o,e),this.worldView.updateMachines(o),this.drainEvents(),this.projectileView.update(o.projectiles,e,this.elapsed),this.splatView.update(n),this.burstView.update(n,this.elapsed),this.impactView.update(n),this.weaponView.update(n,h,d,Math.hypot(o.player.vx,o.player.vz),this.elapsed),this.hud.update(n),this.hud.setCooling(o.player.fireCooldown>0),this.hud.setCaptureHint(this.needsCaptureHint),this.minimap.draw(o.player.x,o.player.z,l,o.activeRoomId,n),this.viewportAge+=n,this.viewportAge>=ow&&(this.viewportAge=0,this.applyViewportChange()),this.debugAge+=n,this.hud.isDebugVisible&&this.debugAge>=Sa){this.debugAge=0;const f=o.engagedRoomId>=0?o.runtime[o.engagedRoomId]:void 0;this.hud.setDebug({seed:o.seed,quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveSteps:this.adaptive.downgrades,frame:this.stats.report(),drawCalls:this.renderApp.drawCalls,triangles:this.renderApp.triangles,programs:this.renderApp.programCount,geometries:this.renderApp.geometryCount,textures:this.renderApp.textureCount,meshes:this.worldView.meshCount,lights:this.renderApp.lightCount,fixtures:this.renderApp.fixtureCount,rooms:o.rooms.length,roomArchetype:o.rooms[o.activeRoomId]?.archetype??"—",roomEscalation:o.rooms[o.activeRoomId]?.escalation??0,sectors:Da(o),brushes:o.brushes.length,sectorsCleared:Na(o),threatTotal:o.plan.report.threatTotal,requiredThreat:o.plan.report.requiredThreat,threatSpent:f?f.threatSpent:0,threatBudget:f?o.rooms[f.id].encounter.budget:0,enemies:o.enemies.length,projectiles:o.projectiles.length,decals:this.splatView.decalCount,decalBudget:this.quality.decalCapacity,droplets:this.burstView.dropletCount,score:o.stats.score,genMs:this.genMs,prewarmMs:this.prewarmMs,attempts:o.plan.report.attempts,fallback:o.plan.report.fallback})}if(this.debugMap.isVisible){this.mapEnemies.length=0;for(const f of o.enemies)this.mapEnemies.push({x:f.x,z:f.z});this.debugMap.draw({playerX:o.player.x,playerZ:o.player.z,playerYaw:l,activeRoomId:o.activeRoomId,engagedRoomId:o.engagedRoomId,cleared:this.clearedRooms,enemies:this.mapEnemies})}if(this.renderApp.render(),this.fps.update(t,s&&this.screen==="none"&&!document.hidden&&!this.loop.usesTimerFallback),!s){this.stats.syncPrograms(this.renderApp.programCount);return}const u=this.frameContext;u.enemies=o.enemies.length,u.projectiles=o.projectiles.length,u.decals=this.splatView.decalCount,u.droplets=this.burstView.dropletCount,u.drawCalls=this.renderApp.drawCalls,u.triangles=this.renderApp.triangles,u.programs=this.renderApp.programCount,this.stats.addFrame(t,a,performance.now()-r,u),this.adaptive.consider({runActive:this.screen==="none",visible:!document.hidden,timerScheduled:this.loop.usesTimerFallback,samples:this.stats.sampleCount,breaches:this.stats.windowBreaches})&&this.commitPixelRatioCap()}handleInputEdges(){if(this.input.consumeDebugToggle()){const n=this.hud.toggleDebug();this.debugMap.setVisible(n),n&&(this.debugAge=Sa)}this.input.consumeMuteToggle()&&this.audio.toggleMuted(),this.input.consumeRestart()&&(this.screen==="over"?this.restart(!1):this.screen!=="title"&&this.screen!=="settings"&&this.restart(!0));const e=this.input.consumePause(),t=this.touch.consumePause();(e||t)&&(this.screen==="none"?this.setScreen("pause"):this.screen==="pause"?this.setScreen("none"):this.screen==="settings"&&this.setScreen(this.settingsReturn))}drainEvents(){const e=this.state.events;for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case"shot":{this.weaponView.writeMuzzleWorld(this.renderApp.camera,this.renderApp.viewCamera,this.muzzleWorld);const s=Pp(this.state,n.x,n.y,n.z,n.dx,n.dy,n.dz,yS);this.projectileView.beginShot(n.id,this.muzzleWorld.x,this.muzzleWorld.y,this.muzzleWorld.z,s),this.weaponView.kick(),this.cameraController.addShake(.16),Yb(this.audio),$b(this.audio,Ns.cooldown);break}case"impactWorld":ub(this.state.index,n,this.impactSurface),this.impactView.spawn(this.impactSurface.x,this.impactSurface.y,this.impactSurface.z,this.impactSurface.nx,this.impactSurface.ny,this.impactSurface.nz),Kb(this.audio,n.x,n.z);break;case"enemyHurt":this.hud.flashHit(),Jb(this.audio,n.x,n.z);break;case"enemyStep":Qb(this.audio,n.x,n.z,n.scale);break;case"enemyWindUp":jb(this.audio,n.x,n.z);break;case"anchorRising":n.kind==="containmentMachine"?this.hud.setStatus("Production line — active","The facility is making more specimens","alert"):this.hud.setStatus("Primary containment — open","Lift opening — clear the platform","alert"),this.cameraController.addShake(.34),Ds(this.audio,"rise",n.x,n.z,n.scale);break;case"broodCharging":Ds(this.audio,"charge",n.x,n.z,n.scale);break;case"rangedCharge":Ds(this.audio,"aim",n.x,n.z,n.scale);break;case"rangedFire":Ds(this.audio,"volley",n.x,n.z,n.scale);break;case"broodReleased":this.cameraController.addShake(.06),Ds(this.audio,"release",n.x,n.z,n.scale);break;case"anchorShutdown":Ds(this.audio,"shutdown",n.x,n.z,n.scale),this.hud.setStatus(n.cascade?"Primary containment — neutralized":"Production line — offline",n.cascade?"Swarm collapsing":"Core disabled","secure");break;case"enemyKilled":this.hud.flashHit(),this.cameraController.addShake(.08),ew(this.audio,n.x,n.z,pc.implodeTime);break;case"enemyBurst":this.splatView.splat(n.x,n.y,n.z,n.scale,n.dirX,n.dirZ),this.burstView.burst(n.x,n.y,n.z,n.scale,n.dirX,n.dirZ),this.cameraController.addShake(.22),tw(this.audio,n.x,n.z,n.scale),nw(this.audio,n.x,n.z);break;case"scored":this.hud.flashScore(n.amount,n.chain);break;case"roomEntered":this.minimap.discover(n.room),this.audio.setEscalation(n.escalation),this.hud.setStatus(n.name,n.final?"Primary containment — secure it to end the run":n.hostile?"Containment breach detected":"Sector secure",n.hostile?"alert":"secure");break;case"roomCleared":this.clearedRooms[n.room]=!0,this.hud.setIntegrity(n.hp,Ye.maxHp),this.hud.setStatus(n.required?"Sector secure":"Optional sector secure",n.heal>0?`${n.cleared} of ${n.total} required sectors held — integrity +${n.heal}`:`${n.cleared} of ${n.total} required sectors held`,"secure"),dd(this.audio);break;case"waveStarted":this.hud.setStatus(`Wave ${n.wave} of ${n.waveCount}`,`${n.count} specimen${n.count===1?"":"s"} inbound`,"alert"),rw(this.audio);break;case"waveCleared":this.hud.setStatus("Wave clear",`${n.waveCount-n.wave} remaining`),dd(this.audio);break;case"runCleared":this.setScreen("over");break;case"playerHurt":this.hud.setIntegrity(n.hp,Ye.maxHp),this.hud.flashDamage(),this.cameraController.addShake(.5),iw(this.audio);break;case"playerDied":sw(this.audio),this.setScreen("over");break}}e.length=0}advance(e){for(let t=0;t<e;t++)this.step(Ri);this.renderFrame(0,Ri*1e3,Ri,!1)}get buildPlan(){return this.state.plan}setActions(e){Object.assign(this.actions,e)}setOption(e,t){return this.options.set(e,t)}optionValues(){return{...this.options.snapshot}}profileBegin(){this.stats.reset()}profile(){return{...this.stats.performance(),quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveEnabled:this.adaptive.enabled,adaptiveDowngrades:this.adaptive.downgrades,genMs:+this.genMs.toFixed(2),prewarmMs:+this.prewarmMs.toFixed(2),...this.resources()}}resources(){return{geometries:this.renderApp.geometryCount,textures:this.renderApp.textureCount,programs:this.renderApp.programCount,worldMeshes:this.worldView.meshCount,lights:this.renderApp.lightCount,pointLights:this.renderApp.pointLightCount}}snapshot(){const e=this.state,t=e.engagedRoomId>=0?e.runtime[e.engagedRoomId]:void 0;return{seed:e.seed,tick:e.tick,status:e.status,screen:this.screen,rooms:e.rooms.length,discoveredRooms:this.minimap.discoveredCount,activeRoom:e.activeRoomId,engagedRoom:e.engagedRoomId,roomsCleared:e.stats.roomsCleared,wave:t?t.wave:0,waveCount:t?t.waveCount:0,pendingArrivals:t?t.roster.length:0,threatSpent:t?t.threatSpent:0,threatBudget:t?e.rooms[t.id].encounter.budget:0,runThreat:e.plan.report.requiredThreat,facilityThreat:e.plan.report.threatTotal,enemies:e.enemies.length,projectiles:e.projectiles.length,enemyBolts:e.enemyBolts.filter(n=>n.alive).length,decals:this.splatView.decalCount,settledDecals:this.splatView.settledDecalCount,droplets:this.burstView.dropletCount,impacts:this.impactView.liveCount,impactCapacity:this.impactView.poolCapacity,hp:e.player.hp,player:{x:+e.player.x.toFixed(3),z:+e.player.z.toFixed(3)},specimens:e.enemies.map(n=>({x:+n.x.toFixed(2),z:+n.z.toFixed(2),state:n.state,variant:n.variant})),aim:{yaw:+this.actions.yaw.toFixed(4),pitch:+this.actions.pitch.toFixed(4)},pointerLocked:this.input.isLocked,touch:{active:this.touchLayer.isActive,...this.touch.state()},stats:e.stats,quality:this.quality.level,pixelRatio:this.renderApp.renderer.getPixelRatio(),pixelRatioCap:this.renderApp.pixelRatioCap,adaptiveDowngrades:this.adaptive.downgrades,options:{...this.options.snapshot},audio:{ready:this.audio.ready,muted:this.audio.isMuted,master:this.audio.masterVolume,effects:this.audio.effectsVolume,escalation:this.audio.escalationLevel,alarm:this.audio.alarmGains()},drawCalls:this.renderApp.drawCalls,triangles:this.renderApp.triangles,frame:this.stats.report(),resources:this.resources(),generation:e.plan.report}}onResize=()=>{this.applyViewportChange(),this.resizeRecheck!==0&&window.cancelAnimationFrame(this.resizeRecheck),this.resizeRecheck=window.requestAnimationFrame(()=>{this.resizeRecheck=0,this.applyViewportChange()})};applyViewportChange(){this.renderApp.resize()&&this.touch.handleViewportChange()}get needsCaptureHint(){return this.input.needsCaptureHint&&!this.touchLayer.isActive}dispose(){window.removeEventListener("resize",this.onResize),window.removeEventListener("orientationchange",this.onResize),this.resizeRecheck!==0&&(window.cancelAnimationFrame(this.resizeRecheck),this.resizeRecheck=0),this.unbindUi(),this.settings.dispose(),this.options.onChange=null,this.loop.stop(),this.input.dispose(),this.touch.dispose(),this.touchLayer.dispose(),this.worldView.dispose(),this.enemyView.dispose(),this.enemyAttackView.dispose(),this.projectileView.dispose(),this.splatView.dispose(),this.burstView.dispose(),this.impactView.dispose(),this.audio.dispose(),this.hud.dispose(),this.minimap.dispose(),this.weaponView.dispose(),this.debugMap.dispose(),this.labMaterials.dispose(),this.renderApp.dispose()}}const Vf=document.getElementById("view");if(!Vf)throw new Error("Canvas #view is missing from index.html");try{const i=new cw(Vf);window.game=i}catch(i){console.error("[clawd-pop-3d] failed to start",i);const e=document.getElementById("screen-title");e&&(e.innerHTML='<div><div class="result-title">WebGL unavailable</div><div class="hint">This game needs a browser with WebGL2 enabled.</div></div>')}
