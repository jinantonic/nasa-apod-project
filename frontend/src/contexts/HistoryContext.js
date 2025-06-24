import React, { createContext, useState, useEffect } from 'react';

export const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('viewedDates');
    return stored ? JSON.parse(stored) : [];
  });

  const addViewedDate = (date) => {
    setHistory(prev => {
      const newHistory = [date, ...prev.filter(d => d !== date)].slice(0, 10);
      localStorage.setItem('viewedDates', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <HistoryContext.Provider value={{ history, addViewedDate }}>
      {children}
    </HistoryContext.Provider>
  );
}
