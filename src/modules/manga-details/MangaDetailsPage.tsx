import Image from 'next/image';
import React from 'react';
import { ChevronLeftIcon } from '@/icons';

import Link from 'next/link';
import Manga from '@/types/manga';
import Characters from './Characters';
import Recommendations from './Recommendations';
import { apiUrl } from '@/lib/consts';
import cn from '@/utils/tw';

async function getData(id: string) {
  const res = await fetch(`${apiUrl}/manga/${id}`);

  if (!res.ok) {
    throw new Error('Failed sto fetch data');
  }
  return res.json();
}

const MangaDetailsPage = async ({ params }: { params: { id: string } }) => {
  const manga: Manga = await getData(params.id);
  return (
    <div className={cn('w-[95%]', 'm-auto mt-12')}>
      <Link className={cn('flex items-center', 'mb-6')} href="/manga">
        <ChevronLeftIcon />
        <span className="font-semibold">Back</span>
      </Link>
      <div
        className={cn(
          'xl:justify-between xl:flex-row xl:items-stretch',
          'sm:w-full',
          'flex flex-wrap flex-col items-center',
          'px-4'
        )}
      >
        <div className={cn('mb-13', 'sm:w-80', 'w-full')}>
          <Image
            src={manga.data.images.webp.image_url}
            width={400}
            height={400}
            className={cn('sm:w-full w-full')}
            alt={manga.data.title}
          />
          <div className="rounded-xl">
            <div
              className={cn(
                'bg-main',
                'text-white text-lg font-medium text-center',
                'p-1',
                'rounded-xl',
                'mt-3'
              )}
            >
              Score
            </div>
            <p className={cn('text-center font-bold text-4xl', 'mt-3')}>
              {manga.data.score}
            </p>
          </div>
        </div>

        <div className="lg:w-3/5 md:w-full">
          <h1 className="font-quicksand font-medium text-3xl">
            {manga.data.title}
          </h1>
          <p className={cn('font-roboto font-light', 'mt-3')}>
            {manga.data.synopsis}
          </p>
          <div
            className={cn(
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
          <div className={cn('flex flex-wrap', 'pb-9 ')}>
            {manga.data.genres &&
              manga.data.genres.map((genre) => (
                <div
                  key={crypto.randomUUID()}
                  className={cn(
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
