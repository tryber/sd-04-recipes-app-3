import React from 'react';
import PropTypes from 'prop-types';

const IngredientsList = ({ recipeInfo, recipe, isFood }) => (
  <div>
    {recipeInfo(recipe[0], isFood).ingredients.map((item, index) => (
      <li
        key={`${item.ingredient}${item.measure}`}
        data-testid={`${index}-ingredient-step`}
      >
        <input type="checkbox" name={item.ingredient} id={item.ingredient} />
        <label htmlFor={item.ingredient}>
          {`${item.ingredient} - ${item.measure}`}
        </label>
      </li>
    ))}
  </div>
);

IngredientsList.propTypes = {
  recipeInfo: PropTypes.func.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFood: PropTypes.bool.isRequired,
};

export default IngredientsList;
