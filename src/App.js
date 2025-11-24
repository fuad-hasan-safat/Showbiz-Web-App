import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

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
import History from './pages/History';
import Search from './pages/Search';
import SubscriptionPage from './pages/Subscription';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /start */}
        <Route path="/" element={<Navigate to="/start" replace />} />

        <Route path="/start" element={<StartPage />} />
        <Route path="/singin" element={<SingInPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/movie-stats/:contentID" element={<MovieStatsPage />} />
        <Route path="/seeall/:playlistUUID" element={<SeeAll />} />
        <Route path="/history/:userId" element={<History/>} />
        <Route path="/profile" element={<ProfileEdit />} />
         <Route path="/search" element={<Search />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
