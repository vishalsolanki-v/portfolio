"use client"

import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type * as THREE from "three"

export function FloatingShapes() {
  const grp = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (grp.current) {
      grp.current.rotation.y = t * 0.15
      grp.current.position.y = Math.sin(t * 0.8) * 0.2
    }
  })
  return (
    <group ref={grp}>
      <mesh position={[-1.8, 0.2, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color={"#6366f1"} metalness={0.3} roughness={0.2} />
      </mesh>
      <mesh position={[0.8, -0.4, 0.2]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={"#8b5cf6"} metalness={0.25} roughness={0.25} />
      </mesh>
      <mesh position={[2.2, 0.6, -0.5]} rotation={[0.5, 0.2, 0.1]}>
        <torusGeometry args={[0.7, 0.22, 16, 100]} />
        <meshStandardMaterial color={"#3b82f6"} metalness={0.35} roughness={0.2} />
      </mesh>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
    </group>
  )
}
