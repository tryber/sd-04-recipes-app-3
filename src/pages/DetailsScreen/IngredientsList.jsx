import React from 'react';

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

export default IngredientsList;
