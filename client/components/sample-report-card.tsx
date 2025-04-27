"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function SampleReportCard() {
  const [animatedScore, setAnimatedScore] = useState(0)
  const score = 78

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

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-white/5 glass shadow-glow overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Score Section */}
            <div className="p-6 border-r border-white/5 flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold mb-4 text-center">SecureScore™</h3>
              <div
                className="score-ring mb-4"
                style={{ "--score-percent": `${animatedScore}%` } as React.CSSProperties}
              >
                <div className="flex flex-col items-center justify-center">
                  <Shield className={cn("h-8 w-8 mb-1", getScoreColor())} />
                  <span className={cn("text-4xl font-bold", getScoreColor())}>{animatedScore}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
              <p className={cn("font-medium", getScoreColor())}>Good</p>
            </div>

            {/* Vulnerabilities Section */}
            <div className="p-6 border-r border-white/5">
              <h3 className="text-lg font-bold mb-4">Vulnerabilities</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                    <span>Critical</span>
                  </div>
                  <Badge variant="destructive">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                    <span>High</span>
                  </div>
                  <Badge className="bg-orange-500">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 text-yellow-500 mr-2" />
                    <span>Medium</span>
                  </div>
                  <Badge className="bg-yellow-500">5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span>Low</span>
                  </div>
                  <Badge className="bg-green-500">8</Badge>
                </div>
              </div>
            </div>

            {/* Code Preview Section */}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Vulnerability Preview</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Reentrancy Vulnerability</p>
                    <p className="text-xs text-muted-foreground">Token.sol:156</p>
                  </div>
                </div>
                <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-hidden">
                  <div className="text-red-400">- (bool success, ) = msg.sender.call{"{value: amount}"}("");</div>
                  <div className="text-red-400">- require(success, "Transfer failed");</div>
                  <div className="text-red-400">- balances[msg.sender] -= amount;</div>
                  <div className="text-green-400">+ balances[msg.sender] -= amount;</div>
                  <div className="text-green-400">+ (bool success, ) = msg.sender.call{"{value: amount}"}("");</div>
                  <div className="text-green-400">+ require(success, "Transfer failed");</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
