import './globals.css';
import { Quicksand } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  openGraph: {
    title: 'Anifusion',
    description:
      'Hello, Anime lovers! Have you heard of Aninews yet? Aninews is an application that provides ratings and scores for anime and manga. It also includes synopses and information about anime and manga so that Anime lovers can easily find anime and manga that match their preferences.',
    url: 'https://anifusion.vercel.app/',
    siteName: 'Anifusion',
    images: ['./A.png'],
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <NextTopLoader
          color="#FFD4E5"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #FFD4E5,0 0 5px #FFD4E5"
        />
        <div className="flex">{children}</div>
      </body>
    </html>
  );
}
