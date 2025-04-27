"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Copy, Check } from "lucide-react"
import { motion } from "framer-motion"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export function CodeDiff() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const vulnerabilities = [
    {
      id: "V-001",
      title: "Reentrancy Vulnerability",
      severity: "critical",
      location: "Token.sol:156",
      original: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    
    balances[msg.sender] -= amount;
    emit Withdrawal(msg.sender, amount);
}`,
      fixed: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    balances[msg.sender] -= amount;
    
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    
    emit Withdrawal(msg.sender, amount);
}`,
      explanation:
        "Fixed the reentrancy vulnerability by updating the balance before making the external call, following the checks-effects-interactions pattern.",
    },
    {
      id: "V-002",
      title: "Unchecked External Call",
      severity: "critical",
      location: "Token.sol:203",
      original: `function notifyRewardAmount(uint256 reward) external {
    rewardRate = reward / DURATION;
    lastUpdateTime = block.timestamp;
    periodFinish = block.timestamp + DURATION;
    
    rewardsToken.transferFrom(msg.sender, address(this), reward);
    
    emit RewardAdded(reward);
}`,
      fixed: `function notifyRewardAmount(uint256 reward) external {
    rewardRate = reward / DURATION;
    lastUpdateTime = block.timestamp;
    periodFinish = block.timestamp + DURATION;
    
    bool success = rewardsToken.transferFrom(msg.sender, address(this), reward);
    require(success, "Token transfer failed");
    
    emit RewardAdded(reward);
}`,
      explanation: "Added a check for the success of the transferFrom call to prevent silent failures.",
    },
  ]

  return (
    <Tabs defaultValue={vulnerabilities[0].id} className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        {vulnerabilities.map((vuln) => (
          <TabsTrigger key={vuln.id} value={vuln.id}>
            <div className="flex items-center gap-2">
              {vuln.severity === "critical" && <AlertTriangle className="h-4 w-4 text-destructive" />}
              <span>{vuln.title}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {vulnerabilities.map((vuln) => (
        <TabsContent key={vuln.id} value={vuln.id}>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Badge variant="destructive">Critical</Badge>
              <span className="text-sm text-muted-foreground">
                Location: <code className="font-mono">{vuln.location}</code>
              </span>
            </div>

            <p className="text-sm">{vuln.explanation}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-border/50 glass">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Original Code</h3>
                    <motion.button
                      onClick={() => copyToClipboard(vuln.original, `${vuln.id}-original`)}
                      className="text-muted-foreground hover:text-foreground"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {copied === `${vuln.id}-original` ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </motion.button>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <SyntaxHighlighter
                      language="solidity"
                      style={atomDark}
                      customStyle={{
                        background: "rgba(0, 0, 0, 0.4)",
                        padding: "1rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      {vuln.original}
                    </SyntaxHighlighter>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 glass">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Fixed Code</h3>
                    <motion.button
                      onClick={() => copyToClipboard(vuln.fixed, `${vuln.id}-fixed`)}
                      className="text-muted-foreground hover:text-foreground"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {copied === `${vuln.id}-fixed` ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </motion.button>
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <SyntaxHighlighter
                      language="solidity"
                      style={atomDark}
                      customStyle={{
                        background: "rgba(0, 0, 0, 0.4)",
                        padding: "1rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      {vuln.fixed}
                    </SyntaxHighlighter>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
