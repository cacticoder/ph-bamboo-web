import dostLogo from "@/assets/logo/DOST-Logo.png";
import pcieerdLogo from "@/assets/logo/PCIEERD-Logo.png";
import fprdiLogo from "@/assets/logo/FPRDI-Logo.png";
import upceLogo from "@/assets/logo/UPCE-Logo.png";
import pnuLogo from "@/assets/logo/PNU-Logo.png";

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
  { name: "DOST", short: "DOST", logo: dostLogo },
  { name: "DOST-PCIEERD", short: "PCIEERD", logo: pcieerdLogo },
  { name: "DOST-FPRDI", short: "FPRDI", logo: fprdiLogo },
  { name: "UP Center for Ethnomusicology", short: "UPCE", logo: upceLogo },
  { name: "Philippine Normal University", short: "PNU", logo: pnuLogo },
];

export const FESTIVALS = [
  {
    name: "Karatong Festival",
    region: "Dingras, Ilocos Norte",
    description:
      "Honors the karatong bamboo percussion of Ilocano farmers, celebrating harvest and community spirit.",
  },
  {
    name: "Cordillera Bamboo Day",
    region: "Cordillera Administrative Region",
    description:
      "A regional gathering of Cordillera musicians and craftsmen showcasing tongatong, bungkaka, and kalaleng.",
  },
  {
    name: "Tultugan Festival",
    region: "Maasin, Iloilo",
    description:
      "Maasin's annual celebration of bamboo — a town known as the Bamboo Capital of Iloilo.",
  },
  {
    name: "Las Piñas Bamboo Organ Festival",
    region: "Las Piñas City",
    description:
      "International festival featuring the only 200-year-old bamboo pipe organ in the world.",
  },
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

import bagoboImgUrl from "@/assets/bagobo-tagabawa.png.png";
import calabigImgUrl from "@/assets/calabig.png.png";
import karatongImgUrl from "@/assets/Karatong Festival.jpg";
import diegoCeraImgUrl from "@/assets/Diego Cera Organ-builders Inc._1.jpg";
import kingFluteImgUrl from "@/assets/King Flute Philippines Inc._Processing site of Kinflute Philippines, Inc.jpg";
import lubuaganImgUrl from "@/assets/Lubuagan Tribe (Kalinga Sub-tribe)_1.png";
import majukayongImgUrl from "@/assets/Majukayong Tribe_1.png";
import tbolitImgUrl from "@/assets/Tboli_1.PNG";
import huniImgUrl from "@/assets/Huni-Ukulele_icon.png";
import saritaImgUrl from "@/assets/Sarita-instrument-artisan_1.jpg";
import musikawayanImgUrl from "@/assets/Musikawayan Malabon_1.jpg";

const bagoboImg = { url: bagoboImgUrl };
const calabigImg = { url: calabigImgUrl };
const karatongImg = { url: karatongImgUrl };
const diegoCeraImg = { url: diegoCeraImgUrl };
const kingFluteImg = { url: kingFluteImgUrl };
const lubuaganImg = { url: lubuaganImgUrl };
const majukayongImg = { url: majukayongImgUrl };
const tbolitImg = { url: tbolitImgUrl };
const huniImg = { url: huniImgUrl };
const saritaImg = { url: saritaImgUrl };
const musikawayanImg = { url: musikawayanImgUrl };

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
      'The craft is built on deep respect. Bamboo is harvested only after asking permission and giving thanks to the creator of all things, and always during the "dulom" — moonless nights believed to preserve the wood\'s strength and guard against insects like bukbok and fungal damage.',
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
      'Prof. Siegfredo "Ka Fred" Calabig\'s journey began in 1973 at the Philippine College of Commerce (now the Polytechnic University of the Philippines), where he founded a school-based group to explore the musical potential of indigenous materials. What started as a project with Laboratory High School principal Gloria R. Talastas grew into a lifelong mission to master the acoustic properties of kawayan. For over four decades, his workshop and rehearsal halls have been centers of innovation.',
      "He led the PUP Banda Kawayan for forty years, building a unique ensemble of young performers who played instruments fashioned entirely from bamboo and other indigenous materials. Under his guidance, the group grew from a local academic curiosity into the premier Banda Kawayan Pilipinas, celebrated as a national treasure on its 40th anniversary in 2013. His work proved, time and again, that music knows no boundaries.",
      "His baton has led bamboo ensembles to international expositions, music festivals, and concert tours across Europe, North America, Australia, the Middle East, and Asia. As ambassadors of goodwill, Calabig and his performers have showcased Philippine culture and tourism on the world stage, sharing the spirit of Filipino bamboo music with audiences everywhere.",
      "His approach combines traditional craftsmanship with orchestral precision. He favors species like Gigantochloa levis (Bolo) for his instruments, selecting rattle tubes from the nodes of Batibot bamboo for his Angklung sets and mounting them on sturdy frames of Kawayang Tinik for clarity and resonance — an attention to material science that lets his instruments withstand international travel and diverse climates.",
      "Through Banda Kawayan Pilipinas, he has trained generations of performers, instilling in them a deep appreciation for their cultural heritage. His work continues to shape the national K-12 curriculum, which now includes bamboo instrument playing to help students understand ethnic music more deeply. By mentoring these young artists, Prof. Calabig ensures that bamboo performance remains a vibrant part of the Philippine creative industry.",
    ],
  },
  {
    id: "karatong-festival",
    name: "Karatong (Dulagnon)",
    makerType: "Indigenous Peoples (IP)",
    location: "Dulag, Leyte",
    region: "Dulag, Leyte",
    expertise: "Karatong slit drums & festival ensembles",
    bio: "Guardians of the Waray spirit who transformed ancient warning signals into a vibrant celebration of Leyteño identity.",
    image: karatongImg.url,
    signature: ["Hagubhob bass pipes", "Karatong waist-slit drums", "Karatoktok percussion sets"],
    quote:
      "During the olden times, the karatong warned us of enemies; today, it calls our community together in dance and song.",
    body: [
      'In the Waray language of Leyte, "karatong" is the word for bamboo — but in the town of Dulag, it carries a deeper history of community defense and survival.',
      "Long before the Spanish colonial era, the people of Dulag used bamboo slit drums to warn the town of approaching enemies, from pirates to rival tribes seeking to invade their lands.",
      "These loud, rhythmic signals served as a vital communication network, while the bamboo itself was fashioned into spears for protection, weaving the material into the very fabric of their ancestral security.",
      "The modern Karatong tradition has evolved from these martial roots into intricate dance routines and musical performances that anchor the town's cultural heritage.",
      "Today, the Dulagnon ensemble plays a variety of specialized bamboo instruments, including the Hagubhob (bass pipes), which can measure up to 1.6 meters and are struck with rubber slippers to produce deep, low-frequency tones.",
      "This percussion-heavy sound is the heartbeat of their festivals, turning a tool of war into a vessel for communal joy.",
      "The craftsmanship of these instruments reflects deep local knowledge of material science, drawing on Gigantochloa levis (Bolo) for resonance and Bambusa spinosa for durability.",
      "Makers carefully split and thin the bamboo for instruments like the Karatoktok and clappers, keeping the walls thick enough to absorb heavy hits without cracking, yet flexible enough to rebound with a sharp, clapping resonance.",
      "Every piece, from the waist-tied Karatong drum used for announcements to the massive Bayawak pipes, is built to withstand the rigors of high-energy festival performances.",
    ],
  },
  {
    id: "diego-cera-organ-builders",
    name: "Diego Cera Organ-builders Inc.",
    makerType: "Commercial",
    location: "Las Piñas City",
    region: "Las Piñas City",
    expertise: "Bamboo pipe organs",
    bio: "Masters of the world-unique tradition of crafting and restoring complex pipe organs using the resilient culms of Philippine bamboo.",
    image: diegoCeraImg.url,
    signature: [
      "Las Piñas Bamboo Organ restoration",
      "Custom-made pipe organs",
      "Bamboo organ pipes",
    ],
    quote:
      "The bamboo organ is more than an instrument; it is the soul of Las Piñas made manifest in wood.",
    body: [
      "The legacy of the bamboo organ began in the Spanish era, when Fr. Diego Cera built the world-famous instrument in the historic church of Las Piñas. The tradition was revitalized and institutionalized in 1994 by Cealwyn Tagle, who founded Diego Cera Organ-builders Inc. to preserve the specialized knowledge needed to make bamboo breathe music. Their workshop remains in the historic heart of the city, carrying on the priest's namesake tradition.",
      "For centuries, the Las Piñas Bamboo Organ has stood as a testament to Filipino ingenuity, using locally available materials to replicate the complex sounds of traditional European pipe organs. The modern company is the pioneer pipe organ builder in the Philippines, ensuring this Spanish-era heritage remains a living, functional art form rather than a relic of the past — and it is world-famous for its singular focus on bamboo as an acoustic material.",
      "Their craftsmanship has earned international acclaim, with the company restoring and building bamboo organs for clients at home and abroad. The workshop is a cornerstone of cultural tourism in Las Piñas, drawing visitors from around the world to hear the mellow, distinct tones only bamboo pipes can produce. Custom-made pipe organs from the workshop can range from 500,000 to over 4.5 million pesos, reflecting their cultural and technical value.",
      "Building a bamboo organ is a feat of engineering, combining various bamboo diameters to achieve a wide range of musical pitches and tones. While some metal parts are necessary for the mechanical components, the heart of the instrument is made of pipes meticulously crafted from seasoned bamboo — a process that demands an expert understanding of how hollow, thin-walled structures can be shaped into resonant sound.",
      "By naming the company after Fr. Diego Cera, the team honors the original builder's spirit of innovation and adaptation. The modern workshop continues to lead the industry in the Philippines, acting as custodian of one of the country's most unique cultural landmarks. Through restoration and new construction, they ensure that the intricate skill of tuning and maintaining these massive bamboo structures is preserved for future generations of musicians and listeners.",
    ],
  },
  {
    id: "king-flute",
    name: "King Flute Philippines Inc.",
    makerType: "Commercial",
    location: "Alabat, Quezon",
    region: "Alabat, Quezon",
    expertise: "Bamboo flutes & panpipes",
    bio: "Pioneering inventors who spent a decade of research to perfect the professional-grade bamboo flute for the global stage.",
    image: kingFluteImg.url,
    born: "Quezon City · 1981",
    signature: ["True Sidewinder flutes", "16/22-pipe Pan flutes", "Micro flutes and keychains"],
    quote:
      "The bamboo flute is not just an instrument; it is a decade of trial and error perfected into a single note.",
    body: [
      "The story of King Flute began in 1981 with the late Dante Ursua, a multi-instrumentalist whose mastery of the saxophone, violin, and trombone fueled an obsession with the acoustic potential of Philippine bamboo. Ursua, a musician-turned-entrepreneur, spent ten laborious years in research and development, experimenting with local materials to create a stylish, professional-quality instrument.",
      'In the early years, his dedication was so absolute that he and his wife, Flordeliza, sold their experimental flutes on the sidewalks of Manila before their designs were finally perfected and recognized. King Flute became a household name in the Philippines by revolutionizing how bamboo is tuned and played, most notably through their patented "True Sidewinder" flute, which allows for side-blowing like a Western orchestral flute.',
      'Their workshop primarily uses Schizostachyum lima (Anos bamboo), harvested from the midsection of the poles to ensure the correct diameter and wall thickness for precise intonation. This commitment to technical excellence earned Dante Ursua a place in the Filipino Inventors Society, and the company the award for "Most Innovative Environmental Livelihood Project in the Philippines."',
      "Following Ursua's passing in 2011, his wife Flordeliza took the helm, leading the company to further international acclaim, including a Silver Prize at an inventors' competition in Korea in 2018. Today, their flutes are endorsed by the Department of Education for use in schools at every level, ensuring the next generation of Filipinos grows up playing an instrument that is both indigenous and world-class.",
      "Production remains rooted in Brgy. Caridad, Quezon, providing vital employment to the local community and continuing the legacy of a man who believed that creation and intellectual property should flow harmoniously together.",
    ],
  },
  {
    id: "lubuagan-tribe",
    name: "Lubuagan Tribe (Kalinga)",
    makerType: "Indigenous Peoples (IP)",
    location: "Lubuagan, Kalinga",
    region: "Lubuagan, Kalinga",
    expertise: "Byellingbing & Tungatong ensembles",
    bio: "The most famous ethnic group of the northern Philippines, guarding a rich tradition of music and dance that defines their identity in the Cordilleras.",
    image: lubuaganImg.url,
    signature: [
      "Byellingbing bamboo buzzers",
      "Tungatong stamping tubes",
      "Saggaypu pipe ensembles",
    ],
    quote:
      "We hold great importance in our traditions, for they are our identity and our bridge to the next generation.",
    body: [
      "The Kalinga of Lubuagan reside in the rugged terrain of the Cordillera Mountain Range, where music and dance remain inseparable from daily life. They are globally recognized for their traditional ba-ag (loincloths) and the intricate art of Byatok, or hand-tapped tattooing.",
      "For this tribe, traditional knowledge is a sacred inheritance, and they are famously careful about sharing their craft with outsiders to protect their heritage from misrepresentation or exploitation. Music serves as their voice, used in everything from weddings and baptisms to house blessings.",
      "The Lubuagan ensemble is a complex system of resonance and rhythm, featuring instruments like the Byellingbing (bamboo buzzer) and the Tungatong (stamping tubes). The Byellingbing is a six-piece percussion set played by striking the bamboo tongues against the palm to create a buzzing sound, while the Tungatong consists of tubes of varying lengths stomped against the ground.",
      'They also use the Saggaypu pipes during the Budong (peace pact) to welcome other tribes. These instruments often serve as substitutes for the Gangsa (metal gongs), proving the versatility and deep cultural value of "kawayan" in Kalinga life.',
      "The Lubuagan makers primarily use Schizostachyum lumampao (known locally as Buyu) for most of their ensembles, including the Patang-ug and the Patiteg xylophone. The bamboo is carefully sun-dried and air-dried for at least a week to prepare it for intricate skin carving and to prevent splitting.",
      "For the Kullibit zither, they raise strings directly from the bamboo skin using small bamboo frets, securing the ends with rattan to maintain tension. This meticulous process ensures each instrument can withstand the high-energy performances of their festivals.",
    ],
  },
  {
    id: "majukayong-tribe",
    name: "Majukayong Tribe",
    makerType: "Indigenous Peoples (IP)",
    location: "Natonin, Mt. Province",
    region: "Natonin, Mt. Province",
    expertise: "Ayég Udén & Tabbatab zithers",
    bio: "Fierce guardians of ancestral melodies who transformed a history of headhunting into a vibrant, peaceful musical identity.",
    image: majukayongImg.url,
    signature: ["Ayég Udén rainmakers", "Patangguk percussion tubes", "Tabbatab zither ensemble"],
    quote:
      "Our music makes our occasions lively and keeps the memory of our ancestors alive in every beat.",
    body: [
      "The Majukayong tribe resides in the barangays of Maducayan and Saliok, where their traditions and dialect remain closely related to the Kalinga. Historically known for their bravery and protective nature, they have long since transitioned from ancient headhunting practices to a culture rooted in peace and ancestral remembrance.",
      "Music and dance are the heart of their communal occasions, honoring their ancestors and passing the soul of the tribe on to younger generations. Like their neighbors, they remain cautious with their traditional knowledge, treating it with the respect it deserves.",
      "The Majukayong musical repertoire is deeply functional and tied to specific rites. The Ayég Udén is a bamboo rainmaker filled with pebbles or seeds, used exclusively by tribe elders to call for rain. For courtship and marriage rites such as the Bérogwey, they play the Jungajung (stomping tubes) and the Patangguk (quill-shaped percussion tubes).",
      "The Patangguk is particularly significant — played by men visiting the house of a future bride, and sounded at night to ward off bad omens. Their music is not mere entertainment; it is a spiritual shield and a communal bond.",
      "Their craftsmanship relies heavily on Schizostachyum lumampao (known locally as Vuru) and Gigantochloa levis (Béyog). For instruments like the Béllingving (buzzers), they adjust pitch using the tuknor, a woven rattan ring that acts as a capo.",
      "The Tabbatab zither ensemble is especially complex, featuring either two strings over a bamboo plate or a single string across a resonant tube. These instruments are carefully air-dried for at least a week, with the nodes perforated for wind instruments like the Bérédong so the player's breath can flow freely through the wood.",
    ],
  },
  {
    id: "tboli-tribe",
    name: "T'Boli Tribe",
    makerType: "Indigenous Peoples (IP)",
    location: "Lemsnolon, South Cotabato",
    region: "Lemsnolon, South Cotabato",
    expertise: "Sludoy zithers & Tnonggong drums",
    bio: "Indigenous dream-weavers of South Mindanao whose bamboo music is a sacred dialogue between nature and their spiritual beliefs.",
    image: tbolitImg.url,
    born: "Lake Sebu · South Cotabato",
    signature: [
      "Sludoy polychordal zithers",
      "Tnonggong barrel drums",
      "Kumbing jaw harps with case",
    ],
    quote:
      "Our music expresses what we feel, attracts the cold air in the heat, and speaks for the nature that surrounds us.",
    body: [
      "The T'boli are among the most celebrated indigenous groups in the Philippines, centered in the highland lake complex of Sebu, Selutan, and Lahit. They are world-famous for their T'nalak textile, woven by \"dream weavers\" who receive patterns in their sleep.",
      "Their musical culture is equally rich and deeply connected to their worldview; they have specific instruments played during a lunar eclipse to call upon a warrior to slay the creature swallowing the moon. This culture is exceptionally well-preserved, with even the T'boli youth actively participating in the practice of their traditional songs and instruments.",
      'The T\'boli ensemble features a wide array of specialized instruments, including the Sludoy (polychordal zither), the Kumbing (jaw harp), and the Tnonggong (barrel drum). The Tnonggong is typically played by males and is covered with deer, goat, or horse skin; it is a sacred object, and "stepping over" it is strictly prohibited as it is believed to result in the enlargement of the breast or scrotum.',
      "For leisure and entertainment, they play the Dwegey, a single-stringed bowed lute with a neck made of bamboo and a resonator fashioned from a coconut shell. Their craft process involves ancient preservation techniques like smoking the bamboo to ensure durability.",
      "They utilize Bambusa spinosa for their Sludoy and Kumbing, while the larger Tnonggong and the neck of the Dwegey are made from Afus bamboo (Dendrocalamus asper). The Kumbing is often protected by a specialized bamboo case called a sokong.",
      'For their flutes like the Sloli and Hlendeg, they use "seben" bamboo and create intricate designs by slightly burning the wood with hot metal, often depicting patterns inspired by insects and the surrounding forest.',
    ],
  },
  {
    id: "huni-ukulele",
    name: "Huni Ukulele",
    makerType: "Commercial",
    location: "Mandaue, Cebu City",
    region: "Mandaue, Cebu City",
    expertise: "Bamboo ukuleles",
    bio: "Innovation-driven Cebuano artisans redefining the sound of the Visayas through sustainable, professional-grade bamboo veneers.",
    image: huniImg.url,
    born: "Cebu City",
    signature: [
      "Tenor round-shape ukuleles",
      "Concert standard ukuleles",
      "Soprano tear-drop ukuleles",
    ],
    quote:
      "Bamboo is an endless resource, and making it sing is our way of protecting the environment for the next generation.",
    body: [
      'Huni Ukulele is the brainchild of the specialized shop UKeCEBU, born from a desire to build a local brand that authentically represents the rich culture and world-class craftsmanship of the Cebuanos. Based in the industrial hub of Mandaue, the workshop creates "bambooleles" as a direct response to the environmental changes and ecological challenges facing the country.',
      "They chose bamboo not only for its distinct acoustic resonance but for its endless renewability, ensuring their work has a minimal effect on the environment. For the artisans at Huni, making bamboo ukuleles is a socially responsible choice — one that produces durable, high-quality instruments serving as both musical tools and cultural gift items.",
      "Their production process uses bamboo veneers and laminated materials to ensure the stability and longevity of the instrument's body, a necessary innovation to handle string tension while keeping the bright, crisp tone associated with the ukulele. This approach has let them scale their craftsmanship into a sustainable business model that honors Cebu's long-standing reputation as the guitar-making capital of the Philippines.",
      'Their workshop produces a diverse range of models, including the round-shaped Tenor, the standard Concert, and the tear-drop Soprano. By merging modern manufacturing techniques with traditional Cebuano aesthetics, Huni Ukulele has carved out a unique space in the creative industry — proving that "kawayan" can match the professional standards of traditional tonewoods while paving the way for a more sustainable future in Philippine lutherie.',
    ],
  },
  {
    id: "musikawayan-malabon",
    name: "Musikawayan Malabon",
    makerType: "Commercial",
    location: "Malabon City",
    region: "Malabon City",
    expertise: "Musikong Bumbong & innovative BMIs",
    bio: 'Legacy craftsmen of the "Original Malabon Musikong Bumbong," preserving a century-old Katipunero tradition of bamboo wind bands.',
    image: musikawayanImg.url,
    born: "Tonsuya, Malabon · 1896",
    signature: [
      "Bumbong sousaphone-style tubes",
      "Bamban bamboo trumpets",
      "Barimbao bamboo clarinets",
    ],
    quote:
      "We play the instruments of our ancestors, born from the heart of the revolution and the strength of the kawayan.",
    body: [
      "Musikawayan Malabon is the guardian of a tradition that began in 1896, organized by Katipuneros from Tonsuya, Malabon. Originally known as D' Original Malabon Musikong Bumbong, the group was founded by an illustrious inventor of bamboo musical instruments, whose legacy is now carried by his fourth-generation descendant, Ret. Col. Gilbert M. Ramos.",
      'Their historical and artistic significance runs deep enough to have earned them a place in the Cultural Center of the Philippines\' Encyclopedia of Philippine Art, as well as a feature in the "Tuklas Sining" documentary series on the seven arts. The group is world-famous for its ability to mimic modern orchestral instruments using bamboo.',
      "Their signature works include the Bumbong, a bass bamboo tube designed to imitate the sousaphone tuba, and the Bamban, an innovative bamboo trumpet capable of full melodies and harmonies. One of their oldest and most specialized instruments is the Barimbao (bamboo clarinet), in production since 1982.",
      "They also craft unique hybrids like the Rambusak, a bamboo saxophone, and the Tipangklung, angklung sets tied to a frame with rubber bands. The process at Musikawayan blends traditional curing with material science.",
      "They use Bambusa spinosa (Kauayang-tinik) for their bass Bumbongs and Cyrtochloa hirsuta for innovative wind instruments like the Bamban and Barimbao. The bamboo needs three to four months of drying before it can be fashioned into an instrument.",
      'To protect the culms from powder-post beetle ("bukbok") attacks and speed the drying process, they expose the bamboo to fire charcoal — a technique that preserves both the structural and tonal quality of the wood.',
    ],
  },
  {
    id: "sarita-instrument-artisan",
    name: "Sarita Instrument Artisan",
    makerType: "Commercial",
    location: "Dipolog City",
    region: "Dipolog City",
    expertise: "Engineered bamboo Rondalla & Angklung",
    bio: "Visionary innovators who redefined the Philippine Rondalla by mastering the use of engineered bamboo for professional-grade string instruments.",
    image: saritaImg.url,
    born: "Dipolog · Zamboanga Del Norte",
    signature: [
      "Engineered Bamboo Banduria & Laud",
      "3 ½-octave Bamboo Marimba",
      "Engineered frame Angklung sets",
    ],
    quote:
      "Bamboo is the key to making the Filipino Rondalla sustainable and accessible to every student in the country.",
    body: [
      "Jay Sarita, director of the Dipolog Community Rondalla, has dedicated his entire career to the advancement of rondalla music. Through his workshop, Sarita Instrument Artisan, he has earned a reputation as one of the most reliable instrument makers in the Philippines.",
      "His most significant contribution to the Philippine creative industry is reinventing rondalla instruments — traditionally made from expensive hardwoods — crafted entirely from bamboo. His work bridges the gap between traditional folk instrumentation and modern professional standards.",
      "The Sarita workshop produces a full range of ensemble instruments, including the Banduria, Octavina, Laud, Guitar, Mandola, Piccolo Banduria, Double Bass, and even ukuleles. Their bamboo Marimbas are unique, featuring bamboo tone scales and metal tube resonators to achieve precise tuning across three or three-and-a-half octaves.",
      "These instruments are built for high-level performance, not display, and are used by the Dipolog Community Rondalla to showcase the world-class potential of Philippine bamboo. Sarita's technical approach relies on engineered bamboo and specific species like Gigantochloa levis (Bolo) for his Angklung sets.",
      "Unlike traditional IP instruments that use raw culms, Sarita uses laminated and engineered bamboo to keep complex string instruments like the Banduria and Octavina stable and resonant under high string tension. For his Angklung, he attaches G. levis tubes to an engineered bamboo frame, creating an instrument that is both ecologically sustainable and durable enough for international use.",
    ],
  },
];

// Bamboo species data lives in @/data/species (sourced from CONTENT-SOURCE/bamboo-content).
