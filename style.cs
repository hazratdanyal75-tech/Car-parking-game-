
/* ==========================================
   ULTIMATE CAR PARKING SIMULATOR
   Advanced Mobile Gaming UI
========================================== */

:root {
  --bg: #080d17;
  --panel: #111a29;
  --panel-light: #192538;
  --panel-hover: #22334a;
  --accent: #42f5a4;
  --accent-dark: #16bd78;
  --blue: #48b8ff;
  --gold: #ffca67;
  --danger: #ff5e70;
  --text: #f4f7ff;
  --muted: #91a0b7;
  --border: #293950;
  --radius: 16px;
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  min-height: 100%;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(
      ellipse at top,
      #17283d 0%,
      #0b1220 45%,
      #070b13 100%
    );
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  overscroll-behavior-y: none;
}

button,
input {
  font: inherit;
}

button {
  color: var(--text);
  cursor: pointer;
  touch-action: manipulation;
}

button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.game-app {
  width: 100%;
  max-width: 760px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 16px;
  overflow: hidden;
  position: relative;
}

/* HEADER */

.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
}

.brand {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border: 1px solid #315347;
  border-radius: 14px;
  background: linear-gradient(145deg, #1b4036, #13271f);
  font-size: 25px;
}

.brand h1 {
  margin: 0;
  font-size: clamp(14px, 3.7vw, 20px);
  font-weight: 900;
  letter-spacing: 0.6px;
}

.brand h1 span {
  color: var(--accent);
}

.brand p {
  margin: 5px 0 0;
  color: var(--muted);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.icon-btn {
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 13px;
  background: var(--panel);
  font-size: 19px;
  transition: background 0.2s, transform 0.2s;
}

.icon-btn:active {
  transform: scale(0.94);
  background: var(--panel-hover);
}

/* PLAYER BAR */

.player-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: linear-gradient(110deg, #152235, #101827);
}

.player-info {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.avatar {
  display: grid;
  place-items: center;
  width: 39px;
  height: 39px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #273b50;
  font-size: 21px;
}

.player-info strong {
  display: block;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.player-info small {
  display: block;
  margin-top: 5px;
  color: var(--accent);
  font-size: 9px;
  font-weight: 800;
}

.wallet {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 9px;
  border: 1px solid #59492d;
  border-radius: 10px;
  background: #30271a;
}

.wallet > span {
  font-size: 17px;
}

.wallet strong {
  color: var(--gold);
  font-size: 13px;
}

.wallet button {
  width: 23px;
  height: 23px;
  border: none;
  border-radius: 7px;
  background: var(--gold);
  color: #38260c;
  font-size: 19px;
  font-weight: 900;
  line-height: 1;
}

/* NAVIGATION */

.main-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 5px;
  margin-bottom: 22px;
  padding: 5px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: #0d1523;
}

.tab-btn {
  min-height: 39px;
  padding: 8px 3px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: var(--muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.4px;
}

.tab-btn.active {
  border-color: #315745;
  background: linear-gradient(135deg, #214f3c, #163629);
  color: var(--accent);
}

/* SCREEN MANAGEMENT */

.screen {
  display: none;
  animation: screenEnter 0.25s ease;
}

.screen.active {
  display: block;
}

@keyframes screenEnter {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* HOME HERO */

.hero-panel {
  position: relative;
  min-height: 300px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 24px 19px;
  border: 1px solid #315447;
  border-radius: 23px;
  background:
    radial-gradient(
      circle at 92% 75%,
      #275e4b 0%,
      transparent 38%
    ),
    linear-gradient(125deg, #172b32, #101c2b 60%, #14283a);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 340px;
}

.eyebrow {
  color: var(--accent);
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1.8px;
}

.hero-content h2 {
  margin: 13px 0 10px;
  font-size: clamp(26px, 7vw, 40px);
  line-height: 1.06;
  letter-spacing: -1px;
  font-weight: 1000;
}

.hero-content h2 span {
  color: var(--accent);
}

.hero-content p {
  max-width: 230px;
  color: #b1c0ce;
  font-size: 12px;
  line-height: 1.7;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 17px 0;
}

.hero-tags span {
  padding: 7px 9px;
  border: 1px solid #375247;
  border-radius: 8px;
  background: #122b26;
  color: #d4f9e8;
  font-size: 9px;
  font-weight: 800;
}

.hero-car {
  position: absolute;
  right: -14px;
  bottom: 24px;
  z-index: 1;
  font-size: clamp(80px, 24vw, 155px);
  opacity: 0.85;
  filter: drop-shadow(0 12px 14px #0008);
  transform: rotate(-12deg);
  pointer-events: none;
}

.primary-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  width: 100%;
  min-height: 49px;
  padding: 14px 16px;
  border: 1px solid #8affc8;
  border-radius: 12px;
  background: linear-gradient(135deg, #59ffc0, #26d992);
  color: #082519;
  font-size: 12px;
  font-weight: 1000;
  letter-spacing: 1px;
  box-shadow: 0 6px 22px #30e59b24;
  transition: transform 0.15s, filter 0.15s;
}

.primary-btn:active {
  transform: scale(0.98);
  filter: brightness(0.93);
}

/* SECTION HEADINGS */

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin: 25px 0 13px;
}

.section-heading h2,
.section-heading h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.section-heading > span {
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
}

/* PROGRESS CARDS */

.progress-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.progress-card {
  min-width: 0;
  padding: 15px;
  border: 1px solid var(--border);
  border-radius: 15px;
  background: linear-gradient(145deg, #172337, #101827);
}

.card-icon {
  display: block;
  margin-bottom: 12px;
  font-size: 23px;
}

.progress-card small {
  display: block;
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.7px;
}

.progress-card strong {
  display: block;
  margin-top: 7px;
  font-size: 19px;
}

/* CAREER CARD */

.career-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 17px;
  background: var(--panel);
}

.career-art {
  width: 76px;
  height: 100px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: 1px solid #344b4b;
  border-radius: 12px;
  background: linear-gradient(145deg, #23443c, #182b33);
  font-size: 35px;
}

.career-details {
  flex: 1;
  min-width: 0;
}

.level-badge {
  display: inline-block;
  padding: 5px 7px;
  border-radius: 5px;
  background: #203f31;
  color: var(--accent);
  font-size: 8px;
  font-weight: 900;
}

.career-details h3 {
  margin: 8px 0 5px;
  font-size: 15px;
}

.career-details p {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 10px;
}

.mini-progress {
  height: 5px;
  overflow: hidden;
  border-radius: 10px;
  background: #293649;
}

.mini-progress > div {
  width: 0;
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transition: width 0.3s ease;
}

.career-details > small {
  display: block;
  margin-top: 7px;
  color: var(--muted);
  font-size: 8px;
}

.round-btn {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border: 1px solid #367458;
  border-radius: 50%;
  background: #1b4636;
  color: var(--accent);
}

/* DAILY CHALLENGE */

.daily-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 14px 0 24px;
  padding: 18px;
  border: 1px solid #51432b;
  border-radius: 17px;
  background: linear-gradient(120deg, #30281c, #1c202b);
}

.daily-card h3 {
  margin: 9px 0 7px;
  font-size: 17px;
}

.daily-card p {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.6;
}

.daily-card strong {
  color: var(--gold);
  font-size: 10px;
}

.daily-icon {
  font-size: 43px;
}

/* GARAGE */

.garage-preview {
  margin-top: 15px;
  padding: 22px 17px;
  text-align: center;
  border: 1px solid #315447;
  border-radius: 20px;
  background:
    radial-gradient(circle at 50% 35%, #234c40, transparent 60%),
    #111c2b;
}

.garage-car-art {
  display: grid;
  place-items: center;
  min-height: 145px;
  font-size: 90px;
  filter: drop-shadow(0 12px 10px #0008);
}

.garage-preview h2 {
  margin: 7px 0;
  font-size: 22px;
}

.garage-preview > p {
  margin: 0 0 24px;
  color: var(--muted);
  font-size: 11px;
}

.car-stats {
  display: grid;
  gap: 14px;
  margin-bottom: 22px;
  text-align: left;
}

.car-stats > div {
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: center;
  gap: 12px;
}

.car-stats span {
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
}

.stat-track {
  height: 7px;
  overflow: hidden;
  border-radius: 9px;
  background: #2b394a;
}

.stat-fill {
  width: 50%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #23b983, #63ffc3);
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 24px;
}

.car-card {
  padding: 13px 9px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--panel);
  text-align: center;
}

.car-card.selected {
  border-color: var(--accent);
  background: #153126;
}

.car-card .car-emoji {
  display: block;
  margin: 7px 0 11px;
  font-size: 40px;
}

.car-card h3 {
  margin: 0 0 6px;
  font-size: 12px;
}

.car-card p {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 10px;
}

.car-card button {
  width: 100%;
  padding: 9px 4px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #1e2d40;
  font-size: 10px;
  font-weight: 800;
}

/* LEVEL SELECTION */

.level-filters {
  display: flex;
  gap: 7px;
  margin-bottom: 17px;
}

.filter-btn {
  flex: 1;
  padding: 11px 5px;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--panel);
  color: var(--muted);
  font-size: 10px;
  font-weight: 900;
}

.filter-btn.active {
  border-color: #367455;
  background: #1a3c2e;
  color: var(--accent);
}

.level-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 24px;
}

.level-card {
  min-height: 116px;
  padding: 13px 5px;
  border: 1px solid var(--border);
  border-radius: 13px;
  background: linear-gradient(145deg, #172438, #101827);
  text-align: center;
}

.level-card.unlocked {
  border-color: #3a7157;
}

.level-card.completed {
  background: linear-gradient(145deg, #173b30, #12251f);
}

.level-card.locked {
  opacity: 0.55;
}

.level-card .level-icon {
  display: block;
  margin-bottom: 8px;
  font-size: 23px;
}

.level-card strong {
  display: block;
  font-size: 12px;
}

.level-card small {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-size: 9px;
}

/* MISSIONS */

.mission-card {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 10px;
  padding: 14px 10px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--panel);
}

.mission-icon {
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #26354a;
  font-size: 22px;
}

.mission-info {
  flex: 1;
  min-width: 0;
}

.mission-info h3 {
  margin: 0 0 6px;
  font-size: 12px;
}

.mission-info p {
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

.mission-info small {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-size: 9px;
}

.mission-card > strong {
  color: var(--gold);
  font-size: 10px;
}

/* GAME SCREEN */

.game-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 7px;
  margin-bottom: 12px;
}

.toolbar-btn {
  min-height: 39px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--panel);
  font-size: 10px;
  font-weight: 800;
}

.game-level {
  text-align: center;
}

.game-level small {
  display: block;
  margin-bottom: 4px;
  color: var(--muted);
  font-size: 8px;
  letter-spacing: 1px;
}

.game-level strong {
  font-size: 12px;
}

.game-hud {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 7px;
  margin-bottom: 10px;
}

.hud-item {
  min-width: 0;
  padding: 10px 4px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--panel);
  text-align: center;
}

.hud-item small {
  display: block;
  color: var(--muted);
  font-size: 8px;
  font-weight: 800;
}

.hud-item strong {
  display: block;
  margin-top: 5px;
  font-size: 15px;
}

.canvas-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 2px solid #34495c;
  border-radius: 17px;
  background: #31513e;
  box-shadow: 0 10px 28px #0005;
}

#gameCanvas {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  touch-action: none;
}

.game-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
  background: #07101bd9;
  backdrop-filter: blur(5px);
  z-index: 5;
}

.game-overlay.hidden {
  display: none;
}

.overlay-panel {
  width: 100%;
  max-width: 290px;
  padding: 23px 17px;
  border: 1px solid #3b5a55;
  border-radius: 19px;
  background: #132235;
  text-align: center;
}

.overlay-icon {
  font-size: 45px;
}

.overlay-panel h2 {
  margin: 13px 0 8px;
  font-size: 20px;
}

.overlay-panel p {
  margin: 0 0 17px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.7;
}

.mission-hud {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 13px;
  background: var(--panel);
}

.mission-target-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border: 2px solid var(--accent);
  border-radius: 9px;
  color: var(--accent);
  font-size: 20px;
  font-weight: 900;
}

.mission-hud > div:nth-child(2) {
  flex: 1;
  min-width: 0;
}

.mission-hud small {
  display: block;
  margin-bottom: 5px;
  color: var(--muted);
  font-size: 8px;
  letter-spacing: 1px;
}

.mission-hud strong {
  display: block;
  font-size: 10px;
}

.target-status {
  color: var(--accent);
  font-size: 9px;
  font-weight: 900;
}

/* MOBILE CONTROLS */

.driving-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 17px;
  padding: 12px 8px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: linear-gradient(145deg, #121e30, #0c1421);
  user-select: none;
  -webkit-user-select: none;
}

.steering-controls,
.pedal-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.drive-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  flex-shrink: 0;
  border: 1px solid #3a4e65;
  border-radius: 13px;
  background: linear-gradient(145deg, #26384e, #172538);
  box-shadow: 0 4px 0 #070d16;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}

.drive-btn span {
  font-size: 19px;
}

.drive-btn small {
  font-size: 8px;
  font-weight: 900;
}

.drive-btn:active,
.drive-btn.pressed {
  transform: translateY(3px);
  box-shadow: none;
  filter: brightness(1.2);
}

.steering-btn {
  width: 48px;
  height: 57px;
  font-size: 21px;
}

.pedal-controls .drive-btn {
  width: 51px;
  height: 57px;
}

.accelerate-btn {
  border-color: #32875f;
  background: linear-gradient(145deg, #217650, #15452f);
  color: #aaffd6;
}

.reverse-btn {
  border-color: #846a3d;
}

.brake-btn {
  border-color: #884550;
  background: linear-gradient(145deg, #63313b, #381e28);
}

.game-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 13px 0 25px;
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

#speedText {
  color: var(--accent);
}

/* SETTINGS */

.settings-card {
  padding: 17px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--panel);
}

.settings-card > label:first-child {
  display: block;
  margin-bottom: 9px;
  color: var(--muted);
  font-size: 11px;
}

.settings-card > input[type="text"] {
  width: 100%;
  min-height: 45px;
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  outline: none;
  background: #0c1523;
  color: var(--text);
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 15px 0;
  border-top: 1px solid var(--border);
}

.setting-row strong {
  display: block;
  font-size: 12px;
}

.setting-row small {
  display: block;
  margin-top: 5px;
  color: var(--muted);
  font-size: 10px;
}

.setting-row input {
  width: 20px;
  height: 20px;
  accent-color: var(--accent);
}

.settings-card .primary-btn {
  margin-top: 12px;
}

.danger-btn {
  width: 100%;
  margin: 15px 0 25px;
  padding: 14px;
  border: 1px solid #75404a;
  border-radius: 11px;
  background: #321d27;
  color: #ff9baa;
  font-size: 11px;
  font-weight: 900;
}

/* SIDE MENU */

.side-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: min(300px, 82vw);
  padding: 20px;
  border-right: 1px solid var(--border);
  background: #101a2a;
  transform: translateX(-105%);
  transition: transform 0.25s ease;
}

.side-menu.open {
  transform: translateX(0);
}

.menu-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.menu-heading h2 {
  font-size: 16px;
}

.menu-link {
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border);
  border-radius: 11px;
  background: var(--panel);
  text-align: left;
  font-weight: 700;
}

.menu-bottom {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.menu-bottom strong {
  color: var(--accent);
  font-size: 11px;
}

.menu-bottom small {
  color: var(--muted);
}

.menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 25;
  display: none;
  background: #0009;
}

.menu-backdrop.visible {
  display: block;
}

/* NOTIFICATION */

.toast {
  position: fixed;
  z-index: 50;
  left: 50%;
  bottom: 24px;
  width: max-content;
  max-width: calc(100vw - 32px);
  padding: 13px 18px;
  border: 1px solid #38634e;
  border-radius: 12px;
  background: #142b23;
  color: #c5ffe0;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 12px);
  transition: opacity 0.2s, transform 0.2s;
}

.toast.visible {
  opacity: 1;
  transform: translate(-50%, 0);
}

/* RESPONSIVE LAYOUT */

@media (min-width: 600px) {
  .game-app {
    padding: 24px;
  }

  .hero-panel {
    min-height: 330px;
    padding: 30px;
  }

  .progress-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .car-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .level-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .steering-btn {
    width: 65px;
    height: 65px;
  }

  .pedal-controls .drive-btn {
    width: 65px;
    height: 65px;
  }
}

@media (max-width: 380px) {
  .game-app {
    padding: 10px;
  }

  .brand-icon {
    width: 38px;
    height: 38px;
  }

  .brand p {
    font-size: 8px;
    letter-spacing: 0.8px;
  }

  .main-tabs {
    gap: 3px;
  }

  .tab-btn {
    font-size: 9px;
  }

  .hero-panel {
    min-height: 285px;
    padding: 17px 13px;
  }

  .hero-content h2 {
    font-size: 26px;
  }

  .hero-car {
    right: -25px;
    bottom: 20px;
    font-size: 85px;
  }

  .steering-controls,
  .pedal-controls {
    gap: 5px;
  }

  .steering-btn {
    width: 39px;
    height: 51px;
  }

  .pedal-controls .drive-btn {
    width: 43px;
    height: 51px;
  }

  .drive-btn small {
    font-size: 7px;
  }

  .driving-controls {
    gap: 5px;
    padding: 9px 5px;
  }

  .hud-item strong {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
