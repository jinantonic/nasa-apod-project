import React from 'react';
import SpaceBackground from '../components/SpaceBackground';  // 위치는 본인 폴더 구조에 맞게 조정
import '../pages/Intro.css';

function Intro() {
  return (
    <div className="intro-page">
        <SpaceBackground />
        <div className="intro-text">
            <h1>🌌 Welcome to NASA APOD Explorer</h1>
            <p>
            Browse NASA's Astronomy Picture of the Day.<br />
            Filter by media type or date, and save your favourites!
            </p>
            <p className="tagline">✨ Explore the universe one day at a time.</p>
        </div>
        </div>
    );
}

export default Intro;
