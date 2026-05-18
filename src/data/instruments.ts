export type InstrumentCategory = "Chordophones" | "Aerophones" | "Idiophones" | "Membranophones";

export interface Instrument {
  id: string;
  name: string;
  category: InstrumentCategory;
  shortDescription: string;
  fullDescription: string;
  bambooSpecies: string;
  region: string;
  imagePrompt: string;
}

export const INSTRUMENTS: Instrument[] = [
  { id: "kudyapi", name: "Kudyapi", category: "Chordophones", shortDescription: "Two-stringed boat lute of the Lumad peoples.", fullDescription: "The kudyapi is a long-necked, two-stringed boat lute traditionally played by the Manobo, T'boli, and other Lumad groups of Mindanao. Its haunting melodies accompany epic storytelling and ritual.", bambooSpecies: "Bambusa blumeana", region: "Mindanao", imagePrompt: "kudyapi" },
  { id: "kulintang-a-kayo", name: "Kulintang a Kayo", category: "Idiophones", shortDescription: "Bamboo xylophone of the Maguindanaon.", fullDescription: "A bamboo log xylophone struck with mallets, used as a portable alternative to gong-based kulintang ensembles.", bambooSpecies: "Schizostachyum lumampao", region: "Maguindanao", imagePrompt: "bamboo xylophone" },
  { id: "tongatong", name: "Tongatong", category: "Idiophones", shortDescription: "Stamping tubes of the Kalinga.", fullDescription: "Stamping bamboo tubes of varying lengths pounded against stones; used in rituals and harvest celebrations of the Kalinga.", bambooSpecies: "Bambusa vulgaris", region: "Cordillera", imagePrompt: "kalinga bamboo stamping tubes" },
  { id: "tumpong", name: "Tumpong", category: "Aerophones", shortDescription: "Lip-valley flute of Mindanao.", fullDescription: "A bamboo lip-valley flute with a soft, breathy timbre; used for courtship and personal expression.", bambooSpecies: "Schizostachyum lumampao", region: "Mindanao", imagePrompt: "bamboo flute lip valley" },
  { id: "palendag", name: "Palendag", category: "Aerophones", shortDescription: "Largest bamboo flute of the Philippines.", fullDescription: "The palendag is the longest of the three Filipino bamboo flutes; played with the lower lip against a notched edge.", bambooSpecies: "Bambusa blumeana", region: "Mindanao", imagePrompt: "long bamboo flute palendag" },
  { id: "suling", name: "Suling", category: "Aerophones", shortDescription: "Ring-flute used across Southeast Asia.", fullDescription: "A small ring-flute with a fipple mouthpiece; gentle and pastoral in tone.", bambooSpecies: "Schizostachyum lumampao", region: "Mindanao / Sulu", imagePrompt: "small bamboo ring flute" },
  { id: "kubing", name: "Kubing", category: "Idiophones", shortDescription: "Jaw harp of the Maguindanao.", fullDescription: "A bamboo jaw harp resonated against the player's mouth cavity, producing intimate, voice-like melodies.", bambooSpecies: "Schizostachyum lumampao", region: "Mindanao", imagePrompt: "bamboo jaw harp kubing" },
  { id: "kulintang", name: "Bamboo Kulintang", category: "Idiophones", shortDescription: "Bamboo set inspired by gong ensembles.", fullDescription: "A bamboo adaptation of the gong-row kulintang, retaining its modal melodies and interlocking patterns.", bambooSpecies: "Bambusa blumeana", region: "Maguindanao", imagePrompt: "bamboo gong row" },
  { id: "gabbang", name: "Gabbang", category: "Idiophones", shortDescription: "Bamboo xylophone of the Sama-Bajau.", fullDescription: "A trapezoidal bamboo xylophone with 9 to 17 keys; central to Sama-Bajau and Yakan music.", bambooSpecies: "Bambusa blumeana", region: "Sulu / Tawi-Tawi", imagePrompt: "trapezoid bamboo xylophone gabbang" },
  { id: "bungkaka", name: "Bungkaka", category: "Idiophones", shortDescription: "Buzzer of the Cordillera.", fullDescription: "A bamboo buzzer with a split end struck against the palm; used to ward off rice-field pests and in courtship.", bambooSpecies: "Bambusa vulgaris", region: "Cordillera", imagePrompt: "bamboo buzzer split" },
  { id: "patatag", name: "Pat-tatag", category: "Idiophones", shortDescription: "Bamboo slit drum.", fullDescription: "A bamboo slit drum struck with sticks; used by the Bontok and other Cordillera groups in ensemble playing.", bambooSpecies: "Bambusa vulgaris", region: "Cordillera", imagePrompt: "bamboo slit drum" },
  { id: "saggeypo", name: "Saggeypo", category: "Aerophones", shortDescription: "Bamboo panpipes of the Kalinga.", fullDescription: "Bound bamboo panpipes played individually or in groups; each pipe carries a single pitch.", bambooSpecies: "Schizostachyum lumampao", region: "Cordillera", imagePrompt: "kalinga bamboo panpipes" },
  { id: "tongali", name: "Tongali", category: "Aerophones", shortDescription: "Nose flute of the Kalinga.", fullDescription: "A nose flute traditionally played to express intimate emotion; the breath from the nose is considered purer than from the mouth.", bambooSpecies: "Schizostachyum lumampao", region: "Cordillera", imagePrompt: "kalinga nose flute" },
  { id: "balingbing", name: "Balingbing", category: "Idiophones", shortDescription: "Buzzer with longer split.", fullDescription: "A larger bamboo buzzer relative of the bungkaka; struck on the palm and used in welcome ceremonies.", bambooSpecies: "Bambusa vulgaris", region: "Cordillera", imagePrompt: "large bamboo buzzer" },
  { id: "kalaleng", name: "Kalaleng", category: "Aerophones", shortDescription: "Nose flute with six finger holes.", fullDescription: "A long bamboo nose flute used by the Tinguian and Bontok; produces a wide melodic range.", bambooSpecies: "Schizostachyum lumampao", region: "Cordillera", imagePrompt: "tinguian nose flute" },
  { id: "luntang", name: "Luntang", category: "Idiophones", shortDescription: "Hanging bamboo logs of Maguindanao.", fullDescription: "Five tuned bamboo logs hung horizontally; struck to send musical messages across rice fields.", bambooSpecies: "Bambusa blumeana", region: "Mindanao", imagePrompt: "hanging bamboo logs maguindanao" },
  { id: "kulibit", name: "Kulibit", category: "Chordophones", shortDescription: "Polychordal bamboo zither.", fullDescription: "A tube zither with strings lifted from the bamboo skin itself, plucked with both hands.", bambooSpecies: "Schizostachyum lumampao", region: "Cordillera", imagePrompt: "bamboo tube zither kulibit" },
  { id: "kollitong", name: "Kollitong", category: "Chordophones", shortDescription: "Kalinga polychordal zither.", fullDescription: "A bamboo polychordal zither related to the kulibit; favored by Kalinga musicians for ensemble play.", bambooSpecies: "Schizostachyum lumampao", region: "Cordillera", imagePrompt: "kalinga bamboo zither" },
  { id: "tambol-bamboo", name: "Bamboo Tambol", category: "Membranophones", shortDescription: "Bamboo-bodied drum with skin head.", fullDescription: "A drum whose body is made from large bamboo with an animal-skin or synthetic head; light yet resonant.", bambooSpecies: "Dendrocalamus asper", region: "Various", imagePrompt: "bamboo body drum" },
  { id: "bamboo-organ", name: "Bamboo Pipe Organ", category: "Aerophones", shortDescription: "Iconic Las Piñas bamboo organ.", fullDescription: "Built in 1816 by Fr. Diego Cera, the 902-pipe Las Piñas bamboo organ remains the only one of its kind in the world.", bambooSpecies: "Bambusa blumeana", region: "Las Piñas", imagePrompt: "las pinas bamboo pipe organ" },
];

export const CATEGORIES: ("All" | InstrumentCategory)[] = ["All", "Chordophones", "Aerophones", "Idiophones", "Membranophones"];
