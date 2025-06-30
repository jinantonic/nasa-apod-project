import React, { useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import APODCard from '../components/APODCard';
import Modal from '../components/Modal';
import './Favourites.css';

function Favourites() {
  // Access favourites list and removal function from global context
  const { favourites, removeFavourite } = useContext(GlobalContext);

  // State for sorting option and modal control
  const [sortOption, setSortOption] = useState('latest');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  // Sort favourites based on selected option
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

  // Handle removing favourite and show modal confirmation
  const handleDelete = (date, title) => {
    removeFavourite(date);

    setModalContent({
      title: '🗑️ Favorites Removed 🗑️',
      message: (
        <>
          You've removed <span style={{ fontWeight: 'bold', color: '#27548A' }}>{title}</span> from your favorites.
        </>
      ),
    });
    setModalOpen(true);
  };


  return (
    <div className="app-container favourites-page">
      <h1>⭐ Your Favourites</h1>
      <p className="history-info">
        These are the <strong>APODs</strong> you marked as your <strong>favorites</strong>. Enjoy revisiting your cosmic picks anytime!
      </p>

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
