import Mangas from '@/types/mangas';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Empty from './Empty';
import { StarIcon } from '@/icons';
import { apiUrl } from '@/lib/consts';
import cn from '@/utils/tw';

async function getData() {
  const res = await fetch(`${apiUrl}/manga?status=upcoming?limit=15`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const UpcomingManga = async () => {
  const upcomingMangaData: Mangas = await getData();
  return (
    <div className={cn('mt-20 mb-32', 'lg:mb-10')}>
      <h1
        className={cn('sm:ml-2 lg:text-left', 'font-bold text-xl text-center')}
      >
        <span className="text-main">Upcoming</span> Manga
      </h1>
      {!upcomingMangaData.data ? (
        <Empty text="No Upcoming Manga" />
      ) : (
        <div>
          <div
            className={cn(
              'mt-8',
              'flex flex-wrap',
              'lg:justify-start justify-evenly',
              'lg:gap-x-5',
              'gap-x-2'
            )}
          >
            {upcomingMangaData &&
              upcomingMangaData.data.map((manga) => (
                <Link
                  href={`manga/${manga.mal_id}`}
                  key={manga.mal_id}
                  className={cn(
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
                    className={cn(
                      'w-full h-60',
                      'shadow-lg',
                      'hover:shadow-xl'
                    )}
                    alt={manga.title}
                  />
                  <div className={cn('lg:w-48', 'sm:w-48', 'md:w-56', 'w-36')}>
                    <p
                      className={cn('mt-6', 'font-bold truncate ...', 'w-full')}
                    >
                      {manga.title}
                    </p>
                    <div
                      className={cn(
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
              className={cn(
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
