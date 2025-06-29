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
        히스토리에 기록되는 날짜는 HOME 페이지에서 사용자가 직접 클릭하거나 상세 페이지에서 본 날짜입니다.
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
        <p>아직 본 날짜가 없습니다. 관심 있는 날짜를 클릭해 탐색해 보세요!</p>
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
