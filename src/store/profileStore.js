// src/store/profileStore.js
import { create } from "zustand";
import { configs } from "../utils/constant";

export const useProfileStore = create((set) => ({
  profile: null,
  loading: false,

fetchProfile: async (phone) => {
  try {
    set({ loading: true });

    const url = `${configs.API_BASE_PATH}/registercms/getprofile/${phone}`;
    console.log("PROFILE API URL:", url);

    const response = await fetch(url);
    console.log("PROFILE RESPONSE :", response);
    const text = await response.text();
    console.log("PROFILE RAW RESPONSE:", text);

    if (!text) {
      console.warn("EMPTY API RESPONSE");
      set({ loading: false });
      return null;
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("JSON PARSE ERROR:", e);
      console.log("Received text:", text);
      set({ loading: false });
      return null;
    }

    // normalize data
    const formatted = {
      name: data.name || "",
      originalName: data.name || "",
      phone: data.phone,
      image: data?.image
        ? `${configs.API_BASE_PATH}${data.image}`
        : "https://i.ibb.co/4pDNDk1/avatar.png",
    };

    set({ profile: formatted, loading: false });
    return formatted;
  } catch (err) {
    console.error("Profile load error:", err);
    set({ loading: false });
    return null;
  }
},


  updateProfileLocally: (updated) =>
    set((state) => ({
      profile: {
        ...state.profile,
        ...updated,
      },
    })),
}));
