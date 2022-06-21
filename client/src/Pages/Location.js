import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import Locationmap from "../Component/Locationmap";
import LocationGrid from "../Component/LocationGrid";
import "./Mypage.css";

import axios from "axios";

function Location() {
  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>

      <div>
        <Locationmap />
      </div>
      <div className="WordGrid_location">
        <LocationGrid />
      </div>
    </div>
  );
}

export default Location;
