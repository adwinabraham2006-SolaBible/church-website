import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity.client';

const builder = imageUrlBuilder(client);

interface SanityImageSource {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
