import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react";
import { ARTICLES } from "@/data/articles";
import { PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = ARTICLES.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title} — phBMI` },
          { name: "description", content: loaderData.article.excerpt },
          { property: "og:title", content: loaderData.article.title },
          { property: "og:description", content: loaderData.article.excerpt },
          { property: "og:image", content: loaderData.article.cover },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl">Article not found</h1>
        <Link to="/" className="mt-4 inline-block text-gold underline">Back home</Link>
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
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  return (
    <article>
      <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
        <img src={article.cover} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative mx-auto max-w-4xl h-full px-4 md:px-8 flex flex-col justify-end pb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gold/90 hover:text-gold mb-4 w-fit">
            <ArrowLeft size={14} /> Back to articles
          </Link>
          <div className="text-xs uppercase tracking-widest text-gold/80">{article.region}</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-gold">{article.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><User size={12} /> {article.author}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {article.region}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 md:px-8 py-14">
        <p className="text-lg text-foreground/85 leading-relaxed italic border-l-2 border-gold/50 pl-4">
          {article.excerpt}
        </p>
        <div className="mt-10 space-y-6 text-foreground/85 leading-relaxed">
          {article.body.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {article.gallery && article.gallery.length > 0 && (
          <div className="mt-14">
            <div className="text-xs uppercase tracking-widest text-gold/80">Photo Gallery</div>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {article.gallery.map((g: { src: string; caption: string }) => (
                <figure key={g.src} className="overflow-hidden rounded-2xl border border-border/50 shadow-card">
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <figcaption className="px-4 py-3 text-xs text-muted-foreground">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 rounded-2xl border border-border/50 gradient-card p-6 shadow-card">
          <div className="text-xs uppercase tracking-widest text-gold/80">APA Citation</div>
          <p className="mt-2 text-sm font-mono text-foreground/80 break-words">
            phBMI Editorial. ({article.date.match(/\d{4}/)?.[0] ?? "2024"}). {article.title}. Philippine Bamboo Musical Instruments Program. {typeof window !== "undefined" ? window.location.href : `https://phbmi.gov.ph/articles/${article.slug}`}
          </p>
        </div>
      </div>
    </article>
  );
}
