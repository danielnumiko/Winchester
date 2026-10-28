/* "Ask us anything" search modal for the Round 3 pages (desktop and mobile).
   Built by tools/build_search.py: the answers and sources come from the Search and Discovery prototype.
   Inside Claude Design, answers are written live by Claude; elsewhere it uses the prototype's answers. */
(function () {
  var KNOWLEDGE = [
    {
      keys: ['msc psychology','psychology entry','entry requirement','entry requirements','requirements','2:2','conversion','grades','ucas points'],
      lead: "A 2:2 honours degree in psychology accredited by the BPS, plus a short statement about the research you want to do.",
      body: "If your degree is not in psychology, look at the conversion route instead: same department, one extra year, no assumed knowledge. For undergraduate courses typical offers sit in a range rather than at a single number, and we look at the whole application, not one grade.",
      body2: "Applications for September 2027 open in October. There is no interview for the taught MSc.",
      sources: [
        { title: "MSc Psychology — entry requirements", path: "Study / Postgraduate / Browse Postgraduate Degrees" },
        { title: "Conversion Courses", path: "Study / Postgraduate / Conversion Courses" },
        { title: "Entry requirements explained", path: "Study / How to apply" },
        { title: "How to apply", path: "Study / How to apply" }
      ]
    },
    {
      keys: ['assessment','exams','exam','coursework','marked','assessed','essays','dissertation','tests'],
      lead: "How you are assessed varies more between courses here than most people expect, and it is published for every one of them.",
      body: "Some courses are almost entirely coursework: essays, portfolios, reports, a final project. Others carry written exams, usually in January and May. Every course page lists the assessment mix year by year, so you can check before you apply rather than find out in week three.",
      body2: "If exams are the thing you dread, that is a legitimate reason to choose one course over another. Say it out loud when you visit and we will point you at the ones that suit.",
      sources: [
        { title: "How you will be assessed", path: "Study / Undergraduate / Teaching and assessment" },
        { title: "Browse Undergraduate Degrees", path: "Study / Undergraduate / Courses" },
        { title: "Academic skills", path: "Student Life / Student Support / Academic Success" }
      ]
    },
    {
      keys: ['teaching','contact hours','lectures','seminars','timetable','how many days','taught','class size','group size'],
      lead: "Teaching is a mix of lectures, seminars and workshops, and the balance is set by the subject rather than by us.",
      body: "Contact hours differ by course and year: [STAT: typical weekly contact hours by course and year]. Seminars are small enough to talk in, and most courses concentrate teaching into set days rather than spreading it thinly across the week. Timetables come out before term so you can plan work, travel or childcare around them.",
      body2: "If you need to know the teaching days before you commit, ask the course team directly. They will tell you.",
      sources: [
        { title: "Teaching and assessment", path: "Study / Undergraduate / Teaching and assessment" },
        { title: "Browse Undergraduate Degrees", path: "Study / Undergraduate / Courses" },
        { title: "Ask a question", path: "Study / Ask a question" }
      ]
    },
    {
      keys: ['placement','sandwich','work experience','internship','year in industry','practical','hands on'],
      lead: "Most subjects here offer a placement, and on some courses it is built into the degree rather than bolted on.",
      body: "Business, computing and digital courses run an optional paid placement year between years two and three. Health, education and social work courses carry placement hours in every year, arranged by the university rather than by you. Studio and lab subjects give you kit and space from first term instead of making you wait.",
      body2: "If doing the thing matters more to you than reading about it, filter by study mode — the placement option is marked on each course page.",
      sources: [
        { title: "Browse Undergraduate Degrees", path: "Study / Undergraduate / Courses" },
        { title: "Your employability toolkit", path: "Student Life / Careers Support and Advice" },
        { title: "Degree Apprenticeships", path: "Study / Apprenticeships" }
      ]
    },
    {
      keys: ['accommodation','halls','rent','live','living','student village','room','where would i live'],
      lead: "Every first year who applies by 31 July is guaranteed a room, across three student villages.",
      body: "Burma Road, Queen's Road and West Downs all sit within a fifteen-minute walk of teaching. Catered and self-catered options are both available. Rent runs to roughly [STAT: rent range per week by village and room type] and is charged by village and room type rather than by course.",
      body2: "Applications for accommodation open after you accept your offer, not before.",
      sources: [
        { title: "Our Accommodation Guarantee", path: "Student Life / Accommodation / Our guarantee" },
        { title: "Accommodation costs", path: "Student Life / Accommodation / Costs" },
        { title: "How to apply for accommodation", path: "Student Life / Accommodation / How to apply" }
      ]
    },
    {
      keys: ['cost','costs','fee','fees','total','afford','budget','money','funding','bursary','scholarship','loan','tuition','how much'],
      lead: "Here is the whole number, not just the tuition fee.",
      body: "Tuition is [STAT: annual undergraduate tuition fee], covered by a student loan for most UK applicants. Accommodation is [STAT: rent range per week by village] over a [STAT: contract length in weeks] contract. Living costs — food, travel, phone, going out — come to roughly [STAT: estimated weekly living costs]. Course extras like kit, materials, trips or a DBS check add [STAT: typical course extras by subject], and every course page lists its own.",
      body2: "Against that, scholarships and bursaries are separate from the loan and some are automatic once you meet the criteria. Check the awards list before you apply — a few close early.",
      sources: [
        { title: "Tuition fees and funding", path: "Study / Fees and funding" },
        { title: "Scholarships, Bursaries and Awards", path: "Student Life / Scholarships, bursaries and awards" },
        { title: "Accommodation costs", path: "Student Life / Accommodation / Costs" },
        { title: "Students and money", path: "Student Life / Students and money" }
      ]
    },
    {
      keys: ['work part time','part time job','job alongside','work alongside','can i work','hours'],
      lead: "Most students here work part-time, and the timetable is built to make that possible.",
      body: "Teaching is concentrated into set days, so you can hold shifts around it once you know your timetable. The guidance is [STAT: recommended maximum weekly paid hours alongside full-time study], and the jobs service advertises campus and city work that already knows you are studying.",
      body2: "Placement-heavy courses — nursing, teaching, social work — are harder to work around, because the placement blocks are fixed. Worth knowing before you choose.",
      sources: [
        { title: "Student jobs", path: "Student Life / Careers Support and Advice" },
        { title: "Students and money", path: "Student Life / Students and money" },
        { title: "Teaching and assessment", path: "Study / Undergraduate / Teaching and assessment" }
      ]
    },
    {
      keys: ['commute','commuting','living at home','travel in','bus','train','drive','local'],
      lead: "Living at home works here, and a good number of students do it.",
      body: "Teaching is concentrated into set days rather than scattered across five, so you are not travelling in for a single hour. Winchester station is a walk from the King Alfred campus, buses run to both sites, and parking is limited enough that most commuters use one or the other. Check the teaching days for your course before you decide — they vary.",
      body2: "There is a room on campus for commuters to work between classes. You do not have to sit in a corridor.",
      sources: [
        { title: "Commuting students", path: "Student Life / Commuting students" },
        { title: "Getting here", path: "Visit us / Getting here" },
        { title: "Teaching and assessment", path: "Study / Undergraduate / Teaching and assessment" }
      ]
    },
    {
      keys: ['mature','older','career change','coming back','return to study','access course','second degree'],
      lead: "You do not need the usual qualifications. Experience counts, and there is a separate route for people returning to study.",
      body: "Mature applicants are considered on the whole application — work history, an Access course, or a strong personal statement can stand in for A levels. There is an evening event each November specifically for people applying later, and the Academic Pathways Programme runs extra teaching before you start if you want it.",
      body2: "If you are unsure whether your background is enough, ask rather than assume. Most people who ask turn out to be eligible.",
      sources: [
        { title: "Information for mature learners", path: "Study / Mature Students" },
        { title: "Academic Pathways Programme", path: "Study / Undergraduate / Pathways" },
        { title: "Ask a question", path: "Study / Ask a question" }
      ]
    },
    {
      keys: ['open day','open days','visit','campus tour','tour','look around','parent','parents'],
      lead: "The next undergraduate open day is Saturday 12 September, then 10 October, 7 November and 28 November.",
      body: "Open days run across the whole campus with subject talks, tours and accommodation viewings. Campus tours run most weeks in between, in smaller groups, if a full open day is too much. There is a separate talk for parents and supporters, covering money, safety and support, and you can go to it without your young person.",
      body2: "Bring whoever you need to bring. Most people bring one other person.",
      sources: [
        { title: "Undergraduate Open Days", path: "Visit us / On Campus Events / Open Days" },
        { title: "Campus Tours", path: "Visit us / Campus Tours" },
        { title: "Information for parents and supporters", path: "Study / Parents and supporters" }
      ]
    },
    {
      keys: ['settle','settling','doctor','gp','bank','dentist','optician','first week','arrive','arriving','freshers','homesick'],
      lead: "The practical first fortnight: register with a doctor, open a bank account, get a bus pass, find the launderette.",
      body: "The student centre runs a registration week that walks you through all of it, including the letter you need to open a bank account. There is a doctors' surgery a few minutes from the King Alfred campus, dentists and opticians in the city centre, and everything is close enough to walk to. Nothing here needs a car.",
      body2: "If you are arriving from outside the UK, the international team runs the same list with the extra steps you need.",
      sources: [
        { title: "Your first weeks", path: "Student Life / Welcome" },
        { title: "Health and wellbeing", path: "Student Life / Student Support / Wellbeing" },
        { title: "Getting here", path: "Visit us / Getting here" }
      ]
    },
    {
      keys: ['society','societies','clubs','community','friends','social','lgbt','faith','sport club','meet people'],
      lead: "There is a group for most things, and if there is not, six people and a form is all it takes to start one.",
      body: "The students' union runs societies across sport, faith, culture, gaming, performance, politics and course subjects — [STAT: number of active student societies]. There are LGBTQ+, international, mature student and commuter groups, a chaplaincy that serves several faiths and none, and volunteering projects across the city.",
      body2: "Most people find their group in the first month. Some take a year. Both are normal.",
      sources: [
        { title: "Student societies", path: "Student Life / Students' Union" },
        { title: "Sport and fitness", path: "Student Life / Sport" },
        { title: "Faith and chaplaincy", path: "Student Life / Student Support / Chaplaincy" }
      ]
    },
    {
      keys: ['winchester','the city','city','where is','london','south coast','how far','place','walkable'],
      lead: "Winchester is small on purpose: you can cross the city on foot in about twenty minutes.",
      body: "London is roughly an hour by train from a station you can walk to. Southampton and the coast are under half an hour. The campus itself is fifteen minutes end to end, so you are not timetabling your day around a bus between buildings. The city has a cathedral, a weekly market, more bookshops than sense and a river running through the middle of it.",
      body2: "It is a city that rewards walking. That is either the appeal or it is not.",
      sources: [
        { title: "Life in Winchester", path: "Student Life / Life in Winchester" },
        { title: "Getting here", path: "Visit us / Getting here" },
        { title: "Virtual Tour", path: "Visit us / Virtual Tour" }
      ]
    },
    {
      keys: ['clearing','results day','missed my grades','no offer'],
      lead: "Clearing is open, and the guaranteed room still applies to first years who come through it.",
      body: "You can call and talk to a subject tutor rather than a call handler. If your grades are not what you expected, a course you had not considered is often the better conversation.",
      body2: "Have your UCAS ID and your results to hand when you call.",
      sources: [
        { title: "Clearing", path: "Clearing" },
        { title: "Guaranteed accommodation in Clearing", path: "Student Life / Accommodation" },
        { title: "Ask a question", path: "Study / Ask a question" }
      ]
    },
    {
      keys: ['apply','application','ucas','deadline','personal statement'],
      lead: "Undergraduate applications go through UCAS; postgraduate ones come straight to us.",
      body: "The UCAS equal consideration deadline is in January, but we accept applications after it while courses have places. Postgraduate applications for September 2027 open in October, and most taught courses have no interview.",
      body2: "Your personal statement matters here. Write the honest reason, not the one you think we want.",
      sources: [
        { title: "How to apply", path: "Study / How to apply" },
        { title: "Apply after the UCAS deadline", path: "Study / Undergraduate / Apply after deadline" },
        { title: "Browse Postgraduate Degrees", path: "Study / Postgraduate / Courses" }
      ]
    },
    {
      keys: ['international','visa','overseas','ielts','english language','from abroad','agent'],
      lead: "One thing to know up front: international applications are handled by our partner rather than by Winchester directly.",
      body: "You apply through their site, and they handle your offer, your CAS and your visa paperwork. It is a different journey from the UK one, so if you have been sent between the two, that is why. Entry requirements are listed by country so your own qualifications are compared directly, and most courses need IELTS 6.5 with nothing below 6.0.",
      body2: "International scholarships and accommodation discounts exist and are separate from the UK awards — check them before you accept, not after. Apply earlier than you think you need to: the visa takes longer than the offer.",
      sources: [
        { title: "International entry requirements", path: "International / International entry requirements" },
        { title: "Applying as an international student", path: "International / How to apply" },
        { title: "International scholarships", path: "International / Scholarships and discounts" },
        { title: "Visa Information", path: "International / Visa information" }
      ]
    },
    {
      keys: ['support','wellbeing','mental health','disability','help','struggling','dyslexia','adjustments','neurodivergent','adhd','autism'],
      lead: "Support here is a service you book, not a favour you ask for.",
      body: "Student wellbeing runs drop-ins and booked appointments. Academic skills support is free for all three years. Study adjustments — extra time, recordings, alternative assessment formats, assistive software — are arranged through the student centre and can be in place before you arrive rather than after you struggle.",
      body2: "Telling us early changes what we can put in place. It does not affect your offer.",
      sources: [
        { title: "Student wellbeing", path: "Student Life / Student Support / Wellbeing" },
        { title: "Study adjustments and disability support", path: "Student Life / Student Support / Disability" },
        { title: "Academic skills", path: "Student Life / Student Support / Academic Success" }
      ]
    }
  ];
  var SUBJECTS = {
    'Psychology': {
      lead: "Psychology here runs across three courses, from a BPS-accredited degree to a one-year conversion Masters.",
      body: "BSc (Hons) Psychology is the core route, BPS accredited, with your own supervised research project in the final year. BSc (Hons) Psychology with Counselling adds practice skills taught in small groups and supervised placement hours. MSc Applied Psychology is one year and built for people arriving from another subject.",
      body2: "Every course page sets out entry requirements, assessment and fees year by year.",
      sources: [
        { title: "Psychology courses", path: "Study / Courses / Psychology" },
        { title: "Browse Undergraduate Degrees", path: "Study / Undergraduate" },
        { title: "Browse Postgraduate Degrees", path: "Study / Postgraduate" }
      ]
    },
    'Teaching': {
      lead: "There are three ways into teaching here, depending on whether you already have a degree.",
      body: "BA (Hons) Primary Education with QTS puts you in schools from year one, and you leave qualified, not just graduated. BA (Hons) Education Studies looks at the why behind the classroom: policy, inclusion and how children actually learn. If you already have a degree, the PGCE Primary and Secondary is one year, mostly spent in school.",
      body2: "Each course page lists placements, entry requirements and funding.",
      sources: [
        { title: "Teaching and education courses", path: "Study / Courses / Education and Teaching" },
        { title: "Browse Undergraduate Degrees", path: "Study / Undergraduate" },
        { title: "Browse Postgraduate Degrees", path: "Study / Postgraduate" }
      ]
    },
    'Nursing': {
      lead: "Nursing sits alongside social work and health courses, all built around real placements.",
      body: "BSc (Hons) Adult Nursing starts in the simulation suite, with real placements from year one and NMC registration at the end. BA (Hons) Social Work has two long placement blocks on fixed dates you can plan around. BSc (Hons) Health and Wellbeing covers community health without the clinical route, strong on policy and prevention.",
      body2: "Placement blocks are fixed on these courses, so check the dates on each course page before you apply.",
      sources: [
        { title: "Nursing, health and social care courses", path: "Study / Courses / Nursing, Health and Social Care" },
        { title: "Browse Undergraduate Degrees", path: "Study / Undergraduate" }
      ]
    },
    'Film and media': {
      lead: "Film and media covers three making-led courses, all with studio and kit access from the first term.",
      body: "BA (Hons) Film Production has you shooting in your first term, taking full crew roles on industry kit and finishing a film each year. BA (Hons) Game Design means playable builds every module and playtesting with strangers. BA (Hons) Sound and Music Production gives you live rooms and studios you book yourself.",
      body2: "Course pages show the facilities, assessment mix and entry requirements for each.",
      sources: [
        { title: "Film, media and digital arts courses", path: "Study / Courses / Film, Media and Digital Arts" },
        { title: "Browse Undergraduate Degrees", path: "Study / Undergraduate" }
      ]
    }
  };
  var TOPICS = {
    ask: { label: 'Ask us anything', heading: 'What do you want to <em>know</em>?', sub: 'Ask in your own words, or start somewhere.',
      chips: [['Courses', 'What courses have a placement year?'], ['Fees', 'What does it actually cost, all in?'], ['Accommodation', 'Where would I live in first year?'], ['Clearing', 'How does Clearing work here?']] },
    study: { label: 'Ask us anything', heading: 'What do you want to <em>study</em>?', sub: 'Name it if you know it, or start somewhere near.',
      chips: [['Psychology', null], ['Teaching', null], ['Nursing', null], ['Film and media', null]] }
  };
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
.wsm-q { align-self:flex-end; max-width:78%; padding:14px 18px; border-radius:15px 15px 4px 15px; background:#291647; color:#FFFFFF; font-weight:500; font-size:16px; line-height:1.45; }\
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
.wsm-src:hover { background:#C68EFD; }\
.wsm-dots { display:flex; gap:6px; padding-top:16px; }\
.wsm-dots span { width:8px; height:8px; border-radius:50%; background:#C68EFD; animation:wsm-dot 1s infinite ease-in-out; }\
.wsm-dots span:nth-child(2) { animation-delay:.15s; } .wsm-dots span:nth-child(3) { animation-delay:.3s; }\
@keyframes wsm-dot { 0%, 80%, 100% { opacity:.3; transform:translateY(0); } 40% { opacity:1; transform:translateY(-4px); } }\
.wsm-foot { flex:none; padding:16px 48px 22px; border-top:1px solid #EDE0FF; }\
.wsm.mobile .wsm-foot { padding:12px 16px 16px; }\
.wsm-field { height:60px; border-radius:5px; box-shadow:inset 0 0 0 2px #291647; display:flex; align-items:center; gap:12px; padding:0 8px 0 18px; }\
.wsm-field:focus-within { box-shadow:inset 0 0 0 2px #291647, 0 0 0 3px #C68EFD; }\
.wsm-field > i { flex:none; width:18px; height:18px; background:#291647; -webkit-mask:url(motifs/fig-icon-search.svg) center / contain no-repeat; mask:url(motifs/fig-icon-search.svg) center / contain no-repeat; }\
.wsm-field input { flex:1; min-width:0; border:0; outline:0; background:transparent; font:500 17px Figtree, sans-serif; color:#291647; }\
.wsm-field input::placeholder { color:#5C358E; opacity:1; }\
.wsm-send { flex:none; width:44px; height:44px; border:0; border-radius:5px; background:#C68EFD; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background-color .2s ease; }\
.wsm-send img { width:14px; height:14px; transition:filter .2s ease; }\
.wsm-send:hover { background:#291647; } .wsm-send:hover img { filter:brightness(0) invert(1); }\
.wsm-hint { margin:10px 0 0; font-weight:500; font-size:12px; color:#5C358E; }\
.wsm.mobile .wsm-hint { display:none; }\
@media (prefers-reduced-motion: reduce) { .wsm-back, .wsm-panel { transition:none; } .wsm-dots span { animation:none; opacity:.7; } }\
";

  function esc(t) { var d = document.createElement('div'); d.textContent = t == null ? '' : String(t); return d.innerHTML; }
  function match(query) {
    var q = ' ' + (query || '').toLowerCase().replace(/[^a-z0-9: ]/g, ' ') + ' ', best = null, bestScore = 0;
    KNOWLEDGE.forEach(function (entry) {
      var score = 0;
      entry.keys.forEach(function (k) { if (q.indexOf(' ' + k) > -1 || q.indexOf(k + ' ') > -1) score += k.split(' ').length; });
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    return bestScore > 0 ? best : null;
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
    var hit = match(q);
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

  var root, body, input, mode = 'ask', thread = [], thinking = false, token = 0, lastFocus = null;
  function build(container, mobile) {
    if (!document.getElementById('wsm-css')) { var st = document.createElement('style'); st.id = 'wsm-css'; st.textContent = CSS; document.head.appendChild(st); }
    root = document.createElement('div');
    root.className = 'wsm' + (mobile ? ' mobile' : '');
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Ask us anything');
    root.innerHTML = '<div class="wsm-back" data-wsm-close></div><div class="wsm-panel">' +
      '<div class="wsm-head"><span class="wsm-label"><i aria-hidden="true"></i>Ask us anything</span><button class="wsm-x" data-wsm-close aria-label="Close search"><i aria-hidden="true"></i></button></div>' +
      '<div class="wsm-body" aria-live="polite"></div>' +
      '<div class="wsm-foot"><div class="wsm-field"><i aria-hidden="true"></i><input type="text" placeholder="Write a message" aria-label="Ask us anything"><button class="wsm-send" aria-label="Ask"><img src="motifs/fig-icon-arrow-dark.svg" alt=""></button></div>' +
      '<p class="wsm-hint">Press Enter to ask · Esc to close · answers are drawn from pages on this site</p></div></div>';
    container.appendChild(root);
    body = root.querySelector('.wsm-body'); input = root.querySelector('input');
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
  function render() {
    var h = '';
    if (!thread.length && !thinking) {
      var t = TOPICS[mode];
      h += '<div class="wsm-idle"><h2>' + t.heading + '</h2><p>' + esc(t.sub) + '</p><div class="wsm-chips">' +
        t.chips.map(function (c) { return c[1] ? '<button class="wsm-chip" data-wsm-ask="' + esc(c[1]) + '">' + esc(c[0]) + '</button>' : '<button class="wsm-chip" data-wsm-subject="' + esc(c[0]) + '">' + esc(c[0]) + '</button>'; }).join('') + '</div></div>';
    }
    thread.forEach(function (m) {
      if (m.role === 'user') { h += '<div class="wsm-q">' + esc(m.text) + '</div>'; return; }
      h += '<div class="wsm-a"><span class="wsm-av" aria-hidden="true"><i></i></span><div><p class="wsm-lead">' + esc(m.lead) + '</p>' +
        (m.body ? '<p class="wsm-p">' + esc(m.body) + '</p>' : '') + (m.body2 ? '<p class="wsm-p">' + esc(m.body2) + '</p>' : '');
      if (m.kind === 'clarify') {
        var opts = (m.options && m.options.length) ? m.options.map(function (o) { return [o, o]; }) : CLARIFY;
        h += '<div class="wsm-chips" style="justify-content:flex-start">' + opts.map(function (o) { return '<button class="wsm-chip out" data-wsm-ask="' + esc(o[1]) + '">' + esc(o[0]) + '</button>'; }).join('') + '</div>';
      } else if ((m.sources || []).length) {
        h += '<div class="wsm-from"><span>' + (m.drawnFrom === false ? 'Where to look next' : 'Taken from') + '</span><div class="wsm-srcs">' +
          m.sources.map(function (s) { return '<a href="#" class="wsm-src" title="' + esc(s.path) + '">' + esc(s.title) + '<img src="motifs/fig-icon-arrow-dark.svg" alt=""></a>'; }).join('') + '</div></div>';
      }
      h += '</div></div>';
    });
    if (thinking) h += '<div class="wsm-a" aria-label="Thinking"><span class="wsm-av" aria-hidden="true"><i></i></span><span class="wsm-dots"><span></span><span></span><span></span></span></div>';
    body.innerHTML = h;
    body.scrollTop = body.scrollHeight;
  }
  function ask(q) {
    q = String(q || '').trim(); if (!q || thinking) return;
    input.value = '';
    thread.push({ role: 'user', text: q }); thinking = true; render();
    var my = ++token;
    generate(q, thread.slice()).then(function (reply) { if (my !== token) return; thinking = false; thread.push(reply); render(); });
  }
  function askSubject(label) {
    var a = SUBJECTS[label]; if (!a) return ask(label);
    thread.push({ role: 'user', text: label + ' courses' }); thinking = true; render();
    var my = ++token;
    setTimeout(function () { if (my !== token) return; thinking = false; thread.push({ role: 'bot', lead: a.lead, body: a.body, body2: a.body2, sources: a.sources }); render(); }, 900);
  }
  var host = null, deviceEl = null;
  function place() {
    // keep the desktop layer over the device frame, which the page scales to fit the window
    if (!host || !deviceEl) return;
    var r = deviceEl.getBoundingClientRect(), k = r.width / 1280;
    host.style.left = r.left + 'px'; host.style.top = r.top + 'px'; host.style.transform = 'scale(' + k + ')';
  }
  function open(m) {
    mode = m === 'study' ? 'study' : 'ask'; thread = []; thinking = false; token++;
    place();
    lastFocus = document.activeElement;
    render(); root.classList.add('open');
    requestAnimationFrame(function () { root.classList.add('show'); });
    setTimeout(function () { root.classList.add('show'); try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); } }, 30);
  }
  function close() {
    root.classList.remove('show'); token++;
    deviceEl = deviceEl && document.querySelector('[data-name="Device"]');
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
