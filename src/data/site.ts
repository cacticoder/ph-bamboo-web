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

export const MAKERS = [
  { id: "lumbo", name: "Tatay Edicio Lumbo", region: "Maasin, Iloilo", expertise: "Tongatong & bamboo flutes", bio: "A master craftsman with 40+ years shaping bamboo into sonorous instruments for ensembles across the Visayas." },
  { id: "abueva", name: "Manong Roberto Abueva", region: "Las Piñas City", expertise: "Bamboo organ pipe restoration", bio: "Specialist in restoring the historic bamboo pipes of the Las Piñas Bamboo Organ." },
  { id: "balao", name: "Apo Lucia Balao", region: "Kalinga", expertise: "Tongali nose flutes & saggeypo", bio: "Cordilleran tradition-bearer passing nose flute craft and song to the next generation." },
  { id: "matalam", name: "Ustadz Hamid Matalam", region: "Maguindanao", expertise: "Kulintang a kayo & kubing", bio: "Maguindanaon musician-craftsman building bamboo gong-rows and jaw harps for community ensembles." },
];

export const SPECIES = [
  { id: "bayog", common: "Bayog", scientific: "Bambusa blumeana", synonyms: ["Spiny bamboo", "Kawayan tinik"], description: "Thick-walled bamboo prized for its strong, resonant culms; the workhorse of Philippine instrument making.", habitat: "Lowland riverbanks, 0–500m elevation", distribution: "Throughout the Philippine archipelago", economic: "Construction, furniture, musical instruments, food (shoots)." },
  { id: "buho", common: "Buho", scientific: "Schizostachyum lumampao", synonyms: ["Philippine bamboo", "Bagakay"], description: "Thin-walled, straight-grained bamboo ideal for flutes, panpipes, and zithers.", habitat: "Hillsides up to 1000m", distribution: "Luzon, Visayas, Mindanao", economic: "Flutes, weaving slats, fish traps, light construction." },
  { id: "kawayan", common: "Kawayan Kiling", scientific: "Bambusa vulgaris", synonyms: ["Common bamboo"], description: "Naturalized bamboo widely used for stamping tubes and slit drums.", habitat: "Lowlands, settled areas", distribution: "Pantropical; abundant in PH", economic: "Construction, paper pulp, idiophones." },
  { id: "giant", common: "Giant Bamboo", scientific: "Dendrocalamus asper", synonyms: ["Bamboo betung"], description: "Large-diameter culms used for drum bodies and resonator chambers.", habitat: "Plantations and forests", distribution: "Cultivated nationwide", economic: "Heavy construction, drum bodies, edible shoots." },
];
