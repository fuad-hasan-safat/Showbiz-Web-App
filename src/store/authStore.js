import { create } from "zustand";
import Cookies from "js-cookie";
import { useSubscriptionStore } from "./subscriptionStore";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,

  // ⭐ LOGIN FUNCTION
  login: async (data) => {
    const { access_token, user } = data;
    // Save to Zustand
    set({
      user,
      accessToken: access_token,
    });

    // Save to LocalStorage
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user_uuid", user.uuid);
    localStorage.setItem("user_phone", user.phone);

    // ⭐ Save to Cookie (valid 1 day)
    Cookies.set(
      "authData",
      JSON.stringify({
        access_token,
        user_uuid: user.uuid,
        user_phone: user.phone,
      }),
      { expires: 1 }
    );

     // ⭐ Correct way to call another Zustand store
    const fetchSubData = useSubscriptionStore.getState().fetchSubData;

    await fetchSubData(); // subscription data initializes immediately

    console.log("User logged in (Zustand + Cookie + LocalStorage):", user);
  },

  // ⭐ LOGOUT FUNCTION
  logout: () => {
    // Clear Zustand state
    set({
      user: null,
      accessToken: null,
    });

    // Clear LocalStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_uuid");
    localStorage.removeItem("user_phone");

    // Clear Cookie
    Cookies.remove("authData");

    console.log("User logged out and auth data cleared.");
  },
}));
