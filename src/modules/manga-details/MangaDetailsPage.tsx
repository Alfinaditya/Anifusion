import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronLeftIcon } from '@/icons';

import Link from 'next/link';
import Manga from '@/types/manga';
import Characters from './Characters';
import Recommendations from './Recommendations';

async function getData(id: string) {
  const res = await fetch(`${process.env.API_URL}/manga/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const MangaDetailsPage = async ({ params }: { params: { id: string } }) => {
  const manga: Manga = await getData(params.id);
  return (
    <div className={twMerge('w-[95%]', 'm-auto mt-12')}>
      <Link className={twMerge('flex items-center', 'mb-6')} href="/manga">
        <ChevronLeftIcon />
        <span className="font-semibold">Back</span>
      </Link>
      <div
        className={twMerge(
          'xl:justify-between xl:flex-row xl:items-stretch',
          'sm:w-full',
          'flex flex-wrap flex-col items-center',
          'px-4'
        )}
      >
        <div className={twMerge('mb-13', 'sm:w-80', 'w-full')}>
          <Image
            src={manga.data.images.webp.image_url}
            width={400}
            height={400}
            className={twMerge('sm:w-full w-full')}
            alt={manga.data.title}
          />
          <div className="rounded-xl">
            <div
              className={twMerge(
                'bg-main',
                'text-white text-lg font-medium text-center',
                'p-1',
                'rounded-xl',
                'mt-3'
              )}
            >
              Score
            </div>
            <p className={twMerge('text-center font-bold text-4xl', 'mt-3')}>
              {manga.data.score}
            </p>
          </div>
        </div>

        <div className="lg:w-3/5 md:w-full">
          <h1 className="font-quicksand font-medium text-3xl">
            {manga.data.title}
          </h1>
          <p className={twMerge('font-roboto font-light', 'mt-3')}>
            {manga.data.synopsis}
          </p>
          <div
            className={twMerge(
              'my-9',
              'flex flex-col',
              'md:justify-between md:flex-row'
            )}
          >
            <div>
              <p className="mb-1">
                <span className="font-bold text-main">Japanese : </span>
                {manga.data.title_japanese}
              </p>
              <p className="mb-1">
                <span className="font-bold text-main">Type : </span>
                {manga.data.type}
              </p>
              <p className="mb-1">
                <span className="font-bold text-main">Status : </span>
                {manga.data.status}
              </p>
            </div>
            <div>
              <p className="mb-1">
                <span className="font-bold text-main">Score: </span>
                {manga.data.score}
              </p>
              <p className="mb-1">
                <span className="font-bold text-main">Episodes: </span>
                {manga.data.volumes}
              </p>
            </div>
          </div>
          <div className={twMerge('flex flex-wrap', 'pb-9 ')}>
            {manga.data.genres &&
              manga.data.genres.map((genre) => (
                <div
                  key={crypto.randomUUID()}
                  className={twMerge(
                    'bg-main',
                    'p-1 px-4',
                    'mr-1 mb-2',
                    'rounded-full',
                    'text-white'
                  )}
                >
                  {genre.name}
                </div>
              ))}
          </div>
        </div>
      </div>
      <Characters id={params.id} />
      <Recommendations id={params.id} />
    </div>
  );
};

export default MangaDetailsPage;
