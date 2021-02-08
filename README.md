# What the f*** should I watch ?

## Overview

Fun little (made by womxn) film randomiser application inspired by ["Where the f*** should I go eat?"](http://wtfsigte.com/) and consequent noughties corners of the internet. For those with Netflix fatigue. For those wishing to see more gems made by womxn. Enjoy! 

## Process

### Stage 1:

#### Design

I had a lot of fun making the design for the app in [Figma](https://www.figma.com/file/GfhSUCNhyxbnGCkMImUDuM/What-Should-I-Watch%3F%3F); incorporating a fun, simple,  ~ millenial ~ aesthetic with bold colours, a sans-serif font, and throwback pixellated icons: 

##### Mobile

<p align="center">
<img src="/media/what-should-i-watch-mobile_iphone12black_portrait.png" alt="mobile home" width="200" >
</p>


##### Desktop

<p align="center">
<img src="/what-should-i-watch/media/wsiw-desktop.gif" width="800" >
</p>

#### Set up 

npx-create-react-app what-should-i-watch
-> creates app 
-> download dependencies (react-router-dom, axios)
-> create HomePage 
-> Import BrowserRouter from react-router-dom in index.js 
-> import Switch and Route from react-router-dom into App.js so that I can navigate between pages
-> put API key in dotenv file, add .env to my .gitignore file
-> check that I can make an API call to fetch data using react hooks (useState & useEffect) and axios, console log the data
-> write logic to retrieve random film from the custom list I made on TMDB:
```js
const myFilmList = (() => {
    axios.get(`https://api.themoviedb.org/3/list/5233088?api_key=${API_KEY}&language=en-US&page=1`)
      .then(film => {
        setFilmList(film.data.items);

        // Logic to get a random film from filmData array
        const filmData = film.data.items;
        console.log(filmData)
        const randomFilm = filmData[Math.floor(Math.random() * filmData.length)];
        console.log('rando:', randomFilm)
      }

      )
  })
```
This logic is limited, however, as it allows for repeats. This is something I will work on. 
-> use randomFilm to Link to filmpage
-> build FilmPage component. 
-> find correct API call in Insomnia to return the JSON for the DIRECTOR: credits API call with movie ID
->







