import React from 'react';
import UpcomingAnime from './UpcomingAnime';
import UpcomingManga from './UpcomingManga';
import CompletedAnime from './CompletedAnime';
import CompletedManga from './CompletedManga';
import Navbar from '../partials/Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full lg:mx-10 mt-12">
        <UpcomingAnime />
        <CompletedAnime />
        <UpcomingManga />
        <CompletedManga />
      </div>
    </>
  );
};

export default HomePage;
