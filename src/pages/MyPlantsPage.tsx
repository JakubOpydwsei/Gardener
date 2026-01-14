import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import PlantCard from "../components/PlantCard";
import { Plant } from "../Types/plant";
import { useFavorites } from "../context/FavoritesContext";

function MyPlantPage() {
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  return (
    <div className="relative min-h-screen flex flex-col">
      {!isAuthenticated && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="fixed inset-0 w-full h-full object-cover -z-10"
          >
            <source src="/login-bg.mp4" type="video/mp4" />
            Twoja przeglądarka nie obsługuje video
          </video>
          <div className="fixed inset-0 bg-black/40 -z-5" />
        </>
      )}
      <div className="flex-grow relative z-10">
        {isAuthenticated ? (
          <div>
            <h1 className="text-3xl mb-3">Ulubione rośliny</h1>
            <div className="grid mx-4 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {favorites.map((plant: Plant) => (
                <PlantCard key={plant._id} plant={plant} isFavorite={true} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 flex items-start justify-center pt-50">
              <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-md">
                <p className="text-center text-sm text-white/90 mb-4">
                  Aby korzystać z zakładki moje rośliny musisz być zalogowany
                </p>
                <LoginForm />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPlantPage;
