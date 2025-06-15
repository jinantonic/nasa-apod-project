import React from 'react';

const DatePicker = ({ selectedDate, onDateChange }) => {
  return (
    <input
      type="date"
      value={selectedDate}
      onChange={e => onDateChange(e.target.value)}
      max={new Date().toISOString().split("T")[0]} // 오늘 날짜까지만 선택 가능
    />
  );
};

export default DatePicker;