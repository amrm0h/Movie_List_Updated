import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import { MovieContext } from '../../dataFetching/contextProvider/ContextProvider';


// function to make home active 
const onPath = (match, location, paths) => {
   return paths.includes(location.pathname);
}

const Nav = () => {

   const { handleChangeUrl } = useContext(MovieContext);
   // when return to home , activate the first page 
   const handleClick = () => handleChangeUrl("top-rated", 1);

   return (
      <nav>
         <ul>
            <li>
               <NavLink
                  to="/top-rated"
                  activeClassName="active_link"
                  isActive={
                     () =>
                        onPath(window.match, window.location, ["/", "/top-rated", "/now-playing", "/upcoming"])
                  }
                  exact
                  onClick={handleClick}
               >
                  <FontAwesomeIcon icon={faHome} />
               Home</NavLink>
            </li>
            <li>
               <NavLink
                  to="/favourites"
                  activeClassName="active_link"
               >
                  <FontAwesomeIcon icon={faHeart} />
               Favourites</NavLink>
            </li>
         </ul>
      </nav>
   )
}

export default Nav;