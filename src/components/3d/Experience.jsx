import { Stars, Sparkles } from '@react-three/drei'
import ProjectShape from './ProjectShape'
import { resumeData } from '../../data'

export default function Experience({ projects, setActiveProject, setHoveredProject, isPaused }) {
  return (
    <>
      <Stars radius={150} depth={50} count={8000} factor={4} fade speed={1} />
      <Sparkles count={400} scale={[60, 60, 60]} size={1.5} color="#ffaa00" speed={0.3} />
      
      <mesh 
        onClick={() => setActiveProject(resumeData)}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
          setHoveredProject(resumeData);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
          setHoveredProject(null);
        }}
      >
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial color="#ff3300" emissive="#ff0000" emissiveIntensity={10} toneMapped={false} />
        <pointLight intensity={15} distance={100} color="#ff6600" />
      </mesh>

      {projects.map((p, i) => (
        <ProjectShape 
          key={p.title + i} 
          project={p} 
          setActiveProject={setActiveProject} 
          setHoveredProject={setHoveredProject} 
          isPaused={isPaused} 
        />
      ))}
    </>
  )
}