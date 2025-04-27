"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  delay?: number
  staggerDelay?: number
}

export function StaggeredList({ children, className, delay = 0, staggerDelay = 0.1 }: StaggeredListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div className={className} variants={containerVariants} initial="hidden" animate="visible">
      {Array.isArray(children) &&
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
    </motion.div>
  )
}
