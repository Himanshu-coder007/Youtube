import axios from "axios";

const BASE_URL = "https://apis.ccbp.in/videos";
const TOKEN = import.meta.env.VITE_JWT_TOKEN;

// Create axios instance with proper headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Helper function to handle individual video fetch
const fetchSingleVideo = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data.video;
  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    return null;
  }
};

// Main function to fetch videos by IDs
export const fetchVideosByIds = async (ids) => {
  try {
    // First try to fetch all videos at once if possible
    try {
      const response = await axiosInstance.get("/all");
      if (response.data?.videos) {
        // Filter the response to only include our liked videos
        const filteredVideos = response.data.videos.filter(
          (video) => video && video.id && ids.includes(video.id)
        );
        return { data: { videos: filteredVideos } };
      }
    } catch (bulkError) {
      console.log("Using fallback individual requests method");
    }

    // Fallback to individual requests if bulk fetch fails
    const videoPromises = ids.map((id) => fetchSingleVideo(id));
    const videos = await Promise.all(videoPromises);
    const validVideos = videos.filter((video) => video !== null);

    return {
      data: {
        videos: validVideos,
      },
    };
  } catch (error) {
    console.error("Error in fetchVideosByIds:", error);
    throw error;
  }
};

// Other API functions
export const fetchHomeVideos = (search = "") =>
  axiosInstance.get(`/all?search=${encodeURIComponent(search)}`);

export const fetchTrendingVideos = () => axiosInstance.get("/trending");
export const fetchGamingVideos = () => axiosInstance.get("/gaming");
export const fetchVideoById = (id) => axiosInstance.get(`/${id}`);
