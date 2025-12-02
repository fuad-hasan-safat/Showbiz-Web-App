import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

import { useOperators } from "../sdk/subscription/useOperators";
import { usePackages } from "../sdk/subscription/usePackages";
import { useSelectedPackage } from "../sdk/subscription/useSelectedPackage";
import { useSubscriptionStore } from "../store/subscriptionStore";
import ActiveSubscriptionCard from "../components/Subscription/ActiveSubscriptionCard";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const subscriptionStatus = useSubscriptionStore((s) => s.subscribeStatus);
  const operator = useSubscriptionStore((s) => s.operator);
  const category = useSubscriptionStore((s) => s.category);
  const operators = useOperators();
  const [selectedOperator, setSelectedOperator] = useState("robi");
  const packages = usePackages(selectedOperator);

  console.log("Packages:", packages);

  const { selectedPackageId, selectedPackage, setSelectedPackageId } =
    useSelectedPackage(packages);

  console.log("Selected Package ID:", selectedPackage);

  const currentOperator = operators.find((op) => op.id === selectedOperator);

  // 🔥 If user already subscribed, show the subscribed package card
  if (subscriptionStatus === 1 && category) {
    return (
      <>
        <Header />

        <div className="container min-h-screen bg-white p-4">
          <div
            className="flex items-center gap-1 text-[16px] mb-4 mt-3 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack className="text-[22px]" />
            <span className="font-medium">Back</span>
          </div>
          <ActiveSubscriptionCard operator={operator} category={category} />

          <button
            onClick={() => navigate("/home")}
            className="w-full h-[55px] rounded-lg mt-8 text-white text-[18px] font-semibold bg-gradient-to-r from-orange-500 to-red-500"
          >
            Go Home
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container min-h-screen bg-white p-4 relative">
        {/* Back */}
        <div
          className="flex items-center gap-1 text-[16px] mb-4 mt-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack className="text-[22px]" />
          <span className="font-medium">Back</span>
        </div>

        <h2 className="text-center text-[20px] font-semibold mt-2">
          Subscription
        </h2>

        {/* Operator selection */}
        <p className="mt-10 mb-3 font-semibold text-[#0B0616]">
          Select Operator
        </p>

        <div className="grid grid-cols-3 gap-3 p-2 bg-[#F8FAFC] rounded-lg">
          {operators.map((op) => (
            <div
              key={op.id}
              onClick={() => setSelectedOperator(op.id)}
              className={`p-3 flex items-center gap-3 rounded-lg cursor-pointer transition ${
                selectedOperator === op.id
                  ? "bg-white border-2 border-current"
                  : "bg-transparent border-2 border-transparent"
              }`}
              style={selectedOperator === op.id ? { color: op.textColor } : {}}
            >
              <div
                style={selectedOperator === op.id ? op.style : {}}
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  selectedOperator === op.id ? "" : "border-gray-400 bg-white"
                }`}
              >
                {selectedOperator === op.id && (
                  <FaCheck className="text-white text-[12px]" />
                )}
              </div>

              <img
                src={op.img}
                alt={op.name}
                className="w-[40px] h-[40px] object-contain"
              />
            </div>
          ))}
        </div>

        {/* Package Cards */}
        <p className="text-center text-[18px] font-semibold text-[#FE0101] mt-10 mb-4">
          Select a plan
        </p>

        <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory px-1">
          <div className="flex gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                style={
                  selectedPackageId === pkg.id ? currentOperator?.style : {}
                }
                className={`min-w-[260px] lg:min-w-[360px] flex-shrink-0 snap-center p-5 rounded-[8px] transition-all duration-300 ${
                  selectedPackageId === pkg.id
                    ? "text-white shadow-lg"
                    : "bg-white text-black border-2 border-[#FE0101]"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[14px] font-medium">{pkg.title}</p>
                  <div
                    className={`w-6 h-6 flex items-center justify-center text-[18px] ${
                      selectedPackageId === pkg.id
                        ? "text-white"
                        : "text-transparent"
                    }`}
                  >
                    <FaCheck />
                  </div>
                </div>

                <p className="font-extrabold leading-none -mt-1 flex items-baseline">
                  <span className="text-[28px]">৳</span>
                  <span className="text-[30px] leading-none">{pkg.charge}</span>
                  <span className="text-[14px] ml-1">
                    / {pkg.validity} days
                  </span>
                </p>

                <div className="mt-10">
                  <p className="text-[15px] flex items-center gap-2">
                    <FaCheck className="text-[18px]" /> {pkg.renewable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[12px] text-gray-600 my-20">
          By tapping Continue, you agree to our{" "}
          <span className="text-blue-600">Terms</span>.
        </p>

        <button
          disabled={!selectedPackage}
          onClick={() => {
            if (!selectedPackage) return;

            const category = selectedPackage?.service?.category;

            if (!category) {
              console.error("Category not found in selectedPackage");
              return;
            }

            // Build redirection URL
            const redirectUrl = `http://showbizbd.com/api-showbiz/web-aoc.php?category=${category}`;

            // Hard redirect
            window.open(redirectUrl, "_blank"); // ⭐ opens in new tab
          }}
          style={!selectedPackage ? {} : currentOperator?.style}
          className={`w-full h-[55px] rounded-lg text-white text-[18px] font-semibold ${
            !selectedPackage && "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
      <Footer />
    </>
  );
}
