import React from 'react';
import Filter from "../components/filter/Filter";
import MoviesList from "../components/movies/MoviesList";

const Home = () => (
   <div className="home">
      <div className="container">
         <Filter />
         <MoviesList />
      </div>
   </div>
);

export default Home
