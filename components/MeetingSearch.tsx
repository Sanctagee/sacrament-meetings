'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex justify-center mb-8">
      <input
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        aria-label="Search meetings"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2.5 border border-stone-300 rounded-[10px_0_10px_0] shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600"
      />
    </div>
  );
}