import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextProps {
  authState: AuthState;
  onLogin: (email: string, password: string) => Promise<any>;
  onRegister: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<void>;
}

interface AuthState {
  token: string | null;
  authenticated: boolean | null;
  role: Role | null;
}

export const enum Role {
  ADMIN = "admin",
  USER = "user",
}

const API_URL = "https://api.developbetterapps.com";
const TOKEN_KEY = "token";

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
    role: null,
  });

  useEffect(() => {
    const loadToken = () => {
      const token = SecureStore.getItem(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  const onRegister = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        email,
        password,
      });
      return response.data;
    } catch (e: any) {
      console.log(e);
      alert(e.message);
      return { error: true, msg: e.response.data.msg };
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        email,
        password,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.data.token}`;

      setAuthState({
        token: response?.data.token,
        authenticated: true,
        role: Role.ADMIN,
      });

      SecureStore.setItem(TOKEN_KEY, response?.data.token);
      console.log(response?.data);
      return response;
    } catch (e: any) {
      console.log(e);
      alert(e.response.data.msg);
      return { error: true, msg: e.response.data.msg };
    }
  };

  const onLogout = async () => {
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: null,
      role: null,
    });
    SecureStore.deleteItemAsync(TOKEN_KEY);
  };

  const fetchUsers = async () => {
    console.log("fetch user called");
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(response?.data[0]);
    } catch (e: any) {
      console.log("Error", e?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const value = {
    authState,
    onRegister,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
