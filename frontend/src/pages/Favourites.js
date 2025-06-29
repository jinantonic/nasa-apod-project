import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import APODCard from '../components/APODCard';
import './Favourites.css';

function Favourites() {
  const { favourites, removeFavourite } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get('sort') || 'latest';
  const [sortOption, setSortOption] = useState(initialSort);

  useEffect(() => {
    setSearchParams({ sort: sortOption });
  }, [sortOption, setSearchParams]);

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
        <div className="sort-controls">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            aria-label="Sort favourites"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="latest" aria-label="Latest first">🆕 Latest First</option>
            <option value="oldest" aria-label="Oldest first">📜 Oldest First</option>
            <option value="title" aria-label="Title A to Z">🔤 Title (A-Z)</option>
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
            onDelete={removeFavourite}
          />
        ))
      )}
    </div>
  );
}

export default Favourites;
