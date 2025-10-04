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
          className="text-sm py-2 m-auto mb-4 file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded file:shadow file:hover:bg-blue-600 file:cursor-pointer"
        />
      </div>
    </div>
  );
}
