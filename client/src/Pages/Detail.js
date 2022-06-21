import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../App.css";
import axios from "axios";

function Detail() {
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
      <div id="Detail">
        <Nav />
        <div className="Mypage_width">
        <div className="My_Profile_detail">
          <Profile />
        </div>
        <div className="words_information_detail">
          <div className="words_words_title_detail">
            <div className="words_clickedwords_detail">
              {pubWord.word}
              <div className="words_nickname_detail"> {pubWord.user?.nickname}님의 단어</div>
            </div>
            <div className="words_clickedtitle_detail">
              <span>요약</span>
              <div className="words_summary_detail"> {pubWord.summary}</div>
            </div>
          </div>
          <img
            className="words_clickedimage_detail"
            src={pubWord?.image}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="words_clickedcontent_detail">
            <span>내용</span>
            <ReactMarkdown className="words_content_detail" remarkPlugins={[remarkGfm]}>
              {pubWord.content}
            </ReactMarkdown>
            {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{clicked.content}</ReactMarkdown> */}
          </div>
        </div>
        {/* <div className="words_content_detail">{clicked.content}</div> */}
        </div>
      </div>
    );
  } else {
    const clicked = location.state.data;
    return (
      <div id="Detail">
        <Nav />
        <div className="Mypage_width">
        <div className="My_Profile_detail">
          <Profile />
        </div>
        <div className="words_information_detail">
          <div className="words_words_title_detail">
            <div className="words_clickedwords_detail">
              {clicked.word}
              <div className="words_nickname_detail"> {clicked.user?.nickname}님의 단어</div>
            </div>
            <div className="words_clickedtitle_detail">
              <span>요약</span>
              <div className="words_summary_detail"> {clicked.summary}</div>
            </div>
          </div>
          <img
            className="words_clickedimage_detail"
            src={clicked.image}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="words_clickedcontent_detail">
            <span>내용</span>
            <ReactMarkdown className="words_content_detail" remarkPlugins={[remarkGfm]}>
              {clicked.content}
            </ReactMarkdown>
            {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{clicked.content}</ReactMarkdown> */}
          </div>
        </div>
        {/* <div className="words_content_detail">{clicked.content}</div> */}
        </div>
      </div>
    );
  }
}

export default Detail;
