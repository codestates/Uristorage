
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import Nav from "../Component/Nav"
import "./Homepage.css"

import words from ".././Component/sampleword.json"


function Homepage () {

  const [searchWord, SetSearchWord] = useState({
    searchword: ""
  })

  const handleInputValue = (key) => (e) => {
    SetSearchWord({ ...searchWord, [key]: e.target.value });
  };

  const navigate = useNavigate()
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate("/Search")
    }
  };

  const selectNum = (min, max) => {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNum
  }

  return (
    <div>
      <Nav />
      <div className="home">
        <div className="home_uristorageeng">
          Uri<span className="home_othercolor">Storage</span>
        </div>
        <div className="home_uristoragekr">
          우리<span className="home_othercolor">스토리</span>지
        </div>
        <div className="home_searchbar">
          <input className="searchbar" type="text" placeholder="단어를 입력해주세요" onChange={handleInputValue("searchword")} onKeyPress={onKeyPress} />
          <Link to="/Search" state={{data: searchWord}}>
          <button type="submit" className="searchbutton" >
            <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
          </button>
          </Link>
        </div>
        <div className="home_randomwords_firstline">
        <Link to="/Search" state={{data: words.words[selectNum(0, words.words.length - 1)].words}}>
          <button type="submit" className="randombutton">{words.words[selectNum(0, words.words.length - 1)].words}</button>
          <button type="submit" className="randombutton">{words.words[selectNum(0, words.words.length - 1)].words}</button>
          <button type="submit" className="randombutton">{words.words[selectNum(0, words.words.length - 1)].words}</button>
        </Link>
        </div>
        <div className="home_randomwords_secondline">
        <Link to="/Search" state={{data: words.words[selectNum(0, words.words.length - 1)].words}}>
          <button type="submit" className="randombutton">{words.words[selectNum(0, words.words.length - 1)].words}</button>
          <button type="submit" className="randombutton">{words.words[selectNum(0, words.words.length - 1)].words}</button>
          <button type="submit" className="randombutton">{words.words[selectNum(0, words.words.length - 1)].words}</button>
        </Link>
        </div> 
      </div>
    </div>
  );
}

export default Homepage;
