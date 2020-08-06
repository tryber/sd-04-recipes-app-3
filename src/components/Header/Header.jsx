import React, { useState } from 'react';
import { useLocation, useRouteMatch, Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';

import './Header.css';

const Header = () => {
  const location = useLocation();
  const foodRoute = useRouteMatch('/comidas/:id/');
  const drinkRoute = useRouteMatch('/bebidas/:id/');
  const styling = { display: 'flex' };
  const [barStatus, toogleSearch] = useState(false);
  const getTitle = () => {
    let titleArray = location.pathname.split('/');
    titleArray.shift();
    if (titleArray.length === 1) { titleArray = titleArray[0].split('-'); }
    if (titleArray.length === 3) titleArray.splice(1, 1);
    titleArray = titleArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    if (titleArray.includes('Area')) {
      titleArray.pop();
      titleArray.splice(1, 1, 'Origem');
    }
    const str = titleArray.join(' ');
    return str;
  };

  const renderSearchBtn = () => {
    const title = getTitle();
    if (title.includes('Explorar') || title.includes('Receitas') || title.includes('Perfil')) {
      if (!title.includes('Origem')) {
        return <div className="empty" />;
      }
    }
    return (
      <button type="button" className="ico-search-btn" onClick={() => toogleSearch(!barStatus)}>
        <img data-testid="search-top-btn" src={searchIcon} alt="profile icon" className="ico-search" />
      </button>
    );
  };

  if (
    location.pathname === '/' || foodRoute !== null || drinkRoute !== null
  ) return <div />;

  return (
    <React.Fragment>
      <div className="header" style={styling}>
        <Link to="/perfil">
          <div className="ico_user">
            <img data-testid="profile-top-btn" src={profileIcon} alt="profile icon" />
          </div>
        </Link>
        <p data-testid="page-title">{getTitle()}</p>
        {renderSearchBtn()}
      </div>
      {barStatus ? <SearchBar /> : null}
    </React.Fragment>
  );
};

export default Header;
