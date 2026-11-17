# ⚔️ Kroniki Cienia v4.0 — Pełna Gra Przeglądarkowa RPG

Kompletna, turowa gra RPG w czystym **HTML5**, **CSS3** oraz **JavaScript (ES6)** bez zewnętrznych bibliotek i plików multimedialnych.

## 📁 Struktura projektu

```text
├── index.html      # Pełny interfejs: 6 ekranów gry + Księga Bestiariusza i Osiągnięć
├── style.css       # Ciemny motyw, animacje obrażeń, odznaki statusów i responsywny układ
├── svg-assets.js   # Grafiki wektorowe SVG (klasy, potwory, boss, trofea, herb)
├── sound.js        # Syntezator efektów dźwiękowych (Web Audio API) bez plików MP3
├── game.js         # Silnik RPG: lokacje, sklep, kuźnia, ekwipunek, statusy i zadania
└── README.md       # Dokumentacja repozytorium
```

## ✨ Wszystko co zawiera wersja 4.0

1. **Mapa 3 lokacji + zdarzenia na szlaku:** *Mroczny Las*, *Opuszczone Kopalnie*, *Przeklęte Ruiny* (z losowymi kapliczkami i skarbami) oraz finałowa *Cytadela Władcy Cienia*.
2. **Kupiec, Kuźnia i Plecak:** Ulepszanie broni i pancerza, zakup magicznych amuletów (regeneracja MP lub kradzież życia), mikstur zdrowia, eliksirów many oraz osełek bojowych używanych również w trakcie walki.
3. **Statusy bojowe klas:** Wojownik ogłusza tarczą, Mag podpala na 3 tury, a Łowca Cieni zatruwa wroga.
4. **System zleceń (Questów):** Łańcuch zadań w obozie z odbiorem nagród.
5. **Księga Bestiariusza i Osiągnięć:** Trwały zapis odkrytych potworów i 5 odznak w przeglądarce.
6. **Syntezator dźwięków i pływające liczby obrażeń:** Dźwięki ciosów, zaklęć, monet i awansu generowane w locie (z przyciskiem wyciszenia `🔊/🔇`).
