import { useEffect, useState } from "react";
import CanvasStage from "../components/CanvasStage";
import { PlantList } from "../components/PlantList";
import { Plant } from "../Types/plant";
import { plantService } from "../services/plantService";

export interface CanvasItem {
  id: string | number;
  plant: Plant;
  x: number;
  y: number;
}

export function GardenCreatorPage() {
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
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:px-6 lg:py-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
          <div className="w-full max-x-xl mx-auto xl:mx-0 xl:w-[360px] xl:flex-shrink-0">
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
  );
}

export default GardenCreatorPage;
