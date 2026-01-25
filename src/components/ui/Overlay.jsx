import React from 'react'

export default function Overlay({ activeProject, setActiveProject }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ pointerEvents: 'auto' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem', letterSpacing: '8px', fontFamily: 'monospace' }}>
          {activeProject ? `[ SYSTEM_LANDED: ${activeProject.title} ]` : '[ DEEP_SPACE_NETWORK ]'}
        </h1>
      </div>

      {activeProject && (
        <div style={{ alignSelf: 'center', pointerEvents: 'auto' }}>
          <button 
            onClick={() => setActiveProject(null)}
            style={{
              padding: '20px 60px',
              background: 'transparent',
              color: 'cyan',
              border: '2px solid cyan',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0 0 20px rgba(0,255,255,0.3)'
            }}
          >
            RETURN_TO_ORBIT
          </button>
        </div>
      )}
    </div>
  )
}