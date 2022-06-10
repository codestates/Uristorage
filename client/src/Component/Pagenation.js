import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import "./Component.css"

function Pagination({ pages = 10, setCurrentPage }) {
  const pagesNum = []
  for (let i = 1; i <= pages; i++) {
    pagesNum.push(i)
  }
  const [currentButton, setCurrentButton] = useState(1)
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

  useEffect(() => {
      const wordpage = [...pagesNum]
      setArrOfCurrButtons(wordpage)
      setCurrentPage(currentButton)
  }, [currentButton])

  //console.log("button", currentButton)
  //console.log("arrbutton", arrOfCurrButtons)

  return (
    <div className="pagination-container">
      <a href="#" className={`${currentButton === 1 ? 'disabled' : ''}`} //비활성화
        onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}>
        Prev
      </a>

      {arrOfCurrButtons.map(((item, index) => {
        return <a href="#" key={index}
          className={`${currentButton === item ? 'active' : ''}`}
          onClick={() => setCurrentButton(item)}>
          {item}
        </a>
      }))}

      <a href="#"  className={`${currentButton === pagesNum.length ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => prev >= pagesNum.length ? prev : prev + 1)}>
        Next
    </a>
    </div>
  );
}

export default Pagination