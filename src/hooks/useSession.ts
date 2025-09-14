import { useContext } from 'react';
import { SessionContext } from '@/App';
import { SessionContextType } from '@/types/session';

/**
 * Custom hook to access the current Supabase authentication session.
 * @returns The active Supabase session context.
 */
export function useSession(): SessionContextType {
  return useContext(SessionContext);
}
