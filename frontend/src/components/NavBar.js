import React, { useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import './NavBar.css';

function NavBar() {
  const { darkMode, toggleDarkMode } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle navigation link clicks
  const handleClick = (path) => {
    if (location.pathname === path) {
      window.location.reload(); // Reload the page if already on the same path
    } else {
      navigate(path); // Navigate to a different page
    }
  };

  return (
    <nav className={`navbar ${location.pathname === '/' ? 'intro-navbar' : darkMode ? 'dark' : ''}`}>
      <div className="nav-left">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleClick('/')}
        >
          Intro
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleClick('/home')}
        >
          Home
        </NavLink>
        <NavLink
          to="/apodarchive"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleClick('/apodarchive')}
        >
          APOD Archive
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleClick('/favourites')}
        >
          Favourites
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleClick('/history')}
        >
          History
        </NavLink>
      </div>
      <div className="nav-right">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
        <span className="toggle-label">
          {darkMode ? <>Galaxy Mode&nbsp;&nbsp;&nbsp;&nbsp;🪐</> : <>Solar Mode&nbsp;&nbsp;&nbsp;&nbsp;☀️</>}
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
