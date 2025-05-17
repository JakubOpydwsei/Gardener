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
}
export const plants: Plant[] = [
  {
    id: 'plant-001',
    name: 'Róża',
    latinName: 'Rosa',
    imageUrl: '/images/roza.jpg',
    species: 'Krzew',
    soil: 'żyzna',
    waterRequirement: 'medium',
    sunlight: 'full sun',
    floweringPeriod: { start: 6, end: 9 },
    heightCm: 120,
    color: ['czerwony', 'biały', 'różowy'],
    compatibleWith: ['plant-003', 'plant-005'],
  },
  {
    id: 'plant-002',
    name: 'Lawenda',
    species: 'Bylina',
    soil: 'piaszczysta',
    waterRequirement: 'low',
    sunlight: 'full sun',
    floweringPeriod: { start: 7, end: 8 },
    heightCm: 60,
    color: ['fioletowy'],
    compatibleWith: ['plant-001'],
  },

];