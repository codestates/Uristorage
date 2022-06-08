import React, { useEffect, useState } from "react";
import Nav from "../Component/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Mypage.css";

function CreateWord() {
  const userInfo = useSelector((state) => state.userInfo);
  const id = userInfo.id;

  const navigate = useNavigate();
  const [Wordcreate, setWordcreate] = useState({
    users_id: id,
    word: "",
    summary: "",
    content: "",
    pub: false,
    type: "",
  });

  const handleInputValue = (key) => (e) => {
    setWordcreate({ ...Wordcreate, [key]: e.target.value });
  };

  const handleCreateword = () => {
    const { users_id, word, summary, content, pub, type } = Wordcreate;
    if (word === "" || summary === "" || content === "" || pub === "" || !type) {
    } else {
      axios.post(`${process.env.REACT_APP_URL}/words`, { users_id, word, summary, content, pub, type }, { withCredentials: true }).then((data) => {
        console.log("data", data);
        navigate("/Mypage", { state: data.data });
        // if (res.data.success) {
        //   alert(res.data.message);
        //   navigate("/Mypage");
        // } else {
        //   alert(res.data.message);
        // }
      });
    }
  };

  return (
    <div>
      <Nav />
      <div className="CreateWord">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="Word_Create">
            <span>단어</span>&emsp;
            <input className="input_word" type="text" onChange={handleInputValue("word")} />
          </div>
          <div className="Summary_Create">
            <span>요약</span>&emsp;
            <input className="input_summary" type="text" onChange={handleInputValue("summary")} />
          </div>
          <div>
            <span>그룹 설정</span>&emsp;
          </div>
          <div className="Type_Create">
            <span>구분</span>&emsp;
            <input type="radio" name="type" value={"All"} onChange={handleInputValue("type")} />
            전체
            <input type="radio" name="type" value={"person"} onChange={handleInputValue("type")} />
            인물
            <input type="radio" name="type" value={"place"} onChange={handleInputValue("type")} />
            장소
            <input type="radio" name="type" value={"date"} onChange={handleInputValue("type")} />
            날짜
          </div>
          <div className="Pub_Create">
            <input type="radio" name="open" value={true} onChange={handleInputValue("pub")} />
            공개
            <input type="radio" name="open" value={false} onChange={handleInputValue("pub")} />
            비공개
          </div>
          <div className="Content_Image">
            <span>이미지</span>&emsp;
            <input ref={Wordcreate.image} className="input_content" type="file" accept="image/*" onChange={handleInputValue("image")} />
          </div>
          <div className="Content_Create">
            <span>내용</span>&emsp;
            <input className="input_content" type="text" onChange={handleInputValue("content")} />
          </div>
          <div className="Create_Button">
            <button className="btn" type="button" onClick={handleCreateword}>
              단어 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateWord;
