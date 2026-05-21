import React, { createContext, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/index";

export type ContextProps = {
  user: User | null;
  isLoading: boolean;
};

export type AuthProviderProps = {
  children: ReactNode;
};

// Standaarwaarde context
export const AuthContext = createContext<ContextProps>({
  user: null,
  isLoading: true,
});

const AuthUserProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthUserProvider;
