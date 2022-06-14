import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Nav from "../Component/Nav";
import Searchbar from "../Component/Searchbar";
import Filter from "../Component/Filter";
import "./Search.css";
import axios from "axios";

function Search({ searchHandler, searchedWord }) {
  const [publicWords, setPublicWords] = useState([]);
  useEffect(() => {
    async function getRandomWords() {
      await axios.get(`${process.env.REACT_APP_URL}/words/public`).then((res) => setPublicWords(res.data));
    }
    getRandomWords();
  }, []);

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

  const [Filters, setFilter] = useState();
  const types = [
    { contents: "All", id: 1},
    { contents: "person", id: 2},
    { contents: "place", id: 3},
    { contents: "date", id: 4},
  ];

  // const showFilter = (filters) => {
  //   const newcreateword = [...publicWords]
  //   newcreateword.push(filters)
  //   setPublicWords(newcreateword)
  //}

  const handletypeValue = (value) => {
    const data = types;
    let contents = "";

    for (let key in data){
      if(data[key].id === parseInt(value, 10)){
        contents = data[key].contents
      }
    }
    console.log("contents", contents)
    return contents;
  }

  const handleSearchFilters = (filters) => {
    let newFilters = {...Filters}
    newFilters = filters
    console.log("filters", newFilters)

    if(newFilters !== null){
    let typeValue = handletypeValue(filters)
    newFilters = typeValue
    }

   // showFilter(newFilters)
  }

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
        <Filter handleSearchFilters={filters => handleSearchFilters(filters)}/>
      </div>
      <div className="searched_word">
        {filteredWordData.length === publicWords.length || filteredWordData.length === 0 ? (
          <div className="searched_none">일치하는 단어가 없습니다</div>
        ) : (
          filteredWordData.map((word, index) => {
            return (
              <Link key={index} to="/Words" state={{ data: word }}>
                <div className="word_box" id={word.id} key={word.id}>
                  <div className="word_inbox"> {word.word}</div>
                  <div className="title_inbox"> {word.summary}</div>
                  <img src={word.image} width="100" height="80" />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Search;

{
  /* <Searchbar searchHandler={searchHandler} /> */
}
