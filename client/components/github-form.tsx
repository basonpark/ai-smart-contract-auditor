"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Github, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function GithubForm() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const [selectedEngine, setSelectedEngine] = useState("standard")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoUrl.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/audit/results/123"
    }, 2000)
  }

  const engineOptions = [
    { value: "basic", label: "Basic (Slither)" },
    { value: "standard", label: "Standard (Slither + Mythril)" },
    { value: "comprehensive", label: "Comprehensive (All Engines)" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Label htmlFor="repo-url">GitHub Repository URL</Label>
        <div className="flex items-center space-x-2">
          <Github className="h-5 w-5 text-muted-foreground" />
          <Input
            id="repo-url"
            placeholder="https://github.com/username/repo"
            className="bg-black/40"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enter the full URL to your GitHub repository containing Solidity contracts
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center space-x-2">
          <Checkbox id="private" checked={isPrivate} onCheckedChange={(checked) => setIsPrivate(checked === true)} />
          <Label htmlFor="private">This is a private repository</Label>
        </div>
      </motion.div>

      <AnimatePresence>
        {isPrivate && (
          <motion.div
            className="p-4 rounded-md bg-primary/5 border border-primary/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm mb-4">For private repositories, you'll need to authorize AuditAI with GitHub.</p>
            <Button type="button" variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Connect GitHub Account
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-2">
          <Label htmlFor="branch">Branch</Label>
          <Input id="branch" placeholder="main" className="bg-black/40" defaultValue="main" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="path">Path to Contracts (Optional)</Label>
          <Input id="path" placeholder="contracts/" className="bg-black/40" />
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="space-y-2">
          <Label htmlFor="compiler">Compiler Version</Label>
          <Select defaultValue="0.8.19">
            <SelectTrigger id="compiler">
              <SelectValue placeholder="Select compiler version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.8.19">Solidity 0.8.19</SelectItem>
              <SelectItem value="0.8.17">Solidity 0.8.17</SelectItem>
              <SelectItem value="0.8.15">Solidity 0.8.15</SelectItem>
              <SelectItem value="0.8.10">Solidity 0.8.10</SelectItem>
              <SelectItem value="0.7.6">Solidity 0.7.6</SelectItem>
              <SelectItem value="0.6.12">Solidity 0.6.12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="engine">Analysis Depth</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Choose the depth of analysis. More comprehensive options may take longer to process.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select defaultValue="standard" value={selectedEngine} onValueChange={setSelectedEngine}>
            <SelectTrigger id="engine">
              <SelectValue placeholder="Select analysis depth" />
            </SelectTrigger>
            <SelectContent>
              {engineOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center space-x-2">
          <Checkbox id="gas-gh" defaultChecked={selectedEngine !== "basic"} disabled={selectedEngine === "basic"} />
          <Label htmlFor="gas-gh" className={selectedEngine === "basic" ? "text-muted-foreground" : ""}>
            Include gas optimization analysis {selectedEngine === "basic" && "(Standard and above)"}
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="ai-gh" defaultChecked />
          <Label htmlFor="ai-gh">Use AI for enhanced analysis and remediation suggestions</Label>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <GradientButton type="submit" className="w-full" disabled={isLoading || !repoUrl.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Repository...
            </>
          ) : (
            "Start Audit"
          )}
        </GradientButton>
      </motion.div>
    </form>
  )
}
