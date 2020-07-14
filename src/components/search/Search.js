import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ movies, visibility, handleChangeVisibleMovies }) => {
   const inputRef = useRef();
   useEffect(() => {
      inputRef.current.value.length > 0 && (inputRef.current.value = "")
   }, [movies]);

   return (
      <section
         className="search_wrapper"
         style={{
            display: !visibility && "none"
         }}
      >
         <div className="search_area">
            <input
               ref={inputRef}
               type="search"
               name="search-movies"
               placeholder="Type The Movie Name ..."
               onChange={(e) => {
                  const userInput = e.target.value.toLowerCase();
                  handleChangeVisibleMovies(userInput);
               }}
            />
            <FontAwesomeIcon icon={ faSearch } flip="horizontal" fixedWidth />
         </div>
      </section>
   )
}

export default Search;
