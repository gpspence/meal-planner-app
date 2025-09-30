import { render } from '@test-utils';
import { SessionContext } from '@/App';
import { supabase } from '@/supabaseClient';
import type { SessionContextType } from '@/types/session';
import { useSession } from './useSession';

function TestComponent() {
  const session = useSession();
  return <div>{session?.session?.user?.email ?? 'no session'}</div>;
}

describe('useSession', () => {
  it('returns the session context when inside a provider', () => {
    const mockSession: SessionContextType = {
      supabase,
      session: null,
    };

    render(
      <SessionContext.Provider value={mockSession}>
        <TestComponent />
      </SessionContext.Provider>
    );
  });
});
