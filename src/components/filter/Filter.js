import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { MovieContext } from '../../dataFetching/contextProvider/ContextProvider';

const Filter = () => {
   const { handleChangeUrl, page } = useContext(MovieContext);
   
   const hanldeClickingTheCategory = (e) => {
      const cat = e.target.getAttribute("data-cat");
      handleChangeUrl(cat, page);
   }

   return (
      <section className="filter_area">
         <span>Filter By Category :</span>
         <ul>
            <li>
               <NavLink
                  to="/top-rated"
                  activeClassName="active-filter"
                  data-cat="top-rated"
                  onClick={hanldeClickingTheCategory}
               >Top Rated</NavLink>
            </li>

            <li>
               <NavLink
                  to="/now-playing"
                  activeClassName="active-filter"
                  data-cat="now-playing"
                  onClick={hanldeClickingTheCategory}
               >Now Playing</NavLink>
            </li>

            <li>
               <NavLink
                  to="/upcoming"
                  activeClassName="active-filter"
                  data-cat="upcoming"
                  onClick={hanldeClickingTheCategory}
               >Upcoming</NavLink>
            </li>
         </ul>
      </section>
   )
};

export default Filter;