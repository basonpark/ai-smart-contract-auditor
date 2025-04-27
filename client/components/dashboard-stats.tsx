import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Zap, CheckCircle2 } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-border/50 bg-black/20 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average SecureScore™</CardTitle>
          <CardDescription>Across all audits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold">76</span>
            <span className="text-sm text-muted-foreground ml-1">/100</span>
            <span className="text-sm text-green-500 ml-auto">↑ 12%</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-black/20 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
          <CardDescription>Requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
            <span className="text-2xl font-bold">3</span>
            <span className="text-sm text-muted-foreground ml-1">issues</span>
            <span className="text-sm text-destructive ml-auto">↑ 1 new</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-black/20 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Gas Optimizations</CardTitle>
          <CardDescription>Potential savings identified</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold">24</span>
            <span className="text-sm text-muted-foreground ml-1">suggestions</span>
            <span className="text-sm text-green-500 ml-auto">↑ 8 new</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-black/20 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
          <CardDescription>Completed security audits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-2xl font-bold">7</span>
            <span className="text-sm text-muted-foreground ml-1">audits</span>
            <span className="text-sm text-green-500 ml-auto">↑ 3 this month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
