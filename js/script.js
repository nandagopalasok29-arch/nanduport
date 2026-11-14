(function(){
  var root=document.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,$=function(i){return document.getElementById(i)};
  // loader
  var ld=$('loader'),lc=$('lc');
  function done(){if(!root.classList.contains('ld'))return;ld.classList.add('done');setTimeout(function(){root.classList.remove('ld')},520)}
  if(root.classList.contains('ld')){var t0=null;(function f(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1300);lc.textContent=String(Math.round(k*100)).padStart(3,'0');if(k<1)requestAnimationFrame(f);else setTimeout(done,150)})(performance.now());setTimeout(done,3200)}
  // theme
  var tb=$('theme');
  function cur(){return root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark')}
  function lab(){tb.setAttribute('aria-label',cur()==='light'?'Switch to dark theme':'Switch to light theme')}
  tb.addEventListener('click',function(){var n=cur()==='light'?'dark':'light';root.setAttribute('data-theme',n);try{localStorage.setItem('nandu-theme',n)}catch(e){}lab()});lab();
  // menu
  var hd=$('top'),mb=hd.querySelector('.menu');
  mb.addEventListener('click',function(){var o=hd.classList.toggle('open');mb.setAttribute('aria-expanded',String(o))});
  hd.querySelectorAll('.links a').forEach(function(a){a.addEventListener('click',function(){hd.classList.remove('open');mb.setAttribute('aria-expanded','false')})});
  addEventListener('keydown',function(e){if(e.key==='Escape'){hd.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
  // scroll: progress, to-top, rolling ball
  var pr=$('prog'),tt=$('totop'),sb=$('sball');
  function sc(){var h=root.scrollHeight-innerHeight,p=h>0?Math.min(1,scrollY/h):0;pr.style.transform='scaleX('+p+')';tt.classList.toggle('show',scrollY>700);if(!rm)sb.style.transform='translateY('+(p*(innerHeight-120)-innerHeight/2+40)+'px) rotate('+(scrollY/4)+'deg)'}
  addEventListener('scroll',sc,{passive:true});sc();
  tt.addEventListener('click',function(){scrollTo({top:0,behavior:rm?'auto':'smooth'})});
  // reveal, counters, spy
  function count(el){var to=+el.dataset.to,t0=null;function f(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1400);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)}if(!rm){el.textContent='0';requestAnimationFrame(f)}}
  if('IntersectionObserver' in window&&!rm){
    root.classList.add('js');
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-to]').forEach(count);if(e.target.dataset.to)count(e.target);io.unobserve(e.target)}})},{threshold:.12});
    document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
  }
  if('IntersectionObserver' in window){
    var map={};document.querySelectorAll('.links a[href^="#"]').forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
    var alias={about:'about',beyond:'about',work:'work',playbook:'playbook',log:'playbook',resume:'resume',contact:'contact',top:'top'};
    var spy=new IntersectionObserver(function(es){es.forEach(function(e){var k=alias[e.target.id];if(e.isIntersecting&&map[k]){Object.keys(map).forEach(function(z){map[z].classList.remove('active')});map[k].classList.add('active')}})},{rootMargin:'-45% 0px -50% 0px'});
    ['about','work','beyond','playbook','log','resume','contact'].forEach(function(id){var el=$(id);if(el)spy.observe(el)});
  }
  // cursor ball
  var cb=$('cball');
  if(!rm&&matchMedia('(hover:hover) and (pointer:fine)').matches){var tx=0,ty=0,x=0,y=0,on=false;
    document.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!on){on=true;cb.classList.add('on');x=tx;y=ty;loop()}});
    function loop(){x+=(tx-x)*.18;y+=(ty-y)*.18;cb.style.transform='translate('+(x+14)+'px,'+(y+14)+'px) rotate('+(x*1.2)+'deg)';requestAnimationFrame(loop)}}
  // pause effects (also pauses SVG animations)
  var cm=$('calm');
  function setCalm(on){root.classList.toggle('calm',on);cm.setAttribute('aria-pressed',String(on));cm.textContent=on?'▶ Resume effects':'⏸ Pause effects';document.querySelectorAll('svg').forEach(function(s){try{on?s.pauseAnimations():s.unpauseAnimations()}catch(e){}})}
  cm.addEventListener('click',function(){setCalm(!root.classList.contains('calm'))});
  if(rm)setCalm(true);
  // resume viewer
  var dlg=$('rv');
  if(dlg&&typeof dlg.showModal==='function'){
    document.querySelectorAll('[data-open-resume]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();dlg.showModal();root.classList.add('rvopen');dlg.querySelector('.rvbody').scrollTop=0})});
    $('rvx').addEventListener('click',function(){dlg.close()});
    dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
    dlg.addEventListener('close',function(){root.classList.remove('rvopen')});
  }
})();
