import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getLS } from '../../helpers';
import '../../css/StateRecipeBtn.css';

const redirect = (history, location) =>
  history.push(`${location.pathname}/in-progress`);

const checkProgress = (page, idPage) =>
  Object.keys(getLS('inProgressRecipes')[page])
    .map((idProgress) => idProgress === idPage)
    .includes(true);

const showBtnState = (idPage, rec) => {
  const page = (`${rec.toLowerCase()}s` === 'meals' ? 'cocktails' : 'meals');
  if (document.getElementById('btn-state') !== null) {
    const btn = document.getElementById('btn-state');
    const idDone = getLS('doneRecipes')[0].id;
    if (idDone === +(idPage)) {
      btn.style.display = 'none';
    }
    if (checkProgress(page, idPage)) {
      btn.style.display = 'initial';
      btn.textContent = 'Continuar Receita';
    } else {
      btn.style.display = 'initial';
      btn.textContent = 'Iniciar Receita';
    }
  }
  return true;
};

const StateRecipeBtn = ({ idPage, rec }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div>
      <button
        id="btn-state" className="btn-state" data-testid="start-recipe-btn"
        onClick={() => redirect(history, location)}
      />
      {showBtnState(idPage, rec)}
    </div>
  );
};

export default StateRecipeBtn;
