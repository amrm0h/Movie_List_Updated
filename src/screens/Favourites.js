import React, { useState, useEffect } from 'react';
import Movie from '../components/movies/Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Favourites = () => {
   const [favMovies, setFavMovies] = useState([]);
   const saveToLocalStorage = (savedValue) => {
      return localStorage.setItem("favMovies", JSON.stringify(savedValue));
   }
   const handleClickRemoveSingle = (wantedRemoveId) => {
      const remainingFavMovies = favMovies.filter(movie => movie.id !== wantedRemoveId);
      saveToLocalStorage(remainingFavMovies);
      setFavMovies(remainingFavMovies);
   };
   const handleClickRemoveAll = () => {
      saveToLocalStorage([]);
      setFavMovies([]);
   }

   useEffect(() => {
      const getMoviesFromStorage = JSON.parse(localStorage.getItem("favMovies"));
      // remove repeated movies
      if (getMoviesFromStorage && getMoviesFromStorage.length > 0) {
         const returnedArray = getMoviesFromStorage.filter((movie, i, arr) => {
            return arr.map(movie => movie["id"]).indexOf(movie["id"]) === i;
         })
         setFavMovies(returnedArray);
      }
   }, []);

   return (
      <div className="favourites">
         <div className="container">
            <section className="movielist_area fav">
               {
                  favMovies.length > 0 &&
                  <button
                     onClick={handleClickRemoveAll}
                  >Remove All</button>}
               <div
                  className="movies"
                  style={{ justifyContent: favMovies.length > 0 && "flex-start" }}
               >
                  {
                     favMovies.length > 0 ?
                        favMovies.map(movie => (
                           <Movie
                              key={movie.id}
                              {...movie}
                              handleClick={(id) => handleClickRemoveSingle(id)}
                           />
                        )) :
                     <section className="no_favs">
                        <FontAwesomeIcon icon={faStar} />
                        <p>No Favourite Movies</p>
                     </section>
                  }
               </div>
            </section>
         </div>
      </div>
   )
}

export default Favourites;