import React, { useState } from 'react';
import { useLocation, useRouteMatch, Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import './Header.css';

const Header = () => {
  const location = useLocation();
  const foodRoute = useRouteMatch('/comidas/:id/');
  const drinkRoute = useRouteMatch('/bebidas/:id/');
  const styling = { display: 'flex' };
  if (
    location.pathname === '/' || foodRoute !== null || drinkRoute !== null
  ) styling.display = 'none';
  const [barStatus, toogleSearch] = useState(false);

  return (
    <React.Fragment>
      <div className="header" style={styling}>
        <Link to="/perfil">
          <div className="ico_user" />
        </Link>
        <p>Comidas</p>
        <button type="button" className="ico_search" onClick={() => toogleSearch(!barStatus)} aria-label="search" />
      </div>
      <SearchBar searchClass={barStatus ? 'search-off search-on' : 'search-off'} />
    </React.Fragment>
  );
};

export default Header;
