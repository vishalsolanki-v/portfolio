"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function Particles({ count = 200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
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
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={"#3b82f6"} transparent opacity={0.7} depthWrite={false} />
    </points>
  )
}
