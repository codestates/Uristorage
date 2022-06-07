import React, { useState } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };

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
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      userId: userId,
      email: email,
      password: password,
      nickname: nickname,
    };

    axios.post(`${process.env.REACT_APP_URL}/users/signup`, body).then((res) => {
      if (res.data.success) {
        //회원가입 성공
        navigate("/Login");
      } else {
        alert(res.data.message);
      }
    });
    // .catch((err) => alert(err.response.data.message));
    // dispatch(signupUser(body)).then((res) => {
    //   if (res.payload.success) {
    //     navigate("/login");
    //   } else {
    //     alert("Failed to sign up");
    //   }
    // });
  };

  return (
    <div>
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          height: "10vh",
        }}
        to="/"
        className="navigation_center"
      >
        Uri<span className="navigation_othercolor">Storage</span>
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "70vh",
        }}
      >
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
          <label>아이디</label>
          <input type="text" value={userId} onChange={onUserIdHandler} />

          <label>Password</label>
          <input type="password" value={password} onChange={onPasswordHandler} />

          <label>Password 확인</label>
          <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} />

          <label>닉네임</label>
          <input type="text" value={nickname} onChange={onNickNameHandler} />

          <label>Email</label>
          <input type="email" value={email} onChange={onEmailHandler} />

          <br />
          <button type="submit">회원 가입</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
