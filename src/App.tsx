import '@mantine/core/styles.css';

import { createContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Router } from './Router';
import { supabase } from './supabaseClient';
import { theme } from './theme';
import type { SessionContextType } from './types/session';

// Create a dynamic context with session data to use across the app
export const SessionContext = createContext<SessionContextType>({ session: null, supabase });

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  // Track auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
