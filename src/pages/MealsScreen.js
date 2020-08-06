import React from 'react';
import { Link } from 'react-router-dom';

const MealsScreen = () => (
  <div>
    <h1>Comidas</h1>
    <Link to="/bebidas/30">
      <h1>Ir para Bebidas</h1>
    </Link>
  </div>
);

export default MealsScreen;
