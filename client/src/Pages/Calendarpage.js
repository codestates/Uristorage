import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import Calendarcomponent from "../Component/Calendar";
import { useState } from "react";
import "./Mypage.css";

function Calendarpage() {
  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>

      <div className="My_Calendar">
        <Calendarcomponent />
      </div>
    </div>
  );
}

export default Calendarpage;
