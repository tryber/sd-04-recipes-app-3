import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const InProgressScreen = () => {
  const { pathname } = useLocation();
  const typeRecipe = (pathname.startsWith('/comida') ? 'meals' : 'drinks');
  const data = useSelector((state) => state.api.data[typeRecipe]);
  //armazenar data no LS
  console.log(data)
  return (
    <div>
      <h1>Receita em progresso</h1>
    </div>
  );
};

export default InProgressScreen;
