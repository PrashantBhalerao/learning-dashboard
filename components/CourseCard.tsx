"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import { ProgressBar } from "./ProgressBar";
import { getIcon } from "./IconResolver";

const GRADIENTS = [
  "mesh-gradient",
  "mesh-gradient-purple",
  "mesh-gradient-emerald",
  "mesh-gradient-amber",
];

const ACCENT_COLORS = [
  "var(--accent-cyan)",
  "var(--accent-purple)",
  "var(--accent-emerald)",
  "var(--accent-amber)",
];

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const Icon = getIcon(course.icon_name);
  const gradientClass = GRADIENTS[index % GRADIENTS.length];
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.article
      className={`relative rounded-2xl p-5 overflow-hidden noise-overlay cursor-pointer ${gradientClass}`}
      style={{ border: "1px solid var(--border)" }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 0 1px ${accentColor}40, 0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${accentColor}15`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative z-10 flex flex-col h-full gap-4">
        {/* Icon + progress % */}
        <div className="flex items-start justify-between">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
          >
            <Icon size={20} style={{ color: accentColor }} />
          </div>
          <span
            className="text-sm font-bold font-mono-custom"
            style={{ color: accentColor }}
          >
            {course.progress}%
          </span>
        </div>

        {/* Title */}
        <div>
          <h3
            className="font-semibold text-sm leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {course.title}
          </h3>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {course.progress < 33
              ? "Just started"
              : course.progress < 66
              ? "In progress"
              : course.progress < 100
              ? "Almost done"
              : "Completed"}
          </p>
        </div>

        {/* Progress bar */}
        <ProgressBar value={course.progress} color={accentColor} />
      </div>
    </motion.article>
  );
}
