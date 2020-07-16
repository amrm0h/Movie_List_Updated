import React, { useContext, useState, useEffect } from 'react';
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
   const [ burgerNav, setburgerNav ] = useState(false);
   const [ ulExpanded, setUlExpanded ] = useState(false);

   const navBarBurgering = () => {
      if ( window.innerWidth <= 600 ) {
         setburgerNav(true);
      } else {
         setburgerNav(false);
      }
   };

   useEffect(() => {
      navBarBurgering();
      window.addEventListener("resize", navBarBurgering);
   }, []);

   return (
      <nav 
         className={burgerNav ? "collapsed" : undefined}
         style={{
            height: burgerNav ? 'auto' : 'unset'
         }}
      >
         <span 
            className={ulExpanded ? 'burger close' : 'burger'} 
            onClick={() => {
               setUlExpanded(ex => !ex);
            }}
         >
            <span></span>
            <span></span>
            <span></span>
         </span>

         <ul
            className={(burgerNav &&  !ulExpanded) ? 'ul_not_expanded' : 'ul_expanded'}
            style={{
               overflow: 'hidden'
            }}
         >
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