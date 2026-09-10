import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

const meetingTypeLabel: Record<SacramentMeeting['meetingType'], string> = {
  regular: 'Regular Meeting',
  testimony: 'Fast & Testimony',
  stake: 'Stake Conference',
  general: 'General Conference',
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="rounded-[10px_0_10px_0] border border-l-4 border-l-amber-600 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-amber-700 mb-1">
        {meetingTypeLabel[meeting.meetingType]}
      </p>
      <h3 className="text-xl font-heading font-semibold text-stone-800 mb-2">
        {formattedDate}
      </h3>
      <p className="text-sm text-stone-600 mb-1">Presiding: {meeting.presiding}</p>
      <p className="text-sm text-stone-600 mb-4">
        {meeting.speakers.length > 0
          ? `${meeting.speakers.length} speaker${meeting.speakers.length > 1 ? 's' : ''}`
          : 'No assigned speakers'}
      </p>
      <Link
        href={`/meetings/${meeting.id}`}
        className="inline-block rounded-[6px_0_6px_0] px-3 py-1 text-amber-700 hover:bg-amber-600 hover:text-white transition-colors"
      >
        View program
      </Link>
    </article>
  );
}