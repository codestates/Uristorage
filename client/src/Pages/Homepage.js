import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Nav from "../Component/Nav"
import Searchbar from "../Component/Searchbar";
import "./Homepage.css"

import axios from "axios";


function Homepage ({ searchHandler }) {
  
  const [publicWords, setPublicWords] = useState([])
  useEffect(() => {
    async function getRandomWords() {
      await axios.get(`${process.env.REACT_APP_URL}/words/public`)
    .then ((res) => setPublicWords(res.data))}
    getRandomWords()
  }, [])

  let wordsArray = []
  for (let i = 0; i < publicWords.length; i++) {
    wordsArray.push(publicWords[i].word)
  }
  const wordsArrayFiltered = wordsArray.filter((x, i) => wordsArray.indexOf(x) === i)
  const [shuffled, setSearchShuffled] = useState(false)
  const [shuffledArray, setShuffledArray] = useState([])

  
  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
    setSearchShuffled(true)
    setShuffledArray(arr)
  }

  if (shuffled === false && wordsArrayFiltered.length !== 0) {
    shuffle(wordsArrayFiltered)
  } else {
  }

  const navigate = useNavigate();

  const wordClickHandler1 = () => {
    searchHandler(shuffledArray[0]);
    navigate('/Search')
  }
  const wordClickHandler2 = () => {
    searchHandler(shuffledArray[1]);
    navigate('/Search')
  }
  const wordClickHandler3 = () => {
    searchHandler(shuffledArray[2]);
    navigate('/Search')
  }
  const wordClickHandler4 = () => {
    searchHandler(shuffledArray[3]);
    navigate('/Search')
  }
  const wordClickHandler5 = () => {
    searchHandler(shuffledArray[4]);
    navigate('/Search')
  }
  const wordClickHandler6 = () => {
    searchHandler(shuffledArray[5]);
    navigate('/Search')
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
        <Searchbar searchHandler={searchHandler} />
        <div className="home_randomwords_firstline">
            <button type="submit" className="randombutton" onClick={wordClickHandler1}>{shuffledArray[0]}</button>
            <button type="submit" className="randombutton" onClick={wordClickHandler2}>{shuffledArray[1]}</button>
            <button type="submit" className="randombutton" onClick={wordClickHandler3}>{shuffledArray[2]}</button>
        </div>
        <div className="home_randomwords_secondline">
            <button type="submit" className="randombutton" onClick={wordClickHandler4}>{shuffledArray[3]}</button>
            <button type="submit" className="randombutton" onClick={wordClickHandler5}>{shuffledArray[4]}</button>
            <button type="submit" className="randombutton" onClick={wordClickHandler6}>{shuffledArray[5]}</button>
        </div> 
      </div>
    </div>
  );
}

export default Homepage;