// Supabase Database Types

export interface Sermon {
  id: string;
  title: string;
  date: string;
  speaker: string;
  scripture: string;
  series_id: string | null;
  description: string;
  audio_url: string | null;
  video_url: string | null;
  slides_url: string | null;
  notes_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string | null;
  body: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Bulletin {
  id: string;
  week_of: string;
  pdf_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  category: string | null;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface SermonSeries {
  id: string;
  name: string;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Database schema type for Supabase client
export interface Database {
  public: {
    Tables: {
      sermons: {
        Row: Sermon;
        Insert: Omit<Sermon, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Sermon, 'id' | 'created_at' | 'updated_at'>>;
      };
      events: {
        Row: Event;
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>;
      };
      announcements: {
        Row: Announcement;
        Insert: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Announcement, 'id' | 'created_at' | 'updated_at'>>;
      };
      bulletins: {
        Row: Bulletin;
        Insert: Omit<Bulletin, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Bulletin, 'id' | 'created_at' | 'updated_at'>>;
      };
      staff: {
        Row: Staff;
        Insert: Omit<Staff, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Staff, 'id' | 'created_at' | 'updated_at'>>;
      };
      books: {
        Row: Book;
        Insert: Omit<Book, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Book, 'id' | 'created_at' | 'updated_at'>>;
      };
      sermon_series: {
        Row: SermonSeries;
        Insert: Omit<SermonSeries, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SermonSeries, 'id' | 'created_at' | 'updated_at'>>;
      };
      pages: {
        Row: Page;
        Insert: Omit<Page, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Page, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
