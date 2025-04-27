"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Upload, File, X, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FileUploadForm() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEngine, setSelectedEngine] = useState("standard")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.name.endsWith(".sol") || file.name.endsWith(".zip"),
    )

    setFiles((prev) => [...prev, ...droppedFiles])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        (file) => file.name.endsWith(".sol") || file.name.endsWith(".zip"),
      )
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) return

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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragging ? "border-primary/70 bg-primary/5" : "border-border",
            "hover:border-primary/50 hover:bg-primary/5",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".sol,.zip"
            multiple
            onChange={handleFileChange}
          />
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <h3 className="text-lg font-medium mb-1">Upload Solidity Files</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop .sol files or a .zip bundle here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports individual .sol files or .zip archives containing Solidity contracts
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label>Selected Files</Label>
            <div className="border rounded-md divide-y divide-border/50">
              <AnimatePresence>
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center">
                      <File className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        <GradientButton type="submit" className="w-full" disabled={isLoading || files.length === 0}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Files...
            </>
          ) : (
            "Start Audit"
          )}
        </GradientButton>
      </motion.div>
    </form>
  )
}
