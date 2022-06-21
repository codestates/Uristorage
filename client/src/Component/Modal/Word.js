import React from "react";
import "./Modal.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Modal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open, close, wordId, deleteWord } = props;
  const { token } = useSelector((state) => state.auth);

  const onDeleteHandler = async () => {
    await axios.delete(`${process.env.REACT_APP_URL}/words/${wordId}`, { headers: { authorization: `Bearer ${token}` } }, { withCredentials: true }).then((res) => {
      ///모달창 닫고 mypage새로고침
    });
    deleteWord(wordId);
    close();
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>정말 단어를 삭제 하시겠습니까?</main>
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
