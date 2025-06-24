import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // Theme 상태
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Favourites 상태
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('favourites');
    return stored ? JSON.parse(stored) : [];
  });

  const addFavourite = (item) => {
    if (favourites.find(fav => fav.date === item.date)) return;
    const updated = [...favourites, item];
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  const removeFavourite = (date) => {
    const updated = favourites.filter(item => item.date !== date);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  return (
    <GlobalContext.Provider value={{
      darkMode,
      toggleDarkMode,
      favourites,
      addFavourite,
      removeFavourite
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
