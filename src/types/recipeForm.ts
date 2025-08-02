import { Database } from '@/types/database.types';

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

export type Recipe = Database["public"]["Tables"]["recipes"]["Insert"]

type AutoCols = "id" | "created_at" | "updated_at";
export type NewRecipe = Omit<Recipe, AutoCols>;