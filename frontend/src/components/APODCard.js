import './APODCard.css';

function APODCard({ data, showAddButton = true, onAdd, showDeleteButton = false, onDelete }) {
  return (
    <div className="apod-card" role="region" aria-label={`APOD: ${data.title}`}>
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

      {showAddButton && (
        <button
          type="button"
          className="favourite-button add-button"
          onClick={() => onAdd && onAdd(data)}
          aria-label={`Add ${data.title} to favourites`}
        >
          Add to favourites ❤️
        </button>
      )}

      {showDeleteButton && (
        <button
          type="button"
          className="favourite-button delete-button"
          onClick={() => onDelete && onDelete(data.date)}
          aria-label={`Remove ${data.title} from favourites`}
        >
          Remove from favourites 🗑️
        </button>
      )}
    </div>
  );
}

export default APODCard;
