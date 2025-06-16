import React, { useState, useEffect, useContext } from 'react';
import DatePicker from '../components/DatePicker';
import { FavouritesContext } from '../contexts/FavouritesContext';
import APODCard from '../components/APODCard';
import Loading from '../components/Loading';

function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { favourites, addFavourite } = useContext(FavouritesContext);

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
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {loading && <Loading />}
      {error && <p className="error">Error: {error}</p>}

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
