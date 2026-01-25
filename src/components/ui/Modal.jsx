import React from 'react'

export default function Modal({ project, onClose }) {
  if (!project) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{ borderBottom: `2px solid ${project.color}`, paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: 'white', fontFamily: 'monospace' }}>{project.title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
        </div>

        <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>{project.description}</p>

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: 'white', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>TECH STACK</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {project.technologies.map(tech => (
              <span key={tech} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', color: project.color, fontSize: '0.75rem', border: `1px solid ${project.color}44` }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <a href={project.githubUrl} target="_blank" rel="noreferrer" style={btnStyle(project.color)}>VIEW SOURCE CODE</a>
        </div>
      </div>
    </div>
  )
}

const overlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, pointerEvents: 'auto' };
const modalStyle = { background: '#111', border: '1px solid #333', padding: '30px', borderRadius: '8px', maxWidth: '450px', width: '90%' };
const btnStyle = (color) => ({ display: 'block', textAlign: 'center', padding: '12px', background: color, color: 'black', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', fontSize: '0.9rem' });