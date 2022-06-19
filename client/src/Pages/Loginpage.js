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
  };
  const kakaoLoginHandler = (e) => {
    e.preventDefault();
    window.location.assign(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`);
  };

  const naverLoginHandler = (e) => {
    e.preventDefault();
    window.location.assign(`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=code`);
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
          <div className="oauth-login-btn">
            <button type="submit" className="kakao-login-btn" onClick={kakaoLoginHandler}>
              <img src={process.env.PUBLIC_URL + "/kakao_login.png"} />
            </button>
            <button type="submit" className="naver-login-btn" onClick={naverLoginHandler}>
              <img height="43" src={process.env.PUBLIC_URL + "/naver_login.png"} />
            </button>
          </div>
          <div className="login-tosingup-container">
            <div className="login-tosignup">
              Uristorage가 처음이신가요?&emsp;
              <Link to="/Signup">회원가입</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
