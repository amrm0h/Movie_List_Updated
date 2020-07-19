import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./screens/Home";
import Favourites from "./screens/Favourites";
import NotFoundPage from "./screens/NotFoundPage";
import Header from './components/header/Header';
import ContextProvider from "./dataFetching/contextProvider/ContextProvider";

import "normalize.css"
import "./shared/css/App.scss";
import MovieDetails from './screens/MovieDetails';

const App = () => {
  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <Header />
          <Switch>
            <Route path={["/", "/top-rated", "/now-playing", "/upcoming"]} exact>
              <Redirect to="/top-rated" />
              <Home />
            </Route>
            <Route path="/favourites" component={Favourites} exact />
            <Route path="/movie/ID_:id" component={MovieDetails}  />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;