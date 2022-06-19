import React, { useEffect, useState } from "react";
import { Col } from "antd";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Component.css";
import Modal from "./Modal/Word";

export default function GridCars({ wordData, deleteWord }) {
  const groupFilter = useSelector((state) => state.groupfilter);

  const [modalOn, setModalOn] = useState(false);

  return (
    <Col lg={24} md={2} xs={24}>
      {groupFilter === 0 ? ( //내 단어일 경우 수정,삭제 기능 추가
        <div className="gridcards">
          <div className="gridword">
            <div className="gridword_box">
              <Link to={`/Detail/${wordData.id}`} state={{ data: wordData }}>
                {wordData.word}
              </Link>
              <div className="word_type">{wordData.type}</div>
            </div>
          </div>
          {/* <div className="gridnickname">작성자:[{wordData.user.nickname}]</div> */}
          <div className="gridsummary_change">
            <div className="gridsummary">
              <div className="gridsummary_box">{wordData.summary}</div>
            </div>
            <div className="gridchange">
              <Link to="/ModifyWord" state={{ data: wordData }}>
                수정
              </Link>
              <button className="gridbutton" onClick={() => setModalOn(true)}>
                삭제
              </button>
              <Modal open={modalOn} close={() => setModalOn(false)} wordId={wordData.id} deleteWord={deleteWord} />
            </div>
          </div>
          <img
            className="gridimage"
            src={wordData.image}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className="gridcards">
          <div className="gridword">
            <div className="gridword_box">
              <Link to={`/Detail/${wordData.id}`} state={{ data: wordData }}>
                {wordData.word}
              </Link>
              <div className="word_type">{wordData.type}</div>
            </div>
          </div>
          <div className="gridsummary_change">
          <div className="gridsummary">
            <div className="gridsummary_box">{wordData.summary}</div>
          </div>
          <div className="gridchange_group">
            <div className="gridnickname">
              작성자:<p>[{wordData.user.nickname}]</p>
            </div>
          </div>
          </div>
          <img
            className="gridimage"
            src={wordData.image}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}
    </Col>
  );
}

// <a href={`/postreview/${props.title}`}></a>
