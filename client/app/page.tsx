"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import {
  ArrowRight,
  Shield,
  Zap,
  Code,
  FileCheck,
  Github,
  Upload,
} from "lucide-react";
import { FeatureCard } from "@/components/feature-card";
import { PricingCard } from "@/components/pricing-card";
import { MotionWrapper } from "@/components/animations/motion-wrapper";
import { StaggeredList } from "@/components/animations/staggered-list";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { DetailedSampleReport } from "@/components/detailed-sample-report";
import { AnimatedBackground } from "@/components/background/animated-background";
import { AuditFirmsSection } from "@/components/audit-firms-section";
import { VulnerabilitiesReference } from "@/components/vulnerabilities-reference";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: <Upload className="h-12 w-12" />,
      title: "Multiple Input Methods",
      description:
        "Paste code directly, upload .sol files or zip bundles, or connect to your GitHub repository.",
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Multi-Engine Analysis",
      description:
        "Static analysis with Slither, Mythril, and other industry-leading tools, enhanced by AI.",
    },
    {
      icon: <FileCheck className="h-12 w-12" />,
      title: "Comprehensive Reports",
      description:
        "Detailed vulnerability reports with severity classification and remediation suggestions.",
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "SecureScore™",
      description:
        "Get a 0-100 security score based on weighted vulnerability categories.",
    },
    {
      icon: <Code className="h-12 w-12" />,
      title: "Fix Suggestions",
      description:
        "AI-generated code diffs to help you remediate identified vulnerabilities.",
    },
    {
      icon: <Github className="h-12 w-12" />,
      title: "CI/CD Integration",
      description:
        "GitHub Actions and plugins for Hardhat/Foundry to automate security checks.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">AuditAI</span>
          </motion.div>
          <motion.nav
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#sample"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Audit
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#reference"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Learn
            </Link>
          </motion.nav>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/dashboard">
              <Button variant="outline" className="hidden sm:flex">
                Dashboard
              </Button>
            </Link>
            <Link href="/audit">
              <GradientButton>
                Start Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>
            </Link>
          </motion.div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-24 md:py-36 overflow-hidden">
          <AnimatedBackground />
          <div className="container relative z-10 flex flex-col items-center text-center">
            <MotionWrapper type="scale" delay={0.5} className="mb-8">
              <h1 className="text-7xl font-bold tracking-tight gradient-text mb-6 max-w-4xl">
                AuditAI
              </h1>
              <span className="text-4xl font-bold tracking-tight gradient-text max-w-4xl">
                AI-Powered Smart Contract Auditor
              </span>
            </MotionWrapper>
            <MotionWrapper type="fade" delay={0.4}>
              <p className="body-lg text-muted-foreground max-w-2xl mb-10">
                One-click audit that returns a comprehensive vulnerability
                report and a 0-100 SecureScore. Secure your blockchain projects
                with confidence.
              </p>
            </MotionWrapper>
            <MotionWrapper type="fade" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/audit">
                  <GradientButton size="lg" className="glow">
                    Start Free Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </GradientButton>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </section>

        <section id="features" className="py-24 bg-black/30 gradient-mesh">
          <div className="container">
            <ScrollReveal>
              <h2 className="heading-lg gradient-text text-center mb-16">
                Comprehensive Audit Features
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="sample" className="py-24 animated-gradient">
          <div className="container">
            <ScrollReveal>
              <h2 className="heading-lg gradient-text text-center mb-6">
                Interactive Audit Report
              </h2>
              <p className="body-md text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Our comprehensive reports provide actionable insights with clear
                vulnerability identification and remediation suggestions.
              </p>
            </ScrollReveal>

            <DetailedSampleReport />

            <div className="mt-12 text-center">
              <ScrollReveal delay={0.3}>
                <Link href="/audit">
                  <GradientButton size="lg">
                    Try It Yourself
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </GradientButton>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto glass rounded-xl p-8 md:p-12 shadow-soft border border-white/5">
                <h2 className="heading-md gradient-text mb-6">
                  Three Simple Analysis Options
                </h2>
                <p className="body-md text-muted-foreground mb-8">
                  Choose the analysis depth that fits your needs, from basic
                  checks to comprehensive security audits.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    className="gradient-border bg-black/40 p-6 rounded-lg"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="text-xl font-bold mb-4">Basic</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Slither</span>
                          <p className="text-sm text-muted-foreground">
                            Static analysis for common vulnerabilities
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">AI Enhancement</span>
                          <p className="text-sm text-muted-foreground">
                            Basic AI-powered analysis
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Fast Results</span>
                          <p className="text-sm text-muted-foreground">
                            Quick analysis in minutes
                          </p>
                        </div>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    className="gradient-border bg-black/40 p-6 rounded-lg shadow-glow"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-xs font-semibold">
                      Recommended
                    </div>
                    <h3 className="text-xl font-bold mb-4">Standard</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Slither + Mythril</span>
                          <p className="text-sm text-muted-foreground">
                            Combine static and dynamic analysis for thorough
                            security checks
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Advanced AI</span>
                          <p className="text-sm text-muted-foreground">
                            Enhanced AI analysis with fix suggestions
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Gas Optimization</span>
                          <p className="text-sm text-muted-foreground">
                            Includes gas usage optimization tips
                          </p>
                        </div>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    className="gradient-border bg-black/40 p-6 rounded-lg"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="text-xl font-bold mb-4">Comprehensive</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Full Suite</span>
                          <p className="text-sm text-muted-foreground">
                            All analysis engines including formal verification
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Deep AI Analysis</span>
                          <p className="text-sm text-muted-foreground">
                            In-depth AI security analysis
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Custom Detectors</span>
                          <p className="text-sm text-muted-foreground">
                            Project-specific vulnerability detection
                          </p>
                        </div>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="pricing" className="py-24">
          <div className="container">
            <ScrollReveal>
              <h2 className="heading-lg gradient-text text-center mb-16">
                Simple, Transparent Pricing
              </h2>
            </ScrollReveal>
            <StaggeredList
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              delay={0.2}
              staggerDelay={0.2}
            >
              <PricingCard
                title="Free"
                price="$0"
                description="Perfect for indie developers and small projects"
                features={[
                  "1 audit per day",
                  "Up to 500 lines of code",
                  "Public reports only",
                  "Basic vulnerability detection",
                  "SecureScore™ analysis",
                ]}
                buttonText="Start Free"
                buttonLink="/signup"
                popular={false}
              />
              <PricingCard
                title="Pro"
                price="$49"
                period="/month"
                description="For serious developers and small teams"
                features={[
                  "50 audits per month",
                  "Up to 10K lines of code",
                  "Private reports",
                  "CI/CLI integration",
                  "Advanced vulnerability detection",
                  "Fix suggestions with code diffs",
                  "API access",
                ]}
                buttonText="Upgrade to Pro"
                buttonLink="/signup/pro"
                popular={true}
              />
              <PricingCard
                title="Team"
                price="$199"
                period="/month"
                description="For development teams and organizations"
                features={[
                  "10 team members",
                  "Unlimited audits",
                  "Up to 50K lines of code",
                  "Private reports with sharing",
                  "Priority analysis",
                  "Custom detectors",
                  "Dedicated support",
                ]}
                buttonText="Get Team Plan"
                buttonLink="/signup/team"
                popular={false}
              />
            </StaggeredList>
            <ScrollReveal delay={0.6}>
              <div className="text-center mt-10">
                <Link href="/contact">
                  <Button variant="outline">
                    Contact us for Enterprise options
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="reference" className="py-24 bg-black/30 gradient-mesh">
          <VulnerabilitiesReference />
        </section>

        <section id="audit-firms" className="py-24">
          <AuditFirmsSection />
        </section>
      </main>

      <footer className="border-t border-white/5 py-10 bg-black/30">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold">AuditAI</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm text-muted-foreground">
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <div>
              © {new Date().getFullYear()} AuditAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
