import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Experience from './components/3d/Experience';
import Modal from './components/ui/Modal';
import Navbar from './components/ui/Navbar';
import { GITHUB_USERNAME } from './data';

function App() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null); // HUD State
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.filter(repo => !repo.fork).map((repo, index) => ({
          title: repo.name,
          description: repo.description || "Open Source Project",
          technologies: [repo.language || "Code"],
          color: `hsl(${index * 45}, 80%, 60%)`,
          orbitRadius: 14 + (index * 4),
          orbitSpeed: 0.4 - (index * 0.04),
          githubUrl: repo.html_url
        }));
        setProjects(formatted);
      })
      .finally(() => setTimeout(() => setLoading(false), 1000));

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div className="loader">SYSTEM_INITIALIZING...</div>;

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }}>
      <Navbar />

      {/* GLOBAL HUD - Shows name of hovered planet */}
      {hoveredProject && (
        <div style={{
          position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)',
          color: hoveredProject.color, fontFamily: 'monospace', fontSize: isMobile ? '1rem' : '1.8rem',
          fontWeight: 'bold', letterSpacing: '6px', zIndex: 1500, pointerEvents: 'none',
          textShadow: `0 0 15px ${hoveredProject.color}`, textAlign: 'center', width: '100%'
        }}>
          {hoveredProject.title.toUpperCase()}
        </div>
      )}

      {/* CONTROLS */}
      <button 
        onClick={() => setIsPaused(!isPaused)}
        style={{
          position: 'fixed', bottom: '30px', left: '30px', zIndex: 2000,
          background: 'rgba(255,255,255,0.05)', color: 'white',
          border: `1px solid ${isPaused ? '#ff3300' : 'rgba(255,255,255,0.2)'}`,
          padding: '12px 20px', borderRadius: '4px', cursor: 'pointer',
          fontFamily: 'monospace', backdropFilter: 'blur(10px)'
        }}
      >
        {isPaused ? "▶ RESUME" : "⏸ PAUSE"}
      </button>

      <Canvas camera={{ position: [0, 20, isMobile ? 60 : 40], fov: isMobile ? 75 : 45 }}>
        <ambientLight intensity={0.4} />
        <Experience 
          projects={projects} 
          setActiveProject={setActiveProject} 
          setHoveredProject={setHoveredProject} 
          isPaused={isPaused} 
        />
        <OrbitControls enablePan={false} maxDistance={120} minDistance={10} />
      </Canvas>

      {activeProject && <Modal project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  );
}

export default App;