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

  // 🕓 검색 히스토리
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('history');
    return stored ? JSON.parse(stored) : [];
  });

  const addToHistory = (date) => {
    if (!date) return;
    if (history[0] === date) return;
    const updated = [date, ...history.filter(d => d !== date)].slice(0, 10); // 최대 10개 유지
    setHistory(updated);
    localStorage.setItem('history', JSON.stringify(updated));
  };

  return (
    <GlobalContext.Provider value={{
      darkMode,
      toggleDarkMode,
      favourites,
      addFavourite,
      removeFavourite,
      history,
      addToHistory
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
