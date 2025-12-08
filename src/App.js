import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useSubscriptionStore } from "./store/subscriptionStore";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomePage from "./pages/HomePage";
import VerificationPage from "./pages/VerificationPage";
import MovieStatsPage from "./pages/MovieStatsPage";
import NotFoundPage from "./pages/NotFoundPage";
import StartPage from "./pages/StartPage";
import SeeAll from "./pages/SeeAll";
import ProfileEdit from "./pages/Profile";
import Notification from "./pages/Notification";
import SingInPage from "./pages/SingInPage";
import History from "./pages/History";
import Search from "./pages/Search";
import SubscriptionPage from "./pages/Subscription";
import SubscriptionRedirectPage from "./pages/SubscriptionRedirectPage";
import QuizRulesPage from "./pages/QuizRules";
import QuizPage from "./pages/QuizPage";
import ScorePage from "./pages/QuizScore";
import { ToastContainer } from "react-toastify";

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ use React Router location
  const fetchSubData = useSubscriptionStore((s) => s.fetchSubData);

  useEffect(() => {
    const checkSubscription = async () => {
      const res = await fetchSubData();

      // ⭐ Do not redirect if we are on the redirect page
      if (
        location.pathname === "/subscription/redirectpage" ||
        location.pathname === "/subscription" ||
        location.pathname.startsWith("/quiz")
      ) {
        return;
      }

      if (res?.mobileNumber && res.mobileNumber !== false) {
        navigate("/home", { replace: true });
      } else {
        navigate("/singin", { replace: true });
      }
    };

    checkSubscription();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/start" replace />} />

      <Route path="/start" element={<StartPage />} />
      <Route path="/singin" element={<SingInPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/movie-stats/:contentID" element={<MovieStatsPage />} />
      <Route path="/seeall/:playlistUUID" element={<SeeAll />} />
      <Route path="/history/:userId" element={<History />} />
      <Route path="/profile" element={<ProfileEdit />} />
      <Route path="/search" element={<Search />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/quiz/quiz-rule" element={<QuizRulesPage />} />
      <Route path="/quiz/quiz-page" element={<QuizPage />} />
      <Route path="/quiz/score" element={<ScorePage />} />
      <Route
        path="/subscription/redirectpage"
        element={<SubscriptionRedirectPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
      <ToastContainer />
    </Router>
  );
}

export default App;
