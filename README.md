# ⚔️ Kroniki Cienia — Turowa Gra Przeglądarkowa RPG

Rozbudowana gra RPG napisana w czystym **HTML5**, **CSS3** oraz **JavaScript (ES6)** z grafiką wektorową **SVG** i syntezatorem dźwięku **Web Audio API**.

## 📁 Struktura projektu

```text
├── index.html      # Interfejs użytkownika (6 ekranów gry, panele, Księga)
├── style.css       # Stylizacja, motywy lokacji, animacje i układ responsywny
├── svg-assets.js   # Grafiki wektorowe klas, potworów, strażników i bossa
├── sound.js        # Generator efektów dźwiękowych w czystym JS
├── game.js         # Silnik gry: walka taktyczna, zdarzenia, rozwój i ekwipunek
└── README.md       # Dokumentacja repozytorium
```

## ✨ Główne mechaniki

- **Taktyczna walka turowa:** Akcja **Blok / Skupienie** (redukuje obrażenia o 60% i odnawia +8 MP), zapowiadane ataki specjalne przeciwników (potężne ciosy, wysysanie many, osłabienie), pancerz wrogów oraz magia przebijająca zbroję.
- **Progresja krain i Strażnicy Przejść:** Odblokowywanie *Opuszczonych Kopalń* po pokonaniu *Króla Goblinów* oraz *Przeklętych Ruin* po pokonaniu *Upadłego Rycerza*, aż do finału na 6. poziomie.
- **Rozwój postaci i nazwany rynsztunek:** Ręczne rozdawanie punktów atrybutów po awansie, ewolucja nazw broni i pancerza w kuźni oraz wymiana posiadanych amuletów.
- **Interaktywne zdarzenia na szlaku i skróty klawiszowe (`1–5`, `Spacja`).**
