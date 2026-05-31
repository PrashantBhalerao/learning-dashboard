"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import { ProgressBar } from "./ProgressBar";
import { getIcon } from "./IconResolver";
import { ArrowUpRight, Clock } from "lucide-react";

const VARIANTS = [
  { mesh: "mesh-blue",    accent: "var(--accent-blue)",    glow: "rgba(79,158,255,0.18)" },
  { mesh: "mesh-violet",  accent: "var(--accent-violet)",  glow: "rgba(139,92,246,0.18)" },
  { mesh: "mesh-emerald", accent: "var(--accent-emerald)", glow: "rgba(16,185,129,0.18)" },
  { mesh: "mesh-rose",    accent: "var(--accent-rose)",    glow: "rgba(244,63,94,0.18)" },
];

// Fake "time left" so cards feel real
const TIME_LEFT = ["3h 20m left", "6h 45m left", "12h left", "1h 10m left"];

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const Icon = getIcon(course.icon_name);
  const v = VARIANTS[index % VARIANTS.length];
  const timeLeft = TIME_LEFT[index % TIME_LEFT.length];
  const status = course.progress < 10 ? "Not started" : course.progress < 33 ? "Just started" : course.progress < 70 ? "In progress" : course.progress < 100 ? "Almost done" : "Completed";

  return (
    <motion.article
      className={`course-span card grain noise ${v.mesh}`}
      style={{ padding: "20px", cursor: "pointer", minHeight: 200 }}
      whileHover={{
        scale: 1.025,
        boxShadow: `0 0 0 1px ${v.accent}40, 0 12px 40px rgba(0,0,0,0.5), 0 0 28px ${v.glow}`,
        y: -2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative flex flex-col h-full gap-4" style={{ zIndex: 2 }}>
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 44, height: 44,
              background: `${v.accent}15`,
              border: `1px solid ${v.accent}28`,
              boxShadow: `0 0 12px ${v.glow}`,
            }}
          >
            <Icon size={22} style={{ color: v.accent }} strokeWidth={1.8} />
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `${v.accent}12`,
                color: v.accent,
                border: `1px solid ${v.accent}25`,
              }}
            >
              {status}
            </span>
            <button
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 28, height: 28,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm leading-snug" style={{ color: "var(--text-primary)" }}>
            {course.title}
          </h3>
          <div className="flex items-center gap-1 mt-1.5">
            <Clock size={11} style={{ color: "var(--text-muted)" }} />
            <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              {timeLeft}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Progress</span>
            <span className="text-xs font-bold font-mono" style={{ color: v.accent }}>
              {course.progress}%
            </span>
          </div>
          <ProgressBar value={course.progress} color={v.accent} height={5} />
        </div>
      </div>
    </motion.article>
  );
}
