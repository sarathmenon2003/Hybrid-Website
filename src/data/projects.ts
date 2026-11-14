export interface ProjectSpec {
  label: string;
  desc: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  images?: string[];
}

export const projectsData: Record<string, ProjectItem> = {
  education: {
    id: 'education',
    title: 'EXTENSION OF GEMS CAMBRIDGE INTERNATIONAL SCHOOL',
    client: 'GEMS Education',
    images: [
      '/projects/gems-cambridge-1.jpg',
      '/projects/gems-cambridge-2.jpg',
      '/projects/gems-cambridge-3.jpg',
      '/projects/gems-cambridge-4.jpg',
      '/projects/gems-cambridge-5.jpg',
      '/projects/gems-cambridge-6.jpg'
    ]
  },
  residential: {
    id: 'residential',
    title: 'Proposed Airdome at Masdar City, Abu Dhabi',
    client: 'Masdar City',
    images: [
      '/projects/masdar-airdome-1.jpg',
      '/projects/masdar-airdome-2.jpg',
      '/projects/masdar-airdome-3.jpg'
    ]
  },
  corporate: {
    id: 'corporate',
    title: 'Proposed Padel Court at Hudayriayt Sports, Abu Dhabi',
    client: 'Modon, Abu Dhabi',
    images: [
      '/projects/hudayriyat-padel-3.jpg',
      '/projects/hudayriyat-padel-1.jpg',
      '/projects/hudayriyat-padel-2.jpg'
    ]
  },
  retail: {
    id: 'retail',
    title: 'Commercial Building, Zayed City, Abu Dhabi',
    client: 'Abu Dhabi Commercial Engineering Services',
    images: [
      '/projects/zayed-commercial-1.jpg',
      '/projects/zayed-commercial-2.jpg',
      '/projects/zayed-commercial-3.jpg'
    ]
  },
  hospitality: {
    id: 'hospitality',
    title: 'Design and Built for Al Refa’aa Park –RAK- UAE',
    client: 'Presidential Court',
    images: [
      '/projects/al-refaaa-park-1.jpg',
      '/projects/al-refaaa-park-2.jpg',
      '/projects/al-refaaa-park-3.jpg',
      '/projects/al-refaaa-park-4.jpg',
      '/projects/al-refaaa-park-5.jpg'
    ]
  },
  healthcare: {
    id: 'healthcare',
    title: 'Mirdiff Sports Society',
    client: 'On plan Real Estate',
    images: [
      '/projects/mirdiff-sports-2.jpg',
      '/projects/mirdiff-sports-1.jpg',
      '/projects/mirdiff-sports-3.jpg',
      '/projects/mirdiff-sports-4.jpg'
    ]
  },
  gemsDaa: {
    id: 'gemsDaa',
    title: 'REFURBISHMENT OF GEMS DUBAI AMERICAN ACADEMY',
    client: 'GEMS Education',
    images: [
      '/projects/gems-daa-1.jpg',
      '/projects/gems-daa-2.jpg',
      '/projects/gems-daa-3.jpg',
      '/projects/gems-daa-4.jpg',
      '/projects/gems-daa-5.jpg'
    ]
  }
};
