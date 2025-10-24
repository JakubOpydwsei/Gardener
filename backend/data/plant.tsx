export interface Plant {
  id: string;
  name: string;
  latinName?: string;
  imageUrl?: string;
  species: string;
  soil: string;
  waterRequirement: 'low' | 'medium' | 'high';
  sunlight: 'full sun' | 'partial shade' | 'shade';
  floweringPeriod: {
    start: number;
    end: number;
  };
  heightCm?: number;
  color?: string[];
  compatibleWith?: string[];
  soilPh?: number;
}
export const plants: Plant[] = [
  {
    id: '1',
    name: 'Róża ogrodowa',
    latinName: 'Rosa',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Rose_flower.jpg',
    species: 'Krzew',
    soil: 'żyzna, dobrze przepuszczalna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 9 },
    heightCm: 120,
    color: ['czerwony', 'biały', 'różowy', 'żółty'],
    compatibleWith: ['Lawenda', 'Kocimiętka']
  },
  {
    id: '2',
    name: 'Lawenda wąskolistna',
    latinName: 'Lavandula angustifolia',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Lavandula_angustifolia_001.JPG',
    species: 'Krzewinka',
    soil: 'sucha, wapienna, przepuszczalna',
    waterRequirement: 'low',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 8 },
    heightCm: 60,
    color: ['fioletowy'],
    compatibleWith: ['Róża ogrodowa', 'Rozmaryn']
  },
  {
    id: '3',
    name: 'Tawuła japońska',
    latinName: 'Spiraea japonica',
    species: 'Krzew',
    soil: 'żyzna, lekko wilgotna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 9 },
    heightCm: 100,
    color: ['różowy', 'biały'],
    compatibleWith: ['Berberys', 'Bukszpan']
  },
  {
    id: '4',
    name: 'Hosta (Funkia)',
    latinName: 'Hosta',
    species: 'Bylina',
    soil: 'wilgotna, próchnicza',
    waterRequirement: 'high',
    sunlight: 'partial shade',
    floweringPeriod: { start: 6, end: 8 },
    heightCm: 50,
    color: ['biały', 'fioletowy'],
    compatibleWith: ['Paprocie', 'Żurawka']
  },
  {
    id: '5',
    name: 'Tulipan ogrodowy',
    latinName: 'Tulipa gesneriana',
    species: 'Roślina cebulowa',
    soil: 'przepuszczalna, piaszczysto-gliniasta',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 4, end: 5 },
    heightCm: 40,
    color: ['czerwony', 'żółty', 'biały', 'fioletowy'],
    compatibleWith: ['Narcyz', 'Szafirek']
  },
  {
    id: '6',
    name: 'Pelargonia rabatowa',
    latinName: 'Pelargonium zonale',
    species: 'Roślina jednoroczna',
    soil: 'żyzna, lekko wilgotna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 5, end: 10 },
    heightCm: 30,
    color: ['czerwony', 'różowy', 'biały'],
    compatibleWith: ['Lobelia', 'Werbena']
  },
  {
    id: '7',
    name: 'Tuja szmaragd',
    latinName: 'Thuja occidentalis "Smaragd"',
    species: 'Iglak',
    soil: 'wilgotna, próchnicza',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 0, end: 0 },
    heightCm: 300,
    color: ['zielony'],
    compatibleWith: ['Berberys', 'Tawuła']
  },
  {
    id: '8',
    name: 'Petunia ogrodowa',
    latinName: 'Petunia × atkinsiana',
    species: 'Roślina jednoroczna',
    soil: 'żyzna, przepuszczalna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 5, end: 10 },
    heightCm: 25,
    color: ['fioletowy', 'różowy', 'biały', 'niebieski'],
    compatibleWith: ['Lobelia', 'Begonia']
  },
  {
    id: '9',
    name: 'Bratek ogrodowy',
    latinName: 'Viola × wittrockiana',
    species: 'Roślina dwuletnia',
    soil: 'próchnicza, wilgotna',
    waterRequirement: 'medium',
    sunlight: 'partial shade',
    floweringPeriod: { start: 3, end: 6 },
    heightCm: 20,
    color: ['fioletowy', 'żółty', 'biały', 'niebieski'],
    compatibleWith: ['Prymulka', 'Stokrotka']
  },
  {
    id: '10',
    name: 'Trzmielina Fortune’a',
    latinName: 'Euonymus fortunei',
    species: 'Krzew płożący',
    soil: 'przepuszczalna, wilgotna',
    waterRequirement: 'medium',
    sunlight: 'partial shade',
    floweringPeriod: { start: 5, end: 6 },
    heightCm: 50,
    color: ['zielony', 'żółto-zielony'],
    compatibleWith: ['Hosta', 'Tawuła']
  },
    {
    id: '11',
    name: 'Hortensja ogrodowa',
    latinName: 'Hydrangea macrophylla',
    species: 'Krzew',
    soil: 'kwaśna, wilgotna, próchnicza',
    waterRequirement: 'high',
    sunlight: 'partial shade',
    floweringPeriod: { start: 6, end: 9 },
    heightCm: 150,
    color: ['różowy', 'niebieski', 'biały', 'fioletowy'],
    compatibleWith: ['Hosta', 'Paprocie']
  },
  {
    id: '12',
    name: 'Berberys Thunberga',
    latinName: 'Berberis thunbergii',
    species: 'Krzew',
    soil: 'przepuszczalna, umiarkowanie wilgotna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 5, end: 6 },
    heightCm: 100,
    color: ['czerwony', 'zielony'],
    compatibleWith: ['Tawuła', 'Tuja szmaragd']
  },
  {
    id: '13',
    name: 'Rozchodnik okazały',
    latinName: 'Hylotelephium spectabile',
    species: 'Bylina',
    soil: 'sucha, przepuszczalna',
    waterRequirement: 'low',
    sunlight: 'full sun',
    floweringPeriod: { start: 8, end: 10 },
    heightCm: 50,
    color: ['różowy', 'czerwony'],
    compatibleWith: ['Lawenda', 'Kocimiętka']
  },
  {
    id: '14',
    name: 'Krokus wiosenny',
    latinName: 'Crocus vernus',
    species: 'Roślina cebulowa',
    soil: 'przepuszczalna, piaszczysta',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 3, end: 4 },
    heightCm: 10,
    color: ['fioletowy', 'żółty', 'biały'],
    compatibleWith: ['Tulipan ogrodowy', 'Narcyz']
  },
  {
    id: '15',
    name: 'Narcyz trąbkowy',
    latinName: 'Narcissus pseudonarcissus',
    species: 'Roślina cebulowa',
    soil: 'żyzna, umiarkowanie wilgotna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 3, end: 4 },
    heightCm: 30,
    color: ['żółty', 'biały'],
    compatibleWith: ['Tulipan ogrodowy', 'Hiacynt']
  },
  {
    id: '16',
    name: 'Begonia stale kwitnąca',
    latinName: 'Begonia semperflorens',
    species: 'Roślina jednoroczna',
    soil: 'żyzna, wilgotna',
    waterRequirement: 'medium',
    sunlight: 'partial shade',
    floweringPeriod: { start: 5, end: 10 },
    heightCm: 25,
    color: ['różowy', 'biały', 'czerwony'],
    compatibleWith: ['Petunia ogrodowa', 'Lobelia']
  },
  {
    id: '17',
    name: 'Żurawka',
    latinName: 'Heuchera',
    species: 'Bylina',
    soil: 'próchnicza, umiarkowanie wilgotna',
    waterRequirement: 'medium',
    sunlight: 'partial shade',
    floweringPeriod: { start: 5, end: 7 },
    heightCm: 30,
    color: ['zielony', 'czerwony', 'bordowy'],
    compatibleWith: ['Hosta', 'Paprocie']
  },
  {
    id: '18',
    name: 'Piwonia chińska',
    latinName: 'Paeonia lactiflora',
    species: 'Bylina',
    soil: 'żyzna, przepuszczalna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 5, end: 6 },
    heightCm: 80,
    color: ['różowy', 'czerwony', 'biały'],
    compatibleWith: ['Irys', 'Lawenda']
  },
  {
    id: '19',
    name: 'Aksamitka',
    latinName: 'Tagetes',
    species: 'Roślina jednoroczna',
    soil: 'średnio żyzna, przepuszczalna',
    waterRequirement: 'low',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 10 },
    heightCm: 30,
    color: ['pomarańczowy', 'żółty'],
    compatibleWith: ['Petunia', 'Pelargonia']
  },
  {
    id: '20',
    name: 'Irys bródkowy',
    latinName: 'Iris germanica',
    species: 'Bylina',
    soil: 'przepuszczalna, umiarkowanie wilgotna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 5, end: 6 },
    heightCm: 80,
    color: ['fioletowy', 'biały', 'żółty'],
    compatibleWith: ['Piwonia', 'Tulipan']
  }
];