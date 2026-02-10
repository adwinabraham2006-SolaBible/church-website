import { client } from './sanity.client';
import type { Sermon, Event } from '@/types/sanity';

// Sermon queries
export async function getLatestSermons(limit: number = 3): Promise<Sermon[]> {
  return client.fetch(
    `*[_type == "sermon"] | order(date desc)[0...$limit] {
      _id,
      title,
      slug,
      date,
      speaker,
      youtubeUrl,
      "sermonSlidesUrl": sermonSlides.asset->url,
      thumbnail,
      scripture,
      series,
      description
    }`,
    { limit: limit - 1 }
  );
}

export async function getAllSermons(): Promise<Sermon[]> {
  return client.fetch(
    `*[_type == "sermon"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      speaker,
      youtubeUrl,
      "sermonSlidesUrl": sermonSlides.asset->url,
      thumbnail,
      scripture,
      series,
      description
    }`
  );
}

export async function getSermonBySlug(slug: string): Promise<Sermon | null> {
  return client.fetch(
    `*[_type == "sermon" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      date,
      speaker,
      youtubeUrl,
      "sermonSlidesUrl": sermonSlides.asset->url,
      thumbnail,
      scripture,
      series,
      description
    }`,
    { slug }
  );
}

// Event queries
export async function getUpcomingEvents(limit: number = 4): Promise<Event[]> {
  const today = new Date().toISOString().split('T')[0];
  return client.fetch(
    `*[_type == "event" && date >= $today] | order(date asc)[0...$limit] {
      _id,
      title,
      slug,
      date,
      time,
      location,
      description,
      featuredImage,
      category
    }`,
    { today, limit: limit - 1 }
  );
}

export async function getAllEvents(): Promise<Event[]> {
  return client.fetch(
    `*[_type == "event"] | order(date asc) {
      _id,
      title,
      slug,
      date,
      time,
      location,
      description,
      featuredImage,
      category
    }`
  );
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      date,
      time,
      location,
      description,
      featuredImage,
      category
    }`,
    { slug }
  );
}
