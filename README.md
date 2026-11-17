# ⚔️ Kroniki Cienia — Prosta gra przeglądarkowa RPG

Tekstowa, turowa gra RPG napisana w czystym **HTML5**, **CSS3** oraz **JavaScript (ES6)** bez zewnętrznych bibliotek. Gotowa do uruchomienia lokalnie lub opublikowania przez **GitHub Pages**.

## 📁 Struktura projektu

```text
├── index.html   # Struktura interfejsu gry
├── style.css    # Ciemny motyw i układ responsywny
├── game.js      # Logika walki, rozwoju postaci i zapisu stanu (localStorage)
└── README.md    # Dokumentacja repozytorium
```

## 🚀 Jak uruchomić

1. **Lokalnie:** Otwórz plik `index.html` w dowolnej przeglądarce internetowej (lub użyj rozszerzenia *Live Server* w Visual Studio Code).
2. **Na GitHub Pages:**
   - Wgraj wszystkie pliki do głównego katalogu swojego repozytorium na GitHubie.
   - Wejdź w zakładkę **Settings** -> **Pages**.
   - W sekcji *Build and deployment* wybierz gałąź `main` oraz folder `/ (root)` i kliknij **Save**.
   - Po około minucie gra będzie dostępna pod adresem `https://twoja-nazwa.github.io/nazwa-repozytorium/`.

## 🎮 Funkcje gry

- System walki turowej (atak fizyczny, zaklęcie *Kula Ognia*, *Leczenie*, ucieczka).
- Rozwój postaci (zdobywanie PD, awans na kolejne poziomy, wzrost statystyk).
- Ekonomia i obóz (odpoczynek regenerujący HP/MP, ulepszanie broni u kowala).
- Automatyczny zapis i wczytywanie stanu gry w przeglądarce (`localStorage`).
