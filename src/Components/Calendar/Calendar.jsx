import "./Calendar.scss";
import Calendar from "react-calendar";

function Calender({ selectDate, onChange }) {
  return (
    <aside className="calendar">
      <h2 className="calendar__title">Calendar</h2>
      <div className="calendar__widget">
        <Calendar />
      </div>
    </aside>
  );
}

export default Calender;
