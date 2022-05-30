import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Redirect } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Mypage from "./Pages/Mypage";
import CreateWord from "./Pages/CreateWord";

import axios from "axios";

import "./App.css";

export default function App () {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/Mypage" element={<Mypage />} />
        <Route exact path="/CreateWord" element={<CreateWord />} />
      </Routes>
    </div>
  )
}