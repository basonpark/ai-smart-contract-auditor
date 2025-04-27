import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuditHistoryTableProps {
  limit?: number
  criticalOnly?: boolean
}

export function AuditHistoryTable({ limit = 10, criticalOnly = false }: AuditHistoryTableProps) {
  // Sample audit data
  const audits = [
    {
      id: "123",
      name: "Token.sol",
      date: "Apr 24, 2025",
      score: 78,
      criticalIssues: 2,
      highIssues: 3,
      status: "completed",
    },
    {
      id: "122",
      name: "Staking.sol",
      date: "Apr 23, 2025",
      score: 92,
      criticalIssues: 0,
      highIssues: 1,
      status: "completed",
    },
    {
      id: "121",
      name: "Governance.sol",
      date: "Apr 22, 2025",
      score: 65,
      criticalIssues: 1,
      highIssues: 4,
      status: "completed",
    },
    {
      id: "120",
      name: "Vault.sol",
      date: "Apr 20, 2025",
      score: 88,
      criticalIssues: 0,
      highIssues: 2,
      status: "completed",
    },
    {
      id: "119",
      name: "NFTMarketplace.sol",
      date: "Apr 18, 2025",
      score: 72,
      criticalIssues: 1,
      highIssues: 2,
      status: "completed",
    },
    {
      id: "118",
      name: "Lending.sol",
      date: "Apr 15, 2025",
      score: 81,
      criticalIssues: 0,
      highIssues: 3,
      status: "completed",
    },
    {
      id: "117",
      name: "DEX.sol",
      date: "Apr 10, 2025",
      score: 68,
      criticalIssues: 1,
      highIssues: 5,
      status: "completed",
    },
  ]

  // Filter audits if criticalOnly is true
  const filteredAudits = criticalOnly ? audits.filter((audit) => audit.criticalIssues > 0) : audits

  // Limit the number of audits shown
  const limitedAudits = filteredAudits.slice(0, limit)

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-yellow-500"
    if (score >= 50) return "text-orange-500"
    return "text-destructive"
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contract</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>SecureScore™</TableHead>
          <TableHead>Critical Issues</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {limitedAudits.length > 0 ? (
          limitedAudits.map((audit) => (
            <TableRow key={audit.id}>
              <TableCell className="font-medium">{audit.name}</TableCell>
              <TableCell>{audit.date}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Shield className={cn("h-4 w-4 mr-1", getScoreColor(audit.score))} />
                  <span className={cn("font-medium", getScoreColor(audit.score))}>{audit.score}</span>
                </div>
              </TableCell>
              <TableCell>
                {audit.criticalIssues > 0 ? (
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-destructive mr-1" />
                    <span className="text-destructive font-medium">{audit.criticalIssues}</span>
                  </div>
                ) : (
                  <span className="text-green-500">None</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {audit.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/audit/results/${audit.id}`}>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              No audit records found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
