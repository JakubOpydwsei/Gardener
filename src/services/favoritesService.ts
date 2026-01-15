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

const BASE_URL = "http://localhost:3001/users";

export const favoriteService = {
    async getFavorites(userId: string, token: string) {
        try {
            const response = await fetch(
                `${BASE_URL}/${userId}/favorites`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                handleError(response);
            }

            const data = await response.json();
            return data.plants;
        } catch (error) {
            console.error("Błąd pobierania ulubionych roślin:", error);
            throw error;
        }
    },

    async addFavorite(userId: string, token: string, plantId: string) {
        try {
            const response = await fetch(
                `${BASE_URL}/${userId}/favorites/${plantId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                handleError(response);
            }
        } catch (error) {
            console.error("Błąd dodania rośliny do ulubionych:", error);
            throw error;
        }
    },

    async deleteFavorite(userId: string, token: string, plantId: string) {
        try {
            const response = await fetch(
                `${BASE_URL}/${userId}/favorites/${plantId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                handleError(response);
            }
        } catch (error) {
            console.error("Błąd usunięcia rośliny z ulubionych:", error);
            throw error;
        }
    },
};