import React from "react";
import { OPERATORS } from "../../sdk/subscription/operators";
import { PACKAGES } from "../../sdk/subscription/packages";


export default function ActiveSubscriptionCard({ operator, category }) {
  // Find operator details
  const op = OPERATORS.find((o) => o.id === operator);

  // Find package using category
  let matchedPackage = null;

  Object.values(PACKAGES[operator] || []).forEach((pkg) => {
    if (pkg?.service?.category === category) {
      matchedPackage = pkg;
    }
  });

  if (!matchedPackage) {
    return (
      <div className="p-4 text-center mt-10">
        <p className="text-red-600 font-semibold">
          Matching package not found for category {category}
        </p>
      </div>
    );
  }

  return (
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
    </div>
  );
}
