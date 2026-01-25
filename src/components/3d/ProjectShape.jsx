import { useState, useRef } from 'react'
import { Html, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function ProjectShape({ project, setActiveProject }) {
  const [hovered, setHover] = useState(false)
  const planetRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * project.orbitSpeed;
    // Planets move in a perfect circle based on the project's unique radius
    planetRef.current.position.x = Math.cos(t) * project.orbitRadius;
    planetRef.current.position.z = Math.sin(t) * project.orbitRadius;
  })

  return (
    <group>
      {/* VISUAL ORBIT LINE - Placed at 0,0,0 so it stays centered around the sun */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[project.orbitRadius - 0.05, project.orbitRadius + 0.05, 128]} />
        <meshBasicMaterial color="white" opacity={0.1} transparent />
      </mesh>

      {/* THE ACTUAL PLANET */}
      <group ref={planetRef}>
        <Float speed={3} rotationIntensity={1.5} floatIntensity={0.8}>
          <mesh
            onClick={() => setActiveProject(project)}
            onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto' }}
            scale={hovered ? 1.3 : 1}
          >
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
              color={project.color} 
              roughness={0.2} 
              metalness={0.9} 
              emissive={project.color}
              emissiveIntensity={hovered ? 0.8 : 0.2}
            />
            
            {hovered && (
              <Html distanceFactor={15} position={[0, 2, 0]} center>
                <div style={{ 
                  color: 'white', 
                  background: 'black', 
                  padding: '8px 16px', 
                  border: `1px solid ${project.color}`,
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxShadow: `0 0 20px ${project.color}`
                }}>
                  {project.title.toUpperCase()}
                </div>
              </Html>
            )}
          </mesh>
        </Float>
      </group>
    </group>
  )
}