import React, { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import fetchMoviesReducer, { initialState, startFetch, completeFetch, errorFetch } from "../reducers/fetchMoviesReducer";
import getUrl from "../urlGetter/getUrl";

// change url Reducer
const initialUrlState = {
   cat: "top-rated",
   page: 1
}

// creating context store and Provider
export const MovieContext = React.createContext(initialState.movies);

const ContextProvider = ({ children }) => {
   const [{ isLoading, movies, error }, dispatch] = useReducer(fetchMoviesReducer, initialState);
   const [{ cat, page }, dispatchUrl] = useReducer((state, action) => ({ ...state, ...action }), initialUrlState);
   const [ url, setUrl ] = useState(getUrl(cat, page));
   const isMountedRef = useRef(null);
   const handleChangeUrl = useCallback((movieCat = cat, pageNumber) => {
      setUrl(getUrl(movieCat, pageNumber));
      dispatchUrl({ cat: movieCat });
      dispatchUrl({ page: pageNumber });
   }, [cat]);

   // function fetching movies
   useEffect(() => {
      isMountedRef.current = true;
      if ( cat && page ) {
         const fetMovies = async () => {
            dispatch({ type: startFetch });
            const response = await fetch(url);
            if (response.status === 200) {
               const returnedData = await response.json();
               if (isMountedRef.current) {
                  dispatch({ type: completeFetch, data: returnedData.results });
               }
            } else {
               dispatch({ type: errorFetch, error: "SomeThing Went Wrong !!!" })
            }
         };
         fetMovies();
      }
      return () => isMountedRef.current = false;
   }, [url, cat, page]);

   return (
      <MovieContext.Provider value={{ isLoading, movies, error, handleChangeUrl, page }}>
         {children}
      </MovieContext.Provider>
   );
}

export default ContextProvider
