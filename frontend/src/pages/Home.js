import React, { useState, useEffect, useContext } from 'react';
import DatePicker from '../components/DatePicker';
import APODCard from '../components/APODCard';
import Loading from '../components/Loading';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';

function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlDate = searchParams.get('date');
  const today = new Date().toISOString().split("T")[0];
  const minDate = '1995-06-16';

  const [selectedDate, setSelectedDate] = useState(urlDate || today);
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { favourites, addFavourite, addToHistory, showModal, modalMessage, showModalHandler, closeModal } = useContext(GlobalContext);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  // Sync URL date parameter to state
  useEffect(() => {
    if (urlDate && urlDate !== selectedDate) {
      setSelectedDate(urlDate);
    }
  }, [urlDate]);

  // Change date and update URL
  const onDateChange = (newDate) => {
    setSelectedDate(newDate);
    navigate(`/home?date=${newDate}`, { replace: true });
  };

  // Fetch APOD data whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;

    if (selectedDate > today) {
      setApodData(null);
      setError("You cannot select a future date.");
      setLoading(false);
      return;
    }
    if (selectedDate < minDate) {
      setApodData(null);
      setError(`Date cannot be earlier than ${minDate}.`);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/apod?date=${selectedDate}`);
        if (!res.ok) throw new Error(`No data is available for ${selectedDate}.`);

        const data = await res.json();
        if (data.code === 404) throw new Error(data.msg || 'No data for this date.');

        setApodData(data);
        addToHistory(selectedDate);
      } catch (err) {
        setApodData(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDate, today]);

  // Handle adding to favourites with duplicate check
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

    showModalHandler({
      title: '⭐️ Added to Favorites ⭐️',
      message: (
        <>
          You successfully added <span style={{ fontWeight: 'bold', color: '#27548A' }}>{item.title}</span> to your favorites!
        </>
      ),
    });
  };

  return (
    <div className="app-container home-page">
      <h1>🌌 NASA APOD Explorer</h1>
      <DatePicker 
        selectedDate={selectedDate} 
        onDateChange={onDateChange} 
        min={minDate} 
        max={today} 
      />

      {loading && <Loading />}
      {error && (
        <div className="error-card">
          <h2>⚠️ WARNING ⚠️</h2>
          <p>{error}</p>
        </div>
      )}

      {apodData && !loading && !error && (
        <APODCard
          data={apodData}
          showAddButton={true}
          showDeleteButton={false}
          onAdd={handleAddFavourite}
        />
      )}

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

export default Home;
