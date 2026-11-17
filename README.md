# ⚔️ Kroniki Cienia v3.0 — Turowa gra RPG

Przeglądarkowa gra RPG napisana w czystym **HTML5**, **CSS3** oraz **JavaScript (ES6)** z grafiką wektorową **SVG**, wyborem klasy oraz pełnym cyklem fabularnym (wstęp, walka, zwycięstwo, porażka i finał gry).

## 📁 Struktura projektu

```text
├── index.html      # Wszystkie 6 ekranów gry (tytułowy, wybór klasy, gra, wygrana, przegrana, finał)
├── style.css       # Stylizacja interfejsu, paski postępu i animacje
├── svg-assets.js   # Grafiki wektorowe (herb gry, trofea, czaszka, korona, klasy i potwory)
├── game.js         # Silnik gry, przełączanie widoków, walka i finałowy boss
└── README.md       # Dokumentacja repozytorium
```

## ✨ Nowości w wersji 3.0

- **Ekran tytułowy (Wstęp):** Wprowadzenie fabularne z herbem gry oraz przyciskami rozpoczęcia nowej gry lub kontynuacji zapisu.
- **Ekran zwycięstwa po walce:** Podsumowanie zdobytego doświadczenia (PD), złota i ewentualnego awansu na nowy poziom.
- **Ekran porażki:** Ekran końca gry po utracie wszystkich punktów życia z podsumowaniem statystyk poległego bohatera.
- **Finałowy Boss i ekran ukończenia gry:** Po osiągnięciu **4. poziomu** w obozie pojawia się opcja szturmu na Cytadelę i walki z **Władcą Cienia**. Jego pokonanie kończy całą grę ekranem chwały.
