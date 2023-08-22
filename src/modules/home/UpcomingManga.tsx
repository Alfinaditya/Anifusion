import Loading from '@/components/Loading';
import { Manga } from '@/types/manga';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Empty from './Empty';
import { twMerge } from 'tailwind-merge';
import { StarIcon } from '@/icons';

async function getData() {
  const res = await fetch(
    `${process.env.API_URL}/manga?status=upcoming?limit=15`
  );

  if (res.status == 429) {
    throw new Error('Too Many Request');
  }
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const UpcomingManga = async () => {
  const upcomingMangaData: Manga = await getData();
  return (
    <div className={twMerge('mt-20 mb-32', 'lg:mb-10')}>
      <h1
        className={twMerge(
          'sm:ml-2 sm:text-left',
          'font-bold text-xl text-center'
        )}
      >
        <span className="text-main">Upcoming</span> Manga
      </h1>
      {!upcomingMangaData.data ? (
        <Empty text="No Upcoming Manga" />
      ) : (
        <div>
          <div
            className={twMerge(
              'mt-8',
              'grid grid-cols-2 place-items-center',
              '2xl:grid-cols-6',
              'xl:grid-cols-5',
              'lg:grid-cols-4 lg:place-items-start',
              'sm:grid-cols-3'
            )}
          >
            {upcomingMangaData &&
              upcomingMangaData.data.map((manga) => (
                <Link
                  href={`manga/${manga.mal_id}`}
                  key={manga.mal_id}
                  className={twMerge(
                    'lg:w-48',
                    'sm:w-48',
                    'md:w-56',
                    'w-36',
                    'mb-10',
                    'cursor-pointer'
                  )}
                >
                  <Image
                    width={400}
                    height={400}
                    src={manga.images.webp.image_url}
                    className={twMerge(
                      'lg:w-40 lg:h-48',
                      'md:w-56',
                      'sm:w-48 sm:h-52',
                      'w-full h-full',
                      'shadow-lg',
                      'hover:shadow-xl'
                    )}
                    alt={manga.title}
                  />
                  <div
                    className={twMerge('lg:w-48', 'sm:w-48', 'md:w-56', 'w-36')}
                  >
                    <p
                      className={twMerge(
                        'mt-6',
                        'font-bold truncate ...',
                        'w-full'
                      )}
                    >
                      {manga.title}
                    </p>
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
          <Link href="/manga">
            <p
              className={twMerge(
                'text-main font-medium text-lg underline',
                'rounded',
                'ml-2'
              )}
            >
              More Upcoming Manga...
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingManga;