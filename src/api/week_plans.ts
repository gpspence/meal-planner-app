import type { LoaderFunctionArgs } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export async function weekPlanLoader({ params }: LoaderFunctionArgs) {
  if (!params.weekPlanId) {
    throw new Response('Missing weekPlanId', { status: 400 });
  }

  const { data, error } = await supabase
    .from('week_plans')
    .select('*')
    .eq('id', params.weekPlanId)
    .single();

  if (error) {
    throw new Response('Failed to load week plan', {
      status: 404,
      statusText: error.message,
    });
  }

  return data;
}
