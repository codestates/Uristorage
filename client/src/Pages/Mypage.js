import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import CatFilter from "../Component/CatFilter/CatFilter";
import Wordsgrid from "../Component/Wordsgrid";
import { useSelector } from "react-redux";
import "./Mypage.css";

function Mypage() {
  const userInfo = useSelector((state) => state.userInfo);
  const users_id = userInfo.id;
  const groupFilter = useSelector((state) => state.groupfilter);

  const [searchWord, setSearchWord] = useState("");
  const handleInputValue = (key) => (e) => {
    setSearchWord({ ...searchWord, [key]: e.target.value });
  };

  const [allWorddata, setAllworddata] = useState([]);
  const [worddata, setWorddata] = useState([]);
  const [type, setType] = useState("All");

  const filterHandler = (type) => {
    type === "All" ? setWorddata(allWorddata) : setWorddata(allWorddata.filter((el) => el.type === type));
  };

  async function fetchData() {
    if (groupFilter === 0) {
      //그룹이없는 경우
      axios.get(`${process.env.REACT_APP_URL}/words/user/${users_id}`).then((res) => {
        setAllworddata(res.data);
      });
    } else {
      axios.get(`${process.env.REACT_APP_URL}/words/group/${groupFilter}`).then((res) => {
        setAllworddata(res.data.groupWords);
      });
    }
  }
  const deleteWord = (id) => {
    setAllworddata(allWorddata.filter((el) => el.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, [users_id, groupFilter]);

  useEffect(() => {
    fetchData();
  }, [users_id, groupFilter]);

  useEffect(() => {
    filterHandler(type);
  }, [allWorddata, type]);

  return (
    <div>
      <Nav />
      <div className="My_Profile">
        <Profile />
      </div>
      <div className="My_Filter">
        <CatFilter setType={setType} />
      </div>
      <div className="My_search_createword">
        <div className="home_searchbar">
          <input className="searchbar" type="text" placeholder="단어를 입력해주세요" onChange={handleInputValue("searchWord")} />
          <button type="submit" className="searchbutton">
            <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
          </button>
        </div>
        <div className="my_createword">
          <Link to="/CreateWord">단어등록</Link>{" "}
        </div>
      </div>
      <div className="WordGrid">
        <Wordsgrid searchWord={searchWord} worddata={worddata} deleteWord={deleteWord} />
      </div>
      <div className="Consonant">
        <div>자음 필터</div>
      </div>
      <div>
        <Link to="/Location">지도로가기</Link>
      </div>
      <div>
        <Link to="/Calendar">달력으로가기</Link>
      </div>
    </div>
  );
}

export default Mypage;
