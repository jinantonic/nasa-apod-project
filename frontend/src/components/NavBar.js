import React, { useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';
import { GlobalContext } from '../contexts/GlobalContext';

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
        <NavLink to="/" className="nav-link" onClick={() => handleClick('/')}>Intro</NavLink>
        <NavLink to="/home" className="nav-link" onClick={() => handleClick('/home')}>Home</NavLink>
        <NavLink to="/apodarchive" className="nav-link" onClick={() => handleClick('/apodarchive')}>APOD Archive</NavLink>
        <NavLink to="/favourites" className="nav-link" onClick={() => handleClick('/favourites')}>Favourites</NavLink>
        <NavLink to="/history" className="nav-link" onClick={() => handleClick('/history')}>History</NavLink>
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
