import React from 'react';
import PaginationItem from './PaginationItem';


const numbers = [1, 2, 3, 4, 5];

const Pagination = () => {

   return (
      <section className="pagination">
         <ul>
            {
               numbers.map(num =>
                  <li key={num} className={num === 1 && 'active'}>
                     <PaginationItem number={num} />
                  </li>)
            }
         </ul>
      </section>
   )
};

export default React.memo(Pagination)
