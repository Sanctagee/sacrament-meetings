export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 py-6 mt-12">
      <div className="text-center text-sm">
        <p>Sacrament Meeting Planner – built for ward and branch leaders.</p>
        <p>&copy; GabbyTech {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}