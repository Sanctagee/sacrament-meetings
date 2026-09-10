import NavLinks from './NavLinks';

export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-50 bg-stone-800 text-white py-4 shadow-md">
      <div className="px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold">
            Sacrament Meeting Planner
          </h1>
          <p className="text-sm text-stone-300">{today}</p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}