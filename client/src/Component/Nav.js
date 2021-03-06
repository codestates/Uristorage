import "./Nav.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL}/users/logout`,
        null,
        {
          headers: { authorization: `Bearer ${token}` },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.removeItem("Token");
        dispatch({
          type: "auth/isLogout",
        });

        dispatch({
          type: "groupfilter/setgroupIdFilter",
          payload: 0,
        });

        navigate("/");
      });
  };

  return (
    <div className="navigation">
      <div className="navigation_left">
        <Link to="/"><span className='navigation_thiscolor'>Uri</span><span className="navigation_othercolor">Storage</span></Link>
      </div>
      <div className="navigation_right">
        {token === null ? (
          <div>
            <span>
              <Link to="/Signup"> 회원가입 </Link>
            </span>
            <span> / </span>
            <span>
              <Link to="/Login"> 로그인 </Link>
            </span>
          </div>
        ) : (
          <div>
            <span>
              <Link to="/Mypage"> 마이페이지 </Link>
            </span>
            <span> / </span>
            <span>
              <button className='navigation_logout' onClick={handleLogout}> 로그아웃 </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
