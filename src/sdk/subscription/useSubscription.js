import { useState } from "react";

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);

  const subscribe = async (pkg) => {
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify(pkg.service),
      });

      const json = await res.json();
      return json;
    } catch (e) {
      return { success: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading };
};
