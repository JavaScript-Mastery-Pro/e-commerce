"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="py-4 first:pt-0">
      <button
        className="flex w-full items-center justify-between py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-body-medium text-dark-900">{title}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pt-2">{children}</div>}
    </section>
  );
}
