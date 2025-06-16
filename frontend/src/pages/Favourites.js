import React, { useContext } from 'react';
import APODCard from '../components/APODCard';
import { FavouritesContext } from '../contexts/FavouritesContext';

function Favourites() {
  const { favourites, removeFavourite } = useContext(FavouritesContext);

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
            onDelete={() => removeFavourite(item.date)}
          />
        ))
      )}
    </div>
  );
}

export default Favourites;
