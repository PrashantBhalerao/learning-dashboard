import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Bell, Search } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Desktop/tablet sidebar */}
      <Sidebar />

      {/* Right panel */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* ── Top header ── */}
        <header
          className="shrink-0 flex items-center justify-between px-5 md:px-7"
          style={{
            height: "var(--header-h)",
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border)",
            gap: 16,
          }}
        >
          {/* Left: breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              LearnFlow
            </span>
            <span style={{ color: "var(--text-muted)" }}>/</span>
            <span className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
              Dashboard
            </span>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search — desktop */}
            <button
              className="hidden md:flex items-center gap-2 text-sm rounded-lg px-3 py-2"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <Search size={14} />
              <span>Search...</span>
              <span
                className="ml-1 text-xs font-mono px-1.5 py-0.5 rounded"
                style={{ background: "var(--bg-hover)" }}
              >
                ⌘K
              </span>
            </button>

            {/* Notifications */}
            <button
              className="relative flex items-center justify-center rounded-xl"
              style={{
                width: 36, height: 36,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              <Bell size={16} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full pulse-dot"
                style={{ background: "var(--accent-rose)" }}
              />
            </button>

            {/* Avatar */}
            <div
              className="flex items-center justify-center rounded-xl font-bold text-sm shrink-0"
              style={{
                width: 36, height: 36,
                background: "linear-gradient(135deg, #4f9eff, #8b5cf6)",
                color: "#fff",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* ── Main scrollable area ── */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ padding: "20px 20px 90px", minWidth: 0 }}
        >
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
