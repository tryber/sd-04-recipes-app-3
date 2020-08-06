import React from 'react';
import './Recommendations.css';
import { useLocation } from 'react-router-dom';

const Recommendations = ({ sixRecs }) => {
  const location = useLocation();

  return (
    <div>
      <h1>Recomendadas</h1>
      <div className="carousel">
        <div className="content">
          {location.pathname.startsWith('/comidas')

            ? sixRecs.map((rec, index) =>
              <div className="rec" key={rec.idDrink} data-testid={`${index}-recomendation-card`}>
                <img src={rec.strDrinkThumb} alt="Recomendações" />
                <p>{rec.strAlcoholic}</p>
                <p data-testid={`${index}-recomendation-title`} className="title">{rec.strDrink}</p>
              </div>)

            : sixRecs.map((rec, index) =>
              <div className="rec" key={rec.idMeal} data-testid={`${index}-recomendation-card`}>
                <img src={rec.strMealThumb} alt="Recomendações" />
                <p>{rec.strCategory}</p>
                <p data-testid={`${index}-recomendation-title`} className="title">{rec.strMeal}</p>
              </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
