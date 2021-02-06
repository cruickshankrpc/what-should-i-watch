import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const [filmList, setFilmList] = useState([]);

  const myFilmList = (() => {
    axios.get(`https://api.themoviedb.org/3/list/5233088?api_key=${API_KEY}&language=en-US&page=1`)
      .then(film => {
        setFilmList(film.data.items);
        console.log(film.data.items);
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
      <div></div>
      {/* <Link to={`filmpage/${film.title}/${film.id}`}>
        <img className="cursor_img" src={cursor} alt="cursor" />
      </Link> */}
      {/* <div component={Footer}></div> */}
      {/* <Footer></Footer> */}
    </div>
  );
};

export default HomePage;
