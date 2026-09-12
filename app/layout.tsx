import "./globals.css";
import type { Metadata } from 'next';
import { Merriweather, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['700', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Plan, organize, and share sacrament meeting programs – hymns, speakers, announcements, and ward business, all in one place.',
  authors: [{ name: 'Gabriel Chikwendu Nwofoke' }],
  keywords: ['sacrament meeting', 'ward planning', 'LDS', 'meeting agenda', 'hymns', 'bishopric'],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Sacrament Meeting Planner',
    description: 'Plan, organize, and share sacrament meeting programs – hymns, speakers, announcements, and ward business, all in one place.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable}`}>
      <body className="bg-stone-50 text-stone-800 font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}