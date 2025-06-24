import React, { useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import APODCard from '../components/APODCard';
import './Favourites.css';

function Favourites() {
  const { favourites, removeFavourite } = useContext(GlobalContext);
  const [sortOption, setSortOption] = useState('latest');

  const sortedFavourites = [...favourites].sort((a, b) => {
    if (sortOption === 'latest') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortOption === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="app-container">
      <h1>⭐ Your Favourites</h1>

      {favourites.length > 0 && (
        <div className="sort-controls">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest">🆕 Latest First</option>
            <option value="oldest">📜 Oldest First</option>
            <option value="title">🔤 Title (A-Z)</option>
          </select>
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
            onDelete={() => removeFavourite(item.date)}
          />
        ))
      )}
    </div>
  );
}

export default Favourites;
