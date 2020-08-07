import React, { useState } from 'react';
import favoriteIconWhite from '../../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../../images/blackHeartIcon.svg';

const FavoriteBtn = () => {
  const [favorite, setFavorite] = useState(false);

  return (
    <button type="button" onClick={() => setFavorite(!favorite)}>
      <img
        src={favorite ? favoriteIconBlack : favoriteIconWhite}
        alt="Favorite button"
      />
    </button>
  );
};

export default FavoriteBtn;
