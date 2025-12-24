"use client";

import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSubscriptionStore } from "../store/subscriptionStore";
import { generateEncryptedToken } from "../utils/aesTest";
import { toast } from "react-toastify";

const QuizPage = () => {
  const navigate = useNavigate();

  const msisdn = useSubscriptionStore((s) => s.mobileNumber);

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);

  const dailyLimit = question?.daily_points_limit ?? 0;
  const totalEarn = question?.total_earn_points ?? 0;

  // format points like 6/20
  const formattedPoints = `${totalEarn}/${dailyLimit}`;

  // ---------------------------------
  // Fetch question API
  // ---------------------------------
  const fetchQuestion = async () => {
    if (!msisdn) return;
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

      // 🛑 daily limit crossed?
      if (res.data?.error?.statusCode === 403) {
        navigate("/quiz/score");
        return;
      }

      const data = res.data?.success;

      if (data) {
        setQuestion(data);
      }

      setSelected(null);
    } catch (err) {
      console.error("Question fetch error:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // fetch when entering page
  useEffect(() => {
    fetchQuestion();
  }, [msisdn]);

  // ---------------------------------
  // Handle Answer
  // ---------------------------------
  const handleNext = async () => {
    if (!selected || !question) return;

    const q = question.question_info;

    try {
      setLoading(true);
      const { encrypted } = generateEncryptedToken();

      const res = await axios.get(
        `http://103.4.145.86:7878/api/showbiz/v1/daily/score-update/user-${msisdn}/question-${q.id}/ans-${selected}`,
        {
          headers: {
            Authorization: `Bearer ${encrypted}`,
          },
        }
      );

      const result = res.data?.success?.answer;

      // ----------- TOASTS ----------
      if (result === "right") {
        toast.success("🎉 Correct Answer!", {
          autoClose: 1200,
          position: "top-center",
        });
      } else {
        toast.error("❌ Wrong Answer!", {
          autoClose: 1200,
          position: "top-center",
        });
      }
      // ------------------------------

      // fetch new question
      fetchQuestion();
    } catch (err) {
      console.error("Score update error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // Build Options (only valid)
  // ---------------------------------
  const renderOptions = () => {
    const q = question?.question_info;
    if (!q) return null;

    const rawOptions = [
      { id: 1, text: q.option_1 },
      { id: 2, text: q.option_2 },
      { id: 3, text: q.option_3 },
      { id: 4, text: q.option_4 },
    ];

    // filter out empty options
    const validOptions = rawOptions.filter((o) => o.text && o.text.trim());

    return validOptions.map((opt) => {
      const isSelected = selected === opt.id;

      return (
        <button
          key={opt.id}
          onClick={() => setSelected(opt.id)}
          className={`flex items-center gap-3 w-full rounded-3xl border px-4 py-3 text-left shadow-sm transition-all
            ${
              isSelected
                ? "bg-red-600 text-white border-red-500"
                : "bg-white text-black border-gray-200"
            }
          `}
        >
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold 
              ${
                isSelected
                  ? "bg-white text-red-600"
                  : "bg-gray-200 text-gray-600"
              }
            `}
          >
            {opt.id}
          </span>

          <span className="font-medium text-base">{opt.text}</span>
        </button>
      );
    });
  };

  // ---------------------------------
  // Loading UI
  // ---------------------------------
  if (loading && !question) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-red-600">
        Loading...
      </div>
    );
  }

  const q = question?.question_info;

  return !loading && question && (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500 text-white pb-32 relative">
      {/* HEADER */}
      <div className="relative flex items-center px-4 py-4">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-1 text-white text-sm z-10"
        >
          <IoChevronBackOutline size={20} /> Back
        </button>

        <h3 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
          Quiz
        </h3>
      </div>

      {/* QUESTION CARD */}
      <div className="bg-white text-black mx-4 mt-24 p-4 rounded-3xl shadow-lg">
        {/* top */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-red-600 font-semibold text-lg">Question</span>

          {/* Points */}
          <span className="text-sm font-semibold text-gray-800">
            {formattedPoints}
          </span>
        </div>

        {/* question text */}
        <h2 className="text-center text-lg font-bold leading-snug px-4 mb-4 text-gray-800">
          {q?.question_title}
        </h2>
      </div>

      {/* OPTIONS */}
      <div className="mt-6 space-y-3 px-4 bg-white text-black py-6 rounded-3xl shadow-lg mx-4">
        {renderOptions()}
      </div>

      {/* NEXT BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-b from-red-600 to-red-500">
        <button
          disabled={!selected || loading}
          onClick={handleNext}
          className={`w-full py-3 rounded-2xl text-lg font-semibold transition-all shadow-lg
            ${
              selected
                ? "bg-white text-red-600 active:opacity-80"
                : "bg-gray-300 text-gray-500"
            }
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
