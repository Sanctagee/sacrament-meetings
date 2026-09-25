import CreateMeetingForm from '@/components/CreateMeetingForm';

export default function NewMeetingPage() {
  return (
    <main className="py-12 max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Create Meeting</h1>
      <CreateMeetingForm />
    </main>
  );
}