/**
 * Pixel Crawler - Standalone RPG Typing Battle (Web & Mobile Edition)
 * Zero-Backend Single Player Prototype for GitHub Pages
 */

// ==========================================
// 1. SOUND SYSTEM (Web Audio API Synthesizer)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSwordClash(pitch = 1.0) {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2400 * pitch, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      noiseFilter.Q.setValueAtTime(4, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.linearRampToValueAtTime(0.001, now + 0.08);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.08);

      const blade = this.ctx.createOscillator();
      const bladeGain = this.ctx.createGain();
      blade.type = 'triangle';
      blade.frequency.setValueAtTime(1600 * pitch, now);
      blade.frequency.exponentialRampToValueAtTime(900 * pitch, now + 0.07);
      bladeGain.gain.setValueAtTime(0.15, now);
      bladeGain.gain.linearRampToValueAtTime(0.001, now + 0.07);

      blade.connect(bladeGain);
      bladeGain.connect(this.ctx.destination);
      blade.start(now);
      blade.stop(now + 0.07);
    } catch (e) { }
  }

  playLightSwordSlash() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [2400, 3300, 4800].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.015);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.45, now + i * 0.015 + 0.08);
        oscGain.gain.setValueAtTime(0.12, now + i * 0.015);
        oscGain.gain.linearRampToValueAtTime(0.001, now + i * 0.015 + 0.08);
        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);
        osc.start(now + i * 0.015);
        osc.stop(now + i * 0.015 + 0.08);
      });
    } catch (e) { }
  }

  playHeavySwordCleave() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [480, 960].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.20);
        oscGain.gain.setValueAtTime(0.24, now);
        oscGain.gain.linearRampToValueAtTime(0.001, now + 0.20);
        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.20);
      });
    } catch (e) { }
  }

  playArcaneMagicNova() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.025);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.08, now + i * 0.025 + 0.18);
        gain.gain.setValueAtTime(0.14, now + i * 0.025);
        gain.gain.linearRampToValueAtTime(0.001, now + i * 0.025 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.025);
        osc.stop(now + i * 0.025 + 0.18);
      });
    } catch (e) { }
  }

  playHeavyFistImpact() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(160, now);
      sub.frequency.exponentialRampToValueAtTime(32, now + 0.22);
      subGain.gain.setValueAtTime(0.40, now);
      subGain.gain.linearRampToValueAtTime(0.001, now + 0.22);
      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 0.22);
    } catch (e) { }
  }

  playBossAttack() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.3);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) { }
  }

  playGameOver() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [220, 196, 174.61, 130.81].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.2);
        gain.gain.setValueAtTime(0.22, now + i * 0.2);
        gain.gain.linearRampToValueAtTime(0.001, now + i * 0.2 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.2);
        osc.stop(now + i * 0.2 + 0.4);
      });
    } catch (e) { }
  }

  playBossDeath() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(20, now + 0.6);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) { }
  }
}

const sfx = new SoundFX();

// ==========================================
// 2. CURRICULUM & WORD DICTIONARIES
// ==========================================
const PROGRAMS = {
  'program_1': {
    id: 'program_1',
    name: 'Program 1: Kata Dasar (3-4 Huruf)',
    badge: '🟢 PEMULA',
    words: [
      'API', 'AIR', 'KAYU', 'BATU', 'EMAS', 'NAGA', 'PETI', 'OBOR',
      'SIAP', 'BUMI', 'KURA', 'RAJA', 'DAUN', 'GUA', 'HARI', 'RUSA', 'BESI', 'GIGI'
    ]
  },
  'program_2': {
    id: 'program_2',
    name: 'Program 2: Petualang Dungeon (5-7 Huruf)',
    badge: '🟡 MENENGAH',
    words: [
      'PEDANG', 'PANAH', 'PERISAI', 'SIHIR', 'KASTIL', 'HUTAN', 'DANAU',
      'DARAH', 'MUSUH', 'KUNCI', 'PINTU', 'RAMUAN', 'PRAJURIT', 'MALAM', 'SIANG', 'RAKSASA', 'CAHAYA'
    ]
  },
  'program_3': {
    id: 'program_3',
    name: 'Program 3: Legenda Kerajaan (8-12 Huruf)',
    badge: '🔴 TANTANGAN',
    words: [
      'PETUALANGAN', 'PENGHANCUR', 'LEGENDARIS', 'KEKUATAN', 'PANGLIMA',
      'KEABADIAN', 'PERANGKAP', 'KEGELAPAN', 'HALILINTAR', 'BENCANA',
      'KERAJAAN', 'PENYIHIR', 'PEMBURU', 'KEMENANGAN', 'PEMBERANI', 'KEMULIAAN'
    ]
  },
  'program_4': {
    id: 'program_4',
    name: 'Program 4: RPG English Adventure',
    badge: '⚔️ ENGLISH',
    words: [
      'SWORD', 'MAGIC', 'SHIELD', 'FIRE', 'CASTLE', 'DRAGON', 'KNIGHT',
      'WARRIOR', 'CRYSTAL', 'SHADOW', 'LIGHTNING', 'THUNDER', 'DUNGEON',
      'VALOR', 'STRIKE', 'BLADE', 'ARCHER', 'POTION', 'HEAL', 'HERO'
    ]
  }
};

// 4 Playable Hero Classes
const HERO_INFO_LIST = [
  { id: 0, name: 'Tulien (Knight)', role: 'Slash (Pedang)', icon: '🛡️', color: '#60a5fa' },
  { id: 1, name: 'Ayaka (Wizard)', role: 'Arcane (Sihir)', icon: '✨', color: '#f472b6' },
  { id: 2, name: 'Cleome (Rogue)', role: 'Pierce (Belati)', icon: '🗡️', color: '#34d399' },
  { id: 3, name: 'Sabin (Warrior)', role: 'Crush (Tinju)', icon: '🔨', color: '#fb923c' }
];

// Tactical Formation on Whitewood Vale Ground
const HERO_POSITIONS = [
  { x: 130, y: 380 },
  { x: 210, y: 375 },
  { x: 90,  y: 435 },
  { x: 170, y: 440 }
];

// ==========================================
// 3. ASSET MANIFEST & LOADER
// ==========================================
const ASSET_MANIFEST = {
  // Hero 0: Tulien (Knight)
  'hero_0_idle': `./Chara/tf_tallspritemv/characters/FF/Tulien/100037317/unit_idle_100037317.png`,
  'hero_0_standby': `./Chara/tf_tallspritemv/characters/FF/Tulien/100037317/unit_idle_100037317.png`,
  'hero_0_atk': `./Chara/tf_tallspritemv/characters/FF/Tulien/100037317/unit_atk_100037317.png`,
  'hero_0_win_before': `./Chara/tf_tallspritemv/characters/FF/Tulien/100037317/unit_win_before_100037317.png`,
  'hero_0_dead': `./Chara/tf_tallspritemv/characters/FF/Tulien/100037317/unit_dead_100037317.png`,
  'hero_0_run': `./Chara/tf_tallspritemv/characters/FF/Tulien/100037317/unit_move_100037317.png`,

  // Hero 1: Ayaka (Wizard)
  'hero_1_idle': `./Chara/tf_tallspritemv/characters/FF/Ayaka (7)/100008607_idle.png`,
  'hero_1_standby': `./Chara/tf_tallspritemv/characters/FF/Ayaka (7)/100008607_magic_standby.png`,
  'hero_1_atk': `./Chara/tf_tallspritemv/characters/FF/Ayaka (7)/100008607_atk.png`,
  'hero_1_magic_atk': `./Chara/tf_tallspritemv/characters/FF/Ayaka (7)/100008607_magic_atk.png`,
  'hero_1_win_before': `./Chara/tf_tallspritemv/characters/FF/Ayaka (7)/100008607_win_before.png`,
  'hero_1_dead': `./Chara/tf_tallspritemv/characters/FF/Ayaka (7)/100008607_dead.png`,

  // Hero 2: Cleome (Rogue)
  'hero_2_idle': `./Chara/tf_tallspritemv/characters/FF/Cleome/Cleome NV/unit_idle_100030717.png`,
  'hero_2_standby': `./Chara/tf_tallspritemv/characters/FF/Cleome/Cleome NV/unit_standby_100030717.png`,
  'hero_2_atk': `./Chara/tf_tallspritemv/characters/FF/Cleome/Cleome NV/unit_atk_100030717.png`,
  'hero_2_win_before': `./Chara/tf_tallspritemv/characters/FF/Cleome/Cleome NV/unit_win_before_100030717.png`,
  'hero_2_dead': `./Chara/tf_tallspritemv/characters/FF/Cleome/Cleome NV/unit_dead_100030717.png`,

  // Hero 3: Sabin (Warrior)
  'hero_3_idle': `./Chara/tf_tallspritemv/characters/FF/Mobile - Final Fantasy Brave Exvius - Embracer of Freedom Sabin/unit_idle_206003307.png`,
  'hero_3_standby': `./Chara/tf_tallspritemv/characters/FF/Mobile - Final Fantasy Brave Exvius - Embracer of Freedom Sabin/unit_standby_206003307.png`,
  'hero_3_atk': `./Chara/tf_tallspritemv/characters/FF/Mobile - Final Fantasy Brave Exvius - Embracer of Freedom Sabin/unit_atk_206003307.png`,
  'hero_3_win_before': `./Chara/tf_tallspritemv/characters/FF/Mobile - Final Fantasy Brave Exvius - Embracer of Freedom Sabin/unit_win_before_206003307.png`,
  'hero_3_dead': `./Chara/tf_tallspritemv/characters/FF/Mobile - Final Fantasy Brave Exvius - Embracer of Freedom Sabin/unit_dead_206003307.png`,

  // Boss Waves
  'boss_wave_0_idle': `./Chara/tf_tallspritemv/characters/FF/401010917/unit_standby_401010917.png`,
  'boss_wave_0_atk': `./Chara/tf_tallspritemv/characters/FF/401010917/unit_atk_401010917.png`,
  'boss_wave_0_death': `./Chara/tf_tallspritemv/characters/FF/401010917/unit_dying_401010917.png`,

  'boss_wave_1_idle': `./Chara/tf_tallspritemv/characters/FF/Veritas of the Earth (6)/100008106_idle.png`,
  'boss_wave_1_atk': `./Chara/tf_tallspritemv/characters/FF/Veritas of the Earth (6)/100008106_atk.png`,
  'boss_wave_1_death': `./Chara/tf_tallspritemv/characters/FF/Veritas of the Earth (6)/100008106_dead.png`,

  'boss_wave_2_idle': `./Chara/tf_tallspritemv/characters/output_characters/DF_Actor_char_7.png`,
  'boss_wave_2_death': `./Chara/tf_tallspritemv/characters/output_characters/DF_Damage_damage_7.png`,
  'boss_wave_3_idle': `./Chara/tf_tallspritemv/characters/output_characters/DF_Actor_char_8.png`,
  'boss_wave_3_death': `./Chara/tf_tallspritemv/characters/output_characters/DF_Damage_damage_8.png`,

  // Whitewood Vale Parallax Map Layers
  'map_sky': `./Map/Hand Painted Parallax BG - Whitewood Vale - FREE Version/PNG Files/SKY/sky.png`,
  'map_cloud': `./Map/Hand Painted Parallax BG - Whitewood Vale - FREE Version/PNG Files/SKY/cloud.png`,
  'map_mountains': `./Map/Hand Painted Parallax BG - Whitewood Vale - FREE Version/PNG Files/HILLS, MOUNTAINS/mountains.png`,
  'map_hill': `./Map/Hand Painted Parallax BG - Whitewood Vale - FREE Version/PNG Files/HILLS, MOUNTAINS/hill_background.png`,
  'map_trees': `./Map/Hand Painted Parallax BG - Whitewood Vale - FREE Version/PNG Files/TREES/Tree Clusters/tree_cluster_2D.png`,
  'map_ground': `./Map/Hand Painted Parallax BG - Whitewood Vale - FREE Version/PNG Files/GROUND/ground_with_foliage.png`,

  // Combat Slash VFX Sprite Sheets (Rogue - Cleome)
  'vfx_slash_1': `./Chara/Vfx/Slash/VFX 1/sprite-sheet.png`,
  'vfx_slash_2': `./Chara/Vfx/Slash/VFX 2/sprite-sheet.png`,
  'vfx_slash_3': `./Chara/Vfx/Slash/VFX 3/sprite-sheet.png`,
  'vfx_slash_4': `./Chara/Vfx/Slash/VFX 4/sprite-sheet.png`,
  'vfx_slash_5': `./Chara/Vfx/Slash/VFX 5/sprite-sheet.png`,

  // Combat Fire Explosion VFX Sprite Sheets (Warrior - Sabin)
  'vfx_fire_1': `./Chara/Vfx/Pixel Art VFX - Fire Explosions - FREE Version/VFX1/sprite-sheet.png`,
  'vfx_fire_2': `./Chara/Vfx/Pixel Art VFX - Fire Explosions - FREE Version/VFX2/sprite-sheet.png`,
  'vfx_fire_3': `./Chara/Vfx/Pixel Art VFX - Fire Explosions - FREE Version/VFX3/sprite-sheet.png`,

  // Combat Priest / Celestial Magic VFX Sprite Sheets (Wizard - Ayaka)
  'vfx_priest_1': `./Chara/Vfx/Pixel Art VFX - Priest - FREE Version/VFX 1/sprite-sheet.png`,
  'vfx_priest_2': `./Chara/Vfx/Pixel Art VFX - Priest - FREE Version/VFX 2/sprite-sheet.png`,
  'vfx_priest_3': `./Chara/Vfx/Pixel Art VFX - Priest - FREE Version/VFX 3/sprite-sheet.png`,

  // Combat Impact VFX Sprite Sheets (Knight - Tulien)
  'vfx_impact_1': `./Chara/Vfx/Pixel Art VFX Impacts - FREE Version/VFX1/COLOR/sprite-sheet.png`,
  'vfx_impact_2': `./Chara/Vfx/Pixel Art VFX Impacts - FREE Version/VFX2/COLOR/sprite-sheet.png`,
  'vfx_impact_3': `./Chara/Vfx/Pixel Art VFX Impacts - FREE Version/VFX3/COLOR/sprite-sheet.png`,
  'vfx_impact_4': `./Chara/Vfx/Pixel Art VFX Impacts - FREE Version/VFX4/COLOR/sprite-sheet.png`,
  'vfx_impact_5': `./Chara/Vfx/Pixel Art VFX Impacts - FREE Version/VFX5/COLOR/sprite-sheet.png`,
  'vfx_impact_6': `./Chara/Vfx/Pixel Art VFX Impacts - FREE Version/VFX6/COLOR/sprite-sheet.png`,
  'vfx_impact_7': `./Chara/Vfx/Pixel Art VFX Impacts - FREE Version/VFX7/COLOR/sprite-sheet.png`
};

const images = {};
let loadedCount = 0;
const totalAssets = Object.keys(ASSET_MANIFEST).length;

function loadAllAssets(onComplete) {
  for (const [key, src] of Object.entries(ASSET_MANIFEST)) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      images[key] = img;
      loadedCount++;
      if (loadedCount >= totalAssets && onComplete) onComplete();
    };
    img.onerror = () => {
      loadedCount++;
      if (loadedCount >= totalAssets && onComplete) onComplete();
    };
  }
}

// ==========================================
// 4. STANDALONE PROTOTYPE BATTLE ENGINE
// ==========================================
class StandaloneArenaEngine {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    this.score = 0;
    this.stage = 1;
    this.currentProgram = 'program_1';
    this.bossHp = 400;
    this.maxBossHp = 400;
    this.teamHp = 100;
    this.maxTeamHp = 100;
    this.isGameOver = false;
    this.isStageClear = false;

    this.activeHeroIndex = 0;
    this.currentWord = 'SIAP';
    this.currentTyped = '';
    this.wordsClearedInStage = 0;

    this.partyMembers = [];
    this.initHeroes();

    // Boss State
    this.boss = {
      x: 740,
      y: 435,
      baseX: 740,
      baseY: 435,
      name: 'BEAST LORD IGNACIO',
      type: 'beast',
      state: 'idle',
      dashTimer: 0,
      dashDuration: 0.95,
      targetX: 0,
      targetY: 0,
      isDead: false,
      flashHurt: 0,
      hitShake: 0,
      knockbackX: 0,
      knockbackTimer: 0,
      knockbackOffset: 0,
      frameIndex: 0,
      frameTimer: 0,
      attackCooldown: 9.0 // Boss attacks every 9 seconds if not defeated
    };

    this.screenShake = 0;
    this.flyingLetters = [];
    this.particles = [];
    this.slashEffects = [];
    this.animatedVFX = [];
    this.floatingTexts = [];
    this.totalTime = 0;
    this.lastTime = performance.now();

    this.setupUI();
    this.setupControls();
    this.spawnNextWord();
    this.updateHUD();
  }

  initHeroes() {
    this.partyMembers = [];
    for (let i = 0; i < 4; i++) {
      const info = HERO_INFO_LIST[i];
      const pos = HERO_POSITIONS[i];
      this.partyMembers.push({
        id: `hero_${i}`,
        name: info.name,
        heroIndex: i,
        heroInfo: info,
        x: pos.x,
        y: pos.y,
        baseX: pos.x,
        baseY: pos.y,
        state: 'idle',
        dashTimer: 0,
        dashDuration: 0.24,
        attackTimer: 0,
        comboStep: 0,
        hitRecoilTimer: 0,
        hitFlashTimer: 0,
        frameIndex: 0,
        frameTimer: 0,
        isTurn: (i === 0)
      });
    }
  }

  spawnNextWord() {
    const list = PROGRAMS[this.currentProgram].words;
    let nextWord = list[Math.floor(Math.random() * list.length)].toUpperCase();
    if (nextWord === this.currentWord && list.length > 1) {
      nextWord = list[(list.indexOf(nextWord) + 1) % list.length].toUpperCase();
    }
    this.currentWord = nextWord;
    this.currentTyped = '';
    this.updateTargetCard();
  }

  setupControls() {
    // 1. Physical Keyboard
    window.addEventListener('keydown', (e) => {
      sfx.init();
      if (this.isGameOver || this.isStageClear) return;
      if (e.key.length === 1) {
        this.handleCharInput(e.key.toUpperCase());
      }
    });

    // 2. Mobile Touch Screen Virtual Keyboard
    document.querySelectorAll('.touch-key').forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sfx.init();
        if (this.isGameOver || this.isStageClear) return;
        const key = btn.getAttribute('data-key');
        if (key) this.handleCharInput(key.toUpperCase());
      });
    });

    // 3. Hidden input for native mobile device keyboards
    const hiddenInput = document.getElementById('mobile-hidden-input');
    const canvas = document.getElementById('gameCanvas');
    if (canvas && hiddenInput) {
      canvas.addEventListener('click', () => {
        sfx.init();
        hiddenInput.focus();
      });
      hiddenInput.addEventListener('input', (e) => {
        if (hiddenInput.value) {
          const char = hiddenInput.value.slice(-1).toUpperCase();
          this.handleCharInput(char);
          hiddenInput.value = '';
        }
      });
    }
  }

  setupUI() {
    // Program Select
    const progSel = document.getElementById('program-select');
    if (progSel) {
      progSel.addEventListener('change', (e) => {
        this.currentProgram = e.target.value;
        const progBadge = document.getElementById('program-badge');
        if (progBadge) progBadge.textContent = `${PROGRAMS[this.currentProgram].badge} ${PROGRAMS[this.currentProgram].name.toUpperCase()}`;
        this.spawnNextWord();
      });
    }

    // Skip Word Button
    const skipBtn = document.getElementById('btn-skip-turn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        this.rotateTurn();
        this.spawnNextWord();
      });
    }

    // Reset Stage Button
    const resetBtn = document.getElementById('btn-reset-pos');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.stage = 1;
        this.score = 0;
        this.teamHp = 100;
        this.startStage(1);
      });
    }

    // Sound Toggle
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        sfx.enabled = !sfx.enabled;
        soundBtn.textContent = sfx.enabled ? '🔊 Suara: ON' : '🔇 Suara: OFF';
      });
    }

    // Fullscreen Toggle
    const fsBtn = document.getElementById('btn-fullscreen');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    // Touch Keyboard Toggle
    const kbDrawer = document.getElementById('virtual-keyboard-drawer');
    const touchToggleBtn = document.getElementById('btn-touch-toggle');
    if (touchToggleBtn && kbDrawer) {
      touchToggleBtn.addEventListener('click', () => {
        const isHidden = kbDrawer.style.display === 'none';
        kbDrawer.style.display = isHidden ? 'flex' : 'none';
        touchToggleBtn.textContent = isHidden ? '📱 KEYBOARD ON' : '📱 KEYBOARD OFF';
      });
    }

    // Next Wave Button in Modal
    const nextWaveBtn = document.getElementById('btn-next-wave');
    if (nextWaveBtn) {
      nextWaveBtn.addEventListener('click', () => {
        const modal = document.getElementById('stage-clear-modal');
        if (modal) modal.style.display = 'none';
        this.isStageClear = false;
        this.startStage(this.stage + 1);
      });
    }

    // Restart Button in Modal
    const restartBtn = document.getElementById('btn-restart-game');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        const goModal = document.getElementById('game-over-modal');
        if (goModal) goModal.style.display = 'none';
        this.isGameOver = false;
        this.score = 0;
        this.teamHp = 100;
        this.startStage(1);
      });
    }
  }

  handleCharInput(char) {
    const targetChar = this.currentWord[this.currentTyped.length];
    if (char === targetChar) {
      this.currentTyped += char;
      const progressPitch = 0.9 + (this.currentTyped.length * 0.08);
      sfx.playSwordClash(progressPitch);

      const activeHero = this.partyMembers[this.activeHeroIndex];
      activeHero.attackTimer = 0.18;
      activeHero.comboStep = (activeHero.comboStep || 0) + 1;

      // Flying glowing letter from hero to boss
      this.spawnFlyingLetter(activeHero.x, activeHero.y - 20, this.boss.x, this.boss.y - 20, char);

      // Trigger Class-Specific Hit VFX on Boss
      const classId = activeHero.heroIndex;
      if (classId === 0) {
        // Knight Tulien: Impact VFX
        const vfxList = ['vfx_impact_1', 'vfx_impact_3', 'vfx_impact_4', 'vfx_impact_5'];
        const chosen = vfxList[(activeHero.comboStep - 1) % vfxList.length];
        this.spawnAnimatedVFX(chosen, this.boss.x - 10, this.boss.y - 15, { scale: 1.6, duration: 0.18 });
      } else if (classId === 1) {
        // Wizard Ayaka: Priest Celestial Magic VFX
        const vfxList = ['vfx_priest_1', 'vfx_priest_3', 'vfx_priest_1', 'vfx_priest_2'];
        const chosen = vfxList[(activeHero.comboStep - 1) % vfxList.length];
        this.spawnAnimatedVFX(chosen, this.boss.x - 10, this.boss.y - 15, { scale: 1.3, duration: 0.22 });
      } else if (classId === 2) {
        // Rogue Cleome: Shadow Slash VFX
        const vfxList = ['vfx_slash_3', 'vfx_slash_2', 'vfx_slash_1', 'vfx_slash_5', 'vfx_slash_4'];
        const chosen = vfxList[(activeHero.comboStep - 1) % vfxList.length];
        this.spawnAnimatedVFX(chosen, this.boss.x - 10, this.boss.y - 15, {
          scale: 1.15, duration: 0.18, filter: 'hue-rotate(255deg) saturate(190%) brightness(1.2)'
        });
      } else if (classId === 3) {
        // Warrior Sabin: Fire Explosions VFX
        const vfxList = ['vfx_fire_1', 'vfx_fire_2', 'vfx_fire_1', 'vfx_fire_3'];
        const chosen = vfxList[(activeHero.comboStep - 1) % vfxList.length];
        this.spawnAnimatedVFX(chosen, this.boss.x - 10, this.boss.y - 15, { scale: 1.25, duration: 0.20 });
      }

      this.boss.flashHurt = 0.15;
      this.boss.hitShake = 0.12;
      this.boss.knockbackX = 14;
      this.boss.knockbackTimer = 0.15;
      this.spawnHitSparks(this.boss.x, this.boss.y - 20, '#fbbf24', 10);

      this.updateTargetCard();

      // Check if word is completed!
      if (this.currentTyped.length === this.currentWord.length) {
        this.onWordCompleted();
      }
    } else {
      // Typo
      const activeHero = this.partyMembers[this.activeHeroIndex];
      this.addFloatingText(activeHero.x, activeHero.y - 24, 'MISS!', '#ef4444');
    }
  }

  onWordCompleted() {
    const damage = 35 + (this.currentWord.length * 10);
    this.score += 200 + (this.currentWord.length * 20);
    this.bossHp = Math.max(0, this.bossHp - damage);
    this.wordsClearedInStage++;

    const hero = this.partyMembers[this.activeHeroIndex];
    hero.comboStep = 0;
    hero.state = 'dash';
    hero.dashTimer = 0;
    hero.dashDuration = 0.90;
    hero.targetX = this.boss.x - 70;
    hero.targetY = this.boss.y;

    const classId = hero.heroIndex;
    if (classId === 0) {
      sfx.playHeavySwordCleave();
      this.spawnKnightSlashFX(this.boss.x, this.boss.y - 20);
      this.addFloatingText(this.boss.x, this.boss.y - 45, `HOLY CLEAVE! -${damage}`, '#60a5fa');
    } else if (classId === 1) {
      sfx.playArcaneMagicNova();
      this.spawnWizardMagicFX(this.boss.x, this.boss.y - 20);
      this.addFloatingText(this.boss.x, this.boss.y - 45, `ARCANE NOVA! -${damage}`, '#f472b6');
    } else if (classId === 2) {
      sfx.playLightSwordSlash();
      this.spawnGrandSlashFX(this.boss.x, this.boss.y - 20);
      this.addFloatingText(this.boss.x, this.boss.y - 45, `SHADOW SLICE! -${damage}`, '#c084fc');
    } else {
      sfx.playHeavyFistImpact();
      this.spawnWarriorFistFX(this.boss.x, this.boss.y - 20);
      this.addFloatingText(this.boss.x, this.boss.y - 45, `DRAGON BLITZ! -${damage}`, '#fb923c');
    }

    this.boss.flashHurt = 0.45;
    this.boss.hitShake = 0.35;
    this.boss.knockbackX = 35;
    this.boss.knockbackTimer = 0.30;

    if (this.bossHp <= 0) {
      this.onBossDefeated();
    } else {
      this.rotateTurn();
      setTimeout(() => this.spawnNextWord(), 400);
    }

    this.updateHUD();
  }

  rotateTurn() {
    this.activeHeroIndex = (this.activeHeroIndex + 1) % 4;
    this.partyMembers.forEach((h, idx) => {
      h.isTurn = (idx === this.activeHeroIndex);
    });
    this.updateHUD();
  }

  onBossDefeated() {
    this.boss.isDead = true;
    this.isStageClear = true;
    sfx.playBossDeath();
    this.addFloatingText(this.boss.x, this.boss.y - 65, `BOSS DEFEATED! +1000 PTS`, '#10b981');
    this.score += 1000;

    this.partyMembers.forEach(h => {
      h.state = 'win_before';
      h.winTimer = 0;
    });

    setTimeout(() => {
      const modal = document.getElementById('stage-clear-modal');
      const desc = document.getElementById('stage-clear-desc');
      if (desc) desc.textContent = `Hebat! ${this.boss.name} berhasil dikalahkan dengan ${this.wordsClearedInStage} kata terselesaikan.`;
      if (modal) modal.style.display = 'flex';
    }, 1200);
  }

  startStage(stageNumber) {
    this.stage = stageNumber;
    this.maxBossHp = 350 + (this.stage * 100);
    this.bossHp = this.maxBossHp;
    this.wordsClearedInStage = 0;
    this.boss.isDead = false;
    this.boss.attackCooldown = Math.max(6.0, 9.5 - (this.stage * 0.5));

    const bossNames = [
      'BEAST LORD IGNACIO',
      'VERITAS OF THE EARTH',
      'SKELETON MAGE',
      'DEMON GENERAL'
    ];
    const waveIdx = (this.stage - 1) % bossNames.length;
    this.boss.name = `${bossNames[waveIdx]} LV.${this.stage}`;

    this.partyMembers.forEach(h => {
      h.state = 'idle';
      h.x = h.baseX;
      h.y = h.baseY;
    });

    this.spawnNextWord();
    this.updateHUD();
  }

  triggerBossAttack() {
    if (this.boss.isDead || this.isGameOver || this.isStageClear) return;
    sfx.playBossAttack();

    this.boss.state = 'dash';
    this.boss.dashTimer = 0;
    this.boss.dashDuration = 0.95;
    this.boss.targetX = 220;
    this.boss.targetY = this.boss.baseY;
    this.boss.hitApplied = false;
    this.boss.lastDamage = 15 + Math.floor(Math.random() * 10);
  }

  onGameOver() {
    this.isGameOver = true;
    sfx.playGameOver();
    const modal = document.getElementById('game-over-modal');
    if (modal) modal.style.display = 'flex';
  }

  updateHUD() {
    // Score & Stage
    const scoreEl = document.getElementById('score-display');
    const stageEl = document.getElementById('stage-display');
    if (scoreEl) scoreEl.textContent = `🏆 SKOR: ${this.score}`;
    if (stageEl) stageEl.textContent = `🚩 WAVE: ${this.stage}`;

    // Boss HP
    const bossNameEl = document.getElementById('boss-name');
    const bossHpText = document.getElementById('boss-hp-text');
    const bossHpFill = document.getElementById('boss-hp-fill');
    if (bossNameEl) bossNameEl.textContent = `👹 ${this.boss.name}`;
    if (bossHpText) bossHpText.textContent = `${Math.round(this.bossHp)} / ${this.maxBossHp}`;
    if (bossHpFill) {
      const pct = Math.max(0, (this.bossHp / this.maxBossHp) * 100);
      bossHpFill.style.width = `${pct}%`;
    }

    // Team HP
    const teamHpText = document.getElementById('team-hp-text');
    const teamHpFill = document.getElementById('team-hp-fill');
    if (teamHpText) teamHpText.textContent = `${Math.round(this.teamHp)} / ${this.maxTeamHp}`;
    if (teamHpFill) {
      const teamPct = Math.max(0, (this.teamHp / this.maxTeamHp) * 100);
      teamHpFill.style.width = `${teamPct}%`;
      teamHpFill.style.background = (teamPct <= 25) ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #10b981, #059669)';
    }

    // Active Hero Banner
    const currentHeroEl = document.getElementById('current-hero-name');
    const activeHero = this.partyMembers[this.activeHeroIndex];
    if (currentHeroEl && activeHero) {
      currentHeroEl.textContent = `${activeHero.heroInfo.icon} ${activeHero.heroInfo.name.toUpperCase()}`;
      currentHeroEl.style.color = activeHero.heroInfo.color;
    }

    // Party Sidebar UI
    const partyLineupEl = document.getElementById('party-lineup-ui');
    if (partyLineupEl) {
      partyLineupEl.innerHTML = this.partyMembers.map((h, idx) => `
        <div class="hero-party-card ${h.isTurn ? 'active' : ''}">
          <span class="hero-party-icon">${h.heroInfo.icon}</span>
          <div class="hero-party-info">
            <span class="hero-party-name" style="color: ${h.heroInfo.color}">${h.heroInfo.name}</span>
            <span class="hero-party-role">${h.heroInfo.role}</span>
          </div>
        </div>
      `).join('');
    }
  }

  updateTargetCard() {
    const targetWordUI = document.getElementById('target-word-ui');
    if (!targetWordUI) return;

    targetWordUI.innerHTML = '';
    for (let i = 0; i < this.currentWord.length; i++) {
      const char = this.currentWord[i];
      const keyEl = document.createElement('div');
      keyEl.className = 'keycap';
      if (i < this.currentTyped.length) {
        keyEl.classList.add('done');
      } else if (i === this.currentTyped.length) {
        keyEl.classList.add('active');
      }
      keyEl.textContent = char;
      targetWordUI.appendChild(keyEl);
    }
  }

  spawnFlyingLetter(sx, sy, tx, ty, char) {
    this.flyingLetters.push({
      char: char.toUpperCase(),
      x: sx, y: sy, sx: sx, sy: sy, tx: tx, ty: ty,
      progress: 0, duration: 0.20, color: '#10b981'
    });
  }

  spawnHitSparks(x, y, color = '#10b981', count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 80;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color, life: 0.4, maxLife: 0.4, size: 2.5 + Math.random() * 2.5
      });
    }
  }

  spawnAnimatedVFX(vfxKey, x, y, options = {}) {
    const defaultFrames = {
      'vfx_slash_1': 10, 'vfx_slash_2': 9, 'vfx_slash_3': 10, 'vfx_slash_4': 7, 'vfx_slash_5': 8,
      'vfx_fire_1': 8, 'vfx_fire_2': 8, 'vfx_fire_3': 7,
      'vfx_priest_1': 8, 'vfx_priest_2': 11, 'vfx_priest_3': 12,
      'vfx_impact_1': 4, 'vfx_impact_2': 7, 'vfx_impact_3': 5, 'vfx_impact_4': 5, 'vfx_impact_5': 6, 'vfx_impact_6': 7, 'vfx_impact_7': 7
    };
    const defaultCols = {
      'vfx_slash_1': 2, 'vfx_slash_2': 2, 'vfx_slash_3': 2, 'vfx_slash_4': 2, 'vfx_slash_5': 2,
      'vfx_fire_1': 8, 'vfx_fire_2': 8, 'vfx_fire_3': 7,
      'vfx_priest_1': 5, 'vfx_priest_2': 5, 'vfx_priest_3': 5,
      'vfx_impact_1': 5, 'vfx_impact_2': 5, 'vfx_impact_3': 5, 'vfx_impact_4': 5, 'vfx_impact_5': 5, 'vfx_impact_6': 5, 'vfx_impact_7': 5
    };
    const defaultDimensions = {
      'vfx_impact_1': { w: 64, h: 64 }, 'vfx_impact_2': { w: 64, h: 64 }, 'vfx_impact_3': { w: 64, h: 64 }, 'vfx_impact_4': { w: 64, h: 64 },
      'vfx_impact_5': { w: 128, h: 64 }, 'vfx_impact_6': { w: 128, h: 64 }, 'vfx_impact_7': { w: 128, h: 64 }
    };
    const totalFrames = options.totalFrames || defaultFrames[vfxKey] || 8;
    const cols = options.cols || defaultCols[vfxKey] || 2;
    const dim = defaultDimensions[vfxKey] || { w: 128, h: 128 };
    const frameW = options.frameW || dim.w;
    const frameH = options.frameH || dim.h;
    this.animatedVFX.push({
      key: vfxKey, x: x + (options.offsetX || 0), y: y + (options.offsetY || 0),
      elapsed: 0, duration: options.duration || 0.24, totalFrames, cols, frameW, frameH,
      scale: options.scale || 1.15, rotation: options.rotation || 0, flipX: !!options.flipX,
      filter: options.filter || null, delay: options.delay || 0
    });
  }

  spawnKnightSlashFX(x, y) {
    this.screenShake = 0.75;
    const impactSequence = [
      { key: 'vfx_impact_1', delay: 0.00, scale: 1.90, rot: 0.0, offX: -12, offY: -10 },
      { key: 'vfx_impact_5', delay: 0.08, scale: 2.10, rot: -0.15, offX: 10, offY: -15 },
      { key: 'vfx_impact_7', delay: 0.18, scale: 2.25, rot: 0.20, offX: -8, offY: 10 },
      { key: 'vfx_impact_6', delay: 0.28, scale: 2.50, rot: 0.0, offX: 0, offY: -5 }
    ];
    impactSequence.forEach(seq => {
      this.spawnAnimatedVFX(seq.key, x, y, {
        delay: seq.delay, duration: 0.22, scale: seq.scale, rotation: seq.rot, offsetX: seq.offX, offsetY: seq.offY
      });
    });
    this.spawnSparksCluster(x, y, ['#fbbf24', '#f59e0b', '#60a5fa', '#93c5fd', '#ffffff'], 40);
  }

  spawnWizardMagicFX(x, y) {
    this.screenShake = 0.65;
    const priestSequence = [
      { key: 'vfx_priest_1', delay: 0.00, scale: 1.45, rot: 0.0, offX: -10, offY: -10 },
      { key: 'vfx_priest_3', delay: 0.09, scale: 1.65, rot: 0.1, offX: 10, offY: -15 },
      { key: 'vfx_priest_2', delay: 0.20, scale: 1.95, rot: 0.0, offX: 0, offY: -20 },
      { key: 'vfx_priest_3', delay: 0.34, scale: 2.20, rot: -0.1, offX: 0, offY: 0 }
    ];
    priestSequence.forEach(seq => {
      this.spawnAnimatedVFX(seq.key, x, y, {
        delay: seq.delay, duration: 0.26, scale: seq.scale, rotation: seq.rot, offsetX: seq.offX, offsetY: seq.offY
      });
    });
    this.spawnSparksCluster(x, y, ['#f472b6', '#c084fc', '#e879f9', '#38bdf8', '#ffffff'], 45);
  }

  spawnGrandSlashFX(x, y) {
    this.screenShake = 0.70;
    const vfxSequence = [
      { key: 'vfx_slash_1', delay: 0.00, scale: 1.35, rot: -0.2, offX: -15, offY: -10 },
      { key: 'vfx_slash_2', delay: 0.07, scale: 1.35, rot: 0.3, offX: 10, offY: -15 },
      { key: 'vfx_slash_3', delay: 0.14, scale: 1.40, rot: 0.0, offX: -5, offY: 5 },
      { key: 'vfx_slash_4', delay: 0.22, scale: 1.50, rot: 0.1, offX: 0, offY: -10 },
      { key: 'vfx_slash_5', delay: 0.32, scale: 1.65, rot: -0.1, offX: 0, offY: 0 }
    ];
    vfxSequence.forEach(seq => {
      this.spawnAnimatedVFX(seq.key, x, y, {
        delay: seq.delay, duration: 0.22, scale: seq.scale, rotation: seq.rot, offsetX: seq.offX, offsetY: seq.offY,
        filter: 'hue-rotate(255deg) saturate(200%) brightness(1.25)'
      });
    });
    this.spawnSparksCluster(x, y, ['#c084fc', '#e879f9', '#a855f7', '#38bdf8', '#ffffff'], 45);
  }

  spawnWarriorFistFX(x, y) {
    this.screenShake = 0.80;
    const fireSequence = [
      { key: 'vfx_fire_1', delay: 0.00, scale: 1.45, rot: 0.0, offX: -15, offY: -10 },
      { key: 'vfx_fire_2', delay: 0.08, scale: 1.55, rot: 0.1, offX: 15, offY: -20 },
      { key: 'vfx_fire_1', delay: 0.16, scale: 1.60, rot: -0.1, offX: -5, offY: 10 },
      { key: 'vfx_fire_2', delay: 0.24, scale: 1.75, rot: 0.15, offX: 10, offY: -15 },
      { key: 'vfx_fire_3', delay: 0.35, scale: 2.10, rot: 0.0, offX: 0, offY: -5 }
    ];
    fireSequence.forEach(seq => {
      this.spawnAnimatedVFX(seq.key, x, y, {
        delay: seq.delay, duration: 0.24, scale: seq.scale, rotation: seq.rot, offsetX: seq.offX, offsetY: seq.offY
      });
    });
    this.spawnSparksCluster(x, y, ['#ef4444', '#f97316', '#fbbf24', '#fde047', '#ffffff'], 48);
  }

  spawnSparksCluster(x, y, colors, count = 35) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 150;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0.45 + Math.random() * 0.3,
        maxLife: 0.65,
        size: 3 + Math.random() * 3.5
      });
    }
  }

  addFloatingText(x, y, text, color = '#ffffff') {
    this.floatingTexts.push({ x, y, text, color, life: 0.8, maxLife: 0.8, vy: -35 });
  }

  update(dt) {
    this.totalTime += dt;
    if (this.screenShake > 0) this.screenShake -= dt;

    // Boss Attack Timer logic
    if (!this.boss.isDead && !this.isGameOver && !this.isStageClear) {
      this.boss.attackCooldown -= dt;
      if (this.boss.attackCooldown <= 0) {
        this.boss.attackCooldown = Math.max(6.0, 9.5 - (this.stage * 0.5));
        this.triggerBossAttack();
      }
    }

    // Party Members Animation Loop
    this.partyMembers.forEach(h => {
      if (h.attackTimer > 0) h.attackTimer -= dt;
      if (h.hitRecoilTimer > 0) h.hitRecoilTimer -= dt;
      if (h.hitFlashTimer > 0) h.hitFlashTimer -= dt;

      if (h.state === 'dash') {
        h.dashTimer += dt;
        const progress = h.dashTimer / h.dashDuration;
        if (progress < 0.22) {
          const t = progress / 0.22;
          h.x = h.baseX + (h.targetX - h.baseX) * t;
          h.y = h.baseY + (h.targetY - h.baseY) * t;
        } else if (progress < 0.78) {
          h.x = h.targetX;
          h.y = h.targetY;
        } else if (progress < 1.0) {
          const t = (progress - 0.78) / 0.22;
          h.x = h.targetX + (h.baseX - h.targetX) * t;
          h.y = h.targetY + (h.baseY - h.targetY) * t;
        } else {
          h.state = 'idle';
          h.x = h.baseX;
          h.y = h.baseY;
        }
      }

      h.frameTimer += dt;
      if (h.frameTimer >= 0.12) {
        h.frameTimer = 0;
        h.frameIndex = (h.frameIndex + 1) % 4;
      }
    });

    // Boss Animation & Dash Logic
    if (this.boss.flashHurt > 0) this.boss.flashHurt -= dt;
    if (this.boss.hitShake > 0) this.boss.hitShake -= dt;
    if (this.boss.knockbackTimer > 0) {
      this.boss.knockbackTimer -= dt;
      const t = Math.max(0, this.boss.knockbackTimer / 0.16);
      this.boss.knockbackOffset = Math.sin(t * Math.PI) * this.boss.knockbackX;
    } else {
      this.boss.knockbackOffset = 0;
    }

    this.boss.frameTimer += dt;
    if (this.boss.frameTimer >= 0.12) {
      this.boss.frameTimer = 0;
      this.boss.frameIndex = (this.boss.frameIndex + 1) % 4;
    }

    if (this.boss.state === 'dash') {
      this.boss.dashTimer += dt;
      const progress = this.boss.dashTimer / this.boss.dashDuration;
      if (progress < 0.42) {
        const t = progress / 0.42;
        this.boss.x = this.boss.baseX + (this.boss.targetX - this.boss.baseX) * t;
      } else if (progress < 0.68) {
        this.boss.x = this.boss.targetX;
        if (!this.boss.hitApplied) {
          this.boss.hitApplied = true;
          this.screenShake = 0.5;
          sfx.playSwordClash(0.75);
          const dmg = this.boss.lastDamage || 20;
          this.teamHp = Math.max(0, this.teamHp - dmg);

          this.partyMembers.forEach(h => {
            h.hitRecoilTimer = 0.35;
            h.hitFlashTimer = 0.35;
            this.spawnHitSparks(h.x, h.y - 20, '#ef4444', 12);
            this.addFloatingText(h.x, h.y - 45, `-${dmg}`, '#ef4444');
          });

          this.updateHUD();
          if (this.teamHp <= 0) this.onGameOver();
        }
      } else if (progress < 1.0) {
        const t = (progress - 0.68) / 0.32;
        this.boss.x = this.boss.targetX + (this.boss.baseX - this.boss.targetX) * t;
      } else {
        this.boss.state = 'idle';
        this.boss.x = this.boss.baseX;
      }
    }

    // Update Flying Letters
    for (let i = this.flyingLetters.length - 1; i >= 0; i--) {
      const fl = this.flyingLetters[i];
      fl.progress += dt / fl.duration;
      fl.x = fl.sx + (fl.tx - fl.sx) * fl.progress;
      fl.y = fl.sy + (fl.ty - fl.sy) * fl.progress - Math.sin(fl.progress * Math.PI) * 20;
      if (fl.progress >= 1.0) this.flyingLetters.splice(i, 1);
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    // Update Animated Sprite VFX
    for (let i = this.animatedVFX.length - 1; i >= 0; i--) {
      const vfx = this.animatedVFX[i];
      if (vfx.delay > 0) {
        vfx.delay -= dt;
        continue;
      }
      vfx.elapsed += dt;
      if (vfx.elapsed >= vfx.duration) this.animatedVFX.splice(i, 1);
    }

    // Update Floating Text
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.life -= dt;
      ft.y += ft.vy * dt;
      if (ft.life <= 0) this.floatingTexts.splice(i, 1);
    }
  }

  render() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    ctx.save();
    if (this.screenShake > 0) {
      const shakeAmt = 8 * this.screenShake;
      ctx.translate((Math.random() - 0.5) * shakeAmt, (Math.random() - 0.5) * shakeAmt);
    }

    // 1. Whitewood Vale Parallax Map Layers
    const skyImg = images['map_sky'];
    const cloudImg = images['map_cloud'];
    const mountainImg = images['map_mountains'];
    const hillImg = images['map_hill'];
    const treesImg = images['map_trees'];
    const groundImg = images['map_ground'];

    if (skyImg && skyImg.complete) {
      ctx.drawImage(skyImg, 0, 0, width, height);

      if (cloudImg && cloudImg.complete) {
        const cloudW = 540;
        const cloudH = 220;
        const cloudSpeed = 10;
        const totalW = width + cloudW;
        const cloudX = ((this.totalTime * cloudSpeed) % totalW) - cloudW;
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.drawImage(cloudImg, cloudX, 20, cloudW, cloudH);
        ctx.restore();
      }

      if (mountainImg && mountainImg.complete) {
        ctx.drawImage(mountainImg, 0, 30, width, 400);
      }

      if (hillImg && hillImg.complete) {
        ctx.drawImage(hillImg, 0, 140, width, 260);
      }

      if (treesImg && treesImg.complete) {
        ctx.drawImage(treesImg, 0, 90, width, 380);
      }

      if (groundImg && groundImg.complete) {
        ctx.drawImage(groundImg, 0, 305, width, 235);
      }
    } else {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Draw 4 Heroes
    const sortedParty = [...this.partyMembers].sort((a, b) => a.y - b.y);
    sortedParty.forEach(hero => this.drawHero(ctx, hero));

    // 3. Draw Boss
    this.drawBoss(ctx);

    // 4. Draw Flying Letters
    for (const fl of this.flyingLetters) {
      ctx.save();
      ctx.font = 'bold 16px "Press Start 2P", monospace';
      ctx.fillStyle = fl.color;
      ctx.shadowColor = fl.color;
      ctx.shadowBlur = 12;
      ctx.textAlign = 'center';
      ctx.fillText(fl.char, Math.round(fl.x), Math.round(fl.y));
      ctx.restore();
    }

    // 5. Draw Animated Sprite VFX
    for (const vfx of this.animatedVFX) {
      if (vfx.delay > 0) continue;
      const img = images[vfx.key];
      if (!img || !img.complete) continue;
      const progress = Math.min(0.999, vfx.elapsed / vfx.duration);
      const frame = Math.floor(progress * vfx.totalFrames);
      const sx = (frame % vfx.cols) * vfx.frameW;
      const sy = Math.floor(frame / vfx.cols) * vfx.frameH;

      ctx.save();
      ctx.translate(Math.round(vfx.x), Math.round(vfx.y));
      if (vfx.flipX) ctx.scale(-1, 1);
      if (vfx.rotation) ctx.rotate(vfx.rotation);
      if (vfx.filter) ctx.filter = vfx.filter;

      const dw = vfx.frameW * (vfx.scale || 1.0);
      const dh = vfx.frameH * (vfx.scale || 1.0);
      ctx.drawImage(img, sx, sy, vfx.frameW, vfx.frameH, -dw / 2, -dh / 2, dw, dh);
      ctx.restore();
    }

    // 6. Draw Sparks
    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    }
    ctx.globalAlpha = 1.0;

    // 7. Draw Floating Numbers
    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.font = 'bold 10px "Press Start 2P", monospace';
      ctx.fillStyle = ft.color;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.9)';
      ctx.shadowBlur = 5;
      ctx.globalAlpha = Math.max(0, ft.life / ft.maxLife);
      ctx.fillText(ft.text, Math.round(ft.x), Math.round(ft.y));
      ctx.restore();
    }

    ctx.restore();
  }

  drawHero(ctx, hero) {
    const recoilOffset = (hero.hitRecoilTimer && hero.hitRecoilTimer > 0) ? -Math.sin((hero.hitRecoilTimer / 0.35) * Math.PI) * 18 : 0;
    const drawX = Math.round(hero.x + recoilOffset);
    const drawY = Math.round(hero.y);

    const isKnight = (hero.heroIndex === 0);
    const isAyaka = (hero.heroIndex === 1);
    const isCleome = (hero.heroIndex === 2);
    const isSabin = (hero.heroIndex === 3);

    // Realistic Ground Contact Shadow
    ctx.save();
    ctx.fillStyle = hero.isTurn ? 'rgba(245, 158, 11, 0.40)' : 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.ellipse(drawX, drawY + 1, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const isAction = (hero.state === 'dash');
    const isGameOver = this.isGameOver;
    const isTypingAttack = (hero.attackTimer && hero.attackTimer > 0);

    let spriteKey = `hero_${hero.heroIndex}_idle`;
    if (isKnight) {
      spriteKey = isGameOver ? 'hero_0_dead' : ((hero.state === 'win_before') ? 'hero_0_win_before' : ((isTypingAttack || isAction) ? 'hero_0_atk' : 'hero_0_standby'));
    } else if (isAyaka) {
      spriteKey = isGameOver ? 'hero_1_dead' : ((hero.state === 'win_before') ? 'hero_1_win_before' : (isAction ? 'hero_1_magic_atk' : (isTypingAttack ? 'hero_1_atk' : (hero.isTurn ? 'hero_1_standby' : 'hero_1_idle'))));
    } else if (isCleome) {
      spriteKey = isGameOver ? 'hero_2_dead' : ((hero.state === 'win_before') ? 'hero_2_win_before' : ((isTypingAttack || isAction) ? 'hero_2_atk' : (hero.isTurn ? 'hero_2_standby' : 'hero_2_idle')));
    } else if (isSabin) {
      spriteKey = isGameOver ? 'hero_3_dead' : ((hero.state === 'win_before') ? 'hero_3_win_before' : ((isTypingAttack || isAction) ? 'hero_3_atk' : (hero.isTurn ? 'hero_3_standby' : 'hero_3_idle')));
    }

    const sprite = images[spriteKey];
    ctx.save();
    if (hero.isTurn) {
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;
    }
    if (hero.hitFlashTimer && hero.hitFlashTimer > 0) {
      ctx.filter = 'brightness(2.2) saturate(200%)';
    }

    let fw = 32, fh = 32, sx = 0, sy = 0, scale = 1.0;
    if (sprite && sprite.complete) {
      if (isKnight) {
        scale = 72 / 94;
        if (isGameOver) {
          fw = sprite.width; fh = sprite.height;
        } else if (hero.state === 'win_before') {
          fw = sprite.width / 3; fh = sprite.height / 5;
          const winFrames = [0, 2, 4, 8, 10, 14];
          const progress = ((this.totalTime) % 1.2) / 1.2;
          const frame = winFrames[Math.floor(progress * winFrames.length)];
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else if (isTypingAttack || isAction) {
          fw = sprite.width / 3; fh = sprite.height / 5;
          const swingFrames = [9, 10, 11];
          const progress = Math.max(0, 1 - (hero.attackTimer / 0.16));
          const frame = swingFrames[Math.min(2, Math.floor(progress * 3))];
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else {
          fw = sprite.width / 3; fh = sprite.height / 2;
          const frame = hero.frameIndex % 4;
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        }
        const drawnW = fw * scale, drawnH = fh * scale;
        ctx.translate(drawX, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(sprite, sx, sy, fw, fh, -drawnW / 2, drawY - drawnH + 6, drawnW, drawnH);

      } else if (isAyaka) {
        if (isGameOver) {
          fw = sprite.width; fh = sprite.height;
        } else if (hero.state === 'win_before') {
          fw = sprite.width / 3; fh = sprite.height / 6;
          const winFrames = [0, 1, 3, 4, 14, 15];
          const progress = ((this.totalTime) % 1.2) / 1.2;
          const frame = winFrames[Math.floor(progress * winFrames.length)];
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else if (isAction) {
          fw = sprite.width / 3; fh = sprite.height / 2;
          const progress = (hero.dashDuration > 0) ? (hero.dashTimer / hero.dashDuration) : 0;
          const frame = Math.min(3, Math.floor(progress * 4));
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else if (isTypingAttack) {
          fw = sprite.width / 3; fh = sprite.height / 5;
          const swingFrames = [4, 6, 7, 8];
          const progress = Math.max(0, 1 - (hero.attackTimer / 0.16));
          const frame = swingFrames[Math.min(3, Math.floor(progress * 4))];
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else {
          fw = sprite.width / 3; fh = sprite.height / 2;
          const frame = hero.frameIndex % 4;
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        }
        ctx.translate(drawX, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(sprite, sx, sy, fw, fh, -fw / 2, drawY - fh + 6, fw, fh);

      } else if (isCleome) {
        scale = 1.0;
        if (isGameOver) {
          fw = sprite.width; fh = sprite.height;
        } else if (hero.state === 'win_before') {
          fw = sprite.width / 3; fh = sprite.height / 8;
          const winFrames = [0, 2, 4, 7, 10, 13, 16, 19, 21];
          const progress = ((this.totalTime) % 1.2) / 1.2;
          const frame = winFrames[Math.floor(progress * winFrames.length)];
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else if (isAction) {
          fw = sprite.width / 3; fh = sprite.height / 13;
          const progress = (hero.dashDuration > 0) ? (hero.dashTimer / hero.dashDuration) : 0;
          const frame = Math.min(36, Math.floor(progress * 37));
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else if (isTypingAttack) {
          fw = sprite.width / 3; fh = sprite.height / 13;
          const comboChains = [[0,1,2,3,4,5], [6,7,8,9,10,11], [12,13,14,15,16,17], [18,19,20,21,22,23], [29,30,31,32,35,36]];
          const chainIdx = ((hero.comboStep || 1) - 1) % comboChains.length;
          const seq = comboChains[chainIdx];
          const progress = Math.max(0, 1 - (hero.attackTimer / 0.18));
          const frame = seq[Math.min(seq.length - 1, Math.floor(progress * seq.length))];
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else {
          fw = sprite.width / 3; fh = sprite.height / 2;
          const frame = hero.frameIndex % 4;
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        }
        const drawnW = fw * scale, drawnH = fh * scale;
        ctx.translate(drawX, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(sprite, sx, sy, fw, fh, -drawnW / 2, drawY - drawnH + 6, drawnW, drawnH);

      } else if (isSabin) {
        scale = 1.0;
        if (isGameOver) {
          fw = sprite.width; fh = sprite.height;
        } else if (hero.state === 'win_before') {
          fw = sprite.width / 18; fh = sprite.height;
          const progress = ((this.totalTime) % 1.2) / 1.2;
          const frame = Math.min(17, Math.floor(progress * 18));
          sx = frame * fw; sy = 0;
        } else if (isAction) {
          fw = sprite.width / 18; fh = sprite.height;
          const progress = (hero.dashDuration > 0) ? (hero.dashTimer / hero.dashDuration) : 0;
          const frame = Math.min(17, Math.floor(progress * 18));
          sx = frame * fw; sy = 0;
        } else if (isTypingAttack) {
          fw = sprite.width / 18; fh = sprite.height;
          const comboChains = [[0,1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16,17]];
          const chainIdx = ((hero.comboStep || 1) - 1) % comboChains.length;
          const seq = comboChains[chainIdx];
          const progress = Math.max(0, 1 - (hero.attackTimer / 0.18));
          const frame = seq[Math.min(seq.length - 1, Math.floor(progress * seq.length))];
          sx = frame * fw; sy = 0;
        } else {
          fw = sprite.width / 4; fh = sprite.height;
          const frame = hero.frameIndex % 4;
          sx = frame * fw; sy = 0;
        }
        const drawnW = fw * scale, drawnH = fh * scale;
        ctx.translate(drawX, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(sprite, sx, sy, fw, fh, -drawnW / 2, drawY - drawnH + 6, drawnW, drawnH);
      }
    }
    ctx.restore();

    // Floating Hero Name Tag
    if (!isGameOver) {
      ctx.save();
      ctx.font = 'bold 10px sans-serif';
      const textWidth = ctx.measureText(hero.name).width;
      const boxWidth = textWidth + 12;
      const boxHeight = 16;
      const boxY = drawY - 70;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.beginPath();
      ctx.roundRect(drawX - boxWidth / 2, boxY, boxWidth, boxHeight, 4);
      ctx.fill();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = hero.isTurn ? '#facc15' : '#ffffff';
      ctx.fillText(hero.name, drawX, boxY + boxHeight / 2);
      if (hero.isTurn) ctx.fillText('👑', drawX, boxY - 5);
      ctx.restore();
    }
  }

  drawBoss(ctx) {
    const shakeOffsetX = (this.boss.hitShake > 0) ? (Math.random() - 0.5) * 8 : 0;
    const shakeOffsetY = (this.boss.hitShake > 0) ? (Math.random() - 0.5) * 4 : 0;
    const knockback = this.boss.knockbackOffset || 0;
    const drawX = Math.round(this.boss.x + knockback + shakeOffsetX);
    const drawY = Math.round(this.boss.y + shakeOffsetY);

    const waveIndex = ((this.stage - 1) % 4);
    const isDeath = this.bossHp <= 0;
    const isAttacking = (this.boss.state === 'dash');

    let spriteKey = `boss_wave_${waveIndex}_idle`;
    if (isDeath && images[`boss_wave_${waveIndex}_death`]) {
      spriteKey = `boss_wave_${waveIndex}_death`;
    } else if (isAttacking && images[`boss_wave_${waveIndex}_atk`]) {
      spriteKey = `boss_wave_${waveIndex}_atk`;
    }
    const sprite = images[spriteKey];

    // Ground Shadow
    if (!this.boss.isDead) {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
      ctx.beginPath();
      ctx.ellipse(drawX, drawY + 3, 40, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (sprite && sprite.complete) {
      let fw, fh, sx, sy, scale;
      if (waveIndex === 0) {
        // Beast Lord
        scale = 145 / 128;
        if (isDeath) {
          fw = sprite.width; fh = sprite.height; sx = 0; sy = 0;
        } else if (isAttacking) {
          fw = sprite.width / 3; fh = sprite.height / 5;
          const progress = (this.boss.dashDuration > 0) ? (this.boss.dashTimer / this.boss.dashDuration) : 0;
          const frame = Math.min(14, Math.floor(progress * 15));
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else {
          fw = sprite.width / 3; fh = sprite.height / 2;
          const frame = this.boss.frameIndex % 4;
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        }
      } else if (waveIndex === 1) {
        // Veritas
        scale = 145 / 87;
        if (isDeath) {
          fw = sprite.width; fh = sprite.height; sx = 0; sy = 0;
        } else if (isAttacking) {
          fw = sprite.width / 3; fh = sprite.height / 6;
          const progress = (this.boss.dashDuration > 0) ? (this.boss.dashTimer / this.boss.dashDuration) : 0;
          const frame = Math.min(15, Math.floor(progress * 16));
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        } else {
          fw = sprite.width / 3; fh = sprite.height / 2;
          const frame = this.boss.frameIndex % 4;
          sx = (frame % 3) * fw; sy = Math.floor(frame / 3) * fh;
        }
      } else {
        fw = sprite.width / 3; fh = sprite.height / 4; scale = 1.7;
        if (isDeath) {
          sx = 2 * fw; sy = 0;
        } else {
          sx = (this.boss.frameIndex % 3) * fw; sy = 1 * fh;
        }
      }

      const drawnW = fw * scale, drawnH = fh * scale;
      ctx.save();
      if (this.boss.flashHurt > 0) ctx.filter = 'brightness(2.2) saturate(250%)';
      ctx.drawImage(sprite, sx, sy, fw, fh, drawX - drawnW / 2, drawY - drawnH + 12, drawnW, drawnH);
      ctx.restore();
    }
  }

  startLoop() {
    const loop = (timestamp) => {
      const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
      this.lastTime = timestamp;
      this.update(dt);
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// Start Game after all assets are loaded
window.addEventListener('DOMContentLoaded', () => {
  loadAllAssets(() => {
    const gameEngine = new StandaloneArenaEngine();
    gameEngine.startLoop();
  });
});
