import { useState, useEffect } from "react";
import "./CatFilter.css";
import { useNavigate } from "react-router-dom";

export default function CatFilter({ setType }) {
  const navigate = useNavigate();

  const [activeCat, setActiveCat] = useState("All");

  const handleClick = (e) => {
    setActiveCat(e.target.value);
  };

  // const navigatePlace = () => {
  //   navigate("/Location");
  // };

  // const navigateDate = () => {
  //   navigate("/Calendar");
  // };

  useEffect(() => {
    setType(activeCat);
  }, [activeCat]);

  return (
    <main>
      <section>
        <article className="categories">
          <button value="All" className={activeCat === "All" ? "active_btn" : "cat_btn hover"} onClick={handleClick}>
            전체
          </button>
          <button value="person" className={activeCat === "person" ? "active_btn" : "cat_btn hover"} onClick={handleClick}>
            인물
          </button>
          <button value="place" className={activeCat === "place" ? "active_btn" : "cat_btn hover"} onClick={handleClick}>
            장소
          </button>
          <button value="date" className={activeCat === "date" ? "active_btn" : "cat_btn hover"} onClick={handleClick}>
            날짜
          </button>
        </article>
      </section>
    </main>
  );
}
