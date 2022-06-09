import React, { useEffect, useState } from "react";
import GridCars from "./GridCards";
import { Row } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Pagination from "./Pagenation"

function Wordsgrid() {
  const userInfo = useSelector((state) => state.userInfo);
  const users_id = userInfo.id;
  const [worddata, setWorddata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [wordsPerPage] = useState(5)

  async function fetchData() {
    const res = await axios
      .get(`${process.env.REACT_APP_URL}/words/user/${users_id}`)
      .then((res) => {
        //console.log("res", res),
        setWorddata(res.data);
      });
  }

  useEffect(() => {
    fetchData();
  }, [users_id]);

  const lastPost = currentPage * wordsPerPage;
  const firstPost = lastPost - wordsPerPage;
  const currentWords = worddata.slice(firstPost, lastPost)
  const pages = Math.ceil(worddata.length/wordsPerPage)

  return (
    <div className="wordgrid">
      <Row gutter={[16, 16]}>
        {currentWords.map((word, index) => (
            <React.Fragment key={index}>
              <GridCars worddata={currentWords} words={word.word} summary={word.summary} content={word.content}/>
            </React.Fragment>
          ))}
          <Pagination pages = {pages} setCurrentPage={setCurrentPage}/>
      </Row>
    </div>
  );
}

export default Wordsgrid;