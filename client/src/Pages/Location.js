import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Nav from "../Component/Nav"
import Profile from "../Component/Profile"
import TypeFilter from "../Component/TypeFilter";
import Locationmap from "../Component/Locationmap";
import Wordsgrid from "../Component/Wordsgrid";
import "./Mypage.css"

import axios from "axios";

function Location () {

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

  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>
      <div className="My_Filter">
        <TypeFilter />
      </div>
      <div>
        <Locationmap />
      </div>
      <div className="WordGrid_location">
        <Wordsgrid />
      </div>
    </div>
  )
}

export default Location;