import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cursor from '../cursor.png';
const HomePage = () => {
  
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
        console.log('filmData:', filmData)
        const shuffledFilm = filmData[Math.floor(Math.random() * filmData.length)];
        console.log('rando:', shuffledFilm.original_title)
        setRandomFilm(shuffledFilm);
      })
  })

  useEffect(() => {
    myFilmList()
  }, [])

  return (
    <div className="home-container">
      <div className="home_box">
        <p className="home_text">What the f*** should I watch ?</p>
      </div>
       <Link to={`filmpage/${randomFilm.original_title}/${randomFilm.id}`}>
       <img className="cursor_img" src={cursor} alt="cursor" />
      </Link>
      {/* <div component={Footer}></div> */}
      {/* <Footer></Footer> */}
    </div>
  );
};

export default HomePage;
