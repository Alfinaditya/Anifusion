import React from 'react';
import Navbar from '../partials/Navbar';
import Mangas from '@/types/mangas';
import { twMerge } from 'tailwind-merge';
import Search from './Search';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@/icons';
import SortOptions from './SortOptions';
import Paginate from './Paginate';
// import SortOptions from '../anime/SortOptions';

export interface Params {
  status?: string;
  type?: string;
  page?: string;
  q?: string;
  sort?: string;
  'order-by'?: string;
}

async function getData(params?: Params) {
  const paramsValue: Record<string, any> = {
    status: params?.status,
    type: params?.type,
    q: params?.q,
    order_by: params?.['order-by'],
    sort: params?.sort,
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

  const res = await fetch(`${process.env.API_URL}/manga?${queryString}`);

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

const MangaPage = async (props: Props) => {
  const mangaList: Mangas = await getData(props.searchParams);
  if (!mangaList.data) {
    return <></>;
  }
  return (
    <>
      <Navbar />
      <div className="lg:w-full w-[95%] m-auto lg:mx-10 mt-12">
        <div>
          <h1
            className={twMerge(
              'text-3xl text-main font-bold text-left',
              'mb-12'
            )}
          >
            Anifusion
          </h1>
          <Search params={props.searchParams} />
          <SortOptions />
        </div>
        <div
          className={twMerge(
            'mt-8',
            'flex flex-wrap',
            'lg:justify-start justify-evenly',
            'lg:gap-x-5',
            'gap-x-2'
          )}
        >
          {mangaList.data.map((manga) => (
            <Link
              href={`manga/${manga.mal_id}`}
              className={twMerge(
                'lg:w-48',
                'sm:w-48',
                'md:w-56',
                'w-36',
                'mb-10'
              )}
              key={crypto.randomUUID()}
            >
              <Image
                width={200}
                height={200}
                src={manga.images.webp.image_url}
                className={twMerge(
                  'w-full h-60',
                  'shadow-lg',
                  'hover:shadow-xl'
                )}
                alt={manga.title}
              />
              <div className={twMerge('lg:w-48', 'sm:w-48', 'md:w-56', 'w-36')}>
                <p
                  className={twMerge(
                    'mt-6',
                    'font-bold truncate ...',
                    'w-full'
                  )}
                >
                  {manga.title}
                </p>
                {/* <p
                  className={twMerge(
                    'mt-2',
                    'font-normal truncate ...',
                    'w-full'
                  )}
                >
                  {manga.}
                </p> */}
                <div
                  className={twMerge(
                    'mt-2',
                    'text-main font-bold',
                    'flex items-center'
                  )}
                >
                  <StarIcon />
                  <p className="ml-2">{manga.score ?? '-'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Paginate params={props.searchParams} mangaList={mangaList} />
      </div>
    </>
  );
};

export default MangaPage;
