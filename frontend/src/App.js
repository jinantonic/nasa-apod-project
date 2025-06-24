import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import MediaFilter from './pages/MediaFilter';

import Favourites from './pages/Favourites';
import History from './pages/History';
import { GlobalProvider, GlobalContext } from './contexts/GlobalContext';
import './App.css';

function AppContent() {
  const { darkMode } = useContext(GlobalContext);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mediafilter" element={<MediaFilter />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}

export default App;
