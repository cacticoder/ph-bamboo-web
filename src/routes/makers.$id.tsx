import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Award } from "lucide-react";
import { MAKERS } from "@/data/site";
import { PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/makers/$id")({
  loader: ({ params }) => {
    const maker = MAKERS.find((m) => m.id === params.id);
    if (!maker) throw notFound();
    return { maker };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.maker.name} — phBMI Makers` },
          { name: "description", content: loaderData.maker.bio },
          { property: "og:title", content: loaderData.maker.name },
          { property: "og:description", content: loaderData.maker.bio },
          { property: "og:image", content: loaderData.maker.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl">Maker not found</h1>
        <Link to="/makers" className="mt-4 inline-block text-gold underline">Back to Makers</Link>
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
  component: MakerPage,
});

function MakerPage() {
  const { maker } = Route.useLoaderData();
  return (
    <article>
      <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
        <img src={maker.image} alt={maker.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative mx-auto max-w-4xl h-full px-4 md:px-8 flex flex-col justify-end pb-10">
          <Link to="/makers" className="inline-flex items-center gap-2 text-sm text-gold/90 hover:text-gold mb-4 w-fit">
            <ArrowLeft size={14} /> Back to Makers
          </Link>
          <div className="text-xs uppercase tracking-widest text-gold/80">{maker.region}</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-gold">{maker.name}</h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {maker.region}</span>
            <span className="inline-flex items-center gap-1.5"><Award size={12} /> {maker.expertise}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 md:px-8 py-14">
        <p className="text-lg text-foreground/85 leading-relaxed italic border-l-2 border-gold/50 pl-4">
          {maker.bio}
        </p>
        <div className="mt-10 space-y-6 text-foreground/85 leading-relaxed">
          {maker.body.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
