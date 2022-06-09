import React from "react";
import { Col } from "antd";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
import "./Component.css"

export default function GridCars(props) {
  return (
    <Col lg={24} md={2} xs={24}>
      <div className="gridcards">
        <div className="gridword"><Link to="/Detail" state={{data: props}}>{props.words}</Link></div>
          <div className="gridsummary">{props.summary}</div>
          <img className="gridimage"/><span>여기는 이미지</span>
      </div>
    </Col>
  );
}

// <a href={`/postreview/${props.title}`}></a>
