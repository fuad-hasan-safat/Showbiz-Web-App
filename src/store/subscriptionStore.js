import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { configs } from "../utils/constant";

export const useSubscriptionStore = create((set) => ({
  mobileNumber: null,
  operator: null,
  subscribeStatus: null,
  ondemand: null,
  loading: false,

  fetchSubData: async () => {
    try {
      set({ loading: true });

      const res = await axios.get(
        "http://showbizbd.com/api-showbiz/subCheck.php"
      );

      const data = res.data;

      console.log("SUBSCRIPTION RESPONSE DATA:", data);

      // Save to Zustand
      set({
        mobileNumber: data.mobileNumber,
        operator: data.operator,
        subscribeStatus: data.subscribeStatus,
        ondemand: data.ondemand,
        loading: false,
      });

      // Save to Cookie  (for 1 day)
      Cookies.set("subData", JSON.stringify(data), { expires: 1 });

      // Save to localStorage
      localStorage.setItem("subData", JSON.stringify(data));

      const user = await axios.post(`${configs.API_BASE_PATH}/auth/create-msisdn-user`,{
        phone: data.mobileNumber,
      })

      return data;
    } catch (err) {
      console.error("SUB API ERROR:", err);
      set({ loading: false });
      return null;
    }
  },
}));
