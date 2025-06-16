import React, { createContext, useState } from 'react';

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
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
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}
