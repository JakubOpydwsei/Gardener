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
  const [bgSize, setBgSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const [showGrid, setShowGrid] = useState(true);
  const [smooth, setSmooth] = useState(true);
  const [plantSize, setPlantSize] = useState(56);

  useEffect(() => {
    if (!bg) {
      bgImageRef.current = null;
      setBgSize(null);
      redraw();
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      bgImageRef.current = img;
      setBgSize({ width: img.width, height: img.height });
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
        img.crossOrigin = "anonymous";
        img.src = item.plant.imageUrl!;
        img.onload = () => redraw();
        img.src = item.plant.imageUrl!;
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
  }, [selectedId, items, setItems]);

  useEffect(() => {
    redraw();
  }, [items, plantSize, showGrid, smooth, bgSize, bg]);

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

    if (showGrid) drawCheckerboard(ctx, cssWidth, cssHeight);

    const bgImg = bgImageRef.current;
    if (bgImg) {
      const scale = Math.min(cssWidth / bgImg.width, cssHeight / bgImg.height);
      const drawW = bgImg.width * scale;
      const drawH = bgImg.height * scale;
      const dx = (cssWidth - drawW) / 2;
      const dy = (cssHeight - drawH) / 2;
      ctx.imageSmoothingEnabled = smooth;
      ctx.imageSmoothingQuality = smooth ? "high" : "low";
      ctx.drawImage(bgImg, dx, dy, drawW, drawH);
    }

    const drawItems = itemsToDraw ?? items;
    drawItems.forEach((item) => {
      const img = plantImagesRef.current.get(item.id);
      if (!img) return;
      const size = plantSize;
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
        ctx.strokeStyle = "#111827";
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
    const plant = plants.find((p) => p._id.toString() === plantId);
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
      (item) => Math.hypot(clickX - item.x, clickY - item.y) <= plantSize / 2
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
    setBgSize(null);
    redraw([]);
    if (setClearUpload) setClearUpload((prev) => !prev);
  };

  const handleSaveState = () => {
    const state = {
      bg,
      items,
      plantSize,
      showGrid,
      smooth,
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

      const loadPromises: Promise<void>[] = [];

      parsed.items.forEach((item: CanvasItem) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        const p = new Promise<void>((resolve) => {
          img.onload = () => {
            resolve();
          };
          img.onerror = () => {
            console.log("Nie udało się wczytać obrazka rośliny", item);
            resolve();
          };
        });
        img.src = item.plant.imageUrl!;
        plantImagesRef.current.set(item.id, img);
        loadPromises.push(p);
      });
      Promise.all(loadPromises).then(() => {
        requestAnimationFrame(() => {
          redraw(parsed.items);
        });
      });
    }

    if (typeof parsed.plantSize === "number") setPlantSize(parsed.plantSize);
    if (typeof parsed.showGrid === "boolean") setShowGrid(parsed.showGrid);
    if (typeof parsed.smooth === "boolean") setSmooth(parsed.smooth);
    alert("Stan załadowany");
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "garden.png";
    a.click();
  };

  const handlePrintPlantList = () => {
    if (items.length === 0) {
      alert("Brak roślin na płótnie");
      return;
    }

    const plantCounts = items.reduce<Record<string, number>>((acc, item) => {
      const name = item.plant.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title></title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 24px
          }
          h1 {
            text-align: center;
            margin-bottom: 24px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px 12px;
            text-align: left;
          }
          th {
            background: #f3f4f6;
          }
        </style>
      </head>
      <body>
          <h1>Lita roślin w ogrodzie</h1>
          <table>
          <thead>
            <tr>
              <th>Nazwa rośliny</th>
              <th>Ilość</th>
            </tr>
          </thead>
          <tbody>
          ${Object.entries(plantCounts)
            .map(
              ([name, count]) => `
          <tr>
            <td>${name}</td>
            <td>${count}</td>
          </tr>
          `
            )
            .join("")}
    <tbody/>
    <table/>
      </body>
    </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="flex flex-col justify-center">
      <div
        ref={containerRef}
        className={`relative w-full rounded-xl overflow-hidden ${
          !bgSize ? "h-[70vh]" : ""
        } border border-base-300`}
        style={{
          backgroundColor: "#f3f4f6",
          aspectRatio: bgSize
            ? `${bgSize.width} / ${bgSize.height}`
            : undefined,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
      >
        {!bg && items.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-base-content/70">
            <div className="bg-base-100/80 backdrop-blur p-4 rounded-lg border border-base-300 text-center">
              <p className="font-medium">
                Przed rozpoczęciem wgraj obraz działki
              </p>
              <p className="text-sm mt-1">
                Przeciągnij rośliny z panelu po lewej
              </p>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-center mt-6">
        <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2">
          <span className="text-sm">Rozmiar roślin</span>
          <input
            type="range"
            min={32}
            max={96}
            value={plantSize}
            onChange={(e) => {
              setPlantSize(parseInt(e.target.value, 10));
              redraw();
            }}
            className="range range-xs"
          />
          <span className="text-sm w-10 text-right">{plantSize}px</span>
        </div>

        <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2">
          <label className="label cursor-pointer">
            <span className="label-text mr-2">Siatka</span>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={showGrid}
              onChange={(e) => {
                setShowGrid(e.target.checked);
                redraw();
              }}
            />
          </label>
        </div>

        <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2">
          <label className="label cursor-pointer">
            <span className="label-text mr-2">Wygładzanie</span>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={smooth}
              onChange={(e) => {
                setSmooth(e.target.checked);
                redraw();
              }}
            />
          </label>
        </div>

        <button
          onClick={handleSaveState}
          className="btn btn-primary text-black"
          title="Zapisz projekt"
        >
          Zapisz
        </button>

        <button
          onClick={handlePrintPlantList}
          className="btn btn-outline"
          title="Drukuj listę roślin"
        >
          Drukuj listę roślin
        </button>

        <button
          onClick={handleLoadState}
          className="btn btn-success text-black"
          title="Wczytaj zapisany projekt"
        >
          Wczytaj
        </button>
        <button
          onClick={handleRemoveBackground}
          className="btn btn-error text-black"
          title="Wyczyść płótno i tło"
        >
          Wyczyść
        </button>
        <button
          onClick={handleExportPNG}
          className="btn"
          title="Eksportuj obraz płótna do PNG"
        >
          Eksport PNG
        </button>
      </div>
    </div>
  );
}
