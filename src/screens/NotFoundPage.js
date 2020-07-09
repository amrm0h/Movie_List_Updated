import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => (
   <div className="not_found_page">
      <div className="container">
         <FontAwesomeIcon icon={faSadCry} />
         <p>404 !! - Page Not Found</p>
      </div>
   </div>
);

export default NotFoundPage;
