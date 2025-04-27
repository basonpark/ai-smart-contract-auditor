"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ScoreCardProps {
  score: number
}

export function ScoreCard({ score }: ScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= score) {
            clearInterval(interval)
            return score
          }
          return prev + 1
        })
      }, 20)

      return () => clearInterval(interval)
    }, 500)

    return () => clearTimeout(timer)
  }, [score])

  // Determine color based on score
  const getScoreColor = () => {
    if (animatedScore >= 90) return "text-green-500"
    if (animatedScore >= 70) return "text-yellow-500"
    if (animatedScore >= 50) return "text-orange-500"
    return "text-destructive"
  }

  // Determine score description
  const getScoreDescription = () => {
    if (animatedScore >= 90) return "Excellent"
    if (animatedScore >= 70) return "Good"
    if (animatedScore >= 50) return "Needs Improvement"
    return "Critical Issues"
  }

  return (
    <Card className="border-border/50 glass">
      <CardHeader>
        <CardTitle>SecureScore™</CardTitle>
        <CardDescription>Overall security rating of your smart contract</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <motion.div
          className="score-ring mb-4"
          style={{ "--score-percent": `${animatedScore}%` } as React.CSSProperties}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center">
            <Shield className={cn("h-8 w-8 mb-1", getScoreColor())} />
            <span className={cn("text-4xl font-bold", getScoreColor())}>{animatedScore}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className={cn("font-medium text-lg", getScoreColor())}>{getScoreDescription()}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {animatedScore >= 70
              ? "Your contract has passed the security audit with some recommendations."
              : "Your contract has security issues that need to be addressed."}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}
