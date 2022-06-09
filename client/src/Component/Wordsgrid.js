import React, { useEffect, useState } from "react";
import GridCars from "./GridCards";
import { Row } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Pagination from "./Pagenation"

function Wordsgrid() {
  const userInfo = useSelector((state) => state.userInfo);
  const groupFilter = useSelector((state) => state.groupfilter);

  const users_id = userInfo.id;
  const [worddata, setWorddata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [wordsPerPage] = useState(5)

  async function fetchData() {
    if (groupFilter === 0) { //그룹이없는 경우
      axios.get(`${process.env.REACT_APP_URL}/words/user/${users_id}`).then((res) => {
        setWorddata(res.data);
      });
    } else {
      axios.get(`${process.env.REACT_APP_URL}/words/group/${groupFilter}`).then((res) => {
        setWorddata(res.data.groupWords);
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, [users_id, groupFilter]);

  const lastPost = currentPage * wordsPerPage;
  const firstPost = lastPost - wordsPerPage;
  const currentWords = worddata.slice(firstPost, lastPost)
  const pages = Math.ceil(worddata.length/wordsPerPage)

  //리덕스에서 wordtype값을 불러온다. (all,person.map,date)

  return (
    <div className="wordgrid">
      <Row gutter={[16, 16]}>
        {currentWords === undefined
          ? "그룹에 속한 단어가 없습니다."
          :
            currentWords.map((word, index) => (
              <React.Fragment key={index}>
                <GridCars worddata={currentWords} words={word.word} summary={word.summary} content={word.content} />
              </React.Fragment>
            ))}
            <Pagination pages = {pages} setCurrentPage={setCurrentPage}/>
      </Row>
    </div>
  );
}

export default Wordsgrid;