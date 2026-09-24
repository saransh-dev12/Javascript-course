// Color data lives in one simple list so the palette is easy to edit.
const colors = [
  { name: 'Obsidian', hex: '#171717' },
  { name: 'Porcelain', hex: '#F4F1EA' },
  { name: 'Cobalt', hex: '#315EEA' },
  { name: 'Solar', hex: '#F2C94C' },
  { name: 'Violet', hex: '#8055D8' },
  { name: 'Coral', hex: '#E96B55' },
  { name: 'Moss', hex: '#66836A' },
  { name: 'Glacier', hex: '#91C6D2' }
];

const body = document.body;
const paletteGrid = document.querySelector('#paletteGrid');
const stage = document.querySelector('#colorStage');
const toast = document.querySelector('.toast');
let selectedColor = colors[0];
let history = [];
let soundEnabled = false;
let themeDark = false;
let audioContext;
let toastTimer;
let cursorFrame = 0;
let pointer = { x: innerWidth / 2, y: innerHeight / 2 };
let cursor = { x: pointer.x, y: pointer.y };

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map(index => parseInt(value.slice(index, index + 2), 16));
}

function getContrastColor(hex) {
  const [r, g, b] = hexToRgb(hex).map(value => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.43 ? '#171717' : '#F4F1EA';
}

function getColorMetrics(hex) {
  const [r, g, b] = hexToRgb(hex);
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const delta = max - min;
  let hue = 0;
  if (delta) {
    if (max === r / 255) hue = ((g / 255 - b / 255) / delta) % 6;
    else if (max === g / 255) hue = (b / 255 - r / 255) / delta + 2;
    else hue = (r / 255 - g / 255) / delta + 4;
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }
  return { rgb: `RGB(${r}, ${g}, ${b})`, hue, saturation: max === 0 ? 0 : Math.round(delta / max * 100) };
}

function renderPalette() {
  paletteGrid.innerHTML = '';
  colors.forEach((color, index) => {
    const button = document.createElement('button');
    button.className = 'swatch';
    button.type = 'button';
    button.dataset.hex = color.hex;
    button.setAttribute('aria-label', `Select ${color.name}, ${color.hex}`);
    button.setAttribute('aria-pressed', String(color.hex === selectedColor.hex));
    button.innerHTML = `<span class="swatch-color" style="background:${color.hex}"></span><span class="swatch-active" aria-hidden="true"></span><span class="swatch-meta"><span class="swatch-name">${color.name.toUpperCase()}</span><span class="swatch-hex">${color.hex.toUpperCase()}</span></span>`;
    button.addEventListener('click', event => setColor(color, { source: event.currentTarget }));
    paletteGrid.append(button);
  });
  document.querySelector('#paletteCount').textContent = `${String(colors.length).padStart(2, '0')} SHADES`;
}

function updateColorInfo(color) {
  const metrics = getColorMetrics(color.hex);
  document.querySelector('#colorName').textContent = color.name.toUpperCase();
  document.querySelector('#hexValue').textContent = color.hex.toUpperCase();
  document.querySelector('#rgbValue').textContent = metrics.rgb;
  document.querySelector('#hueValue').textContent = `${metrics.hue}°`;
  document.querySelector('#satValue').textContent = `${metrics.saturation}%`;
  const knownIndex = colors.findIndex(item => item.hex === color.hex);
  document.querySelector('.stage-index').textContent = knownIndex < 0 ? 'COLOR —' : `COLOR ${String(knownIndex + 1).padStart(2, '0')}`;
  document.querySelectorAll('.swatch').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.hex === color.hex));
  });
}

function setColor(color, options = {}) {
  selectedColor = color;
  const contrast = getContrastColor(color.hex);
  body.style.setProperty('--page-color', color.hex);
  body.style.setProperty('--page-ink', contrast);
  body.style.setProperty('--paper', themeDark ? '#171717' : color.hex);
  body.style.setProperty('--ink', themeDark ? '#F4F1EA' : contrast);
  body.style.setProperty('--scene', color.hex);
  body.style.setProperty('--scene-ink', contrast);
  body.style.setProperty('--accent', contrast === '#171717' ? '#C34E34' : '#F28A68');
  body.style.backgroundColor = color.hex;
  stage.style.backgroundColor = color.hex;
  stage.style.color = contrast;
  document.querySelector('.stage-orb').style.color = contrast;
  updateColorInfo(color);
  addToHistory(color);
  const hash = color.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  window.history.replaceState(null, '', `#${hash}`);
  if (options.source) makeRipple(options.source);
  if (options.sound) playTone(440, .075, 'sine', .035);
}

function addToHistory(color) {
  history = [color, ...history.filter(item => item.hex !== color.hex)].slice(0, 6);
  const list = document.querySelector('#historyList');
  list.innerHTML = '';
  history.forEach(item => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'history-chip';
    button.style.backgroundColor = item.hex;
    button.setAttribute('aria-label', `Restore ${item.name}, ${item.hex}`);
    button.title = `${item.name} · ${item.hex}`;
    button.addEventListener('click', () => setColor(item, { source: button, sound: true }));
    list.append(button);
  });
}

function makeRipple(origin) {
  const rect = origin.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${rect.left + rect.width / 2}px`;
  ripple.style.top = `${rect.top + rect.height / 2}px`;
  ripple.style.transform = 'translate(-50%, -50%)';
  document.body.append(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

function generateRandomColor() {
  const hex = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase()}`;
  const color = { name: 'Custom', hex };
  setColor(color, { source: document.querySelector('#randomButton'), sound: true });
  showToast('A NEW COLOR, JUST FOR YOU');
}

async function copyToClipboard(value, button) {
  try {
    await navigator.clipboard.writeText(value);
    button.firstChild.textContent = 'COPIED ';
    window.setTimeout(() => { button.firstChild.textContent = button.id === 'copyHex' ? 'COPY HEX ' : 'COPY RGB '; }, 1400);
    showToast(`${value} COPIED`);
    if (soundEnabled) playTone(720, .045, 'sine', .025);
  } catch {
    showToast('CLIPBOARD UNAVAILABLE');
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1700);
}

function playTone(frequency = 420, duration = .055, type = 'sine', volume = .025) {
  if (!soundEnabled) return;
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') audioContext.resume();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function initAnimations() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(item => observer.observe(item));
}

function initCursor() {
  if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    dot.style.opacity = ring.style.opacity = '.8';
    window.addEventListener('pointermove', event => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!cursorFrame) cursorFrame = requestAnimationFrame(animateCursor);
    });
    document.querySelectorAll('a,button,.principle').forEach(item => {
      item.addEventListener('pointerenter', () => ring.classList.add('hovering'));
      item.addEventListener('pointerleave', () => ring.classList.remove('hovering'));
    });
    function animateCursor() {
      cursor.x += (pointer.x - cursor.x) * .22;
      cursor.y += (pointer.y - cursor.y) * .22;
      dot.style.transform = `translate(${pointer.x}px,${pointer.y}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${cursor.x}px,${cursor.y}px) translate(-50%,-50%)`;
      if (Math.abs(pointer.x - cursor.x) + Math.abs(pointer.y - cursor.y) > .2) cursorFrame = requestAnimationFrame(animateCursor);
      else cursorFrame = 0;
    }
  }
  if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stage.addEventListener('pointermove', event => {
      const rect = stage.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const dy = (event.clientY - rect.top - rect.height / 2) / rect.height;
      document.querySelector('.stage-orb').style.transform = `translate(${dx * 18}px,calc(-50% + ${dy * 14}px))`;
    });
    stage.addEventListener('pointerleave', () => { document.querySelector('.stage-orb').style.transform = 'translate(0,-50%)'; });
  }
  document.querySelectorAll('.magnetic').forEach(button => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .08}px,${(event.clientY - rect.top - rect.height / 2) * .08}px)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });
}

renderPalette();
const initialHash = decodeURIComponent(location.hash.slice(1)).toLowerCase();
const initialColor = colors.find(color => color.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === initialHash);
setColor(initialColor || colors[0]);
initAnimations();
initCursor();

document.querySelector('#randomButton').addEventListener('click', generateRandomColor);
document.querySelector('#copyHex').addEventListener('click', event => copyToClipboard(selectedColor.hex.toUpperCase(), event.currentTarget));
document.querySelector('#copyRgb').addEventListener('click', event => copyToClipboard(getColorMetrics(selectedColor.hex).rgb, event.currentTarget));
document.querySelector('#soundToggle').addEventListener('click', event => {
  soundEnabled = !soundEnabled;
  event.currentTarget.setAttribute('aria-pressed', String(soundEnabled));
  document.querySelector('#soundLabel').textContent = soundEnabled ? 'SOUND ON' : 'SOUND OFF';
  if (soundEnabled) playTone(520, .07, 'sine', .03);
});
document.querySelector('#themeToggle').addEventListener('click', () => {
  themeDark = !themeDark;
  body.style.setProperty('--paper', themeDark ? '#171717' : selectedColor.hex);
  body.style.setProperty('--ink', themeDark ? '#F4F1EA' : getContrastColor(selectedColor.hex));
  document.querySelector('.theme-label').textContent = themeDark ? 'DARK' : 'LIGHT';
  playTone(360, .05);
});
document.querySelector('.menu-toggle').addEventListener('click', event => {
  const open = event.currentTarget.getAttribute('aria-expanded') !== 'true';
  event.currentTarget.setAttribute('aria-expanded', String(open));
  document.querySelector('.main-nav').classList.toggle('open', open);
  playTone(400, .04);
});
document.querySelectorAll('.main-nav a,.wordmark,.final-button,.round-cta,.back-top').forEach(link => {
  link.addEventListener('click', () => {
    playTone(480, .04);
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
    document.querySelector('.main-nav').classList.remove('open');
  });
});
document.querySelectorAll('.principle').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('expanded'));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.classList.toggle('expanded'); }
  });
});
