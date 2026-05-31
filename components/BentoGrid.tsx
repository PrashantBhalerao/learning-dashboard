"use client";

import { motion } from "framer-motion";
import type { Course, ActivityDay } from "@/types";
import { HeroTile } from "./HeroTile";
import { CourseCard } from "./CourseCard";
import { ActivityTile } from "./ActivityTile";

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const TILE_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 24,
    },
  },
};

interface BentoGridProps {
  courses: Course[];
  activity: ActivityDay[];
}

export function BentoGrid({ courses, activity }: BentoGridProps) {
  return (
    <motion.div
      className="grid gap-3"
      style={{
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      {/* Hero — spans full width */}
      <motion.div variants={TILE_VARIANTS} style={{ gridColumn: "span 4" }}>
        <HeroTile name="Alex" streak={14} />
      </motion.div>

      {/* Course cards — each takes 1 col */}
      {courses.map((course, i) => (
        <motion.div key={course.id} variants={TILE_VARIANTS}>
          <CourseCard course={course} index={i} />
        </motion.div>
      ))}

      {/* Activity tile — spans 4 cols */}
      <motion.div variants={TILE_VARIANTS} style={{ gridColumn: "span 4" }}>
        <ActivityTile data={activity} />
      </motion.div>
    </motion.div>
  );
}
