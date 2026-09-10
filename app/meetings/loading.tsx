import MeetingCardSkeleton from '@/components/MeetingCardSkeleton';

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="h-8 w-48 bg-stone-200 rounded mb-8 animate-pulse" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <MeetingCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}