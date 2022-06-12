import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal/User";
import ImageUpload from "./ImageUpload";

function ModifyUser() {
  const userInfo = useSelector((state) => state.userInfo);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(userInfo.email);
  const [nickname, setNickName] = useState(userInfo.nickname);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [modalOn, setModalOn] = useState(false);

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
      return alert("변경하실 비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: email,
      password: password,
      nickname: nickname,
      image: uploadImage,
    };

    axios.put(`${process.env.REACT_APP_URL}/users`, body, { headers: { authorization: `Bearer ${token}` } }, { withCredentials: true }).then((res) => {
      if (res.data.success) {
        dispatch({
          type: "userInfo/setUpdateUserInfo",
          payload: res.data.data,
        });
        alert(res.data.message);
        navigate("/Mypage");
      } else {
        alert(res.data.message);
      }
    });
  };

  const [uploadImage, setUploadImage] = useState(userInfo.image);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return setUploadImage(null);
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "uristorageimage", // 업로드할 대상 버킷명
        Key: file.name,
        Body: file, // 업로드할 파일 객체
      },
    });

    const promise = upload.promise();
    promise.then(
      function (data) {
        setUploadImage(data.Location);
      },
      function (err) {
        return alert("오류가 발생했습니다: ", err.message);
      }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "10vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>닉네임</label>
        <input type="text" value={nickname} onChange={onNickNameHandler} />

        <label>비밀번호 변경</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <label>비밀번호 확인</label>
        <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} />

        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />

        <label>프로필 변경</label>
        <ImageUpload uploadImage={uploadImage} handleFileInput={handleFileInput} />

        <br />
        <button onClick={onSubmitHandler}>회원 정보 변경</button>
        <br />
        <button onClick={() => setModalOn(true)}>회원 탈퇴</button>
      </div>

      <Modal open={modalOn} close={() => setModalOn(false)} />
    </div>
  );
}

export default ModifyUser;
