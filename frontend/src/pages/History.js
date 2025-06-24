import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import './History.css';

function History() {
  const { history } = useContext(GlobalContext);
  const navigate = useNavigate();

  if (history.length === 0) {
    return <p>No recently viewed dates yet.</p>;
  }

  return (
    <div className="history-container">
      <h1>🕒 Recently Viewed Dates</h1>
      <div className="history-list">
        {history.map(date => (
          <button
            key={date}
            className="history-item"
            onClick={() => navigate(`/?date=${date}`)}
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
}

export default History;
