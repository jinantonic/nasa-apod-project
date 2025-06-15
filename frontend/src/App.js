import React, { useEffect, useState } from 'react';
import ApodViewer from './components/ApodViewer';

function App() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/apod')
      .then((res) => {
        if (!res.ok) throw new Error('API 요청 실패');
        return res.json();
      })
      .then((data) => {
        setApodData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div className="App">
      <ApodViewer data={apodData} loading={loading} error={error} />
    </div>
  );
}

export default App;