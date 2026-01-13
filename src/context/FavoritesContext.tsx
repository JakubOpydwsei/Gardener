import { createContext, useContext, useEffect, useState } from "react";
import { Plant } from "../Types/plant";
import { useAuth } from "./AuthContext";
import { favoriteService } from "../services/favoritesService";

type FavoritesContextType = {
  favorites: Plant[];
  toggleFavorite: (plant: Plant) => Promise<void>;
  addToFavorites: (plant: Plant) => Promise<void>;
  deleteFavorites: (plant: Plant) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Plant[]>([]);
  const { user, token } = useAuth(); // Twój istniejący auth

  useEffect(() => {
    if (!user || !token) return;

    favoriteService.getFavorites(user.id, token).then(setFavorites);
  }, [user, token]);

  const toggleFavorite = async (plant: Plant) => {
    if (!user || !token) return;

    const isFavorite = favorites.some((p) => p._id === plant._id);

    if (isFavorite) {
      await favoriteService.deleteFavorite(user.id, token, plant._id);

      setFavorites((prev) => prev.filter((p) => p._id !== plant._id));
    } else {
      await favoriteService.addFavorite(user.id, token, plant._id);

      setFavorites((prev) => [...prev, plant]);
    }
  };

  const addToFavorites = async (plant: Plant) => {
    if (!user || !token) return;

    await favoriteService.addFavorite(user.id, token, plant._id);

    setFavorites((prev) =>
      prev.some((p) => p._id === plant._id) ? prev : [...prev, plant]
    );
  };

  const deleteFavorites = async (plant: Plant) => {
    if (!user || !token) return;

    await favoriteService.deleteFavorite(user.id, token, plant._id);

    setFavorites((prev) => prev.filter((p) => p._id !== plant._id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, addToFavorites, deleteFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites musi być użyty wewnątrz FavoritesProvider");
  }
  return ctx;
};
