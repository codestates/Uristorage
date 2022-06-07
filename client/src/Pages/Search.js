import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import Nav from "../Component/Nav"
import Searchbar from "../Component/Searchbar";
import TypeFilter from "../Component/TypeFilter";
import "./Search.css"
import axios from "axios";

function Search ({ searchHandler, searchedWord }) {
  
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
  //console.log(wordsArray)

  const [searchWord, setSearchWord] = useState(searchedWord)
  console.log(searchWord)

  let searched = ''
  if (typeof(searchWord) === 'string') {
    searched = searchWord
  } else {
    searched = searchWord.searchword
  }
  //console.log(searched)

  const filteredWordData = publicWords.filter (x => x.word === searched)
  //console.log(filteredWordData)

  return (
    <div>
      <Nav />
      <div>
        <Searchbar searchHandler={searchHandler} />
        <TypeFilter />
      </div>
      <div className="searched_word">
        {!wordsArray.includes(searched) ? <div className="searched_none">일치하는 단어가 없습니다</div> :
          filteredWordData.map((word) => {
          return (
            <Link to="/Words" state={{data: word}}>
            <div className="word_box" id={word.id} key={word.id}>
              <div className="word_inbox"> {word.word}</div>
              <div className="title_inbox"> {word.summary}</div>
            </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Search






// const wordClickHandler0 = () => {
//   searchHandler(searchWord);
//   navigate('/Search')
// }

// const handleInputValue = (key) => (e) => {
//     setSearchWord({ ...searchWord, [key]: e.target.value });
// };

// const onKeyPress = (e) => {
//   if (e.key === "Enter") {
//     wordClickHandler0()
//     navigate("/Search");
//   }
// };

// <div className="home_searchbar">
//           <input className="searchbar" type="text" placeholder='단어를 입력해주세요' onChange={handleInputValue("searchword")} onKeyPress={onKeyPress} />
//           <Link to="/Search" state={{data: searchWord}}>
//           <button type="submit" className="searchbutton">
//             <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
//           </button>
//           </Link>
//         </div> 