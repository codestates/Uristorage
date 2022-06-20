import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Calendar from 'react-calendar';
import axios from "axios";
import moment from "moment";
import "./Component.css"
import { ContactlessOutlined } from "@mui/icons-material";

function Calendarcomponent({worddata}) {
  const [value, onChange] = useState(new Date());
  const [select, SetSelect] = useState([]);
  const markWord = [];

  const marks = [];
  for (let i = 0; i < worddata.length; i++) {
    if (worddata[i].type === "date" && worddata[i].calendar !== "") {
      marks.push(worddata[i].calendar);
      markWord.push(worddata[i].word);
    }
  }

  /*
  const onSelectWord = (data) => {
    const selectword = worddata && worddata.word;
    const filterword = selectword && selectword.filter(() => {
      return (
        moment(worddata.calendar).format("YYYY-MM-DD") === data.format("YYYY-MM-DD")
      )
    });
    SetSelect(filterword);
  }

  const wordModal = () => {
    <Modal
      visible={select}
      title={worddata.word}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          수정
        </Button>
      ]}
    >
      {worddata.content}
    </Modal>
  }
  */

  console.log("marks", marks);
  console.log("worddata", worddata);
  console.log("markWord", markWord);

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

/*           for(let i=0; i<worddata.length; i++){
          if (worddata.find(x => x.calendar === moment(date).format("YYYY-MM-DD"))) {
            return <div className="markword">{worddata[i].word}</div>;
          }
          }
        }}

                  for(let i in worddata){
          if (worddata.find(x => x.calendar === moment(date).format("YYYY-MM-DD"))) {
            return <div className="markword">{markWord}</div>;
          }
          }

            const onSelectWord = () => {
    const selectword = worddata && worddata.word;
    const filterword = selectword && selectword.filter(() => {
      return (
        moment(worddata.calendar).format("YYYY-MM-DD") === value.format("YYYY-MM-DD")
      )
    });
    SetSelect(filterword);
  }
        */