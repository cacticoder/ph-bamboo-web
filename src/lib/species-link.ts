import { SPECIES } from "@/data/species";

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
  const direct = SPECIES.find(
    (s) =>
      genusEpithet(s.scientificName) === key || s.commonName.toLowerCase() === label.toLowerCase(),
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
