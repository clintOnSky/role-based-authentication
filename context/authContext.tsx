import React, { createContext, useContext, useState } from "react";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

interface AuthStateProp {
  authenticated: boolean | null;
  username: string | null;
  role: Role | null;
}

interface AuthProps {
  authState: AuthStateProp;
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthStateProp>({
    authenticated: null,
    username: null,
    role: null,
  });

  const login = (username: string, password: string) => {
    console.log("Logging in", authState);
    if (username === "admin" && password === "admin") {
      setAuthState({
        authenticated: true,
        username,
        role: Role.ADMIN,
      });
    } else if (username === "user" && password === "user") {
      setAuthState({
        authenticated: true,
        username,
        role: Role.USER,
      });
    } else {
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    setAuthState({
      authenticated: null,
      username: null,
      role: null,
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
