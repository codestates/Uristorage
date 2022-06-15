import React, { useEffect, useState } from "react";
import Nav from "../Component/Nav";
import Locationmap from "../Component/Locationmap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Mypage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

import ImageUpload from "../Component/ImageUpload";

function ModifyWord() {
  const location = useLocation();
  const userGroups = useSelector((state) => state.userGroups);

  const [activeCat, setActiveCat] = useState(location.state.data.type);
  const [activePub, setActivePub] = useState(location.state.data.public);

  const navigate = useNavigate();
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [Wordcreate, setWordcreate] = useState({
    id: location.state.data.id,
    word: location.state.data.word,
    summary: location.state.data.summary,
    content: location.state.data.content,
    image: location.state.data.image,
    pub: location.state.data.public,
    type: location.state.data.type,
    map: location.state.data.map,
    calendar: location.state.data.calendar,
  });

  const [uploadImage, setUploadImage] = useState(location.state.data.image);

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return setUploadImage(null);
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "uristorageimage", // 업로드할 대상 버킷명
        Key: `${uuidv4()}_${file.name}`,
        Body: file, // 업로드할 파일 객체
      },
    });

    const promise = upload.promise();
    promise.then(
      function (data) {
        setUploadImage(data.Location);
        setWordcreate({ ...Wordcreate, image: data.Location });
      },
      function (err) {
        return alert("오류가 발생했습니다: ", err.message);
      }
    );
  };

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
    const { id, word, summary, content, image, pub, type, map, calendar } = Wordcreate;
    const groups_id = checkedGroups;
    axios.put(`${process.env.REACT_APP_URL}/words`, { id, word, summary, content, image, pub, type, groups_id, map, calendar }, { withCredentials: true }).then((res) => {
      console.log(res);
      if (res.data.success) {
        alert(res.data.message);
        navigate("/Mypage");
      } else {
        alert(res.data.message);
      }
    });
  };

  const [mark, setMark] = useState({});

  const ClickLocationHandler = (e) => {
    const { _lat, _lng } = e.latlng;
    setMark({ lat: _lat, lng: _lng });
  };

  useEffect(() => {
    if (mark !== {}) {
      const pin = String(mark.lat) + "," + String(mark.lng);
      setWordcreate({
        id: Wordcreate.id,
        word: Wordcreate.word,
        summary: Wordcreate.summary,
        content: Wordcreate.content,
        image: Wordcreate.image,
        pub: Wordcreate.pub,
        type: Wordcreate.type,
        map: pin,
      });
    }
  }, [mark]);

  const [wordDate, setWordDate] = useState(new Date());
  const dateToString = (e) => {
    return e.getFullYear() + "-" + (e.getMonth() + 1).toString().padStart(2, "0") + "-" + e.getDate().toString().padStart(2, "0");
  };
  const handledate = (e) => {
    console.log("e는", e);
    const worddate = dateToString(e);
    console.log("worddate는", worddate);
    setWordDate(e);
    setWordcreate({
      id: location.state.data.id,
      word: Wordcreate.word,
      summary: Wordcreate.summary,
      content: Wordcreate.content,
      image: Wordcreate.image,
      pub: Wordcreate.pub,
      type: Wordcreate.type,
      calendar: worddate,
    });
  };

  const typeHandleClick = (e) => {
    setActiveCat(e.target.value);
    setWordcreate({ ...Wordcreate, type: e.target.value });
  };

  const pubHandleClick = () => {
    setActivePub(true);
    setWordcreate({ ...Wordcreate, pub: true });
  };

  const unPubHandleClick = () => {
    setActivePub(false);
    setWordcreate({ ...Wordcreate, pub: false });
  };

  return (
    <div>
      <Nav />
      <div className="CreateWord">
        <form className="Word_form" onSubmit={(e) => e.preventDefault()}>
          <div className="Word_Create">
            <span className="word-desc2l">단어</span>&emsp;
            <input className="input_word" type="text" value={Wordcreate.word} onChange={handleInputValue("word")} />
          </div>
          <div className="Summary_Create">
            <span className="word-desc2l">요약</span>&emsp;
            <input className="input_summary" type="text" value={Wordcreate.summary} onChange={handleInputValue("summary")} />
          </div>
          <div>
            <span className="word-desc4l">그룹 선택</span>&emsp;
            <span className="word-type">
            {userGroups.length === 0
              ? "생성된 그룹이 없습니다."
              : userGroups.map((el) => (
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
              </span>
          </div>
          <div className="Type_Create">
            <span className="word-desc2l">구분</span>&emsp;
            <button value={"All"} className={activeCat === "All" ? "wordActive_btn" : "word_btn"} onClick={typeHandleClick}>
              일반
            </button>
            <button value={"person"} className={activeCat === "person" ? "wordActive_btn" : "word_btn"} onClick={typeHandleClick}>
              인물
            </button>
            <button value={"place"} className={activeCat === "place" ? "wordActive_btn" : "word_btn"} onClick={typeHandleClick}>
              장소
            </button>
            <button value={"date"} className={activeCat === "date" ? "wordActive_btn" : "word_btn"} onClick={typeHandleClick}>
              날짜
            </button>
          </div>
          <div>
            {Wordcreate.type === "place" ? (
              <RenderAfterNavermapsLoaded ncpClientId={process.env.REACT_APP_MAP_CLIENT_ID}>
                <NaverMap className="word-map" mapDivId={"naver-map"} defaultCenter={{ lat: 37.3595704, lng: 127.105399 }} defaultZoom={16} zoomControl={true} draggable={true} onClick={ClickLocationHandler}>
                  <Marker position={mark} />
                </NaverMap>
              </RenderAfterNavermapsLoaded>
            ) : null}
          </div>
          {Wordcreate.type === "date" ? <DatePicker className='word-date' dateFormat="yyyy-MM-dd" selected={wordDate} placeholderText="단어 날짜 선택" onChange={handledate} locale={ko} /> : null}
          <div className="Pub_Create">
            <span className="word-desc4l"> 공개 여부 </span>
            <span className='word-pub'>
            <button className={activePub === true ? "wordActive_btn" : "word_btn"} onClick={pubHandleClick}>
              공개
            </button>
            <button className={activePub === false ? "wordActive_btn" : "word_btn"} onClick={unPubHandleClick}>
              비공개
            </button>
            </span>
          </div>
          <div className="Content_Image">
            <span className="word-desc5l">단어 이미지</span>
            <div className="word-image"><ImageUpload uploadImage={uploadImage} handleFileInput={handleFileInput} /> </div>
          </div>
          <div className="Content_Create">
            <span className="word-desc2lc">내용</span>&emsp;
            <textarea className="input_content" value={Wordcreate.content} onChange={handleInputValue("content")} />
          </div>
          <div className="Create_Button">
            <button className="word-btn" type="button" onClick={handleCreateword}>
              단어 수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifyWord;
