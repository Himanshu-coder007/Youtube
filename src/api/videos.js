// src/api/videos.js
import axios from "axios";

// ✅ API base URL
const BASE_URL = "https://apis.ccbp.in/videos";

// ✅ Get token from Vite env
const TOKEN = import.meta.env.VITE_JWT_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// ✅ Fetch Home Page Videos
export const fetchHomeVideos = (search = "") =>
  axiosInstance.get(`/all?search=${encodeURIComponent(search)}`);

export const fetchTrendingVideos = () => axiosInstance.get("/trending");
export const fetchGamingVideos = () => axiosInstance.get("/gaming");
export const fetchVideoById = (id) => axiosInstance.get(`/${id}`);
