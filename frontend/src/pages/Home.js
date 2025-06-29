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

  const { favourites, addFavourite, addToHistory } = useContext(GlobalContext);

  // URL 쿼리 date가 바뀌면 selectedDate 동기화
  useEffect(() => {
    if (urlDate && urlDate !== selectedDate) {
      setSelectedDate(urlDate);
    }
  }, [urlDate]);

  // selectedDate가 바뀔 때 URL 쿼리를 업데이트 (history.push 대신 navigate)
  const onDateChange = (newDate) => {
    setSelectedDate(newDate);
    navigate(`/home?date=${newDate}`, { replace: true });
  };

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
        const res = await fetch(`http://localhost:5001/apod?date=${selectedDate}`);
        if (!res.ok) throw new Error('Failed to fetch');
  
        const data = await res.json();
  
        if (data.code === 404) {
          throw new Error(data.msg || 'No data available for this date.');
        }
  
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
  }, [selectedDate, today, addToHistory]);
  

  const handleAddFavourite = (item) => {
    if (favourites.some(fav => fav.date === item.date)) {
      alert("This item is already in your favourites!");
      return;
    }
    addFavourite(item);
    alert("Added to favourites!");
  };

  const isFavourite = apodData && favourites.some(item => item.date === apodData.date);

  return (
    <div className="app-container">
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
          showAddButton={!isFavourite}
          showDeleteButton={false}
          onAdd={() => handleAddFavourite(apodData)}
        />
      )}
    </div>
  );
}

export default Home;
