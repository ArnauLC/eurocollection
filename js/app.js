// CLAVE SECRETA DE ADMINISTRADOR (Cambia este token si lo deseas)
const ADMIN_TOKEN = "3";

// Comprobación de Privilegios de Administrador mediante la URL
const urlParams = new URLSearchParams(window.location.search);
const isAdmin = urlParams.get('token') === ADMIN_TOKEN;

const currentYearConstant = new Date().getFullYear();
let globalMaxYear = 2026;

const initialCountries = [
    { id: 'DE', iso3: 'DEU', name: 'Alemania', start: 1999 },
    { id: 'AD', iso3: 'AND', name: 'Andorra', start: 2014, coords: [1.5218, 42.5063] },
    { id: 'AT', iso3: 'AUT', name: 'Austria', start: 1999 },
    { id: 'BE', iso3: 'BEL', name: 'Bélgica', start: 1999 },
    { id: 'BG', iso3: 'BGR', name: 'Bulgaria', start: 2026 },
    { id: 'CY', iso3: 'CYP', name: 'Chipre', start: 2008, coords: [33.4299, 35.1264] },
    { id: 'HR', iso3: 'HRV', name: 'Croacia', start: 2023 },
    { id: 'SK', iso3: 'SVK', name: 'Eslovaquia', start: 2009 },
    { id: 'SI', iso3: 'SVN', name: 'Eslovenia', start: 2007 },
    { id: 'ES', iso3: 'ESP', name: 'España', start: 1999 },
    { id: 'EE', iso3: 'EST', name: 'Estonia', start: 2011 },
    { id: 'FI', iso3: 'FIN', name: 'Finlandia', start: 1999 },
    { id: 'FR', iso3: 'FRA', name: 'Francia', start: 1999 },
    { id: 'GR', iso3: 'GRC', name: 'Grecia', start: 2001 },
    { id: 'IE', iso3: 'IRL', name: 'Irlanda', start: 1999 },
    { id: 'IT', iso3: 'ITA', name: 'Italia', start: 1999 },
    { id: 'LV', iso3: 'LVA', name: 'Letonia', start: 2014 },
    { id: 'LT', iso3: 'LTU', name: 'Lituania', start: 2015 },
    { id: 'LU', iso3: 'LUX', name: 'Luxemburgo', start: 1999 },
    { id: 'MT', iso3: 'MLT', name: 'Malta', start: 2008, coords: [14.3754, 35.9375] },
    { id: 'MC', iso3: 'MCO', name: 'Mónaco', start: 1999, coords: [7.4246, 43.7384] },
    { id: 'NL', iso3: 'NLD', name: 'Países Bajos', start: 1999 },
    { id: 'PT', iso3: 'PRT', name: 'Portugal', start: 1999 },
    { id: 'SM', iso3: 'SMR', name: 'San Marino', start: 1999, coords: [12.4578, 43.9424] },
    { id: 'VA', iso3: 'VAT', name: 'El Vaticano', start: 1999, coords: [12.4534, 41.9029] }
];

const denominations = [
    { id: '1c', label: '1 cent.', val: 0.01, sizeClass: 'coin-1c', css: 'coin-copper' },
    { id: '2c', label: '2 cent.', val: 0.02, sizeClass: 'coin-2c', css: 'coin-copper' },
    { id: '5c', label: '5 cent.', val: 0.05, sizeClass: 'coin-5c', css: 'coin-copper' },
    { id: '10c', label: '10 cent.', val: 0.10, sizeClass: 'coin-10c', css: 'coin-nordic' },
    { id: '20c', label: '20 cent.', val: 0.20, sizeClass: 'coin-20c', css: 'coin-nordic' },
    { id: '50c', label: '50 cent.', val: 0.50, sizeClass: 'coin-50c', css: 'coin-nordic' },
    { id: '1e', label: '1 Euro', val: 1.00, sizeClass: 'coin-1e', css: 'coin-bimetal-1' },
    { id: '2e', label: '2 Euros', val: 2.00, sizeClass: 'coin-2e', css: 'coin-bimetal-2' }
];

const worldCurrencies = {
    'MNE': 'Euro (Uso unilateral)','XKX': 'Euro (Uso unilateral)',
    'USA': 'Dólar estadounidense (USD)', 'SLV': 'Dólar estadounidense (USD)', 'ECU': 'Dólar estadounidense (USD)', 'TLS': 'Dólar estadounidense (USD)', 'MHL': 'Dólar estadounidense (USD)', 'FSM': 'Dólar estadounidense (USD)', 'PLW': 'Dólar estadounidense (USD)', 'CAN': 'Dólar canadiense (CAD)', 'AUS': 'Dólar australiano (AUD)', 'KIR': 'Dólar australiano (AUD)', 'NRU': 'Dólar australiano (AUD)', 'BHS': 'Dólar bahameño (BSD)', 'BRB': 'Dólar barbadense (BBD)', 'BLZ': 'Dólar beliceño (BZD)', 'JAM': 'Dólar jamaicano (JMD)', 'TTO': 'Dólar trinitense (TTD)', 'ATG': 'Dólar caribeño oriental (XCD)', 'DMA': 'Dólar caribeño oriental (XCD)', 'GRD': 'Dólar caribeño oriental (XCD)', 'KNA': 'Dólar caribeño oriental (XCD)', 'LCA': 'Dólar caribeño oriental (XCD)', 'VCT': 'Dólar caribeño oriental (XCD)', 'GUY': 'Dólar guyanés (GYD)', 'SUR': 'Dólar surinamés (SRD)', 'BRN': 'Dólar bruneano (BND)', 'SGP': 'Dólar singapurense (SGD)', 'TWN': 'Nuevo dólar taiwanés (TWD)', 'LBR': 'Dólar liberiano (LRD)', 'NAM': 'Dólar namibio (NAD)', 'ZWE': 'Dólar zimbabuense (ZWL)', 'FJI': 'Dólar fiyiano (FJD)', 'NZL': 'Dólar neozelandés (NZD)', 'SLB': 'Dólar salomonense (SBD)', 'TUV': 'Dólar tuvaluano (TVD)',
    'MEX': 'Peso mexicano (MXN)', 'ARG': 'Peso argentino (ARS)', 'COL': 'Peso colombiano (COP)', 'CHL': 'Peso chileno (CLP)', 'CUB': 'Peso cubano (CUP)', 'DOM': 'Peso dominicano (DOP)', 'URY': 'Peso uruguayo (UYU)', 'PHL': 'Peso filipino (PHP)',
    'CHE': 'Franco suizo (CHF)', 'LIE': 'Franco suizo (CHF)', 'BEN': 'Franco CFA de África Occidental (XOF)', 'BFA': 'Franco CFA de África Occidental (XOF)', 'GNB': 'Franco CFA de África Occidental (XOF)', 'CIV': 'Franco CFA de África Occidental (XOF)', 'MLI': 'Franco CFA de África Occidental (XOF)', 'NER': 'Franco CFA de África Occidental (XOF)', 'SEN': 'Franco CFA de África Occidental (XOF)', 'TGO': 'Franco CFA de África Occidental (XOF)', 'CMR': 'Franco CFA de África Central (XAF)', 'CAF': 'Franco CFA de África Central (XAF)', 'TCD': 'Franco CFA de África Central (XAF)', 'COG': 'Franco CFA de África Central (XAF)', 'GNQ': 'Franco CFA de África Central (XAF)', 'GAB': 'Franco CFA de África Central (XAF)', 'BDI': 'Franco burundés (BIF)', 'COM': 'Franco comorense (KMF)', 'COD': 'Franco congoleño (CDF)', 'DJI': 'Franco yibutiano (DJF)', 'GIN': 'Franco guineano (GNF)', 'RWA': 'Franco ruandés (RWF)',
    'SWE': 'Corona sueca (SEK)', 'NOR': 'Corona noruega (NOK)', 'CZE': 'Corona checa (CZK)', 'DNK': 'Corona danesa (DKK)', 'ISL': 'Corona islandesa (ISK)',
    'IND': 'Rupia india (INR)', 'IDN': 'Rupia indonesia (IDR)', 'MDV': 'Rupia maldiva (MVR)', 'NPL': 'Rupia nepalí (NPR)', 'PAK': 'Rupia pakistaní (PKR)', 'LKA': 'Rupia esrilanquesa (LKR)', 'MUS': 'Rupia mauriciana (MUR)', 'SYC': 'Rupia seychellense (SCR)',
    'GBR': 'Libra esterlina (GBP)', 'EGY': 'Libra egipcia (EGP)', 'LBN': 'Libra libanesa (LBP)', 'SYR': 'Libra siria (SYP)', 'SDN': 'Libra sudanesa (SDG)', 'SSD': 'Libra sursudanesa (SSP)',
    'SRB': 'Dinar serbio (RSD)', 'BHR': 'Dinar bareiní (BHD)', 'IRQ': 'Dinar iraquí (IQD)', 'JOR': 'Dinar jordano (JOD)', 'KWT': 'Dinar kuwaití (KWD)', 'LBY': 'Dinar libio (LYD)', 'DZA': 'Dinar argelino (DZD)', 'TUN': 'Dinar tunecino (TND)',
    'IRN': 'Rial iraní (IRR)', 'OMN': 'Rial omaní (OMR)', 'QAT': 'Riyal catarí (QAR)', 'SAU': 'Riyal saudí (SAR)', 'YEM': 'Rial yemení (YER)',
    'KEN': 'Chelín keniano (KES)', 'SOM': 'Chelín somalí (SOS)', 'TZA': 'Chelín tanzano (TZS)', 'UGA': 'Chelín ugandés (UGX)',
    'RUS': 'Rublo ruso (RUB)', 'BLR': 'Rublo bielorruso (BYN)',
    'ROU': 'Leu rumano (RON)', 'MDA': 'Leu moldavo (MDL)',
    'MWI': 'Kwacha malauí (MWK)', 'ZMB': 'Kwacha zambiano (ZMW)',
    'KOR': 'Won surcoreano (KRW)', 'PRK': 'Won norcoreano (KPW)',
    'ARE': 'Dírham emiratí (AED)', 'MAR': 'Dírham marroquí (MAD)',
    'AZE': 'Manat azerbaiyano (AZN)', 'TKM': 'Manat turcomano (TMT)',
    'KGZ': 'Som kirguís (KGS)', 'UZB': 'Som uzbeko (UZS)', 'TJK': 'Somoni tayiko (TJS)',
    'BRA': 'Real (BRL)', 'PER': 'Sol (PEN)', 'VEN': 'Bolívar (VES)', 'CHN': 'Yuan (CNY)', 'JPN': 'Yen (JPY)', 'ZAF': 'Rand (ZAR)', 'POL': 'Złoty (PLN)', 'HUN': 'Forinto (HUF)', 'BIH': 'Marco (BAM)', 'ALB': 'Lek (ALL)', 'MKD': 'Denar (MKD)', 'UKR': 'Grivna (UAH)', 'CRI': 'Colón (CRC)', 'GTM': 'Quetzal (GTQ)', 'HTI': 'Gourde (HTG)', 'HND': 'Lempira (HNL)', 'NIC': 'Córdoba (NIO)', 'PAN': 'Balboa (PAB)', 'BOL': 'Boliviano (BOB)', 'PRY': 'Guaraní (PYG)', 'BGR': 'Lev (BGN)', 'ARM': 'Dram (AMD)', 'GEO': 'Lari (GEL)', 'TUR': 'Lira (TRY)', 'AFG': 'Afgani (AFN)', 'BGD': 'Taka (BDT)', 'BTN': 'Ngultrum (BTN)', 'KHM': 'Riel (KHR)', 'ISR': 'Nuevo séquel (ILS)', 'KAZ': 'Tenge (KZT)', 'LAO': 'Kip (LAK)', 'MYS': 'Ringgit (MYR)', 'MNG': 'Tugrik (MNT)', 'MMR': 'Kyat (MMK)', 'THA': 'Baht (THB)', 'VNM': 'Dong (VND)', 'AGO': 'Kwanza (AOA)', 'BWA': 'Pula (BWP)', 'CPV': 'Escudo (CVE)', 'ERN': 'Nakfa (ERN)', 'SWZ': 'Lilangeni (SZL)', 'ETH': 'Birr (ETB)', 'GMB': 'Dalasi (GMD)', 'GHA': 'Cedi (GHS)', 'LSO': 'Loti (LSL)', 'MDG': 'Ariary (MGA)', 'MRT': 'Uguiya (MRU)', 'MOZ': 'Metical (MZN)', 'NGA': 'Naira (NGN)', 'STP': 'Dobra (STN)', 'SLE': 'Leone (SLE)', 'PNG': 'Kina (PGK)', 'WSM': 'Tala (WST)', 'TON': 'Paʻanga (TOP)', 'VUT': 'Vatu (VUV)'
};

const worldCountriesES = {
    'USA': 'Estados Unidos', 'CAN': 'Canadá', 'MEX': 'México', 'BRA': 'Brasil', 'ARG': 'Argentina',
    'COL': 'Colombia', 'CHL': 'Chile', 'PER': 'Perú', 'VEN': 'Venezuela', 'CUB': 'Cuba',
    'CHN': 'China', 'JPN': 'Japón', 'IND': 'India', 'AUS': 'Australia', 'ZAF': 'Sudáfrica',
    'RUS': 'Rusia', 'KOR': 'Corea del Sur', 'GBR': 'Reino Unido', 'CHE': 'Suiza',
    'SWE': 'Suecia', 'NOR': 'Noruega', 'POL': 'Polonia', 'CZE': 'República Checa',
    'HUN': 'Hungría', 'ROU': 'Rumanía', 'DNK': 'Dinamarca', 'ISL': 'Islandia',
    'SRB': 'Serbia', 'BIH': 'Bosnia y Herzegovina', 'ALB': 'Albania', 'MKD': 'Macedonia del Norte', 
    'MNE': 'Montenegro', 'XKX': 'Kosovo', 'UKR': 'Ucrania', 'BLR': 'Bielorrusia', 'MDA': 'Moldavia',
    'BHS': 'Bahamas', 'BRB': 'Barbados', 'BLZ': 'Belice', 'CRI': 'Costa Rica', 'DOM': 'República Dominicana',
    'SLV': 'El Salvador', 'GTM': 'Guatemala', 'HTI': 'Haití', 'HND': 'Honduras', 'JAM': 'Jamaica',
    'NIC': 'Nicaragua', 'PAN': 'Panamá', 'TTO': 'Trinidad y Tobago', 'ATG': 'Antigua y Barbuda',
    'DMA': 'Dominica', 'GRD': 'Granada', 'KNA': 'San Cristóbal y Nieves', 'LCA': 'Santa Lucía',
    'VCT': 'San Vicente y las Granadinas', 'BOL': 'Bolivia', 'ECU': 'Ecuador', 'GUY': 'Guyana',
    'PRY': 'Paraguay', 'SUR': 'Surinam', 'URY': 'Uruguay', 'BGR': 'Bulgaria', 'LIE': 'Liechtenstein',
    'ARM': 'Armenia', 'AZE': 'Azerbaiyán', 'GEO': 'Georgia', 'TUR': 'Turquía', 'AFG': 'Afganistán',
    'BHR': 'Baréin', 'BGD': 'Bangladés', 'BTN': 'Bután', 'BRN': 'Brunéi', 'KHM': 'Camboya',
    'PRK': 'Corea del Norte', 'IDN': 'Indonesia', 'IRN': 'Irán', 'IRQ': 'Irak', 'ISR': 'Israel',
    'JOR': 'Jordania', 'KAZ': 'Kazajistán', 'KWT': 'Kuwait', 'KGZ': 'Kirguistán', 'LAO': 'Laos',
    'LBN': 'Líbano', 'MYS': 'Malasia', 'MDV': 'Maldivas', 'MNG': 'Mongolia', 'MMR': 'Birmania',
    'NPL': 'Nepal', 'OMN': 'Omán', 'PAK': 'Pakistán', 'PHL': 'Filipinas', 'QAT': 'Catar',
    'SAU': 'Arabia Saudí', 'SGP': 'Singapur', 'LKA': 'Sri Lanka', 'SYR': 'Siria', 'TWN': 'Taiwán',
    'TJK': 'Tayikistán', 'THA': 'Tailandia', 'TKM': 'Turkmenistán', 'ARE': 'Emiratos Árabes Unidos',
    'UZB': 'Uzbekistán', 'VNM': 'Vietnam', 'YEM': 'Yemen', 'TLS': 'Timor Oriental', 'DZA': 'Argelia',
    'AGO': 'Angola', 'BEN': 'Benín', 'BWA': 'Botsuana', 'BFA': 'Burkina Faso', 'BDI': 'Burundi',
    'CPV': 'Cabo Verde', 'CMR': 'Camerún', 'CAF': 'República Centroafricana', 'TCD': 'Chad',
    'COM': 'Comoras', 'COG': 'República del Congo', 'COD': 'República Democrática del Congo',
    'DJI': 'Yibuti', 'EGY': 'Egipto', 'GNQ': 'Guinea Ecuatorial', 'ERI': 'Eritrea', 'SWZ': 'Esuatini',
    'ETH': 'Etiopía', 'GAB': 'Gabón', 'GMB': 'Gambia', 'GHA': 'Ghana', 'GIN': 'Guinea',
    'GNB': 'Guinea-Bisáu', 'CIV': 'Costa de Marfil', 'KEN': 'Kenia', 'LSO': 'Lesoto', 'LBR': 'Liberia',
    'LBY': 'Libia', 'MDG': 'Madagascar', 'MWI': 'Malaui', 'MLI': 'Malí', 'MRT': 'Mauritania',
    'MUS': 'Mauricio', 'MAR': 'Marruecos', 'MOZ': 'Mozambique', 'NAM': 'Namibia', 'NER': 'Níger',
    'NGA': 'Nigeria', 'RWA': 'Ruanda', 'STP': 'Santo Tomé y Príncipe', 'SEN': 'Senegal',
    'SYC': 'Seychelles', 'SLE': 'Sierra Leona', 'SOM': 'Somalia', 'SDN': 'Sudán', 'SSD': 'Sudán del Sur',
    'TZA': 'Tanzania', 'TGO': 'Togo', 'TUN': 'Túnez', 'UGA': 'Uganda', 'ZMB': 'Zambia',
    'ZWE': 'Zimbabue', 'FJI': 'Fiyi', 'KIR': 'Kiribati', 'MHL': 'Islas Marshall', 'FSM': 'Micronesia',
    'NRU': 'Nauru', 'NZL': 'Nueva Zelanda', 'PLW': 'Palaos', 'PNG': 'Papúa Nueva Guinea', 'WSM': 'Samoa',
    'SLB': 'Islas Salomón', 'TON': 'Tonga', 'TUV': 'Tuvalu', 'VUT': 'Vanuatu'
};

let state = { 
    view: 'home', country: null, year: 'ALL', searchQuery: '', 
    sortYear: 'asc', sortVal: 'asc', 
    filters: { owned: true, missing: true, standard: true, commem: true }
};

let countries = [];
let collection = [];
let catalog = [];
let standardImages = {};
let standardInfo = {};
let globalCommonInfo = {};
let globalCommonImages = {};
let currentGlobalVariants = [];
let currentStandardVariants = [];
window.modalPreviewIndex = 0;

// --- NUEVA FUNCIÓN PARA GESTIONAR IMÁGENES LOCALES EN GITHUB ---
function procesarRutaImagen(input) {
    if (!input) return '';
    input = input.trim();
    // Si ya es un enlace web, una imagen base64, o ya tiene la ruta local 'assets/', se queda igual
    if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('data:') || input.startsWith('assets/')) {
        return input;
    }
    // Si introduces solo el nombre (ej: esp_2cc_2005.jpg), le añade la ruta de tu repositorio
    return 'assets/img/' + input;
}
// ---------------------------------------------------------------

// Cargar Datos Iniciales (Local Storage si es Admin, o JSON si es Público)

// Cargar Datos Iniciales (Local Storage si es Admin, o JSON si es Público)
async function loadAppData() {
    if (isAdmin) {
        // En Modo Admin cargamos desde el LocalStorage
        globalMaxYear = parseInt(localStorage.getItem('euroColl_MaxYear')) || Math.max(2026, currentYearConstant);
        countries = JSON.parse(localStorage.getItem('euroColl_Countries')) || initialCountries;
        collection = JSON.parse(localStorage.getItem('euroColl_Collection')) || [];
        catalog = JSON.parse(localStorage.getItem('euroColl_Catalog')) || [];
        standardImages = JSON.parse(localStorage.getItem('euroColl_StdImg')) || {};
        standardInfo = JSON.parse(localStorage.getItem('euroColl_StdInfo')) || {};
        globalCommonInfo = JSON.parse(localStorage.getItem('euroColl_GlobalInfo')) || {};
        globalCommonImages = JSON.parse(localStorage.getItem('euroColl_GlobalImg')) || {};
        document.getElementById('sidebar-config-wrapper').classList.remove('hidden');
    } else {
        // En Modo Público leemos directamente el archivo estático data/mi_coleccion.json
        try {
            const res = await fetch('./data/mi_coleccion.json');
            if (res.ok) {
                const data = await res.json();
                countries = data.countries || initialCountries;
                collection = data.collection || [];
                catalog = data.catalog || [];
                standardImages = data.standardImages || {};
                standardInfo = data.standardInfo || {};
                globalCommonInfo = data.globalCommonInfo || {};
                globalCommonImages = data.globalCommonImages || {};
                globalMaxYear = data.maxYear || 2026;
            } else {
                countries = initialCountries;
            }
        } catch (e) {
            console.warn("No se pudo cargar data/mi_coleccion.json, usando valores por defecto.", e);
            countries = initialCountries;
        }
    }
    sortCountriesArray();
    updateFilterButtonsUI();
    window.showHomeView();
}

function saveData() {
    if (!isAdmin) return; // En modo público no se permite guardar modificaciones
    localStorage.setItem('euroColl_MaxYear', globalMaxYear);
    localStorage.setItem('euroColl_Countries', JSON.stringify(countries));
    localStorage.setItem('euroColl_Collection', JSON.stringify(collection));
    localStorage.setItem('euroColl_Catalog', JSON.stringify(catalog));
    localStorage.setItem('euroColl_StdImg', JSON.stringify(standardImages));
    localStorage.setItem('euroColl_GlobalInfo', JSON.stringify(globalCommonInfo));
    localStorage.setItem('euroColl_GlobalImg', JSON.stringify(globalCommonImages));
}

window.exportCollectionJSON = function() {
    const dataToExport = {
        maxYear: globalMaxYear,
        countries: countries,
        collection: collection,
        catalog: catalog,
        standardImages: standardImages,
        standardInfo: standardInfo,
        globalCommonInfo: globalCommonInfo,
        globalCommonImages: globalCommonImages
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi_coleccion.json';
    a.click();
    URL.revokeObjectURL(url);
};

function sortCountriesArray() {
    countries.sort((a, b) => {
        if (a.id === 'VA') return 1;
        if (b.id === 'VA') return -1;
        return a.name.localeCompare(b.name, 'es');
    });
}

function getAllYearsList(countryStart) {
    let years = [];
    for (let y = countryStart; y <= globalMaxYear; y++) years.push(y);
    return years;
}

function getYearStats(countryId, year) {
    const standardMax = 8;
    const standardOwned = collection.filter(c => c.country === countryId && c.year === year && c.type === 'Standard').length;
    let commemMax = 0, commemOwned = 0;
    if (year >= 2004) {
        const commemsInCatalog = catalog.filter(c => c.country === countryId && c.year === year);
        commemMax = commemsInCatalog.length;
        commemOwned = collection.filter(c => c.country === countryId && c.year === year && c.type === 'Commemorative').length;
    }
    const totalMax = standardMax + commemMax;
    const totalOwned = standardOwned + commemOwned;
    return { 
        standardMax, standardOwned, commemMax, commemOwned, totalMax, totalOwned, 
        isComplete: (totalMax > 0 && totalMax === totalOwned), 
        stdPct: Math.round((standardOwned/standardMax)*100), 
        commemPct: commemMax > 0 ? Math.round((commemOwned/commemMax)*100) : null 
    };
}

function getCountryStats(countryId) {
    const countryObj = countries.find(c => c.id === countryId);
    if (!countryObj) return { totalMax: 0, totalOwned: 0, isComplete: false, isSeries: false, percentage: 0 };
    
    let totalMax = 0, totalOwned = 0;
    for (let y = countryObj.start; y <= globalMaxYear; y++) {
        const ys = getYearStats(countryId, y);
        totalMax += ys.totalMax; totalOwned += ys.totalOwned;
    }

    const standardCoinsOwned = collection.filter(c => c.country === countryId && c.type === 'Standard');
    const ownedDenominations = new Set(standardCoinsOwned.map(c => c.denomination));
    const isSeries = ownedDenominations.size === 8;
    const isComplete = (totalMax > 0 && totalMax === totalOwned);
    
    // FASE 1: Hasta tener los 8 tipos, cuenta el progreso de la serie (0-100%).
    // FASE 2: Al completarla, cuenta el progreso de todas las monedas y años del país.
    let displayPercentage = 0;
    if (isComplete) {
        displayPercentage = 100;
    } else if (isSeries) {
        displayPercentage = totalMax === 0 ? 0 : Math.round((totalOwned / totalMax) * 100);
    } else {
        displayPercentage = Math.round((ownedDenominations.size / 8) * 100);
    }
    
    return { totalMax, totalOwned, isComplete, isSeries, percentage: displayPercentage };
}

function getCountryMapStatus(countryId) {
    const stats = getCountryStats(countryId);
    if (stats.isComplete) return 'yellow';
    if (stats.isSeries) return 'blue';
    return collection.some(c => c.country === countryId) ? 'white' : 'gray';
}

function getConditionStars(cond) {
    let html = '';
    if (cond === 'RC') html = '★<span class="text-slate-600/50">★★★★</span>';
    else if (cond === 'BC') html = '★★<span class="text-slate-600/50">★★★</span>';
    else if (cond === 'MBC') html = '★★★<span class="text-slate-600/50">★★</span>';
    else if (cond === 'EBC') html = '★★★★<span class="text-slate-600/50">★</span>';
    else if (cond === 'SC') html = '★★★★★';
    else if (cond === 'FDC') html = '<span class="text-yellow-400 drop-shadow-md">★★★★★</span>';
    else return 'Falta';
    return `<span class="text-slate-300 flex items-center justify-center gap-1">${html} <span class="text-[9px] font-bold text-slate-400 ml-1">${cond}</span></span>`;
}

function renderSidebar() {
    const container = document.getElementById('sidebar-countries');
    container.innerHTML = '';
    countries.forEach(c => {
        const cStats = getCountryStats(c.id);
        const isSelected = state.view === 'country' && c.id === state.country;
        const status = getCountryMapStatus(c.id);
        
        let starColor = 'text-transparent hidden';
        if (status === 'yellow') starColor = isSelected ? 'text-slate-900' : 'text-yellow-400';
        else if (status === 'blue') starColor = isSelected ? 'text-slate-900' : 'text-blue-400';

        const btn = document.createElement('button');
        btn.className = `w-full text-left px-2.5 py-2 rounded-lg border flex flex-row items-center justify-between gap-2 mb-0.5 transition-colors ${isSelected ? 'bg-yellow-500 text-slate-950 font-bold border-yellow-400 shadow' : 'border-transparent hover:bg-slate-800 text-slate-300'}`;
        btn.onclick = () => window.selectCountry(c.id);
        btn.innerHTML = `
            <div class="flex items-center gap-2 truncate">
                <img src="https://flagcdn.com/w40/${c.id.toLowerCase()}.png" class="w-5 h-3.5 object-cover rounded-sm border ${isSelected ? 'border-yellow-600' : 'border-slate-700'} shrink-0">
                <span class="text-xs truncate">${c.name}</span>
            </div>
            <div class="flex items-center justify-end gap-1.5 shrink-0 text-[11px] font-semibold">
                <span>${cStats.percentage}%</span>
                <span class="${starColor} text-[11px]">${(status === 'yellow' || status === 'blue') ? '★' : ''}</span>
            </div>
        `;
        container.appendChild(btn);
    });
}

function renderYearSelector(startYear) {
    const container = document.getElementById('year-selector');
    if (!container) return;
    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = `px-4 py-1.5 rounded-full text-sm font-semibold shrink-0 border transition-all flex items-center justify-center ${state.year === 'ALL' ? 'bg-yellow-500 text-slate-900 border-yellow-400 shadow' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`;
    allBtn.textContent = 'Todos';
    allBtn.onclick = () => { state.year = 'ALL'; renderYearSelector(startYear); renderMainContent(); };
    container.appendChild(allBtn);

    getAllYearsList(startYear).forEach(y => {
        if (!state.filters.commem && state.filters.standard && y < 2004) return;
        const yStats = getYearStats(state.country, y);
        const isActive = y === state.year;
        
        const btn = document.createElement('button');
        btn.className = `px-4 py-1.5 rounded-full text-sm font-semibold shrink-0 border transition-all flex items-center justify-center gap-1 ${isActive ? 'bg-yellow-500 text-slate-900 border-yellow-400 shadow' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`;
        
        let starHtml = yStats.isComplete ? `<span class="${isActive ? 'text-slate-900' : 'text-yellow-400'} text-[11px]">★</span>` : '';
        btn.innerHTML = `<span>${y}</span>${starHtml}`;
        btn.onclick = () => { state.year = y; renderYearSelector(startYear); renderMainContent(); };
        container.appendChild(btn);
    });
}

function updateHeaderStats() {
    if (state.view === 'home' || state.searchQuery) {
        let totalOwnedGlobal = collection.length;
        let totalPossibleGlobal = countries.reduce((acc, c) => acc + getCountryStats(c.id).totalMax, 0);
        document.getElementById('stat-progress-text').textContent = `${totalOwnedGlobal}/${totalPossibleGlobal}`;
        document.getElementById('header-country-name').textContent = 'Total Global';
    } else if (state.view === 'country') {
        const cStats = getCountryStats(state.country);
        document.getElementById('stat-progress-text').textContent = `${cStats.totalOwned}/${cStats.totalMax}`;
        document.getElementById('header-country-name').textContent = `Total ${countries.find(c => c.id === state.country).name}`;
    }
}

function updateFilterButtonsUI() {
    const mapping = {
        'owned': { state: state.filters.owned, on: 'bg-blue-600 text-white font-bold', off: 'bg-slate-900 text-slate-400 font-semibold border border-slate-800 hover:bg-slate-800' },
        'missing': { state: state.filters.missing, on: 'bg-blue-600 text-white font-bold', off: 'bg-slate-900 text-slate-400 font-semibold border border-slate-800 hover:bg-slate-800' },
        'standard': { state: state.filters.standard, on: 'bg-blue-600 text-white font-bold', off: 'bg-slate-900 text-slate-400 font-semibold border border-slate-800 hover:bg-slate-800' },
        'commem': { state: state.filters.commem, on: 'bg-blue-600 text-white font-bold', off: 'bg-slate-900 text-slate-400 font-semibold border border-slate-800 hover:bg-slate-800' }
    };
    
    for (const [key, config] of Object.entries(mapping)) {
        const btn = document.getElementById(`btn-filter-${key}`);
        if (btn) btn.className = `px-3 py-1.5 rounded-lg transition-colors text-xs ${config.state ? config.on : config.off}`;
    }
}

window.showHomeView = function() {
    state.view = 'home'; state.country = null; state.year = 'ALL';
    document.getElementById('global-search').value = ''; state.searchQuery = '';
    document.getElementById('header-flag').src = 'https://flagcdn.com/w80/eu.png';
    document.getElementById('header-title').textContent = 'EuroColección';
    document.getElementById('header-subtitle').textContent = 'Mapa y Estado Global';
    document.getElementById('country-subheader').classList.add('hidden');
    document.getElementById('top-controls').classList.remove('hidden');
    updateHeaderStats(); renderSidebar(); updateFilterButtonsUI(); renderMainContent();
};

window.selectCountry = function(countryId) {
    const countryObj = countries.find(c => c.id === countryId);
    if (!countryObj) return;
    state.view = 'country'; state.country = countryId; state.year = 'ALL';
    document.getElementById('global-search').value = ''; state.searchQuery = '';
    
    document.getElementById('header-flag').src = `https://flagcdn.com/w80/${countryId.toLowerCase()}.png`;
    document.getElementById('header-title').textContent = countryObj.name;
    document.getElementById('header-subtitle').textContent = `Adopción del Euro: ${countryObj.start}`;
    
    document.getElementById('country-subheader').classList.remove('hidden');
    document.getElementById('top-controls').classList.remove('hidden');
    
    updateHeaderStats(); renderSidebar(); updateFilterButtonsUI(); renderYearSelector(countryObj.start); renderMainContent();
};

window.toggleFilter = function(filterKey) {
    if (filterKey === 'owned' || filterKey === 'missing') {
        const otherKey = filterKey === 'owned' ? 'missing' : 'owned';
        state.filters[filterKey] = !state.filters[filterKey];
        if (!state.filters.owned && !state.filters.missing) state.filters[otherKey] = true;
    } else if (filterKey === 'standard' || filterKey === 'commem') {
        const otherKey = filterKey === 'standard' ? 'commem' : 'standard';
        state.filters[filterKey] = !state.filters[filterKey];
        if (!state.filters.standard && !state.filters.commem) state.filters[otherKey] = true;
    }
    
    updateFilterButtonsUI();
    if (state.view === 'country') {
        const countryObj = countries.find(c => c.id === state.country);
        if (countryObj) renderYearSelector(countryObj.start);
    }
    renderMainContent();
};

window.toggleSort = function(type) {
    if (type === 'year') {
        state.sortYear = state.sortYear === 'asc' ? 'desc' : 'asc';
        document.getElementById('sort-year-icon').textContent = state.sortYear === 'asc' ? '↑' : '↓';
    } else if (type === 'value') {
        state.sortVal = state.sortVal === 'asc' ? 'desc' : 'asc';
        document.getElementById('sort-value-icon').textContent = state.sortVal === 'asc' ? '↑' : '↓';
    }
    renderMainContent();
};

window.handleSearchFilter = function() {
    state.searchQuery = document.getElementById('global-search').value.toLowerCase().trim();
    updateHeaderStats();
    renderMainContent();
};

function renderMainContent() {
    const container = document.getElementById('main-view-container');
    container.innerHTML = '';
    
    if (state.searchQuery.length > 0) {
        renderSearchResults(container);
    } else if (state.view === 'home') {
        renderInteractiveMap(container);
    } else if (state.view === 'country') {
        renderCountryCoinsView(container);
    }
}

function renderSearchResults(container) {
    container.innerHTML = `<h2 class="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-3">Resultados de Búsqueda</h2>`;
    let results = [];

    if (state.filters.standard) {
        countries.forEach(c => {
            if (state.country && state.country !== c.id) return;
            for (let y = c.start; y <= globalMaxYear; y++) {
                denominations.forEach(den => {
                    const existing = collection.find(col => col.country === c.id && col.year === y && col.type === 'Standard' && col.denomination === den.id);
                    if (existing && !state.filters.owned) return;
                    if (!existing && !state.filters.missing) return;
                    
                    const stdDesc = standardInfo[`${c.id}_${den.id}`] || '';
                    const matchStr = `${c.name} ${y} ${den.label} ${existing?.info || ''} ${stdDesc}`.toLowerCase();
                    if (matchStr.includes(state.searchQuery)) {
                        results.push({ country: c, year: y, type: 'Standard', den: den, existing: existing, isOwned: !!existing });
                    }
                });
            }
        });
    }

    if (state.filters.commem) {
        catalog.forEach(catItem => {
            if (state.country && state.country !== catItem.country) return;
            const c = countries.find(x => x.id === catItem.country);
            if (!c) return;
            
            const existing = collection.find(col => col.refId === catItem.id);
            if (existing && !state.filters.owned) return;
            if (!existing && !state.filters.missing) return;
            
            const matchStr = `${c.name} ${catItem.year} 2€ ${catItem.title} ${existing?.info || ''}`.toLowerCase();
            if (matchStr.includes(state.searchQuery)) {
                results.push({ country: c, year: catItem.year, type: 'Commemorative', catItem: catItem, existing: existing, isOwned: !!existing });
            }
        });
    }

    results.sort((a, b) => {
        if (state.sortYear === 'asc' && a.year !== b.year) return a.year - b.year;
        if (state.sortYear === 'desc' && a.year !== b.year) return b.year - a.year;
        
        let valA = a.type === 'Standard' ? a.den.val : 2.00;
        let valB = b.type === 'Standard' ? b.den.val : 2.00;
        if (state.sortVal === 'asc') return valA - valB;
        return valB - valA;
    });

    if (results.length === 0) {
        container.innerHTML += `<p class="text-slate-400 text-center py-12">No se encontraron monedas que coincidan con la búsqueda.</p>`;
        return;
    }

    // Aquí cambiamos "items-end" por "items-stretch" para que todas las cajas sean idénticas
    let gridHtml = `<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-stretch">`;
    
    results.forEach(res => {
        const canClick = isAdmin;
        if (res.type === 'Standard') {
            const customImg = standardImages[`${res.country.id}_${res.year}_${res.den.id}`] || standardImages[`${res.country.id}_common_${res.den.id}`] || '';
            gridHtml += `
                <div class="flex flex-col items-center relative w-full h-full bg-slate-900/50 p-4 rounded-xl border border-slate-800 group/card">
                    <div class="text-center w-full mb-3 shrink-0">
                        <img src="https://flagcdn.com/w40/${res.country.id.toLowerCase()}.png" class="w-6 h-4 mx-auto rounded-sm border border-slate-700 mb-1">
                        <span class="text-xs font-bold text-white">${res.year}</span>
                    </div>
                    <div class="flex-1 flex items-center justify-center w-full min-h-[80px]">
                        <div class="coin-base ${res.den.sizeClass} ${res.den.css} ${res.isOwned ? '' : 'coin-disabled'}" style="${customImg ? `background-image: url('${customImg}'); border-width: 0px !important; box-shadow: none !important;` : ''}" ${canClick ? `onclick="window.openModal('${res.isOwned ? 'edit-collection' : 'add-collection'}', '${res.den.id}', 'Standard', ${res.year}, '${res.country.id}')"` : ''}>
                            ${!customImg ? `<span>${res.den.label}</span>` : ''}
                        </div>
                    </div>
                    <span class="text-[11px] font-semibold mt-3 text-center shrink-0">${res.isOwned ? getConditionStars(res.existing.condition) : '<span class="text-slate-500">Falta</span>'}</span>
                </div>`;
        } else {
            gridHtml += `
                <div class="flex flex-col items-center w-full h-full relative group bg-slate-900/50 p-4 rounded-xl border border-slate-800/60 hover:bg-slate-800/80 transition-colors">
                    <div class="text-center w-full mb-3 shrink-0">
                        <img src="https://flagcdn.com/w40/${res.country.id.toLowerCase()}.png" class="w-6 h-4 mx-auto rounded-sm border border-slate-700 mb-1">
                        <span class="text-xs font-bold text-white">${res.year}</span>
                    </div>
                    <div class="flex-1 w-full flex items-center justify-center cursor-pointer min-h-[80px]" ${canClick ? `onclick="window.openModal('${res.isOwned ? 'edit-collection' : 'add-collection'}', '${res.catItem.id}', 'Commemorative', ${res.year}, '${res.country.id}')"` : ''}>
                        <div class="coin-base coin-2e coin-bimetal-2 ${res.isOwned ? '' : 'coin-disabled'} w-full max-w-[80px]" style="${res.catItem.image ? `background-image: url('${res.catItem.image}'); border-width: 0px !important; box-shadow: none !important;` : ''}">
                            ${!res.catItem.image ? `<span>2€</span>` : ''}
                        </div>
                    </div>
                    <div class="text-center w-full mt-3 shrink-0">
                        <p class="text-[10px] font-semibold text-white leading-tight truncate px-1" title="${res.catItem.title}">${res.catItem.title}</p>
                        <p class="text-[11px] mt-1">${res.isOwned ? getConditionStars(res.existing.condition) : '<span class="text-slate-500">Falta</span>'}</p>
                    </div>
                </div>`;
        }
    });
    gridHtml += `</div>`;
    container.innerHTML += gridHtml;
}

function renderInteractiveMap(container) {
    container.innerHTML = `
        <div class="mb-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center shadow-xl">
            <div class="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs text-slate-400 font-medium">
                <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-slate-700 border border-slate-600"></span> Faltante</div>
                <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-slate-100 shadow-sm"></span> En progreso</div>
                <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></span> Serie</div>
                <div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></span> Completado</div>
            </div>
        </div>
        <div id="d3-map-container" class="relative w-full h-[650px] bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-inner cursor-move">
            <div id="map-loader" class="absolute inset-0 flex items-center justify-center text-slate-400 animate-pulse font-semibold pointer-events-none z-10">Cargando cartografía mundial...</div>
            <svg id="europe-map" class="w-full h-full"></svg>
        </div>
        <div class="mt-8 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 shadow-lg">
            <h3 class="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Caras Comunes (Dorso Europeo Global)
            </h3>
            <p class="text-xs text-slate-400 mb-6 -mt-2">Lado común del euro compartido por todos los países de la Eurozona.</p>
            <div class="grid grid-cols-4 lg:grid-cols-8 gap-4 justify-items-center items-end">
                ${denominations.map(den => {
                    const variants = globalCommonImages[den.id] || [];
                    const latestImg = variants.length > 0 ? variants[variants.length - 1].img : '';
                    const gInfo = globalCommonInfo[den.id] ? globalCommonInfo[den.id].replace(/"/g, '&quot;') : '';
                    return `
                    <div class="flex flex-col items-center gap-2 ${isAdmin ? 'cursor-pointer group hover:scale-105' : ''} transition-transform" ${isAdmin ? `onclick="window.openModal('edit-global-info', '${den.id}')"` : ''} title="${gInfo}">    
                        <div class="coin-base ${den.sizeClass} ${den.css} relative shadow-xl" style="${latestImg ? `background-image: url('${latestImg}'); border-width: 0px !important; box-shadow: none !important;` : ''}">
                            ${!latestImg ? `<span>${den.label}</span>` : ''}
                        </div>
                        <span class="text-[11px] font-semibold text-slate-400 flex items-center gap-1">${den.label} ${(globalCommonInfo[den.id] || variants.length > 0) ? '<svg class="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>' : ''}</span>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    setTimeout(initD3Map, 100);
}

async function initD3Map() {
    if (window.worldGeoJson) { drawMap(window.worldGeoJson); return; }
    try {
        const res = await fetch('assets/world.geojson');
        const geoJson = await res.json();
        window.worldGeoJson = geoJson;
        drawMap(geoJson);
    } catch (e) { document.getElementById('map-loader').textContent = "Error cargando archivo assets/world.geojson"; }
}

function drawMap(geoJson) {
    document.getElementById('map-loader').style.display = 'none';
    const container = document.getElementById('d3-map-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const svg = d3.select('#europe-map'); svg.selectAll('*').remove();

    const projection = d3.geoMercator().center([15, 52]).scale(width * 0.45).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    const mapGroup = svg.append("g");

    const zoom = d3.zoom()
        .scaleExtent([0.5, 8])
        .on("zoom", (event) => { mapGroup.attr("transform", event.transform); });

    svg.call(zoom);

    let tooltip = d3.select("#map-tooltip");
    if(tooltip.empty()) tooltip = d3.select("body").append("div").attr("id", "map-tooltip").attr("class", "absolute hidden bg-slate-950 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 pointer-events-none z-50 shadow-xl");

    const getFill = (iso3) => {
        const c = countries.find(x => x.iso3 === iso3);
        if (!c) return "#1e293b";
        const st = getCountryMapStatus(c.id);
        return st === 'yellow' ? "#eab308" : st === 'blue' ? "#3b82f6" : st === 'white' ? "#f8fafc" : "#334155";
    };

    mapGroup.selectAll("path").data(geoJson.features).enter().append("path").attr("d", path).attr("fill", d => getFill(d.id)).attr("stroke", "#0f172a").attr("stroke-width", 0.5)
        .style("cursor", d => countries.find(c => c.iso3 === d.id) ? "pointer" : "default")
        .on("mouseover", (event, d) => {
            const country = countries.find(c => c.iso3 === d.id);
            if (country) {
                const stats = getCountryStats(country.id);
                tooltip.classed("hidden", false).html(`<div class="flex items-center gap-2"><img src="https://flagcdn.com/w40/${country.id.toLowerCase()}.png" class="w-5 h-3.5 rounded-sm border border-slate-700"><strong>${country.name}</strong></div><div class="mt-1 text-slate-300">Completado: <span class="${stats.percentage === 100 ? 'text-yellow-400 font-bold' : 'text-white'}">${stats.percentage}%</span></div>`);
            } else {
                // Diccionario para convertir ISO3 a ISO2 para las banderas
                // Diccionario para convertir ISO3 a ISO2 para las banderas
                const iso3To2 = {
                    'USA': 'us', 'CAN': 'ca', 'MEX': 'mx', 'BRA': 'br', 'ARG': 'ar', 'COL': 'co', 'CHL': 'cl',
                    'PER': 'pe', 'VEN': 've', 'CUB': 'cu', 'CHN': 'cn', 'JPN': 'jp', 'IND': 'in', 'AUS': 'au',
                    'ZAF': 'za', 'RUS': 'ru', 'KOR': 'kr', 'GBR': 'gb', 'CHE': 'ch', 'SWE': 'se', 'NOR': 'no',
                    'POL': 'pl', 'CZE': 'cz', 'HUN': 'hu', 'ROU': 'ro', 'DNK': 'dk', 'ISL': 'is', 'SRB': 'rs',
                    'BIH': 'ba', 'ALB': 'al', 'MKD': 'mk', 'MNE': 'me', 'UKR': 'ua', 'BLR': 'by', 'MDA': 'md',
                    'KOS': 'xk', 'XKX': 'xk', 'OSA': 'xk', 'SLV': 'sv', 'ECU': 'ec', 'TLS': 'tl', 'MHL': 'mh',
                    'FSM': 'fm', 'PLW': 'pw', 'KIR': 'ki', 'NRU': 'nr', 'BHS': 'bs', 'BRB': 'bb', 'BLZ': 'bz',
                    'JAM': 'jm', 'TTO': 'tt', 'ATG': 'ag', 'DMA': 'dm', 'GRD': 'gd', 'KNA': 'kn', 'LCA': 'lc',
                    'VCT': 'vc', 'GUY': 'gy', 'SUR': 'sr', 'BRN': 'bn', 'SGP': 'sg', 'TWN': 'tw', 'LBR': 'lr',
                    'NAM': 'na', 'ZWE': 'zw', 'FJI': 'fj', 'NZL': 'nz', 'SLB': 'sb', 'TUV': 'tv', 'DOM': 'do',
                    'URY': 'uy', 'PHL': 'ph', 'LIE': 'li', 'BEN': 'bj', 'BFA': 'bf', 'GNB': 'gw', 'CIV': 'ci',
                    'MLI': 'ml', 'NER': 'ne', 'SEN': 'sn', 'TGO': 'tg', 'CMR': 'cm', 'CAF': 'cf', 'TCD': 'td',
                    'COG': 'cg', 'GNQ': 'gq', 'GAB': 'ga', 'BDI': 'bi', 'COM': 'km', 'COD': 'cd', 'DJI': 'dj',
                    'GIN': 'gn', 'RWA': 'rw', 'IDN': 'id', 'MDV': 'mv', 'NPL': 'np', 'PAK': 'pk', 'LKA': 'lk',
                    'MUS': 'mu', 'SYC': 'sc', 'EGY': 'eg', 'LBN': 'lb', 'SYR': 'sy', 'SDN': 'sd', 'SSD': 'ss',
                    'BHR': 'bh', 'IRQ': 'iq', 'JOR': 'jo', 'KWT': 'kw', 'LBY': 'ly', 'DZA': 'dz', 'TUN': 'tn',
                    'IRN': 'ir', 'OMN': 'om', 'QAT': 'qa', 'SAU': 'sa', 'YEM': 'ye', 'KEN': 'ke', 'SOM': 'so',
                    'TZA': 'tz', 'UGA': 'ug', 'MWI': 'mw', 'ZMB': 'zm', 'PRK': 'kp', 'ARE': 'ae', 'MAR': 'ma',
                    'AZE': 'az', 'TKM': 'tm', 'KGZ': 'kg', 'UZB': 'uz', 'TJK': 'tj', 'CRI': 'cr', 'GTM': 'gt',
                    'HTI': 'ht', 'HND': 'hn', 'NIC': 'ni', 'PAN': 'pa', 'BOL': 'bo', 'PRY': 'py', 'BGR': 'bg',
                    'ARM': 'am', 'GEO': 'ge', 'TUR': 'tr', 'AFG': 'af', 'BGD': 'bd', 'BTN': 'bt', 'KHM': 'kh',
                    'ISR': 'il', 'KAZ': 'kz', 'LAO': 'la', 'MYS': 'my', 'MNG': 'mn', 'MMR': 'mm', 'THA': 'th',
                    'VNM': 'vn', 'AGO': 'ao', 'BWA': 'bw', 'CPV': 'cv', 'ERN': 'er', 'SWZ': 'sz', 'ETH': 'et',
                    'GMB': 'gm', 'GHA': 'gh', 'LSO': 'ls', 'MDG': 'mg', 'MRT': 'mr', 'MOZ': 'mz', 'NGA': 'ng',
                    'STP': 'st', 'SLE': 'sl', 'PNG': 'pg', 'WSM': 'ws', 'TON': 'to', 'VUT': 'vu'
                };
                
                // Intenta sacar el código de la lista, o si el propio mapa tiene un código de 2 letras válido, lo usa.
                const mapIso2 = d.properties.iso_a2 || d.properties.ISO_A2;
                const fallbackFlag = (mapIso2 && mapIso2 !== '-99') ? mapIso2.toLowerCase() : '';
                const flagCode = iso3To2[d.id] || fallbackFlag;
                
                const curr = worldCurrencies[d.id] || 'Moneda local';
                const nombreES = worldCountriesES[d.id] || d.properties.name;
                
                const flagHtml = flagCode ? `<img src="https://flagcdn.com/w40/${flagCode}.png" class="w-5 h-3.5 rounded-sm border border-slate-700 shrink-0">` : '';

                tooltip.classed("hidden", false).html(`<div class="flex items-center gap-2">${flagHtml}<strong>${nombreES}</strong></div><div class="mt-1 text-slate-400 text-[10px]">${curr}</div>`);
            }
        })
        .on("mousemove", e => tooltip.style("left", (e.pageX + 15) + "px").style("top", (e.pageY + 15) + "px"))
        .on("mouseout", () => tooltip.classed("hidden", true))
        .on("click", (e, d) => { const c = countries.find(x => x.iso3 === d.id); if (c) { tooltip.classed("hidden", true); window.selectCountry(c.id); } });

    countries.filter(c => c.coords).forEach(d => {
        mapGroup.append("circle").attr("cx", projection([d.coords[0], d.coords[1]])[0]).attr("cy", projection([d.coords[0], d.coords[1]])[1]).attr("r", 4)
           .attr("fill", getFill(d.iso3)).attr("stroke", "#fff").attr("stroke-width", 1).style("cursor", "pointer")
           .on("mouseover", e => { const s = getCountryStats(d.id); tooltip.classed("hidden", false).html(`<div class="flex items-center gap-2"><img src="https://flagcdn.com/w40/${d.id.toLowerCase()}.png" class="w-5 h-3.5 rounded-sm border border-slate-700"><strong>${d.name}</strong></div><div class="mt-1 text-slate-300">Completado: <span class="${s.percentage === 100 ? 'text-yellow-400' : 'text-white'}">${s.percentage}%</span></div>`); })
           .on("mousemove", e => tooltip.style("left", (e.pageX + 15) + "px").style("top", (e.pageY + 15) + "px"))
           .on("mouseout", () => tooltip.classed("hidden", true)).on("click", () => { tooltip.classed("hidden", true); window.selectCountry(d.id); });
    });
}

function renderCountryCoinsView(container) {
    const countryObj = countries.find(c => c.id === state.country);
    if (!countryObj) return;

    const cStats = getCountryStats(state.country);
    
    // Colores más vivos y sólidos
    const isGold = cStats.isComplete;
    const isBlue = !isGold && cStats.isSeries;
    
    const bgClass = isGold ? 'bg-yellow-500 border-yellow-400' : 
                    (isBlue ? 'bg-blue-600 border-blue-500' : 'bg-slate-900/60 border-slate-800/80');
    
    // Adaptación dinámica de textos para mantener el contraste
    const titleClass = isGold ? 'text-slate-900' : 'text-white';
    const subClass = isGold ? 'text-slate-700' : (isBlue ? 'text-blue-100' : 'text-slate-400');
    const flagBorder = isGold ? 'border-yellow-600' : (isBlue ? 'border-blue-400' : 'border-slate-700');
    const coinLabelClass = isGold ? 'text-slate-800' : (isBlue ? 'text-blue-100' : 'text-slate-400');

    let headerHtml = `
    <div class="mb-8 ${bgClass} p-6 rounded-2xl border shadow-lg relative overflow-hidden transition-colors duration-500">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
                <h3 class="text-xl font-bold ${titleClass} flex items-center gap-3">
                    <img src="https://flagcdn.com/w40/${state.country.toLowerCase()}.png" class="w-8 h-5 object-cover rounded shadow border ${flagBorder}"> 
                    Caras Nacionales (Variantes)
                </h3>
                <p class="text-xs ${subClass} mt-1">Variantes y diseños nacionales del país.</p>
            </div>
        </div>
        
        <div class="grid grid-cols-4 lg:grid-cols-8 gap-4 items-stretch">`;
        
    const conditionOrder = { 'RC': 1, 'BC': 2, 'MBC': 3, 'EBC': 4, 'SC': 5, 'FDC': 6 };
    
    denominations.forEach(den => {
        const imgStr = standardImages[`${state.country}_common_${den.id}`] || standardImages[`${state.country}_${countryObj.start}_${den.id}`] || '';
        const ownedCoinsOfDen = collection.filter(c => c.country === state.country && c.type === 'Standard' && c.denomination === den.id);
        let bestCoin = null;
        if (ownedCoinsOfDen.length > 0) {
            bestCoin = ownedCoinsOfDen.reduce((best, current) => {
                if (!best) return current;
                return conditionOrder[current.condition] > conditionOrder[best.condition] ? current : best;
            }, null);
        }

        const disabledClass = bestCoin ? '' : 'coin-disabled';
        const sInfo = standardInfo[`${state.country}_${den.id}`] ? standardInfo[`${state.country}_${den.id}`].replace(/"/g, '&quot;') : '';

        headerHtml += `
            <div class="flex flex-col items-center w-full h-full ${isAdmin ? 'cursor-pointer group hover:scale-105' : ''} transition-transform" ${isAdmin ? `onclick="window.openModal('standard-image', '${den.id}', 'Standard', ${countryObj.start}, '${state.country}')"` : ''} title="${sInfo}">                <div class="flex-1 flex items-center justify-center w-full min-h-[70px]">
                    <div class="coin-base ${den.sizeClass} ${den.css} ${disabledClass} relative shadow-xl" style="${imgStr ? `background-image: url('${imgStr}'); border-width: 0px !important; box-shadow: none !important;` : ''}">
                        ${!imgStr ? `<span>${den.label}</span>` : ''}
                    </div>
                </div>
                <div class="text-center w-full shrink-0 mt-auto pt-2">
                    <span class="text-[11px] font-semibold ${coinLabelClass} flex items-center justify-center gap-1">${den.label}</span>
                    ${bestCoin ? `<span class="text-[10px] ${isGold ? 'text-slate-900' : 'text-yellow-400'} font-bold block leading-tight mt-0.5">${bestCoin.year} <span class="${isGold ? 'text-slate-700' : (isBlue ? 'text-blue-200' : 'text-slate-300')}">(${bestCoin.condition})</span></span>` : ''}
                </div>
            </div>`;
    });
    
    headerHtml += `</div></div>`;
    container.innerHTML += headerHtml;

    let yearsToDisplay = state.year === 'ALL' ? getAllYearsList(countryObj.start) : [state.year];
    yearsToDisplay = yearsToDisplay.filter(y => {
        if (!state.filters.standard && state.filters.commem && y < 2004) return false;
        return true;
    });

    let yearBlocks = [];

    yearsToDisplay.forEach(y => {
        const yStats = getYearStats(state.country, y);
        const starYear = yStats.isComplete ? '<span class="text-yellow-500 ml-1 text-sm">★</span>' : '';
        
        let yearStandardItems = denominations.map(den => ({ den, existing: collection.find(c => c.country === state.country && c.year === y && c.type === 'Standard' && c.denomination === den.id) })).map(x => ({...x, isOwned: !!x.existing}));
        let yearCommemItems = (y >= 2004) ? catalog.filter(c => c.country === countryObj.id && c.year === y).map(catItem => ({ catItem, existing: collection.find(c => c.refId === catItem.id) })).map(x => ({...x, isOwned: !!x.existing})) : [];

        yearStandardItems = yearStandardItems.filter(item => {
            if (item.isOwned && !state.filters.owned) return false;
            if (!item.isOwned && !state.filters.missing) return false;
            if (!state.filters.standard) return false;
            return true;
        });

        yearCommemItems = yearCommemItems.filter(item => {
            if (item.isOwned && !state.filters.owned) return false;
            if (!item.isOwned && !state.filters.missing) return false;
            if (!state.filters.commem) return false;
            return true;
        });

        if (!state.filters.missing && state.filters.owned && yearStandardItems.length === 0 && yearCommemItems.length === 0) return;

        let blockHtml = `<div class="mb-10 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 shadow-lg">
            <div class="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    ${y} ${starYear}
                </h3>
                ${(state.filters.standard) ? `
                <div class="flex items-center gap-3">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Comunes</h4>
                    <span class="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-semibold border border-slate-700">${yStats.stdPct}%</span>
                </div>` : ''}
            </div>`;

        if (yearStandardItems.length > 0 && state.filters.standard) {
            blockHtml += `<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-6 items-stretch">`;
            yearStandardItems.sort((a, b) => state.sortVal === 'asc' ? a.den.val - b.den.val : b.den.val - a.den.val);
            yearStandardItems.forEach(({ den, existing, isOwned }) => {
                const customImg = standardImages[`${state.country}_${y}_${den.id}`] || standardImages[`${state.country}_common_${den.id}`] || '';
                blockHtml += `
                    <div class="flex flex-col items-center w-full h-full relative group/card">
                        ${isAdmin ? `<button onclick="window.openModal('standard-image', '${den.id}', 'Standard', ${y}, '${state.country}')" class="absolute -top-2 -right-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-1.5 rounded-full shadow border border-slate-600 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button>` : ''}
                        <div class="flex-1 flex items-center justify-center w-full min-h-[70px]">
                            <div class="coin-base ${den.sizeClass} ${den.css} ${isOwned ? '' : 'coin-disabled'}" style="${customImg ? `background-image: url('${customImg}'); border-width: 0px !important; box-shadow: none !important;` : ''}" ${isAdmin ? `onclick="window.openModal('${isOwned ? 'edit-collection' : 'add-collection'}', '${den.id}', 'Standard', ${y}, '${state.country}')"` : ''}>
                                ${!customImg ? `<span>${den.label}</span>` : ''}
                            </div>
                        </div>
                        <div class="w-full text-center shrink-0 mt-auto pt-2">
                            <span class="text-[11px] font-semibold block">${isOwned ? getConditionStars(existing.condition) : '<span class="text-slate-500">Falta</span>'}</span>
                        </div>
                    </div>`;
            });
            blockHtml += `</div>`;
        }

        if (y >= 2004 && state.filters.commem) {
            const hasStandardVisible = yearStandardItems.length > 0 && state.filters.standard;
            const separatorClass = hasStandardVisible ? "mt-6 pt-5 border-t border-slate-800/50" : "";
            
            blockHtml += `<div class="flex flex-wrap justify-between items-center mb-4 ${separatorClass} gap-3">
                        ${isAdmin ? `<button onclick="window.openModal('create-catalog-commem', null, 'Commemorative', ${y}, '${state.country}')" class="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-600/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0">+ Añadir al Catálogo</button>` : '<div></div>'}
                        <div class="flex items-center gap-3">
                            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Conmemorativas</h4>
                            ${yStats.commemMax > 0 ? `<span class="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-semibold border border-slate-700">${yStats.commemPct}%</span>` : ''}
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">`;
            
            yearCommemItems.forEach(({ catItem, existing, isOwned }) => {
                blockHtml += `<div class="flex flex-col items-center w-full h-full relative group bg-slate-900/50 p-4 rounded-xl border border-slate-800/60 hover:bg-slate-800/80 transition-colors">
                            ${isAdmin ? `<button onclick="window.openModal('delete-catalog', '${catItem.id}')" class="absolute top-2 right-2 bg-slate-950 p-1.5 rounded-full text-slate-500 hover:text-red-500 border border-slate-800 z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>` : ''}
                            <div class="flex-1 w-full flex items-center justify-center min-h-[80px] ${isAdmin ? 'cursor-pointer' : ''}" ${isAdmin ? `onclick="window.openModal('${isOwned ? 'edit-collection' : 'add-collection'}', '${catItem.id}', 'Commemorative', ${y}, '${state.country}')"` : ''}>
                                <div class="coin-base coin-2e coin-bimetal-2 ${isOwned ? '' : 'coin-disabled'} w-full max-w-[80px]" style="${catItem.image ? `background-image: url('${catItem.image}'); border-width: 0px !important; box-shadow: none !important;` : ''}">
                                    ${!catItem.image ? `<span>2€</span>` : ''}
                                </div>
                            </div>
                            <div class="text-center w-full shrink-0 mt-auto pt-3">
                                <p class="text-xs font-semibold text-white leading-tight truncate px-2" title="${catItem.title}">${catItem.title}</p>
                                <p class="text-[11px] mt-1 text-center">${isOwned ? getConditionStars(existing.condition) : '<span class="text-slate-500">Falta</span>'}</p>
                            </div>
                        </div>`;
            });
            blockHtml += `</div>`;
        }
        blockHtml += `</div>`;
        yearBlocks.push({ year: y, html: blockHtml });
    });

    yearBlocks.sort((a, b) => state.sortYear === 'asc' ? a.year - b.year : b.year - a.year);
    yearBlocks.forEach(b => { container.innerHTML += b.html; });
}

window.populateDeleteCountrySelect = function() {
    const sel = document.getElementById('config-delete-country-select');
    if(!sel) return;
    sel.innerHTML = '<option value="">-- Seleccionar --</option>';
    countries.forEach(c => { sel.innerHTML += `<option value="${c.id}">${c.name}</option>`; });
};

window.updateModalPreview = function(mode, idOrRef, denObj) {
    const preview = document.getElementById('modal-coin-preview-container');
    let variants = mode === 'global-info' ? currentGlobalVariants : currentStandardVariants;

    if (variants.length <= 1) {
        let currentImg = variants.length === 1 ? variants[0].img : '';
        if (!currentImg && mode === 'standard-image') {
             currentImg = document.getElementById('standard-image-input').value;
        }
        preview.innerHTML = `<div class="coin-base ${denObj.css} w-full max-w-[160px] shadow-2xl mx-auto my-4 scale-125" style="height: auto; aspect-ratio: 1/1; font-size: 3rem; ${currentImg ? `background-image: url('${currentImg}'); border-width: 0px !important; box-shadow: none !important;` : ''}">${!currentImg ? `<span>${denObj.label}</span>` : ''}</div>`;
    } else {
        if (window.modalPreviewIndex >= variants.length) window.modalPreviewIndex = variants.length - 1;
        if (window.modalPreviewIndex < 0) window.modalPreviewIndex = 0;
        
        const v = variants[window.modalPreviewIndex];
        preview.innerHTML = `
            <div class="relative flex items-center justify-center w-full max-w-[280px] mx-auto my-4">
                <button type="button" onclick="window.modalPreviewIndex--; window.updateModalPreview('${mode}', '${idOrRef}', denominations.find(d=>d.id==='${idOrRef}'))" class="absolute left-0 p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400" ${window.modalPreviewIndex === 0 ? 'disabled' : ''}><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <div class="flex flex-col items-center gap-4">
                    <div class="coin-base ${denObj.css} w-full max-w-[160px] shadow-2xl mx-auto scale-125" style="height: auto; aspect-ratio: 1/1; font-size: 3rem; ${v.img ? `background-image: url('${v.img}'); border-width: 0px !important; box-shadow: none !important;` : ''}">${!v.img ? `<span>${denObj.label}</span>` : ''}</div>
                    <span class="text-xs font-bold text-white bg-slate-800 px-3 py-1.5 rounded-full border border-slate-600 shadow-inner mt-4">${v.start} - ${v.end === globalMaxYear || v.end === 'Actual' ? 'Actual' : v.end}</span>
                </div>
                <button type="button" onclick="window.modalPreviewIndex++; window.updateModalPreview('${mode}', '${idOrRef}', denominations.find(d=>d.id==='${idOrRef}'))" class="absolute right-0 p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400" ${window.modalPreviewIndex === variants.length - 1 ? 'disabled' : ''}><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
            </div>
        `;
    }
};

window.openModal = function(action, idOrRef = null, type = 'Standard', yearParam = null, countryParam = null) {
    if (!isAdmin) return; // Bloqueo de modales en Modo Público

    document.getElementById('form-payload-id').value = ''; 
    document.getElementById('form-payload-refId').value = idOrRef || '';
    const safeCountry = countryParam || state.country;
    document.getElementById('form-payload-country').value = safeCountry;
    const currentYear = yearParam || (state.year === 'ALL' ? globalMaxYear : state.year);
    document.getElementById('form-payload-year').value = currentYear;
    
    const btnSub = document.getElementById('btn-submit');
    const btnDel = document.getElementById('btn-delete-collection');
    const title = document.getElementById('modal-title');
    const preview = document.getElementById('modal-coin-preview-container');
    const modeInput = document.getElementById('form-payload-mode');
    const actionsContainer = document.getElementById('modal-actions-container');
    
    ['modal-config-fields', 'modal-catalog-fields', 'modal-standard-fields', 'modal-collection-fields', 'modal-delete-fields', 'modal-global-info-fields'].forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('config-delete-confirm').classList.add('hidden');
    document.getElementById('config-missing-confirm').classList.add('hidden');
    document.getElementById('collection-info-wrapper').classList.add('hidden');

    btnDel.classList.add('hidden'); btnSub.classList.remove('hidden'); preview.innerHTML = ''; actionsContainer.classList.remove('hidden');
    btnSub.className = 'flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg';
    btnSub.textContent = 'Guardar';
    document.getElementById('app-form').reset();

    if (action === 'config') {
        modeInput.value = 'config'; title.textContent = 'Configuración Global';
        document.getElementById('modal-config-fields').classList.remove('hidden');
        document.getElementById('config-year-input').value = globalMaxYear;
        window.populateDeleteCountrySelect();
    } else if (action === 'edit-global-info') {
        modeInput.value = 'global-info';
        const denObj = denominations.find(d => d.id === idOrRef);
        title.textContent = `Cara Común: ${denObj.label} (Dorso Europeo)`;
        document.getElementById('modal-global-info-fields').classList.remove('hidden');
        document.getElementById('global-info-input').value = globalCommonInfo[idOrRef] || '';
        
        currentGlobalVariants = globalCommonImages[idOrRef] ? [...globalCommonImages[idOrRef]] : [];
        window.modalPreviewIndex = currentGlobalVariants.length > 0 ? currentGlobalVariants.length - 1 : 0;
        window.renderGlobalVariantsList();
        window.updateModalPreview('global-info', idOrRef, denObj);
    } else if (action === 'create-catalog-commem') {
        modeInput.value = 'catalog'; title.textContent = 'Añadir al Catálogo';
        document.getElementById('modal-catalog-fields').classList.remove('hidden');
        document.getElementById('catalog-year').value = Math.max(2004, currentYear);
        preview.innerHTML = `<div class="coin-base coin-2e coin-bimetal-2 w-full max-w-[280px] shadow-2xl mx-auto" style="font-size: 3rem;"><span>2€</span></div>`;
    } else if (action === 'delete-catalog') {
        modeInput.value = 'delete-catalog'; title.textContent = 'Eliminar del Catálogo';
        document.getElementById('modal-delete-fields').classList.remove('hidden');
        btnSub.textContent = 'Confirmar Borrado'; 
        btnSub.className = 'flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg shadow-lg';
        const catItem = catalog.find(c => c.id === idOrRef);
        if(catItem) preview.innerHTML = `<div class="w-full flex justify-center"><div class="coin-base coin-2e coin-bimetal-2 w-full max-w-[320px] shadow-2xl" style="${catItem.image ? `background-image: url('${catItem.image}'); border-width: 0px !important; box-shadow: none !important;` : ''}">${!catItem.image ? `<span>2€</span>` : ''}</div></div>`;
    } else if (action === 'standard-image') {
        modeInput.value = 'standard-image'; 
        const denObj = denominations.find(d => d.id === idOrRef) || denominations[7];
        title.textContent = `Variantes Nacionales: ${denObj.label}`;
        document.getElementById('modal-standard-fields').classList.remove('hidden');
        document.getElementById('standard-info-input').value = standardInfo[`${safeCountry}_${idOrRef}`] || '';
        
        const currentImg = standardImages[`${safeCountry}_${yearParam}_${idOrRef}`] || '';
        document.getElementById('standard-image-input').value = currentImg;
        document.getElementById('std-image-start').value = yearParam;
        document.getElementById('std-image-end').value = '';

        renderStandardVariantsList(safeCountry, idOrRef);
        window.modalPreviewIndex = currentStandardVariants.length > 0 ? currentStandardVariants.length - 1 : 0;
        window.updateModalPreview('standard-image', idOrRef, denObj);
    } else {
        modeInput.value = 'collection'; 
        document.getElementById('modal-collection-fields').classList.remove('hidden');
        let img = '', denObj = denominations[7], lbl = idOrRef;
        
        if (type === 'Standard') {
            denObj = denominations.find(d => d.id === idOrRef) || denObj; lbl = denObj.label;
            img = standardImages[`${safeCountry}_${currentYear}_${idOrRef}`] || standardImages[`${safeCountry}_common_${idOrRef}`] || '';
        } else if (type === 'Commemorative') {
            document.getElementById('collection-info-wrapper').classList.remove('hidden');
            const cat = catalog.find(c => c.id === idOrRef); if(cat?.image) img = cat.image; lbl = '2€';
        }
        
        if (action === 'add-collection') title.textContent = 'Añadir a Colección';
        else {
            title.textContent = 'Editar Moneda'; btnDel.classList.remove('hidden');
            const existing = type === 'Commemorative' ? collection.find(c => c.refId === idOrRef) : collection.find(c => c.country === safeCountry && c.year === currentYear && c.type === 'Standard' && c.denomination === idOrRef);
            if (existing) {
                document.getElementById('form-payload-id').value = existing.id;
                document.getElementById('coin-condition').value = existing.condition;
                if(type === 'Commemorative') document.getElementById('coin-info').value = existing.info || '';
            }
        }
        
        if (type === 'Commemorative') {
            preview.innerHTML = `<div class="w-full flex justify-center py-6"><div class="coin-base coin-2e coin-bimetal-2 w-full shadow-2xl scale-125" style="max-width: 250px; ${img ? `background-image: url('${img}'); border-width: 0px !important; box-shadow: none !important;` : ''}">${!img ? `<span>${lbl}</span>` : ''}</div></div>`;
        } else {
            preview.innerHTML = `<div class="w-full flex justify-center py-6"><div class="coin-base ${denObj.css} w-full shadow-2xl scale-150" style="max-width: 200px; height: auto; aspect-ratio: 1/1; font-size: 4rem; ${img ? `background-image: url('${img}'); border-width: 0px !important; box-shadow: none !important;` : ''}">${!img ? `<span>${lbl}</span>` : ''}</div></div>`;
        }
    }
    document.getElementById('app-modal').classList.remove('hidden');
};

function renderStandardVariantsList(countryId, refId) {
    const container = document.getElementById('standard-variants-list');
    if(!container) return;
    
    let variants = [];
    const countryObj = countries.find(c => c.id === countryId);
    if (!countryObj) return;

    let currentImg = standardImages[`${countryId}_${countryObj.start}_${refId}`] || '';
    let currentStart = countryObj.start;

    for (let y = countryObj.start + 1; y <= globalMaxYear; y++) {
        let img = standardImages[`${countryId}_${y}_${refId}`] || '';
        if (img !== currentImg) {
            if (currentImg) variants.push({ start: currentStart, end: y - 1, img: currentImg });
            currentImg = img;
            currentStart = y;
        }
    }
    if (currentImg) variants.push({ start: currentStart, end: globalMaxYear, img: currentImg });

    currentStandardVariants = variants;

    if (variants.length === 0) {
        container.innerHTML = '<p class="text-xs text-slate-500 italic">No hay variantes guardadas.</p>';
        return;
    }

    container.innerHTML = variants.map((v) => `
        <div class="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-700">
            <span class="text-xs font-bold text-white block bg-slate-800 px-2 py-0.5 rounded border border-slate-600">${v.start} - ${v.end === globalMaxYear ? 'Actual' : v.end}</span>
            <div class="flex items-center gap-1">
                <button type="button" onclick="window.editStandardVariant('${countryId}', '${refId}', ${v.start}, '${v.end === globalMaxYear ? 'Actual' : v.end}', '${v.img}')" class="text-slate-400 hover:text-blue-400 p-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                <button type="button" onclick="window.removeStandardVariant('${countryId}', '${refId}', ${v.start}, '${v.end === globalMaxYear ? 'Actual' : v.end}')" class="text-slate-500 hover:text-red-400 p-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </div>
        </div>
    `).join('');
}

window.removeStandardVariant = function(countryId, refId, start, end) {
    for (let y = start; y <= (end === 'Actual' ? globalMaxYear : end); y++) {
        delete standardImages[`${countryId}_${y}_${refId}`];
    }
    saveData();
    renderStandardVariantsList(countryId, refId);
    window.modalPreviewIndex = currentStandardVariants.length > 0 ? currentStandardVariants.length - 1 : 0;
    window.updateModalPreview('standard-image', refId, denominations.find(d=>d.id===refId));
};

window.editStandardVariant = function(countryId, refId, start, end, img) {
    document.getElementById('std-image-start').value = start;
    document.getElementById('std-image-end').value = end === 'Actual' ? '' : end;
    document.getElementById('standard-image-input').value = img;
};

window.closeModal = function() { document.getElementById('app-modal').classList.add('hidden'); };

window.renderGlobalVariantsList = function() {
    const container = document.getElementById('global-variants-list');
    if(!container) return;
    if (currentGlobalVariants.length === 0) {
        container.innerHTML = '<p class="text-xs text-slate-500 italic">No hay variantes guardadas.</p>';
        return;
    }
    container.innerHTML = currentGlobalVariants.map((v, idx) => `
        <div class="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-700">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-slate-950 border border-slate-600 shrink-0" style="background-image: url('${v.img}'); background-size: cover; background-position: center;"></div>
                <span class="text-xs font-bold text-white block">${v.start} - ${v.end}</span>
            </div>
            <div class="flex items-center gap-1">
                <button type="button" onclick="window.editGlobalVariant(${idx})" class="text-slate-400 hover:text-blue-400 p-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                <button type="button" onclick="window.removeGlobalVariant(${idx})" class="text-slate-500 hover:text-red-400 p-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </div>
        </div>
    `).join('');
};

window.editGlobalVariant = function(idx) {
    const v = currentGlobalVariants[idx];
    document.getElementById('global-var-start').value = v.start;
    document.getElementById('global-var-end').value = v.end === 'Actual' ? '' : v.end;
    document.getElementById('global-var-img').value = v.img;
    window.removeGlobalVariant(idx);
};

window.addGlobalVariant = function() {
    const start = document.getElementById('global-var-start').value.trim();
    let end = document.getElementById('global-var-end').value.trim();
    const imgInput = document.getElementById('global-var-img').value.trim();
    const img = procesarRutaImagen(imgInput); // <-- Aplicamos la función
    if (!start || !img) return;
    if (!end) end = 'Actual';
    currentGlobalVariants.push({ start, end, img });
    currentGlobalVariants.sort((a, b) => parseInt(a.start) - parseInt(b.start));
    document.getElementById('global-var-start').value = '';
    document.getElementById('global-var-end').value = '';
    document.getElementById('global-var-img').value = '';
    window.modalPreviewIndex = currentGlobalVariants.length - 1;
    window.renderGlobalVariantsList();
    window.updateModalPreview('global-info', document.getElementById('form-payload-refId').value, denominations.find(d => d.id === document.getElementById('form-payload-refId').value));
};

window.removeGlobalVariant = function(idx) {
    currentGlobalVariants.splice(idx, 1);
    if (window.modalPreviewIndex >= currentGlobalVariants.length) window.modalPreviewIndex = Math.max(0, currentGlobalVariants.length - 1);
    window.renderGlobalVariantsList();
    window.updateModalPreview('global-info', document.getElementById('form-payload-refId').value, denominations.find(d => d.id === document.getElementById('form-payload-refId').value));
};

window.promptMarkAllMissing = function() { document.getElementById('config-missing-confirm').classList.remove('hidden'); };
window.executeMarkAllMissing = function() {
    collection = [];
    saveData();
    window.closeModal();
    updateHeaderStats();
    renderSidebar();
    renderMainContent();
};

window.addCountryFromConfig = function() {
    const name = document.getElementById('config-country-name').value.trim();
    const code = document.getElementById('config-country-id').value.trim().toUpperCase();
    const start = parseInt(document.getElementById('config-country-start').value) || 1999;
    if (name && code && !countries.some(c => c.id === code)) {
        countries.push({ id: code, name: name, start: start, iso3: code+'X' });
        saveData(); sortCountriesArray(); renderSidebar(); window.populateDeleteCountrySelect();
        document.getElementById('config-country-name').value = '';
        document.getElementById('config-country-id').value = '';
    }
};

window.deleteCountryFromConfig = function() {
    const cId = document.getElementById('config-delete-country-select').value;
    if(!cId) return;
    document.getElementById('config-delete-confirm').classList.remove('hidden');
    document.getElementById('config-delete-confirm-btn').onclick = () => {
        countries = countries.filter(c => c.id !== cId);
        collection = collection.filter(c => c.country !== cId);
        catalog = catalog.filter(c => c.country !== cId);
        saveData(); sortCountriesArray(); renderSidebar(); window.populateDeleteCountrySelect();
        document.getElementById('config-delete-confirm').classList.add('hidden');
        if(state.country === cId) window.showHomeView(); else updateHeaderStats();
    };
};

window.handleFormSubmit = function(e) {
    e.preventDefault();
    if (!isAdmin) return;

    const mode = document.getElementById('form-payload-mode').value;
    const refId = document.getElementById('form-payload-refId').value;
    const pYear = parseInt(document.getElementById('form-payload-year').value);
    const safeCountry = document.getElementById('form-payload-country').value;

    if (mode === 'config') {
        const yr = parseInt(document.getElementById('config-year-input').value);
        if (yr && yr >= currentYearConstant) { globalMaxYear = yr; }
    } else if (mode === 'global-info') {
        const info = document.getElementById('global-info-input').value.trim();
        if(info) globalCommonInfo[refId] = info; else delete globalCommonInfo[refId];
        globalCommonImages[refId] = currentGlobalVariants;
    } else if (mode === 'catalog') {
        const yr = parseInt(document.getElementById('catalog-year').value) || pYear;
        const imgInput = document.getElementById('catalog-image').value.trim();
        if (yr >= 2004) catalog.push({ id: 'cat_' + Date.now(), country: safeCountry, year: yr, title: document.getElementById('catalog-title').value || 'Conmemorativa', image: procesarRutaImagen(imgInput) }); // <-- Aplicamos la función
    } else if (mode === 'delete-catalog') {
        catalog = catalog.filter(c => c.id !== refId); collection = collection.filter(c => c.refId !== refId);
    } else if (mode === 'standard-image') {
        const urlInput = document.getElementById('standard-image-input').value.trim();
        const url = procesarRutaImagen(urlInput); // <-- Aplicamos la función
        const startVal = document.getElementById('std-image-start').value.trim();
        const endVal = document.getElementById('std-image-end').value.trim();
        const stdInfoText = document.getElementById('standard-info-input').value.trim();
        if (stdInfoText) standardInfo[`${safeCountry}_${refId}`] = stdInfoText;
        else delete standardInfo[`${safeCountry}_${refId}`];
        
        if (startVal !== '') {
            let startYear = parseInt(startVal) || pYear;
            let endYear = parseInt(endVal) || globalMaxYear;
            if (endVal.toLowerCase() === 'actual') endYear = globalMaxYear;

            for (let y = startYear; y <= endYear; y++) {
                if (url) standardImages[`${safeCountry}_${y}_${refId}`] = url; 
                else delete standardImages[`${safeCountry}_${y}_${refId}`];
            }
        } else if (url) {
            standardImages[`${safeCountry}_${pYear}_${refId}`] = url; 
        } else {
            delete standardImages[`${safeCountry}_${pYear}_${refId}`];
        }
    } else if (mode === 'collection') {
        const editId = document.getElementById('form-payload-id').value;
        const condition = document.getElementById('coin-condition').value;
        const info = document.getElementById('coin-info') ? document.getElementById('coin-info').value.trim() : '';
        if (editId) {
            const coin = collection.find(c => c.id === editId);
            if (coin) { coin.condition = condition; if(info !== undefined) coin.info = info; }
        } else {
            const isCommem = refId.startsWith('cat_');
            const catObj = isCommem ? catalog.find(c => c.id === refId) : null;
            const saveYear = catObj ? catObj.year : pYear;
            collection.push({ id: 'col_' + Date.now(), refId: refId, country: safeCountry, year: saveYear, type: isCommem ? 'Commemorative' : 'Standard', denomination: isCommem ? '2€' : refId, condition: condition, info: info });
        }
    }
    saveData(); sortCountriesArray(); updateHeaderStats(); renderSidebar();
    if (state.searchQuery) {
        renderMainContent();
    } else if (state.view === 'country') { 
        renderYearSelector(countries.find(c => c.id === state.country).start); 
        renderMainContent(); 
    } else if (state.view === 'home') {
        renderMainContent();
    }
    window.closeModal();
};

window.deleteCurrentCoin = function() {
    if (!isAdmin) return;
    const editId = document.getElementById('form-payload-id').value;
    if (editId) {
        collection = collection.filter(c => c.id !== editId);
        saveData(); updateHeaderStats(); renderSidebar(); renderMainContent(); window.closeModal();
    }
};

window.onload = function() { loadAppData(); };
