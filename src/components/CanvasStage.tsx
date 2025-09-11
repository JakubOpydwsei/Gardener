import { useEffect, useRef, useState } from "react";
import { CanvasItem } from "../pages/GardenCreatorPage";
import { Plant } from "../Types/plant";

type Props = {
  bg?: string;
  setBg: React.Dispatch<React.SetStateAction<string | undefined>>;
  items: CanvasItem[];
  setItems: React.Dispatch<React.SetStateAction<CanvasItem[]>>;
  plants: Plant[];
  className?: string;
  setClearUpload?: React.Dispatch<React.SetStateAction<boolean>>;
};

const LOCAL_STORAGE_KEY = "gardenCanvasState";

export default function CanvasStage({
  bg,
  setBg,
  items,
  setItems,
  plants,
  className,
  setClearUpload,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const plantImagesRef = useRef<Map<number | string, HTMLImageElement>>(
    new Map()
  );

  const resizeObsRef = useRef<ResizeObserver | null>(null);

  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!bg) {
      bgImageRef.current = null;
      redraw();
      return;
    }
    const img = new Image();
    img.onload = () => {
      bgImageRef.current = img;
      redraw();
    };
    img.onerror = () => console.error("Nie udało się wczytać obrazu.");
    img.src = bg;
  }, [bg]);

  useEffect(() => {
    const currentIds = new Set(items.map((item) => item.id));
    plantImagesRef.current.forEach((_, key) => {
      if (!currentIds.has(key)) plantImagesRef.current.delete(key);
    });
    items.forEach((item) => {
      if (!plantImagesRef.current.has(item.id)) {
        const img = new Image();
        img.src = item.plant.imageUrl!;
        img.onload = () => redraw();
        plantImagesRef.current.set(item.id, img);
      }
    });
  }, [items]);

  useEffect(() => {
    if (!containerRef.current) return;
    resizeObsRef.current = new ResizeObserver(() => redraw());
    resizeObsRef.current.observe(containerRef.current);
    return () => resizeObsRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedId === null) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        setItems((prev) => prev.filter((item) => item.id !== selectedId));
        setSelectedId(null);
        redraw(items.filter((item) => item.id !== selectedId));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, items]);

  const redraw = (itemsToDraw?: CanvasItem[]) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const cssWidth = container.clientWidth;
    const cssHeight = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
    canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawCheckerboard(ctx, cssWidth, cssHeight);

    const bgImg = bgImageRef.current;
    if (bgImg) {
      const scale = Math.min(cssWidth / bgImg.width, cssHeight / bgImg.height);
      const drawW = bgImg.width * scale;
      const drawH = bgImg.height * scale;
      const dx = (cssWidth - drawW) / 2;
      const dy = (cssHeight - drawH) / 2;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bgImg, dx, dy, drawW, drawH);
    }

    const drawItems = itemsToDraw ?? items;
    drawItems.forEach((item) => {
      const img = plantImagesRef.current.get(item.id);
      if (!img) return;
      const size = 48;
      const x = item.x;
      const y = item.y;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
      ctx.restore();

      if (item.id === selectedId) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  };

  const drawCheckerboard = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number
  ) => {
    const size = 16;
    ctx.save();
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#e5e7eb";
    for (let y = 0; y < h; y += size) {
      for (let x = 0; x < w; x += size) {
        if ((x / size + y / size) % 2 === 0) {
          ctx.fillRect(x, y, size, size);
        }
      }
    }
    ctx.restore();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || selectedId === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedId ? { ...it, x: newX, y: newY } : it
      )
    );
    redraw();
  };

  const handleMouseUp = () => setDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const plantId = e.dataTransfer.getData("plantId");
    const plant = plants.find((p) => p.id.toString() === plantId);
    if (!plant || !containerRef.current) return;
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        plant,
        x: e.clientX - containerRef.current!.getBoundingClientRect().left,
        y: e.clientY - containerRef.current!.getBoundingClientRect().top,
      },
    ]);
  };

  const handleClickPlant = (id: string | number) => {
    if (selectedId === id) {
      setSelectedId(null);
      setDragging(false);
    } else {
      setSelectedId(id);
      setDragging(true);
    }
    redraw();
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const clickedItem = items.find(
      (item) => Math.hypot(clickX - item.x, clickY - item.y) <= 24
    );
    if (clickedItem) handleClickPlant(clickedItem.id);
    else {
      setSelectedId(null);
      setDragging(false);
      redraw();
    }
  };

  const handleRemoveBackground = () => {
    setBg(undefined);
    setItems([]);
    setSelectedId(null);
    bgImageRef.current = null;
    plantImagesRef.current.clear();
    redraw([]);
    if (setClearUpload) setClearUpload((prev) => !prev);
  };

  const handleSaveState = () => {
    const state = {
      bg,
      items,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    alert("Stan został zapisany");
  };

  const handleLoadState = () => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedState) return alert("Brak zapisanego stanu");

    const parsed = JSON.parse(savedState);
    if (parsed.bg) setBg(parsed.bg);
    if (parsed.items) {
      setItems(parsed.items);

      plantImagesRef.current.clear();
      parsed.items.forEach((item: CanvasItem) => {
        const img = new Image();
        img.src = item.plant.imageUrl!;
        img.onload = () => redraw();
        plantImagesRef.current.set(item.id, img);
      });

      redraw(parsed.items);
    }
    alert("Stan załadowany");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button onClick={handleRemoveBackground}>Wyczyść</button>
        <button onClick={handleSaveState}>Zapisz</button>
        <button onClick={handleLoadState}>Wczytaj</button>
      </div>

      <div
        ref={containerRef}
        className={`relative w-full h-[65vh] rounded-xl overflow-hidden ${
          className ?? ""
        }`}
        style={{ backgroundColor: "#f3f4f6", border: "1px solid #e5e7eb" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
}
