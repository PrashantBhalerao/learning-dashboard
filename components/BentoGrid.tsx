"use client";

import { motion } from "framer-motion";
import type { Course, ActivityDay } from "@/types";
import { HeroTile } from "./HeroTile";
import { CourseCard } from "./CourseCard";
import { ActivityTile } from "./ActivityTile";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const tile = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 22 },
  },
};

interface BentoGridProps {
  courses: Course[];
  activity: ActivityDay[];
}

export function BentoGrid({ courses, activity }: BentoGridProps) {
  return (
    <motion.div
      className="bento-grid"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Hero — full width */}
      <motion.div variants={tile} style={{ gridColumn: "span 4" }}>
        <HeroTile name="Alex" streak={14} />
      </motion.div>

      {/* Course cards */}
      {courses.map((course, i) => (
        <motion.div key={course.id} variants={tile} className="course-span">
          <CourseCard course={course} index={i} />
        </motion.div>
      ))}

      {/* Activity tile — full width */}
      <motion.div variants={tile} style={{ gridColumn: "span 4" }}>
        <ActivityTile data={activity} />
      </motion.div>
    </motion.div>
  );
}
