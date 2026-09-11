import type { SacramentMeeting } from '@/lib/types';
import PrintButton from './PrintButton';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const hasSacrament = meeting.meetingType === 'regular' || meeting.meetingType === 'testimony';

  return (
    <article className="rounded-[10px_0_10px_0] border border-l-4 border-l-amber-600 bg-white p-8 shadow-sm">
      <div className="flex justify-between items-start gap-3 mb-6">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-3xl font-heading font-bold text-stone-800">
            {formattedDate}
          </h2>
          <p className="text-sm sm:text-base text-amber-700 font-semibold">
            {meeting.meetingType === 'regular' && 'Regular Meeting'}
            {meeting.meetingType === 'testimony' && 'Fast & Testimony Meeting'}
            {meeting.meetingType === 'stake' && 'Stake Conference'}
            {meeting.meetingType === 'general' && 'General Conference'}
          </p>
        </div>
        <PrintButton />
      </div>

      <p className="text-stone-700 mb-1"><strong>Presiding:</strong> {meeting.presiding}</p>
      <p className="text-stone-700 mb-6"><strong>Conducting:</strong> {meeting.conducting}</p>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-6">
          <h3 className="font-heading font-semibold text-stone-800 mb-2">Announcements</h3>
          <ul className="list-disc list-inside text-stone-700 space-y-1">
            {meeting.announcements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </section>
      )}

      <section className="mb-4">
        <h3 className="font-heading font-semibold text-stone-800 mb-1">Opening Hymn</h3>
        <p className="text-stone-700">#{meeting.openingHymn.number} – {meeting.openingHymn.title}</p>
      </section>

      <p className="text-stone-700 mb-4"><strong>Opening Prayer:</strong> {meeting.openingPrayer}</p>

      {meeting.wardBusiness.length > 0 && (
        <section className="mb-4">
          <h3 className="font-heading font-semibold text-stone-800 mb-1">Ward Business</h3>
          <ul className="list-disc list-inside text-stone-700 space-y-1">
            {meeting.wardBusiness.map((item, i) => <li key={i}>{item.description}</li>)}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <p className="text-stone-700 mb-4"><strong>Stake Business:</strong> Yes</p>
      )}

      {hasSacrament && (
        <section className="mb-4">
          <h3 className="font-heading font-semibold text-stone-800 mb-1">Sacrament Hymn</h3>
          <p className="text-stone-700">#{meeting.sacramentHymn.number} – {meeting.sacramentHymn.title}</p>
        </section>
      )}

      {meeting.speakers.length > 0 && (
        <section className="mb-4">
          <h3 className="font-heading font-semibold text-stone-800 mb-2">Speakers &amp; Musical Numbers</h3>
          <ul className="text-stone-700 space-y-1">
            {meeting.speakers.map((s, i) => (
              <li key={i}>
                {s.type === 'musical-number'
                  ? <>Musical Number – {s.name}</>
                  : <>{s.name}{s.topic && ` – ${s.topic}`}</>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-4">
        <h3 className="font-heading font-semibold text-stone-800 mb-1">Closing Hymn</h3>
        <p className="text-stone-700">#{meeting.closingHymn.number} – {meeting.closingHymn.title}</p>
      </section>

      <p className="text-stone-700"><strong>Closing Prayer:</strong> {meeting.closingPrayer}</p>
    </article>
  );
}