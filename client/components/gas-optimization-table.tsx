"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { StaggeredList } from "@/components/animations/staggered-list"

export function GasOptimizationTable() {
  const optimizations = [
    {
      id: "G-001",
      title: "Use uint256 instead of uint8",
      impact: "high",
      description: "Using uint256 is more gas efficient than uint8 for storage variables.",
      location: "Token.sol:25",
      savings: "~2,000 gas per transaction",
    },
    {
      id: "G-002",
      title: "Cache Array Length in For Loops",
      impact: "medium",
      description: "Reading array length at each iteration of a for-loop consumes more gas than caching it.",
      location: "Staking.sol:142",
      savings: "~200 gas per iteration",
    },
    {
      id: "G-003",
      title: "Use Prefix Increment",
      impact: "low",
      description: "Using ++i instead of i++ is more gas efficient.",
      location: "Multiple locations",
      savings: "~5 gas per operation",
    },
    {
      id: "G-004",
      title: "Pack Storage Variables",
      impact: "high",
      description: "Pack multiple smaller variables into a single storage slot to save gas.",
      location: "Token.sol:18-22",
      savings: "~20,000 gas per deployment",
    },
    {
      id: "G-005",
      title: "Use Calldata Instead of Memory",
      impact: "medium",
      description: "For external functions, using calldata for read-only arguments is cheaper than memory.",
      location: "Governance.sol:56",
      savings: "~300 gas per call",
    },
  ]

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-500">High Impact</Badge>
      case "medium":
        return <Badge className="bg-blue-500">Medium Impact</Badge>
      case "low":
        return <Badge className="bg-purple-500">Low Impact</Badge>
      default:
        return null
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Optimization</TableHead>
          <TableHead className="w-[120px]">Impact</TableHead>
          <TableHead className="w-[120px]">Location</TableHead>
          <TableHead className="w-[150px]">Est. Savings</TableHead>
          <TableHead className="w-[100px]">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <StaggeredList delay={0.1} staggerDelay={0.05}>
          {optimizations.map((opt) => (
            <TableRow key={opt.id} className="group">
              <TableCell className="font-mono">{opt.id}</TableCell>
              <TableCell>
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{opt.title}</p>
                    <p className="text-sm text-muted-foreground">{opt.description}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getImpactBadge(opt.impact)}</TableCell>
              <TableCell className="font-mono text-xs">{opt.location}</TableCell>
              <TableCell className="text-sm">{opt.savings}</TableCell>
              <TableCell>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
                  </Button>
                </motion.div>
              </TableCell>
            </TableRow>
          ))}
        </StaggeredList>
      </TableBody>
    </Table>
  )
}
