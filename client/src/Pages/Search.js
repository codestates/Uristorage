import React, { useState } from "react";
import { Link } from "react-router-dom"

import Nav from "../Component/Nav"
import TypeFilter from "../Component/TypeFilter";
import "./Search.css"

import words from "../Component/sampleword.json"

function Search ({ searchedWord }) {
  let wordsArray = []
  for (let i = 0; i < words.words.length; i++) {
    wordsArray.push(words.words[i].words)
  }

  const [searchWord, SetSearchWord] = useState(searchedWord)
  console.log(searchWord)

  let searched = ''
  if (typeof(searchWord) === 'string') {
    searched = searchWord
  } else {
    searched = searchWord.searchword
  }
  console.log(searched)

  const wordData = words.words
  const filteredWordData = wordData.filter (x => x.words === searched)

  const handleInputValue = (key) => (e) => {
    SetSearchWord({ ...searchWord, [key]: e.target.value });
  };

  return (
    <div>
      <Nav />
      <div>
        <div className="home_searchbar">
          <input className="searchbar" type="text" placeholder='단어를 입력해주세요' onChange={handleInputValue("searchword")} />
          <Link to="/Search" state={{data: searchWord}}>
          <button type="submit" className="searchbutton">
            <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
          </button>
          </Link>
        </div>
        <TypeFilter />
      </div>
      <div className="searched_word">
        {!wordsArray.includes(searched) ? <div className="searched_none">일치하는 단어가 없습니다</div> :
          filteredWordData.map((word) => {
          return (
            <Link to="/Words" state={{data: word}}>
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