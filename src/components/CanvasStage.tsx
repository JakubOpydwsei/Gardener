import { useEffect, useRef } from "react";

type Props = {
  imageDataUrl: string | null;
  className?: string;
};

export default function CanvasStage({ imageDataUrl, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const resizeObsRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!imageDataUrl) {
      imageRef.current = null;
      redraw();
      return;
    }
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      redraw();
    };
    img.onerror = () => {
      console.error("Nie udało się wczytać obrazu.");
    };
    img.src = imageDataUrl;
  }, [imageDataUrl]);

  useEffect(() => {
    if (!containerRef.current) return;
    resizeObsRef.current = new ResizeObserver(() => {
      redraw();
    });
    resizeObsRef.current.observe(containerRef.current);
    return () => {
      resizeObsRef.current?.disconnect();
    };
  }, []);

  const redraw = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imageRef.current;
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

    if (!img) return;

    const scale = Math.min(cssWidth / img.width, cssHeight / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const dx = (cssWidth - drawW) / 2;
    const dy = (cssHeight - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, dx, dy, drawW, drawH);
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

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[65vh] rounded-xl overflow-hidden border border-gray-200 ${
        className ?? ""
      }`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
