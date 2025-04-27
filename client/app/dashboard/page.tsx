import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AuditHistoryTable } from "@/components/audit-history-table"
import { DashboardStats } from "@/components/dashboard-stats"
import { Plus, FileText, Settings, Shield } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">AuditAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/audit" className="text-sm font-medium hover:text-primary transition-colors">
              New Audit
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
            <Link href="/audit">
              <Button className="gradient-bg">
                <Plus className="mr-2 h-4 w-4" />
                New Audit
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your smart contract security audits</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/docs">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Documentation
              </Button>
            </Link>
            <Link href="/audit">
              <Button className="gradient-bg">
                <Plus className="mr-2 h-4 w-4" />
                New Audit
              </Button>
            </Link>
          </div>
        </div>

        <DashboardStats />

        <Tabs defaultValue="recent" className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="recent">Recent Audits</TabsTrigger>
              <TabsTrigger value="all">All Audits</TabsTrigger>
              <TabsTrigger value="critical">Critical Issues</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Free Plan: 1/1 Audits Used Today
              </Badge>
              <Link href="/pricing">
                <Button variant="outline" size="sm">
                  Upgrade
                </Button>
              </Link>
            </div>
          </div>

          <TabsContent value="recent">
            <Card className="border-border/50 bg-black/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Audits</CardTitle>
                <CardDescription>Your most recent smart contract security audits</CardDescription>
              </CardHeader>
              <CardContent>
                <AuditHistoryTable limit={5} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card className="border-border/50 bg-black/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>All Audits</CardTitle>
                <CardDescription>Complete history of your smart contract security audits</CardDescription>
              </CardHeader>
              <CardContent>
                <AuditHistoryTable limit={10} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="critical">
            <Card className="border-border/50 bg-black/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Critical Issues</CardTitle>
                <CardDescription>Audits with critical security vulnerabilities that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <AuditHistoryTable limit={5} criticalOnly={true} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border/40 py-6 bg-black/30">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold">AuditAI</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <div>© {new Date().getFullYear()} AuditAI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
