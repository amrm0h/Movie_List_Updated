import React, { useContext } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { MovieContext } from "../../dataFetching/contextProvider/ContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
   const { handleChangeUrl } = useContext(MovieContext);

   return (
      <header>
         <div className="container">
            <h1>
               <Link
                  to="/top-rated"
                  onClick={() => handleChangeUrl("top-rated", 1)}
               >
                  <FontAwesomeIcon icon={faVideo} />
               Movies</Link>
            </h1>
            <Nav />
         </div>
      </header>
   )
}

export default Header;