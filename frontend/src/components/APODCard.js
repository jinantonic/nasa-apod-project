import React from 'react';
import './APODCard.css';

function APODCard({ data }) {
  return (
    <div className="apod-card">
      <h2 className="apod-title">{data.title}</h2>
      <p className="apod-date">{data.date}</p>
      
      <div className="apod-media">
        {data.media_type === 'image' ? (
          <img src={data.url} alt={data.title} className="apod-image" />
        ) : (
          <iframe
            title={data.title}
            src={data.url}
            frameBorder="0"
            allowFullScreen
            className="apod-video"
          />
        )}
      </div>

      <p className="apod-description">{data.explanation}</p>
    </div>
  );
}

export default APODCard;
