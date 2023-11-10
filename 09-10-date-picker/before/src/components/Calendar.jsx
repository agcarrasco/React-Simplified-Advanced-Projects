import { useState } from "react";
import {
  getMonth,
  getYear,
  format,
  getDaysInMonth,
  subMonths,
  addMonths,
  getDay,
  isSameDay,
  isToday,
  previousSunday,
  getDate,
  lastDayOfWeek,
} from "date-fns";

function createDays(year, month, endDay, startDay = 1) {
  const days = [];
  for (let i = startDay; i <= endDay; i++) {
    days.push({
      day: i,
      value: new Date(year, month, i),
    });
  }
  return days;
}

function getMonthData(date) {
  const year = getYear(date);
  const month = getMonth(date);
  const monthDays = getDaysInMonth(date);
  const firstDate = new Date(year, month, 1);
  const firstDay = getDay(firstDate);
  const lastDate = new Date(year, month, monthDays);
  const lastDay = getDay(lastDate);

  return {
    month,
    year,
    monthDays,
    firstDate,
    firstDay,
    lastDate,
    lastDay,
  };
}

export function Calendar({ value: currentDate, onChange }) {
  const [currentMonth, setCurrentMonth] = useState(() =>
    getMonthData(currentDate)
  );

  const currentMonthDays = createDays(
    currentMonth.year,
    currentMonth.month,
    currentMonth.monthDays,
    1
  );

  const prevMonth = getMonthData(subMonths(currentMonth.firstDate, 1));
  let prevMonthDays = [];
  // if current month does not start on a Sunday,
  // get first sunday of the week
  if (currentMonth.firstDay !== 0) {
    const firstSunday = previousSunday(
      new Date(currentMonth.year, currentMonth.month, 1)
    );
    prevMonthDays = createDays(
      prevMonth.year,
      prevMonth.month,
      prevMonth.monthDays,
      getDate(firstSunday)
    );
  }

  const nextMonth = getMonthData(addMonths(currentMonth.firstDate, 1));
  let nextMonthDays = [];
  // if current month does not end on a Saturday,
  // get last day of the week for the current month
  if (currentMonth.lastDay !== 6) {
    const lastDayDate = getDate(lastDayOfWeek(currentMonth.lastDate));
    nextMonthDays = createDays(nextMonth.year, nextMonth.month, lastDayDate, 1);
  }

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button
          className="prev-month-button month-button"
          onClick={() => {
            setCurrentMonth(getMonthData(subMonths(currentMonth.firstDate, 1)));
          }}
        >
          &larr;
        </button>
        <div className="current-month">{`${format(
          currentMonth.firstDate,
          "MMMM - yyyy"
        )}`}</div>
        <button
          className="next-month-button month-button"
          onClick={() => {
            setCurrentMonth(getMonthData(addMonths(currentMonth.firstDate, 1)));
          }}
        >
          &rarr;
        </button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-grid-dates date-picker-grid">
        {prevMonthDays.map(({ value, day }) => (
          <button
            className={`date date-picker-other-month-date ${
              isSameDay(currentDate, value) && "selected"
            } ${isToday(value) && "today"}`}
            key={day}
            onClick={() => onChange(value)}
          >
            {day}
          </button>
        ))}

        {currentMonthDays.map(({ value, day }) => (
          <button
            className={`date ${isSameDay(currentDate, value) && "selected"} ${
              isToday(value) && "today"
            }`}
            key={day}
            onClick={() => onChange(value)}
          >
            {day}
          </button>
        ))}

        {nextMonthDays.map(({ value, day }) => (
          <button
            className={`date date-picker-other-month-date ${
              isSameDay(currentDate, value) && "selected"
            } ${isToday(value) && "today"}`}
            key={day}
            onClick={() => onChange(value)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
