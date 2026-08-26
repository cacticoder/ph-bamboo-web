import { INSTRUMENTS } from "@/data/instruments";

/**
 * Source of truth: CONTENT-SOURCE/bamboo-content/JSON-files-bamboo/bamboo_species.json
 * and .../from_the_field.json. Photos extracted from the matching zip/folder in
 * CONTENT-SOURCE/bamboo-content/bamboo-photos-bmi/ into src/assets/species/<slug>/.
 */

const speciesImages = import.meta.glob<string>("/src/assets/species/**/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface InstrumentRef {
  label: string;
  instrumentId?: string;
}

export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  commonNames: string[];
  synonyms?: string[];
  basionym?: string;
  localName?: string;
  description: string;
  habitat?: string;
  distribution?: string;
  economicImportance?: string;
  distinguishingFeatures?: string;
  collectionLocation?: string;
  instruments: InstrumentRef[];
  image?: string;
  gallery: GalleryImage[];
}

export interface FieldNote {
  title: string;
  content: string;
  bamboo?: string;
  speciesIds: string[];
}

/** camera-default filename fragments that should stay upper-cased, not title-cased */
const KEEP_UPPER = new Set(["dsc", "rod", "img"]);

function titleCaseWord(word: string): string {
  if (KEEP_UPPER.has(word.toLowerCase())) return word.toUpperCase();
  if (/^\d+$/.test(word)) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function cleanCaption(filename: string, aliases: string[]): string {
  let base = filename.replace(/\.(webp|jpg|jpeg|png)$/i, "");
  for (const alias of aliases) {
    if (!alias) continue;
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    base = base.replace(new RegExp(escaped, "gi"), " ");
  }
  base = base
    .replace(/[-_.]+/g, " ")
    .replace(/\bweb\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  base = base
    .replace(/([a-zA-Z])(\d+)/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
  if (!base) return "";
  if (/^\d+$/.test(base)) return `Photograph ${base}`;
  return base.split(" ").map(titleCaseWord).join(" ");
}

function genusEpithet(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join(" ");
}

function genus(name: string): string {
  return name.toLowerCase().trim().split(/\s+/)[0] ?? "";
}

function imagesInFolder(slug: string): { file: string; src: string }[] {
  const prefix = `/src/assets/species/${slug}/`;
  return Object.entries(speciesImages)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, src]) => ({ file: path.slice(prefix.length), src }))
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));
}

const ABBREV_ALIASES: Record<string, string[]> = {
  "kauayang-tinik": ["bspinosa", "sbpinosa"],
  "kauayang-china": ["bvulgaris"],
  baitu: ["c.hirsuta", "chirsuta"],
};

function buildMedia(slug: string, scientificName: string, coverFile?: string) {
  const files = imagesInFolder(slug);
  if (files.length === 0) return { image: undefined, gallery: [] as GalleryImage[] };

  const aliases = [
    scientificName,
    scientificName.replace(/\.$/, ""),
    scientificName
      .replace(/\(.*?\)/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
    genusEpithet(scientificName),
    genus(scientificName),
    ...(ABBREV_ALIASES[slug] ?? []),
  ].sort((a, b) => b.length - a.length);

  const coverIndex = coverFile ? files.findIndex((f) => f.file === coverFile) : 0;
  const cover = files[coverIndex >= 0 ? coverIndex : 0];
  const rest = files.filter((_, i) => i !== (coverIndex >= 0 ? coverIndex : 0));

  return {
    image: cover.src,
    gallery: rest.map((f) => ({ src: f.src, caption: cleanCaption(f.file, aliases) || f.file })),
  };
}

/** Resolve JSON instrument display-name strings to catalogue instrument ids, scoped to this
 * species' scientific name so identically-named instruments used by other species (e.g. several
 * distinct "Marimba" or "Bumbong" entries) never get cross-linked. Unmatched names stay as plain
 * labels rather than guessing a link. */
function resolveInstruments(scientificName: string, rawNames: string[]): InstrumentRef[] {
  const speciesKey = genusEpithet(scientificName);
  const candidates = INSTRUMENTS.filter((ins) =>
    ins.bambooSpecies.split("/").some((part) => genusEpithet(part) === speciesKey),
  );

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/\(.*?\)/g, " ")
      .replace(/[^a-z0-9à-ÿ\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const wordsOf = (s: string) =>
    normalize(s)
      .split(" ")
      .filter((w) => w && !["or", "and", "with", "the", "a", "case"].includes(w));

  return rawNames.map((label) => {
    const rawLower = label.toLowerCase().trim();
    const strippedLabel = normalize(label);

    let match = candidates.find(
      (ins) => ins.name.toLowerCase() === rawLower || ins.localName.toLowerCase() === rawLower,
    );
    if (!match) {
      match = candidates.find(
        (ins) =>
          normalize(ins.name) === strippedLabel || normalize(ins.localName) === strippedLabel,
      );
    }
    if (!match) {
      const labelWords = new Set(wordsOf(label));
      let best: { ins: (typeof candidates)[number]; score: number } | undefined;
      for (const ins of candidates) {
        for (const field of [ins.name, ins.localName]) {
          const fieldWords = wordsOf(field).filter((w) => w.length >= 3);
          if (fieldWords.length === 0) continue;
          const overlap = fieldWords.filter((w) => labelWords.has(w)).length;
          const score = overlap / fieldWords.length;
          if (score >= 0.5 && (!best || score > best.score)) best = { ins, score };
        }
      }
      match = best?.ins;
    }
    return { label, instrumentId: match?.id };
  });
}

interface RawSpecies {
  id: number;
  common_name: string;
  scientific_name: string;
  common_names?: string[];
  synonyms?: string[];
  basionym?: string;
  local_name?: string;
  description: string;
  habitat?: string;
  distribution?: string;
  economic_importance?: string;
  distinguishing_features?: string;
  collection_location?: string;
  instruments: string[] | Record<string, string[]>;
  slug: string;
  coverFile?: string;
}

const RAW_SPECIES: RawSpecies[] = [
  {
    id: 1,
    slug: "kauayang-tinik",
    common_name: "Kauayang-tinik",
    scientific_name: "Bambusa spinosa Roxb.",
    common_names: [
      "Kauayang-tinik",
      "kauayang-totoo",
      "aonoo",
      "batakan",
      "bangin",
      "dagian",
      "kauayang-dig",
      "kauayang-siitan",
      "kabugauan",
      "lamuna",
      "marurugi",
      "pagsinga",
      "pana",
      "rugian",
    ],
    description:
      "Culms grow in clumps, erect with an out-arching crown up to 20m tall. Nodes are dipping with glabrous green internodes up to 49cm long and 8.25cm in diameter. The culm wall is 3.0cm thick at the base, becoming thinner toward the top.",
    habitat: "Commonly planted in settled areas at low and medium altitudes.",
    distribution:
      "Native to Java and Eastern Malesia; cultivated in Southern China, Malay Peninsula, Moluccas, and the Philippines (Northern Luzon to Mindanao).",
    economic_importance:
      "Top to bottom of culms are used for musical instruments. It is also used in building construction, furniture, kitchen utensils, and papermaking; young shoots are edible.",
    instruments: {
      idiophones: [
        "Palakpak Ka Odok",
        "Togo",
        "Bamboo Clappers",
        "Kumbing with Sokong",
        "Sludoy",
        "Marimba",
        "Mini Marimba",
      ],
      aerophones: ["Bumbong", "Bamban"],
    },
    coverFile: "bspinosa-_Clump-web.webp",
  },
  {
    id: 2,
    slug: "kauayang-china",
    common_name: "Kauayang-china",
    scientific_name: "Bambusa vulgaris Schrad. Ex Wendl.",
    common_names: [
      "Kauayang-china",
      "killing",
      "taring",
      "tewanak",
      "kauawayang-kiling",
      "bolinao",
      "limas",
      "tiling",
      "sinamgang",
      "kauayang-kiting",
      "maribal",
      "patong",
    ],
    description:
      "Open clumps with about 30 erect, straight, or slightly zigzag culms up to 15m tall. Internodes are bluish-green, shining, and slightly grooved on the branch side.",
    distribution:
      "Originated in tropical Asia; pantropically cultivated. In the Philippines, it is found from Northern Luzon to Palawan and Mindanao.",
    economic_importance:
      "Classified as soft bamboo used in light construction, pulp, paper, and handicrafts.",
    distinguishing_features: "Glabrous shining bluish-green culms and sulcate internodes.",
    instruments: ["Ullibyew (Lubuagan tribe jaw harp)"],
    coverFile: "bvulgaris.webp",
  },
  {
    id: 3,
    slug: "baitu",
    common_name: "Baitu",
    scientific_name: "Cyrtochloa hirsuta S Dransf. sp. nov.",
    common_names: ["Baitu"],
    description:
      "Culms are 6-7m tall, green turning yellow at maturity, with thin walls and internodes 50-70cm long. The tips are long and drooping.",
    distribution: "Endemic to Luzon, Philippines (specifically Bataan).",
    economic_importance:
      "Used locally for fences, barbecue sticks, and agricultural implements due to thin walls.",
    distinguishing_features: "Thin culm wall, long internodes, and rigid foliage leaves.",
    instruments: {
      aerophones: ["Bamban", "Barimbao/Rambunet", "Rambusak", "Bamboo Kazoo"],
      idiophones: ["Tipangklung"],
    },
    coverFile: "C.hirsuta_web.webp",
  },
  {
    id: 4,
    slug: "giant-bamboo-afus",
    common_name: "Giant Bamboo / Afus",
    scientific_name: "Dendrocalamus asper (Schultes f.) Backer ex Heyne",
    common_names: ["Giant bamboo", "bolong-sina", "Afus", "Buntong", "Pusog"],
    description:
      "Large culms reaching over 20m tall with diameters of 12-16cm near the base. Covered with velvety brown hairs when young.",
    habitat: "Grows well from low altitudes up to 1500m.",
    distribution:
      "Planted throughout Southeast Asia; introduced in Philippine bambusetums in Mt. Makiling and Bukidnon.",
    economic_importance: "Used in house construction, plywood, and tiles; young shoots are edible.",
    distinguishing_features:
      "Densely persistent brown velvety hairs covering lower internodes and swollen nodes with many aerial roots.",
    instruments: {
      chordophones: ["Paglaom", "Paglaom mini", "Pahidaet/Pagyanig", "Kalipay guitars", "Dwegey"],
      idiophones: [
        "Kulibaw",
        "Kulitong",
        "Tambi",
        "Bantukak",
        "Bantula",
        "Kokak",
        "Kubing",
        "Ksal",
        "Sludoy",
      ],
      membranophones: ["Tnonggong"],
    },
    coverFile: "Dendrocalamus asper_1.webp",
  },
  {
    id: 5,
    slug: "bayog",
    common_name: "Bayog",
    scientific_name: "Dendrocalamus merillianus (Elmer) Elmer",
    common_names: ["Bayog", "bayugin", "bukaui", "botong", "butong", "Kauayan", "kauayan-bayog"],
    description:
      "Sturdy culms up to 20m tall with green, smooth internodes. Walls are up to 4.0cm thick, often nearly solid at the base.",
    habitat: "Generally planted in settled areas; prefers deep fertile soil.",
    distribution: "Endemic to various provinces in Luzon, Leyte, Cebu, Bohol, and Mindanao.",
    economic_importance:
      "Preferred for furniture making (vehicle shafts, yokes), building construction, ropes, and papermaking.",
    instruments: ["Unnat (Majukayong/Kalinga jaw harp)"],
  },
  {
    id: 6,
    slug: "bambu-hitam",
    common_name: "Bambu hitam",
    scientific_name: "Gigantochloa atter (Hassk.) Kurz",
    common_names: ["Bambu hitam", "Kayali", "patong", "Lasak"],
    synonyms: [
      "Bambusa thouarsii Kunth var. atter Hassk.",
      "Gigantochloa verticilla (Willd.) Munro sensu Backer",
    ],
    description:
      "Culms 12-25m tall, closely tufted. Young culms are powdery waxy with bluish-green internodes.",
    habitat: "Thrives in tropics up to 1400m altitude.",
    distribution: "Originated in Java; cultivated in Davao and Laguna in the Philippines.",
    economic_importance:
      "Culms used for building materials, household utensils, handicrafts, and banana props; shoots are edible.",
    instruments: ["Ksal (Tboli rhythm sticks)"],
    coverFile: "Gigantochloa atter_1.webp",
  },
  {
    id: 7,
    slug: "bolo",
    common_name: "Bolo",
    scientific_name: "Gigantochloa levis (Blanco) Merr.",
    common_names: [
      "Bolo",
      "bongsina",
      "buhong-china",
      "buling-china",
      "kauayang china",
      "kauayang-puti",
      "kauayang-sina",
      "book",
      "buton",
      "kabolian",
      "patong",
      "botong",
      "Chinese Kawayan",
      "Batibot",
    ],
    description:
      "Clumps of 10-22 culms up to 20m tall. Internodes are 15-30cm long, hollow with walls 1-3cm thick. Culm sheaths are densely hairy dark-brown when young.",
    habitat: "All clumps are cultivated or naturalized.",
    distribution: "Native to the Philippines (Luzon, Leyte, Camiguin de Misamis, etc.).",
    economic_importance:
      "Culms are used for various musical instruments, building construction, basketry, and furniture; shoots are edible.",
    instruments: {
      idiophones: [
        "Marimba",
        "Bayawak/Hagubhob",
        "Halo",
        "Karatoktok",
        "Karatong",
        "Angklung",
        "Kalagong",
        "Kalatok",
        "Kiskis",
        "Patangguk",
      ],
      aerophones: ["Bumbong"],
    },
    coverFile: "Gigantochloa levis (Blanco) Merr_1.webp",
  },
  {
    id: 8,
    slug: "green-buho",
    common_name: "Green buho",
    scientific_name: "Schizostachyum brachycladum (Kurz) Kurz",
    common_names: ["Green buho", "Bentung", "Laya", "Boho"],
    basionym: "Melocanna brachyclada Kurz",
    description:
      "Closely tufted culms up to 30m tall. Internodes are green with a prominent white-waxy bloom, 20.5–54.5cm long.",
    habitat: "Secondary forests up to 600m altitude.",
    distribution: "Originated from Java; cultivated in Davao.",
    economic_importance:
      "Used for roofs, handicrafts, water containers, and fibers for clothes in Indonesia.",
    instruments: ["Assa-assa-kagik-manok (water flute)", "Hlendeg (side flute)"],
    coverFile: "Schizostachyum brachycladum (Kurz) Kurz_1.webp",
  },
  {
    id: 9,
    slug: "anos",
    common_name: "Anos",
    scientific_name: "Schizostachyum lima (Blanco) Merr.",
    common_names: [
      "Anos",
      "bagakai",
      "Bitu",
      "Bolo",
      "Buho",
      "Lakap",
      "Nap-nap",
      "Sumbiling",
      "Bahi-bahian",
      "Seben",
      "Bobong/Badek",
    ],
    basionym: "Bambos lima Blanco",
    description:
      "Forms large clumps with 240–370 slender culms. Internodes are hollow and green, with fine irritating hairs when young.",
    habitat: "Thickets and secondary forests at low to medium altitudes.",
    distribution: "Philippines (Luzon to Basilan), New Guinea, Solomon Islands, and Sulawesi.",
    economic_importance:
      "Ideal for sawali boards; shoots are edible. Historically used to polish brass.",
    distinguishing_features:
      "Similar to S. lumampao but with smaller culms; internodes have sandpapery hairs.",
    instruments: [
      "Pito (Musikong Bumbong flute)",
      "Panflute (King Flute)",
      "True Sidewinder Flute (King Flute)",
      "Microflute (King Flute)",
      "Lantoy (Bagobo Taga Bawa)",
    ],
    coverFile: "Schizostachyum lima (Blanco) Merr_1.webp",
  },
  {
    id: 10,
    slug: "lumampao",
    common_name: "Lumampao",
    scientific_name: "Schizostachyum lumampao (Blanco) Merr.",
    common_names: [
      "Lumampao",
      "bokawi",
      "boho",
      "babakan",
      "book",
      "bolo",
      "bulo",
      "Caña del boho",
      "dato",
      "napnap",
      "oras",
      "bulu",
      "vulu",
      "Buyu",
    ],
    basionym: "Bambus lumampao Blanco",
    description:
      "Clumps up to 3m in diameter with ~200 culms, 10-11m tall. Internodes are 60-90cm long with thin walls (0.17cm at top).",
    habitat: "Thickets and secondary forests at low and medium altitudes.",
    distribution: "Endemic to various Philippine islands (Luzon to Basilan).",
    economic_importance: "Culms used for musical instruments, sawali, baskets, and spears.",
    distinguishing_features: "Generally larger culms than S. lima in natural habitats.",
    instruments: [
      "Togo",
      "Marimba resonators",
      "Panpipe",
      "Ayég Udén",
      "Byellingbing",
      "Bérédong",
      "Jungajung",
      "Kullitong",
      "Patangguk",
      "Tabéllungan",
      "Tabbatab",
      "Tungali",
      "Kulilit",
      "Patang-ug",
      "Patiteg",
      "Tungatong",
      "Saggaypu",
      "Sulimong",
    ],
    coverFile: "Schizostachyum lumampao (Blanco) Merr_Clump.webp",
  },
  {
    id: 11,
    slug: "knaf",
    common_name: "Knaf",
    scientific_name: "Dinochloa sp.",
    local_name: "Knaf (Tboli)",
    description:
      "A high-climbing tropical genus with zigzag culms found in hill forests. Culms are solid or have a small lumen and twine around tree trunks.",
    collection_location: "Brgy. Lemsnolon, T'Boli, South Cotabato.",
    instruments: ["Hlendeg (Tboli side flute)"],
    coverFile: "Dinochloa sp_1.webp",
  },
  {
    id: 12,
    slug: "moso-japanese-bamboo",
    common_name: "Moso / Japanese Bamboo",
    scientific_name: "Phyllostachys edulis (Carriere) J. Houz.",
    common_names: ["Moso bamboo", "Japanese bamboo"],
    description:
      "Mature culms are distant from each other. Young culms have distinctive silvery white pubescence on nodes and internodes. Internodes are very long (up to 80cm).",
    habitat: "Grows well in cool climates or high altitudes up to 1600m.",
    distribution:
      "Warm-temperate China; recently introduced to the Philippines for experimental purposes.",
    economic_importance:
      "Culms used for flutes; major commercial species in China/Japan for building and food.",
    instruments: ["Pulala or Hulagteb (long flute of the Talaandig tribe)"],
  },
];

function flattenInstruments(raw: RawSpecies["instruments"]): string[] {
  if (Array.isArray(raw)) return raw;
  return Object.values(raw).flat();
}

export const SPECIES: Species[] = RAW_SPECIES.map((raw) => {
  const media = buildMedia(raw.slug, raw.scientific_name, raw.coverFile);
  return {
    id: raw.slug,
    commonName: raw.common_name,
    scientificName: raw.scientific_name,
    commonNames: (raw.common_names ?? []).filter(
      (n) => n.toLowerCase() !== raw.common_name.toLowerCase(),
    ),
    synonyms: raw.synonyms,
    basionym: raw.basionym,
    localName: raw.local_name,
    description: raw.description,
    habitat: raw.habitat,
    distribution: raw.distribution,
    economicImportance: raw.economic_importance,
    distinguishingFeatures: raw.distinguishing_features,
    collectionLocation: raw.collection_location,
    instruments: resolveInstruments(raw.scientific_name, flattenInstruments(raw.instruments)),
    image: media.image,
    gallery: media.gallery,
  };
});

/** From CONTENT-SOURCE/bamboo-content/JSON-files-bamboo/from_the_field.json.
 * Each "bamboo" reference is matched to one or more species ids above by scientific name —
 * mappings are explicit (not fuzzy-guessed) so field notes never mix between species. */
const FIELD_SPECIES_MAP: Record<string, string[]> = {
  "Bayog (Dendrocalamus merillianus)": ["bayog"],
  "Buho Thin-walled Anos (Schizostachyum lima) and Lumampao (S. lumampao)": ["anos", "lumampao"],
  "Afus (Dendrocalamus asper)": ["giant-bamboo-afus"],
  "Vuru or Buyu (S. lumampao)": ["lumampao"],
};

interface RawFieldSection {
  title: string;
  bamboo?: string;
  content: string;
}

const RAW_FIELD_SECTIONS: RawFieldSection[] = [
  {
    title: "Lowland Stands",
    bamboo: "Bayog (Dendrocalamus merillianus)",
    content:
      "Clumps generally planted in settled areas across Luzon, Leyte, Cebu, and Bohol. Its sturdy, thick-walled culms, which can grow up to 20 meters, serve as primary material for instruments like the Unnat jaw harp.",
  },
  {
    title: "Hillside",
    bamboo: "Buho Thin-walled Anos (Schizostachyum lima) and Lumampao (S. lumampao)",
    content:
      "Harvested from secondary forests and thickets at low to medium altitudes. These species are the preferred choice for King Flute panpipes and the Tungali nose flutes of the Cordilleras due to their ideal diameter and hollow structure.",
  },
  {
    title: "Giant Bamboo Grove",
    bamboo: "Afus (Dendrocalamus asper)",
    content:
      "Cultivated in groves up to 1,500 meters altitude. With culms reaching over 20 meters and diameters up to 16 centimeters, it provides the massive resonators needed for T'boli barrel drums (Tnonggong) and the bodies of modern engineered bamboo guitars.",
  },
  {
    title: "Cordillera Highlands",
    bamboo: "Vuru or Buyu (S. lumampao)",
    content:
      "Mountain stands feed the rich musical traditions of the Kalinga and Majukayong tribes. These highland bamboos are meticulously air-dried for at least a week to prepare them for the intricate skin-carving required for Kullibit zithers.",
  },
  {
    title: "Harvest Season",
    content:
      "Artisans observe traditional environmental indicators; Aeta makers harvest one-year-old “tinaunan” culms during the summer to prevent cracking, while Bagobo-Tagabawa elders harvest only during “dulom” (moonless nights) to protect the wood from “bukbok” (powder-post beetle) and fungal damage.",
  },
  {
    title: "Sustainable Supply",
    content:
      "The BMI Innovation R&D Program utilizes science to characterization and digitize bamboo species to ensure a standardized supply for the industry. This program aims to support the increased demand caused by the inclusion of bamboo music in the national K-12 curriculum.",
  },
  {
    title: "Sustainable Harvest",
    content:
      "A regenerative cycle where bamboo is chosen for its endless renewability as a natural resource. Producers like Huni Ukulele emphasize that utilizing bamboo has a minimal effect on the environment, providing a socially responsible alternative to traditional tonewoods.",
  },
  {
    title: "Climate Impact",
    content:
      "As a highly sustainable material, bamboo is utilized by modern makers to respond to current ecological challenges in the Philippines. Its rapid growth and wide distribution make it a primary driver for a climate-conscious creative industry.",
  },
  {
    title: "Community Forestry",
    content:
      "The craft provides vital economic opportunities; for instance, King Flute provides employment and generates income for barangays in Quezon, while Musikawayan Malabon preserves a century-old Katipunero tradition, ensuring heritage and livelihood flow harmoniously together.",
  },
];

export const FIELD_TITLE = "From the Field";
export const FIELD_SUBTITLE = "Where Philippine instrument bamboos grow and are harvested.";

export const FIELD_NOTES: FieldNote[] = RAW_FIELD_SECTIONS.map((s) => ({
  title: s.title,
  content: s.content,
  bamboo: s.bamboo,
  speciesIds: s.bamboo ? (FIELD_SPECIES_MAP[s.bamboo] ?? []) : [],
}));

export function fieldNotesFor(speciesId: string): FieldNote[] {
  return FIELD_NOTES.filter((n) => n.speciesIds.includes(speciesId));
}
