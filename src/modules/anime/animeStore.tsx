import { create } from 'zustand';
import { orderBy, ratings, statuses, types } from './sortUtils';

// Get the current URL
const currentUrl = typeof window !== 'undefined' && window.location.href;

// Parse query parameters
const urlSearchParams = new URLSearchParams(currentUrl as string);

type Store = {
  type: string;
  status: string;
  search: string;
  rating: string;
  page: number;
  orderBy: string;
  setType: (params: string) => void;
  setRating: (params: string) => void;
  setOrderBy: (params: string) => void;
  setStatus: (params: string) => void;
  setSearch: (params: string) => void;
  setPage: (params: number) => void;
};

const animeStore = create<Store>()((set) => ({
  type: types[0].value,
  status: statuses[0].value,
  orderBy: orderBy[0].value,
  search: urlSearchParams.get('q') ? (urlSearchParams.get('q') as string) : '',
  page: urlSearchParams.get('page')
    ? parseInt(urlSearchParams.get('page') as string)
    : 1,
  rating: ratings[0].value,
  setRating: (params: string) => set(() => ({ rating: params })),
  setType: (params: string) => set(() => ({ type: params })),
  setStatus: (params: string) => set(() => ({ status: params })),
  setSearch: (params: string) => set(() => ({ search: params })),
  setPage: (params: number) => set(() => ({ page: params })),
  setOrderBy: (params: string) => set(() => ({ orderBy: params })),
}));

export default animeStore;
