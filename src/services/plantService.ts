import { Plant } from "../Types/plant"
import { plants } from "../mocks/plantMock.ts"

export const plantService = {
    async getAllPlants(): Promise<Plant[]>{
        
        // fetch z backendu
        
        return await new Promise<Plant[]> ((resolve, reject)=>{
            setTimeout(() => {
                // fail
                // reject(new Error("Nie udało się pobrać listy roślin"));

                // sucess
                resolve(plants);
            }, 3000);
        });

    },

    async getPlantById(id: number): Promise<Plant | undefined>{
        return await new Promise<Plant | undefined> ((resolve,reject)=>{
            setTimeout(() => {
                // fail
                // reject(new Error("Nie udało się pobrać rośliny"));

                // sucess
                resolve(plants[id])
            }, 3000);
        })
    }
    
}