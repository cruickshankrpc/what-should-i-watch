import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import FilmPage from './components/FilmPage';
import Footer from './components/Footer';
import cursor from './cursor.png';

import './styles/styles.scss';



function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/filmpage/:name/:id" component={FilmPage}/>
    </Switch>
  )
  
}

export default App;
