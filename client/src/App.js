import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Redirect } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Mypage from "./Pages/Mypage";
import CreateWord from "./Pages/CreateWord";
import Search from "./Pages/Search";
import Words from "./Pages/Words";

import axios from "axios";

import "./App.css";

export default function App () {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/CreateWord" element={<CreateWord />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Words" element={<Words />} />
      </Routes>
    </div>
  )
}