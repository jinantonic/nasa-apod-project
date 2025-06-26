import React from 'react';
import './DatePicker.css';

function DatePicker({ selectedDate, onDateChange, min, max }) {
  // 날짜를 하루씩 더하거나 빼는 함수 (문자열 "YYYY-MM-DD" 처리)
  const changeDateBy = (dateStr, offset) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + offset);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // 이전 날짜 (min 날짜보다 작으면 비활성)
  const prevDate = changeDateBy(selectedDate, -1);
  const canGoPrev = prevDate >= min;

  // 다음 날짜 (max 날짜보다 크면 비활성)
  const nextDate = changeDateBy(selectedDate, 1);
  const canGoNext = nextDate <= max;

  return (
    <div className="datepicker-container">
      <label htmlFor="date" className="datepicker-label">Select a date:</label>

      <div className="datepicker-input-group">
        <button
          className="date-nav-btn"
          onClick={() => canGoPrev && onDateChange(prevDate)}
          disabled={!canGoPrev}
          aria-label="Previous day"
        >
          &#8592;
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
          className="date-nav-btn"
          onClick={() => canGoNext && onDateChange(nextDate)}
          disabled={!canGoNext}
          aria-label="Next day"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default DatePicker;
