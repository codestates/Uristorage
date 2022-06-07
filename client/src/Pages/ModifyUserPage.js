import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import ModifyUser from "../Component/ModifyUser";
import "./ModifyUserPage.css";

function ModifyUserPage() {
  return (
    <div>
      <Nav />
      <div className="Profile">
        <Profile />
      </div>
      <div className="ModifyUser">
        <ModifyUser />
      </div>
    </div>
  );
}

export default ModifyUserPage;
