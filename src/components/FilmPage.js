import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FilmPage = (props) => {
  const [filmData, setFilmData] = useState([]);
  const [directorName, setDirectorName] = useState([]);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    // props is an object passed from HomePage containing information we passed into URL
    const filmID = props.match.params.id;

    // get credits using filmID
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${filmID}?api_key=${API_KEY}&append_to_response=credits`
      )
      .then((axiosData) => {
        setFilmData(axiosData.data);
        return axiosData.data
        // returning the data to CHAIN below: data = axiosData.data
      }).then((data) => {
        // use the find() Array method to find obj containing key value of 'Job: "Director"'
        let crewObj = data.credits.crew.find((obj) => obj.job === "Director")
        // grab the name of the director from the obj using dot notation (property accessor)
        let director = crewObj.name;
        // update directorName state
        setDirectorName(director);
      })
      
  }, [props.match.params.id]);
  

  return (
    <div className="filmpage-container">
      <h2 className="title">{filmData.original_title}</h2>
      <p className="overview">{filmData.overview}</p>
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/w500/${filmData.poster_path}`}
        alt="Film Poster"
      />
      <h3 className="director">{directorName}</h3>
      <Link>
      <button> Shuffle Again
        </button></Link>
    </div>
  );
};

export default FilmPage;
