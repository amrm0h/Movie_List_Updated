import React, { useCallback, useRef, useEffect } from 'react';
import PaginationItem from './components/PaginationItem';

const Pagination = React.memo(() => {
   const listRef = useRef();
   const memoizedPaginationItem = useCallback(() => {
      const myList = listRef.current;
      // function to create numbers from 1 to movieCount
      const createPagiNumbers = () => {
         let numbers = [];
         for ( let x = 1; x <= 5; x++ ) {
            numbers.push(x);
         }
         return numbers;
      }
      return (
         createPagiNumbers().map(num => 
         <li key={num}>
            <PaginationItem lref={myList} number={num}/>
         </li>)
      )
   }, []);

   useEffect(() => {
      if ( listRef ) {
         const firstElement = listRef.current.children[0]; 
         firstElement.setAttribute("class", "active");
      }
   });

   return (
      <section className="pagination">
         <ul ref={listRef}>
            {memoizedPaginationItem()}
         </ul>
      </section>
   )
});

export default Pagination
