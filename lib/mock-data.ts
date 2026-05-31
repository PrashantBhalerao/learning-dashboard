import type { Course, ActivityDay } from "@/types";

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Code2",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "TypeScript Mastery",
    progress: 52,
    icon_name: "FileCode",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "System Design Pro",
    progress: 30,
    icon_name: "Network",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Cloud Architecture",
    progress: 88,
    icon_name: "Cloud",
    created_at: new Date().toISOString(),
  },
];

export const MOCK_ACTIVITY: ActivityDay[] = generateMockActivity();

function generateMockActivity(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const now = new Date();
  for (let i = 51 * 7; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    days.push({
      date: date.toISOString().split("T")[0],
      count: Math.random() > 0.35 ? Math.floor(Math.random() * 5) + 1 : 0,
    });
  }
  return days;
}
