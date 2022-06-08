import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Searchbar ({ searchHandler }) {
  const [searchWord, setSearchWord] = useState('')
  const navigate = useNavigate();
  // console.log(searchWord)

  const wordClickHandler0 = () => {
    searchHandler(searchWord);
    navigate('/Search')
  }

  const handleInputValue = (key) => (e) => {
      setSearchWord({ ...searchWord, [key]: e.target.value });
  };
  
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      wordClickHandler0(searchWord)
      navigate("/Search");
    }
  };

  return (
  <div className="home_searchbar">
  <input className="searchbar" type="text" placeholder="단어를 입력해주세요" onChange={handleInputValue("searchword")} onKeyPress={onKeyPress} />
    <button type="submit" className="searchbutton" onClick={wordClickHandler0}>
      <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
    </button>
  </div>
  )
}

export default Searchbar;