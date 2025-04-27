"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className }: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ y: 0 }}
    >
      {children}
    </motion.div>
  )
}
