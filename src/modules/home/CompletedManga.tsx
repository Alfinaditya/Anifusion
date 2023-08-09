import { Manga } from '@/types/manga';
import Image from 'next/image';
import React from 'react';

async function getData() {
  const res = await fetch(
    `${process.env.API_URL}/manga?status=complete&limit=16`
  );

  if (res.status == 429) {
    throw new Error('Too Many Request');
  }
  //   console.log(res.status);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const CompletedManga = async () => {
  const completedMangaData: Manga = await getData();
  if (!completedMangaData.data) {
    return <>Nothing</>;
  }
  return (
    <div style={{ display: 'flex' }}>
      {completedMangaData.data.map((completedManga) => (
        <div key={crypto.randomUUID()}>
          <Image
            src={completedManga.images.webp.image_url}
            width={250}
            height={250}
            alt={completedManga.title}
          />
          <div>
            <p>{completedManga.title}</p>
            <p>{completedManga.score ? completedManga.score : '-'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedManga;
