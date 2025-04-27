"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Vulnerability {
  id: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
  example: string
  remediation: string
  category: string
}

export function VulnerabilitiesReference() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const vulnerabilities: Vulnerability[] = [
    {
      id: "SWC-107",
      title: "Reentrancy",
      severity: "critical",
      description:
        "A vulnerability where a contract calls an external function that can call back into the original function, potentially leading to unexpected behavior and fund theft.",
      example: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
    balances[msg.sender] -= amount;
}`,
      remediation:
        "Follow the checks-effects-interactions pattern: update state variables before making external calls.",
      category: "Security",
    },
    {
      id: "SWC-115",
      title: "Authorization Through tx.origin",
      severity: "critical",
      description:
        "Using tx.origin for authorization allows phishing attacks, as tx.origin is the original sender of a transaction, not the immediate caller.",
      example: `function transferOwnership(address newOwner) public {
    require(tx.origin == owner);
    owner = newOwner;
}`,
      remediation: "Use msg.sender instead of tx.origin for authorization checks.",
      category: "Security",
    },
    {
      id: "SWC-101",
      title: "Integer Overflow and Underflow",
      severity: "high",
      description:
        "Arithmetic operations that exceed the range of the data type, causing unexpected behavior. Solidity 0.8.0+ includes built-in overflow checks.",
      example: `// In Solidity < 0.8.0
function transfer(address to, uint256 amount) external {
    balances[msg.sender] -= amount;
    balances[to] += amount;
}`,
      remediation:
        "Use SafeMath library for Solidity < 0.8.0 or upgrade to Solidity 0.8.0+ which has built-in overflow checks.",
      category: "Security",
    },
    {
      id: "SWC-105",
      title: "Unprotected Ether Withdrawal",
      severity: "high",
      description: "Functions that allow anyone to withdraw Ether from the contract without proper access controls.",
      example: `function withdrawFunds() public {
    msg.sender.transfer(address(this).balance);
}`,
      remediation: "Add proper access controls to withdrawal functions using modifiers like onlyOwner.",
      category: "Security",
    },
    {
      id: "SWC-112",
      title: "Delegatecall to Untrusted Callee",
      severity: "high",
      description:
        "Using delegatecall to call functions from an address controlled by the user can lead to the execution of malicious code in the context of the calling contract.",
      example: `function delegateTransfer(address _to, uint256 _amount, address _impl) public {
    (bool success,) = _impl.delegatecall(
        abi.encodeWithSignature("transfer(address,uint256)", _to, _amount)
    );
    require(success);
}`,
      remediation:
        "Avoid using delegatecall with user-supplied addresses. If necessary, implement a whitelist of trusted contracts.",
      category: "Security",
    },
    {
      id: "SWC-104",
      title: "Unchecked Call Return Value",
      severity: "medium",
      description:
        "Failing to check the return value of a low-level call can lead to silent failures and unexpected behavior.",
      example: `function withdraw(uint256 amount) public {
    msg.sender.call{value: amount}("");
    balances[msg.sender] -= amount;
}`,
      remediation: "Always check the return value of low-level calls and handle failures appropriately.",
      category: "Security",
    },
    {
      id: "SWC-103",
      title: "Floating Pragma",
      severity: "low",
      description:
        "Using a floating pragma (^0.8.0) allows contracts to be compiled with different compiler versions, which may introduce bugs or different behavior.",
      example: `pragma solidity ^0.8.0;

contract FloatingPragma {
    // Contract code
}`,
      remediation: "Lock the pragma to a specific compiler version, e.g., pragma solidity 0.8.17;",
      category: "Best Practice",
    },
    {
      id: "G-001",
      title: "Unnecessary SLOAD",
      severity: "low",
      description: "Reading from storage multiple times when it could be cached in memory increases gas costs.",
      example: `function updateValues() public {
    // Each access to state reads from storage
    value1 = value1 + 1;
    value2 = value2 + value1;
    value3 = value3 + value2;
}`,
      remediation: "Cache storage variables in memory when accessed multiple times in a function.",
      category: "Gas Optimization",
    },
    {
      id: "G-002",
      title: "Inefficient Loop",
      severity: "low",
      description:
        "Inefficient loop patterns that consume unnecessary gas, such as reading array length in each iteration.",
      example: `function processArray(uint[] memory data) public {
    for (uint i = 0; i < data.length; i++) {
        // Process data
    }
}`,
      remediation: "Cache array length outside the loop to save gas.",
      category: "Gas Optimization",
    },
  ]

  const filteredVulnerabilities = vulnerabilities.filter((vuln) => {
    const matchesSearch =
      vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.id.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "security") return matchesSearch && vuln.category === "Security"
    if (activeTab === "gas") return matchesSearch && vuln.category === "Gas Optimization"
    if (activeTab === "best-practices") return matchesSearch && vuln.category === "Best Practice"

    return matchesSearch && vuln.severity === activeTab
  })

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      case "high":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "medium":
        return <Info className="h-5 w-5 text-yellow-500" />
      case "low":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container py-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="heading-lg gradient-text mb-4">Common Smart Contract Vulnerabilities</h2>
        <p className="body-md text-muted-foreground max-w-2xl mx-auto">
          A comprehensive reference of common vulnerabilities found in Solidity smart contracts, with examples and
          remediation strategies.
        </p>
      </motion.div>

      <Card className="border-white/5 glass shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vulnerabilities..."
                className="pl-9 bg-black/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-3 md:grid-cols-7">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="critical">Critical</TabsTrigger>
                <TabsTrigger value="high">High</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="low">Low</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="gas">Gas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {filteredVulnerabilities.length > 0 ? (
                filteredVulnerabilities.map((vuln) => (
                  <motion.div
                    key={vuln.id}
                    className="border border-white/5 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`p-4 border-b border-white/5 bg-${vuln.severity === "critical" ? "destructive" : vuln.severity === "high" ? "orange-500" : vuln.severity === "medium" ? "yellow-500" : "green-500"}/10`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getSeverityIcon(vuln.severity)}
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold">{vuln.title}</h5>
                              <span className="text-sm text-muted-foreground">{vuln.id}</span>
                            </div>
                            <Badge variant="outline" className="mt-1 bg-black/20">
                              {vuln.category}
                            </Badge>
                          </div>
                        </div>
                        {getSeverityBadge(vuln.severity)}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Description</h6>
                        <p className="text-sm text-muted-foreground">{vuln.description}</p>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Vulnerable Code Example</h6>
                        <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                          <pre className="text-muted-foreground">{vuln.example}</pre>
                        </div>
                      </div>
                      <div>
                        <h6 className="font-medium mb-2">Remediation</h6>
                        <p className="text-sm text-muted-foreground">{vuln.remediation}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No vulnerabilities found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
