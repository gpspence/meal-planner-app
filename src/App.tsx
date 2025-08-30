import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { useState, useEffect, createContext } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import type { SessionContextType } from './types/session';
import { ModalsProvider } from '@mantine/modals';


// Create a dynamic context with session data to use across the app
export const SessionContext = createContext<SessionContextType>({ session: null, supabase })

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  // Track auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => subscription.unsubscribe();
  }, [])

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <SessionContext.Provider value={{ session, supabase }}>
          <Router />
        </SessionContext.Provider>
      </ModalsProvider>
    </MantineProvider>
  );
}
