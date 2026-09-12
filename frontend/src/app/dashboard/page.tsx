"use client";
import { useState } from "react";
import GeneralPanel from "@/app/components/dashboard/GeneralPanel";
import Sidebar from "@/app/components/dashboard/Sidebar";
const menuItems = [
  {
    id: "general",
    label: "General",
  },
];

function ContentPanel({ active }: { active: string }) {
  switch (active) {
    case "general":
    default:
      return <GeneralPanel />;
  }
}

export default function Page() {
  const [active, setActive] = useState("general");

  return (
    <main className="min-h-screen w-full px-6 py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-start">
        <Sidebar active={active} menuItems={menuItems} onChange={setActive} />

        <section className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-2xl md:p-8">
          <ContentPanel active={active} />
        </section>
      </div>
    </main>
  );
}
