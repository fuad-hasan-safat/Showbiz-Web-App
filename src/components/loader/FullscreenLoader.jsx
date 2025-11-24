// src/components/FullscreenLoader.jsx
import React from "react";
import useLoadingStore from "../../store/loadingStore";

export default function FullscreenLoader({ message = "Loading..." }) {
  const isLoading = useLoadingStore((s) => s.isLoading);
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.65)" }}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        {/* using uploaded svg path per your environment transform */}
        {/* <img src="/loader.svg" alt="logo" className="w-20 h-20" /> */}
        <div className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin border-white" />
        <div className="text-white text-sm">{message}</div>
      </div>
    </div>
  );
}
