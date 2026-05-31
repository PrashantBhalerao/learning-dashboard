"use client";

import { motion } from "framer-motion";
import { Flame, Calendar, Clock, TrendingUp, BookOpen } from "lucide-react";

interface HeroTileProps {
  name: string;
  streak: number;
}

export function HeroTile({ name, streak }: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const emoji = hour < 12 ? "☀️" : hour < 17 ? "⚡" : "🌙";

  const stats = [
    { label: "Active Courses", value: "4", icon: BookOpen, color: "var(--accent-blue)" },
    { label: "Hours This Week", value: "12.5", icon: Clock, color: "var(--accent-violet)" },
    { label: "Avg. Progress", value: "61%", icon: TrendingUp, color: "var(--accent-emerald)" },
    { label: "Days Active", value: "23", icon: Calendar, color: "var(--accent-amber)" },
  ];

  return (
    <article
      className="hero-span card grain noise"
      style={{
        gridColumn: "span 4",
        background: "linear-gradient(135deg, #0c1220 0%, #0f1628 40%, #0c1220 100%)",
        minHeight: 200,
        padding: "28px 32px",
      }}
    >
      {/* BG glow orbs */}
      <div className="absolute inset-0 overflow-hidden rounded-[16px] pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: -60, right: -40, width: 280, height: 280,
          background: "radial-gradient(circle, rgba(79,158,255,0.14) 0%, transparent 70%)",
          filter: "blur(32px)",
        }} />
        <div style={{
          position: "absolute", bottom: -40, left: "30%", width: 200, height: 200,
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(28px)",
        }} />
        {/* Dot grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          borderRadius: "inherit",
        }} />
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        {/* Top row: greeting + streak */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-semibold uppercase tracking-[0.15em] font-mono"
                style={{ color: "var(--accent-blue)" }}
              >
                {greeting}
              </span>
              <span>{emoji}</span>
            </div>
            <h1 className="font-bold leading-tight" style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "var(--text-primary)" }}>
              Welcome back, {name}
            </h1>
            <p className="mt-1.5 text-sm" style={{ color: "var(--text-secondary)", maxWidth: 380 }}>
              You have <span style={{ color: "var(--accent-blue)", fontWeight: 600 }}>3 lessons</span> scheduled today.
              Your next session starts in 45 minutes.
            </p>
          </div>

          {/* Streak badge */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 rounded-2xl px-5 py-3.5 shrink-0"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.22)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.18, 1], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame size={28} style={{ color: "var(--accent-amber)" }} />
            </motion.div>
            <div>
              <p className="text-2xl font-bold leading-none" style={{ color: "var(--accent-amber)" }}>
                {streak}
              </p>
              <p className="text-xs mt-0.5 font-medium" style={{ color: "rgba(245,158,11,0.65)" }}>
                day streak 🔥
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid gap-3 mt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                className="rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={13} style={{ color: s.color }} />
                  <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </span>
                </div>
                <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {s.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
