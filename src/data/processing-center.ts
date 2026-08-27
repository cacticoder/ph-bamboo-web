// Sourced from CONTENT-SOURCE/BMI-processing-facility-video/bmipc-contact-page.md
import facilityVideoCover from "@/assets/processing-center/bmi-facility-video-cover.jpg";
import brochurePdf from "@/assets/processing-center/bmipc-brochure.pdf?url";

export const FACILITY_VIDEO = {
  title: "BMI Processing Center Facility Tour",
  youtubeId: "YWkGd03SVq0",
  cover: facilityVideoCover,
};

export const BROCHURE = {
  title: "Processing Center Brochure",
  url: brochurePdf,
  filename: "BMI-Processing-Center-Brochure.pdf",
};

export const BMIPC_INTRO =
  "Thank you for your interest in the Bamboo Musical Instruments Processing Center (BMIPC), a specialized facility of the DOST-Forest Products Research and Development Institute (DOST-FPRDI). We are dedicated to bridging traditional Filipino musical artistry with modern forest products research and wood science.";

export interface BmipcBullet {
  label: string;
  text: string;
}

export const BMIPC_USES: BmipcBullet[] = [
  {
    label: "Technology Adoption & Processing Support",
    text: "We house industrial-grade wood and bamboo processing equipment to support artisans, entrepreneurs, and MSMEs looking to improve the structural durability, aesthetic appeal, and acoustic quality of their bamboo musical instruments.",
  },
  {
    label: "Testing & Prototyping",
    text: "The center provides access to advanced tools and scientific techniques (such as seasoning dryers, preservation vats, thermal modification chambers, and calibrated finishing systems) to develop high-performance, pest-resistant instrument prototypes.",
  },
  {
    label: "Education & Cultural Preservation",
    text: "The facility serves as a venue for hands-on technical training, workshops, and advisory services for teachers, music students, hobbyists, and technology adopters on the crafting and tuning of instruments.",
  },
  {
    label: "Mini Museum Tours",
    text: "We feature an onsite mini-museum showcasing scientifically developed instrument prototypes alongside culturally rich traditional instruments crafted by commercial makers and diverse indigenous communities across the Philippines.",
  },
];

export const BMIPC_CONTACT = {
  intro:
    "For partnership opportunities, technology business incubator applications, equipment access requests, advisory consults, or to schedule a mini-museum tour, please get in touch with our leadership:",
  primaryContact: {
    name: "Dr. Rico J. Cabangon",
    org: "DOST-Forest Products Research and Development Institute (DOST-FPRDI)",
  },
  address: {
    name: "DOST - Forest Products Research and Development Institute (DOST-FPRDI)",
    lines: [
      "Narra Rd., College of Forestry",
      "University of the Philippines Los Baños (UPLB) Campus",
      "Los Baños, Laguna 4031",
      "Philippines",
    ],
  },
  phones: ["(049) 563-2377", "(049) 536-3630"],
  email: "info@fprdi.dost.gov.ph",
  website: { label: "www.fprdi.dost.gov.ph", href: "http://www.fprdi.dost.gov.ph" },
};

export const BMIPC_SERVICES: BmipcBullet[] = [
  {
    label: "Book a Tour or Advisory Consult",
    text: "Please email us at info@fprdi.dost.gov.ph with your preferred schedule and areas of interest (e.g., Mini Museum Tour, advisory services on drying/finishing, or raw material identification).",
  },
  {
    label: "Technology Business Incubator (FPTBI)",
    text: "If you are an MSME, startup, student group, or researcher looking to set up a commercial bamboo instrument venture, you can apply as an incubatee to gain shared office spaces, technical advisory, IP assistance, and physical access to the processing center.",
  },
];
