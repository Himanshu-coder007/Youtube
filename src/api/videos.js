// src/api/videos.js
import axios from "axios";

// ✅ API base URL
const BASE_URL = "https://apis.ccbp.in/videos";

// ✅ Your JWT token (hardcoded for now – move to env or auth context in production)
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU";

// ✅ Create reusable axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// ✅ Fetch Home Page Videos
export const fetchHomeVideos = (search = "") =>
  axiosInstance.get(`/all?search=${encodeURIComponent(search)}`);

// ✅ Fetch Trending Videos
export const fetchTrendingVideos = () => axiosInstance.get("/trending");

// ✅ Fetch Gaming Videos
export const fetchGamingVideos = () => axiosInstance.get("/gaming");

// ✅ Fetch Single Video by ID
export const fetchVideoById = (id) => axiosInstance.get(`/${id}`);
