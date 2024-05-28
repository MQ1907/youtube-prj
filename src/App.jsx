import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Youtube from './components/Interface/Youtube';
import Search from './components/Interface/Search/video';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Youtube/>} />
        <Route path="/search" element={<Search/>} />
      </Routes>
    </BrowserRouter>
  );
}
