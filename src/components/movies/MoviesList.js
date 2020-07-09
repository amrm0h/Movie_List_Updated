import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react'
import Movie from './components/Movie';
import { MovieContext } from "../../dataFetching/contextProvider/ContextProvider";
import Search from '../search/Search';
import Pagination from '../pagination/Pagination';
import ErrorModal from './components/ErrorModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';
import Spinner from "./components/Spinner";

const MoviesList = React.memo(() => {
   const { isLoading, movies, error } = useContext(MovieContext);
   const [ visibleMovies, setVisibleMovies ] = useState([]);
   const getFavMoviesFromLocStor = localStorage.getItem("favMovies");
   const favMovies = getFavMoviesFromLocStor ?
      JSON.parse(getFavMoviesFromLocStor) :
      [];

   const memoizedPagination = useMemo(() => 
      <Pagination visibility={movies.length > 0} />, 
      [movies]
      );

   const memoizedMovie = useCallback(() => {
      const handleClick = (wantedId) => {
         const clickedMovie = movies.find(movie => movie.id === wantedId);
         if (favMovies.indexOf(clickedMovie) === -1) {
            clickedMovie.isFav = true;
            favMovies.push(clickedMovie);
            localStorage.setItem("favMovies", JSON.stringify(favMovies));
         }
      };
      return (
         <div 
            className="movies" 
            style={{
               justifyContent: !!visibleMovies.length && 'flex-start'
            }}
         >
            {
               error && 
               <div className="no_match">
                  <FontAwesomeIcon icon={faFrownOpen} />
                  <p>Some Thing Wrong !! Try Refresh the Page .</p>
               </div>}
            {
               (visibleMovies.length === 0 && !error && !isLoading) && 
               <div className="no_match">
                  <FontAwesomeIcon icon={faFrownOpen} />
                  <p>No Matches</p>
               </div>
            }
            {
               visibleMovies.map(movie => (
               <Movie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  vote={movie.vote_average}
                  overview={movie.overview}
                  date={movie.release_date}
                  isFav={movie.isFav}
                  list={true}
                  handleClick={(id) => handleClick(id)}
               />
            ))
            }
         </div>
      )
   }, [favMovies, movies, visibleMovies, error, isLoading]);

   const memoizedSearch = useCallback(() => {
      const handleChangeVisibleMovies = (text) => {
         const searchingVisibleMovies = movies.filter(movie => {
            const lowerCaseTitle = movie.title.toLowerCase();
            const lowerCaseText = text.toLowerCase();
            return lowerCaseTitle.includes(lowerCaseText);
         });
         setVisibleMovies(searchingVisibleMovies);
      };
      return (
         <Search
            movies={movies}
            visibility={movies.length > 0}
            handleChangeVisibleMovies={
               (t) => handleChangeVisibleMovies(t)
            }
         />
      )
   }, [movies]);

   // get root chain of my page
   const getRootChain = () => {
      const windowPath = window.location.pathname;
      const neededPortion = windowPath.substr(windowPath.indexOf("/") + 1);
      const firstLetter = neededPortion.charAt(0).toUpperCase();
      let cat = "";
      let chain = `Home / `;
      if (windowPath.endsWith("/")) {
         cat = "Top rated";
         chain += `${cat}.`
      } else {
         cat = `${firstLetter}${windowPath.substr(windowPath.indexOf("/") + 2)}`.replace("-", " ");
         chain += `${cat}.`
      }
      return chain;
   }
   useEffect(() => {
      setVisibleMovies(movies);
      return () => setVisibleMovies([]);
   }, [movies]);
   
   return (
      <section className="movielist_area" >
         <div className="curr_page">
            {getRootChain()}
         </div>
         {memoizedSearch()}
         {memoizedPagination}
         {(isLoading && !error) && <Spinner />}
         {error && <ErrorModal />}
         {!isLoading && memoizedMovie()}
      </section>
   )
});

export default MoviesList
