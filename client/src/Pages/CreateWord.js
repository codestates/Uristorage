import React, { useEffect, useState } from "react";
import Nav from "../Component/Nav"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function CreateWord () {
  const userInfo = useSelector((state) => state.userInfo);
  const id = userInfo.id;
  
  const navigate = useNavigate();
  const [ Wordcreate, setWordcreate ] = useState({
    users_id: id,
    word: "",
    summary: "",
    content: "",
    pub: true,
    type: "All"
  });

  const handleInputValue = (key) => (e) => {
    setWordcreate({ ...Wordcreate, [key]: e.target.value })
  }

  const handleCreateword = () => {
    const { users_id, word, summary, content, pub, type } = Wordcreate
    if ( word === "" || summary === "" || content === "" || pub === "" || !type) {
    } else {
        axios.post(`${process.env.REACT_APP_URL}/words`,
        { users_id, word, summary, content, pub, type },
        {withCredentials: true}
        )
        .then((res) => {
          //if (res.data.success){
          console.log("res", res);
          navigate("/Mypage")
          //}
        //  navigate("/Mypage")
        });
      }
  }
  console.log("id값", id);
  console.log(Wordcreate);

    return (
      <div>
        <Nav />
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="Word_Create">
            <span>단어</span>
            <input className="input_word" type='text' onChange={handleInputValue('word')} />
          </div>
          <div>
            <span>요약</span>
            <input className="input_summary" type='text' onChange={handleInputValue('summary')} />
          </div>
          <div>
            <span>그룹 설정</span>
          </div>
          <div>
            <span>구분</span>
            <input type="radio" name="type" value={"All"} onChange={handleInputValue('type')}/>전체
            <input type="radio" name="type" value={"person"} onChange={handleInputValue('type')}/>인물
            <input type="radio" name="type" value={"place"} onChange={handleInputValue('type')}/>장소
            <input type="radio" name="type" value={"date"} onChange={handleInputValue('type')}/>날짜
          </div>
          <div className="pub">
            <input type="radio" name="open" value={true} onChange={handleInputValue('pub')}/>공개
            <input type="radio" name="open" value={false} onChange={handleInputValue('pub')}/>비공개
          </div>
          <div>
            <span>내용</span>
            <input className="input_content" type='text' onChange={handleInputValue('content')} />
          </div>
          <div className="create_button">
            <button className="btn" type="button" onClick={handleCreateword}>
              단어 등록하기
            </button>
          </div>
        </form>
      </div>
    )
  }
  
export default CreateWord

/*
const [state, setState] = useState([])

  const handlechange = (e) => {
    console.log(e.target.value);
    setState(e.target.value)
  };

<input type="radio" value="false" checked={state === "false"} onChange={handlechange}/>비공개

            */