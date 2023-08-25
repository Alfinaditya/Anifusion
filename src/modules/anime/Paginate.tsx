'use client';
import React, { useEffect } from 'react';
import animeStore from './animeStore';
import Animes from '@/types/animes';
import { Params } from './AnimePage';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

const Paginate: React.FC<{ animeList: Animes; params?: Params }> = ({
  animeList,
  params,
}) => {
  const router = useRouter();
  const { page, setPage } = animeStore();

  useEffect(() => {
    // alert(window.innerHeight);
    // alert(window.innerWidth);
    setPage(params?.page ? (parseInt(params.page) as unknown as number) : 1);
  }, [params?.page]);

  if (!animeList) {
    return <></>;
  }
  function handleChangeContent(page: number) {
    setPage(page);
    const paramsValue: Record<string, any> = {
      status: params?.status,
      type: params?.type,
      rating: params?.rating,
      order_by: params?.['order-by'],
      q: params?.q,
      page,
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
    router.push(`/anime?${queryString}`, { scroll: true });
  }

  return (
    <div
      className={twMerge(
        'lg:mb-10',
        'mb-48',
        'flex',
        'justify-center',
        'w-full',
        'space-x-2'
      )}
    >
      {page > 1 && (
        <ChevronLeftIcon
          onClick={() => handleChangeContent(page - 1)}
          className="cursor-pointer"
        />
      )}
      <p className="font-bold text-main">{page}</p>
      {animeList.pagination.has_next_page && (
        <ChevronRightIcon
          onClick={() => handleChangeContent(page + 1)}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Paginate;
