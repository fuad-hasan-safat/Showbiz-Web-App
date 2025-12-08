import { create } from "zustand";
import axios from "axios";
import { configs } from "../utils/constant";
import { useSubscriptionStore } from "./subscriptionStore";

export const usePlaylistStore = create((set, get) => ({
  playlists: [],
  trending: {},
  banner: null,
  loading: false,
  error: null,

  /** 📌 Fetch grouped playlists */
  fetchPlaylists: async () => {
    try {
      set({ loading: true, error: null });

      // 🔐 Get token from subscription store
      const token = useSubscriptionStore.getState().accessToken;

      const res = await axios.get(
        `${configs.API_BASE_PATH}/publish/grouped-by-playlist`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data?.data ?? [];

      set({ playlists: data, loading: false });
      return data;
    } catch (error) {
      console.error("Playlist fetch error:", error);
      set({ error, loading: false });
      return null;
    }
  },

  /** 🔥 Fetch trending playlists only */
  fetchTrending: async () => {
    try {
      set({ loading: true, error: null });

      // 🔐 Get token from subscription store
      const token = useSubscriptionStore.getState().accessToken;

      const res = await axios.get(
        `${configs.API_BASE_PATH}/publish/trending-playlists`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data ?? [];

      set({ trending: data, loading: false });
      return data;
    } catch (error) {
      console.error("Trending playlist fetch error:", error);
      set({ error, loading: false });
      return null;
    }
  },

    fetchBanner: async () => {
    try {
      const res = await axios.get(`${configs.API_BASE_PATH}/quiz-banner`);
      
      // if no active banner -> null
      set({
        banner: res.data || null,
      });

    } catch (err) {
      set({ banner: null });
    }
  },

}));
