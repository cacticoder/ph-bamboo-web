import karatong1Url from "@/assets/Karatong-Festival_img_1.JPG";
import karatong2Url from "@/assets/Karatong-Festival_img_2.JPG";
import karatong3Url from "@/assets/Karatong-Festival_img_3.JPG";
import karatong4Url from "@/assets/Karatong-Festival_img_4.JPG";
import karatong5Url from "@/assets/Karatong-Festival_img_5.JPG";
import bambooday1Url from "@/assets/BambooDay_img_1.JPG";
import bambooday2Url from "@/assets/BambooDay_img_2.png";
import bambooday3Url from "@/assets/BambooDay_img_3.png";
import bambooday4Url from "@/assets/BambooDay_img_4.png";
import bambooday5Url from "@/assets/BambooDay_img_5.png";
import bambooday6Url from "@/assets/BambooDay_img_6.JPG";
import tultugan1Url from "@/assets/Tultugan-Festival_1.jpg";
import tultugan2Url from "@/assets/Tultugan-Festival_2.jpg";
import tultugan3Url from "@/assets/Tultugan-Festival_3.jpg";
import tultugan4Url from "@/assets/Tultugan-Festival_4.jpg";
import lasPinas1Url from "@/assets/LasPinas-Bamboo-Organ.jpg";

const karatong1 = { url: karatong1Url };
const karatong2 = { url: karatong2Url };
const karatong3 = { url: karatong3Url };
const karatong4 = { url: karatong4Url };
const karatong5 = { url: karatong5Url };
const bambooday1 = { url: bambooday1Url };
const bambooday2 = { url: bambooday2Url };
const bambooday3 = { url: bambooday3Url };
const bambooday4 = { url: bambooday4Url };
const bambooday5 = { url: bambooday5Url };
const bambooday6 = { url: bambooday6Url };
const tultugan1 = { url: tultugan1Url };
const tultugan2 = { url: tultugan2Url };
const tultugan3 = { url: tultugan3Url };
const tultugan4 = { url: tultugan4Url };
const lasPinas1 = { url: lasPinas1Url };

export interface Article {
  slug: string;
  title: string;
  region: string;
  excerpt: string;
  cover: string;
  body: string[];
  date: string;
  author: string;
  gallery?: { src: string; caption: string }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "karatong-festival",
    title: "Karatong Festival",
    region: "Dulag, Leyte",
    excerpt:
      "Celebrates the town's identity through the karatong, a bamboo percussion instrument used traditionally to warn communities of impending chaos or calamities, while promoting bamboo music and local craftsmanship.",
    cover: karatong1.url,
    date: "September 2019",
    author: "phBMI Editorial",
    gallery: [
      {
        src: karatong2.url,
        caption: "Student ensembles play bamboo xylophones and tubes along the parade route.",
      },
      {
        src: karatong3.url,
        caption: "Dancers in woven attire strike carved karatong tubes in unison.",
      },
      {
        src: karatong4.url,
        caption:
          "Young performers in bamboo headdresses await their turn in the street presentation.",
      },
      {
        src: karatong5.url,
        caption: "The full street competition in Dulag, with bamboo props and all-bamboo music.",
      },
    ],
    body: [
      "Every September, the coastal municipality of Dulag in Leyte celebrates its annual fiesta through the Karatong Festival, a celebration named after the Waray bamboo percussion instrument known as the karatong. Dulag, also known as the \u201cLiberation Town,\u201d is a third-class municipality located along the eastern side of Leyte facing the Leyte Gulf. The karatong has traditionally been associated with the community as an instrument used by ancient Dulagnons to warn residents of impending chaos or calamities.",
      "In 2019, the local government of Dulag sought to give the festival a distinct local identity. According to Mr. Orlando Cagara, Secretary to the Sangguniang Bayan of Dulag, previous festivals had been heavily patterned after the Sinulog. Under the leadership of Mayor Mildred Joy Que, the local government sought to develop the karatong and other bamboo musical instruments and feature an all-bamboo musical performance during the festivities.",
      "To support this initiative, the Dulag LGU invited Prof. Jocelyn Guadalupe of the UP College of Music and the Philippine Society of Music Educators, together with Mr. David Dino Guadalupe of the UP Center for Ethnomusicology, to conduct a bamboo music workshop. The workshop was held in August 2019 in preparation for the festival and was followed by rehearsals and continued support from the local government.",
      "The initiative also drew on Dulag's local bamboo resources. Although the municipality is generally flat and has limited forest areas, it has several bamboo species, including pattong, tangnan, kawayan, and bagakay. The availability of bamboo provided an opportunity for the community to incorporate locally available materials into its musical instruments and cultural celebrations.",
      "The 2019 Karatong Festival was held on September 7, 2019, as part of Dulag's 42nd Foundation Day celebration. Six groups from different schools in the municipality participated in the competition, with each group performing using bamboo musical instruments. San Jose National High School emerged as the winner.",
      "The school's bamboo ensemble was led by Mr. Romeo \u201cSuperman\u201d Legazpi, a history teacher and former member of a high school bugle and lyre band. Although he had no previous experience playing bamboo instruments, he learned through the workshop conducted by Prof. Jocelyn Guadalupe and Mr. David Guadalupe. He then took on the challenge of teaching the students and developing a musical concept that would fit the storyline of their festival presentation. He was assisted by Mr. Renato, who handled choreography, and Mr. Go, who was responsible for props and production design.",
      "Several of the instruments used by San Jose National High School came from the Castillote family, a family known for making bamboo musical instruments in Leyte. Paul Castillote, from Tanauan, Leyte, introduced kayali as a suitable bamboo variety for musical instruments. His father, who was also a bamboo instrument maker, passed away in 2019. The festival became a meaningful opportunity for the Dulagnons to showcase and honor the instruments made by the Castillote family.",
      "The preparation of bamboo musical instruments requires careful preservation. According to Mr. Romeo, Paul shared that bamboo may need to be prepared for at least a year before it is made into an instrument. One traditional preservation technique involves soaking bamboo in seawater for several months. The bamboo is then cleaned and coated with varnish to protect it. With proper preparation and preservation, a well-made bamboo instrument can last approximately three to five years.",
      "Because of the limited preparation time before the 2019 festival, however, some of the instruments were produced under rushed conditions and later became infested with bukbok, or wood-boring insects. This highlights the importance of proper bamboo selection, treatment, and preservation in sustaining bamboo musical instrument-making traditions.",
      "Despite these challenges, bamboo remains readily available in Dulag, with several local sources supplying the material. There is currently little regulation concerning bamboo harvesting, partly because residents commonly use coco lumber instead of bamboo for construction and other purposes. Bamboo production was temporarily affected when the region was severely hit by Typhoon Yolanda, but bamboo has since naturally regrown in the area.",
      "The Karatong Festival demonstrates how a community can transform a traditional bamboo instrument into a symbol of local identity, creativity, and cultural pride. Through workshops, school-based performances, local instrument makers, and government support, Dulag continues to explore the potential of bamboo not only as a material but also as a living part of the community's musical heritage.",
    ],
  },
  {
    slug: "cordillera-bamboo-day",
    title: "Cordillera Bamboo Day",
    region: "Baguio City, Benguet",
    excerpt:
      "Brings together bamboo musical instrument makers, musicians, educators, and community members to share knowledge, address challenges in bamboo instrument-making, and strengthen the Cordillera's living bamboo music traditions.",
    cover: bambooday3.url,
    date: "2019",
    author: "phBMI Editorial",
    gallery: [
      {
        src: bambooday1.url,
        caption: "A bamboo bass guitar crafted by a Cordillera instrument maker.",
      },
      {
        src: bambooday2.url,
        caption: "A young participant in Kalinga attire holds a bamboo tube instrument.",
      },
      {
        src: bambooday4.url,
        caption: "Guest player-musicians perform with bamboo-bodied instruments on stage.",
      },
      {
        src: bambooday5.url,
        caption: "Musicians play a bamboo bass and a bamboo-topped guitar during the program.",
      },
      {
        src: bambooday6.url,
        caption: "Participants join a community bamboo ensemble in the open field.",
      },
    ],
    body: [
      "Cordillera Bamboo Day brought together bamboo musical instrument users, makers, musicians, educators, and other participants in a community sharing activity following the final performance of guest player-musicians. Participants gathered in a circle, introduced themselves, and shared their knowledge and experiences with bamboo musical instruments (BMIs).",
      "One of the concerns raised during the discussion was the infestation of bamboo musical instruments by bukbok, or powder-post beetles. Participants shared their experiences with the problem, highlighting the need for effective preservation and treatment methods. Dr. Jocelyn T. Guadalupe of the UP Diliman Project Team also shared that the study of bamboo musical instruments is integrated into the Department of Education's K\u201312 curriculum. She recounted how bamboo musical instruments intended for distribution to schools had deteriorated after being stored in a supplier's facility.",
      "DOST-FPRDI's BMI Program Leader Aralyn L. Quintos provided a brief background of the program and emphasized its efforts to identify effective bamboo preservation techniques. The discussion highlighted the importance of proper treatment and preservation in ensuring that bamboo musical instruments remain usable and can continue to support music education and cultural activities.",
      "Another concern raised during the gathering involved the harvesting of bamboo. Participants noted that even bamboo planted by the individual who intends to harvest it may require a permit from the Department of Environment and Natural Resources (DENR). According to participants, this requirement can lengthen the production process and discourage bamboo craftsmen and musical instrument makers. They also pointed out that bamboo is a grass and questioned the need for such permits when harvesting bamboo for craft and musical instrument production.",
      "The Cordillera is home to a rich diversity of bamboo musical instruments that form an integral part of the region's musical traditions. These instruments are used for entertainment, self-expression, and rituals. Kalinga, in particular, has a wide range of bamboo instruments, including different types of flutes, jaw's harps, zithers, and percussion instruments. Their names, forms, and uses vary across towns and villages, reflecting the diversity of Cordillera communities.",
      "Among those helping keep these traditions alive are Kalinga bamboo instrument makers Edgar Banasan and Benicio Damagon Sokkong. Edgar Banasan is a master bamboo craftsman and musician. In 2012, he co-founded EDAYA Arts Cordillera Corporation, where he continues to work as a craftsman. He is involved in the entire production process of his bamboo crafts, from harvesting the bamboo to creating the finished musical instruments.",
      "Benicio Damagon Sokkong, known as Beni to his family and friends, teaches Cordillera music at the University of Baguio. Born and raised in Baguio City, Beni traces his roots to Barangay Old Tanglag in Lubuagan, Kalinga, where he lived after the death of his father. His experiences and cultural background have shaped his work as a musician, educator, and bamboo instrument maker.",
      "Edgar and Beni share a deep knowledge of and passion for their Kalinga roots, culture, and craft. Their approaches to bamboo instrument production have several similarities, including the use of smoking as a drying process and Solignum for insect treatment. However, their markets and approaches to teaching differ. Edgar has a stronger focus on the international market, while his workshops cater particularly to younger students and recent college graduates. Beni primarily sells his instruments locally and shares his knowledge through his university teaching position and workshops.",
      "Although Edgar and Beni have taken different paths as bamboo craftsmen and educators, they share a common vision: to preserve and promote the rich culture of Kalinga through bamboo musical instruments. More importantly, they hope to pass this knowledge and practice on to future generations so that the sound, craftsmanship, and cultural meaning of Cordillera bamboo music will continue to thrive.",
    ],
  },
  {
    slug: "tultugan-festival",
    title: "Tultugan Festival",
    region: "Maasin, Iloilo",
    excerpt:
      "Maasin's annual celebration of bamboo — a town known as the Bamboo Capital of Iloilo, where striking bamboo marks both tradition and identity.",
    cover: tultugan1.url,
    date: "May 2021",
    author: "phBMI Editorial",
    gallery: [
      {
        src: tultugan1.url,
        caption:
          "Towering bamboo installations at the Tultugan Festival showcase Maasin's bamboo craftsmanship.",
      },
      {
        src: tultugan2.url,
        caption:
          "Bamboo percussion ensembles perform, demonstrating the musical traditions of the festival.",
      },
      {
        src: tultugan3.url,
        caption: "Street celebrations feature all-bamboo percussion and traditional performances.",
      },
      {
        src: tultugan4.url,
        caption:
          "Participants display the diversity of bamboo instruments and crafts that define the festival.",
      },
    ],
    body: [
      "Maasin, Iloilo earned its title as the Bamboo Capital of the Philippines through generations of skilled bamboo cultivation and craftsmanship. The Tultugan Festival — from the Hiligaynon word for the act of striking bamboo — is its grandest expression, celebrating the town's identity and cultural heritage rooted in bamboo.",
      "The name Tultugan itself reflects the festival's core: the percussive striking of bamboo instruments that have accompanied Maasin's communities for generations. Through this celebration, the town transforms its streets with towering bamboo installations, replacing traditional drum-and-bugle performances with all-bamboo percussion ensembles, and driving street dances entirely with the resonant crack and rhythm of bamboo culms striking in unison.",
      "In May 2021, a comprehensive research documentation and data gathering effort was conducted at Maasin Central Elementary School to preserve and validate the festival's cultural significance. Ms. Rosemarie Bayag, a dedicated BMI maker and trainer who served as the District Music Coordinator, led this initiative with support from Prof. Hermie Cartagena of the University of the Philippines Visayas, an ethnographer and module writer from the Division of Professional Education. This collaboration with UPCE academics underscored the festival's importance as a living cultural expression worthy of scholarly attention and community transmission.",
      "The festival has become a major draw for cultural tourism, channeling income back into local bamboo farmers and makers who form the backbone of Maasin's economy. Through celebrations like the Tultugan Festival, the town continues to demonstrate how a community can transform traditional bamboo instruments and practices into symbols of local identity, creativity, and cultural pride.",
      "As Maasin continues to celebrate the Tultugan Festival, it honors both its heritage as the Bamboo Capital and its commitment to sustaining bamboo musical instrument traditions for future generations. The festival serves as a powerful reminder that bamboo is not merely a material resource, but a living part of the community's musical heritage and cultural identity.",
    ],
  },
  {
    slug: "las-pinas-bamboo-organ-festival",
    title: "Las Piñas Bamboo Organ",
    region: "Las Piñas City",
    excerpt:
      "The only functional 200-year-old pipe organ made entirely of bamboo — a National Cultural Treasure and living masterpiece of craftsmanship.",
    cover: lasPinas1.url,
    date: "1824",
    author: "phBMI Editorial",
    gallery: [
      {
        src: lasPinas1.url,
        caption:
          "The Las Piñas Bamboo Organ, featuring 902 bamboo pipes and 129 metal pipes, permanently installed in St. Joseph Parish Church.",
      },
    ],
    body: [
      "To date, the Las Piñas Bamboo Organ is the oldest and the largest in the Philippines, and possibly the world. This musical instrument is the one and only functional organ made of bamboo and is actively used in liturgical services. What sets this apart from the other existing church organs is not only the material from which it is made but also its endurance, as it has been around for more than two hundred years. The bamboo organ of Las Piñas is a cultural treasure, the only one of its kind in the Philippines.",
      "The Bamboo Organ was created by Father Diego Cera during his assignment as parish priest of Las Piñas from 1795 to 1832. In 2003, it was declared a National Cultural Treasure of the Philippines. The organ consists of 1,031 pipes distributed into 902 bamboo pipes and 129 metal pipes, plus a pajarito — an instrument that produces a bird-like sound. Father Diego Cera completed this monumental work after six years of dedicated labor, finishing in 1824.",
      "The instrument's construction required meticulous attention to detail, involving multiple specialized processes: harvesting the bamboo pipes, acquiring sheepskin for the bellows, assembling the bellows, shipping trumpet reed pipes, installing reed pipes, finishing work, installing detachable labium with replaceable parts, curing the pipes in sand by the beach, unearthing the pipes, and assembling the case mechanism using other wood types such as narra, molave, and kamagong.",
      "In the mechanism of the bamboo organ, wind pressure is supplied by the bellows. The sound is produced by playing the keyboard, with bass notes played on the pedals. The keyboard's melodic range is F1 to F6, while the pedal range is F1 to E3. Its role in the ensemble is for melody and accompaniment, while its function in social and cultural activities is for liturgical and para-liturgical music performed inside the church, as well as to provide classical repertoire for pipe organ performance.",
      "The bamboo organ is permanently installed on the upper left wall of the church adjacent to the choir loft. The bamboo pipes are housed in a frame visible to the congregation. Underneath the pipes, in the mezzanine porch, is the keyboard and the organist's chamber. The metal reed pipes are under the flooring of the mezzanine chamber, and the sound mechanism is in a room adjacent to the bamboo pipes but invisible to the audience. The electronically operated bellows are adjacent to the sound chamber on the left side of the choir loft.",
      "Several calamities rendered the organ unplayable for a long time. However, in 1972, the national government and the local community collaborated to have the organ shipped to Germany for restoration. It stayed there for a couple of years, returning to its homeland in 1975. The responsibility of maintaining the bamboo organ was then assigned to two young alumni of St. Joseph's Academy: Cealwyn Tagle and the late Edgar Montiano. Being members of the Las Piñas Boys Choir, their interest in the technical side of the instrument grew, and they were noticed by Leo Renier, former director of St. Joseph Academy and founder of the Las Piñas Boys Choir, who encouraged them to pursue organ building.",
      "Tagle and Montiano were sent to Austria and Germany for training and apprenticeship under the intense supervision of Europe's organ masters. This was made possible by the Bamboo Organ Foundation Incorporated, a non-stock, non-profit organization founded to preserve and maintain the historic Bamboo Organ and to engage in the spiritual, educational, and social enrichment of the people of Las Piñas. The foundation also organizes the yearly International Bamboo Organ Festival.",
      "In March 1994, Tagle and Montiano founded Diego Cera Organ Builders, Inc. — the first Filipino pipe organ building company. Since its founding, the company has built over 20 custom-made pipe organs for local and international clients, including restorations in Lithuania and Austria. They have been involved in the overhauling of the Manila Cathedral-Basilica Organ, supposedly the biggest organ in Southeast Asia, and restorations of pipe organs in the Santo Domingo Church in Quezon City, the Holy Spirit Church in Tayuman, Manila, and historic organs in Baclayon, Loboc, and Loay in Bohol and Cebu.",
      "The company sources its bamboo from Zapote, Cavite, and Batangas at approximately Php 150 per pole. The quantity of bamboo poles depends on the project — a custom-built bamboo pipe organ may use 1,200 to 5,000 poles. The bamboo poles are air-dried vertically for a year, then soaked in fungicide and air-dried again for 1-2 months. The company started with Php 1.5M donated by an Australian priest and now maintains both local and international markets in Singapore, Japan, Germany, and Australia, earning Php 1.3 to 4.5M per project.",
      "The Las Piñas Bamboo Organ stands as a testament to the enduring legacy of craftsmanship and the potential of bamboo as a material for creating instruments of extraordinary beauty and longevity. Through the dedication of Father Diego Cera, the restoration efforts of Cealwyn Tagle and Edgar Montiano, and the continued work of Diego Cera Organ Builders, Inc., this unique instrument continues to inspire communities and demonstrate how a single material — bamboo — can serve as both a bridge to cultural heritage and a foundation for contemporary musical expression.",
    ],
  },
];
