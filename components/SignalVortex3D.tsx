"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

type SignalVortex3DProps = {
    onReady: () => void
}

const BLADE_SAMPLES = 120

function createSpiralBladeGeometry() {
    const centers: THREE.Vector2[] = []

    for (let sample = 0; sample <= BLADE_SAMPLES; sample += 1) {
        const t = sample / BLADE_SAMPLES
        const angle = -0.34 + (t * Math.PI * 1.34)
        const radius = 4.25 - (t * 3.48) + (Math.sin(t * Math.PI) * 0.1)

        centers.push(new THREE.Vector2(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
        ))
    }

    const outside: THREE.Vector2[] = []
    const inside: THREE.Vector2[] = []

    centers.forEach((point, index) => {
        const previous = centers[Math.max(0, index - 1)]
        const next = centers[Math.min(centers.length - 1, index + 1)]
        const tangent = next.clone().sub(previous).normalize()
        const normal = new THREE.Vector2(-tangent.y, tangent.x)
        const t = index / BLADE_SAMPLES
        const halfWidth = 0.018 + (Math.pow(Math.sin(t * Math.PI), 0.62) * 0.66)

        outside.push(point.clone().addScaledVector(normal, halfWidth))
        inside.push(point.clone().addScaledVector(normal, -halfWidth))
    })

    const shape = new THREE.Shape(outside)
    inside.reverse().forEach((point) => shape.lineTo(point.x, point.y))
    shape.closePath()

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.22,
        bevelEnabled: true,
        bevelSegments: 5,
        bevelSize: 0.055,
        bevelThickness: 0.06,
        curveSegments: 12,
    })
    geometry.translate(0, 0, -0.11)
    geometry.computeVertexNormals()

    return geometry
}

function VortexScene() {
    const group = useRef<THREE.Group>(null)
    const geometry = useMemo(() => createSpiralBladeGeometry(), [])

    useEffect(() => () => geometry.dispose(), [geometry])

    useFrame(({ clock, pointer }, delta) => {
        if (!group.current) return

        const elapsed = clock.getElapsedTime()
        const targetRotationX = -0.14 + (Math.cos(elapsed * 0.28) * 0.045) - (pointer.y * 0.04)
        const targetRotationY = (Math.sin(elapsed * 0.25) * 0.08) + (pointer.x * 0.065)
        const pulse = 0.52 + (Math.sin(elapsed * 0.52) * 0.012)

        group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotationX, 2.8, delta)
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotationY, 2.8, delta)
        group.current.rotation.z = elapsed * 0.052
        group.current.position.x = 2.4 + (Math.sin(elapsed * 0.2) * 0.04)
        group.current.position.y = 1.65 + (Math.sin(elapsed * 0.34) * 0.04)
        group.current.scale.setScalar(pulse)

        group.current.children.forEach((child, index) => {
            child.position.z = Math.sin((elapsed * 0.58) + (index * 2.1)) * 0.12
        })
    })

    return (
        <>
            <ambientLight intensity={2.1} />
            <directionalLight position={[-3, 6, 8]} color="#ffffff" intensity={3.2} />
            <pointLight position={[4, 1, 5]} color="#00d8ff" intensity={42} distance={16} />
            <pointLight position={[-2, -2, 4]} color="#1557ff" intensity={28} distance={14} />

            <group ref={group}>
                {[
                    { color: '#125bf0', emissive: '#0744cf', rotation: 0, opacity: 0.78 },
                    { color: '#138cf4', emissive: '#076fd1', rotation: (Math.PI * 2) / 3, opacity: 0.7 },
                    { color: '#31c9f7', emissive: '#079dcf', rotation: (Math.PI * 4) / 3, opacity: 0.62 },
                ].map((blade, index) => (
                    <mesh
                        key={blade.color}
                        geometry={geometry}
                        rotation={[0, 0, blade.rotation]}
                        renderOrder={index + 1}
                    >
                        <meshStandardMaterial
                            color={blade.color}
                            emissive={blade.emissive}
                            emissiveIntensity={0.34}
                            roughness={0.28}
                            metalness={0}
                            transparent
                            opacity={blade.opacity}
                            depthWrite={false}
                        />
                    </mesh>
                ))}
            </group>
        </>
    )
}

export default function SignalVortex3D({ onReady }: SignalVortex3DProps) {
    const container = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (!container.current || !('IntersectionObserver' in window)) return

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin: '160px' },
        )
        observer.observe(container.current)

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={container}
            aria-hidden="true"
            className="absolute inset-0"
            data-testid="signal-vortex-webgl"
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 30 }}
                dpr={[1, 1.5]}
                frameloop={isVisible ? 'always' : 'never'}
                gl={{
                    alpha: false,
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#edf4ff', 1)
                    gl.toneMapping = THREE.ACESFilmicToneMapping
                    gl.toneMappingExposure = 1.16
                    onReady()
                }}
            >
                <VortexScene />
            </Canvas>
        </div>
    )
}
