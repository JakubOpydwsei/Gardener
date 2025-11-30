import { useEffect, useRef, useState } from "react";

interface UploadPanelProps {
  setBg: (url: string | undefined) => void;
  clearSignal?: boolean;
}

export default function UploadPanel({ setBg, clearSignal }: UploadPanelProps) {
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (clearSignal) {
      setFileName("");
      inputRef.current?.value && (inputRef.current.value = "");
    }
  }, [clearSignal]);

  const handleFile = (file: File) => {
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      alert("Proszę wgrać plik graficzny (JPG/PNG).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result?.toString();
      setBg(url);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className="rounded-lg border border-dashed border-base-300 bg-base-200/60 p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-medium mb-1">Tło ogrodu</h3>
          <p className="text-sm text-base-content/70">
            Wgraj plan działki lub zdjęcie jako tło. Możesz też przeciągnąć plik
            tutaj.
          </p>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setBg(undefined);
            setFileName("");
            if (inputRef.current) inputRef.current.value = "";
          }}
        >
          Usuń tło
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onInputChange}
          className="file-input file-input-bordered w-full"
        />
      </div>

      {fileName && (
        <div className="mt-2 text-sm text-base-content/70">
          Wybrano <span className="font-medium">{fileName}</span>
        </div>
      )}
    </div>
  );
}
