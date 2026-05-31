"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Trophy,
  Settings,
  ChevronLeft,
  Zap,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "courses", icon: BookOpen, label: "Courses" },
  { id: "analytics", icon: BarChart2, label: "Analytics" },
  { id: "achievements", icon: Trophy, label: "Achievements" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <motion.nav
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-screen shrink-0 overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 overflow-hidden">
        <div
          className="flex items-center justify-center shrink-0 rounded-lg w-8 h-8"
          style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))" }}
        >
          <Zap size={16} className="text-black" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="font-bold text-lg tracking-tight whitespace-nowrap"
              style={{ color: "var(--text-primary)" }}
            >
              LearnFlow
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="relative flex items-center gap-3 w-full rounded-lg px-3 py-2.5 transition-colors"
              style={{ color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)" }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "rgba(88, 196, 220, 0.08)", border: "1px solid rgba(88, 196, 220, 0.15)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={18} className="relative shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="relative text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 overflow-hidden">
        <button
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <LogOut size={18} className="shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap font-medium"
              >
                Sign out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 flex items-center justify-center w-6 h-6 rounded-full z-10"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronLeft size={12} />
        </motion.div>
      </button>
    </motion.nav>
  );
}
