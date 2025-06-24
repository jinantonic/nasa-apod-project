import React, { useState } from 'react';
import APODCard from '../components/APODCard';
import './MediaFilter.css';

function MediaFilter() {
  const [mediaType, setMediaType] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const minDate = '1995-06-16';
  const maxDate = new Date().toISOString().split('T')[0];

  const handleSearch = async () => {
    setError(null);

    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      setResults([]);
      return;
    }
    if (startDate > endDate) {
      setError('Start date must be before end date.');
      setResults([]);
      return;
    }
    if (startDate < minDate) {
      setError(`Start date cannot be earlier than ${minDate}.`);
      setResults([]);
      return;
    }
    if (endDate > maxDate) {
      setError(`End date cannot be later than today (${maxDate}).`);
      setResults([]);
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const dates = [];
      let current = new Date(startDate);
      const end = new Date(endDate);
      while (current <= end) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }

      const fetches = dates.map(date =>
        fetch(`http://localhost:5001/apod?date=${date}`).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch date ${date}`);
          return res.json();
        })
      );
      let dataList = await Promise.all(fetches);

      if (mediaType !== 'all') {
        dataList = dataList.filter(item => item.media_type === mediaType);
      }

      setResults(dataList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🎞️ Media Filter</h1>

      <div className="filter-controls">
        <label>
          Media Type
          <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
            <option value="all">All</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>

        <label>
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            min={minDate}
            max={maxDate}
          />
        </label>

        <label>
          End Date
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            min={minDate}
            max={maxDate}
          />
        </label>

        {/* ✅ 버튼도 label처럼 감싸기 */}
        <label className="search-button-label">
          <span style={{ visibility: 'hidden' }}>Search</span> {/* 정렬용 label 제목 */}
          <button onClick={handleSearch}>Search</button>
        </label>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="results-list">
        {results.length === 0 && !loading && !error && (
          <p>No results to show. Please use the search above.</p>
        )}
        {results.map(item => (
          <div key={item.date} className="result-card-wrapper">
            <APODCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaFilter;
