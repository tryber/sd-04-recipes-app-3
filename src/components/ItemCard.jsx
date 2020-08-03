import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = () =>
  // o data-testid devera ser modificado ao utilizar os dados da API
  <div className="item-card" data-testid="${index}-recipe-card">
    <Link>
      <div>
        <img src="" alt="Imagem da receita" />
        <h1>Title</h1>
      </div>
    </Link>
  </div>;

export default ItemCard;
