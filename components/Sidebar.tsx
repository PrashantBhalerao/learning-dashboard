"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, BarChart3, Trophy, Settings,
  ChevronLeft, Zap, LogOut, Bell, Search,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
  { id: "courses",   icon: BookOpen,        label: "My Courses", badge: "4" },
  { id: "analytics", icon: BarChart3,       label: "Analytics",  badge: null },
  { id: "achievements", icon: Trophy,       label: "Achievements", badge: "2" },
  { id: "settings",  icon: Settings,        label: "Settings",   badge: null },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  return (
    <motion.aside
      className="desktop-sidebar relative flex flex-col h-screen shrink-0 overflow-hidden"
      animate={{ width: collapsed ? 68 : 256 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      style={{
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border)",
        zIndex: 40,
      }}
    >
      {/* ── Logo ── */}
      <div
        className="flex items-center gap-3 px-4 overflow-hidden shrink-0"
        style={{ height: "var(--header-h)", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center justify-center shrink-0 rounded-xl"
          style={{
            width: 36, height: 36,
            background: "linear-gradient(135deg, #4f9eff 0%, #8b5cf6 100%)",
            boxShadow: "0 0 16px rgba(79,158,255,0.35)",
          }}
        >
          <Zap size={18} color="#fff" strokeWidth={2.5} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="sidebar-logo-text overflow-hidden"
            >
              <p className="font-bold text-base leading-none" style={{ color: "var(--text-primary)" }}>
                LearnFlow
              </p>
              <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-muted)" }}>
                v2.1.0
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Search (desktop only) ── */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-3 pt-4 pb-2 overflow-hidden"
          >
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
              }}
            >
              <Search size={14} style={{ color: "var(--text-muted)" }} />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>Search...</span>
              <span
                className="ml-auto text-xs font-mono px-1.5 py-0.5 rounded"
                style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}
              >
                ⌘K
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav items ── */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
        <AnimatePresence>
          {!collapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sidebar-label text-xs font-semibold uppercase tracking-widest px-2 mb-2"
              style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
            >
              Menu
            </motion.p>
          )}
        </AnimatePresence>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="sidebar-item"
              style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-pill"
                  className="absolute inset-0 rounded-[10px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(79,158,255,0.12), rgba(139,92,246,0.08))",
                    border: "1px solid rgba(79,158,255,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}

              {/* Left accent bar */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-bar"
                  className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                  style={{ background: "var(--accent-blue)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}

              <Icon
                size={18}
                className="relative shrink-0"
                style={{ color: isActive ? "var(--accent-blue)" : "inherit" }}
              />

              <span className="sidebar-label relative flex-1 text-sm font-medium">
                {item.label}
              </span>

              {item.badge && !collapsed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="sidebar-label relative text-xs font-bold rounded-full px-1.5 py-0.5"
                  style={{
                    background: isActive ? "rgba(79,158,255,0.2)" : "var(--bg-elevated)",
                    color: isActive ? "var(--accent-blue)" : "var(--text-muted)",
                    minWidth: 20,
                    textAlign: "center",
                  }}
                >
                  {item.badge}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── User profile footer ── */}
      <div
        className="px-3 py-3 overflow-hidden shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="shrink-0 rounded-xl flex items-center justify-center font-bold text-sm"
            style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #4f9eff, #8b5cf6)",
              color: "#fff",
            }}
          >
            A
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="sidebar-label flex-1 overflow-hidden"
              >
                <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>Alex Kumar</p>
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>Pro Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="sidebar-label shrink-0 p-1.5 rounded-lg transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <LogOut size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Collapse toggle ── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-[30px] flex items-center justify-center rounded-full"
        style={{
          width: 24, height: 24,
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          zIndex: 50,
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronLeft size={12} />
        </motion.div>
      </button>
    </motion.aside>
  );
}
