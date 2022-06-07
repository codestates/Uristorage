import Nav from "../Component/Nav"
import Profile from "../Component/Profile"
import TypeFilter from "../Component/TypeFilter";
import Locationmap from "../Component/Locationmap";
import axios from "axios";

function Location () {
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
    </div>
  )
}

export default Location;