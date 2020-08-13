import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipesScreen/FavoriteRecipeCard';
import favoriteRecipes from '../actions/favoriteRecipes';
import { getLS } from '../helpers';

const FavoriteRecipesScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  useEffect(() => {
    dispatch(favoriteRecipes(getLS('favoriteRecipes')));
  }, []); // eslint-disable-line

  return (
    <div>
      <Header />
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>

      {favorites.map((favoriteItem, index) => (
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
