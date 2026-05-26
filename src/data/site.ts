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
  body: string[];
}

export const MAKERS: Maker[] = [
  {
    id: "lumbo",
    name: "Tatay Edicio Lumbo",
    region: "Maasin, Iloilo",
    expertise: "Tongatong & bamboo flutes",
    bio: "A master craftsman with 40+ years shaping bamboo into sonorous instruments for ensembles across the Visayas.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&q=80",
    body: [
      "Tatay Edicio Lumbo learned the craft as a boy in Maasin, the Bamboo Capital of Iloilo, sitting beside his father as he shaved bayog culms to pitch. Four decades later, his workshop still hums with the same patient rhythm — measure, cut, listen, shave, listen again.",
      "His tongatongs and flutes have travelled with Iloilo ensembles to festivals across Asia. Yet most days he is at home, mentoring apprentices and supplying the local schools that anchor the Tultugan Festival each December.",
      "For Tatay Edicio, every culm is a conversation: 'The bamboo tells you when it is ready. You only have to listen.'",
    ],
  },
  {
    id: "abueva",
    name: "Manong Roberto Abueva",
    region: "Las Piñas City",
    expertise: "Bamboo organ pipe restoration",
    bio: "Specialist in restoring the historic bamboo pipes of the Las Piñas Bamboo Organ.",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1600&q=80",
    body: [
      "Few instruments demand the patience of the 200-year-old Las Piñas Bamboo Organ. Manong Roberto Abueva is among the handful of craftsmen trusted to repair its 902 bamboo pipes, each tuned to within a hair's breadth of its original 1824 voice.",
      "His work involves humidity control, careful selection of replacement culms aged for years, and meticulous voicing — a process measured not in days but in seasons.",
      "He trains a new generation of restorers at the parish workshop, ensuring that the only bamboo pipe organ of its kind continues to sound for another century.",
    ],
  },
  {
    id: "balao",
    name: "Apo Lucia Balao",
    region: "Kalinga",
    expertise: "Tongali nose flutes & saggeypo",
    bio: "Cordilleran tradition-bearer passing nose flute craft and song to the next generation.",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1600&q=80",
    body: [
      "In the highlands of Kalinga, Apo Lucia Balao is a tradition-bearer of the tongali — the nose flute whose breathy, intimate tone is woven into Cordilleran courtship and ritual.",
      "She also crafts saggeypo panpipes, tuning each tube to the modal scales of her ili (village). Her workshop sits beside her rice terraces, where younger women come weekly to learn both the making and the playing.",
      "Recognized as a Manlilikha ng Bayan candidate, Apo Lucia insists the instrument and the song cannot be separated: 'To make it, you must know how to play it.'",
    ],
  },
  {
    id: "matalam",
    name: "Ustadz Hamid Matalam",
    region: "Maguindanao",
    expertise: "Kulintang a kayo & kubing",
    bio: "Maguindanaon musician-craftsman building bamboo gong-rows and jaw harps for community ensembles.",
    image: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=1600&q=80",
    body: [
      "Ustadz Hamid Matalam crafts the kulintang a kayo — the bamboo cousin of the brass kulintang — alongside the kubing jaw harp, instruments central to Maguindanaon life from weddings to harvest.",
      "He sources giant bamboo from forest stands along the Pulangi River, curing each piece for months before shaping the keys and frames.",
      "His ensembles perform regularly at Inaul and Shariff Kabunsuan festivals, and his workshop has become a quiet meeting place where Maguindanaon youth rediscover their musical inheritance.",
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
