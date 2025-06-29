import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import './History.css';
import { X } from 'lucide-react';

function History() {
  const { history, removeFromHistory } = useContext(GlobalContext);
  const [sortOrder, setSortOrder] = useState('recent'); // recent | dateAsc
  const navigate = useNavigate();

  const sortedHistory = [...history];
  if (sortOrder === 'dateAsc') {
    sortedHistory.sort((a, b) => new Date(a) - new Date(b));
  }

  return (
    <div className="app-container">
      <h1>🕓 Recently Viewed</h1>
      <p className="history-info">
        The dates recorded in the history are those you clicked on directly from the HOME page or viewed on the detail page.
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
        <p className="history-info">You haven't viewed any dates yet. Click on a date to explore and start your journey!</p>
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
                className="delete-button"
                onClick={() => removeFromHistory(date)}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
