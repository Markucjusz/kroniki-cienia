const SVG_ASSETS = {
    titleCrest: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="16" fill="#181c26" stroke="#f6ad55" stroke-width="2.5"/>
        <line x1="28" y1="92" x2="92" y2="28" stroke="#cbd5e0" stroke-width="6" stroke-linecap="round"/>
        <line x1="92" y1="92" x2="28" y2="28" stroke="#cbd5e0" stroke-width="6" stroke-linecap="round"/>
        <path d="M40 34 L80 34 L80 66 C80 86 60 98 60 98 C60 98 40 86 40 66 Z" fill="#2d3748" stroke="#f6ad55" stroke-width="3"/>
        <path d="M60 44 C52 56 54 72 60 78 C66 72 68 56 60 44 Z" fill="#dd6b20"/>
        <path d="M60 54 C56 61 57 70 60 74 C63 70 64 61 60 54 Z" fill="#f6e05e"/>
    </svg>`,

    victoryTrophy: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="16" fill="#16241d" stroke="#68d391" stroke-width="2.5"/>
        <path d="M38 30 L82 30 L76 62 C74 74 46 74 44 62 Z" fill="#ecc94b" stroke="#fefcbf" stroke-width="2"/>
        <path d="M38 36 C24 36 24 54 40 54" fill="none" stroke="#ecc94b" stroke-width="4"/>
        <path d="M82 36 C96 36 96 54 80 54" fill="none" stroke="#ecc94b" stroke-width="4"/>
        <rect x="55" y="70" width="10" height="18" fill="#d69e2e"/>
        <rect x="42" y="88" width="36" height="8" rx="3" fill="#975a16"/>
        <polygon points="60,38 63,46 71,46 65,51 67,59 60,54 53,59 55,51 49,46 57,46" fill="#fff"/>
    </svg>`,

    defeatSkull: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="16" fill="#281619" stroke="#fc8181" stroke-width="2.5"/>
        <circle cx="60" cy="52" r="24" fill="#cbd5e0"/>
        <rect x="46" y="68" width="28" height="18" rx="4" fill="#a0aec0"/>
        <circle cx="51" cy="52" r="6" fill="#1a202c"/>
        <circle cx="69" cy="52" r="6" fill="#1a202c"/>
        <polygon points="60,58 56,65 64,65" fill="#1a202c"/>
        <line x1="52" y1="74" x2="52" y2="84" stroke="#1a202c" stroke-width="2.5"/>
        <line x1="60" y1="74" x2="60" y2="84" stroke="#1a202c" stroke-width="2.5"/>
        <line x1="68" y1="74" x2="68" y2="84" stroke="#1a202c" stroke-width="2.5"/>
    </svg>`,

    completeCrown: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="16" fill="#241e12" stroke="#f6e05e" stroke-width="3"/>
        <polygon points="24,82 24,42 44,60 60,32 76,60 96,42 96,82" fill="#f6e05e" stroke="#fefcbf" stroke-width="2.5"/>
        <rect x="24" y="82" width="72" height="10" rx="3" fill="#d69e2e"/>
        <circle cx="60" cy="64" r="5" fill="#e53e3e"/>
        <circle cx="40" cy="70" r="4" fill="#3182ce"/>
        <circle cx="80" cy="70" r="4" fill="#38a169"/>
    </svg>`,

    warrior: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#1e2430"/>
        <path d="M22 38 L42 38 L42 62 C42 74 32 82 32 82 C32 82 22 74 22 62 Z" fill="#718096" stroke="#cbd5e0" stroke-width="2.5"/>
        <path d="M32 42 L32 76 M25 54 L39 54" stroke="#dd6b20" stroke-width="3"/>
        <rect x="42" y="44" width="24" height="34" rx="5" fill="#4a5568"/>
        <circle cx="54" cy="28" r="13" fill="#a0aec0" stroke="#e2e8f0" stroke-width="2"/>
        <rect x="46" y="25" width="16" height="5" rx="2" fill="#1a202c"/>
        <path d="M54 10 L58 17 L50 17 Z" fill="#dd6b20"/>
        <rect x="73" y="18" width="5" height="44" rx="2" fill="#edf2f7"/>
        <rect x="67" y="60" width="17" height="4" rx="1" fill="#f6ad55"/>
        <rect x="73.5" y="64" width="4" height="11" fill="#744210"/>
    </svg>`,

    mage: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#1a202c"/>
        <path d="M32 84 L40 44 L60 44 L68 84 Z" fill="#2b6cb0" stroke="#63b3ed" stroke-width="2"/>
        <circle cx="50" cy="34" r="10" fill="#fbd38d"/>
        <circle cx="47" cy="33" r="1.5" fill="#1a202c"/>
        <circle cx="53" cy="33" r="1.5" fill="#1a202c"/>
        <path d="M30 28 L70 28 L50 6 Z" fill="#2c5282" stroke="#90cdf4" stroke-width="2"/>
        <line x1="76" y1="22" x2="76" y2="85" stroke="#975a16" stroke-width="4" stroke-linecap="round"/>
        <circle cx="76" cy="18" r="7" fill="#4fd1c5" stroke="#e6fffa" stroke-width="2"/>
        <circle cx="76" cy="18" r="11" fill="none" stroke="#4fd1c5" stroke-width="1" stroke-dasharray="3 3"/>
    </svg>`,

    rogue: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#19221e"/>
        <path d="M30 82 L38 42 L62 42 L70 82 Z" fill="#276749"/>
        <path d="M35 38 C35 18 65 18 65 38 L60 44 L40 44 Z" fill="#22543d" stroke="#68d391" stroke-width="2"/>
        <rect x="41" y="29" width="18" height="8" rx="3" fill="#1a202c"/>
        <circle cx="46" cy="33" r="1.8" fill="#68d391"/>
        <circle cx="54" cy="33" r="1.8" fill="#68d391"/>
        <path d="M24 44 L28 44 L26 68 Z" fill="#e2e8f0"/>
        <rect x="22" y="42" width="8" height="3" fill="#ecc94b"/>
        <path d="M72 44 L76 44 L74 68 Z" fill="#e2e8f0"/>
        <rect x="70" y="42" width="8" height="3" fill="#ecc94b"/>
    </svg>`,

    camp: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#131722"/>
        <circle cx="80" cy="20" r="7" fill="#f6e05e" opacity="0.8"/>
        <circle cx="22" cy="18" r="1.5" fill="#fff"/>
        <circle cx="45" cy="14" r="1.5" fill="#fff"/>
        <polygon points="14,76 36,42 58,76" fill="#4a5568" stroke="#718096" stroke-width="2"/>
        <polygon points="36,42 44,76 28,76" fill="#2d3748"/>
        <path d="M72 72 C64 62 72 48 74 42 C78 52 86 60 76 72 Z" fill="#ed8936"/>
        <path d="M73 72 C69 65 73 56 74 52 C76 58 80 64 75 72 Z" fill="#fefcbf"/>
        <line x1="63" y1="76" x2="85" y2="72" stroke="#744210" stroke-width="4" stroke-linecap="round"/>
        <line x1="65" y1="72" x2="83" y2="77" stroke="#975a16" stroke-width="4" stroke-linecap="round"/>
    </svg>`,

    goblin: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1c231b"/>
        <polygon points="28,44 10,36 28,54" fill="#48bb78"/>
        <polygon points="72,44 90,36 72,54" fill="#48bb78"/>
        <circle cx="50" cy="50" r="23" fill="#38a169" stroke="#22543d" stroke-width="2.5"/>
        <circle cx="42" cy="46" r="4" fill="#f6e05e"/>
        <circle cx="58" cy="46" r="4" fill="#f6e05e"/>
        <circle cx="42" cy="46" r="1.5" fill="#000"/>
        <circle cx="58" cy="46" r="1.5" fill="#000"/>
        <path d="M38 60 Q50 67 62 60" stroke="#1a202c" stroke-width="3" fill="none"/>
        <polygon points="42,61 45,56 47,62" fill="#fff"/>
        <polygon points="53,62 55,56 58,61" fill="#fff"/>
    </svg>`,

    goblinKing: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#19281c"/>
        <polygon points="26,46 8,36 26,56" fill="#48bb78"/>
        <polygon points="74,46 92,36 74,56" fill="#48bb78"/>
        <circle cx="50" cy="52" r="24" fill="#2f855a" stroke="#f6e05e" stroke-width="2.5"/>
        <polygon points="36,30 42,18 50,28 58,18 64,30" fill="#f6e05e"/>
        <circle cx="42" cy="48" r="4" fill="#fc8181"/>
        <circle cx="58" cy="48" r="4" fill="#fc8181"/>
        <path d="M36 64 Q50 70 64 64" stroke="#1a202c" stroke-width="3.5" fill="none"/>
        <polygon points="40,65 44,58 47,66" fill="#fff"/>
        <polygon points="53,66 56,58 60,65" fill="#fff"/>
    </svg>`,

    wolf: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1a1d24"/>
        <polygon points="28,40 32,16 44,34" fill="#718096"/>
        <polygon points="72,40 68,16 56,34" fill="#718096"/>
        <polygon points="26,42 50,28 74,42 66,74 50,82 34,74" fill="#4a5568" stroke="#a0aec0" stroke-width="2"/>
        <polygon points="40,56 60,56 50,80" fill="#cbd5e0"/>
        <circle cx="50" cy="64" r="4" fill="#1a202c"/>
        <polygon points="35,44 44,47 37,50" fill="#f56565"/>
        <polygon points="65,44 56,47 63,50" fill="#f56565"/>
    </svg>`,

    skeleton: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1c1c24"/>
        <circle cx="50" cy="42" r="22" fill="#e2e8f0"/>
        <rect x="38" y="56" width="24" height="18" rx="4" fill="#cbd5e0"/>
        <circle cx="42" cy="42" r="6" fill="#1a202c"/>
        <circle cx="58" cy="42" r="6" fill="#1a202c"/>
        <circle cx="42" cy="42" r="2" fill="#fc8181"/>
        <circle cx="58" cy="42" r="2" fill="#fc8181"/>
        <polygon points="50,48 47,54 53,54" fill="#1a202c"/>
        <line x1="43" y1="62" x2="43" y2="72" stroke="#1a202c" stroke-width="2.5"/>
        <line x1="50" y1="62" x2="50" y2="72" stroke="#1a202c" stroke-width="2.5"/>
        <line x1="57" y1="62" x2="57" y2="72" stroke="#1a202c" stroke-width="2.5"/>
    </svg>`,

    darkmage: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1e1528"/>
        <path d="M24 82 L36 26 L64 26 L76 82 Z" fill="#44337a" stroke="#9f7aea" stroke-width="2"/>
        <circle cx="50" cy="44" r="14" fill="#1a202c"/>
        <circle cx="45" cy="43" r="3" fill="#d69e2e"/>
        <circle cx="55" cy="43" r="3" fill="#d69e2e"/>
        <circle cx="50" cy="70" r="9" fill="#805ad5" stroke="#e9d8fd" stroke-width="2"/>
    </svg>`,

    fallenKnight: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1a1d2e"/>
        <rect x="30" y="24" width="40" height="54" rx="8" fill="#2d3748" stroke="#63b3ed" stroke-width="2.5"/>
        <rect x="36" y="38" width="28" height="7" rx="2" fill="#1a202c"/>
        <circle cx="44" cy="41.5" r="2.2" fill="#63b3ed"/>
        <circle cx="56" cy="41.5" r="2.2" fill="#63b3ed"/>
        <polygon points="32,24 24,12 38,20" fill="#63b3ed"/>
        <polygon points="68,24 76,12 62,20" fill="#63b3ed"/>
        <path d="M40 56 L60 56 L50 72 Z" fill="#3182ce"/>
    </svg>`,

    golem: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#1d1b18"/>
        <polygon points="24,32 50,18 76,32 82,74 18,74" fill="#718096" stroke="#a0aec0" stroke-width="3"/>
        <line x1="32" y1="30" x2="46" y2="52" stroke="#2d3748" stroke-width="2.5"/>
        <line x1="68" y1="34" x2="56" y2="60" stroke="#2d3748" stroke-width="2.5"/>
        <rect x="35" y="42" width="10" height="5" fill="#ed8936"/>
        <rect x="55" y="42" width="10" height="5" fill="#ed8936"/>
        <rect x="38" y="60" width="24" height="6" fill="#2d3748"/>
    </svg>`,

    shadowlord: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="10" fill="#140c1c"/>
        <path d="M32 34 C18 22 20 10 34 16 L40 28 Z" fill="#e53e3e"/>
        <path d="M68 34 C82 22 80 10 66 16 L60 28 Z" fill="#e53e3e"/>
        <polygon points="22,86 32,36 68,36 78,86" fill="#2d1b4e" stroke="#b794f4" stroke-width="2.5"/>
        <circle cx="50" cy="34" r="15" fill="#1a1025" stroke="#e53e3e" stroke-width="2"/>
        <polygon points="39,32 47,35 40,37" fill="#f6e05e"/>
        <polygon points="61,32 53,35 60,37" fill="#f6e05e"/>
        <polygon points="38,20 44,12 50,19 56,12 62,20" fill="#f6ad55"/>
    </svg>`
};
