import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import TypeFilter from "../Component/TypeFilter";
import Wordsgrid from "../Component/Wordsgrid";
import { useSelector } from "react-redux";
import "./Mypage.css";

function Mypage() {
  const [wordcreate, setWordcreate] = useState("");
  const [Filters, setFilter] = useState();
  const types = [
    { contents: "All", id: 1},
    { contents: "person", id: 2},
    { contents: "place", id: 3},
    { contents: "date", id: 4},
  ];

  const getdata = (wordcreate) => {
    setWordcreate(wordcreate);
  };

  const [searchWord, setSearchWord] = useState("");
  const handleInputValue = (key) => (e) => {
    setSearchWord({ ...searchWord, [key]: e.target.value });
  };

  const showFilter = (filters) => {
    const newcreateword = [...wordcreate]
    newcreateword.push(filters)
    setWordcreate(newcreateword)
  }

  const handletypeValue = (value) => {
    const data = types;
    let contents = "";

    for (let key in data){
      if(data[key].id === parseInt(value, 10)){
        contents = data[key].contents
      }
    }
    console.log("contents", contents)
    return contents;
  }

  const handleFilters = (filters) => {
    let newFilters = {...Filters}
    newFilters = filters
    console.log("filters", newFilters)

    if(newFilters !== null){
    let typeValue = handletypeValue(filters)
    newFilters = typeValue
    }

    showFilter(newFilters)
  }
  
  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>
      <div className="My_Filter">
        <TypeFilter handleFilters={filters => handleFilters(filters)} />
      </div>
      <div className="My_search_createword">
        <div className="home_searchbar">
          <input className="searchbar" type="text" placeholder="단어를 입력해주세요" onChange={handleInputValue("searchWord")} />
          <button type="submit" className="searchbutton">
            <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
          </button>
        </div>
        <div className="my_createword">
          <Link to="/CreateWord">단어등록</Link>{" "}
        </div>
      </div>
      <div className="WordGrid">
        <Wordsgrid wordcreate={wordcreate} getdata={getdata} searchWord={searchWord} />
      </div>
      <div className="Consonant">
        <div>자음 필터</div>
      </div>
      <div>
        <Link to="/Location">지도로가기</Link>
      </div>
      <div>
        <Link to="/Calendar">달력으로가기</Link>
      </div>
    </div>
  );
}

export default Mypage;
