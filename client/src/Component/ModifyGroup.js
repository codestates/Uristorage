import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ModifyGroup() {
  const userInfo = useSelector((state) => state.userInfo);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onImageHandler = (event) => {
    setImage(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("변경하실 비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      name: image,
    };

    axios.put(`${process.env.REACT_APP_URL}/users`, body, { headers: { authorization: `Bearer ${token}` } }, { withCredentials: true }).then((res) => {
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
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
        <label>그룹 이름</label>
        <input type="text" value={name} onChange={onNameHandler} />

        <label>그룹원 추가</label>
        <label>그룹원 삭제</label>

        <label>이미지</label>
        <input type="file" value={image} onChange={onImageHandler} />

        <br />
        <button type="submit">그룹 정보 변경</button>
      </form>
    </div>
  );
}

export default ModifyGroup;
