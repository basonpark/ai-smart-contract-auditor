"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function AdvancedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let time = 0
    const speed = 0.0005

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGradient = () => {
      time += speed

      const width = canvas.width
      const height = canvas.height

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)

      // Animated color stops
      const color1 = `rgba(139, 92, 246, ${0.1 + 0.05 * Math.sin(time)})`
      const color2 = `rgba(236, 72, 153, ${0.1 + 0.05 * Math.sin(time + 1)})`
      const color3 = `rgba(99, 102, 241, ${0.1 + 0.05 * Math.sin(time + 2)})`

      gradient.addColorStop(0, color1)
      gradient.addColorStop(0.5, color2)
      gradient.addColorStop(1, color3)

      // Draw gradient
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw animated blobs
      drawBlob(ctx, width * 0.3, height * 0.3, 150 + 50 * Math.sin(time * 0.8), color1)
      drawBlob(ctx, width * 0.7, height * 0.6, 180 + 40 * Math.sin(time * 0.7 + 1), color2)
      drawBlob(ctx, width * 0.5, height * 0.8, 200 + 60 * Math.sin(time * 0.6 + 2), color3)

      animationFrameId.current = requestAnimationFrame(drawGradient)
    }

    const drawBlob = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
      ctx.beginPath()

      // Create a blob shape using bezier curves
      const points = 6
      const angleStep = (Math.PI * 2) / points

      for (let i = 0; i <= points; i++) {
        const angle = i * angleStep + time
        const distortion = 0.2 + 0.1 * Math.sin(time * 2 + i)

        const currX = x + radius * (1 + distortion * Math.sin(i * 2)) * Math.cos(angle)
        const currY = y + radius * (1 + distortion * Math.cos(i * 3)) * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(currX, currY)
        } else {
          const prevAngle = (i - 1) * angleStep + time
          const prevDistortion = 0.2 + 0.1 * Math.sin(time * 2 + (i - 1))

          const prevX = x + radius * (1 + prevDistortion * Math.sin((i - 1) * 2)) * Math.cos(prevAngle)
          const prevY = y + radius * (1 + prevDistortion * Math.cos((i - 1) * 3)) * Math.sin(prevAngle)

          const cpX1 = prevX + (currX - prevX) * 0.5 - (currY - prevY) * 0.2
          const cpY1 = prevY + (currY - prevY) * 0.5 + (currX - prevX) * 0.2

          ctx.quadraticCurveTo(cpX1, cpY1, currX, currY)
        }
      }

      ctx.closePath()

      // Create radial gradient for the blob
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, color.replace(/[\d.]+\)$/, "0.4)"))
      gradient.addColorStop(1, color.replace(/[\d.]+\)$/, "0.0)"))

      ctx.fillStyle = gradient
      ctx.fill()
    }

    window.addEventListener("resize", handleResize)

    handleResize()
    drawGradient()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}
