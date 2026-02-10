// Sanity image type
interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface Sermon {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  date: string;
  speaker: string;
  youtubeUrl?: string;
  sermonSlidesUrl?: string;
  thumbnail: SanityImage;
  scripture: string;
  series: string;
  description: string;
}

export interface Event {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  date: string;
  time: string;
  location: string;
  description: string;
  featuredImage: SanityImage;
  category: string;
}
