import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Leaf, MapPin, Music2, Sprout, X } from "lucide-react";
import { SPECIES, fieldNotesFor } from "@/data/species";
import { PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/species/$id")({
  loader: ({ params }) => {
    const species = SPECIES.find((s) => s.id === params.id);
    if (!species) throw notFound();
    return { species, fieldNotes: fieldNotesFor(species.id) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.species.commonName} — phBMI Bamboo Species` },
          { name: "description", content: loaderData.species.description },
          { property: "og:title", content: loaderData.species.commonName },
          { property: "og:description", content: loaderData.species.description },
          ...(loaderData.species.image
            ? [{ property: "og:image", content: loaderData.species.image }]
            : []),
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl">Species not found</h1>
        <Link to="/species" className="mt-4 inline-block text-gold underline">
          Back to Species
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
  component: SpeciesDetailPage,
});

function SpeciesDetailPage() {
  const { species, fieldNotes } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const alsoKnownAs = species.commonNames.length > 0 ? species.commonNames.join(" · ") : undefined;

  return (
    <article>
      <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
        {species.image ? (
          <img
            src={species.image}
            alt={species.commonName}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-bamboo/50 via-earth/40 to-plum/30 texture-bamboo grid place-items-center">
            <Sprout size={64} className="text-gold/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative mx-auto max-w-4xl h-full px-4 md:px-8 flex flex-col justify-end pb-10">
          <Link
            to="/species"
            className="inline-flex items-center gap-2 text-sm text-gold/90 hover:text-gold mb-4 w-fit"
          >
            <ArrowLeft size={14} /> Back to Species
          </Link>
          {alsoKnownAs && (
            <div className="text-xs uppercase tracking-widest text-gold/80">{alsoKnownAs}</div>
          )}
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-gold">
            {species.commonName}
          </h1>
          <div className="italic text-muted-foreground mt-1">{species.scientificName}</div>
          {species.localName && (
            <div className="text-sm text-muted-foreground mt-1">
              Local name: {species.localName}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 md:px-8 py-14">
        <p className="text-lg text-foreground/85 leading-relaxed italic border-l-2 border-gold/50 pl-4">
          {species.description}
        </p>

        {species.distinguishingFeatures && (
          <p className="mt-4 text-foreground/80 leading-relaxed">
            <span className="text-gold/90 font-display">Distinguishing features: </span>
            {species.distinguishingFeatures}
          </p>
        )}

        <div className="mt-8 grid sm:grid-cols-2 gap-3 text-sm">
          {species.habitat && (
            <div className="rounded-lg bg-card/60 p-4 border border-border/50">
              <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
                <MapPin size={12} /> Habitat
              </div>
              <div className="mt-1">{species.habitat}</div>
            </div>
          )}
          {species.distribution && (
            <div className="rounded-lg bg-card/60 p-4 border border-border/50">
              <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5">
                <Leaf size={12} /> Distribution
              </div>
              <div className="mt-1">{species.distribution}</div>
            </div>
          )}
          {species.economicImportance && (
            <div className="rounded-lg bg-card/60 p-4 sm:col-span-2 border border-border/50">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Economic Importance
              </div>
              <div className="mt-1">{species.economicImportance}</div>
            </div>
          )}
          {species.collectionLocation && (
            <div className="rounded-lg bg-card/60 p-4 sm:col-span-2 border border-border/50">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Collection Location
              </div>
              <div className="mt-1">{species.collectionLocation}</div>
            </div>
          )}
          {species.basionym && (
            <div className="rounded-lg bg-card/60 p-4 sm:col-span-2 border border-border/50">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Basionym</div>
              <div className="mt-1 italic">{species.basionym}</div>
            </div>
          )}
          {species.synonyms && species.synonyms.length > 0 && (
            <div className="rounded-lg bg-card/60 p-4 sm:col-span-2 border border-border/50">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Taxonomic Synonyms
              </div>
              <div className="mt-1 italic">{species.synonyms.join("; ")}</div>
            </div>
          )}
        </div>

        {species.instruments.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl text-gold inline-flex items-center gap-2">
              <Music2 size={16} /> Instruments Made From This Bamboo
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {species.instruments.map((ins) =>
                ins.instrumentId ? (
                  <Link
                    key={ins.label}
                    to="/gallery"
                    search={{ instrument: ins.instrumentId }}
                    className="text-sm rounded-full border border-border/60 px-3 py-1.5 text-foreground/85 hover:border-gold hover:text-gold transition-colors"
                  >
                    {ins.label}
                  </Link>
                ) : (
                  <span
                    key={ins.label}
                    className="text-sm rounded-full border border-border/60 px-3 py-1.5 text-foreground/70"
                  >
                    {ins.label}
                  </span>
                ),
              )}
            </div>
          </section>
        )}

        {species.gallery.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl text-gold">Gallery</h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {species.gallery.map((g) => (
                <button
                  key={g.src}
                  onClick={() => setLightbox(g.src)}
                  className="group relative overflow-hidden rounded-xl border border-border/60 hover:border-gold/60 transition-colors"
                  aria-label={`Enlarge ${g.caption}`}
                >
                  <img
                    src={g.src}
                    alt={g.caption}
                    className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="px-2 py-1 text-[10px] text-foreground/80 bg-background/70 group-hover:text-gold">
                    {g.caption}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {fieldNotes.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl text-gold">From the Field</h2>
            <div className="mt-3 space-y-4">
              {fieldNotes.map((note) => (
                <div key={note.title} className="rounded-lg bg-card/60 p-4 border border-border/50">
                  <div className="font-display text-gold/90">{note.title}</div>
                  <p className="mt-1 text-sm text-foreground/85 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-foreground/80 hover:text-gold"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt="Enlarged species photo"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
