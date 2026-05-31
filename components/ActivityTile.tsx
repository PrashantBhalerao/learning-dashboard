"use client";

import { motion } from "framer-motion";
import type { ActivityDay } from "@/types";

interface ActivityTileProps {
  data: ActivityDay[];
}

function getColor(count: number): string {
  if (count === 0) return "rgba(255,255,255,0.04)";
  if (count === 1) return "rgba(88,196,220,0.25)";
  if (count === 2) return "rgba(88,196,220,0.45)";
  if (count === 3) return "rgba(88,196,220,0.65)";
  return "rgba(88,196,220,0.9)";
}

const DAYS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function ActivityTile({ data }: ActivityTileProps) {
  // Group into weeks of 7
  const weeks: ActivityDay[][] = [];
  let week: ActivityDay[] = [];
  for (const day of data) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) weeks.push(week);

  const totalDays = data.filter((d) => d.count > 0).length;
  const totalContributions = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <article
      className="relative rounded-2xl p-5 overflow-hidden noise-overlay"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        gridColumn: "span 2",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Learning Activity
          </h2>
          <p className="text-xs mt-0.5 font-mono-custom" style={{ color: "var(--text-muted)" }}>
            {totalContributions} sessions · {totalDays} active days
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: getColor(level) }}
            />
          ))}
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-0">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-1 shrink-0">
            {DAYS.map((day, i) => (
              <div key={i} className="h-2.5 flex items-center">
                <span className="text-[9px] font-mono-custom" style={{ color: "var(--text-muted)" }}>
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Grid */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 shrink-0">
              {week.map((day, di) => (
                <motion.div
                  key={di}
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: getColor(day.count) }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: wi * 0.01 + di * 0.005,
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  title={`${day.date}: ${day.count} session${day.count !== 1 ? "s" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
