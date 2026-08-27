// Sourced from CONTENT-SOURCE/r&d_technologies/rd-technologies-contents.md
import finishingSanding1 from "@/assets/rnd/finishing-sanding-1.webp";
import finishingSanding2 from "@/assets/rnd/finishing-sanding-2.webp";
import finishingSpraying1 from "@/assets/rnd/finishing-spraying-1.webp";
import finishingSpraying2 from "@/assets/rnd/finishing-spraying-2.webp";

import prototypes1 from "@/assets/rnd/prototypes-1.webp";
import prototypes2 from "@/assets/rnd/prototypes-2.webp";
import prototypes3 from "@/assets/rnd/prototypes-3.webp";
import prototypes4 from "@/assets/rnd/prototypes-4.webp";
import prototypes5 from "@/assets/rnd/prototypes-5.webp";
import prototypes6 from "@/assets/rnd/prototypes-6.webp";
import prototypes7 from "@/assets/rnd/prototypes-7.webp";
import prototypes8 from "@/assets/rnd/prototypes-8.webp";
import prototypes9 from "@/assets/rnd/prototypes-9.webp";
import prototypes10 from "@/assets/rnd/prototypes-10.webp";
import prototypes11 from "@/assets/rnd/prototypes-11.webp";
import prototypesModeshape1 from "@/assets/rnd/prototypes-modeshape-1.webp";
import prototypesModeshape2 from "@/assets/rnd/prototypes-modeshape-2.webp";
import prototypesModeshape3 from "@/assets/rnd/prototypes-modeshape-3.webp";
import prototypesModeshape4 from "@/assets/rnd/prototypes-modeshape-4.webp";
import prototypesMarimba from "@/assets/rnd/prototypes-marimba.webp";
import prototypesKawagong from "@/assets/rnd/prototypes-kawagong.webp";
import prototypesAngklung from "@/assets/rnd/prototypes-angklung.webp";

import thermalSteam1 from "@/assets/rnd/thermal-steam-1.webp";
import thermalSteam2 from "@/assets/rnd/thermal-steam-2.webp";
import thermalSteam3 from "@/assets/rnd/thermal-steam-3.webp";
import thermalSteam4 from "@/assets/rnd/thermal-steam-4.webp";
import thermalOil1 from "@/assets/rnd/thermal-oil-1.webp";
import thermalOil2 from "@/assets/rnd/thermal-oil-2.webp";
import thermalOil3 from "@/assets/rnd/thermal-oil-3.webp";
import thermalOil4 from "@/assets/rnd/thermal-oil-4.webp";
import thermalOil5 from "@/assets/rnd/thermal-oil-5.webp";
import thermalLaminating1 from "@/assets/rnd/thermal-laminating-1.webp";
import thermalLaminating2 from "@/assets/rnd/thermal-laminating-2.webp";
import thermalLaminating3 from "@/assets/rnd/thermal-laminating-3.webp";
import thermalLaminating4 from "@/assets/rnd/thermal-laminating-4.webp";
import thermalLaminating5 from "@/assets/rnd/thermal-laminating-5.webp";
import thermalLaminating6 from "@/assets/rnd/thermal-laminating-6.webp";
import thermalLaminating7 from "@/assets/rnd/thermal-laminating-7.webp";
import thermalLaminating8 from "@/assets/rnd/thermal-laminating-8.webp";

export interface RndStep {
  label: string;
  text: string;
  subItems?: { label?: string; text: string }[];
}

export interface RndBullet {
  label: string;
  text: string;
}

export interface RndTechnology {
  id: string;
  number: number;
  title: string;
  technologyTitle: string;
  introduction: string;
  whatIsIt: string;
  howItWorksIntro?: string;
  howItWorks: RndStep[];
  keyFeatures: RndBullet[];
  applications: RndBullet[];
  rndHighlights: string;
  whyItMatters: string;
  cardSummary: string;
  cover?: string;
  gallery: string[];
}

export const RND_INTRO =
  "Welcome to the R&D Technologies page of the DOST-Forest Products Research and Development Institute (DOST-FPRDI). Here, we highlight the core scientific innovations, protective treatments, engineering methods, and socioeconomic frameworks developed under the Bamboo Musical Instruments Innovation R&D Program. Our mission is to improve the quality, durability, and acoustic performance of locally made bamboo musical instruments (BMIs), preserving cultural heritage while driving economic opportunities for local artisans and industries.";

export const RND_CLOSING = {
  title: "From R&D to Value-Added Innovation",
  body: "Transforming raw bamboo into world-class musical instruments requires a seamless progression from scientific research to market-ready innovation. Unprocessed bamboo is naturally vulnerable to biological pests, moisture fluctuations, and environmental cracking, which can ruin both structural durability and acoustic performance. By integrating DOST-FPRDI's suite of R&D technologies, raw bamboo is systematically upgraded. Postharvest seasoning and chemical/non-chemical preservation technologies halt biological deterioration, while thermal modification and advanced lamination stabilize the material against moisture warping and enrich it with a premium aesthetic finish. Standardized prototyping using advanced EMA and FEA simulations allows manufacturers to mathematically optimize instrument acoustics while reducing labor and material waste. Finally, precise finishing techniques protect the instrument without dampening its sound. Guided by Value Chain Analysis, these combined technologies empower local artisans, strengthen local supply chains, and unlock high-value commercial and educational opportunities, turning a humble forest resource into a symbol of cultural and economic pride.",
};

export const RND_TECHNOLOGIES: RndTechnology[] = [
  {
    id: "finishing",
    number: 1,
    title: "Finishing of Bamboo Musical Instruments",
    technologyTitle:
      "Acoustically Preserving and Protective Finishing Systems for Bamboo Instruments",
    introduction:
      "Finishing is the crucial final stage in the production of bamboo musical instruments, elevating their visual appeal while offering an essential layer of protection. This technology ensures that coatings shield the wood from environmental damage without dampening or distorting the instrument's natural vibration and pitch. By calibrating application techniques and dried film thickness, we preserve both the natural beauty and acoustic purity of the bamboo.",
    whatIsIt:
      "This finishing technology is a specialized system of surface preparation, staining, and top-coating designed specifically for musical instruments. Unlike standard wood furniture painting, instrument finishing requires extremely precise application where dried coatings do not interfere with the natural acoustic resonance and tune of the bamboo. It utilizes advanced sanding protocols, transparent staining to maintain unique species colorations, and topcoats with controlled solid content and film thickness.",
    howItWorks: [
      {
        label: "Pre-Sanding",
        text: "Conducted thoroughly before assembly and final tuning. This ensures that the bamboo surfaces are completely free of structural and physical defects before the final top coatings are applied.",
      },
      {
        label: "Staining",
        text: "Formulated to achieve color and tone uniformity across different components of the instrument. Stains are colorants that must leave a transparent effect, highlighting rather than masking the unique and natural grain of the specific bamboo species.",
      },
      {
        label: "Top Coating",
        text: "Applied using selected commercial topcoats. Since different topcoats have varying solid content which determines their dry film thickness, the application is strictly regulated. For percussion instruments, coatings are finished at specific thicknesses to ensure that the acoustic vibrations and overall sound quality remain unaffected.",
      },
    ],
    keyFeatures: [
      {
        label: "Aesthetic Enhancement",
        text: "Enhances the natural color, texture, and visual appeal of diverse bamboo species.",
      },
      {
        label: "Acoustic Neutrality",
        text: "Prevents sound dampening, ensuring that the instrument's natural vibration and tuning are fully preserved.",
      },
      {
        label: "Robust Protection",
        text: "Adds a durable barrier against moisture, wear, and physical handling.",
      },
      {
        label: "Species-Specific Customization",
        text: "Accommodates the unique, natural colors of different bamboo species through transparent staining rather than opaque painting.",
      },
      {
        label: "Scientific Film Calibration",
        text: "Controls dry film thickness based on topcoat solid content, particularly for sensitive percussion instruments.",
      },
    ],
    applications: [
      {
        label: "Percussion Instruments",
        text: "Xylophones, marimba bars, slit drums, and buzzers where vibration characteristics are highly sensitive to coating thickness.",
      },
      {
        label: "Wind and String Instruments",
        text: "Flutes, pipes, zithers, and other stringed bamboo instruments requiring environmental protection and polished aesthetics.",
      },
      {
        label: "Commercial and Artisanal Manufacturing",
        text: "High-value customized instruments for collectors and hobbyists, as well as educational instrument packages.",
      },
    ],
    rndHighlights:
      "As part of the protective processing technologies under the DOST-FPRDI program, researchers evaluated the effects of various finishing properties on the acoustic and sound quality of bamboo. Testing involved applying different coating systems and techniques to determine how solid content, application methods, and dry film thickness affect vibrational characteristics. This research allows makers to select scientifically proven finishes that guarantee long-term durability without degrading the signature sounds of their instruments.",
    whyItMatters:
      "A bamboo instrument can be perfectly carved and tuned, but a poor finish can muffle its sound and render it acoustically lifeless. Conversely, leaving bamboo unfinished leaves it vulnerable to moisture and wear, shortening its service life. This R&D solution bridges the gap between beauty and acoustics, giving local artisans the technology to manufacture instruments that are highly durable, visually stunning, and acoustically pristine.",
    cardSummary:
      "Finishing is the vital final step in bamboo musical instrument production, combining aesthetic beauty with acoustic safety. Through systematic pre-sanding, transparent staining, and thickness-controlled top-coating, this technology provides robust protection against wear and moisture without dampening the instrument's natural vibration or tune. Grounded in DOST-FPRDI coating research, our finishing techniques ensure instruments are visually polished, highly durable, and acoustically flawless for the global creative market.",
    cover: finishingSpraying1,
    gallery: [finishingSpraying1, finishingSpraying2, finishingSanding1, finishingSanding2],
  },
  {
    id: "development-of-prototypes",
    number: 2,
    title: "Development of Prototypes",
    technologyTitle:
      "Computer-Aided Acoustic Design and Standardized Prototyping of Bamboo Instruments",
    introduction:
      "The Development of Prototypes technology introduces modern engineering, acoustic analysis, and digital simulations to the traditional craft of bamboo instrument making. By scientifically mapping physical vibrations and sound characteristics, this technology establishes standardized, high-quality prototype designs. This ensures that newly developed instruments maintain excellent sound quality and tuning while proving resilient to pests and environmental wear.",
    whatIsIt:
      "This technology is an advanced engineering and design workflow that merges digital signal processing (DSP), Experimental Modal Analysis (EMA), and Finite Element Analysis (FEA) to model, test, and manufacture bamboo musical instruments. It transitions bamboo instrument making from traditional hand-measurement methods (such as sizing holes using finger widths) into a scientifically calibrated, repeatable process. It allows researchers and manufacturers to predict an instrument's sound quality, analyze physical vibration behaviors, and optimize shapes and dimensions using computers before actual physical construction begins.",
    howItWorksIntro:
      "The prototype development workflow is executed through five integrated steps:",
    howItWorks: [
      {
        label: "Acoustic Analysis and Dataset Creation",
        text: "Audio samples of existing instruments are recorded using high-quality portable microphones during performances. Performers play staccato and legato to capture the instrument's signature sound and timber. The audio is trimmed and organized into a database.",
      },
      {
        label: "Feature Extraction and Modeling",
        text: "Digital signal processing extracts spectral (frequency domain), temporal (time domain), spectro-temporal, and harmonic features from the recordings. These features are used to train a mathematical model via supervised learning, using human-surveyed Sound Quality Descriptor (SQD) scores as labels to predict the perceived sound quality of any audio input.",
      },
      {
        label: "Experimental Modal Analysis (EMA)",
        text: "Physical vibration testing is performed on actual prototype components (such as marimba bars) using a roving impact hammer and an accelerometer connected to a data acquisition module. Striking different marked dots on the material excites a wide spectrum of frequencies. The frequency response is processed offline in MATLAB to compute the natural frequencies, damping ratios, and mode shapes (vibration characteristics) of the material.",
      },
      {
        label: "Finite Element Analysis (FEA)",
        text: "A virtual 3D geometry of the instrument is built in COMSOL using basic shapes. Physical material properties (density, Young's modulus, and Poisson's ratio) obtained from flexural tests of bamboo prototypes are input. By sweeping different dimensional and material parameters, the software simulates and predicts vibration modes and fundamental frequencies.",
      },
      {
        label: "Physical Prototyping and Testing",
        text: "Physical prototypes are constructed using selected bamboo species and processing technologies suggested by the simulation models, then tested and verified for acoustic quality.",
      },
    ],
    keyFeatures: [
      {
        label: "Mathematical Timbre Prediction",
        text: "Models and predicts the exact sound quality descriptors (SQDs) of instruments based on their acoustic features.",
      },
      {
        label: "Vibration Mapping",
        text: "Identifies natural frequencies, damping ratios, and mode shapes to prevent vibration interference between modes.",
      },
      {
        label: "Cost and Labor Reduction",
        text: "FEA simulations suggest optimal geometries and dimensions, reducing the material waste and labor associated with physical trial-and-error prototyping.",
      },
      {
        label: "Acoustic-Structure Correlation",
        text: "Correlates mechanical properties (density, elasticity) directly with final sound output, helping fine-tune instrument pitch and timbre.",
      },
      {
        label: "Pest and Storage Resilience",
        text: "Designs prototype instruments engineered to resist storage defects and pests without sacrificing acoustics.",
      },
    ],
    applications: [
      {
        label: "Traditional and Non-Traditional Instruments",
        text: "Optimization of percussion bars (like marimbas), hollow resonators (like angklungs), and wind instruments (like flutes and pipes).",
      },
      {
        label: "Educational and Institutional Kits",
        text: "Supplying standardized, highly playable instruments for the national K-12 performing arts curriculum.",
      },
      {
        label: "Luthiery and Instrument Shops",
        text: "Providing custom design templates for small, artisanal commercial enterprises.",
      },
    ],
    rndHighlights:
      "DOST-FPRDI successfully implemented this workflow on select Philippine bamboos, extracting the natural frequencies and damping ratios of a giant bamboo marimba bar (kiln-dried, with nitrocellulose finish) and identifying mode shapes for angklung resonators. The research team successfully validated FEA computer models in COMSOL against physical EMA data. These efforts are being compiled into a comprehensive manual containing recommendations on materials, processing, manufacturing, and testing for bamboo instruments.",
    whyItMatters:
      "Traditional bamboo instrument making is highly subjective and lacks standardized measurements, making it difficult to scale production, ensure consistent tuning, or guarantee acoustic uniformity. This prototype technology provides scientific templates that bridge the gap between cultural authenticity and industrial standards, making high-quality, perfectly tuned Philippine bamboo instruments highly competitive in local and international markets.",
    cardSummary:
      "Development of Prototypes introduces scientific standardization to bamboo instrument manufacturing. By combining digital signal processing, Experimental Modal Analysis (EMA), and COMSOL Finite Element Analysis (FEA) simulations, we analyze and predict vibration behaviors and acoustic profiles. This technology minimizes material waste, reduces design costs, and establishes precise templates for crafting durable, pest-resistant instruments with mathematically optimized acoustics.",
    cover: prototypes1,
    gallery: [
      prototypes1,
      prototypesMarimba,
      prototypesAngklung,
      prototypesKawagong,
      prototypesModeshape1,
      prototypesModeshape2,
      prototypesModeshape3,
      prototypesModeshape4,
      prototypes2,
      prototypes3,
      prototypes4,
      prototypes5,
      prototypes6,
      prototypes7,
      prototypes8,
      prototypes9,
      prototypes10,
      prototypes11,
    ],
  },
  {
    id: "seasoning-and-preservation",
    number: 3,
    title: "Seasoning and Preservation of Bamboo",
    technologyTitle: "Postharvest Seasoning, Chemical, and Non-Chemical Preservation Technologies",
    introduction:
      "Because bamboo is naturally rich in starch and highly hygroscopic, it is exceptionally vulnerable to moisture, fungal decay, and insect attacks, specifically from powder-post beetles. Our Seasoning and Preservation technology provides essential chemical and eco-friendly non-chemical postharvest treatments alongside advanced drying facilities. These solutions dramatically extend the service life of bamboo raw materials and finished products while fully preserving their musical, structural, and aesthetic qualities.",
    whatIsIt:
      "This technology comprises a suite of preservative application methods and specialized drying technologies designed to reduce the moisture content of raw bamboo and eradicate its starch components. By removing starch (the primary food source for pests) and lowering moisture, bamboo is immunized against biological deterioration. The technology integrates traditional, chemical, and non-chemical preservation methods (such as smoking, pressure-vacuum treatment, and gamma irradiation) with state-of-the-art dehumidifying dryer kilns.",
    howItWorksIntro:
      "The technology utilizes a variety of treatment and drying methods depending on production volume and materials:",
    howItWorks: [
      {
        label: "Chemical Treatment Methods",
        text: "Preservatives are applied via several methods depending on the scale of production and the material being treated.",
        subItems: [
          {
            label: "Spraying",
            text: "Applied to freshly cut, bulk-piled raw materials to minimize chemical loss while providing immediate protection against staining fungi and beetles.",
          },
          {
            label: "Brushing",
            text: "Manual preservative application on cut or injured portions; ideal for very small-scale handicraft production.",
          },
          {
            label: "Dipping/Soaking",
            text: "Freshly cut or kiln-dried bamboo is immersed in a vat or plastic-lined trench containing fungicidal and insecticidal solutions (e.g., propiconazole, deltamethrin, permethrin, or disodium octaborate tetrahydrate) for 5 to 10 minutes.",
          },
          {
            label: "Pressure Method",
            text: "Bamboo is sealed in a pressure cylinder. A vacuum treatment removes air from the bamboo cells, followed by the introduction of preservatives under high pressure to force deep absorption. A final vacuum removes excess chemicals.",
          },
        ],
      },
      {
        label: "Non-Chemical and Traditional Methods",
        text: "Eco-friendly and traditional treatments provide an alternative to chemical preservation.",
        subItems: [
          {
            label: "Smoking",
            text: "Bamboo is continuously exposed to smoke from burning coconut husks or other materials, which destroys starch and lowers moisture content, making it unpalatable to powder-post beetles.",
          },
          {
            label: "Heat Treatment",
            text: "Employs heat-conducting media to alter the physical and chemical properties of the bamboo under strict temperature monitoring.",
          },
          {
            label: "Irradiation",
            text: "Employs gamma radiation to easily penetrate bamboo cells, disinfecting pre-infested poles, killing insects, and inhibiting pest reproduction.",
          },
        ],
      },
      {
        label: "Advanced Kiln Drying",
        text: "Bamboo is dried in a custom-designed dehumidifying dryer kiln. Calibrated drying schedules control moisture removal, preventing physical cracking or warping.",
      },
    ],
    keyFeatures: [
      {
        label: "Extended Service Life",
        text: "Dramatically increases the durability, utility, and commercial value of bamboo.",
      },
      {
        label: "Comprehensive Pest Defense",
        text: "Provides highly effective protection against powder-post beetles, staining fungi, and other biodeteriorating agents.",
      },
      {
        label: "Versatile Treatment Options",
        text: "Offers highly effective chemical protocols as well as eco-friendly, organic, and non-chemical options (smoking, heat, gamma irradiation).",
      },
      {
        label: "Dehumidifying Drying Technology",
        text: "Custom drying kilns offer uniform, rapid moisture reduction that makes local producers competitive with regional markets.",
      },
      {
        label: "Acoustic Protection",
        text: "Established drying schedules stabilize the bamboo without causing internal structural defects that degrade sound quality.",
      },
    ],
    applications: [
      {
        label: "Raw Material Storage",
        text: "Protecting freshly harvested poles, slats, and raw materials during storage and shipping.",
      },
      {
        label: "Musical Instrument Manufacturing",
        text: "Providing stable, pest-resistant bamboo for flutes, marimbas, angklungs, and stringed instruments.",
      },
      {
        label: "Handicraft and Cottage Industries",
        text: "Small-scale applications for weavers, artisans, and micro-enterprises.",
      },
    ],
    rndHighlights:
      "To support local MSMEs, DOST-FPRDI designed and developed a prototype dehumidifying dryer kiln specifically calibrated for bamboo musical instruments, establishing precise drying schedules for various Philippine bamboo species. Furthermore, researchers evaluated and upgraded local artisans' traditional processing methods, validating chemical combinations (such as Permethrin + Tebuconazole and Deltamethrin + Propiconazole tank mixes) to deliver maximum protection while preserving the bamboo's natural aesthetics.",
    whyItMatters:
      "Without proper seasoning and preservation, bamboo instruments succumb quickly to insect hollows and fungal rot, ruining their tuning, pitch, and structural integrity. This technology secures the foundation of the entire value chain, transforming a highly perishable agricultural resource into a stable, long-lasting industrial material that ensures instruments remain playable for decades.",
    cardSummary:
      "Seasoning and Preservation immunizes raw bamboo against decay and destructive pests like powder-post beetles. Through a combination of chemical processes (such as pressure-vacuum treatments and dipping) and eco-friendly methods (such as coconut husk smoking and gamma irradiation), we extend the material's service life. When paired with our custom dehumidifying dryer kiln, this technology ensures that bamboo is dried uniformly, remaining structurally stable and acoustically vibrant.",
    gallery: [],
  },
  {
    id: "thermal-modification",
    number: 4,
    title: "Thermal Modification",
    technologyTitle: "High-Temperature Thermal Conditioning and Advanced Lamination of Bamboo",
    introduction:
      "Thermal modification is an innovative, high-temperature conditioning process that alters the chemical and physical properties of bamboo to enhance its dimensional stability and natural beauty. By exposing bamboo poles to controlled steam or hot oil environments, this technology alters cell structures to reduce moisture absorption and susceptibility to pests. When integrated with advanced lamination techniques, it produces high-strength, uniform engineered bamboo panels perfect for premium instruments.",
    whatIsIt:
      "This technology is a chemical-free conditioning process that subjects air-dried or kiln-dried bamboo poles to high temperatures (typically exceeding 160°C) using steam or hot oil as a heat-conducting medium. The process permanently alters the hemicellulose and starch inside the bamboo cells, rendering the material hydrophobic (resistant to water absorption) and structurally stable. The technology is paired with advanced lamination, where prepared bamboo slats are bonded together using specialized cold-pressing or hot-pressing adhesives to create flat, durable engineered bamboo sheets.",
    howItWorksIntro:
      "The thermal modification and lamination process is divided into three key methods:",
    howItWorks: [
      {
        label: "Steam Thermal Modification",
        text: "Bamboo poles are placed in a cylindrical steam chamber or a kiln fitted with heaters. They are exposed to boiler-produced steam at temperatures above 160°C. The treatment duration begins once the desired temperature is reached (±5°C). Poles are removed once chamber pressure is fully depleted and the temperature falls below 50°C, then conditioned for a week.",
      },
      {
        label: "Oil Thermal Modification",
        text: "Bamboo poles are fully immersed in a hot oil bath heated above 160°C. The exposure timer starts once the oil reaches the target temperature. Poles are removed after cooling below 50°C and conditioned for approximately a week.",
      },
      {
        label: "Lamination Process",
        text: "Bamboo undergoes mechanical preparation (splitting, planing, edging, and sanding). An adhesive is spread evenly across the bamboo slats.",
        subItems: [
          {
            label: "Cold-Pressing",
            text: "Uses a pneumatic press for cold-setting adhesives like polyvinyl acetate (PVAc) and polyurethane (PUR).",
          },
          {
            label: "Hot-Pressing",
            text: "Uses a hydraulic hot press for hot-setting adhesives like phenol formaldehyde (PF) and urea formaldehyde (UF). The glued laminates must cure for at least 24 hours before any musical instrument machining begins.",
          },
        ],
      },
    ],
    keyFeatures: [
      {
        label: "Moisture Resistance",
        text: "Significantly reduces the bamboo's capacity to absorb water, minimizing swelling, shrinking, and cracking.",
      },
      {
        label: "Rich Aesthetic Finish",
        text: "Physically changes the bamboo color to a beautiful, uniform, darker caramel or chocolate tone.",
      },
      {
        label: "Biological Durability",
        text: "Modifies the chemical components of the wood, making it highly resistant to fungal decay and wood-boring insects.",
      },
      {
        label: "Acoustical Refinement",
        text: "Alters the acoustic properties, speed of sound, and resonant characteristics of the bamboo.",
      },
      {
        label: "Structural Strength",
        text: "Lamination creates engineered bamboo panels with superior dimensional stability, strength, and structural flat surfaces.",
      },
    ],
    applications: [
      {
        label: "Luthiery (Stringed Instruments)",
        text: "Manufacturing premium guitars, ukuleles, and bandurrias using laminated bamboo panels and slats.",
      },
      {
        label: "Percussion Resonators",
        text: "Creating durable acoustic chambers, marimba plates, and soundboards.",
      },
      {
        label: "High-End Crafts and Furniture",
        text: "Premium engineered panels for visual arts, site designs, and designer consumer goods.",
      },
    ],
    rndHighlights:
      "DOST-FPRDI's research generated critical data on the physico-mechanical and acoustical properties of unmodified and thermally modified bamboo. Testing revealed that while extreme temperatures can slightly weaken the mechanical strength of the bamboo depending on temperature severity, the trade-off yields exceptional biological resistance, beautiful coloration, and optimized acoustic resonance. This R&D allows local guitar makers to use high-quality local laminated bamboo panels, bypassing the need to import expensive materials.",
    whyItMatters:
      "Natural bamboo is prone to expanding and contracting with changing weather, which ruins the tuning, causes cracks, and warps instrument bodies. Thermal modification and lamination solve these issues, giving luthiers an engineered, highly stable material with consistent acoustic performance and a stunning dark finish. This technology elevates local bamboo into a reliable, high-end alternative to traditional tonewoods.",
    cardSummary:
      "Thermal Modification conditions bamboo under high temperatures (above 160°C) in steam or hot oil baths to enhance its physical, chemical, and acoustic properties. This process drastically reduces moisture absorption and biological vulnerability while enriching the bamboo with a dark, premium color. Combined with advanced cold- or hot-setting lamination, this technology provides high-strength, warp-resistant engineered panels ideal for high-performance instruments.",
    cover: thermalSteam1,
    gallery: [
      thermalSteam1,
      thermalSteam2,
      thermalSteam3,
      thermalSteam4,
      thermalOil1,
      thermalOil2,
      thermalOil3,
      thermalOil4,
      thermalOil5,
      thermalLaminating1,
      thermalLaminating2,
      thermalLaminating3,
      thermalLaminating4,
      thermalLaminating5,
      thermalLaminating6,
      thermalLaminating7,
      thermalLaminating8,
    ],
  },
  {
    id: "value-chain-analysis",
    number: 5,
    title: "Value Chain Analysis",
    technologyTitle:
      "Strategic Value Chain Mapping and Socioeconomic Optimization of the Bamboo Instrument Industry",
    introduction:
      "The manufacture of bamboo musical instruments (BMIs) is a highly skilled, artisanal craft that serves as an ancillary service to the heritage, artistic crafts, and performing arts sectors. Value Chain Analysis (VCA) is a powerful diagnostic technology that maps the flow of raw materials, information, and finance from bamboo forests to final consumers. By identifying operational bottlenecks and market segments, VCA helps design strategic programs to elevate the competitiveness and economic viability of local artisans.",
    whatIsIt:
      "Value Chain Analysis is a socioeconomic and operational assessment framework that examines the actors, functions, support services, and business enabling environment (BEE) of the BMI industry. Rather than focusing on a single manufacturing step, VCA looks at the entire ecosystem. It evaluates how raw bamboo is harvested, how artisans process and tune instruments, how products are priced and marketed, and how public policies or educational curriculums drive or hinder industry growth.",
    howItWorksIntro: "Value Chain Analysis maps and analyzes five core dimensions of the industry:",
    howItWorks: [
      {
        label: "Core Functions",
        text: "Tracing the journey of BMIs through Raw Material Procurement (selecting mature species like giant bamboo), Production (artisanal crafting, shaving, and tuning), and Marketing and Distribution (retail stores, souvenir shops, and online platforms).",
      },
      {
        label: "Key Actors and Players",
        text: "Documenting the roles of indigenous makers (who often gather wild poles under cultural traditions), commercial makers, traders, secondary processors of slats, sales agents, and retail stores.",
      },
      {
        label: "Information and Financial Flows",
        text: "Mapping transactional information (orders, specifications) and promotional channels (Facebook, word-of-mouth, academic networks) alongside financial structures and pricing models.",
      },
      {
        label: "Support Services",
        text: "Identifying crucial post-sale activities that maintain products and enhance consumer experience, such as expert repair and tuning by the maker, and providing musical repertoires or arrangements to school ensembles.",
      },
      {
        label: "Business Enabling Environment (BEE)",
        text: "Analyzing the impacts of public policies, such as the Department of Education's K-12 MAPEH curriculum, MSME upgrading grants (DOST-SETUP, DTI programs), and the Philippine Bamboo Industry Development Act.",
      },
    ],
    keyFeatures: [
      {
        label: "Operational Bottleneck Discovery",
        text: "Identifies critical gaps, such as luthiers importing laminated materials due to quality issues with local secondary processors.",
      },
      {
        label: "Market Segmentation",
        text: "Differentiates between high-value niche markets (hobbyists/collectors buying authentic, handcrafted indigenous instruments) and price-sensitive mass markets (tourists, souvenir shops).",
      },
      {
        label: "Cultural and Heritage Preservation",
        text: "Integrates traditional indigenous practices and intellectual property with commercial and academic opportunities.",
      },
      {
        label: "Policy Alignment",
        text: "Helps align instrument production with institutional demand, such as the Grade 7 K-12 module on instrumental music of the Cordillera.",
      },
      {
        label: "Strategic Pricing Models",
        text: "Guides artisans in setting prices that reflect direct costs (labor, raw materials) as well as intangible values (artisan prestige, tuning expertise, unique designs).",
      },
    ],
    applications: [
      {
        label: "Government and Policy Planning",
        text: "Guiding DOST, DTI, and the Philippine Bamboo Industry Development Council in designing targeted support programs and establishing processing facilities.",
      },
      {
        label: "Cooperative and Enterprise Strategy",
        text: "Assisting small, artisanal BMI enterprises in establishing efficient procurement agreements, digital marketing systems, and repair services.",
      },
      {
        label: "Academic and Cultural Research",
        text: "Designing educational teaching modules and documenting the ethnocultural stories of indigenous groups.",
      },
    ],
    rndHighlights:
      "DOST-FPRDI's comprehensive VCA revealed that the Philippine BMI industry is characterized by short, artisanal chains where the shop owner often performs procurement, production, tuning, and marketing. The analysis highlighted that while digital retail (Facebook) is popular for non-indigenous instruments, indigenous makers rely heavily on word-of-mouth and academic networks. Crucially, it documented that the lack of local high-quality laminated panels forced some luthiers to import materials, which directly inspired DOST-FPRDI's focus on upgrading local lamination and seasoning facilities.",
    whyItMatters:
      "Technical breakthroughs in seasoning or prototyping cannot create real-world impact unless they are economically viable and market-aligned. Value Chain Analysis ensures that R&D efforts directly solve the actual financial and material bottlenecks faced by craftsmen, successfully linking scientific innovation with market demand, national education policies, and cultural heritage preservation.",
    cardSummary:
      "Value Chain Analysis is a socioeconomic framework that maps the operational landscape of the bamboo musical instrument industry. By analyzing the flow of materials, finance, and information from harvest to final consumer, VCA identifies critical bottlenecks in procurement and manufacturing. This technology guides strategic interventions, successfully connecting DOST-FPRDI's scientific R&D with market demand, policy opportunities, and cultural preservation to boost local enterprise competitiveness.",
    gallery: [],
  },
];
