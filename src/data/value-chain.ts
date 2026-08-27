// Sourced from CONTENT-SOURCE/value-chain-analysis/value-chain-analysis-website-content.md
import valueChainMap from "@/assets/value-chain/bmi-value-chain-map.png";

export const VC_MAP_IMAGE = valueChainMap;

export interface VcBullet {
  label?: string;
  text: string;
}

export type VcBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: VcBullet[] }
  | { type: "flow"; items: VcBullet[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface VcSubsection {
  heading?: string;
  blocks: VcBlock[];
}

export interface VcSection {
  id: string;
  number: string;
  title: string;
  blocks: VcBlock[];
  subsections?: VcSubsection[];
}

const p = (text: string): VcBlock => ({ type: "paragraph", text });
const bullets = (items: VcBullet[]): VcBlock => ({ type: "bullets", items });
const flow = (items: VcBullet[]): VcBlock => ({ type: "flow", items });

export const VC_TITLE =
  "Deep-Dive Value Chain Analysis (VCA) of the Philippine Bamboo Musical Instruments (BMI) Industry";
export const VC_SUBTITLE =
  "A Socioeconomic and Operational Mapping of Craftsmanship, Culture, and Commerce";

export const VC_EXECUTIVE_SUMMARY = [
  "This document provides an unshortened, comprehensive analysis of the socioeconomic and operational landscape of the Bamboo Musical Instruments (BMI) industry in the Philippines. Conducted under the Bamboo Musical Instruments Innovation R&D Program of the DOST-Forest Products Research and Development Institute (DOST-FPRDI), this diagnostic maps the pathways of raw materials, capital, information, and labor from the bamboo forests to the final consumer.",
  "By analyzing the actors, support services, and the broader business enabling environment, this study identifies critical industry bottlenecks and highlights the pathways through which scientific R&D—such as advanced seasoning, thermal modification, and computer-aided prototyping—can empower local craftsmen, integrate indigenous traditions, and boost competitiveness in both domestic and international markets.",
];

export const VC_SECTIONS: VcSection[] = [
  {
    id: "introduction",
    number: "1",
    title: "Introduction: BMIs in the Creative and Cultural Industries",
    blocks: [
      p(
        "The manufacture of musical instruments in the Philippines is much more than a fabrication process; it is a highly specialized, artisanal craft. Within the global framework of the creative and cultural economy, the production of bamboo musical instruments (BMIs) is classified as an ancillary service to three key sectors:",
      ),
      bullets([
        { text: "Cultural Heritage" },
        { text: "Artistic Crafts" },
        { text: "Performing Arts / Music" },
      ]),
      p(
        "These sectors represent three of the nine core sub-sectors of the creative and cultural industries identified globally by UNESCO (de Voldere 2017).",
      ),
    ],
    subsections: [
      {
        heading: "The Nature of an Ancillary Service",
        blocks: [
          p(
            "As an ancillary service, the manufacture and supply of BMIs act as structural pillars that support and facilitate the core creative chain rather than being a standalone, isolated creative activity. For example, the creation of a high-quality, tuned bamboo instrument directly enables a musician to perform, a theater group to stage a play, or a school to preserve indigenous music.",
          ),
        ],
      },
      {
        heading: 'The "Short-Chain" Structural Characteristic',
        blocks: [
          p(
            "Unlike heavy manufacturing sectors with highly fragmented, globally distributed divisions of labor, the BMI value chain is characterized by its short, highly integrated structure. In most local BMI enterprises, a single individual—typically the shop owner or master craftsman—performs several overlapping activities across the entire value chain:",
          ),
          bullets([
            {
              label: "Procurement",
              text: "Personally selecting and harvesting mature bamboo poles.",
            },
            {
              label: "Production",
              text: "Executing mechanical processing, carving, assembly, and manual ear-tuning.",
            },
            {
              label: "Marketing & Sales",
              text: "Handling negotiations, direct peddling, online marketing, and customer relations.",
            },
          ]),
          p(
            "While this short-chain model allows for exquisite artistic control, it presents severe challenges in scaling production, maintaining consistent standards, and mitigating raw material bottlenecks.",
          ),
        ],
      },
    ],
  },
  {
    id: "core-functions",
    number: "2",
    title: "Core Functions of the BMI Value Chain",
    blocks: [
      p(
        "The core operational flow of the BMI industry is divided into three primary sequential functions: Raw Material Procurement, Production / BMI Making, and Marketing and Distribution.",
      ),
    ],
    subsections: [
      {
        heading: "A. Raw Material Procurement and Sourcing",
        blocks: [
          p(
            "Sourcing the correct raw material is the critical first gate of the entire value chain. Because of the physical and acoustic diversity of bamboo, different musical instruments require highly specific species, wall thicknesses, and diameters:",
          ),
          bullets([
            {
              label: "Schizostachyum lumampao (Blanco) Merr.",
              text: "Characterized by thin walls and exceptionally long internodes. This physical structure provides a natural sound resonating through its cavity, making it the ideal raw material for thin-walled percussion instruments such as pipes, tubes, and buzzers.",
            },
            {
              label: "Dendrocalamus asper (Schultes f.) Backer ex Heyne (Giant Bamboo)",
              text: "Features thick, robust walls and a fibrous skin. These physical properties are excellent for stringed bamboo musical instruments like zithers, and provide the structural density needed for carved slit drums.",
            },
            {
              label: "Schizostachyum lima (Blanco) Merr.",
              text: "Known for its narrow, small diameter, making it the preferred species for delicate wind instruments like flutes.",
            },
          ]),
          p(
            "High-quality botanical identification of local bamboo species is essential to match raw materials with their acoustic applications.",
          ),
        ],
      },
      {
        heading: "Harvesting Pathways and Actor Groups",
        blocks: [
          p(
            "The procurement function is divided into two distinct socio-technical pathways based on the background of the instrument maker.",
          ),
        ],
      },
      {
        heading: "1. Indigenous (IP) Makers and Traditional Harvesting",
        blocks: [
          p(
            "Most makers of traditional or indigenous BMIs belong to Indigenous Peoples (IP) communities. They gather wild bamboo poles themselves from local forests, following traditional cultural practices that inherently ensure quality control:",
          ),
          bullets([
            {
              label: "Maturity Selection",
              text: "They personally select only mature, stable poles.",
            },
            {
              label: "Seasonal Harvesting",
              text: "Cutting is strictly restricted to certain months of the year based on ancestral observations, which they claim makes the poles significantly less prone to natural biodeterioration and pest attacks.",
            },
            {
              label: "Site Camping",
              text: "Artisans commonly camp on-site in the forests for one to two weeks to maximize the efficiency of each harvesting trip.",
            },
            {
              label: "Regulatory Compliance",
              text: "Indigenous makers adhere to local community protocols and acquire all necessary government permits to gather forest resources legally.",
            },
          ]),
        ],
      },
      {
        heading: "2. Commercial Makers and Suppliers/Traders",
        blocks: [
          p(
            "Makers producing non-indigenous, commercialized instruments (such as Western-style flutes, angklungs, or marimbas) typically procure their poles from trusted suppliers, gatherers, or timber traders.",
          ),
          bullets([
            {
              label: "Supplier Flexibility",
              text: "The relationship is built on the supplier's willingness to customize orders—such as pre-cutting poles to specified lengths or pre-processing raw bamboo into specific parts.",
            },
            {
              label: "Secondary Processing",
              text: "To shorten their own manufacturing time, commercial makers often order pre-processed parts, such as bamboo sticks of varying sizes used for angklung frames, from specialized secondary processors.",
            },
            {
              label: "Luthiery Sourcing and Lamination",
              text: "Luthiers who craft high-end stringed instruments (guitars, ukuleles, and bandurrias) require flat, structurally uniform sheets rather than hollow poles. They buy laminated bamboo panels or engineered bamboo slats from secondary processors.",
            },
            {
              label: "The Import Bottleneck",
              text: "Because the acoustic performance of a stringed instrument is highly sensitive to the bonding and density of the panel, luthiers demand flawless quality. Due to technical limitations and inconsistent quality among local e-bamboo suppliers, some local luthiers have been forced to bypass local markets and import engineered bamboo panels directly from China.",
            },
          ]),
        ],
      },
      {
        heading: "B. Production and Artisanal BMI Making",
        blocks: [
          p(
            "The production stage represents the core value-adding function where raw agricultural forest products are transformed into musical tools.",
          ),
        ],
      },
      {
        heading: "The Highly Skilled Workforce",
        blocks: [
          p(
            "BMI makers and artisans are classified as a highly skilled workforce. The crafting of traditional bamboo instruments in IP communities is deeply tied to rituals, oral histories, and community celebrations, with the technical skills passed down as sacred heritage from generation to generation. The growing market demand outside these communities has created sustainable livelihood opportunities for both indigenous groups and commercial, non-IP craftsmen who have adopted these techniques.",
          ),
        ],
      },
      {
        heading: "Operational Mechanics of the Artisanal Shop",
        blocks: [
          p(
            "In the Philippines, BMI manufacturing remains strictly artisanal. The vast majority of enterprises are micro-sized shops where the owner is the head craftsman, directing all operations and executing the most sensitive steps.",
          ),
          bullets([
            {
              label: "Tooling",
              text: "Production relies heavily on manual hand-tools combined with basic power tools. Standard equipment includes bolos, knives, specialized chisels, rip saws, clamp bars, hand-sanders, rubber mallets, blow torches for heat-straightening, and power drills.",
            },
            {
              label: "Non-Standardized Layouts",
              text: 'Traditional instrument making does not follow standardized mathematical templates. For instance, the placement and distance between finger holes on traditional flutes are frequently measured using the width of the artisan’s own fingers (e.g., "two or three fingers"). This results in unique, highly personalized instruments but presents significant challenges for acoustic uniformity.',
            },
            {
              label: "Labor Structure",
              text: "Most micro-shops operate on a per-order basis. To control overhead costs, the owner typically operates alone or with family, hiring an additional 1 to 3 workers temporarily when large purchase orders are secured. A major exception is the specialized team of the Las Piñas Bamboo Organ builder, which employs a permanent, structured team of more than ten specialized workers per restoration project.",
            },
          ]),
          p(
            "The production of Philippine bamboo musical instruments is still a deeply personal, artisanal craft requiring extraordinary manual dexterity.",
          ),
        ],
      },
      {
        heading: "The Mastery of Tuning",
        blocks: [
          p(
            "The ultimate value of a musical instrument lies in its voice. Carving out a hollow bamboo culm to the precise hole size, wall thickness, angle, and internal length required to achieve a clean, accurate pitch takes years of practice.",
          ),
          bullets([
            {
              label: "Tuning by Ear",
              text: "Tuning is the single most critical and respected step in production. While digital tuners are widely used to assist non-traditional instrument making, the final shaving, trimming, and internal scraping of the bamboo nodes to correct natural sound anomalies require an artisan with a highly trained, sensitive ear for music. This acoustic mastery cannot easily be automated and represents the primary barrier to entry for new makers.",
            },
          ]),
        ],
      },
      {
        heading: "C. Marketing and Distribution Channels",
        blocks: [
          p(
            "This function encompasses the pathways that bridge the gap between the workshop and the final consumer. The distribution strategies differ dramatically depending on the scale and style of the instrument.",
          ),
          flow([
            {
              label: "1. Direct Peddling",
              text: "Makers travel to Manila/Cebu → sold directly to passers-by, tourists, and handicraft souvenir stalls.",
            },
            {
              label: "2. Institutional",
              text: "Sales representatives → secure bulk Purchase Orders from schools, department stores, and bookstores.",
            },
            {
              label: "3. Retail Portals",
              text: "Musical instrument stores → handle custom orders and consignment agreements (no active floor displays).",
            },
            {
              label: "4. Digital Paths",
              text: "Facebook business pages → mainstream commercial sales (primarily non-indigenous/modern instruments).",
            },
            {
              label: "5. Referral Networks",
              text: "Word-of-mouth → academic and cultural networks for authentic, master-crafted indigenous instruments.",
            },
          ]),
        ],
      },
      {
        heading: "1. Direct Peddling and Souvenir Sales",
        blocks: [
          p(
            "Many independent flute makers travel directly from their provinces to large urban tourist hubs like Manila and Cebu. They peddle their instruments on foot to passers-by, tourists, or directly negotiate with permanent souvenir stalls in local handicraft markets.",
          ),
        ],
      },
      {
        heading: "2. Institutional Sales Representatives",
        blocks: [
          p(
            "The largest, most commercially successful bamboo flute producers employ dedicated sales representatives. These reps actively pitch to large institutional buyers—such as major nationwide bookstores, department stores, and schools. Once a bulk price is negotiated, they secure a formal Purchase Order (PO) and deliver it to the workshop for batch production.",
          ),
        ],
      },
      {
        heading: "3. Musical Instrument Stores",
        blocks: [
          p(
            "Traditional music stores also serve as distribution channels. While BMIs are rarely kept on permanent display shelves due to their specialized nature, customers can place custom fabrication orders through these retail shops, which coordinate with trusted luthiers.",
          ),
        ],
      },
      {
        heading: "4. Digital Marketing and Social Media",
        blocks: [
          p(
            "Selling online via Facebook accounts is highly popular and effective for makers of non-indigenous instruments (such as custom bamboo guitars or modern marimbas). However, this digital pathway is rarely used by traditional, indigenous IP makers. Instead, traditional artisans rely on word-of-mouth referrals and deep-seated networks of trust passed around through academic, artistic, and cultural heritage networks.",
          ),
        ],
      },
    ],
  },
  {
    id: "market-segmentation",
    number: "3",
    title: "Market Segmentation and Customer Profiles",
    blocks: [
      p(
        "Understanding the target market is essential for proper product positioning and pricing. The BMI industry serves three highly distinct customer profiles:",
      ),
    ],
    subsections: [
      {
        heading: "1. High-Value Niche Market (Hobbyists and Collectors)",
        blocks: [
          bullets([
            {
              label: "Customer Profile",
              text: "Consists of affluent domestic and foreign collectors, professional musicians, academic researchers, and hobbyists who possess a structured, advanced knowledge of the history, acoustics, and craftsmanship of the product.",
            },
            {
              label: "Purchasing Drivers",
              text: "They actively seek guaranteed cultural authenticity, premium master-tuning, and unique hand-crafted designs (such as traditional story-telling etchings on the bamboo skin).",
            },
            {
              label: "Market Dynamics",
              text: "These consumers are relatively price-insensitive and are highly willing to pay a premium for certified craftsmanship and artistic authorship.",
            },
          ]),
        ],
      },
      {
        heading: "2. Price-Sensitive Mass Market (Tourists and General Public)",
        blocks: [
          bullets([
            {
              label: "Customer Profile",
              text: "Comprises random consumers, schools seeking basic instruments, and tourists browsing department stores, bookstores, or local native souvenir shops.",
            },
            {
              label: "Purchasing Drivers",
              text: "These buyers value utility, playability, and price over artistic authorship. They purchase instruments as souvenirs, decorative crafts, or basic introductory learning tools.",
            },
            {
              label: "Market Dynamics",
              text: "This market is highly price-sensitive and is dominated by commercial, less personalized, large-scale production runs of non-indigenous flutes and whistles.",
            },
          ]),
        ],
      },
      {
        heading: "3. Institutional Ensemble Market (Schools, LGUs, and Cultural Groups)",
        blocks: [
          bullets([
            {
              label: "Customer Profile",
              text: "Consists of public and private schools, Local Government Units (LGUs), church choirs, and state-funded cultural performing groups.",
            },
            {
              label: "Purchasing Drivers",
              text: 'They purchase large, harmonized instrument sets—specifically angklungs and marimbas designed to be played together in a coordinated "Pangkat Kawayan" (bamboo ensemble).',
            },
            {
              label: "Market Dynamics",
              text: "Driven heavily by educational mandates and municipal cultural festivals. This segment represents stable, high-volume orders but is constrained by public education budgets.",
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "information-and-money",
    number: "4",
    title: "Flow of Information and Money",
    blocks: [
      p(
        "The transactions and communications within the BMI value chain form a dynamic, reactionary loop between suppliers, the BMI maker, and target markets:",
      ),
      flow([
        {
          label: "Suppliers",
          text: "Poles, slats, sticks, accessories — exchange raw-material orders and transactional information with the maker.",
        },
        {
          label: "BMI Maker",
          text: "Owner-operator / master craftsman — receives custom orders, feedback, and repair requests; sends finished BMIs and promotional info to markets.",
        },
        {
          label: "Target Markets",
          text: "Schools, students, churches, musicians, collectors/hobbyists, tourists — the ultimate source of profit flowing back through the chain.",
        },
      ]),
    ],
    subsections: [
      {
        heading: "A. Information Flows",
        blocks: [
          p(
            "Information travels in two directions along the chain and is categorized into two types:",
          ),
          bullets([
            {
              label: "Promotional Information",
              text: "Product specifications, pricing, cultural stories, and custom service offerings. This originates from the BMI maker and is pushed outward to potential buyers via direct person-to-person demonstrations, cultural workshops, or social media.",
            },
            {
              label: "Transactional Information",
              text: "This flow is highly collaborative and goes both ways. Procurement side: the BMI maker contacts suppliers to place custom orders, exchanging specifications on volume, diameter, length, delivery schedules, and bulk pricing. Sales side: the buyer communicates order requirements, custom tuning preferences, or delivery instructions to the maker. Post-sale transactional info also includes customers requesting maintenance, repair, or tuning services.",
            },
          ]),
        ],
      },
      {
        heading: "B. Money Flows and Cash Inflows",
        blocks: [
          p(
            "Cash flows downward from the buyers to the BMI makers, and then further downward to the raw material suppliers. For a BMI micro-enterprise, cash inflows are successfully diversified into three distinct revenue streams:",
          ),
          bullets([
            {
              label: "Direct Sales",
              text: "Revenue generated from selling finished bamboo instruments (flutes, marimbas, angklungs, guitars).",
            },
            {
              label: "Specialized Maintenance Services",
              text: "Payments received for executing high-skill repair, restoration, and acoustic re-tuning of older instruments.",
            },
            {
              label: "Educational Services",
              text: "Fees earned from teaching buyers how to play, conducting specialized workshops, and organizing ensemble rehearsals.",
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "value-chain-map",
    number: "5",
    title: "Value Chain Map (Visual Guide)",
    blocks: [
      p(
        "This conceptual flow diagram illustrates how raw materials, labor, information, and financial capital move through the BMI ecosystem, surrounded by the critical support services and the business enabling environment (BEE):",
      ),
    ],
  },
  {
    id: "pricing",
    number: "6",
    title: "Price-Setting Mechanics",
    blocks: [
      p(
        "Setting the price of a bamboo musical instrument is a complex, delicate process that must balance rigid cost accounting with highly subjective artistic valuations.",
      ),
    ],
    subsections: [
      {
        heading: "A. Tangible Cost Inputs",
        blocks: [
          p(
            "The foundational floor price of an instrument is calculated by summing the direct tangible costs incurred during production:",
          ),
          bullets([
            {
              label: "Raw Materials",
              text: "The cost of selected bamboo poles, pre-cut sticks, specialized finishes, and metal/string accessories.",
            },
            {
              label: "Direct Labor",
              text: "The hours spent preparing, curing, carving, and tuning the instrument, multiplied by the daily wage rate of hired assistants.",
            },
            {
              label: "Overhead",
              text: "Shop costs including charcoal or propane for blowtorches, electricity for sanders/drills, and transport costs for procurement.",
            },
          ]),
        ],
      },
      {
        heading: "B. Intangible Value Inputs",
        blocks: [
          p(
            "Because the BMI industry is artisanal and deeply cultural, the final market price is heavily driven by intangible inputs that reflect the unique qualities the maker imparts to the instrument:",
          ),
          bullets([
            {
              label: "Artisan Stature and Reputation",
              text: "The prestige and recognition of the master craftsman within the music and academic community.",
            },
            {
              label: "Acoustic Expertise",
              text: "The unmatched value of the maker’s specialized ear-tuning.",
            },
            {
              label: "Design Uniqueness",
              text: "The presence of one-of-a-kind hand-carved artistic designs or cultural etchings.",
            },
            {
              label: "Market Positioning",
              text: "Aligning the price with the specific target segment (mass souvenir vs. elite collection).",
            },
          ]),
        ],
      },
      {
        heading: "The Pricing Spectrum",
        blocks: [
          p("This dual-input model creates a vast pricing spectrum for BMIs in the Philippines:"),
          bullets([
            {
              label: "Mass-Produced Souvenir Flutes",
              text: "Distributed widely through tourist shops and bookstores, these instruments are valued strictly by price and basic utility, commanding very low, accessible prices.",
            },
            {
              label: "Master-Craftsman Made-to-Order Flutes",
              text: 'Crafted by a revered "master craftsman" of the Cordilleras, featuring intricate custom-etched designs, flawless acoustic tuning, and certified authenticity, these single flutes are sold to collectors for as much as Php 5,000.',
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "support-services",
    number: "7",
    title: "Critical Support Services: Maintaining and Enhancing Value",
    blocks: [
      p(
        "In the BMI value chain, support services are vital activities that facilitate and protect the flow of core activities, ensuring customer satisfaction and driving repeat business.",
      ),
    ],
    subsections: [
      {
        heading: "A. Product Maintenance and Preservation",
        blocks: [
          p(
            "Because bamboo is an organic, hygroscopic material, instruments naturally shift, lose pitch, or suffer physical wear over time due to humidity changes.",
          ),
          bullets([
            {
              label: "Specialized Tuning & Repair",
              text: "Restoring an instrument’s physical and acoustic integrity requires the exact same level of master-skill as original fabrication. This service can typically only be performed by the original maker or an equally skilled craftsman.",
            },
            {
              label: "Cultural Heritage Conservation",
              text: "This support service expands into high-level historic conservation. For example, the Las Piñas Bamboo Organ, declared a National Cultural Treasure in 2003, requires ongoing expert restoration, repair, and delicate acoustic maintenance to preserve its historic voice. The BMI makers and specialized restorers involved act as vital heritage conservators.",
            },
          ]),
        ],
      },
      {
        heading: "B. Enhancing Consumer Experience",
        blocks: [
          p(
            "Unlike simple commodities, many buyers do not automatically know how to play or care for a specialized bamboo instrument. To sustain business viability, successful makers actively expand into experience-driven support services:",
          ),
          bullets([
            {
              label: "Educational Training",
              text: "Teaching buyers how to play and maintain their instruments, ensuring they gain immediate satisfaction and utilize the product fully.",
            },
            {
              label: "Ensemble Support & Repertoires",
              text: "For complex group instruments like angklungs and marimbas, makers provide school bands with pre-arranged performing repertoires, custom musical arrangements of popular songs, and direct group training. This specialized service is highly valued by educators and is crucial for securing high-volume, continuous institutional sales.",
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "business-enabling-environment",
    number: "8",
    title: "The Business Enabling Environment (BEE)",
    blocks: [
      p(
        "The movement of products and actors along the BMI value chain is constantly influenced, facilitated, or constrained by the broader Business Enabling Environment (BEE).",
      ),
    ],
    subsections: [
      {
        heading: "A. Educational Institutions and Curricula",
        blocks: [
          p(
            "Educational policies represent the largest single driver of domestic institutional demand for BMIs:",
          ),
          bullets([
            {
              label: "The Music Law (RA 4723)",
              text: "Passed in 1966, this historic law mandated the teaching of music and art as separate subjects in elementary schools, laying the foundation for musical instrument demand.",
            },
            {
              label: "Modern K-12 Curriculum (2013)",
              text: "Presently, music is integrated into the composite Music, Arts, Physical Education, and Health (MAPEH) subject, with drama/theater integrated into Music and Art for Grades 7 to 10.",
            },
            {
              label: "Culture and Heritage Modules",
              text: "The revised K-12 curriculum puts a powerful emphasis on building cultural awareness and appreciation for Philippine culture through music, specifically utilizing Cordillera bamboo instruments. Specialized modules, such as the Instrumental Music of the Cordillera for Grade 7, have been designed to teach students how indigenous groups express history, environment, and beliefs through these instruments.",
            },
            {
              label: "The Funding Bottleneck",
              text: 'Despite these excellent curriculum goals, the curriculum does not strictly mandate the actual playing of the instruments. Furthermore, due to a severe lack of funding—particularly in underfunded public schools—most schools cannot afford to purchase the necessary bamboo instrument sets to form a school "Pangkat Kawayan" ensemble. Consequently, actual physical demonstrations and hands-on playing are frequently omitted from lessons, limiting the market potential.',
            },
          ]),
        ],
      },
      {
        heading: "B. Supporting Creative Industries Legislation",
        blocks: [
          p(
            "The overall robustness of national creative policies directly impacts the viability of BMI workshops:",
          ),
          bullets([
            {
              label: "Legal Foundations",
              text: 'There are approximately 12 national laws and regulations that influence the creative sector, starting with Section 15 of the "Arts and Culture" Chapter of the 1987 Philippine Constitution, which mandates the state to conserve, promote, and popularize the nation’s historical and cultural heritage.',
            },
            {
              label: "The NCCA",
              text: "Established in 1992, the National Commission for Culture and the Arts serves as the primary policy-making body for preserving and developing Philippine arts.",
            },
            {
              label: "Creative Industries Development Act (CIDA)",
              text: "This landmark legislation establishes a unified council composed of government agencies and private sector leaders to actively implement plans promoting creative industries—specifically protecting and promoting performing arts, traditional cultural expressions, and traditional crafts, which directly aligns with the BMI sector.",
            },
          ]),
        ],
      },
      {
        heading: "C. Programs and Policies Supporting MSMEs",
        blocks: [
          p(
            "Since almost all BMI makers operate as micro-enterprises, they rely heavily on state-level micro-small-and-medium enterprise (MSME) support systems:",
          ),
          bullets([
            {
              label: "The DTI MSME Development Program",
              text: "Driven by the Department of Trade and Industry (DTI), this program focuses on helping micro-shops improve productivity, expand access to formal financial products, and enter mainstream digital and retail markets.",
            },
            {
              label: "The DOST SETUP Program",
              text: "The Department of Science and Technology’s (DOST) Small Enterprise Technology Upgrading Program (SETUP) provides critical technical support: seed funding for technology acquisition; upgrading of woodworking equipment; technical training and technology-transfer consultancies; professional packaging and label design; and product testing, calibration, and standard-setting support.",
            },
            {
              label: "The DOST-FPRDI",
              text: "As a key research arm of DOST, the Forest Products Research and Development Institute is the technical engine of the industry, developing and transferring advanced non-wood technologies (like specialized seasoning kilns and preservation methods) directly to local BMI makers to upgrade their quality and efficiency.",
            },
          ]),
        ],
      },
      {
        heading: "D. Bamboo Plantation Development and Raw Material Supply",
        blocks: [
          p(
            "To sustain commercial, long-term operations, industrial processors must have a highly reliable, continuous supply of high-quality bamboo poles.",
          ),
          bullets([
            {
              label: "Philippine Bamboo Industry Development Act of 2017",
              text: "Recognizing this critical supply-side bottleneck, this law was passed to spur rural economic development by ensuring a continuous raw material supply through the state-supported establishment of dedicated bamboo nurseries and agricultural plantations.",
            },
            {
              label: "The PBIDC",
              text: "The Act created the Philippine Bamboo Industry Development Council (PBIDC) to oversee supply chain stability and integrate agricultural growers with artisanal processors.",
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "overlapping-links",
    number: "9",
    title: "Overlapping Links to the Creative Industry Value Chain",
    blocks: [
      p(
        "Because the BMI sector is deeply embedded in both economics and culture, it exhibits unique overlapping links with the wider Creative Industry Value Chain across three core domains:",
      ),
      flow([
        {
          label: "1. Cultural Heritage",
          text: "Tangible: restoring declared treasures (e.g., Las Piñas Bamboo Organ). Intangible: preserving performance and crafting knowledge (e.g., CMTRC).",
        },
        {
          label: "2. Artistic Crafts",
          text: "Master craftsmen carving ancestral story-telling designs. Indigenous authenticity acting as a medium for deep cultural exchange.",
        },
        {
          label: "3. Exhibition & Transmission",
          text: "Interactive: festivals (Bamboo Organ Festival, Kalinga Festivals). Educational: printed instruction guides, simple melodies for buyers.",
        },
      ]),
    ],
    subsections: [
      {
        heading: "A. Cultural Heritage Domain",
        blocks: [
          bullets([
            {
              label: "Tangible Heritage Preservation",
              text: "This overlaps with the conservation and restoration of tangible historical monuments. Master BMI builders double as highly specialized heritage restorers, preserving the acoustic and physical structures of priceless artifacts like the Las Piñas Bamboo Organ.",
            },
            {
              label: "Intangible Heritage Transmission",
              text: "Traditional performance and crafting methods are preserved through specialized educational centers established by master makers. A key example is the Cordillera Music Tutorial and Research Center (CMTRC), which actively coordinates the transmission of ancestral knowledge on how traditional instruments are played and constructed.",
            },
          ]),
        ],
      },
      {
        heading: "B. Artistic Crafts Domain",
        blocks: [
          p(
            "Traditional bamboo instrument making is a powerful form of physical and visual artistic expression. Master artisans hand-carve ancestral storytelling patterns, oral histories, and geometric designs directly onto the skin of custom-built zithers and flutes. Because the makers are certified members of IP communities, their instruments possess an organic authenticity that makes them prized cultural exchange media and high-end collector's items.",
          ),
        ],
      },
      {
        heading: "C. Exhibition, Transmission, and Consumption",
        blocks: [
          bullets([
            {
              label: "Live Cultural Experiences",
              text: "The value chain culminates in live, sensory exhibitions, such as the annual Bamboo Organ Festival and regional Cordillera Kalinga Festivals, allowing communities to consume and participate in live bamboo music.",
            },
            {
              label: "Direct Personal Consumption",
              text: "Individual buyers experience direct musical satisfaction by learning to play. Makers facilitate this by including simplified printed instruction sheets and basic traditional melodies with every flute purchase, allowing beginners to immediately play a tune.",
            },
            {
              label: "Ensemble Participation",
              text: "Group instruments like angklungs require collaborative playing. Makers arrange popular, contemporary melodies specifically for these instrument ensembles, allowing school bands and community orchestras to participate in group music-making, which in turn secures long-term commercial demand.",
            },
          ]),
        ],
      },
    ],
  },
  {
    id: "findings",
    number: "10",
    title: "Key VCA Research Findings & R&D Directives",
    blocks: [
      p(
        "The rigorous value chain research executed by DOST-FPRDI has successfully identified the core vulnerabilities of the local BMI industry and translated them into clear scientific research directives:",
      ),
      bullets([
        {
          label: "The Sourcing Gap vs. Advanced Preservation",
          text: "VCA revealed that local makers suffer massive losses due to pest infestations and moisture warping. This led DOST-FPRDI to develop scientifically proven chemical tank mixes (such as Permethrin + Tebuconazole) and eco-friendly non-chemical treatments (smoking, gamma irradiation) to stabilize raw materials.",
        },
        {
          label: "Lamination Quality vs. Thermal Modification",
          text: "Finding that high-end luthiers were importing laminated bamboo panels due to local quality issues, DOST-FPRDI initiated advanced research into high-temperature Thermal Modification (steam and hot oil over 160°C) and calibrated hot/cold lamination pressing to produce warp-free, premium local tonewood panels.",
        },
        {
          label: "Traditional Sizing vs. Standardized Prototyping",
          text: "Recognizing that non-standardized artisanal sizing (measuring by finger-widths) caused severe pitch inconsistency, researchers designed a standardized engineering workflow. By combining Experimental Modal Analysis (EMA) with Finite Element Analysis (FEA) simulations in COMSOL, they established mathematically optimized prototype designs to ensure flawless, repeatable acoustic performance.",
        },
        {
          label: "Demand Generation vs. Support Services",
          text: "VCA demonstrated that commercial success relies heavily on post-sale services. In response, research collaborations with the University of the Philippines Center for Ethnomusicology and the Philippine Normal University were established to design structured teaching modules and performance repertoires, ensuring school bands can successfully play their purchased instruments and drive market demand.",
        },
      ]),
      p(
        "Through this seamless integration of Value Chain Analysis and engineering research, DOST-FPRDI is successfully transforming a humble forest resource into a highly durable, standardized, and culturally rich industry of national pride.",
      ),
    ],
  },
];
