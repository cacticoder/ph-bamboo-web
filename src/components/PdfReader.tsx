/**
 * PdfReader — polished, canvas-rendered PDF reading experience built on
 * react-pdf (pdfjs-dist). Renders one page at a time so large PDFs stay
 * fast; only ever imported lazily by callers so pdfjs never ships to
 * routes that don't read a PDF.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Download,
  ExternalLink,
  X,
  Loader2,
  StretchHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

interface PdfReaderProps {
  pdfUrl: string;
  pdfFilename: string;
  title: string;
  onClose: () => void;
}

export function PdfReader({ pdfUrl, pdfFilename, title, onClose }: PdfReaderProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [fitMode, setFitMode] = useState<"width" | "page" | "custom">("width");
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [pageInput, setPageInput] = useState("1");

  const containerRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => setPageInput(String(pageNumber)), [pageNumber]);

  const goToPage = useCallback(
    (n: number) => {
      if (!numPages) return;
      setPageNumber(Math.min(Math.max(1, n), numPages));
    },
    [numPages],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goToPage(pageNumber - 1);
      else if (e.key === "ArrowRight") goToPage(pageNumber + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goToPage, pageNumber]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (shellRef.current) {
      void shellRef.current.requestFullscreen();
    }
  }, []);

  const zoomIn = () => {
    setFitMode("custom");
    setScale((s) => Math.min(MAX_SCALE, +(s + 0.2).toFixed(2)));
  };
  const zoomOut = () => {
    setFitMode("custom");
    setScale((s) => Math.max(MIN_SCALE, +(s - 0.2).toFixed(2)));
  };

  const pageProps = useMemo(() => {
    if (fitMode === "width" && containerSize.width > 0) {
      return { width: Math.min(containerSize.width - 16, 1400) };
    }
    if (fitMode === "page" && containerSize.height > 0) {
      return { height: containerSize.height - 16 };
    }
    return { scale };
  }, [fitMode, containerSize, scale]);

  const zoomPercent = fitMode === "custom" ? Math.round(scale * 100) : null;

  return (
    <div
      ref={shellRef}
      className="fixed inset-0 z-[60] flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — PDF reader`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 bg-card/80 backdrop-blur-sm px-3 py-2.5 md:px-4">
        <button
          onClick={onClose}
          aria-label="Close reader"
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-foreground/80 hover:bg-card hover:text-gold transition"
        >
          <X size={18} />
        </button>

        <h2
          className="min-w-0 flex-1 truncate font-display text-sm text-foreground md:text-base"
          title={title}
        >
          {title}
        </h2>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* Page navigation */}
          <div className="flex items-center gap-1 rounded-full border border-border/60 px-1 py-1">
            <button
              onClick={() => goToPage(pageNumber - 1)}
              disabled={pageNumber <= 1}
              aria-label="Previous page"
              className="grid h-7 w-7 place-items-center rounded-full text-foreground/80 hover:bg-card hover:text-gold transition disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={16} />
            </button>
            <form
              className="flex items-center gap-1 text-xs text-foreground/80"
              onSubmit={(e) => {
                e.preventDefault();
                goToPage(Number(pageInput) || 1);
              }}
            >
              <input
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ""))}
                onBlur={() => goToPage(Number(pageInput) || 1)}
                inputMode="numeric"
                aria-label="Current page"
                className="w-8 rounded border border-border/50 bg-background px-1 py-0.5 text-center"
              />
              <span>/ {numPages ?? "…"}</span>
            </form>
            <button
              onClick={() => goToPage(pageNumber + 1)}
              disabled={!numPages || pageNumber >= numPages}
              aria-label="Next page"
              className="grid h-7 w-7 place-items-center rounded-full text-foreground/80 hover:bg-card hover:text-gold transition disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Zoom */}
          <div className="flex items-center gap-1 rounded-full border border-border/60 px-1 py-1">
            <button
              onClick={zoomOut}
              aria-label="Zoom out"
              className="grid h-7 w-7 place-items-center rounded-full text-foreground/80 hover:bg-card hover:text-gold transition"
            >
              <ZoomOut size={15} />
            </button>
            <span className="w-10 text-center text-xs text-foreground/80">
              {zoomPercent ? `${zoomPercent}%` : "Fit"}
            </span>
            <button
              onClick={zoomIn}
              aria-label="Zoom in"
              className="grid h-7 w-7 place-items-center rounded-full text-foreground/80 hover:bg-card hover:text-gold transition"
            >
              <ZoomIn size={15} />
            </button>
          </div>

          <button
            onClick={() => setFitMode("width")}
            aria-label="Fit to width"
            title="Fit to width"
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full border transition",
              fitMode === "width"
                ? "border-gold text-gold bg-gold/10"
                : "border-border/60 text-foreground/80 hover:text-gold",
            )}
          >
            <StretchHorizontal size={16} />
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
            title={isFullscreen ? "Exit full screen" : "Full screen"}
            className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-foreground/80 hover:text-gold transition"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open PDF in a new tab"
            title="Open in new tab"
            className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-foreground/80 hover:text-gold transition"
          >
            <ExternalLink size={16} />
          </a>

          <a
            href={pdfUrl}
            download={pdfFilename}
            aria-label="Download PDF"
            title="Download PDF"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-gold px-3 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            <Download size={14} /> <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      {/* Page viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-muted/30 flex justify-center px-2 py-4 md:px-4"
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            setPageNumber((p) => Math.min(p, n));
          }}
          loading={
            <div className="flex h-full min-h-[50vh] items-center justify-center gap-2 text-foreground/70">
              <Loader2 className="animate-spin" size={22} />
              <span className="text-sm">Loading publication…</span>
            </div>
          }
          error={
            <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-3 text-center text-foreground/70">
              <p className="text-sm">This PDF couldn't be displayed inline.</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gold hover:underline"
              >
                Open it in a new tab instead
              </a>
            </div>
          }
          className="h-fit"
        >
          <Page
            key={pageNumber}
            pageNumber={pageNumber}
            {...pageProps}
            className="shadow-card"
            renderAnnotationLayer
            renderTextLayer
            loading={
              <div className="flex h-[60vh] w-[70vw] max-w-2xl items-center justify-center">
                <Loader2 className="animate-spin text-gold/70" size={24} />
              </div>
            }
          />
        </Document>
      </div>
    </div>
  );
}
