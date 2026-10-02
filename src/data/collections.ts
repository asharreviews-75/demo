import heroImg from '../assets/images/hero_luxury_editorial_1790943541623.jpg';
import cashmereCoatImg from '../assets/images/product_cashmere_coat_1790943561320.jpg';
import silkGownImg from '../assets/images/product_silk_gown_1790943576531.jpg';
import tailoredBlazerImg from '../assets/images/product_tailored_blazer_1790943591011.jpg';
import atelierImg from '../assets/images/craftsmanship_atelier_1790943611492.jpg';

export { heroImg, cashmereCoatImg, silkGownImg, tailoredBlazerImg, atelierImg };

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'outerwear' | 'tailoring' | 'silk' | 'knitwear';
  price: number;
  image: string;
  colorName: string;
  colorHex: string;
  availableColors: { name: string; hex: string }[];
  fabric: string;
  fabricOrigin: string;
  fabricWeight: string;
  silhouette: string;
  craftsmanshipNotes: string[];
  editorialNote: string;
  edition: string;
  sizes: string[];
  eleganceHighlights: {
    drape: string;
    sheen: string;
    tactility: string;
    tailoringHours: number;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'ashar-coat-01',
    name: 'The Monolith Double-Faced Cashmere Coat',
    subtitle: 'Sculptural trench with raglan drape and horn hardware',
    category: 'outerwear',
    price: 2650,
    image: cashmereCoatImg,
    colorName: 'Oatmeal Melange',
    colorHex: '#D7CDC2',
    availableColors: [
      { name: 'Oatmeal Melange', hex: '#D7CDC2' },
      { name: 'Midnight Noir', hex: '#161616' },
      { name: 'Raw Travertine', hex: '#EAE5DB' },
    ],
    fabric: '100% Grade-A Mongolian Cashmere',
    fabricOrigin: 'Inner Mongolia / Spun in Biella, Italy',
    fabricWeight: '620 GSM Double-Faced Weave',
    silhouette: 'Relaxed sculptural drape with gentle cocoon drop shoulder',
    craftsmanshipNotes: [
      'Split-stitch double-faced hand-finished edges without linings',
      'Solid buffalo horn buttons custom-etched in Piedmont',
      'Interior silk piped storm flap with subtle invisible magnets',
      'Artisanal hand-basting along collar curve for organic roll',
    ],
    editorialNote: 'Conceived as an architectural sanctuary against cold winds. The coat flows with quiet gravity, folding softly around the wearer without unnecessary seams.',
    edition: 'Limited run of 60 numbered pieces',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    eleganceHighlights: {
      drape: 'Heavy liquid drape with structured rebound',
      sheen: 'Subtle natural matte luster with velvety nap',
      tactility: 'Ultra-soft uncombed cashmere cloud touch',
      tailoringHours: 34,
    },
  },
  {
    id: 'ashar-silk-02',
    name: 'The Luminous Bias-Cut Mulberry Silk Gown',
    subtitle: 'Fluid evening silhouette cut on the 45-degree grain',
    category: 'silk',
    price: 1580,
    image: silkGownImg,
    colorName: 'Luminous Ivory',
    colorHex: '#F6F3EC',
    availableColors: [
      { name: 'Luminous Ivory', hex: '#F6F3EC' },
      { name: 'Onyx Black', hex: '#181818' },
      { name: 'Champagne Dust', hex: '#E5D8C5' },
    ],
    fabric: '22 Momme Organic Mulberry Silk Charmeuse',
    fabricOrigin: 'Hangzhou Valley / Washed in Lake Como',
    fabricWeight: '95 GSM Weightless Drape',
    silhouette: 'Bias-cut column silhouette that skims without clinging',
    craftsmanshipNotes: [
      'Hand-rolled French baby hems sewn with invisible pure silk thread',
      'Diagonal grain alignment creates kinetic drape and motion resilience',
      'Sculptural scoop back finished with delicate rouleau tie closures',
      'Pre-washed with botanical enzymes for soft matte-sheen finish',
    ],
    editorialNote: 'Designed to move like liquid light. Cut strictly on the true bias, it adapts dynamically to the body in motion, capturing every shift in room illumination.',
    edition: 'Limited run of 45 numbered pieces',
    sizes: ['XS', 'S', 'M', 'L'],
    eleganceHighlights: {
      drape: 'Pure water-like kinetic movement',
      sheen: 'Soft opalescent pearl reflection',
      tactility: 'Gliding featherweight silk touch',
      tailoringHours: 19,
    },
  },
  {
    id: 'ashar-blazer-03',
    name: 'The Sculpted Peak Lapel Wool Blazer',
    subtitle: 'Bespoke floating canvas jacket with architectural shoulders',
    category: 'tailoring',
    price: 1890,
    image: tailoredBlazerImg,
    colorName: 'Midnight Noir',
    colorHex: '#121213',
    availableColors: [
      { name: 'Midnight Noir', hex: '#121213' },
      { name: 'Deep Espresso', hex: '#261F1A' },
      { name: 'Flint Chalk Stripe', hex: '#2A2B2D' },
    ],
    fabric: 'Super 150s High-Twist Australian Merino Wool',
    fabricOrigin: 'Lanificio di Pray, Biella, Italy',
    fabricWeight: '320 GSM 4-Season Tropical Twill',
    silhouette: 'Sharp extended shoulder line with tapered waist and clean back drape',
    craftsmanshipNotes: [
      'Full floating horsehair and wool canvas chest piece for natural mold',
      'Hand-padded lapel with continuous pick stitching (punto a mano)',
      'Functional 4-button surgeon cuffs with genuine horn buttons',
      'Bemberg cupro lining for anti-static, frictionless layering',
    ],
    editorialNote: 'The cornerstone of modern authority. Tailored with Savile Row discipline, stripped of ceremonial clutter to celebrate pure razor-sharp geometry.',
    edition: 'Limited run of 75 numbered pieces',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    eleganceHighlights: {
      drape: 'Architectural precision with crisp recovery',
      sheen: 'Satin-twill understated depth',
      tactility: 'Dry, resilient, whisper-smooth drape',
      tailoringHours: 28,
    },
  },
  {
    id: 'ashar-trench-04',
    name: 'The Travertine Relaxed Overcoat',
    subtitle: 'Minimalist double-breasted coat in unbleached virgin wool',
    category: 'outerwear',
    price: 2250,
    image: cashmereCoatImg,
    colorName: 'Raw Travertine',
    colorHex: '#E2DBD0',
    availableColors: [
      { name: 'Raw Travertine', hex: '#E2DBD0' },
      { name: 'Deep Camel', hex: '#9E7852' },
      { name: 'Basalt Charcoal', hex: '#2A2928' },
    ],
    fabric: 'Unbleached Double-Woven Virgin Wool',
    fabricOrigin: 'Alpine Foothills, Austria',
    fabricWeight: '540 GSM High-Density Weft',
    silhouette: 'Generous column drape with clean notched collar',
    craftsmanshipNotes: [
      'Thermal micro-insulation layer without synthetic bulk',
      'Deep welt pockets lined in brushed silk-cotton velvet',
      'Back storm inverted box pleat allowing graceful strides',
      'Hand-tacked interior reinforcements at stress points',
    ],
    editorialNote: 'Crafted without dyed pigments, preserving the natural tone variations of alpine sheep fleece. Raw minimalism elevated through museum-grade tailoring.',
    edition: 'Limited run of 50 numbered pieces',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    eleganceHighlights: {
      drape: 'Substantial column drape that sways with grace',
      sheen: 'Raw matte wool grain',
      tactility: 'Dense yet comforting natural fleece warmth',
      tailoringHours: 31,
    },
  },
  {
    id: 'ashar-gown-05',
    name: 'The Column Noir Pleated Evening Dress',
    subtitle: 'Architectural crepe gown with micro-geometric pleating',
    category: 'silk',
    price: 1720,
    image: silkGownImg,
    colorName: 'Onyx Noir',
    colorHex: '#0E0E0F',
    availableColors: [
      { name: 'Onyx Noir', hex: '#0E0E0F' },
      { name: 'Alabaster', hex: '#F2EFEB' },
      { name: 'Vintage Olive', hex: '#3B4036' },
    ],
    fabric: 'Heavyweight Silk Crepe de Chine & Organza',
    fabricOrigin: 'Como Textile District, Italy',
    fabricWeight: '180 GSM Textured Drape',
    silhouette: 'Floor-sweeping column with asymmetric sculptural neckline',
    craftsmanshipNotes: [
      'Permanent accordion pleats steam-pressed on antique wooden moulds',
      'Concealed invisible zip closure with hand-sewn hook & eye',
      'Integrated internal silk corset band for effortless posture support',
      'Weight-balanced hem with horsehair braid stabilization',
    ],
    editorialNote: 'A testament to stillness. When motionless, it appears carved from black marble; in motion, the micro-pleats expand to reveal rhythmic fluidity.',
    edition: 'Limited run of 40 numbered pieces',
    sizes: ['XS', 'S', 'M', 'L'],
    eleganceHighlights: {
      drape: 'Kinetic accordion expansion during stride',
      sheen: 'Deep light-absorbing velvet matte',
      tactility: 'Granular crepe hand with ethereal lightness',
      tailoringHours: 24,
    },
  },
  {
    id: 'ashar-knit-06',
    name: 'The Sub-Zero 4-Ply Cashmere Turtleneck',
    subtitle: 'Seamless seamless-knit architectural high collar',
    category: 'knitwear',
    price: 920,
    image: heroImg,
    colorName: 'Alabaster Ivory',
    colorHex: '#ECE7DE',
    availableColors: [
      { name: 'Alabaster Ivory', hex: '#ECE7DE' },
      { name: 'Raw Taupe', hex: '#7D7368' },
      { name: 'Midnight Noir', hex: '#141414' },
    ],
    fabric: '4-Ply 100% De-Haired Organic Cashmere',
    fabricOrigin: 'Himalayan High Plateaus / Spun in Scotland',
    fabricWeight: '420 GSM Chunky Ribbed Gauge',
    silhouette: 'Architectural funnel neck with drop-shoulder silhouette',
    craftsmanshipNotes: [
      '3D WholeGarment seamless knitting—no internal seam friction',
      'Hand-linked ribbed hems and collar for perpetual elastic memory',
      'Naturally water-repellent unstripped lanolin treatment',
      'Finished with alpine mineral spring water washing',
    ],
    editorialNote: 'A tactile armor against winter. Spun from long-staple fibres that resist pilling, softening with each season of wear.',
    edition: 'Permanent Edition',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    eleganceHighlights: {
      drape: 'Sculpted ribbed recovery with relaxed torso ease',
      sheen: 'Gentle cashmere halo',
      tactility: 'Enveloping thermal softness',
      tailoringHours: 16,
    },
  },
];

export interface LookbookSlide {
  id: string;
  season: string;
  title: string;
  subtitle: string;
  image: string;
  quote: string;
  piecesShown: string[];
}

export const LOOKBOOK_SLIDES: LookbookSlide[] = [
  {
    id: 'look-01',
    season: 'COLLECTION IV / 2026',
    title: 'The Architecture of Cloth',
    subtitle: 'Sculptural outerwear framed against monolithic travertine stone',
    image: heroImg,
    quote: '"Garments should not demand space; they should inhabit it with serenity and quiet permanence."',
    piecesShown: ['The Monolith Double-Faced Cashmere Coat', 'Wide-Leg Pleated Wool Trouser'],
  },
  {
    id: 'look-02',
    season: 'SOIRÉE / ATELIER SERIES',
    title: 'Fluidity in True Bias',
    subtitle: 'Mulberry silk moving in dialogue with natural afternoon light',
    image: silkGownImg,
    quote: '"When fabric is cut along the true diagonal, it ceases to be a static object and transforms into motion."',
    piecesShown: ['The Luminous Bias-Cut Mulberry Silk Gown'],
  },
  {
    id: 'look-03',
    season: 'PRECISION / BESPOKE EDITION',
    title: 'Razor Geometry',
    subtitle: 'Savile Row canvas construction calibrated for modern ease',
    image: tailoredBlazerImg,
    quote: '"True luxury whisperers in the weight of the horn button and the balance of the floating canvas."',
    piecesShown: ['The Sculpted Peak Lapel Wool Blazer', 'Super 150s Cigarette Pant'],
  },
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.78 },
  { code: 'AED', symbol: 'AED ', rate: 3.67 },
  { code: 'JPY', symbol: '¥', rate: 152 },
];
