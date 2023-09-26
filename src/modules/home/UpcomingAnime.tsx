import React from 'react';
import Animes from '@/types/animes';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@/icons';
import Empty from './Empty';
import { apiUrl } from '@/lib/consts';
import cn from '@/utils/tw';

async function getData() {
  const res = await fetch(`${apiUrl}/anime?status=upcoming&limit=15`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const UpcomingAnime = async () => {
  const upcomingAnimeData: Animes = await getData();

  return (
    <>
      <h1
        className={cn('sm:ml-2 lg:text-left', 'font-bold text-xl text-center')}
      >
        <p className="mb-5">
          <span className="text-main">Upcoming</span> Anime
        </p>
      </h1>
      {!upcomingAnimeData.data ? (
        <Empty text="No Upcoming Anime" />
      ) : (
        <>
          <div
            className={cn(
              'mt-12',
              'flex flex-wrap',
              'lg:justify-start justify-evenly',
              'lg:gap-x-5',
              'gap-x-2'
            )}
          >
            {upcomingAnimeData &&
              upcomingAnimeData.data.map((anime) => (
                <Link
                  href={`anime/${anime.mal_id}`}
                  key={anime.mal_id}
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
                    src={anime.images.webp.image_url}
                    className={cn(
                      'w-full h-60',
                      'shadow-lg',
                      'hover:shadow-xl'
                    )}
                    alt={anime.title}
                  />
                  <div className={cn('lg:w-48', 'sm:w-48', 'md:w-56', 'w-36')}>
                    <p
                      className={cn('mt-6', 'font-bold truncate ...', 'w-full')}
                    >
                      {anime.title}
                    </p>
                    <p
                      className={cn(
                        'mt-2',
                        'font-normal truncate ...',
                        'w-full'
                      )}
                    >
                      {anime.year}
                    </p>
                    <div
                      className={cn(
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
          <Link href="/anime">
            <p
              className={cn(
                'text-main font-medium text-lg underline',
                'rounded',
                'lg:text-left',
                'text-center',
                'ml-2'
              )}
            >
              More Upcoming Anime...
            </p>
          </Link>
        </>
      )}
    </>
  );
};

export default UpcomingAnime;
