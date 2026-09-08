import { createContext, useContext, useMemo, useState } from "react";

import * as authService from "../services/authService";

const AuthContext = createContext(null);
const USER_KEY = "everon_auth_user";

function getStoredUser() {
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const value = useMemo(
    () => ({
      user,
      async login(credentials) {
        const result = await authService.login(credentials);
        setUser(result.user);
        sessionStorage.setItem(USER_KEY, JSON.stringify(result.user));
        return result;
      },
      async register(payload) {
        const result = await authService.completeRegistration(payload);
        setUser(result.user);
        sessionStorage.setItem(USER_KEY, JSON.stringify(result.user));
        return result;
      },
      async logout() {
        await authService.logout();
        setUser(null);
        sessionStorage.removeItem(USER_KEY);
      },
      updateUser(nextUser) {
        setUser(nextUser);
        sessionStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
