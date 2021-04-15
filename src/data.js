// axios get data here 
// scrape ?
// randomise function 
// export function as deconstructed object { getRandomFilm }
// import at top of file page

import axios from 'axios';


const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

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
