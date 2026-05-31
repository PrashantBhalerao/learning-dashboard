"use client";

import { motion } from "framer-motion";

function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-lg ${className}`}
      style={{ background: "var(--bg-elevated)" }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="w-8 h-4 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-3/4 h-3 rounded" />
          <Skeleton className="w-1/2 h-2 rounded" />
        </div>
        <Skeleton className="w-full h-1.5 rounded-full" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        gridColumn: "span 2",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <Skeleton className="w-24 h-3 rounded" />
          <Skeleton className="w-48 h-8 rounded" />
          <Skeleton className="w-64 h-3 rounded" />
        </div>
        <Skeleton className="w-24 h-16 rounded-xl" />
      </div>
      <div className="flex gap-8 mt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="w-12 h-5 rounded" />
            <Skeleton className="w-20 h-3 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        gridColumn: "span 2",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <Skeleton className="w-32 h-3.5 rounded" />
          <Skeleton className="w-40 h-2.5 rounded" />
        </div>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 52 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, j) => (
              <Skeleton key={j} className="w-2.5 h-2.5 rounded-sm" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
