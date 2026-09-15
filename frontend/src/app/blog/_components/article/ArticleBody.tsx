import type { BlogSection } from "../../_lib/types";
import ArticleCode from "./ArticleCode";

type ArticleBodyProps = {
  sections: readonly BlogSection[];
};

export default function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-28 [&+&]:mt-14"
        >
          <h2 className="font-serif text-3xl leading-tight font-medium text-white sm:text-4xl">
            {section.heading}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {section.bullets && (
            <ul className="mt-6 space-y-3 border-l border-white/15 pl-5 text-base leading-7 text-zinc-300">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
          {section.code && <ArticleCode block={section.code} />}
        </section>
      ))}
    </>
  );
}
