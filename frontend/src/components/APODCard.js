// components/APODCard.js

import React from 'react';

function APODCard({ data }) {
  return (
    <div className="apod-card">
      <h2>{data.title}</h2>
      {data.media_type === 'image' ? (
        <img src={data.url} alt={data.title} />
      ) : (
        <iframe
          title={data.title}
          src={data.url}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      <p>{data.explanation}</p>
      <p><strong>{data.date}</strong></p>
    </div>
  );
}

export default APODCard;
