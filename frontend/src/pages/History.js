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
    <div className="history-container">
      <h1>🕓 Recently Viewed</h1>

      <div className="sort-buttons">
        <button
          className={sortOrder === 'recent' ? 'active' : ''}
          onClick={() => setSortOrder('recent')}
        >
          Recent First
        </button>
        <button
          className={sortOrder === 'dateAsc' ? 'active' : ''}
          onClick={() => setSortOrder('dateAsc')}
        >
          Oldest First
        </button>
      </div>

      {sortedHistory.length === 0 ? (
        <p>No recently viewed items.</p>
      ) : (
        <ul className="history-list">
          {sortedHistory.map(date => (
            <li key={date} className="history-item">
              <span
                onClick={() => navigate(`/?date=${date}`)}
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
