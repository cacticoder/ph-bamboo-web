import kawayCoverUrl from "@/assets/Kaway-Kawayan Volume 1-spread (Elem) Hi-res.jpg";
import bambooOrganPdfUrl from "@/assets/bmi-g4-vol01-bamboo-organ-las-pinas.pdf";

const kawayCover = { url: kawayCoverUrl };
const bambooOrganPdf = { url: bambooOrganPdfUrl };

export interface TeachingModule {
  id: string;
  title: string;
  level: "Elementary" | "High School";
  volume: 1 | 2;
  grade: string;
  authors: string[];
  year: number;
  pdfUrl: string;
  thumbnailPrompt: string;
  description: string;
  coverUrl?: string;
  coverPosition?: string;
}

export const MODULES: TeachingModule[] = [
  {
    id: "elem-v1-g4-bamboo-organ",
    title: "Bamboo Organ of Las Piñas",
    level: "Elementary",
    volume: 1,
    grade: "Grade 4",
    authors: ["Philippine Society for Music Education"],
    year: 2023,
    pdfUrl: bambooOrganPdf.url,
    thumbnailPrompt: "Kaway-Kawayan Volume 1 elementary cover",
    description:
      "Kaway-Kawayan Bamboo Music Education Lessons for K-12 — Grade 4 lesson on the historic Bamboo Organ of Las Piñas.",
    coverUrl: kawayCover.url,
    coverPosition: "right center",
  },
  {
    id: "elem-v1-g4",
    title: "Introduction to Philippine Bamboo Instruments",
    level: "Elementary",
    volume: 1,
    grade: "Grade 4",
    authors: ["Cruz, M. R.", "Santos, A. L."],
    year: 2023,
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    thumbnailPrompt: "elementary bamboo music module cover",
    description: "An introductory module exploring bamboo instruments for young learners.",
  },

  {
    id: "elem-v1-g5",
    title: "Sounds of the Bamboo Forest",
    level: "Elementary",
    volume: 1,
    grade: "Grade 5",
    authors: ["Reyes, J. P."],
    year: 2023,
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    thumbnailPrompt: "bamboo forest sounds module",
    description: "Activities and listening guides for identifying bamboo instrument timbres.",
  },
  {
    id: "elem-v2-g4",
    title: "Playing the Tongatong: A Beginner's Guide",
    level: "Elementary",
    volume: 2,
    grade: "Grade 4",
    authors: ["Dela Cruz, P. S."],
    year: 2024,
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    thumbnailPrompt: "tongatong beginner guide cover",
    description: "Step-by-step lessons on the Kalinga tongatong.",
  },
  {
    id: "elem-v2-g6",
    title: "Bamboo Rhythm Workshop",
    level: "Elementary",
    volume: 2,
    grade: "Grade 6",
    authors: ["Garcia, R. M.", "Lim, B. T."],
    year: 2024,
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    thumbnailPrompt: "bamboo rhythm workshop cover",
    description: "Group rhythm exercises using bamboo idiophones.",
  },
  {
    id: "hs-v1-g7",
    title: "Cultural Heritage of Bamboo Music",
    level: "High School",
    volume: 1,
    grade: "Grade 7",
    authors: ["Mangahas, V. C."],
    year: 2023,
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    thumbnailPrompt: "high school bamboo heritage cover",
    description: "Historical context and regional traditions of Philippine bamboo music.",
  },
  {
    id: "hs-v1-g9",
    title: "Acoustics of Bamboo Instruments",
    level: "High School",
    volume: 1,
    grade: "Grade 9",
    authors: ["Tan, E. R.", "Bautista, F. A."],
    year: 2023,
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    thumbnailPrompt: "acoustics bamboo module",
    description: "Introductory acoustics applied to bamboo aerophones and idiophones.",
  },
  {
    id: "hs-v2-g8",
    title: "Making Your First Bamboo Flute",
    level: "High School",
    volume: 2,
    grade: "Grade 8",
    authors: ["Villanueva, K. J."],
    year: 2024,
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    thumbnailPrompt: "making bamboo flute workshop",
    description: "Workshop module on selecting bamboo and constructing a simple flute.",
  },
  {
    id: "hs-v2-g10",
    title: "Ensemble Performance with Bamboo Instruments",
    level: "High School",
    volume: 2,
    grade: "Grade 10",
    authors: ["Aquino, D. R.", "Pascual, M. E."],
    year: 2024,
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    thumbnailPrompt: "bamboo ensemble performance cover",
    description: "Arranging and conducting a bamboo instrument ensemble.",
  },
];
