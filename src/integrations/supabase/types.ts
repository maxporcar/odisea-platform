export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      checklist_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          order_index: number
          template_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number
          template_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number
          template_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "checklist_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_templates: {
        Row: {
          category: Database["public"]["Enums"]["checklist_category"]
          city_id: string | null
          country_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          order_index: number
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["checklist_category"]
          city_id?: string | null
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["checklist_category"]
          city_id?: string | null
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_templates_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_templates_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          climate_md: string | null
          cost_of_living_md: string | null
          country_id: string
          country_slug: string | null
          created_at: string | null
          description: string | null
          events_md: string | null
          id: string
          image_url: string | null
          latitude: number | null
          longitude: number | null
          name: string
          rent_md: string | null
          safety_md: string | null
          slug: string | null
          social_md: string | null
          universities_md: string | null
          updated_at: string | null
        }
        Insert: {
          climate_md?: string | null
          cost_of_living_md?: string | null
          country_id: string
          country_slug?: string | null
          created_at?: string | null
          description?: string | null
          events_md?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          rent_md?: string | null
          safety_md?: string | null
          slug?: string | null
          social_md?: string | null
          universities_md?: string | null
          updated_at?: string | null
        }
        Update: {
          climate_md?: string | null
          cost_of_living_md?: string | null
          country_id?: string
          country_slug?: string | null
          created_at?: string | null
          description?: string | null
          events_md?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          rent_md?: string | null
          safety_md?: string | null
          slug?: string | null
          social_md?: string | null
          universities_md?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          big_cities_vs_small_cities_md: string | null
          capital: string
          capital_description: string
          continent: string
          cost_of_living: Database["public"]["Enums"]["cost_level"]
          created_at: string | null
          culture_md: string | null
          currency: string
          description: string
          dos_and_donts_md: string | null
          flag: string | null
          housing: string | null
          id: string
          image_url: string | null
          language: string
          latitude: number | null
          life_activities_travel_md: string | null
          longitude: number | null
          medical_md: string | null
          name: string
          overview_md: string | null
          population: string
          slug: string | null
          student_benefits_scholarships_md: string | null
          student_population: string | null
          transportation: string | null
          updated_at: string | null
          visa_info: string | null
          visa_information_md: string | null
        }
        Insert: {
          big_cities_vs_small_cities_md?: string | null
          capital: string
          capital_description: string
          continent: string
          cost_of_living?: Database["public"]["Enums"]["cost_level"]
          created_at?: string | null
          culture_md?: string | null
          currency: string
          description: string
          dos_and_donts_md?: string | null
          flag?: string | null
          housing?: string | null
          id: string
          image_url?: string | null
          language: string
          latitude?: number | null
          life_activities_travel_md?: string | null
          longitude?: number | null
          medical_md?: string | null
          name: string
          overview_md?: string | null
          population: string
          slug?: string | null
          student_benefits_scholarships_md?: string | null
          student_population?: string | null
          transportation?: string | null
          updated_at?: string | null
          visa_info?: string | null
          visa_information_md?: string | null
        }
        Update: {
          big_cities_vs_small_cities_md?: string | null
          capital?: string
          capital_description?: string
          continent?: string
          cost_of_living?: Database["public"]["Enums"]["cost_level"]
          created_at?: string | null
          culture_md?: string | null
          currency?: string
          description?: string
          dos_and_donts_md?: string | null
          flag?: string | null
          housing?: string | null
          id?: string
          image_url?: string | null
          language?: string
          latitude?: number | null
          life_activities_travel_md?: string | null
          longitude?: number | null
          medical_md?: string | null
          name?: string
          overview_md?: string | null
          population?: string
          slug?: string | null
          student_benefits_scholarships_md?: string | null
          student_population?: string | null
          transportation?: string | null
          updated_at?: string | null
          visa_info?: string | null
          visa_information_md?: string | null
        }
        Relationships: []
      }
      institutions: {
        Row: {
          active_subscription: boolean | null
          created_at: string | null
          domain: string
          id: string
          name: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          active_subscription?: boolean | null
          created_at?: string | null
          domain: string
          id?: string
          name: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          active_subscription?: boolean | null
          created_at?: string | null
          domain?: string
          id?: string
          name?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string | null
          full_name: string | null
          id: string
          institution_id: string | null
          is_admin: boolean | null
          is_premium: boolean | null
          language: string | null
          updated_at: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          institution_id?: string | null
          is_admin?: boolean | null
          is_premium?: boolean | null
          language?: string | null
          updated_at?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          institution_id?: string | null
          is_admin?: boolean | null
          is_premium?: boolean | null
          language?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          institution_id: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          subscription_type: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          institution_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          subscription_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          institution_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          subscription_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscribers_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          country_id: string | null
          created_at: string | null
          destination: string
          duration: string | null
          full_story: string | null
          id: string
          image_url: string | null
          name: string
          program: string | null
          rating: number | null
          short_story: string | null
          tips: string[] | null
          updated_at: string | null
        }
        Insert: {
          country_id?: string | null
          created_at?: string | null
          destination: string
          duration?: string | null
          full_story?: string | null
          id?: string
          image_url?: string | null
          name: string
          program?: string | null
          rating?: number | null
          short_story?: string | null
          tips?: string[] | null
          updated_at?: string | null
        }
        Update: {
          country_id?: string | null
          created_at?: string | null
          destination?: string
          duration?: string | null
          full_story?: string | null
          id?: string
          image_url?: string | null
          name?: string
          program?: string | null
          rating?: number | null
          short_story?: string | null
          tips?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          city_id: string | null
          country_id: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          ranking: number | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          city_id?: string | null
          country_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          ranking?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          city_id?: string | null
          country_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          ranking?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "universities_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "universities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_checklist_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          item_id: string
          trip_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          item_id: string
          trip_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          item_id?: string
          trip_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_checklist_progress_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "checklist_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_checklist_progress_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "user_trips"
            referencedColumns: ["id"]
          },
        ]
      }
      user_trips: {
        Row: {
          city_id: string | null
          country_id: string | null
          created_at: string | null
          departure_date: string | null
          destination_name: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          city_id?: string | null
          country_id?: string | null
          created_at?: string | null
          departure_date?: string | null
          destination_name: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          city_id?: string | null
          country_id?: string | null
          created_at?: string | null
          departure_date?: string | null
          destination_name?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_trips_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_trips_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      checklist_category:
        | "three_months_before"
        | "one_two_months_before"
        | "two_weeks_before"
        | "travel_day"
        | "first_week_abroad"
        | "packing_suitcase"
      cost_level: "low" | "medium" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      checklist_category: [
        "three_months_before",
        "one_two_months_before",
        "two_weeks_before",
        "travel_day",
        "first_week_abroad",
        "packing_suitcase",
      ],
      cost_level: ["low", "medium", "high"],
    },
  },
} as const
