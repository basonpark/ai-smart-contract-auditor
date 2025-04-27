"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share2, AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react"
import { VulnerabilityTable } from "@/components/vulnerability-table"
import { ScoreCard } from "@/components/score-card"
import { CodeDiff } from "@/components/code-diff"
import { GasOptimizationTable } from "@/components/gas-optimization-table"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { PageTransition } from "@/components/animations/motion-wrapper"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"

export default function AuditResultsPage({ params }: { params: { id: string } }) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageTransition>
      <div className="container py-10">
        <MotionWrapper type="fade" delay={0.1}>
          <Link href="/audit" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Audit</span>
          </Link>
        </MotionWrapper>

        <MotionWrapper type="slide" delay={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Audit Results</h1>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">Audit ID: {params.id}</p>
                <Badge variant="outline" className="text-xs">
                  Completed
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <MotionWrapper type="scale" delay={0.3}>
            <ScoreCard score={78} />
          </MotionWrapper>

          <MotionWrapper type="slide" delay={0.4} className="col-span-1 lg:col-span-2">
            <Card className="border-border/50 glass">
              <CardHeader>
                <CardTitle>Vulnerability Summary</CardTitle>
                <CardDescription>Overview of detected vulnerabilities by severity</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-destructive/10 border border-destructive/20"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <AlertTriangle className="h-6 w-6 text-destructive mb-2" />
                    <motion.span
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      2
                    </motion.span>
                    <span className="text-sm text-muted-foreground">Critical</span>
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-orange-500/10 border border-orange-500/20"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <AlertCircle className="h-6 w-6 text-orange-500 mb-2" />
                    <motion.span
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      3
                    </motion.span>
                    <span className="text-sm text-muted-foreground">High</span>
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <Info className="h-6 w-6 text-yellow-500 mb-2" />
                    <motion.span
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      5
                    </motion.span>
                    <span className="text-sm text-muted-foreground">Medium</span>
                  </motion.div>

                  <motion.div
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-green-500/10 border border-green-500/20"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-500 mb-2" />
                    <motion.span
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      8
                    </motion.span>
                    <span className="text-sm text-muted-foreground">Low</span>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>

        <MotionWrapper type="fade" delay={0.5}>
          <Tabs defaultValue="vulnerabilities" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
              <TabsTrigger value="fixes">Fix Suggestions</TabsTrigger>
              <TabsTrigger value="gas">Gas Optimizations</TabsTrigger>
              <TabsTrigger value="details">Audit Details</TabsTrigger>
            </TabsList>

            <ScrollReveal>
              <TabsContent value="vulnerabilities">
                <Card className="border-border/50 glass">
                  <CardHeader>
                    <CardTitle>Detected Vulnerabilities</CardTitle>
                    <CardDescription>
                      Comprehensive list of all detected vulnerabilities sorted by severity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VulnerabilityTable />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fixes">
                <Card className="border-border/50 glass">
                  <CardHeader>
                    <CardTitle>Fix Suggestions</CardTitle>
                    <CardDescription>
                      AI-generated code diffs to help remediate identified vulnerabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeDiff />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gas">
                <Card className="border-border/50 glass">
                  <CardHeader>
                    <CardTitle>Gas Optimizations</CardTitle>
                    <CardDescription>Suggestions to optimize gas usage in your smart contract</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GasOptimizationTable />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card className="border-border/50 glass">
                  <CardHeader>
                    <CardTitle>Audit Details</CardTitle>
                    <CardDescription>Technical details about the audit process and configuration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Audit Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Compiler Version</p>
                            <p className="text-sm text-muted-foreground">Solidity 0.8.19</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Analysis Engines</p>
                            <p className="text-sm text-muted-foreground">Slither, Mythril, Manticore</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">AI Enhancement</p>
                            <p className="text-sm text-muted-foreground">Enabled</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Gas Analysis</p>
                            <p className="text-sm text-muted-foreground">Enabled</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Files Analyzed</h3>
                        <div className="border rounded-md divide-y divide-border/50">
                          <div className="p-3">
                            <p className="text-sm">Token.sol</p>
                          </div>
                          <div className="p-3">
                            <p className="text-sm">Staking.sol</p>
                          </div>
                          <div className="p-3">
                            <p className="text-sm">Governance.sol</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Audit Timeline</h3>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Started</p>
                          <p className="text-sm text-muted-foreground">April 24, 2025 at 12:30 PM</p>
                        </div>
                        <div className="space-y-1 mt-2">
                          <p className="text-sm font-medium">Completed</p>
                          <p className="text-sm text-muted-foreground">April 24, 2025 at 12:32 PM</p>
                        </div>
                        <div className="space-y-1 mt-2">
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">2 minutes</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </ScrollReveal>
          </Tabs>
        </MotionWrapper>

        <MotionWrapper type="slide" delay={0.6} className="mt-8">
          <div className="flex justify-center">
            <GradientButton size="lg" onClick={() => (window.location.href = "/audit")}>
              Start Another Audit
            </GradientButton>
          </div>
        </MotionWrapper>
      </div>
    </PageTransition>
  )
}
