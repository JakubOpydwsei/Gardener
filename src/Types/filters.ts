import { SoilType } from "./plant";
export type Filters = {
    floweringSeasons: string[];
    lifeLength: number;
    plantingSeasons: string[];
    soil: SoilType[];
    toxiticy: string[];
    species: string[];
};