"use client";

function Sk({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`skeleton rounded-xl ${className ?? ""}`} style={style} />;
}

export function CourseCardSkeleton() {
  return (
    <div className="course-span card" style={{ padding: 20, minHeight: 200 }}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <Sk style={{ width: 44, height: 44, borderRadius: 12 }} />
          <Sk style={{ width: 70, height: 22, borderRadius: 99 }} />
        </div>
        <div style={{ flex: 1 }}>
          <Sk style={{ width: "80%", height: 14, marginBottom: 8 }} />
          <Sk style={{ width: "50%", height: 11 }} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <Sk style={{ width: 60, height: 11 }} />
            <Sk style={{ width: 30, height: 11 }} />
          </div>
          <Sk style={{ width: "100%", height: 5, borderRadius: 99 }} />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="hero-span card" style={{ padding: "28px 32px", minHeight: 200, gridColumn: "span 4" }}>
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div style={{ flex: 1 }}>
          <Sk style={{ width: 100, height: 12, marginBottom: 10 }} />
          <Sk style={{ width: "55%", height: 34, marginBottom: 10 }} />
          <Sk style={{ width: "70%", height: 14 }} />
        </div>
        <Sk style={{ width: 120, height: 72, borderRadius: 16 }} />
      </div>
      <div className="grid gap-3 mt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
        {[1,2,3,4].map(i => <Sk key={i} style={{ height: 68, borderRadius: 12 }} />)}
      </div>
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="activity-span card" style={{ padding: "24px 28px", gridColumn: "span 4" }}>
      <div className="flex justify-between mb-6">
        <div>
          <Sk style={{ width: 140, height: 16, marginBottom: 8 }} />
          <Sk style={{ width: 80, height: 11 }} />
        </div>
        <div className="flex gap-5">
          {[1,2,3].map(i => (
            <div key={i} style={{ textAlign: "right" }}>
              <Sk style={{ width: 40, height: 18, marginBottom: 6 }} />
              <Sk style={{ width: 80, height: 11 }} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-1 overflow-hidden">
        {Array.from({ length: 53 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, di) => (
              <div key={di} className="skeleton" style={{ width: 11, height: 11, borderRadius: 2 }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
