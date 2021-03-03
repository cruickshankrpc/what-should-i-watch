import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const FilmPage = (props) => {
  let history = useHistory();
  const [filmData, setFilmData] = useState([]);
  const [directorName, setDirectorName] = useState([]);

  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [filmList, setFilmList] = useState([]);
  const [randomFilm, setRandomFilm] = useState([]);

  const myFilmList = (() => {
    axios.get(`https://api.themoviedb.org/3/list/5233088?api_key=${API_KEY}&language=en-US&page=1`)
      .then(film => {
        // getting the list:
        setFilmList(film.data.items);

        // Logic to get a random film from filmData array
        const filmData = film.data.items;
        // console.log('filmData1:', filmData)
        const shuffledFilm = filmData[Math.floor(Math.random() * filmData.length) + 1];
        setRandomFilm(shuffledFilm);
      })
  })

  useEffect(() => {
    myFilmList()
  }, [])

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

  const handleClick = () => {
    history.push(`/filmpage/${randomFilm.original_title}/${randomFilm.id}`)
    window.location.reload();
  }

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
      <Link onClick={handleClick}>
      <button>Try Again</button></Link>
    </div>
  );
};

export default FilmPage;
