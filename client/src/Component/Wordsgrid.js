import React, { useEffect, useState } from "react";
import GridCars from "./GridCards";
import { Row } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Pagination from "./Pagenation";

function Wordsgrid({ searchWord, worddata, deleteWord }) {
  // const [worddata, setWorddata] = useState([]);
  worddata.sort((a, b) => {
    let nameA = a.word;
    let nameB = b.word;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const searchedWord = searchWord.searchWord;
  const filteredWordData = worddata.filter((x) => x.word.includes(searchedWord));

  return (
    <div>
      {searchedWord === "" || searchedWord === undefined || searchedWord === null || !searchedWord ? (
        <div className="wordgrid">
          <Row gutter={[16, 16]}>
            {worddata.length === 0
              ? "그룹에 속한 단어가 없습니다."
              : worddata.map((word, index) => (
                  <React.Fragment key={index}>
                    <GridCars wordData={word} deleteWord={deleteWord} />
                  </React.Fragment>
                ))}
          </Row>
        </div>
      ) : (
        <div className="wordgrid">
          <Row gutter={[16, 16]}>
            {filteredWordData.length === 0
              ? "일치하는 단어가 없습니다."
              : filteredWordData.map((word, index) => (
                  <React.Fragment key={index}>
                    <GridCars wordData={word} deleteWord={deleteWord} />
                  </React.Fragment>
                ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default Wordsgrid;
