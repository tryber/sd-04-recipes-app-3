import React from 'react';
import { Link } from 'react-router-dom';
import HeaderExplore from '../../components/Header/HeaderExplore';
import Footer from '../../components/Footer/Footer';

const MealsExploreScreen = () => (
  <div>
    <HeaderExplore />
    <Footer />
    <Link to="/explorar/comidas">Comidas</Link>
    <Link to="/explorar/comidas">Bebidas</Link>
    <div />
  </div>
);

export default MealsExploreScreen;
