import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMeals } from '../actions/apiRequest';
import { ItemCard, CategotyFilter, Header, Footer } from '../components';
import '../css/mainScreen.css';

const DrinksScreen = ({ data, fetchMealsProps }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  useEffect(() => {
    fetchMealsProps(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const meals = data.filter(({ strCategory }) =>
    ['All', strCategory].includes(filterCategory),
  );
  return (
    <div className="main-page">
      <Header />
      {CategotyFilter(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        setFilterCategory,
      )}
      <div className="meals-container " data-ride="carousel">
        {meals
          .slice(0, 12)
          .map(({ strDrink, strDrinkThumb, idDrink }) =>
            ItemCard(strDrink, strDrinkThumb, idDrink, `/bebidas/${idDrink}`),
          )}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.api.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMealsProps: (e) => dispatch(fetchMeals(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinksScreen);

DrinksScreen.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMealsProps: PropTypes.func.isRequired,
};
