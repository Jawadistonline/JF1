// ── SHARED NAV ──
const NAV_HTML = `
<nav>
  <a class="nav-brand" href="../index.html">JAWAD // PLAN</a>
  <ul class="nav-links">
    <li><a href="../index.html">Start</a></li>
    <li><a href="woche.html">Wochenplan</a></li>
    <li><a href="training.html">Training</a></li>
    <li><a href="ernaehrung.html">Ernährung</a></li>
    <li><a href="einkauf.html">Einkauf</a></li>
    <li><a href="tracker.html">Tracker</a></li>
    <li><a href="diagramme.html">Diagramme</a></li>
  </ul>
</nav>`;

const NAV_HTML_ROOT = `
<nav>
  <a class="nav-brand" href="index.html">JAWAD // PLAN</a>
  <ul class="nav-links">
    <li><a href="index.html">Start</a></li>
    <li><a href="pages/woche.html">Wochenplan</a></li>
    <li><a href="pages/training.html">Training</a></li>
    <li><a href="pages/ernaehrung.html">Ernährung</a></li>
    <li><a href="pages/einkauf.html">Einkauf</a></li>
    <li><a href="pages/tracker.html">Tracker</a></li>
    <li><a href="pages/diagramme.html">Diagramme</a></li>
  </ul>
</nav>`;

function injectNav(isRoot = false) {
  document.body.insertAdjacentHTML('afterbegin', isRoot ? NAV_HTML_ROOT : NAV_HTML);
  // Mark active
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });
}

// ── FADE IN OBSERVER ──
function initFadeIn() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.05 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

// ── TAB SYSTEM ──
function initTabs(barSelector, paneSelector) {
  const btns = document.querySelectorAll(barSelector + ' .tab-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll(paneSelector).forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

// ── YT SVG ──
const YT_SVG = `<svg class="yt-icon" viewBox="0 0 24 24"><path d="M23.5 6.2s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.5 2 12 2 12 2s-4.5 0-7.3.1c-.6.1-1.9.1-3 1.3C.8 4.2.5 6.2.5 6.2S.2 8.5.2 10.8v2.1c0 2.3.3 4.6.3 4.6s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 21.7 12 21.8 12 21.8s4.5 0 7.3-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.6v-2.1c0-2.3-.3-4.6-.3-4.6zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/></svg>`;

function ytLink(url, label='Video') {
  return `<a class="yt-btn" href="${url}" target="_blank" rel="noopener">${YT_SVG} ${label}</a>`;
}

// ── FOOTER ──
const FOOTER_HTML = `
<footer>
  <span>Jawads Fitness & Ernährungsplan · April 2026</span>
  <span class="footer-accent">Bei Schmerzen: Physio konsultieren</span>
</footer>`;

function injectFooter() {
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
}

// ── LOCAL STORAGE TRACKER ──
const STORE_KEY = 'jawad_tracker_v1';

function getTrackerData() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch { return {}; }
}

function saveTrackerData(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function getDayEntry(dateKey) {
  const data = getTrackerData();
  return data[dateKey] || {};
}

function saveDayEntry(dateKey, entry) {
  const data = getTrackerData();
  data[dateKey] = { ...getDayEntry(dateKey), ...entry };
  saveTrackerData(data);
}

// ── GET ALL ENTRIES SORTED ──
function getAllEntries() {
  const data = getTrackerData();
  return Object.entries(data)
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([date, entry]) => ({ date, ...entry }));
}
