import Image from 'next/image';
import Link from 'next/link';
import NavLinks from './NavLinks';

export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-50 bg-stone-800 text-white py-3 shadow-md">
      <div className="px-4 sm:px-6 flex flex-row justify-between items-center gap-3">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image
            src="/nav-logo.png"
            alt="Sacrament Meeting Planner logo"
            width={70}
            height={70}
            className="shrink-0"
          />
          <div className="hidden sm:block min-w-0">
            <h1 className="text-xl font-heading font-bold truncate">
              Sacrament Meeting Planner
            </h1>
            <p className="text-sm text-stone-300">{today}</p>
          </div>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}