import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import AddGroup from "../Component/AddGroup";

function AddGroupPage() {
  return (
    <div>
      <Nav />
      <div className="grouppage">
        <AddGroup />
      </div>
    </div>
  );
}

export default AddGroupPage;