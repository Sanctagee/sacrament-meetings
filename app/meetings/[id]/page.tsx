import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getBaseUrl } from '@/lib/api';
import type { SacramentMeeting } from '@/lib/types';

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${getBaseUrl()}/api/meetings/${id}`, { cache: 'no-store' });

  if (res.status === 404 || res.status === 400) {
    notFound();
  }

  const meeting: SacramentMeeting = await res.json();

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <MeetingDetail meeting={meeting} />
    </main>
  );
}