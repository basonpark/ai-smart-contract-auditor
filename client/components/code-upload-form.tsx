"use client"

import type React from "react"

import { useState } from "react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Info } from "lucide-react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CodeUploadForm() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEngine, setSelectedEngine] = useState("standard")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

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
        <Label htmlFor="code">Solidity Code</Label>
        <Textarea
          id="code"
          placeholder="// Paste your Solidity smart contract code here..."
          className="min-h-[300px] font-mono text-sm bg-black/40"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
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
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <Checkbox id="gas" defaultChecked={selectedEngine !== "basic"} disabled={selectedEngine === "basic"} />
          <Label htmlFor="gas" className={selectedEngine === "basic" ? "text-muted-foreground" : ""}>
            Include gas optimization analysis {selectedEngine === "basic" && "(Standard and above)"}
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="ai" defaultChecked />
          <Label htmlFor="ai">Use AI for enhanced analysis and remediation suggestions</Label>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GradientButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Contract...
            </>
          ) : (
            "Start Audit"
          )}
        </GradientButton>
      </motion.div>
    </form>
  )
}
