const CLASS_CONFIG = {
    warrior: {
        name: "Wojownik",
        hp: 140,
        mp: 30,
        atk: 14,
        def: 4,
        skillName: "🛡️ Grzmot Tarczy (10 MP)",
        skillCost: 10,
        weapons: ["Zardzewiały Miecz", "Żelazny Brzeszczot", "Stalowy Dwuręczniak", "Klinga Królów", "Runiczny Miecz Świtu"],
        armors: ["Skórzana Kurta", "Kolczuga Strażnika", "Zbroja Płytowa", "Pancerz Smoczej Łuski", "Zbroja Niezłomnych"]
    },
    mage: {
        name: "Mag",
        hp: 90,
        mp: 85,
        atk: 11,
        def: 1,
        skillName: "🔥 Kula Ognia (16 MP)",
        skillCost: 16,
        weapons: ["Dębowa Laska", "Kostur Adeptów", "Różdżka Płomieni", "Berło Astralne", "Kostur Arcymaga"],
        armors: ["Lniana Szata", "Opończa Uczonego", "Szata Żywiołów", "Płaszcz Gwiazd", "Szata Wiecznego Ognia"]
    },
    rogue: {
        name: "Łowca Cieni",
        hp: 110,
        mp: 50,
        atk: 13,
        def: 2,
        skillName: "🗡️ Zatrute Ostrze (12 MP)",
        skillCost: 12,
        weapons: ["Krótki Sztylet", "Ząbkowany Kozik", "Ostrza Skrytobójcy", "Kły Żmii", "Sztylety Zmierzchu"],
        armors: ["Płaszcz Zwiadowcy", "Utwardzana Skóra", "Cienista Kolczuga", "Strój Nocnego Łowcy", "Pancerz Widma"]
    }
};

const LOCATIONS = [
    {
        id: "forest",
        sceneClass: "scene-forest",
        name: "🌲 Mroczny Las",
        desc: "Gęsta puszcza pełna goblinów i wygłodniałych wilków.",
        unlockBossId: null,
        gateBoss: {
            id: "goblin_king",
            name: "Król Goblinów (Strażnik Lasu)",
            sprite: "goblinKing",
            hp: 95,
            atk: 13,
            armor: 2,
            xp: 95,
            gold: 50,
            specialType: "heavy",
            desc: "Przywódca leśnych band strzegący wejścia do Opuszczonych Kopalń.",
            unlocksZone: "mines"
        },
        enemies: [
            { id: "goblin", name: "Leśny Goblin", sprite: "goblin", hp: 40, atk: 8, armor: 0, xp: 35, gold: 16, specialType: "none", desc: "Zwinny rabuś czyhający w zaroślach." },
            { id: "wolf", name: "Dziki Wilk", sprite: "wolf", hp: 56, atk: 11, armor: 1, xp: 52, gold: 24, specialType: "heavy", desc: "Drapieżnik o krwistoczerwonych oczach." }
        ]
    },
    {
        id: "mines",
        sceneClass: "scene-mines",
        name: "⛏️ Opuszczone Kopalnie",
        desc: "Zalane szyby strzeżone przez szkielety i mrocznych akolitów.",
        unlockBossId: "goblin_king",
        gateBoss: {
            id: "fallen_knight",
            name: "Upadły Rycerz (Strażnik Kopalń)",
            sprite: "fallenKnight",
            hp: 165,
            atk: 20,
            armor: 5,
            xp: 180,
            gold: 95,
            specialType: "heavy",
            desc: "Opancerzony widmowy rycerz blokujący drogę do Przeklętych Ruin.",
            unlocksZone: "ruins"
        },
        enemies: [
            { id: "skeleton", name: "Szkielet Wojownik", sprite: "skeleton", hp: 88, atk: 15, armor: 2, xp: 85, gold: 42, specialType: "none", desc: "Dawny strażnik kopalni wskrzeszony klątwą." },
            { id: "darkmage", name: "Mroczny Mag", sprite: "darkmage", hp: 115, atk: 19, armor: 1, xp: 130, gold: 65, specialType: "drain", desc: "Wysysa manę i osłabia zaklęciami cienia." }
        ]
    },
    {
        id: "ruins",
        sceneClass: "scene-ruins",
        name: "🏛️ Przeklęte Ruiny",
        desc: "Starożytne zgliszcza przed bramą Cytadeli. Pilnują ich Kamienne Golemy.",
        unlockBossId: "fallen_knight",
        gateBoss: null,
        enemies: [
            { id: "darkmage", name: "Mroczny Mag", sprite: "darkmage", hp: 130, atk: 22, armor: 2, xp: 150, gold: 75, specialType: "drain", desc: "Elitarny czarownik Cytadeli." },
            { id: "golem", name: "Kamienny Golem", sprite: "golem", hp: 195, atk: 27, armor: 6, xp: 240, gold: 120, specialType: "heavy", desc: "Kamienny kolos o potężnym pancerzu." }
        ]
    }
];

const FINAL_BOSS = {
    id: "shadowlord",
    sceneClass: "scene-citadel",
    name: "Władca Cienia (FINAŁOWY BOSS)",
    sprite: "shadowlord",
    hp: 340,
    atk: 34,
    armor: 5,
    xp: 750,
    gold: 500,
    specialType: "boss",
    desc: "Pradawny władca Cytadeli Popiołów.",
    isBoss: true
};

const QUESTS = [
    { id: "q1", title: "Oczyść skraj lasu (Pokonaj 3 wrogów)", type: "kills", target: 3, rewardGold: 50, rewardXp: 65 },
    { id: "q2", title: "Pokonaj Króla Goblinów i otwórz Kopalnie", type: "boss", targetId: "goblin_king", target: 1, rewardGold: 85, rewardXp: 110 },
    { id: "q3", title: "Pokonaj Upadłego Rycerza i otwórz Ruiny", type: "boss", targetId: "fallen_knight", target: 1, rewardGold: 130, rewardXp: 180 },
    { id: "q4", title: "Osiągnij 6. poziom przed szturmem Cytadeli", type: "lvl", target: 6, rewardGold: 200, rewardXp: 300 }
];

const AMULETS = [
    { id: "none", name: "Brak", cost: 0, desc: "Brak założonego amuletu." },
    { id: "mana", name: "Amulet Mądrości", cost: 90, desc: "Regeneruje +5 MP na koniec każdej tury walki." },
    { id: "vamp", name: "Amulet Krwi", cost: 135, desc: "Wysysa +6 HP przy każdym udanym ataku." },
    { id: "thorns", name: "Amulet Cierni", cost: 150, desc: "Odbija 25% otrzymanych obrażeń z powrotem w napastnika." }
];

const ACHIEVEMENTS_LIST = [
    { id: "first_blood", name: "Pierwsza Krew", desc: "Pokonaj pierwszego przeciwnika." },
    { id: "gate_breaker", name: "Pogromca Strażników", desc: "Pokonaj obu strażników przejść (Króla Goblinów i Upadłego Rycerza)." },
    { id: "rich_hero", name: "Bogacz Doliny", desc: "Zgromadź 250 sztuk złota naraz." },
    { id: "no_camp_rest", name: "Żelazna Wola", desc: "Ukończ grę bez korzystania z ogniska w obozie." },
    { id: "champion", name: "Wyzwoliciel Doliny", desc: "Pokonaj Władcę Cienia i ukończ grę." }
];

let player = null;
let currentEnemy = null;
let inCombat = false;
let currentSceneClass = "";
let activeSubPanel = null; // 'map' | 'shop' | 'bag' | 'character' | 'event' | null
let activeEvent = null;

let metaProgress = JSON.parse(localStorage.getItem("kroniki_cienia_v5_meta")) || {
    discoveredEnemies: {},
    achievements: {}
};

function saveMeta() {
    localStorage.setItem("kroniki_cienia_v5_meta", JSON.stringify(metaProgress));
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
    const saved = localStorage.getItem("kroniki_cienia_v5_save");
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
        statPoints: 0,
        gold: 35,
        weaponLvl: 1,
        armorLvl: 1,
        amulet: "none",
        ownedAmulets: ["none"],
        bag: {
            hpPotion: 2,
            mpPotion: 1,
            whetstone: 1
        },
        atkBuffTurns: 0,
        weakTurns: 0,
        isGuarding: false,
        kills: 0,
        defeatedBosses: {},
        questIndex: 0,
        usedCampRest: false
    };
    inCombat = false;
    currentEnemy = null;
    activeSubPanel = null;
    activeEvent = null;
    currentSceneClass = "";
    logEl.innerHTML = "";
    saveGame(false);
    enterGameView();
    addLog(`Wyruszasz jako ${player.className}! Pokonaj strażników kolejnych krain i zdobądź 6. poziom.`, "log-loot");
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

function getWeaponName() {
    const list = CLASS_CONFIG[player.classKey].weapons;
    return list[Math.min(list.length - 1, player.weaponLvl - 1)];
}

function getArmorName() {
    const list = CLASS_CONFIG[player.classKey].armors;
    return list[Math.min(list.length - 1, player.armorLvl - 1)];
}

function getEffectiveAtk() {
    let val = player.atk + (player.atkBuffTurns > 0 ? 7 : 0);
    if (player.weakTurns > 0) val = Math.max(3, Math.floor(val * 0.75));
    return val;
}

function updateUI() {
    if (!player) return;

    if (player.gold >= 250) unlockAchievement("rich_hero");

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
    document.getElementById("gear-summary").textContent = `[${getWeaponName()} | ${getArmorName()}]`;

    const ptsBadge = document.getElementById("stat-points-badge");
    if (player.statPoints > 0) {
        ptsBadge.classList.remove("hidden");
        document.getElementById("stat-points").textContent = player.statPoints;
    } else {
        ptsBadge.classList.add("hidden");
    }

    const amuletObj = AMULETS.find(a => a.id === player.amulet);
    document.getElementById("amulet-name").textContent = amuletObj ? amuletObj.name : "Brak";

    const buffInd = document.getElementById("buff-indicator");
    buffInd.textContent = player.atkBuffTurns > 0 ? `(+7 Osełka: ${player.atkBuffTurns}t)` : "";

    document.getElementById("hp-bar").style.width = `${(player.hp / player.maxHp) * 100}%`;
    document.getElementById("mp-bar").style.width = `${(player.mp / player.maxMp) * 100}%`;
    document.getElementById("xp-bar").style.width = `${Math.min(100, (player.xp / player.xpNext) * 100)}%`;

    updateQuestUI();

    sceneBoxEl.classList.remove("scene-forest", "scene-mines", "scene-ruins", "scene-citadel");
    if (currentSceneClass) sceneBoxEl.classList.add(currentSceneClass);

    const badgesEl = document.getElementById("status-badges");
    const intentEl = document.getElementById("enemy-intent");
    badgesEl.innerHTML = "";

    if (inCombat && currentEnemy) {
        enemyPanelEl.classList.remove("hidden");
        document.getElementById("enemy-name").textContent = currentEnemy.name;
        document.getElementById("enemy-armor-tag").textContent = currentEnemy.armor > 0 ? `🛡️ Pancerz: ${currentEnemy.armor}` : "";
        document.getElementById("enemy-hp").textContent = currentEnemy.hp;
        document.getElementById("enemy-max-hp").textContent = currentEnemy.maxHp;
        document.getElementById("enemy-hp-bar").style.width = `${(currentEnemy.hp / currentEnemy.maxHp) * 100}%`;
        document.getElementById("scene-svg").innerHTML = SVG_ASSETS[currentEnemy.sprite];

        // Zapowiedź kolejnego ruchu przeciwnika
        intentEl.classList.remove("hidden");
        if (currentEnemy.stunned) {
            intentEl.textContent = "💫 Przeciwnik jest ogłuszony — straci najbliższą turę!";
        } else if (currentEnemy.nextAction === "heavy") {
            intentEl.textContent = "⚠️ UWAGA: Przeciwnik szykuje POTĘŻNY CIOS! Użyj Bloku!";
        } else if (currentEnemy.nextAction === "drain") {
            intentEl.textContent = "🔮 Przeciwnik splata klątwę wysysającą manę i osłabiającą atak!";
        } else {
            intentEl.textContent = `⚔️ Zamiar wroga: Zwykły atak (~${currentEnemy.atk} obr.)`;
        }

        if (currentEnemy.poisonTurns > 0) badgesEl.innerHTML += `<span class="badge-status status-poison">☠️ Trucizna (${currentEnemy.poisonTurns}t)</span>`;
        if (currentEnemy.burnTurns > 0) badgesEl.innerHTML += `<span class="badge-status status-burn">🔥 Podpalenie (${currentEnemy.burnTurns}t)</span>`;
        if (currentEnemy.stunned) badgesEl.innerHTML += `<span class="badge-status status-stun">💫 Ogłuszony</span>`;
        if (player.weakTurns > 0) badgesEl.innerHTML += `<span class="badge-status status-weak">📉 Osłabienie (-25% Ataku: ${player.weakTurns}t)</span>`;
    } else {
        enemyPanelEl.classList.add("hidden");
        intentEl.classList.add("hidden");
        document.getElementById("scene-svg").innerHTML = SVG_ASSETS.camp;
    }

    renderControls();
    renderSubPanel();
}

function updateQuestUI() {
    const claimBtn = document.getElementById("claim-quest-btn");
    if (player.questIndex >= QUESTS.length) {
        document.getElementById("quest-title").textContent = "Wszystkie zlecenia ukończone!";
        document.getElementById("quest-progress").textContent = "✔";
        claimBtn.classList.add("hidden");
        return;
    }

    const q = QUESTS[player.questIndex];
    let currentVal = 0;
    if (q.type === "kills") currentVal = player.kills;
    if (q.type === "lvl") currentVal = player.lvl;
    if (q.type === "boss") currentVal = player.defeatedBosses[q.targetId] ? 1 : 0;

    document.getElementById("quest-title").textContent = q.title;
    document.getElementById("quest-progress").textContent = `${Math.min(currentVal, q.target)} / ${q.target}`;

    if (currentVal >= q.target) {
        claimBtn.classList.remove("hidden");
        claimBtn.onclick = () => {
            player.gold += q.rewardGold;
            player.xp += q.rewardXp;
            player.questIndex++;
            SoundFX.coin();
            addLog(`🎁 Zlecenie "${q.title}" zaliczone! +${q.rewardGold} złota, +${q.rewardXp} PD.`, "log-loot");
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
        currentSceneClass = "";
        document.getElementById("location-title").textContent = "Obóz Podróżników";
        document.getElementById("location-desc").textContent = player.lvl >= 6
            ? "Osiągnąłeś 6. poziom! Brama Cytadeli stoi otworem — czas pokonać Władcę Cienia!"
            : "Wybierz wyprawę na mapie, ulepsz ekwipunek u kowala lub rozdaj punkty rozwoju.";

        const mapBtn = createBtn("🗺️ Mapa Wypraw", "btn-primary", () => toggleSubPanel("map"));
        const shopBtn = createBtn("🛒 Kupiec i Kuźnia", "btn-action", () => toggleSubPanel("shop"));
        const charBtn = createBtn(player.statPoints > 0 ? `⭐ Postać (+${player.statPoints})` : "👤 Postać", "btn-action", () => toggleSubPanel("character"));
        const bagBtn = createBtn(`🎒 Plecak (${totalBagItems()})`, "btn-secondary", () => toggleSubPanel("bag"));
        const restBtn = createBtn("🔥 Ognisko (10 złota)", "btn-heal", restAtCamp);

        controlsEl.append(mapBtn, shopBtn, charBtn, bagBtn, restBtn);

        if (player.lvl >= 6) {
            const bossBtn = createBtn("👑 Cytadela (FINAŁ)", "btn-boss", () => startCombat(FINAL_BOSS, "scene-citadel"));
            controlsEl.append(bossBtn);
        }
    } else {
        document.getElementById("location-title").textContent = `Starcie: ${currentEnemy.name}`;
        document.getElementById("location-desc").textContent = currentEnemy.desc;

        const cfg = CLASS_CONFIG[player.classKey];
        const attackBtn = createBtn("[1] ⚔️ Atak", "btn-primary", playerAttack);
        const skillBtn = createBtn(`[2] ${cfg.skillName}`, "btn-action", useClassSkill);
        const guardBtn = createBtn("[3] 🛡️ Blok (+8 MP)", "btn-guard", playerGuard);
        const bagBtn = createBtn(`[4] 🎒 Mikstury (${totalBagItems()})`, "btn-heal", () => toggleSubPanel("bag"));
        const fleeBtn = createBtn("[5] 🏃 Uciekaj", "btn-secondary", fleeCombat);

        controlsEl.append(attackBtn, skillBtn, guardBtn, bagBtn, fleeBtn);
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

    if (activeSubPanel === "event" && activeEvent) {
        header.innerHTML = `<h4>🎲 Zdarzenie na szlaku: ${activeEvent.title}</h4>`;
        subPanelEl.appendChild(header);
        const p = document.createElement("p");
        p.style.fontSize = "0.92rem";
        p.style.marginBottom = "10px";
        p.textContent = activeEvent.text;
        subPanelEl.appendChild(p);

        const choicesDiv = document.createElement("div");
        choicesDiv.className = "event-choices";
        activeEvent.choices.forEach(ch => {
            const btn = createBtn(ch.label, ch.btnClass || "btn-action", ch.action);
            choicesDiv.appendChild(btn);
        });
        subPanelEl.appendChild(choicesDiv);
        return;
    }

    if (activeSubPanel === "map" && !inCombat) {
        header.innerHTML = `<h4>🗺️ Wybierz cel wyprawy</h4><button class="btn-danger btn-sm" onclick="toggleSubPanel(null)">✖</button>`;
        subPanelEl.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "grid-cards";

        LOCATIONS.forEach(loc => {
            const locked = loc.unlockBossId && !player.defeatedBosses[loc.unlockBossId];
            const bossDefeated = loc.gateBoss && player.defeatedBosses[loc.gateBoss.id];

            const card = document.createElement("div");
            card.className = "item-card";
            card.innerHTML = `
                <div>
                    <h5>${loc.name} ${locked ? "🔒" : ""}</h5>
                    <p>${loc.desc}</p>
                </div>
            `;

            const btnGroup = document.createElement("div");
            btnGroup.style.display = "flex";
            btnGroup.style.flexDirection = "column";
            btnGroup.style.gap = "6px";

            if (locked) {
                const lockBtn = createBtn("🔒 Pokonaj strażnika poprzedniej krainy", "btn-secondary btn-sm", () => {});
                lockBtn.disabled = true;
                btnGroup.appendChild(lockBtn);
            } else {
                const expBtn = createBtn("🌲 Patroluj okolicę", "btn-primary btn-sm", () => exploreLocation(loc));
                btnGroup.appendChild(expBtn);

                if (loc.gateBoss && !bossDefeated) {
                    const gateBtn = createBtn(`💀 Wyzwij: ${loc.gateBoss.name}`, "btn-boss btn-sm", () => startCombat(loc.gateBoss, loc.sceneClass));
                    btnGroup.appendChild(gateBtn);
                }
            }
            card.appendChild(btnGroup);
            grid.appendChild(card);
        });
        subPanelEl.appendChild(grid);
    }

    if (activeSubPanel === "character" && !inCombat) {
        header.innerHTML = `<h4>👤 Karta Bohatera (Punkty rozwoju: ${player.statPoints})</h4><button class="btn-danger btn-sm" onclick="toggleSubPanel(null)">✖</button>`;
        subPanelEl.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "grid-cards";

        const statsUpgrade = [
            { title: "💪 Siła (+2 Ataku)", desc: `Obecny bazowy atak: ${player.atk}`, stat: "atk" },
            { title: "❤️ Witalność (+15 Maks. HP)", desc: `Obecne maks. HP: ${player.maxHp}`, stat: "hp" },
            { title: "💧 Inteligencja (+12 Maks. MP)", desc: `Obecna maks. MP: ${player.maxMp}`, stat: "mp" }
        ];

        statsUpgrade.forEach(s => {
            const card = document.createElement("div");
            card.className = "item-card";
            card.innerHTML = `<div><h5>${s.title}</h5><p>${s.desc}</p></div>`;
            const btn = createBtn(player.statPoints > 0 ? "➕ Przydziel punkt" : "Brak punktów", player.statPoints > 0 ? "btn-heal btn-sm" : "btn-secondary btn-sm", () => {
                if (player.statPoints <= 0) return;
                player.statPoints--;
                if (s.stat === "atk") player.atk += 2;
                if (s.stat === "hp") { player.maxHp += 15; player.hp += 15; }
                if (s.stat === "mp") { player.maxMp += 12; player.mp += 12; }
                SoundFX.levelUp();
                saveGame(false);
                updateUI();
            });
            if (player.statPoints <= 0) btn.disabled = true;
            card.appendChild(btn);
            grid.appendChild(card);
        });

        // Zmiana posiadanego amuletu
        const ownedList = AMULETS.filter(a => player.ownedAmulets.includes(a.id) && a.id !== "none");
        if (ownedList.length > 0) {
            const amCard = document.createElement("div");
            amCard.className = "item-card";
            amCard.innerHTML = `<div><h5>🔮 Posiadane Amulety</h5><p>Kliknij, aby założyć inny amulet.</p></div>`;
            const amBtns = document.createElement("div");
            amBtns.style.display = "flex";
            amBtns.style.flexDirection = "column";
            amBtns.style.gap = "4px";
            ownedList.forEach(am => {
                const isEq = player.amulet === am.id;
                const b = createBtn(isEq ? `✔ ${am.name}` : `Załóż: ${am.name}`, isEq ? "btn-heal btn-sm" : "btn-action btn-sm", () => {
                    player.amulet = am.id;
                    saveGame(false);
                    updateUI();
                });
                amBtns.appendChild(b);
            });
            amCard.appendChild(amBtns);
            grid.appendChild(amCard);
        }

        subPanelEl.appendChild(grid);
    }

    if (activeSubPanel === "shop" && !inCombat) {
        header.innerHTML = `<h4>🛒 Kupiec i Kuźnia (Złoto: ${player.gold})</h4><button class="btn-danger btn-sm" onclick="toggleSubPanel(null)">✖</button>`;
        subPanelEl.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "grid-cards";

        const wCost = player.weaponLvl * 30;
        const aCost = player.armorLvl * 30;

        const items = [
            { title: `⚔️ Wykuj: ${getWeaponName()} (+1)`, desc: "Zwiększa bazowy Atak o +4.", btnText: `Kuj (${wCost} złota)`, action: () => upgradeGear("weapon", wCost) },
            { title: `🛡️ Wzmocnij: ${getArmorName()} (+1)`, desc: "Zwiększa Obronę o +2.", btnText: `Kuj (${aCost} złota)`, action: () => upgradeGear("armor", aCost) },
            { title: "🧪 Mikstura Zdrowia", desc: "Przywraca 45% maksymalnego HP.", btnText: "Kup (18 złota)", action: () => buyItem("hpPotion", 18, "Miksturę Zdrowia") },
            { title: "💧 Eliksir Many", desc: "Przywraca 50% maksymalnej MP.", btnText: "Kup (18 złota)", action: () => buyItem("mpPotion", 18, "Eliksir Many") },
            { title: "🪨 Osełka Bojowa", desc: "Dodaje +7 do Ataku na 3 tury walki.", btnText: "Kup (24 złota)", action: () => buyItem("whetstone", 24, "Osełkę Bojową") }
        ];

        AMULETS.filter(a => a.id !== "none").forEach(am => {
            const owned = player.ownedAmulets.includes(am.id);
            items.push({
                title: `🔮 ${am.name}`,
                desc: am.desc,
                btnText: owned ? "✔ W ekwipunku" : `Kup (${am.cost} złota)`,
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
            { key: "whetstone", name: `🪨 Osełka Bojowa (x${player.bag.whetstone})`, desc: "+7 Ataku na 3 tury.", count: player.bag.whetstone }
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

// INTERAKTYWNE ZDARZENIA Z WYBORAMI
function triggerRandomEvent(loc) {
    const eventsPool = [
        {
            title: "Starożytny Ołtarz Krwi",
            text: "Pośrodku polany stoi kamienny obelisk pulsujący czerwonym światłem. Inskrypcja obiecuje siłę w zamian za ofiarę.",
            choices: [
                {
                    label: "🩸 Złóż ofiarę (-20 HP -> +2 Ataku na stałe)",
                    btnClass: "btn-danger",
                    action: () => {
                        if (player.hp <= 22) {
                            addLog("Masz zbyt mało zdrowia, aby złożyć ofiarę!", "log-damage");
                            return;
                        }
                        player.hp -= 20;
                        player.atk += 2;
                        SoundFX.magic();
                        addLog("🩸 Ołtarz pochłonął 20 HP, ale Twój Atak wzrósł na stałe o +2!", "log-loot");
                        closeEvent();
                    }
                },
                {
                    label: "🚶 Odejdź spokojnie",
                    btnClass: "btn-secondary",
                    action: () => {
                        addLog("Zignorowałeś mroczny ołtarz i wróciłeś na szlak.", "log-info");
                        closeEvent();
                    }
                }
            ]
        },
        {
            title: "Okuta Skrzynia w Zaroślach",
            text: "Natrafiasz na starą skrzynię kupiecką zabezpieczoną zardzewiałym zamkiem.",
            choices: [
                {
                    label: "🗝️ Otwórz ostrożnie (65% szans na skarb, 35% pułapka)",
                    btnClass: "btn-primary",
                    action: () => {
                        if (Math.random() < 0.65) {
                            const gold = 30 + player.lvl * 15;
                            player.gold += gold;
                            player.bag.hpPotion++;
                            SoundFX.coin();
                            addLog(`💰 Otworzyłeś skrzynię! Zdobywasz ${gold} złota i Miksturę Zdrowia!`, "log-loot");
                        } else {
                            const dmg = 14 + player.lvl * 3;
                            player.hp = Math.max(1, player.hp - dmg);
                            SoundFX.hit();
                            addLog(`💥 Pułapka! Zatruta igła rani Cię za ${dmg} HP!`, "log-damage");
                        }
                        closeEvent();
                    }
                },
                {
                    label: "🚶 Zostaw skrzynię",
                    btnClass: "btn-secondary",
                    action: () => {
                        addLog("Nie ryzykowałeś otwierania podejrzanej skrzyni.", "log-info");
                        closeEvent();
                    }
                }
            ]
        },
        {
            title: "Wędrowny Alchemik",
            text: "Tajemniczy starzec oferuje Ci eksperymentalny wywar za 25 sztuk złota.",
            choices: [
                {
                    label: "🧪 Kup wywar (25 złota -> Pełne leczenie + 40 PD)",
                    btnClass: "btn-heal",
                    action: () => {
                        if (player.gold < 25) {
                            addLog("Nie masz 25 sztuk złota!", "log-damage");
                            return;
                        }
                        player.gold -= 25;
                        player.hp = player.maxHp;
                        player.mp = player.maxMp;
                        player.xp += 40;
                        SoundFX.heal();
                        addLog("✨ Wywar w pełni odnowił Twoje siły i dał +40 PD!", "log-heal");
                        checkLevelUp();
                        closeEvent();
                    }
                },
                {
                    label: "🚶 Podziękuj i idź dalej",
                    btnClass: "btn-secondary",
                    action: () => {
                        addLog("Pożegnałeś alchemika.", "log-info");
                        closeEvent();
                    }
                }
            ]
        }
    ];

    activeEvent = eventsPool[Math.floor(Math.random() * eventsPool.length)];
    activeSubPanel = "event";
    currentSceneClass = loc.sceneClass;
    updateUI();
}

function closeEvent() {
    activeEvent = null;
    activeSubPanel = null;
    saveGame(false);
    updateUI();
}

function exploreLocation(loc) {
    activeSubPanel = null;
    if (Math.random() < 0.28) {
        triggerRandomEvent(loc);
        return;
    }
    const template = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
    startCombat(template, loc.sceneClass);
}

function decideNextEnemyAction(enemy) {
    if (enemy.specialType === "none") return "attack";
    const r = Math.random();
    if (enemy.specialType === "heavy" && r < 0.35) return "heavy";
    if (enemy.specialType === "drain" && r < 0.4) return "drain";
    if (enemy.specialType === "boss") {
        if (r < 0.35) return "heavy";
        if (r < 0.6) return "drain";
    }
    return "attack";
}

function startCombat(template, sceneClass = "") {
    activeSubPanel = null;
    currentSceneClass = sceneClass;
    currentEnemy = {
        ...template,
        maxHp: template.hp,
        armor: template.armor || 0,
        poisonTurns: 0,
        burnTurns: 0,
        stunned: false,
        nextAction: "attack"
    };
    currentEnemy.nextAction = decideNextEnemyAction(currentEnemy);
    inCombat = true;

    metaProgress.discoveredEnemies[template.id] = true;
    saveMeta();

    SoundFX.hit();
    addLog(`⚔️ Starcie! Na Twojej drodze staje ${currentEnemy.name} (HP: ${currentEnemy.hp})!`, "log-damage");
    updateUI();
}

function playerAttack() {
    player.isGuarding = false;
    const effAtk = getEffectiveAtk();
    let rawDmg = Math.floor(effAtk * (0.85 + Math.random() * 0.3));
    const critChance = player.classKey === "rogue" ? 0.3 : 0.1;
    let isCrit = false;

    if (Math.random() < critChance) {
        rawDmg = Math.floor(rawDmg * 1.65);
        isCrit = true;
    }

    const dmg = Math.max(1, rawDmg - currentEnemy.armor);
    if (isCrit) {
        showFloatingText(`KRYT -${dmg}`, "#f6e05e");
        addLog(`💥 Cios krytyczny! Zadajesz ${dmg} obrażeń (pancerz wroga zablokował ${currentEnemy.armor}).`, "log-loot");
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
    player.isGuarding = false;
    player.mp -= cfg.skillCost;
    const effAtk = getEffectiveAtk();
    let dmg = 0;

    if (player.classKey === "warrior") {
        dmg = Math.max(1, Math.floor(effAtk * 1.65) - Math.floor(currentEnemy.armor / 2));
        currentEnemy.stunned = true;
        SoundFX.hit();
        showFloatingText(`-${dmg} (OGŁUSZENIE)`, "#faf089");
        addLog(`🛡️ Grzmot Tarczy! Zadajesz ${dmg} obrażeń i ogłuszasz wroga!`, "log-loot");
    } else if (player.classKey === "mage") {
        // Magia całkowicie ignoruje pancerz przeciwnika
        dmg = Math.floor(effAtk * 2.15);
        currentEnemy.burnTurns = 3;
        SoundFX.magic();
        showFloatingText(`-${dmg} 🔥`, "#f6ad55");
        addLog(`🔥 Kula Ognia przebija pancerz za ${dmg} obrażeń i podpala wroga na 3 tury!`, "log-loot");
    } else if (player.classKey === "rogue") {
        dmg = Math.max(1, Math.floor(effAtk * 1.8) - currentEnemy.armor);
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

function playerGuard() {
    player.isGuarding = true;
    player.mp = Math.min(player.maxMp, player.mp + 8);
    SoundFX.guard();
    showFloatingText(`🛡️ BLOK (+8 MP)`, "#90cdf4");
    addLog("🛡️ Przyjmujesz postawę obronną (-60% obrażeń w tej turze) i regenerujesz +8 MP.", "log-info");
    finishPlayerTurn();
}

function applyVampAmulet() {
    if (player.amulet === "vamp" && currentEnemy.hp >= 0) {
        player.hp = Math.min(player.maxHp, player.hp + 6);
    }
}

function useBagItem(key) {
    if (player.bag[key] <= 0) return;
    player.bag[key]--;
    player.isGuarding = false;
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
        showFloatingText(`+7 ATAK`, "#f6e05e");
        addLog(`🪨 Ostrzysz broń osełką! Atak +7 przez 3 tury.`, "log-loot");
    }

    if (inCombat) {
        finishPlayerTurn();
    } else {
        saveGame(false);
        updateUI();
    }
}

function fleeCombat() {
    const fleeChance = (currentEnemy.isBoss || currentEnemy.unlocksZone) ? 0.3 : (player.classKey === "rogue" ? 0.85 : 0.65);
    if (Math.random() < fleeChance) {
        inCombat = false;
        currentEnemy = null;
        activeSubPanel = null;
        addLog("🏃 Udało Ci się bezpiecznie wycofać do obozu.", "log-info");
        updateUI();
    } else {
        player.isGuarding = false;
        addLog("Nie udało się uciec!", "log-damage");
        finishPlayerTurn();
    }
}

function finishPlayerTurn() {
    if (player.atkBuffTurns > 0) player.atkBuffTurns--;
    if (player.weakTurns > 0) player.weakTurns--;
    if (player.amulet === "mana") {
        player.mp = Math.min(player.maxMp, player.mp + 5);
    }

    if (currentEnemy.hp <= 0) {
        handleEnemyDefeated();
        return;
    }

    // Obrażenia w czasie (Ogień i Trucizna ignorują pancerz)
    if (currentEnemy.burnTurns > 0) {
        const burnDmg = Math.max(5, Math.floor(player.atk * 0.45));
        currentEnemy.hp = Math.max(0, currentEnemy.hp - burnDmg);
        currentEnemy.burnTurns--;
        addLog(`🔥 Ogień parzy ${currentEnemy.name} za ${burnDmg} obrażeń.`, "log-damage");
    }

    if (currentEnemy.poisonTurns > 0 && currentEnemy.hp > 0) {
        const poisonDmg = Math.max(5, Math.floor(player.atk * 0.4));
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
        currentEnemy.nextAction = decideNextEnemyAction(currentEnemy);
        addLog(`💫 ${currentEnemy.name} odzyskuje równowagę po ogłuszeniu i nie atakuje!`, "log-info");
        return;
    }

    const action = currentEnemy.nextAction;
    let rawDmg = Math.floor(currentEnemy.atk * (0.85 + Math.random() * 0.3));

    if (action === "heavy") {
        rawDmg = Math.floor(rawDmg * 1.75);
        addLog(`💥 ${currentEnemy.name} wyprowadza POTĘŻNY CIOS!`, "log-damage");
    } else if (action === "drain") {
        rawDmg = Math.floor(rawDmg * 0.8);
        const drainedMp = Math.min(player.mp, 12);
        player.mp -= drainedMp;
        player.weakTurns = 2;
        addLog(`🔮 ${currentEnemy.name} wysysa ${drainedMp} MP i osłabia Twój atak na 2 tury!`, "log-damage");
    }

    let dmg = Math.max(1, rawDmg - player.def);
    if (player.isGuarding) {
        dmg = Math.max(1, Math.floor(dmg * 0.4));
        addLog(`🛡️ Twój blok pochłania większość uderzenia! Otrzymujesz tylko ${dmg} obrażeń.`, "log-info");
    } else {
        addLog(`💢 ${currentEnemy.name} zadaje Ci ${dmg} obrażeń (pancerz zablokował ${player.def}).`, "log-damage");
    }

    if (player.amulet === "thorns" && dmg > 0) {
        const reflect = Math.max(2, Math.floor(dmg * 0.25));
        currentEnemy.hp = Math.max(0, currentEnemy.hp - reflect);
        addLog(`🌵 Amulet Cierni odbija ${reflect} obrażeń w napastnika!`, "log-loot");
    }

    player.hp = Math.max(0, player.hp - dmg);
    player.isGuarding = false;

    if (player.hp <= 0) {
        const killerName = currentEnemy.name;
        inCombat = false;
        currentEnemy = null;
        activeSubPanel = null;
        SoundFX.defeat();
        localStorage.removeItem("kroniki_cienia_v5_save");
        showDefeatScreen(killerName);
        return;
    }

    if (currentEnemy.hp <= 0) {
        handleEnemyDefeated();
        return;
    }

    currentEnemy.nextAction = decideNextEnemyAction(currentEnemy);
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

    let zoneUnlockMsg = "";
    if (defeatedEnemy.unlocksZone) {
        player.defeatedBosses[defeatedEnemy.id] = true;
        zoneUnlockMsg = defeatedEnemy.unlocksZone === "mines"
            ? "🗺️ Odblokowano nową lokację: Opuszczone Kopalnie!"
            : "🗺️ Odblokowano nową lokację: Przeklęte Ruiny!";
    }

    if (player.defeatedBosses["goblin_king"] && player.defeatedBosses["fallen_knight"]) {
        unlockAchievement("gate_breaker");
    }

    let lootBonus = "";
    if (!defeatedEnemy.isBoss && Math.random() < 0.32) {
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
        showVictoryScreen(defeatedEnemy, leveledUp, lootBonus, zoneUnlockMsg);
    }
}

function showVictoryScreen(enemy, leveledUp, lootBonus, zoneUnlockMsg) {
    document.getElementById("victory-summary").textContent = `Pokonałeś przeciwnika: ${enemy.name}!`;
    let rewardsHtml = `
        <p>✨ Zdobyte doświadczenie: <strong>+${enemy.xp} PD</strong></p>
        <p>💰 Zdobyte złoto: <strong>+${enemy.gold} sztuk</strong></p>
        <p>❤️ Pozostałe zdrowie: <strong>${player.hp} / ${player.maxHp} HP</strong></p>
    `;
    if (lootBonus) rewardsHtml += `<p style="color: #68d391;">${lootBonus}</p>`;
    if (zoneUnlockMsg) rewardsHtml += `<p style="color: #90cdf4; font-weight: bold;">${zoneUnlockMsg}</p>`;
    if (leveledUp) {
        rewardsHtml += `<p style="color: #f6e05e; margin-top: 8px;">🎉 AWANS! Poziom ${player.lvl} (+2 punkty rozwoju w zakładce Postać)!</p>`;
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
    localStorage.removeItem("kroniki_cienia_v5_save");
    document.getElementById("complete-stats").innerHTML = `
        <p>🏆 Bohater: <strong>${player.className} (Poziom ${player.lvl})</strong></p>
        <p>⚔️ Oręż: <strong>${getWeaponName()}</strong> | 🛡️ Zbroja: <strong>${getArmorName()}</strong></p>
        <p>💀 Pokonanych potworów: <strong>${player.kills}</strong></p>
        <p>💰 Skarbiec końcowy: <strong>${player.gold} złota</strong></p>
    `;
    switchScreen("complete");
}

function checkLevelUp() {
    let leveledUp = false;
    while (player.xp >= player.xpNext) {
        player.xp -= player.xpNext;
        player.lvl++;
        player.xpNext = Math.floor(player.xpNext * 1.38);
        player.statPoints += 2;
        leveledUp = true;

        if (player.classKey === "warrior") {
            player.maxHp += 24;
            player.maxMp += 5;
            player.atk += 2;
            player.def += 1;
        } else if (player.classKey === "mage") {
            player.maxHp += 14;
            player.maxMp += 15;
            player.atk += 3;
        } else {
            player.maxHp += 18;
            player.maxMp += 10;
            player.atk += 3;
            if (player.lvl % 2 === 0) player.def += 1;
        }

        player.hp = player.maxHp;
        player.mp = player.maxMp;
        SoundFX.levelUp();
        addLog(`🎉 AWANS na ${player.lvl}. poziom! Otrzymujesz +2 punkty rozwoju.`, "log-loot");
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
        addLog(`⚒️ Wykuto nowy oręż: ${getWeaponName()} (Atak +4)!`, "log-loot");
    } else {
        player.armorLvl++;
        player.def += 2;
        addLog(`🛡️ Założono nową zbroję: ${getArmorName()} (Obrona +2)!`, "log-loot");
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
    player.ownedAmulets.push(am.id);
    player.amulet = am.id;
    SoundFX.magic();
    addLog(`🔮 Kupiono i założono: ${am.name}!`, "log-loot");
    updateUI();
}

function saveGame(showMessage = true) {
    if (!player) return;
    localStorage.setItem("kroniki_cienia_v5_save", JSON.stringify(player));
    if (showMessage) {
        addLog("💾 Stan gry został zapisany.", "log-heal");
    }
}

// SKRÓTY KLAWISZOWE
document.addEventListener("keydown", (e) => {
    if (!screens.victory.classList.contains("hidden") && (e.code === "Space" || e.code === "Enter")) {
        e.preventDefault();
        document.getElementById("victory-continue-btn").click();
        return;
    }

    if (!screens.game.classList.contains("hidden") && inCombat && currentEnemy) {
        if (e.key === "1") playerAttack();
        if (e.key === "2") useClassSkill();
        if (e.key === "3") playerGuard();
        if (e.key === "4") toggleSubPanel("bag");
        if (e.key === "5") fleeCombat();
    }
});

// BESTIARIUSZ I OSIĄGNIĘCIA
const codexModal = document.getElementById("codex-modal");
const codexBody = document.getElementById("codex-body");

function openCodex(tab = "bestiary") {
    codexModal.classList.remove("hidden");
    codexBody.innerHTML = "";

    if (tab === "bestiary") {
        const allEnemies = [
            ...LOCATIONS[0].enemies,
            LOCATIONS[0].gateBoss,
            ...LOCATIONS[1].enemies,
            LOCATIONS[1].gateBoss,
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
                    <p>${seen ? `${en.desc} (HP: ${en.hp}, Atak: ${en.atk}, Pancerz: ${en.armor || 0})` : "Napotkaj tego przeciwnika, aby odblokować wpis."}</p>
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
    const saved = localStorage.getItem("kroniki_cienia_v5_save");
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
