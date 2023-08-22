import Navbar from '@/modules/partials/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Header from '@/modules/partials/Header';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        <div className=" mt-12 xl:max-w-screen-2xl lg:w-11/12 m-auto  flex justify-between m-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
