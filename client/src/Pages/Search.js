import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Nav from "../Component/Nav";
import Searchbar from "../Component/Searchbar";
import "./Search.css";
import axios from "axios";
import CatFilter from "../Component/CatFilter/CatFilter";

function Search({ searchHandler, searchedWord }) {
  const [allWorddata, setAllworddata] = useState([]);
  const [publicWords, setPublicWords] = useState([]);
  const [type, setType] = useState("All");

  const filterHandler = (type) => {
    type === "All" ? setPublicWords(allWorddata) : setPublicWords(allWorddata.filter((el) => el.type === type));
  };

  useEffect(() => {
    async function getRandomWords() {
      await axios.get(`${process.env.REACT_APP_URL}/words/public`).then((res) => setAllworddata(res.data));
    }
    getRandomWords();
  }, []);

  useEffect(() => {
    filterHandler(type);
  }, [allWorddata, type]);

  let wordsArray = [];
  for (let i = 0; i < publicWords.length; i++) {
    wordsArray.push(publicWords[i].word);
  }

  const [searchWord, setSearchWord] = useState(searchedWord);
  const handleInputValue = (key) => (e) => {
    setSearchWord({ ...searchWord, [key]: e.target.value });
  };

  let searched = "";
  if (typeof searchWord === "string") {
    searched = searchWord;
  } else {
    searched = searchWord.searchword;
  }
  //console.log(searched)

  const filteredWordData = publicWords.filter((x) => x.word.includes(searched));
  filteredWordData.sort((a, b) => {
    let nameA = a.word;
    let nameB = b.word;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const wordClickHandler0 = () => {
    searchHandler(searchWord);
    navigate("/Search");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      wordClickHandler0();
      navigate("/Search");
    }
  };

  return (
    <div>
      <Nav />
      <div>
        <div className="home_searchbar">
          <input className="searchbar" type="text" placeholder="단어를 입력해주세요" onChange={handleInputValue("searchword")} onKeyPress={onKeyPress} />
          <Link to="/Search" state={{ data: searchWord }}>
            <button type="submit" className="searchbutton">
              <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
            </button>
          </Link>
        </div>
        <CatFilter setType={setType} />
      </div>
      <div className="searchedword_containter">
        <div className="searched_word">
          {filteredWordData.length === publicWords.length || filteredWordData.length === 0 ? (
            <div className="searched_none">일치하는 단어가 없습니다</div>
          ) : (
            filteredWordData.map((word, index) => {
              return (
                <Link key={index} to="/Words" state={{ data: word }}>
                  <div className="word_box" id={word.id} key={word.id}>
                    <div className="word_inbox"> {word.word}</div>
                    <div>{word.type}</div>
                    <div className="title_inbox"> {word.summary}</div>
                    <span className="img_inbox">
                      <img
                        src={word.image}
                        width="100"
                        height="80"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;

{
  /* <Searchbar searchHandler={searchHandler} /> */
}
