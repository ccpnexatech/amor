(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const p=new Date("2024-05-30T00:00:00"),h=["capa","cap1","cap2","cap3","cap4","cap5","cap6","cap7","cap8","fim"],f=()=>document.getElementById("scroll-root"),l=t=>document.getElementById(t);document.addEventListener("DOMContentLoaded",()=>{g(),y(),v(),M(),x(),b(),$(),w(),E(),T(),L(),C(),A(),I(),P(),S()});function g(){"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").catch(()=>{})}function y(){const t=l("splash");setTimeout(()=>{t.classList.add("out"),setTimeout(()=>t.remove(),950)},2800)}function v(){const t=l("cursor");if(!t||!window.matchMedia("(pointer:fine)").matches)return;let e=0,n=0,o=0,a=0;const i=l("screen");i.addEventListener("mousemove",s=>{const d=i.getBoundingClientRect();e=s.clientX-d.left,n=s.clientY-d.top}),function s(){o+=(e-o)*.16,a+=(n-a)*.16,t.style.left=o+"px",t.style.top=a+"px",requestAnimationFrame(s)}()}function M(){const t=l("prog-left"),e=l("prog-bottom"),n=f();n.addEventListener("scroll",()=>{const o=Math.min(100,n.scrollTop/(n.scrollHeight-n.clientHeight)*100);t.style.height=o+"%",e.style.width=o+"%",u()},{passive:!0})}function x(){const t=l("nav-dots");h.forEach(e=>{const n=document.createElement("button");n.className="nd",n.setAttribute("aria-label",e),n.addEventListener("click",()=>{const o=l(e);o&&o.scrollIntoView({behavior:"smooth"})}),t.appendChild(n)}),u()}function u(){const t=f(),e=t.scrollTop+t.clientHeight*.5,n=document.querySelectorAll(".nd");let o=0;h.forEach((a,i)=>{const s=l(a);s&&s.offsetTop<=e&&(o=i)}),n.forEach((a,i)=>a.classList.toggle("on",i===o))}function b(){const t=f(),e=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&(o.target.classList.add("vis"),e.unobserve(o.target))})},{root:t,threshold:.12});document.querySelectorAll(".reveal").forEach(n=>e.observe(n))}function $(){const t=l("capa-canvas");if(!t)return;const e=t.getContext("2d"),n=["#ff6b6b","#feca57","#48dbfb","#a29bfe","#fd79a8"];let o,a,i;function s(){o=t.width=t.offsetWidth,a=t.height=t.offsetHeight}function d(){return Array.from({length:55},()=>({x:Math.random()*o,y:Math.random()*a,r:Math.random()*2.2+.7,c:n[Math.random()*n.length|0],vx:(Math.random()-.5)*.4,vy:-(Math.random()*.5+.15),a:Math.random()*.4+.15}))}s(),i=d(),window.addEventListener("resize",()=>{s(),i=d()}),function r(){e.clearRect(0,0,o,a),i.forEach(c=>{e.globalAlpha=c.a,e.beginPath(),e.arc(c.x,c.y,c.r,0,Math.PI*2),e.fillStyle=c.c,e.fill(),c.x+=c.vx,c.y+=c.vy,c.y<-10&&(c.y=a+10),c.x<-10&&(c.x=o+10),c.x>o+10&&(c.x=-10)}),e.globalAlpha=1,requestAnimationFrame(r)}()}function w(){const t=l("embers-canvas");if(!t)return;const e=t.getContext("2d");let n,o;function a(){n=t.width=t.offsetWidth,o=t.height=t.offsetHeight}a();const i=Array.from({length:40},()=>s(!0));function s(d){return{x:Math.random()*(n||390),y:d?Math.random()*(o||844):(o||844)+10,r:Math.random()*2.5+.8,vy:-(Math.random()*1.2+.4),vx:(Math.random()-.5)*.6,life:Math.random(),decay:Math.random()*.003+.001,hue:30+Math.random()*30}}(function d(){e.clearRect(0,0,n,o),i.forEach((r,c)=>{e.globalAlpha=r.life*.85,e.beginPath(),e.arc(r.x,r.y,r.r*r.life,0,Math.PI*2),e.fillStyle=`hsl(${r.hue},100%,65%)`,e.fill(),e.globalAlpha=r.life*.25,e.beginPath(),e.arc(r.x,r.y,r.r*r.life*3,0,Math.PI*2),e.fillStyle=`hsl(${r.hue},100%,60%)`,e.fill(),r.x+=r.vx,r.y+=r.vy,r.life-=r.decay,r.life<=0&&(i[c]=s(!1))}),e.globalAlpha=1,requestAnimationFrame(d)})()}function E(){const t=l("field-lines");if(t)for(let e=0;e<8;e++){const n=document.createElement("div");n.className="field-line";const o=80+e*55;n.style.cssText=`
      width:${o}px; height:${o}px;
      left:50%; top:50%;
      transform: translate(-50%,-50%);
      animation-delay:${e*.4}s;
      animation-duration:${2.5+e*.3}s;
    `,t.appendChild(n)}}function T(){const t=l("orbits-bg");if(!t)return;[80,130,180,230].forEach((n,o)=>{const a=document.createElement("div");a.className="orbit-dot",a.style.cssText=`
      --r: ${n}px;
      animation-duration: ${10+o*4}s;
      animation-delay: ${-o*3}s;
      opacity: ${.5-o*.08};
      width: ${7-o}px;
      height: ${7-o}px;
      margin-left: ${-(3.5-o*.5)}px;
      margin-top: ${-(3.5-o*.5)}px;
    `,t.appendChild(a)})}function L(){const t=l("snow-cont");if(!t)return;const e=["❄","❅","❆","·","∗","•"];function n(){const o=document.createElement("span");o.className="flake",o.textContent=e[Math.random()*e.length|0],o.style.cssText=`
      left: ${Math.random()*100}%;
      font-size: ${Math.random()*14+8}px;
      animation-duration: ${Math.random()*7+5}s;
      animation-delay: ${Math.random()*3}s;
      opacity: ${Math.random()*.5+.3};
    `,t.appendChild(o),setTimeout(()=>o.remove(),13e3)}for(let o=0;o<20;o++)setTimeout(n,Math.random()*4e3);setInterval(n,480)}function C(){const t=l("rain-cont");if(t)for(let e=0;e<70;e++){const n=document.createElement("div");n.className="raindrop",n.style.cssText=`
      left: ${Math.random()*100}%;
      height: ${Math.random()*22+10}px;
      animation-duration: ${Math.random()*.55+.35}s;
      animation-delay: ${Math.random()*2.5}s;
    `,t.appendChild(n)}}function A(){const t=document.querySelector(".lightning-over");if(!t)return;function e(){t.classList.add("flash"),setTimeout(()=>{t.classList.remove("flash"),setTimeout(()=>{t.classList.add("flash"),setTimeout(()=>t.classList.remove("flash"),55)},100)},70)}(function n(){setTimeout(()=>{e(),n()},5e3+Math.random()*7e3)})()}function I(){const t=l("gold-particles");if(!t)return;function e(){const n=document.createElement("div"),o=Math.random()*100,a=Math.random()*3+1;n.style.cssText=`
      position: absolute;
      left: ${o}%;
      bottom: ${Math.random()*100}%;
      width: ${a}px; height: ${a}px;
      border-radius: 50%;
      background: hsl(${45+Math.random()*15}, 100%, ${60+Math.random()*20}%);
      animation: heartRise ${Math.random()*6+4}s ease-in ${Math.random()*2}s infinite;
      opacity: 0;
    `,t.appendChild(n),setTimeout(()=>n.remove(),12e3)}for(let n=0;n<15;n++)setTimeout(e,Math.random()*3e3);setInterval(e,700)}function P(){const t=l("hearts-cont");if(!t)return;function e(){const n=document.createElement("div");n.className="hrt",n.textContent="♥",n.style.cssText=`
      left: ${5+Math.random()*90}%;
      font-size: ${Math.random()*18+10}px;
      animation-duration: ${Math.random()*5+5}s;
      animation-delay: ${Math.random()*1.5}s;
    `,t.appendChild(n),setTimeout(()=>n.remove(),12e3)}for(let n=0;n<14;n++)setTimeout(e,Math.random()*3500);setInterval(e,950)}function S(){const t=l("day-num");if(!t)return;const e=Math.floor((Date.now()-p.getTime())/864e5);let n=!1;const o=f(),a=new IntersectionObserver(i=>{if(i[0].isIntersecting&&!n){n=!0,a.disconnect();const s=performance.now(),d=1800;(function r(c){const m=1-Math.pow(1-Math.min((c-s)/d,1),3);t.textContent=Math.floor(m*e).toLocaleString("pt-BR"),m<1?requestAnimationFrame(r):t.textContent=e.toLocaleString("pt-BR")})(performance.now())}},{root:o,threshold:.4});a.observe(t.parentElement),t.textContent="0"}
