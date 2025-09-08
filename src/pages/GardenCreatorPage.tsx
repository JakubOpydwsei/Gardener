import { useState } from "react";
import { UploadPanel } from "../components/UploadPanel";
import CanvasStage from "../components/CanvasStage";

export function GardenCreatorPage() {
  const [bg, setBg] = useState<string | null>(null);

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
    </div>
  );
}

export default GardenCreatorPage;
