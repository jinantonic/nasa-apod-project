import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import './App.css';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { FavouritesProvider } from './contexts/FavouritesContext';

function App() {
  return (
    <ThemeProvider>
      <FavouritesProvider>
        <ThemeContext.Consumer>
          {({ darkMode }) => (
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
          )}
        </ThemeContext.Consumer>
      </FavouritesProvider>
    </ThemeProvider>
  );
}

export default App;
