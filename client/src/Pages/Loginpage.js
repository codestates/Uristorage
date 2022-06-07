import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
          <label>Id</label>
          <input type="userId" value={userId} onChange={onUserIdHandler} />
          <label>Password</label>
          <input type="password" value={password} onChange={onPasswordHandler} />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
