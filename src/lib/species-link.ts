import { SPECIES } from "@/data/site";

/** Scientific-name (genus + epithet) → species page id, including synonyms. */
const SCIENTIFIC_TO_ID: Record<string, string> = {
  "bambusa blumeana": "bayog",
  "bambusa spinosa": "bayog", // synonym of B. blumeana
  "schizostachyum lumampao": "buho",
  "bambusa vulgaris": "kawayan",
  "dendrocalamus asper": "giant",
};

export interface SpeciesRef {
  label: string;
  speciesId?: string;
}

/** Normalise "Bambusa spinosa Roxb." → "bambusa spinosa". */
function genusEpithet(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .split(/\s+/)
    .slice(0, 2)
    .join(" ");
}

function matchOne(name: string): SpeciesRef {
  const label = name.trim();
  if (!label) return { label };
  const key = genusEpithet(label);
  const byMap = SCIENTIFIC_TO_ID[key];
  if (byMap) return { label, speciesId: byMap };
  const direct = SPECIES.find(
    (s) => genusEpithet(s.scientific) === key || s.common.toLowerCase() === label.toLowerCase(),
  );
  return direct ? { label, speciesId: direct.id } : { label };
}

/** Split a raw bambooSpecies value (may contain "A / B") into linkable refs. */
export function resolveSpeciesRefs(raw: string): SpeciesRef[] {
  return raw
    .split("/")
    .map((part) => matchOne(part))
    .filter((r) => r.label.length > 0);
}
