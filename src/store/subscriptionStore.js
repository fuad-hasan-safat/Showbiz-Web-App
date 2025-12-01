import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { configs } from "../utils/constant";

export const useSubscriptionStore = create((set) => ({
  mobileNumber: null,
  operator: null,
  subscribeStatus: null,
  ondemand: null,
  category: null, // ⭐ NEW
  loading: false,

  fetchSubData: async () => {
    try {
      set({ loading: true });

      // 1️⃣ Get phone from login cookie or localStorage
      const authCookie = Cookies.get("authData");
      const storedPhone = authCookie
        ? JSON.parse(authCookie)?.user_phone
        : localStorage.getItem("user_phone");

      let res = null;
      if (!storedPhone) {
        console.warn("No phone found, running fallback subscription check");
        res = await axios.get(`http://showbizbd.com/api-showbiz/subCheck.php`);
      } else {
        res = await axios.get(
          `http://showbizbd.com/api-showbiz/subCheck.php?req_msisdn=${storedPhone}`
        );
      }

      let data = res.data;

      console.log("SUBSCRIPTION RESPONSE DATA:", data);

      // 3️⃣ If MSISDN not detected
      if (
        data.mobileNumber === "NO_MSISDN" ||
        data.mobileNumber === false ||
        data.mobileNumber === null
      ) {
        console.warn("NO_MSISDN detected → forcing correct phone");
        data.mobileNumber = storedPhone;
      }

      // 4️⃣ Save to Zustand (⭐ with category)
      set({
        mobileNumber: data.mobileNumber,
        operator: data.operator,
        subscribeStatus: data.subscribeStatus,
        ondemand: data.ondemand,
        category: data.category, // ⭐ store category
        loading: false,
      });

      // 5️⃣ Save cookie (include category)
      Cookies.set("subData", JSON.stringify(data), { expires: 1 });

      // 6️⃣ Save localStorage (include category)
      localStorage.setItem("subData", JSON.stringify(data));

      // 7️⃣ Update backend user
      await axios.post(`${configs.API_BASE_PATH}/auth/create-msisdn-user`, {
        phone: data.mobileNumber,
      });

      return data;
    } catch (err) {
      console.error("SUB API ERROR:", err);
      set({ loading: false });
      return null;
    }
  },

  getSubscribeStatus: () => {
    let { subscribeStatus } = useSubscriptionStore.getState();

    if (subscribeStatus === null || subscribeStatus === undefined) {
      const cookieData = Cookies.get("subData");
      if (cookieData) {
        try {
          const parsed = JSON.parse(cookieData);
          subscribeStatus = parsed.subscribeStatus ?? null;
        } catch (e) {
          console.error("Cookie parse error:", e);
        }
      }
    }

    return subscribeStatus;
  },

  // ⭐ NEW : get category
  getCategory: () => {
    let { category } = useSubscriptionStore.getState();

    if (!category) {
      const cookieData = Cookies.get("subData");
      if (cookieData) {
        try {
          const parsed = JSON.parse(cookieData);
          category = parsed.category ?? null;
        } catch (e) {
          console.error("Cookie parse error:", e);
        }
      }
    }

    return category;
  },

  clearSubscription: () => {
    Cookies.remove("subData");
    localStorage.removeItem("subData");

    set({
      mobileNumber: null,
      operator: null,
      subscribeStatus: null,
      ondemand: null,
      category: null, // ⭐ clear category
    });

    console.log("Subscription data cleared.");
  },
}));
