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
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex flex-col justify-center lg:flex-row gap-4 lg:gap-x-6 items-start">
          <div className="flex lg:w-[520px] lg:flex-shrink-0 lg:mr-2">
            <PlantList
              plants={plants}
              loading={loading}
              search={search}
              setSearch={setSearch}
              setBg={setBg}
              clearSignal={clearUpload}
            />
          </div>
          <div className="w-full lg:flex-[2]">
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
