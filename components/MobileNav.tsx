"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart2, Trophy, Settings } from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Home" },
  { id: "courses", icon: BookOpen, label: "Courses" },
  { id: "analytics", icon: BarChart2, label: "Stats" },
  { id: "achievements", icon: Trophy, label: "Awards" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function MobileNav() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-4 py-2 z-50 md:hidden"
      style={{
        background: "rgba(13, 17, 23, 0.95)",
        borderTop: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className="relative flex flex-col items-center gap-1 px-3 py-1.5"
          >
            <Icon
              size={20}
              style={{ color: isActive ? "var(--accent-cyan)" : "var(--text-muted)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: isActive ? "var(--accent-cyan)" : "var(--text-muted)" }}
            >
              {item.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="mobile-active"
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: "var(--accent-cyan)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
