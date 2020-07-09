import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faHeart as fasHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Movie = ({ id, title, poster, vote, overview, date, handleClick, isFav, favList, list }) => {
   const imgUrl = `https://image.tmdb.org/t/p/w200${poster}`;
   const [favOne, setFaveOne] = useState(!isFav);
   const movieVote = vote * 10;
   const needeDate = () => {
      const theDate = new Date(date);
      const months = [
         'Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
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
            list ? 
            <FontAwesomeIcon 
               icon={(favOne && !favList) ? farHeart : fasHeart} 
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
         <span>{needeDate()}</span>
         <section>
            <h3>About Movie</h3>
            <p>{overview}</p>
         </section>
      </div>
   )
}

export default Movie
