import React, { useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import APODCard from '../components/APODCard';
import './Favourites.css';

function Favourites() {
  const { favourites, removeFavourite } = useContext(GlobalContext);

  const [sortOption, setSortOption] = useState('latest');

  const sortedFavourites = [...favourites].sort((a, b) => {
    switch (sortOption) {
      case 'latest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="app-container">
      <h1>⭐ Your Favourites</h1>

      {favourites.length > 0 && (
        <div className="sort-buttons">
          <button
            className={sortOption === 'latest' ? 'active' : ''}
            onClick={() => setSortOption('latest')}
          >
            Latest First
          </button>
          <button
            className={sortOption === 'oldest' ? 'active' : ''}
            onClick={() => setSortOption('oldest')}
          >
            Oldest First
          </button>
          <button
            className={sortOption === 'title' ? 'active' : ''}
            onClick={() => setSortOption('title')}
          >
            Title (A-Z)
          </button>
        </div>
      )}

      {favourites.length === 0 ? (
        <p>You have no favourites yet. Go explore and add some!</p>
      ) : (
        sortedFavourites.map(item => (
          <APODCard
            key={item.date}
            data={item}
            showAddButton={false}
            showDeleteButton={true}
            onDelete={removeFavourite}
          />
        ))
      )}
    </div>
  );
}

export default Favourites;
