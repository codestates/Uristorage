import React, { useEffect, useState } from "react";
import GridCars from "./GridCards";
import { Row } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Pagination from "./Pagenation";

function Wordsgrid({ searchWord }) {
  const userInfo = useSelector((state) => state.userInfo);
  const groupFilter = useSelector((state) => state.groupfilter);

  const users_id = userInfo.id;
  const [worddata, setWorddata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(5);

  async function fetchData() {
    if (groupFilter === 0) {
      //그룹이없는 경우
      axios.get(`${process.env.REACT_APP_URL}/words/user/${users_id}`).then((res) => {
        setWorddata(res.data);
      });
    } else {
      axios.get(`${process.env.REACT_APP_URL}/words/group/${groupFilter}`).then((res) => {
        setWorddata(res.data.groupWords);
      });
    }
  }

  function deleteWord(id) {
    console.log("delete");
    setWorddata(worddata.filter((el) => el.id !== id));
  }

  useEffect(() => {
    fetchData();
  }, [users_id, groupFilter]);

  worddata.sort((a, b) => {
    let nameA = a.word;
    let nameB = b.word;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const searchedWord = searchWord.searchWord;
  const filteredWordData = worddata.filter((x) => x.word.includes(searchedWord));

  // console.log(worddata)
  console.log(searchWord);
  // console.log(filteredWordData)

  const lastPost = currentPage * wordsPerPage;
  const firstPost = lastPost - wordsPerPage;
  const currentWords = worddata.slice(firstPost, lastPost);
  const currentFilteredWords = filteredWordData.slice(firstPost, lastPost);
  const pages = Math.ceil(filteredWordData.length / wordsPerPage);

  //id값 같을 때 해당 words 출력 추가
  //리덕스에서 wordtype값을 불러온다. (all,person.map,date)

  return (
    <div>
      {searchedWord === "" || searchedWord === undefined || searchedWord === null || !searchedWord ? (
        <div className="wordgrid">
          <Row gutter={[16, 16]}>
            {currentWords.map((word, index) => (
              <React.Fragment key={index}>
                <GridCars wordData={word} />
              </React.Fragment>
            ))}
          </Row>
          <Pagination pages={pages} setCurrentPage={setCurrentPage} />
        </div>
      ) : (
        <div className="wordgrid">
          <Row gutter={[16, 16]}>
            {currentFilteredWords.length === 0
              ? "그룹에 속한 단어가 없습니다."
              : currentFilteredWords.map((word, index) => (
                  <React.Fragment key={index}>
                    <GridCars wordData={word} delWord={deleteWord} />
                  </React.Fragment>
                ))}
          </Row>
          <Pagination pages={pages} setCurrentPage={setCurrentPage} />
        </div>
      )}
    </div>
  );
}

export default Wordsgrid;
