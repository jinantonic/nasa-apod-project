import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import './App.css';
import { GlobalProvider, GlobalContext } from './context/GlobalContext';

function AppContent() {
  const { darkMode } = useContext(GlobalContext);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
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
