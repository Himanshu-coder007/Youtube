// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Gaming from "./pages/Gaming";
import SavedVideo from "./pages/SavedVideo";
import LikedVideos from "./pages/LikedVideos";
import VideoDetail from "./pages/VideoDetail";
import SearchResults from "./pages/SearchResults";
import Premium from "./pages/Premium";
import Settings from "./pages/Settings";
import ReportHistory from "./pages/ReportHistory";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="trending" element={<Trending />} />
            <Route path="gaming" element={<Gaming />} />
            <Route path="saved-videos" element={<SavedVideo />} />
            <Route path="liked-videos" element={<LikedVideos />} />
            <Route path="videos/:id" element={<VideoDetail />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="premium" element={<Premium />} />
            <Route path="settings" element={<Settings />} />
            <Route path="report-history" element={<ReportHistory />} />
            <Route path="help" element={<Help />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;