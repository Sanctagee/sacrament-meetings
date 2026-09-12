'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden cursor-pointer whitespace-nowrap shrink-0 rounded-[6px_0_6px_0] px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base bg-amber-600 text-white hover:bg-amber-700 transition-colors"
    >
      Print Program
    </button>
  );
}