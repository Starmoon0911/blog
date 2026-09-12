export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      about: {
        Row: {
          avatar_url: string | null;
          body_md: string;
          id: number;
          social_links: Json;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          body_md: string;
          id?: number;
          social_links?: Json;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          body_md?: string;
          id?: number;
          social_links?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          body_md: string;
          created_at: string;
          deleted_at: string | null;
          id: string;
          parent_id: string | null;
          post_id: string;
          user_id: string;
        };
        Insert: {
          body_md: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          parent_id?: string | null;
          post_id: string;
          user_id: string;
        };
        Update: {
          body_md?: string;
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          parent_id?: string | null;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      post_reactions: {
        Row: {
          created_at: string;
          kind: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          kind: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          kind?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
        };
        Insert: {
          post_id: string;
          tag_id: string;
        };
        Update: {
          post_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
      post_views: {
        Row: {
          count: number;
          post_id: string;
          view_date: string;
        };
        Insert: {
          count?: number;
          post_id: string;
          view_date: string;
        };
        Update: {
          count?: number;
          post_id?: string;
          view_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_views_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          body_md: string;
          cover_url: string | null;
          created_at: string;
          excerpt: string | null;
          id: string;
          meta_description: string | null;
          meta_title: string | null;
          og_image_url: string | null;
          published_at: string | null;
          series_id: string | null;
          series_order: number | null;
          slug: string;
          status: Database["public"]["Enums"]["post_status"];
          subtitle: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          body_md: string;
          cover_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          meta_description?: string | null;
          meta_title?: string | null;
          og_image_url?: string | null;
          published_at?: string | null;
          series_id?: string | null;
          series_order?: number | null;
          slug: string;
          status: Database["public"]["Enums"]["post_status"];
          subtitle?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          body_md?: string;
          cover_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          meta_description?: string | null;
          meta_title?: string | null;
          og_image_url?: string | null;
          published_at?: string | null;
          series_id?: string | null;
          series_order?: number | null;
          slug?: string;
          status?: Database["public"]["Enums"]["post_status"];
          subtitle?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_series_id_fkey";
            columns: ["series_id"];
            isOneToOne: false;
            referencedRelation: "series";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          body_md: string;
          cover_url: string | null;
          created_at: string;
          display_order: number;
          featured: boolean;
          id: string;
          links: Json;
          slug: string;
          summary: string;
          tech_stack: string[];
          title: string;
        };
        Insert: {
          body_md: string;
          cover_url?: string | null;
          created_at?: string;
          display_order?: number;
          featured?: boolean;
          id?: string;
          links?: Json;
          slug: string;
          summary: string;
          tech_stack?: string[];
          title: string;
        };
        Update: {
          body_md?: string;
          cover_url?: string | null;
          created_at?: string;
          display_order?: number;
          featured?: boolean;
          id?: string;
          links?: Json;
          slug?: string;
          summary?: string;
          tech_stack?: string[];
          title?: string;
        };
        Relationships: [];
      };
      resume_entries: {
        Row: {
          description: string | null;
          display_order: number;
          end_date: string | null;
          id: string;
          kind: Database["public"]["Enums"]["resume_kind"];
          org: string | null;
          start_date: string | null;
          title: string;
        };
        Insert: {
          description?: string | null;
          display_order?: number;
          end_date?: string | null;
          id?: string;
          kind: Database["public"]["Enums"]["resume_kind"];
          org?: string | null;
          start_date?: string | null;
          title: string;
        };
        Update: {
          description?: string | null;
          display_order?: number;
          end_date?: string | null;
          id?: string;
          kind?: Database["public"]["Enums"]["resume_kind"];
          org?: string | null;
          start_date?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      series: {
        Row: {
          cover_url: string | null;
          created_at: string;
          description: string | null;
          display_order: number;
          id: string;
          slug: string;
          title: string;
        };
        Insert: {
          cover_url?: string | null;
          created_at?: string;
          description?: string | null;
          display_order?: number;
          id?: string;
          slug: string;
          title: string;
        };
        Update: {
          cover_url?: string | null;
          created_at?: string;
          description?: string | null;
          display_order?: number;
          id?: string;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      user_permissions: {
        Row: {
          permission: string;
          user_id: string;
        };
        Insert: {
          permission: string;
          user_id: string;
        };
        Update: {
          permission?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          display_name: string | null;
          github_url: string | null;
          id: string;
          permisstions: string[] | null;
          updated_at: string;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          github_url?: string | null;
          id: string;
          permisstions?: string[] | null;
          updated_at?: string;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          github_url?: string | null;
          id?: string;
          permisstions?: string[] | null;
          updated_at?: string;
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      post_status: "draft" | "public" | "private";
      resume_kind: "work" | "education" | "talk" | "award" | "skill";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      post_status: ["draft", "public", "private"],
      resume_kind: ["work", "education", "talk", "award", "skill"],
    },
  },
} as const;
