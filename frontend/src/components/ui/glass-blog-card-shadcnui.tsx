"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Badge } from "./badge";
import { Card } from "./card";

interface GlassBlogCardProps {
  title?: string;
  excerpt?: string;
  image?: string;
  date?: string;
  dateTime?: string;
  readTime?: string;
  tags?: readonly string[];
  href?: string;
  className?: string;
}

const defaultPost = {
  title: "The Future of UI Design",
  excerpt:
    "Exploring the latest trends in glassmorphism, 3D elements, and micro-interactions.",
  image:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  date: "2026.08.28",
  readTime: "5 分鐘閱讀",
  tags: ["Design", "UI/UX"],
  href: "/blog",
};

export function GlassBlogCard({
  title = defaultPost.title,
  excerpt = defaultPost.excerpt,
  image = defaultPost.image,
  date = defaultPost.date,
  dateTime = date,
  readTime = defaultPost.readTime,
  tags = defaultPost.tags,
  href = defaultPost.href,
  className,
}: GlassBlogCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className={cn("h-full w-full max-w-[400px]", className)}
    >
      <Link
        href={href}
        className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        aria-label={`閱讀文章：${title}`}
      >
        <Card
          data-slot="glass-blog-card"
          className="relative h-full overflow-hidden rounded-2xl border-white/15 bg-zinc-950/45 py-0 text-zinc-50 shadow-xl shadow-black/15 backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 group-hover:border-cyan-300/45 group-hover:bg-zinc-950/55 group-hover:shadow-cyan-400/10"
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1280px) 352px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-50" />

            <div className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border-white/15 bg-zinc-950/65 text-zinc-100 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/20 opacity-100 backdrop-blur-[2px] transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 motion-reduce:transition-none">
              <span
                className="flex min-h-11 items-center gap-2 rounded-full bg-cyan-300 px-6 py-2.5 text-sm font-semibold text-cyan-950 shadow-lg shadow-cyan-400/25 transition-transform group-active:scale-95 motion-reduce:transform-none motion-reduce:transition-none"
                aria-hidden="true"
              >
                <BookOpen className="size-4" aria-hidden="true" />
                閱讀文章
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-5">
            <div className="space-y-2">
              <h2 className="text-xl leading-tight font-semibold tracking-tight text-balance text-zinc-50 transition-colors group-hover:text-cyan-200">
                {title}
              </h2>
              <p className="line-clamp-2 text-sm leading-6 text-zinc-300">
                {excerpt}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex shrink-0 items-center gap-1 text-xs text-zinc-300">
                <Clock className="size-3" aria-hidden="true" />
                <span>{readTime}</span>
              </div>
              <time dateTime={dateTime} className="text-xs text-zinc-400">
                {date}
              </time>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
