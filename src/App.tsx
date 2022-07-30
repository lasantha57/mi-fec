import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { VideosTable } from './components/VideosTable';
import { getVideos } from './services/videos';
import { ProcessedVideo } from './common/interfaces';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import "./index.css";

const App: React.FC = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);

  useEffect(() => {
    getVideos()
      .then((videos) => {
        setVideos(videos);
      });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<VideosTable videos={videos} />} />
        <Route path="/video/new" element={<>New Video</>} />
        <Route path="/video/edit/:authorId/:videoId" element={<>Edit Video</>} />
        <Route path="/about-us" element={<>About us</>} />
        <Route path="/faq" element={<>FAQ</>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
