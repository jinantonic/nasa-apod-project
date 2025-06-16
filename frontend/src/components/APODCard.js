import './APODCard.css';

function APODCard({ data, showAddButton = true, onAdd, showDeleteButton = false, onDelete }) {
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

      {/* Add to favourites 버튼 */}
      {showAddButton && (
        <button
          className="favourite-button"
          onClick={() => onAdd && onAdd(data)}
        >
          Add to favourites ❤️
        </button>
      )}

      {/* Delete 버튼 */}
      {showDeleteButton && (
        <button
          className="favourite-button delete-button"
          onClick={() => onDelete && onDelete(data.date)}
        >
          Remove from favourites 🗑️
        </button>
      )}
    </div>
  );
}

export default APODCard;
