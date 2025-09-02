import { useState } from "react";
import { UploadPanel } from "../components/UploadPanel";

export function GardenCreator() {
  const [bg, setBeg] = useState<string | null>(null);

  return (
    <div>
      <div>
        <UploadPanel onImage={(dataUrl) => setBeg(dataUrl)} />
      </div>
      <div></div>
    </div>
  );
}

export default GardenCreator;
