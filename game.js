const CLASS_CONFIG = {
    warrior: {
        name: "Wojownik",
        hp: 135,
        mp: 30,
        atk: 14,
        def: 4,
        skillName: "🛡️ Grzmot Tarczy (10 MP)",
        skillCost: 10
    },
    mage: {
        name: "Mag",
        hp: 85,
        mp: 85,
        atk: 10,
        def: 1,
        skillName: "🔥 Kula Ognia (16 MP)",
        skillCost: 16
    },
    rogue: {
        name: "Łowca Cieni",
        hp: 105,
        mp: 50,
        atk: 13,
        def: 2,
        skillName: "🗡️ Zatrute Ostrze (12 MP)",
        skillCost: 12
    }
};

const LOCATIONS = [
    {
        id: "forest",
        name: "🌲 Mroczny Las",
        minLvl: 1,
        desc: "Gęsta puszcza pełna goblinów i wygłodniałych wilków.",
        enemies: [
            { id: "goblin", name: "Leśny Goblin", sprite: "goblin", hp: 38, atk: 7, xp: 35, gold: 15, desc: "Zwinny rabuś czyhający w zaroślach." },
            { id: "wolf", name: "Dziki Wilk", sprite: "wolf", hp: 54, atk: 10, xp: 50, gold: 22, desc: "Drapieżnik o krwistoczerwonych oczach." }
        ]
    },
    {
        id: "mines",
        name: "⛏️ Opuszczone Kopalnie",
        minLvl: 2,
        desc: "Zalane szyby strzeżone przez ożywieńców i mrocznych akolitów.",
        enemies: [
            { id: "skeleton", name: "Szkielet Wojownik", sprite: "skeleton", hp: 85, atk: 15, xp: 85, gold: 40, desc: "Dawny strażnik kopalni wskrzeszony klątwą." },
            { id: "darkmage", name: "Mroczny Mag", sprite: "darkmage", hp: 115, atk: 20, xp: 130, gold: 65, desc: "Włada zakazaną magią cienia." }
        ]
    },
    {
        id: "ruins",
        name: "🏛️ Przeklęte Ruiny",
        minLvl: 3,
        desc: "Starożytne zgliszcza przed bramą Cytadeli. Pilnują ich Kamienne Golemy.",
        enemies: [
            { id: "darkmage", name: "Mroczny Mag", sprite: "darkmage", hp: 125, atk: 21, xp: 145, gold: 70, desc: "Elitarny czarownik Cytadeli." },
            { id: "golem", name: "Kamienny Golem", sprite: "golem", hp: 185, atk: 26, xp: 230, gold: 115, desc: "Kolos ożywiony runami ognia." }
        ]
    }
];

const FINAL_BOSS = {
    id: "shadowlord",
    name: "Władca Cienia (BOSS)",
    sprite: "shadowlord",
    hp: 290,
    atk: 32,
    xp: 600,
    gold: 350,
    desc: "Pradawny władca Cytadeli Popiołów.",
    isBoss: true
};

const QUESTS = [
    { id: "q1", title: "Oczyść skraj lasu (Pokonaj 3 wrogów)", type: "kills", target: 3, rewardGold: 45, rewardXp: 60 },
    { id: "q2", title: "Zdobądź zapasy (Zgromadź 120 złota)", type: "gold", target: 120, rewardGold: 60, rewardXp: 90 },
    { id: "q3", title: "Pogromca potworów (Pokonaj 8 wrogów)", type: "kills", target: 8, rewardGold: 110, rewardXp: 160 },
    { id: "q4", title: "Mistrz wojenny (Osiągnij 4. poziom)", type: "lvl", target: 4, rewardGold: 150, rewardXp: 250 }
];

const AMULETS = [
    { id: "none", name: "Brak", cost: 0, desc: "Brak założonego amuletu." },
    { id: "mana", name: "Amulet Mądrości", cost: 90, desc: "Regeneruje +4 MP na koniec każdej tury walki." },
    { id: "vamp", name: "Amulet Krwi", cost: 130, desc: "Wysysa +5 HP przy każdym udanym ataku." }
];

const ACHIEVEMENTS_LIST = [
    { id: "first_blood", name: "Pierwsza Krew", desc: "Pokonaj pierwszego przeciwnika." },
    { id: "rich_hero", name: "Bogacz Doliny", desc: "Zgromadź 200 sztuk złota naraz." },
    { id: "no_camp_rest", name: "Żelazna Wola", desc: "Ukończ grę bez odpoczynku przy ognisku." },
    { id: "slayer", name: "Łowca Potworów", desc: "Pokonaj łącznie 15 przeciwników." },
    { id: "champion", name: "Pogromca Władcy Cienia", desc: "Ukończ grę pokonując finałowego bossa." }
];

let player = null;
let currentEnemy = null;
let inCombat = false;
let activeSubPanel = null; // 'map' | 'shop' | 'bag' | null

// Globalny postęp (Bestiariusz i Osiągnięcia)
let metaProgress = JSON.parse(localStorage.getItem("kroniki_cienia_v4_meta")) || {
    discoveredEnemies: {},
    achievements: {}
};

function saveMeta() {
    localStorage.setItem("kroniki_cienia_v4_meta", JSON.stringify(metaProgress));
}

function unlockAchievement(id) {
    if (!metaProgress.achievements[id]) {
        metaProgress.achievements[id] = true;
        saveMeta();
        const ach = ACHIEVEMENTS_LIST.find(a => a.id === id);
        if (ach && player) {
            addLog(`🏆 OSIĄGNIĘCIE ODBLOKOWANE: ${ach.name}!`, "log-loot");
        }
    }
}

const screens = {
    title: document.getElementById("title-screen"),
    classSelect: document.getElementById("class-selection"),
    game: document.getElementById("game-screen"),
    victory: document.getElementById("victory-screen"),
    defeat: document.getElementById("defeat-screen"),
    complete: document.getElementById("game-complete-screen")
};

const logEl = document.getElementById("log");
const controlsEl = document.getElementById("controls");
const subPanelEl = document.getElementById("sub-panel");
const enemyPanelEl = document.getElementById("enemy-panel");
const sceneBoxEl = document.getElementById("scene-box");

function switchScreen(screenKey) {
    Object.values(screens).forEach(el => el.classList.add("hidden"));
    screens[screenKey].classList.remove("hidden");
}

function showFloatingText(text, color = "#fc8181") {
    const layer = document.getElementById("floating-layer");
    const span = document.createElement("span");
    span.className = "float-num";
    span.style.color = color;
    span.textContent = text;
    layer.appendChild(span);
    setTimeout(() => span.remove(), 1000);
}

function initStaticArt() {
    if (typeof SVG_ASSETS !== "undefined") {
        document.getElementById("svg-title-art").innerHTML = SVG_ASSETS.titleCrest;
        document.getElementById("svg-victory-art").innerHTML = SVG_ASSETS.victoryTrophy;
        document.getElementById("svg-defeat-art").innerHTML = SVG_ASSETS.defeatSkull;
        document.getElementById("svg-complete-art").innerHTML = SVG_ASSETS.completeCrown;

        document.getElementById("svg-preview-warrior").innerHTML = SVG_ASSETS.warrior;
        document.getElementById("svg-preview-mage").innerHTML = SVG_ASSETS.mage;
        document.getElementById("svg-preview-rogue").innerHTML = SVG_ASSETS.rogue;
    }

    document.querySelectorAll(".select-class-btn").forEach(btn => {
        btn.onclick = () => startNewCharacter(btn.dataset.class);
    });
}

function checkSavedGameOnTitle() {
    const saved = localStorage.getItem("kroniki_cienia_v4_save");
    const continueBtn = document.getElementById("continue-btn");
    if (saved) {
        const parsed = JSON.parse(saved);
        continueBtn.classList.remove("hidden");
        continueBtn.textContent = `📜 Kontynuuj (${parsed.className}, Poz. ${parsed.lvl})`;
    } else {
        continueBtn.classList.add("hidden");
    }
}

function startNewCharacter(classKey) {
    const cfg = CLASS_CONFIG[classKey];
    player = {
        classKey: classKey,
        className: cfg.name,
        lvl: 1,
        xp: 0,
        xpNext: 100,
        hp: cfg.hp,
        maxHp: cfg.hp,
        mp: cfg.mp,
        maxMp: cfg.mp,
        atk: cfg.atk,
        def: cfg.def,
        gold: 30,
        weaponLvl: 1,
        armorLvl: 1,
        amulet: "none",
        bag: {
            hpPotion: 2,
            mpPotion: 1,
            whetstone: 0
        },
        atkBuffTurns: 0,
        kills: 0,
        questIndex: 0,
        usedCampRest: false
    };
    inCombat = false;
    currentEnemy = null;
    activeSubPanel = null;
    logEl.innerHTML = "";
    saveGame(false);
    enterGameView();
    addLog(`Wyruszasz jako ${player.className}! W plecaku masz 2 Mikstury Zdrowia i 1 Eliksir Many.`, "log-loot");
    updateUI();
}

function enterGameView() {
    switchScreen("game");
    document.getElementById("hero-avatar").innerHTML = SVG_ASSETS[player.classKey];
    document.getElementById("hero-class-name").textContent = player.className;
}

function addLog(text, type = "log-info") {
    const p = document.createElement("p");
    p.className = type;
    p.textContent = `> ${text}`;
    logEl.prepend(p);
}

function triggerShake() {
    sceneBoxEl.classList.remove("shake-anim");
    void sceneBoxEl.offsetWidth;
    sceneBoxEl.classList.add("shake-anim");
}

function getEffectiveAtk() {
    return player.atk + (player.atkBuffTurns > 0 ? 6 : 0);
}

function updateUI() {
    if (!player) return;

    if (player.gold >= 200) unlockAchievement("rich_hero");

    document.getElementById("lvl").textContent = player.lvl;
    document.getElementById("xp").textContent = player.xp;
    document.getElementById("xp-next").textContent = player.xpNext;
    document.getElementById("hp").textContent = player.hp;
    document.getElementById("max-hp").textContent = player.maxHp;
    document.getElementById("mp").textContent = player.mp;
    document.getElementById("max-mp").textContent = player.maxMp;
    document.getElementById("atk").textContent = getEffectiveAtk();
    document.getElementById("def").textContent = player.def;
    document.getElementById("gold").textContent = player.gold;

    const amuletObj = AMULETS.find(a => a.id === player.amulet);
    document.getElementById("amulet-name").textContent = amuletObj ? amuletObj.name : "Brak";

    const buffInd = document.getElementById("buff-indicator");
    buffInd.textContent = player.atkBuffTurns > 0 ? `(+6 Osełka: ${player.atkBuffTurns}t)` : "";

    document.getElementById("hp-bar").style.width = `${(player.hp / player.maxHp) * 100}%`;
    document.getElementById("mp-bar").style.width = `${(player.mp / player.maxMp) * 100}%`;
    document.getElementById("xp-bar").style.width = `${Math.min(100, (player.xp / player.xpNext) * 100)}%`;

    updateQuestUI();

    const badgesEl = document.getElementById("status-badges");
    badgesEl.innerHTML = "";

    if (inCombat && currentEnemy) {
        enemyPanelEl.classList.remove("hidden");
        document.getElementById("enemy-name").textContent = currentEnemy.name;
        document.getElementById("enemy-hp").textContent = currentEnemy.hp;
        document.getElementById("enemy-max-hp").textContent = currentEnemy.maxHp;
        document.getElementById("enemy-hp-bar").style.width = `${(currentEnemy.hp / currentEnemy.maxHp) * 100}%`;
        document.getElementById("scene-svg").innerHTML = SVG_ASSETS[currentEnemy.sprite];

        if (currentEnemy.poisonTurns > 0) {
            badgesEl.innerHTML += `<span class="badge-status status-poison">☠️ Trucizna (${currentEnemy.poisonTurns}t)</span>`;
        }
        if (currentEnemy.burnTurns > 0) {
            badgesEl.innerHTML += `<span class="badge-status status-burn">🔥 Podpalenie (${currentEnemy.burnTurns}t)</span>`;
        }
        if (currentEnemy.stunned) {
            badgesEl.innerHTML += `<span class="badge-status status-stun">💫 Ogłuszony!</span>`;
        }
    } else {
        enemyPanelEl.classList.add("hidden");
        document.getElementById("scene-svg").innerHTML = SVG_ASSETS.camp;
    }

    renderControls();
    renderSubPanel();
}

function updateQuestUI() {
    const qBar = document.getElementById("quest-bar");
    const claimBtn = document.getElementById("claim-quest-btn");

    if (player.questIndex >= QUESTS.length) {
        document.getElementById("quest-title").textContent = "Wszystkie zlecenia wykonane!";
        document.getElementById("quest-progress").textContent = "✔";
        claimBtn.classList.add("hidden");
        return;
    }

    const q = QUESTS[player.questIndex];
    let currentVal = 0;
    if (q.type === "kills") currentVal = player.kills;
    if (q.type === "gold") currentVal = player.gold;
    if (q.type === "lvl") currentVal = player.lvl;

    document.getElementById("quest-title").textContent = q.title;
    document.getElementById("quest-progress").textContent = `${Math.min(currentVal, q.target)} / ${q.target}`;

    if (currentVal >= q.target) {
        claimBtn.classList.remove("hidden");
        claimBtn.onclick = () => {
            player.gold += q.rewardGold;
            player.xp += q.rewardXp;
            player.questIndex++;
            SoundFX.coin();
            addLog(`🎁 Ukończono zlecenie "${q.title}"! Nagroda: +${q.rewardGold} złota, +${q.rewardXp} PD.`, "log-loot");
            checkLevelUp();
            saveGame(false);
            updateUI();
        };
    } else {
        claimBtn.classList.add("hidden");
    }
}

function renderControls() {
    controlsEl.innerHTML = "";

    if (!inCombat) {
        document.getElementById("location-title").textContent = "Obóz Podróżników";
        document.getElementById("location-desc").textContent = player.lvl >= 4
            ? "Osiągnąłeś 4. poziom! Możesz szturmować Cytadelę Władcy Cienia lub dalej eksplorować krainę."
            : "Wybierz wyprawę na mapie, odwiedź kupca i kowala lub sprawdź plecak.";

        const mapBtn = createBtn("🗺️ Mapa Wypraw", "btn-primary", () => toggleSubPanel("map"));
        const shopBtn = createBtn("🛒 Kupiec i Kuźnia", "btn-action", () => toggleSubPanel("shop"));
        const bagBtn = createBtn(`🎒 Plecak (${totalBagItems()})`, "btn-secondary", () => toggleSubPanel("bag"));
        const restBtn = createBtn("🔥 Ognisko (10 złota)", "btn-heal", restAtCamp);

        controlsEl.append(mapBtn, shopBtn, bagBtn, restBtn);

        if (player.lvl >= 4) {
            const bossBtn = createBtn("👑 Cytadela (FINAŁ)", "btn-boss", () => startCombat(FINAL_BOSS));
            controlsEl.append(bossBtn);
        }
    } else {
        document.getElementById("location-title").textContent = `Starcie: ${currentEnemy.name}`;
        document.getElementById("location-desc").textContent = currentEnemy.desc;

        const cfg = CLASS_CONFIG[player.classKey];
        const attackBtn = createBtn("⚔️ Atak", "btn-primary", playerAttack);
        const skillBtn = createBtn(cfg.skillName, "btn-action", useClassSkill);
        const bagBtn = createBtn(`🎒 Mikstury (${totalBagItems()})`, "btn-heal", () => toggleSubPanel("bag"));
        const fleeBtn = createBtn("🏃 Uciekaj", "btn-secondary", fleeCombat);

        controlsEl.append(attackBtn, skillBtn, bagBtn, fleeBtn);
    }
}

function totalBagItems() {
    return player.bag.hpPotion + player.bag.mpPotion + player.bag.whetstone;
}

function toggleSubPanel(panelName) {
    activeSubPanel = activeSubPanel === panelName ? null : panelName;
    renderSubPanel();
}

function renderSubPanel() {
    if (!activeSubPanel) {
        subPanelEl.classList.add("hidden");
        return;
    }
    subPanelEl.classList.remove("hidden");
    subPanelEl.innerHTML = "";

    const header = document.createElement("div");
    header.className = "sub-panel-header";

    if (activeSubPanel === "map" && !inCombat) {
        header.innerHTML = `<h4>🗺️ Wybierz cel wyprawy</h4><button class="btn-danger btn-sm" onclick="toggleSubPanel(null)">✖</button>`;
        subPanelEl.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "grid-cards";

        LOCATIONS.forEach(loc => {
            const locked = player.lvl < loc.minLvl;
            const card = document.createElement("div");
            card.className = "item-card";
            card.innerHTML = `
                <div>
                    <h5>${loc.name} ${locked ? `(Wymagany Poz. ${loc.minLvl})` : ""}</h5>
                    <p>${loc.desc}</p>
                </div>
            `;
            const btn = createBtn(locked ? "🔒 Zablokowane" : "⚔️ Wyrusz tutaj", locked ? "btn-secondary btn-sm" : "btn-primary btn-sm", () => {
                if (!locked) exploreLocation(loc);
            });
            if (locked) btn.disabled = true;
            card.appendChild(btn);
            grid.appendChild(card);
        });
        subPanelEl.appendChild(grid);
    }

    if (activeSubPanel === "shop" && !inCombat) {
        header.innerHTML = `<h4>🛒 Kupiec i Kuźnia (Złoto: ${player.gold})</h4><button class="btn-danger btn-sm" onclick="toggleSubPanel(null)">✖</button>`;
        subPanelEl.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "grid-cards";

        const wCost = player.weaponLvl * 25;
        const aCost = player.armorLvl * 25;

        const items = [
            { title: `⚔️ Ulepsz Broń (Poz. ${player.weaponLvl})`, desc: "Zwiększa bazowy Atak o +4.", btnText: `Kuj (${wCost} złota)`, action: () => upgradeGear("weapon", wCost) },
            { title: `🛡️ Ulepsz Pancerz (Poz. ${player.armorLvl})`, desc: "Zwiększa Obronę o +2.", btnText: `Kuj (${aCost} złota)`, action: () => upgradeGear("armor", aCost) },
            { title: "🧪 Mikstura Zdrowia", desc: "Przywraca natychmiast 45% maksymalnego HP.", btnText: "Kup (18 złota)", action: () => buyItem("hpPotion", 18, "Miksturę Zdrowia") },
            { title: "💧 Eliksir Many", desc: "Przywraca natychmiast 50% maksymalnej MP.", btnText: "Kup (18 złota)", action: () => buyItem("mpPotion", 18, "Eliksir Many") },
            { title: "🪨 Osełka Bojowa", desc: "Dodaje +6 do Ataku na 3 tury walki.", btnText: "Kup (22 złota)", action: () => buyItem("whetstone", 22, "Osełkę Bojową") }
        ];

        AMULETS.filter(a => a.id !== "none").forEach(am => {
            const owned = player.amulet === am.id;
            items.push({
                title: `🔮 ${am.name}`,
                desc: am.desc,
                btnText: owned ? "✔ Założony" : `Kup (${am.cost} złota)`,
                action: () => { if (!owned) buyAmulet(am); }
            });
        });

        items.forEach(it => {
            const card = document.createElement("div");
            card.className = "item-card";
            card.innerHTML = `<div><h5>${it.title}</h5><p>${it.desc}</p></div>`;
            const btn = createBtn(it.btnText, "btn-action btn-sm", it.action);
            card.appendChild(btn);
            grid.appendChild(card);
        });
        subPanelEl.appendChild(grid);
    }

    if (activeSubPanel === "bag") {
        header.innerHTML = `<h4>🎒 Plecak Ekwipunku</h4><button class="btn-danger btn-sm" onclick="toggleSubPanel(null)">✖</button>`;
        subPanelEl.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "grid-cards";

        const bagList = [
            { key: "hpPotion", name: `🧪 Mikstura Zdrowia (x${player.bag.hpPotion})`, desc: "Leczy 45% HP.", count: player.bag.hpPotion },
            { key: "mpPotion", name: `💧 Eliksir Many (x${player.bag.mpPotion})`, desc: "Odnawia 50% MP.", count: player.bag.mpPotion },
            { key: "whetstone", name: `🪨 Osełka Bojowa (x${player.bag.whetstone})`, desc: "+6 Ataku na 3 tury.", count: player.bag.whetstone }
        ];

        bagList.forEach(b => {
            const card = document.createElement("div");
            card.className = "item-card";
            card.innerHTML = `<div><h5>${b.name}</h5><p>${b.desc}</p></div>`;
            const btn = createBtn(b.count > 0 ? "✨ Użyj" : "Brak", b.count > 0 ? "btn-heal btn-sm" : "btn-secondary btn-sm", () => {
                if (b.count > 0) useBagItem(b.key);
            });
            if (b.count <= 0) btn.disabled = true;
            card.appendChild(btn);
            grid.appendChild(card);
        });
        subPanelEl.appendChild(grid);
    }
}

function createBtn(label, className, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = className;
    btn.onclick = onClick;
    return btn;
}

// EKSPLORACJA LOKACJI (ZDARZENIA LOSOWE LUB WALKA)
function exploreLocation(loc) {
    activeSubPanel = null;
    const roll = Math.random();

    // 25% szansy na zdarzenie losowe na szlaku
    if (roll < 0.25) {
        const eventType = Math.random();
        if (eventType < 0.5) {
            const foundGold = 15 + Math.floor(Math.random() * 20) * player.lvl;
            player.gold += foundGold;
            SoundFX.coin();
            showFloatingText(`+${foundGold} złota`, "#f6e05e");
            addLog(`📦 [${loc.name}] Znalazłeś porzuconą sakiewkę! Zdobywasz ${foundGold} złota.`, "log-loot");
        } else {
            const healHp = Math.floor(player.maxHp * 0.25);
            player.hp = Math.min(player.maxHp, player.hp + healHp);
            SoundFX.heal();
            showFloatingText(`+${healHp} HP`, "#68d391");
            addLog(`⛲ [${loc.name}] Odkryłeś leśną kapliczkę! Odzyskujesz ${healHp} HP.`, "log-heal");
        }
        saveGame(false);
        updateUI();
        return;
    }

    const template = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
    startCombat(template);
}

function startCombat(template) {
    activeSubPanel = null;
    currentEnemy = {
        ...template,
        maxHp: template.hp,
        poisonTurns: 0,
        burnTurns: 0,
        stunned: false
    };
    inCombat = true;

    metaProgress.discoveredEnemies[template.id] = true;
    saveMeta();

    SoundFX.hit();
    addLog(`⚔️ Na Twojej drodze staje ${currentEnemy.name} (HP: ${currentEnemy.hp})!`, "log-damage");
    updateUI();
}

function playerAttack() {
    const effAtk = getEffectiveAtk();
    let dmg = Math.floor(effAtk * (0.85 + Math.random() * 0.3));
    const critChance = player.classKey === "rogue" ? 0.3 : 0.1;

    if (Math.random() < critChance) {
        dmg = Math.floor(dmg * 1.65);
        showFloatingText(`KRYT -${dmg}`, "#f6e05e");
        addLog(`💥 Cios krytyczny! Zadajesz ${dmg} obrażeń przeciwnikowi ${currentEnemy.name}!`, "log-loot");
    } else {
        showFloatingText(`-${dmg}`, "#fc8181");
        addLog(`⚔️ Zadajesz ${dmg} obrażeń przeciwnikowi ${currentEnemy.name}.`, "log-info");
    }

    SoundFX.hit();
    currentEnemy.hp = Math.max(0, currentEnemy.hp - dmg);
    applyVampAmulet();
    triggerShake();
    finishPlayerTurn();
}

function useClassSkill() {
    const cfg = CLASS_CONFIG[player.classKey];
    if (player.mp < cfg.skillCost) {
        addLog(`Za mało Many (MP)! Wymagane: ${cfg.skillCost} MP.`, "log-damage");
        return;
    }
    player.mp -= cfg.skillCost;
    const effAtk = getEffectiveAtk();
    let dmg = 0;

    if (player.classKey === "warrior") {
        dmg = Math.floor(effAtk * 1.65);
        currentEnemy.stunned = true;
        SoundFX.hit();
        showFloatingText(`-${dmg} (OGŁUSZENIE)`, "#faf089");
        addLog(`🛡️ Grzmot Tarczy! Zadajesz ${dmg} obrażeń i ogłuszasz wroga na 1 turę!`, "log-loot");
    } else if (player.classKey === "mage") {
        dmg = Math.floor(effAtk * 2.2);
        currentEnemy.burnTurns = 3;
        SoundFX.magic();
        showFloatingText(`-${dmg} 🔥`, "#f6ad55");
        addLog(`🔥 Kula Ognia! Zadajesz ${dmg} obrażeń i podpalasz wroga na 3 tury!`, "log-loot");
    } else if (player.classKey === "rogue") {
        dmg = Math.floor(effAtk * 1.8);
        currentEnemy.poisonTurns = 3;
        SoundFX.hit();
        showFloatingText(`-${dmg} ☠️`, "#68d391");
        addLog(`🗡️ Zatrute Ostrze! Zadajesz ${dmg} obrażeń i zatruwasz przeciwnika na 3 tury!`, "log-loot");
    }

    currentEnemy.hp = Math.max(0, currentEnemy.hp - dmg);
    applyVampAmulet();
    triggerShake();
    finishPlayerTurn();
}

function applyVampAmulet() {
    if (player.amulet === "vamp" && currentEnemy.hp >= 0) {
        player.hp = Math.min(player.maxHp, player.hp + 5);
    }
}

function useBagItem(key) {
    if (player.bag[key] <= 0) return;
    player.bag[key]--;
    activeSubPanel = null;

    if (key === "hpPotion") {
        const amount = Math.floor(player.maxHp * 0.45);
        player.hp = Math.min(player.maxHp, player.hp + amount);
        SoundFX.heal();
        showFloatingText(`+${amount} HP`, "#68d391");
        addLog(`🧪 Wypijasz Miksturę Zdrowia i odzyskujesz ${amount} HP.`, "log-heal");
    } else if (key === "mpPotion") {
        const amount = Math.floor(player.maxMp * 0.5);
        player.mp = Math.min(player.maxMp, player.mp + amount);
        SoundFX.magic();
        showFloatingText(`+${amount} MP`, "#63b3ed");
        addLog(`💧 Wypijasz Eliksir Many i odzyskujesz ${amount} MP.`, "log-info");
    } else if (key === "whetstone") {
        player.atkBuffTurns = 3;
        SoundFX.hit();
        showFloatingText(`+6 ATAK`, "#f6e05e");
        addLog(`🪨 Ostrzysz broń osełką! Atak +6 przez 3 tury.`, "log-loot");
    }

    if (inCombat) {
        finishPlayerTurn();
    } else {
        saveGame(false);
        updateUI();
    }
}

function fleeCombat() {
    const fleeChance = currentEnemy.isBoss ? 0.35 : (player.classKey === "rogue" ? 0.85 : 0.65);
    if (Math.random() < fleeChance) {
        inCombat = false;
        currentEnemy = null;
        activeSubPanel = null;
        addLog("🏃 Udało Ci się bezpiecznie wycofać do obozu.", "log-info");
        updateUI();
    } else {
        addLog("Nie udało się uciec!", "log-damage");
        finishPlayerTurn();
    }
}

function finishPlayerTurn() {
    if (player.atkBuffTurns > 0) player.atkBuffTurns--;
    if (player.amulet === "mana") {
        player.mp = Math.min(player.maxMp, player.mp + 4);
    }

    // Sprawdź czy wróg padł od samego ciosu
    if (currentEnemy.hp <= 0) {
        handleEnemyDefeated();
        return;
    }

    // Obrażenia od podpalenia i trucizny na początku tury wroga
    if (currentEnemy.burnTurns > 0) {
        const burnDmg = Math.max(4, Math.floor(player.atk * 0.45));
        currentEnemy.hp = Math.max(0, currentEnemy.hp - burnDmg);
        currentEnemy.burnTurns--;
        addLog(`🔥 Ogień parzy ${currentEnemy.name} za ${burnDmg} obrażeń.`, "log-damage");
    }

    if (currentEnemy.poisonTurns > 0 && currentEnemy.hp > 0) {
        const poisonDmg = Math.max(4, Math.floor(player.atk * 0.4));
        currentEnemy.hp = Math.max(0, currentEnemy.hp - poisonDmg);
        currentEnemy.poisonTurns--;
        addLog(`☠️ Trucizna wyniszcza ${currentEnemy.name} za ${poisonDmg} obrażeń.`, "log-heal");
    }

    if (currentEnemy.hp <= 0) {
        handleEnemyDefeated();
        return;
    }

    enemyTurn();
    if (player && player.hp > 0) {
        updateUI();
    }
}

function enemyTurn() {
    if (!currentEnemy) return;

    if (currentEnemy.stunned) {
        currentEnemy.stunned = false;
        addLog(`💫 ${currentEnemy.name} jest ogłuszony i traci turę!`, "log-info");
        return;
    }

    const rawDmg = Math.floor(currentEnemy.atk * (0.85 + Math.random() * 0.3));
    const dmg = Math.max(1, rawDmg - player.def);
    player.hp = Math.max(0, player.hp - dmg);
    addLog(`💢 ${currentEnemy.name} atakuje i zadaje Ci ${dmg} obrażeń (pancerz zablokował ${player.def}).`, "log-damage");

    if (player.hp <= 0) {
        const killerName = currentEnemy.name;
        inCombat = false;
        currentEnemy = null;
        activeSubPanel = null;
        SoundFX.defeat();
        localStorage.removeItem("kroniki_cienia_v4_save");
        showDefeatScreen(killerName);
    }
}

function handleEnemyDefeated() {
    const defeatedEnemy = { ...currentEnemy };
    player.xp += defeatedEnemy.xp;
    player.gold += defeatedEnemy.gold;
    player.kills += 1;
    inCombat = false;
    currentEnemy = null;
    activeSubPanel = null;

    unlockAchievement("first_blood");
    if (player.kills >= 15) unlockAchievement("slayer");

    // Szansa 30% na znalezienie mikstury po walce
    let lootBonus = "";
    if (!defeatedEnemy.isBoss && Math.random() < 0.3) {
        player.bag.hpPotion++;
        lootBonus = "🧪 Znalazłeś Miksturę Zdrowia!";
    }

    const leveledUp = checkLevelUp();
    SoundFX.coin();
    saveGame(false);

    if (defeatedEnemy.isBoss) {
        unlockAchievement("champion");
        if (!player.usedCampRest) unlockAchievement("no_camp_rest");
        showGameCompleteScreen();
    } else {
        showVictoryScreen(defeatedEnemy, leveledUp, lootBonus);
    }
}

function showVictoryScreen(enemy, leveledUp, lootBonus) {
    document.getElementById("victory-summary").textContent = `Pokonałeś przeciwnika: ${enemy.name}!`;
    let rewardsHtml = `
        <p>✨ Zdobyte doświadczenie: <strong>+${enemy.xp} PD</strong></p>
        <p>💰 Zdobyte złoto: <strong>+${enemy.gold} sztuk</strong></p>
        <p>❤️ Pozostałe zdrowie: <strong>${player.hp} / ${player.maxHp} HP</strong></p>
    `;
    if (lootBonus) {
        rewardsHtml += `<p style="color: #68d391;">${lootBonus}</p>`;
    }
    if (leveledUp) {
        rewardsHtml += `<p style="color: #f6e05e; margin-top: 8px;">🎉 AWANS! Osiągnąłeś ${player.lvl}. poziom doświadczenia!</p>`;
    }
    document.getElementById("victory-rewards").innerHTML = rewardsHtml;
    switchScreen("victory");
}

function showDefeatScreen(killerName) {
    document.getElementById("defeat-summary").textContent = `Poległeś w starciu z: ${killerName}.`;
    document.getElementById("defeat-stats").innerHTML = `
        <p>🛡️ Klasa: <strong>${player.className}</strong></p>
        <p>⭐ Osiągnięty poziom: <strong>${player.lvl}</strong></p>
        <p>💀 Pokonani wrogowie: <strong>${player.kills}</strong></p>
        <p>💰 Zgromadzone złoto: <strong>${player.gold}</strong></p>
    `;
    switchScreen("defeat");
}

function showGameCompleteScreen() {
    localStorage.removeItem("kroniki_cienia_v4_save");
    document.getElementById("complete-stats").innerHTML = `
        <p>🏆 Bohater: <strong>${player.className} (Poziom ${player.lvl})</strong></p>
        <p>💀 Pokonanych potworów: <strong>${player.kills}</strong></p>
        <p>⚔️ Broń: <strong>Poz. ${player.weaponLvl}</strong> | 🛡️ Pancerz: <strong>Poz. ${player.armorLvl}</strong></p>
        <p>💰 Skarbiec końcowy: <strong>${player.gold} złota</strong></p>
    `;
    switchScreen("complete");
}

function checkLevelUp() {
    let leveledUp = false;
    while (player.xp >= player.xpNext) {
        player.xp -= player.xpNext;
        player.lvl++;
        player.xpNext = Math.floor(player.xpNext * 1.4);
        leveledUp = true;

        if (player.classKey === "warrior") {
            player.maxHp += 28;
            player.maxMp += 6;
            player.atk += 3;
            player.def += 1;
        } else if (player.classKey === "mage") {
            player.maxHp += 15;
            player.maxMp += 18;
            player.atk += 4;
        } else {
            player.maxHp += 20;
            player.maxMp += 12;
            player.atk += 4;
            if (player.lvl % 2 === 0) player.def += 1;
        }

        player.hp = player.maxHp;
        player.mp = player.maxMp;
        SoundFX.levelUp();
        addLog(`🎉 AWANS! Osiągnąłeś ${player.lvl}. poziom doświadczenia!`, "log-loot");
    }
    return leveledUp;
}

function restAtCamp() {
    if (player.gold < 10) {
        addLog("Nie masz wystarczająco złota (wymagane 10 sztuk).", "log-damage");
        return;
    }
    if (player.hp === player.maxHp && player.mp === player.maxMp) {
        addLog("Jesteś już w pełni sił.", "log-info");
        return;
    }
    player.gold -= 10;
    player.hp = player.maxHp;
    player.mp = player.maxMp;
    player.usedCampRest = true;
    SoundFX.heal();
    addLog("🔥 Odpocząłeś przy ognisku. HP i MP w pełni odnowione.", "log-heal");
    updateUI();
}

function upgradeGear(type, cost) {
    if (player.gold < cost) {
        addLog(`Brakuje złota (koszt: ${cost}).`, "log-damage");
        return;
    }
    player.gold -= cost;
    SoundFX.coin();
    if (type === "weapon") {
        player.weaponLvl++;
        player.atk += 4;
        addLog(`⚒️ Kowal ulepszył broń do poziomu ${player.weaponLvl} (Atak +4)!`, "log-loot");
    } else {
        player.armorLvl++;
        player.def += 2;
        addLog(`🛡️ Płatnerz wzmocnił pancerz do poziomu ${player.armorLvl} (Obrona +2)!`, "log-loot");
    }
    updateUI();
}

function buyItem(bagKey, cost, label) {
    if (player.gold < cost) {
        addLog(`Brakuje złota na ${label} (koszt: ${cost}).`, "log-damage");
        return;
    }
    player.gold -= cost;
    player.bag[bagKey]++;
    SoundFX.coin();
    addLog(`🛒 Kupiono: ${label}.`, "log-heal");
    updateUI();
}

function buyAmulet(am) {
    if (player.gold < am.cost) {
        addLog(`Brakuje złota na ${am.name} (koszt: ${am.cost}).`, "log-damage");
        return;
    }
    player.gold -= am.cost;
    player.amulet = am.id;
    SoundFX.magic();
    addLog(`🔮 Założyłeś ${am.name}!`, "log-loot");
    updateUI();
}

function saveGame(showMessage = true) {
    if (!player) return;
    localStorage.setItem("kroniki_cienia_v4_save", JSON.stringify(player));
    if (showMessage) {
        addLog("💾 Stan gry został zapisany.", "log-heal");
    }
}

// BESTIARIUSZ I OSIĄGNIĘCIA (MODAL)
const codexModal = document.getElementById("codex-modal");
const codexBody = document.getElementById("codex-body");

function openCodex(tab = "bestiary") {
    codexModal.classList.remove("hidden");
    codexBody.innerHTML = "";

    if (tab === "bestiary") {
        const allEnemies = [
            ...LOCATIONS[0].enemies,
            ...LOCATIONS[1].enemies,
            LOCATIONS[2].enemies[1],
            FINAL_BOSS
        ];
        allEnemies.forEach(en => {
            const seen = !!metaProgress.discoveredEnemies[en.id];
            const card = document.createElement("div");
            card.className = `codex-entry ${seen ? "" : "locked"}`;
            card.innerHTML = `
                <div class="codex-sprite">${seen ? SVG_ASSETS[en.sprite] : SVG_ASSETS.titleCrest}</div>
                <div class="codex-info">
                    <h4>${seen ? en.name : "??? Nieznany wróg"}</h4>
                    <p>${seen ? `${en.desc} (HP: ${en.hp}, Atak: ${en.atk})` : "Napotkaj tego przeciwnika na szlaku, aby odblokować wpis."}</p>
                </div>
            `;
            codexBody.appendChild(card);
        });
    } else {
        ACHIEVEMENTS_LIST.forEach(ach => {
            const unlocked = !!metaProgress.achievements[ach.id];
            const card = document.createElement("div");
            card.className = `codex-entry ${unlocked ? "" : "locked"}`;
            card.innerHTML = `
                <div class="codex-sprite">${unlocked ? SVG_ASSETS.victoryTrophy : SVG_ASSETS.defeatSkull}</div>
                <div class="codex-info">
                    <h4>${unlocked ? "🏆 " + ach.name : "🔒 " + ach.name}</h4>
                    <p>${ach.desc}</p>
                </div>
            `;
            codexBody.appendChild(card);
        });
    }
}

document.getElementById("bestiary-btn").onclick = () => openCodex("bestiary");
document.getElementById("tab-bestiary").onclick = () => openCodex("bestiary");
document.getElementById("tab-achievements").onclick = () => openCodex("achievements");
document.getElementById("close-codex-btn").onclick = () => codexModal.classList.add("hidden");

document.getElementById("sound-toggle-btn").onclick = (e) => {
    SoundFX.enabled = !SoundFX.enabled;
    e.target.textContent = SoundFX.enabled ? "🔊" : "🔇";
};

// NAWIGACJA EKRANÓW
document.getElementById("start-btn").onclick = () => switchScreen("classSelect");

document.getElementById("continue-btn").onclick = () => {
    const saved = localStorage.getItem("kroniki_cienia_v4_save");
    if (saved) {
        player = JSON.parse(saved);
        enterGameView();
        addLog(`📜 Wczytano zapisaną postać (${player.className}, Poz. ${player.lvl}).`, "log-info");
        updateUI();
    }
};

document.getElementById("victory-continue-btn").onclick = () => {
    enterGameView();
    addLog("Wracasz do obozu z łupami.", "log-info");
    updateUI();
};

document.getElementById("defeat-retry-btn").onclick = () => switchScreen("classSelect");
document.getElementById("defeat-title-btn").onclick = () => {
    checkSavedGameOnTitle();
    switchScreen("title");
};

document.getElementById("complete-replay-btn").onclick = () => switchScreen("classSelect");
document.getElementById("complete-title-btn").onclick = () => {
    checkSavedGameOnTitle();
    switchScreen("title");
};

document.getElementById("save-btn").onclick = () => saveGame(true);
document.getElementById("reset-btn").onclick = () => {
    saveGame(false);
    checkSavedGameOnTitle();
    switchScreen("title");
};

initStaticArt();
checkSavedGameOnTitle();
switchScreen("title");
