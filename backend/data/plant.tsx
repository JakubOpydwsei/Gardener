export type SoilType = 'sandy' | 'clay' | 'loamy' | 'peaty' | 'chalky' | 'silty';
export type Species = 'tree' | 'shrub' | 'herb' | 'flower' | 'vegetable' | 'fruit';
export type SoilPh = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Plant {
  id: string;
  name: string;
  latinName?: string;
  imageUrl?: string;
  species: Species;
  soil: SoilType[];
  waterRequirement: 'low' | 'medium' | 'high';
  wateringDesc?: string;
  sunlight: 'full sun' | 'partial shade' | 'shade';
  floweringPeriod: { start: number; end: number };
  plantingPeriod?: { start: number; end: number };
  heightCm?: number;
  color?: string[];
  compatibleWith?: string[];
  soilPh?: SoilPh;

  growthRate?: 'slow' | 'medium' | 'fast';
  toxicity?: boolean;
  careTips?: string;
  temp?: { min: number; max: number };

  lifespan?: 'annual' | 'biennial' | 'perennial';
}
export const plants: Plant[] = [
  {
    id: '1',
    name: 'Róża ogrodowa',
    latinName: 'Rosa',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Rose_flower.jpg',
    species: 'shrub',
    soil: ['loamy'],
    waterRequirement: 'medium',
    wateringDesc: 'Podlewaj co 2–3 dni, utrzymuj lekko wilgotną glebę.',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 9 },
    plantingPeriod: { start: 3, end: 4 },
    heightCm: 120,
    color: ['red', 'white', 'pink', 'yellow'],
    compatibleWith: ['Lavender', 'Catnip'],
    lifespan: 'perennial',
  },
  {
    id: '2',
    name: 'Lawenda wąskolistna',
    latinName: 'Lavandula angustifolia',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Lavandula_angustifolia_001.JPG',
    species: 'shrub',
    soil: ['chalky', 'sandy'],
    waterRequirement: 'low',
    wateringDesc: 'Podlewaj rzadko — nie znosi nadmiaru wody.',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 8 },
    plantingPeriod: { start: 4, end: 5 },
    heightCm: 60,
    color: ['purple'],
    compatibleWith: ['Rose', 'Rosemary'],
    lifespan: 'perennial',
  },
  {
    id: '3',
    name: 'Tawuła japońska',
    latinName: 'Spiraea japonica',
    species: 'shrub',
    soil: ['loamy', 'silty'],
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 9 },
    plantingPeriod: { start: 3, end: 5 },
    heightCm: 100,
    color: ['pink', 'white'],
    compatibleWith: ['Barberry', 'Boxwood'],
    lifespan: 'perennial',
  },
  {
    id: '4',
    name: 'Hosta (Funkia)',
    latinName: 'Hosta',
    species: 'herb',
    soil: ['loamy', 'peaty'],
    waterRequirement: 'high',
    wateringDesc: 'Podlewaj regularnie, szczególnie w upalne dni.',
    sunlight: 'partial shade',
    floweringPeriod: { start: 6, end: 8 },
    plantingPeriod: { start: 4, end: 5 },
    heightCm: 50,
    color: ['white', 'purple'],
    compatibleWith: ['Fern', 'Heuchera'],
    lifespan: 'perennial',
  },
  {
    id: '5',
    name: 'Tulipan ogrodowy',
    latinName: 'Tulipa gesneriana',
    species: 'flower',
    soil: ['sandy', 'loamy'],
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 4, end: 5 },
    plantingPeriod: { start: 9, end: 10 },
    heightCm: 40,
    color: ['red', 'yellow', 'white', 'purple'],
    compatibleWith: ['Daffodil', 'Grape hyacinth'],
    lifespan: 'perennial',
  },
  {
    id: '6',
    name: 'Pelargonia rabatowa',
    latinName: 'Pelargonium zonale',
    species: 'flower',
    soil: ['loamy'],
    waterRequirement: 'medium',
    wateringDesc: 'Podlewaj umiarkowanie, nie dopuść do przelania.',
    sunlight: 'full sun',
    floweringPeriod: { start: 5, end: 10 },
    plantingPeriod: { start: 5, end: 5 },
    heightCm: 30,
    color: ['red', 'pink', 'white'],
    compatibleWith: ['Lobelia', 'Verbena'],
    lifespan: 'annual',
  },
  {
    id: '7',
    name: 'Tuja szmaragd',
    latinName: 'Thuja occidentalis "Smaragd"',
    species: 'tree',
    soil: ['loamy', 'peaty'],
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 0, end: 0 },
    plantingPeriod: { start: 3, end: 5 },
    heightCm: 300,
    color: ['green'],
    compatibleWith: ['Barberry', 'Spirea'],
    lifespan: 'perennial',
  },
  {
    id: '8',
    name: 'Petunia ogrodowa',
    latinName: 'Petunia × atkinsiana',
    species: 'flower',
    soil: ['loamy', 'sandy'],
    waterRequirement: 'medium',
    wateringDesc: 'Podlewaj regularnie, ale nie dopuszczaj do przelania.',
    sunlight: 'full sun',
    floweringPeriod: { start: 5, end: 10 },
    plantingPeriod: { start: 5, end: 5 },
    heightCm: 25,
    color: ['purple', 'pink', 'white', 'blue'],
    compatibleWith: ['Lobelia', 'Begonia'],
    lifespan: 'annual',
  },
  {
    id: '9',
    name: 'Bratek ogrodowy',
    latinName: 'Viola × wittrockiana',
    species: 'flower',
    soil: ['loamy', 'peaty'],
    waterRequirement: 'medium',
    sunlight: 'partial shade',
    floweringPeriod: { start: 3, end: 6 },
    plantingPeriod: { start: 8, end: 9 },
    heightCm: 20,
    color: ['purple', 'yellow', 'white', 'blue'],
    compatibleWith: ['Primrose', 'Daisy'],
    lifespan: 'biennial',
  },
  {
    id: '10',
    name: 'Trzmielina Fortune’a',
    latinName: 'Euonymus fortunei',
    species: 'shrub',
    soil: ['loamy', 'silty'],
    waterRequirement: 'medium',
    sunlight: 'partial shade',
    floweringPeriod: { start: 5, end: 6 },
    plantingPeriod: { start: 3, end: 5 },
    heightCm: 50,
    color: ['green', 'yellow-green'],
    compatibleWith: ['Hosta', 'Spirea'],
    lifespan: 'perennial',
  },
  {
    id: '11',
    name: 'Hortensja ogrodowa',
    latinName: 'Hydrangea macrophylla',
    species: 'shrub',
    soil: ['peaty', 'silty'],
    waterRequirement: 'high',
    wateringDesc: 'Podlewaj często – lubi wilgoć.',
    sunlight: 'partial shade',
    floweringPeriod: { start: 6, end: 9 },
    plantingPeriod: { start: 4, end: 5 },
    heightCm: 150,
    color: ['pink', 'blue', 'white', 'purple'],
    compatibleWith: ['Hosta', 'Fern'],
    lifespan: 'perennial',
  },
];