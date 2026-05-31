"use client";

import { motion } from "framer-motion";
import type { ActivityDay } from "@/types";

interface ActivityTileProps {
  data: ActivityDay[];
}

function getCellColor(count: number) {
  if (count === 0) return "rgba(255,255,255,0.04)";
  if (count === 1) return "rgba(79,158,255,0.3)";
  if (count === 2) return "rgba(79,158,255,0.5)";
  if (count === 3) return "rgba(79,158,255,0.7)";
  return "rgba(79,158,255,0.95)";
}

const WEEK_DAYS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

export function ActivityTile({ data }: ActivityTileProps) {
  // Pad to align with Monday
  const padded = [...Array(1).fill({ date: "", count: 0 }), ...data];
  const weeks: ActivityDay[][] = [];
  let week: ActivityDay[] = [];
  for (const d of padded) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length) weeks.push(week);

  const activeDays = data.filter((d) => d.count > 0).length;
  const totalSessions = data.reduce((s, d) => s + d.count, 0);
  const maxStreak = (() => {
    let best = 0, cur = 0;
    for (const d of data) { cur = d.count > 0 ? cur + 1 : 0; best = Math.max(best, cur); }
    return best;
  })();

  return (
    <article
      className="activity-span card grain noise"
      style={{
        gridColumn: "span 4",
        padding: "24px 28px",
        background: "var(--bg-card)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            Learning Activity
          </h2>
          <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-muted)" }}>
            Past 52 weeks
          </p>
        </div>
        {/* Mini stats */}
        <div className="flex items-center gap-5">
          {[
            { label: "Total sessions", value: totalSessions },
            { label: "Active days", value: activeDays },
            { label: "Best streak", value: `${maxStreak}d` },
          ].map((s, i) => (
            <div key={i} className="text-right">
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
              <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px]" style={{ minWidth: "fit-content" }}>
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] mr-1 shrink-0" style={{ paddingTop: 18 }}>
            {WEEK_DAYS.map((d, i) => (
              <div key={i} style={{ height: 11, display: "flex", alignItems: "center" }}>
                <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)", width: 22 }}>{d}</span>
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="flex flex-col gap-[3px] shrink-0" style={{ marginBottom: 4 }}>
            {/* Month labels row */}
            <div className="flex gap-[3px]" style={{ height: 16 }}>
              {weeks.map((_, wi) => {
                const firstDay = weeks[wi]?.find(d => d.date)?.date;
                const d = firstDay ? new Date(firstDay) : null;
                const isFirst = d?.getDate() !== undefined && d.getDate() <= 7;
                return (
                  <div key={wi} style={{ width: 11 }}>
                    {isFirst && d && (
                      <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                        {d.toLocaleString("default", { month: "short" })}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* All week columns */}
          <div className="flex gap-[3px] shrink-0">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]" style={{ paddingTop: 18 }}>
                {week.map((day, di) => (
                  <motion.div
                    key={di}
                    title={day.date ? `${day.date}: ${day.count} session${day.count !== 1 ? "s" : ""}` : ""}
                    style={{
                      width: 11, height: 11,
                      borderRadius: 2,
                      background: getCellColor(day.count),
                      cursor: day.count > 0 ? "pointer" : "default",
                    }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={day.count > 0 ? { scale: 1.4, background: "rgba(79,158,255,1)" } : {}}
                    transition={{
                      delay: wi * 0.008 + di * 0.003,
                      duration: 0.25,
                      type: "spring",
                      stiffness: 380,
                      damping: 24,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-4">
        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            style={{ width: 11, height: 11, borderRadius: 2, background: getCellColor(l) }}
          />
        ))}
        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>More</span>
      </div>
    </article>
  );
}
