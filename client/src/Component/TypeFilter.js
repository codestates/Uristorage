import React, { useState, useEffect } from "react";
import "../Pages/Mypage.css";
import { useNavigate } from "react-router-dom";

function TypeFilter({ data }) {
  const [wordType, setWordtype] = useState([
    { contents: "All", checked: false, info: "type" },
    { contents: "person", checked: false, info: "type" },
    { contents: "place", checked: false, info: "type" },
    { contents: "date", checked: false, info: "type" },
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

  return (
    <div className="filter">
      {wordType &&
        wordType.map((type, idx) => (
          <div className="filter_box" key={idx}>
            <input
              type="checkbox"
              className="check_typefilter"
              checked={type.checked}
              onChange={() => {
                handleChange(type);
              }}
            />
            &nbsp;
            <label className="label_typefilter">
              {type.contents}
              {/* {checkData.area} */}
            </label>
            {/* </div> */}
          </div>
        ))}
    </div>
  );
}
export default TypeFilter;
