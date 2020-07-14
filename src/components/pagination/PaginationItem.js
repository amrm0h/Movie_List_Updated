import React, { useContext, useCallback } from 'react'
import { MovieContext } from '../../dataFetching/contextProvider/ContextProvider'

const PaginationItem = React.memo(({ number, lref }) => {
   const { handleChangeUrl }= useContext(MovieContext);
   const handleChangePageNumber = useCallback((e) => {
      const number = e.target.textContent;
      const listItem = e.target.parentElement;
      const parentUlArrayOfChildren = listItem.parentElement.children;
      for ( let sibling of parentUlArrayOfChildren ) {
         if (sibling !== e.target.parentElement ) sibling.removeAttribute("class");
      }
      handleChangeUrl(undefined, number);
      listItem.className = "active";
   }, [handleChangeUrl]);

   return (
      <span 
         onClick={handleChangePageNumber}
      >{number}</span>
   )
});

export default PaginationItem
