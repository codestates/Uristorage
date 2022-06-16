import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignUp.css";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지 리렌더방지

    let body = {
      userId: userId,
      password: password,
    };

    axios
      .post(`${process.env.REACT_APP_URL}/users/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("Token", res.data.token);
          navigate("/Mypage");
        } else {
          alert(res.data.message);
        }
      });
    // .catch((error) => alert(error.response.data.message));

    // dispatch(loginUser(body)).then((res) => {
    //   if (res.payload) {
    //     navigate("/");
    //   } else {
    //     alert("Error");
    //   }
    // });
  };

  return (
    <div>
      <div className="user-nav">
        <Link to="/" className="navigation_center">
          Uri<span className="navigation_othercolor">Storage</span>
        </Link>
      </div>
      <div className="loginNsignup">
        <form className="login-form" onSubmit={onSubmitHandler}>
          <input type="userId" className="login-input" value={userId} onChange={onUserIdHandler} placeholder="아이디" />
          <input type="password" className="login-input" value={password} onChange={onPasswordHandler} placeholder="비밀번호" />
          <br />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
      <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=iwK_gnCquLTp4ZUNXTFs&redirect_uri=https://localhost:4000/users/callback&state=code">
        <img height="50" src="http://static.nid.naver.com/oauth/small_g_in.PNG" />
      </a>
      <div className="login-tosignup">
        <Link to="/Signup">회원가입</Link>
      </div>
    </div>
  );
}

export default LoginPage;
