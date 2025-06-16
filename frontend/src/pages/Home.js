import React, { useState, useEffect } from 'react';
import DatePicker from '../components/DatePicker';
import APODCard from '../components/APODCard';
import Loading from '../components/Loading';

function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5001/apod?date=${selectedDate}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setApodData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  // 즐겨찾기 추가 함수
  const addToFavourites = (item) => {
    const stored = localStorage.getItem('favourites');
    const favourites = stored ? JSON.parse(stored) : [];

    if (favourites.find(fav => fav.date === item.date)) {
      alert("This item is already in your favourites!");
      return;
    }

    const updated = [...favourites, item];
    localStorage.setItem('favourites', JSON.stringify(updated));
    alert("Added to favourites!");
  };

  return (
    <div className="app-container">
      <h1>🌌 NASA APOD Explorer</h1>
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {loading && <Loading />}
      {error && <p className="error">Error: {error}</p>}

      {apodData && !loading && !error && (
        <APODCard
          data={apodData}
          showAddButton={true}       // 추가 버튼 보이기
          showDeleteButton={false}   // 삭제 버튼 숨기기
          onAdd={addToFavourites}    // 추가 함수 전달
        />
      )}
    </div>
  );
}

export default Home;
