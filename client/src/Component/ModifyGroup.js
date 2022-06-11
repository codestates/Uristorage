import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal/Group";

function ModifyGroup() {
  const userInfo = useSelector((state) => state.userInfo);
  const { token } = useSelector((state) => state.auth);
  const groupId = useSelector((state) => state.groupfilter);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [member, setMember] = useState("");
  const [members, setMembers] = useState([userInfo.nickname]);

  const [modalOn, setModalOn] = useState(false);

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onImageHandler = (event) => {
    setImage(event.currentTarget.value);
  };

  const handleInputValue = (event) => {
    setMember(event.currentTarget.value);
  };

  const onMemberAdd = () => {
    setMembers([...members, member]);
  };

  const onMemberDelete = (e) => {
    setMembers(members.filter((el) => el !== e.currentTarget.value));
  };

  const getGroupInfo = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/groups/${groupId}`, { withCredentials: true }).then((res) => {
      const groupMembers = res.data.members
        .filter((el) => el.nickname !== userInfo.nickname)
        .map((el) => {
          return el.nickname;
        });
      setMembers([...members, ...groupMembers]);
      setName(res.data.name);
      setImage(res.data.image);
      console.log(groupMembers);
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      name: name,
      image: image,
      members: members,
    };

    axios.put(`${process.env.REACT_APP_URL}/groups/${groupId}`, body, { headers: { authorization: `Bearer ${token}` } }, { withCredentials: true }).then((res) => {
      if (res.data.success) {
        alert(res.data.message);
        navigate("/Mypage");
      } else {
        alert(res.data.message);
      }
    });
  };

  useEffect(() => {
    setMembers([userInfo.nickname]);
  }, [userInfo]);

  useEffect(() => {
    getGroupInfo();
  }, []);

  return (
    <div>
      {groupId === 0 ? (
        "그룹을 선택해 주세요."
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "10vh",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>그룹 이름</label>
            <input type="text" value={name} onChange={onNameHandler} />

            <label>그룹원 목록</label>
            <div>
              {members.map((el, index) => (
                <div key={index}>
                  {index === 0 ? (
                    <div>{el}</div>
                  ) : (
                    <div>
                      {el}
                      <button value={el} onClick={onMemberDelete}>
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <input type="text" value={member} onChange={handleInputValue} />
            <button onClick={onMemberAdd}>추가</button>

            <label>이미지</label>
            <input type="file" value={image || ""} onChange={onImageHandler} />

            <br />
            <button onClick={onSubmitHandler}>그룹 정보 변경</button>
            <br />
            <button onClick={() => setModalOn(true)}>그룹 삭제</button>
          </div>
          <Modal open={modalOn} close={() => setModalOn(false)} groupId={groupId} />
        </div>
      )}
    </div>
  );
}

export default ModifyGroup;
