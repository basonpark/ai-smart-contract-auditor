"use client"

import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonLink: string
  popular?: boolean
}

export function PricingCard({
  title,
  price,
  period = "",
  description,
  features,
  buttonText,
  buttonLink,
  popular = false,
}: PricingCardProps) {
  return (
    <motion.div
      className={cn(
        "relative p-8 rounded-xl transition-all duration-300 shadow-soft",
        popular
          ? "gradient-border glow bg-black/40 backdrop-blur-sm scale-105 border-white/10"
          : "border border-white/5 bg-black/20 backdrop-blur-sm",
      )}
      whileHover={{
        y: -10,
        boxShadow: popular ? "0 20px 40px -5px rgba(139, 92, 246, 0.3)" : "0 15px 30px -5px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {popular && (
        <motion.div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-xs font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Most Popular
        </motion.div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-end justify-center gap-1">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground mb-1">{period}</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-start"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Check className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </motion.li>
        ))}
      </ul>
      <Link href={buttonLink} className="block">
        {popular ? (
          <GradientButton className="w-full">{buttonText}</GradientButton>
        ) : (
          <Button className="w-full bg-secondary hover:bg-secondary/80">{buttonText}</Button>
        )}
      </Link>
    </motion.div>
  )
}
