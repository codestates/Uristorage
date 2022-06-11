import React, { useEffect, useState } from "react";
import { Col } from "antd";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Component.css";
import Modal from "./Modal/Word";

export default function GridCars({ wordData, delWord }) {
  const groupFilter = useSelector((state) => state.groupfilter);

  const [modalOn, setModalOn] = useState(false);

  return (
    <Col lg={24} md={2} xs={24}>
      {groupFilter === 0 ? ( //내 단어일 경우 수정,삭제 기능 추가
        <div className="gridcards">
          <div className="gridword">
            <Link to="/Detail" state={{ data: wordData }}>
              {wordData.word}
            </Link>
          </div>
          <div className="gridsummary">{wordData.summary}</div>
          <img className="gridimage" src={wordData.image} />
          <Link to="/ModifyWord" state={{ data: wordData }}>
            수정
          </Link>
          <button onClick={() => setModalOn(true)}>삭제</button>
          <Modal open={modalOn} close={() => setModalOn(false)} wordId={wordData.id} delWord={delWord} />
        </div>
      ) : (
        <div className="gridcards">
          <div className="gridword">
            <Link to="/Detail" state={{ data: wordData }}>
              {wordData.word}
            </Link>
          </div>
          <div className="gridsummary">{wordData.summary}</div>
          <img className="gridimage" src={wordData.image} />
        </div>
      )}
    </Col>
  );
}

// <a href={`/postreview/${props.title}`}></a>
