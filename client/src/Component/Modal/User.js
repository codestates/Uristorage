import React from "react";
import "./Modal.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Modal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open, close } = props;
  const { token } = useSelector((state) => state.auth);

  const onDeleteHandler = () => {
    axios.delete(`${process.env.REACT_APP_URL}/users`, { headers: { authorization: `Bearer ${token}` } }, { withCredentials: true }).then((res) => {
      localStorage.removeItem("Token");
      dispatch({
        type: "auth/isLogout",
      });
      navigate("/");
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>정말 회원 탈퇴를 하시겠습니까?</main>
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
