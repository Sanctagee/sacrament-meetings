"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-[6px_0_6px_0] border border-yellow-400 bg-white px-3 py-1.5 text-sm font-semibold text-yellow-800 hover:bg-yellow-100"
    >
      Sign Out
    </button>
  );
}