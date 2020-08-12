import React from 'react';
import { Link } from 'react-router-dom';
import HeaderExplore from '../../components/Header/HeaderExplore';
import Footer from '../../components/Footer/Footer';

const DrinksExploreScreen = () => (
  <div>
    <HeaderExplore />
    <Footer />
    <Link to="/explorar/comidas">Explorar Comidas</Link>
    <Link to="/explorar/bebidas">Explorar Bebidas</Link>
    <div />
  </div>
);

export default DrinksExploreScreen;
