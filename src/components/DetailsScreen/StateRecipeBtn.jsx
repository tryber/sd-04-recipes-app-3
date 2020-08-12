import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLS } from '../../helpers';
import '../../css/StateRecipeBtn.css';

const redirect = (history, location) =>
  history.push(`${location.pathname}/in-progress`);

const checkProgress = (page, idPage, btn) => {
  const isProgress = Object.keys(getLS('inProgressRecipes')[page])
    .map((idProgress) => idProgress === idPage)
    .includes(true);
  if (isProgress) {
    btn.style.display = 'initial';
    btn.textContent = 'Continuar Receita';
  } else {
    btn.style.display = 'initial';
    btn.textContent = 'Iniciar Receita';
  }
  return true;
};

const showBtnState = (idPage, rec) => {
  const page = (`${rec.toLowerCase()}s` === 'meals' ? 'cocktails' : 'meals');
  if (document.getElementById('btn-state') !== null) {
    const btn = document.getElementById('btn-state');
    const idDone = getLS('doneRecipes')[0].id;
    if (idDone === +(idPage)) {
      btn.style.display = 'none';
    }
    checkProgress(page, idPage, btn);
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

StateRecipeBtn.propTypes = {
  idPage: PropTypes.string.isRequired,
  rec: PropTypes.string.isRequired,
};

export default StateRecipeBtn;

// const checkProgress = (page, idPage) => {
//   const isProgress = Object.keys(getLS('inProgressRecipes')[page])
//     .map((idProgress) => idProgress === idPage)
//     .includes(true);

// };

// const showBtnState = (idPage, rec) => {
//   const page = (`${rec.toLowerCase()}s` === 'meals' ? 'cocktails' : 'meals');
//   if (document.getElementById('btn-state') !== null) {
//     const btn = document.getElementById('btn-state');
//     const idDone = getLS('doneRecipes')[0].id;
//     if (idDone === +(idPage)) {
//       btn.style.display = 'none';
//     }
//     if (checkProgress(page, idPage)) {
//       btn.style.display = 'initial';
//       btn.textContent = 'Continuar Receita';
//     } else {
//       btn.style.display = 'initial';
//       btn.textContent = 'Iniciar Receita';
//     }
//   }
//   return true;
// };
