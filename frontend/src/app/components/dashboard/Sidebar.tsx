import { motion } from "motion/react";

interface Items {
  id: string;
  label: string;
}
export default function Sidebar({
  active,
  menuItems,
  onChange,
}: {
  active: string;
  menuItems: Items[];
  onChange: (id: string) => void;
}) {
  return (
    <aside className="h-fit w-full shrink-0 rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-2xl backdrop-blur-2xl md:w-56">
      <div className="px-3 pb-4">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-200">Manage your account</p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = active === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onChange(item.id)}
              whileHover={{
                x: 4,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="relative w-full rounded-xl px-3 py-2.5 text-left text-sm text-zinc-300"
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl border border-white/10 bg-white/10"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
