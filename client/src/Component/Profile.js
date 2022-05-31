import React from "react";

import { useSelector, useDispatch } from "react-redux";

function Profile() {
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <div className="information">
      <img className="profile-image" style={{ width: "250px", height: "250px" }} src="https://mblogthumb-phinf.pstatic.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2" />
      <div>
        <span> {userInfo.nickname} </span>
        <span> 그룹네임 </span>
      </div>
      <div> Link 회원정보변경 </div>
      <div> Link 그룹정보변경 </div>
      <div> Link 그룹추가 </div>
    </div>
  );
}

export default Profile;
