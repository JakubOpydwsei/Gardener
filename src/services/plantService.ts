import { Plant } from "../Types/plant"

const BASE_URL = "http://localhost:3001/plants";

function handleError(response: Response): never {
    let message: string;

    switch (response.status) {
        case 400:
            message = "Błędne zapytanie (400). Sprawdź dane wejściowe.";
            break;
        case 401:
            message = "Brak autoryzacji (401). Zaloguj się ponownie.";
            break;
        case 403:
            message = "Brak dostępu (403).";
            break;
        case 404:
            message = "Nie znaleziono zasobu (404).";
            break;
        case 500:
            message = "Błąd serwera (500). Spróbuj ponownie później.";
            break;
        case 503:
            message = "Serwer niedostępny (503). Spróbuj ponownie później.";
            break;
        default:
            message = `Nieoczekiwany błąd: ${response.status} ${response.statusText}`;
    }

    console.error(`[API ERROR] ${response.url} → ${response.status} (${response.statusText})`);
    throw new Error(message);
}

export const plantService = {
    async getAllPlants(): Promise<Plant[]> {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                handleError(response);
            }

            return await response.json();
        } catch (error) {
            console.error("Nie udało się pobrać listy roślin:", error);
            throw error;
        }
    },

    async getPlantById(id: string): Promise<Plant | undefined> {
        try {
            const response = await fetch(`${BASE_URL}/id/${id}`);

            if (!response.ok) {
                if (response.status === 404) {
                    console.warn(`[API WARN] Roślina o ID ${id} nie została znaleziona.`);
                    return undefined;
                }
                handleError(response);
            }

            return await response.json();
        } catch (error) {
            console.error(`Nie udało się pobrać rośliny o id=${id}:`, error);
            throw error;
        }
    }

}