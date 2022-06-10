import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

function Calendarcomponent() {
  const [value, onChange] = useState(new Date());

  const marks = [
    "15-06-2022",
    "03-06-2022",
    "07-06-2022",
    "12-06-2022",
    "13-06-2022",
    "24-06-2022",
  ];

  return (
    <div className="react-calendar">
    <div className="highlight">
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-EN"
        tileClassName={({ date, view }) => {
          if (marks.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
            return "highlight";
          }
        }}
      />
    </div>
    </div>
  );
}

export default Calendarcomponent;