"use client";

import { useEffect, useRef, useState } from "react";

const commands = [
  "sudo rm -rf /",
  "sudo pacman -Syu",
  "git push --force",
  'git commit -m "final final v2"',
  "echo 'TODO: fix this'",
  "rm -rf node_modules",
  "sudo killall bugs",
  "fastfetch",
  "git status",
  "sudo pacman -R my_life",
  "git diff",
  "console.log('why')",
  "console.log('AAAAAAAAAAAAAAAA')",
  "HelloWorld('print')",
];

const shuffle = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function TerminalLogo() {
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const commandRef = useRef<HTMLDivElement>(null);

  const initialQueue = shuffle(commands);

  const commandQueueRef = useRef<string[]>(initialQueue);
  const currentCommandRef = useRef<string>(initialQueue[0]);

  useEffect(() => {
    if (commandRef.current) {
      commandRef.current.scrollLeft = commandRef.current.scrollWidth;
    }
  }, [text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const command = currentCommandRef.current;

    if (!deleting) {
      if (text.length < command.length) {
        const delay = Math.floor(Math.random() * 80) + 40;

        timeout = setTimeout(() => {
          setText(command.slice(0, text.length + 1));
        }, delay);
      } else {
        timeout = setTimeout(() => {
          setDeleting(true);
        }, 1800);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 60);
      } else {
        timeout = setTimeout(() => {
          commandQueueRef.current.shift();

          if (commandQueueRef.current.length === 0) {
            commandQueueRef.current = shuffle(commands);
          }

          const nextCommand = commandQueueRef.current[0];

          currentCommandRef.current = nextCommand;
          setDeleting(false);
        }, 60);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting]);

  return (
    <div className="flex min-w-0 items-center font-mono text-sm sm:text-base">
      <div className="flex shrink-0 items-center">
        <span className="hidden text-zinc-500 sm:inline">╰─❯</span>

        <span className="ml-0 sm:ml-2">
          <span className="text-green-400">wei0911</span>
          <span className="text-zinc-400">@</span>
          <span className="text-blue-400">blog</span>
          <span className="text-zinc-400">:~$</span>
        </span>
      </div>
      <div
        ref={commandRef}
        className="ml-2 min-w-0 flex-1 overflow-hidden whitespace-nowrap"
      >
        <span className="text-zinc-100">{text}</span>

        <span className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[2px] animate-[blink_1s_steps(1)_infinite] bg-current" />
      </div>
    </div>
  );
}
