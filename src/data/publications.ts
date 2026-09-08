const pdfAssets = import.meta.glob<string>("/src/assets/publications/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
});

function pdf(filename: string): string {
  const url = pdfAssets[`/src/assets/publications/${filename}`];
  if (!url) throw new Error(`Missing publication PDF asset: ${filename}`);
  return url;
}

export interface Publication {
  id: string;
  title: string;
  linkTitle: string;
  author: string;
  publisher: string;
  isbn: string;
  description: string;
  pdfUrl: string;
  pdfFilename: string;
}

export const FEATURED_PUBLICATION: Publication = {
  id: "coffee-table-book",
  title:
    "Tradition and Innovation: People, Places, and Practices of Bamboo Music in the Philippines",
  linkTitle: "Coffee Table Book",
  author: "Essays by John Joseph S. Coronel",
  publisher: "A publication of the UP Center for Ethnomusicology",
  isbn: "978-971-92869-3-6",
  description:
    "Tradition and Innovation: People, Places, and Practices of Bamboo Music in the Philippines explores the rich traditions, communities, places, and practices surrounding bamboo music in the Philippines. Through the essays of John Joseph S. Coronel, the publication highlights the cultural significance of bamboo musical instruments and the people who continue to preserve, practice, and innovate these traditions.",
  pdfUrl: pdf("coffee-table-book-bamboo-music-philippines.pdf"),
  pdfFilename: "coffee-table-book-bamboo-music-philippines.pdf",
};

export const PUBLICATIONS: Publication[] = [FEATURED_PUBLICATION];
