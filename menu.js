/* Drill-down site menu for the Round 3 pages (desktop and mobile).
   The header box expands to show the top-level sections; choosing one replaces them with that
   section's pages, plus a link to the section's landing page and a way back. Two levels only.
   IA from the UoW IA board in FigJam (top-level sections and their second-level pages). */
(function () {
  var IA = [
    ['Study', ['What do you want to study?', 'Browse by subject', 'Why choose Winchester', 'Undergraduate', 'Postgraduate', 'International students', 'Degree Apprenticeships', 'Short courses and online learning', 'How to apply', 'Fees and funding', 'How you’ll learn', 'Order a prospectus']],
    ['Life at Winchester', ['Winchester and the local area', 'Our campus', 'Accommodation', 'Preparing for life at university', 'Parents and supporters', 'Student support', 'Careers and employability']],
    ['Work with us', ['Partner with us', 'Schools and Colleges', 'Community and widening participation', 'Book our facilities', 'Jobs at Winchester']],
    ['Research', ['Our research areas', 'Knowledge exchange at Winchester', 'Research opportunities', 'Research facilities and equipment hire', 'Find a researcher']],
    ['News and events', ['News', 'Podcasts', 'Blogs and advice', 'Events']],
    ['About us', ['Our rankings and awards', 'Our values and history', 'Our faculties', 'Alumni', 'Leadership and governance', 'Policies and statutory information', 'Jobs at Winchester', 'Term dates', 'Contact us', 'How to find us']]
  ];
  var QUICK = ['Find a course for you', 'Apply now', 'Open days and Clearing', 'Current students', 'Staff'];

  var CSS = "\
html.wnm-open [data-name='Nav bar'], html.wnm-open [data-name='Story nav bar'] { border-radius:5px 5px 0 0 !important; }\
.wnm-host { position:fixed; left:0; top:0; width:1280px; height:832px; transform-origin:0 0; z-index:8999; pointer-events:none; border-radius:15px; overflow:hidden; }\
.wnm { position:absolute; inset:0; z-index:250; pointer-events:none; font-family:Figtree, sans-serif; }\
.wnm.open .wnm-back, .wnm.open .wnm-box { pointer-events:auto; }\
.wnm-back { position:absolute; left:0; right:0; bottom:0; top:0; background:rgba(20,10,36,.55); opacity:0; transition:opacity .35s ease; }\
.wnm.show .wnm-back { opacity:1; }\
.wnm.mobile { z-index:19; }\
.wnm.mobile .wnm-back { background:#291647; }\
.wnm.mobile .wnm-box { box-shadow:none; }\
.wnm-box { position:absolute; overflow:hidden; background:#291647; color:#FFFFFF; border-radius:0 0 5px 5px; height:0; transition:height .45s cubic-bezier(.22,1,.36,1); box-shadow:0 24px 48px rgba(20,10,36,.35); }\
.wnm-box.full, .wnm.mobile .wnm-box { border-radius:0; }\
.wnm-scroll { position:absolute; inset:0; overflow-y:auto; scrollbar-width:thin; }\
.wnm-pane { padding:28px 40px 36px; border-top:1px solid rgba(255,255,255,.14); transition:opacity .3s ease, transform .4s cubic-bezier(.22,1,.36,1); }\
.wnm.mobile .wnm-pane { padding:20px 20px 28px; }\
.wnm-pane.out-l { opacity:0; transform:translateX(-32px); } .wnm-pane.out-r { opacity:0; transform:translateX(32px); }\
.wnm-cols { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); grid-auto-flow:column; column-gap:48px; }\
.wnm.mobile .wnm-cols { grid-template-columns:1fr; grid-auto-flow:row; grid-template-rows:none !important; }\
.wnm-top { display:flex; align-items:center; justify-content:space-between; gap:16px; width:100%; padding:18px 0; border:0; border-bottom:1px solid rgba(255,255,255,.16); background:none; color:#FFFFFF; cursor:pointer; text-align:left; font-family:'IvyPresto Display', serif; font-weight:400; font-size:38px; line-height:1.15; transition:color .2s ease; }\
.wnm.mobile .wnm-top { padding:16px 0; }\
.wnm-top i, .wnm-land i, .wnm-backbtn i { position:relative; flex:none; display:block; overflow:hidden; }\
.wnm i b { position:absolute; inset:0; display:block; background:currentColor; -webkit-mask:url(motifs/fig-icon-arrow-dark.svg) center / contain no-repeat; mask:url(motifs/fig-icon-arrow-dark.svg) center / contain no-repeat; transition:transform .45s cubic-bezier(.65,0,.35,1); }\
.wnm i b + b { transform:translateX(-100%); }\
.wnm-top:hover i b, .wnm-top:focus-visible i b, .wnm-land:hover i b, .wnm-land:focus-visible i b, .wnm-backbtn:hover i b, .wnm-backbtn:focus-visible i b { transform:translateX(100%); }\
.wnm-top:hover i b + b, .wnm-top:focus-visible i b + b, .wnm-land:hover i b + b, .wnm-land:focus-visible i b + b, .wnm-backbtn:hover i b + b, .wnm-backbtn:focus-visible i b + b { transform:translateX(0); }\
.wnm-top i { width:18px; height:18px; color:#C68EFD; }\
.wnm-top:hover, .wnm-top:focus-visible { color:#C68EFD; }\
.wnm-quick { display:flex; flex-wrap:wrap; gap:10px 24px; margin-top:40px; }\
.wnm-quick a { position:relative; color:#DBBAFF; text-decoration:none; font-weight:600; font-size:16px; transition:color .2s ease; }\
.wnm-quick a:hover { color:#C68EFD; }\
.wnm-top, .wnm-link { position:relative; }\
.wnm-top::after, .wnm-link::after, .wnm-quick a::after { content:''; position:absolute; left:0; right:0; bottom:-1px; height:1px; background:#C68EFD; transform:scaleX(0); transform-origin:left center; transition:transform .45s cubic-bezier(.65,0,.35,1); }\
.wnm-quick a::after { bottom:-4px; }\
.wnm-top:hover::after, .wnm-top:focus-visible::after, .wnm-link:hover::after, .wnm-link:focus-visible::after, .wnm-quick a:hover::after, .wnm-quick a:focus-visible::after { transform:scaleX(1); }\
.wnm-head { display:flex; flex-direction:column; align-items:flex-start; gap:18px; padding-bottom:18px; border-bottom:1px solid rgba(255,255,255,.16); }\
.wnm-backbtn { display:inline-flex; align-items:center; gap:10px; height:36px; padding:0 14px; border:0; border-radius:5px; background:rgba(255,255,255,.1); color:#FFFFFF; font:600 14px Figtree, sans-serif; cursor:pointer; transition:background-color .2s ease; }\
.wnm-backbtn i { width:12px; height:12px; transform:rotate(180deg); }\
.wnm-foot { margin-top:40px; }\
.wnm-backbtn:hover { background:rgba(255,255,255,.2); }\
.wnm-land { display:inline-flex; align-items:center; gap:14px; color:#FFFFFF !important; text-decoration:none; font-family:'IvyPresto Display', serif; font-size:38px; line-height:1.15; transition:color .2s ease; }\
.wnm-land i { width:20px; height:20px; color:#C68EFD; }\
.wnm-land:hover { color:#C68EFD !important; }\
.wnm-land small { display:block; }\
.wnm-kicker { font-weight:600; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:#C68EFD; margin-bottom:-10px; }\
.wnm-link { display:block; padding:14px 0; border-bottom:1px solid rgba(255,255,255,.12); color:#FFFFFF !important; text-decoration:none; font-weight:600; font-size:18px; line-height:1.3; transition:color .2s ease; }\
.wnm-link:hover { color:#C68EFD !important; }\
html.wnm-open [data-nav-menu] { position:relative; }\
html.wnm-open [data-nav-menu]::after { content:'Close'; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; border-radius:5px; background-color:inherit; color:inherit; font:500 16px Figtree, sans-serif; }\
html.wnm-open .mnav button[aria-label='Close menu'] { position:relative; }\
html.wnm-open .mnav button[aria-label='Close menu'] img { opacity:0; }\
html.wnm-open .mnav button[aria-label='Close menu']::after { content:''; position:absolute; left:50%; top:50%; width:14px; height:14px; margin:-7px 0 0 -7px; background:#291647; -webkit-mask:url(motifs/i-cross.svg) center / contain no-repeat; mask:url(motifs/i-cross.svg) center / contain no-repeat; }\
.wnm button:focus, .wnm a:focus { outline:none; }\
.wnm button:focus-visible, .wnm a:focus-visible { outline:2px solid #C68EFD; outline-offset:4px; border-radius:3px; }\
@media (prefers-reduced-motion: reduce) { .wnm-box, .wnm-pane, .wnm-back, .wnm i b, .wnm-top::after, .wnm-link::after, .wnm-quick a::after { transition:none; } }\
";

  var navTop = 0, mobile = false, host = null, deviceEl = null, root, box, scroller, navEl = null, btnEl = null, lastFocus = null, current = -1;
  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
  function arrow() { return '<i aria-hidden="true"><b></b><b></b></i>'; }

  function topPane() {
    var rows = Math.ceil(IA.length / 2);
    return '<div class="wnm-pane" data-level="1"><nav aria-label="Sections"><div class="wnm-cols" style="grid-template-rows:repeat(' + rows + ', auto)">' +
      IA.map(function (s, i) { return '<button class="wnm-top" data-section="' + i + '" aria-label="' + esc(s[0]) + ': show pages in this section"><span>' + esc(s[0]) + '</span>' + arrow() + '</button>'; }).join('') +
      '</div></nav><div class="wnm-quick">' + QUICK.map(function (q) { return '<a href="#">' + esc(q) + '</a>'; }).join('') + '</div></div>';
  }
  function sectionPane(i) {
    var s = IA[i], rows = Math.ceil(s[1].length / 2);
    return '<div class="wnm-pane" data-level="2"><div class="wnm-head">' +
      '<span class="wnm-kicker">You are in</span><a href="#" class="wnm-land">' + esc(s[0]) + arrow() + '</a></div>' +
      '<nav aria-label="' + esc(s[0]) + '"><div class="wnm-cols" style="grid-template-rows:repeat(' + rows + ', auto)">' +
      s[1].map(function (p) { return '<a href="#" class="wnm-link">' + esc(p) + '</a>'; }).join('') + '</div></nav>' +
      '<div class="wnm-foot"><button class="wnm-backbtn" data-back="1">' + arrow() + 'All sections</button></div></div>';
  }

  function geometry() {
    // where the header box sits, in the device's own (unscaled) pixels
    var dev = mobile ? document.getElementById('device') : (document.querySelector('[data-name="Device"]') || deviceEl);
    deviceEl = dev;
    var d = dev.getBoundingClientRect(), k = d.width / (mobile ? 390 : 1280), n = navEl.getBoundingClientRect();
    if (host) { host.style.left = d.left + 'px'; host.style.top = d.top + 'px'; host.style.transform = 'scale(' + k + ')'; }
    return { left: (n.left - d.left) / k, top: (n.bottom - d.top) / k, navTop: (n.top - d.top) / k, width: n.width / k, devH: d.height / k, full: (n.left - d.left) / k < 1 };
  }
  function fit(animate) {
    var g = geometry(), pane = scroller.querySelector('.wnm-pane:last-child');
    box.style.left = g.left + 'px'; box.style.top = g.top + 'px'; box.style.width = g.width + 'px';
    // on mobile the solid fill sits behind the header too, from just under the Open Day bar
    root.querySelector('.wnm-back').style.top = (mobile ? Math.max(0, g.navTop - 12) : g.top) + 'px';
    box.classList.toggle('full', g.full);
    var maxH = g.devH - g.top - (mobile ? 0 : 24), h = Math.min(pane.scrollHeight, maxH);
    if (mobile) h = maxH; // on mobile the box fills the rest of the screen
    if (!animate) box.style.transition = 'none';
    box.style.height = h + 'px';
    if (!animate) { void box.offsetHeight; box.style.transition = ''; }
  }
  function show(i, dir) {
    var old = scroller.querySelector('.wnm-pane');
    var html = i < 0 ? topPane() : sectionPane(i);
    current = i;
    if (!old) { scroller.innerHTML = html; fit(true); focusFirst(); return; }
    old.classList.add(dir > 0 ? 'out-l' : 'out-r');
    setTimeout(function () {
      scroller.innerHTML = html;
      var pane = scroller.querySelector('.wnm-pane');
      pane.classList.add(dir > 0 ? 'out-r' : 'out-l');
      scroller.scrollTop = 0;
      fit(true);
      requestAnimationFrame(function () { requestAnimationFrame(function () { pane.classList.remove('out-l', 'out-r'); }); });
      focusFirst();
    }, 180);
  }
  function focusFirst() {
    var f = scroller.querySelector(current < 0 ? '.wnm-top' : '.wnm-land');
    if (f) try { f.focus({ preventScroll: true }); } catch (e) {}
  }

  function open(nav, btn) {
    navEl = nav; btnEl = btn; lastFocus = document.activeElement; navTop = nav.getBoundingClientRect().top;
    document.documentElement.classList.add('wnm-open');
    btnEl.setAttribute('aria-expanded', 'true'); btnEl.setAttribute('aria-label', 'Close menu');
    scroller.innerHTML = '';
    root.classList.add('open');
    box.style.height = '0px';
    current = -1;
    requestAnimationFrame(function () { root.classList.add('show'); show(-1, 0); });
    setTimeout(function () { if (root.classList.contains('open')) fit(true); }, 350);
    setTimeout(function () { root.classList.add('show'); }, 30);
  }
  function close() {
    if (!root.classList.contains('open')) return;
    root.classList.remove('show');
    box.style.height = '0px';
    if (btnEl) { btnEl.setAttribute('aria-expanded', 'false'); btnEl.setAttribute('aria-label', 'Menu'); }
    setTimeout(function () { root.classList.remove('open'); document.documentElement.classList.remove('wnm-open'); scroller.innerHTML = ''; }, 400);
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
  }

  function init() {
    mobile = !!document.getElementById('vp');
    var container;
    if (mobile) container = document.getElementById('device');
    else {
      // the desktop page's runtime re-renders the device frame, so the menu lives on <body>, laid over the frame
      deviceEl = document.querySelector('[data-name="Device"]');
      if (!deviceEl) { setTimeout(init, 200); return; }
      host = document.createElement('div'); host.className = 'wnm-host'; document.body.appendChild(host); container = host;
    }
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    root = document.createElement('div'); root.className = 'wnm' + (mobile ? ' mobile' : '');
    root.innerHTML = '<div class="wnm-back" data-close="1"></div><div class="wnm-box" role="dialog" aria-label="Menu"><div class="wnm-scroll"></div></div>';
    container.appendChild(root);
    box = root.querySelector('.wnm-box'); scroller = root.querySelector('.wnm-scroll');

    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) { close(); return; }
      var t = e.target.closest('[data-section]'); if (t) { show(Number(t.getAttribute('data-section')), 1); return; }
      if (e.target.closest('[data-back]')) { show(-1, -1); return; }
      if (e.target.closest('a')) e.preventDefault(); // pages aren't in the prototype
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('open')) close(); });
    // the Menu button (desktop) / menu icon (mobile) toggles the menu; it stays clickable above the backdrop
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-nav-menu], .mnav button[aria-label="Menu"], .mnav button[aria-label="Close menu"]');
      if (!b) return;
      e.preventDefault(); e.stopPropagation();
      if (root.classList.contains('open')) { close(); return; }
      open(b.closest('[data-name="Nav bar"], [data-name="Story nav bar"], .mnav'), b);
    }, true);
    addEventListener('resize', function () { if (root.classList.contains('open')) fit(false); });
    // the header scrolls with the page, so close the menu if the page underneath moves
    document.addEventListener('scroll', function (e) {
      if (!root.classList.contains('open') || root.contains(e.target) || !navEl) return;
      if (Math.abs(navEl.getBoundingClientRect().top - navTop) > 8) close();
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
