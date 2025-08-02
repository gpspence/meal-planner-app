import { supabase } from '../supabaseClient';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { Database } from '@/types/database.types';
import { NewRecipe, Recipe } from '@/types/recipeForm';


type RecipeLink = {
    recipe_id: string;
    cuisine_id: string;
}

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

export async function createRecipe(recipe: NewRecipe, cuisineIds: string[]): Promise<Recipe | undefined> {
    const session = await supabase.auth.getSession();
    const user = session.data.session?.user;

    // Create the new recipe
    let recipeWithUser: NewRecipe
    if (user) {
        recipeWithUser = {
            ...recipe,
            added_by: user.id
        };
    } else {
        throw new Error("You must be logged in to add a recipe!")
    }

    console.log("New recipe", recipeWithUser)

    const { data: createdRecipe, error: recipeError } = await supabase
        .from("recipes")
        .insert<NewRecipe>(recipeWithUser)
        .select()
        .single();

    if (recipeError) {
        console.error("Supabase recipe insert error:", recipeError);
    }

    if (!createdRecipe) {
        throw new Error("POST request failed.")
    }

    // Insert the links to cuisines
    if (cuisineIds.length > 0) {
        const links: RecipeLink[] = cuisineIds.map((cuisine_id) => ({
            recipe_id: createdRecipe.id,
            cuisine_id
        }))

        const { error: linkError } = await supabase
            .from("recipe_cuisines")
            .insert(links);

        if (linkError) {
            throw new Error("Failed to link recipe to cuisines")
        }
    }

    return createdRecipe
}