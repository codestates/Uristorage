import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal/User";

function ModifyUser() {
  const userInfo = useSelector((state) => state.userInfo);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState(userInfo.email);
  const [nickname, setNickName] = useState(userInfo.nickname);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [modalOn, setModalOn] = useState(false);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNickNameHandler = (event) => {
    setNickName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("변경하실 비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: email,
      password: password,
      nickname: nickname,
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>닉네임</label>
        <input type="text" value={nickname} onChange={onNickNameHandler} />

        <label>비밀번호 변경</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <label>비밀번호 확인</label>
        <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} />

        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />

        <br />
        <button onClick={onSubmitHandler}>회원 정보 변경</button>
        <br />
        <button onClick={() => setModalOn(true)}>회원 탈퇴</button>
      </div>

      <Modal open={modalOn} close={() => setModalOn(false)} />
    </div>
  );
}

export default ModifyUser;
