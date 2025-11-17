// Initialize theme attribute early based on stored preference or system setting
(function(){
  try {
    var isLogin = (location && location.pathname && location.pathname.endsWith('/login.html'));
    if (isLogin){
      // Force light theme on login page to match original look
      document.documentElement.setAttribute('data-theme', 'light');
      return;
    }
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = (saved === 'dark' || saved === 'light') ? saved : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    // no-op
  }
})();

async function api(path, opts={}){
  opts.headers = Object.assign({ 'Content-Type': 'application/json', 'Cache-Control':'no-store' }, opts.headers||{});
  if (opts.body && typeof opts.body !== 'string') opts.body = JSON.stringify(opts.body);
  // Ensure cookies are always sent and no browser cache is used
  if (!('credentials' in opts)) opts.credentials = 'include';
  if (!('cache' in opts)) opts.cache = 'no-store';
  const r = await fetch(path, opts);
  if (r.status === 401) { location.href = '/login.html'; return Promise.reject('Unauthorized'); }
  const data = await r.json().catch(()=>({}));
  if (!r.ok) throw data;
  return data;
}

// Theme helpers
function getPreferredTheme(){
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
}

function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch {}
  const btn = document.getElementById('themeToggle');
  if (btn){
    btn.innerHTML = renderThemeIcon(theme);
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-label', label);
    btn.title = label;
  }
}

// Minimalist SVG icons for theme toggle
function renderThemeIcon(theme){
  // Show the target theme icon: if currently dark, show sun (to switch to light); else show moon
  if (theme === 'dark'){
    // Sun icon (Feather-like)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>`;
  }
  // Moon icon (Feather-like)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`;
}

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function injectThemeStyles(){
  if (document.getElementById('themeStyles')) return;
  const css = `
  /* Global dark theme overrides */
  [data-theme="dark"] body { background:#0f1115 !important; color:#e2e8f0 !important; }
  [data-theme="dark"] .wrap { color: inherit; }
  [data-theme="dark"] .card { background:#111827 !important; color:#e2e8f0 !important; box-shadow:0 2px 8px rgba(0,0,0,.5) !important; }
  [data-theme="dark"] table { background:transparent !important; }
  [data-theme="dark"] th { background:#1f2937 !important; color:#e5e7eb !important; }
  [data-theme="dark"] td { border-bottom:1px solid #374151 !important; color:#e5e7eb !important; }
  [data-theme="dark"] input, [data-theme="dark"] select, [data-theme="dark"] textarea { background:#111827 !important; color:#e5e7eb !important; border:1px solid #374151 !important; }
  [data-theme="dark"] input::placeholder, [data-theme="dark"] textarea::placeholder { color:#e5e7eb !important; opacity:1 !important; }
  [data-theme="dark"] button { background:#1f2937; color:#e5e7eb; border:1px solid #374151; }
  [data-theme="dark"] .suggest { background:#111827 !important; border-color:#374151 !important; }
  [data-theme="dark"] .chip { background:#1f2937 !important; border-color:#374151 !important; color:#e5e7eb !important; }
  [data-theme="dark"] #modal > div, [data-theme="dark"] #editModal > div, [data-theme="dark"] .modal-card { background:#111827 !important; color:#e5e7eb !important; }
  [data-theme="dark"] a { color:#93c5fd; }
  [data-theme="dark"] .muted { color:#fff !important; }

  /* Tables borders */
  [data-theme="dark"] table, [data-theme="dark"] thead, [data-theme="dark"] tbody, [data-theme="dark"] tr, [data-theme="dark"] th, [data-theme="dark"] td { border-color:#374151 !important; }

  /* Toolbar */
  [data-theme="dark"] .toolbar { color:#e5e7eb; }

  /* Headers in records table specific widths keep readable */
  [data-theme="dark"] #table table th { background:#1f2937 !important; }

  /* Iconic buttons */
  button.btn-ico { display:inline-flex; align-items:center; gap:6px; }
  button.btn-ico svg { width:16px; height:16px; display:inline-block; }

  /* Zebra table shading (light) */
  table tbody tr:nth-child(odd) td { background:#f1f5f9 !important; }
  table tbody tr:nth-child(even) td { background:#ffffff !important; }
  table tbody tr:hover td { background:#eef7ff !important; }

  /* Zebra table shading (dark) */
  [data-theme="dark"] table tbody tr:nth-child(odd) td { background:#0f172a !important; }
  [data-theme="dark"] table tbody tr:nth-child(even) td { background:#0b1220 !important; }
  [data-theme="dark"] table tbody tr:hover td { background:#1e293b !important; }
  `;
  const style = document.createElement('style');
  style.id = 'themeStyles';
  style.textContent = css;
  document.head.appendChild(style);
}

// Inject global responsive styles (mobile-first enhancements)
function injectResponsiveStyles(){
  if (document.getElementById('responsiveStyles')) return;
  const css = `
  /* Generic scroll wrapper for wide tables */
  .table-scroll { width:100%; overflow-x:auto; -webkit-overflow-scrolling:touch; }

  /* Topbar base */
  .topbar { width:100%; box-sizing:border-box; position:sticky; top:0; z-index:1000; }
  .topbar a { white-space: nowrap; }
  .topbar .brand { font-weight:700; }
  .topbar .links { display:flex; gap:12px; align-items:center; }
  .topbar .right { margin-left:auto; display:flex; align-items:center; gap:8px; }
  .topbar .menu-btn { display:none; }
  .topbar .dropdown { position:relative; }
  .topbar .dropdown .menu { display:none; position:absolute; top:100%; left:0; background:#fff; color:#111827; border:1px solid #e5e7eb; border-radius:6px; box-shadow:0 10px 24px rgba(0,0,0,.25); min-width:140px; z-index:1200; font-size:13px; padding:4px 6px; white-space:nowrap; max-width:calc(100vw - 24px); }
  .topbar .right .dropdown .menu { left:auto; right:0; }
  .topbar .dropdown.open .menu { display:block; }
  .topbar .dropdown .menu a { display:flex; align-items:center; gap:6px; padding:6px 8px; text-decoration:none; color:inherit; border-bottom:1px solid #e5e7eb; }
  .topbar .dropdown .menu a .ico svg { width:14px; height:14px; }
  .topbar .dropdown .menu a:hover { background:#eef2ff; }
  .topbar .dropdown .menu a:last-child { border-bottom:none; }
  [data-theme="dark"] .topbar .dropdown .menu { background:#0f172a; color:#e5e7eb; border-color:#1f2937; box-shadow:0 10px 24px rgba(0,0,0,.6); }
  [data-theme="dark"] .topbar .dropdown .menu a { border-bottom-color:#1f2937; }
  [data-theme="dark"] .topbar .dropdown .menu a:hover { background:#1e293b; }

  /* Mobile drawer: hidden by default on all viewports */
  .mobile-drawer { position:fixed; inset:0; display:none; background:rgba(0,0,0,.45); z-index:1100; }
  .mobile-menu-open .mobile-drawer { display:flex; }
  .mobile-menu-open { overflow:hidden; }

  @media (max-width: 768px){
    .wrap { margin:12px auto; padding:0 12px; }

    /* Compact topbar for mobile: use drawer */
    .topbar { padding:8px 12px !important; display:flex !important; align-items:center !important; gap:8px; }
    .topbar .menu-btn { display:inline-flex; align-items:center; justify-content:center; padding:6px 8px; border-radius:6px; background:transparent; color:#fff; border:1px solid rgba(255,255,255,0.4); cursor:pointer; }
    .topbar .links { display:none; }
    /* Tampilkan tombol Tema dan Logout di pojok kanan atas pada mobile */
    .topbar .right { display:flex; margin-left:auto; align-items:center; gap:8px; }
    .topbar .right span { display:none; }
    .topbar .right #themeToggle { padding:6px 8px; }
    .topbar .right #logoutBtn { padding:6px 8px; }

    /* Mobile drawer panel */
    .mobile-drawer .panel { width:78%; max-width:300px; height:100%; background:#fff; color:#111827; box-shadow:0 10px 30px rgba(0,0,0,.35); padding:14px; display:flex; flex-direction:column; }
    [data-theme="dark"] .mobile-drawer .panel { background:#0f172a; color:#e5e7eb; box-shadow:0 10px 30px rgba(0,0,0,.6); }
    .mobile-drawer .panel .header { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
    .mobile-drawer .panel .user { font-size:13px; opacity:0.9; }
    .mobile-drawer .panel .close-btn { background:transparent; border:1px solid rgba(0,0,0,.2); border-radius:6px; padding:4px 8px; cursor:pointer; }
    [data-theme="dark"] .mobile-drawer .panel .close-btn { border-color:#334155; color:#e5e7eb; }
    .mobile-drawer nav a { display:block; padding:10px 8px; text-decoration:none; color:inherit; border-bottom:1px solid #e5e7eb; }
    [data-theme="dark"] .mobile-drawer nav a { border-bottom-color:#1f2937; }
    .mobile-drawer .actions { margin-top:auto; display:flex; gap:8px; }
    .mobile-drawer .actions button { padding:6px 10px; }

    /* Forms and toolbars stack nicely on mobile */
    .rte-toolbar { flex-wrap: wrap; }
    .toolbar { flex-direction: column; align-items: stretch; }
    .toolbar .toolbar-row { flex-wrap: wrap; align-items: stretch; }
    .toolbar .filter-group,
    .toolbar .toolbar-row .q-field,
    .toolbar .toolbar-row .tech-field { flex: 1 1 100%; min-width: 0; max-width: 100%; }
    .toolbar .toolbar-row .actions { width: 100%; justify-content: flex-start; flex-wrap: wrap; }
    .toolbar input[type="text"], .toolbar input[type="search"], .toolbar select { padding:6px 8px; font-size:14px; }
    .toolbar button { padding:6px 10px; }
    h2 { font-size:20px; margin:10px 0; }

    /* Ensure data sections scroll horizontally if too many columns */
    #table, #pmTable { overflow-x: auto; }
    .table-scroll table { min-width: 640px; }

    /* Global compact table sizing across pages (menyeragamkan seperti forklift) */
    #table table th, #table table td { padding:6px; font-size:13px; line-height:1.3; }
    .table-scroll table th, .table-scroll table td { padding:6px; font-size:13px; line-height:1.3; }

    /* Jobs form: collapse to single column */
    .row { grid-template-columns: 1fr !important; }
    .input-suggest-wrap { width: 100%; }
    .suggest { max-height: 50vh; -webkit-overflow-scrolling: touch; }
  }

  /* Extra-narrow screens */
  @media (max-width: 400px){
    .toolbar input[type="text"], .toolbar input[type="search"], .toolbar select { padding:5px 8px; font-size:13px; }
    .toolbar button { padding:5px 8px; font-size:13px; }
    h2 { font-size:18px; margin:8px 0; }
  }

  /* Metrics cards horizontal scroll on narrow widths */
  @media (max-width: 480px){
    .grid { grid-auto-flow: column; grid-auto-columns: 75%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    /* Konsistensi ukuran tabel pada layar sangat kecil */
    #table table th, #table table td { padding:6px; font-size:13px; line-height:1.25; }
    .table-scroll table th, .table-scroll table td { padding:6px; font-size:13px; line-height:1.25; }
  }

  /* Super-compact untuk layar sangat kecil (contoh iPhone SE, <=375px) */
  @media (max-width: 375px){
    /* Perkecil padding dan font agar tabel lebih muat */
    #table table th, #table table td { padding:4px; font-size:12px; line-height:1.2; }
    .table-scroll table th, .table-scroll table td { padding:4px; font-size:12px; line-height:1.2; }
    /* Subteks forklift lebih kecil agar tetap terbaca */
    #table .subtext { font-size:11px; opacity:0.9; }
    /* Izinkan tabel sedikit lebih sempit pada lebar ekstrem */
    .table-scroll table { min-width: 560px; }
  }
  `;
  const style = document.createElement('style');
  style.id = 'responsiveStyles';
  style.textContent = css;
  document.head.appendChild(style);
}

// Inject global uniform scaling styles
function injectScalingStyles(){
  if (document.getElementById('scalingStyles')) return;
  const css = `
  :root { --ui-scale: 1; }
  .scale-root { transform: scale(var(--ui-scale)); transform-origin: top left; }
  .scale-root { width: calc(100% / var(--ui-scale)); }
  `;
  const style = document.createElement('style');
  style.id = 'scalingStyles';
  style.textContent = css;
  document.head.appendChild(style);
}

function computeUniformScale(){
  try {
    const baseW = 1366; // baseline width
    const baseH = 768;  // baseline height
    const vw = Math.max(320, Math.min(window.innerWidth || baseW, screen && screen.width ? screen.width : baseW));
    const vh = Math.max(480, Math.min(window.innerHeight || baseH, screen && screen.height ? screen.height : baseH));
    let s = Math.min(vw / baseW, vh / baseH);
    // Keep UI readable and avoid unintended upscaling on large screens
    const minS = 1.0;
    const maxS = 1.0;
    if (!isFinite(s) || s <= 0) s = 1;
    s = Math.max(minS, Math.min(maxS, s));
    return s;
  } catch { return 1; }
}

function applyUniformScale(scale){
  try { document.documentElement.style.setProperty('--ui-scale', String(scale)); } catch {}
}

function initializeUniformScaling(){
  try {
    if (window._uniformScaleInit) return;
    window._uniformScaleInit = true;

    injectScalingStyles();

    const markScaleTargets = ()=>{
      try{
        document.querySelectorAll('.wrap, .topbar, #modal > div, #editModal > div').forEach(el=>{
          if (el && el.classList && !el.classList.contains('scale-root')) el.classList.add('scale-root');
        });
      }catch{}
    };

    markScaleTargets();

    const obs = new MutationObserver((mutations)=>{
      for (const m of mutations){
        if (m.addedNodes && m.addedNodes.length){
          m.addedNodes.forEach(n=>{
            if (n && n.nodeType===1){
              try{
                if (n.matches && n.matches('.wrap, .topbar, #modal > div, #editModal > div')) n.classList.add('scale-root');
                if (n.querySelectorAll){
                  n.querySelectorAll('.wrap, .topbar, #modal > div, #editModal > div').forEach(el=>{
                    if (el && el.classList) el.classList.add('scale-root');
                  });
                }
              }catch{}
            }
          });
        }
      }
    });
    obs.observe(document.documentElement, { childList:true, subtree:true });
    window._uniformScaleObs = obs;

    const setScale = ()=>{
      let s = computeUniformScale();
      try {
        const saved = localStorage.getItem('uiScale');
        if (saved){ const v = parseFloat(saved); if (!isNaN(v) && v>0) s = v; }
      } catch {}
      applyUniformScale(s);
    };

    setScale();
    window.addEventListener('resize', setScale, { passive:true });
    window.addEventListener('orientationchange', setScale, { passive:true });

    window.setUiScale = function(val){
      try{
        if (val===null || val===undefined){ localStorage.removeItem('uiScale'); setScale(); return; }
        const v = parseFloat(val);
        if (!isNaN(v) && v>0){ localStorage.setItem('uiScale', String(v)); applyUniformScale(v); }
      }catch{}
    };
  } catch {}
}

// Ensure scaling is initialized on all pages
(function(){
  const run = ()=>{ try{ injectThemeStyles(); injectScalingStyles(); initializeUniformScaling(); }catch{} };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once:true });
  else run();
})();

// Minimal SVG icon set
function svgIcon(name){
  switch(name){
    case 'plus':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
    case 'save':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2 2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>';
    case 'x':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    case 'edit':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>';
    case 'trash':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>';
    case 'file-excel':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><rect x="8" y="13" width="8" height="6" rx="1"/><path d="M9.5 14.5l5 3"/><path d="M14.5 14.5l-5 3"/></svg>';
    case 'file-pdf':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 17c4-1 6-3 8-6"/><path d="M8 17c1.5-3 2-5 2-7"/><path d="M8 17c3 .5 5 .5 8 0"/></svg>';
    case 'pdf-export':
      // New PDF export icon: file with outward arrow
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 12h7"/><path d="M15 9l3 3-3 3"/></svg>';
    case 'reset':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>';
    case 'logout':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
    case 'login':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>';
    case 'ul':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="4" cy="7" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="17" r="1"/><line x1="8" y1="7" x2="20" y2="7"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="17" x2="20" y2="17"/></svg>';
    case 'ol':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h2"/><path d="M4 10h2"/><path d="M4 14h2"/><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/></svg>';
    case 'eye':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    default:
      return '';
  }
}

function setButtonIcon(el, icon, keepText=true){
  if (!el || el.dataset.iconized) return;
  const svg = svgIcon(icon);
  if (!svg) return;
  const text = (el.textContent||'').trim();
  el.classList.add('btn-ico');
  if (keepText && text){
    el.innerHTML = svg + '<span>' + text + '</span>';
  } else {
    el.innerHTML = svg;
  }
  el.dataset.iconized = '1';
}

function decorateButtonsOnce(root){
  try{
    const r = root || document;
    // ID-based buttons
    [["#addBtn","plus"], ["#bulkDeleteBtn","trash"], ["#importExcel","file-pdf"], ["#exportExcel","file-excel"], ["#exportPDF","pdf-export"], ["#saveBtn","save"], ["#btnSaveEdit","save"], ["#cancelBtn","x"], ["#btnCancelEdit","x"], ["#apply","reset"], ["#logoutBtn","logout"]].forEach(([sel,icon])=>{
      r.querySelectorAll(sel).forEach(el=> setButtonIcon(el, icon, true));
    });
    // Login submit button only on login page
    if (location.pathname.endsWith('/login.html')){
      r.querySelectorAll('button[type="submit"]').forEach(el=> setButtonIcon(el, 'login', true));
    }
    // Action buttons in tables
    r.querySelectorAll('button[data-edit]').forEach(el=> setButtonIcon(el, 'edit', true));
    r.querySelectorAll('button[data-del]').forEach(el=> setButtonIcon(el, 'trash', true));
    r.querySelectorAll('button[data-detail]').forEach(el=> setButtonIcon(el, 'eye', true));
    r.querySelectorAll('button[data-add], button[data-ed-add]').forEach(el=> setButtonIcon(el, 'plus', true));
    // Chip remove buttons use icon only
    r.querySelectorAll('button.x').forEach(el=> setButtonIcon(el, 'x', false));
    // Jobs rich text toolbar
    r.querySelectorAll('button[data-cmd="insertUnorderedList"]').forEach(el=> setButtonIcon(el, 'ul', true));
    r.querySelectorAll('button[data-cmd="insertOrderedList"]').forEach(el=> setButtonIcon(el, 'ol', true));
  }catch(e){ /* noop */ }
}

// Setup observer for dynamic content
(function(){
  try{
    const run = ()=> { decorateButtonsOnce(document); decorateDateInputsOnce(document); };
    if (!window._btnIconObserver){
      const obs = new MutationObserver((mutations)=>{
        for (const m of mutations){
          if (m.addedNodes && m.addedNodes.length){
            m.addedNodes.forEach(n=>{
              if (n.nodeType===1){ decorateButtonsOnce(n); decorateDateInputsOnce(n); }
            });
          }
        }
      });
      obs.observe(document.documentElement, { childList:true, subtree:true });
      window._btnIconObserver = obs;
    }
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', run, { once:true });
    } else {
      run();
    }
  }catch(e){ /* noop */ }
})();

async function me(){
  try { return await api('/api/me'); } catch { return { user:null }; }
}

function nav(user){
  const label = user ? (user.name ? `${user.name} <${user.email}>` : user.email) : '';
  return `
  <div class="topbar" style="display:flex; gap:12px; align-items:center; padding:10px 16px; background:#0d47a1; color:white;">
    <button id="menuBtn" class="menu-btn" aria-label="Menu" title="Menu">☰</button>
    <a href="/dashboard.html" class="brand" style="color:#fff; text-decoration:none; font-weight:600;">PSforklift</a>
    <div class="links">
      <a href="/forklift.html" style="color:#fff; text-decoration:none;">Forklifts</a>
      <a href="/records.html" style="color:#fff; text-decoration:none;">Service Records</a>
      <div id="resourcesDropdown" class="dropdown"><a href="javascript:void(0)" class="parent" style="color:#fff; text-decoration:none;">Resources</a><div class="menu">${'<a href="/items.html">Items</a>'}<a href="/archive.html">Arsip</a>${user && user.role==='admin' ? '<a href="/users.html">Users</a>' : ''}${user && user.role==='admin' ? '<a href="/backups.html">Backups</a>' : ''}</div></div>
    </div>
    <div class="right">
      <div id="userDropdown" class="dropdown"><a href="javascript:void(0)" class="parent" style="color:#fff; text-decoration:none;">${label} (${user?user.role:''})</a><div class="menu"><a href="javascript:void(0)" id="themeToggleLink">Tema</a><a href="javascript:void(0)" id="logoutLink"><span class="ico">${svgIcon('logout')}</span>Logout</a></div></div>
    </div>
  </div>
  <div id="mobileMenuDrawer" class="mobile-drawer" aria-hidden="true" role="dialog" aria-label="Menu">
    <div class="panel">
      <div class="header">
        <div class="user">${label} (${user?user.role:''})</div>
        <button id="closeMenuBtn" class="close-btn" aria-label="Tutup">✕</button>
      </div>
      <nav>
        <a href="/forklift.html">Forklifts</a>
        <a href="/items.html">Items</a>
        <a href="/records.html">Service Records</a>
        <a href="/archive.html">Arsip</a>
        ${user && user.role==='admin' ? '<a href="/users.html">Users</a>' : ''}
        ${user && user.role==='admin' ? '<a href="/backups.html">Backups</a>' : ''}
      </nav>
      <!-- Actions (Tema & Logout) dihapus dari sidebar; hanya tersedia di pojok kanan atas -->
    </div>
  </div>`;
}

async function ensureAuthedAndRenderNav(){
  const m = await me();
  if (!m.user) { location.href='/login.html'; return null; }
  // ensure theme styles injected and attribute applied
  injectThemeStyles();
  injectResponsiveStyles();
  const currentTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') || currentTheme);
  const header = document.getElementById('header');
  if (header) header.innerHTML = nav(m.user);
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) logoutLink.onclick = async ()=>{ await api('/api/logout', { method:'POST' }); location.href='/login.html'; };
  const themeLink = document.getElementById('themeToggleLink');
  if (themeLink){
    const updateLabel = ()=>{ const theme = document.documentElement.getAttribute('data-theme') || getPreferredTheme(); themeLink.innerHTML = '<span class="ico">'+renderThemeIcon(theme)+'</span>' + (theme==='dark' ? 'Tema: Dark' : 'Tema: Light'); };
    updateLabel();
    themeLink.onclick = (e)=>{ e.preventDefault(); toggleTheme(); updateLabel(); /* keep bubble open */ };
  }
  const ud = document.getElementById('userDropdown');
  if (ud){ const parent = ud.querySelector('.parent'); if (parent){ parent.onclick = (e)=>{ e.preventDefault(); e.stopPropagation(); ud.classList.toggle('open'); }; document.addEventListener('click', (ev)=>{ if (!ud.contains(ev.target)) ud.classList.remove('open'); }); } }
  const resDD = document.getElementById('resourcesDropdown');
  if (resDD){ const p = resDD.querySelector('.parent'); if (p){ p.onclick = (e)=>{ e.preventDefault(); e.stopPropagation(); resDD.classList.toggle('open'); }; document.addEventListener('click', (ev)=>{ if (!resDD.contains(ev.target)) resDD.classList.remove('open'); }); } }
  const tbtn = document.getElementById('themeToggle');
  if (tbtn){
    const theme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    tbtn.innerHTML = renderThemeIcon(theme);
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    tbtn.setAttribute('aria-label', label);
    tbtn.title = label;
    tbtn.onclick = toggleTheme;
  }
  // Mobile drawer controls
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeMenuBtn');
  const drawer = document.getElementById('mobileMenuDrawer');
  if (menuBtn && drawer){ menuBtn.onclick = ()=>{ document.body.classList.add('mobile-menu-open'); drawer.setAttribute('aria-hidden', 'false'); }; }
  if (closeBtn && drawer){ closeBtn.onclick = ()=>{ document.body.classList.remove('mobile-menu-open'); drawer.setAttribute('aria-hidden', 'true'); }; }
  document.addEventListener('keydown', (e)=>{ if (e.key==='Escape'){ document.body.classList.remove('mobile-menu-open'); drawer && drawer.setAttribute('aria-hidden','true'); } });
  if (drawer){ drawer.addEventListener('click', (e)=>{ if (e.target===drawer){ document.body.classList.remove('mobile-menu-open'); drawer.setAttribute('aria-hidden','true'); } }); }
  const logoutMobile = document.getElementById('logoutBtnMobile');
  if (logoutMobile) logoutMobile.onclick = async ()=>{ await api('/api/logout', { method:'POST' }); location.href='/login.html'; };
  const tbtnMobile = document.getElementById('themeToggleMobile');
  if (tbtnMobile){ tbtnMobile.onclick = toggleTheme; }
  return m.user;
}

function simpleTable(containerId, columns, data){
  const container = document.getElementById(containerId);
  if (!container) return;
  const rows = Array.isArray(data) ? data : [];
  // When empty, render compact empty state to avoid large blank areas (esp. on mobile)
  if (rows.length === 0){
    // Override any min-height applied by performance hints
    try { container.style.minHeight = '0'; } catch(_){}
    const headHtml = '<thead><tr>' + columns.map(c=>`<th${c.class?` class="${c.class}"`:''}>${c.label}</th>`).join('') + '</tr></thead>';
    const emptyHtml = `<tbody><tr><td colspan="${columns.length}" style="padding:10px; text-align:center; color:#666; font-size:13px;">Tidak ada data untuk ditampilkan</td></tr></tbody>`;
    container.innerHTML = `<div class="table-scroll"><table border="0" cellspacing="0" cellpadding="6" style="width:100%; border-collapse:collapse;">${headHtml}${emptyHtml}</table></div>`;
    return;
  }
  const thead = '<thead><tr>' + columns.map(c=>`<th${c.class?` class="${c.class}"`:''}>${c.label}</th>`).join('') + '</tr></thead>';
  const tbody = '<tbody>' + rows.map(row=>'<tr>' + columns.map(c=>{
    const val = (typeof c.render === 'function') ? c.render(row) : (row[c.key]??'');
    return `<td${c.class?` class="${c.class}"`:''}>${val}</td>`;
  }).join('') + '</tr>').join('') + '</tbody>';
  container.innerHTML = `<div class="table-scroll"><table border="0" cellspacing="0" cellpadding="6" style="width:100%; border-collapse:collapse;">${thead}${tbody}</table></div>`;
}

function filterData(data, keyword){
  if (!keyword) return data;
  const t0 = (typeof performance!=='undefined' && performance.now) ? performance.now() : Date.now();
  const q = keyword.toLowerCase();
  const result = data.filter(obj => Object.values(obj).some(v => String(v||'').toLowerCase().includes(q)));
  try{
    const t1 = (typeof performance!=='undefined' && performance.now) ? performance.now() : Date.now();
    // Observability: log durasi filter dan jumlah hasil untuk memantau beban saat mengetik
    console.debug('[perf] filterData', `${(t1 - t0).toFixed(1)}ms`, `kw:"${keyword}"`, `n=${data?.length||0} -> ${result.length}`);
  }catch{}
  return result;
}

// Micro utility: debounce to prevent excessive re-renders on fast typing
function debounce(fn, delay=200){
  let t;
  return function(...args){
    clearTimeout(t);
    t = setTimeout(()=> fn.apply(this, args), delay);
  };
}

// Enable clickable calendar icon on date inputs across the app
function decorateDateInputsOnce(root){
  try {
    const r = root || document;
    r.querySelectorAll('.date-input-wrap').forEach(wrap=>{
      if (wrap.dataset.dateDecorated) return;
      const input = wrap.querySelector('input[type="date"]');
      if (!input){ wrap.dataset.dateDecorated = '1'; return; }
      // Ensure wrapper positioning for absolute overlay button
      if (!wrap.style.position) { wrap.style.position = 'relative'; }
      // Create transparent button overlay at the icon area
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'date-ico-btn';
      btn.setAttribute('aria-label', 'Pilih tanggal');
      btn.title = 'Pilih tanggal';
      Object.assign(btn.style, {
        position:'absolute', right:'4px', top:'50%', transform:'translateY(-50%)',
        width:'24px', height:'24px', background:'transparent', border:'none',
        padding:'0', margin:'0', cursor:'pointer'
      });
      btn.addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        try {
          if (typeof input.showPicker === 'function') { input.showPicker(); }
          else { input.focus(); setTimeout(()=>{ try{ input.click(); } catch(_){} }, 0); }
        } catch(_) { try { input.focus(); } catch(__){} }
      });
      wrap.appendChild(btn);
      wrap.dataset.dateDecorated = '1';
    });
  } catch(e){ /* noop */ }
}

// Promise-based confirm dialog to ensure consistent UX across browsers
async function confirmDialog(message){
  return new Promise((resolve)=>{
    try{
      // If a dialog is already open, prevent stacking
      if (document.getElementById('confirmDialog')){ resolve(false); return; }
      const overlay = document.createElement('div');
      overlay.id = 'confirmDialog';
      Object.assign(overlay.style, {
        position:'fixed', inset:'0', background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'9999'
      });
      const box = document.createElement('div');
      Object.assign(box.style, {
        background: (document.documentElement.getAttribute('data-theme')==='dark' ? '#111827' : '#fff'),
        color: (document.documentElement.getAttribute('data-theme')==='dark' ? '#e5e7eb' : '#111'),
        borderRadius:'8px', padding:'16px', minWidth:'280px', boxShadow:'0 10px 24px rgba(0,0,0,0.25)'
      });
      const msg = document.createElement('div');
      msg.textContent = message || 'Konfirmasi?';
      msg.style.marginBottom = '12px';
      const actions = document.createElement('div');
      actions.style.display = 'flex'; actions.style.gap = '8px'; actions.style.justifyContent = 'flex-end';
      const cancelBtn = document.createElement('button'); cancelBtn.textContent = 'Batal';
      const okBtn = document.createElement('button'); okBtn.textContent = 'OK';
      [cancelBtn, okBtn].forEach(b=>{ b.style.padding='6px 12px'; b.style.borderRadius='6px'; });
      cancelBtn.onclick = ()=>{ cleanup(); resolve(false); };
      okBtn.onclick = ()=>{ cleanup(); resolve(true); };
      const cleanup = ()=>{ try{ document.body.removeChild(overlay); }catch{} };
      overlay.addEventListener('click', (e)=>{ if (e.target===overlay){ cleanup(); resolve(false); } });
      box.appendChild(msg); actions.appendChild(cancelBtn); actions.appendChild(okBtn); box.appendChild(actions); overlay.appendChild(box);
      document.body.appendChild(overlay);
      // keyboard support
      const keyHandler = (ev)=>{
        if (ev.key==='Escape'){ ev.preventDefault(); cleanup(); resolve(false); }
        if (ev.key==='Enter'){ ev.preventDefault(); cleanup(); resolve(true); }
      };
      overlay.tabIndex = -1; overlay.focus({ preventScroll:true });
      overlay.addEventListener('keydown', keyHandler, { once:true });
    }catch(_){ resolve(window.confirm(message || 'Konfirmasi?')); }
  });
}

// Lightweight toast popup for success/error notifications
function showToast(message, type='success'){
  try{
    // Remove existing toast to avoid stacking
    const old = document.getElementById('toast');
    if (old) { try { old.remove(); } catch(_){} }
    const el = document.createElement('div');
    el.id = 'toast';
    el.textContent = message || '';
    el.style.position = 'fixed';
    el.style.bottom = '16px';
    el.style.right = '16px';
    el.style.padding = '10px 12px';
    el.style.borderRadius = '6px';
    el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
    el.style.zIndex = '9999';
    const isDark = (document.documentElement.getAttribute('data-theme')==='dark');
    const bgSuccess = isDark ? '#166534' : '#2e7d32';
    const bgError = isDark ? '#7f1d1d' : '#d32f2f';
    el.style.background = (type==='error') ? bgError : bgSuccess;
    el.style.color = '#fff';
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    document.body.appendChild(el);
    requestAnimationFrame(()=>{
      el.style.transition = 'opacity .16s ease, transform .16s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    setTimeout(()=>{
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      setTimeout(()=>{ try{ el.remove(); }catch(_){ } }, 220);
    }, 2200);
  }catch(_){ try{ alert(message || 'Info'); }catch(__){} }
}
// Lightweight perf helpers (optional usage across pages)
if (!window.__perf){ window.__perf = { t: new Map() }; }
function perfStart(name){ try{ window.__perf.t.set(name, (performance.now?performance.now():Date.now())); }catch{} }
function perfEnd(name, extra){ try{ const t0 = window.__perf.t.get(name); if (typeof t0==='number'){ const t1 = (performance.now?performance.now():Date.now()); console.debug('[perf]', name, `${(t1-t0).toFixed(1)}ms`, extra||''); window.__perf.t.delete(name);} }catch{} }

// Performance: apply content-visibility/style hints to table containers (id: 'table' or passed element)
function applyTablePerformanceHints(container){
  try{
    const el = typeof container==='string' ? document.getElementById(container) : (container || document.getElementById('table'));
    if (!el || el.dataset.perfHintsApplied) return;
    el.dataset.perfHintsApplied = '1';
    el.style.containIntrinsicSize = el.style.containIntrinsicSize || '1000px';
    // Ensure scroll wrapper exists; if not, we still apply hints on container
    if (!el.closest('.table-scroll')){ if (!el.style.minHeight) el.style.minHeight = '120px'; }
    // Apply CSS class via inline style for broad support
    el.style.contentVisibility = el.style.contentVisibility || 'auto';
    el.style.willChange = el.style.willChange || 'contents';
  }catch{}
}