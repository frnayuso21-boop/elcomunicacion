export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sections: {
        Row: {
          id: string
          name: string
          slug: string
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          order?: number
          created_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          subtitle: string
          content: string
          image_url: string
          author: string
          section_id: string | null
          is_featured: boolean
          views: number
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string
          content: string
          image_url?: string
          author?: string
          section_id?: string | null
          is_featured?: boolean
          views?: number
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string
          content?: string
          image_url?: string
          author?: string
          section_id?: string | null
          is_featured?: boolean
          views?: number
          published_at?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Article = Database['public']['Tables']['articles']['Row'];
export type Section = Database['public']['Tables']['sections']['Row'];
