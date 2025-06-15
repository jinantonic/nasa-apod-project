import React from 'react';

function DatePicker({ selectedDate, onDateChange }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={{ margin: '1rem 0' }}>
      <label htmlFor="date-picker">Select a date:</label>{' '}
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        min="1995-06-16"
        max={today}
      />
    </div>
  );
}

export default DatePicker;
