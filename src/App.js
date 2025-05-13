import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomePage from './pages/HomePage';
import VerificationPage from './pages/VerificationPage';
import MovieStatsPage from './pages/MovieStatsPage';
import NotFoundPage from './pages/NotFoundPage';
import StartPage from './pages/StartPage';
import SeeAll from './pages/SeeAll';
import ProfileEdit from './pages/Profile';
import Notification from './pages/Notification';
import SingInPage from './pages/SingInPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/singin" element={<SingInPage/>} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/movie-stats" element={<MovieStatsPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/seeall" element={<SeeAll />} />
        <Route path="/profile" element={<ProfileEdit />} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;