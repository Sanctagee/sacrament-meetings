'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('An uncaught error occurred:', error);
  }, [error]);

  return (
    <div className="mx-auto mt-16 max-w-xl rounded-lg border border-stone-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-stone-900">Something went wrong!</h1>
      <p className="mt-3 text-stone-600">An unexpected error occurred. Please try again later.</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button onClick={reset} className="rounded-[8px_0_8px_0] bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-700">
          Try Again
        </button>
        <Link href="/meetings" className="rounded-[8px_0_8px_0] border border-stone-300 px-4 py-2 font-semibold text-stone-700 hover:bg-stone-50">
          Go Back to Meetings
        </Link>
      </div>
    </div>
  );
}