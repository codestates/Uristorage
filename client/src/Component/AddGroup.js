import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddGroup() {
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [member, setMember] = useState("");
  const [members, setMembers] = useState([userInfo.nickname]);

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

  useEffect(() => {
    setMembers([userInfo.nickname]);
  }, [userInfo]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      name: name,
      image: image,
      members: members,
    };

    axios.post(`${process.env.REACT_APP_URL}/groups`, body, { withCredentials: true }).then((res) => {
      if (res.data.success) {
        alert(res.data.message);
        navigate("/Mypage");
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
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
        <input type="file" value={image} onChange={onImageHandler} />

        <br />
        <button onClick={onSubmitHandler}>그룹 추가</button>
      </div>
    </div>
  );
}

export default AddGroup;
