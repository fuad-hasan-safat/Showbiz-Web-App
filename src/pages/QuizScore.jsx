"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSubscriptionStore } from "../store/subscriptionStore";
import { generateEncryptedToken } from "../utils/aesTest";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

const ScorePage = () => {
  const msisdn = useSubscriptionStore((s) => s.mobileNumber);
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isLimitOver, setIsLimitOver] = useState(false);

  const fetchScore = async () => {
    if (!msisdn) return;

    try {
      const { encrypted } = generateEncryptedToken();

      const res = await axios.get(
        `http://103.4.145.86:7878/api/showbiz/v1/daily/get-question-details/user-${msisdn}`,
        {
          headers: {
            Authorization: `Bearer ${encrypted}`,
          },
        }
      );

      const success = res.data?.success;
      const error = res.data?.error;

      if (error?.statusCode === 403) {
        setIsLimitOver(true);
        setData(success);
        return;
      }

      setIsLimitOver(false);
      setData(success);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchScore();
  }, [msisdn]);

  if (!data) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-600 text-white text-xl">
        Loading...
      </div>
    );
  }

  const limit = data.daily_points_limit;
  const points = data.total_earn_points;

  return (
    <div className="min-h-screen bg-gradient-to-b bg-white text-gray-500 flex flex-col items-center justify-center px-6 text-center">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate('/home')}
        className="absolute top-4 left-4 flex items-center gap-1 text-gray-500 text-sm"
      >
        <IoChevronBackOutline size={20} /> Back
      </button>
      {/* When limit reached */}
      {isLimitOver ? (
        <>
          <h1 className="text-3xl font-bold mb-2">🎉 Congratulations!</h1>
          <p className="text-lg mb-6">Your Daily Quiz Point limit is over.</p>

          <p className="text-xl font-semibold mb-10">
            You earned <span className="text-yellow-500">{points}</span> points
            today!
          </p>
        </>
      ) : (
        <>
          {/* Not reached limit */}
          <h1 className="text-3xl font-bold mb-2">Keep Going! 🚀</h1>

          <p className="text-xl font-semibold mt-4">
            {points}/{limit} points earned
          </p>

          <p className="text-base mt-4 mb-10 text-gray-400">
            You're doing great! Keep playing and earn more points.
          </p>

          <button
            className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold text-lg shadow-lg active:opacity-80"
            onClick={() => navigate("/quiz/quiz-page")}
          >
            Play More
          </button>
        </>
      )}
    </div>
  );
};

export default ScorePage;
