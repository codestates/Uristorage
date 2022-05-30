import Nav from "../Component/Nav"
import { Link } from "react-router-dom"
import "./Homepage.css"

import words from ".././Component/sampleword.json"

function Homepage () {

  console.log(words.words[0].words)
  return (
    <div>
      <Nav />
      <div className="home">
        <div className="home_uristorageeng">Uri<span className="home_othercolor">Storage</span></div>
        <div className="home_uristoragekr">우리<span className="home_othercolor">스토리</span>지</div>
        <div className="home_searchbar">
          <input className="searchbar" type="text" placeholder="단어를 입력해주세요"/>
          <Link to="/Search">
          <button type="submit" className="searchbutton">
            <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
          </button>
          </Link>
        </div>
        <div className="home_randomwords">
          <button type="submit" className="randombutton">{words.words[0].words}</button>
        </div>
      </div>
    </div>
  )
}

export default Homepage