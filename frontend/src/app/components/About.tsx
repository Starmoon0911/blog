"use client";

import {
  Code2,
  Cpu,
  Globe,
  Monitor,
  Network,
  Server,
  Terminal,
} from "lucide-react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

const skills = [
  { name: "JavaScript / TypeScript", icon: Code2 },
  { name: "C++", icon: Cpu },
  { name: "Python", icon: Terminal },
  { name: "React", icon: Monitor },
];
const interests = [
  { name: "Web Development", icon: Globe },
  { name: "Machine Learning", icon: Cpu },
  { name: "Linux", icon: Terminal },
  { name: "Robotics", icon: Network },
  { name: "Performance", icon: Server },
];
const posts = [{ title: "(待更新..)", href: "#" }];
const experiences = [
  {
    date: "2026/9/4 — 2027/3/12",
    title: "SITCON 2027開發組組員",
    description: "有幸成為SITCON 2027開發組組員，已經能想像之後有多忙了ww",
  },
  {
    date: "2026/7/12 — 2026/7/18",
    title: "NTU CSIE Summer Camp",
    description:
      "參加由國立臺灣大學資訊工程學系舉辦的 CSIE Camp，接觸不同資訊領域，與來自各地的同學交流，累積了十分精彩的營隊與學習經驗。",
  },
  {
    date: "2026/2/2 — 2026/2/5",
    title: "NCKU FunAI Winter Camp",
    description:
      "參加 2026 FunAI Winter Camp，並在 Proly PK 競賽中獲得第一名。透過實際訓練與調整模型，深入了解 Reinforcement Learning，也累積了完整的 AI 專案經驗。",
  },
];
const sectionTitles = [
  "關於我",
  "Education",
  "Experience",
  "Stack",
  "Interests",
  "Posts",
] as const;

function SectionHeader({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-white/15 pb-4">
      <div className="mb-3 font-mono text-[10px] tracking-[0.18em] text-zinc-500">
        {String(index + 1).padStart(2, "0")} / 06
      </div>
      <h2 className="font-serif text-xl font-medium text-zinc-100 italic">
        {children}
      </h2>
    </div>
  );
}

function transitionRange(index: number) {
  const step = 1 / sectionTitles.length;
  const overlap = 0.04;

  return {
    entryStart: index === 0 ? 0 : index * step - overlap,
    entryEnd: index === 0 ? 0.01 : index * step + overlap,
    exitStart: (index + 1) * step - overlap,
    exitEnd: (index + 1) * step + overlap,
  };
}

function AboutContent() {
  return (
    <div className="pt-12 md:pt-16">
      <h3 className="max-w-4xl text-5xl leading-[0.95] tracking-[-0.04em] text-white md:text-7xl lg:text-8xl">
        <span className="font-sans font-medium">I build things</span>
        <br />
        <span className="font-serif font-normal text-zinc-300 italic">
          I wanna sleep...
        </span>
      </h3>
      <div className="mt-12 max-w-2xl space-y-5">
        <p className="text-sm leading-7 text-zinc-200 md:text-base">
          我是陳威皓，一個怎麼睡都睡不飽的高中牲。
          我喜歡研究各種技術，或許有ADHD，讓我時不時就想嘗試新的東西，
          因此涉獵的領域比較廣。
        </p>
        <p className="text-sm leading-7 text-zinc-300 md:text-base">
          目前主要在探索 Web Development、機器學習算法、Discord
          機器人開發與伺服器架設，也對 Linux、Robotics 和效能優化等領域感興趣。
        </p>
      </div>
    </div>
  );
}
function EducationContent() {
  return (
    <div className="grid gap-3 py-8 md:grid-cols-[160px_1fr] md:gap-8">
      <span className="font-mono text-xs text-zinc-300">2026 — Present</span>
      <div>
        <h3 className="font-serif text-lg font-medium text-zinc-100 md:text-xl">
          Taichung Municipal Hui-Wen Senior High School
        </h3>
        <p className="mt-2 text-sm text-zinc-300">High School Student</p>
      </div>
    </div>
  );
}
function ExperienceItem({
  experience,
  index,
  progress,
}: {
  experience: (typeof experiences)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const { entryStart, entryEnd } = transitionRange(2);
  const start = entryStart + 0.015 + index * 0.035;
  const end = Math.min(entryEnd - 0.005 + index * 0.015, start + 0.045);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [14, 0]);
  const dotScale = useTransform(progress, [start, end], [0.82, 1]);
  const lineScaleY = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div
      className="grid grid-cols-[24px_1fr] gap-6 md:grid-cols-[24px_160px_1fr] md:gap-8"
      style={{ opacity, y }}
    >
      <div className="relative flex justify-center">
        {index !== experiences.length - 1 && (
          <motion.span
            className="absolute top-3 h-full w-px origin-top bg-white/15"
            style={{ scaleY: lineScaleY }}
          />
        )}
        <motion.span
          className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-zinc-400 bg-zinc-100 transition-colors duration-300 hover:border-cyan-400"
          style={{ scale: dotScale }}
        />
      </div>
      <time className="hidden pt-0.5 font-mono text-xs text-zinc-300 md:block">
        {experience.date}
      </time>
      <div className={index !== experiences.length - 1 ? "pb-12" : "pb-2"}>
        <h3 className="font-serif text-lg font-medium text-zinc-100 md:text-xl">
          {experience.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300 md:text-[15px]">
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
}

function ExperienceContent({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="mt-10">
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={experience.title}
          experience={experience}
          index={index}
          progress={progress}
        />
      ))}
    </div>
  );
}

function StackCard({
  skill,
  index,
  progress,
}: {
  skill: (typeof skills)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const { entryStart, entryEnd } = transitionRange(3);
  const start = entryStart + 0.01 + index * 0.018;
  const end = Math.min(entryEnd - 0.002, start + 0.03);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const scale = useTransform(progress, [start, end], [0.98, 1]);
  const Icon = skill.icon;

  return (
    <motion.div
      className="group flex aspect-square flex-col items-center justify-center border border-white/10 bg-white/[0.015] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
      style={{ opacity, y, scale }}
    >
      <Icon
        size={28}
        strokeWidth={1.5}
        className="text-zinc-400 transition-all duration-300 group-hover:scale-110 group-hover:text-white"
      />
      <span className="mt-4 text-sm text-zinc-300 transition-colors duration-300 group-hover:text-white">
        {skill.name}
      </span>
    </motion.div>
  );
}

function StackContent({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {skills.map((skill, index) => (
        <StackCard
          key={skill.name}
          skill={skill}
          index={index}
          progress={progress}
        />
      ))}
    </div>
  );
}
function InterestsContent() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {interests.map((interest) => {
        const Icon = interest.icon;
        return (
          <div
            key={interest.name}
            className="group flex items-center gap-4 border-b border-white/10 py-5"
          >
            <Icon
              size={18}
              strokeWidth={1.5}
              className="text-zinc-300 transition-colors duration-300 group-hover:text-zinc-100"
            />
            <span className="font-serif text-lg text-zinc-300 transition-colors duration-300 group-hover:text-white">
              {interest.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
function PostsContent() {
  return (
    <div>
      {posts.map((post) => (
        <a
          key={post.title}
          href={post.href}
          className="group flex items-center justify-between border-b border-white/10 py-6"
        >
          <span className="text-sm text-zinc-300 transition-colors duration-300 group-hover:text-white">
            {post.title}
          </span>
          <span className="text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
            →
          </span>
        </a>
      ))}
    </div>
  );
}
function StoryLayer({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const { entryStart, entryEnd, exitStart, exitEnd } = transitionRange(index);
  const isLast = index === sectionTitles.length - 1;

  const opacity = useTransform(
    progress,
    isLast
      ? [entryStart, entryEnd, 1]
      : [entryStart, entryEnd, exitStart, exitEnd],
    isLast ? [0, 1, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    isLast
      ? [entryStart, entryEnd, 1]
      : [entryStart, entryEnd, exitStart, exitEnd],
    isLast ? [24, 0, 0] : [24, 0, 0, -24],
  );

  const pointerEvents = useTransform(opacity, (value) =>
    value > 0.5 ? "auto" : "none",
  );

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={{
        opacity,
        y,
        pointerEvents,
      }}
    >
      {children}
    </motion.div>
  );
}

function HeaderLayer({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const { entryStart, entryEnd, exitStart, exitEnd } = transitionRange(index);
  const isLast = index === sectionTitles.length - 1;
  const input = isLast
    ? [entryStart, entryEnd, 1]
    : [entryStart, entryEnd, exitStart, exitEnd];
  const opacity = useTransform(
    progress,
    input,
    isLast ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(progress, input, isLast ? [8, 0, 0] : [8, 0, 0, -8]);
  const filter = useTransform(
    progress,
    input,
    isLast
      ? ["blur(2px)", "blur(0px)", "blur(0px)"]
      : ["blur(2px)", "blur(0px)", "blur(0px)", "blur(2px)"],
  );

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={{ opacity, y, filter }}
    >
      {children}
    </motion.div>
  );
}

function BackgroundTitleLayer({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const { entryStart, entryEnd, exitStart, exitEnd } = transitionRange(index);
  const isLast = index === sectionTitles.length - 1;
  const input = isLast
    ? [entryStart, entryEnd, 1]
    : [entryStart, entryEnd, exitStart, exitEnd];
  const opacity = useTransform(
    progress,
    input,
    isLast ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    input,
    isLast ? [18, 0, 0] : [18, 0, 0, -18],
  );

  return (
    <motion.span
      className="absolute top-1/2 left-[-0.07em] font-sans text-[22vw] leading-none font-medium tracking-[-0.08em] whitespace-nowrap text-white/[0.035] md:text-[12rem]"
      style={{ opacity, y }}
    >
      {children}
    </motion.span>
  );
}

function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="pointer-events-none absolute top-1/2 right-0 h-[42svh] w-px -translate-y-1/2 bg-white/10"
      aria-hidden="true"
    >
      <motion.span
        className="absolute inset-x-0 top-0 bg-zinc-200/70"
        style={{ height }}
      >
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-zinc-100" />
      </motion.span>
    </div>
  );
}

function StaticExperienceContent() {
  return (
    <div className="mt-10">
      {experiences.map((experience, index) => (
        <div
          key={experience.title}
          className="grid grid-cols-[24px_1fr] gap-6 md:grid-cols-[24px_160px_1fr] md:gap-8"
        >
          <div className="relative flex justify-center">
            {index !== experiences.length - 1 && (
              <span className="absolute top-3 h-full w-px bg-white/15" />
            )}
            <span className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-zinc-400 bg-zinc-100" />
          </div>
          <time className="hidden pt-0.5 font-mono text-xs text-zinc-300 md:block">
            {experience.date}
          </time>
          <div className={index !== experiences.length - 1 ? "pb-12" : "pb-2"}>
            <h3 className="font-serif text-lg font-medium text-zinc-100 md:text-xl">
              {experience.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300 md:text-[15px]">
              {experience.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StaticStackContent() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {skills.map((skill) => {
        const Icon = skill.icon;

        return (
          <div
            key={skill.name}
            className="flex aspect-square flex-col items-center justify-center border border-white/10 bg-white/[0.015]"
          >
            <Icon size={28} strokeWidth={1.5} className="text-zinc-400" />
            <span className="mt-4 text-sm text-zinc-300">{skill.name}</span>
          </div>
        );
      })}
    </div>
  );
}

function StaticAbout() {
  const staticSections = [
    <AboutContent key="about" />,
    <EducationContent key="education" />,
    <StaticExperienceContent key="experience" />,
    <StaticStackContent key="stack" />,
    <InterestsContent key="interests" />,
    <PostsContent key="posts" />,
  ];

  return (
    <section id="about" className="relative">
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        {staticSections.map((content, index) => (
          <div
            key={sectionTitles[index]}
            className={index === 0 ? "" : "mt-24 md:mt-32"}
          >
            <SectionHeader index={index}>{sectionTitles[index]}</SectionHeader>
            {content}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  if (reducedMotion) {
    return <StaticAbout />;
  }

  const sectionContent = [
    <AboutContent key="about" />,
    <EducationContent key="education" />,
    <ExperienceContent key="experience" progress={scrollYProgress} />,
    <StackContent key="stack" progress={scrollYProgress} />,
    <InterestsContent key="interests" />,
    <PostsContent key="posts" />,
  ];

  return (
    <section ref={containerRef} id="about" className="relative h-[650svh]">
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 md:py-20">
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              {sectionTitles.map((title, index) => (
                <BackgroundTitleLayer
                  key={title}
                  index={index}
                  progress={scrollYProgress}
                >
                  {title}
                </BackgroundTitleLayer>
              ))}
            </div>
            <ScrollProgress progress={scrollYProgress} />
            <div className="relative h-[74px]" aria-hidden="true">
              {sectionTitles.map((title, index) => (
                <HeaderLayer
                  key={title}
                  index={index}
                  progress={scrollYProgress}
                >
                  <SectionHeader index={index}>{title}</SectionHeader>
                </HeaderLayer>
              ))}
            </div>
            <div className="relative mt-8 min-h-[360px] md:mt-10 md:min-h-[420px]">
              {sectionContent.map((content, index) => (
                <StoryLayer
                  key={sectionTitles[index]}
                  index={index}
                  progress={scrollYProgress}
                >
                  <section aria-labelledby={`about-section-${index}`}>
                    <h2 id={`about-section-${index}`} className="sr-only">
                      {sectionTitles[index]}
                    </h2>
                    {content}
                  </section>
                </StoryLayer>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
