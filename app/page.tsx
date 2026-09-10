import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <section className="relative h-[420px] sm:h-[500px] w-full">
        <Image
          src="/hero.jpg"
          alt="A quiet chapel interior before a sacrament meeting"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
            Sacrament Meeting Planner
          </h1>
          <p className="text-lg text-stone-100 max-w-xl mb-8">
            Plan, organize, and share sacrament meeting programs – hymns, speakers,
            announcements, and ward business, all in one place.
          </p>
          <div className="flex gap-4">
            <Link
              href="/meetings/current"
              className="rounded-[6px_0_6px_0] px-5 py-3 bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
            >
              View This Week
            </Link>
            <Link
              href="/meetings"
              className="rounded-[6px_0_6px_0] px-5 py-3 border border-stone-100 text-stone-100 font-semibold hover:bg-white/10 transition-colors"
            >
              Browse All Meetings
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid gap-8 sm:grid-cols-3 text-center">
        <div>
          <h3 className="font-heading font-semibold text-xl mb-2 text-stone-800">Plan Ahead</h3>
          <p className="text-stone-600 text-sm">
            Organize hymns, speakers, and ward business for every upcoming Sunday.
          </p>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-xl mb-2 text-stone-800">View Anytime</h3>
          <p className="text-stone-600 text-sm">
            Members can look up this week&apos;s program or browse past meetings.
          </p>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-xl mb-2 text-stone-800">Print &amp; Share</h3>
          <p className="text-stone-600 text-sm">
            Every meeting program can be printed cleanly for handouts or personal reference.
          </p>
        </div>
      </section>
    </main>
  );
}