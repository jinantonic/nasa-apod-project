import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // 다크모드 상태
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('favourites');
    return stored ? JSON.parse(stored) : [];
  });

  // 모달 상태 (객체 형태로 title과 message 관리)
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', message: '' });

  // 모달 열기 함수 (객체 받음)
  const showModalHandler = ({ title, message }) => {
    setModalMessage({ title, message });
    setShowModal(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
    setModalMessage({ title: '', message: '' });
  };

  const addFavourite = (item) => {
    if (favourites.find(fav => fav.date === item.date)) return;
    const updated = [...favourites, item];
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
    showModalHandler({
      title: '⭐ Favorites ⭐',
      message: `"${item.title}"has been added to your favorites!`,
    });
  };

  const removeFavourite = (date) => {
    const updated = favourites.filter(item => item.date !== date);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  // 검색 히스토리 상태
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
