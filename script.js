"use strict";
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const videos = document.querySelectorAll('.lazy-video');
const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(({target: video, isIntersecting}) => {
    if (!isIntersecting) { video.pause(); return; }
    if (reduceMotion) return;
    if (!video.querySelector('source')) {
      const source = document.createElement('source');
      source.src = video.dataset.src; source.type = 'video/mp4';
      video.appendChild(source); video.load();
    }
    video.play().catch(() => {});
  });
}, {rootMargin:'150px 0px',threshold:0.01}) : null;
videos.forEach(v => {if(observer) observer.observe(v); else if(!reduceMotion){const src=document.createElement('source');src.src=v.dataset.src;src.type='video/mp4';v.append(src);v.load();v.play().catch(()=>{});}});
if (reduceMotion) document.querySelectorAll('video').forEach(v => {v.pause();v.removeAttribute('autoplay');});
const heroVideo = document.querySelector('.autoplay-video');
if (heroVideo && !reduceMotion && observer) {
  const heroObserver = new IntersectionObserver(entries => entries.forEach(({isIntersecting}) => {
    if(isIntersecting) heroVideo.play().catch(()=>{}); else heroVideo.pause();
  }),{threshold:0.05}); heroObserver.observe(heroVideo);
}
const dialog=document.getElementById('demoDialog');
const title=document.getElementById('dialogTitle');
const description=document.getElementById('dialogText');
const summary=document.getElementById('dialogSummary');
const finish=document.getElementById('finishDemo');
const close=document.getElementById('closeDialog');
let lastTrigger=null; let finished=false;
function openDemo(plan, trigger){
  lastTrigger=trigger; finished=false; finish.textContent='デモを完了する →';
  const isRegister=plan==='会員登録';
  title.textContent=isRegister?'会員登録デモ':`${plan}デモ`;
  description.textContent=isRegister?'LINE・メール登録の体験画面です。':'選択したプランの内容をご確認ください。';
  summary.textContent=isRegister?'登録は行われません。実際のLINE・メールサービスには接続していません。':plan==='定期購入'?'初回 ¥1,980（税込・送料無料）／2回目以降 ¥3,480（税込）＋送料 ¥550／回数縛りなし／次回発送5日前まで解約可能':'通常購入 ¥3,980（税込）／送料 ¥550（仮設定）';
  if(typeof dialog.showModal==='function') dialog.showModal(); else dialog.setAttribute('open','');
}
document.querySelectorAll('.demo-btn').forEach(btn=>btn.addEventListener('click',()=>openDemo(btn.dataset.plan,btn)));
const register=document.getElementById('registerBtn');
register.addEventListener('click',()=>openDemo('会員登録',register));
function closeDemo(){if(typeof dialog.close==='function')dialog.close();else{dialog.removeAttribute('open');lastTrigger?.focus();}}
close.addEventListener('click',closeDemo);
finish.addEventListener('click',()=>{
  if(finished){closeDemo();return;}
  finished=true;title.textContent='デモ体験が完了しました';
  description.textContent='ご覧いただきありがとうございます。実際の注文・登録は発生していません。';
  summary.textContent='LUMEA SHIFT / CREATIVE PORTFOLIO';finish.textContent='閉じる';
});
dialog.addEventListener('close',()=>{finished=false;finish.textContent='デモを完了する →';lastTrigger?.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDemo();});
