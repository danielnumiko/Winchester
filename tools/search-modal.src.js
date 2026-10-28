/* "Ask us anything" search modal for the Round 3 pages (desktop and mobile).
   Built by tools/build_search.py: the answers and sources come from the Search and Discovery prototype.
   Inside Claude Design, answers are written live by Claude; elsewhere it uses the prototype's answers. */
(function () {
  var KNOWLEDGE = [
/*KNOWLEDGE*/
  ];
  var SUBJECTS = {
/*SUBJECTS*/
  };
  var TOPICS = {
    ask: { label: 'Ask us anything', heading: 'What do you want to <em>know</em>?', sub: 'Ask in your own words, or start somewhere.',
      chips: [['Courses', 'What courses have a placement year?'], ['Fees', 'What does it actually cost, all in?'], ['Accommodation', 'Where would I live in first year?'], ['Clearing', 'How does Clearing work here?']] },
    study: { label: 'Ask us anything', heading: 'What do you want to <em>study</em>?', sub: 'Name it if you know it, or start somewhere near.',
      chips: [['Psychology', null], ['Teaching', null], ['Nursing', null], ['Film and media', null]] }
  };
  // intro cards: desktop (inside the Intro section's grid) and mobile (.icard); the search card is the first
  var CARD = '[data-screen-label="Intro"] > div > div, #intro .icard';
  var CLARIFY = [['Entry requirements', 'What are the entry requirements?'], ['What it costs', 'What does it cost, and what funding is there?'], ['Where I would live', 'Where would I live in first year?'], ['Visiting the campus', 'When are the next open days?']];

  var CSS = "\
.wsm { position:absolute; inset:0; z-index:300; display:none; font-family:Figtree, sans-serif; color:#291647; }\
.wsm-host { position:fixed; left:0; top:0; width:1280px; height:832px; transform-origin:0 0; z-index:9000; pointer-events:none; border-radius:15px; overflow:hidden; }\
.wsm-host .wsm.open { pointer-events:auto; }\
.wsm.open { display:block; }\
.wsm-back { position:absolute; inset:0; background:rgba(41,22,71,.6); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); opacity:0; transition:opacity .3s ease; }\
.wsm.show .wsm-back { opacity:1; }\
.wsm-panel { position:absolute; left:50%; top:56px; bottom:40px; width:820px; max-width:calc(100% - 32px); transform:translate(-50%, 24px); opacity:0; transition:transform .45s cubic-bezier(.22,1,.36,1), opacity .3s ease; background:#FFFFFF; border-radius:15px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 30px 80px rgba(20,10,36,.35); }\
.wsm.show .wsm-panel { transform:translate(-50%, 0); opacity:1; }\
.wsm.mobile .wsm-panel { inset:0; left:0; top:0; bottom:0; width:auto; max-width:none; transform:translateY(24px); border-radius:0; }\
.wsm.mobile.show .wsm-panel { transform:none; }\
.wsm-head { flex:none; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:14px 14px 14px 24px; border-bottom:1px solid #EDE0FF; }\
.wsm-label { display:flex; align-items:center; gap:10px; font-weight:600; font-size:11px; letter-spacing:.3em; text-transform:uppercase; }\
.wsm-label i { width:16px; height:16px; background:#291647; -webkit-mask:url(motifs/fig-icon-search.svg) center / contain no-repeat; mask:url(motifs/fig-icon-search.svg) center / contain no-repeat; }\
.wsm-x { width:44px; height:44px; border:0; border-radius:5px; background:#C68EFD; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background-color .2s ease; }\
.wsm-x i { width:14px; height:14px; background:#291647; -webkit-mask:url(motifs/i-cross.svg) center / contain no-repeat; mask:url(motifs/i-cross.svg) center / contain no-repeat; transition:background-color .2s ease; }\
.wsm-x:hover { background:#291647; } .wsm-x:hover i { background:#FFFFFF; }\
.wsm-body { flex:1; min-height:0; overflow-y:auto; padding:40px 48px 24px; display:flex; flex-direction:column; gap:28px; scrollbar-width:thin; }\
.wsm.mobile .wsm-body { padding:28px 20px 20px; }\
.wsm-idle { margin:auto 0; display:flex; flex-direction:column; align-items:center; text-align:center; gap:16px; padding:24px 0; }\
.wsm-idle h2 { margin:0; font-family:'IvyPresto Display', serif; font-weight:400; font-size:52px; line-height:1.1; }\
.wsm.mobile .wsm-idle h2 { font-size:38px; }\
.wsm-idle p { margin:0; font-weight:500; font-size:17px; line-height:1.5; color:#5C358E; }\
.wsm-chips { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:8px; }\
.wsm-chip { height:40px; padding:0 16px; border:0; border-radius:5px; background:#F5F5F5; color:#291647; font:600 15px/1 Figtree, sans-serif; cursor:pointer; transition:background-color .2s ease; }\
.wsm-chip:hover { background:#C68EFD; }\
.wsm-chip.out { background:#FFFFFF; box-shadow:inset 0 0 0 1.5px #C68EFD; }\
.wsm-chip.out:hover { background:#C68EFD; }\
.wsm-a { display:flex; gap:16px; align-items:flex-start; }\
.wsm-av { flex:none; width:40px; height:40px; border-radius:50%; background:#291647; display:flex; align-items:center; justify-content:center; }\
.wsm-av i { width:18px; height:18px; background:#D4EF70; -webkit-mask:url(motifs/fig-star8-white.svg) center / contain no-repeat; mask:url(motifs/fig-star8-white.svg) center / contain no-repeat; }\
.wsm-a > div { flex:1; min-width:0; display:flex; flex-direction:column; gap:12px; }\
.wsm-lead { margin:0; font-family:'IvyPresto Display', serif; font-size:28px; line-height:1.2; }\
.wsm.mobile .wsm-lead { font-size:24px; }\
.wsm-p { margin:0; font-weight:500; font-size:16px; line-height:1.6; color:#3D2566; }\
.wsm-from { margin-top:6px; display:flex; flex-direction:column; gap:10px; }\
.wsm-from > span { font-weight:600; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:#5C358E; }\
.wsm-srcs { display:flex; flex-wrap:wrap; gap:8px; }\
.wsm-src { display:inline-flex; align-items:center; gap:8px; padding:10px 14px; border-radius:5px; background:#F5F5F5; color:#291647; text-decoration:none; font-weight:600; font-size:14px; line-height:1.2; transition:background-color .2s ease; }\
.wsm-src img { width:11px; height:11px; }\
.wsm-src:hover { background:#C68EFD; color:#291647 !important; }\
.wsm a:hover { color:#291647; }\
.wsm-dots { display:flex; gap:6px; padding-top:8px; }\
.wsm-dots span { width:8px; height:8px; border-radius:50%; background:#C68EFD; animation:wsm-dot 1s infinite ease-in-out; }\
.wsm-dots span:nth-child(2) { animation-delay:.15s; } .wsm-dots span:nth-child(3) { animation-delay:.3s; }\
@keyframes wsm-dot { 0%, 80%, 100% { opacity:.3; transform:translateY(0); } 40% { opacity:1; transform:translateY(-4px); } }\
.wsm-field { align-self:stretch; height:68px; border-radius:5px; box-shadow:inset 0 0 0 2px #291647; display:flex; align-items:center; gap:12px; padding:0 8px 0 22px; }\
.wsm-field:focus-within { box-shadow:inset 0 0 0 2px #291647, 0 0 0 3px #C68EFD; }\
.wsm-field > i { flex:none; width:18px; height:18px; background:#291647; -webkit-mask:url(motifs/fig-icon-search.svg) center / contain no-repeat; mask:url(motifs/fig-icon-search.svg) center / contain no-repeat; }\
.wsm-field input { flex:1; min-width:0; border:0; outline:0; background:transparent; font:500 19px Figtree, sans-serif; color:#291647; }\
.wsm-field input::placeholder { color:#5C358E; opacity:1; }\
.wsm-send { flex:none; width:44px; height:44px; border:0; border-radius:5px; background:#C68EFD; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background-color .2s ease; }\
.wsm-send img { width:20px; height:20px; transition:filter .2s ease; }\
.wsm-send:hover { background:#291647; } .wsm-send:hover img { filter:brightness(0) invert(1); }\
.wsm-hint { margin:-4px 0 0; font-weight:500; font-size:12px; color:#5C358E; }\
.wsm-search { width:100%; max-width:660px; margin:auto; display:flex; flex-direction:column; align-items:center; gap:18px; text-align:center; padding:12px 0; }\
.wsm-search .wsm-chips { margin-top:0; }\
.wsm.has-result .wsm-body { justify-content:flex-start; }\
.wsm.has-result .wsm-search { margin:0 auto; padding:0; gap:10px; }\
.wsm.has-result .wsm-intro, .wsm.has-result .wsm-search .wsm-chips { display:none; }\
.wsm-intro { display:flex; flex-direction:column; align-items:center; gap:14px; margin-bottom:10px; }\
.wsm-intro h2 { margin:0; font-family:'IvyPresto Display', serif; font-weight:400; font-size:52px; line-height:1.1; }\
.wsm.mobile .wsm-intro h2 { font-size:38px; }\
.wsm-intro p { margin:0; font-weight:500; font-size:17px; line-height:1.5; color:#5C358E; }\
.wsm-result { width:100%; max-width:660px; margin:0 auto; }\
.wsm-result:empty { display:none; }\
.wsm.mobile .wsm-hint { display:none; }\
[data-screen-label=\"Intro\"] > div > div:first-child, #intro .icard:first-child { cursor:pointer; }\
@media (prefers-reduced-motion: reduce) { .wsm-back, .wsm-panel { transition:none; } .wsm-dots span { animation:none; opacity:.7; } }\
";

  function esc(t) { var d = document.createElement('div'); d.textContent = t == null ? '' : String(t); return d.innerHTML; }
  // Extra everyday wording for each knowledge entry, by the entry's position (1 to 17)
  var EXTRA = {
    1: ['offer', 'grade', 'qualification', 'a level', 'btec', 'tariff', 'get in', 'need to get', 'entry'],
    2: ['deadline', 'project', 'portfolio', 'how am i marked', 'how am i assessed'],
    3: ['lecture', 'small class', 'class', 'tutor', 'contact time', 'days a week', 'how much teaching', 'workshop'],
    4: ['work placement', 'industry', 'employer', 'experience', 'year out', 'real world', 'placement year'],
    5: ['housing', 'house', 'flat', 'dorm', 'catered', 'self catered', 'en suite', 'ensuite', 'where to live', 'where will i live', 'residence', 'stay'],
    6: ['price', 'pay', 'paying', 'expensive', 'cheap', 'tuition fee', 'student finance', 'grant', 'cost of living', 'how much is it', 'how much does it cost', 'finance'],
    7: ['job', 'earn', 'earning', 'working', 'work while', 'part time work'],
    8: ['commuter', 'travel', 'transport', 'parking', 'car', 'from home', 'stay at home', 'live at home'],
    9: ['mature student', 'too old', 'adult', 'returning', 'change career', 'later in life', 'no qualification', 'still go to uni', 'still go to university', 'my age', 'age limit', 'older student', 'went back to study'],
    10: ['open evening', 'see the campus', 'come and see', 'visit day', 'campus visit', 'tours', 'open day date', 'when can i visit'],
    11: ['moving', 'move in', 'induction', 'first week', 'nervous', 'lonely', 'starting'],
    12: ['club', 'sport', 'activities', 'student union', 'union', 'hobby', 'make friends', 'nightlife', 'fun'],
    13: ['town', 'location', 'area', 'safe', 'safety', 'safest', 'near', 'nearby', 'what is winchester like'],
    14: ['didnt get', 'did not get', 'results', 'late application', 'no place', 'missed'],
    15: ['applying', 'how do i apply', 'when to apply', 'statement', 'reference', 'how to apply'],
    16: ['abroad', 'foreign', 'overseas student', 'english test', 'toefl', 'eu student', 'non uk'],
    17: ['counselling', 'anxiety', 'learning difference', 'dyspraxia', 'accessibility', 'wellness', 'stress', 'additional needs']
  };
  // Subject words that should bring up a subject overview
  var SUBJECT_WORDS = {
    'Psychology': ['psychology', 'psych', 'counselling psychology'],
    'Teaching': ['teaching', 'teacher', 'teach', 'education', 'primary', 'pgce', 'qts'],
    'Nursing': ['nursing', 'nurse', 'midwife', 'midwifery', 'health', 'social work', 'social care', 'care'],
    'Film and media': ['film', 'media', 'game', 'games', 'animation', 'digital', 'television', 'tv', 'photography', 'journalism']
  };
  var STOP = ['what','when','where','which','does','have','with','your','you','the','and','for','are','can','any','there','about','how','much','many','they','this','that','from','into','get','do','is','a','an','to','of','in','i','my','me','it','be','on','at','or','if','will','would','should','could','we','us','our','here','there','there'];
  function stem(w) {
    if (w.length > 5 && /ies$/.test(w)) return w.slice(0, -3) + 'y';
    if (w.length > 5 && /ing$/.test(w)) return w.slice(0, -3);
    if (w.length > 4 && /ed$/.test(w)) return w.slice(0, -2);
    if (w.length > 4 && /es$/.test(w) && !/ses$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
    return w;
  }
  function toks(t) { return String(t || '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9: ]/g, ' ').split(/\s+/).filter(Boolean).map(stem); }
  function near(a, b) {
    // one typo allowed on longer words
    if (a === b) return true;
    if (a.length < 5 || b.length < 5 || Math.abs(a.length - b.length) > 1) return false;
    var i = 0, j = 0, edits = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
    }
    return edits + (a.length - i) + (b.length - j) <= 1;
  }
  function hasPhrase(qt, phrase) {
    var pt = toks(phrase);
    if (!pt.length) return false;
    for (var i = 0; i + pt.length <= qt.length; i++) {
      var ok = true;
      for (var j = 0; j < pt.length; j++) if (!near(qt[i + j], pt[j])) { ok = false; break; }
      if (ok) return true;
    }
    return false;
  }
  function score(qt, entry, idx) {
    var sc = 0;
    entry.keys.concat(EXTRA[idx + 1] || []).forEach(function (k) { if (hasPhrase(qt, k)) sc += 2 * toks(k).length; });
    // weaker signal: query words that appear in the answer or its sources
    var hay = toks(entry.lead + ' ' + entry.body + ' ' + entry.sources.map(function (s) { return s.title; }).join(' '));
    var content = qt.filter(function (w) { return STOP.indexOf(w) < 0 && w.length > 2; });
    var seen = {};
    content.forEach(function (w) { if (!seen[w] && hay.indexOf(w) > -1) { seen[w] = 1; sc += 0.5; } });
    return sc;
  }
  function match(query) {
    var qt = toks(query), best = null, bestScore = 0;
    KNOWLEDGE.forEach(function (entry, i) { var sc = score(qt, entry, i); if (sc > bestScore) { bestScore = sc; best = entry; } });
    return bestScore >= 2 ? best : null;
  }
  function matchSubject(query) {
    var qt = toks(query);
    return Object.keys(SUBJECT_WORDS).find(function (s) { return SUBJECT_WORDS[s].some(function (w) { return hasPhrase(qt, w); }); }) || null;
  }
  function allSources() { var seen = {}; KNOWLEDGE.forEach(function (k) { k.sources.forEach(function (s) { seen[s.title] = s; }); }); return seen; }
  function nearestSources(q) {
    var hit = match(q);
    if (hit) return { sources: hit.sources.slice(0, 3), drawn: true };
    var stop = ['what','when','where','which','does','have','with','your','you','the','and','for','are','can','any','there','about','how','much','many','they','this','that','from','into','get'];
    var terms = (String(q || '').toLowerCase().match(/[a-z]{3,}/g) || []).filter(function (w) { return stop.indexOf(w) < 0; });
    var scored = Object.keys(allSources()).map(function (t) {
      var src = allSources()[t], hay = (src.title + ' ' + src.path).toLowerCase(), score = 0;
      terms.forEach(function (w) { if (hay.indexOf(w) > -1) score += 2; else if (w.length > 4 && hay.indexOf(w.slice(0, Math.max(4, w.length - 2))) > -1) score += 1; });
      return { src: src, score: score };
    }).filter(function (x) { return x.score > 0; }).sort(function (a, b) { return b.score - a.score; });
    if (scored.length) return { sources: scored.slice(0, 2).map(function (x) { return x.src; }), drawn: false };
    return { sources: [{ title: 'Browse Undergraduate Degrees', path: 'Study / Undergraduate / Courses' }, { title: 'Ask a question', path: 'Study / Ask a question' }], drawn: false };
  }
  function fallback(q) {
    var hit = match(q), subj = matchSubject(q), qt = toks(q);
    // a subject question gets the subject overview, unless it's about something specific (fees, entry requirements...)
    var specific = hit ? score(qt, hit, KNOWLEDGE.indexOf(hit)) : 0;
    if (subj && specific < 4) { var a = SUBJECTS[subj]; return { role: 'bot', lead: a.lead, body: a.body, body2: a.body2, sources: a.sources }; }
    return hit ? { role: 'bot', lead: hit.lead, body: hit.body, body2: hit.body2, sources: hit.sources }
      : { role: 'bot', kind: 'clarify', lead: 'I want to get this right rather than guess.', body: 'I can half-answer that from a couple of different pages, and they would send you to different places. Which of these is closest?', body2: '' };
  }
  function corpus() {
    return KNOWLEDGE.map(function (k, i) { return 'PAGE ' + (i + 1) + '\n' + k.lead + '\n' + k.body + '\n' + k.body2 + '\nSources: ' + k.sources.map(function (s) { return s.title + ' (' + s.path + ')'; }).join(' | '); }).join('\n\n');
  }
  function generate(q, history) {
    // Live answers when Claude is available (inside Claude Design); the prototype's answers otherwise
    if (!(window.claude && window.claude.complete)) return new Promise(function (r) { setTimeout(function () { r(fallback(q)); }, 900); });
    var system = ['You answer questions for prospective students on the University of Winchester website.',
      'Answer ONLY from the page content below. Never invent facts, figures, dates or course names.',
      'Voice: warm, direct, human. Short confident sentences. British English. No bullet points, no headings, no markdown.', '',
      'Reply with JSON only, no code fence:',
      '{"lead": "one short sentence answering the question directly",', ' "body": "two or three sentences of detail",', ' "body2": "one closing sentence, or empty string",', ' "sources": ["exact source titles used"],', ' "clarify": false,', ' "options": []}', '',
      'If the question is too vague to answer well, or the content would send them to different places depending on what they meant, instead reply with clarify true, lead as a short line saying you want to get it right, body as the clarifying question, sources as an empty array, and options as two to four short answer choices (four words maximum each).',
      'ALWAYS return at least one source, and two or three where they are relevant. Use the exact source titles from the page content. Only return an empty sources array if you are asking a clarifying question.',
      'If the content genuinely does not cover it, say so plainly in lead and body, then still return the closest one or two source titles so they have somewhere to start.', '', 'PAGE CONTENT', corpus()].join('\n');
    var messages = history.slice(-6).map(function (m) { return { role: m.role === 'user' ? 'user' : 'assistant', content: m.role === 'user' ? m.text : [m.lead, m.body, m.body2].filter(Boolean).join(' ') }; });
    return window.claude.complete({ system: system, messages: messages, max_tokens: 700 }).then(function (raw) {
      var json = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)), lib = allSources();
      var sources = (json.sources || []).map(function (t) { return lib[t] || Object.keys(lib).map(function (k) { return lib[k]; }).find(function (s) { return s.title.toLowerCase() === String(t).toLowerCase(); }); }).filter(Boolean);
      if (json.clarify) return { role: 'bot', kind: 'clarify', lead: json.lead || 'I want to get this right rather than guess.', body: json.body || '', body2: '', options: (json.options || []).slice(0, 4) };
      var near = nearestSources(q);
      return { role: 'bot', lead: json.lead || '', body: json.body || '', body2: json.body2 || '', sources: sources.length ? sources : near.sources, drawnFrom: sources.length ? true : near.drawn };
    }).catch(function () { return fallback(q); });
  }

  var root, body, input, result, mode = 'ask', answer = null, thinking = false, token = 0, lastFocus = null;
  function build(container, mobile) {
    if (!document.getElementById('wsm-css')) { var st = document.createElement('style'); st.id = 'wsm-css'; st.textContent = CSS; document.head.appendChild(st); }
    root = document.createElement('div');
    root.className = 'wsm' + (mobile ? ' mobile' : '');
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Ask us anything');
    root.innerHTML = '<div class="wsm-back" data-wsm-close></div><div class="wsm-panel">' +
      '<div class="wsm-head"><span class="wsm-label"><i aria-hidden="true"></i>Ask us anything</span><button class="wsm-x" data-wsm-close aria-label="Close search"><i aria-hidden="true"></i></button></div>' +
      '<div class="wsm-body"><div class="wsm-search"><div class="wsm-intro"><h2></h2><p></p></div>' +
      '<div class="wsm-field"><input type="search" placeholder="' + (mobile ? 'Ask us anything' : 'Ask us anything about studying here') + '" aria-label="Ask us anything"><button class="wsm-send" aria-label="Search"><img src="motifs/fig-icon-search.svg" alt=""></button></div>' +
      '<p class="wsm-hint">Press Enter to search · Esc to close · answers are drawn from pages on this site</p>' +
      '<div class="wsm-chips"></div></div><div class="wsm-result" aria-live="polite"></div></div></div>';
    container.appendChild(root);
    body = root.querySelector('.wsm-body'); input = root.querySelector('input'); result = root.querySelector('.wsm-result');
    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-wsm-close]')) { close(); return; }
      var c = e.target.closest('[data-wsm-ask]'); if (c) { ask(c.getAttribute('data-wsm-ask')); return; }
      var s = e.target.closest('[data-wsm-subject]'); if (s) { askSubject(s.getAttribute('data-wsm-subject')); return; }
      if (e.target.closest('.wsm-send')) ask(input.value);
      if (e.target.closest('.wsm-src')) e.preventDefault();
    });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') ask(input.value); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('open')) close(); });
  }
  function renderIntro() {
    var t = TOPICS[mode];
    root.querySelector('.wsm-intro h2').innerHTML = t.heading;
    root.querySelector('.wsm-intro p').textContent = t.sub;
    root.querySelector('.wsm-search .wsm-chips').innerHTML = t.chips.map(function (c) {
      return c[1] ? '<button class="wsm-chip" data-wsm-ask="' + esc(c[1]) + '">' + esc(c[0]) + '</button>' : '<button class="wsm-chip" data-wsm-subject="' + esc(c[0]) + '">' + esc(c[0]) + '</button>';
    }).join('');
  }
  function render() {
    root.classList.toggle('has-result', thinking || !!answer);
    if (thinking) { result.innerHTML = '<div class="wsm-a" aria-label="Searching"><span class="wsm-dots"><span></span><span></span><span></span></span></div>'; return; }
    if (!answer) { result.innerHTML = ''; return; }
    var m = answer, h = '<div class="wsm-a"><div><p class="wsm-lead">' + esc(m.lead) + '</p>' +
      (m.body ? '<p class="wsm-p">' + esc(m.body) + '</p>' : '') + (m.body2 ? '<p class="wsm-p">' + esc(m.body2) + '</p>' : '');
    if (m.kind === 'clarify') {
      var opts = (m.options && m.options.length) ? m.options.map(function (o) { return [o, o]; }) : CLARIFY;
      h += '<div class="wsm-chips" style="justify-content:flex-start">' + opts.map(function (o) { return '<button class="wsm-chip out" data-wsm-ask="' + esc(o[1]) + '">' + esc(o[0]) + '</button>'; }).join('') + '</div>';
    } else if ((m.sources || []).length) {
      h += '<div class="wsm-from"><span>' + (m.drawnFrom === false ? 'Where to look next' : 'Taken from') + '</span><div class="wsm-srcs">' +
        m.sources.map(function (s) { return '<a href="#" class="wsm-src" title="' + esc(s.path) + '">' + esc(s.title) + '<img src="motifs/fig-icon-arrow-dark.svg" alt=""></a>'; }).join('') + '</div></div>';
    }
    result.innerHTML = h + '</div></div>';
    body.scrollTop = 0;
  }
  // One query, one generated answer: a new search replaces the previous one
  function ask(q) {
    q = String(q || '').trim(); if (!q) return;
    input.value = q; answer = null; thinking = true; render();
    var my = ++token;
    generate(q, [{ role: 'user', text: q }]).then(function (reply) { if (my !== token) return; thinking = false; answer = reply; render(); });
  }
  function askSubject(label) {
    var a = SUBJECTS[label]; if (!a) return ask(label);
    input.value = label + ' courses'; answer = null; thinking = true; render();
    var my = ++token;
    setTimeout(function () { if (my !== token) return; thinking = false; answer = { role: 'bot', lead: a.lead, body: a.body, body2: a.body2, sources: a.sources }; render(); }, 900);
  }
  var host = null, deviceEl = null;
  function place() {
    // keep the desktop layer over the device frame, which the page scales to fit the window
    if (!host) return;
    // the runtime can replace the frame element, so look it up fresh each time
    deviceEl = document.querySelector('[data-name="Device"]') || deviceEl;
    var r = deviceEl.getBoundingClientRect(), k = r.width / 1280;
    if (!k) return;
    host.style.left = r.left + 'px'; host.style.top = r.top + 'px'; host.style.transform = 'scale(' + k + ')';
  }
  function open(m) {
    mode = m === 'study' ? 'study' : 'ask'; answer = null; thinking = false; token++; input.value = ''; renderIntro();
    place();
    lastFocus = document.activeElement;
    render(); root.classList.add('open');
    requestAnimationFrame(function () { root.classList.add('show'); });
    setTimeout(function () { root.classList.add('show'); try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); } }, 30);
  }
  function close() {
    root.classList.remove('show'); token++;
    setTimeout(function () { root.classList.remove('open'); }, 320);
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
  }

  // Wire up the page: "Ask us anything" opens the question mode, "What do you want to study?" the subject mode
  function init() {
    var mobile = !!document.getElementById('vp'), container;
    if (mobile) container = document.getElementById('device');
    else {
      // The desktop page's runtime re-renders the device frame, so the modal lives on <body>, laid over the frame
      deviceEl = document.querySelector('[data-name="Device"]');
      if (!deviceEl) { setTimeout(init, 200); return; }
      host = document.createElement('div'); host.className = 'wsm-host'; document.body.appendChild(host); container = host;
      addEventListener('resize', place); place();
    }
    if (!container) { setTimeout(init, 200); return; }
    build(container, mobile);
    document.addEventListener('click', function (e) {
      if (root.contains(e.target)) return;
      // the whole "Search for a course" card opens the search, not just its button
      var card = e.target.closest && e.target.closest(CARD);
      if (card && /What do you want to study\?/.test(card.textContent)) { e.preventDefault(); e.stopPropagation(); open('study'); return; }
      var t = e.target.closest && e.target.closest('[data-nav-ask], button[aria-label="Ask us anything"], a, button');
      if (!t) return;
      var text = (t.textContent || '').trim();
      var isAsk = t.hasAttribute('data-nav-ask') || t.getAttribute('aria-label') === 'Ask us anything';
      var isStudy = /^What do you want to study\?/.test(text);
      if (!isAsk && !isStudy) return;
      e.preventDefault(); e.stopPropagation();
      open(isStudy ? 'study' : 'ask');
    }, true);
    window.WncSearch = { open: open, close: close };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
