import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import "./Component.css"

function Calendarcomponent() {
  const [value, onChange] = useState(new Date());

  const marks = [
    "2022-06-08",
    "2022-06-30",
  ];

  

  return (
    <div className="highlight">
      <Calendar
        calendarType="US"
        onChange={onChange}
        value={value}
        locale="en-EN"
        tileClassName={({ date, view }) => {
          if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "highlight";
          }
        }}
      />
    </div>
  );
}

export default Calendarcomponent;