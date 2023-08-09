import { Anime } from '@/types/anime';
import Image from 'next/image';
import React, { useState } from 'react';
import SortOptions from './SortOptions';
import { z } from 'zod';
import Paginate from './Paginate';

export interface Params {
  status: string;
  type: string;
  rating: string;
  page?: string;
}

async function getData(params?: Params) {
  const ParamsDto = z.object({
    status: z.string(),
    type: z.string(),
    rating: z.string(),
    'order-by': z.string(),
  });
  const paramsValidation = ParamsDto.safeParse(params);
  let API_URL = '';
  if (paramsValidation.success) {
    if (params?.page) {
      API_URL = `${process.env.API_URL}/anime?status=${paramsValidation.data.status}&type=${paramsValidation.data.type}&rating=${paramsValidation.data.rating}&order_by=${paramsValidation.data['order-by']}&page=${params.page}`;
    } else {
      API_URL = `${process.env.API_URL}/anime?status=${paramsValidation.data.status}&type=${paramsValidation.data.type}&rating=${paramsValidation.data.rating}&order_by=${paramsValidation.data['order-by']}`;
    }
  } else {
    if (params?.page) {
      API_URL = `${process.env.API_URL}/anime?page=${params.page}`;
    } else {
      API_URL = `${process.env.API_URL}/anime`;
    }
  }
  console.log(API_URL);
  const res = await fetch(API_URL);

  if (res.status == 429) {
    throw new Error('Too Many Request');
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
type Props = {
  params?: {
    num?: string;
  };
  searchParams?: Params;
};

const AnimePage = async (props: Props) => {
  const animeList: Anime = await getData(props.searchParams);
  if (!animeList.data) {
    return <>Nothing</>;
  }
  return (
    <>
      <SortOptions />
      <div style={{ display: 'flex', flexWrap: 'wrap' }} className="w-50">
        {animeList.data.map((anime) => (
          <div key={crypto.randomUUID()}>
            <Image
              src={anime.images.webp.image_url}
              width={250}
              height={250}
              alt={anime.title}
            />
            <div>
              <p>{anime.title}</p>
              <p>{anime.score ? anime.score : '-'}</p>
            </div>
          </div>
        ))}
      </div>
      <Paginate params={props.searchParams} animeList={animeList} />
      {/* {animeList.pagination.has_next_page && (
        <p onClick={() => props.searchParams?.page+1}>Next Page</p>
      )} */}
    </>
  );
};

export default AnimePage;
