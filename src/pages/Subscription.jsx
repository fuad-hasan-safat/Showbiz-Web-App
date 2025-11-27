"use client";

import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

import { useOperators } from "../sdk/subscription/useOperators";
import { usePackages } from "../sdk/subscription/usePackages";
import { useSelectedPackage } from "../sdk/subscription/useSelectedPackage";

export default function SubscriptionPage() {
  const operators = useOperators(); // Robi, GP, BL

  const [selectedOperator, setSelectedOperator] = useState("robi");

  // All packages for selected operator
  const packages = usePackages(selectedOperator);

  // Handle selected package
  const {
    selectedPackageId,
    selectedPackage,
    setSelectedPackageId,
  } = useSelectedPackage(packages);

  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const currentOperator = operators.find((op) => op.id === selectedOperator);

  // --------------------------------------------------------------------------
  // SUCCESS PAGE
  // --------------------------------------------------------------------------
  if (showSuccessPage && selectedPackage) {
    return (
      <div className="container min-h-screen bg-white p-4 flex flex-col items-center">

        {/* Back */}
        <div
          className="w-full flex items-center gap-2 cursor-pointer mb-6 mt-3"
          onClick={() => setShowSuccessPage(false)}
        >
          <IoIosArrowBack className="text-[22px]" />
          <span className="font-medium">Back</span>
        </div>

        <h2 className="text-[20px] text-[#292626] font-semibold">
          Subscription Successful
        </h2>

        <div className="mt-10 mb-6">
          <img
            src="/images/congratulations.png"
            alt="Success"
            className="w-[280px] object-contain"
          />
        </div>

        <h1 className="text-[28px] font-extrabold text-gray-900">
          Congratulations!!
        </h1>

        <p className="text-center text-[16px] mt-3 text-gray-700">
          You subscribed to:
          <br />
          <b>{selectedPackage.title}</b>
          <br />
          Charge: <b>৳{selectedPackage.charge}</b>
        </p>

        {/* Summary Card */}
        <div
          style={currentOperator?.style}
          className="w-full p-5 rounded-lg border-2 text-white mt-10 shadow-lg"
        >
          <p className="text-[16px] font-semibold">{selectedPackage.title}</p>

          <p className="text-[14px] mt-1">{selectedPackage.renewable}</p>
          <p className="text-[14px]">Validity: {selectedPackage.validity} days</p>

          <p className="text-[32px] font-extrabold mt-3">
            ৳{selectedPackage.charge}
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/home")}
          style={currentOperator?.style}
          className="w-full h-[55px] rounded-lg text-white text-[18px] font-semibold mt-10"
        >
          OK
        </button>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MAIN SUBSCRIPTION PAGE
  // --------------------------------------------------------------------------
  return (
    <div className="container min-h-screen bg-white p-4 relative">
      
      {/* Back */}
      <div
        className="flex items-center gap-1 text-[16px] mb-4 mt-3 cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <IoIosArrowBack className="text-[22px]" />
        <span className="font-medium">Back</span>
      </div>

      <h2 className="text-center text-[20px] font-semibold mt-2">
        Subscription
      </h2>

      {/* Operator selection */}
      <p className="mt-10 mb-3 font-semibold text-[#0B0616]">Select Operator</p>

      <div className="grid grid-cols-3 gap-3 p-2 bg-[#F8FAFC] rounded-lg">
        {operators.map((op) => (
          <div
            key={op.id}
            onClick={() => setSelectedOperator(op.id)}
            className={`
              p-3 flex items-center gap-3 rounded-lg cursor-pointer transition
              ${
                selectedOperator === op.id
                  ? "bg-white border-2 border-current"
                  : "bg-transparent border-2 border-transparent"
              }
            `}
            style={selectedOperator === op.id ? { color: op.textColor } : {}}
          >
            {/* Checkbox */}
            <div
              style={selectedOperator === op.id ? op.style : {}}
              className={`
                w-5 h-5 rounded border flex items-center justify-center
                ${
                  selectedOperator === op.id
                    ? ""
                    : "border-gray-400 bg-white"
                }
              `}
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

      {/* Title */}
      <p className="text-center text-[18px] font-semibold text-[#FE0101] mt-10 mb-4">
        Select a plan
      </p>

      {/* Package Cards */}
      <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory px-1">
        <div className="flex gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackageId(pkg.id)}
              style={
                selectedPackageId === pkg.id ? currentOperator?.style : {}
              }
              className={`
                min-w-[260px] lg:min-w-[360px] flex-shrink-0 snap-center p-5
                rounded-[8px] transition-all duration-300
                ${
                  selectedPackageId === pkg.id
                    ? "text-white shadow-lg"
                    : "bg-white text-black border-2 border-[#FE0101]"
                }
              `}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-[14px] font-medium">{pkg.title}</p>
                <div
                  className={`
                    w-6 h-6 flex items-center justify-center text-[18px]
                    ${
                      selectedPackageId === pkg.id
                        ? "text-white"
                        : "text-transparent"
                    }
                  `}
                >
                  <FaCheck />
                </div>
              </div>

              {/* Price */}
              <p className="font-extrabold leading-none -mt-1 flex items-baseline">
                <span className="text-[28px]">৳</span>
                <span className="text-[30px] leading-none">{pkg.charge}</span>
                <span className="text-[14px] ml-1">/ {pkg.validity} days</span>
              </p>

              {/* Renewable */}
              <div className="mt-10">
                <p className="text-[15px] flex items-center gap-2">
                  <FaCheck className="text-[18px]" /> {pkg.renewable}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms */}
      <p className="text-[12px] text-gray-600 my-20">
        By tapping Continue, you agree to our{" "}
        <span className="text-blue-600">Terms</span>.
      </p>

      {/* Continue Button */}
      <button
        disabled={!selectedPackage}
        onClick={() => setShowSuccessPage(true)}
        style={!selectedPackage ? {} : currentOperator?.style}
        className={`
          w-full h-[55px] rounded-lg text-white text-[18px] font-semibold
          ${!selectedPackage && "bg-gray-400 cursor-not-allowed"}
        `}
      >
        Continue
      </button>
    </div>
  );
}
