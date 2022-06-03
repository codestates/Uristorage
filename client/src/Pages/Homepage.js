import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import Nav from "../Component/Nav"
import "./Homepage.css"

import words from ".././Component/sampleword.json"


function Homepage () {

  let wordsArray = []
  for (let i = 0; i < words.words.length; i++) {
    wordsArray.push(words.words[i].words)
  }
  const wordsArrayFiltered = wordsArray.filter((x, i) => wordsArray.indexOf(x) === i)
  const [shuffled, setSearchShuffled] = useState(false)
  const [shuffledArray, setShuffledArray] = useState([])

  
  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
    setSearchShuffled(true)
    setShuffledArray(arr)
  }
  if (shuffled === false) {
    shuffle(wordsArrayFiltered)
  } else {
  }

  const [searchWord, setSearchWord] = useState({
    searchword: ""
  })

  const wordClickHandler = () => {
    setSearchWord({
      searchword: shuffledArray[0]
    })
  }

  const handleInputValue = (key) => (e) => {
    setSearchWord({ ...searchWord, [key]: e.target.value });
  };
  // console.log(searchWord)

  const navigate = useNavigate();
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate("/Search");
    }
  };

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
          <Link to="/Search" state={{ data: searchWord }}>
            <button type="submit" className="searchbutton">
              <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
            </button>
          </Link>
        </div>
        <div className="home_randomwords_firstline" onClick={wordClickHandler}>
          <Link to="/Search" state={{data: searchWord}}>
            <button type="submit" className="randombutton" onClick={wordClickHandler}>{shuffledArray[0]}</button>
          </Link>
          <Link to="/Search" state={{data: searchWord}}>
            <button type="submit" className="randombutton" onClick={wordClickHandler}>{shuffledArray[1]}</button>
          </Link>
          <Link to="/Search" state={{data: searchWord}}>
            <button type="submit" className="randombutton" onClick={wordClickHandler}>{shuffledArray[2]}</button>
          </Link>
          
        </div>
        <div className="home_randomwords_secondline" onClick={wordClickHandler}>
          <Link to="/Search" state={{data: searchWord}}>
            <button type="submit" className="randombutton" onClick={wordClickHandler}>{shuffledArray[3]}</button>
          </Link>
          <Link to="/Search" state={{data: searchWord}}>
            <button type="submit" className="randombutton" onClick={wordClickHandler}>{shuffledArray[4]}</button>
          </Link>
          <Link to="/Search" state={{data: searchWord}}>
            <button type="submit" className="randombutton" onClick={wordClickHandler}>{shuffledArray[5]}</button>
          </Link>
        </div> 
      </div>
    </div>
  );
}

export default Homepage;