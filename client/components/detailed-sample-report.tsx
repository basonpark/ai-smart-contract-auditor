"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Zap,
  Code,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function DetailedSampleReport() {
  const [activeTab, setActiveTab] = useState("overview");
  const score = 78;
  const stakeholders: string[] = []; // Declared stakeholders variable

  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    if (score >= 50) return "text-orange-500";
    return "text-destructive";
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-white/5 glass shadow-glow overflow-hidden">
        <CardContent className="p-0">
          <div className="border-b border-white/5">
            <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">Token.sol Audit Report</h3>
                  <Badge variant="outline" className="text-xs">
                    Completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Audit ID: 123456 • April 24, 2025
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full">
                  <Shield className={cn("h-4 w-4", getScoreColor())} />
                  <span className={cn("font-medium", getScoreColor())}>
                    {score}
                  </span>
                  <span className="text-xs text-muted-foreground">/100</span>
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b border-white/5">
              <TabsList className="p-0 bg-transparent border-b-0 h-12">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="vulnerabilities"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12"
                >
                  Vulnerabilities
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12"
                >
                  Code Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="gas"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12"
                >
                  Gas Optimization
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-white/5">
                {/* Score Section */}
                <div className="p-6 border-r border-white/5 flex flex-col items-center justify-center">
                  <h4 className="text-lg font-bold mb-4 text-center">
                    SecureScore™
                  </h4>
                  <div
                    className="score-ring mb-4"
                    style={
                      { "--score-percent": `${score}%` } as React.CSSProperties
                    }
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Shield className={cn("h-8 w-8 mb-1", getScoreColor())} />
                      <span
                        className={cn("text-4xl font-bold", getScoreColor())}
                      >
                        {score}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /100
                      </span>
                    </div>
                  </div>
                  <p className={cn("font-medium", getScoreColor())}>Good</p>
                </div>

                {/* Vulnerabilities Summary */}
                <div className="p-6 border-r border-white/5">
                  <h4 className="text-lg font-bold mb-4">Vulnerabilities</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                        <span>Critical</span>
                      </div>
                      <Badge variant="destructive">2</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                        <span>High</span>
                      </div>
                      <Badge className="bg-orange-500">3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-yellow-500 mr-2" />
                        <span>Medium</span>
                      </div>
                      <Badge className="bg-yellow-500">5</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>Low</span>
                      </div>
                      <Badge className="bg-green-500">8</Badge>
                    </div>
                  </div>
                </div>

                {/* Gas Optimization Summary */}
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-4">Gas Optimization</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Potential Savings</span>
                        <span className="text-sm font-medium text-green-500">
                          ~32,500 gas
                        </span>
                      </div>
                      <Progress
                        value={65}
                        className="h-2 bg-white/10"
                        indicatorClassName="bg-green-500"
                      />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Optimizations Found</span>
                        <span>12</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span>High Impact</span>
                        <span>3</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span>Medium Impact</span>
                        <span>5</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span>Low Impact</span>
                        <span>4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Summary */}
              <div className="p-6">
                <h4 className="text-lg font-bold mb-4">Audit Summary</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  This smart contract audit identified several security issues
                  that should be addressed before deployment. The contract has 2
                  critical vulnerabilities related to reentrancy and unchecked
                  external calls, which could lead to fund loss. Additionally, 3
                  high severity issues were found, including integer overflow
                  and access control problems.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      Contract Type
                    </h5>
                    <p className="text-sm">ERC20 Token with Staking</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Code className="h-4 w-4 mr-2 text-primary" />
                      Solidity Version
                    </h5>
                    <p className="text-sm">0.8.19</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-primary" />
                      Analysis Engines
                    </h5>
                    <p className="text-sm">Slither, Mythril, Manticore</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vulnerabilities" className="m-0">
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2">
                    Critical Vulnerabilities
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    These issues must be fixed immediately as they pose
                    significant security risks.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Vulnerability 1 */}
                  <div className="border border-white/5 rounded-lg overflow-hidden">
                    <div className="bg-destructive/10 p-4 border-b border-white/5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                          <div>
                            <h5 className="font-bold">
                              Reentrancy Vulnerability
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              Token.sol:156
                            </p>
                          </div>
                        </div>
                        <Badge variant="destructive">Critical</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Description</h6>
                        <p className="text-sm text-muted-foreground">
                          The withdraw function is vulnerable to reentrancy
                          attacks because it performs an external call before
                          updating the user's balance. An attacker can exploit
                          this by creating a malicious contract that calls back
                          into the withdraw function before the balance is
                          updated.
                        </p>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Vulnerable Code</h6>
                        <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                          <pre className="text-muted-foreground">
                            {`function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    
    balances[msg.sender] -= amount;
    emit Withdrawal(msg.sender, amount);
}`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h6 className="font-medium mb-2">Recommended Fix</h6>
                        <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                          <div className="text-red-400">
                            - (bool success, ) = msg.sender.call
                            {"{value: amount}"}("");
                          </div>
                          <div className="text-red-400">
                            - require(success, "Transfer failed");
                          </div>
                          <div className="text-red-400">
                            - balances[msg.sender] -= amount;
                          </div>
                          <div className="text-green-400">
                            + balances[msg.sender] -= amount;
                          </div>
                          <div className="text-green-400">
                            + (bool success, ) = msg.sender.call
                            {"{value: amount}"}("");
                          </div>
                          <div className="text-green-400">
                            + require(success, "Transfer failed");
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          Follow the checks-effects-interactions pattern by
                          updating the state variables before making external
                          calls.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vulnerability 2 */}
                  <div className="border border-white/5 rounded-lg overflow-hidden">
                    <div className="bg-destructive/10 p-4 border-b border-white/5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                          <div>
                            <h5 className="font-bold">
                              Unchecked External Call
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              Token.sol:203
                            </p>
                          </div>
                        </div>
                        <Badge variant="destructive">Critical</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Description</h6>
                        <p className="text-sm text-muted-foreground">
                          The notifyRewardAmount function performs an external
                          call to transferFrom without checking the return
                          value. If the transfer fails, the function will
                          continue execution, potentially leading to
                          inconsistent state.
                        </p>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Vulnerable Code</h6>
                        <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                          <pre className="text-muted-foreground">
                            {`function notifyRewardAmount(uint256 reward) external {
    rewardRate = reward / DURATION;
    lastUpdateTime = block.timestamp;
    periodFinish = block.timestamp + DURATION;
    
    rewardsToken.transferFrom(msg.sender, address(this), reward);
    
    emit RewardAdded(reward);
}`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h6 className="font-medium mb-2">Recommended Fix</h6>
                        <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                          <div className="text-red-400">
                            - rewardsToken.transferFrom(msg.sender,
                            address(this), reward);
                          </div>
                          <div className="text-green-400">
                            + bool success =
                            rewardsToken.transferFrom(msg.sender, address(this),
                            reward);
                          </div>
                          <div className="text-green-400">
                            + require(success, "Token transfer failed");
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          Always check the return value of external calls and
                          handle potential failures appropriately.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="m-0">
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2">Code Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed analysis of the smart contract code structure and
                    quality.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-medium mb-3">Code Quality Metrics</h5>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Overall Quality</span>
                          <span className="text-sm font-medium text-yellow-500">
                            Medium
                          </span>
                        </div>
                        <Progress
                          value={65}
                          className="h-2 bg-white/10"
                          indicatorClassName="bg-yellow-500"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Readability</span>
                          <span className="text-sm font-medium text-green-500">
                            Good
                          </span>
                        </div>
                        <Progress
                          value={75}
                          className="h-2 bg-white/10"
                          indicatorClassName="bg-green-500"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Maintainability</span>
                          <span className="text-sm font-medium text-yellow-500">
                            Medium
                          </span>
                        </div>
                        <Progress
                          value={60}
                          className="h-2 bg-white/10"
                          indicatorClassName="bg-yellow-500"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Test Coverage</span>
                          <span className="text-sm font-medium text-orange-500">
                            Low
                          </span>
                        </div>
                        <Progress
                          value={30}
                          className="h-2 bg-white/10"
                          indicatorClassName="bg-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-medium mb-3">Contract Statistics</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Lines of Code
                        </p>
                        <p className="font-medium">342</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Functions
                        </p>
                        <p className="font-medium">18</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          State Variables
                        </p>
                        <p className="font-medium">12</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Events</p>
                        <p className="font-medium">6</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Modifiers
                        </p>
                        <p className="font-medium">3</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Inheritance
                        </p>
                        <p className="font-medium">2 contracts</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-white/5 rounded-lg overflow-hidden mb-6">
                  <div className="bg-black/30 p-4 border-b border-white/5">
                    <h5 className="font-medium">Contract Structure</h5>
                  </div>
                  <div className="p-4">
                    <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                      <pre className="text-muted-foreground">
                        {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    // State variables
    mapping(address => uint256) public balances;
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public rewards;
    
    uint256 public rewardRate;
    uint256 public lastUpdateTime;
    uint256 public periodFinish;
    
    uint256 private constant DURATION = 7 days;
    
    // Events
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    
    // Constructor
    constructor() ERC20("Reward Token", "RWT") {
        _mint(msg.sender, 1000000 * 10**18);
    }
    
    // Main functions
    function stake(uint256 amount) external { ... }
    function withdraw(uint256 amount) external { ... }
    function getReward() external { ... }
    function notifyRewardAmount(uint256 reward) external { ... }
    
    // View functions
    function earned(address account) public view returns (uint256) { ... }
    
    // Internal functions
    function _updateReward(address account) internal { ... }`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="border border-white/5 rounded-lg overflow-hidden">
                  <div className="bg-black/30 p-4 border-b border-white/5">
                    <h5 className="font-medium">Code Quality Issues</h5>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h6 className="font-medium flex items-center">
                          <Info className="h-4 w-4 text-yellow-500 mr-2" />
                          Floating Pragma
                        </h6>
                        <p className="text-sm text-muted-foreground mt-1">
                          Using ^0.8.0 allows the contract to be compiled with
                          any 0.8.x version, which may include bugs or different
                          behavior. Specify an exact version like 0.8.19.
                        </p>
                      </div>
                      <div>
                        <h6 className="font-medium flex items-center">
                          <Info className="h-4 w-4 text-yellow-500 mr-2" />
                          Missing Function Visibility
                        </h6>
                        <p className="text-sm text-muted-foreground mt-1">
                          Some functions don't explicitly declare visibility
                          (public, external, internal, private). Always specify
                          function visibility for better code clarity.
                        </p>
                      </div>
                      <div>
                        <h6 className="font-medium flex items-center">
                          <Info className="h-4 w-4 text-yellow-500 mr-2" />
                          Inconsistent Error Messages
                        </h6>
                        <p className="text-sm text-muted-foreground mt-1">
                          Error messages in require statements are inconsistent
                          in format and detail level. Standardize error messages
                          for better debugging and user experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gas" className="m-0">
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2">Gas Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Recommendations to reduce gas consumption and improve
                    contract efficiency.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Zap className="h-4 w-4 text-green-500 mr-2" />
                      Potential Gas Savings
                    </h5>
                    <p className="text-2xl font-bold text-green-500">~32,500</p>
                    <p className="text-sm text-muted-foreground">
                      gas units per transaction
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Zap className="h-4 w-4 text-yellow-500 mr-2" />
                      Deployment Cost
                    </h5>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">3,245,678</p>
                      <p className="text-sm text-muted-foreground">gas units</p>
                    </div>
                    <p className="text-sm text-green-500 mt-1">
                      -15% potential reduction
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Zap className="h-4 w-4 text-primary mr-2" />
                      Optimizations Found
                    </h5>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">
                      issues with optimization potential
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Gas Optimization 1 */}
                  <div className="border border-white/5 rounded-lg overflow-hidden">
                    <div className="bg-green-500/10 p-4 border-b border-white/5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <h5 className="font-bold">
                              Use uint256 instead of uint8
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              Token.sol:25
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">High Impact</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Description</h6>
                        <p className="text-sm text-muted-foreground">
                          Using uint8, uint16, uint32, etc. for state variables
                          does not save gas and actually costs more due to
                          additional conversion operations. The EVM operates on
                          256-bit words, so smaller types use the same storage
                          but require extra gas for packing and unpacking.
                        </p>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Current Code</h6>
                        <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                          <pre className="text-muted-foreground">
                            {`uint8 public decimals;
uint8 private _taxFee;
uint8 private _burnFee;`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h6 className="font-medium mb-2">Recommended Change</h6>
                        <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                          <div className="text-red-400">
                            - uint8 public decimals;
                          </div>
                          <div className="text-red-400">
                            - uint8 private _taxFee;
                          </div>
                          <div className="text-red-400">
                            - uint8 private _burnFee;
                          </div>
                          <div className="text-green-400">
                            + uint256 public decimals;
                          </div>
                          <div className="text-green-400">
                            + uint256 private _taxFee;
                          </div>
                          <div className="text-green-400">
                            + uint256 private _burnFee;
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-sm text-muted-foreground">
                            Estimated gas savings:
                          </p>
                          <p className="text-sm font-medium text-green-500">
                            ~2,000 gas per transaction
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gas Optimization 2 */}
                  <div className="border border-white/5 rounded-lg overflow-hidden">
                    <div className="bg-green-500/10 p-4 border-b border-white/5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <h5 className="font-bold">
                              Cache Array Length in For Loops
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              Staking.sol:142
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-blue-500">Medium Impact</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Description</h6>
                        <p className="text-sm text-muted-foreground">
                          Reading array length at each iteration of a for-loop
                          consumes more gas than caching it in a local variable.
                          This is especially important for loops that iterate
                          over large arrays.
                        </p>
                      </div>
                      <div className="mb-4">
                        <h6 className="font-medium mb-2">Current Code</h6>
                        <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                          <pre className="text-muted-foreground">
                            {`for (uint i = 0; i < stakeholders.length; i++) {
    address stakeholder = stakeholders[i];
    uint256 reward = calculateReward(stakeholder);
    rewards[stakeholder] = reward;
}`}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h6 className="font-medium mb-2">Recommended Change</h6>
                        <div className="bg-black/40 rounded-md p-3 text-xs font-mono overflow-auto">
                          <div className="text-red-400">
                            - for (uint i = 0; i {"<"} stakeholders.length; i++){" "}
                          </div>
                          <div className="text-green-400">
                            + uint256 stakeholdersLength = stakeholders.length;
                          </div>
                          <div className="text-green-400">
                            + for (uint256 i = 0; i {"<"} stakeholdersLength;
                            i++){" "}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-sm text-muted-foreground">
                            Estimated gas savings:
                          </p>
                          <p className="text-sm font-medium text-green-500">
                            ~200 gas per iteration
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
