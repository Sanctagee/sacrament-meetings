'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden rounded-[6px_0_6px_0] px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 transition-colors"
    >
      Print Program
    </button>
  );
}