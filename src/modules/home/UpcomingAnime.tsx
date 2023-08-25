import React, { Fragment } from 'react';
import Animes from '@/types/animes';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@/icons';
import Empty from './Empty';
import { twMerge } from 'tailwind-merge';

async function getData() {
  const res = await fetch(
    `${process.env.API_URL}/anime?status=upcoming&limit=15`
  );

  if (res.status === 429) {
    throw new Error('Too Many Request');
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const UpcomingAnime = async () => {
  const upcomingAnimeData: Animes = await getData();
  function handleClick() {
    'use client';
  }
  return (
    <>
      <h1
        className={twMerge(
          'sm:ml-2 lg:text-left',
          'font-bold text-xl text-center'
        )}
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
            className={twMerge(
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
                    src={anime.images.webp.image_url}
                    className={twMerge(
                      'w-full h-60',
                      'shadow-lg',
                      'hover:shadow-xl'
                    )}
                    alt={anime.title}
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
          <Link href="/anime">
            <p
              className={twMerge(
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
