const TYPE_COLORS = {
  Normal: '#9ca3af', Fire: '#f97316', Water: '#0ea5e9', Grass: '#22c55e',
  Electric: '#eab308', Ice: '#38bdf8', Fighting: '#b91c1c', Poison: '#a855f7',
  Ground: '#ca8a04', Flying: '#818cf8', Psychic: '#ec4899', Bug: '#84cc16',
  Rock: '#78716c', Ghost: '#6366f1', Dragon: '#7c3aed', Steel: '#64748b',
  Dark: '#334155', Fairy: '#f472b6'
};

const TYPE_SYMBOLS = {
  Normal: '⚪', Fire: '🔥', Water: '💧', Grass: '🌿',
  Electric: '⚡', Ice: '❄️', Fighting: '🥊', Poison: '☠️',
  Ground: '🏜️', Flying: '🦅', Psychic: '👁️', Bug: '🐛',
  Rock: '🪨', Ghost: '👻', Dragon: '🐉', Steel: '⚙️',
  Dark: '🌑', Fairy: '✨'
};

const TYPE_CHART = {
  Normal:   { Rock: 0.5, Ghost: 0.2, Steel: 0.5 },
  Fire:     { Fire: 0.5, Water: 0.5, Grass: 2.0, Ice: 2.0, Bug: 2.0, Rock: 0.5, Dragon: 0.5, Steel: 2.0 },
  Water:    { Fire: 2.0, Water: 0.5, Grass: 0.5, Ground: 2.0, Rock: 2.0, Dragon: 0.5 },
  Grass:    { Fire: 0.5, Water: 2.0, Grass: 0.5, Poison: 0.5, Ground: 2.0, Flying: 0.5, Bug: 0.5, Rock: 2.0, Dragon: 0.5, Steel: 0.5 },
  Electric: { Water: 2.0, Grass: 0.5, Electric: 0.5, Ground: 0.2, Flying: 2.0, Dragon: 0.5 },
  Ice:      { Fire: 0.5, Water: 0.5, Grass: 2.0, Ice: 0.5, Ground: 2.0, Flying: 2.0, Dragon: 2.0, Steel: 0.5 },
  Fighting: { Normal: 2.0, Ice: 2.0, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2.0, Ghost: 0.2, Dark: 2.0, Steel: 2.0, Fairy: 0.5 },
  Poison:   { Grass: 2.0, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0.2, Fairy: 2.0 },
  Ground:   { Fire: 2.0, Grass: 0.5, Electric: 2.0, Poison: 2.0, Flying: 0.2, Bug: 0.5, Rock: 2.0, Steel: 2.0 },
  Flying:   { Grass: 2.0, Electric: 0.5, Fighting: 2.0, Bug: 2.0, Rock: 0.5, Steel: 0.5 },
  Psychic:  { Fighting: 2.0, Poison: 2.0, Psychic: 0.5, Dark: 0.2, Steel: 0.5 },
  Bug:      { Fire: 0.5, Grass: 2.0, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2.0, Ghost: 0.5, Dark: 2.0, Steel: 0.5, Fairy: 0.5 },
  Rock:     { Fire: 2.0, Ice: 2.0, Fighting: 0.5, Ground: 0.5, Flying: 2.0, Bug: 2.0, Steel: 0.5 },
  Ghost:    { Normal: 0.2, Psychic: 2.0, Ghost: 2.0, Dark: 0.5 },
  Dragon:   { Dragon: 2.0, Steel: 0.5, Fairy: 0.2 },
  Steel:    { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2.0, Rock: 2.0, Steel: 0.5, Fairy: 2.0 },
  Dark:     { Fighting: 0.5, Psychic: 2.0, Ghost: 2.0, Dark: 0.5, Fairy: 0.5 },
  Fairy:    { Fire: 0.5, Fighting: 2.0, Poison: 0.5, Dragon: 2.0, Dark: 2.0, Steel: 0.5 }
};

const SPRITE_URL = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const MEGA_SPRITE = (form) => form.spriteUrl || SPRITE_URL(form.spriteId);

const TYPE_MOVES = {
  Normal:   { fast: "Body Slam", charged: "Hyper Beam" },
  Fire:     { fast: "Fire Spin", charged: "Blast Burn" },
  Water:    { fast: "Water Gun", charged: "Hydro Cannon" },
  Grass:    { fast: "Vine Whip", charged: "Frenzy Plant" },
  Electric: { fast: "Thunder Shock", charged: "Volt Tackle" },
  Ice:      { fast: "Frost Breath", charged: "Blizzard" },
  Fighting: { fast: "Counter", charged: "Dynamic Punch" },
  Poison:   { fast: "Sludge Bomb", charged: "Gunk Shot" },
  Ground:   { fast: "Mud Slap", charged: "Earthquake" },
  Flying:   { fast: "Air Slash", charged: "Brave Bird" },
  Psychic:  { fast: "Psycho Cut", charged: "Psychic" },
  Bug:      { fast: "Bug Bite", charged: "X-Scissor" },
  Rock:     { fast: "Rock Throw", charged: "Stone Edge" },
  Ghost:    { fast: "Shadow Claw", charged: "Shadow Ball" },
  Dragon:   { fast: "Dragon Breath", charged: "Draco Meteor" },
  Steel:    { fast: "Iron Tail", charged: "Flash Cannon" },
  Dark:     { fast: "Feint Attack", charged: "Dark Pulse" },
  Fairy:    { fast: "Fairy Wind", charged: "Moonblast" }
};

const MEGA_FORMS = {
  3:   [{ name: "Mega Venusaur", type: "Grass", spriteId: 10033 }],
  6:   [
         { name: "Mega Charizard X", type: "Dragon", spriteId: 10034 },
         { name: "Mega Charizard Y", type: "Fire", spriteId: 10035 }
       ],
  9:   [{ name: "Mega Blastoise", type: "Water", spriteId: 10036 }],
  15:  [{ name: "Mega Beedrill", type: "Bug", spriteId: 10090 }],
  18:  [{ name: "Mega Pidgeot", type: "Flying", spriteId: 10073 }],
  26:  [
         { name: "Mega Raichu X", type: "Fighting", spriteId: 10304 },
         { name: "Mega Raichu Y", type: "Electric", spriteId: 10305 }
       ],
  65:  [{ name: "Mega Alakazam", type: "Psychic", spriteId: 10037 }],
  80:  [{ name: "Mega Slowbro", type: "Water", spriteId: 10071 }],
  94:  [{ name: "Mega Gengar", type: "Ghost", spriteId: 10038 }],
  115: [{ name: "Mega Kangaskhan", type: "Normal", spriteId: 10039 }],
  127: [{ name: "Mega Pinsir", type: "Bug", spriteId: 10040 }],
  130: [{ name: "Mega Gyarados", type: "Dark", spriteId: 10041 }],
  142: [{ name: "Mega Aerodactyl", type: "Rock", spriteId: 10042 }],
  149: [{ name: "Mega Dragonite", type: "Dragon", spriteId: 10281 }],
  150: [
         { name: "Mega Mewtwo X", type: "Fighting", spriteId: 10043 },
         { name: "Mega Mewtwo Y", type: "Psychic", spriteId: 10044 }
       ]
};

const MAX_EVO_KANTO = [
  [3, "Venusaur", "Grass", 180, 28, 24],
  [6, "Charizard", "Fire", 175, 30, 22],
  [9, "Blastoise", "Water", 185, 26, 26],
  [12, "Butterfree", "Bug", 160, 25, 21],
  [15, "Beedrill", "Bug", 160, 30, 19],
  [18, "Pidgeot", "Flying", 175, 28, 22],
  [20, "Raticate", "Normal", 160, 27, 21],
  [22, "Fearow", "Flying", 165, 28, 21],
  [24, "Arbok", "Poison", 170, 27, 23],
  [26, "Raichu", "Electric", 170, 30, 20],
  [28, "Sandslash", "Ground", 175, 28, 26],
  [31, "Nidoqueen", "Poison", 185, 28, 25],
  [34, "Nidoking", "Poison", 185, 29, 24],
  [36, "Clefable", "Fairy", 185, 26, 23],
  [38, "Ninetales", "Fire", 170, 27, 24],
  [40, "Wigglytuff", "Normal", 210, 24, 19],
  [42, "Golbat", "Poison", 170, 26, 22],
  [45, "Vileplume", "Grass", 180, 28, 24],
  [47, "Parasect", "Bug", 165, 28, 24],
  [49, "Venomoth", "Bug", 170, 27, 21],
  [51, "Dugtrio", "Ground", 150, 29, 18],
  [53, "Persian", "Normal", 165, 26, 20],
  [55, "Golduck", "Water", 175, 28, 23],
  [57, "Primeape", "Fighting", 170, 30, 20],
  [59, "Arcanine", "Fire", 190, 31, 24],
  [62, "Poliwrath", "Water", 185, 28, 26],
  [65, "Alakazam", "Psychic", 165, 35, 18],
  [68, "Machamp", "Fighting", 190, 32, 25],
  [71, "Victreebel", "Grass", 180, 30, 22],
  [73, "Tentacruel", "Water", 175, 26, 27],
  [76, "Golem", "Rock", 180, 30, 30],
  [78, "Rapidash", "Fire", 170, 29, 22],
  [80, "Slowbro", "Water", 190, 27, 27],
  [82, "Magneton", "Electric", 165, 29, 26],
  [83, "Farfetch'd", "Normal", 155, 26, 20],
  [85, "Dodrio", "Flying", 170, 30, 21],
  [87, "Dewgong", "Water", 180, 25, 25],
  [89, "Muk", "Poison", 195, 29, 24],
  [91, "Cloyster", "Water", 165, 28, 34],
  [94, "Gengar", "Ghost", 170, 33, 21],
  [95, "Onix", "Rock", 160, 22, 32],
  [97, "Hypno", "Psychic", 180, 26, 25],
  [99, "Kingler", "Water", 170, 32, 27],
  [101, "Electrode", "Electric", 165, 26, 22],
  [103, "Exeggutor", "Grass", 185, 29, 24],
  [105, "Marowak", "Ground", 170, 26, 27],
  [106, "Hitmonlee", "Fighting", 165, 32, 20],
  [107, "Hitmonchan", "Fighting", 165, 29, 24],
  [108, "Lickitung", "Normal", 180, 24, 23],
  [110, "Weezing", "Poison", 175, 27, 27],
  [112, "Rhydon", "Ground", 195, 31, 27],
  [113, "Chansey", "Normal", 240, 18, 16],
  [114, "Tangela", "Grass", 165, 25, 27],
  [115, "Kangaskhan", "Normal", 190, 28, 24],
  [117, "Seadra", "Water", 165, 27, 24],
  [119, "Seaking", "Water", 170, 27, 21],
  [121, "Starmie", "Water", 170, 28, 24],
  [122, "Mr. Mime", "Psychic", 160, 26, 26],
  [123, "Scyther", "Bug", 175, 30, 23],
  [124, "Jynx", "Ice", 165, 29, 18],
  [125, "Electabuzz", "Electric", 175, 29, 20],
  [126, "Magmar", "Fire", 175, 30, 20],
  [127, "Pinsir", "Bug", 175, 31, 25],
  [128, "Tauros", "Normal", 180, 29, 25],
  [130, "Gyarados", "Water", 190, 32, 24],
  [131, "Lapras", "Ice", 205, 26, 24],
  [132, "Ditto", "Normal", 155, 25, 22],
  [134, "Vaporeon", "Water", 205, 28, 22],
  [135, "Jolteon", "Electric", 165, 30, 21],
  [136, "Flareon", "Fire", 165, 32, 22],
  [137, "Porygon", "Normal", 160, 25, 22],
  [139, "Omastar", "Rock", 175, 28, 29],
  [141, "Kabutops", "Rock", 175, 31, 26],
  [142, "Aerodactyl", "Rock", 175, 30, 22],
  [143, "Snorlax", "Normal", 225, 28, 22],
  [144, "Articuno", "Ice", 190, 28, 27],
  [145, "Zapdos", "Electric", 190, 31, 24],
  [146, "Moltres", "Fire", 190, 31, 24],
  [149, "Dragonite", "Dragon", 195, 32, 26],
  [150, "Mewtwo", "Psychic", 200, 36, 26],
  [151, "Mew", "Psychic", 190, 29, 29]
];

const POKEDEX = MAX_EVO_KANTO.map(([id, name, type, hp, atk, def]) => ({
  id,
  name,
  type,
  hp,
  atk,
  def,
  canMega: !!MEGA_FORMS[id],
  sprite: SPRITE_URL(id),
  fastMove: { name: TYPE_MOVES[type].fast, type: type, minDmg: 20, maxDmg: 28 },
  chargedMove: { name: TYPE_MOVES[type].charged, type: type, minDmg: 82, maxDmg: 100 }
}));

var peer = null;
var conn = null;
var isHost = false;
var isAiMode = false;
var myRole = 'p1';

var p1Team = [];
var p2Team = [];
var p1ActiveIdx = 0;
var p2ActiveIdx = 0;
var activeTurn = 'p1';

var p1SwitchCooldown = 0;
var p2SwitchCooldown = 0;

var myBattleReady = false;
var oppBattleReady = false;

var p1HasMegaStone = true;
var p2HasMegaStone = true;

var draftPoolPairs = [];
var currentDraftRound = 0;
var selectedDraftCardIdx = null;

var myPicks = [];
var oppPicks = [];

var p1Score = 0;
var p2Score = 0;

// Timers
var turnTimer = null;
var turnTimeLeft = 10;
var swapTimer = null;
var swapTimeLeft = 5;
var isSwapPhase = false;

var PREFIX = "pk1v-";
var audioCtx = null;

var peerConfig = {
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:global.stun.twilio.com:3478' }
    ]
  }
};

function isMobileView() {
  return window.innerWidth <= 720;
}

function playSound(type) {
  try {
    if (!audioCtx) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    if (!audioCtx) return;

    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    var now = audioCtx.currentTime;

    if (type === 'beep') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.start(now); osc.stop(now + 0.08);
    } else if (type === 'hit') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
    } else if (type === 'charged') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.35);
      osc.start(now); osc.stop(now + 0.35);
    } else if (type === 'mega') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(960, now + 0.28);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'fanfare') {
      [261.63, 329.63, 392.00, 523.25].forEach(function(freq, idx) {
        var o = audioCtx.createOscillator();
        var g = audioCtx.createGain();
        o.connect(g); g.connect(audioCtx.destination);
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + idx * 0.12);
        g.gain.setValueAtTime(0.15, now + idx * 0.12);
        g.gain.linearRampToValueAtTime(0, now + idx * 0.12 + 0.2);
        o.start(now + idx * 0.12); o.stop(now + idx * 0.12 + 0.2);
      });
    }
  } catch (e) {}
}

function triggerHaptics(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern || [40, 30, 40]); } catch(e) {}
}

function setGameInfoMode(isInGame) {
  var infoBtn = document.getElementById('game-info-btn');
  var rulesPanel = document.getElementById('game-rules-panel');
  var homeSlot = document.getElementById('rules-home-slot');
  var modalSlot = document.getElementById('rules-modal-slot');
  if (!infoBtn || !rulesPanel || !homeSlot || !modalSlot) return;

  if (isInGame) {
    modalSlot.appendChild(rulesPanel);
    infoBtn.classList.remove('hidden');
  } else {
    homeSlot.appendChild(rulesPanel);
    infoBtn.classList.add('hidden');
    closeInfoModal();
  }
}

window.openInfoModal = function() {
  playSound('beep');
  var modal = document.getElementById('rules-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeInfoModal = function() {
  var modal = document.getElementById('rules-modal');
  if (modal) modal.classList.add('hidden');
};

function finishLoadingScreen() {
  var splash = document.getElementById('loading-screen');
  var progress = document.getElementById('loading-progress');
  var label = document.getElementById('loading-label');
  if (!splash || splash.classList.contains('is-ready')) return;
  if (progress) progress.style.width = '100%';
  if (label) label.innerText = 'Arena ready!';
  setTimeout(function() { splash.classList.add('is-ready'); }, 260);
  setTimeout(function() { if (splash && splash.parentNode) splash.remove(); }, 900);
}

(function bootLoadingScreen() {
  var progress = document.getElementById('loading-progress');
  var label = document.getElementById('loading-label');
  var value = 8;
  var timer = setInterval(function() {
    value = Math.min(88, value + Math.floor(Math.random() * 9) + 3);
    if (progress) progress.style.width = value + '%';
    if (label) {
      label.innerText = value < 38 ? 'Loading battle data…' : value < 68 ? 'Syncing trainer systems…' : 'Warming up the arena…';
    }
    if (value >= 88) clearInterval(timer);
  }, 180);
  window.addEventListener('load', function() {
    clearInterval(timer);
    setTimeout(finishLoadingScreen, 320);
  });
  setTimeout(function() {
    clearInterval(timer);
    finishLoadingScreen();
  }, 2200);
})();

function generate6DigitCode() {
  var chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  var code = "";
  for (var i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

window.startSinglePlayer = function() {
  playSound('beep');
  isAiMode = true;
  isHost = true;
  myRole = 'p1';
  initDraftSession();
};

window.hostRoom = function() {
  playSound('beep');
  isHost = true;
  myRole = 'p1';
  document.getElementById('btn-create-room').disabled = true;
  document.getElementById('host-info').classList.remove('hidden');

  var raw6 = generate6DigitCode();
  var fullId = PREFIX + raw6.toLowerCase();

  if (typeof Peer === "undefined") {
    document.getElementById('my-peer-id').innerText = raw6;
    return;
  }

  try { if (peer) peer.destroy(); } catch(e) {}
  peer = new Peer(fullId, peerConfig);

  peer.on('open', function(id) {
    var displayCode = id.replace(PREFIX, "").toUpperCase();
    document.getElementById('my-peer-id').innerText = displayCode;
  });

  peer.on('connection', function(c) {
    conn = c;
    setupConnection();

    c.on('open', function() {
      console.log('Multiplayer connection opened:', c.peer);
      initDraftSession();
    });

    c.on('close', function() {
      console.warn('Opponent disconnected.');
    });
  });

  peer.on('error', function(err) {
    console.error("Peer host error:", err);
    var fallback6 = generate6DigitCode();
    peer = new Peer(PREFIX + fallback6.toLowerCase(), peerConfig);
    peer.on('open', function(id) {
      document.getElementById('my-peer-id').innerText = id.replace(PREFIX, "").toUpperCase();
    });
    peer.on('connection', function(c) {
      conn = c;
      setupConnection();
      c.on('open', function() {
        console.log('Fallback multiplayer connection opened:', c.peer);
        initDraftSession();
      });
      c.on('close', function() {
        console.warn('Opponent disconnected.');
      });
    });
  });
};

window.copyInviteLink = function() {
  playSound('beep');
  var code = document.getElementById('my-peer-id').innerText;
  var url = window.location.origin + window.location.pathname + '#' + code;
  navigator.clipboard.writeText(url).then(function() {
    var btn = document.getElementById('btn-copy-link');
    btn.innerText = "✅ Link Copied!";
    setTimeout(function() { btn.innerText = "📋 Copy Invite Link"; }, 2000);
  });
};

window.joinRoom = function() {
  playSound('beep');
  var input = document.getElementById('join-id-input').value.trim().toLowerCase();
  if (input.length !== 6) return alert('Please enter a 6-digit room code.');

  isHost = false;
  myRole = 'p2';
  var joinBtn = document.getElementById('btn-join-room');
  joinBtn.disabled = true;
  joinBtn.innerText = "Connecting...";

  if (typeof Peer === "undefined") {
    alert("Peer network library is still loading. Please retry in 3 seconds.");
    joinBtn.disabled = false;
    joinBtn.innerText = "Enter Arena";
    return;
  }

  try { if (peer) peer.destroy(); } catch(e) {}
  peer = new Peer(undefined, peerConfig);

  var targetFullId = PREFIX + input;

  peer.on('open', function() {
    conn = peer.connect(targetFullId, { reliable: true });

    setupConnection();
    
    conn.on('open', function() {
      console.log('Joined room successfully:', targetFullId);
      joinBtn.disabled = false;
      joinBtn.innerText = 'Connected!';
    });

    conn.on('close', function() {
      console.warn('Connection to host closed.');
      joinBtn.disabled = false;
      joinBtn.innerText = 'Enter Arena';
    });

    conn.on('error', function(err) {
      console.error("Connection error:", err);
      alert("Could not connect to room. Make sure the host code is correct and active.");
      joinBtn.disabled = false;
      joinBtn.innerText = "Enter Arena";
    });
  });

  peer.on('error', function(err) {
    console.error("Peer join error:", err);
    alert("Connection failed. Check code and try again.");
    joinBtn.disabled = false;
    joinBtn.innerText = "Enter Arena";
  });

  setTimeout(function() {
    if (conn && !conn.open) {
      console.warn('Join timed out:', targetFullId);
      try { conn.close(); } catch(e) {}
      try { peer.destroy(); } catch(e) {}
      joinBtn.disabled = false;
      joinBtn.innerText = "Enter Arena";
      alert("Could not connect to that arena. Ask the host to create a new room and share the new code.");
    }
  }, 15000);
};

function setupConnection() {
  if (!conn) return;
  conn.on('data', function(data) {
    handleNetworkData(data);
  });
}

function sendNet(type, payload) {
  if (conn && conn.open) conn.send({ type: type, payload: payload });
}

function handleNetworkData(msg) {
  if (msg.type === 'START_DRAFT_SYNC') {
    draftPoolPairs = msg.payload.draftPoolPairs;
    currentDraftRound = 0;
    p1Team = [];
    p2Team = [];
    myPicks = [];
    oppPicks = [];
    myBattleReady = false;
    oppBattleReady = false;
    startDraftScreen();
  } else if (msg.type === 'DRAFT_PICK_MADE') {
    applyDraftPick(msg.payload.pickerRole, msg.payload.chosenPoke, msg.payload.otherPoke);
  } else if (msg.type === 'BATTLE_ACTION') {
    applyActionLocally(msg.payload.action, msg.payload.data, msg.payload.actorRole);
  } else if (msg.type === 'BATTLE_READY') {
    handleOpponentBattleReady();
  } else if (msg.type === 'REMATCH_START') {
    resetToDraftScreen();
  }
}

function generate12UniquePokemon() {
  var nonMegaPool = POKEDEX.filter(function(p) { return !p.canMega; }).sort(function() { return 0.5 - Math.random(); });
  var megaPool = POKEDEX.filter(function(p) { return p.canMega; }).sort(function() { return 0.5 - Math.random(); });
  
  var makePoke = function(base) {
    return Object.assign({}, JSON.parse(JSON.stringify(base)), {
      maxHp: base.hp,
      currentHp: base.hp,
      energy: 0,
      isMega: false
    });
  };

  var pairs = [];
  for (var r = 0; r < 4; r++) {
    pairs.push([makePoke(nonMegaPool[r * 2]), makePoke(nonMegaPool[r * 2 + 1])]);
  }
  for (var m = 0; m < 2; m++) {
    pairs.push([makePoke(megaPool[m * 2]), makePoke(megaPool[m * 2 + 1])]);
  }

  return pairs;
}

function initDraftSession() {
  p1Team = [];
  p2Team = [];
  myPicks = [];
  oppPicks = [];
  currentDraftRound = 0;
  myBattleReady = false;
  oppBattleReady = false;
  draftPoolPairs = generate12UniquePokemon();

  if (!isAiMode) {
    sendNet('START_DRAFT_SYNC', { draftPoolPairs: draftPoolPairs });
  }
  startDraftScreen();
}

function startDraftScreen() {
  setGameInfoMode(true);
  document.getElementById('screen-lobby').classList.add('hidden');
  document.getElementById('screen-battle').classList.add('hidden');
  document.getElementById('screen-draft').classList.remove('hidden');
  renderDraftRound();
}

function renderDraftRound() {
  selectedDraftCardIdx = null;
  document.getElementById('btn-confirm-draft').disabled = true;

  if (p1Team.length === 6 && p2Team.length === 6) {
    showTeamFinalizedScreen();
    return;
  }

  document.getElementById('draft-final-section').classList.add('hidden');
  document.getElementById('draft-progress-block').classList.remove('hidden');
  document.getElementById('draft-team-count').innerText = myPicks.length;
  renderDraftRoster('my-draft-roster', myPicks);

  var activePickerRole = (currentDraftRound % 2 === 0) ? 'p1' : 'p2';
  var isMyPick = (myRole === activePickerRole);

  var choiceBox = document.getElementById('draft-choice-section');
  var waitingBox = document.getElementById('draft-waiting-section');

  if (isMyPick) {
    choiceBox.classList.remove('hidden');
    waitingBox.classList.add('hidden');

    var humanRoundNum = myPicks.length + 1;
    document.getElementById('draft-choice-title').innerText = "Your Pick (Choice " + humanRoundNum + "/6)";

    var currentPair = draftPoolPairs[currentDraftRound];
    var container = document.getElementById('draft-pair-container');
    container.innerHTML = '';

    currentPair.forEach(function(poke, idx) {
      var card = document.createElement('div');
      card.className = 'draft-pick-card';
      card.id = 'draft-card-' + idx;
      card.innerHTML = 
        '<img src="' + poke.sprite + '" class="pixel-art" alt="' + poke.name + '" />' +
        '<strong style="font-size:0.9rem; margin-top:4px;">' + poke.name + '</strong>' +
        '<span class="type-badge" style="background:' + TYPE_COLORS[poke.type] + '">' + poke.type + '</span>' +
        '<div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">HP: ' + poke.hp + ' | ATK: ' + poke.atk + '</div>';

      card.onclick = function() {
        playSound('beep');
        selectedDraftCardIdx = idx;
        document.querySelectorAll('.draft-pick-card').forEach(function(c) { c.classList.remove('selected'); });
        card.classList.add('selected');
        document.getElementById('btn-confirm-draft').disabled = false;
      };

      container.appendChild(card);
    });
  } else {
    choiceBox.classList.add('hidden');
    waitingBox.classList.remove('hidden');

    if (isAiMode && activePickerRole === 'p2') {
      setTimeout(aiDraftPick, 900);
    }
  }
}

window.confirmDraftPick = function() {
  if (selectedDraftCardIdx === null) return;
  playSound('beep');

  var currentPair = draftPoolPairs[currentDraftRound];
  var chosenPoke = currentPair[selectedDraftCardIdx];
  var otherPoke = currentPair[selectedDraftCardIdx === 0 ? 1 : 0];

  if (!isAiMode) {
    sendNet('DRAFT_PICK_MADE', {
      pickerRole: myRole,
      chosenPoke: chosenPoke,
      otherPoke: otherPoke
    });
  }

  applyDraftPick(myRole, chosenPoke, otherPoke);
};

function aiDraftPick() {
  var currentPair = draftPoolPairs[currentDraftRound];
  var aiChosenIdx = Math.floor(Math.random() * 2);
  var chosenPoke = currentPair[aiChosenIdx];
  var otherPoke = currentPair[aiChosenIdx === 0 ? 1 : 0];

  applyDraftPick('p2', chosenPoke, otherPoke);
}

function applyDraftPick(pickerRole, chosenPoke, otherPoke) {
  if (pickerRole === 'p1') {
    p1Team.push(chosenPoke);
    p2Team.push(otherPoke);
  } else {
    p2Team.push(chosenPoke);
    p1Team.push(otherPoke);
  }

  if (pickerRole === myRole) {
    myPicks.push(chosenPoke);
  } else {
    oppPicks.push(chosenPoke);
  }

  currentDraftRound++;
  renderDraftRound();
}

function showTeamFinalizedScreen() {
  myBattleReady = false;
  oppBattleReady = false;

  document.getElementById('draft-status-title').innerText = "Teams Finalized!";
  document.getElementById('draft-status-desc').innerText = "Your squad of 6 is locked in. Step into the arena when you're ready.";
  document.getElementById('draft-choice-section').classList.add('hidden');
  document.getElementById('draft-waiting-section').classList.add('hidden');
  document.getElementById('draft-progress-block').classList.add('hidden');

  renderFinalTeamGrid();

  var btn = document.getElementById('btn-lets-battle');
  btn.disabled = false;
  btn.querySelector('.btn-copy strong').innerText = "Let's Battle!";
  document.getElementById('battle-ready-status').classList.add('hidden');
  document.getElementById('draft-final-section').classList.remove('hidden');

  playSound('beep');
}

function renderFinalTeamGrid() {
  var myTeam = (myRole === 'p1') ? p1Team : p2Team;
  var grid = document.getElementById('final-team-grid');
  if (!grid) return;

  grid.innerHTML = myTeam.map(function(p, i) {
    var draftedByMe = myPicks.some(function(mp) { return mp.id === p.id; });
    return '<div class="poke-chip">' +
             '<span class="final-slot-no">' + (draftedByMe ? 'DRAFTED' : 'PASSED') + '</span>' +
             '<img src="' + p.sprite + '" class="pixel-art" alt="' + p.name + '" />' +
             '<strong>' + p.name + '</strong>' +
             '<span class="type-badge" style="background:' + (TYPE_COLORS[p.type] || '#64748b') + '">' + p.type + '</span>' +
             '<div class="final-stat-line">HP ' + p.maxHp + ' · ATK ' + p.atk + ' · DEF ' + p.def + '</div>' +
           '</div>';
  }).join('');
}

window.confirmBattleStart = function() {
  if (myBattleReady) return;
  myBattleReady = true;
  playSound('beep');
  triggerHaptics([40, 30, 60]);

  var btn = document.getElementById('btn-lets-battle');

  if (isAiMode) {
    btn.disabled = true;
    initBattle();
    return;
  }

  sendNet('BATTLE_READY', {});

  if (oppBattleReady) {
    initBattle();
  } else {
    btn.disabled = true;
    btn.querySelector('.btn-copy strong').innerText = "Locked In";
    document.getElementById('battle-ready-status').classList.remove('hidden');
  }
};

function handleOpponentBattleReady() {
  oppBattleReady = true;
  if (myBattleReady) {
    initBattle();
  } else {
    var status = document.getElementById('battle-ready-status');
    status.innerText = "Your opponent is ready — hit Let's Battle!";
    status.classList.remove('hidden');
  }
}

function renderDraftRoster(elId, team) {
  var el = document.getElementById(elId);
  if (!el) return;
  var slots = [];
  for (var i = 0; i < 6; i++) {
    if (team[i]) {
      var p = team[i];
      slots.push(
        '<div class="poke-chip">' +
          '<img src="' + p.sprite + '" class="pixel-art" alt="' + p.name + '" />' +
          '<strong>' + p.name + '</strong>' +
          '<span class="type-badge" style="background:' + TYPE_COLORS[p.type] + '">' + p.type + '</span>' +
        '</div>'
      );
    } else {
      slots.push('<div class="hidden-card">❓</div>');
    }
  }
  el.innerHTML = slots.join('');
}

function resetToDraftScreen() {
  clearAllTimers();
  var overlay = document.getElementById('final-scoreboard-overlay');
  if (overlay) overlay.classList.remove('visible');

  document.getElementById('controls-section').innerHTML = 
    '<div class="attacks-row">' +
      '<button id="btn-fast-atk" class="attack-btn" onclick="executeMoveLocally(\'fast\')">' +
        '<strong>⚡ Fast Attack</strong>' +
        '<span id="lbl-fast-info" style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">+1 Energy</span>' +
      '</button>' +
      '<button id="btn-charged-atk" class="attack-btn charged" onclick="executeMoveLocally(\'charged\')" disabled>' +
        '<strong>💥 Charged Attack</strong>' +
        '<span id="lbl-charged-info" style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">Need 3 Energy</span>' +
      '</button>' +
    '</div>' +
    '<div class="mega-btn-container">' +
      '<button id="btn-mega" class="btn btn-mega hidden" onclick="handleMegaButtonClick()">🧬 Mega Evolve</button>' +
    '</div>';

  initDraftSession();
}

window.returnToLobby = function() {
  playSound('beep');
  clearAllTimers();
  var overlay = document.getElementById('final-scoreboard-overlay');
  if (overlay) overlay.classList.remove('visible');
  document.getElementById('screen-battle').classList.add('hidden');
  document.getElementById('screen-draft').classList.add('hidden');
  document.getElementById('screen-lobby').classList.remove('hidden');
  setGameInfoMode(false);
  document.getElementById('btn-create-room').disabled = false;
  var joinBtn = document.getElementById('btn-join-room');
  joinBtn.disabled = false;
  joinBtn.innerText = "Enter Arena";
  document.getElementById('host-info').classList.add('hidden');
  try { if (peer) peer.destroy(); } catch(e) {}
};

window.triggerRematch = function() {
  playSound('beep');
  if (!isAiMode) {
    sendNet('REMATCH_START', {});
  }
  resetToDraftScreen();
};

function showPopup(text, type) {
  var layer = document.getElementById('popup-layer');
  if (!layer) return;
  var badge = document.createElement('div');
  badge.className = 'popup-badge ' + (type || 'dmg');
  badge.innerText = text;
  layer.appendChild(badge);
  setTimeout(function() { badge.remove(); }, 1600);
}

function triggerScreenFlash(color) {
  var overlay = document.getElementById('flash-overlay');
  overlay.style.background = color || 'white';
  overlay.style.opacity = '0.75';
  setTimeout(function() { overlay.style.opacity = '0'; }, 120);
}

function triggerShake(elementId) {
  var el = document.getElementById(elementId);
  if (!el) return;
  el.classList.remove('shake-anim');
  void el.offsetWidth;
  el.classList.add('shake-anim');
  setTimeout(function() { el.classList.remove('shake-anim'); }, 400);
}

function clearAllTimers() {
  if (turnTimer) { clearInterval(turnTimer); turnTimer = null; }
  if (swapTimer) { clearInterval(swapTimer); swapTimer = null; }
  isSwapPhase = false;
}

function initBattle() {
  setGameInfoMode(true);
  document.getElementById('draft-final-section').classList.add('hidden');
  document.getElementById('screen-draft').classList.add('hidden');
  document.getElementById('screen-battle').classList.remove('hidden');
  p1ActiveIdx = 0;
  p2ActiveIdx = 0;
  p1SwitchCooldown = 0;
  p2SwitchCooldown = 0;
  p1HasMegaStone = true;
  p2HasMegaStone = true;
  activeTurn = 'p1';

  p1Score = 0;
  p2Score = 0;
  updateScoreboardUI();
  var overlay = document.getElementById('final-scoreboard-overlay');
  if (overlay) overlay.classList.remove('visible');

  showPopup("⚔️ BATTLE START!", "crit");
  startTurn();
}

function getCurrentScores() {
  var p1ScoreNow = p2Team.filter(function(p) { return p && p.currentHp <= 0; }).length;
  var p2ScoreNow = p1Team.filter(function(p) { return p && p.currentHp <= 0; }).length;
  return { p1: p1ScoreNow, p2: p2ScoreNow };
}

function updateScoreboardUI() {
  var scoreP1El = document.getElementById('score-p1');
  var scoreP2El = document.getElementById('score-p2');
  var oppLabelEl = document.getElementById('score-opp-label');
  var scores = getCurrentScores();
  var myScore = myRole === 'p1' ? scores.p1 : scores.p2;
  var oppScore = myRole === 'p1' ? scores.p2 : scores.p1;
  if (scoreP1El) scoreP1El.innerText = myScore;
  if (scoreP2El) scoreP2El.innerText = oppScore;
  if (oppLabelEl) oppLabelEl.innerText = isAiMode ? "AI" : "Opp";
}

function flashFinalScoreboard(winnerName) {
  clearAllTimers();
  var overlay = document.getElementById('final-scoreboard-overlay');
  var subTitle = document.getElementById('sb-winner-subtitle');
  var finalP1 = document.getElementById('sb-final-p1');
  var finalP2 = document.getElementById('sb-final-p2');
  var p1ColLabel = document.getElementById('sb-col-p1-label');
  var p2ColLabel = document.getElementById('sb-col-p2-label');
  var scores = getCurrentScores();
  var myScore = myRole === 'p1' ? scores.p1 : scores.p2;
  var oppScore = myRole === 'p1' ? scores.p2 : scores.p1;

  if (subTitle) subTitle.innerText = winnerName + " Wins the Arena!";
  if (p1ColLabel) p1ColLabel.innerText = "You";
  if (p2ColLabel) p2ColLabel.innerText = isAiMode ? "AI" : "Opponent";
  if (finalP1) finalP1.innerText = myScore;
  if (finalP2) finalP2.innerText = oppScore;

  if (overlay) {
    overlay.classList.add('visible');
    playSound('fanfare');
    triggerHaptics([80, 50, 100, 50, 150]);
  }
}

function renderBenchGrid(containerId, team, activeIdx, isInteractive) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  var myActive = (myRole === 'p1') ? p1Team[p1ActiveIdx] : p2Team[p2ActiveIdx];
  var isForcedSwitch = isSwapPhase && (myRole === activeTurn) && myActive && myActive.currentHp <= 0;
  var isMyTurn = (activeTurn === myRole) && !isSwapPhase;
  var currentCooldown = (myRole === 'p1') ? p1SwitchCooldown : p2SwitchCooldown;
  var mobile = isMobileView();

  var benchPokemons = [];
  team.forEach(function(p, originalIdx) {
    if (originalIdx !== activeIdx) {
      benchPokemons.push({ pokemon: p, index: originalIdx });
    }
  });

  benchPokemons.forEach(function(item, idx) {
    var p = item.pokemon;
    var isFainted = p.currentHp <= 0;
    var isCanClick = isInteractive && !isFainted && (isForcedSwitch || (isMyTurn && currentCooldown === 0));

    var card = document.createElement('div');
    card.className = 'bench-card ' + (isFainted ? 'fainted ' : '') + (isCanClick ? 'clickable ' : '') + (idx === 4 ? 'bench-slot-5th' : '');
    card.title = p.name + ' (' + p.type + ') - ' + p.currentHp + '/' + p.maxHp + ' HP';

    var typeColor = TYPE_COLORS[p.type] || '#64748b';
    var typeDisplay = mobile ? (TYPE_SYMBOLS[p.type] || p.type) : p.type;
    var typeBadgeHtml = '<span class="type-badge" style="background:' + typeColor + ';">' + typeDisplay + '</span>';
    
    var cdBadgeHtml = (isInteractive && currentCooldown > 0 && !isForcedSwitch && !isFainted) ? 
      '<span class="cooldown-badge">' + (mobile ? 'CD ' + currentCooldown : 'CD: ' + currentCooldown) + '</span>' : '';

    card.innerHTML = 
      '<img src="' + p.sprite + '" class="pixel-art" alt="' + p.name + '" />' +
      typeBadgeHtml +
      cdBadgeHtml;

    if (isCanClick) {
      card.onclick = function() {
        if (isSwapPhase) {
          clearAllTimers();
        }
        var actionData = { newIndex: item.index, isForced: isForcedSwitch };
        if (!isAiMode) {
          sendNet('BATTLE_ACTION', { action: 'SWITCH', data: actionData, actorRole: myRole });
        }
        applyActionLocally('SWITCH', actionData, myRole);
      };
    } else if (isInteractive) {
      card.classList.add('blocked');
      card.onclick = function() {
        explainBlockedSwitch(card, p, isFainted, isMyTurn, currentCooldown, isForcedSwitch);
      };
    }

    container.appendChild(card);
  });
}

function explainBlockedSwitch(card, poke, isFainted, isMyTurn, cooldown, isForcedSwitch) {
  var msg;

  if (isFainted) {
    msg = '❌ ' + poke.name + ' has fainted!';
  } else if (isForcedSwitch) {
    msg = '⚠️ Choose a replacement Pokémon!';
  } else if (cooldown > 0 && !isSwapPhase) {
    msg = '⏳ Switch on cooldown — ' + cooldown + ' more ' + (cooldown === 1 ? 'move' : 'moves') + '!';
  } else if (!isMyTurn && !isSwapPhase) {
    msg = '⏸️ Not your turn yet!';
  } else {
    msg = '⛔ You can\'t switch right now.';
  }

  showPopup(msg, 'warn');
  playSound('beep');
  triggerHaptics([25, 40, 25]);

  if (card) {
    card.classList.remove('shake-anim');
    void card.offsetWidth;
    card.classList.add('shake-anim');
    setTimeout(function() { card.classList.remove('shake-anim'); }, 400);
  }
}

function updateBattleUI() {
  var playerTeam = myRole === 'p1' ? p1Team : p2Team;
  var playerActiveIdx = myRole === 'p1' ? p1ActiveIdx : p2ActiveIdx;
  var opponentTeam = myRole === 'p1' ? p2Team : p1Team;
  var opponentActiveIdx = myRole === 'p1' ? p2ActiveIdx : p1ActiveIdx;
  var playerActive = playerTeam[playerActiveIdx];
  var opponentActive = opponentTeam[opponentActiveIdx];
  if (!playerActive || !opponentActive) return;
  var mobile = isMobileView();

  var p1Label = document.getElementById('p1-title-label');
  p1Label.innerText = mobile ? 'You' : 'Active: You';
  document.getElementById('my-active-sprite').src = playerActive.sprite;
  document.getElementById('my-active-name').innerText = playerActive.name + (playerActive.isMega ? ' 🧬' : '');
  var p1Type = document.getElementById('my-active-type');
  p1Type.innerText = mobile ? (TYPE_SYMBOLS[playerActive.type] || playerActive.type) : playerActive.type;
  p1Type.style.background = TYPE_COLORS[playerActive.type];
  var p1HpPct = Math.max(0, (playerActive.currentHp / playerActive.maxHp) * 100);
  var p1HpFill = document.getElementById('my-hp-fill');
  p1HpFill.style.width = p1HpPct + '%';
  p1HpFill.style.backgroundColor = p1HpPct < 25 ? 'var(--hp-red)' : p1HpPct < 50 ? 'var(--hp-yellow)' : 'var(--hp-green)';
  document.getElementById('my-hp-text').innerText = playerActive.currentHp + '/' + playerActive.maxHp + ' HP';
  document.getElementById('my-energy-fill').style.width = Math.min(100, (playerActive.energy / 3) * 100) + '%';
  document.getElementById('my-energy-text').innerText = '⚡ ' + playerActive.energy + '/3';

  var p2Label = document.getElementById('p2-title-label');
  p2Label.innerText = mobile ? 'Opponent' : (isAiMode ? 'Active: AI' : 'Active: Opponent');
  document.getElementById('opp-active-sprite').src = opponentActive.sprite;
  document.getElementById('opp-active-name').innerText = opponentActive.name + (opponentActive.isMega ? ' 🧬' : '');
  var p2Type = document.getElementById('opp-active-type');
  p2Type.innerText = mobile ? (TYPE_SYMBOLS[opponentActive.type] || opponentActive.type) : opponentActive.type;
  p2Type.style.background = TYPE_COLORS[opponentActive.type];
  var p2HpPct = Math.max(0, (opponentActive.currentHp / opponentActive.maxHp) * 100);
  var p2HpFill = document.getElementById('opp-hp-fill');
  p2HpFill.style.width = p2HpPct + '%';
  p2HpFill.style.backgroundColor = p2HpPct < 25 ? 'var(--hp-red)' : p2HpPct < 50 ? 'var(--hp-yellow)' : 'var(--hp-green)';
  document.getElementById('opp-hp-text').innerText = opponentActive.currentHp + '/' + opponentActive.maxHp + ' HP';
  document.getElementById('opp-energy-fill').style.width = Math.min(100, (opponentActive.energy / 3) * 100) + '%';
  document.getElementById('opp-energy-text').innerText = '⚡ ' + opponentActive.energy + '/3';

  document.getElementById('p1-bench-label').innerText = 'Your Bench';
  document.getElementById('p2-bench-label').innerText = isAiMode ? 'AI Bench' : 'Opponent Bench';
  renderBenchGrid('p1-bench-slots', playerTeam, playerActiveIdx, true);
  renderBenchGrid('opp-bench-slots', opponentTeam, opponentActiveIdx, false);

  var attackFastBtn = document.getElementById('btn-fast-atk');
  var attackChargedBtn = document.getElementById('btn-charged-atk');
  var activePokemonAlive = playerActive.currentHp > 0 && opponentActive.currentHp > 0;
  if (!activePokemonAlive) {
    if (attackFastBtn) attackFastBtn.disabled = true;
    if (attackChargedBtn) attackChargedBtn.disabled = true;
  }
}
var battleCinematicTimer = null;

function showBattleCinematic(options, onComplete) {
  options = options || {};
  var overlay = document.getElementById('battle-cinematic');
  var sprite = document.getElementById('cinematic-pokemon');
  var kicker = document.getElementById('cinematic-kicker');
  var label = document.getElementById('cinematic-message-label');
  var name = document.getElementById('cinematic-message-name');
  var sub = document.getElementById('cinematic-message-sub');
  if (!overlay || !sprite || !kicker || !label || !name || !sub) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  if (battleCinematicTimer) {
    clearTimeout(battleCinematicTimer);
    battleCinematicTimer = null;
  }

  var kind = options.kind === 'mega' ? 'mega' : 'ultimate';
  var duration = Math.max(650, Number(options.duration) || (kind === 'mega' ? 1900 : 1550));
  var color = options.color || (kind === 'mega' ? '#ec4899' : '#f8fafc');
  var title = options.title || (kind === 'mega' ? 'MEGA EVOLUTION' : 'ULTIMATE MOVE');
  var moveName = options.moveName || 'POWER UNLEASHED';
  var pokemonName = options.pokemonName || 'Pokémon';

  overlay.classList.remove('mega', 'ultimate', 'hidden');
  overlay.classList.add(kind);
  overlay.style.setProperty('--fx-color', color);
  overlay.setAttribute('aria-hidden', 'false');

  sprite.src = options.sprite || '';
  sprite.alt = pokemonName + ' facing forward';
  kicker.textContent = title;
  label.textContent = title;
  name.textContent = moveName;
  sub.textContent = kind === 'mega'
    ? pokemonName + ' changed form!'
    : pokemonName + ' unleashed its ultimate!';

  overlay.querySelectorAll('.cinematic-burst').forEach(function(node) { node.remove(); });
  var burstCount = kind === 'mega' ? 14 : 10;
  for (var i = 0; i < burstCount; i++) {
    var burst = document.createElement('span');
    burst.className = 'cinematic-burst';
    var angle = (Math.PI * 2 * i / burstCount) + (kind === 'mega' ? 0.18 : 0);
    var distance = 110 + (i % 4) * 42;
    burst.style.left = '50%';
    burst.style.top = '43%';
    burst.style.setProperty('--burst-x', Math.round(Math.cos(angle) * distance) + 'px');
    burst.style.setProperty('--burst-y', Math.round(Math.sin(angle) * distance) + 'px');
    burst.style.animationDelay = (0.18 + (i % 5) * 0.06) + 's';
    overlay.appendChild(burst);
  }

  void overlay.offsetWidth;

  battleCinematicTimer = setTimeout(function() {
    overlay.classList.add('hidden');
    overlay.classList.remove('mega', 'ultimate');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.querySelectorAll('.cinematic-burst').forEach(function(node) { node.remove(); });
    battleCinematicTimer = null;
    if (typeof onComplete === 'function') onComplete();
  }, duration);
}

function startTurn() {
  clearAllTimers();
  updateBattleUI();

  var isMyTurn = (activeTurn === myRole);
  var myActive = myRole === 'p1' ? p1Team[p1ActiveIdx] : p2Team[p2ActiveIdx];
  var opponentActive = myRole === 'p1' ? p2Team[p2ActiveIdx] : p1Team[p1ActiveIdx];
  var bothActiveAlive = !!(myActive && opponentActive &&
    myActive.currentHp > 0 && opponentActive.currentHp > 0);
  var myHasMega = myRole === 'p1' ? p1HasMegaStone : p2HasMegaStone;
  var myCooldown = myRole === 'p1' ? p1SwitchCooldown : p2SwitchCooldown;

  var turnInd = document.getElementById('turn-indicator');
  var fastBtn = document.getElementById('btn-fast-atk');
  var chargedBtn = document.getElementById('btn-charged-atk');
  var megaBtn = document.getElementById('btn-mega');

  if (!fastBtn || !chargedBtn) return;

  if (isMyTurn) {
    turnTimeLeft = 10;
    if (myCooldown > 0) {
      turnInd.innerText = "👉 Your Turn (" + turnTimeLeft + "s) | Switch CD: " + myCooldown;
    } else {
      turnInd.innerText = "👉 Your Turn (" + turnTimeLeft + "s): Select Attack or Switch";
    }
    turnInd.style.color = "#38bdf8";

    // Attacks are only possible when BOTH active Pokemon are alive.
    fastBtn.disabled = !bothActiveAlive;
    fastBtn.querySelector('strong').innerText = '⚡ ' + myActive.fastMove.name;
    document.getElementById('lbl-fast-info').innerText = 'Fast | +1 Energy';

    var chargedReady = myActive.energy >= 3;
    chargedBtn.disabled = !(bothActiveAlive && chargedReady);
    chargedBtn.querySelector('strong').innerText = '💥 ' + myActive.chargedMove.name;
    document.getElementById('lbl-charged-info').innerText = chargedReady ? 'READY TO STRIKE!' : 'Need ' + (3 - myActive.energy) + ' Energy';

    if (myHasMega && myActive.canMega && !myActive.isMega) {
      megaBtn.classList.remove('hidden');
    } else {
      megaBtn.classList.add('hidden');
    }

    turnTimer = setInterval(function() {
      turnTimeLeft--;
      if (turnTimeLeft > 0) {
        if (myCooldown > 0) {
          turnInd.innerText = "👉 Your Turn (" + turnTimeLeft + "s) | Switch CD: " + myCooldown;
        } else {
          turnInd.innerText = "👉 Your Turn (" + turnTimeLeft + "s): Select Attack or Switch";
        }
      } else {
        clearInterval(turnTimer);
        turnTimer = null;
        // Timeout reached without action: skip turn entirely (no attack, no energy gained, pass turn)
        showPopup("⏳ Turn Skipped!", "warn");
        activeTurn = (myRole === 'p1') ? 'p2' : 'p1';
        startTurn();
      }
    }, 1000);

  } else {
    turnInd.innerText = isAiMode ? "⏳ AI is thinking..." : "⏳ Opponent is taking their turn...";
    turnInd.style.color = "var(--text-muted)";

    fastBtn.disabled = true;
    chargedBtn.disabled = true;
    megaBtn.classList.add('hidden');

    if (isAiMode && activeTurn === 'p2') {
      setTimeout(aiTakeTurn, 700);
    }
  }
}

window.handleMegaButtonClick = function() {
  var myActive = myRole === 'p1' ? p1Team[p1ActiveIdx] : p2Team[p2ActiveIdx];
  var forms = MEGA_FORMS[myActive.id];
  if (!forms || forms.length === 0) return;

  if (forms.length === 1) {
    triggerMegaEvolution(0);
  } else {
    var modal = document.getElementById('mega-modal');
    var choices = document.getElementById('mega-choices');
    choices.innerHTML = '';

    forms.forEach(function(form, index) {
      var btn = document.createElement('button');
      btn.className = 'btn btn-mega';
      btn.innerHTML = '<strong>' + form.name + '</strong> (' + form.type + ' Type)';
      btn.onclick = function() {
        closeMegaModal();
        triggerMegaEvolution(index);
      };
      choices.appendChild(btn);
    });

    modal.classList.remove('hidden');
  }
};

window.closeMegaModal = function() {
  document.getElementById('mega-modal').classList.add('hidden');
};

function triggerMegaEvolution(formIndex) {
  playSound('beep');
  var payload = { formIndex: formIndex || 0 };
  if (!isAiMode) {
    sendNet('BATTLE_ACTION', { action: 'MEGA', data: payload, actorRole: myRole });
  }
  applyActionLocally('MEGA', payload, myRole);
}

function executeMoveLocally(moveType) {
  var currentP1 = p1Team[p1ActiveIdx];
  var currentP2 = p2Team[p2ActiveIdx];
  if (!currentP1 || !currentP2 || currentP1.currentHp <= 0 || currentP2.currentHp <= 0) {
    console.warn('Attack blocked: an active Pokemon is fainted.');
    startTurn();
    return;
  }

  clearAllTimers();
  var isP1 = activeTurn === 'p1';
  var attacker = isP1 ? p1Team[p1ActiveIdx] : p2Team[p2ActiveIdx];
  var defender = isP1 ? p2Team[p2ActiveIdx] : p1Team[p1ActiveIdx];
  var move = moveType === 'charged' ? attacker.chargedMove : attacker.fastMove;

  var baseDmg = Math.floor(Math.random() * (move.maxDmg - move.minDmg + 1)) + move.minDmg;
  var mult = 1.0;
  if (TYPE_CHART[move.type] && TYPE_CHART[move.type][defender.type] !== undefined) {
    mult = TYPE_CHART[move.type][defender.type];
  }

  var damage = 0;
  if (mult > 0) {
    var rawDmg = ((attacker.atk / defender.def) * baseDmg * 0.75) * mult;
    var resistance = defender.isMega ? 0.75 : 1.0;
    damage = Math.max(5, Math.round(rawDmg * resistance));
  }

  var actionData = {
    moveType: moveType,
    damage: damage,
    mult: mult,
    moveColor: TYPE_COLORS[move.type] || 'white'
  };

  var moveActorRole = activeTurn;
  if (!isAiMode) {
    sendNet('BATTLE_ACTION', { action: 'MOVE', data: actionData, actorRole: moveActorRole });
  }
  applyActionLocally('MOVE', actionData, moveActorRole);
}

function applyActionLocally(actionType, data, explicitActorRole) {
  var actorRole = explicitActorRole || activeTurn;
  var isP1 = actorRole === 'p1';
  var targetRole = isP1 ? 'p2' : 'p1';

  if (actionType === 'MEGA') {
    var actorPoke = actorRole === 'p1' ? p1Team[p1ActiveIdx] : p2Team[p2ActiveIdx];
    var forms = MEGA_FORMS[actorPoke.id];
    var chosenForm = (forms && forms[data.formIndex]) ? forms[data.formIndex] : (forms ? forms[0] : null);

    actorPoke.isMega = true;
    actorPoke.atk *= 1.4;
    actorPoke.maxHp = Math.round(actorPoke.maxHp * 1.3);
    actorPoke.currentHp = Math.round(actorPoke.currentHp * 1.3);

    if (chosenForm) {
      actorPoke.name = chosenForm.name;
      actorPoke.type = chosenForm.type;
      actorPoke.sprite = MEGA_SPRITE(chosenForm);
      actorPoke.fastMove = { name: TYPE_MOVES[chosenForm.type].fast, type: chosenForm.type, minDmg: 24, maxDmg: 32 };
      actorPoke.chargedMove = { name: TYPE_MOVES[chosenForm.type].charged, type: chosenForm.type, minDmg: 90, maxDmg: 110 };
    }
    
    if (actorRole === 'p1') p1HasMegaStone = false;
    else p2HasMegaStone = false;

    playSound('mega');
    triggerHaptics([80, 50, 80, 50, 120]);
    updateBattleUI();

    showBattleCinematic({
      kind: 'mega',
      color: '#ec4899',
      sprite: actorPoke.sprite,
      pokemonName: actorPoke.name,
      title: 'MEGA EVOLUTION',
      moveName: actorPoke.name,
      duration: 1950
    }, function() {
      triggerScreenFlash('#ec4899');
      showPopup('🧬 ' + actorPoke.name + ' AWAKENED!', 'mega');
      activeTurn = targetRole;
      startTurn();
    });
    return;
  }

  if (actionType === 'SWITCH') {
    clearAllTimers();
    playSound('beep');

    var switchTeam = actorRole === 'p1' ? p1Team : p2Team;
    var newIndex = Number(data.newIndex);
    if (!switchTeam || !switchTeam[newIndex] || switchTeam[newIndex].currentHp <= 0) {
      console.warn('Ignoring invalid SWITCH action', { actorRole: actorRole, newIndex: data.newIndex });
      return;
    }

    if (actorRole === 'p1') {
      p1ActiveIdx = newIndex;
      if (!data.isForced) p1SwitchCooldown = 5;
    } else {
      p2ActiveIdx = newIndex;
      if (!data.isForced) p2SwitchCooldown = 5;
    }

    var switchedPoke = actorRole === 'p1' ? p1Team[p1ActiveIdx] : p2Team[p2ActiveIdx];
    showPopup((actorRole === myRole ? 'You' : 'Opponent') + ' sent out ' + switchedPoke.name + '!', "crit");

    isSwapPhase = false;
    activeTurn = targetRole;
    updateBattleUI();
    startTurn();
    return;
  }

  if (actionType === 'MOVE') {
    var attacker = actorRole === 'p1' ? p1Team[p1ActiveIdx] : p2Team[p2ActiveIdx];
    var defender = targetRole === 'p1' ? p1Team[p1ActiveIdx] : p2Team[p2ActiveIdx];
    var targetCardId = targetRole === myRole ? 'me-card' : 'opp-card';

    if (actorRole === 'p1' && p1SwitchCooldown > 0) p1SwitchCooldown--;
    if (actorRole === 'p2' && p2SwitchCooldown > 0) p2SwitchCooldown--;

    var damage = data.damage;
    var mult = data.mult;

    function resolveMoveImpact() {
      defender.currentHp = Math.max(0, defender.currentHp - damage);

      if (data.moveType === 'fast') {
        attacker.energy = Math.min(3, (attacker.energy || 0) + 1);
        playSound('hit');
        triggerHaptics([30]);
        triggerShake(targetCardId);
      } else {
        triggerScreenFlash(data.moveColor);
        triggerShake(targetCardId);
      }

      showPopup('-' + damage + ' HP', "dmg");
      if (mult === 0) setTimeout(function() { showPopup("No Effect!", "immune"); }, 250);
      else if (mult > 1.0) setTimeout(function() { showPopup("Super Effective!", "super"); }, 250);
      else if (mult < 1.0) setTimeout(function() { showPopup("Not Very Effective...", "not-very"); }, 250);

      updateBattleUI();

      if (defender.currentHp <= 0) {
        setTimeout(function() { showPopup(defender.name + ' Fainted!', "crit"); }, 400);
        handleFaint(targetRole);
      } else {
        activeTurn = targetRole;
        startTurn();
      }
    }

    if (data.moveType === 'charged') {
      attacker.energy = 0;
      playSound('charged');
      triggerHaptics([60, 40, 80, 40, 120]);
      updateBattleUI();

      showBattleCinematic({
        kind: 'ultimate',
        color: data.moveColor,
        sprite: attacker.sprite,
        pokemonName: attacker.name,
        title: 'ULTIMATE MOVE',
        moveName: attacker.chargedMove.name,
        duration: 1580
      }, resolveMoveImpact);
      return;
    }

    resolveMoveImpact();
  }
}

function handleFaint(faintedRole) {
  var scoreSnapshot = getCurrentScores();
  p1Score = scoreSnapshot.p1;
  p2Score = scoreSnapshot.p2;
  updateScoreboardUI();

  var team = faintedRole === 'p1' ? p1Team : p2Team;
  var aliveIdx = -1;
  for (var i = 0; i < team.length; i++) {
    if (team[i].currentHp > 0) { aliveIdx = i; break; }
  }

  if (aliveIdx === -1) {
    var winner = faintedRole === myRole ? (isAiMode ? "AI" : "Opponent") : "You";
    playSound('fanfare');
    showPopup('🏆 ' + winner + ' Won!', "crit");
    
    var turnInd = document.getElementById('turn-indicator');
    turnInd.innerText = "🏁 Match Finished!";
    turnInd.style.color = "#4ade80";

    var finalScores = getCurrentScores();
    p1Score = finalScores.p1;
    p2Score = finalScores.p2;
    updateScoreboardUI();
    flashFinalScoreboard(winner);

    document.getElementById('controls-section').innerHTML = 
      '<h2 style="text-align:center; color:#4ade80; margin:12px 0;">🎉 ' + winner + ' Won the Arena!</h2>' +
      '<div style="display:flex; gap:10px; width:100%; max-width:360px;">' +
        '<button class="btn btn-ready" onclick="triggerRematch()">🔄 Play Again</button>' +
        '<button class="btn btn-secondary" onclick="returnToLobby()">🚪 Return to Lobby</button>' +
      '</div>';
    return;
  }

  activeTurn = faintedRole;
  isSwapPhase = true;
  updateBattleUI();

  if (faintedRole === 'p2' && isAiMode) {
    setTimeout(function() {
      if (!isSwapPhase) return;
      clearAllTimers();
      p2ActiveIdx = aliveIdx;
      isSwapPhase = false;
      activeTurn = 'p1';
      updateBattleUI();
      startTurn();
    }, 1000);
    return;
  }

  swapTimeLeft = 5;
  var turnInd = document.getElementById('turn-indicator');
  turnInd.style.color = "var(--hp-red)";

  if (faintedRole === myRole) {
    turnInd.innerText = "⚠️ Your Pokémon fainted! Choose replacement (" + swapTimeLeft + "s)";
    document.getElementById('btn-fast-atk').disabled = true;
    document.getElementById('btn-charged-atk').disabled = true;
    document.getElementById('btn-mega').classList.add('hidden');

    swapTimer = setInterval(function() {
      swapTimeLeft--;
      if (swapTimeLeft > 0) {
        turnInd.innerText = "⚠️ Your Pokémon fainted! Choose replacement (" + swapTimeLeft + "s)";
      } else {
        clearInterval(swapTimer);
        swapTimer = null;
        autoSelectRandomHealthy(faintedRole);
      }
    }, 1000);
  } else {
    turnInd.innerText = "⏳ Opponent choosing replacement (5s)...";
  }
}

function autoSelectRandomHealthy(role) {
  if (!isSwapPhase) return;
  if (!isAiMode && role !== myRole) return;

  clearAllTimers();
  var team = role === 'p1' ? p1Team : p2Team;
  var healthyIndices = [];
  team.forEach(function(p, idx) {
    if (p.currentHp > 0) healthyIndices.push(idx);
  });

  if (healthyIndices.length > 0) {
    var randomIdx = healthyIndices[Math.floor(Math.random() * healthyIndices.length)];
    var actionData = { newIndex: randomIdx, isForced: true };
    if (!isAiMode && role === myRole) {
      sendNet('BATTLE_ACTION', { action: 'SWITCH', data: actionData, actorRole: role });
    }
    applyActionLocally('SWITCH', actionData, role);
  }
}

function aiTakeTurn() {
  var aiPoke = p2Team[p2ActiveIdx];
  if (p2HasMegaStone && aiPoke.canMega && !aiPoke.isMega) {
    var forms = MEGA_FORMS[aiPoke.id];
    var formIdx = forms ? Math.floor(Math.random() * forms.length) : 0;
    applyActionLocally('MEGA', { formIndex: formIdx }, 'p2');
    return;
  }
  if (aiPoke.energy >= 3) {
    executeMoveLocally('charged');
  } else {
    executeMoveLocally('fast');
  }
}

window.addEventListener('resize', function() {
  updateBattleUI();
});

window.addEventListener('load', function() {
  setGameInfoMode(false);
  var hash = window.location.hash.substring(1).toUpperCase().trim();
  if (hash && hash.length === 6) {
    document.getElementById('join-id-input').value = hash;
    var checkPeer = setInterval(function() {
      if (typeof Peer !== "undefined") {
        clearInterval(checkPeer);
        window.joinRoom();
      }
    }, 100);
  }
});
