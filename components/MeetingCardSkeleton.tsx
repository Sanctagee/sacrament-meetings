export default function MeetingCardSkeleton() {
  return (
    <div className="rounded-[10px_0_10px_0] border border-l-4 border-l-stone-200 bg-white p-6 shadow-sm animate-pulse">
      <div className="h-3 w-24 bg-stone-200 rounded mb-2" />
      <div className="h-5 w-40 bg-stone-200 rounded mb-3" />
      <div className="h-3 w-32 bg-stone-200 rounded mb-2" />
      <div className="h-3 w-28 bg-stone-200 rounded mb-4" />
      <div className="h-3 w-20 bg-stone-200 rounded" />
    </div>
  );
}