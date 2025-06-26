import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { GlobalContext } from '../contexts/GlobalContext';  // ThemeContext → GlobalContext로 변경

function NavBar() {
  const { darkMode, toggleDarkMode } = useContext(GlobalContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" className="nav-link" end>
          Intro
        </NavLink>
        <NavLink to="/home" className="nav-link" end>
          Home
        </NavLink>
        <NavLink to="/apodarchive" className="nav-link">
          APOD Archive
        </NavLink>
        <NavLink to="/favourites" className="nav-link">
          Favourites
        </NavLink>
        <NavLink to="/history" className="nav-link">
          History
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
