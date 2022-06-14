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
  const [Content, setContent] = useState(String(groupfilter)); //select버튼 value값을 받아 단어그리드로 넘겨줘야함profile=>wordgrid(redux이용해야할듯)
  const groupList = [{ name: "내 단어", image: userInfo.image, group_id: 0 }, ...userGroups];

  const onChangeHandler = (e) => {
    setContent(e.target.value);
    getGroupMembers();
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
  const [members, setMembers] = useState(null);

  const getGroupMembers = (e) => {
    if (e !== undefined && e !== "0") {
      try {
        axios
          .get(`${process.env.REACT_APP_URL}/groups/members/${e}`, {
            withCredentials: true,
          })
          .then((res) => {
            setMembers(res.data.members);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setMembers(null);
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
    getGroupMembers(Content);
  }, [Content]);

  // useEffect(() => {
  //   if (groupfilter == 0) {
  //     setMembers(null);
  //   } else {
  //     getGroupMembers();
  //   }
  // }, [Content]);

  return (
    <div className="information">
      {groupfilter === 0 ? ( //setmembs.length로 한다??
        <img className="profile-image" style={{ width: "250px", height: "250px" }} src={userInfo.image} />
      ) : (
        <img className="profile-image" style={{ width: "250px", height: "250px" }} src={userGroups.filter((el) => el.group_id === groupfilter)[0].image} />
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
      {members !== null ? (
        <div>
          {members.map((el, index) => (
            <div key={index}>
              <img style={{ width: "50px", height: "50px" }} src={el.image} />
              <label>{el.nickname}</label>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      <div>{groupfilter !== 0 ? <Link to="/ModifyGroup"> 그룹정보변경 </Link> : <Link to="/ModifyUser"> 회원정보변경 </Link>}</div>
      <div>
        <Link to="/AddGroup"> 그룹추가 </Link>
      </div>
    </div>
  );
}

export default Profile;
