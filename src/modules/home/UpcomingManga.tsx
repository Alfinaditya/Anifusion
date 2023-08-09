import { Manga } from '@/types/manga';
import Image from 'next/image';
import React from 'react';

async function getData() {
  const res = await fetch(
    `${process.env.API_URL}/manga?status=upcoming?limit=16`
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
  if (!upcomingMangaData.data) {
    return <>Empty</>;
  }
  return (
    <div style={{ display: 'flex' }}>
      {upcomingMangaData.data.map((upcomingManga) => (
        <div key={crypto.randomUUID()}>
          <Image
            src={upcomingManga.images.webp.image_url}
            width={250}
            height={250}
            alt={upcomingManga.title}
          />
          <div>
            <p>{upcomingManga.title}</p>
            <p>{upcomingManga.score ? upcomingManga.score : '-'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingManga;
