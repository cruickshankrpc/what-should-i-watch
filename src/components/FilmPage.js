import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FilmPage = (props) => {
  const [filmData, setFilmData] = useState([]);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const filmID = props.match.params.id;
    // console.log("props", props);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${filmID}?api_key=${API_KEY}&append_to_response=credits
    `
      )
      .then((axiosData) => {
        setFilmData(axiosData.data);
      });

  }, []);

  console.log('filmData crew', filmData.credits.crew);

  let crewObj = filmData.credits.crew.find(obj => obj.job === "Director")
  let director = crewObj.name
  console.log('PLZZ OBJ', crewObj.name)

  return (
    <div className="filmpage-container">
      <h2>{filmData.id}</h2>
      <p>{filmData.original_title}</p>
      <p>{filmData.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${filmData.poster_path}`}
        alt=""
      />
      <p>{director}</p>
    </div>
  );
};

export default FilmPage;
