import React from 'react';
import { ItemCard, SearchBar } from '../components';
import '../css/mainScreen.css';

const mainScreen = () => (
  <div>
    <header>
      <SearchBar />
    </header>
    <div>
      <button type="button">Categoria</button>
    </div>
    <ItemCard />
  </div>
);

export default mainScreen;
