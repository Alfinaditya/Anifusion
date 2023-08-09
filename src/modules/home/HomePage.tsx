import React from 'react';
import UpcomingAnime from './UpcomingAnime';
import UpcomingManga from './UpcomingManga';
import CompletedAnime from './CompletedAnime';
import CompletedManga from './CompletedManga';
import { twMerge } from 'tailwind-merge';

const HomePage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {/* <h1>Upcoming Anime</h1>
      <UpcomingAnime />
      <h1>Upcoming Manga</h1>
      <UpcomingManga />
      <h1>Completed Anime</h1>
      <CompletedAnime />
      <h1>Completed Manga</h1>
      <CompletedManga />
      <h1 className={twMerge('text-main', 'font-semibold')}>AniFusion.</h1> */}
      {/* <button className={twMerge('rounded-full', variants.color.main)}>
      Save Changes
    </button> */}
    </>
  );
};

export default HomePage;
