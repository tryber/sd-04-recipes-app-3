import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  // const location = useLocation();
  const title = /(\/comidas|\/bebidas)(\/[0-9]+$)/;
  return (
    <div className="header" style={{ display: 'flex' }}>
      <div className="ico_user" />
      <p>Comidas</p>
      <div className="ico_search" />
    </div>
  );
};

export default Header;
