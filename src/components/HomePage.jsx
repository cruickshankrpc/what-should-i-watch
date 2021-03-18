import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cursor from "../media/cursor.png";
import Button from './Button';
import Footer from "./Footer";

const HomePage = () => {
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const [randomFilm, setRandomFilm] = useState([]);
  const [clean, setClean] = useState(false);
  const [color, setColor] = useState("#ffecea");

  const getRandomFilm = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/list/5233088?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((film) => {
        // Logic to get a random film from filmData array
        const filmData = film.data.items;
        const shuffledFilm =
          filmData[Math.floor(Math.random() * filmData.length) + 1];
        setRandomFilm(shuffledFilm);
      });
  };

  useEffect(() => {
    getRandomFilm();
  }, []);

  function toggleButton() {
    if (!clean) {
      setClean(true);
      // setColor('')
    } else {
      setClean(false);
      setColor("lightgray");
    }
  }
  // console.log("COLOR", color);

  return (
    <div className="home_container">
      <div className="home_box">
        <p className="home_text">
          {!clean
            ? "What the f*** should I watch ?"
            : "Tell me what to watch pretty please"}
        </p>
      </div>
      <Link to={`filmpage/${randomFilm.original_title}/${randomFilm.id}`}>
        <img className="cursor_img" src={cursor} alt="cursor" />
      </Link>
      <Footer />
      <button
        className="toggle_button"
        onClick={toggleButton}
        style={{ backgroundColor: !clean ? "#ffecea" : "lightgray" }}
      >
        {!clean ? "Keep it Clean!" : "Make it Dirty!"}
      </button>
      {/* <Button /> */}
    </div>
  );
};

export default HomePage;
