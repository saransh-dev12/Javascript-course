// =====================================================
// BMI Calculator — plain JS, no dependencies
// Sections: 1) Sound  2) DOM refs  3) Logic  4) UI  5) Events
// =====================================================

// ---------- 1) Sound engine (Web Audio API, no audio files) ----------
const Sound = {
  ctx: null,      // AudioContext is created lazily on first click
  enabled: true,  // toggled by the 🔊 button, remembered in localStorage

  // Browsers block audio before a user gesture, so create context on demand.
  ensureContext() {
    if (!this.ctx) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AC();
      } catch (e) {
        this.enabled = false; // no Web Audio support -> stay silent
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  // Play one short beep. freq = pitch, dur = seconds.
  beep(freq, dur, delay = 0, volume = 0.08) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    osc.start(t);
    osc.stop(t + dur + 0.02);
  },

  click() { this.beep(700, 0.07); },
  calculate() { this.beep(440, 0.12); },
  success() { this.beep(523, 0.12); this.beep(784, 0.15, 0.1); },
  error() { this.beep(220, 0.18, 0, 0.1); },
  reset() { this.beep(500, 0.1); },
};

// Restore sound preference (file:// may block localStorage -> guard it)
try {
  const saved = localStorage.getItem('bmiSoundEnabled');
  if (saved !== null) Sound.enabled = saved === 'true';
} catch (e) { /* ignore */ }

// ---------- 2) DOM references ----------
const form = document.querySelector('#bmi-form');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const errorText = document.querySelector('#form-error');
const calculateBtn = document.querySelector('#calculate-btn');
const resetBtn = document.querySelector('#reset-btn');

const emptyState = document.querySelector('#empty-state');
const resultsCard = document.querySelector('#results');
const categoryEl = document.querySelector('#category');
const bmiNumberEl = document.querySelector('#bmi-number');
const resultHintEl = document.querySelector('#result-hint');
const scaleMarker = document.querySelector('#scale-marker');

const soundToggle = document.querySelector('#sound-toggle');
const soundIcon = document.querySelector('#sound-icon');

// ---------- 3) Pure logic (easy to test) ----------

// Same formula as the original project:
// weight(kg) / height(m)^2, with height given in cm.
function calculateBMI(heightCm, weightKg) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obesity';
}

// Returns an error message string, or '' when both inputs are valid.
function validateInputs(heightRaw, weightRaw) {
  if (heightRaw === '' || weightRaw === '') {
    return heightRaw === ''
      ? 'Please enter your height in cm.'
      : 'Please enter your weight in kg.';
  }
  const height = Number(heightRaw);
  const weight = Number(weightRaw);
  if (Number.isNaN(height) || Number.isNaN(weight)) {
    return 'Height and weight must be numbers.';
  }
  if (height <= 0 || weight <= 0) {
    return 'Height and weight must be greater than zero.';
  }
  if (height < 50 || height > 300) {
    return 'Please enter a realistic height (50–300 cm).';
  }
  if (weight < 2 || weight > 500) {
    return 'Please enter a realistic weight (2–500 kg).';
  }
  return '';
}

// ---------- 4) UI helpers ----------

function showError(message, badInput) {
  errorText.textContent = message;
  errorText.hidden = false;
  if (badInput) badInput.classList.add('input-error');
  // Error shake animation (re-trigger by re-adding the class)
  form.classList.remove('shake');
  void form.offsetWidth;
  form.classList.add('shake');
  Sound.error();
}

function clearError() {
  errorText.textContent = '';
  errorText.hidden = true;
  heightInput.classList.remove('input-error');
  weightInput.classList.remove('input-error');
}

const CATEGORY_LABEL = {
  underweight: 'Underweight',
  normal: 'Normal range',
  overweight: 'Overweight',
  obesity: 'Obesity',
};

const CATEGORY_HINT = {
  underweight: 'Below the healthy range. Consider talking to a professional about gaining weight healthily.',
  normal: 'Great — inside the healthy range. Keep up balanced habits.',
  overweight: 'Above the healthy range. Small steps in diet and activity can help.',
  obesity: 'Well above the healthy range. Consider talking to a healthcare professional.',
};

// Marker maps BMI 14–40 onto 0–100% of the bar.
function updateScaleMarker(bmi) {
  const clamped = Math.min(40, Math.max(14, bmi));
  const percent = ((clamped - 14) / (40 - 14)) * 100;
  scaleMarker.style.left = percent + '%';
}

function showResult(bmi, category) {
  categoryEl.textContent = CATEGORY_LABEL[category];
  bmiNumberEl.textContent = bmi.toFixed(2); // 2 decimal places
  resultHintEl.textContent = CATEGORY_HINT[category];

  resultsCard.classList.remove('underweight', 'normal', 'overweight', 'obesity');
  resultsCard.classList.add(category);
  updateScaleMarker(bmi);

  emptyState.hidden = true;
  resultsCard.hidden = false; // <-- this is what makes the result appear
  Sound.success();
}

function resetAll() {
  form.reset();
  clearError();
  resultsCard.hidden = true;
  resultsCard.classList.remove('underweight', 'normal', 'overweight', 'obesity');
  emptyState.hidden = false;
  bmiNumberEl.textContent = '--';
  Sound.reset();
  heightInput.focus();
}

function updateSoundIcon() {
  soundToggle.setAttribute('aria-pressed', String(Sound.enabled));
  soundIcon.textContent = Sound.enabled ? '🔊' : '🔇';
}

// ---------- 5) Events ----------

// e.preventDefault() stops the form from refreshing the page.
form.addEventListener('submit', function (e) {
  e.preventDefault();
  Sound.calculate();
  clearError();

  const heightRaw = heightInput.value.trim();
  const weightRaw = weightInput.value.trim();

  const errorMsg = validateInputs(heightRaw, weightRaw);
  if (errorMsg) {
    // Highlight the height field if it is the problem, else the weight field
    const heightBad =
      heightRaw === '' || Number.isNaN(Number(heightRaw)) || Number(heightRaw) <= 0;
    const badField = heightBad ? heightInput : weightInput;
    showError(errorMsg, badField);
    badField.focus();
    return;
  }

  // Brief "calculating" micro-animation, then show the result
  calculateBtn.disabled = true;
  calculateBtn.textContent = 'Calculating…';

  setTimeout(function () {
    const bmi = calculateBMI(Number(heightRaw), Number(weightRaw));
    showResult(bmi, getBMICategory(bmi));
    calculateBtn.disabled = false;
    calculateBtn.textContent = 'Calculate BMI';
  }, 350);
});

// Clear error highlight as the user types
heightInput.addEventListener('input', clearError);
weightInput.addEventListener('input', clearError);

resetBtn.addEventListener('click', function () {
  Sound.click();
  resetAll();
});

soundToggle.addEventListener('click', function () {
  Sound.enabled = !Sound.enabled;
  try {
    localStorage.setItem('bmiSoundEnabled', String(Sound.enabled));
  } catch (e) { /* ignore */ }
  updateSoundIcon();
  Sound.click();
});

// Keyboard: Escape clears the form
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') resetAll();
});

// Init
updateSoundIcon();
heightInput.focus();
