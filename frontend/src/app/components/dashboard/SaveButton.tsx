"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function SaveButton() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (saving) return;

    setSaving(true);
    setSaved(false);

    // 模擬 API request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <motion.button
      onClick={handleSave}
      disabled={saving}
      whileHover={!saving ? { y: -2, scale: 1.02 } : {}}
      whileTap={!saving ? { scale: 0.96 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      className="
        group relative
        flex min-w-32 items-center justify-center
        overflow-hidden
        rounded-xl
        border border-white/10
        bg-white/10
        px-5 py-2.5
        text-sm text-white
        transition-colors
        hover:border-white/20
        hover:bg-white/15
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {/* Shine */}
      {!saving && (
        <motion.span
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="
            absolute inset-y-0
            w-1/3
            -skew-x-12
            bg-white/10
            blur-md
          "
        />
      )}

      <AnimatePresence mode="wait">
        {saving ? (
          <motion.span
            key="saving"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="relative flex items-center gap-2"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                h-3.5 w-3.5
                rounded-full
                border-2
                border-white/30
                border-t-white
              "
            />
            Saving...
          </motion.span>
        ) : saved ? (
          <motion.span
            key="saved"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="relative"
          >
            Saved
          </motion.span>
        ) : (
          <motion.span
            key="save"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="relative"
          >
            Save Changes
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
