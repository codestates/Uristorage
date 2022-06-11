import React, { useState, useEffect } from "react";
import "./Component.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import "../Pages/ModifyUserPage";
import "./Component.css";

function Profile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const userGroups = useSelector((state) => state.userGroups);
  const groupfilter = useSelector((state) => state.groupfilter);
  const { token } = useSelector((state) => state.auth);

  const id = userInfo.id;
  const [Content, setContent] = useState(groupfilter); //select버튼 value값을 받아 단어그리드로 넘겨줘야함profile=>wordgrid(redux이용해야할듯)
  const groupList = [{ name: "내 단어", image: userInfo.image, group_id: 0 }, ...userGroups];

  const onChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const getUserGroups = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_URL}/groups/user/${id}`, {
          withCredentials: true,
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch({
            type: "userGroups/setUpdateUserGroups",
            payload: res.data,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getUserGroups();
    }
  }, [id]);

  useEffect(() => {
    dispatch({
      type: "groupfilter/setgroupIdFilter",
      payload: Content,
    });
  }, [Content]);

  return (
    <div className="information">
      {groupfilter === 0 ? (
        <img
          className="profile-image"
          style={{ width: "250px", height: "250px" }}
          src={userInfo.image}
          onError={(event) => {
            event.target.src = "https://mblogthumb-phinf.pstatic.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2";
            event.onerror = null;
          }}
        />
      ) : (
        <img
          className="profile-image"
          style={{ width: "250px", height: "250px" }}
          src={userGroups.filter((el) => el.group_id === groupfilter)[0].image}
          onError={(event) => {
            event.target.src = "https://mblogthumb-phinf.pstatic.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2";
            event.onerror = null;
          }}
        />
      )}
      <div>
        <span> {userInfo.nickname} </span>
        <select onChange={onChangeHandler} value={Content}>
          {/* <option key={groupfilter} value={groupfilter} selected>
            {groupfilter}
          </option> */}
          {groupList.map((item) => (
            <option key={item.group_id} value={item.group_id}>
              {item.name}
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
