import React from "react";
import {
  BrowserRouter as Router,
  // HashRouter,
  Route,
  Switch,
} from "react-router-dom";

import HomePage from "./components/HomePage";
import FilmPage from "./components/FilmPage";
// import RandomFilm from "./components/RandomFilm";
import Footer from "./components/Footer";
import cursor from "./cursor.png";

import "./styles/styles.scss";

function App() {
  return (
    // <HashRouter>
      <Router>
        <Switch>
          <Route exact path="/">
          <HomePage />
         </Route>
          <Route path="/filmpage/:name/:id" component={FilmPage} />
        </Switch>
      </Router>
    // </HashRouter>
  );
}

export default App;
