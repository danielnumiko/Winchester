/* Round 3: the hero film only plays while it's on screen and nothing is open over it
   (the site menu, the search modal, or another browser tab). */
(function () {
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  function film() { return document.querySelector('[data-name="Hero film"] video, #film video'); }
  function overlayOpen() { return document.documentElement.classList.contains('wnm-open') || !!document.querySelector('.wsm.open'); }
  function onScreen(v) {
    // how much of the film is inside its scrolling frame, not the browser window
    var r = v.getBoundingClientRect(), sc = v.closest('#vp, [data-name^="Viewport"]');
    var b = sc ? sc.getBoundingClientRect() : { top: 0, bottom: innerHeight };
    return Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top) > r.height * 0.15;
  }
  function check() {
    var v = film(); if (!v) return;
    var play = !document.hidden && !overlayOpen() && onScreen(v);
    if (play && v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    else if (!play && !v.paused) v.pause();
  }
  var raf = 0;
  document.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(check); }, true);
  document.addEventListener('wch:overlay', check);
  document.addEventListener('visibilitychange', check);
  setInterval(check, 500); // backstop: the desktop page re-renders the hero, and scroll events pause in background tabs
})();
