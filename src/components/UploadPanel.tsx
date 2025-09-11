import { useEffect, useRef } from "react";

interface UploadPanelProps {
  setBg: (url: string | undefined) => void;
  clearSignal?: boolean;
}

export default function UploadPanel({ setBg, clearSignal }: UploadPanelProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (clearSignal && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [clearSignal]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setBg(url);
    }
  };

  return (
    <div>
      <h2 className="font-semibold mb-2">1) Wgraj obraz działki</h2>
      <p className="text-sm text-slate-600 mb-3">Obsługiwanie: JPG/PNG</p>
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="text-sm input w-fit py-2 m-auto mb-4"
        />
      </div>
    </div>
  );
}
