import React from 'react';
import './ApodViewer.css'; // 스타일링 파일도 같이 만들 예정

const ApodViewer = ({ data, loading, error }) => {
  if (loading) return <p>Loading NASA data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <div className="apod-container">
      <h1>{data.title}</h1>
      <p><em>{data.date}</em></p>
      {data.media_type === 'image' ? (
        <img src={data.url} alt={data.title} className="apod-image" />
      ) : (
        <iframe
          title="NASA video"
          src={data.url}
          frameBorder="0"
          allow="encrypted-media"
          allowFullScreen
          className="apod-video"
        ></iframe>
      )}
      <p className="apod-description">{data.explanation}</p>
    </div>
  );
};

export default ApodViewer;