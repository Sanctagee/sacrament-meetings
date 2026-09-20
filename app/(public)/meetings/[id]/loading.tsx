export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="h-10 w-10 border-4 border-stone-300 border-t-stone-700 rounded-full animate-spin mb-4" />
      <p className="text-stone-600 text-lg">Loading meeting...</p>
    </main>
  );
}