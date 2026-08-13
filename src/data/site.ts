export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "BMI Gallery" },
  { to: "/makers", label: "BMI Makers" },
  { to: "/species", label: "Bamboo Species" },
  { to: "/processing-center", label: "Processing Center" },
  { to: "/value-chain", label: "Value Chain" },
  { to: "/modules", label: "Teaching Modules" },
  { to: "/rnd", label: "R&D Technologies" },
  { to: "/analytics", label: "Analytics" },
] as const;

export const PARTNERS = [
  { name: "DOST", short: "DOST" },
  { name: "DOST-PCIEERD", short: "PCIEERD" },
  { name: "DOST-FPRDI", short: "FPRDI" },
  { name: "UP Center for Ethnomusicology", short: "UPCE" },
  { name: "Philippine Normal University", short: "PNU" },
];

export const FESTIVALS = [
  { name: "Karatong Festival", region: "Dingras, Ilocos Norte", description: "Honors the karatong bamboo percussion of Ilocano farmers, celebrating harvest and community spirit." },
  { name: "Cordillera Bamboo Day", region: "Cordillera Administrative Region", description: "A regional gathering of Cordillera musicians and craftsmen showcasing tongatong, bungkaka, and kalaleng." },
  { name: "Tultugan Festival", region: "Maasin, Iloilo", description: "Maasin's annual celebration of bamboo — a town known as the Bamboo Capital of Iloilo." },
  { name: "Las Piñas Bamboo Organ Festival", region: "Las Piñas City", description: "International festival featuring the only 200-year-old bamboo pipe organ in the world." },
];

export interface Maker {
  id: string;
  name: string;
  region: string;
  expertise: string;
  bio: string;
  image: string;
  born?: string;
  community?: string;
  location?: string;
  makerType?: "Indigenous Peoples (IP)" | "Commercial";
  signature?: string[];
  quote?: string;
  body: string[];
}

import bagoboImg from "@/assets/maker-bagobo-tagabawa.png.asset.json";
import calabigImg from "@/assets/maker-calabig.png.asset.json";

export const MAKERS: Maker[] = [
  {
    id: "bagobo-tagabawa",
    name: "Bagobo-Tagabawa Tribe",
    community: "Bagobo-Tagabawa",
    makerType: "Indigenous Peoples (IP)",
    location: "Toril District, Davao City",
    region: "Toril District, Davao City",
    expertise: "Togo zithers & Lantoy flutes",
    bio: "Indigenous guardians of Southern Mindanao whose bamboo melodies have echoed across the Davao Gulf for generations.",
    image: bagoboImg.url,
    signature: ["Togo polychordal zithers", "Lantoy flutes", "Palakpak ka odak clappers"],
    quote: "Each instrument is made with respect, for the bamboo speaks of our ancestors' journey.",
    body: [
      "For the Bagobo-Tagabawa, learning to craft and play bamboo instruments is a sacred family affair. From childhood, members watch their elders select the right culms, later learning the intricate art of carving and raising strings straight from the bamboo skin to shape the Togo zither. Each note played is a continuation of an ancestral song.",
      "Based on the slopes of Mt. Apo, the Togo zither and Lantoy flute are woven into the tribe's identity alongside their earth-toned abaca weaving and beaded basketry. Modern music poses a real challenge to these traditions, yet elders remain steadfast in passing the knowledge to their grandchildren, keeping the soul of their culture intact.",
      "The instruments are vital for celebrations and ceremonies, but they are also companions in everyday life. Elders describe the haunting sound of the Lantoy flute and the rhythmic resonance of the zithers as powerful ways to relax and ease sadness — a connection between music and well-being that reflects the tribe's holistic view of their environment and artistry.",
      "The craft is built on deep respect. Bamboo is harvested only after asking permission and giving thanks to the creator of all things, and always during the \"dulom\" — moonless nights believed to preserve the wood's strength and guard against insects like bukbok and fungal damage.",
      "Every instrument is a living lesson, made only when a communal need arises or a younger member shows genuine interest in the craft. Through this patient stewardship, the tribe keeps its traditional knowledge — and its cultural distinctiveness — alive amid the pull of modernization. For the Bagobo-Tagabawa, every bamboo tube is a vessel for their history and a bridge to the future.",
    ],
  },
  {
    id: "calabig-banda-kawayan-pilipinas",
    name: "Prof. Siegfredo \u201cKa Fred\u201d Calabig",
    community: "Banda Kawayan Pilipinas",
    makerType: "Commercial",
    location: "Sta. Mesa, Manila",
    region: "Sta. Mesa, Manila",
    expertise: "Bamboo ensembles & Angklung",
    bio: "A pioneering educator and conductor who transformed bamboo into a global symbol of Philippine cultural diplomacy.",
    image: calabigImg.url,
    signature: ["Angklung rattle sets", "Kalagong bass pipes", "Marimba resonators"],
    quote: "Music knows no boundaries when it is played through the heart of the bamboo.",
    body: [
      "Prof. Siegfredo \"Ka Fred\" Calabig's journey began in 1973 at the Philippine College of Commerce (now the Polytechnic University of the Philippines), where he founded a school-based group to explore the musical potential of indigenous materials. What started as a project with Laboratory High School principal Gloria R. Talastas grew into a lifelong mission to master the acoustic properties of kawayan. For over four decades, his workshop and rehearsal halls have been centers of innovation.",
      "He led the PUP Banda Kawayan for forty years, building a unique ensemble of young performers who played instruments fashioned entirely from bamboo and other indigenous materials. Under his guidance, the group grew from a local academic curiosity into the premier Banda Kawayan Pilipinas, celebrated as a national treasure on its 40th anniversary in 2013. His work proved, time and again, that music knows no boundaries.",
      "His baton has led bamboo ensembles to international expositions, music festivals, and concert tours across Europe, North America, Australia, the Middle East, and Asia. As ambassadors of goodwill, Calabig and his performers have showcased Philippine culture and tourism on the world stage, sharing the spirit of Filipino bamboo music with audiences everywhere.",
      "His approach combines traditional craftsmanship with orchestral precision. He favors species like Gigantochloa levis (Bolo) for his instruments, selecting rattle tubes from the nodes of Batibot bamboo for his Angklung sets and mounting them on sturdy frames of Kawayang Tinik for clarity and resonance — an attention to material science that lets his instruments withstand international travel and diverse climates.",
      "Through Banda Kawayan Pilipinas, he has trained generations of performers, instilling in them a deep appreciation for their cultural heritage. His work continues to shape the national K-12 curriculum, which now includes bamboo instrument playing to help students understand ethnic music more deeply. By mentoring these young artists, Prof. Calabig ensures that bamboo performance remains a vibrant part of the Philippine creative industry.",
    ],
  },
];


export interface Species {
  id: string;
  common: string;
  scientific: string;
  synonyms: string[];
  description: string;
  habitat: string;
  distribution: string;
  economic: string;
  image: string;
  body: string[];
}

export const SPECIES: Species[] = [
  {
    id: "bayog",
    common: "Bayog",
    scientific: "Bambusa blumeana",
    synonyms: ["Spiny bamboo", "Kawayan tinik"],
    description: "Thick-walled bamboo prized for its strong, resonant culms; the workhorse of Philippine instrument making.",
    habitat: "Lowland riverbanks, 0–500m elevation",
    distribution: "Throughout the Philippine archipelago",
    economic: "Construction, furniture, musical instruments, food (shoots).",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1600&q=80",
    body: [
      "Bayog (Bambusa blumeana) is the workhorse of Philippine bamboo crafts. Its thick walls and tight internodes produce a dense, resonant culm that holds tuning exceptionally well — making it the preferred species for stamping tubes, slit drums, and percussion ensembles.",
      "Recognizable by the spiny thorns along its lower branches, bayog forms dense clumps along riverbanks throughout the archipelago. Sustainable harvesting takes culms at 3–4 years, leaving younger shoots to mature.",
      "Beyond music, bayog underpins rural construction, furniture, and food security through its tender shoots — a single species linked to livelihoods across the country.",
    ],
  },
  {
    id: "buho",
    common: "Buho",
    scientific: "Schizostachyum lumampao",
    synonyms: ["Philippine bamboo", "Bagakay"],
    description: "Thin-walled, straight-grained bamboo ideal for flutes, panpipes, and zithers.",
    habitat: "Hillsides up to 1000m",
    distribution: "Luzon, Visayas, Mindanao",
    economic: "Flutes, weaving slats, fish traps, light construction.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&q=80",
    body: [
      "Buho (Schizostachyum lumampao) is the voice of the Philippine flute family. Its thin walls and remarkably straight grain make it the preferred bamboo for the tongali nose flute, the kalaleng, and the saggeypo panpipes of the Cordilleras.",
      "It grows on hillsides up to 1000 meters across Luzon, the Visayas, and Mindanao, often in mixed stands with other native bamboos.",
      "Beyond music, buho is woven into walls and fish traps — a quiet, versatile species that has shaped both Filipino soundscapes and built landscapes.",
    ],
  },
  {
    id: "kawayan",
    common: "Kawayan Kiling",
    scientific: "Bambusa vulgaris",
    synonyms: ["Common bamboo"],
    description: "Naturalized bamboo widely used for stamping tubes and slit drums.",
    habitat: "Lowlands, settled areas",
    distribution: "Pantropical; abundant in PH",
    economic: "Construction, paper pulp, idiophones.",
    image: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=1600&q=80",
    body: [
      "Kawayan kiling (Bambusa vulgaris) is the most familiar bamboo in lowland Philippines — a naturalized species found around homes, schools, and roadsides across the country.",
      "Its hollow culms ring brightly when struck, lending themselves to stamping tubes, slit drums, and other idiophones used in festival processions.",
      "While not native, kiling has become culturally indispensable: easy to source, fast to grow, and forgiving to work — perfect for student instruments and community ensembles.",
    ],
  },
  {
    id: "giant",
    common: "Giant Bamboo",
    scientific: "Dendrocalamus asper",
    synonyms: ["Bamboo betung"],
    description: "Large-diameter culms used for drum bodies and resonator chambers.",
    habitat: "Plantations and forests",
    distribution: "Cultivated nationwide",
    economic: "Heavy construction, drum bodies, edible shoots.",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1600&q=80",
    body: [
      "Giant bamboo (Dendrocalamus asper) lives up to its name — culms reach 20–30 meters with diameters wide enough to serve as drum bodies and deep resonator chambers.",
      "Cultivated in plantations nationwide, its scale makes it indispensable for large bamboo organs, marimba-style xylophones, and the bass voices of contemporary bamboo ensembles.",
      "Its shoots are also among the most prized edibles, and its strength supports modern bamboo architecture — a single species spanning food, shelter, and sound.",
    ],
  },
];
