import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import './History.css';

function History() {
  const { history, removeFromHistory } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleClick = (date) => {
    navigate(`/?date=${date}`);
  };

  return (
    <div className="app-container">
      <h1>🕘 Recently Viewed</h1>
      {history.length === 0 ? (
        <p>You haven't viewed any dates yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((date) => (
            <li key={date} className="history-item">
              <span onClick={() => handleClick(date)} className="date-text">
                {date}
              </span>
              <button
                className="delete-button"
                onClick={() => removeFromHistory(date)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
