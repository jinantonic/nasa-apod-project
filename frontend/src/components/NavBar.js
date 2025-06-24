import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { ThemeContext } from '../contexts/ThemeContext';

function NavBar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" className="nav-link" end>
          Home
        </NavLink>
        <NavLink to="/favourites" className="nav-link">
          Favourites
        </NavLink>
      </div>
      <div className="nav-right">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
        <span className="toggle-label">
          {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
