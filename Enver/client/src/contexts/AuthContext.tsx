import React, { createContext, useContext, useState, useEffect } from "react";
import { EnverUser, signInWithGoogle, signInWithGithub } from "@/lib/firebase";

interface AuthContextType {
  user: EnverUser | null;
  isAuthenticated: boolean;
  loginGoogle: () => Promise<EnverUser>;
  loginGithub: () => Promise<EnverUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<EnverUser | null>(() => {
    try {
      const stored = localStorage.getItem("enver_auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("enver_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("enver_auth_user");
    }
  }, [user]);

  const loginGoogle = async () => {
    const loggedUser = await signInWithGoogle();
    setUser(loggedUser);
    return loggedUser;
  };

  const loginGithub = async () => {
    const loggedUser = await signInWithGithub();
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("enver_auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginGoogle,
        loginGithub,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
