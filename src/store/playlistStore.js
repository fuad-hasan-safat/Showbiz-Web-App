import { create } from "zustand";
import axios from "axios";
import { configs } from "../utils/constant";
import { useSubscriptionStore } from "./subscriptionStore";

const shuffleArray = (array = []) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

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

      // ✅ Shuffle items per playlist
      const shuffledPlaylists = data.map((playlist) => ({
        ...playlist,
        items: shuffleArray(playlist.items),
      }));

      set({ playlists: shuffledPlaylists, loading: false });
      return shuffledPlaylists;
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

      const data = res.data ?? {};

      // ✅ Shuffle items once before storing
      const shuffledTrending = {
        ...data,
        items: shuffleArray(data.items),
      };

      set({ trending: shuffledTrending, loading: false });
      return shuffledTrending;
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
