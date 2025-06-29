import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // Dark mode state, initialized from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Sync darkMode state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Favorites state, initialized from localStorage
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('favourites');
    return stored ? JSON.parse(stored) : [];
  });

  // Modal state (open/close and message)
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', message: '' });

  // Open modal with given title and message
  const showModalHandler = ({ title, message }) => {
    setModalMessage({ title, message });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage({ title: '', message: '' });
  };

  // Add item to favorites
  const addFavourite = (item) => {
    if (favourites.find(fav => fav.date === item.date)) return;
    const updated = [...favourites, item];
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
    showModalHandler({
      title: '⭐ Favorites ⭐',
      message: (
          <>
            <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{item.title}</span> has been added your favorites!
          </>
        ),
    });
  };

  const removeFavourite = (date) => {
    const updated = favourites.filter(item => item.date !== date);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  // Search history state, initialized from localStorage
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('history');
    return stored ? JSON.parse(stored) : [];
  });

  const addToHistory = (date) => {
    if (!date) return;
    if (history[0] === date) return;
    const updated = [date, ...history.filter(d => d !== date)].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('history', JSON.stringify(updated));
  };

  const removeFromHistory = (date) => {
    const updated = history.filter(d => d !== date);
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
      addToHistory,
      removeFromHistory,
      showModal,
      modalMessage,
      showModalHandler,
      closeModal,
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
