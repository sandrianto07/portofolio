"use strict";
let typingTimer=null;

document.addEventListener("DOMContentLoaded",()=>{
 initPageLoader();initTyping();initScrollProgress();initNavbar();initActiveNavigation();initRevealAnimation();initMobileMenu();initSmoothScroll();initCustomCursor();initMagneticElements();initHeroParallax();initWorkCards();initBackToTop();
});

function initPageLoader(){const el=document.querySelector(".page-loader");if(!el)return;const hide=()=>setTimeout(()=>el.classList.add("loaded"),700);document.readyState==="complete"?hide():window.addEventListener("load",hide,{once:true});}

function initTyping(){const el=document.getElementById("typing-text");if(!el)return;startTyping("Hi, I'm Bagas Sandrianto Siregar");}
function startTyping(text){const el=document.getElementById("typing-text");if(!el)return;if(typingTimer)clearTimeout(typingTimer);el.textContent="";let i=0;const type=()=>{if(i>=text.length){typingTimer=null;return}el.textContent+=text[i++];typingTimer=setTimeout(type,65)};typingTimer=setTimeout(type,700)}
window.restartPortfolioTyping=text=>text&&startTyping(text);

function initScrollProgress(){const el=document.querySelector(".scroll-progress");if(!el)return;const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;el.style.width=`${max>0?scrollY/max*100:0}%`};addEventListener("scroll",update,{passive:true});addEventListener("resize",update,{passive:true});update()}
function initNavbar(){const el=document.querySelector(".navbar");if(!el)return;const update=()=>el.classList.toggle("scrolled",scrollY>30);addEventListener("scroll",update,{passive:true});update()}

function initActiveNavigation(){const sections=[...document.querySelectorAll("main section[id]")],links=[...document.querySelectorAll(".nav-link")];if(!sections.length||!links.length)return;const update=()=>{let current=sections[0].id;sections.forEach(s=>{if(scrollY+220>=s.offsetTop)current=s.id});links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${current}`))};addEventListener("scroll",update,{passive:true});addEventListener("resize",update,{passive:true});update()}

function initRevealAnimation(){const items=[...document.querySelectorAll(".reveal")];if(!items.length)return;if(matchMedia("(prefers-reduced-motion: reduce)").matches){items.forEach(el=>el.classList.add("visible"));return}items.forEach(el=>{if(el.dataset.delay)el.style.transitionDelay=`${el.dataset.delay}ms`});const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -40px"});items.forEach(el=>observer.observe(el))}

function initMobileMenu(){const toggle=document.querySelector(".menu-toggle"),menu=document.querySelector(".mobile-menu");if(!toggle||!menu)return;const close=()=>{toggle.classList.remove("active");menu.classList.remove("open");document.body.classList.remove("menu-open");toggle.setAttribute("aria-expanded","false")};const open=()=>{toggle.classList.add("active");menu.classList.add("open");document.body.classList.add("menu-open");toggle.setAttribute("aria-expanded","true")};toggle.addEventListener("click",()=>menu.classList.contains("open")?close():open());menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));document.addEventListener("keydown",e=>e.key==="Escape"&&close());addEventListener("resize",()=>innerWidth>768&&close());window.closeMobileMenu=close}

function initSmoothScroll(){document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",e=>{const id=link.getAttribute("href");if(!id||id==="#")return;const target=document.querySelector(id);if(!target)return;e.preventDefault();const nav=document.querySelector(".navbar"),top=target.getBoundingClientRect().top+scrollY-(nav?.offsetHeight||0);scrollTo({top,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}))}

function initCustomCursor(){const dot=document.querySelector(".cursor-dot"),outline=document.querySelector(".cursor-outline");if(!dot||!outline||matchMedia("(hover:none),(pointer:coarse)").matches)return;let x=0,y=0,ox=0,oy=0;document.addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;dot.style.left=`${x}px`;dot.style.top=`${y}px`});const animate=()=>{ox+=(x-ox)*.15;oy+=(y-oy)*.15;outline.style.left=`${ox}px`;outline.style.top=`${oy}px`;requestAnimationFrame(animate)};animate();document.querySelectorAll("a,button,.work-card,.about-card,.language-option,.mobile-language-option").forEach(el=>{el.addEventListener("mouseenter",()=>document.body.classList.add("cursor-hover"));el.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-hover"))})}

function initMagneticElements(){if(matchMedia("(hover:none),(pointer:coarse)").matches)return;document.querySelectorAll(".magnetic").forEach(el=>{el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.15}px)`});el.addEventListener("mouseleave",()=>el.style.transform="")})}

function initHeroParallax(){if(matchMedia("(hover:none),(pointer:coarse)").matches)return;const el=document.querySelector("[data-parallax]");if(!el)return;let tx=0,ty=0,cx=0,cy=0;el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect();tx=(e.clientX-r.left)/r.width*10-5;ty=(e.clientY-r.top)/r.height*10-5});el.addEventListener("mouseleave",()=>{tx=ty=0});const animate=()=>{cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;el.style.transform=`rotateY(${cx}deg) rotateX(${-cy}deg)`;requestAnimationFrame(animate)};animate()}

function initWorkCards(){if(matchMedia("(hover:none),(pointer:coarse)").matches)return;document.querySelectorAll(".work-card").forEach(card=>{card.addEventListener("mousemove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*2}deg) rotateY(${x*2}deg)`});card.addEventListener("mouseleave",()=>card.style.transform="")})}

function initBackToTop(){const btn=document.getElementById("backToTop");if(!btn)return;const update=()=>btn.classList.toggle("show",scrollY>500);addEventListener("scroll",update,{passive:true});btn.addEventListener("click",()=>scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));update()}
