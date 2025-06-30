import React, { useState, useEffect, useRef, useContext } from 'react';
import APODCard from '../components/APODCard';
import Loading from '../components/Loading';
import { GlobalContext } from '../contexts/GlobalContext';
import './APODArchive.css';
import '../components/APODCard.css';

function APODArchive() {
  // Destructure global context values and functions
  const { favourites, addFavourite, showModal, modalMessage, showModalHandler, closeModal } = useContext(GlobalContext);

  const [mediaType, setMediaType] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // States related to sample video dates and their titles
  const [videoDatesWithTitles, setVideoDatesWithTitles] = useState([]);
  const [showVideoDates, setShowVideoDates] = useState(false);
  const [loadingVideoTitles, setLoadingVideoTitles] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);
  const abortControllerRef = useRef(null);

  const minDate = '1995-06-16';
  const maxDate = new Date().toISOString().split('T')[0];
  const videoDates = [
    '2018-11-01', '2019-04-10', '2020-03-03', '2020-07-25', 
    '2021-02-18', '2022-06-21', '2023-03-11', '2024-05-09',
  ];

  // Calculate difference in days between two dates
  const getDateDiff = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return Math.ceil((e - s) / (1000 * 60 * 60 * 24));
  };

  // Disable search if date range exceeds 30 days
  const dateRangeTooLong = startDate && endDate && getDateDiff(startDate, endDate) > 30;

  // Fetch titles for sample video dates on mount
  useEffect(() => {
    const fetchTitles = async () => {
      setLoadingVideoTitles(true);
      try {
        const fetches = videoDates.map(async (date) => {
          const res = await fetch(`http://localhost:5001/api/apod?date=${date}`);
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

  const handleMediaTypeChange = (e) => {
    setMediaType(e.target.value);
  };

  // Auto search when mediaType changes and dates are set
  useEffect(() => {
    if (startDate && endDate) {
      handleSearch();
    }
  }, [mediaType]);

  // Perform search with validation and data fetching
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
    if (getDateDiff(startDate, endDate) > 30) {
      setError('Date range cannot exceed 30 days.');
      setResults([]);
      return;
    }

    // Abort ongoing fetches to avoid race conditions
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setResults([]);

    // Generate array of dates between startDate and endDate inclusive
    try {
      const dates = [];
      let current = new Date(startDate);
      const end = new Date(endDate);
      while (current <= end) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }

      // Fetch APOD data concurrently for all dates
      const fetches = dates.map(async (date) => {
        const res = await fetch(`http://localhost:5001/api/apod?date=${date}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`No data is available for ${date}`);
        const data = await res.json();
        return data.code === 404 ? null : data;
      });

      let dataList = await Promise.all(fetches);
      dataList = dataList.filter(item => item !== null);

      // Filter results by media type if applicable
      if (mediaType !== 'all') {
        dataList = dataList.filter(item => item.media_type === mediaType);
      }

      if (dataList.length === 0) {
        if (mediaType === 'image') {
          setError('No image content is available for the selected date range.');
        } else if (mediaType === 'video') {
          setError('No video content is available for the selected date range.');
        } else {
          setError('No data is available for the selected date range.');
        }
      }
      setResults(dataList);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Show popup for selecting sample video date as start or end date
  const handleDateClick = (event, date) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    });
    setSelectedDate(date);
  };

  // Apply selected sample date to start or end date input
  const applyDate = (type) => {
    if (type === 'start') {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
    setSelectedDate(null);
  };

  // Close popup if clicking outside of it
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

  // Add item to favourites if not already added, else show modal warning
  const handleAddFavourite = (item) => {
    if (favourites.some(fav => fav.date === item.date)) {
      showModalHandler({
        title: '⚠️ Duplicate Add ⚠️',
        message: (
          <>
            You've already added <span style={{ fontWeight: 'bold', color: '#27548A' }}>{item.title}</span> to your favorites.
          </>
        ),
      });
      return;
    }
    addFavourite(item);
  };

  // Reset all filters and results
  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setMediaType('all');
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="app-container archive-page">
      <h1>🎞️ APOD Archive</h1>
      <div className="filter-controls">
        <label>
          <strong>Media Type</strong>
          <select value={mediaType} onChange={handleMediaTypeChange}>
            <option value="all">All</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>

        <label>
          <strong>Start Date</strong>
          <input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); }}
            min={minDate}
            max={maxDate}
          />
        </label>

        <label>
          <strong>End Date</strong>
          <input
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); }}
            min={minDate}
            max={maxDate}
          />
        </label>

        <label>
          <span style={{ visibility: 'hidden' }}>Search</span>
          <button type="button" onClick={handleSearch} disabled={dateRangeTooLong}>Search</button>
        </label>
        <label>
          <span style={{ visibility: 'hidden' }}>Clear</span>
          <button type="button" onClick={handleClear} className="clear-button">Clear</button>
        </label>
      </div>

      {dateRangeTooLong && (
        <div className="warning-text">⚠️ Please limit your search to a maximum of 30 days ⚠️</div>
      )}

      <div className="video-dates-toggle">
        <button type="button" onClick={() => setShowVideoDates(prev => !prev)}>
          {showVideoDates ? '⬆️ Hide Sample Video Dates' : '⬇️ Show Sample Video Dates'}
        </button>
      </div>
      <div className={`video-dates-section ${showVideoDates ? 'open' : ''}`} aria-hidden={!showVideoDates}>
        <div className="video-dates-content">
          <p>These dates include some of the <strong>video content</strong> examples from NASA's APOD archive.</p>

          {loadingVideoTitles ? (
            <ul className="skeleton-list">
              {videoDates.map((date) => ( <li key={date} className="skeleton-item" />))}
            </ul>
          ) : (
            <ul>
              {videoDatesWithTitles.map(({ date, title }) => (
                <li key={date}>
                  <strong onClick={(e) => handleDateClick(e, date)}>{date}</strong>: {title}
                </li>
              ))}
            </ul>
          )}

          {selectedDate && (
            <div
              ref={popupRef}
              className="date-popup"
              style={{
                top: popupPosition.top,
                left: popupPosition.left,
              }}
            >
              <p><strong>{selectedDate}</strong></p>
              <button type="button" onClick={() => applyDate('start')}>Add to Start Date</button>
              <button type="button" onClick={() => applyDate('end')}>Add to End Date</button>
            </div>
          )}
        </div>
      </div>

      {loading && <Loading />}
      {error && (
        <div className="error-card">
          <h2>⚠️ WARNING ⚠️</h2>
          <p>{error}</p>
        </div>
      )}

      <div className="results-list">
        {results.map(item => {
          return (
            <div key={item.date} className="result-card-wrapper">
              <APODCard
                data={item}
                showAddButton={true} 
                onAdd={() => handleAddFavourite(item)}
              />
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{modalMessage.title}</h2>
            <p>{modalMessage.message}</p>
            <button type="button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default APODArchive;
