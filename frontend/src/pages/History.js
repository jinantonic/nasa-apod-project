import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import './History.css';
import { X } from 'lucide-react';

function History() {
  const { history, removeFromHistory, showModal, modalMessage, showModalHandler, closeModal } = useContext(GlobalContext);
  const [sortOrder, setSortOrder] = useState('recent');
  const navigate = useNavigate();

  const sortedHistory = [...history];
  if (sortOrder === 'dateAsc') {
    sortedHistory.sort((a, b) => new Date(a) - new Date(b));
  }

  const handleRemove = (date) => {
    removeFromHistory(date);

    showModalHandler({
      title: '🗑️ History Removed 🗑️',
      message: (
        <>
          You've removed <span style={{ fontWeight: 'bold', color: '#27548A' }}>{date}</span> from your history.
        </>
      ),
    });
  };

  return (
    <div className="app-container history-page">
      <h1>🕓 Recently Viewed</h1>
      <p className="app-container-info">
        The <strong>recorded dates</strong> in your history are those you clicked directly on the <strong>HOME page</strong> or viewed on the <strong>detail page</strong>.
      </p>

      <div className="sort-buttons">
        <button
          type="button" 
          className={sortOrder === 'recent' ? 'active' : ''}
          onClick={() => setSortOrder('recent')}
        >
          Recent First
        </button>
        <button
          type="button"
          className={sortOrder === 'dateAsc' ? 'active' : ''}
          onClick={() => setSortOrder('dateAsc')}
        >
          Oldest First
        </button>
      </div>

      {sortedHistory.length === 0 ? (
        <p className="app-container-info">You haven't viewed any dates yet. Click on a date to explore and start your journey!</p>
      ) : (
        <ul className="history-list">
          {sortedHistory.map(date => (
            <li key={date} className="history-item">
              <span
                onClick={() => navigate(`/home?date=${date}`)}
                className="history-date"
              >
                {date}
              </span>
              <button
                type="button"
                className="delete-button"
                onClick={() => handleRemove(date)}
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalMessage.title}</h2>
            <p>{modalMessage.message}</p>
            <button type="button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
