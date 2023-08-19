'use client';
import Loading from '@/components/Loading';
import Characters from '@/types/characters';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Characters = ({ id }: { id: string }) => {
  const [characters, setCharacters] = useState<Characters>();
  const [displayCount, setDisplayCount] = useState(10);

  function handleLoadMore() {
    setDisplayCount(displayCount + 10);
  }
  function handleShowLess() {
    setDisplayCount(10);
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/anime/${id}/characters`)
      .then((x) => {
        if (x.ok) {
          return x.json();
        }
      })
      .then((res) => {
        setCharacters(res);
      });
  }, []);
  // if (!characters) {
  //   return <Loading text="Load Characters" />;
  // }
  return (
    <div className="my-12">
      <h1 className="font-bold text-2xl px-4">Characters</h1>
      {characters ? (
        <>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 lg:place-items-start place-items-center sm:grid-cols-3 grid-cols-2 mb-6 mt-8">
            {characters.data.slice(0, displayCount).map((characterData) => (
              <div
                className="w-36 md:w-56 lg:w-48 sm:w-48 mb-6"
                key={crypto.randomUUID()}
              >
                <Image
                  width={150}
                  height={150}
                  className="w-full h-60"
                  src={characterData.character.images.webp.image_url}
                  alt={characterData.character.name}
                />
                <div className="sm:w-48 w-36">
                  <p className="font-bold mt-3 w-full clear-both overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {characterData.character.name}
                  </p>
                  <p>{characterData.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="block w-full sm:p-0 pr-2">
            {displayCount < characters.data.length ? (
              <button
                className="cursor-pointer ml-auto block text-main hover:text-pink-600 underline"
                onClick={handleLoadMore}
              >
                Show More
              </button>
            ) : (
              <button
                className="cursor-pointer ml-auto block text-main hover:text-pink-600 underline"
                onClick={handleShowLess}
              >
                Show less
              </button>
            )}
          </div>
        </>
      ) : (
        <Loading text="Load Characters" />
      )}
    </div>
  );
};

export default Characters;
