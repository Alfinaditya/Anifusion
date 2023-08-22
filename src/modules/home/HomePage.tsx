import React from 'react';
import UpcomingAnime from './UpcomingAnime';
import UpcomingManga from './UpcomingManga';
import CompletedAnime from './CompletedAnime';
import CompletedManga from './CompletedManga';
// import { twMerge } from 'tailwind-merge';
import Navbar from '../partials/Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div>
        <UpcomingAnime />
        <CompletedAnime />
        <UpcomingManga />
        <CompletedManga />
      </div>
    </>
  );
};

export default HomePage;
