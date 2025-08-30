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

export async function deleteSingleRecipe(recipeId: string) {
    const { data: deletedRecipe, error: deleteError } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeId)
        .select()
        .single()
    if (deleteError) {
        console.error("Supabase recipe delete error:", deleteError);
    }

    if (!deletedRecipe) {
        throw new Error("DELETE request failed.")
    }

    return deletedRecipe
}

export async function updateRecipe(recipe: NewRecipe, id: string, cuisineIds: string[]) {
    const { data: updatedRecipe, error: recipeError } = await supabase
        .from("recipes")
        .update<NewRecipe>(recipe)
        .eq('id', id)
        .select()
        .single();

    if (recipeError) {
        console.error("Supabase recipe update error:", recipeError);
    }

    if (!updatedRecipe) {
        throw new Error("PUT request failed.")
    }

    // Clean existing cuisine links for this recipe
    const { error: deleteError } = await supabase
    .from('recipe_cuisines')
    .delete()
    .eq('recipe_id', updatedRecipe.id)

    if (deleteError) {
        throw new Error("Failed to clear old recipe_cuisine links.")
    }

    // Insert new links
    if (cuisineIds.length > 0) {
        const links: RecipeLink[] = cuisineIds.map((cuisine_id) => ({
            recipe_id: updatedRecipe.id,
            cuisine_id
        }))

        const { error: linkError } = await supabase
            .from("recipe_cuisines")
            .insert(links);

        if (linkError) {
            throw new Error("Failed to link recipe to cuisines")
        }
    }

    return updatedRecipe
}