import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

const VideoList = lazy(() => import('./pages/video/VideoList'));
const VideoAddEdit = lazy(() => import('./pages/video/VideoAddEdit'));

import "./index.css";

const App: React.FC = () => {

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/video" element={<VideoAddEdit />} />
          <Route path="/about-us" element={<>About us</>} />
          <Route path="/faq" element={<>FAQ</>} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
