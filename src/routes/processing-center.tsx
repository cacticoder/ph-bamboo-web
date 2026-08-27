import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Play,
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  FileText,
  Download,
  ExternalLink,
  Factory,
  Landmark,
  GraduationCap,
  Wrench,
  Microscope,
  Music2,
} from "lucide-react";
import { PageHero, PageShell } from "@/components/PageHero";
import { ImageGallery } from "@/components/ImageGallery";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  FACILITY_VIDEO,
  BROCHURE,
  BMIPC_INTRO,
  BMIPC_USES,
  BMIPC_CONTACT,
  BMIPC_SERVICES,
} from "@/data/processing-center";

const FACILITY_GALLERY = [
  {
    title: "Manufacturing Floor",
    caption: "CNC-assisted cutting paired with traditional hand-finishing.",
    icon: Factory,
    tone: "earth" as const,
  },
  {
    title: "Mini Museum",
    caption: "Permanent exhibit of regional bamboo instrument traditions.",
    icon: Landmark,
    tone: "plum" as const,
  },
  {
    title: "Training Studios",
    caption: "Workshops for educators, makers, and student ensembles.",
    icon: GraduationCap,
    tone: "bamboo" as const,
  },
  {
    title: "Tool Bench",
    caption: "Custom jigs and tuning rigs developed in-house.",
    icon: Wrench,
    tone: "gold" as const,
  },
  {
    title: "Acoustic Lab",
    caption: "Anechoic measurements for every instrument leaving the facility.",
    icon: Microscope,
    tone: "earth" as const,
  },
  {
    title: "Performance Hall",
    caption: "On-site venue for premieres and recordings.",
    icon: Music2,
    tone: "plum" as const,
  },
];

const STATS = [
  { value: "1,200+", label: "Instruments produced annually" },
  { value: "18", label: "Resident artisans & researchers" },
  { value: "42", label: "Educator workshops hosted" },
  { value: "9", label: "Regions reached through outreach" },
];

export const Route = createFileRoute("/processing-center")({
  head: () => ({
    meta: [
      { title: "BMI Processing Center — phBMI" },
      {
        name: "description",
        content:
          "The Bamboo Musical Instruments Processing Center (BMIPC), a DOST-FPRDI facility for processing, prototyping, training, and the mini museum tour — with contact details and facility brochure.",
      },
    ],
  }),
  component: ProcessingCenterPage,
});

function ProcessingCenterPage() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <PageShell>
      <PageHero kicker="BMIPC" title="BMI Processing Center" lead={BMIPC_INTRO} />

      {/* Featured Facility Video */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-gold">Featured Facility Video</h2>
        <div className="mt-5 max-w-4xl">
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={`Play video: ${FACILITY_VIDEO.title}`}
            className="group relative block w-full aspect-video overflow-hidden rounded-2xl border border-border/50 shadow-card bg-black"
          >
            <img
              src={FACILITY_VIDEO.cover}
              alt={FACILITY_VIDEO.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-full bg-forest/90 text-primary-foreground shadow-glow backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-forest">
                <Play className="h-7 w-7 md:h-8 md:w-8 fill-current ml-1" />
              </span>
            </div>
          </button>
        </div>

        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="max-w-4xl w-[calc(100%-2rem)] p-0 overflow-hidden border-border/50 bg-black gap-0">
            <DialogTitle className="sr-only">{FACILITY_VIDEO.title}</DialogTitle>
            {videoOpen && (
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full border-0"
                  src={`https://www.youtube.com/embed/${FACILITY_VIDEO.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={FACILITY_VIDEO.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* Processing Center Information */}
      <section className="mt-16">
        <h2 className="font-display text-2xl text-gold">Processing Center Information</h2>

        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {BMIPC_USES.map((u) => (
            <div
              key={u.label}
              className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card"
            >
              <h3 className="font-display text-base text-foreground">{u.label}</h3>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{u.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_1fr] gap-6">
          <div className="rounded-2xl border border-gold/30 gradient-card p-6 shadow-card">
            <div className="text-[10px] uppercase tracking-widest text-gold/80">
              Contact Directory
            </div>
            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{BMIPC_CONTACT.intro}</p>

            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex gap-3">
                <User size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wide">
                    Primary Contact
                  </dt>
                  <dd className="text-foreground/90 mt-0.5">{BMIPC_CONTACT.primaryContact.name}</dd>
                  <dd className="text-foreground/70 text-xs mt-0.5">
                    {BMIPC_CONTACT.primaryContact.org}
                  </dd>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wide">Address</dt>
                  <dd className="text-foreground/90 mt-0.5">{BMIPC_CONTACT.address.name}</dd>
                  {BMIPC_CONTACT.address.lines.map((line) => (
                    <dd key={line} className="text-foreground/70 text-xs mt-0.5">
                      {line}
                    </dd>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Phone size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wide">
                    Telephone (Trunklines)
                  </dt>
                  {BMIPC_CONTACT.phones.map((ph) => (
                    <dd key={ph} className="text-foreground/90 mt-0.5">
                      {ph}
                    </dd>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Mail size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wide">
                    General Email Inquiry
                  </dt>
                  <dd className="mt-0.5">
                    <a href={`mailto:${BMIPC_CONTACT.email}`} className="text-gold hover:underline">
                      {BMIPC_CONTACT.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-3">
                <Globe size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wide">
                    Official Website
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href={BMIPC_CONTACT.website.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold hover:underline"
                    >
                      {BMIPC_CONTACT.website.label}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 pt-5 border-t border-border/50">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <Mail size={14} /> Contact Us
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 gradient-card p-6 shadow-card">
            <div className="text-[10px] uppercase tracking-widest text-gold/80">
              Services &amp; How to Collaborate
            </div>
            <ul className="mt-4 space-y-4">
              {BMIPC_SERVICES.map((s) => (
                <li key={s.label}>
                  <h3 className="font-display text-base text-foreground">{s.label}</h3>
                  <p className="mt-1 text-sm text-foreground/80 leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Brochure */}
      <section className="mt-16 rounded-2xl border border-gold/30 gradient-card p-6 md:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
            <FileText size={26} />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-2xl text-gold">Processing Center Brochure</h2>
            <p className="mt-1 text-sm text-foreground/80">
              The official BMIPC brochure, available to view or download as a PDF.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={BROCHURE.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10"
            >
              <ExternalLink size={14} /> View PDF
            </a>
            <a
              href={BROCHURE.url}
              download={BROCHURE.filename}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Download size={14} /> Download Brochure (PDF)
            </a>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-gold">Inside the Center</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Six interlocking spaces under one roof.
        </p>
        <div className="mt-5">
          <ImageGallery tiles={FACILITY_GALLERY} columns={3} />
        </div>
      </section>

      <section className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card text-center"
          >
            <div className="font-display text-3xl text-gold">{s.value}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
              {s.label}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
