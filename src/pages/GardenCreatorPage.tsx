import { useEffect, useState } from "react";
import { UploadPanel } from "../components/UploadPanel";
import CanvasStage from "../components/CanvasStage";
import { PlantList } from "../components/PlantList";
import { Plant } from "../Types/plant";
import { plantService } from "../services/plantService";

export function GardenCreatorPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [bg, setBg] = useState<string | null>(null);

  useEffect(() => {
    plantService
      .getAllPlants()
      .then((data) => setPlants(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div>
        <UploadPanel onImage={(dataUrl) => setBg(dataUrl)} />
        <div>
          <button className="btn btn-outline" onClick={() => setBg(null)}>
            Wyczyść
          </button>
          {bg && (
            <a className="btn btn-outline" href={bg} download="dzialka.png">
              Pobierz obraz
            </a>
          )}
        </div>
      </div>

      <CanvasStage imageDataUrl={bg} />
      <PlantList
        plants={plants}
        loading={loading}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}

export default GardenCreatorPage;
