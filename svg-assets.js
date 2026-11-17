const SVG_ASSETS = {
    warrior: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#1e2430"/>
        <!-- Tarcza -->
        <path d="M22 38 L42 38 L42 62 C42 74 32 82 32 82 C32 82 22 74 22 62 Z" fill="#718096" stroke="#cbd5e0" stroke-width="2.5"/>
        <path d="M32 42 L32 76 M25 54 L39 54" stroke="#dd6b20" stroke-width="3"/>
        <!-- Korpus i hełm -->
        <rect x="42" y="44" width="24" height="34" rx="5" fill="#4a5568"/>
        <circle cx="54" cy="28" r="13" fill="#a0aec0" stroke="#e2e8f0" stroke-width="2"/>
        <rect x="46" y="25" width="16" height="5" rx="2" fill="#1a202c"/>
        <path d="M54 10 L58 17 L50 17 Z" fill="#dd6b20"/>
        <!-- Miecz -->
        <rect x="73" y="18" width="5" height="44" rx="2" fill="#edf2f7"/>
        <rect x="67" y="60" width="17" height="4" rx="1" fill="#f6ad55"/>
        <rect x="73.5" y="64" width="4" height="11" fill="#744210"/>
    </svg>`,

    mage: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#1a202c"/>
        <!-- Szata -->
        <path d="M32 84 L40 44 L60 44 L68 84 Z" fill="#2b6cb0" stroke="#63b3ed" stroke-width="2"/>
        <!-- Głowa i kapelusz -->
        <circle cx="50" cy="34" r="10" fill="#fbd38d"/>
        <circle cx="47" cy="33" r="1.5" fill="#1a202c"/>
        <circle cx="53" cy="33" r="1.5" fill="#1a202c"/>
        <path d="M30 28 L70 28 L50 6 Z" fill="#2c5282" stroke="#90cdf4" stroke-width="2"/>
        <!-- Kostur z kryształem -->
        <line x1="76" y1="22" x2="76" y2="85" stroke="#975a16" stroke-width="4" stroke-linecap="round"/>
        <circle cx="76" cy="18" r="7" fill="#4fd1c5" stroke="#e6fffa" stroke-width="2"/>
        <circle cx="76" cy="18" r="11" fill="none" stroke="#4fd1c5" stroke-width="1" stroke-dasharray="3 3"/>
    </svg>`,

    rogue: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#19221e"/>
        <!-- Peleryna i kaptur -->
        <path d="M30 82 L38 42 L62 42 L70 82 Z" fill="#276749"/>
        <path d="M35 38 C35 18 65 18 65 38 L60 44 L40 44 Z" fill="#22543d" stroke="#68d391" stroke-width="2"/>
        <rect x="41" y="29" width="18" height="8" rx="3" fill="#1a202c"/>
        <circle cx="46" cy="33" r="1.8" fill="#68d391"/>
        <circle cx="54" cy="33" r="1.8" fill="#68d391"/>
        <!-- Dwa sztylety -->
        <path d="M24 44 L28 44 L26 68 Z" fill="#e2e8f0"/>
        <rect x="22" y="42" width="8" height="3" fill="#ecc94b"/>
        <path d="M72 44 L76 44 L74 68 Z" fill="#e2e8f0"/>
        <rect x="70" y="42" width="8" height="3" fill="#ecc94b"/>
    </svg>`,

    camp: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#131722"/>
        <!-- Gwiazdy i księżyc -->
        <circle cx="80" cy="20" r="7" fill="#f6e05e" opacity="0.8"/>
        <circle cx="22" cy="18" r="1.5" fill="#fff"/>
        <circle cx="45" cy="14" r="1.5" fill="#fff"/>
        <!-- Namiot -->
        <polygon points="14,76 36,42 58,76" fill="#4a5568" stroke="#718096" stroke-width="2"/>
        <polygon points="36,42 44,76 28,76" fill="#2d3748"/>
        <!-- Ognisko -->
        <path d="M72 72 C64 62 72 48 74 42 C78 52 86 60 76 72 Z" fill="#ed8936"/>
        <path d="M73 72 C69 65 73 56 74 52 C76 58 80 64 75 72 Z" fill="#fefcbf"/>
        <line x1="63" y1="76" x2="85" y2="72" stroke="#744210" stroke-width="4" stroke-linecap="round"/>
        <line x1="65" y1="72" x2="83" y2="77" stroke="#975a16" stroke-width="4" stroke-linecap="round"/>
    </svg>`,

    goblin: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1c231b"/>
        <!-- Uszy -->
        <polygon points="28,44 10,36 28,54" fill="#48bb78"/>
        <polygon points="72,44 90,36 72,54" fill="#48bb78"/>
        <!-- Głowa -->
        <circle cx="50" cy="50" r="23" fill="#38a169" stroke="#22543d" stroke-width="2.5"/>
        <!-- Oczy i zęby -->
        <circle cx="42" cy="46" r="4" fill="#f6e05e"/>
        <circle cx="58" cy="46" r="4" fill="#f6e05e"/>
        <circle cx="42" cy="46" r="1.5" fill="#000"/>
        <circle cx="58" cy="46" r="1.5" fill="#000"/>
        <path d="M38 60 Q50 67 62 60" stroke="#1a202c" stroke-width="3" fill="none"/>
        <polygon points="42,61 45,56 47,62" fill="#fff"/>
        <polygon points="53,62 55,56 58,61" fill="#fff"/>
    </svg>`,

    wolf: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1a1d24"/>
        <!-- Uszy wilka -->
        <polygon points="28,40 32,16 44,34" fill="#718096"/>
        <polygon points="72,40 68,16 56,34" fill="#718096"/>
        <!-- Pysk -->
        <polygon points="26,42 50,28 74,42 66,74 50,82 34,74" fill="#4a5568" stroke="#a0aec0" stroke-width="2"/>
        <polygon points="40,56 60,56 50,80" fill="#cbd5e0"/>
        <circle cx="50" cy="64" r="4" fill="#1a202c"/>
        <!-- Oczy -->
        <polygon points="35,44 44,47 37,50" fill="#f56565"/>
        <polygon points="65,44 56,47 63,50" fill="#f56565"/>
    </svg>`,

    skeleton: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1c1c24"/>
        <!-- Czaszka -->
        <circle cx="50" cy="42" r="22" fill="#e2e8f0"/>
        <rect x="38" y="56" width="24" height="18" rx="4" fill="#cbd5e0"/>
        <!-- Oczodoły -->
        <circle cx="42" cy="42" r="6" fill="#1a202c"/>
        <circle cx="58" cy="42" r="6" fill="#1a202c"/>
        <circle cx="42" cy="42" r="2" fill="#fc8181"/>
        <circle cx="58" cy="42" r="2" fill="#fc8181"/>
        <!-- Nos i zęby -->
        <polygon points="50,48 47,54 53,54" fill="#1a202c"/>
        <line x1="43" y1="62" x2="43" y2="72" stroke="#1a202c" stroke-width="2.5"/>
        <line x1="50" y1="62" x2="50" y2="72" stroke="#1a202c" stroke-width="2.5"/>
        <line x1="57" y1="62" x2="57" y2="72" stroke="#1a202c" stroke-width="2.5"/>
    </svg>`,

    darkmage: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1e1528"/>
        <!-- Kaptur -->
        <path d="M24 82 L36 26 L64 26 L76 82 Z" fill="#44337a" stroke="#9f7aea" stroke-width="2"/>
        <circle cx="50" cy="44" r="14" fill="#1a202c"/>
        <!-- Świecące oczy -->
        <circle cx="45" cy="43" r="3" fill="#d69e2e"/>
        <circle cx="55" cy="43" r="3" fill="#d69e2e"/>
        <!-- Kula mroku -->
        <circle cx="50" cy="70" r="9" fill="#805ad5" stroke="#e9d8fd" stroke-width="2"/>
    </svg>`,

    golem: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1d1b18"/>
        <!-- Kamienne bloki -->
        <polygon points="24,32 50,18 76,32 82,74 18,74" fill="#718096" stroke="#a0aec0" stroke-width="3"/>
        <line x1="32" y1="30" x2="46" y2="52" stroke="#2d3748" stroke-width="2.5"/>
        <line x1="68" y1="34" x2="56" y2="60" stroke="#2d3748" stroke-width="2.5"/>
        <!-- Oczy runiczne -->
        <rect x="35" y="42" width="10" height="5" fill="#ed8936"/>
        <rect x="55" y="42" width="10" height="5" fill="#ed8936"/>
        <rect x="38" y="60" width="24" height="6" fill="#2d3748"/>
    </svg>`
};
