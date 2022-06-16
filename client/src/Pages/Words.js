import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

import Nav from "../Component/Nav";
import Searchbar from "../Component/Searchbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Words.css";

function Words({ searchHandler }) {
  const location = useLocation();
  const clicked = location.state.data;

  return (
    <div id="Words">
      <Nav />
      <div>
        <div className="words_searchbar">
          <Searchbar searchHandler={searchHandler} />
        </div>
        <div className="words_information">
          <div className="words_words_title">
            <div className="words_clickedwords">
              {clicked.word}
              <div className="words_nickname"> {clicked.user.nickname}님의 단어</div>
            </div>
            <div className="words_clickedtitle">
              <span>요약</span>
              <div className="words_summary">{clicked.summary}</div>
            </div>
          </div>
          <img
            className="words_clickedimage"
            src={clicked.image}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="words_clickedcontent">
            <span>내용</span>
            <div className="words_content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{clicked.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Words;

// const navigate = useNavigate()
// const wordClickHandler0 = () => {
//   searchHandler(searchWord);
//   navigate('/Search')
// }

// const handleInputValue = (key) => (e) => {
//   setSearchWord({ ...searchWord, [key]: e.target.value });
// };

// const onKeyPress = (e) => {
//   if (e.key === "Enter") {
//     wordClickHandler0(searchWord)
//     navigate("/Search");
//   }
// };

// <div className="words_searchbar">
//           <input className="searchbar" type="text" placeholder="단어를 입력해주세요" onChange={handleInputValue("searchword")} onKeyPress={onKeyPress} />
//           <Link to="/Search" state={{data: searchWord}}>
//           <button type="submit" className="searchbutton" >
//             <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
//           </button>
//           </Link>
//         </div>
