import React, { useState } from "react";
import { useLocation } from "react-router";

import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>
      <div className="words_information_detail">
        <div className="words_clickedwords_detail">
          {clicked.words}
          <div> {clicked.user.nickname}님의 단어</div>
        </div>
        <div className="words_clickedtitle_detail">
          <div>요약:</div>
          {clicked.summary}
        </div>
        <div className="words_clickedcontent_detail">
          <div>내용:</div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{clicked.content}</ReactMarkdown>
        </div>
      </div>
      <img
        className="words_clickedimage_detail"
        style={{ width: "300px", height: "300px" }}
        src={clicked.image}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    </div>
  );
}

export default Detail;
