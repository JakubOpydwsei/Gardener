import { useEffect, useState } from "react";
import CanvasStage from "../components/CanvasStage";
import { PlantList } from "../components/PlantList";
import { Plant } from "../Types/plant";
import { plantService } from "../services/plantService";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";

export interface CanvasItem {
  id: string | number;
  plant: Plant;
  x: number;
  y: number;
}

export function GardenCreatorPage() {
  const { isAuthenticated } = useAuth();

  const [plants, setPlants] = useState<Plant[]>([]);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [bg, setBg] = useState<string | undefined>();
  const [clearUpload, setClearUpload] = useState(false);

  useEffect(() => {
    plantService
      .getAllPlants()
      .then((data) => setPlants(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
          <div className="fixed inset-0 bg-black/40 -z-5"></div>
        </>
      )}
      <main className="flex-grow relative z-10">
        {isAuthenticated ? (
          <div className="min-h-screen bg-base-100 transition-all">
            <div className="max-w-7xl mx-auto px-4 py-4 lg:px-6 lg:py-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
                <div className="w-full max-w-xl mx-auto xl:mx-0 xl:w-[360px] xl:flex-shrink-0">
                  <PlantList
                    plants={plants}
                    loading={loading}
                    search={search}
                    setSearch={setSearch}
                    setBg={setBg}
                    clearSignal={clearUpload}
                  />
                </div>
                <div className="w-full max-w-3xl mx-auto xl:mx-0 xl:flex-1">
                  <CanvasStage
                    items={items}
                    setItems={setItems}
                    plants={plants}
                    bg={bg}
                    setBg={setBg}
                    setClearUpload={setClearUpload}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 flex items-start justify-center pt-50">
              <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-md">
                <p className="text-center text-sm text-white/90 mb-4">
                  Aby korzystać z kreatora ogrodu musisz być zalogowany
                </p>
                <LoginForm />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default GardenCreatorPage;
