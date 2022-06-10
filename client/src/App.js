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
import Location from "./Pages/Location";
import Detail from "./Pages/Detail";
import AddGroupPage from "./Pages/AddGroupPage";
import ModifyUserPage from "./Pages/ModifyUserPage";
import ModifyGroupPage from "./Pages/ModifyGroupPage";
import Calendar from "./Pages/Calendarpage";

import axios from "axios";

import "./App.css";
import ButtonGroup from "antd/lib/button/button-group";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.userInfo);
  const id = userInfo.id;

  const [searchedWord, setSearchedWord] = useState("");

  const searchHandler = (element) => {
    setSearchedWord(element);
  };

  const getUserInfo = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_URL}/users`, {
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
  }, [token, navigate]);

  // useEffect(() => {
  //   if (id) {
  //     getUserGroups();
  //   }
  // }, [id]);

  useEffect(() => {
    dispatch({
      type: "auth/isLogin",
      payload: localStorage.getItem("Token"),
    });
  }, [navigate]);

  // useEffect(() => {
  //   dispatch({
  //     type: "wordInfo/setWordInfo",
  //   });
  // });

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage searchHandler={searchHandler} />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Words" element={<Words searchHandler={searchHandler} />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Signup" element={<Signuppage />} />
        <Route path="/CreateWord" element={<CreateWord />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/ModifyUser" element={<ModifyUserPage />} />
        <Route path="/AddGroup" element={<AddGroupPage />} />
        <Route path="/ModifyGroup" element={<ModifyGroupPage />} />
        <Route path="/Search" element={<Search searchHandler={searchHandler} searchedWord={searchedWord} />} />
      </Routes>
    </div>
  );
}
