import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUserLogged,
  putAccessToken,
  getAccessToken,
} from "../api/network-data";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (!token) {
        setInitializing(false);
        return;
      }
      const { error, data } = await getUserLogged();
      if (!error) setAuthedUser(data);
      setInitializing(false);
    };

    initAuth();
  }, []);

  const onLoginSuccess = async (token) => {
    putAccessToken(token);
    const { error, data } = await getUserLogged();
    if (!error) setAuthedUser(data);
  };

  const onLogout = () => {
    putAccessToken("");
    setAuthedUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ authedUser, initializing, onLoginSuccess, onLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
