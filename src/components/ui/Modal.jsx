import React from 'react';

export default function Modal({ project, onClose }) {
  if (!project) return null;

  const primaryBtn = (color) => ({
    display: 'block',
    width: '100%',
    textAlign: 'center',
    padding: '12px',
    background: color,
    color: '#000',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    cursor: 'pointer'
  });

  return (
    <div 
      style={{ 
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', 
        backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', zIndex: 1000, padding: '20px' 
      }} 
      onClick={onClose}
    >
      <div 
        style={{ 
          background: '#111', border: `1px solid ${project.color}44`, 
          padding: '30px', borderRadius: '8px', maxWidth: '500px', 
          width: '100%', boxShadow: `0 0 30px ${project.color}22` 
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ borderBottom: `2px solid ${project.color}`, paddingBottom: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, color: 'white', fontFamily: 'monospace' }}>{project.title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.8rem' }}>×</button>
        </div>

        <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>{project.description}</p>

        <div style={{ margin: '25px 0' }}>
          <h4 style={{ color: 'white', marginBottom: '12px', fontSize: '0.8rem', letterSpacing: '2px', opacity: 0.8 }}>
            {project.isResume ? "DOCUMENT_SECTIONS" : "TECH_STACK"}
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {/* Logic to choose which array to map */}
            {(project.isResume ? project.highlights : project.technologies).map((item) => (
              <span key={item} style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '4px', color: project.color, fontSize: '0.75rem', border: `1px solid ${project.color}44`, fontFamily: 'monospace' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <a 
          href={project.isResume ? project.resumeUrl : project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={primaryBtn(project.color)}
        >
          {project.isResume ? "VIEW FULL RESUME" : "VIEW SOURCE CODE"}
        </a>
      </div>
    </div>
  );
}