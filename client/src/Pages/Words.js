import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import Nav from "../Component/Nav";
import Searchbar from "../Component/Searchbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Words.css";

function Words({ searchHandler }) {
  const location = useLocation();
  if (!location.state) {
    const [pubWord, setPubWord] = useState({});
    const wordId = Number(useParams().wordId);

    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_URL}/words/public`)
        .then((res) => {
          return res.data.filter((el) => el.id === wordId);
        })
        .then((res) => setPubWord(...res));
    }, []);

    return (
      <div id="Words">
        <Nav />
        
          <div className="words_searchbar">
            <Searchbar searchHandler={searchHandler} />
          </div>
          <div className="words_information">
            <div className="words_words_title">
              <div className="words_clickedwords">
                {pubWord.word}
                <div className="words_nickname"> {pubWord.user?.nickname}님의 단어</div>
              </div>
              <div className="words_clickedtitle">
                <span>요약</span>
                <div className="words_summary">{pubWord.summary}</div>
              </div>
            </div>
            <img
              className="words_clickedimage"
              src={pubWord.image}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="words_clickedcontent">
              <span>내용</span>
              <div className="words_content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{pubWord.content}</ReactMarkdown>
              </div>
            </div>
          
        </div>
      </div>
    );
  } else {
    const clicked = location.state.data;
    return (
      <div id="Words">
        <Nav />
        
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
    );
  }
}
export default Words;
