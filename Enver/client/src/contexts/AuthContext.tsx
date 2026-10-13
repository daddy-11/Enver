import React, { createContext, useContext, useState, useEffect } from "react";
import {
  EnverUser,
  RegisterUserParams,
  LoginUserParams,
  registerUser,
  loginUser,
  signInWithGoogle,
  signInWithGithub,
  signInWithMicrosoftWork,
  signInWithEnverSso,
  acceptLegalTermsForUser,
  signOutUser,
  requestEmailOtp,
  verifyEmailOtp,
  checkAzureStaticWebAppsAuth
} from "@/lib/auth";

interface AuthContextType {
  user: EnverUser | null;
  isAuthenticated: boolean;
  hasAcceptedTerms: boolean;
  register: (params: RegisterUserParams) => Promise<EnverUser>;
  login: (params: LoginUserParams) => Promise<EnverUser>;
  sendOtp: (email: string, name?: string) => Promise<{ success: boolean; previewCode?: string; message: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; verificationToken?: string; message: string }>;
  loginGoogle: (emailOrAcceptTerms?: string | boolean, name?: string, org?: string, acceptTerms?: boolean) => Promise<EnverUser>;
  loginGithub: (acceptTerms?: boolean) => Promise<EnverUser>;
  loginMicrosoftWork: (email?: string, name?: string, org?: string, acceptTerms?: boolean) => Promise<EnverUser>;
  loginEnverSso: (email?: string, name?: string, acceptTerms?: boolean) => Promise<EnverUser>;
  acceptTerms: () => void;
  switchRole: (role: "PUBLIC" | "ENGINEER" | "ENVER_INTERNAL") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<EnverUser | null>(() => {
    try {
      const stored = localStorage.getItem("enver_auth_user");
      if (stored) return JSON.parse(stored);
    } catch {}
    return null;
  });

  // Check Azure Static Web Apps native AAD auth if not already logged in
  useEffect(() => {
    if (!user) {
      checkAzureStaticWebAppsAuth().then((azureUser) => {
        if (azureUser) setUser(azureUser);
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("enver_auth_user", JSON.stringify(user));
      localStorage.setItem("enver_enterprise_user", JSON.stringify(user));
      if (user.acceptedTos && user.acceptedPs) {
        localStorage.setItem("enver_playground_unlocked", "true");
      }
    } else {
      localStorage.removeItem("enver_auth_user");
      localStorage.removeItem("enver_enterprise_user");
    }
  }, [user]);

  const register = async (params: RegisterUserParams) => {
    const newUser = await registerUser(params);
    setUser(newUser);
    return newUser;
  };

  const login = async (params: LoginUserParams) => {
    const loggedUser = await loginUser(params);
    setUser(loggedUser);
    return loggedUser;
  };

  const loginGoogle = async (emailOrAcceptTerms?: string | boolean, name?: string, org?: string, acceptTerms = true) => {
    let email: string | undefined;
    let actualAcceptTerms = acceptTerms;
    if (typeof emailOrAcceptTerms === "boolean") {
      actualAcceptTerms = emailOrAcceptTerms;
    } else {
      email = emailOrAcceptTerms;
    }
    const loggedUser = await signInWithGoogle(email, name, org, actualAcceptTerms);
    setUser(loggedUser);
    return loggedUser;
  };

  const loginGithub = async (acceptTerms = true) => {
    const loggedUser = await signInWithGithub(acceptTerms);
    setUser(loggedUser);
    return loggedUser;
  };

  const loginMicrosoftWork = async (email?: string, name?: string, org?: string, acceptTerms = true) => {
    const loggedUser = await signInWithMicrosoftWork(email, name, org, acceptTerms);
    setUser(loggedUser);
    return loggedUser;
  };

  const loginEnverSso = async (email?: string, name?: string, acceptTerms = true) => {
    const loggedUser = await signInWithEnverSso(email, name, acceptTerms);
    setUser(loggedUser);
    return loggedUser;
  };

  const acceptTerms = () => {
    if (user) {
      const updated = acceptLegalTermsForUser(user);
      setUser(updated);
    }
  };

  const switchRole = (role: "PUBLIC" | "ENGINEER" | "ENVER_INTERNAL") => {
    if (role === "PUBLIC") {
      setUser(null);
      localStorage.removeItem("enver_auth_user");
      localStorage.removeItem("enver_enterprise_user");
      localStorage.removeItem("enver_playground_unlocked");
      return;
    }
    if (role === "ENGINEER") {
      const engUser: EnverUser = {
        uid: "msft-alex-chen",
        displayName: "Alex Chen",
        email: "alex.chen@azure-partners.microsoft.com",
        photoURL: "https://api.dicebear.com/9.x/identicon/svg?seed=AlexChen",
        provider: "microsoft",
        role: "ENGINEER",
        org: "Microsoft Azure Engineering",
        badge: "ENGINEER",
        acceptedTos: true,
        acceptedPs: true,
        tosAcceptedAt: "2026-09-30T00:00:00.000Z",
        psAcceptedAt: "2026-09-30T00:00:00.000Z"
      };
      setUser(engUser);
      return;
    }
    if (role === "ENVER_INTERNAL") {
      const leadUser: EnverUser = {
        uid: "enver-amaan-lead",
        displayName: "Amaan Shaikh",
        email: "amaan@enveraitech.com",
        photoURL: "https://api.dicebear.com/9.x/initials/svg?seed=AmaanShaikh",
        provider: "envera_sso",
        role: "ENVER_INTERNAL",
        org: "Enver AI Tech",
        badge: "LEAD",
        acceptedTos: true,
        acceptedPs: true,
        tosAcceptedAt: "2026-09-30T00:00:00.000Z",
        psAcceptedAt: "2026-09-30T00:00:00.000Z"
      };
      setUser(leadUser);
      return;
    }
  };

  const logout = () => {
    setUser(null);
    signOutUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        hasAcceptedTerms: !!(user?.acceptedTos && user?.acceptedPs),
        register,
        login,
        sendOtp: requestEmailOtp,
        verifyOtp: verifyEmailOtp,
        loginGoogle,
        loginGithub,
        loginMicrosoftWork,
        loginEnverSso,
        acceptTerms,
        switchRole,
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
