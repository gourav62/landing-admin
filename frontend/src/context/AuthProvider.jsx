// frontend/src/context/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // Optional: on mount validate token (call /api/auth/me)
  useEffect(() => {
    async function validate() {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || "http://localhost:5000/api") + "/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.authenticated) setUser(data.user || { username: data.user?.username });
        else {
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
        }
      } catch {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
      }
    }
    validate();
  }, [token]);

  const login = (tok) => {
    setToken(tok);
    localStorage.setItem("token", tok);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
