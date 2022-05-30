import "./Nav.css"
import { Link } from "react-router-dom"

function Nav () {
  return (
    <div className="navigation">
      <div className="navigation_left">
        <Link to='/'>Home</Link> 
      </div>
      <div className="navigation_center">
        Uri<span className="navigation_othercolor">Storage</span>
      </div>
      <div className="navigation_right">
        <span>
          <Link to='/'> 회원가입 </ Link>
        </span>
        <span> / </span> 
        <span>
          <Link to='/'> 로그인 </ Link>
        </span>
      </div>
    </div>
  )
}

export default Nav