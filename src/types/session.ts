import { SupabaseClient, Session } from '@supabase/supabase-js';

export type SessionContextType = {
  session: Session | null | undefined;
  supabase: SupabaseClient;
};