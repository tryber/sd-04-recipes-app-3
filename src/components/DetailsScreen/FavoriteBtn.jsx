import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import favoriteIconWhite from '../../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../../images/blackHeartIcon.svg';
import { getRouteInfo } from '../../helpers';

const createFavoriteItem = (data, location) => {
  const isFood = getRouteInfo(location).mainRoute === 'comidas';
  const id = getRouteInfo(location).recipeId;
  return {
    id,
    type: isFood ? 'comida' : 'bebida',
    area: data.strArea ? data.StrArea : '',
    category: data.strCategory,
    alcoholicOrNot: data.strAlcoholic ? data.strAlcoholic : '',
    name: isFood ? data.strMeal : data.strDrink,
    image: isFood ? data.strMealThumb : data.strDrinkThumb,
  };
};

const setLocalFavorite = (favoriteItem) => {
  let currentFavorites = localStorage.getItem('favoriteRecipes');
  if (!currentFavorites) {
    const favorites = JSON.stringify([favoriteItem]);
    localStorage.setItem('favoriteRecipes', favorites);
  } else {
    currentFavorites = JSON.parse(currentFavorites);
    currentFavorites.push(favoriteItem);
    localStorage.setItem('favoriteRecipes', JSON.stringify(currentFavorites));
  }
};

const FavoriteBtn = () => {
  const [favorite, setFavorite] = useState(false);
  const location = useLocation();
  const recipeData = useSelector((state) => state.api.data);
  const favoriteItem = createFavoriteItem(recipeData[0], location);

  return (
    <button type="button" data-testid="favorite-btn" onClick={() => { setFavorite(!favorite); setLocalFavorite(favoriteItem); }}>
      <img
        src={favorite ? favoriteIconBlack : favoriteIconWhite}
        alt="Favorite button"
      />
    </button>
  );
};

export default FavoriteBtn;
