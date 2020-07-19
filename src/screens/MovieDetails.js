import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { api } from '../shared/constants/api/apiUrlAndKey';
import Movie from '../components/movies/Movie';
import Spinner from '../components/movies/Spinner';



const MovieDetails = () => {

   const id = useParams().id;
   const url = `${api.baseUrl}movie/${id}?api_key=${api.key}&language=en-US`;
   const [movie, setMovie] = useState({});

   useEffect(() => {
      // function to get the needed movie
      const fetchingSingleMovie = async () => {
         const response = await fetch(url);
         const movie = await response.json();

         setMovie(movie);
      };
      fetchingSingleMovie();
   }, [url]);

   return (
      <div className="movie_details" style={{ color: 'white' }}>
         <div className='container'>
            {
               movie.id ?
                  (<Movie {...movie} detail />) :
                  (<Spinner />)
            }
         </div>
      </div>
   )
}

export default MovieDetails
