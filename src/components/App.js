import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import HomePage from "./HomePage";
import FilmPage from "./FilmPage";
// import Footer from "./Footer";
// import cursor from "../media/cursor.png";

import "../styles.scss";

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
