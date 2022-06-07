import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import ModifyGroup from "../Component/ModifyGroup";
import "./ModifyUserPage.css";

function AddGroupPage() {
  return (
    <div>
      <Nav />
      <div className="Profile">
        <Profile />
      </div>
      <div className="ModifyUser">
        <ModifyGroup />
      </div>
    </div>
  );
}

export default AddGroupPage;
