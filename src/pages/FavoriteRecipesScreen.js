import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipesScreen/FavoriteRecipeCard';
import favoriteRecipes from '../actions/favoriteRecipes';
import { getLS } from '../helpers';

const FavoriteRecipesScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    dispatch(favoriteRecipes(getLS('favoriteRecipes')));
  }, []); // eslint-disable-line

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={() => setFilter('food')}
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={() => setFilter('drink')}
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={() => setFilter('all')}
      >
        All
      </button>

      {favorites
        .filter((item) => {
          if (filter === 'food') {
            return item.type === 'comida';
          }

          if (filter === 'drink') {
            return item.type === 'bebida';
          }

          return item;
        })
        .map((favoriteItem, index) => (
          <FavoriteRecipeCard
            key={favoriteItem.id}
            favoriteItem={favoriteItem}
            favoriteItemIndex={index}
          />
        ))}
    </div>
  );
};

export default FavoriteRecipesScreen;
