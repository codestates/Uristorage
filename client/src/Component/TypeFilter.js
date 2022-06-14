import React, { useState, useEffect } from "react";
import "../Pages/Mypage.css";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";

function TypeFilter (props) {
  const navigate = useNavigate();
  const types = [
    { contents: "All", id: 1 },
    { contents: "person", id: 2 },
    { contents: "place", id: 3 },
    { contents: "date", id: 4 },
  ];

  const [wordType, setWordtype] = useState();

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
  //useEffect

   console.log("wordType", wordType)

  const typeLists = () =>
    types.map((value) => (
      <Radio key={value.id} value={value.id}>
        {value.contents}
      </Radio>
    ));

  const handletype = (event) => {
    setWordtype(event.target.value)
    props.handleFilters(event.target.value)
    console.log("event.target.value", event.target.value)
        if(event.target.value === 1){
          navigate("/Mypage")
          setWordtype(1)
        }else if(event.target.value === 2){
          navigate("/Mypage")

          setWordtype(2)
        }else if(event.target.value === 3){
          navigate("/Location")
          setWordtype(3)
        }else if(event.target.value === 4){
          navigate("/Calendar")
          setWordtype(4)
        }
  }
  
    return (
      <div className="filter">
        <Radio.Group onChange={handletype} value={wordType} wordType={wordType}>
          {typeLists()}
        </Radio.Group>
      </div>
    )
  }
  export default TypeFilter;
