import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getAllTrips = () => {
  return API.get("/trips");
};

export const getTripById = (id) => {
    return API.get(`/trips/${id}`);
}

export const createTrip = (tripData) => {
  return API.post("/trips", tripData);
};

export const deleteTrip = (id) => {
  return API.delete(`/trips/${id}`);
};

export default API;