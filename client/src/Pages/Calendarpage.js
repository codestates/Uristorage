import Nav from "../Component/Nav"
import Profile from "../Component/Profile"
import TypeFilter from "../Component/TypeFilter";
import Calendarcomponent from "../Component/Calendar";
import { useState } from "react";
import "./Mypage.css"

function Calendarpage() {

  const [wordType, setWordtype] = useState(4)

  const handleFilters = (filters) => {
    let newFilters = {...wordType}
    newFilters = filters
    setWordtype(4)
  }

  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>
      <div className="My_Filter">
        <TypeFilter handleFilters={filters => handleFilters(filters)} />
      </div>
      <div className="My_Calendar">
        <Calendarcomponent />
      </div>
    </div>
  )
}

export default Calendarpage;