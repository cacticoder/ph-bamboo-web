import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { RND_TECHNOLOGIES, type RndStep } from "@/data/rnd";
import { PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/rnd/$id")({
  loader: ({ params }) => {
    const tech = RND_TECHNOLOGIES.find((t) => t.id === params.id);
    if (!tech) throw notFound();
    return { tech };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.tech.title} — R&D Technologies — phBMI` },
          { name: "description", content: loaderData.tech.cardSummary },
          { property: "og:title", content: loaderData.tech.title },
          { property: "og:description", content: loaderData.tech.cardSummary },
          ...(loaderData.tech.cover
            ? [{ property: "og:image", content: loaderData.tech.cover }]
            : []),
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl">Technology not found</h1>
        <Link to="/rnd" className="mt-4 inline-block text-gold underline">
          Back to R&amp;D Technologies
        </Link>
      </div>
    </PageShell>
  ),
  errorComponent: ({ error }) => (
    <PageShell>
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </PageShell>
  ),
  component: RndDetailPage,
});

function StepBlock({ step, index }: { step: RndStep; index: number }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 grid h-8 w-8 place-items-center rounded-full bg-gold/15 text-gold font-display text-sm">
        {index + 1}
      </div>
      <div className="flex-1 pb-1">
        <h4 className="font-display text-base md:text-lg text-foreground">{step.label}</h4>
        <p className="mt-1 text-sm md:text-base text-foreground/80 leading-relaxed">{step.text}</p>
        {step.subItems && step.subItems.length > 0 && (
          <ul className="mt-3 space-y-2 border-l-2 border-gold/30 pl-4">
            {step.subItems.map((sub, i) => (
              <li key={i} className="text-sm text-foreground/80 leading-relaxed">
                {sub.label && <span className="font-semibold text-foreground">{sub.label}: </span>}
                {sub.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function RndDetailPage() {
  const { tech } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const others = RND_TECHNOLOGIES.filter((t) => t.id !== tech.id);

  return (
    <article>
      <div className="relative w-full overflow-hidden">
        {tech.cover ? (
          <div className="relative h-[45vh] min-h-[320px]">
            <img
              src={tech.cover}
              alt={tech.title}
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
          </div>
        ) : (
          <div className="relative h-[32vh] min-h-[220px] bg-gradient-to-br from-bamboo/40 via-earth/30 to-plum/30 texture-bamboo">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
          </div>
        )}
        <div className="absolute inset-0 flex items-end">
          <div className="relative mx-auto max-w-5xl w-full h-full px-4 md:px-8 flex flex-col justify-end pb-10">
            <Link
              to="/rnd"
              className="inline-flex items-center gap-2 text-sm text-gold/90 hover:text-gold mb-4 w-fit"
            >
              <ArrowLeft size={14} /> Back to R&amp;D Technologies
            </Link>
            <div className="text-xs uppercase tracking-widest text-gold/80">
              Technology {tech.number.toString().padStart(2, "0")}
            </div>
            <h1 className="mt-3 font-display text-3xl md:text-5xl leading-tight text-gold">
              {tech.title}
            </h1>
            <p className="mt-3 text-sm md:text-base italic text-foreground/85 max-w-3xl">
              {tech.technologyTitle}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 md:px-8 py-14">
        <section>
          <h2 className="font-display text-2xl text-gold flex items-center gap-2">
            <FlaskConical size={20} /> Introduction
          </h2>
          <p className="mt-4 text-foreground/85 leading-relaxed">{tech.introduction}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-gold">What Is It?</h2>
          <p className="mt-4 text-foreground/85 leading-relaxed">{tech.whatIsIt}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-gold">How It Works</h2>
          {tech.howItWorksIntro && (
            <p className="mt-3 text-foreground/80 leading-relaxed">{tech.howItWorksIntro}</p>
          )}
          <div className="mt-6 space-y-6">
            {tech.howItWorks.map((step, i) => (
              <StepBlock key={i} step={step} index={i} />
            ))}
          </div>
        </section>

        <section className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border/50 gradient-card p-6 shadow-card">
            <h3 className="font-display text-xl text-gold flex items-center gap-2">
              <ListChecks size={18} /> Key Features and Benefits
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground/85">
              {tech.keyFeatures.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-gold flex-shrink-0">•</span>
                  <span>
                    <span className="font-semibold text-foreground">{f.label}: </span>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/50 gradient-card p-6 shadow-card">
            <h3 className="font-display text-xl text-gold flex items-center gap-2">
              <Target size={18} /> Applications
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground/85">
              {tech.applications.map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-gold flex-shrink-0">•</span>
                  <span>
                    <span className="font-semibold text-foreground">{a.label}: </span>
                    {a.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gold/30 gradient-card p-6 md:p-8 shadow-card">
          <h3 className="font-display text-xl text-gold flex items-center gap-2">
            <Sparkles size={18} /> R&amp;D Highlights
          </h3>
          <p className="mt-3 text-foreground/85 leading-relaxed">{tech.rndHighlights}</p>
        </section>

        <section className="mt-10">
          <h3 className="font-display text-xl text-gold flex items-center gap-2">
            <Lightbulb size={18} /> Why It Matters
          </h3>
          <p className="mt-3 text-foreground/85 leading-relaxed">{tech.whyItMatters}</p>
        </section>

        {tech.id === "value-chain-analysis" && (
          <section className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-6 md:p-8">
            <p className="text-foreground/85 leading-relaxed">
              Explore the full, unshortened Value Chain Analysis — including market segmentation,
              pricing mechanics, support services, and the business enabling environment.
            </p>
            <Link
              to="/value-chain"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
            >
              Read the Full Value Chain Analysis <ArrowRight size={14} />
            </Link>
          </section>
        )}

        {tech.gallery.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl text-gold">Gallery</h2>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tech.gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(src)}
                  className="aspect-[4/3] overflow-hidden rounded-xl border border-border/50 shadow-card"
                  aria-label={`View ${tech.title} photo ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`${tech.title} — photo ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 text-white/80 hover:text-white"
            aria-label="Close image"
          >
            <X size={28} />
          </button>
          <img
            src={lightbox}
            alt={tech.title}
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>
      )}

      <section className="mx-auto max-w-6xl px-4 md:px-8 pb-20 pt-4">
        <h2 className="font-display text-2xl text-gold mb-6">More R&amp;D Technologies</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {others.map((t) => (
            <Link
              key={t.id}
              to="/rnd/$id"
              params={{ id: t.id }}
              className="group rounded-2xl overflow-hidden border border-border/50 gradient-card shadow-card"
            >
              {t.cover ? (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={t.cover}
                    alt={t.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-bamboo/40 via-earth/30 to-plum/30 texture-bamboo">
                  <FlaskConical size={28} className="text-gold/70" />
                </div>
              )}
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Technology {t.number.toString().padStart(2, "0")}
                </div>
                <h3 className="font-display text-base text-gold mt-1 leading-snug">{t.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
