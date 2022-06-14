import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";

function AddGroup() {
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [member, setMember] = useState("");
  const [members, setMembers] = useState([userInfo.nickname]);

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const handleInputValue = (event) => {
    setMember(event.currentTarget.value);
  };

  const onMemberAdd = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}/users/nickname`,
        {
          nickname: member,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setMembers([...members, member]);
        } else {
          alert(res.data.message);
        }
      }); //닉네임이 존재하는 지 조회
  };

  const onMemberDelete = (e) => {
    setMembers(members.filter((el) => el !== e.currentTarget.value));
  };

  useEffect(() => {
    setMembers([userInfo.nickname]);
  }, [userInfo]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      name: name,
      image: uploadImage,
      members: members,
    };

    axios.post(`${process.env.REACT_APP_URL}/groups`, body, { withCredentials: true }).then((res) => {
      if (res.data.success) {
        alert(res.data.message);
        navigate("/Mypage");
      } else {
        alert(res.data.message);
      }
    });
  };

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const [uploadImage, setUploadImage] = useState("https://cdn-icons-png.flaticon.com/512/151/151943.png");

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return setUploadImage(null);
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "uristorageimage", // 업로드할 대상 버킷명
        Key: `${uuidv4()}_file.name`,
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
    <div>
      <div className='group-desc'>
        <div className='group-desceach1'>그룹 이름</div>
        <div className='group-desceach2'>그룹원 목록</div>
        <div className='group-desceach3'>그룹 이미지</div>
      </div>
      <div className='group-form'>
        <input type="text" value={name} onChange={onNameHandler} />
        <div className='group-memberlist'>
          {members.map((el, index) => (
            <div key={index}>
              {index === 0 ? (
                <div class='group-memberlist'>{el}</div>
              ) : (
                <div>
                  {el}
                  <button className='group-button3' value={el} onClick={onMemberDelete}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <input type="text" value={member} onChange={handleInputValue} />
        <button className='group-button1' onClick={onMemberAdd}>추가</button>
        <br />
        <ImageUpload uploadImage={uploadImage} handleFileInput={handleFileInput} />

        <br />
        <button className='group-button2' onClick={onSubmitHandler}>그룹 추가</button>
      </div>
    </div>
  );
}

export default AddGroup;