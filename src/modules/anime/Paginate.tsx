'use client';

import React from 'react';
import animeStore from './animeStore';
import { Anime } from '@/types/anime';
import { Params } from './AnimePage';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const Paginate: React.FC<{ animeList: Anime; params?: Params }> = ({
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
    const ParamsDto = z.object({
      status: z.string(),
      type: z.string(),
      rating: z.string(),
      'order-by': z.string(),
    });
    console.log(params);
    const paramsValidation = ParamsDto.safeParse(params);
    if (paramsValidation.success) {
      router.replace(
        `/anime?status=${paramsValidation.data.status}&type=${paramsValidation.data.type}&rating=${paramsValidation.data.rating}&order-by=${paramsValidation.data['order-by']}&page=${page}`
      );
    } else {
      router.push(`/anime?page=${page}`);
    }
  }

  return (
    <div>
      {page > 1 && <p onClick={() => handleChangeContent(page - 1)}>Prev</p>}
      <p>{page}</p>
      {animeList.pagination.has_next_page && (
        <p onClick={() => handleChangeContent(page + 1)}>Next</p>
      )}
    </div>
  );
};

export default Paginate;
