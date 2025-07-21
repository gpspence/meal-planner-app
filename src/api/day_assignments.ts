import { supabase } from '../supabaseClient';
import type { LoaderFunctionArgs } from 'react-router-dom';


export async function dayAssignmentsLoader({ params }: LoaderFunctionArgs) {
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