import React, { useState, useEffect, useRef } from 'react';
import APODCard from '../components/APODCard';
import './MediaFilter.css';

function MediaFilter() {
  const [mediaType, setMediaType] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [videoDatesWithTitles, setVideoDatesWithTitles] = useState([]);
  const [showVideoDates, setShowVideoDates] = useState(false);
  const [loadingVideoTitles, setLoadingVideoTitles] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);

  const minDate = '1995-06-16';
  const maxDate = new Date().toISOString().split('T')[0];
  const videoDates = [
    '2018-11-01', '2019-04-10', '2020-07-25', '2021-02-18',
    '2022-06-21', '2023-03-11', '2024-05-09',
  ];

  useEffect(() => {
    const fetchTitles = async () => {
      setLoadingVideoTitles(true);
      try {
        const fetches = videoDates.map(async (date) => {
          const res = await fetch(`http://localhost:5001/apod?date=${date}`);
          const data = await res.json();
          return { date, title: data.title || '(no title)' };
        });
        const results = await Promise.all(fetches);
        setVideoDatesWithTitles(results);
      } catch (err) {
        console.error('Failed to fetch video titles', err);
      } finally {
        setLoadingVideoTitles(false);
      }
    };
    fetchTitles();
  }, []);

  const handleSearch = async () => {
    setHasSearched(true);
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

      const fetches = dates.map(async (date) => {
        const res = await fetch(`http://localhost:5001/apod?date=${date}`);
        if (!res.ok) throw new Error(`Failed to fetch data for ${date}`);
        const data = await res.json();
        return data.code === 404 ? null : data;
      });

      let dataList = await Promise.all(fetches);
      dataList = dataList.filter(item => item !== null);

      if (mediaType !== 'all') {
        dataList = dataList.filter(item => item.media_type === mediaType);
      }

      if (dataList.length === 0) {
        setError('No data available for this date.');
      }

      setResults(dataList);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (event, date) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    });
    setSelectedDate(date);
  };

  const applyDate = (type) => {
    if (type === 'start') {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
    setSelectedDate(null);
    handleSearch();
  };

  // 팝업 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setSelectedDate(null);
      }
    };
    if (selectedDate) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedDate]);

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

        <label className="search-button-label">
          <span style={{ visibility: 'hidden' }}>Search</span>
          <button onClick={handleSearch}>Search</button>
        </label>
      </div>

      <div className="video-dates-toggle" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={() => setShowVideoDates(prev => !prev)}>
          {showVideoDates ? '⬆️ Hide Sample Video Dates' : '⬇️ Show Sample Video Dates'}
        </button>
      </div>

      <div className={`video-dates-section ${showVideoDates ? 'open' : ''}`} aria-hidden={!showVideoDates}>
        <div className="video-dates-content">
          <p>
            These dates include <strong>video content</strong> from NASA's APOD archive.
          </p>

          {loadingVideoTitles ? (
            <ul className="skeleton-list">
              {videoDates.map((date) => (
                <li key={date} className="skeleton-item" />
              ))}
            </ul>
          ) : (
            <ul>
              {videoDatesWithTitles.map(({ date, title }) => (
                <li
                  key={date}
                  onClick={(e) => handleDateClick(e, date)}
                  style={{ cursor: 'pointer' }}
                >
                  <strong>{date}</strong>: {title}
                </li>
              ))}
            </ul>
          )}

          {/* 🎯 팝업 UI 삽입 */}
          {selectedDate && (
            <div
              ref={popupRef}
              className="date-popup"
              style={{
                position: 'absolute',
                top: popupPosition.top,
                left: popupPosition.left,
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '8px',
                zIndex: 1000,
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            >
              <p style={{ margin: '0 0 4px' }}><strong>{selectedDate}</strong></p>
              <button onClick={() => applyDate('start')}>Add to Start Date</button>
              <button onClick={() => applyDate('end')}>Add to End Date</button>
            </div>
          )}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && (
        <div className="error-card">
          <h2>⚠️ WARNING ⚠️</h2>
          <p>{error}</p>
        </div>
      )}

      <div className="results-list">
        {results.length === 0 && !loading && !error && hasSearched && (
          <p className="no-results">No results to show. Please use the search above.</p>
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
