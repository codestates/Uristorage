import { Link } from "react-router-dom"
import Nav from "../Component/Nav"
import Profile from "../Component/Profile"
import TypeFilter from "../Component/TypeFilter"
import Wordsgrid from "../Component/Wordsgrid"
import "./Mypage.css"

import words from "../Component/sampleword.json"

function Mypage () {
  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>
      <div className="My_Filter">
        <TypeFilter data={words.words}/>
      </div>
      <div className="My_search_createword">
        <div>검색창</div>
        <div><Link to='/CreateWord'>단어등록</Link> </div>
      </div>
      <div className="WordGrid">
        <Wordsgrid />
      </div>
      <div className="Consonant">
        <div>자음 필터</div>
      </div>
    </div>
  )
}

export default Mypage