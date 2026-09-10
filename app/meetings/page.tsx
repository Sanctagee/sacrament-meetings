import MeetingCard from '@/components/MeetingCard';
import { getBaseUrl } from '@/lib/api';
import type { SacramentMeeting } from '@/lib/types';

export default async function MeetingsPage() {
  const res = await fetch(`${getBaseUrl()}/api/meetings`, { cache: 'no-store' });
  const meetings: SacramentMeeting[] = await res.json();

  return (
    <main className="container mx-auto px-4 py-12">
      <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-8 text-center">
        All Meetings
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </main>
  );
}