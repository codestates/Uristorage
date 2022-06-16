import React, { useState } from "react";
import { useLocation } from "react-router";

import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import "../App.css";

function Detail() {
  // const userInfo = useSelector((state) => state.userInfo);
  // const users_id = userInfo.id;
  // const [groupWords, setGroupWords] = useState([])
  // useEffect(() => {
  //   async function getGroupWords() {
  //     await axios.get(`${process.env.REACT_APP_URL}/words/user/${users_id}`)
  //   .then ((res) => setGroupWords(res.data))}
  //   getGroupWords()
  // }, [])
  // console.log(groupWords)

  const location = useLocation();
  const clicked = location.state.data;

  console.log("clicked", clicked);

  return (
    <div id="Detail">
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>
      <div className="words_information_detail">
      <div className="words_words_title_detail">
        <div className="words_clickedwords_detail">
          {clicked.word}
          <div className="words_nickname_detail"> {clicked.user.nickname}님의 단어</div>
        </div>
        <div className="words_clickedtitle_detail">
          <span>요약</span>
          <div className="words_summary_detail"> {clicked.summary}</div>
        </div>
        </div>
        <img className="words_clickedimage_detail"  src={clicked.image} />
        <div className="words_clickedcontent_detail">
          <span>내용</span>
          <div className="words_content_detail">{clicked.content}</div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
