'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/meetings/current', label: 'This Week' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <ul className="hidden sm:flex gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isActive
                    ? 'text-amber-400 font-semibold underline underline-offset-4'
                    : 'text-stone-100 hover:text-amber-300 transition-colors'
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Hamburger button (mobile only) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="sm:hidden cursor-pointer flex flex-col gap-1.5 p-2"
      >
        <span className="w-6 h-0.5 bg-white" />
        <span className="w-6 h-0.5 bg-white" />
        <span className="w-6 h-0.5 bg-white" />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity sm:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-in drawer */}
      <nav
        id="mobile-nav"
        aria-hidden={!open}
        className={`fixed top-0 right-0 h-full w-64 bg-stone-800 z-50 shadow-lg transform transition-transform duration-300 sm:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-label="Close navigation menu"
            className="cursor-pointer text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        <ul className="flex flex-col gap-2 px-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className={`block py-3 text-lg ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-stone-100 hover:text-amber-300'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}