import karatong1 from "@/assets/karatong-1.jpg.asset.json";
import karatong2 from "@/assets/karatong-2.jpg.asset.json";
import karatong3 from "@/assets/karatong-3.jpg.asset.json";
import karatong4 from "@/assets/karatong-4.jpg.asset.json";
import karatong5 from "@/assets/karatong-5.jpg.asset.json";
import bambooday1 from "@/assets/bambooday-1.jpg.asset.json";
import bambooday2 from "@/assets/bambooday-2.jpg.asset.json";
import bambooday3 from "@/assets/bambooday-3.jpg.asset.json";
import bambooday4 from "@/assets/bambooday-4.jpg.asset.json";
import bambooday5 from "@/assets/bambooday-5.jpg.asset.json";
import bambooday6 from "@/assets/bambooday-6.jpg.asset.json";

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
      { src: karatong2.url, caption: "Student ensembles play bamboo xylophones and tubes along the parade route." },
      { src: karatong3.url, caption: "Dancers in woven attire strike carved karatong tubes in unison." },
      { src: karatong4.url, caption: "Young performers in bamboo headdresses await their turn in the street presentation." },
      { src: karatong5.url, caption: "The full street competition in Dulag, with bamboo props and all-bamboo music." },
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
      { src: bambooday1.url, caption: "A bamboo bass guitar crafted by a Cordillera instrument maker." },
      { src: bambooday2.url, caption: "A young participant in Kalinga attire holds a bamboo tube instrument." },
      { src: bambooday4.url, caption: "Guest player-musicians perform with bamboo-bodied instruments on stage." },
      { src: bambooday5.url, caption: "Musicians play a bamboo bass and a bamboo-topped guitar during the program." },
      { src: bambooday6.url, caption: "Participants join a community bamboo ensemble in the open field." },
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
    excerpt: "Maasin's annual celebration of bamboo — a town known as the Bamboo Capital of Iloilo.",
    cover: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=1600&q=80",
    date: "December 2023",
    author: "phBMI Editorial",
    body: [
      "Maasin, Iloilo earned its title as the Bamboo Capital of the Philippines through generations of skilled bamboo cultivation and craftsmanship. The Tultugan Festival — from the Hiligaynon word for the act of striking bamboo — is its grandest expression.",
      "Streets fill with towering bamboo installations, drum-and-bugle corps replaced by all-bamboo percussion ensembles, and street dances driven entirely by the percussive crack of bayog culms.",
      "The festival has become a major draw for cultural tourism, channeling income back into local bamboo farmers and makers who form the backbone of the town's economy.",
    ],
  },
  {
    slug: "las-pinas-bamboo-organ-festival",
    title: "Las Piñas Bamboo Organ Festival",
    region: "Las Piñas City",
    excerpt: "International festival featuring the only 200-year-old bamboo pipe organ in the world.",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1600&q=80",
    date: "February 2024",
    author: "phBMI Editorial",
    body: [
      "Built in 1824 by Father Diego Cera, the Las Piñas Bamboo Organ is the only one of its kind in the world. Each February, the St. Joseph Parish hosts the International Bamboo Organ Festival, drawing world-class organists and chamber ensembles.",
      "The festival pairs the instrument's distinctive, woodier-than-wood timbre with repertoire spanning Baroque masterworks to newly commissioned Filipino compositions.",
      "Proceeds support the ongoing conservation of the organ's 902 bamboo pipes — a delicate, ongoing dialogue between climate, craft, and history.",
    ],
  },
];
