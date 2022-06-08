import Nav from "../Component/Nav"
import Profile from "../Component/Profile"
import TypeFilter from "../Component/TypeFilter";
import Calendarcomponent from "../Component/Calendar";
import "./Mypage.css"

function Calendarpage() {
  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>
      <div className="My_Filter">
        <TypeFilter />
      </div>
      <div className="My_Calendar">
        <Calendarcomponent />
      </div>
    </div>
  )
}

export default Calendarpage;