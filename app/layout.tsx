import "./globals.css";
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