import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import ModifyGroup from "../Component/ModifyGroup";

function AddGroupPage() {
  return (
    <div>
      <Nav />
      <div className="ModifyUser">
        <ModifyGroup />
      </div>
    </div>
  );
}

export default AddGroupPage;
