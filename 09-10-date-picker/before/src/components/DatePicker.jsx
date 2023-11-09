import { useState } from "react";
import { format } from "date-fns";

import { Calendar } from "./Calendar";

export function DatePicker({ value, onChange }) {
  const [showCalendar, setShowCalendar] = useState(false);

  const formattedDate = format(value, "MMMM do, yyyy");

  return (
    <div className="date-picker-container">
      <button
        className="date-picker-button"
        onClick={() => setShowCalendar(true)}
      >
        {formattedDate}
      </button>

      {showCalendar && <Calendar value={value} onChange={onChange}/>}
    </div>
  );
}
