import "./Nav.css"
import { Link } from "react-router-dom"

function Nav () {
  return (
    <div className="navigation">
      <div className="navigation_left">
        <Link to='/'>Home</Link> 
      </div>
      <div className="navigation_center">
        UriStorage
      </div>
      <div className="navigation_right">
        <span>회원가입</span>
        <span>로그인</span>
      </div>
    </div>
  )
}

export default Nav