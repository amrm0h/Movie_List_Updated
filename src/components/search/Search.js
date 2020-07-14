import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ movies, visibility, handleChangeVisibleMovies }) => {
   const [ inputVal, setInputVal ] = useState('');

   useEffect(() => {
      setInputVal("");
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
               value={inputVal}
               type="search"
               name="search-movies"
               placeholder="Type The Movie Name ..."
               onChange={(e) => {
                  const userInput = e.target.value.toLowerCase();
                  setInputVal(userInput);
                  handleChangeVisibleMovies(userInput);
               }}
            />
            <FontAwesomeIcon icon={ faSearch } flip="horizontal" fixedWidth />
         </div>
      </section>
   )
}

export default Search;
