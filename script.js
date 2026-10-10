
"use strict";

// =====================================
// ULTIMATE CAR PARKING SIMULATOR
// Mobile-friendly game engine
// =====================================

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];

const canvas = $("#gameCanvas");
const ctx = canvas.getContext("2d");

const SAVE_KEY = "ultimateParkingSaveV1";

const defaultSave = {
  coins: 500,
  xp: 0,
  completed: [],
  bestScore: 0,
  selectedCar: 0,
  playerName: "Driver",
  sound: true,
  vibration: true
};

let save = loadSave();
let screen = "home";
let currentLevel = 1;
let gameRunning = false;
let paused = false;
let animationId = 0;
let lastFrame = 0;
let elapsed = 0;
let score = 1000;
let hits = 0;
let fuel = 100;
let speed = 0;
let steering = 0;
let held = {};
let obstacles = [];
let particles = [];
let finishTimer = 0;
let soundContext = null;

const cars = [
  {
    name: "City Compact",
    price: 0,
    color: "#20d6b5",
    speed: 4.0,
    handling: 4.5,
    brakes: 4.0,
    description: "Balanced starter car for tight parking."
  },
  {
    name: "Street Racer",
    price: 250,
    color: "#ffb84d",
    speed: 5.0,
    handling: 3.8,
    brakes: 3.6,
    description: "Fast acceleration with sporty handling."
  },
  {
    name: "Urban SUV",
    price: 450,
    color: "#b18aff",
    speed: 3.7,
    handling: 4.2,
    brakes: 4.8,
    description: "Stable and powerful for tricky turns."
  },
  {
    name: "Pro GT",
    price: 800,
    color: "#ff6484",
    speed: 5.4,
    handling: 4.7,
    brakes: 4.6,
    description: "A premium car built for precision."
  }
];

const levels = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: [
    "First Drive", "Easy Corner", "Narrow Lane",
    "Reverse Park", "Traffic Test", "Tight Garage",
    "S-Curve", "Parking Tower", "Night Driver",
    "Precision Test", "City Rush", "Double Turn",
    "Expert Bay", "Small Spaces", "Pro Reverse",
    "Complex Route", "Master Driver", "Hard Corners",
    "Ultimate Test", "Parking Legend"
  ][i],
  difficulty: i < 5 ? "easy" : i < 12 ? "medium" : "hard",
  target: { x: 240, y: 100 + (i % 3) * 25 }
}));

function loadSave() {
  try {
    const stored = JSON.parse(localStorage.getItem(SAVE_KEY));
    return { ...defaultSave, ...(stored || {}) };
  } catch {
    return { ...defaultSave };
  }
}

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch (error) {
    console.warn("Progress could not be saved.", error);
  }
}

function showScreen(name) {
  screen = name;
  const screenIds = {
    home: "homeScreen",
    garage: "garageScreen",
    levels: "levelsScreen",
    missions: "missionsScreen",
    play: "playScreen",
    settings: "settingsScreen"
  };

  Object.values(screenIds).forEach(id => {
    const element = document.getElementById(id);
    if (element) element.classList.remove("active");
  });

  const target = document.getElementById(screenIds[name]);
  if (target) target.classList.add("active");

  $$(".tab-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.screen === name
    );
  });

  closeMenu();
  updateDashboard();
}

function updateDashboard() {
  const completed = save.completed.length;
  const values = {
    playerName: save.playerName || "Driver",
    coinText: save.coins,
    rankText: getRank(),
    completedText: `${completed}/20`,
    xpText: save.xp,
    bestScoreText: save.bestScore,
    selectedCarText: cars[save.selectedCar].name,
    careerLabel: getRank(),
    careerProgressText: `${completed}/20 levels`,
    levelCountText: `${completed}/20 completed`
  };

  Object.entries(values).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });

  const progress = $("#careerProgress");
  if (progress) progress.style.width = `${completed / 20 * 100}%`;

  updateMissions();
}

function getRank() {
  if (save.xp >= 5000) return "Parking Legend";
  if (save.xp >= 2000) return "Pro Driver";
  if (save.xp >= 700) return "Skilled Driver";
  return "Rookie Driver";
}

function toast(message) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
}

function closeMenu() {
  $("#sideMenu")?.classList.remove("open");
  $("#menuBackdrop")?.classList.remove("show");
}

function openMenu() {
  $("#sideMenu")?.classList.add("open");
  $("#menuBackdrop")?.classList.add("show");
}

function updateMissions() {
  const completed = save.completed.length;

  const missions = [
    {
      progress: "perfectMissionProgress",
      text: "perfectMissionText",
      value: Math.min(save.completed.filter(n => n > 0).length, 5),
      goal: 5
    },
    {
      progress: "careerMissionProgress",
      text: "careerMissionText",
      value: completed,
      goal: 20
    },
    {
      progress: "scoreMissionProgress",
      text: "scoreMissionText",
      value: Math.min(save.bestScore, 5000),
      goal: 5000
    }
  ];

  missions.forEach(m => {
    const bar = document.getElementById(m.progress);
    const text = document.getElementById(m.text);
    if (bar) bar.style.width = `${Math.min(100, m.value / m.goal * 100)}%`;
    if (text) text.textContent = `${m.value}/${m.goal}`;
  });
}

function renderGarage() {
  const car = cars[save.selectedCar];
  const art = $("#garageCarArt");
  if (art) {
    art.textContent = "🚘";
    art.style.filter = `drop-shadow(0 10px 15px ${car.color}55)`;
  }

  $("#garageCarName") && ($("#garageCarName").textContent = car.name);
  $("#garageCarDescription") &&
    ($("#garageCarDescription").textContent = car.description);

  const stats = [
    ["speedStat", car.speed],
    ["handlingStat", car.handling],
    ["brakesStat", car.brakes]
  ];

  stats.forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.style.width = `${value / 6 * 100}%`;
  });

  const selectButton = $("#selectCarBtn");
  if (selectButton) {
    const owned = save.selectedCar === 0 ||
      save.unlockedCars?.includes(save.selectedCar);
    selectButton.textContent = owned
      ? "Selected Car"
      : `Unlock • ${car.price} coins`;
  }

  const grid = $("#carGrid");
  if (grid) {
    grid.innerHTML = "";
    cars.forEach((item, index) => {
      const unlocked = index === 0 ||
        (save.unlockedCars || []).includes(index);

      const button = document.createElement("button");
      button.className = "car-card" +
        (index === save.selectedCar ? " active" : "");
      button.innerHTML = `
        <span class="car-card-art">${index === 0 ? "🚙" : "🚘"}</span>
        <strong>${item.name}</strong>
        <small>${unlocked ? "Unlocked" : `${item.price} coins`}</small>
      `;

      button.addEventListener("click", () => {
        save.selectedCar = index;
        saveGame();
        renderGarage();
        updateDashboard();
      });

      grid.appendChild(button);
    });
  }
}

function selectOrBuyCar() {
  const index = save.selectedCar;
  const car = cars[index];
  save.unlockedCars ||= [];

  if (index === 0 || save.unlockedCars.includes(index)) {
    toast(`${car.name} selected!`);
    return;
  }

  if (save.coins < car.price) {
    toast("Not enough coins yet!");
    return;
  }

  save.coins -= car.price;
  save.unlockedCars.push(index);
  saveGame();
  renderGarage();
  updateDashboard();
  toast(`${car.name} unlocked!`);
}

function renderLevels(filter = "all") {
  const grid = $("#levelGrid");
  if (!grid) return;
  grid.innerHTML = "";

  levels.filter(level =>
    filter === "all" || level.difficulty === filter
  ).forEach(level => {
    const done = save.completed.includes(level.id);
    const unlocked = level.id === 1 ||
      save.completed.includes(level.id - 1);

    const button = document.createElement("button");
    button.className = "level-card" +
      (done ? " completed" : "") +
      (!unlocked ? " locked" : "");

    button.innerHTML = `
      <span class="level-number">${done ? "✓" : level.id}</span>
      <strong>${level.name}</strong>
      <small>${level.difficulty.toUpperCase()}</small>
      <small>${unlocked ? (done ? "Completed" : "Play Level") : "🔒 Locked"}</small>
    `;

    button.disabled = !unlocked;
    button.addEventListener("click", () => startLevel(level.id));
    grid.appendChild(button);
  });
}

function startLevel(levelNumber) {
  const level = levels.find(item => item.id === levelNumber);
  if (!level) return;

  if (levelNumber > 1 && !save.completed.includes(levelNumber - 1)) {
    toast("Complete the previous level first!");
    return;
  }

  currentLevel = levelNumber;
  elapsed = 0;
  score = 1000;
  hits = 0;
  fuel = 100;
  speed = 0;
  steering = 0;
  paused = false;
  gameRunning = true;
  finishTimer = 0;

  const car = cars[save.selectedCar];
  const startX = 240;
  const startY = 590;

  window.player = {
    x: startX,
    y: startY,
    angle: -Math.PI / 2,
    width: 28,
    height: 48,
    vx: 0,
    vy: 0,
    color: car.color
  };

  createLevel(levelNumber);
  showScreen("play");
  $("#gameOverlay")?.classList.remove("show");
  $("#gameLevelText") && ($("#gameLevelText").textContent = `LEVEL ${levelNumber}`);
  $("#gameScoreText") && ($("#gameScoreText").textContent = score);
  $("#gameHitsText") && ($("#gameHitsText").textContent = hits);
  $("#gameTimeText") && ($("#gameTimeText").textContent = "0s");
  $("#fuelText") && ($("#fuelText").textContent = "100%");
  $("#objectiveText") && ($("#objectiveText").textContent = level.name);
  $("#targetStatus") && ($("#targetStatus").textContent = "Find the parking bay");
  lastFrame = performance.now();
  cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(gameLoop);
}

function createLevel(number) {
  obstacles = [];
  particles = [];

  // Side walls and lane markers
  obstacles.push(
    { x: 25, y: 0, w: 18, h: 720 },
    { x: 437, y: 0, w: 18, h: 720 }
  );

  // Difficulty increases with level number
  const count = Math.min(3 + Math.floor(number / 2), 10);
  for (let i = 0; i < count; i++) {
    const lane = i % 3;
    const row = Math.floor(i / 3);
    obstacles.push({
      x: 100 + lane * 105 + (number % 2) * 8,
      y: 100 + row * 115,
      w: 48,
      h: 70
    });
  }

  // Parking bay near the top
  const targetX = 130 + (number % 3) * 75;
  window.parkingTarget = {
    x: targetX,
    y: 55,
    w: 64,
    h: 88,
    angle: -Math.PI / 2
  };
}

function drawRoad() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#15212c";
  ctx.fillRect(0, 0, 480, 720);

  ctx.fillStyle = "#263744";
  ctx.fillRect(43, 0, 394, 720);

  // Road markings
  ctx.strokeStyle = "#ffffff35";
  ctx.lineWidth = 3;
  ctx.setLineDash([20, 20]);
  ctx.beginPath();
  ctx.moveTo(240, 0);
  ctx.lineTo(240, 720);
  ctx.stroke();
  ctx.setLineDash([]);

  // Parking target
  const t = window.parkingTarget;
  if (t) {
    ctx.strokeStyle = "#20d6b5";
    ctx.lineWidth = 4;
    ctx.strokeRect(t.x, t.y, t.w, t.h);
    ctx.fillStyle = "#20d6b51b";
    ctx.fillRect(t.x, t.y, t.w, t.h);
    ctx.fillStyle = "#20d6b5";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PARK", t.x + t.w / 2, t.y + t.h / 2 + 4);
  }

  obstacles.forEach(o => {
    ctx.fillStyle = "#536675";
    ctx.fillRect(o.x, o.y, o.w, o.h);
    ctx.fillStyle = "#a5b7c5";
    ctx.fillRect(o.x + 5, o.y + 5, o.w - 10, 6);
    ctx.fillStyle = "#111c25";
    ctx.fillRect(o.x + 6, o.y + 16, o.w - 12, o.h - 22);
  });

  drawCar();
  drawParticles();
}

function drawCar() {
  if (!window.player) return;
  const p = window.player;

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);

  // Wheels
  ctx.fillStyle = "#080d12";
  ctx.fillRect(-p.width / 2 - 3, -p.height / 2 + 6, 5, 12);
  ctx.fillRect(p.width / 2 - 2, -p.height / 2 + 6, 5, 12);
  ctx.fillRect(-p.width / 2 - 3, p.height / 2 - 18, 5, 12);
  ctx.fillRect(p.width / 2 - 2, p.height / 2 - 18, 5, 12);

  // Body
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.roundRect(-p.width / 2, -p.height / 2, p.width, p.height, 7);
  ctx.fill();

  // Windows
  ctx.fillStyle = "#b9e9f5";
  ctx.fillRect(-p.width / 2 + 4, -p.height / 2 + 10, p.width - 8, 10);
  ctx.fillStyle = "#173445";
  ctx.fillRect(-p.width / 2 + 4, 2, p.width - 8, 10);

  // Headlights
  ctx.fillStyle = "#fff6ba";
  ctx.fillRect(-p.width / 2 + 3, -p.height / 2 + 2, 6, 4);
  ctx.fillRect(p.width / 2 - 9, -p.height / 2 + 2, 6, 4);

  ctx.restore();
}

function drawParticles() {
  particles.forEach(p => {
    ctx.globalAlpha = Math.max(0, p.life / 25);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function updateGame(dt) {
  const p = window.player;
  if (!p || paused || !gameRunning) return;

  const car = cars[save.selectedCar];
  const frame = Math.min(dt / 16.67, 2);

  const accelerating = held.forward || held.reverse;
  const braking = held.brake;

  if (held.forward) speed += 0.12 * car.speed * frame;
  if (held.reverse) speed -= 0.08 * car.speed * frame;
  if (braking) speed *= Math.pow(0.82, frame);

  speed = Math.max(-2.2, Math.min(car.speed * 1.6, speed));

  if (!accelerating && !braking) speed *= Math.pow(0.985, frame);

  const steeringStrength = 0.035 * (car.handling / 4);
  if (held.left) steering = -1;
  else if (held.right) steering = 1;
  else steering = 0;

  if (Math.abs(speed) > 0.15) {
    p.angle += steering * steeringStrength * frame *
      (speed >= 0 ? 1 : -1);
  }

  const oldX = p.x;
  const oldY = p.y;

  p.x += Math.sin(p.angle) * speed * frame;
  p.y -= Math.cos(p.angle) * speed * frame;

  // Prevent driving off the road
  p.x = Math.max(65, Math.min(415, p.x));
  p.y = Math.max(30, Math.min(690, p.y));

  const carBox = {
    x: p.x - p.width / 2,
    y: p.y - p.height / 2,
    w: p.width,
    h: p.height
  };

  for (const o of obstacles) {
    if (rectsOverlap(carBox, o)) {
      p.x = oldX;
      p.y = oldY;
      speed = -speed * 0.2;
      hits++;
      score = Math.max(0, score - 100);
      playTone(130, 0.07);
      vibrate(70);
      $("#gameHitsText") && ($("#gameHitsText").textContent = hits);
      createImpact(p.x, p.y);
      break;
    }
  }

  elapsed += dt / 1000;
  fuel = Math.max(0, fuel - (Math.abs(speed) > 0.2 ? 0.008 * frame : 0));
  score = Math.max(0, score - 0.08 * frame);

  particles.forEach(part => {
    part.x += part.vx * frame;
    part.y += part.vy * frame;
    part.life -= frame;
  });
  particles = particles.filter(part => part.life > 0);

  checkParking();
  updateHUD();
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y;
}

function checkParking() {
  const p = window.player;
  const t = window.parkingTarget;
  if (!p || !t || finishTimer > 0) return;

  const inside = p.x > t.x + 12 && p.x < t.x + t.w - 12 &&
    p.y > t.y + 12 && p.y < t.y + t.h - 12;

  const slowEnough = Math.abs(speed) < 0.35;
  const angleDiff = Math.abs(normalizeAngle(p.angle - t.angle));
  const aligned = angleDiff < 0.45 ||
    Math.abs(angleDiff - Math.PI * 2) < 0.45;

  if (inside && slowEnough && aligned) {
    finishTimer = 1;
    completeLevel();
  } else if (inside) {
    $("#targetStatus") && (
      $("#targetStatus").textContent = "Stop and align your car"
    );
  }
}

function normalizeAngle(angle) {
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
}

function completeLevel() {
  gameRunning = false;
  speed = 0;

  const alreadyDone = save.completed.includes(currentLevel);
  if (!alreadyDone) {
    save.completed.push(currentLevel);
    save.completed.sort((a, b) => a - b);
    save.coins += 100 + currentLevel * 10;
    save.xp += 100;
  } else {
    save.coins += 20;
  }

  const finalScore = Math.max(0, Math.round(score));
  save.bestScore = Math.max(save.bestScore, finalScore);
  saveGame();
  updateDashboard();

  $("#overlayIcon") && ($("#overlayIcon").textContent = "🏆");
  $("#overlayTitle") && ($("#overlayTitle").textContent = "Level Complete!");
  $("#overlayMessage") && (
    $("#overlayMessage").textContent =
      `Score: ${finalScore} • Time: ${elapsed.toFixed(1)}s • Hits: ${hits}`
  );
  $("#overlayActionBtn") && (
    $("#overlayActionBtn").textContent =
      currentLevel < 20 ? "Next Level →" : "Back to Levels"
  );
  $("#gameOverlay")?.classList.add("show");
  $("#targetStatus") && ($("#targetStatus").textContent = "Perfect parking!");
  playTone(660, 0.16);
  setTimeout(() => playTone(880, 0.2), 120);
}

function createImpact(x, y) {
  for (let i = 0; i < 8; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 25,
      color: "#ffb84d"
    });
  }
}

function updateHUD() {
  const values = {
    gameScoreText: Math.round(score),
    gameTimeText: `${elapsed.toFixed(1)}s`,
    fuelText: `${Math.round(fuel)}%`,
    speedText: `${Math.round(Math.abs(speed) * 12)} km/h`
  };

  Object.entries(values).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

function gameLoop(timestamp) {
  const dt = timestamp - (lastFrame || timestamp);
  lastFrame = timestamp;

  if (screen === "play") {
    if (gameRunning && !paused) updateGame(dt);
    drawRoad();
  }

  if (gameRunning || screen === "play") {
    animationId = requestAnimationFrame(gameLoop);
  }
}

function togglePause() {
  if (!window.player || !gameRunning) return;
  paused = !paused;

  $("#overlayIcon") && ($("#overlayIcon").textContent = paused ? "⏸️" : "🚗");
  $("#overlayTitle") && ($("#overlayTitle").textContent = paused ? "Game Paused" : "Back to Driving");
  $("#overlayMessage") && (
    $("#overlayMessage").textContent = paused
      ? "Take a break. Resume when ready."
      : "Let's keep going!"
  );
  $("#overlayActionBtn") && (
    $("#overlayActionBtn").textContent = paused ? "Resume Game" : "Continue"
  );

  $("#gameOverlay")?.classList.toggle("show", paused);
}

function overlayAction() {
  if (gameRunning && paused) {
    paused = false;
    $("#gameOverlay")?.classList.remove("show");
    return;
  }

  if (!gameRunning && finishTimer > 0) {
    if (currentLevel < 20) startLevel(currentLevel + 1);
    else showScreen("levels");
    return;
  }

  if (gameRunning) {
    paused = false;
    $("#gameOverlay")?.classList.remove("show");
  }
}

function playTone(frequency, duration) {
  if (!save.sound) return;
  try {
    soundContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (soundContext.state === "suspended") soundContext.resume();
    const oscillator = soundContext.createOscillator();
    const gain = soundContext.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gain.gain.value = 0.04;
    oscillator.connect(gain);
    gain.connect(soundContext.destination);
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(
      0.001, soundContext.currentTime + duration
    );
    oscillator.stop(soundContext.currentTime + duration);
  } catch {
    // Game remains playable if audio is unsupported.
  }
}

function vibrate(duration = 40) {
  if (save.vibration && navigator.vibrate) {
    navigator.vibrate(duration);
  }
}

function bindEvents() {
  $("#playBtn")?.addEventListener("click", () => {
    const next = Math.min(20, save.completed.length + 1);
    startLevel(next);
  });

  $("#continueBtn")?.addEventListener("click", () => {
    const next = Math.min(20, save.completed.length + 1);
    startLevel(next);
  });

  $("#shopBtn")?.addEventListener("click", () => showScreen("garage"));
  $("#selectCarBtn")?.addEventListener("click", selectOrBuyCar);

  $$(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.screen;
      if (name) showScreen(name);
      if (name === "garage") renderGarage();
      if (name === "levels") renderLevels();
    });
  });

  $$(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      $$(".filter-btn").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      renderLevels(button.dataset.filter || "all");
    });
  });

  $("#menuBtn")?.addEventListener("click", openMenu);
  $("#closeMenuBtn")?.addEventListener("click", closeMenu);
  $("#menuBackdrop")?.addEventListener("click", closeMenu);

  $$(".menu-link").forEach(button => {
    button.addEventListener("click", () => {
      const target = button.dataset.go;
      if (target) {
        showScreen(target);
        if (target === "garage") renderGarage();
        if (target === "levels") renderLevels();
      }
    });
  });

  $("#backToMenuBtn")?.addEventListener("click", () => {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    showScreen("home");
  });

  $("#pauseBtn")?.addEventListener("click", togglePause);
  $("#overlayActionBtn")?.addEventListener("click", overlayAction);

  // Mobile controls: support both touch and mouse.
  $$("[data-control]").forEach(button => {
    const control = button.dataset.control;

    const down = event => {
      event.preventDefault();
      held[control] = true;
      button.classList.add("pressed");
    };

    const up = event => {
      event.preventDefault();
      held[control] = false;
      button.classList.remove("pressed");
    };

    button.addEventListener("pointerdown", down);
    button.addEventListener("pointerup", up);
    button.addEventListener("pointercancel", up);
    button.addEventListener("pointerleave", up);
    button.addEventListener("contextmenu", e => e.preventDefault());
  });

  // Keyboard support for desktop testing
  const keyMap = {
    ArrowLeft: "left",
    a: "left",
    ArrowRight: "right",
    d: "right",
    ArrowUp: "forward",
    w: "forward",
    ArrowDown: "reverse",
    s: "reverse",
    " ": "brake"
  };

  window.addEventListener("keydown", event => {
    const control = keyMap[event.key];
    if (control) {
      event.preventDefault();
      held[control] = true;
    }
    if (event.key === "Escape") togglePause();
  });

  window.addEventListener("keyup", event => {
    const control = keyMap[event.key];
    if (control) held[control] = false;
  });

  window.addEventListener("blur", () => {
    held = {};
  });

  $("#soundBtn")?.addEventListener("click", () => {
    save.sound = !save.sound;
    saveGame();
    updateSoundButton();
    toast(save.sound ? "Sound on" : "Sound off");
  });

  $("#soundToggle")?.addEventListener("change", event => {
    save.sound = event.target.checked;
    saveGame();
    updateSoundButton();
  });

  $("#vibrationToggle")?.addEventListener("change", event => {
    save.vibration = event.target.checked;
    saveGame();
  });

  $("#saveSettingsBtn")?.addEventListener("click", () => {
    const name = ($("#playerNameInput")?.value || "").trim();
    save.playerName = name || "Driver";
    save.sound = $("#soundToggle")?.checked ?? save.sound;
    save.vibration = $("#vibrationToggle")?.checked ?? save.vibration;
    saveGame();
    updateDashboard();
    updateSoundButton();
    toast("Settings saved!");
  });

  $("#resetProgressBtn")?.addEventListener("click", () => {
    if (!confirm("Reset all game progress and coins?")) return;
    save = { ...defaultSave };
    saveGame();
    updateDashboard();
    renderGarage();
    renderLevels();
    toast("Progress reset.");
  });
}

function updateSoundButton() {
  const button = $("#soundBtn");
  if (button) button.textContent = save.sound ? "🔊" : "🔇";
  const toggle = $("#soundToggle");
  if (toggle) toggle.checked = save.sound;
  const vibration = $("#vibrationToggle");
  if (vibration) vibration.checked = save.vibration;
}

function init() {
  bindEvents();
  updateDashboard();
  renderGarage();
  renderLevels();
  updateSoundButton();

  if ($("#playerNameInput")) {
    $("#playerNameInput").value = save.playerName;
  }

  showScreen("home");
  console.log("Ultimate Car Parking Simulator ready!");
}

if (canvas) {
  init();
} else {
  console.error("Game canvas missing. Check index.html.");
}
