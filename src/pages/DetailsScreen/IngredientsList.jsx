import React from 'react';
import PropTypes from 'prop-types';

const IngredientsList = ({ ingredients, recipe }) => {
  return (
    <ul>
      {ingredients(recipe).map((item) => (
        <li
          key={`${item.ingredient}${item.measure}`}
        >{`${item.ingredient} - ${item.measure}`}</li>
      ))}
    </ul>
  );
};

IngredientsList.propTypes = {
  ingredients: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default IngredientsList;
