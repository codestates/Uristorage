import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Redirect } from "react-router-dom";

import Homepage from "./Pages/Homepage";

import axios from "axios";

import "./App.css";

export default function App () {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
            </Routes>
        </div>
    )
}