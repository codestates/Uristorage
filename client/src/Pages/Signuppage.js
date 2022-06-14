import React, { useState } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNickNameHandler = (event) => {
    setNickName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      userId: userId,
      email: email,
      image: "https://cdn-icons-png.flaticon.com/512/309/309543.png",
      password: password,
      nickname: nickname,
    };

    axios.post(`${process.env.REACT_APP_URL}/users/signup`, body).then((res) => {
      if (res.data.success) {
        //회원가입 성공
        navigate("/Login");
      } else {
        alert(res.data.message);
      }
    });
    // .catch((err) => alert(err.response.data.message));
    // dispatch(signupUser(body)).then((res) => {
    //   if (res.payload.success) {
    //     navigate("/login");
    //   } else {
    //     alert("Failed to sign up");
    //   }
    // });
  };

  return (
    <div>
      <div className='user-nav'>
        <Link to="/" className="navigation_center">
          Uri<span className="navigation_othercolor">Storage</span>
        </Link>
      </div>
      <div className='loginNsignup'>
        <form className='signup-form' onSubmit={onSubmitHandler}>
          <div className='siguup-desc'>
            <div className='siguup-desceach1'>아이디</div>
            <div className='siguup-desceach2'>Password</div>
            <div className='siguup-desceach3'>Password 확인</div>
            <div className='siguup-desceach4'>닉네임</div>
            <div className='siguup-desceach5'>Email</div>
          </div>
          <div className='signup-input'>
            <input type="text" className='signup-inputeach' value={userId} onChange={onUserIdHandler} />
            <input type="password" className='signup-inputeach' value={password} onChange={onPasswordHandler} />
            <input type="password" className='signup-inputeach' value={confirmPassword} onChange={onConfirmPasswordHandler} />
            <input type="text" className='signup-inputeach' value={nickname} onChange={onNickNameHandler} />
            <input type="email" className='signup-inputeach' value={email} onChange={onEmailHandler} />
          </div>
          <br />
          <button type="submit" className='signup-button'>가입하기</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
