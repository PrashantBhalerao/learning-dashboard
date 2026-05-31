"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
}

export function ProgressBar({ value, color = "var(--accent-blue)", height = 6 }: ProgressBarProps) {
  return (
    <div
      className="relative w-full rounded-full overflow-hidden"
      style={{ height, background: "rgba(255,255,255,0.05)" }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}cc, ${color})`,
          boxShadow: `0 0 8px ${color}60`,
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      />
    </div>
  );
}
