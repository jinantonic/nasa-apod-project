import React, { useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import APODCard from '../components/APODCard';
import Modal from '../components/Modal';
import './Favourites.css';

function Favourites() {
  const { favourites, removeFavourite } = useContext(GlobalContext);

  const [sortOption, setSortOption] = useState('latest');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });


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

  const handleDelete = (date, title) => {
    removeFavourite(date);

    setModalContent({
      title: 'Removed!',
      message: `"${title}" has been removed from your favourites!`
    });
    setModalOpen(true);
  };


  return (
    <div className="app-container">
      <h1>⭐ Your Favourites</h1>

      {favourites.length > 0 && (
        <div className="sort-buttons">
          <button
            type="button" 
            className={sortOption === 'latest' ? 'active' : ''}
            onClick={() => setSortOption('latest')}
          >
            Latest First
          </button>
          <button
            type="button" 
            className={sortOption === 'oldest' ? 'active' : ''}
            onClick={() => setSortOption('oldest')}
          >
            Oldest First
          </button>
          <button
            type="button" 
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
            onDelete={handleDelete}
          />
        ))
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
}

export default Favourites;
