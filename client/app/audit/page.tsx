"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeUploadForm } from "@/components/code-upload-form"
import { GithubForm } from "@/components/github-form"
import { FileUploadForm } from "@/components/file-upload-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/animations/motion-wrapper"

export default function AuditPage() {
  return (
    <PageTransition>
      <div className="container max-w-5xl py-10">
        <MotionWrapper type="fade" delay={0.1}>
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </MotionWrapper>

        <MotionWrapper type="slide" delay={0.2}>
          <div className="mb-10">
            <h1 className="heading-lg gradient-text mb-2">Start Your Smart Contract Audit</h1>
            <p className="text-muted-foreground">
              Choose your preferred method to submit your Solidity smart contract for analysis.
            </p>
          </div>
        </MotionWrapper>

        <MotionWrapper type="fade" delay={0.3}>
          <Tabs defaultValue="paste" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="paste">Paste Code</TabsTrigger>
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="github">GitHub Repository</TabsTrigger>
            </TabsList>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TabsContent value="paste">
                <Card className="border-white/5 glass shadow-soft">
                  <CardHeader>
                    <CardTitle>Paste Solidity Code</CardTitle>
                    <CardDescription>Paste your Solidity smart contract code directly for analysis.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeUploadForm />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upload">
                <Card className="border-white/5 glass shadow-soft">
                  <CardHeader>
                    <CardTitle>Upload Files</CardTitle>
                    <CardDescription>
                      Upload .sol files or a zip bundle containing your smart contracts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUploadForm />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="github">
                <Card className="border-white/5 glass shadow-soft">
                  <CardHeader>
                    <CardTitle>GitHub Repository</CardTitle>
                    <CardDescription>Connect to a GitHub repository to analyze your smart contracts.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GithubForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </MotionWrapper>
      </div>
    </PageTransition>
  )
}
