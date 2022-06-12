import React, { useEffect, useState } from "react";
import Nav from "../Component/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Mypage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

function CreateWord() {
  const userInfo = useSelector((state) => state.userInfo);
  const userGroups = useSelector((state) => state.userGroups);
  const id = userInfo.id;

  const navigate = useNavigate();
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [Wordcreate, setWordcreate] = useState({
    users_id: id,
    word: "",
    summary: "",
    content: "",
    pub: false,
    type: "",
    map: "",
    calendar: "",
  });

  // console.log(checkedGroups);

  const checkHandle = (checked, id) => {
    if (checked) {
      setCheckedGroups([...checkedGroups, id]);
    } else {
      setCheckedGroups(checkedGroups.filter((el) => el !== id));
    }
  };

  const handleInputValue = (key) => (e) => {
    setWordcreate({ ...Wordcreate, [key]: e.target.value });
  };

  const handleCreateword = () => {
    const { users_id, word, summary, content, pub, type, map, calendar } = Wordcreate;
    const groups_id = checkedGroups;
    axios.post(`${process.env.REACT_APP_URL}/words`, { users_id, word, summary, content, pub, type, groups_id, map, calendar }, { withCredentials: true }).then((res) => {
      console.log(res);
      if (res.data.success) {
        alert(res.data.message);
        navigate("/Mypage", { state: res.data });
      } else {
        alert(res.data.message);
      }
    });
  };

  // const [mark, setMark] = useState({});
  // const [stringifyMark, setStringifyMark] = useState('')
  
  // const SaveMark = (e) => {
  //   const { _lat, _lng } = e.latlng;
  //   setMark({lat: _lat, lng: _lng})
  // }

  // const StringifyMark = (mark) => {
  //   setStringifyMark(String(mark.lat) + ',' + String(mark.lng))
  // }

  let mark = {}
  let stringifyMark = ''

  const ClickLocationHandler = (e) => {
    const { _lat, _lng } = e.latlng;
    // setMark({lat: _lat, lng: _lng})
    // setStringifyMark(String(mark.lat) + ',' + String(mark.lng))
    mark = {lat: _lat, lng: _lng}
    stringifyMark = (String(mark.lat) + ',' + String(mark.lng))
    setWordcreate({
      users_id: Wordcreate.users_id,
      word: Wordcreate.word,
      summary: Wordcreate.summary,
      content: Wordcreate.content,
      pub: Wordcreate.pub,
      type: Wordcreate.type,
      map: stringifyMark
    })
  }

  // const ClickLocationHandler = async (e) => {
  //   SaveMark(e)
  //   StringifyMark(mark)
  //   MapInfoInWord(stringifyMark)
  // }
  
  console.log(mark)
  console.log(stringifyMark)
  console.log(Wordcreate)

   const [wordDate, setWordDate] = useState(new Date());
   const dateToString = (e) => {
    return e.getFullYear() + '-' + (e.getMonth() + 1).toString().padStart(2, '0') + '-' + e.getDate().toString().padStart(2, '0');
  }
   const handledate = (e) => {
     console.log("e는", e);
     const worddate = dateToString(e);
     console.log("worddate는", worddate);
     setWordDate(e);
     setWordcreate({
       users_id: Wordcreate.users_id,
       word: Wordcreate.word,
       summary: Wordcreate.summary,
       content: Wordcreate.content,
       pub: Wordcreate.pub,
       type: Wordcreate.type,
       calendar: worddate
    })
   }
   
   console.log(Wordcreate.map)

// console.log("날짜", wordDate)
// console.log(Wordcreate)
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
            <span>그룹 선택</span>&emsp;
            {userGroups.map((el) => (
              <label key={el.group_id}>
                <input
                  id={el.group_id}
                  type="checkbox"
                  onChange={(e) => {
                    checkHandle(e.currentTarget.checked, el.group_id);
                  }}
                  checked={checkedGroups.includes(el.group_id) ? true : false}
                />
                {el.name}
              </label>
            ))}
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
          {Wordcreate.type === "place" ?
            <RenderAfterNavermapsLoaded
              ncpClientId={process.env.REACT_APP_MAP_CLIENT_ID}>
            <NaverMap
              className='CreateWord_Map' mapDivId={"naver-map"}
              defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
              defaultZoom={16} zoomControl={true} draggable={true}
              onClick={ClickLocationHandler}
            >
            <Marker
              position={Wordcreate.map}
            />
            </NaverMap>
            </RenderAfterNavermapsLoaded>
            : null}
          {Wordcreate.type === "date" ?
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={wordDate}
              placeholderText="단어 날짜 선택"
              onChange={handledate}
              locale={ko}
            />
          : null}
          <div className="Pub_Create">
            <span> 공개 여부 </span> 
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
