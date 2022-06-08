import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import AddGroup from "../Component/AddGroup";
import "./ModifyUserPage.css";

function AddGroupPage() {
  return (
    <div>
      <Nav />
      <div className="Profile">
        <Profile />
      </div>
      <div className="ModifyUser">
        <AddGroup />
      </div>
    </div>
  );
}

export default AddGroupPage;
