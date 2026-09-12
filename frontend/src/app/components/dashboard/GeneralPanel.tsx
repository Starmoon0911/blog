import InputField from "./InputField";
import SaveButton from "./SaveButton";
import { motion } from "motion/react";

export default function GeneralPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-xl font-medium text-white">General</h2>

        <p className="mt-1 text-sm text-zinc-300">
          Manage your general account settings.
        </p>
      </div>

      <div className="space-y-5">
        <InputField label="Username" placeholder="your_username" />

        <InputField label="Display Name" placeholder="Your name" />

        <InputField label="Email" type="email" placeholder="you@example.com" />
      </div>

      <div className="flex justify-end border-t border-white/10 pt-6">
        <SaveButton />
      </div>
    </motion.section>
  );
}
