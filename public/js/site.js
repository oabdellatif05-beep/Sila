// Site behaviour: demo console, hero rotation, calculator, form, nav, chain pattern, language switch.
// Loads after demo-data.js and i18n-ar.js.
let lang = 'en';
const L = x => Array.isArray(x) ? x[lang === 'ar' ? 1 : 0] : x;
const $ = id => document.getElementById(id);
const PILL = {in:['In place','جاهز'], missing:['Missing','ناقص'], pending:['Pending','قيد الانتظار'], super:['Superseded','ملغى']};
const FN = {verify:['Verify','تحقّق'], watch:['Watch','راقب'], ask:['Ask','اسأل'], build:['Build','ابنِ']};
const FNAR = {verify:'تحقّق', watch:'راقب', ask:'اسأل', build:'ابنِ'};

let current = 'pour', timer = null;
const esc = s => String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const find = id => DEMO.find(d => d.id === id);

function renderList(){
  let h = '<select class="qsel" id="qsel" aria-label="Question">';
  DEMO.forEach(d => h += `<option value="${d.id}"${d.id===current?' selected':''}>${esc(L(FN[d.fn]))}: ${esc(L(d.q))}</option>`);
  h += '</select>';
  ['verify','watch','ask','build'].forEach(fn => {
    h += `<h4><span>${L(FN[fn])}</span><span>${FNAR[fn]}</span></h4>`;
    DEMO.filter(d => d.fn === fn).forEach(d => h += `<button type="button" class="qbtn${d.id===current?' on':''}" data-id="${d.id}"><span>${esc(L(d.q))}</span><small>${esc(L(d.role))} · ${esc(L(d.proj))}</small></button>`);
  });
  $('qlist').innerHTML = h;
}
function answerHTML(d){
  let h = `<p class="ans">${esc(L(d.a || ''))}</p>`;
  if (d.rows) h += '<div class="rows">' + d.rows.map(r => `<div class="row"><span><span class="pill p-${r[0]}">${esc(L(r[3] || PILL[r[0]]))}</span></span><span>${esc(L(r[1]))}</span><span class="src" dir="ltr" style="text-align:start">${esc(r[2])}</span></div>`).join('') + '</div>';
  if (d.table) {
    h += '<div class="tbl"><table><tr>' + d.table.cols.map(c => `<th>${esc(L(c))}</th>`).join('') + '</tr>' +
      d.table.rows.map(r => '<tr>' + r.map(c => `<td>${Array.isArray(c) ? esc(L(c)) : '<span dir="ltr">' + esc(c) + '</span>'}</td>`).join('') + '</tr>').join('') +
      (d.table.more ? `<tr><td colspan="${d.table.cols.length}" style="color:var(--body)">… ${esc(L(d.table.more))}</td></tr>` : '') + '</table></div>';
    h += `<span class="file"><b>XLSX</b>${esc(L(d.file))}</span>`;
  }
  if (d.flags) h = d.flags.map(f => `<div class="flag"><h4 style="color:var(--${f[0]==='in'?'in':f[0]==='super'?'super':f[0]})">${esc(L(f[1]))}</h4><p>${esc(L(f[2]))}</p><span class="src" dir="ltr" style="text-align:start">${esc(f[3])}</span></div>`).join('');
  if (d.trace) h += `<button type="button" class="tracebtn" id="tracebtn" aria-expanded="false">${L(['Show the trace','اعرض مسار الجواب'])}</button><div class="trace" id="trace" hidden><div class="vchain">` +
      d.trace.map(t => `<div class="step"><span class="node"></span><div><h3>${esc(L(t[0]))}</h3><p>${esc(L(t[1]))}</p></div></div>`).join('') + '</div></div>';
  return h;
}
function show(id, instant){
  current = id; const d = find(id); clearTimeout(timer);
  document.querySelectorAll('.qbtn').forEach(b => b.classList.toggle('on', b.dataset.id === id));
  const s = $('qsel'); if (s) s.value = id;
  const top = `<p class="role">${esc(L(FN[d.fn]))} · ${esc(L(d.role))} · ${esc(L(d.proj))}</p><p class="bubble">${esc(L(d.q))}</p>`;
  const still = instant || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) { $('panel').innerHTML = top + answerHTML(d); return; }
  $('panel').innerHTML = top + '<div class="typing" aria-hidden="true"><i></i><i></i><i></i></div>';
  timer = setTimeout(() => { $('panel').innerHTML = top + answerHTML(d); }, 650);
}
$('qlist').addEventListener('click', e => { const b = e.target.closest('.qbtn'); if (b) show(b.dataset.id); });
$('qlist').addEventListener('change', e => { if (e.target.id === 'qsel') show(e.target.value); });
$('panel').addEventListener('click', e => { if (e.target.id === 'tracebtn') { const t = $('trace'); t.hidden = !t.hidden; e.target.setAttribute('aria-expanded', String(!t.hidden)); e.target.textContent = t.hidden ? L(['Show the trace','اعرض مسار الجواب']) : L(['Hide the trace','أخفِ مسار الجواب']); } });

function renderRoles(){
  $('roles').innerHTML = ROLES.map(r => `<div class="card"><h3>${esc(L(r[0]))}</h3><p class="ask">${esc(L(r[1]))}</p><button type="button" class="run" data-id="${r[2]}">${L(['Run this question','شغّل هذا السؤال'])} →</button></div>`).join('') +
    `<p class="note" style="grid-column:1/-1;font-size:16px">${esc(L(ALSO[0]))}</p>`;
}
$('roles').addEventListener('click', e => { const b = e.target.closest('.run'); if (!b) return; show(b.dataset.id, true); $('try').scrollIntoView(); });

// hero peek
let hi = 0, htimer = null;
function peek(i){
  hi = i; const d = find(HERO[i]);
  $('pk-who').textContent = L(d.role) + ' · ' + L(d.proj); $('pk-q').textContent = L(d.q); $('pk-a').textContent = L(d.a);
  $('pk-s').textContent = L(['Sources: ','المصادر: ']) + d.rows.length + L([' records, each one linked',' سجلات، كل منها مرتبط']);
  $('pk-dots').innerHTML = HERO.map((_, k) => `<button type="button" class="${k===i?'on':''}" data-i="${k}" aria-label="Example ${k+1}"></button>`).join('');
}
$('pk-dots').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { clearInterval(htimer); peek(+b.dataset.i); } });
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) htimer = setInterval(() => peek((hi + 1) % HERO.length), 5000);

// calculator
function calc(){ const n = +$('staff').value; $('staffv').textContent = n; $('hw').textContent = Math.round(n * 5.5).toLocaleString('en'); $('hy').textContent = Math.round(n * 5.5 * 50).toLocaleString('en'); }
$('staff').addEventListener('input', calc);

// form
const mailOK = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
$('form').addEventListener('submit', e => {
  e.preventDefault();
  const v = {name:$('f-name').value.trim(), co:$('f-co').value.trim(), mail:$('f-mail').value.trim(), q:$('f-q').value.trim()};
  const bad = {name:!v.name, co:!v.co, mail:!mailOK(v.mail), q:!v.q};
  Object.keys(bad).forEach(k => $('fd-' + k).classList.toggle('bad', bad[k]));
  const first = Object.keys(bad).find(k => bad[k]); if (first) { $('f-' + first).focus(); return; }
  const sys = [...document.querySelectorAll('#f-sys input:checked')].map(i => i.value).join(', ') || '-';
  $('summary').textContent = `Sila demo request\nName: ${v.name}\nCompany: ${v.co}\nEmail: ${v.mail}\nRole: ${$('f-role').value}\nSystems: ${sys}\nQuestion: ${v.q}`;
  $('form').style.display = 'none'; $('done').style.display = 'flex'; $('done').focus();
});
$('again').addEventListener('click', () => { $('done').style.display = 'none'; $('form').style.display = 'flex'; });
$('copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('summary').textContent); $('copy').textContent = L(['Copied','تم النسخ']); } catch (err) { $('copy').textContent = L(['Select the text to copy','حدّد النص لنسخه']); } });

// nav
$('menu').addEventListener('click', () => { const o = $('links').classList.toggle('open'); $('menu').setAttribute('aria-expanded', String(o)); });
$('links').addEventListener('click', () => $('links').classList.remove('open'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) document.querySelectorAll('.links a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id)); }), {rootMargin:'-40% 0px -55% 0px'});
  ['fit','try','who','trust','pilot'].forEach(id => io.observe($(id)));
}

// pattern
function drawPattern(){
  const c = $('pattern'), r = c.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  c.width = r.width * dpr; c.height = r.height * dpr;
  const g = c.getContext('2d'); g.scale(dpr, dpr);
  const gap = 56, ns = 34, pitch = 100; g.lineWidth = 3; g.strokeStyle = '#335C5A'; g.fillStyle = '#0E2B2B';
  for (let k = 0; k < 4; k++) { const x = r.width - 24 - (3 - k) * gap;
    g.beginPath(); g.moveTo(x, 0); g.lineTo(x, r.height); g.stroke();
    for (let y = (k % 2 ? 0 : pitch / 2) - pitch; y < r.height + pitch; y += pitch) { g.beginPath(); g.roundRect(x - ns / 2, y - ns / 2, ns, ns, 8); g.fill(); g.stroke(); } }
}
window.addEventListener('resize', drawPattern);

// language
const EN = {};
document.querySelectorAll('[data-k]').forEach(el => { if (!(el.dataset.k in EN)) EN[el.dataset.k] = el.innerHTML; });
function setLang(l){
  lang = l; const dict = l === 'ar' ? AR : EN;
  document.querySelectorAll('[data-k]').forEach(el => { const v = dict[el.dataset.k]; if (v) el.innerHTML = v; });
  document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  $('langlabel').textContent = l === 'ar' ? 'English' : 'عربي';
  $('langlabel').style.fontFamily = l === 'ar' ? 'var(--latin)' : 'var(--arabic)';
  try { localStorage.setItem('sila-lang', l); } catch (e) {}
  renderList(); show(current, true); renderRoles(); peek(hi); drawPattern();
}
$('lang').addEventListener('click', () => setLang(lang === 'ar' ? 'en' : 'ar'));
let saved = 'en'; try { saved = localStorage.getItem('sila-lang') || 'en'; } catch (e) {}
calc(); setLang(saved);
