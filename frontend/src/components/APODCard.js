import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './APODCard.css';

function APODCard({ data, showAddButton = true, onAdd, onError, showDeleteButton = false, onDelete }) {
  // State for controlling tooltip visibility
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const tooltipRef = useRef(null);

  // Create share URL including date query parameter
  const shareUrl = window.location.origin + `/?date=${data.date}`;

  const handleAddClick = () => {
    if (onAdd) {
      onAdd(data);
    }
  };

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 4000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      if (onError) {
        onError({
          title: '⚠️ Error ⚠️',
          message: 'Failed to copy the link.'
        });
      }
    }
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowShareTooltip(false);
      }
    }
    if (showShareTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareTooltip]);

  // Share URLs for social media
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(data.title)}`;
  const instagramShare = `https://www.instagram.com/`;

  return (
    <>
      <div className="apod-card" role="region" aria-label={`APOD: ${data.title}`}>
        {/* Wrap entire card content in a Link with date query */}
        <Link to={`/home?date=${data.date}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
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
        </Link>

        {/* Button group (outside the Link) */}
        <div className="button-group">
          {showAddButton && (
            <button
              type="button"
              className="favourite-button add-button"
              onClick={handleAddClick}
              aria-label={`Add ${data.title} to favourites`}
            >
              Add to favourites ❤️
            </button>
          )}

          {showDeleteButton && onDelete && (
            <button
              type="button"
              className="favourite-button delete-button"
              onClick={() => onDelete(data.date, data.title)}
              aria-label={`Remove ${data.title} from favourites`}
            >
              Remove from favourites 🗑️
            </button>
          )}

          <button
            type="button"
            className="favourite-button share-button"
            onClick={handleShareClick}
            aria-label={`Share ${data.title}`}
            ref={tooltipRef}
          >
            Share 🔗
          </button>

          {showShareTooltip && (
            <div className="share-tooltip" role="tooltip" ref={tooltipRef}>
              <p>✅ Link copied to clipboard ✅<br /><strong>Share on:</strong></p>
              <div className="share-icons">
                <a href={facebookShare} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                  <FacebookIcon />
                </a>
                <a href={twitterShare} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                  <TwitterIcon />
                </a>
                <a href={instagramShare} target="_blank" rel="noopener noreferrer" aria-label="Go to Instagram">
                  <InstagramIcon />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// SVG icon components for social media buttons
const iconStyle = { width: '24px', height: '24px', fill: 'white' };
function FacebookIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M22 12a10 10 0 1 0-11.5 9.87v-7h-3v-3h3v-2.3c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v3h-1.5c-1.5 0-2 1-2 2v2.3h3.4l-.5 3h-2.9v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M23 3a10.9 10.9 0 0 1-3.14.86 5.48 5.48 0 0 0 2.4-3 11 11 0 0 1-3.5 1.3A5.48 5.48 0 0 0 16 2c-3 0-5.4 2.6-5.4 5.9 0 .46.05.91.15 1.33A15.6 15.6 0 0 1 3 3s-4 8 5 11.6a18 18 0 0 1-11 3c9 5.5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg style={iconStyle} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-5 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM7 7h10v10H7V7z" />
    </svg>
  );
}

export default APODCard;
