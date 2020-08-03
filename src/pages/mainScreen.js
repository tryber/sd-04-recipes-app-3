import React from 'react';
import '../css/mainScreen.css'
import ItemCard from '../components/ItemCard';

const mainScreen = () =>
  <div>
    <header />
    <div>
      <button>Categoria</button>
    </div>
    <ItemCard />
  </div>;

export default mainScreen;
