import React, { useState, useEffect } from 'react';
import DatePicker from './components/DatePicker';
import APODCard from './components/APODCard';
import './App.css';

function App() {
  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜를 YYYY-MM-DD 형식으로
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

  return (
    <div className="app-container">
      <h1>🌌 NASA APOD Explorer</h1>
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {apodData && !loading && !error && (
        <APODCard data={apodData} />
      )}
    </div>
  );
}

export default App;
