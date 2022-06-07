import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import CreateGroup from "../Component/AddGroup";
import "./ModifyUserPage.css";

function AddGroupPage() {
  return (
    <div>
      <Nav />
      <div className="Profile">
        <Profile />
      </div>
      <div className="ModifyUser">
        <CreateGroup />
      </div>
    </div>
  );
}

export default AddGroupPage;
