import { createContext, useContext, useState } from "react";

export const enum Role {
  ADMIN = "admin",
  USER = "user",
}

interface AuthStateProps {
  user: {
    token: string;
    username: string;
  } | null;
  role: Role | null;
}

interface AuthContextProps {
  auth: AuthStateProps;
  onLogin: (username: string, password: string) => void;
  onSignup: (username: string, password: string) => void;
  onLogout: () => void;
}

const AuthContxt = createContext<Partial<AuthContextProps>>({});

export const useAuth = () => useContext(AuthContxt);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthStateProps>({
    user: null,
    role: null,
  });

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setAuthState({
        user: {
          token: "338383",
          username: username,
        },
        role: Role.ADMIN,
      });
    } else if (username === "user" && password === "user") {
      setAuthState({
        user: {
          token: "338383",
          username: username,
        },
        role: Role.USER,
      });
    } else {
      alert("Wrong username or password inputted");
    }
  };
  const signup = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setAuthState({
        user: {
          token: "338383",
          username: username,
        },
        role: Role.ADMIN,
      });
    } else if (username === "admin" && password === "admin") {
      setAuthState({
        user: {
          token: "338383",
          username: username,
        },
        role: Role.ADMIN,
      });
    } else {
      alert("Wrong username or password inputted");
    }
  };
  const logout = () => {
    setAuthState({
      user: null,
      role: null,
    });
  };

  const value = {
    auth: authState,
    onLogin: login,
    onSignup: signup,
    onLogout: logout,
  };

  return <AuthContxt.Provider value={value}>{children}</AuthContxt.Provider>;
};
