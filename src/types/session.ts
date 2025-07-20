import { SupabaseClient, Session } from '@supabase/supabase-js';

export type SessionContextType = {
  session: Session | null;
  supabase: SupabaseClient;
};