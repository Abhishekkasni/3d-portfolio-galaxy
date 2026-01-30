import React from 'react';
import { socialLinks } from '../../data';

export default function Navbar() {
  const containerStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    zIndex: 2000,
    boxSizing: 'border-box',
    pointerEvents: 'none' // Allows clicking the 3D scene behind the empty space
  };

  const nameStyle = {
    color: 'white',
    fontFamily: 'monospace',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    letterSpacing: '3px',
    margin: 0,
    pointerEvents: 'auto',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '15px',
    pointerEvents: 'auto'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.7rem',
    fontFamily: 'monospace',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    letterSpacing: '1px'
  };

  return (
    <div style={containerStyle}>
      <div style={nameStyle}>
        ABHISHEK KASNI
      </div>
      
      <div style={navLinksStyle}>
        <a href={socialLinks.github} target="_blank" rel="noreferrer" style={linkStyle} className="nav-link">
          GITHUB
        </a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" style={linkStyle} className="nav-link">
          LINKEDIN
        </a>
      </div>
    </div>
  );
}