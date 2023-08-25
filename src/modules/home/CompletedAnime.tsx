import { StarIcon } from '@/icons';
import Animes from '@/types/animes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Empty from './Empty';
import { twMerge } from 'tailwind-merge';
async function getData() {
  const res = await fetch(
    `${process.env.API_URL}/anime?status=complete&limit=15`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const CompletedAnime = async () => {
  const completedAnime: Animes = await getData();

  return (
    <div className={twMerge('mt-20 mb-32', 'lg:mb-10')}>
      <h1
        className={twMerge(
          'sm:ml-2 lg:text-left',
          'font-bold text-xl text-center'
        )}
      >
        <span className="text-main">Completed</span> Anime
      </h1>
      {!completedAnime.data ? (
        <Empty text="No Completed Anime" />
      ) : (
        <div>
          <div
            className={twMerge(
              'mt-8',
              'flex flex-wrap',
              'lg:justify-start justify-evenly',
              'lg:gap-x-5',
              'gap-x-2'
            )}
          >
            {completedAnime &&
              completedAnime.data.map((anime) => (
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
                  <div className="lg:w-48 sm:w-48 md:w-56 w-36">
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
                'ml-2'
              )}
            >
              More Completed anime...
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CompletedAnime;
