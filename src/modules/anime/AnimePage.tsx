import Animes from '@/types/animes';
import Image from 'next/image';
import React from 'react';
import SortOptions from './SortOptions';
import Paginate from './Paginate';
import Search from './Search';
import Link from 'next/link';
import { StarIcon } from '@/icons';
import Navbar from '../partials/Navbar';

export interface Params {
  status?: string;
  type?: string;
  rating?: string;
  page?: string;
  q?: string;
  'order-by': string;
}

async function getData(params?: Params) {
  const paramsValue: Record<string, any> = {
    status: params?.status,
    type: params?.type,
    rating: params?.rating,
    q: params?.q,
    order_by: params?.['order-by'],
    page: params?.page,
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

  const res = await fetch(`${process.env.API_URL}/anime?${queryString}`);

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
  const animeList: Animes = await getData(props.searchParams);
  if (!animeList.data) {
    return <>Nothing</>;
  }
  return (
    <div>
      <div>
        <Search params={props.searchParams} />
        <SortOptions />
      </div>
      <div className="mt-8 2xl:grid-cols-6 grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:place-items-start place-items-center">
        {animeList.data.map((anime) => (
          <Link
            href={`anime/${anime.mal_id}`}
            className="lg:w-48 sm:w-48 md:w-56 w-36 mb-10"
            key={crypto.randomUUID()}
          >
            <Image
              width={200}
              height={200}
              src={anime.images.webp.image_url}
              className="lg:w-40 lg:h-48 md:w-56 sm:w-48 sm:h-52 w-36 h-40"
              alt={anime.title}
            />
            <div className="lg:w-48 sm:w-48 md:w-56 w-36">
              <p className="mt-6 font-bold w-full clear-both overflow-hidden overflow-ellipsis whitespace-nowrap">
                {anime.title}
              </p>
              <p className="mt-2 font-normal w-full clear-both overflow-hidden overflow-ellipsis whitespace-nowrap">
                {anime.year}
              </p>
              <div className="mt-2 text-main font-bold flex items-center">
                <StarIcon />
                <p className="ml-2">{anime.score}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Paginate params={props.searchParams} animeList={animeList} />
      {/* {animeList.pagination.has_next_page && (
        <p onClick={() => props.searchParams?.page+1}>Next Page</p>
      )} */}
    </div>
  );
};

export default AnimePage;
