import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase";
import { MOCK_COURSES, MOCK_ACTIVITY } from "@/lib/mock-data";
import { BentoGrid } from "@/components/BentoGrid";
import { HeroSkeleton, CourseCardSkeleton, ActivitySkeleton } from "@/components/Skeletons";
import type { Course } from "@/types";

async function fetchCourses(): Promise<Course[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return MOCK_COURSES;
    return data as Course[];
  } catch {
    // Graceful fallback to mock data if Supabase isn't configured
    return MOCK_COURSES;
  }
}

async function DashboardContent() {
  const courses = await fetchCourses();
  return <BentoGrid courses={courses} activity={MOCK_ACTIVITY} />;
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
      <div style={{ gridColumn: "span 4" }}>
        <HeroSkeleton />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
      <div style={{ gridColumn: "span 4" }}>
        <ActivitySkeleton />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
