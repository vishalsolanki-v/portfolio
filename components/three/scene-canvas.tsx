"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

export function SceneCanvas({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  )
}
