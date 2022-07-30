import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VideoList } from './pages/video/VideoList';

import "./index.css";

const App: React.FC = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<VideoList />} />
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
