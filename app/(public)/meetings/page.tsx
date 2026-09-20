import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { fetchFilteredMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const meetings = await fetchFilteredMeetings(query, currentPage);
  const totalPages = await getMeetingsTotalPages(query);

  return (
    <main className="container mx-auto px-4 py-12">
      <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-8 text-center">
        All Meetings
      </h2>
      <MeetingSearch />
      {meetings.length === 0 ? (
        <p className="text-center text-stone-600">No meetings found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
      <Pagination totalPages={totalPages} />
    </main>
  );
}