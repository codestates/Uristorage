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
  //const wordarr = data;
  const [wordcreate, setWordcreate] = useState("");
  //const location = useLocation();
  //const data = () => {
  //  const { state } = useLocation();
  //  console.log("state", state);
  //}
  const getdata = (wordcreate) => {
    setWordcreate(wordcreate);
  };

  const [searchWord, setSearchWord] = useState("");
  //console.log(searchWord)
  const handleInputValue = (key) => (e) => {
    setSearchWord({ ...searchWord, [key]: e.target.value });
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      setButtonClicked(searchWord);
    }
  };

  const [buttonClicked, setButtonClicked] = useState("");

  const searchClickHandler = () => {
    setButtonClicked(searchWord);
  };

  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>
      <div className="My_Filter">
        <TypeFilter />
      </div>
      <div className="My_search_createword">
        <div className="home_searchbar">
          <input className="searchbar" type="text" placeholder="단어를 입력해주세요" onChange={handleInputValue("searchword")} onKeyPress={onKeyPress} />
          <button type="submit" className="searchbutton" onClick={searchClickHandler}>
            <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
          </button>
        </div>
        <div className="my_createword">
          <Link to="/CreateWord">단어등록</Link>{" "}
        </div>
      </div>
      <div className="WordGrid">
        <Wordsgrid wordcreate={wordcreate} getdata={getdata} buttonClicked={buttonClicked} />
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
