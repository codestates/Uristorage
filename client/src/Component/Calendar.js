import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Calendar from 'react-calendar';
import axios from "axios";
import moment from "moment";
import 'react-calendar/dist/Calendar.css';
import "./Component.css"

function Calendarcomponent() {
  const userInfo = useSelector((state) => state.userInfo);
  const users_id = userInfo.id;
  const groupFilter = useSelector((state) => state.groupfilter);
  const [value, onChange] = useState(new Date());
  const [calendarWord, setCalendarWord] = useState([]);

  useEffect(() => {
    async function getCalendarWords() {
      if (groupFilter === 0) {
        await axios.get(`${process.env.REACT_APP_URL}/words/user/${users_id}`).then((res) => setCalendarWord(res.data));
        console.log(res.data);
      } else {
        axios.get(`${process.env.REACT_APP_URL}/words/group/${groupFilter}`).then((res) => {
          console.log(res.data);
          setCalendarWord(res.data.groupWords);
        });
      }
    }
    getCalendarWords();
  }, [groupFilter]);


  const marks = [];
  for (let i = 0; i < calendarWord.length; i++) {
    if (calendarWord[i].type === "date" && calendarWord[i].calendar !== "") {
      marks.push(calendarWord[i].calendar);
    }
  }

  console.log("marks", marks);
  console.log("calendarWord", calendarWord);


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