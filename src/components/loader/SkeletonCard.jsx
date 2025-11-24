// src/components/SkeletonCard.jsx
import React from "react";

const shimmerStyle = {
  background:
    "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 100%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1s linear infinite",
};

export function SkeletonCard({ variant = "grid" }) {
  // variant can be 'grid' or 'slider'
  return (
    <div className={`rounded-[15px] overflow-hidden ${variant === "grid" ? "h-[250px]" : "h-[220px]" }`}>
      <div className="w-full h-full bg-[#1f1f1f] relative">
        <div style={{ ...shimmerStyle, position: "absolute", inset: 0 }} />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-4 rounded-md bg-[#111] mb-2" style={shimmerStyle} />
          <div className="h-3 rounded-md bg-[#111] w-1/2" style={shimmerStyle} />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
