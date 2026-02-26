import { useState, useEffect } from "react";
import api from "../api/axios";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on app load
  const checkAuth = async () => {
    try {
      await api.get("/tasks");
      setUser({ authenticated: true });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data) => {
    await api.post("/auth/login", data);
    setUser({ authenticated: true });
  };

  const register = async (data) => {
    await api.post("/auth/register", data);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
