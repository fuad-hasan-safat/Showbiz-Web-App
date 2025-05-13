import { create } from "zustand";



const useTrendingStore = create((set)=>({
    trendingData: [],
    setTrendingData: (data) => set({ trendingData: data }),
}));

export default useTrendingStore;