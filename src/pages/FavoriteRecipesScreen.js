import React, { useState } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipesScreen/FavoriteRecipeCard';
import FilterBtn from '../components/FavoriteRecipesScreen/FilterBtn';
import { getLS } from '../helpers';
import { Header } from '../components';

const filterFavorites = (arr, filter) => arr.filter((item) => {
  if (filter === 'food') {
    return item.type === 'comida';
  }

  if (filter === 'drink') {
    return item.type === 'bebida';
  }

  return item;
});

const FavoriteRecipesScreen = () => {
  const favorites = getLS('favoriteRecipes');
  const [filter, setFilter] = useState('');

  return (
    <div>
      <Header />
      <FilterBtn
        dataTestId="filter-by-food-btn"
        filter="food"
        setFilter={(value) => setFilter(value)}
        text="Food"
      />
      <FilterBtn
        dataTestId="filter-by-drink-btn"
        filter="drink"
        setFilter={(value) => setFilter(value)}
        text="Drinks"
      />
      <FilterBtn
        dataTestId="filter-by-all-btn"
        filter="all"
        setFilter={(value) => setFilter(value)}
        text="All"
      />

      {favorites ? filterFavorites(favorites, filter).map((favoriteItem, index) => (
        <FavoriteRecipeCard
          key={favoriteItem.id}
          favoriteItem={favoriteItem}
          favoriteItemIndex={index}
        />
      )) : null}
    </div>
  );
};

export default FavoriteRecipesScreen;
