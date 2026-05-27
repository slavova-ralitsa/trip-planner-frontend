import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const login = (data) => axios.post(`${API}/login`, data);

export const register = (data) => axios.post(`${API}/register`, data);

