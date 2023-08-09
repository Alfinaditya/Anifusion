import { Anime } from '@/types/anime';
import Image from 'next/image';
import React from 'react';
async function getData() {
  const res = await fetch(
    `${process.env.API_URL}/anime?status=complete&limit=16`
  );

  if (res.status == 429) {
    throw new Error('Too Many Request');
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const CompletedAnime = async () => {
  const completedAnime: Anime = await getData();

  if (!completedAnime.data) {
    return <>Nothing</>;
  }
  return (
    <div style={{ display: 'flex' }}>
      {completedAnime.data.map((completedAnime) => (
        <div key={crypto.randomUUID()}>
          <Image
            src={completedAnime.images.webp.image_url}
            width={250}
            height={250}
            alt={completedAnime.title}
          />
          <div>
            <p>{completedAnime.title}</p>
            <p>{completedAnime.score ? completedAnime.score : '-'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedAnime;
