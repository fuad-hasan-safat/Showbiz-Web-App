"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSubscriptionStore } from "../store/subscriptionStore";
import { generateEncryptedToken } from "../utils/aesTest";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";


const ScorePage = () => {
  const msisdn = useSubscriptionStore((s) => s.mobileNumber);
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLimitOver, setIsLimitOver] = useState(false);
  const [isCampaignActive, setIsCampaignActive] = useState(true);

  const fetchScore = useCallback(async () => {
    if (!msisdn) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { encrypted } = generateEncryptedToken();

      const res = await axios.get(
        `http://103.4.145.86:7878/api/showbiz/v1/daily/get-question-details/user-${msisdn}`,
        {
          headers: {
            Authorization: `Bearer ${encrypted}`,
          },
        }
      );

      const { success, error } = res.data || {};

      // Campaign closed check
      const campaignClosed =
        error?.errorMessage === "Campaign is closed";

      setIsCampaignActive(!campaignClosed);

      // Hard failure or no usable payload
      if (!success && !error) {
        setData(null);
        setIsLimitOver(false);
        return;
      }

      // Limit reached (403 from backend)
      if (error?.statusCode === 403 && success) {
        setData(success);
        setIsLimitOver(true);
        return;
      }

      // Normal success flow
      if (success) {
        setData(success);
        setIsLimitOver(false);
      } else {
        setData(null);
        setIsLimitOver(false);
      }
    } catch (err) {
      console.error("Score fetch failed:", err);
      setData(null);
      setIsLimitOver(false);
      setIsCampaignActive(true); // fallback to allow navigation
    } finally {
      setLoading(false);
    }
  }, [msisdn]);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  /* ---------------- Derived State ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-600 text-white text-xl">
        Loading...
      </div>
    );
  }

  const limit = data?.daily_points_limit ?? 0;
  const points = data?.total_earn_points ?? 0;

  const showLimitReached = isLimitOver && isCampaignActive;
  const showContinue = !isLimitOver && isCampaignActive;
  const showCampaignClosed = !isCampaignActive;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-white text-gray-500 flex flex-col items-center justify-center px-6 text-center">
      {/* Back Button */}
      <button
        onClick={() =>
          points === limit ? navigate("/home") : navigate(-1)
        }
        className="absolute top-4 left-4 flex items-center gap-1 text-gray-500 text-sm"
      >
        <IoChevronBackOutline size={20} />
        Back
      </button>

      {/* Limit Reached */}
      {showLimitReached && (
        <>
          <img src="/images/congratulations.png" alt="Congratulations" />
          <h1 className="text-3xl font-bold mb-2 text-red-500">
            Congratulations!
          </h1>
          <p className="text-lg mb-6">
            You have successfully completed today’s quiz points.
          </p>
          <button
            className="text-base font-semibold text-white bg-red-600 px-10 py-3 rounded-lg"
            onClick={() => navigate("/home")}
          >
            Go Home
          </button>
        </>
      )}

      {/* Continue Playing */}
      {showContinue && (
        <>
          <h1 className="text-3xl font-bold mb-2 text-red-400">
            Keep Going!
          </h1>

          <p className="text-xl font-semibold mt-4">
            {points}/{limit} points earned
          </p>

          <p className="text-base mt-4 mb-10 text-red-400">
            You're doing great. Keep playing to earn more points.
          </p>

          <button
            className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold text-lg shadow-lg active:opacity-80"
            onClick={() => navigate("/quiz/quiz-page")}
          >
            Play More
          </button>
        </>
      )}

      {/* Campaign Closed */}
      {showCampaignClosed && (
        <>
          <h1 className="text-3xl font-bold mb-2 text-red-500">
            Campaign is Closed
          </h1>
          <p className="text-lg mb-6">
            The daily quiz campaign is currently closed. Please check back
            later.
          </p>
          <button
            className="text-base font-semibold text-white bg-red-600 px-10 py-3 rounded-lg"
            onClick={() => navigate("/home")}
          >
            Go Home
          </button>
        </>
      )}
    </div>
  );
};

export default ScorePage;
