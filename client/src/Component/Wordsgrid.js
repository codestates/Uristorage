import React, { useEffect, useState } from "react";
import GridCars from "./GridCards";
import { Row } from "antd";
import axios from "axios";

//import words from "./sampleword.json"

function Wordsgrid() {
  const [worddata, setWorddata] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(`${process.env.REACT_APP_URL}/words/user/1`)
        //users_id 리덕스 스토어로 가져오기....
        .then((res) => {
          console.log("res", res), setWorddata(res.data);
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
    fetchData();
  }, []);

  console.log("배열", worddata);

  //id값 같을 때 해당 words 출력 추가

  return (
    <div className="wordgrid">
      <Row gutter={[16, 16]}>
        {worddata &&
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
