"use client";
import Image from "next/image";
import { MapPin } from "lucide-react";
import About from "./components/About";
import { useRef } from "react";
export default function Home() {
  const commentRef = useRef<HTMLDivElement>(null);

  const handleCommentMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = commentRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -20;
    const rotateY = (x / rect.width - 0.5) * 20;

    card.style.transform = `
    perspective(800px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.03)
  `;
  };

  const handleCommentMouseLeave = () => {
    const card = commentRef.current;
    if (!card) return;

    card.style.transform = `
    perspective(800px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
  `;
  };
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Avatar + Thought Bubble (IG Notes style) */}
        <div className="relative mt-5" style={{ width: 160, height: 160 }}>
          {/* Avatar */}
          <Image
            src="/avatar.jpg"
            alt="Avatar"
            width={160}
            height={160}
            draggable={false}
            className="rounded-full object-cover p-1 ring-1 ring-white/10 select-none"
          />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white">
          wei0911
        </h1>
        <div className="mt-3 flex items-center gap-2 font-mono text-sm text-zinc-400">
          <MapPin size={16} />
          <span>Taiwan / Taichung</span>
        </div>
        <a
          href="https://github.com/Starmoon0911"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px] fill-current"
            aria-hidden="true"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.3 9.41 7.88 10.94.58.11.79-.25.79-.56v-2.17c-3.2.69-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.69 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>

          <span>github.com/Starmoon0911</span>
        </a>
        {/* Scroll Arrow */}
        <a
          href="#about"
          aria-label="Scroll to about"
          className="group absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer p-4 sm:p-6"
        >
          <div className="absolute bottom-7 left-1/2 h-8 w-px origin-bottom -translate-x-1/2 scale-y-0 bg-zinc-500 opacity-0 transition-all duration-500 ease-out group-hover:scale-y-100 group-hover:opacity-100" />

          <div className="relative text-zinc-400 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
            <span className="block h-3 w-3 rotate-45 border-r border-b border-current" />
          </div>
        </a>
      </section>

      {/* About */}
      <About />
    </main>
  );
}
