"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function Particles({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const valueAt = (seed: number) => {
      const value = Math.sin(seed * 12.9898) * 43758.5453
      return value - Math.floor(value)
    }

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (valueAt(i * 3 + 1) - 0.5) * 12
      arr[i * 3 + 1] = (valueAt(i * 3 + 2) - 0.5) * 6
      arr[i * 3 + 2] = (valueAt(i * 3 + 3) - 0.5) * 8
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.2
    if (points.current) {
      points.current.rotation.y = t
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={"#3b82f6"} transparent opacity={0.7} depthWrite={false} />
    </points>
  )
}
