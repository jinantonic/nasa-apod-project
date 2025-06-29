import React, { useEffect } from 'react';
import SpaceBackground from '../components/SpaceBackground';
import '../pages/Intro.css';

function Intro() {
  useEffect(() => {
    // Lock scroll on mount and unlock on unmount
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="intro-page">
      {/* Background animation component */}
      <SpaceBackground /> 

      {/* SVG text orbit animation */}
      <svg className="orbit-svg" viewBox="0 0 500 500">
        <defs>
          <path
            id="orbitPath"
            d="
                M 250, 250 
                m -200, 0
                a 200,200 0 1,1 400,0
                a 200,200 0 1,1 -400,0
              "
          />
        </defs>
        <text className="orbit-text">
          <textPath href="#orbitPath" startOffset="0%">
            🌌  Explore  NASA's  APOD:   Your Daily Dose of Stunning Space Images & Videos          🌠  Explore  NASA's  APOD:   Your Daily Dose of Stunning Space Images & Videos       
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default Intro;
