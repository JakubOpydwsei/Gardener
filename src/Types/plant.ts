export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type SoilType = 'sandy' | 'clay' | 'loamy' | 'peaty' | 'chalky' | 'silty';
export type Species = 'tree' | 'shrub' | 'herb' | 'flower' | 'vegetable' | 'fruit';
export type WaterRequirement = 'low' | 'medium' | 'high';
export type Sunlight = 'full sun' | 'partial shade' | 'shade';
export type SoilPh = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Plant {
  id: number;
  name: string;
  latinName?: string;
  imageUrl?: string;
  species: Species;
  soil: SoilType;
  waterRequirement: WaterRequirement;
  sunlight: Sunlight;
  floweringPeriod: {
    start: Month;
    end: Month;
  };
  heightCm?: number;
  color?: string;
  compatibleWith?: string[];
  soilPh?: SoilPh;
}