import React, { useEffect, useState } from 'react';

function App() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/apod')
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 좋지 않습니다');
        }
        return response.json();
      })
      .then(data => {
        setApodData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>{apodData.title}</h1>
      <img src={apodData.url} alt={apodData.title} style={{ width: '100%', borderRadius: '8px' }} />
      <p>{apodData.date}</p>
      <p>{apodData.explanation}</p>
    </div>
  );
}

export default App;