import "./Calendar.scss";
import Calendar from "react-calendar";
import { useState } from "react";

function Calender() {
  const [selectDate, setSelectDate] = useState(new Date());

  const handleChange = (date) => {
    setSelectDate(date);
  };

  return (
    <aside className="calendar">
      <h2 className="calendar__title">Calendar</h2>
      <div className="calendar__widget">
        <Calendar onChange={handleChange} value={selectDate} />
      </div>
    </aside>
  );
}

export default Calender;
