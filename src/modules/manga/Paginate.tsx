'use client';
import React, { useEffect } from 'react';
import animeStore from './mangaStore';
import Mangas from '@/types/mangas';
import { Params } from './MangaPage';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';
import cn from '@/utils/tw';

const Paginate: React.FC<{ mangaList: Mangas; params?: Params }> = ({
  mangaList,
  params,
}) => {
  const router = useRouter();
  const { page, setPage } = animeStore();

  useEffect(() => {
    setPage(params?.page ? (parseInt(params.page) as unknown as number) : 1);
  }, [params?.page]);

  if (!mangaList) {
    return <></>;
  }
  function handleChangeContent(page: number) {
    setPage(page);
    const paramsValue: Record<string, any> = {
      status: params?.status,
      type: params?.type,
      order_by: params?.['order-by'],
      sort: params?.sort,
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
    router.push(`/manga?${queryString}`, { scroll: true });
  }

  return (
    <div
      className={cn(
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
      {mangaList.pagination.has_next_page && (
        <ChevronRightIcon
          onClick={() => handleChangeContent(page + 1)}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Paginate;
