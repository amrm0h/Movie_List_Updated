export const initialState = {
   isLoading: false,
   movies: [],
   error: null
};

// type of actions 
export const startFetch = 'FETCHING_STARTED';
export const completeFetch = 'FETCHING_COMPLETED';
export const errorFetch = 'FETCHING_ERROR';

// Reducer for fetching 
const fetchMoviesReducer = (state = initialState, action) => {
   switch (action.type) {
      case startFetch:
         return {
            ...state,
            isLoading: true,
            error: null
         }
      case completeFetch:
         return {
            isLoading: false,
            movies: action.data,
            error: null
         }
      case errorFetch:
         return {
            ...state,
            isLoading: false,
            movies: [],
            error: action.error
         }
      default:
         return state;
   }
}

export default fetchMoviesReducer;
