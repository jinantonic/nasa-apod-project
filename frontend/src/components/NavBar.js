import React, { useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';
import { GlobalContext } from '../contexts/GlobalContext';  // ThemeContext → GlobalContext로 변경

function NavBar() {
  const { darkMode, toggleDarkMode } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    if (location.pathname === path) {
      // 이미 그 페이지면 새로고침
      window.location.reload();
    } else {
      // 다른 페이지면 이동
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
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
          {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
