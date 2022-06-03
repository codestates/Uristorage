import React, { useEffect, useState } from 'react'
import GridCars from './GridCards';
import { Row } from 'antd';

import words from "./sampleword.json"

function Wordsgrid() {

  const [worddata, setWorddata] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // const res = await axios.get("http://localhost:4000/uristorage/words/:id").then((res) => setWordData(res.data));
      // words/user/:userid / words/group/:groupid
      // state 값, Redux
      const wordlist = words.words.map((word) => ({
        id: word.id,
        words: word.words,
        summary: word.title,
        content: word.content
      }));
      setWorddata(worddata.concat(wordlist));
    }
    fetchData();
  }, []);

  console.log(worddata);

  //id값 같을 때 해당 words 출력 추가

  return (
    <div className="wordgrid">
      <Row gutter={[16, 16]}>
      {worddata &&
          worddata.map((word, index) => (
            <React.Fragment key={index}>
              <GridCars words={word.words} summary={word.summary} content={word.content}/>
            </React.Fragment>
          ))
      }
      </Row>
    </div>
  )
}

export default Wordsgrid