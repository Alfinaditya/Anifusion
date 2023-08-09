import React, { Fragment } from 'react';
import { Anime } from '@/types/anime';
import Image from 'next/image';

async function getData() {
  const res = await fetch(
    `${process.env.API_URL}/anime?status=upcoming&limit=16`
  );

  if (res.status == 429) {
    throw new Error('Too Many Request');
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const UpcomingAnime = async () => {
  const upcomingAnimeData: Anime = await getData();

  if (!upcomingAnimeData.data) {
    return <>Nothing</>;
  }
  return (
    <div style={{ display: 'flex' }}>
      {upcomingAnimeData.data.map((upcomingAnime) => (
        <div key={crypto.randomUUID()}>
          <Image
            src={upcomingAnime.images.webp.image_url}
            width={250}
            height={250}
            alt={upcomingAnime.title}
          />
          <div>
            <p>{upcomingAnime.title}</p>
            <p>{upcomingAnime.score ? upcomingAnime.score : '-'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingAnime;
