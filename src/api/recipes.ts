import { supabase } from '../supabaseClient';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { Database } from '@/database.types';


type RecipeInsert = Database["public"]["Tables"]["recipes"]["Insert"]


export async function loadRecipes() {
    const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("title", { ascending: true });

    if (error) {
        // Throw a response for react router
        throw new Response("Failed to load recipes", {
            status: 500,
            statusText: error.message
        });
    }

    return data;
}

export async function createRecipe(recipe: RecipeInsert): Promise<RecipeInsert> {
    const { data, error } = await supabase
        .from("recipes")
        .insert(recipe)
        .select()
        .single();

    if (error) {
        throw new Response("Failed to add recipe", {
            status: 400,
            statusText: error.message
        });
    }

    return data
}