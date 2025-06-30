import './DatePicker.css';

function DatePicker({ selectedDate, onDateChange, min, max }) {
  // Function to shift the date by a given offset (in days)
  const changeDateBy = (dateStr, offset) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + offset);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Calculate previous date and check if it's within min range
  const prevDate = changeDateBy(selectedDate, -1);
  const canGoPrev = prevDate >= min;

  // Calculate next date and check if it's within max range
  const nextDate = changeDateBy(selectedDate, 1);
  const canGoNext = nextDate <= max;

  return (
    <div className="datepicker-container">
      <label htmlFor="date" className="datepicker-label"><strong>Select a date:</strong></label>
      <div className="datepicker-input-group">
        <button
          type="button"
          className="date-nav-btn"
          onClick={() => canGoPrev && onDateChange(prevDate)}
          disabled={!canGoPrev}
          aria-label="Previous day"
        >
          ◀
        </button>

        <input
          type="date"
          id="date"
          value={selectedDate}
          min={min}
          max={max}
          onChange={(e) => onDateChange(e.target.value)}
          className="datepicker-input"
        />

        <button
          type="button"
          className="date-nav-btn"
          onClick={() => canGoNext && onDateChange(nextDate)}
          disabled={!canGoNext}
          aria-label="Next day"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default DatePicker;
