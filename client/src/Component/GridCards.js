import React from "react";
import { Col } from "antd";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
import "./Component.css"

export default function GridCars(props) {
  return (
    <Col lg={24} md={1} xs={24}>
      <div className="gridwords">
        <Link to="/Words">{props.words}</Link>
          <div >summary={props.summary} content={props.content}</div>
      </div>
    </Col>
  );
}

// <a href={`/postreview/${props.title}`}></a>
