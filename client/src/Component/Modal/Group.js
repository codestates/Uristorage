import React from "react";
import "./Modal.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Modal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open, close, groupId } = props;
  const { token } = useSelector((state) => state.auth);

  const onDeleteHandler = () => {
    axios.delete(`${process.env.REACT_APP_URL}/groups/${groupId}`, { headers: { authorization: `Bearer ${token}` } }, { withCredentials: true }).then((res) => {
      dispatch({
        type: "groupfilter/setgroupIdFilter",
        payload: 0,
      });
      navigate("/mypage");
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>정말 그룹을 삭제 하시겠습니까?</main>
          <footer>
            <button className="ok" onClick={onDeleteHandler}>
              확인
            </button>

            <button className="close" onClick={close}>
              취소
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;
