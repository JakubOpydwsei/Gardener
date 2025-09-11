import { useEffect, useState } from "react";
import CanvasStage from "../components/CanvasStage";
import { PlantList } from "../components/PlantList";
import { Plant } from "../Types/plant";
import { plantService } from "../services/plantService";
import UploadPanel from "../components/UploadPanel";

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
    <div className="space-y-6">
      <UploadPanel setBg={setBg} clearSignal={clearUpload} />
      <CanvasStage
        items={items}
        setItems={setItems}
        plants={plants}
        bg={bg}
        setBg={setBg}
        setClearUpload={setClearUpload}
      />

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
