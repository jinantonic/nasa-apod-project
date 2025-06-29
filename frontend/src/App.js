import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Intro from './pages/Intro';
import Home from './pages/Home';
import APODArchive from './pages/APODArchive';
import Favourites from './pages/Favourites';
import History from './pages/History';
import { GlobalContext } from './contexts/GlobalContext';
import './App.css';

function AppContent() {
  const { darkMode } = useContext(GlobalContext);

  // Apply dark mode class if enabled
  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <NavBar />
        <div className="app-container">
          {/* Define app routes */}
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/apodarchive" element={<APODArchive />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default AppContent;
