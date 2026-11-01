{"@context":"https://schema.org","@graph":[
 {"@type":"Organization","@id":"https://sickmotionz.pages.dev/#org","name":"SickMotionz","url":"https://sickmotionz.pages.dev/","logo":"https://sickmotionz.pages.dev/img/og.png","email":"sickmotionz24@gmail.com"},
 {"@type":"WebSite","@id":"https://sickmotionz.pages.dev/#site","name":"SickMotionz","alternateName":["SickMotionz Toolbox","SickMotionz Toolbox Pro"],"url":"https://sickmotionz.pages.dev/","publisher":{"@id":"https://sickmotionz.pages.dev/#org"}},
 {"@type":"SoftwareApplication","name":"SickMotionz Toolbox Pro","alternateName":"SickMotionz Toolbox","applicationCategory":"MultimediaApplication","operatingSystem":"macOS, Windows","description":"39 editing tools inside Adobe Premiere Pro: captions, silence remover, text behind subject, Draggly, Pin to Mask, split screens, smooth zooms, multicam and more.","offers":{"@type":"Offer","price":"10","priceCurrency":"USD"}},
 {"@type":"SoftwareApplication","name":"CapWiz By SickMotionz","applicationCategory":"MultimediaApplication","operatingSystem":"macOS, Windows","description":"Word-by-word animated captions for Adobe Premiere Pro.","offers":{"@type":"Offer","price":"5","priceCurrency":"USD"}}
]}

/* ===== INLINE JAVASCRIPT ===== */

var LINKS = { gumroad: 'https://motionzzy.gumroad.com/l/smtbpro', selar: 'https://selar.com/95154s9175', capwiz_gumroad: 'https://motionzzy.gumroad.com/l/fmohag', capwiz_selar: 'https://selar.com/s3ibk29h67', support: 'mailto:sickmotionz24@gmail.com' };
document.querySelectorAll('[data-buy]').forEach(function (a) { a.href = LINKS[a.getAttribute('data-buy')] || '#pricing'; a.target = '_blank'; a.rel = 'noopener'; });
document.getElementById('mail').href = LINKS.support;
document.getElementById('yr').textContent = new Date().getFullYear();
document.getElementById('capwiz').addEventListener('click', function (e) { e.preventDefault(); window.open(LINKS.capwiz_gumroad, '_blank', 'noopener'); });

// badge words rotate like a ticker
(function () { var w = ['macOS and Windows', 'Pay once', 'Made by an editor', 'Free updates'], i = 0, el = document.getElementById('rot');
  setInterval(function () { i = (i + 1) % w.length; el.textContent = w[i]; }, 2200); })();

var FAQ = [
  ['Which versions of Premiere Pro does it work with?', 'Premiere Pro 2023 (version 23) and newer, on Mac and Windows. 2025 or newer is best.'],
  ['Is it a subscription?', 'No. You pay $10 once and every update is free — new tools land in your panel automatically.'],
  ['What is the Max tab?', 'Our newest power tools: CapWiz word captions, Text Behind Subject, Smooth zooms, Draggly and Pin to Mask, with step-by-step guides. Included with Toolbox Pro.'],
  ['Do captions need the internet?', 'No. Transcription runs on your own computer, so your audio is never uploaded and there are no credits or limits.'],
  ['How many computers can I use?', 'Two. You can move your licence to a new computer whenever you like.'],
  ['How do I install it?', 'After buying you get the installer for your system and a short guide. It takes a few minutes, then the panel opens in Premiere under Window › Extensions.']
];
document.getElementById('faqlist').innerHTML = FAQ.map(function (f) { return '<div class="q rv"><button>' + f[0] + '<span>+</span></button><div>' + f[1] + '</div></div>'; }).join('');
document.getElementById('faqlist').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) b.parentNode.classList.toggle('open'); });

// Draggly card: the handle slides along its rail
(function () { var h = document.getElementById('dgH'), l = document.getElementById('dgL'), c = document.getElementById('dgCurve'), t0 = performance.now();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  (function f(now) { var p = (Math.sin((now - t0) / 900) + 1) / 2, x = 50 + p * 120;
    h.setAttribute('cx', x); l.setAttribute('x2', x); c.setAttribute('d', 'M30 130 C ' + x + ' 130, 150 40, 270 40'); requestAnimationFrame(f); })(t0); })();
// Pin to Mask card: the mask drifts and the word follows it
(function () { var g = document.getElementById('mkG'), t0 = performance.now();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { g.setAttribute('transform', 'translate(150 180)'); return; }
  (function f(now) { var s = (now - t0) / 1000, x = 150 + Math.sin(s * .9) * 60, y = 175 + Math.sin(s * 1.7) * 22;
    g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')'); requestAnimationFrame(f); })(t0); })();

// reveal on scroll; reels load only when they come near and play only while visible
var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 }) : null;
document.querySelectorAll('.rv').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });
var lazy = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (!e.isIntersecting) return; var f = e.target; f.src = f.getAttribute('data-src'); lazy.unobserve(f); });
}, { rootMargin: '400px' }) : null;
document.querySelectorAll('iframe[data-src]').forEach(function (f) {
  if (lazy) lazy.observe(f); else f.src = f.getAttribute('data-src');
  var only = f.getAttribute('data-only');
  if (only) f.addEventListener('load', function () { try { f.contentWindow.postMessage({ smreel: 'playlist', ids: [only] }, '*'); } catch (e) {} });
});
if ('IntersectionObserver' in window) {
  var vis = new IntersectionObserver(function (es) { es.forEach(function (e) { try { e.target.contentWindow.postMessage({ smreel: e.isIntersecting ? 'play' : 'pause' }, '*'); } catch (x) {} }); }, { threshold: .05 });
  document.querySelectorAll('.frame16 iframe').forEach(function (f) { vis.observe(f); });
}