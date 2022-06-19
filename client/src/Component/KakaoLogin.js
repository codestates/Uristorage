import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoLogin = () => {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");

  // 인가코드 가져오기
  useEffect(() => {
    if (code) {
      kakao(code);
    }
  }, []);

  // 서버에 인가코드 전달
  const kakao = async () => {
    await axios
      .post(`${process.env.REACT_APP_URL}/oauth/kakao/callback`, null, {
        headers: {
          authorization: code,
        },
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("Token", res.data.token);
        navigate("/Mypage");
      });
  };

  return null;
};

export default KakaoLogin;
