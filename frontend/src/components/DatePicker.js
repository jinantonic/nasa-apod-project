import React from 'react';
import './DatePicker.css';

function DatePicker({ selectedDate, onDateChange }) {
  return (
    <div className="datepicker-container">
      <label htmlFor="date" className="datepicker-label">Select a date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="datepicker-input"
      />
    </div>
  );
}

export default DatePicker;
