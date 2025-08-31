import type { Database, Tables } from "@/types/database.types";

// Supabase types
export type Recipe = Tables<"recipes">;
export type RecipeCuisine = Tables<"recipe_cuisines">;

// Unioned types
export type RecipeWithCuisines = Recipe & {
    recipe_cuisines: (RecipeCuisine & {
        cuisines: {
            id: string;
            name: string;
        }
    })[];
};

// Custom types
export type Ingredient = {
    name: string;
    quantity: number;
    unit: string;
    note: string;
};

export type RecipeFormValues = {
    title: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string;
    cuisine: string[];
    commonCarbohydrate: string;
    prepTimeMinutes: number;
    servings: number;
    imageUrl: string;
    recipeUrl: string;
};

export type RecipeInsert = Database["public"]["Tables"]["recipes"]["Insert"]

type AutoCols = "id" | "created_at" | "updated_at";
export type NewRecipe = Omit<RecipeInsert, AutoCols>;