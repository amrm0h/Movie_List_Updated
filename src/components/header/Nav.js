import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
   // function to make home active 
   const onPath = (match, location, paths) => {
      return paths.includes(location.pathname);
   }

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
