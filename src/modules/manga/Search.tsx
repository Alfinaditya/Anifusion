'use client';
import React from 'react';
import mangaStore from './mangaStore';
import { useRouter } from 'next/navigation';
import { Params } from './MangaPage';
import { twMerge } from 'tailwind-merge';
import MagnifyingGlassIcon from '@/icons/MagnifyingGlassIcon';

const Search: React.FC<{ params?: Params }> = ({ params }) => {
  const router = useRouter();
  const { search, setSearch, setPage } = mangaStore();

  function handleSearch() {
    setPage(1);
    const paramsValue: Record<string, any> = {
      status: params?.status,
      type: params?.type,
      order_by: params?.['order-by'],
      sort: params?.sort,
      page: 1,
      q: search,
    };
    const queryString: string = Object.keys(paramsValue)
      .filter(
        (key) => paramsValue[key] !== undefined && paramsValue[key] !== null
      )
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(paramsValue[key])}`
      )
      .join('&');
    router.push(`/manga?${queryString}`);
  }
  return (
    <div
      className={twMerge(
        // 'lg:w-full',
        // 'w-[95%]',
        'm-auto mb-5',
        'flex'
      )}
    >
      <div className="w-full">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span
            className={twMerge(
              'absolute inset-y-0 left-0',
              'flex items-center',
              'pl-2'
            )}
          >
            <MagnifyingGlassIcon />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={twMerge(
              'placeholder:italic placeholder:text-slate-400',
              'block',
              'bg-white border border-slate-300 rounded-md',
              'w-full',
              'py-2 pl-9 pr-3',
              'shadow-sm',
              'focus:outline-none focus:border-main focus:ring-main focus:ring-1',
              'sm:text-sm'
            )}
            placeholder="Search for anything..."
            type="text"
          />
        </label>
      </div>
      <button
        onClick={handleSearch}
        className={twMerge(
          'rounded-full',
          'bg-main text-white',
          'px-3 py-2',
          'ml-2',
          'cursor-pointer'
        )}
      >
        Search
      </button>
    </div>
  );
};

export default Search;