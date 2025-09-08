import { useRef } from "react";

export function UploadPanel({
  onImage,
}: {
  onImage: (dataUrl: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      onImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2 className="font-semibold mb-2">1) Wgraj obraz działki</h2>
      <p className="text-sm text-slate-600 mb-3">Obsługiwanie: JPG/PNG</p>
      <div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
          className="text-sm input w-fit py-2 m-auto mb-4"
        />
      </div>
    </div>
  );
}
