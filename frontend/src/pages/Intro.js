import React, { useEffect } from 'react';
import SpaceBackground from '../components/SpaceBackground';
import '../pages/Intro.css';

function Intro() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 컴포넌트 언마운트 시 원복
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="intro-page">
      <SpaceBackground />

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

      <div className="intro-text">
        {/* <p>
          Discover a new piece of the cosmos every day with NASA's Astronomy Picture of the Day.<br />
          Browse stunning images and videos, filter by date or type, and save your cosmic favorites.
        </p>
        <p className="tagline">✨ Start your journey beyond the stars today.</p> */}
      </div>
    </div>
  );
}

export default Intro;
