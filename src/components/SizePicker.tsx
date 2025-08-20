"use client";

import { useState } from "react";

export default function SizePicker({ sizes }: { sizes: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-8">
      {sizes.map((s) => {
        const isActive = active === s;
        return (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`rounded-lg px-3 py-3 text-body transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500] ${
              isActive ? "bg-dark-900 text-light-100" : "bg-light-100 text-dark-900 ring-1 ring-light-300 hover:ring-dark-500"
            }`}
            aria-pressed={isActive}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
