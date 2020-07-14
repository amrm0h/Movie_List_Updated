import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faHeart as fasHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocation } from 'react-router-dom';

const months = [
   'Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];


const Movie = ({ id, title, poster_path, vote_average, overview, release_date, handleClick, isFav }) => {
   
   // get location as boolean value for home page
   const location = useLocation().pathname !== '/favourites';
   const imgUrl = `https://image.tmdb.org/t/p/w200${poster_path}`;

   const [favOne, setFaveOne] = useState(!isFav);
   const movieVote = vote_average * 10;
   const neededDate = () => {
      const theDate = new Date(release_date);
      const theDay = theDate.getDate();
      const theMonth = months[theDate.getMonth()];
      const theYear = theDate.getFullYear();
      return `${theDay}, ${theMonth} ${theYear}`
   }

   const progressColor = () => {
      if ( movieVote > 80 )  return '#055305';
      if ( movieVote > 70 && movieVote < 80 ) return '#b8b849';
      return '#b60000';
   }

   return (
      <div className="movie">
         <button
            onClick={(e) => {
               handleClick(id);
               favOne && setFaveOne(f => !f);
            }}
         >
         {
            location ?
            <FontAwesomeIcon 
               icon={(favOne && location) ? farHeart : fasHeart} 
               onClick={(e) => {
                  e.target.classList.add("beat");
               }}
            /> :
            <FontAwesomeIcon icon={faTrashAlt} />
         }
         </button>
         <div className="image_holder">
            <img src={imgUrl} alt="" />
         </div>
         <span>
            <CircularProgressbar
               className="progress_bar"
               value={movieVote}
               text={`${movieVote}%`}
               background
               backgroundPadding={4}
               strokeWidth={5}
               styles={buildStyles({
                  strokeLinecap: 'rounded',
                  pathColor: progressColor(),
                  textColor: progressColor()
               })}
            />
         </span>
         <h2>
            <FontAwesomeIcon icon={faFilm} />
            <span>{title}</span>
         </h2>
         <span>{neededDate()}</span>
         <section>
            <h3>About Movie</h3>
            <p>{ overview.length >= 300 ? 
               `${overview.slice(0, 300)}...` : 
               overview
               }</p>
         </section>
      </div>
   )
}

export default React.memo(Movie);