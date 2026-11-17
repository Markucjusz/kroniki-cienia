const defaultPlayer = {
    lvl: 1,
    xp: 0,
    xpNext: 100,
    hp: 100,
    maxHp: 100,
    mp: 50,
    maxMp: 50,
    atk: 12,
    gold: 20,
    weaponLvl: 1
};

let player = { ...defaultPlayer };
let currentEnemy = null;
let inCombat = false;

const enemies = [
    { name: "Leśny Goblin", hp: 35, atk: 6, xp: 30, gold: 12 },
    { name: "Dziki Wilk", hp: 50, atk: 9, xp: 45, gold: 18 },
    { name: "Szkielet Wojownik", hp: 75, atk: 13, xp: 70, gold: 30 },
    { name: "Mroczny Mag", hp: 110, atk: 18, xp: 120, gold: 55 },
    { name: "Kamienny Golem", hp: 180, atk: 24, xp: 220, gold: 100 }
];

const logEl = document.getElementById("log");
const controlsEl = document.getElementById("controls");
const enemyPanelEl = document.getElementById("enemy-panel");

function addLog(text, type = "log-info") {
    const p = document.createElement("p");
    p.className = type;
    p.textContent = `> ${text}`;
    logEl.prepend(p);
}

function updateUI() {
    document.getElementById("lvl").textContent = player.lvl;
    document.getElementById("xp").textContent = player.xp;
    document.getElementById("xp-next").textContent = player.xpNext;
    document.getElementById("hp").textContent = player.hp;
    document.getElementById("max-hp").textContent = player.maxHp;
    document.getElementById("mp").textContent = player.mp;
    document.getElementById("max-mp").textContent = player.maxMp;
    document.getElementById("atk").textContent = player.atk;
    document.getElementById("gold").textContent = player.gold;

    if (inCombat && currentEnemy) {
        enemyPanelEl.classList.remove("hidden");
        document.getElementById("enemy-name").textContent = currentEnemy.name;
        document.getElementById("enemy-hp").textContent = currentEnemy.hp;
        document.getElementById("enemy-max-hp").textContent = currentEnemy.maxHp;
    } else {
        enemyPanelEl.classList.add("hidden");
    }

    renderControls();
}

function renderControls() {
    controlsEl.innerHTML = "";

    if (!inCombat) {
        document.getElementById("location-title").textContent = "Obóz Podróżników";
        document.getElementById("location-desc").textContent = "Bezpieczne miejsce przy ognisku. Wybierz kierunek wyprawy lub przygotuj się do walki.";

        const exploreBtn = createBtn("🌲 Wyrusz na szlak (Walka)", "btn-primary", startCombat);
        const restBtn = createBtn("🔥 Odpocznij przy ognisku (10 złota)", "btn-heal", restAtCamp);
        const upgradeCost = player.weaponLvl * 25;
        const upgradeBtn = createBtn(`⚒️ Ulepsz broń (+4 Ataku | ${upgradeCost} złota)`, "btn-action", () => upgradeWeapon(upgradeCost));

        controlsEl.append(exploreBtn, restBtn, upgradeBtn);
    } else {
        document.getElementById("location-title").textContent = "Starcie na szlaku!";
        document.getElementById("location-desc").textContent = `Na Twojej drodze stanął ${currentEnemy.name}.`;

        const attackBtn = createBtn("⚔️ Zwykły atak", "btn-primary", playerAttack);
        const fireballBtn = createBtn("🔥 Kula Ognia (15 MP)", "btn-action", castFireball);
        const healSpellBtn = createBtn("✨ Leczenie (12 MP)", "btn-heal", castHeal);
        const fleeBtn = createBtn("🏃 Uciekaj", "btn-secondary", fleeCombat);

        controlsEl.append(attackBtn, fireballBtn, healSpellBtn, fleeBtn);
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
    const maxIndex = Math.min(enemies.length - 1, Math.floor(player.lvl / 1.5));
    const template = enemies[Math.floor(Math.random() * (maxIndex + 1))];
    currentEnemy = { ...template, maxHp: template.hp };
    inCombat = true;
    addLog(`Napotkałeś przeciwnika: ${currentEnemy.name} (HP: ${currentEnemy.hp})!`, "log-damage");
    updateUI();
}

function playerAttack() {
    const dmg = Math.floor(player.atk * (0.85 + Math.random() * 0.3));
    currentEnemy.hp = Math.max(0, currentEnemy.hp - dmg);
    addLog(`Zadajesz ${dmg} obrażeń przeciwnikowi ${currentEnemy.name}.`, "log-info");
    checkCombatState();
}

function castFireball() {
    if (player.mp < 15) {
        addLog("Za mało Many (MP) na Kulę Ognia!", "log-damage");
        return;
    }
    player.mp -= 15;
    const dmg = Math.floor(player.atk * 1.9);
    currentEnemy.hp = Math.max(0, currentEnemy.hp - dmg);
    addLog(`Rzucasz Kulę Ognia i zadajesz potężne ${dmg} obrażeń!`, "log-loot");
    checkCombatState();
}

function castHeal() {
    if (player.mp < 12) {
        addLog("Za mało Many (MP) na zaklęcie Leczenia!", "log-damage");
        return;
    }
    player.mp -= 12;
    const healAmount = Math.floor(player.maxHp * 0.35);
    player.hp = Math.min(player.maxHp, player.hp + healAmount);
    addLog(`Leczysz się o ${healAmount} HP.`, "log-heal");
    enemyTurn();
    updateUI();
}

function fleeCombat() {
    if (Math.random() < 0.65) {
        inCombat = false;
        currentEnemy = null;
        addLog("Udało Ci się bezpiecznie uciec do obozu.", "log-info");
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
    const dmg = Math.max(1, Math.floor(currentEnemy.atk * (0.8 + Math.random() * 0.4)));
    player.hp = Math.max(0, player.hp - dmg);
    addLog(`${currentEnemy.name} atakuje i zadaje Ci ${dmg} obrażeń!`, "log-damage");

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
        player.maxHp += 20;
        player.maxMp += 10;
        player.atk += 3;
        player.hp = player.maxHp;
        player.mp = player.maxMp;
        addLog(`AWANS! Osiągnąłeś ${player.lvl}. poziom doświadczenia! Statystyki wzrosły.`, "log-loot");
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

function saveGame() {
    localStorage.setItem("kroniki_cienia_save", JSON.stringify(player));
    addLog("Stan gry został zapisany w pamięci przeglądarki.", "log-heal");
}

function loadGame() {
    const saved = localStorage.getItem("kroniki_cienia_save");
    if (saved) {
        player = JSON.parse(saved);
        addLog("Wczytano zapisany stan gry.", "log-info");
    } else {
        addLog("Witaj w Kronikach Cienia! Wyrusz na szlak, aby zdobyć doświadczenie.", "log-info");
    }
}

document.getElementById("save-btn").onclick = saveGame;
document.getElementById("reset-btn").onclick = () => {
    if (confirm("Czy na pewno chcesz zresetować postęp i zacząć od nowa?")) {
        localStorage.removeItem("kroniki_cienia_save");
        player = { ...defaultPlayer };
        inCombat = false;
        currentEnemy = null;
        logEl.innerHTML = "";
        addLog("Rozpoczęto nową grę.", "log-info");
        updateUI();
    }
};

loadGame();
updateUI();
