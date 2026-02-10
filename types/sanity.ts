import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

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
  thumbnail: SanityImageSource;
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
  featuredImage: SanityImageSource;
  category: string;
}
