"use client"

import { ParticleField } from "./particle-field"
import { AdvancedGradient } from "./advanced-gradient"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AdvancedGradient />
      <ParticleField />
      <motion.div
        className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <div className="absolute inset-0 noise opacity-20"></div>
    </div>
  )
}
