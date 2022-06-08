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
import AddGroupPage from "./Pages/AddGroupPage";
import ModifyUserPage from "./Pages/ModifyUserPage";
import ModifyGroupPage from "./Pages/ModifyGroupPage";

import axios from "axios";

import "./App.css";
import ButtonGroup from "antd/lib/button/button-group";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [searchedWord, setSearchedWord] = useState("");

  const searchHandler = (element) => {
    setSearchedWord(element);
  };

  console.log(searchedWord);

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

  useEffect(() => {
    dispatch({
      type: "auth/isLogin",
      payload: localStorage.getItem("Token"),
    });
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage searchHandler={searchHandler} />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/Words" element={<Words />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Signup" element={<Signuppage />} />
        <Route path="/CreateWord" element={<CreateWord />} />
        <Route path="/ModifyUser" element={<ModifyUserPage />} />
        <Route path="/AddGroup" element={<AddGroupPage />} />
        <Route path="/ModifyGroup" element={<ModifyGroupPage />} />
        <Route path="/Search" element={<Search searchHandler={searchHandler} searchedWord={searchedWord} />} />
      </Routes>
    </div>
  );
}
