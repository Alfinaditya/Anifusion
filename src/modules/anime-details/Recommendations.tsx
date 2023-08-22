'use client';

import Loading from '@/components/Loading';
import Recommendations from '@/types/recommendations';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { ThumbUpIcon } from '@/icons';
import { twMerge } from 'tailwind-merge';
const Recommendations = ({ id }: { id: string }) => {
  const [recommendations, setRecommendations] = useState<Recommendations>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/anime/${id}/recommendations`)
      .then((x) => {
        if (x.ok) {
          return x.json();
        }
      })
      .then((res) => {
        setRecommendations(res);
      });
  }, []);

  return (
    <>
      <div className="mb-20">
        <h1 className={twMerge('font-bold', 'text-2xl', 'px-4', 'mb-8')}>
          Recommendations
        </h1>
        {recommendations ? (
          <>
            <Swiper
              slidesPerView={2}
              autoplay={{ delay: 1500 }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
            >
              {recommendations.data.map((recommendation) => (
                <SwiperSlide key={crypto.randomUUID()}>
                  <Link href={`/anime/${recommendation.entry.mal_id}`}>
                    <Image
                      width={400}
                      height={150}
                      className="w-full h-80"
                      src={recommendation.entry.images.webp.image_url}
                      alt={recommendation.entry.title}
                    />
                    {/* <h1 className="truncate ...">{recommendation.entry.title}</h1> */}
                    <div className="mt-2 pl-1">
                      <p className="truncate...">
                        {recommendation.entry.title}
                      </p>
                      <div
                        className={twMerge(
                          'text-main',
                          'font-bold,',
                          'flex items-center',
                          'mt-2'
                        )}
                      >
                        <ThumbUpIcon />
                        <p className="ml-2">{recommendation.votes}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <Loading text="Load Recommendations" />
        )}
      </div>
    </>
  );
};

export default Recommendations;
