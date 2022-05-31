import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Homepage from "./Pages/Homepage";
import Mypage from "./Pages/Mypage";
import CreateWord from "./Pages/CreateWord";
import Search from "./Pages/Search";
import Words from "./Pages/Words";
import Loginpage from "./Pages/Loginpage";
import Signuppage from "./Pages/Signuppage";

import axios from "axios";

import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const getUserInfo = () => {
    try {
      axios
        .get("http://localhost:4000/users", {
          headers: { authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((res) => {
          dispatch({
            type: "userInfo/setUpdateUserInfo",
            payload: res.data.data,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  useEffect(() => {
    dispatch({
      type: "auth/isLogin",
      payload: localStorage.getItem("Token"),
    });
  }, [navigate]); //????멀까????

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Words" element={<Words />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Signup" element={<Signuppage />} />
        <Route path="/CreateWord" element={<CreateWord />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </div>
  );
}
