/* Retzef Client 5.50.50.50 — release center, quick launch and local diagnostics */
(()=>{
'use strict';
const V='5.50.50.50';
const $=s=>document.querySelector(s);
const originalSetPage=window.setPage;
function quickItems(){
 const ids=[...(typeof v2Pinned!=='undefined'&&Array.isArray(v2Pinned)?v2Pinned:[]),...(typeof favorites!=='undefined'&&Array.isArray(favorites)?favorites:[])];
 const unique=[...new Set(ids)];
 return unique.map(id=>typeof data!=='undefined'&&Array.isArray(data)?data.find(x=>x.id===id):null).filter(Boolean).slice(0,10);
}
function renderQuickBar(){
 let bar=$('#v5QuickBar'); if(!bar){bar=document.createElement('aside');bar.id='v5QuickBar';bar.className='v5-quickbar';bar.hidden=true;document.body.append(bar)}
 const items=quickItems();
 bar.replaceChildren();
 const heading=document.createElement('div');heading.className='v5-quick-heading';heading.textContent='גישה מהירה';bar.append(heading);
 if(!items.length){const empty=document.createElement('span');empty.textContent='נעץ פריטים או הוסף למועדפים כדי שיופיעו כאן.';bar.append(empty)}
 items.forEach(item=>{const b=document.createElement('button');b.type='button';b.className='v5-quick-item';b.dataset.detail=item.id;b.textContent=item.name;bar.append(b)});
 const close=document.createElement('button');close.type='button';close.className='v5-quick-close';close.dataset.v5Action='quick';close.textContent='סגור';bar.append(close);
}
function showQuickBar(){renderQuickBar();const bar=$('#v5QuickBar');bar.hidden=!bar.hidden;}
function localDiagnostics(){
 let bytes=0;try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);bytes+=(k.length+(localStorage.getItem(k)||'').length)*2}}catch{}
 const count=typeof data!=='undefined'&&Array.isArray(data)?data.length:0;
 return {bytes,count,online:navigator.onLine,sw:'serviceWorker'in navigator,secure:location.protocol==='https:'||location.hostname==='localhost'};
}
function renderReleaseCenter(){
 const host=$('#catalog');if(!host)return;
 const d=localDiagnostics();
 host.innerHTML='';
 const wrap=document.createElement('section');wrap.className='v5-release-center';
 wrap.innerHTML=`<div class="v5-release-top"><div><div class="overline">RETZEF CLIENT · RELEASE CENTER</div><h2>גרסה ${V}</h2><p>מרכז העדכונים והכלים של Retzef Client.</p></div><span class="v5-version-orb">5.50</span></div><div class="v5-release-grid"><article class="v5-panel"><span class="v5-panel-icon">✦</span><h3>מה חדש בגרסה</h3><ul><li>מרכז עדכונים ייעודי עם מידע על הגרסה.</li><li>סרגל גישה מהירה לפריטים נעוצים ומועדפים.</li><li>בדיקת תקינות מקומית של האפליקציה.</li><li>קיצורי מקלדת חדשים.</li><li>מצב ריכוז שמצמצם הסחות דעת.</li></ul></article><article class="v5-panel"><span class="v5-panel-icon">⌁</span><h3>בדיקת מערכת</h3><div class="v5-health-list"><div><span>חיבור לרשת</span><b id="v5Online"></b></div><div><span>Service Worker</span><b id="v5SW"></b></div><div><span>חיבור מאובטח</span><b id="v5Secure"></b></div><div><span>פריטים בספרייה</span><b id="v5Catalog"></b></div><div><span>אחסון מקומי משוער</span><b id="v5Storage"></b></div></div><p class="v5-note">הבדיקה מתבצעת במכשיר בלבד. היא אינה שולחת את הנתונים שלך לשרת.</p></article><article class="v5-panel"><span class="v5-panel-icon">⌨</span><h3>קיצורי מקלדת</h3><div class="v5-shortcuts"><div><span>פתיחת גישה מהירה</span><kbd>Ctrl + Shift + L</kbd></div><div><span>מרכז עדכונים</span><kbd>Ctrl + Shift + U</kbd></div><div><span>חיפוש</span><kbd>Ctrl + K</kbd></div><div><span>סגירת חלון</span><kbd>Esc</kbd></div></div></article><article class="v5-panel"><span class="v5-panel-icon">◈</span><h3>יעד השדרוג</h3><strong class="v5-goal">1,000</strong><p>יעד מצטבר של תיקונים ופיצ׳רים. השיפורים יתווספו בשלבים, ורק עבודה שהושלמה ונבדקה תסומן כמבוצעת.</p><div class="v5-progress"><span></span></div><small>שלב ראשון · מרכז עדכונים וכלי גישה מהירה</small></article></div><div class="v5-release-actions"><button class="btn-primary" data-v5-action="quick">פתח גישה מהירה</button><button class="btn-secondary" data-v5-action="focus">הפעל / כבה מצב ריכוז</button><button class="btn-secondary" data-v5-action="home">חזרה לספרייה</button></div>`;
 host.append(wrap);
 $('#v5Online').textContent=d.online?'מחובר':'לא מחובר';$('#v5SW').textContent=d.sw?'נתמך':'לא נתמך';$('#v5Secure').textContent=d.secure?'כן':'לא';$('#v5Catalog').textContent=String(d.count);$('#v5Storage').textContent=(d.bytes/1024).toFixed(1)+' KB';
}
function openReleaseCenter(){
 if(typeof originalSetPage==='function')originalSetPage('home');
 if(typeof page!=='undefined')page='updates';
 ['#hero','#featuredSection','#categoryTabs','#compareCallout'].forEach(sel=>{const el=$(sel);if(el)el.hidden=true});
 const lib=$('#librarySection');if(lib)lib.hidden=false;
 const title=$('#pageName');if(title)title.textContent='מרכז עדכונים';
 const heading=$('#catalogTitle');if(heading)heading.textContent='מרכז עדכונים';
 document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page==='updates'));
 renderReleaseCenter();window.scrollTo({top:0,behavior:'smooth'});
}
if(typeof originalSetPage==='function')window.setPage=function(p){if(p==='updates'){openReleaseCenter();return}originalSetPage(p)};
const nav=$('.nav');if(nav&&!nav.querySelector('[data-page="updates"]')){const b=document.createElement('button');b.type='button';b.className='nav-link';b.dataset.page='updates';b.innerHTML='<span class="nav-icon">✦</span>מרכז עדכונים';nav.append(b)}
const top=$('.top-right');if(top&&!$('#v5QuickBtn')){const b=document.createElement('button');b.type='button';b.id='v5QuickBtn';b.className='top-icon';b.title='גישה מהירה · Ctrl+Shift+L';b.setAttribute('aria-label','גישה מהירה');b.textContent='⚡';b.dataset.v5Action='quick';top.append(b)}
document.addEventListener('click',e=>{const action=e.target.closest('[data-v5-action]');if(!action)return;const a=action.dataset.v5Action;if(a==='quick')showQuickBar();if(a==='updates')openReleaseCenter();if(a==='home'&&typeof originalSetPage==='function')originalSetPage('home');if(a==='focus'){document.body.classList.toggle('v5-focus-mode');try{localStorage.setItem('retzef-client-focus',document.body.classList.contains('v5-focus-mode')?'1':'0')}catch{};if(typeof window.toast==='function')window.toast(document.body.classList.contains('v5-focus-mode')?'מצב ריכוז הופעל':'מצב ריכוז כובה')}},true);
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==='l'){e.preventDefault();showQuickBar()}if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==='u'){e.preventDefault();openReleaseCenter()}if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&e.key.toLowerCase()==='k'){e.preventDefault();const search=$('#search');if(search){search.focus();search.select()}}if(e.key==='Escape'){const bar=$('#v5QuickBar');if(bar)bar.hidden=true}},true);
try{if(localStorage.getItem('retzef-client-focus')==='1')document.body.classList.add('v5-focus-mode')}catch{}
})();
