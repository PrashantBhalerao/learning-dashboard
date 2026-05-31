import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Sidebar — desktop only */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <main
        className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6"
        style={{ minWidth: 0 }}
      >
        {/* Top bar */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-xs font-mono-custom font-medium tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Dashboard
            </h2>
          </div>
          <div
            className="flex items-center gap-2 text-xs font-mono-custom px-3 py-1.5 rounded-full"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent-emerald)" }}
            />
            Live
          </div>
        </header>

        {children}
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
