import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { BookOpen, Download, Loader2, User, Building2, Hash } from "lucide-react";
import { FEATURED_PUBLICATION } from "@/data/publications";

const PdfReader = lazy(() =>
  import("@/components/PdfReader").then((m) => ({ default: m.PdfReader })),
);

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — phBMI" },
      {
        name: "description",
        content:
          "Publications and reading resources on Philippine bamboo musical instruments, including the Tradition and Innovation coffee table book from the UP Center for Ethnomusicology.",
      },
    ],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  const [reading, setReading] = useState(false);
  const pub = FEATURED_PUBLICATION;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.25em] text-gold/80">Resources</div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-gold">Publications</h1>
        <p className="mt-4 text-foreground/80">
          Books, essays, and research on the people, places, and practices of Philippine bamboo
          music.
        </p>
      </div>

      {/* Featured Publication */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-gold">Featured Publication</h2>
        <div className="mt-5 rounded-2xl border border-gold/30 gradient-card shadow-card overflow-hidden grid md:grid-cols-[280px_1fr]">
          <div className="relative aspect-[3/4] md:aspect-auto bg-gradient-to-br from-bamboo/40 to-plum/40 texture-bamboo flex items-center justify-center border-b md:border-b-0 md:border-r border-border/50">
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <BookOpen size={40} className="text-gold/70" />
              <span className="text-[10px] uppercase tracking-widest text-gold/70">
                Coffee Table Book
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-gold/80">
              {pub.linkTitle}
            </span>
            <h3 className="mt-2 font-display text-2xl md:text-3xl text-gold leading-snug">
              {pub.title}
            </h3>

            <dl className="mt-4 space-y-2 text-sm text-foreground/85">
              <div className="flex items-start gap-2">
                <User size={14} className="mt-0.5 flex-shrink-0 text-gold/70" />
                <dd>{pub.author}</dd>
              </div>
              <div className="flex items-start gap-2">
                <Building2 size={14} className="mt-0.5 flex-shrink-0 text-gold/70" />
                <dd>{pub.publisher}</dd>
              </div>
              <div className="flex items-start gap-2">
                <Hash size={14} className="mt-0.5 flex-shrink-0 text-gold/70" />
                <dd>ISBN {pub.isbn}</dd>
              </div>
            </dl>

            <p className="mt-4 text-sm text-foreground/80 leading-relaxed flex-1">
              {pub.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setReading(true)}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
              >
                <BookOpen size={15} /> Read Online
              </button>
              <a
                href={pub.pdfUrl}
                download={pub.pdfFilename}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10 transition"
              >
                <Download size={15} /> Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {reading && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[60] flex items-center justify-center gap-2 bg-background text-foreground/70">
              <Loader2 className="animate-spin" size={22} />
              <span className="text-sm">Loading reader…</span>
            </div>
          }
        >
          <PdfReader
            pdfUrl={pub.pdfUrl}
            pdfFilename={pub.pdfFilename}
            title={pub.title}
            onClose={() => setReading(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
