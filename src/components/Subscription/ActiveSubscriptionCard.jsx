import React, { useState } from "react";
import { OPERATORS } from "../../sdk/subscription/operators";
import { PACKAGES } from "../../sdk/subscription/packages";

export default function ActiveSubscriptionCard({ operator, category, mobileNumber }) {
  console.log("ActiveSubscriptionCard props:", { operator, category, mobileNumber });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unsubSuccess, setUnsubSuccess] = useState(false);
  const [unsubError, setUnsubError] = useState(null);

  // Find operator details
  const op = OPERATORS.find((o) => o.id === operator);

  // Find package using category
  let matchedPackage = null;
  Object.values(PACKAGES[operator] || []).forEach((pkg) => {
    if (pkg?.service?.category === category) {
      matchedPackage = pkg;
    }
  });

  // --- Early fallback ---
  if (!matchedPackage) {
    return (
      <div className="p-4 text-center mt-10">
        <p className="text-red-600 font-semibold">
          Matching package not found for category {category}
        </p>
      </div>
    );
  }

  // ------------------- API CALL -------------------
  const handleUnsubscribe = async () => {
    setLoading(true);
    setUnsubError(null);

    try {
      const res = await fetch("http://showbizbd.com/api-showbiz/unSubAPI.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         mobileNumber: mobileNumber,  // e.g. "8801851759729"
          category: category,      // e.g. 4281
        }),
      });

      const data = await res.json();

      if (data?.responseCode === "200") {
        setUnsubSuccess(true);
      } else {
        setUnsubError(data?.message || "Unsubscription failed.");
      }
    } catch (err) {
      setUnsubError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* CARD */}
      <div className="w-full bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold text-center mb-4 text-green-600">
          You Have Been Subscribed 🎉
        </h2>

        <div className="flex items-center gap-3 mb-4">
          <img src={op.img} className="w-12 h-12 object-contain" alt="" />
          <p className="text-lg font-semibold">{op.name}</p>
        </div>

        <div className="mt-4 border rounded-lg p-4" style={op.style}>
          <h3 className="text-white text-lg font-semibold">{matchedPackage.title}</h3>

          <p className="text-white text-sm mt-1">
            Validity: {matchedPackage.validity} days
          </p>

          <p className="text-white text-sm mt-1">
            Charge: ৳{matchedPackage.charge}
          </p>

          <p className="text-white text-sm mt-1">{matchedPackage.renewable}</p>
        </div>

        {/* Unsubscribe Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full h-[48px] mt-6 rounded-lg text-white text-[16px] font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-md hover:opacity-90 transition"
        >
          Unsubscribe
        </button>
      </div>

      {/* ----------------- MODAL ----------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-lg animate-fadeIn">

            {/* Header */}
            <h3 className="text-[22px] font-bold text-gray-900 text-center">
              Confirm Unsubscription
            </h3>

            <p className="text-gray-600 text-center mt-2">
              Are you sure you want to unsubscribe from <br />
              <span className="font-semibold">{matchedPackage.title}</span>?
            </p>

            {/* API State UI */}
            {loading && (
              <p className="text-center text-sm text-blue-500 mt-4">
                Processing request...
              </p>
            )}

            {unsubSuccess && (
              <p className="text-center text-green-600 font-semibold mt-4">
                Successfully unsubscribed! 🎉
              </p>
            )}

            {unsubError && (
              <p className="text-center text-red-600 font-semibold mt-4">
                {unsubError}
              </p>
            )}

            {/* Buttons */}
            {!unsubSuccess && (
              <div className="flex gap-3 mt-6">
                <button
                  disabled={loading}
                  onClick={handleUnsubscribe}
                  className="flex-1 h-[45px] rounded-lg text-white font-semibold bg-gradient-to-r from-red-500 to-red-700 shadow-md hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Unsubscribe"}
                </button>

                <button
                  disabled={loading}
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-[45px] rounded-lg font-semibold border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            )}

            {unsubSuccess && (
              <button
                onClick={() => setShowModal(false)}
                className="w-full h-[45px] mt-6 rounded-lg text-white font-semibold bg-gradient-to-r from-orange-500 to-red-500 shadow-md"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
