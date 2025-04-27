"use client"
import { motion } from "framer-motion"

export function HeroGradient() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/4 w-3/4 h-1/2 bg-purple-900/20 rounded-full blur-[120px]"
        animate={{
          y: ["-50%", "-45%", "-50%"],
          x: ["0%", "2%", "0%"],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-3/4 h-1/2 bg-indigo-900/20 rounded-full blur-[120px]"
        animate={{
          y: ["50%", "45%", "50%"],
          x: ["0%", "-2%", "0%"],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-pink-900/20 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <div className="absolute inset-0 noise"></div>
    </div>
  )
}
