import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal/Group";
import ImageUpload from "./ImageUpload";

function ModifyGroup() {
  const userInfo = useSelector((state) => state.userInfo);
  const { token } = useSelector((state) => state.auth);
  const groupId = useSelector((state) => state.groupfilter);
  const userGroups = useSelector((state) => state.userGroups);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [member, setMember] = useState("");
  const [members, setMembers] = useState([userInfo.nickname]);

  const [modalOn, setModalOn] = useState(false);

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const handleInputValue = (event) => {
    setMember(event.currentTarget.value);
  };

  const onMemberAdd = () => {
    setMembers([...members, member]);
  };

  const onMemberDelete = (e) => {
    setMembers(members.filter((el) => el !== e.currentTarget.value));
  };

  const getGroupInfo = async () => {
    await axios.get(`${process.env.REACT_APP_URL}/groups/${groupId}`, { withCredentials: true }).then((res) => {
      const groupMembers = res.data.members
        .filter((el) => el.nickname !== userInfo.nickname)
        .map((el) => {
          return el.nickname;
        });
      setMembers([...members, ...groupMembers]);
      setName(res.data.name);
      setImage(res.data.image);
      console.log(groupMembers);
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      name: name,
      image: uploadImage,
      members: members,
    };

    axios.put(`${process.env.REACT_APP_URL}/groups/${groupId}`, body, { headers: { authorization: `Bearer ${token}` } }, { withCredentials: true }).then((res) => {
      if (res.data.success) {
        alert(res.data.message);
        navigate("/Mypage");
      } else {
        alert(res.data.message);
      }
    });
  };

  useEffect(() => {
    setMembers([userInfo.nickname]);
  }, [userInfo]);

  useEffect(() => {
    getGroupInfo();
  }, []);

  const [uploadImage, setUploadImage] = useState(userGroups.filter((el) => el.group_id === groupId)[0].image || "");

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return setUploadImage(null);
    }
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "uristorageimage", // 업로드할 대상 버킷명
        Key: `${uuidv4()}_${file.name}`,
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
      <div>
        <div className='group-form'>
          <div className='group-desc'>
          <div className='group-desceach1'>그룹 이름</div>
          <div className='group-desceach2'>그룹원 목록</div>
          <div className='group-desceach3'>그룹 이미지</div>
          </div>
          
          <input type="text" value={name} onChange={onNameHandler} />
          <div className='group-memberlist'>
            {members.map((el, index) => (
              <div key={index}>
                {index === 0 ? (
                  <div className='group-membernick'>{el}</div>
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

          <button className='group-button2' onClick={onSubmitHandler}>그룹 정보 변경</button>

          <br />
          <button className='group-button2' onClick={() => setModalOn(true)}>그룹 삭제</button>
        </div>
        <Modal open={modalOn} close={() => setModalOn(false)} groupId={groupId} />
      </div>
    </div>
  );
}

export default ModifyGroup;
