import { Link } from "react-router-dom"
import Nav from "../Component/Nav"
import Profile from "../Component/Profile"
import TypeFilter from "../Component/TypeFilter"
import "./Mypage.css"

function Mypage () {
  return (
    <div>
      <Nav />
      <div className="My-Profile">
        <Profile />
      </div>
      <div className="My-Filter">
        <TypeFilter />
      </div>
      <div className="My-search-createword">
        <div>검색창</div>
        <div><Link to='/CreateWord'>단어등록</Link> </div>
      </div>
      <div className="WordGrid">
        <div>단어 그리드</div>
      </div>
      <div className="Consonant">
        <div>자음 필터</div>
      </div>
    </div>
  )
}

export default Mypage