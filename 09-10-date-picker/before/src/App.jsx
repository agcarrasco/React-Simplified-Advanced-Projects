import { useState } from "react";
import { DatePicker } from "./components/DatePicker";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <DatePicker
        value={date}
        onChange={(date) => {
          console.log("onChange", { date });
          setDate(date)
        }}
      />
    </>
  );
}

export default App;
