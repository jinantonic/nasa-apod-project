import React from 'react';
import '../pages/Intro.css';

function SpaceBackground() {
    const orbits = [
        { className: 'orbit1', color: '#FB3640' },
        { className: 'orbit2', color: '#FF7F00' },
        { className: 'orbit3', color: '#FFF455' },
        { className: 'orbit4', color: '#06D001' },
        { className: 'orbit5', color: '#00D7FF' },
        { className: 'orbit6', color: '#0079FF' },
        { className: 'orbit7', color: '#793FDF' }
  ];

  return (
    <div className="space-scene">
      <div className="milky-way"></div>
      <div className="sun"></div>
      {orbits.map(({ className, color }, index) => (
        <div key={index} className={`orbit ${className}`} style={{ borderColor: color }}>
          <div className="planet" style={{ backgroundColor: color }}></div>
        </div>
      ))}
      {[...Array(500)].map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        return <div key={i} className="star" style={{ top: `${top}%`, left: `${left}%` }}></div>;
      })}
    </div>
  );
}

export default SpaceBackground;
