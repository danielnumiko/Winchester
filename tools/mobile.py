# Builds the Round 2 mobile pages (one per desktop variant) from a single template.
import html as H

VARIANTS = {
    1: {"navcolor": "white", "navfull": "off"},
    2: {"navcolor": "purple", "navfull": "off"},
    3: {"navcolor": "white", "navfull": "on"},
}

PROMOS = [
    ("assets/hero.jpg", "center 30%", "Film", "Why study at Winchester", True),
    ("assets/fig/teaching.jpg", "62% 20%", "Teacher training", "Train to teach", False),
    ("assets/fig/264755df75fdb788.png", "center", "Open day: Saturday 10 October", "Come and see us", False),
]
STORIES = [
    ("assets/fig/gabrielle-eeg-2.png", "“The staff got to know me as an individual, and I began to feel at home”", "Gabrielle, BSc Sport and Exercise Psychology, now associate lecturer"),
    ("assets/fig/macy-nursing.jpg", "“Coming on campus for my interview was the reason I chose Winchester”", "Macy, BSc Nursing (Child), final year"),
    ("assets/fig/barrister-moot.jpg", "“Their openness and sincerity was so reassuring”", "Trinity-Jade, LLB Law, second year"),
    ("assets/fig/evie-social.jpg", "“Thanks to Winchester, the only way is up”", "Evie, MA Creative and Critical Writing, postgraduate"),
    ("https://www.winchester.ac.uk/media/Content-Assets/UWin-Student-Blog/Thomas-and-international-students.jpg", "“I am an international student, but I feel a sense of belonging”", "Thomas, BSc Computer Science with Foundation Year, student"),
]
LIFE = ["Student life at Winchester", "Campus tours", "Get to know your student union", "Careers support for life"]
REASONS = [
    ("assets/fig/455f6db08277613a.png", "Your future", "95% <em>in work</em> within months", "Employability runs through every course from the start, so you leave with experience behind you as well as a degree."),
    ("assets/fig/79da595167491963.png", "Small classes", "Small classes, <em>big thinking</em>", "Seminars small enough that your tutors know your name, and where being wrong out loud is part of how you learn."),
    ("assets/fig/61f81e899722bfd3.png", "The place", "The UK’s <em>safest</em> university city", "A small, walkable city with a campus you can cross in fifteen minutes. Somewhere you can settle in quickly and feel at home."),
]
TILES = ["star4", "greenery", "archway", "stripes", "flower", "lecture", "chapel", "westdowns"]
NEWS = [
    ("assets/fig/6c403a8fc3746f43.png", "University of Winchester’s Teacher Training rated among the best in the country by Ofsted", "20 Sep 2026"),
    ("assets/fig/ba079fbcf2387c43.png", "New nurses wear their Winchester badges with pride", "19 Sep 2026"),
    ("assets/fig/e91e55e8c8ddd1c3.png", "Annabelle’s project to combat plastic pollution in Africa up for top environmental award", "17 Sep 2026"),
]
EVENTS = [
    ("10", "Oct", "Open day", "Undergraduate Open Day", "Saturday, 9.30am to 3pm", "King Alfred Campus"),
    ("4", "Nov", "Open evening", "Postgraduate open evening", "Wednesday, 5pm to 7pm", "Online"),
    ("12", "Nov", "Public lecture", "Making history: the story of Winchester", "Thursday, 6.30pm", "West Downs Centre"),
    ("21", "Nov", "Open day", "Undergraduate Open Day", "Saturday, 9.30am to 3pm", "King Alfred Campus"),
]
FOOT = [("Explore", ["Study", "International", "Student Life", "Research", "Collaborate", "About Us"]),
        ("For you", ["Current Students", "Staff", "Alumni"]),
        ("Services", ["Online store", "Payment Portal", "Corporate and Statutory Information"])]
LEGAL = ["Policies", "Disclaimer", "Privacy and cookie policy", "Freedom of Information", "Modern Slavery Statement", "Accessibility", "Freedom of Speech"]
SOCIAL = ["Facebook", "X", "Instagram", "YouTube", "LinkedIn"]

ARROW = '<img src="motifs/fig-icon-arrow-dark.svg" alt="" class="ico">'


def story_detail():
    """The story pages' content lives in the desktop page; read it from there so both stay in step."""
    import json
    lines = open("Round 2 Variant 1.dc.html", encoding="utf-8").read().split("\n")
    start = next(i for i, l in enumerate(lines) if l.startswith("const STORY_DETAIL = ["))
    return [json.loads(lines[start + k].strip().rstrip(",")) for k in range(1, len(STORIES) + 1)]


def btn(label, cls="btn"):
    return f'<a href="#" class="{cls}"><span>{label}</span>{ARROW}</a>'


def eyebrow(text, star=True):
    s = '<img src="motifs/fig-star8-purple.svg" alt="">' if star else ""
    return f'<div class="eyebrow">{s}<span>{text}</span></div>'


CSS = r"""
:root { --dp:#291647; --lp:#C68EFD; --mp:#5C358E; --pale:#DBBAFF; --lime:#D4EF70; --grey:#F5F5F5; --bc:0px; }
html[data-m-broadcast="on"] { --bc:40px; }
* { box-sizing:border-box; }
body { margin:0; background:#141414; -webkit-font-smoothing:antialiased; font-family:Figtree, sans-serif; }
a { text-decoration:none; color:inherit; }
.serif { font-family:'IvyPresto Display', serif; font-weight:400; }
em { font-style:italic; }
#stage { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; padding-top:56px; overflow:hidden; }
#device { position:relative; width:390px; height:844px; flex-shrink:0; border-radius:28px; overflow:hidden; background:var(--dp); box-shadow:0 30px 80px rgba(0,0,0,.5); transform-origin:center center; isolation:isolate; }
#vp { position:absolute; inset:0; overflow-x:hidden; overflow-y:auto; scrollbar-width:none; background:#FFFFFF; }
#vp::-webkit-scrollbar { display:none; }
section, footer { position:relative; }
.pad { padding-left:16px; padding-right:16px; }
.eyebrow { display:flex; gap:6px; align-items:center; }
.eyebrow img { width:8px; height:8px; display:block; }
.eyebrow span { font-weight:600; font-size:11px; letter-spacing:.3em; text-transform:uppercase; line-height:1; }
.ico { width:12px; height:12px; display:block; flex-shrink:0; transition:filter .2s ease; }
/* Buttons: light purple; dark purple + white text on light grounds, white on dark grounds */
.btn { display:inline-flex; align-items:center; gap:10px; height:52px; padding:0 20px; border-radius:5px; background:var(--lp); color:var(--dp); font-weight:500; font-size:16px; white-space:nowrap; transition:background-color .2s ease, color .2s ease; }
.btn:hover, .btn:active { background:var(--dp); color:#FFFFFF; }
.btn:hover .ico, .btn:active .ico { filter:brightness(0) invert(1); }
.on-dark .btn:hover, .on-dark .btn:active, .on-lp .btn:hover, .on-lp .btn:active { background:#FFFFFF; color:var(--dp); }
.on-dark .btn:hover .ico, .on-dark .btn:active .ico, .on-lp .btn:hover .ico, .on-lp .btn:active .ico { filter:none; }
.btn.dark { background:var(--dp); color:#FFFFFF; }
.btn.dark .ico { filter:brightness(0) invert(1); }

/* Hero */
#hero { height:844px; overflow:hidden; background:var(--dp); color:#FFFFFF; }
#film { position:absolute; inset:0; }
#film video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; display:block; transform:scale(1.16); transform-origin:50% 38%; }
#film::after { content:""; position:absolute; inset:0; background:rgba(41,22,71,.35); }
.broadcast { display:none; position:absolute; z-index:25; left:0; right:0; top:0; height:40px; padding:0 44px 0 16px; background:var(--lime); color:var(--dp); align-items:center; font-size:13px; font-weight:500; line-height:1; white-space:nowrap; }
html[data-m-broadcast="on"] .broadcast { display:flex; }
.broadcast a { font-weight:700; text-decoration:underline; text-underline-offset:3px; white-space:nowrap; }
.broadcast button { position:absolute; right:6px; top:50%; transform:translateY(-50%); width:30px; height:30px; border:0; border-radius:5px; background:transparent; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.broadcast button:hover { background:rgba(41,22,71,.12); }
.broadcast button span { width:14px; height:14px; display:block; background:var(--dp); -webkit-mask:url(motifs/i-cross.svg) center / contain no-repeat; mask:url(motifs/i-cross.svg) center / contain no-repeat; }
.mnav { position:absolute; z-index:20; left:12px; right:12px; top:calc(var(--bc) + 12px); height:64px; border-radius:5px; background:#FFFFFF; display:flex; align-items:center; justify-content:space-between; padding:0 10px 0 12px; transition:top .35s cubic-bezier(.22,1,.36,1); }
.mnav .logo { width:150px; height:auto; display:block; }
.mnav .logo.light { display:none; }
.mnav .acts { display:flex; gap:8px; }
.mnav button { width:44px; height:44px; border:0; border-radius:5px; background:var(--lp); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background-color .2s ease; }
.mnav button img { width:20px; height:20px; display:block; transition:filter .2s ease; }
.mnav button:hover { background:var(--dp); }
.mnav button:hover img { filter:brightness(0) invert(1); }
html[data-m-navcolor="purple"] .mnav { background:var(--dp); }
html[data-m-navcolor="purple"] .mnav .logo.dark { display:none; }
html[data-m-navcolor="purple"] .mnav .logo.light { display:block; }
html[data-m-navcolor="purple"] .mnav button:hover { background:#FFFFFF; }
html[data-m-navcolor="purple"] .mnav button:hover img { filter:none; }
html[data-m-navfull="on"] .mnav { left:0; right:0; top:var(--bc); height:68px; border-radius:0; padding:0 12px 0 16px; }
.hero-copy { position:absolute; z-index:3; left:20px; right:20px; top:50%; transform:translateY(-58%); display:flex; flex-direction:column; align-items:center; gap:16px; text-align:center; }
.hero-copy .arch { width:40px; height:40px; background:var(--lp); -webkit-mask:url(motifs/fig-icon-archway95.svg) center / contain no-repeat; mask:url(motifs/fig-icon-archway95.svg) center / contain no-repeat; }
.hero-copy h1 { margin:0; font-size:46px; line-height:1.05; letter-spacing:-.01em; text-shadow:0 2px 24px rgba(20,10,40,.28); text-wrap:balance; }
.promos { position:absolute; z-index:3; left:0; right:0; bottom:28px; }
.promo-track { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; padding:0 36px; gap:10px; }
.promo-track::-webkit-scrollbar { display:none; }
.promo { flex:0 0 318px; scroll-snap-align:center; display:flex; align-items:center; gap:16px; padding:10px; border-radius:10px; background:rgba(255,255,255,.14); backdrop-filter:blur(24px) saturate(160%); -webkit-backdrop-filter:blur(24px) saturate(160%); color:#FFFFFF; }
.promo .thumb { flex:none; width:60px; height:60px; border-radius:5px; background-size:cover; display:flex; align-items:center; justify-content:center; }
.promo .play { width:24px; height:24px; background:var(--dp); display:flex; align-items:center; justify-content:center; }
.promo .k { display:block; font-size:11px; font-weight:600; letter-spacing:.15em; text-transform:uppercase; margin-bottom:5px; }
.promo .t { display:block; font-size:18px; font-weight:600; line-height:1.25; }
.dots { display:flex; justify-content:center; gap:6px; margin-top:14px; }
.dots button { width:8px; height:8px; padding:0; border:0; border-radius:4px; background:rgba(255,255,255,.45); cursor:pointer; transition:width .3s ease, background-color .3s ease; }
.dots button[aria-current="true"] { width:24px; background:#FFFFFF; }

/* Intro cards */
#intro { padding:48px 16px; display:flex; flex-direction:column; gap:12px; }
.icard { border-radius:15px; background:var(--grey); padding:32px 24px; display:flex; flex-direction:column; align-items:flex-start; gap:20px; color:var(--dp); }
.icard h3 { margin:0; font-size:34px; line-height:1.15; }
.icard p { margin:0; font-weight:500; font-size:16px; line-height:1.5; color:var(--mp); }

/* Carousels */
.car { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; gap:12px; padding:0 16px; scroll-padding:0 16px; cursor:grab; }
.car::-webkit-scrollbar { display:none; }
.car.dragging { cursor:grabbing; scroll-snap-type:none; }
.car > * { scroll-snap-align:start; flex-shrink:0; }
.car-ctrl { display:flex; justify-content:space-between; align-items:center; padding:20px 16px 0; }
.car-ctrl .count { font-weight:600; font-size:11px; letter-spacing:.3em; color:var(--dp); }
.car-ctrl .arrows { display:flex; gap:8px; }
.car-ctrl button { width:44px; height:44px; border:0; border-radius:5px; background:var(--lp); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background-color .2s ease; }
.car-ctrl button:hover { background:var(--dp); }
.car-ctrl button:hover img { filter:brightness(0) invert(1); }
.car-ctrl button img { width:14px; height:14px; }
.car-ctrl button.prev img { transform:rotate(180deg); }
h2.sec { margin:0; font-size:40px; line-height:1.15; color:var(--dp); }

/* Stories */
#stories { padding:24px 0 56px; }
#stories .head { padding:0 16px 28px; display:flex; flex-direction:column; align-items:flex-start; gap:20px; }
.story { width:280px; border-radius:15px; background:var(--grey); color:var(--dp); display:flex; flex-direction:column; overflow:hidden; }
.story .img { height:280px; border-radius:15px; background-size:cover; background-position:center; }
.story .q { padding:20px 20px 12px; font-weight:600; font-size:19px; line-height:1.3; }
.story .n { padding:0 20px 22px; margin-top:auto; font-weight:500; font-size:13px; line-height:1.4; color:var(--mp); }

/* Life banner */
#life { background:var(--lp); color:var(--dp); padding-bottom:40px; }
#life .photo { position:relative; height:320px; background:url(assets/life-cafe.jpg) center / cover no-repeat; }
#life .photo svg { position:absolute; left:0; right:0; bottom:-1px; width:100%; height:120px; display:block; }
#life .body { padding:8px 24px 0; }
#life .eyebrow span { color:var(--dp); }
#life ul { list-style:none; margin:16px 0 0; padding:0; }
#life li a { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:18px 0; border-bottom:1px solid rgba(41,22,71,.25); font-weight:600; font-size:20px; line-height:1.25; }
#life li:last-child a { border-bottom:0; }
#life li a img { width:16px; height:16px; }

/* 3 Reasons */
#reasons-intro { background:var(--dp); color:#FFFFFF; padding:72px 24px 48px; display:flex; flex-direction:column; align-items:center; gap:16px; text-align:center; }
#reasons-intro .eyebrow span { color:#FFFFFF; }
#reasons-intro h2 { margin:0; font-size:42px; line-height:1.15; }
#reasons-intro .down { width:56px; height:56px; transform:rotate(90deg); background:var(--lime); -webkit-mask:url(motifs/fig-icon-arrow-purple.svg) center / contain no-repeat; mask:url(motifs/fig-icon-arrow-purple.svg) center / contain no-repeat; }
#reasons { height:2400px; background:var(--dp); }
#reasons .sticky { position:sticky; top:0; height:844px; display:flex; flex-direction:column; overflow:hidden; }
#reasons .imgs { position:relative; height:360px; flex-shrink:0; overflow:hidden; }
#reasons .imgs div { position:absolute; inset:0; background-size:cover; background-position:center; will-change:clip-path, transform; transition:transform .9s cubic-bezier(.22,1,.36,1); }
#reasons .strip { height:84px; flex-shrink:0; overflow:hidden; padding:10px 0 30px; }
#reasons .strip .row { display:flex; gap:12px; width:max-content; will-change:transform; }
#reasons .strip .tile { width:44px; height:44px; background:var(--lime); display:flex; }
#reasons .strip .tile i { width:100%; height:100%; background:var(--dp); }
#reasons .texts { position:relative; flex:1; }
#reasons .rt { position:absolute; inset:0; padding:16px 24px; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; gap:16px; color:#FFFFFF; opacity:0; visibility:hidden; transform:translateY(20px); transition:opacity .5s ease, transform .6s cubic-bezier(.22,1,.36,1), visibility 0s linear .6s; }
#reasons .rt.on { opacity:1; visibility:visible; transform:none; transition:opacity .6s ease .15s, transform .7s cubic-bezier(.22,1,.36,1) .15s, visibility 0s; }
#reasons .rt .eyebrow span { color:#FFFFFF; }
#reasons .rt h3 { margin:0; font-size:38px; line-height:1.15; }
#reasons .rt p { margin:0; font-weight:500; font-size:16px; line-height:1.55; color:var(--pale); }

/* News */
#news { padding:64px 16px 56px; display:flex; flex-direction:column; gap:28px; }
.ncard { display:flex; flex-direction:column; border-radius:15px; overflow:hidden; background:var(--grey); color:var(--dp); transition:background-color .25s ease; }
.ncard:hover { background:var(--lp); }
.ncard .img { height:200px; border-radius:15px; background-size:cover; background-position:center; }
.ncard .tx { padding:20px; display:flex; flex-direction:column; gap:12px; }
.ncard .t { font-weight:600; font-size:20px; line-height:1.25; }
.ncard .d { font-weight:500; font-size:14px; color:var(--mp); }
.stack { display:flex; flex-direction:column; gap:12px; }
.ncard.lead .img { height:240px; }
.ncard.lead .t { font-size:24px; }
.ncard.small { flex-direction:row; align-items:stretch; }
.ncard.small .img { flex:0 0 132px; height:auto; min-height:148px; }
.ncard.small .tx { padding:16px; justify-content:space-between; }
.ncard.small .t { font-size:17px; }

/* Events */
#events { padding:16px 0 64px; }
#events .head { padding:0 16px 28px; display:flex; flex-direction:column; gap:16px; }
#events .eyebrow span { color:var(--dp); }
#events h2 em { color:var(--mp); }
.ev { width:260px; border-radius:15px; background:var(--grey); padding:24px; display:flex; flex-direction:column; align-items:flex-start; gap:20px; color:var(--dp); transition:background-color .25s ease; }
.ev:hover { background:var(--lp); }
.ev .date { width:76px; height:76px; border-radius:5px; background:var(--lime); display:flex; flex-direction:column; align-items:center; justify-content:center; }
.ev .date b { font-family:'IvyPresto Display', serif; font-weight:400; font-size:34px; line-height:1; }
.ev .date small { font-weight:600; font-size:11px; letter-spacing:.15em; text-transform:uppercase; margin-top:4px; }
.ev .k { font-weight:600; font-size:11px; letter-spacing:.15em; text-transform:uppercase; color:var(--mp); }
.ev .t { font-weight:600; font-size:20px; line-height:1.25; margin-top:8px; display:block; }
.ev .m { margin-top:auto; font-weight:500; font-size:14px; line-height:1.45; color:var(--mp); }
#events .after { padding:24px 16px 0; }

/* International banner */
#intl { background:var(--lp); color:var(--dp); padding-bottom:48px; }
/* Flower window at its true proportions (79.4:86.5); only its bottom edge shows, so the motif runs horizontally */
#intl .photo { position:relative; width:390px; height:380px; overflow:hidden; }
#intl .photo .fl { position:absolute; left:-135px; top:-334px; width:660px; height:714px; -webkit-mask:url(motifs/fig-flower-mask.svg) 0 0 / 100% 100% no-repeat; mask:url(motifs/fig-flower-mask.svg) 0 0 / 100% 100% no-repeat; }
#intl .photo .pic { position:absolute; left:135px; top:334px; width:390px; height:380px; background:url(assets/ph-cathedral-talking.jpg) center 30% / cover no-repeat; }
#intl .body { padding:36px 24px 0; display:flex; flex-direction:column; align-items:flex-start; gap:16px; }
#intl .eyebrow span { color:var(--dp); }
#intl h2 { margin:0; font-size:40px; line-height:1.15; }
#intl p { margin:0; font-size:17px; line-height:1.45; }
.on-lp .btn.dark:hover, .on-lp .btn.dark:active { background:#FFFFFF; color:var(--dp); }
.on-lp .btn.dark:hover .ico { filter:none; }

/* Story page: opens over the homepage with an arch wipe */
#wipe { position:absolute; inset:0; z-index:60; background:var(--lp); visibility:hidden; pointer-events:none; }
#story { position:absolute; inset:0; z-index:50; overflow-y:auto; overflow-x:hidden; scrollbar-width:none; background:#FFFFFF; visibility:hidden; }
#story::-webkit-scrollbar { display:none; }
#story.open { visibility:visible; }
#story .s-hero { position:relative; height:460px; background-size:cover; background-position:center 30%; }
#story .s-hero::after { content:""; position:absolute; inset:0; background:linear-gradient(rgba(41,22,71,.35), rgba(41,22,71,0) 40%); }
#story .mnav { top:12px; }
html[data-m-navfull="on"] #story .mnav { top:0; }
#story .panel { position:relative; margin-top:-30px; border-radius:30px 30px 0 0; background:#FFFFFF; color:var(--dp); padding:0 24px 48px; }
#story .crumb { margin:0 -24px; padding:16px 24px; border-radius:30px 30px 0 0; background:var(--lp); display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
#story .crumb a, #story .crumb span { font-weight:600; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--dp); }
#story .crumb svg { width:5px; height:7px; display:block; }
#story h1 { margin:28px 0 0; font-size:36px; line-height:1.15; text-wrap:balance; }
#story .meta { margin-top:14px; font-weight:600; font-size:13px; letter-spacing:.08em; text-transform:uppercase; color:var(--mp); }
#story .stand { margin:24px 0 0; font-weight:500; font-size:20px; line-height:1.5; }
#story h2 { margin:36px 0 0; font-size:26px; line-height:1.2; }
#story p.b { margin:14px 0 0; font-weight:500; font-size:17px; line-height:1.6; color:#3D2566; }
#story blockquote { margin:40px 0 8px; padding:28px 24px; border-radius:15px; background:var(--dp); color:#FFFFFF; font-family:'IvyPresto Display', serif; font-size:28px; line-height:1.25; }
#story blockquote::before { content:""; display:block; width:28px; height:28px; margin-bottom:14px; background:var(--lime); -webkit-mask:url(motifs/i-quote.svg) center / contain no-repeat; mask:url(motifs/i-quote.svg) center / contain no-repeat; }
#story .img2 { margin-top:32px; height:260px; border-radius:15px; background-size:cover; background-position:center; }
#story .next { margin-top:48px; display:flex; flex-direction:column; border-radius:15px; overflow:hidden; background:var(--grey); color:var(--dp); cursor:pointer; text-align:left; border:0; padding:0; width:100%; font:inherit; }
#story .next .img { height:200px; border-radius:15px; background-size:cover; background-position:center; }
#story .next .k { padding:20px 20px 6px; font-weight:600; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--mp); display:flex; align-items:center; gap:8px; }
#story .next .q { padding:0 20px 22px; font-weight:600; font-size:19px; line-height:1.3; }
#story .next:hover { background:var(--lp); }
#story .back { margin-top:24px; }

/* Footer */
footer { background:var(--dp); color:#FFFFFF; padding:56px 24px 32px; display:flex; flex-direction:column; gap:40px; }
footer .contact { display:flex; flex-direction:column; align-items:flex-start; gap:20px; }
footer .contact img.logo { width:180px; height:auto; display:block; }
footer p { margin:0; font-weight:500; font-size:16px; line-height:1.5; color:var(--pale); }
footer .tel { display:flex; flex-direction:column; gap:4px; font-weight:500; font-size:16px; }
footer .cols { display:grid; grid-template-columns:1fr 1fr; gap:32px 16px; }
footer .col { display:flex; flex-direction:column; gap:12px; }
footer .col h4 { margin:0 0 4px; font-weight:600; font-size:11px; letter-spacing:.15em; text-transform:uppercase; color:var(--lp); }
footer .col a { font-weight:500; font-size:16px; line-height:1.35; }
footer .col a:hover, footer .tel a:hover { color:var(--lp); }
footer .legal { border-top:1px solid var(--mp); padding-top:24px; display:flex; flex-wrap:wrap; gap:10px 18px; }
footer .legal a, footer .soc a { font-weight:500; font-size:14px; color:var(--pale); }
footer .soc { display:flex; flex-wrap:wrap; gap:10px 18px; }
footer .copy { font-weight:500; font-size:14px; color:var(--pale); }
"""

JS = r"""
(function () {
  var html = document.documentElement, vp = document.getElementById('vp'), dev = document.getElementById('device');
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Fit the phone frame to the window
  function fit() { var s = Math.min(1, (innerWidth - 32) / 390, (innerHeight - 88) / 844); dev.style.transform = 'scale(' + Math.max(0.3, s) + ')'; }
  fit(); addEventListener('resize', fit);
  // Remember scroll position per page, like the desktop pages
  var KEY = 'wnc-m-scroll-' + location.pathname;
  try { var y = Number(sessionStorage.getItem(KEY) || 0); if (y) vp.scrollTop = y; } catch (e) {}
  vp.addEventListener('scroll', function () { try { sessionStorage.setItem(KEY, String(vp.scrollTop)); } catch (e) {} }, { passive: true });

  // Broadcast bar: dismissible, comes back on reload
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-broadcast-close]');
    if (!b) return; e.preventDefault(); html.setAttribute('data-m-broadcast', 'off');
  });

  // Drag to scroll carousels with a mouse (touch scrolls natively)
  document.querySelectorAll('.car, .promo-track').forEach(function (el) {
    var down = false, x0 = 0, s0 = 0, moved = false;
    el.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = el.scrollLeft; el.classList.add('dragging'); });
    addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - x0; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = s0 - dx / scaleOf(); });
    addEventListener('pointerup', function () { if (!down) return; down = false; el.classList.remove('dragging'); if (el.classList.contains('promo-track')) { var i = nearest(); el.scrollTo({ left: centreOf(i), behavior: 'smooth' }); } else snap(el); });
    el.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  });
  function scaleOf() { var m = /scale\(([\d.]+)\)/.exec(dev.style.transform); return m ? Number(m[1]) : 1; }
  function snap(el) {
    var kids = Array.from(el.children), pl = parseFloat(getComputedStyle(el).paddingLeft) || 0, best = 0, bd = 1e9;
    kids.forEach(function (k, i) { var d = Math.abs(k.offsetLeft - pl - el.scrollLeft); if (d < bd) { bd = d; best = i; } });
    el.scrollTo({ left: kids[best].offsetLeft - pl, behavior: 'smooth' });
  }
  function indexOf(el) {
    var kids = Array.from(el.children), pl = parseFloat(getComputedStyle(el).paddingLeft) || 0, best = 0, bd = 1e9;
    kids.forEach(function (k, i) { var d = Math.abs(k.offsetLeft - pl - el.scrollLeft); if (d < bd) { bd = d; best = i; } });
    return best;
  }
  function goTo(el, i) { var k = el.children[i]; if (!k) return; el.scrollTo({ left: k.offsetLeft - (parseFloat(getComputedStyle(el).paddingLeft) || 0), behavior: 'smooth' }); }

  // Hero promos: one at a time, neighbours peek either side, loops endlessly
  var pt = document.querySelector('.promo-track'), dots = Array.from(document.querySelectorAll('.dots button')), N = dots.length;
  function centreOf(i) { var k = pt.children[i]; return k.offsetLeft + k.offsetWidth / 2 - pt.clientWidth / 2; }
  function nearest() { var c = pt.scrollLeft, best = 0, bd = 1e9; Array.from(pt.children).forEach(function (k, i) { var d = Math.abs(centreOf(i) - c); if (d < bd) { bd = d; best = i; } }); return best; }
  function paintDots() { var i = nearest() % N; dots.forEach(function (d, j) { d.setAttribute('aria-current', i === j ? 'true' : 'false'); }); }
  var settle = 0;
  function recentre() { var i = nearest(); if (i < N || i >= 2 * N) { var j = N + (i % N); pt.style.scrollSnapType = 'none'; pt.scrollLeft = centreOf(j); requestAnimationFrame(function () { pt.style.scrollSnapType = ''; }); } }
  pt.addEventListener('scroll', function () { requestAnimationFrame(paintDots); clearTimeout(settle); settle = setTimeout(recentre, 140); }, { passive: true });
  dots.forEach(function (d, j) { d.addEventListener('click', function () { var i = nearest(), base = i - (i % N); pt.scrollTo({ left: centreOf(base + j), behavior: 'smooth' }); }); });
  pt.style.scrollSnapType = 'none'; pt.scrollLeft = centreOf(N); requestAnimationFrame(function () { pt.style.scrollSnapType = ''; });
  paintDots();

  // Carousels with a counter and arrows (stories, events)
  var pad = function (v) { return (v < 10 ? '0' : '') + v; };
  document.querySelectorAll('.car-ctrl').forEach(function (ctrl) {
    var car = ctrl.previousElementSibling, cnt = ctrl.querySelector('.count'), n = car.children.length;
    function paint() { cnt.textContent = pad(indexOf(car) + 1) + ' / ' + pad(n); }
    car.addEventListener('scroll', paint, { passive: true });
    ctrl.querySelector('.prev').addEventListener('click', function () { goTo(car, Math.max(0, indexOf(car) - 1)); });
    ctrl.querySelector('.next').addEventListener('click', function () { goTo(car, Math.min(n - 1, indexOf(car) + 1)); });
    paint();
  });

  // 3 Reasons: sticky, scroll-driven; images open with the star reveal, motif strip slides
  var sec = document.getElementById('reasons'), imgs = Array.from(sec.querySelectorAll('.imgs div')), texts = Array.from(sec.querySelectorAll('.rt')), row = sec.querySelector('.strip .row');
  var STAR = "M 611.077 301.577 C 498.575 301.577 317.423 120.465 317.423 7.923 C 317.423 3.526 313.857 0 309.5 0 C 305.143 0 301.577 3.565 301.577 7.923 C 301.577 120.425 120.465 301.577 7.923 301.577 C 3.565 301.577 0 305.143 0 309.5 C 0 313.857 3.565 317.423 7.923 317.423 C 120.425 317.423 301.577 498.535 301.577 611.077 C 301.577 615.474 305.143 619 309.5 619 C 313.857 619 317.423 615.435 317.423 611.077 C 317.423 498.575 498.535 317.423 611.077 317.423 C 615.435 317.423 619 313.857 619 309.5 C 619 305.143 615.435 301.577 611.077 301.577 Z";
  function starAt(el, size) {
    var w = el.offsetWidth, h = el.offsetHeight, k = Math.max(size, 0.01) / 619, ox = w / 2 - 309.5 * k, oy = h / 2 - 309.5 * k, c = 0;
    return 'path("' + STAR.replace(/-?\d*\.?\d+/g, function (v) { return (c++ % 2 === 0 ? ox + parseFloat(v) * k : oy + parseFloat(v) * k).toFixed(2); }) + '")';
  }
  var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var active = -1;
  function reasons() {
    var span = sec.offsetHeight - vp.clientHeight, p = Math.max(0, Math.min(1, (vp.scrollTop - sec.offsetTop) / span)), v = p * 3;
    var cur = Math.min(2, Math.floor(v + 0.15));
    if (cur !== active) { active = cur; texts.forEach(function (t, i) { t.classList.toggle('on', i === cur); }); }
    [1, 2].forEach(function (i) {
      var t = reduced ? (v >= i - 0.15 ? 1 : 0) : ease(Math.max(0, Math.min(1, (v - (i - 0.5)) / 0.6)));
      var el = imgs[i];
      el.style.clipPath = t >= 0.999 ? 'none' : starAt(el, t * Math.hypot(el.offsetWidth, el.offsetHeight) * 2.2);
      el.style.transform = reduced ? 'none' : 'scale(' + (1.12 - 0.12 * t).toFixed(3) + ')';
    });
    row.style.transform = 'translateX(' + (-(row.scrollWidth - 390) * p).toFixed(1) + 'px)';
  }
  imgs.slice(1).forEach(function (el) { el.style.clipPath = starAt(el, 0); });
  vp.addEventListener('scroll', function () { requestAnimationFrame(reasons); }, { passive: true });
  addEventListener('load', reasons); reasons();

  // Story pages: tap a story card, an arch wipe rises, the story opens full screen
  var story = document.getElementById('story'), wipe = document.getElementById('wipe'), cur = 0, busy = false;
  function q(sel) { return story.querySelector('[data-s="' + sel + '"]'); }
  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
  function fill(i) {
    var s = STORIES[i], d = STORY_DETAIL[i], nx = STORIES[(i + 1) % STORIES.length], parts = s.name.split(',').map(function (x) { return x.trim(); });
    var hl = d.headline || s.quote, fn = parts[0], hi = hl.indexOf(fn);
    q('hero').style.backgroundImage = 'url(' + s.img + ')'; q('hero').style.backgroundPosition = d.imgPos || 'center 30%';
    q('first').textContent = fn;
    q('h1').innerHTML = hi > -1 ? esc(hl.slice(0, hi)) + '<em>' + esc(fn) + '</em>' + esc(hl.slice(hi + fn.length)) : esc(hl);
    q('meta').textContent = parts.slice(1).join(' · ');
    q('stand').textContent = d.standfirst || '';
    function sec(arr) { return (arr || []).map(function (x) { return (x.q ? '<h2 class="serif">' + esc(x.q) + '</h2>' : '') + x.paras.map(function (p) { return '<p class="b">' + esc(p) + '</p>'; }).join(''); }).join(''); }
    q('body1').innerHTML = sec(d.body1); q('body2').innerHTML = sec(d.body2);
    q('pull').textContent = d.pull ? '“' + d.pull + '”' : ''; q('pull').style.display = d.pull ? '' : 'none';
    q('img2').style.backgroundImage = d.img2 ? 'url(' + d.img2 + ')' : ''; q('img2').style.display = d.img2 ? '' : 'none';
    q('nextimg').style.backgroundImage = 'url(' + nx.img + ')'; q('nextq').textContent = nx.quote;
    story.scrollTop = 0; cur = i;
  }
  var VW = 390, VH = 844;
  function archClip(t) {
    // Westgate arch rising from the bottom; t = 0 hidden, 1 covers the screen
    var w = 200 + (VW * 2.6 - 200) * t, h = (VH + w * 0.3 + 40) * t, k = w / 208, x0 = VW / 2 - w / 2, top = VH - h;
    var X = function (x) { return (x0 + x * k).toFixed(1); }, Y = function (y) { return (top + y * k).toFixed(1); };
    return 'path("M ' + X(0) + ' ' + (VH + 2) + ' L ' + X(0) + ' ' + Y(56.077) + ' C ' + X(16.533) + ' ' + Y(36.281) + ' ' + X(48.374) + ' ' + Y(9.929) + ' ' + X(105.147) + ' ' + Y(0) + ' L ' + X(105.178) + ' ' + Y(0) + ' C ' + X(159.409) + ' ' + Y(9.494) + ' ' + X(190.878) + ' ' + Y(33.951) + ' ' + X(208) + ' ' + Y(53.389) + ' L ' + X(208) + ' ' + (VH + 2) + ' Z")';
  }
  function play(dur, from, to, cb) {
    var t0 = performance.now(), e = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
    var done = false, finish = function () { if (done) return; done = true; wipe.style.clipPath = archClip(to); cb && cb(); };
    (function f(now) { if (done) return; var p = Math.min(1, (now - t0) / dur), v = from + (to - from) * e(p); wipe.style.clipPath = archClip(v); if (p < 1) requestAnimationFrame(f); else finish(); })(t0);
    setTimeout(finish, dur + 120); // never leave the wipe hanging if frames are paused
  }
  function openStory(i) {
    if (busy) return; busy = true;
    var show = function () { fill(i); story.classList.add('open'); story.setAttribute('aria-hidden', 'false'); };
    if (reduced) { show(); busy = false; return; }
    wipe.style.opacity = '1'; wipe.style.visibility = 'visible'; wipe.style.clipPath = archClip(0);
    play(700, 0, 1, function () {
      show();
      wipe.style.transition = 'opacity .45s ease'; wipe.style.opacity = '0';
      setTimeout(function () { wipe.style.visibility = 'hidden'; wipe.style.transition = ''; busy = false; }, 460);
    });
  }
  function closeStory() {
    story.classList.remove('open'); story.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('[data-story]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); openStory(Number(a.getAttribute('data-story'))); });
  });
  story.addEventListener('click', function (e) {
    var c = e.target.closest('[data-close]'); if (c) { e.preventDefault(); closeStory(); return; }
    var n = e.target.closest('[data-next]'); if (n) { e.preventDefault(); openStory((cur + 1) % STORIES.length); }
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && story.classList.contains('open')) closeStory(); });

  // Hero intro: the film opens through the arch, then the header and copy fade in
  (function archIntro() {
    var film = document.getElementById('film'), hero = document.getElementById('hero');
    var rest = Array.from(hero.children).filter(function (n) { return n !== film && getComputedStyle(n).display !== 'none'; });
    if (reduced || vp.scrollTop > 0) return;
    rest.forEach(function (n) { n.style.opacity = '0'; });
    var VW = 390, VH = 844, CX = VW / 2, W0 = 200, H1 = VH - 90, W2 = VW * 2.4;
    function arch(w, h) {
      var k = w / 208, x0 = CX - w / 2, top = VH - h;
      var X = function (x) { return (x0 + x * k).toFixed(2); }, Y = function (y) { return (top + y * k).toFixed(2); };
      return 'path("M ' + X(0) + ' ' + (VH + 2) + ' L ' + X(0) + ' ' + Y(56.077) + ' C ' + X(16.533) + ' ' + Y(36.281) + ' ' + X(48.374) + ' ' + Y(9.929) + ' ' + X(105.147) + ' ' + Y(0) + ' L ' + X(105.178) + ' ' + Y(0) + ' C ' + X(159.409) + ' ' + Y(9.494) + ' ' + X(190.878) + ' ' + Y(33.951) + ' ' + X(208) + ' ' + Y(53.389) + ' L ' + X(208) + ' ' + (VH + 2) + ' Z")';
    }
    function bez(p1x, p1y, p2x, p2y) { return function (t) { var x = t, cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx, cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by; for (var i = 0; i < 8; i++) { var fx = ((ax * x + bx) * x + cx) * x - t, d = (3 * ax * x + 2 * bx) * x + cx; if (Math.abs(fx) < 1e-5 || !d) break; x -= fx / d; } return ((ay * x + by) * x + cy) * x; }; }
    var eRise = bez(0.65, 0, 0.35, 1), eOpen = bez(0.76, 0, 0.24, 1), DUR = 3000, SPLIT = 0.5, t0 = performance.now() + 200, shown = false;
    film.style.clipPath = arch(W0, 0);
    function tick(now) {
      var p = Math.max(0, Math.min(1, (now - t0) / DUR)), r = eRise(Math.min(1, p / SPLIT)), o = eOpen(Math.max(0, (p - SPLIT * 0.8) / (1 - SPLIT * 0.8)));
      var g = 0.65 + 0.35 * r, w = W0 * g + (W2 - W0 * g) * o, hA = H1 * r, h = hA + (VH + w * 0.27 + 40 - hA) * o;
      film.style.clipPath = arch(w, h);
      if (!shown && p > 0.85) { shown = true; rest.forEach(function (n, i) { n.style.transition = 'opacity .8s ease ' + (i * 0.15) + 's'; n.style.opacity = '1'; }); }
      if (p < 1) requestAnimationFrame(tick); else film.style.clipPath = '';
    }
    requestAnimationFrame(tick);
  })();
})();
"""


def page(v, switcher):
    import json
    o = VARIANTS[v]
    promos = "".join(
        f'<a href="#" class="promo"><span class="thumb" style="background-image:url({img}); background-position:{pos}">'
        + ('<span class="play"><svg viewBox="0 0 10 12" width="8" height="10"><path d="M0 0L10 6L0 12Z" fill="#C68EFD"></path></svg></span>' if play else "")
        + f'</span><span><span class="k">{k}</span><span class="t">{t}</span></span></a>'
        for img, pos, k, t, play in PROMOS)
    dots = "".join(f'<button aria-label="Show promotion {i + 1}"></button>' for i in range(len(PROMOS)))
    # three copies so the slider can loop; the middle copy is the real one
    promos = "".join(promos.replace('class="promo"', f'class="promo" data-copy="{c}"' + ('' if c == 1 else ' aria-hidden="true" tabindex="-1"')) for c in range(3))
    stories = "".join(f'<a href="#" class="story" data-story="{i}"><span class="img" style="background-image:url({img})"></span><span class="q">{q}</span><span class="n">{n}</span></a>' for i, (img, q, n) in enumerate(STORIES))
    life = "".join(f'<li><a href="#"><span>{t}</span><img src="motifs/fig-icon-arrow-dark.svg" alt=""></a></li>' for t in LIFE)
    rimgs = "".join(f'<div style="background-image:url({img})"></div>' for img, *_ in REASONS)
    rtexts = "".join(f'<div class="rt">{eyebrow(k)}<h3 class="serif">{h}</h3><p>{p}</p>{btn("Discover more")}</div>' for _, k, h, p in REASONS)
    tiles = "".join(f'<span class="tile"><i style="-webkit-mask:url(motifs/fig-tile-{t}.svg) center / contain no-repeat; mask:url(motifs/fig-tile-{t}.svg) center / contain no-repeat"></i></span>' for t in TILES * 3)
    news = "".join(f'<a href="#" class="ncard {"lead" if i == 0 else "small"}"><span class="img" style="background-image:url({img})"></span><span class="tx"><span class="t">{t}</span><span class="d">{d}</span></span></a>' for i, (img, t, d) in enumerate(NEWS))
    events = "".join(f'<a href="#" class="ev"><span class="date"><b>{d}</b><small>{m}</small></span><span><span class="k">{k}</span><span class="t">{t}</span></span><span class="m">{w}<br>{loc}</span></a>' for d, m, k, t, w, loc in EVENTS)
    cols = "".join(f'<div class="col"><h4>{h}</h4>' + "".join(f'<a href="#">{l}</a>' for l in ls) + '</div>' for h, ls in FOOT)
    legal = "".join(f'<a href="#">{l}</a>' for l in LEGAL)
    soc = "".join(f'<a href="#">{l}</a>' for l in SOCIAL)
    return f'''<!DOCTYPE html>
<html lang="en-GB" data-m-navcolor="{o["navcolor"]}" data-m-navfull="{o["navfull"]}" data-m-broadcast="on">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Winchester: Round 2, Variant {v} (mobile)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
{switcher}
<div id="stage"><div id="device"><div id="vp">

  <section id="hero" data-screen-label="Hero">
    <div id="film" aria-hidden="true"><video src="assets/hero-film.mp4" autoplay muted loop playsinline preload="auto"></video></div>
    <div class="broadcast" role="region" aria-label="Announcement"><span><strong>Open Day: Saturday 10 October.</strong> <a href="#">Book your place</a></span><button data-broadcast-close="1" aria-label="Dismiss this message"><span aria-hidden="true"></span></button></div>
    <nav class="mnav" aria-label="Main">
      <img class="logo dark" src="assets/fig/logo-fig-black.svg" alt="University of Winchester"><img class="logo light" src="assets/fig/logo-fig-white.svg" alt="University of Winchester">
      <div class="acts"><button aria-label="Ask us anything"><img src="motifs/fig-icon-search.svg" alt=""></button><button aria-label="Menu"><img src="motifs/fig-icon-menu.svg" alt=""></button></div>
    </nav>
    <div class="hero-copy"><span class="arch" aria-hidden="true"></span><h1 class="serif">The best version of you isn’t found, <em>it’s made.</em></h1></div>
    <div class="promos"><div class="promo-track">{promos}</div><div class="dots">{dots}</div></div>
  </section>

  <section id="intro" data-screen-label="Intro">
    <div class="icard"><h3 class="serif"><em>Search</em> for a course</h3><p>Already know roughly what you’re after? Start here and ask it however you like, in your own words.</p>{btn("What do you want to study?")}</div>
    <div class="icard"><h3 class="serif">Study <em>Builder</em></h3><p>Not sure yet? Tell us what you enjoy and what you’re good at, and we’ll map out your journey.</p>{btn("Tell us about yourself")}</div>
  </section>

  <section id="stories" data-screen-label="Made here">
    <div class="head"><h2 class="sec serif">Where stories are made</h2>{btn("All stories")}</div>
    <div class="car">{stories}</div>
    <div class="car-ctrl"><span class="count">01 / 05</span><span class="arrows"><button class="prev" aria-label="Previous story"><img src="motifs/fig-icon-arrow-dark.svg" alt=""></button><button class="next" aria-label="Next story"><img src="motifs/fig-icon-arrow-dark.svg" alt=""></button></span></div>
  </section>

  <section id="life" data-screen-label="Stats">
    <div class="photo" aria-hidden="true"><svg viewBox="0 0 390 120" preserveAspectRatio="none"><path d="M0 120 L0 40.8 C 56.6 28.8 128.3 24 185 31.2 C 261.7 40.8 328.4 72 390 112.8 L390 120 Z" fill="#C68EFD"></path></svg></div>
    <div class="body">{eyebrow("Life at Winchester", star=False)}<ul>{life}</ul></div>
  </section>

  <section id="reasons-intro" data-screen-label="Reasons intro">{eyebrow("Why study with Winchester?")}<h2 class="serif">3 Reasons to study with Winchester</h2><span class="down" aria-hidden="true"></span></section>
  <section id="reasons" class="on-dark" data-screen-label="Three reasons">
    <div class="sticky"><div class="imgs">{rimgs}</div><div class="texts">{rtexts}</div><div class="strip" aria-hidden="true"><div class="row">{tiles}</div></div></div>
  </section>

  <section id="news" data-screen-label="News"><h2 class="sec serif">The latest from Winchester</h2><div class="stack">{news}</div><div>{btn("All news")}</div></section>

  <section id="events" data-screen-label="Events">
    <div class="head">{eyebrow("What’s on")}<h2 class="sec serif">Open days and <em>events</em></h2></div>
    <div class="car">{events}</div>
    <div class="car-ctrl"><span class="count">01 / 0{len(EVENTS)}</span><span class="arrows"><button class="prev" aria-label="Previous event"><img src="motifs/fig-icon-arrow-dark.svg" alt=""></button><button class="next" aria-label="Next event"><img src="motifs/fig-icon-arrow-dark.svg" alt=""></button></span></div>
    <div class="after">{btn("All events")}</div>
  </section>

  <section id="intl" class="on-lp" data-screen-label="International">
    <div class="photo" aria-hidden="true"><div class="fl"><div class="pic"></div></div></div>
    <div class="body">{eyebrow("International students", star=False)}<h2 class="serif">Study in the UK, <em>made</em> for you</h2><p>Everything you need to know about studying at Winchester, from entry requirements and visas to scholarships and settling in.</p>{btn("Find out more", "btn dark")}</div>
  </section>

  <footer class="on-dark" data-screen-label="Footer">
    <div class="contact"><img class="logo" src="assets/fig/logo-fig-white.svg" alt="University of Winchester"><p>University of Winchester<br>Sparkford Road, Winchester<br>Hampshire SO22 4NR</p><div class="tel"><a href="#">+44 (0)1962 841515</a><a href="#">enquiries@winchester.ac.uk</a></div>{btn("Contact us")}</div>
    <div class="cols">{cols}</div>
    <div class="legal">{legal}</div>
    <div class="soc">{soc}</div>
    <span class="copy">© University of Winchester 2026</span>
  </footer>

</div>
<div id="story" role="dialog" aria-modal="true" aria-label="Story" aria-hidden="true">
  <div class="s-hero" data-s="hero">
    <nav class="mnav" aria-label="Main"><a href="#" data-close="1" aria-label="University of Winchester home"><img class="logo dark" src="assets/fig/logo-fig-black.svg" alt="University of Winchester"><img class="logo light" src="assets/fig/logo-fig-white.svg" alt="University of Winchester"></a>
      <div class="acts"><button aria-label="Ask us anything"><img src="motifs/fig-icon-search.svg" alt=""></button><button aria-label="Menu"><img src="motifs/fig-icon-menu.svg" alt=""></button></div></nav>
  </div>
  <article class="panel">
    <nav class="crumb" aria-label="Breadcrumb"><a href="#" data-close="1">Home</a><svg viewBox="0 0 6 8" aria-hidden="true"><path d="M0 0 L6 4 L0 8 Z" fill="#291647"></path></svg><a href="#" data-close="1">Stories made here</a><svg viewBox="0 0 6 8" aria-hidden="true"><path d="M0 0 L6 4 L0 8 Z" fill="#291647"></path></svg><span aria-current="page" data-s="first"></span></nav>
    <h1 class="serif" data-s="h1"></h1>
    <div class="meta" data-s="meta"></div>
    <p class="stand" data-s="stand"></p>
    <div data-s="body1"></div>
    <blockquote data-s="pull"></blockquote>
    <div class="img2" data-s="img2"></div>
    <div data-s="body2"></div>
    <button class="next" data-next="1"><span class="img" data-s="nextimg"></span><span class="k">Next story <img src="motifs/fig-icon-arrow-dark.svg" alt="" style="width:12px; height:12px"></span><span class="q" data-s="nextq"></span></button>
    <div class="back"><a href="#" class="btn" data-close="1"><span>Back to home</span>{ARROW}</a></div>
  </article>
</div>
<div id="wipe" aria-hidden="true"></div>
</div></div>
<script>window.STORIES = {json.dumps([dict(img=i, quote=q, name=n) for i, q, n in STORIES], ensure_ascii=False)}; window.STORY_DETAIL = {json.dumps(story_detail(), ensure_ascii=False)};</script>
<script>{JS}</script>
</body>
</html>
'''


if __name__ == "__main__":
    import sys
    sys.path.insert(0, sys.argv[1])
    for v in VARIANTS:
        open(f"Round 2 Variant {v} Mobile.dc.html", "w", encoding="utf-8").write(page(v, "<!-- switcher -->\n<nav data-name=\"Concept switcher\"></nav>"))
        print("wrote", v)
