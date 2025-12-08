"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

const QuizRulesPage = () => {
  const navigate = useNavigate();

  const rules = [
    "১. প্রশ্ন প্রতি-আাগে ১০০ করার জমা হবে",
    "২. প্রতি প্রশ্ন এর জন্য দ্ধার হবে ৫ টাকা",
    "৩. সঠিক উত্তরে দিলে ১০ পয়েন্ট",
    "৪. ভুল উত্তরে কোন মেরেস উধর দেওয়া যাবে",
    "৫. নিজের বোর্ড স্কোর দেখা যাবে",
    "৬. মাস শেষে সর্বোচ্চ পয়েন্টধারী কুইজ খেলো পুষস্কার পাবে",
    "যতোগুলা খুলি ততোবার কুইজ খেললে পুরুষ্কার জিতুন",
  ];

  const terms = [
    "১. কুইজ প্রতিযোগিতায় অংশগ্রহণের জন্য একজন গ্রাহক কে তার নিজের সক্রংবি নেচ্চাস নম্বর দিয়ে লগ ইন করতে হবে এবং বিজয়ী তালিকায় থাকার জন্য প্রগ্রোয়নিক্স বিষয়রে অর্জন করতে হবে",
    "২. একজন গ্রাহক মাসে১ তারিখ থেকে ৩০ তারিখ পর্যন্ত যতোগুলা খুলি ততোবার কুইজ খেলতে পারবেন",
    "৩. প্রতিযোগিতার নিজের বোর্ড তালিকা শোশিয়েল পোটালে দেখানো হবে",
    "৪. বিজয়ীর ঘোষণা হওয়ার তারিখ থেকে ৭ কার্যদিবসের মধ্যে বিজয়ীদের সাথে যোগাযোগ করা হবে",
    "৫. কোনো প্রকার সপ্লাইচেন্স অথবা কণ্ডিশনস পরিবর্তন বা আযার জন্য কোনো গ্রাহক দাবি নিমায়ের বশিরে কোনো দাবি করতে পারবে না, তা প্রত্যাহার করা আর বা তার অধ্গযাস পালিত হবে পারে",
    "৬. রবির স্কির্ড কোড এই কুইজ প্রতিযোগিতায় অংশ নিতে পারবেন না",
    "৭. কর্তৃপক্ষ কোনো নোটিশ ছাড়াই প্রতিযোগিতার শর্তাবলি সংশোধন বা পরিবর্তন কিংবা সম্পূর্ণ প্রতিযোগিতা বাতিল করতে পারবেন",
    "৮. কর্তৃপক্ষ কুইজ প্রতিযোগিতার বিষয়বস্তু সম্পর্কিত কৌশলী ও সংশার সম্পর্ক্যে প্রতিযোগিতার এ এর কোনোটা ঘটে কিন্তু কপিরাইট তৈরি বা অবৈধতায় কন্টে প্রকাশ করলে, সংক্রান্ত পক্ষের প্রতিযোগিতার বিষয়বস্তু বিরুদ্ধে খাজনিক আইনি ব্যবস্থা নেয়া হবে",
    "৯. বিজয়ী কোনো কার্যক্রম যদি এমন কোনো গুলিপুমনং সংখ্যা বা করো বা যে যারার কারণে নিষেধাজ্ঞা নির্নয় করা হবে, সেক্ষেত্রে কর্তৃপক্ষ প্রতিযোগিতা অসম্পাদিত বাতিলের অধিকার সংরক্ষক করেন",
    "১০. কুইজ প্রতিযোগিতার অসম্পাদিত মাধ্যমে গ্রাহককে নির্বাচিত করা সে দ্বারা কুইজ ইভেন্ট এর শর্তাবলি পরিধ ও পুরুষে সঞ্চয় দিবেন",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="sticky top-0 flex items-center px-4 py-3 border-b z-[111] backdrop-blur-md bg-white/80">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-700 hover:text-red-600 z-10"
        >
          <IoChevronBackOutline size={20} /> Back
        </button>

        <h3 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-black">
          Rules
        </h3>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-4 pb-28 text-black space-y-6 leading-relaxed">
        {/* RULES SECTION */}
        <div>
          <h2 className="text-xl font-bold text-red-600 mb-3">
            কুইজখেলার নিয়ম
          </h2>

          <ul className="space-y-2 text-[15px] text-gray-800">
            {rules.map((r, i) => (
              <li key={i} className="flex items-start gap-2 leading-6">
                <span className="mt-[2px]">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* TERMS SECTION */}
        <div>
          <h2 className="text-xl font-bold text-red-600 mb-3">শর্তাবলি</h2>

          <ul className="space-y-3 text-[15px] text-gray-800 leading-6">
            {terms.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <button
          onClick={() => navigate("/quiz/quiz-page")}
          className="w-full py-3 text-center text-white font-semibold rounded-lg bg-gradient-to-r from-red-600 to-red-500 active:opacity-90 shadow-lg"
        >
          Play Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizRulesPage;
