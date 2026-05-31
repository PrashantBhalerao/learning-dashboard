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
    if (!data?.length) return MOCK_COURSES;
    return data as Course[];
  } catch {
    // Graceful fallback — dashboard always renders
    return MOCK_COURSES;
  }
}

async function DashboardContent() {
  const courses = await fetchCourses();
  return <BentoGrid courses={courses} activity={MOCK_ACTIVITY} />;
}

function DashboardSkeleton() {
  return (
    <div className="bento-grid">
      <div style={{ gridColumn: "span 4" }}><HeroSkeleton /></div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="course-span"><CourseCardSkeleton /></div>
      ))}
      <div style={{ gridColumn: "span 4" }}><ActivitySkeleton /></div>
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
