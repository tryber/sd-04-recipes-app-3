import React, { useState } from 'react';
import { useLocation, useRouteMatch, Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import './Header.css';

const Header = () => {
  const location = useLocation();
  const foodRoute = useRouteMatch('/comidas/:id/');
  const drinkRoute = useRouteMatch('/bebidas/:id/');
  const styling = { display: 'flex' };
  const [barStatus, toogleSearch] = useState(false);

  if (
    location.pathname === '/' || foodRoute !== null || drinkRoute !== null
  ) return <div />;

  return (
    <React.Fragment>
      <div className="header" style={styling}>
        <Link to="/perfil">
          <div className="ico_user" data-testid="profile-top-btn" />
        </Link>
        <p data-testid="page-title">Comidas</p>
        <button type="button" className="ico_search" data-testid="search-top-btn" onClick={() => toogleSearch(!barStatus)} aria-label="search" />
      </div>
      {barStatus ? <SearchBar /> : null}
    </React.Fragment>
  );
};

export default Header;
