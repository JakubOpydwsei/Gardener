import { Plant } from "../Types/plant"

const BASE_URL = "http://localhost:3001/plants";

export const plantService = {
    async getAllPlants(): Promise<Plant[]> {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                console.log("Error status: " + response.status);
            }

            return await response.json();
        } catch (error) {
            console.error("Nie udało się pobrać listy roślin:", error);
            throw error;
        }
    },

    async getPlantById(id: number): Promise<Plant | undefined> {
        try {
            const response = await fetch(`${BASE_URL}/id/${id}`);

            if (!response.ok) {
                if (response.status === 404) {
                    return undefined;
                }
                console.log("Error status: " + response.status);
            }

            return await response.json();
        } catch (error) {
            console.error(`Nie udało się pobrać rośliny o id=${id}:`, error);
            throw error;
        }
    }

}