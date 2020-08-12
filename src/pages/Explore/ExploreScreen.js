import React from 'react';
import { Link } from 'react-router-dom';
import HeaderExplore from '../../components/Header/HeaderExplore';
import Footer from '../../components/Footer/Footer';

const ExploreScreen = () => (
  <div>
    <HeaderExplore />
    <Footer />
    <div className="card">
      <Link className="card-body" to="/explorar/comidas" data-testid="explore-food">Explorar Comidas</Link>
    </div>
    <div className="card">
      <Link className="card-body" to="/explorar/comidas" data-testid="explore-drinks">Explorar Bebidas</Link>
    </div>
    <div />
  </div>
);

export default ExploreScreen;
