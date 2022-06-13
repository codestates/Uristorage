import React, { useState, useEffect } from "react";
import "../Pages/Mypage.css";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";

function TypeFilter(props) {
  const types = [
    { contents: "All", id: 1 },
    { contents: "person", id: 2 },
    { contents: "place", id: 3 },
    { contents: "date", id: 4 },
  ];

  const [wordType, setWordtype] = useState(1);
  /*
  const handleToggle = (value) => {
    const currentIndex = wordType.indexOf(value)
    const newChecked = [...wordType]
    if(currentIndex === -1){ 
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setWordtype(newChecked)
    props.handleFilters(newChecked)
  }
  */

  const typeLists = () =>
    types.map((value) => (
      <Radio key={value.id} value={value.id}>
        {value.contents}
      </Radio>
    ));

  const handletype = (event) => {
    setWordtype(event.target.value);
    props.handleFilters(event.target.value);
    props.handleSearchFilters(event.target.value);
    console.log("event.target.value", event.target.value);
  };

  return (
    <div className="filter">
      <Radio.Group onChange={handletype} value={wordType}>
        {typeLists()}
      </Radio.Group>
    </div>
  );
}
export default TypeFilter;
