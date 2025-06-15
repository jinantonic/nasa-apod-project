import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
        Home
      </NavLink>
      <NavLink to="/favourites" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Favourites
      </NavLink>
    </nav>
  );
}

export default NavBar;
