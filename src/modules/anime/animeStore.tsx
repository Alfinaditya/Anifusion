'use client';

import { create } from 'zustand';

// Get the current URL
const currentUrl = typeof window !== 'undefined' && window.location.href;

// Parse query parameters
const urlSearchParams = new URLSearchParams(currentUrl as string);

type Store = {
  search: string;
  page: number;
  setSearch: (params: string) => void;
  setPage: (params: number) => void;
};
const animeStore = create<Store>()((set) => ({
  search: urlSearchParams.get('q') ? (urlSearchParams.get('q') as string) : '',
  page: 1,
  setSearch: (params: string) => set(() => ({ search: params })),
  setPage: (params: number) => set(() => ({ page: params })),
}));

export default animeStore;
