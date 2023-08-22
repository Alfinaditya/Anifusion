import Animes from '@/types/animes';
import Image from 'next/image';
import React from 'react';
import SortOptions from './SortOptions';
import Paginate from './Paginate';
import Search from './Search';
import Link from 'next/link';
import { StarIcon } from '@/icons';
import Navbar from '../partials/Navbar';
import { twMerge } from 'tailwind-merge';

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
    <>
      <Navbar />
      <div className="w-full bg-blue-500">
        <div>
          <Search params={props.searchParams} />
          <SortOptions />
        </div>
        <div
          className={twMerge(
            'mt-8',
            'bg-main',
            'flex flex-wrap justify-center',
            'gap-x-5'
          )}
        >
          {animeList.data.map((anime) => (
            <Link
              href={`anime/${anime.mal_id}`}
              className={twMerge(
                'lg:w-48',
                'sm:w-48',
                'md:w-56',
                'w-48',
                'mb-10',
                'bg-yellow-500'
              )}
              key={crypto.randomUUID()}
            >
              <Image
                width={200}
                height={200}
                src={anime.images.webp.image_url}
                className={twMerge(
                  'w-full h-60'
                  // 'lg:w-40 lg:h-48',
                  // 'md:w-56',
                  // 'sm:w-48 sm:h-52',
                  // 'w-36 h-40'
                )}
                alt={anime.title}
              />
              <div className={twMerge('lg:w-48', 'sm:w-48', 'md:w-56', 'w-36')}>
                <p
                  className={twMerge(
                    'mt-6',
                    'font-bold truncate ...',
                    'w-full'
                  )}
                >
                  {anime.title}
                </p>
                <p
                  className={twMerge(
                    'mt-2',
                    'font-normal truncate ...',
                    'w-full'
                  )}
                >
                  {anime.year}
                </p>
                <div
                  className={twMerge(
                    'mt-2',
                    'text-main font-bold',
                    'flex items-center'
                  )}
                >
                  <StarIcon />
                  <p className="ml-2">{anime.score ?? '-'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Paginate params={props.searchParams} animeList={animeList} />
      </div>
    </>
  );
};

export default AnimePage;
