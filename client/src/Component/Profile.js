import React, { useState, useEffect } from "react";
import "./Component.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import "../Pages/ModifyUserPage";
import "./Component.css";

function Profile() {
  const [myGroup, seMyGroup] = useState([]);
  const userInfo = useSelector((state) => state.userInfo);
  const id = userInfo.id;
  const [Content, setContent] = useState(); //select버튼 value값을 받아 단어그리드로 넘겨줘야함profile=>wordgrid(redux이용해야할듯)
  const [Options, setOptions] = useState([{ key: 0, value: "mywords" }]);
  console.log(id); //새로고침하면 null로 시작한 후 값을 가짐
  console.log(Content);

  const onChangeHandler = (e) => {
    setContent(e.currentTarget.value);
  };

  const getUserGroups = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_URL}/groups/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          const result = res.data.userGroups.map((el, index) => {
            return { key: el.user_group.groups_id, value: el.name };
          });
          setOptions([...Options, ...result]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserGroups(); //새로고침하면 사라짐
  }, [userInfo]);

  return (
    <div className="information">
      <img className="profile-image" style={{ width: "250px", height: "250px" }} src="https://mblogthumb-phinf.pstatic.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2" />
      <div>
        <span> {userInfo.nickname} </span>
        <select onChange={onChangeHandler} value={Content}>
          {Options.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
      </div>
      <Link to="/ModifyUser"> 회원정보변경 </Link>
      <div>
        <Link to="/ModifyGroup"> 그룹정보변경 </Link>
      </div>
      <Link to="/AddGroup"> 그룹추가 </Link>
    </div>
  );
}

export default Profile;
