import React, { useContext, useState, useEffect } from 'react'
import Movie from './Movie';
import { MovieContext } from "../../dataFetching/contextProvider/ContextProvider";
import Search from '../search/Search';
import Pagination from '../pagination/Pagination';
import ErrorModal from './ErrorModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';
import Spinner from "./Spinner";

const MoviesList = () => {
   const { isLoading, movies, error } = useContext(MovieContext);
   const [visibleMovies, setVisibleMovies] = useState([]);

   const getFavMoviesFromLocStor = localStorage.getItem("favMovies");
   const favMovies = getFavMoviesFromLocStor ?
      JSON.parse(getFavMoviesFromLocStor) :
      [];

   const handleClick = (wantedId) => {
      const clickedMovie = movies.find(movie => movie.id === wantedId);
      if (favMovies.indexOf(clickedMovie) === -1) {
         clickedMovie.isFav = true;
         favMovies.push(clickedMovie);
         localStorage.setItem("favMovies", JSON.stringify(favMovies));
      }
   };

   const handleChangeVisibleMovies = (text) => {
      const filteredMovies = movies.filter(movie => {
         return movie.title.toLowerCase().includes(text);
      });
      setVisibleMovies(filteredMovies);
   };

   // get root chain of my page (breadCrumb)
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
         {(
            <Search
               movies={movies}
               visibility={movies.length > 0}
               handleChangeVisibleMovies={
                  (t) => handleChangeVisibleMovies(t)
               }
            />
         )}
         <Pagination visibility={movies.length > 0} />
         {(isLoading && !error) && <Spinner />}
         {error && <ErrorModal />}
         {!isLoading && (
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
                        {...movie}
                        isFav={movie.isFav}
                        handleClick={(id) => handleClick(id)}
                     />
                  ))
               }
            </div>
         )}
      </section>
   )
};

export default React.memo(MoviesList);
