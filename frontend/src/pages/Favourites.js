import React, { useEffect, useState } from 'react';
import APODCard from '../components/APODCard';

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favourites');
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  // 삭제 함수
  const handleDelete = (date) => {
    const updated = favourites.filter(item => item.date !== date);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  return (
    <div className="app-container">
      <h1>⭐ Your Favourites</h1>

      {favourites.length === 0 ? (
        <p>You have no favourites yet. Go explore and add some!</p>
      ) : (
        favourites.map(item => (
          <APODCard
            key={item.date}
            data={item}
            showAddButton={false}
            showDeleteButton={true}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Favourites;
