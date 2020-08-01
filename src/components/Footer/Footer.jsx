import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

const Footer = () =>
  <footer data-testid="footer">
    <Link to="/bebidas">
      <img src={drinkIcon} alt="Ícone de bebida" />
    </Link>
    <Link to="/explorar">
      <img src={exploreIcon} alt="Ícone de exploração" />
    </Link>
    <Link to="/comidas">
      <img data-testid="food-bottom-btn" src={mealIcon} alt="Ícone de refeição" />
    </Link>
  </footer>;

export default Footer;
