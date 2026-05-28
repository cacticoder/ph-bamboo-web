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
  signature?: string[];
  quote?: string;
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
    born: "Maasin, Iloilo · 1958",
    signature: ["Tongatong stamping tubes", "Tumpong nose flutes", "Bayog tuned ensembles"],
    quote: "The bamboo tells you when it is ready. You only have to listen.",
    body: [
      "Tatay Edicio Lumbo learned the craft as a boy in Maasin, the Bamboo Capital of Iloilo, sitting beside his father as he shaved bayog culms to pitch. Four decades later, his workshop still hums with the same patient rhythm — measure, cut, listen, shave, listen again.",
      "He came of age during the post-war revival of the Tultugan tradition, when families across Maasin rebuilt their bamboo ensembles from scratch. By his teens he was already cutting and curing his own culms; by his twenties he had begun supplying instruments for the town's school bands and parish ensembles.",
      "His tongatongs and flutes have travelled with Iloilo ensembles to festivals across Asia — from Bangkok to Tokyo to KL — yet most days he is at home, mentoring apprentices and supplying the local schools that anchor the Tultugan Festival each December.",
      "Tatay Edicio's process is famously slow. Culms are harvested only in the dry months between January and April, then cured under shade for at least eight months before they are touched again. 'A rushed bamboo,' he says, 'will crack on stage.'",
      "He has trained more than thirty apprentices through the Maasin Bamboo Artisans' Circle, several of whom now run their own workshops in Iloilo, Antique, and Capiz. For Tatay Edicio, every culm is a conversation — and every apprentice, a way to keep the conversation going.",
    ],
  },
  {
    id: "abueva",
    name: "Manong Roberto Abueva",
    region: "Las Piñas City",
    expertise: "Bamboo organ pipe restoration",
    bio: "Specialist in restoring the historic bamboo pipes of the Las Piñas Bamboo Organ.",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1600&q=80",
    born: "Las Piñas City · 1965",
    signature: ["Pipe re-voicing", "Humidity-stable bamboo aging", "Historic 1824 organ maintenance"],
    quote: "Father Diego built it once. Our work is to let it keep speaking.",
    body: [
      "Few instruments demand the patience of the 200-year-old Las Piñas Bamboo Organ. Manong Roberto Abueva is among the handful of craftsmen trusted to repair its 902 bamboo pipes, each tuned to within a hair's breadth of its original 1824 voice — the work of the Augustinian priest Diego Cera.",
      "He apprenticed under the German restorers who returned the organ to playing condition in the 1970s, and has spent his career deepening that knowledge in a Philippine climate the original builders never imagined.",
      "His work involves humidity control, careful selection of replacement culms aged for years, and meticulous voicing — a process measured not in days but in seasons. A single pipe can take six months from cut to installation.",
      "Manong Roberto also leads the technical preparations for the annual International Bamboo Organ Festival, coordinating with visiting organists to keep the instrument responsive to repertoire spanning three centuries.",
      "He trains a new generation of restorers at the parish workshop in St. Joseph Church, ensuring that the only bamboo pipe organ of its kind continues to sound for another century. 'When the pipes breathe well,' he says, 'you can hear the whole town in them.'",
    ],
  },
  {
    id: "balao",
    name: "Apo Lucia Balao",
    region: "Kalinga",
    expertise: "Tongali nose flutes & saggeypo",
    bio: "Cordilleran tradition-bearer passing nose flute craft and song to the next generation.",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1600&q=80",
    born: "Lubuagan, Kalinga · 1952",
    signature: ["Tongali nose flutes", "Saggeypo panpipe sets", "Kalinga modal tunings"],
    quote: "To make the flute, you must first know how to sing with it.",
    body: [
      "In the highlands of Kalinga, Apo Lucia Balao is a tradition-bearer of the tongali — the nose flute whose breathy, intimate tone is woven into Cordilleran courtship and ritual. She learned the instrument from her grandmother in Lubuagan, where the flute was as common in the household as the rice winnower.",
      "She also crafts saggeypo panpipes, tuning each tube to the modal scales of her ili (village) rather than to Western pitch. Her workshop sits beside her rice terraces, where younger women come weekly to learn both the making and the playing.",
      "Apo Lucia is unusual among Cordilleran instrument makers in that she is also a recognized performer. She has recorded with the UP Center for Ethnomusicology and her tongali pieces are part of the national archive of indigenous music.",
      "Her teaching method refuses to separate craft from song: every apprentice must first learn to play a piece on a borrowed flute before they are allowed to cut bamboo for their own. 'A flute made by someone who cannot play,' she says, 'is just a hollow stick.'",
      "Recognized as a Manlilikha ng Bayan candidate, Apo Lucia continues to anchor an unbroken line of women flute-makers in the Kalinga highlands — a quiet, persistent custodianship of one of the country's oldest musical traditions.",
    ],
  },
  {
    id: "matalam",
    name: "Ustadz Hamid Matalam",
    region: "Maguindanao",
    expertise: "Kulintang a kayo & kubing",
    bio: "Maguindanaon musician-craftsman building bamboo gong-rows and jaw harps for community ensembles.",
    image: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=1600&q=80",
    born: "Datu Piang, Maguindanao · 1961",
    signature: ["Kulintang a kayo (bamboo gong-row)", "Kubing jaw harps", "Pulangi river giant bamboo"],
    quote: "Every kubing carries the voice of the one who carved it.",
    body: [
      "Ustadz Hamid Matalam crafts the kulintang a kayo — the bamboo cousin of the brass kulintang — alongside the kubing jaw harp, instruments central to Maguindanaon life from weddings to harvest and from courtship to mourning.",
      "Trained as both a musician and an Islamic scholar, he understands the kulintang repertoire from the inside: the binalig, sinulog, and tidto rhythms shape how he tunes his keys, not the other way around.",
      "He sources giant bamboo from forest stands along the Pulangi River, curing each piece for months before shaping the keys and frames. His kubings are carved from a single sliver of bamboo, each one tuned to the player's own breath and bone structure.",
      "His ensembles perform regularly at Inaul and Shariff Kabunsuan festivals, and have represented Mindanao at national cultural events in Manila and Cebu. He also collaborates with peace-building organizations using kulintang workshops to bring together Moro, Lumad, and settler youth.",
      "His workshop in Datu Piang has become a quiet meeting place where Maguindanaon youth rediscover their musical inheritance — and where, increasingly, visiting researchers come to learn that the bamboo kulintang is not a poor cousin of the brass one, but a tradition with a voice entirely its own.",
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
