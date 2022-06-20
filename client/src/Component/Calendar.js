import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "./Component.css";

function Calendarcomponent({worddata}) {
  const [value, onChange] = useState(new Date());
  const [select, SetSelect] = useState([]);
  const markWord = [];

  const marks = [];
  for (let i = 0; i < worddata.length; i++) {
    if (worddata[i].type === "date" && worddata[i].calendar !== "") {
      marks.push(worddata[i].calendar);
    }
  }

  return (
    <div className="wordcalendar">
      <Calendar
        calendarType="US"
        onChange={onChange}
        //onSelect={onSelectWord}
        value={value}
        locale="en-EN"
        tileContent={({ date, view }) => {
          for(let i in worddata){
          if (worddata.find(x => x.calendar === moment(date).format("YYYY-MM-DD"))) {
            return <div className="markword">{markWord[i]}</div>;
          }}
          }
        }
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
