import { createContext, useState, ReactNode, useContext } from 'react';

export type AuthHeader = `Basic ${string}` | '';

type AuthContext = {
  authHeader: AuthHeader;
  setAuthHeader: React.Dispatch<React.SetStateAction<AuthHeader>>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authHeader, setAuthHeader] = useState<AuthHeader>('');

  return (
    <AuthContext.Provider value={{ authHeader, setAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};