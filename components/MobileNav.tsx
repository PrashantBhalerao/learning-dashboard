"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart3, Trophy, Settings } from "lucide-react";

const ITEMS = [
  { id: "dashboard",    icon: LayoutDashboard, label: "Home" },
  { id: "courses",      icon: BookOpen,        label: "Courses" },
  { id: "analytics",   icon: BarChart3,       label: "Stats" },
  { id: "achievements",icon: Trophy,           label: "Awards" },
  { id: "settings",    icon: Settings,         label: "More" },
];

export function MobileNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav
      className="mobile-nav fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(11,14,24,0.97)",
        borderTop: "1px solid var(--border)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-stretch">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-pill"
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full"
                  style={{ background: "var(--accent-blue)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                size={20}
                style={{ color: isActive ? "var(--accent-blue)" : "var(--text-muted)" }}
              />
              <span
                className="text-[10px] font-semibold"
                style={{ color: isActive ? "var(--accent-blue)" : "var(--text-muted)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
