import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "jwt-token";
export const API_URL = "https://apidevelopbetterapps.com";

export interface AuthState {
  token: string | null;
  authenticated: boolean | null;
  role: Role | null;
}

export const enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface AuthProps {
  authState: AuthState;
  onRegister: (email: string, password: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;
}

const AuthContext = createContext<Partial<AuthProps>>({});

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
      console.log("🚀 ~ fetchToken ~ token:", token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;

        setAuthState({
          authenticated: true,
          token,
          role: Role.ADMIN,
        });
      }
    };
    loadToken;
  }, []);

  const onRegister = async (email: string, password: string) => {
    try {
      // Make api request to register user
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (e) {
      console.log(e);
      // return error if error occurs
      return { error: true, msg: (e as any).response?.data.msg };
    }
  };
  const onLogin = async (email: string, password: string) => {
    console.log("login called");
    try {
      // Make api request to login existing user
      const response = await axios.post(`${API_URL}/auth`, { email, password });
      console.log("🚀 ~ onLogin ~ response:", response);

      // Update auth state
      setAuthState({
        authenticated: true,
        token: response?.data.token,
        role: Role.USER,
      });

      // Set the token received as the default Authorization alue
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      // Store the token key in local storage using SecureStore synchronously
      SecureStore.setItem(TOKEN_KEY, response?.data.token);

      // Return api response
      return response;
    } catch (e: any) {
      console.log(e);
      // return error if error occurs
      return { error: true, msg: e.response.data.msg };
    }
  };
  const onLogout = async () => {
    // Delete the token stored in SecureStore
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Update HTTPS header
    axios.defaults.headers.common["Authorization"] = "";

    // Reset auth state value
    setAuthState({
      authenticated: false,
      token: null,
      role: null,
    });
  };

  useEffect(() => {
    const handleRegister = async () => {
      await onRegister("asg@g.com", "hello");
      await onLogin("asg@g.com", "hello");
    };
    handleRegister();
  }, []);

  const value = {
    authState,
    onRegister,
    onLogin,
    onLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
