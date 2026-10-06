import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import SignOutButton from '@/components/SignOutButton';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm px-4 py-2 rounded mb-4">
        <span>Admin area – signed in as {session.user?.email}</span>
        <SignOutButton />
      </div>
      {children}
    </div>
  );
}