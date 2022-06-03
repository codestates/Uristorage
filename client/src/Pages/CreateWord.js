import React, { useEffect, useState } from "react";
import Nav from "../Component/Nav"
import axios from "axios";

function CreateWord ({ userInfo, word }) {

  const [ Wordcreate, setWordcreate ] = useState({});

  const handleInputValue = (key) => (e) => {
    setWordcreate({ ...Wordcreate, [key]: e.target.value })
  }

  const handleCreateword = () => {
    const { Word, Summary, Content, Public } = Wordcreate
    if ( Word === '' || Summary === '' || Content === '' || Public === '') {
    } else {
        axios.post('http://localhost:4000/Uristorage/words',
        { Word, Summary, Content, Public },
        //{withCredentials: true}
        )
        .then((res) => word(res))
    }
  }

  console.log(Wordcreate);

    return (
      <div>
        <Nav />
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="Word_Create">
            <span>단어</span>
            <input className="input_word" type='text' onChange={handleInputValue('Word')} />
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
          </div>
          <div className="public">
            <input type="radio" name="open" value={true} onChange={handleInputValue('public')}/>공개
            <input type="radio" name="open" value={false} onChange={handleInputValue('public')}/>비공개
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