import { useState, useCallback } from "react";
import { login as loginRequest } from "./authService";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

function decodeToken(token) {
  try {
    return JSON.parse(
      window.atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
  } catch {
    return null;
  }
}

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const getUserId = useCallback(() => {
    if (!token) return null;
    const payload = decodeToken(token);
    return payload?.userId || payload?.id || payload?.sub || null;
  }, [token]);

  const getUserName = useCallback(() => {
    return localStorage.getItem("userName") || "Traveller";
  }, []);

  const login = useCallback(async (credentials) => {
    const res = await loginRequest(credentials);
    const receivedToken = res.data.token;
    const payload = decodeToken(receivedToken);

    const profileRes = await axios.get(
      `${API_BASE}/users/${payload.userId}`,
      { headers: { Authorization: `Bearer ${receivedToken}` } }
    );

    localStorage.setItem("token", receivedToken);
    localStorage.setItem("userName", profileRes.data.name || profileRes.data.username || "Traveller");
    setToken(receivedToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    window.location.href = "/login";
  }, []);

  return { token, getUserId, getUserName, login, logout, isLoggedIn: !!token };
}