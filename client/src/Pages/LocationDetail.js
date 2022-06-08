import React, { useState } from "react";
import { useLocation } from "react-router";

import Nav from "../Component/Nav"
import Profile from "../Component/Profile"
import TypeFilter from "../Component/TypeFilter";

function LocationDetail () {

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

    const location = useLocation()
    const [clicked, setClicked] = useState(location.state.data)
  
    return (
      <div>
        <Nav />
        <div className="My_Profile">
          <Profile />
        </div>
        <div className="My_Filter">
          <TypeFilter />
        </div>
        <div className="words_information_detail">
          <div className="words_clickedwords_detail">
            {clicked.words}
            <div> 김준환님의 단어</div>
          </div>
          <div className="words_clickedtitle_detail">
            <div>요약:</div>
            {clicked.summary}
          </div>
          <div className="words_clickedcontent_detail">
            <div>내용:</div>
            {clicked.content}
            </div>
        </div>
          <img className="words_clickedimage_detail" style={{ width: "300px", height: "300px" }}
           src="https://t1.daumcdn.net/cfile/tistory/251A563C5854122C07" />
      </div>
    )
  }
  
  export default LocationDetail;