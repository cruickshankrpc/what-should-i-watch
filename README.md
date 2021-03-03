# What the f*** should I watch ?

## Overview

Fun little (made by womxn) film randomiser inspired by ["Where the f*** should I go eat?"](http://wtfsigte.com/) and consequent noughties corners of the internet. For those with Netflix fatigue. For those wishing to see more gems made by womxn. Enjoy! 

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
-> use the react-router-dom which passes a prop called 'match' into every route that is rendered. Inside this 'match' object is another object called 'params', which holds all the matching params where the key is the name we specified when creating the route - in this case, filmID & filmName:
```jsx
match:
isExact: true
params: {name: "American Psycho", id: "1359"}
path: "/filmpage/:name/:id"
url: "/filmpage/American Psycho/1359"
```


-> I then use the filmID to make an axios get request to TMDB API to the 'credits' endpoint for that film, as this contains extra information needed such as the director name.
```js
const FilmPage = (props) => {

  const [filmData, setFilmData] = useState({});

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const filmID = props.match.params.id;
    console.log("filmID", filmID);
  
    axios.get(`https://api.themoviedb.org/3/movie/${filmID}?api_key=${API_KEY}&append_to_response=credits
    `).then(axiosData => {
      setFilmData(axiosData.data)
    })
  }, [props.match]);

  return (
  <h2>{filmData.id}</h2>
  )
};
```
-> I then used CHAINING from the initial axios call by returning the axios data: (this was tricky at first because I initially wrote this logic outside the useEffect, and forgot to create some state for setting the director name, meaning it worked initially, but then broke when I refreshed the page or tried again.)

```js
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
```






