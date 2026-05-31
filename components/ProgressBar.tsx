"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

interface ProgressBarProps {
  value: number;
  color?: string;
}

export function ProgressBar({ value, color = "var(--accent-cyan)" }: ProgressBarProps) {
  return (
    <div
      className="relative h-1.5 w-full rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        initial={{ width: "0%" }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </div>
  );
}
