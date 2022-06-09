import React, { useEffect, useState } from "react";
import GridCars from "./GridCards";
import { Row } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

function Wordsgrid() {
  const userInfo = useSelector((state) => state.userInfo);
  const groupFilter = useSelector((state) => state.groupfilter);

  const users_id = userInfo.id;
  const [worddata, setWorddata] = useState([]);

  async function fetchData() {
    if (groupFilter === 0) {
      axios.get(`${process.env.REACT_APP_URL}/words/user/${users_id}`).then((res) => {
        setWorddata(res.data);
      });
    } else {
      axios.get(`${process.env.REACT_APP_URL}/words/group/${groupFilter}`).then((res) => {
        setWorddata(res.data.groupWords);
      });
    }

    // words/user/:userid / words/group/:groupid
    // state 값, Redux
    /*const wordlist = res.data.map((word) => ({
      word: word.word,
      summary: word.summary,
      content: word.content
    }));
    setWorddata(worddata.concat(wordlist));
    */
  }

  useEffect(() => {
    fetchData();
  }, [users_id, groupFilter]);

  // console.log("배열", worddata);

  //id값 같을 때 해당 words 출력 추가

  //리덕스에서 wordtype값을 불러온다. (all,person.map,date)

  return (
    <div className="wordgrid">
      <Row gutter={[16, 16]}>
        {worddata === undefined
          ? "그룹에 속한 단어가 없습니다."
          : worddata &&
            worddata.map((word, index) => (
              <React.Fragment key={index}>
                <GridCars words={word.word} summary={word.summary} content={word.content} />
              </React.Fragment>
            ))}
      </Row>
    </div>
  );
}

export default Wordsgrid;
