export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      cuisines: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      day_assignments: {
        Row: {
          added_by: string | null;
          assigned_date: string;
          created_at: string;
          id: string;
          meal_type: string | null;
          notes: string | null;
          recipe_id: string | null;
          updated_at: string;
          user_id: string | null;
          week_plan_id: string | null;
        };
        Insert: {
          added_by?: string | null;
          assigned_date: string;
          created_at?: string;
          id?: string;
          meal_type?: string | null;
          notes?: string | null;
          recipe_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
          week_plan_id?: string | null;
        };
        Update: {
          added_by?: string | null;
          assigned_date?: string;
          created_at?: string;
          id?: string;
          meal_type?: string | null;
          notes?: string | null;
          recipe_id?: string | null;
          updated_at?: string;
          user_id?: string | null;
          week_plan_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'day_assignments_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'day_assignments_week_plan_id_fkey';
            columns: ['week_plan_id'];
            isOneToOne: false;
            referencedRelation: 'week_plans';
            referencedColumns: ['id'];
          },
        ];
      };
      friend_requests: {
        Row: {
          created_at: string;
          id: string;
          recipient_id: string | null;
          requester_id: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          recipient_id?: string | null;
          requester_id?: string | null;
          status: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          recipient_id?: string | null;
          requester_id?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      friends: {
        Row: {
          created_at: string;
          friend_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          friend_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          friend_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      permissions: {
        Row: {
          created_at: string | null;
          granted_by: string | null;
          id: string;
          permission_type: string | null;
          resource_id: string;
          resource_type: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          granted_by?: string | null;
          id?: string;
          permission_type?: string | null;
          resource_id: string;
          resource_type?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          granted_by?: string | null;
          id?: string;
          permission_type?: string | null;
          resource_id?: string;
          resource_type?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      recipe_cuisines: {
        Row: {
          cuisine_id: string;
          recipe_id: string;
        };
        Insert: {
          cuisine_id: string;
          recipe_id: string;
        };
        Update: {
          cuisine_id?: string;
          recipe_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_cuisines_cuisine_id_fkey';
            columns: ['cuisine_id'];
            isOneToOne: false;
            referencedRelation: 'cuisines';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_cuisines_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
        ];
      };
      recipe_tags: {
        Row: {
          recipe_id: string;
          tag_id: string;
        };
        Insert: {
          recipe_id: string;
          tag_id: string;
        };
        Update: {
          recipe_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'recipe_tags_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'recipe_tags_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
        ];
      };
      recipes: {
        Row: {
          added_by: string | null;
          common_carbohydrate: string | null;
          created_at: string;
          description: string | null;
          id: string;
          image_url: string | null;
          ingredients: Json | null;
          instructions: string | null;
          prep_time_minutes: number | null;
          recipe_url: string;
          servings: number | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          added_by?: string | null;
          common_carbohydrate?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          ingredients?: Json | null;
          instructions?: string | null;
          prep_time_minutes?: number | null;
          recipe_url: string;
          servings?: number | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          added_by?: string | null;
          common_carbohydrate?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          ingredients?: Json | null;
          instructions?: string | null;
          prep_time_minutes?: number | null;
          recipe_url?: string;
          servings?: number | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          added_by: string | null;
          id: string;
          name: string;
        };
        Insert: {
          added_by?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          added_by?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      user_recipe_interactions: {
        Row: {
          added_by: string | null;
          created_at: string;
          id: string;
          is_favorite: boolean | null;
          notes: string | null;
          rating: number | null;
          recipe_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          added_by?: string | null;
          created_at?: string;
          id?: string;
          is_favorite?: boolean | null;
          notes?: string | null;
          rating?: number | null;
          recipe_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          added_by?: string | null;
          created_at?: string;
          id?: string;
          is_favorite?: boolean | null;
          notes?: string | null;
          rating?: number | null;
          recipe_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_recipe_interactions_recipe_id_fkey';
            columns: ['recipe_id'];
            isOneToOne: false;
            referencedRelation: 'recipes';
            referencedColumns: ['id'];
          },
        ];
      };
      week_plans: {
        Row: {
          added_by: string | null;
          created_at: string;
          id: string;
          label: string | null;
          updated_at: string;
          user_id: string | null;
          week_start: string;
        };
        Insert: {
          added_by?: string | null;
          created_at?: string;
          id?: string;
          label?: string | null;
          updated_at?: string;
          user_id?: string | null;
          week_start: string;
        };
        Update: {
          added_by?: string | null;
          created_at?: string;
          id?: string;
          label?: string | null;
          updated_at?: string;
          user_id?: string | null;
          week_start?: string;
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
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
