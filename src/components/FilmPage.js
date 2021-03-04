import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Footer from "./Footer";

const FilmPage = (props) => {
  let filmID = props.match.params.id;
  let history = useHistory();
  const [filmData, setFilmData] = useState([]);
  const [directorName, setDirectorName] = useState([]);
  const [clean, setClean] = useState(false);
  const [color, setColor] = useState("#ffecea");

  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
  const [randomFilm, setRandomFilm] = useState([]);

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

  useEffect(() => {
    // props is an object passed from HomePage containing information we passed into URL
    // get CREDITS for DIRECTOR using filmID
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${filmID}?api_key=${API_KEY}&append_to_response=credits`
      )
      .then((axiosData) => {
        setFilmData(axiosData.data);
        return axiosData.data;
        // returning the data to CHAIN below: data = axiosData.data
      })
      .then((data) => {
        // use the find() Array method to find obj containing key value of 'Job: "Director"'
        let crewObj = data.credits.crew.find((obj) => obj.job === "Director");
        // grab the name of the director from the obj using dot notation (property accessor)
        let director = crewObj.name;
        // update directorName state
        setDirectorName(director);
        });
  }, [props.match.params.id]);

  const handleClick = () => {
    history.push(`/filmpage/${randomFilm.original_title}/${randomFilm.id}`);
    window.location.reload();
  };

  console.log("FILMDATA>>>", filmData);
  console.log("FILM TITLE>>>", filmData.original_title)
  console.log("FILM TITLE TYPE>>>", typeof(filmData.original_title))


  function toggleButton() {
    if (!clean) {
      setClean(true);
      // setColor('')
    } else {
      setClean(false);
      setColor("lightgray");
    }
  }

  // logic to convert string, remove whitespace, add dash to querystring
  const filmDashName = (input) => {
    let newStr = input.split(" ");
    let searchStr = newStr.join("-");
    return searchStr;
  }

  console.log('FILM GENRE', typeof(filmData.genres))
  // console.log('FILM GENRE', filmData.genres)

  return (
    <div className="filmpage_container">
      <div className="film_container">
        <h1>{!clean
            ? "Shut the f*** up and watch this:"
            : "Hey, how about this?"}</h1>
                  <button
        className="toggle_button_filmPage"
        onClick={toggleButton}
        style={{ backgroundColor: !clean ? "#ffecea" : "lightgray" }}
      >
        {!clean ? "Keep it Clean!" : "Make it Dirty!"}
      </button>

<div className="film_info">
        <div className="film_left">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500/${filmData.poster_path}`}
            alt="Film Poster"
          />
        </div>

        <div className="film_right">
          <h2 className="title">{filmData.original_title}</h2>
          <h3 className="release_date">
            {moment(filmData.release_date).format("YYYY")}
          </h3>
          <div className="genre">
            {filmData.genres && filmData.genres.map(genre => {
              return <h3>{genre.name}</h3>})}
          </div>
          <p className="overview">{filmData.overview}</p>
          <h3 className="director">Director: {directorName}</h3>
        </div>
        </div>

        <div className="filmpage_buttons_container">
          <Link onClick={handleClick}>
            <button className="filmpage_button">
              <p>No way, Jose!</p>
            </button>
          </Link>

            <a
              href={`https://www.themoviedb.org/movie/${filmID}-${filmData.original_title}/watch?language=en-GB`}
            >
              <button className="filmpage_button">
                <p>How do I watch?</p>
              </button>
            </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FilmPage;
