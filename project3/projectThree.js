const clock = document.getElementById('clock');
const timeParts = [
  document.getElementById('clockHour'),
  document.getElementById('clockMinute'),
  document.getElementById('clockSecond')
];
const worldCities = [
  { name: 'NEW YORK', zone: 'America/New_York' },
  { name: 'LONDON', zone: 'Europe/London' },
  { name: 'TOKYO', zone: 'Asia/Tokyo' },
  { name: 'SYDNEY', zone: 'Australia/Sydney' }
];

let soundEnabled = false;
let audioContext;

function formatUtcOffset(date) {
  // getTimezoneOffset uses the opposite sign to the familiar UTC notation.
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '−';
  const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
  const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');
  return `UTC ${sign}${hours}:${minutes}`;
}

function updateDate(date) {
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  document.getElementById('weekday').textContent = weekday.toUpperCase();
  document.getElementById('fullDate').textContent = `${date.getDate()} ${month.toUpperCase()} ${date.getFullYear()}`;

  // UTC date math avoids daylight-saving changes affecting the day count.
  const startOfYear = Date.UTC(date.getFullYear(), 0, 1);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const dayNumber = Math.floor((today - startOfYear) / 86400000) + 1;
  const daysInYear = (Date.UTC(date.getFullYear() + 1, 0, 1) - startOfYear) / 86400000;
  document.getElementById('dayOfYear').textContent = String(dayNumber).padStart(3, '0');
  document.getElementById('daysThisYear').textContent = daysInYear;

  // ISO week number: shift to Thursday, which determines the week year.
  const thursday = new Date(today);
  thursday.setUTCDate(thursday.getUTCDate() + 3 - ((thursday.getUTCDay() + 6) % 7));
  const firstThursday = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((thursday - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  document.getElementById('weekNumber').textContent = `W${String(week).padStart(2, '0')}`;
}

function updateTimezone(date) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local timezone';
  const offset = formatUtcOffset(date);
  document.getElementById('timezoneName').textContent = timezone;
  document.getElementById('timezoneName').title = `${timezone} · ${offset}`;
  document.getElementById('timezoneAbbr').textContent = offset;
  document.getElementById('utcOffset').textContent = offset;
}

function updateWorldClocks(date) {
  const list = document.getElementById('worldList');
  list.innerHTML = '';

  worldCities.forEach(city => {
    const time = new Intl.DateTimeFormat('en-GB', {
      timeZone: city.zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    }).format(date);
    const cityDate = new Intl.DateTimeFormat('en-GB', {
      timeZone: city.zone,
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    }).format(date).toUpperCase();

    const item = document.createElement('div');
    item.className = 'city';
    item.innerHTML = `<span class="city-name">${city.name}</span><time class="city-time">${time}</time><span class="city-date">${cityDate}</span>`;
    list.append(item);
  });
}

function playTick() {
  if (!soundEnabled || document.hidden) return;
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') audioContext.resume();

  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1400, now);
  volume.gain.setValueAtTime(0.012, now);
  volume.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  oscillator.connect(volume).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.025);
}

function updateClock() {
  const date = new Date();
  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).format(date);

  time.split(':').forEach((part, index) => {
    const display = timeParts[index];
    if (display.textContent !== part) {
      display.textContent = part;
      display.classList.remove('digit-change');
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        void display.offsetWidth;
        display.classList.add('digit-change');
      }
    }
  });
  clock.dateTime = date.toISOString();
  clock.setAttribute('aria-label', `Local time ${time}`);
  document.getElementById('hourMarker').style.setProperty('--hour-angle', `${date.getHours() / 24 * 360}deg`);

  updateDate(date);
  updateTimezone(date);
  if (document.getElementById('worldClock').open) updateWorldClocks(date);
  playTick();
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const button = document.getElementById('soundToggle');
  button.setAttribute('aria-pressed', String(soundEnabled));
  button.setAttribute('aria-label', soundEnabled ? 'Disable tick sound' : 'Enable tick sound');
  document.getElementById('soundLabel').textContent = soundEnabled ? 'SOUND · ON' : 'SOUND · OFF';

  // The audio context is created only after the user's click, respecting autoplay rules.
  if (soundEnabled) {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') audioContext.resume();
  }
}

document.getElementById('soundToggle').addEventListener('click', toggleSound);
document.getElementById('worldClock').addEventListener('toggle', () => {
  if (document.getElementById('worldClock').open) updateWorldClocks(new Date());
});
window.addEventListener('pointermove', event => {
  if (event.pointerType !== 'touch') {
    document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
  }
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateClock();
});

updateClock();
setInterval(updateClock, 1000);
