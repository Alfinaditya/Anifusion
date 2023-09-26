import Loading from '@/components/Loading';
import { StarIcon } from '@/icons';
import Mangas from '@/types/mangas';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Empty from './Empty';
import { apiUrl } from '@/lib/consts';
import cn from '@/utils/tw';

async function getData() {
  const res = await fetch(`${apiUrl}/manga?status=complete&limit=16`);
  //   console.log(res.status);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const CompletedManga = async () => {
  const completedMangaData: Mangas = await getData();
  return (
    <div className={cn('mt-20 mb-32', 'lg:mb-10')}>
      <h1
        className={cn('sm:ml-2 lg:text-left', 'font-bold text-xl text-center')}
      >
        <span className="text-main">Completed</span> Manga
      </h1>
      {!completedMangaData.data ? (
        <Empty text="No Completed Manga" />
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
            {completedMangaData &&
              completedMangaData.data.map((manga) => (
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
                  <div className="lg:w-48 sm:w-48 md:w-56 w-36">
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
              More Completed Manga...
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CompletedManga;
