import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function ProjectShape({ project, setActiveProject, setHoveredProject, isPaused }) {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!isPaused) {
      groupRef.current.rotation.y += delta * project.orbitSpeed;
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh 
        ref={meshRef}
        position={[project.orbitRadius, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setActiveProject(project);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredProject(project);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
          setHoveredProject(null);
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}