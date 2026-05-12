/**
 * Vedic Astrology Calculation Library
 * Pure client-side — no API needed
 * Uses simplified astronomical algorithms for Moon, Rahu/Ketu, Lagna
 */

// ── Ayanamsa (Lahiri) ──
export function getLahiriAyanamsa(jd: number): number {
    const T = (jd - 2451545.0) / 36525
    // Lahiri ayanamsa approximation
    return 23.85 + 0.01337 * (T * 100)
}

// ── Julian Day from date ──
export function toJD(year: number, month: number, day: number, hour = 0): number {
    let y = year, m = month
    if (m <= 2) { y -= 1; m += 12 }
    const A = Math.floor(y / 100)
    const B = 2 - A + Math.floor(A / 4)
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + hour / 24 + B - 1524.5
}

// ── Moon's ecliptic longitude (simplified, ~1° accuracy) ──
export function getMoonLongitude(jd: number): number {
    const T = (jd - 2451545.0) / 36525
    // Mean elements
    const Lp = mod360(218.3164477 + 481267.88123421 * T)
    const D = mod360(297.8501921 + 445267.1114034 * T)
    const M = mod360(357.5291092 + 35999.0502909 * T)
    const Mp = mod360(134.9633964 + 477198.8675055 * T)
    const F = mod360(93.272095 + 483202.0175233 * T)

    // Principal perturbations
    let lon = Lp
    lon += 6.289 * sinD(Mp)
    lon += 1.274 * sinD(2 * D - Mp)
    lon += 0.658 * sinD(2 * D)
    lon += 0.214 * sinD(2 * Mp)
    lon -= 0.186 * sinD(M)
    lon -= 0.114 * sinD(2 * F)
    lon += 0.059 * sinD(2 * D - 2 * Mp)
    lon += 0.057 * sinD(2 * D - M - Mp)
    lon += 0.053 * sinD(2 * D + Mp)
    lon += 0.046 * sinD(2 * D - M)
    lon -= 0.041 * sinD(M - Mp)
    lon -= 0.035 * sinD(D)
    lon -= 0.031 * sinD(M + Mp)

    return mod360(lon)
}

// ── Rahu (Mean North Node) longitude ──
export function getRahuLongitude(jd: number): number {
    const T = (jd - 2451545.0) / 36525
    // Mean ascending node
    const omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T
    return mod360(omega)
}

// ── Sun longitude (simplified) ──
export function getSunLongitude(jd: number): number {
    const T = (jd - 2451545.0) / 36525
    const L0 = mod360(280.46646 + 36000.76983 * T)
    const M = mod360(357.52911 + 35999.05029 * T)
    const C = (1.9146 - 0.004817 * T) * sinD(M) + 0.019993 * sinD(2 * M) + 0.00029 * sinD(3 * M)
    return mod360(L0 + C)
}

// ── Lagna (Ascendant) ──
export function getLagna(jd: number, lat: number, lon: number): number {
    // Local Sidereal Time
    const T = (jd - 2451545.0) / 36525
    let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T
    gmst = mod360(gmst)
    const lst = mod360(gmst + lon)

    // Obliquity of ecliptic
    const eps = 23.4393 - 0.013 * T

    // Ascendant formula
    const lstRad = lst * Math.PI / 180
    const epsRad = eps * Math.PI / 180
    const latRad = lat * Math.PI / 180

    const y = -Math.cos(lstRad)
    const x = Math.sin(epsRad) * Math.tan(latRad) + Math.cos(epsRad) * Math.sin(lstRad)
    let asc = Math.atan2(y, x) * 180 / Math.PI
    asc = mod360(asc)

    return asc
}

// ── Convert tropical to sidereal ──
export function toSidereal(tropicalLon: number, jd: number): number {
    return mod360(tropicalLon - getLahiriAyanamsa(jd))
}

// ── Zodiac Signs (Vedic/Sidereal) ──
export const RASHIS = [
    'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)',
    'Cancer (Karka)', 'Leo (Simha)', 'Virgo (Kanya)',
    'Libra (Tula)', 'Scorpio (Vrishchika)', 'Sagittarius (Dhanu)',
    'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
]

export const RASHI_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

export function getRashi(siderealLon: number): number {
    return Math.floor(siderealLon / 30)
}

export function getRashiName(index: number): string {
    return RASHIS[index % 12]
}

// ── 27 Nakshatras ──
export const NAKSHATRAS = [
    { name: 'Ashwini', deity: 'Ashwini Kumaras', ruler: 'Ketu', letters: ['Chu', 'Che', 'Cho', 'La'] },
    { name: 'Bharani', deity: 'Yama', ruler: 'Venus', letters: ['Li', 'Lu', 'Le', 'Lo'] },
    { name: 'Krittika', deity: 'Agni', ruler: 'Sun', letters: ['A', 'Ee', 'U', 'Ea'] },
    { name: 'Rohini', deity: 'Brahma', ruler: 'Moon', letters: ['O', 'Va', 'Vi', 'Vu'] },
    { name: 'Mrigashira', deity: 'Soma', ruler: 'Mars', letters: ['Ve', 'Vo', 'Ka', 'Ki'] },
    { name: 'Ardra', deity: 'Rudra', ruler: 'Rahu', letters: ['Ku', 'Gha', 'Ng', 'Chha'] },
    { name: 'Punarvasu', deity: 'Aditi', ruler: 'Jupiter', letters: ['Ke', 'Ko', 'Ha', 'Hi'] },
    { name: 'Pushya', deity: 'Brihaspati', ruler: 'Saturn', letters: ['Hu', 'He', 'Ho', 'Da'] },
    { name: 'Ashlesha', deity: 'Naga', ruler: 'Mercury', letters: ['Di', 'Du', 'De', 'Do'] },
    { name: 'Magha', deity: 'Pitris', ruler: 'Ketu', letters: ['Ma', 'Mi', 'Mu', 'Me'] },
    { name: 'Purva Phalguni', deity: 'Bhaga', ruler: 'Venus', letters: ['Mo', 'Ta', 'Ti', 'Tu'] },
    { name: 'Uttara Phalguni', deity: 'Aryaman', ruler: 'Sun', letters: ['Te', 'To', 'Pa', 'Pi'] },
    { name: 'Hasta', deity: 'Savitar', ruler: 'Moon', letters: ['Pu', 'Sha', 'Na', 'Tha'] },
    { name: 'Chitra', deity: 'Vishwakarma', ruler: 'Mars', letters: ['Pe', 'Po', 'Ra', 'Ri'] },
    { name: 'Swati', deity: 'Vayu', ruler: 'Rahu', letters: ['Ru', 'Re', 'Ro', 'Taa'] },
    { name: 'Vishakha', deity: 'Indra-Agni', ruler: 'Jupiter', letters: ['Ti', 'Tu', 'Te', 'To'] },
    { name: 'Anuradha', deity: 'Mitra', ruler: 'Saturn', letters: ['Na', 'Ni', 'Nu', 'Ne'] },
    { name: 'Jyeshtha', deity: 'Indra', ruler: 'Mercury', letters: ['No', 'Ya', 'Yi', 'Yu'] },
    { name: 'Moola', deity: 'Nirriti', ruler: 'Ketu', letters: ['Ye', 'Yo', 'Bha', 'Bhi'] },
    { name: 'Purva Ashadha', deity: 'Apas', ruler: 'Venus', letters: ['Bhu', 'Dha', 'Pha', 'Dha'] },
    { name: 'Uttara Ashadha', deity: 'Vishvadevas', ruler: 'Sun', letters: ['Bhe', 'Bho', 'Ja', 'Ji'] },
    { name: 'Shravana', deity: 'Vishnu', ruler: 'Moon', letters: ['Ju/Khi', 'Je/Khu', 'Jo/Khe', 'Gha/Kho'] },
    { name: 'Dhanishta', deity: 'Vasus', ruler: 'Mars', letters: ['Ga', 'Gi', 'Gu', 'Ge'] },
    { name: 'Shatabhisha', deity: 'Varuna', ruler: 'Rahu', letters: ['Go', 'Sa', 'Si', 'Su'] },
    { name: 'Purva Bhadrapada', deity: 'Aja Ekapada', ruler: 'Jupiter', letters: ['Se', 'So', 'Da', 'Di'] },
    { name: 'Uttara Bhadrapada', deity: 'Ahir Budhnya', ruler: 'Saturn', letters: ['Du', 'Tha', 'Jha', 'Da'] },
    { name: 'Revati', deity: 'Pushan', ruler: 'Mercury', letters: ['De', 'Do', 'Cha', 'Chi'] },
]

export function getNakshatra(siderealMoonLon: number): { index: number; pada: number } {
    const nakshatraSpan = 360 / 27 // 13.333...
    const index = Math.floor(siderealMoonLon / nakshatraSpan)
    const padaInNakshatra = siderealMoonLon - index * nakshatraSpan
    const pada = Math.floor(padaInNakshatra / (nakshatraSpan / 4))
    return { index: index % 27, pada: Math.min(pada, 3) }
}

// ── Ashtakoot Guna Milan (Kundli Matching) ──
export function calculateGunaScore(moonLon1: number, moonLon2: number): {
    total: number
    max: number
    details: { name: string; score: number; max: number }[]
} {
    const nak1 = getNakshatra(moonLon1)
    const nak2 = getNakshatra(moonLon2)
    const rashi1 = getRashi(moonLon1)
    const rashi2 = getRashi(moonLon2)

    // 1. Varna (1 point)
    const varnaMap = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4] // simplified
    const varna = varnaMap[rashi1] >= varnaMap[rashi2] ? 1 : 0

    // 2. Vashya (2 points)
    const vashya = Math.abs(rashi1 - rashi2) <= 4 ? 2 : Math.abs(rashi1 - rashi2) <= 8 ? 1 : 0

    // 3. Tara (3 points)
    const taraDiff = ((nak2.index - nak1.index + 27) % 27) % 9
    const tara = [0, 2, 6, 8].includes(taraDiff) ? 0 : taraDiff <= 4 ? 1.5 : 3

    // 4. Yoni (4 points)
    const yoniAnimal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0]
    const yoniDiff = Math.abs(yoniAnimal[nak1.index] - yoniAnimal[nak2.index])
    const yoni = yoniDiff === 0 ? 4 : yoniDiff <= 3 ? 3 : yoniDiff <= 6 ? 2 : yoniDiff <= 9 ? 1 : 0

    // 5. Graha Maitri (5 points)
    const lordMap = [3, 5, 2, 0, 6, 2, 5, 3, 4, 7, 7, 4] // planet indices
    const lord1 = lordMap[rashi1], lord2 = lordMap[rashi2]
    const graha = lord1 === lord2 ? 5 : Math.abs(lord1 - lord2) <= 2 ? 4 : Math.abs(lord1 - lord2) <= 4 ? 3 : 1

    // 6. Gana (6 points)
    const ganaMap = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]
    const gana1 = ganaMap[nak1.index], gana2 = ganaMap[nak2.index]
    const gana = gana1 === gana2 ? 6 : Math.abs(gana1 - gana2) === 1 ? 3 : 0

    // 7. Bhakoot (7 points)
    const diff = (rashi2 - rashi1 + 12) % 12
    const bhakoot = [1, 2, 3, 4, 5, 6].includes(diff) || [1, 2, 3, 4, 5, 6].includes(12 - diff) ?
        ([2, 6, 8, 12].includes(diff + 1) || [2, 6, 8, 12].includes(13 - diff) ? 0 : 7) : 7

    // 8. Nadi (8 points)
    const nadiMap = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]
    const nadi = nadiMap[nak1.index] !== nadiMap[nak2.index] ? 8 : 0

    const total = varna + vashya + tara + yoni + graha + gana + bhakoot + nadi

    return {
        total: Math.min(total, 36),
        max: 36,
        details: [
            { name: 'Varna', score: varna, max: 1 },
            { name: 'Vashya', score: vashya, max: 2 },
            { name: 'Tara', score: tara, max: 3 },
            { name: 'Yoni', score: yoni, max: 4 },
            { name: 'Graha Maitri', score: graha, max: 5 },
            { name: 'Gana', score: gana, max: 6 },
            { name: 'Bhakoot', score: bhakoot, max: 7 },
            { name: 'Nadi', score: nadi, max: 8 },
        ]
    }
}

// ── Numerology ──
export function reduceToSingle(n: number): number {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = String(n).split('').reduce((s, d) => s + parseInt(d), 0)
    }
    return n
}

export function lifePathNumber(dob: Date): number {
    const d = dob.getDate(), m = dob.getMonth() + 1, y = dob.getFullYear()
    return reduceToSingle(reduceToSingle(d) + reduceToSingle(m) + reduceToSingle(
        String(y).split('').reduce((s, d) => s + parseInt(d), 0)
    ))
}

const CHALDEAN_MAP: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
    s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7,
}

const PYTHAGOREAN_MAP: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
}

const VOWELS = new Set('aeiou')

export function destinyNumber(name: string): number {
    const sum = name.toLowerCase().replace(/[^a-z]/g, '').split('')
        .reduce((s, c) => s + (PYTHAGOREAN_MAP[c] || 0), 0)
    return reduceToSingle(sum)
}

export function soulUrgeNumber(name: string): number {
    const sum = name.toLowerCase().replace(/[^a-z]/g, '').split('')
        .filter(c => VOWELS.has(c))
        .reduce((s, c) => s + (PYTHAGOREAN_MAP[c] || 0), 0)
    return reduceToSingle(sum)
}

export function personalityNumber(name: string): number {
    const sum = name.toLowerCase().replace(/[^a-z]/g, '').split('')
        .filter(c => !VOWELS.has(c))
        .reduce((s, c) => s + (PYTHAGOREAN_MAP[c] || 0), 0)
    return reduceToSingle(sum)
}

export function chaldeanNumber(name: string): number {
    const sum = name.toLowerCase().replace(/[^a-z]/g, '').split('')
        .reduce((s, c) => s + (CHALDEAN_MAP[c] || 0), 0)
    return reduceToSingle(sum)
}

// ── FLAMES ──
export function flamesResult(name1: string, name2: string): string {
    const a = name1.toLowerCase().replace(/[^a-z]/g, '')
    const b = name2.toLowerCase().replace(/[^a-z]/g, '')
    const arr1 = a.split(''), arr2 = b.split('')

    // Cancel common letters
    for (let i = 0; i < arr1.length; i++) {
        const idx = arr2.indexOf(arr1[i])
        if (idx !== -1) { arr1[i] = ''; arr2[idx] = '' }
    }
    const remaining = arr1.filter(Boolean).length + arr2.filter(Boolean).length
    if (remaining === 0) return 'Soulmates'

    const flames = ['Friends', 'Love', 'Affection', 'Marriage', 'Enemy', 'Siblings']
    let arr = [...flames]
    let count = remaining
    let idx = 0
    while (arr.length > 1) {
        idx = (idx + count - 1) % arr.length
        arr.splice(idx, 1)
        if (idx >= arr.length) idx = 0
    }
    return arr[0]
}

// ── Numerology Descriptions ──
export const LIFE_PATH_DESC: Record<number, { title: string; desc: string }> = {
    1: { title: 'The Leader', desc: 'Independent, ambitious, and driven. You are a natural pioneer who carves your own path.' },
    2: { title: 'The Diplomat', desc: 'Sensitive, cooperative, and intuitive. You bring harmony and balance to every relationship.' },
    3: { title: 'The Communicator', desc: 'Creative, expressive, and joyful. You have a gift for inspiring others through words and art.' },
    4: { title: 'The Builder', desc: 'Practical, disciplined, and reliable. You create lasting foundations through hard work and dedication.' },
    5: { title: 'The Freedom Seeker', desc: 'Adventurous, versatile, and dynamic. You thrive on change and embrace life fully.' },
    6: { title: 'The Nurturer', desc: 'Loving, responsible, and protective. You are the cosmic caretaker, devoted to family and community.' },
    7: { title: 'The Seeker', desc: 'Analytical, spiritual, and introspective. You seek truth beneath the surface of everything.' },
    8: { title: 'The Powerhouse', desc: 'Ambitious, authoritative, and materialistic. You are here to master the material world.' },
    9: { title: 'The Humanitarian', desc: 'Compassionate, idealistic, and wise. You carry the wisdom of all numbers and serve humanity.' },
    11: { title: 'The Visionary (Master)', desc: 'Highly intuitive with spiritual insight. You are a channel for higher wisdom and inspiration.' },
    22: { title: 'The Master Builder', desc: 'Immense potential to turn dreams into reality. You are here to create something lasting for humanity.' },
    33: { title: 'The Master Teacher', desc: 'The ultimate nurturer and healer. You embody selfless love and spiritual guidance.' },
}

// ── Helpers ──
function mod360(x: number): number {
    return ((x % 360) + 360) % 360
}
function sinD(deg: number): number {
    return Math.sin(deg * Math.PI / 180)
}
