import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VideoList } from './pages/video/VideoList';
import { VideoAddEdit } from './pages/video/VideoAddEdit';

import "./index.css";

const App: React.FC = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/video" element={<VideoAddEdit />} />
        <Route path="/about-us" element={<>About us</>} />
        <Route path="/faq" element={<>FAQ</>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
