import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto mt-16 max-w-xl rounded-lg border border-stone-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-stone-900">Meeting Not Found</h1>
      <p className="mt-3 text-stone-600">The meeting you are trying to edit does not exist.</p>
      <Link href="/meetings" className="mt-6 inline-block rounded-[8px_0_8px_0] border border-stone-300 px-4 py-2 font-semibold text-stone-700 hover:bg-stone-50">
        Back to Meetings
      </Link>
    </div>
  );
}