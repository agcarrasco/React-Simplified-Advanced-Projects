import {
  getMonth,
  getYear,
  format,
  getDaysInMonth,
  subMonths,
  addMonths,
  getDay,
  isSameDay,
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
  const currentMonth = getMonthData(currentDate);

  const currentMonthDays = createDays(
    currentMonth.year,
    currentMonth.month,
    currentMonth.monthDays,
    1
  );

  const prevMonth = getMonthData(subMonths(currentDate, 1));
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

  const nextMonth = getMonthData(addMonths(currentDate, 1));
  let nextMonthDays = [];
  // if next month does not start on a Sunday,
  // get last day of the week for the current month
  if (nextMonth.firstDay !== 0) {
    const lastDayDate = getDate(lastDayOfWeek(currentMonth.lastDate));
    nextMonthDays = createDays(nextMonth.year, nextMonth.month, lastDayDate, 1);
  }

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button className="prev-month-button month-button">&larr;</button>
        <div className="current-month">{`${format(
          currentDate,
          "MMMM - yyyy"
        )}`}</div>
        <button className="next-month-button month-button">&rarr;</button>
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
            className={
              isSameDay(currentDate, value)
                ? "date date-picker-other-month-date selected"
                : "date date-picker-other-month-date"
            }
            key={day}
          >
            {day}
          </button>
        ))}

        {currentMonthDays.map(({ value, day }) => (
          <button
            className={isSameDay(currentDate, value) ? "date selected" : "date"}
            key={day}
            onClick={() => onChange(value)}
          >
            {day}
          </button>
        ))}

        {nextMonthDays.map(({ value, day }) => (
          <button
            className={
              isSameDay(currentDate, value)
                ? "date date-picker-other-month-date selected"
                : "date date-picker-other-month-date"
            }
            key={day}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
