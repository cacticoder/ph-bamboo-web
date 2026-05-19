import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface GalleryTile {
  title: string;
  caption?: string;
  icon?: LucideIcon;
  tone?: "bamboo" | "earth" | "plum" | "gold";
}

const TONES: Record<NonNullable<GalleryTile["tone"]>, string> = {
  bamboo: "from-bamboo/60 via-bamboo/30 to-earth/40",
  earth: "from-earth/60 via-earth/30 to-plum/30",
  plum: "from-plum/60 via-plum/30 to-earth/40",
  gold: "from-gold/40 via-gold/20 to-earth/30",
};

export function ImageGallery({ tiles, columns = 3 }: { tiles: GalleryTile[]; columns?: 2 | 3 | 4 }) {
  const cols = columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid ${cols} gap-4`}>
      {tiles.map((t, i) => {
        const Icon = t.icon;
        const tone = TONES[t.tone ?? (["bamboo", "earth", "plum", "gold"][i % 4] as NonNullable<GalleryTile["tone"]>)];
        return (
          <motion.figure
            key={`${t.title}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 shadow-card"
          >
            <div className={`aspect-[4/3] bg-gradient-to-br ${tone} texture-bamboo relative grid place-items-center`}>
              {Icon ? <Icon size={56} className="text-gold/70 drop-shadow" /> : <span className="font-display text-5xl text-gold/40">{t.title[0]}</span>}
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
              <div className="font-display text-gold text-base">{t.title}</div>
              {t.caption && <div className="text-xs text-foreground/80 mt-0.5 line-clamp-2">{t.caption}</div>}
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
}
