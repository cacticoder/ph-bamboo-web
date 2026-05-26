import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Leaf, MapPin } from "lucide-react";
import { SPECIES } from "@/data/site";
import { PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/species/$id")({
  loader: ({ params }) => {
    const species = SPECIES.find((s) => s.id === params.id);
    if (!species) throw notFound();
    return { species };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.species.common} — phBMI Bamboo Species` },
          { name: "description", content: loaderData.species.description },
          { property: "og:title", content: loaderData.species.common },
          { property: "og:description", content: loaderData.species.description },
          { property: "og:image", content: loaderData.species.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl">Species not found</h1>
        <Link to="/species" className="mt-4 inline-block text-gold underline">Back to Species</Link>
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
  component: SpeciesPage,
});

function SpeciesPage() {
  const { species } = Route.useLoaderData();
  return (
    <article>
      <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
        <img src={species.image} alt={species.common} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative mx-auto max-w-4xl h-full px-4 md:px-8 flex flex-col justify-end pb-10">
          <Link to="/species" className="inline-flex items-center gap-2 text-sm text-gold/90 hover:text-gold mb-4 w-fit">
            <ArrowLeft size={14} /> Back to Species
          </Link>
          <div className="text-xs uppercase tracking-widest text-gold/80">{species.synonyms.join(" · ")}</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-gold">{species.common}</h1>
          <div className="italic text-muted-foreground mt-1">{species.scientific}</div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 md:px-8 py-14">
        <p className="text-lg text-foreground/85 leading-relaxed italic border-l-2 border-gold/50 pl-4">
          {species.description}
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-card/60 p-4 border border-border/50">
            <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><MapPin size={12}/> Habitat</div>
            <div className="mt-1">{species.habitat}</div>
          </div>
          <div className="rounded-lg bg-card/60 p-4 border border-border/50">
            <div className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1.5"><Leaf size={12}/> Distribution</div>
            <div className="mt-1">{species.distribution}</div>
          </div>
          <div className="rounded-lg bg-card/60 p-4 sm:col-span-2 border border-border/50">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Economic Importance</div>
            <div className="mt-1">{species.economic}</div>
          </div>
        </div>

        <div className="mt-10 space-y-6 text-foreground/85 leading-relaxed">
          {species.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
