"use client";

import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";

interface HeroTileProps {
  name: string;
  streak: number;
}

export function HeroTile({ name, streak }: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <article
      className="relative rounded-2xl p-6 overflow-hidden noise-overlay"
      style={{
        background: "linear-gradient(135deg, #0f1923 0%, #0d1520 50%, #0a1118 100%)",
        border: "1px solid var(--border)",
        gridColumn: "span 2",
      }}
    >
      {/* Background glow orbs */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -bottom-8 left-1/3 w-48 h-48 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
        <div>
          <p
            className="text-sm font-medium font-mono-custom mb-1"
            style={{ color: "var(--accent-cyan)" }}
          >
            {greeting},
          </p>
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            {name} 👋
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            You&apos;re on a roll. Keep the momentum going today.
          </p>
        </div>

        {/* Streak indicator */}
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl"
          style={{
            background: "rgba(251, 191, 36, 0.08)",
            border: "1px solid rgba(251, 191, 36, 0.2)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame size={24} style={{ color: "var(--accent-amber)" }} />
          </motion.div>
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--accent-amber)" }}>
              {streak}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              day streak
            </p>
          </div>
        </div>
      </div>

      {/* Progress stats row */}
      <div className="relative z-10 mt-6 flex items-center gap-6">
        {[
          { label: "Courses active", value: "4", icon: Star },
          { label: "Hours this week", value: "12.5h", icon: Star },
          { label: "Completion rate", value: "61%", icon: Star },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {stat.value}
            </span>
            <span className="text-xs font-mono-custom" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
