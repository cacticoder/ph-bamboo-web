import bagoboTagabawaCover from "@/assets/videos/bagobo-tagabawa-cover.png";
import kalingaLubuaganCover from "@/assets/videos/kalinga-lubuagan-cover.png";
import majukayongCover from "@/assets/videos/majukayong-cover.png";
import tboliCover from "@/assets/videos/tboli-cover.png";

export interface FeaturedVideo {
  id: string;
  title: string;
  youtubeId: string;
  cover: string;
  category: "produced" | "training";
}

export const FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    id: "bagobo-tagabawa",
    title: "Bamboo Musical Instruments featuring Masters of Bagobo-Tagabawa",
    youtubeId: "zDH3qG0JcPM",
    cover: bagoboTagabawaCover,
    category: "produced",
  },
  {
    id: "kalinga-lubuagan",
    title: "Bamboo Musical Instruments featuring Masters of Kalinga (Lubuagan sub-tribe)",
    youtubeId: "KvnMxmVvFIs",
    cover: kalingaLubuaganCover,
    category: "produced",
  },
  {
    id: "majukayong",
    title: "Bamboo Musical Instruments featuring Masters of Majukayong",
    youtubeId: "ZtVqXtusbEM",
    cover: majukayongCover,
    category: "produced",
  },
  {
    id: "tboli",
    title: "Bamboo Musical Instruments featuring Tboli",
    youtubeId: "mbNamIyTvdk",
    cover: tboliCover,
    category: "produced",
  },
  {
    id: "teachers-training",
    title: "Guro, Kawayan, at Musika: A Training on Bamboo Musical Instruments Making and Tuning",
    youtubeId: "kCV6NIheJN8",
    cover: `https://i.ytimg.com/vi/kCV6NIheJN8/hqdefault.jpg`,
    category: "training",
  },
];
