import React from 'react';
import '../css/mealsScreen.css';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar/SearchBar';

const mainScreen = () =>
  <div>
    <header>
      <SearchBar />
    </header>
    <div>
      <button>Categoria</button>
    </div>
    <ItemCard />
  </div>;

export default mainScreen;
