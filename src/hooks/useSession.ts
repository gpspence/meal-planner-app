import { useContext } from 'react';
import { SessionContext } from '@/App';
import { SessionContextType } from '@/types/session';

export function useSession(): SessionContextType {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionContext.Provider.');
  }
  return context;
}
