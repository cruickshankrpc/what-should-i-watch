import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Footer from "./Footer";

const FilmPage = (props) => {
  let filmID = props.match.params.id;
  let data = props.filmData
  let history = useHistory();
  const [filmData, setFilmData] = useState([]);
  const [directorName, setDirectorName] = useState([]);
  const [isClean, setClean] = useState(false);
  // const [color, setColor] = useState("#ffecea");

  console.log("FILMDATA>>", data)

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
        const shuffledFilm = filmData &&
          filmData[Math.floor(Math.random() * filmData.length) + 1];
        setRandomFilm(shuffledFilm);
      })
      .catch(err => {
        if (err.response) {
          // request made and server responded
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // req was made but no response received 
          console.log(err.request);
        } else {
          // something happened in setting up the request that triggered an error
          console.log('Error:', err.message);
        }
      })
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

  // Logic to change text & button colour
  function toggleButton() {
    if (!isClean) {
      setClean(true);
    } else {
      setClean(false);
    }
  }

  return (
    <div className="filmpage_container">
      <div className="film_container">
        <h1 className="heading">
          {isClean
            ? "Hey, how about this?"
            : "Shut the f*** up and watch this:"}
        </h1>
        <button
          className="toggle_button_filmPage"
          onClick={toggleButton}
          style={{ backgroundColor: isClean ? "lightgray" : "#ffecea" }}
        >
          {isClean ? "Make it Dirty!" : "Keep it Clean!"}
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
            <h2 className="title">
              {filmData.original_title} (
              {moment(filmData.release_date).format("YYYY")})
            </h2>
            <div className="genre">
              {filmData.genres &&
                filmData.genres.map((genre) => {
                  return <h4>{genre.name}</h4>;
                })}
            </div>
            <p className="overview">{filmData.overview}</p>
            <h4 className="director">Director: {directorName}</h4>
          </div>
        </div>
      </div>
      <div className="filmpage_buttons_container">
          <Link onClick={handleClick}>
            <button className="filmpage_button">
              <p>{isClean ? "Try again pretty pls" : "Try again..." }</p>
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
      <Footer />
    </div>
  );
};

export default FilmPage;
