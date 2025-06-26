import React from 'react';
import './Intro.css';

function Intro() {
  return (
    <div className="intro-page">
      <h1>🌌 Welcome to NASA APOD Explorer</h1>
      <p>
        Browse NASA's Astronomy Picture of the Day. Filter by media type or date,
        and save your favourites!
      </p>
      <div className="space-animation">
        {/* Optional: Add Lottie/SVG/star animations here later */}
        <p>✨ Explore the universe one day at a time.</p>
      </div>
    </div>
  );
}

export default Intro;
