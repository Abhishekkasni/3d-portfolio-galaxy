import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Experience from './components/3d/Experience'
import Modal from './components/ui/Modal'
import { GITHUB_USERNAME, socialLinks } from './data'

export default function App() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`)
      .then(res => res.json())
      .then(data => {
        // Filter out forks and map to our planet format
        const formattedProjects = data
          .filter(repo => !repo.fork)
          .map((repo, index) => ({
            title: repo.name,
            description: repo.description || "A GitHub Open Source Project",
            technologies: [repo.language || "Code"],
            // Random vibrant colors
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            // Space them out progressively
            orbitRadius: 10 + (index * 5), 
            orbitSpeed: 0.5 - (index * 0.05),
            githubUrl: repo.html_url
          }));
        setProjects(formattedProjects);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching repos:", err));
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000', overflow: 'hidden' }}>
      {loading && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 50, fontFamily: 'monospace' }}>
          INITIALIZING_SYSTEM_SCAN...
        </div>
      )}

      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 25, 40]} fov={50} />
          <OrbitControls enablePan={false} minDistance={10} maxDistance={80} makeDefault dampingFactor={0.05} />
          
          {/* Pass the dynamic projects list here */}
          <Experience projects={projects} setActiveProject={setActiveProject} />
          
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={2.5} color="#fff" />
        </Suspense>
      </Canvas>

      <Modal project={activeProject} onClose={() => setActiveProject(null)} />

      <div style={{ position: 'absolute', top: 40, left: 40, color: 'white', pointerEvents: 'none' }}>
        <h1 style={{ margin: 0, fontSize: '2.2rem', fontFamily: 'monospace' }}>{GITHUB_USERNAME.toUpperCase()}</h1>
        <p style={{ color: '#4ade80', letterSpacing: '4px', fontSize: '0.8rem' }}>LIVE_GITHUB_GALAXY</p>
      </div>

      <footer style={footerStyle}>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href={socialLinks.github} target="_blank" rel="noreferrer" style={linkStyle}>GITHUB</a>
          <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" style={linkStyle}>LINKEDIN</a>
        </div>
      </footer>
    </div>
  )
}

const footerStyle = { position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '30px 40px', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' };
const linkStyle = { color: 'white', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'monospace', pointerEvents: 'auto' };