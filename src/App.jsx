// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Gaming from './pages/Gaming';
import SavedVideo from './pages/SavedVideo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trending" element={<Trending />} />
          <Route path="gaming" element={<Gaming />} />
          <Route path="saved-videos" element={<SavedVideo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
