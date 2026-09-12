"use client";

import { motion } from "motion/react";
import { useState } from "react";

type InputFieldProps = {
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
};

export default function InputField({
  label,
  placeholder,
  type = "text",
  defaultValue = "",
}: InputFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      animate={{
        y: focused ? -2 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className="space-y-2"
    >
      <motion.label
        animate={{
          color: focused ? "rgb(255 255 255)" : "rgb(255 255 255)",
        }}
        transition={{ duration: 0.2 }}
        className="block text-sm"
      >
        {label}
      </motion.label>

      <motion.div
        animate={{
          scale: focused ? 1.005 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="relative"
      >
        <motion.input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="
            w-full rounded-xl
            border border-white/10
            bg-white/[0.03]
            px-4 py-3
            text-sm text-white
            outline-none
            placeholder:text-zinc-400
            transition-all duration-200

            hover:border-white/15
            hover:bg-white/[0.05]

            focus:border-white/20
            focus:bg-white/[0.06]
          "
        />

        {/* Focus glow */}
        <motion.div
          animate={{
            opacity: focused ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="
            pointer-events-none
            absolute inset-0
            rounded-xl
            ring-1 ring-white/10
            shadow-[0_0_25px_rgba(255,255,255,0.04)]
          "
        />
      </motion.div>
    </motion.div>
  );
}
