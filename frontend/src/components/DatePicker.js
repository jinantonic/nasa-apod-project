import React from 'react';
import './DatePicker.css';

function DatePicker({ selectedDate, onDateChange, min, max }) {
  return (
    <div className="datepicker-container">
      <label htmlFor="date" className="datepicker-label">Select a date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        min={min}      // 최소 날짜 제한
        max={max}      // 최대 날짜 제한 (오늘)
        onChange={(e) => onDateChange(e.target.value)}
        className="datepicker-input"
      />
    </div>
  );
}

export default DatePicker;
