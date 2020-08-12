import React from 'react';
import { useLocation, useRouteMatch, Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import '../../css/Header.css';

const getTitle = (location) => {
  let titleArray = location.pathname.split('/');
  titleArray.shift();
  if (titleArray.length === 1) { titleArray = titleArray[0].split('-'); }
  if (titleArray.length === 3) titleArray.splice(1, 1);
  titleArray = titleArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  if (titleArray.includes('Area')) {
    titleArray.pop();
    titleArray.splice(1, 1, 'Origem');
  }
  return titleArray.join(' ');
};

const HeaderExplore = () => {
  const location = useLocation();
  const foodRoute = useRouteMatch('/comidas/:id/');
  const drinkRoute = useRouteMatch('/bebidas/:id/');
  if (
    location.pathname === '/' || foodRoute !== null || drinkRoute !== null
  ) return <div />;
  return (
    <React.Fragment>
      <div>
        <div className="header-explore">
          <Link to="/perfil">
            <div className="ico_user">
              <img data-testid="profile-top-btn" src={profileIcon} alt="profile icon" />
            </div>
          </Link>
          <p data-testid="page-title">{getTitle(location)}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderExplore;
