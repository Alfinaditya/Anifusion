import HomePage from '@/modules/home/HomePage';
export const metadata = {
  openGraph: {
    title: 'Anifusion',
    description:
      'Hello, Anime lovers! Have you heard of Aninews yet? Aninews is an application that provides ratings and scores for anime and manga. It also includes synopses and information about anime and manga so that Anime lovers can easily find anime and manga that match their preferences.',
    url: 'https://anifusion.vercel.app/',
    siteName: 'Anifusion',
    images: [
      {
        url: '/brand.svg',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

export default HomePage;
export const runtime = 'edge';
