import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from '@/components/EditMeetingForm';

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) notFound();

  const meeting = await getMeetingById(numericId);
  if (!meeting) notFound();

  return (
    <main className="py-12 max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Meeting</h1>
      <EditMeetingForm meeting={meeting} id={numericId} />
    </main>
  );
}