const CLASS_CONFIG = {
    warrior: {
        name: "Wojownik",
        hp: 130,
        mp: 30,
        atk: 14,
        def: 4,
        skillName: "⚔️ Potężne Uderzenie (10 MP)",
        skillCost: 10,
        skillDesc: "Zadaje 175% obrażeń i przebija pancerz."
    },
    mage: {
        name: "Mag",
        hp: 85,
        mp: 80,
        atk: 10,
        def: 1,
        skillName: "🔥 Kula Ognia (16 MP)",
        skillCost: 16,
        skillDesc: "Potężne zaklęcie ognia zadające 240% bazowego ataku."
    },
    rogue: {
        name: "Łowca Cieni",
        hp: 105,
        mp: 50,
        atk: 13,
        def: 2,
        skillName: "🗡️ Zatrute Ostrze (12 MP)",
        skillCost: 12,
        skillDesc: "Gwarantowany cios krytyczny (200% obrażeń)."
    }
};

let player = null;
let currentEnemy = null;
let inCombat = false;

const enemies = [
    { name: "Leśny Goblin", sprite: "goblin", hp: 38, atk: 7, xp: 30, gold: 12 },
    { name: "Dziki Wilk", sprite: "wolf", hp: 55, atk: 10, xp: 45, gold: 18 },
    { name: "Szkielet Wojownik", sprite: "skeleton", hp: 80, atk: 14, xp: 75, gold: 32 },
    { name: "Mroczny Mag", sprite: "darkmage", hp: 115, atk: 19, xp: 125, gold: 55 },
    { name: "Kamienny Golem", sprite: "golem", hp: 190, atk: 26, xp: 240, gold: 110 }
];

const classSelectionEl = document.getElementById("class-selection");
const gameScreenEl = document.getElementById("game-screen");
const logEl = document.getElementById("log");
const controlsEl = document.getElementById("controls");
const enemyPanelEl = document.getElementById("enemy-panel");
const sceneBoxEl = document.getElementById("scene-box");

// Wstawienie podglądu SVG na ekranie wyboru klasy
function initClassPreviews() {
    document.getElementById("svg-preview-warrior").innerHTML = SVG_ASSETS.warrior;
    document.getElementById("svg-preview-mage").innerHTML = SVG_ASSETS.mage;
    document.getElementById("svg-preview-rogue").innerHTML = SVG_ASSETS.rogue;

    document.querySelectorAll(".select-class-btn").forEach(btn => {
        btn.onclick = () => startNewCharacter(btn.dataset.class);
    });
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
        gold: 25,
        weaponLvl: 1
    };
    inCombat = false;
    currentEnemy = null;
    logEl.innerHTML = "";
    saveGame(false);
    showGameScreen();
    addLog(`Rozpoczynasz przygodę jako ${player.className}!`, "log-loot");
    updateUI();
}

function showGameScreen() {
    classSelectionEl.classList.add("hidden");
    gameScreenEl.classList.remove("hidden");
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

function updateUI() {
    if (!player) return;

    document.getElementById("lvl").textContent = player.lvl;
    document.getElementById("xp").textContent = player.xp;
    document.getElementById("xp-next").textContent = player.xpNext;
    document.getElementById("hp").textContent = player.hp;
    document.getElementById("max-hp").textContent = player.maxHp;
    document.getElementById("mp").textContent = player.mp;
    document.getElementById("max-mp").textContent = player.maxMp;
    document.getElementById("atk").textContent = player.atk;
    document.getElementById("def").textContent = player.def;
    document.getElementById("gold").textContent = player.gold;

    // Paski postępu
    document.getElementById("hp-bar").style.width = `${(player.hp / player.maxHp) * 100}%`;
    document.getElementById("mp-bar").style.width = `${(player.mp / player.maxMp) * 100}%`;
    document.getElementById("xp-bar").style.width = `${Math.min(100, (player.xp / player.xpNext) * 100)}%`;

    if (inCombat && currentEnemy) {
        enemyPanelEl.classList.remove("hidden");
        document.getElementById("enemy-name").textContent = currentEnemy.name;
        document.getElementById("enemy-hp").textContent = currentEnemy.hp;
        document.getElementById("enemy-max-hp").textContent = currentEnemy.maxHp;
        document.getElementById("enemy-hp-bar").style.width = `${(currentEnemy.hp / currentEnemy.maxHp) * 100}%`;
        document.getElementById("scene-svg").innerHTML = SVG_ASSETS[currentEnemy.sprite];
    } else {
        enemyPanelEl.classList.add("hidden");
        document.getElementById("scene-svg").innerHTML = SVG_ASSETS.camp;
    }

    renderControls();
}

function renderControls() {
    controlsEl.innerHTML = "";

    if (!inCombat) {
        document.getElementById("location-title").textContent = "Obóz Podróżników";
        document.getElementById("location-desc").textContent = "Ognisko płonie spokojnie. Możesz odpocząć, ulepszyć ekwipunek lub ruszyć na szlak.";

        const exploreBtn = createBtn("🌲 Wyrusz na szlak (Walka)", "btn-primary", startCombat);
        const restBtn = createBtn("🔥 Odpocznij przy ognisku (10 złota)", "btn-heal", restAtCamp);
        const upgradeCost = player.weaponLvl * 25;
        const upgradeBtn = createBtn(`⚒️ Ulepsz broń (+4 Ataku | ${upgradeCost} złota)`, "btn-action", () => upgradeWeapon(upgradeCost));

        controlsEl.append(exploreBtn, restBtn, upgradeBtn);
    } else {
        document.getElementById("location-title").textContent = `Walka: ${currentEnemy.name}`;
        document.getElementById("location-desc").textContent = "Wybierz akcję w swojej turze!";

        const cfg = CLASS_CONFIG[player.classKey];
        const attackBtn = createBtn("⚔️ Zwykły atak", "btn-primary", playerAttack);
        const skillBtn = createBtn(cfg.skillName, "btn-action", useClassSkill);
        const healSpellBtn = createBtn("✨ Opatrunek / Leczenie (12 MP)", "btn-heal", castHeal);
        const fleeBtn = createBtn("🏃 Uciekaj", "btn-secondary", fleeCombat);

        controlsEl.append(attackBtn, skillBtn, healSpellBtn, fleeBtn);
    }
}

function createBtn(label, className, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = className;
    btn.onclick = onClick;
    return btn;
}

function startCombat() {
    const maxIndex = Math.min(enemies.length - 1, Math.floor(player.lvl / 1.4));
    const template = enemies[Math.floor(Math.random() * (maxIndex + 1))];
    currentEnemy = { ...template, maxHp: template.hp };
    inCombat = true;
    addLog(`Napotkałeś przeciwnika: ${currentEnemy.name} (HP: ${currentEnemy.hp})!`, "log-damage");
    updateUI();
}

function playerAttack() {
    let dmg = Math.floor(player.atk * (0.85 + Math.random() * 0.3));
    // Łowca ma 25% szansy na cios krytyczny przy zwykłym ataku
    if (player.classKey === "rogue" && Math.random() < 0.25) {
        dmg = Math.floor(dmg * 1.6);
        addLog(`Cios krytyczny! Zadajesz ${dmg} obrażeń przeciwnikowi ${currentEnemy.name}!`, "log-loot");
    } else {
        addLog(`Zadajesz ${dmg} obrażeń przeciwnikowi ${currentEnemy.name}.`, "log-info");
    }
    currentEnemy.hp = Math.max(0, currentEnemy.hp - dmg);
    triggerShake();
    checkCombatState();
}

function useClassSkill() {
    const cfg = CLASS_CONFIG[player.classKey];
    if (player.mp < cfg.skillCost) {
        addLog(`Za mało Many (MP)! Wymagane: ${cfg.skillCost} MP.`, "log-damage");
        return;
    }
    player.mp -= cfg.skillCost;

    let dmg = 0;
    if (player.classKey === "warrior") {
        dmg = Math.floor(player.atk * 1.75);
        addLog(`Używasz Potężnego Uderzenia i zadajesz ${dmg} obrażeń!`, "log-loot");
    } else if (player.classKey === "mage") {
        dmg = Math.floor(player.atk * 2.4);
        addLog(`Rzucasz Kulę Ognia i spopielasz wroga za ${dmg} obrażeń!`, "log-loot");
    } else if (player.classKey === "rogue") {
        dmg = Math.floor(player.atk * 2.0);
        addLog(`Uderzasz Zatrutym Ostrzem w czuły punkt za ${dmg} obrażeń!`, "log-loot");
    }

    currentEnemy.hp = Math.max(0, currentEnemy.hp - dmg);
    triggerShake();
    checkCombatState();
}

function castHeal() {
    if (player.mp < 12) {
        addLog("Za mało Many (MP) na leczenie!", "log-damage");
        return;
    }
    player.mp -= 12;
    const healAmount = Math.floor(player.maxHp * 0.35);
    player.hp = Math.min(player.maxHp, player.hp + healAmount);
    addLog(`Odzyskujesz ${healAmount} HP.`, "log-heal");
    enemyTurn();
    updateUI();
}

function fleeCombat() {
    const fleeChance = player.classKey === "rogue" ? 0.85 : 0.65;
    if (Math.random() < fleeChance) {
        inCombat = false;
        currentEnemy = null;
        addLog("Udało Ci się bezpiecznie wycofać do obozu.", "log-info");
        updateUI();
    } else {
        addLog("Nie udało się uciec!", "log-damage");
        enemyTurn();
        updateUI();
    }
}

function checkCombatState() {
    if (currentEnemy.hp <= 0) {
        addLog(`Pokonałeś ${currentEnemy.name}! Zdobywasz ${currentEnemy.xp} PD i ${currentEnemy.gold} złota.`, "log-loot");
        player.xp += currentEnemy.xp;
        player.gold += currentEnemy.gold;
        inCombat = false;
        currentEnemy = null;
        checkLevelUp();
        updateUI();
        return;
    }
    enemyTurn();
    updateUI();
}

function enemyTurn() {
    if (!currentEnemy) return;
    const rawDmg = Math.floor(currentEnemy.atk * (0.85 + Math.random() * 0.3));
    const dmg = Math.max(1, rawDmg - player.def);
    player.hp = Math.max(0, player.hp - dmg);
    addLog(`${currentEnemy.name} atakuje i zadaje Ci ${dmg} obrażeń (zredukowano o ${player.def} pancerzem).`, "log-damage");

    if (player.hp <= 0) {
        addLog("Poległeś w walce! Budzisz się w obozie, tracąc połowę złota.", "log-damage");
        player.gold = Math.floor(player.gold / 2);
        player.hp = player.maxHp;
        player.mp = player.maxMp;
        inCombat = false;
        currentEnemy = null;
    }
}

function checkLevelUp() {
    while (player.xp >= player.xpNext) {
        player.xp -= player.xpNext;
        player.lvl++;
        player.xpNext = Math.floor(player.xpNext * 1.4);

        // Skalowanie statystyk zależne od klasy
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
        addLog(`AWANS! Osiągnąłeś ${player.lvl}. poziom doświadczenia!`, "log-loot");
    }
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
    addLog("Odpocząłeś przy ognisku. HP i MP w pełni odnowione.", "log-heal");
    updateUI();
}

function upgradeWeapon(cost) {
    if (player.gold < cost) {
        addLog(`Brakuje Ci złota na ulepszenie broni (koszt: ${cost}).`, "log-damage");
        return;
    }
    player.gold -= cost;
    player.weaponLvl++;
    player.atk += 4;
    addLog(`Kowal ulepszył Twoją broń do poziomu ${player.weaponLvl}! Atak +4.`, "log-loot");
    updateUI();
}

function saveGame(showMessage = true) {
    if (!player) return;
    localStorage.setItem("kroniki_cienia_v2_save", JSON.stringify(player));
    if (showMessage) {
        addLog("Stan gry został zapisany w pamięci przeglądarki.", "log-heal");
    }
}

function loadGame() {
    initClassPreviews();
    const saved = localStorage.getItem("kroniki_cienia_v2_save");
    if (saved) {
        player = JSON.parse(saved);
        showGameScreen();
        addLog(`Wczytano zapisaną postać (${player.className}, Poz. ${player.lvl}).`, "log-info");
        updateUI();
    }
}

document.getElementById("save-btn").onclick = () => saveGame(true);
document.getElementById("reset-btn").onclick = () => {
    if (confirm("Czy na pewno chcesz usunąć obecną postać i wrócić do wyboru klasy?")) {
        localStorage.removeItem("kroniki_cienia_v2_save");
        player = null;
        inCombat = false;
        currentEnemy = null;
        gameScreenEl.classList.add("hidden");
        classSelectionEl.classList.remove("hidden");
    }
};

loadGame();
