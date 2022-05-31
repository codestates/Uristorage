import React, { useState } from "react";
import { Link } from "react-router-dom"
import { useLocation } from "react-router";

import Nav from "../Component/Nav"
import TypeFilter from "../Component/TypeFilter";
import "./Search.css"

import words from "../Component/sampleword.json"

function Search () {
  const location = useLocation()
  const searched = location.state.data.searchword

  const [searchWord, SetSearchWord] = useState({
    searchword: ""
  })
  
  const wordData = words.words
  const filteredWordData = wordData.filter (x => x.words === searched)

  console.log(searched)
  console.log(wordData)

  const handleInputValue = (key) => (e) => {
    SetSearchWord({ ...searchWord, [key]: e.target.value });
  };

  return (
    <div>
      <Nav />
      <div>
        <div className="home_searchbar">
          <input className="searchbar" type="text" placeholder={searched} onChange={handleInputValue("searchword")} />
          <Link to="/Search" state={{data: searchWord}}>
          <button type="submit" className="searchbutton">
            <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
          </button>
          </Link>
        </div>
        <TypeFilter />
      </div>
      <div className="searched_word">
        {filteredWordData.map((word) => {
          return (
            <Link to="/Words">
            <div className="word_box" id={word.id} key={word.id}>
              <div className="word_inbox"> {word.words}</div>
              <div className="title_inbox"> {word.title}</div>
            </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Search