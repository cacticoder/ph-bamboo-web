import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Award, Quote, Calendar, Sparkles } from "lucide-react";
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
  const others = MAKERS.filter((m) => m.id !== maker.id).slice(0, 3);

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={maker.image} alt={maker.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/20" />
        <div className="relative mx-auto max-w-5xl h-full px-4 md:px-8 flex flex-col justify-end pb-12">
          <Link to="/makers" className="inline-flex items-center gap-2 text-sm text-gold/90 hover:text-gold mb-4 w-fit">
            <ArrowLeft size={14} /> Back to Makers
          </Link>
          <div className="text-xs uppercase tracking-widest text-gold/80">Tradition Bearer</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl leading-tight text-gold">{maker.name}</h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {maker.region}</span>
            <span className="inline-flex items-center gap-1.5"><Award size={12} /> {maker.expertise}</span>
            {maker.born && <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> {maker.born}</span>}
          </div>
        </div>
      </div>

      {/* Body + sidebar */}
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-14 grid lg:grid-cols-[1fr_280px] gap-12">
        <div>
          <p className="text-lg text-foreground/85 leading-relaxed italic border-l-2 border-gold/50 pl-4">
            {maker.bio}
          </p>

          <div className="mt-10 space-y-6 text-foreground/85 leading-relaxed">
            {maker.body.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {maker.quote && (
            <blockquote className="mt-12 rounded-2xl border border-gold/30 gradient-card p-6 md:p-8 shadow-card">
              <Quote className="text-gold/60 mb-3" size={28} />
              <p className="font-display text-2xl md:text-3xl text-gold leading-snug">"{maker.quote}"</p>
              <footer className="mt-4 text-sm text-muted-foreground">— {maker.name}</footer>
            </blockquote>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-card">
            <img src={maker.image} alt={maker.name} className="w-full aspect-[3/4] object-cover" />
          </div>

          <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
            <div className="text-[10px] uppercase tracking-widest text-gold/80">Profile</div>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Region</dt>
                <dd className="text-foreground/90">{maker.region}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Expertise</dt>
                <dd className="text-foreground/90">{maker.expertise}</dd>
              </div>
              {maker.born && (
                <div>
                  <dt className="text-muted-foreground">Born</dt>
                  <dd className="text-foreground/90">{maker.born}</dd>
                </div>
              )}
            </dl>
          </div>

          {maker.signature && maker.signature.length > 0 && (
            <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/80">
                <Sparkles size={12} /> Signature Works
              </div>
              <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                {maker.signature.map((s: string) => (
                  <li key={s} className="flex gap-2"><span className="text-gold">•</span>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* More makers */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 pb-20">
        <h2 className="font-display text-2xl text-gold mb-6">More Makers</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {others.map((m) => (
            <Link key={m.id} to="/makers/$id" params={{ id: m.id }} className="group rounded-2xl overflow-hidden border border-border/50 gradient-card shadow-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={m.image} alt={m.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.region}</div>
                <h3 className="font-display text-lg text-gold mt-1">{m.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
