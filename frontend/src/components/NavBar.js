import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar({ darkMode, setDarkMode }) {
  const toggleMode = () => setDarkMode(prev => !prev);

  return (
    <nav className="navbar">
      <div>
        <NavLink to="/" className="nav-link" end>
          Home
        </NavLink>
        <NavLink to="/favourites" className="nav-link">
          Favourites
        </NavLink>
      </div>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleMode} />
          <span className="slider"></span>
        </label>
        <span className="toggle-label">{darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
      </div>
    </nav>
  );
}

export default NavBar;
