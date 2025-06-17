import { supabase } from './supabaseClient';
import type { LoaderFunctionArgs } from 'react-router-dom';

async function recipesLoader() {
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

async function weekPlanLoader({ params }: LoaderFunctionArgs) {
    if (!params.weekPlanId) {
        throw new Response("Missing weekPlanId", { status: 400 })
    }

    const { data, error } = await supabase
        .from("week_plans")
        .select("*")
        .eq("id", params.weekPlanId)
        .single();

    if (error) {
        throw new Response("Failed to load week plan", {
            status: 404,
            statusText: error.message
        });
    }

    return data
}

async function dayAssignmentsLoader({ params }: LoaderFunctionArgs) {
    if (!params.weekPlanId) {
        throw new Response("Missing weekPlanId", { status: 400 })
    }

    const { data, error } = await supabase
    .from("day_assignments")
    .select("*, recipes(*)")  // join recipes
    .eq("week_plan_id", params.weekPlanId)

    if (error) {
        throw new Response("Failed to load day assignments", {
            status: 404,
            statusText: error.message
        });
    }
}

export { 
    recipesLoader, 
    weekPlanLoader,
    dayAssignmentsLoader
}