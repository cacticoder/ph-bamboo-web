export interface Article {
  slug: string;
  title: string;
  region: string;
  excerpt: string;
  cover: string;
  body: string[];
  date: string;
  author: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "karatong-festival",
    title: "Karatong Festival",
    region: "Dingras, Ilocos Norte",
    excerpt: "Honors the karatong bamboo percussion of Ilocano farmers, celebrating harvest and community spirit.",
    cover: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&q=80",
    date: "May 2024",
    author: "phBMI Editorial",
    body: [
      "Every May, the town of Dingras in Ilocos Norte transforms into a stage where the karatong — a bamboo percussion instrument once used by farmers to ward off birds from the rice fields — takes center stage. The Karatong Festival celebrates this humble agricultural tool as a symbol of Ilocano resilience and community.",
      "Performers in vibrant costumes march through the streets, striking karatongs in rhythmic patterns passed down through generations. Each barangay fields its own ensemble, competing for the most intricate choreography and the most resonant sound.",
      "Beyond the spectacle, the festival anchors a broader effort to document and teach karatong-making to younger generations, ensuring that the instrument's voice continues to echo across the harvest fields of the north.",
    ],
  },
  {
    slug: "cordillera-bamboo-day",
    title: "Cordillera Bamboo Day",
    region: "Cordillera Administrative Region",
    excerpt: "A regional gathering of Cordillera musicians and craftsmen showcasing tongatong, bungkaka, and kalaleng.",
    cover: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1600&q=80",
    date: "March 2024",
    author: "phBMI Editorial",
    body: [
      "Cordillera Bamboo Day brings together musicians, craftsmen, and tradition-bearers from across the highland provinces. Held annually in March, the event showcases the tongatong stamping tubes, the bungkaka buzzer, and the haunting kalaleng nose flute.",
      "Workshops invite the public to try their hand at playing — and even making — these instruments under the guidance of master artisans. Performances spotlight the polyrhythmic ensembles that define Cordilleran music.",
      "The gathering is also a forum for policy: elders, scholars, and government partners meet to discuss sustainable bamboo sourcing and the protection of indigenous knowledge.",
    ],
  },
  {
    slug: "tultugan-festival",
    title: "Tultugan Festival",
    region: "Maasin, Iloilo",
    excerpt: "Maasin's annual celebration of bamboo — a town known as the Bamboo Capital of Iloilo.",
    cover: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=1600&q=80",
    date: "December 2023",
    author: "phBMI Editorial",
    body: [
      "Maasin, Iloilo earned its title as the Bamboo Capital of the Philippines through generations of skilled bamboo cultivation and craftsmanship. The Tultugan Festival — from the Hiligaynon word for the act of striking bamboo — is its grandest expression.",
      "Streets fill with towering bamboo installations, drum-and-bugle corps replaced by all-bamboo percussion ensembles, and street dances driven entirely by the percussive crack of bayog culms.",
      "The festival has become a major draw for cultural tourism, channeling income back into local bamboo farmers and makers who form the backbone of the town's economy.",
    ],
  },
  {
    slug: "las-pinas-bamboo-organ-festival",
    title: "Las Piñas Bamboo Organ Festival",
    region: "Las Piñas City",
    excerpt: "International festival featuring the only 200-year-old bamboo pipe organ in the world.",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1600&q=80",
    date: "February 2024",
    author: "phBMI Editorial",
    body: [
      "Built in 1824 by Father Diego Cera, the Las Piñas Bamboo Organ is the only one of its kind in the world. Each February, the St. Joseph Parish hosts the International Bamboo Organ Festival, drawing world-class organists and chamber ensembles.",
      "The festival pairs the instrument's distinctive, woodier-than-wood timbre with repertoire spanning Baroque masterworks to newly commissioned Filipino compositions.",
      "Proceeds support the ongoing conservation of the organ's 902 bamboo pipes — a delicate, ongoing dialogue between climate, craft, and history.",
    ],
  },
];
