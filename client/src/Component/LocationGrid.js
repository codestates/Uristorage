import React, { useEffect, useState } from "react";
import GridCars from "./GridCards";
import { Row } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

function LocationGrid() {
  const userInfo = useSelector((state) => state.userInfo);
  const users_id = userInfo.id;
  const [worddata, setWorddata] = useState([]);

  async function fetchData() {
    const res = await axios
      .get(`${process.env.REACT_APP_URL}/words/user/${users_id}`)
      //users_id 리덕스 스토어로 가져오기....
      .then((res) => {
        //console.log("res", res),
        setWorddata(res.data);
      });
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

  function deleteWord(id) {
    console.log("delete");
    setWorddata(worddata.filter((el) => el.id !== id));
  }

  useEffect(() => {
    fetchData();
  }, [users_id]);

  const filteredWordData = [];
  for (let i = 0; i < worddata.length; i++) {
    if (worddata[i].type === "place") {
      filteredWordData.push(worddata[i]);
    }
  }

  // console.log("배열", worddata);

  //id값 같을 때 해당 words 출력 추가

  return (
    <div className="wordgrid">
      <Row gutter={[16, 16]}>
        {filteredWordData &&
          filteredWordData.map((word, index) => (
            <React.Fragment key={index}>
              <GridCars wordData={word} delWord={deleteWord} />
            </React.Fragment>
          ))}
      </Row>
    </div>
  );
}

export default LocationGrid;
