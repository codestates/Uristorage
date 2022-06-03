import React, { useEffect, useState } from "react";
import "../Pages/Mypage.css";

import words from "./sampleword.json"


function TypeFilter ({ data }) {
/*  const [worddatatype, setWorddatatype] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // const res = await axios.get("http://localhost:4000/uristorage/words/:id").then((res) => setWordData(res.data));
      // words/user/:userid / words/group/:groupid
      // state 값, Redux
      const typelist = words.words.map((type) => ({
        id: type.id,
        words: type.words,
        summary: type.title,
        content: type.content,
        info: type.info,
        contents: type.contents
      }));
      setWorddatatype(worddatatype.concat(typelist));
    }
    fetchData();
  }, []);

  console.log("타입", worddatatype);
*/
  const [wordType, setWordtype] = useState([
    { contents: "전체", checked: false, info: "type" },
    { contents: "인물", checked: false, info: "type" },
    { contents: "장소", checked: false, info: "type" },
    { contents: "날짜", checked: false, info: "type" },
  ]);

  useEffect(() => {
    let findtype = wordType.findIndex((index) => index.checked === true);
    if (findtype === -1) findtype = 0;
  }, []);

  const handleChange = (data) => {
    if (data.info === "type") {
      const copyProducts = [...wordType];
      const modifiedProducts = copyProducts.map((type) => {
        if (data.contents === type.contents) {
          type.checked = !type.checked;
        } else {
          type.checked = false;
        }
        return type;
      });
      setWordtype(modifiedProducts);
    }
  };

  console.log(wordType.contents)

    return (
      <div className="filter">
        {wordType &&
        wordType.map((type, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              className="check_typefilter"
              checked={type.checked}
              onChange={() => {
                handleChange(type);
              }}
            />
            <label className="label_typefilter">
              {type.contents}
              {/* {checkData.area} */}
            </label>
            {/* </div> */}
            </div>
        ))}
      </div>
    )
  }
  export default TypeFilter;