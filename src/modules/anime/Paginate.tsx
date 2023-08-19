'use client';
import React from 'react';
import animeStore from './animeStore';
import Animes from '@/types/animes';
import { Params } from './AnimePage';
import { useRouter } from 'next/navigation';

const Paginate: React.FC<{ animeList: Animes; params?: Params }> = ({
  animeList,
  params,
}) => {
  const router = useRouter();
  const { page, setPage } = animeStore();
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
    router.push(`/anime?${queryString}`);
  }

  return (
    <div className="lg:mb-0 mb-28">
      {page > 1 && <p onClick={() => handleChangeContent(page - 1)}>Prev</p>}
      <p>{page}</p>
      {animeList.pagination.has_next_page && (
        <p onClick={() => handleChangeContent(page + 1)}>Next</p>
      )}
    </div>
  );
};

export default Paginate;
