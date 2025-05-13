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

// ✅ Fetch multiple videos by their IDs
export const fetchVideosByIds = (ids) => {
  // If there's a bulk endpoint, use that
  // Otherwise, fetch videos one by one and combine results
  return Promise.all(ids.map((id) => fetchVideoById(id))).then((responses) => {
    return {
      data: {
        videos: responses.map((res) => res.data.video),
      },
    };
  });
};
