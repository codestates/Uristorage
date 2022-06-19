import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "./Component.css";

function Calendarcomponent({ worddata }) {
  const [value, onChange] = useState(new Date());

  const marks = [];
  for (let i = 0; i < worddata.length; i++) {
    if (worddata[i].type === "date" && worddata[i].calendar !== "") {
      marks.push(worddata[i].calendar);
    }
  }

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
